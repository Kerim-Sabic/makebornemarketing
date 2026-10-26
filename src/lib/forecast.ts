/**
 * Forecast engine for the Predictions page. Pure functions, no network, deterministic for a given seed.
 *
 * Method (also shown on the page under "How this is calculated"):
 * 1. Visits: log-linear least-squares fit of daily direct visits (/go/ clicks, loops excluded) over the trailing
 *    14 days, projected with a damped trend: the daily growth rate shrinks by 7% a day (phi = 0.93), so the fitted
 *    growth carries forward about 13 days in total, roughly as long as the window it was fitted on, instead of
 *    compounding for months. Growth is clamped to +/-6% a day.
 * 2. Prior: the plan's base scenario (data/funnel.json, the same calculator as the Funnel page). Every rate and
 *    the visit path are a weighted blend of data and plan, with weight on the data w = n / (n + 7) for n logged
 *    days: the plan counts as one week of data, so it is 50% of the answer at 7 days, 20% at 28 and 7% at 90.
 *    Visits blend geometrically (in log space); rates blend linearly.
 * 3. Cohorts: the blended rates drive the calculator's own cohort mechanics (src/lib/cohorts.ts): refunds, plan
 *    mix, yearly share, 30-day monthly churn and the loop (viral) payers that grow with the active base. History is
 *    replayed from the logged net payers, anchored to the latest Whop MRR snapshot when one exists.
 * 4. Uncertainty: 2,000 Monte Carlo runs (seeded) draw the visit level and slope from the fit's standard errors,
 *    a plan-path error (35% in log terms), and each rate from its posterior spread: the larger of the binomial
 *    error and the day-to-day variance of the logged rate, blended with a wide prior. Bands are the 10th, 50th
 *    and 90th percentiles; probabilities are the share of runs that reach a target.
 */
import type { ActualEntry } from './types';
import { acquisition } from './actuals';
import { addDays, diffDays, WINDOW_START } from './util';
import { Book } from './cohorts';
import { GUARD, PLAN_RATES, planBase, priceForStudioShare } from './planRates';

export const DAY90 = '2027-01-24';
export const MIN_DAYS = 7;
export const PRIOR_DAYS = 7;
export const TRAIL_DAYS = 14;
export const DAMPING = 0.93;
export const MAX_DAILY_GROWTH = 0.06;
export const PLAN_LOG_SD = 0.35;
export const RUNS = 2000;
export const SEED = 20261026;
/** Diminishing returns on paid spend: payers grow with spend^0.7, so marginal CAC = average CAC / 0.7 [A]. */
export const ELASTICITY = 0.7;
export const HORIZONS = [30, 60, 90] as const;

/** Weight on the data after n logged days (the rest is the plan). */
export const priorWeight = (n: number) => (n <= 0 ? 0 : n / (n + PRIOR_DAYS));

/* ---------- seeded random numbers ---------- */

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function gaussian(rng: () => number) {
  let u = 0;
  while (u === 0) u = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
export function quantile(sorted: ArrayLike<number>, q: number) {
  const n = sorted.length;
  if (!n) return NaN;
  const pos = (n - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.min(n - 1, lo + 1);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}

/* ---------- observing the logged data ---------- */

const dayIdx = (iso: string) => diffDays(iso, WINDOW_START);

export interface DayObs {
  date: string;
  visits: number | null; // direct /go/ clicks (loops excluded); null when no row logged clicks
  signups: number | null;
  paid: number; // direct gross paid
  loopPaid: number;
  refunds: number;
  renewalsPaid: number | null;
}

export interface Observed {
  days: DayObs[]; // one per logged date, sorted
  dataDays: number;
  first: string | null;
  last: string | null;
  totals: { visits: number; signups: number; paid: number; loopPaid: number; refunds: number; studio: number; studioPaid: number; revenue: number; revenuePaid: number; spend: number };
  hasLoopRows: boolean;
}

export function observe(entries: ActualEntry[], asOf: string): Observed {
  const map = new Map<string, DayObs>();
  const renewals = new Map<string, number>();
  const t = { visits: 0, signups: 0, paid: 0, loopPaid: 0, refunds: 0, studio: 0, studioPaid: 0, revenue: 0, revenuePaid: 0, spend: 0 };
  let hasLoopRows = false;
  for (const e of entries) {
    if (e.date > asOf) continue;
    if (e.channel === 'renewals') {
      // Renewal rows do not make a data day; they only feed the observed churn.
      if (e.paid != null) renewals.set(e.date, (renewals.get(e.date) ?? 0) + e.paid);
      continue;
    }
    let d = map.get(e.date);
    if (!d) map.set(e.date, (d = { date: e.date, visits: null, signups: null, paid: 0, loopPaid: 0, refunds: 0, renewalsPaid: null }));
    if (e.channel === 'ch-loops') {
      hasLoopRows = true;
      d.loopPaid += e.paid ?? 0;
      t.loopPaid += e.paid ?? 0;
    } else {
      if (e.clicks != null) d.visits = (d.visits ?? 0) + e.clicks;
      d.paid += e.paid ?? 0;
      t.paid += e.paid ?? 0;
    }
    if (e.signups != null) d.signups = (d.signups ?? 0) + e.signups;
    d.refunds += e.refunds ?? 0;
    t.refunds += e.refunds ?? 0;
    t.spend += e.spend ?? 0;
    if (e.studioOrScale != null && e.paid != null) {
      t.studio += e.studioOrScale;
      t.studioPaid += e.paid;
    }
    if (e.revenue != null && e.paid != null && e.paid > 0) {
      t.revenue += e.revenue;
      t.revenuePaid += e.paid;
    }
  }
  const days = [...map.values()].sort((a, b) => a.date.localeCompare(b.date));
  for (const d of days) {
    if (d.visits != null) t.visits += d.visits;
    if (d.signups != null) t.signups += d.signups;
    if (renewals.has(d.date)) d.renewalsPaid = renewals.get(d.date)!;
  }
  return { days, dataDays: days.length, first: days[0]?.date ?? null, last: days[days.length - 1]?.date ?? null, totals: t, hasLoopRows };
}

/* ---------- estimates: data blended with the plan ---------- */

export interface Est {
  value: number; // posterior (blended) value
  sd: number;
  obs: number | null; // what the data alone says
  prior: number;
  weight: number; // weight on the data
  source: string;
}

function blend(obs: number | null, obsSd: number, prior: number, priorSd: number, w: number, source: string): Est {
  if (obs == null || !Number.isFinite(obs)) return { value: prior, sd: priorSd, obs: null, prior, weight: 0, source };
  const value = w * obs + (1 - w) * prior;
  const sd = Math.sqrt(w * w * obsSd * obsSd + (1 - w) * (1 - w) * priorSd * priorSd);
  return { value, sd, obs, prior, weight: w, source };
}

export interface Trend {
  level: number; // fitted log(visits + 1) at the last data day
  slope: number; // per day, clamped
  seLevel: number;
  seSlope: number;
  sigma: number;
  n: number;
}

/** Ordinary least squares of log(visits + 1) on the day index over the trailing window. */
export function fitTrend(points: { x: number; v: number }[]): Trend {
  const n = points.length;
  if (n === 0) return { level: 0, slope: 0, seLevel: 1, seSlope: 0.02, sigma: 1, n };
  const ys = points.map((p) => Math.log(p.v + 1));
  const xs = points.map((p) => p.x);
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  const xLast = xs[n - 1];
  if (n < 3) {
    const sigma = n === 2 ? Math.abs(ys[1] - ys[0]) / Math.SQRT2 : 0.5;
    return { level: my, slope: 0, seLevel: Math.max(0.15, sigma), seSlope: 0.02, sigma, n };
  }
  let sxx = 0;
  let sxy = 0;
  for (let i = 0; i < n; i++) {
    sxx += (xs[i] - mx) ** 2;
    sxy += (xs[i] - mx) * (ys[i] - my);
  }
  const slope = sxx > 0 ? sxy / sxx : 0;
  const a = my - slope * mx;
  let sse = 0;
  for (let i = 0; i < n; i++) sse += (ys[i] - (a + slope * xs[i])) ** 2;
  const sigma = Math.sqrt(sse / Math.max(1, n - 2));
  const seSlope = sxx > 0 ? sigma / Math.sqrt(sxx) : 0.02;
  const seLevel = sigma * Math.sqrt(1 / n + (sxx > 0 ? (xLast - mx) ** 2 / sxx : 0));
  return { level: a + slope * xLast, slope: clamp(slope, -MAX_DAILY_GROWTH, MAX_DAILY_GROWTH), seLevel: Math.max(0.03, seLevel), seSlope: Math.max(0.002, seSlope), sigma, n };
}

/** Sum of damped growth over h days: phi + phi^2 + ... + phi^h. */
export const dampedSum = (h: number, phi = DAMPING) => (phi === 1 ? h : (phi * (1 - phi ** h)) / (1 - phi));

let planPath: Float64Array | null = null;
/** Plan base direct visits on a day index (0 = 26 Oct); after day 91 the last week's average holds. */
export function planVisits(idx: number) {
  if (!planPath) {
    const d = planBase().daily;
    const tail = d.slice(-7).reduce((a, x) => a + x.visits, 0) / 7;
    planPath = Float64Array.from({ length: 800 }, (_, i) => (i < d.length ? d[i].visits : tail));
  }
  return planPath[Math.max(0, Math.min(planPath.length - 1, idx))];
}
export function planMrr(idx: number): number | null {
  const d = planBase().daily;
  return idx >= 0 && idx < d.length ? d[idx].mrr : null;
}

export interface Analysis {
  status: 'empty' | 'insufficient' | 'ok';
  asOf: string;
  obs: Observed;
  weight: number;
  origin: string; // day 0 of the cohort book
  startDate: string; // the projection starts the day after this
  staleDays: number; // days between the last logged day and asOf
  trend: Trend;
  est: { p: Est; signupRate: Est; refund: Est; churn: Est; studioShare: Est; yearlyShare: Est; viral: Est };
  current: { visitsPerDay: number | null; grossPerDay: number | null; loopShare: number | null };
  anchor: { date: string; mrr: number } | null;
}

export interface ForecastOptions {
  asOf: string;
  snaps?: { date: string; mrr: number }[];
  runs?: number;
  seed?: number;
}

function replayChurn(obs: Observed, origin: string, ys: number) {
  // Observed churn: renewals logged on a day against the monthly subscribers due that day (plan churn for the book).
  const size = obs.last ? dayIdx(obs.last) - dayIdx(origin) + 1 : 1;
  const book = new Book(size);
  let due = 0;
  let renewed = 0;
  let activeOverMonth = 0;
  for (const d of obs.days) {
    const i = dayIdx(d.date) - dayIdx(origin);
    activeOverMonth += book.active / 30;
    const r = book.renew(i, PLAN_RATES.monthlyChurn);
    if (d.renewalsPaid != null && r.due > 0) {
      due += r.due;
      renewed += d.renewalsPaid;
    }
    book.add(i, d.paid + d.loopPaid - d.refunds, ys);
  }
  return { due, renewed, activeOverMonth };
}

/** Everything the forecast needs from the data, with each rate blended with the plan. */
export function analyse(entries: ActualEntry[], opts: ForecastOptions): Analysis {
  const asOf = opts.asOf;
  const obs = observe(entries, asOf);
  const n = obs.dataDays;
  const w = priorWeight(n);
  const status = n === 0 ? 'empty' : n < MIN_DAYS ? 'insufficient' : 'ok';
  const origin = obs.first && obs.first < WINDOW_START ? obs.first : WINDOW_START;
  const startDate = obs.last ?? (asOf > WINDOW_START ? addDays(asOf, -1) : addDays(WINDOW_START, -1));
  const t = obs.totals;

  // Visit trend on the trailing window.
  const lastIdx = obs.last ? dayIdx(obs.last) : dayIdx(startDate);
  const pts = obs.days.filter((d) => d.visits != null && dayIdx(d.date) > lastIdx - TRAIL_DAYS).map((d) => ({ x: dayIdx(d.date), v: d.visits! }));
  const trend = fitTrend(pts);

  // Visit-to-paid (direct): day-level ratio, error = max(binomial, day-to-day variance).
  const vDays = obs.days.filter((d) => d.visits != null && d.visits > 0);
  const V = vDays.reduce((a, d) => a + d.visits!, 0);
  const P = vDays.reduce((a, d) => a + d.paid, 0);
  let pObs: number | null = null;
  let pSd = 0;
  if (V > 0) {
    pObs = P / V;
    const pj = (P + 0.5) / (V + 1);
    const seBin = Math.sqrt((pj * (1 - pj)) / V);
    const varDay = vDays.reduce((a, d) => a + d.visits! * (d.paid / d.visits! - pObs!) ** 2, 0) / V;
    const seDay = Math.sqrt(varDay / Math.max(1, vDays.length - 1));
    pSd = Math.max(seBin, seDay);
  }
  const pPrior = PLAN_RATES.visitToPaid;
  const p = blend(pObs, pSd, pPrior, pPrior * 0.5, w, pObs == null ? 'plan (no visits logged)' : 'paid ÷ /go/ clicks, direct channels');

  const sDays = obs.days.filter((d) => d.visits != null && d.visits > 0 && d.signups != null);
  const SV = sDays.reduce((a, d) => a + d.visits!, 0);
  const SS = sDays.reduce((a, d) => a + d.signups!, 0);
  const sObs = SV > 0 ? SS / SV : null;
  const signupRate = blend(sObs, sObs == null ? 0 : Math.sqrt((Math.max(sObs, 0.005) * (1 - sObs)) / SV), PLAN_RATES.signupRate, PLAN_RATES.signupRate * 0.4, w, 'sign-ups ÷ /go/ clicks');

  const allPaid = t.paid + t.loopPaid;
  const rObs = allPaid >= 1 ? t.refunds / allPaid : null;
  const refund = blend(rObs, rObs == null ? 0 : Math.sqrt((Math.max(rObs, 0.02) * (1 - rObs)) / allPaid), PLAN_RATES.refundRate, 0.05, w, 'refunds ÷ gross paid');

  const stObs = t.studioPaid >= 1 ? t.studio / t.studioPaid : null;
  const studioShare = blend(stObs, stObs == null ? 0 : Math.sqrt((Math.max(stObs, 0.05) * (1 - stObs)) / t.studioPaid), PLAN_RATES.studioShare, 0.1, w, 'Studio or Scale ÷ paid');

  // Yearly share inferred from first-payment revenue per payer: price × ((1 − y) + y × 12 × (1 − discount)).
  const yd = PLAN_RATES.yearlyDiscount;
  let yObs: number | null = null;
  if (t.revenuePaid >= 5) {
    const perPayer = t.revenue / t.revenuePaid;
    yObs = clamp((perPayer / priceForStudioShare(studioShare.value) - 1) / (12 * (1 - yd) - 1), 0, 0.6);
  }
  const yearlyShare = blend(yObs, 0.04, PLAN_RATES.yearlyShare, 0.05, yObs == null ? 0 : w, 'inferred from first-payment revenue per payer');

  // Churn from renewals (needs 10+ subscribers due); loops from ch-loops rows against the active base.
  const rc = replayChurn(obs, origin, yearlyShare.value);
  const cObs = rc.due >= 10 ? clamp(1 - rc.renewed / rc.due, 0, 0.9) : null;
  const churn = blend(cObs, cObs == null ? 0 : Math.sqrt((Math.max(cObs, 0.03) * (1 - cObs)) / rc.due), PLAN_RATES.monthlyChurn, 0.03, cObs == null ? 0 : Math.min(w, rc.due / (rc.due + 30)), cObs == null ? 'plan (no renewals due yet)' : 'renewals logged ÷ renewals due');
  const vObs = obs.hasLoopRows && rc.activeOverMonth > 1 ? t.loopPaid / rc.activeOverMonth : null;
  const viral = blend(vObs, vObs == null ? 0 : Math.max(0.02, vObs * 0.5), PLAN_RATES.viralCoefficient, 0.05, w, vObs == null ? 'plan (no ch-loops rows)' : 'loop payers ÷ active payer-months');

  const last7 = obs.days.filter((d) => obs.last && dayIdx(d.date) > dayIdx(obs.last) - 7);
  const v7 = last7.filter((d) => d.visits != null);
  const current = {
    visitsPerDay: v7.length ? v7.reduce((a, d) => a + d.visits!, 0) / v7.length : null,
    grossPerDay: last7.length ? last7.reduce((a, d) => a + d.paid + d.loopPaid, 0) / last7.length : null,
    loopShare: allPaid > 0 && obs.hasLoopRows ? t.loopPaid / allPaid : null,
  };

  const snaps = (opts.snaps ?? []).filter((s) => s.date <= startDate && s.date >= origin && diffDays(startDate, s.date) <= 7).sort((a, b) => a.date.localeCompare(b.date));
  const anchor = n > 0 && snaps.length ? snaps[snaps.length - 1] : null;

  return {
    status,
    asOf,
    obs,
    weight: w,
    origin,
    startDate,
    staleDays: obs.last ? Math.max(0, diffDays(asOf, obs.last)) : 0,
    trend,
    est: { p, signupRate, refund, churn, studioShare, yearlyShare, viral },
    current,
    anchor,
  };
}

/* ---------- simulation ---------- */

export interface SimParams {
  /** Direct visits on projection day h (1 = the day after startDate). */
  visits: (h: number) => number;
  p: number;
  signupRate: number;
  refund: number;
  churn: number;
  studioShare: number;
  yearlyShare: number;
  viral: number;
  /** When set, loop payers are this share of all new payers instead of growing with the active base. */
  loopShare: number | null;
}

export interface SimDay {
  date: string;
  visits: number; // direct + loop-implied
  signups: number;
  gross: number;
  loopGross: number;
  active: number;
  mrr: number;
  cumGross: number; // since the first logged day
}

export interface SimResult {
  history: { date: string; mrr: number; active: number; cumGross: number }[];
  days: SimDay[];
}

/** Typed-array output of one projection (index h - 1 = projection day h). */
export interface SimArrays { mrr: Float64Array; active: Float64Array; cumGross: Float64Array; visits: Float64Array; signups: Float64Array; gross: Float64Array; loop: Float64Array }
export const simArrays = (H: number): SimArrays => ({
  mrr: new Float64Array(H), active: new Float64Array(H), cumGross: new Float64Array(H), visits: new Float64Array(H),
  signups: new Float64Array(H), gross: new Float64Array(H), loop: new Float64Array(H),
});

/** Replay the logged history, then project H days into `out`. Allocation-free apart from the cohort book. */
export function project(a: Analysis, sp: SimParams, H: number, out: SimArrays, history?: SimResult['history']) {
  const o0 = dayIdx(a.origin);
  const s0 = dayIdx(a.startDate) - o0; // index of the last history day
  const book = new Book(s0 + H + 2);
  const price = priceForStudioShare(sp.studioShare);
  const yd = PLAN_RATES.yearlyDiscount;
  let cumGross = 0;
  let di = 0;
  const days = a.obs.days;
  for (let i = 0; i <= s0; i++) {
    book.renew(i, sp.churn);
    const d = di < days.length && dayIdx(days[di].date) - o0 === i ? days[di++] : null;
    if (d) {
      book.add(i, d.paid + d.loopPaid - d.refunds, sp.yearlyShare);
      cumGross += d.paid + d.loopPaid;
    }
    if (a.anchor && dayIdx(a.anchor.date) - o0 === i) {
      const m = book.mrr(price, yd);
      if (m > 0) book.scale(a.anchor.mrr / m);
    }
    if (history) history.push({ date: addDays(a.origin, i), mrr: book.mrr(price, yd), active: book.active, cumGross });
  }
  let activePrev = book.active;
  const share = sp.loopShare == null ? null : clamp(sp.loopShare, 0, 0.95);
  for (let h = 1; h <= H; h++) {
    const i = s0 + h;
    const v = Math.max(0, sp.visits(h));
    const direct = v * sp.p;
    const loop = share == null ? (sp.viral / 30) * activePrev : (direct * share) / (1 - share);
    const gross = direct + loop;
    book.renew(i, sp.churn);
    book.add(i, gross * (1 - sp.refund), sp.yearlyShare);
    cumGross += gross;
    const totalVisits = v + (sp.p > 0 ? loop / sp.p : 0);
    activePrev = book.active;
    out.mrr[h - 1] = book.mrr(price, yd);
    out.active[h - 1] = activePrev;
    out.cumGross[h - 1] = cumGross;
    out.visits[h - 1] = totalVisits;
    out.signups[h - 1] = totalVisits * sp.signupRate;
    out.gross[h - 1] = gross;
    out.loop[h - 1] = loop;
  }
  return out;
}

/** Replay the logged history, then project H days with the given parameters (object form for the page). */
export function simulate(a: Analysis, sp: SimParams, H: number, withHistory = false): SimResult {
  const history: SimResult['history'] = [];
  const o = project(a, sp, H, simArrays(H), withHistory ? history : undefined);
  const days: SimDay[] = [];
  for (let h = 1; h <= H; h++) {
    days.push({ date: addDays(a.startDate, h), visits: o.visits[h - 1], signups: o.signups[h - 1], gross: o.gross[h - 1], loopGross: o.loop[h - 1], active: o.active[h - 1], mrr: o.mrr[h - 1], cumGross: o.cumGross[h - 1] });
  }
  return { history, days };
}

/** The central (posterior mean) visit path: data trend and plan path blended in log space. */
export function centralVisits(a: Analysis, levelShift = 0, slopeShift = 0, planShift = 0) {
  const w = a.weight;
  const lastIdx = dayIdx(a.startDate);
  const L = a.trend.level + levelShift;
  const b = clamp(a.trend.slope + slopeShift, -MAX_DAILY_GROWTH, MAX_DAILY_GROWTH);
  const hasTrend = a.trend.n > 0;
  return (h: number) => {
    // Both paths in log(visits + 1), the scale the trend is fitted on.
    const logP = Math.log(planVisits(lastIdx + h) + 1) + planShift;
    if (!hasTrend) return Math.max(0, Math.exp(logP) - 1);
    const logD = L + b * dampedSum(h);
    return Math.max(0, Math.exp(w * logD + (1 - w) * logP) - 1);
  };
}

export function centralParams(a: Analysis): SimParams {
  const e = a.est;
  return {
    visits: centralVisits(a),
    p: e.p.value,
    signupRate: e.signupRate.value,
    refund: e.refund.value,
    churn: e.churn.value,
    studioShare: e.studioShare.value,
    yearlyShare: e.yearlyShare.value,
    viral: e.viral.value,
    loopShare: null,
  };
}

/* ---------- targets ---------- */

export interface Target {
  id: string;
  date: string;
  metric: 'cumGross' | 'mrr' | 'arr' | 'visitToPaid';
  min: number;
  label: string;
}

/** Quantitative reads of the dated checkpoints in data/checkpoints.json (dates must exist there; checked by npm run check). */
export function checkpointTargets(): Target[] {
  const base = planBase().summary;
  return [
    { id: 'offer', date: '2026-11-16', metric: 'visitToPaid', min: GUARD.offerCheckMin, label: 'Visit-to-paid at or above 0.7% (offer check, D2 trigger)' },
    { id: 'gate100', date: '2026-11-22', metric: 'cumGross', min: 100, label: '100+ cumulative gross payers (base path)' },
    { id: 'gate200', date: '2026-11-22', metric: 'cumGross', min: 200, label: '200+ cumulative gross payers (high or breakout path)' },
    { id: 'cr', date: '2026-12-07', metric: 'mrr', min: 1500, label: 'MRR above about $1.5k (Content Rewards gate)' },
    { id: 'breakout', date: '2026-12-20', metric: 'cumGross', min: 750, label: 'About 750 cumulative gross payers (breakout check, the $1M path)' },
    { id: 'base90', date: DAY90, metric: 'mrr', min: base.mrrEnd, label: `Plan base MRR (about $${(base.mrrEnd / 1000).toFixed(1)}k) on the day-90 review` },
    { id: 'arr1m', date: DAY90, metric: 'arr', min: 1_000_000, label: '$1M ARR run-rate on the day-90 review' },
  ];
}

/* ---------- Monte Carlo ---------- */

export interface Band { p10: number; p50: number; p90: number }
export interface HorizonOut {
  id: string;
  label: string;
  date: string;
  days: number; // days from asOf
  mrr: Band;
  arr: Band;
  payers: Band;
  visits: Band; // total over the next `days` days
  signups: Band;
  cumGross: Band;
}
export interface ProbOut extends Target {
  probability: number;
  decided: boolean; // already settled by logged data
  actual: number | null;
}
export interface PaceLever {
  lever: 'visits' | 'conversion' | 'referral';
  factor: number | null; // multiplier on today's assumption (null = unreachable)
  required: number | null;
  current: number | null;
}
export interface PaceOut {
  id: string;
  label: string;
  targetArr: number;
  projectedArr: number;
  onPace: boolean;
  levers: PaceLever[];
  grossPerDayNeeded: number | null;
  grossPerDayNow: number | null;
  multipleOfToday: number | null;
}

export interface Forecast {
  analysis: Analysis;
  runs: number;
  seed: number;
  horizons: HorizonOut[];
  band: { dates: string[]; p10: number[]; p50: number[]; p90: number[] };
  central: SimResult;
  probabilities: ProbOut[];
  pace: PaceOut[];
  ms: number;
}

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

/** Horizon dates: +30, +60, +90 days from asOf, and the day-90 review if it is still ahead. */
export function horizonDates(asOf: string) {
  const out: { id: string; label: string; date: string; days: number }[] = HORIZONS.map((d) => ({ id: `d${d}`, label: `${d} days`, date: addDays(asOf, d), days: d }));
  if (DAY90 > asOf && !out.some((x) => x.date === DAY90)) out.push({ id: 'day90', label: 'Day-90 review', date: DAY90, days: diffDays(DAY90, asOf) });
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

export function forecast(entries: ActualEntry[], opts: ForecastOptions): Forecast | Analysis {
  const a = analyse(entries, opts);
  if (a.status !== 'ok') return a;
  return runForecast(a, opts.runs ?? RUNS, opts.seed ?? SEED);
}
export const isForecast = (x: Forecast | Analysis): x is Forecast => 'horizons' in x;

export function runForecast(a: Analysis, runs = RUNS, seed = SEED): Forecast {
  const t0 = now();
  const rng = mulberry32(seed);
  const hz = horizonDates(a.asOf);
  const targets = checkpointTargets();
  const start = a.startDate;
  const lastTarget = [...hz.map((h) => h.date), ...targets.map((x) => x.date)].reduce((m, d) => (d > m ? d : m), start);
  const H = Math.max(1, diffDays(lastTarget, start));
  const asOfH = diffDays(a.asOf, start); // projection day index of asOf (0 = startDate)
  const hIdx = (date: string) => diffDays(date, start); // 1-based projection day

  const e = a.est;
  const mrr = new Float64Array(runs * H);
  const hm = hz.map(() => ({ mrr: new Float64Array(runs), payers: new Float64Array(runs), visits: new Float64Array(runs), signups: new Float64Array(runs), cumGross: new Float64Array(runs) }));
  const hits = targets.map(() => 0);
  const buf = simArrays(H);
  const lognorm = (m: number, sd: number, z: number) => (m <= 0 ? 0 : m * Math.exp(z * Math.min(1, sd / m) - 0.5 * Math.min(1, sd / m) ** 2));

  for (let r = 0; r < runs; r++) {
    const zL = gaussian(rng), zB = gaussian(rng), zP = gaussian(rng), zp = gaussian(rng), zr = gaussian(rng), zc = gaussian(rng), zs = gaussian(rng), zv = gaussian(rng), zy = gaussian(rng), zsu = gaussian(rng);
    const sp: SimParams = {
      visits: centralVisits(a, zL * a.trend.seLevel, zB * a.trend.seSlope, zP * PLAN_LOG_SD),
      p: lognorm(e.p.value, e.p.sd, zp),
      signupRate: clamp(lognorm(e.signupRate.value, e.signupRate.sd, zsu), 0, 1),
      refund: clamp(e.refund.value + zr * e.refund.sd, 0, 0.6),
      churn: clamp(e.churn.value + zc * e.churn.sd, 0.005, 0.5),
      studioShare: clamp(e.studioShare.value + zs * e.studioShare.sd, 0, 1),
      yearlyShare: clamp(e.yearlyShare.value + zy * e.yearlyShare.sd, 0, 0.6),
      viral: Math.max(0, e.viral.value + zv * e.viral.sd),
      loopShare: null,
    };
    const d = project(a, sp, H, buf);
    mrr.set(d.mrr, r * H);
    hz.forEach((x, j) => {
      const k = hIdx(x.date) - 1;
      hm[j].mrr[r] = d.mrr[k];
      hm[j].payers[r] = d.active[k];
      let sv = 0;
      let ss = 0;
      for (let q = Math.max(0, asOfH); q <= k; q++) {
        sv += d.visits[q];
        ss += d.signups[q];
      }
      hm[j].visits[r] = sv;
      hm[j].signups[r] = ss;
      hm[j].cumGross[r] = d.cumGross[k];
    });
    targets.forEach((tg, j) => {
      const k = hIdx(tg.date) - 1;
      if (k < 0) return;
      const v = tg.metric === 'cumGross' ? d.cumGross[k] : tg.metric === 'mrr' ? d.mrr[k] : tg.metric === 'arr' ? d.mrr[k] * 12 : sp.p;
      if (v >= tg.min) hits[j]++;
    });
  }

  const sortQ = (arr: Float64Array): Band => {
    const s = Float64Array.from(arr).sort();
    return { p10: quantile(s, 0.1), p50: quantile(s, 0.5), p90: quantile(s, 0.9) };
  };
  const horizons: HorizonOut[] = hz.map((x, j) => {
    const m = sortQ(hm[j].mrr);
    return { ...x, mrr: m, arr: { p10: m.p10 * 12, p50: m.p50 * 12, p90: m.p90 * 12 }, payers: sortQ(hm[j].payers), visits: sortQ(hm[j].visits), signups: sortQ(hm[j].signups), cumGross: sortQ(hm[j].cumGross) };
  });

  const band = { dates: [] as string[], p10: [] as number[], p50: [] as number[], p90: [] as number[] };
  const col = new Float64Array(runs);
  for (let h = 0; h < H; h++) {
    for (let r = 0; r < runs; r++) col[r] = mrr[r * H + h];
    col.sort();
    band.dates.push(addDays(start, h + 1));
    band.p10.push(quantile(col, 0.1));
    band.p50.push(quantile(col, 0.5));
    band.p90.push(quantile(col, 0.9));
  }

  const central = simulate(a, centralParams(a), H, true);
  const probabilities: ProbOut[] = targets.map((tg, j) => {
    if (tg.date <= start) {
      const actual = decidedValue(a, central, tg);
      return { ...tg, probability: actual != null && actual >= tg.min ? 1 : 0, decided: true, actual };
    }
    return { ...tg, probability: hits[j] / runs, decided: false, actual: null };
  });

  return { analysis: a, runs, seed, horizons, band, central, probabilities, pace: requiredPace(a), ms: now() - t0 };
}

function decidedValue(a: Analysis, central: SimResult, tg: Target): number | null {
  if (tg.metric === 'visitToPaid') {
    const ds = a.obs.days.filter((d) => d.date <= tg.date && d.visits != null && d.visits > 0);
    const v = ds.reduce((s, d) => s + d.visits!, 0);
    return v > 0 ? ds.reduce((s, d) => s + d.paid, 0) / v : null;
  }
  const h = [...central.history].reverse().find((x) => x.date <= tg.date);
  if (!h) return null;
  return tg.metric === 'cumGross' ? h.cumGross : tg.metric === 'mrr' ? h.mrr : h.mrr * 12;
}

/* ---------- required pace ---------- */

function bisect(f: (x: number) => number, target: number, lo: number, hi: number) {
  if (f(hi) < target) return null;
  if (f(lo) >= target) return lo;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) >= target) hi = mid;
    else lo = mid;
  }
  return hi;
}

export function paceTargets() {
  return [
    { id: 'arr1m', label: '$1M ARR', arr: 1_000_000 },
    { id: 'arr500k', label: '$500k ARR', arr: 500_000 },
    { id: 'base', label: 'Plan base', arr: planBase().summary.arrEnd },
  ];
}

/** What it takes, from the last logged day to the day-90 review, one lever at a time (others at today's estimate). */
export function requiredPace(a: Analysis): PaceOut[] {
  const H = diffDays(DAY90, a.startDate);
  if (H < 1) return [];
  const cp = centralParams(a);
  const buf = simArrays(H);
  const arrAt = (sp: SimParams) => project(a, sp, H, buf).mrr[H - 1] * 12;
  const projected = arrAt(cp);
  const meanVisits = (() => {
    let s = 0;
    for (let h = 1; h <= H; h++) s += cp.visits(h);
    return s / H;
  })();
  return paceTargets().map((t) => {
    const fV = bisect((f) => arrAt({ ...cp, visits: (h) => cp.visits(h) * f }), t.arr, 0, 1000);
    const fP = bisect((f) => arrAt({ ...cp, p: Math.min(0.5, cp.p * f) }), t.arr, 0, Math.max(1, 0.5 / Math.max(cp.p, 1e-6)));
    const sR = bisect((s) => arrAt({ ...cp, loopShare: s }), t.arr, 0, 0.95);
    let grossNeeded: number | null = null;
    if (fV != null) {
      const o = project(a, { ...cp, visits: (h) => cp.visits(h) * fV }, H, buf);
      grossNeeded = o.gross.reduce((s, g) => s + g, 0) / H;
    }
    const now = a.current.grossPerDay;
    return {
      id: t.id,
      label: t.label,
      targetArr: t.arr,
      projectedArr: projected,
      onPace: projected >= t.arr,
      levers: [
        { lever: 'visits', factor: fV, required: fV == null ? null : meanVisits * fV, current: a.current.visitsPerDay },
        { lever: 'conversion', factor: fP, required: fP == null ? null : Math.min(0.5, cp.p * fP), current: a.est.p.obs },
        { lever: 'referral', factor: null, required: sR, current: a.current.loopShare },
      ],
      grossPerDayNeeded: grossNeeded,
      grossPerDayNow: now,
      multipleOfToday: grossNeeded != null && now != null && now > 0 ? grossNeeded / now : null,
    };
  });
}

/* ---------- channel outlook ---------- */

export interface ChannelOutlook {
  channel: string;
  recentVisitsPerDay: number | null;
  weeklyGrowth: number | null;
  conversion: number | null; // shrunk toward the overall rate
  netPayers30: number;
  mrrAdded30: number;
  spend: number;
  netPaid: number;
  cac: number | null; // all-time
  recentCac: number | null; // trailing 14 days
  marginalCac: number | null;
  readable: boolean; // 3+ net payers
}

/** Per channel: its own trailing trend and conversion (shrunk toward the blended rate), and marginal CAC. */
export function channelOutlook(entries: ActualEntry[], a: Analysis): ChannelOutlook[] {
  if (!a.obs.last) return [];
  const last = a.obs.last;
  const lastI = dayIdx(last);
  const pAll = a.est.p.value;
  const refund = a.est.refund.value;
  const arpu = priceForStudioShare(a.est.studioShare.value) * (1 - a.est.yearlyShare.value * PLAN_RATES.yearlyDiscount);
  const K = 300; // pseudo-visits at the blended rate
  const by = new Map<string, ActualEntry[]>();
  for (const e of acquisition(entries)) if (e.date <= last) by.set(e.channel, [...(by.get(e.channel) ?? []), e]);
  const out: ChannelOutlook[] = [];
  for (const [channel, rows] of by) {
    const recent = rows.filter((e) => dayIdx(e.date) > lastI - TRAIL_DAYS);
    const perDay = new Map<string, { v: number | null; paid: number }>();
    for (const e of recent) {
      const d = perDay.get(e.date) ?? { v: null, paid: 0 };
      if (e.clicks != null) d.v = (d.v ?? 0) + e.clicks;
      d.paid += e.paid ?? 0;
      perDay.set(e.date, d);
    }
    const pts = [...perDay.entries()].filter(([, d]) => d.v != null).map(([date, d]) => ({ x: dayIdx(date), v: d.v! })).sort((x, y) => x.x - y.x);
    const tr = fitTrend(pts);
    const wS = priorWeight(pts.length) * (pts.length >= 3 ? 1 : 0);
    const slope = tr.slope * wS;
    const recentV = pts.length ? pts.reduce((s, p) => s + p.v, 0) / TRAIL_DAYS : null;
    const recentPaid = recent.reduce((s, e) => s + (e.paid ?? 0), 0);
    const recentRefunds = recent.reduce((s, e) => s + (e.refunds ?? 0), 0);
    const vSum = pts.reduce((s, p) => s + p.v, 0);
    const conv = vSum > 0 ? (recentPaid + K * pAll) / (vSum + K) : null;
    let future = 0;
    for (let h = 1; h <= 30; h++) future += Math.exp(slope * dampedSum(h));
    const gross30 = recentV != null && conv != null ? recentV * conv * future : (recentPaid / TRAIL_DAYS) * future;
    const net30 = gross30 * (1 - refund);
    const spend = rows.reduce((s, e) => s + (e.spend ?? 0), 0);
    const netPaid = rows.reduce((s, e) => s + (e.paid ?? 0) - (e.refunds ?? 0), 0);
    const recentSpend = recent.reduce((s, e) => s + (e.spend ?? 0), 0);
    const recentNet = recentPaid - recentRefunds;
    const cac = spend > 0 ? (netPaid > 0 ? spend / netPaid : Infinity) : null;
    const recentCac = recentSpend > 0 ? (recentNet > 0 ? recentSpend / recentNet : Infinity) : null;
    out.push({
      channel,
      recentVisitsPerDay: recentV,
      weeklyGrowth: pts.length >= 3 ? Math.exp(slope * 7) - 1 : null,
      conversion: conv,
      netPayers30: net30,
      mrrAdded30: net30 * arpu,
      spend,
      netPaid,
      cac,
      recentCac,
      marginalCac: recentCac != null ? recentCac / ELASTICITY : cac != null ? cac / ELASTICITY : null,
      readable: netPaid >= GUARD.scaleMinPayers,
    });
  }
  return out.sort((x, y) => y.netPayers30 - x.netPayers30);
}

/** The paid channel to feed next: readable (3+ net payers) with the lowest marginal CAC at or under the $50 target. */
export function feedNext(rows: ChannelOutlook[]) {
  const paid = rows.filter((r) => r.spend > 0 && r.marginalCac != null && Number.isFinite(r.marginalCac));
  const ok = paid.filter((r) => r.readable && r.marginalCac! <= GUARD.cacTarget).sort((x, y) => x.marginalCac! - y.marginalCac!);
  if (ok.length) return { channel: ok[0], reason: 'lowest marginal CAC at or under $50 on 3+ net payers' as const };
  const testing = paid.filter((r) => !r.readable && r.cac != null && r.cac <= GUARD.cacTarget).sort((x, y) => x.cac! - y.cac!);
  if (testing.length) return { channel: testing[0], reason: 'on target but under 3 net payers: keep testing, do not scale yet' as const };
  return null;
}

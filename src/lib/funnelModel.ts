// TypeScript port of data/funnel_model.py (the reference implementation of data/funnel.json formulas).
// Keep the two in step: scripts/check-routes.mjs compares this port with each scenario's referenceOutputs.

export const PRICES = { create: 20, studio: 49, scale: 99 } as const;
type PlanKey = keyof typeof PRICES;
const PLAN_KEYS: PlanKey[] = ['create', 'studio', 'scale'];
export const BUCKETS = ['creators', 'boosts', 'contentRewards'] as const;
export type Bucket = (typeof BUCKETS)[number];

export interface BudgetScheduleLine {
  lineId: string; bucket: Bucket; usd: number; weeks: number[]; conditional?: boolean; note?: string;
}

export interface FunnelInputs {
  days: number;
  weeklyShape: number[];
  visitsPerDay: Record<string, number>;
  signupRate: number;
  checkoutOpenRate?: number;
  checkoutToPaidRate?: number;
  paidRate: number;
  planMix: Record<PlanKey, number>;
  yearlyShare: number;
  yearlyDiscount: number;
  monthlyChurn: number;
  refundRate: number;
  viralCoefficient: number;
  creatorCPM: number;
  creatorClickRate: number;
  adCPC: number;
  contentRewardsCPM: number;
  contentRewardsClickRate: number;
  paidConversionMultiplier: Record<Bucket, number>;
  feePct: number;
  feeFixed: number;
  budgetSchedule: BudgetScheduleLine[];
  reinvest: {
    startWeek: number; share: number; reducedShare: number; cacTarget: number; minPaidPayers: number;
    contentRewardsShare: number; contentRewardsMinMrr: number; maxWeeklyUsd: number; maxWeeklyGrowth: number;
    growthFloorUsd: number;
  };
  activationRate: { weeks1to4: number; after: number };
  firstBuildsPerPayerDay1: number;
  firstSiteBuildCostUsd: { median: number; worst: number };
  contributionPerSubMonth: Record<PlanKey, number>;
  preview?: { enabled: boolean; fromWeek: number; paidRateUplift: number; takeRate: number; costUsd: number };
}

export interface FunnelSummary {
  qualifiedVisits: number; grossPaid: number; netPaid: number; loopShareOverall: number; activeEnd: number;
  mrrDay30: number; mrrDay60: number; mrrEnd: number; arrEnd: number; paidSpendTotal: number;
  reinvestedFromRevenue: number; paidCac: number | null; netArpu: number; visitToPaid: number;
  loopVisitsImplied: number; activatedPayers: number; netNewCashFirstPayments: number; previewAiCost: number;
  peakGrossPerDay: number; aiLimitNeededPerDayUsd: [number, number]; monthlyContributionEnd: number;
}

export interface FunnelWeek {
  week: number; visits: number; signups: number; grossPaid: number; netPaid: number; loopShare: number;
  paidSpend: number; activeSubs: number; mrr: number; reinvest: number;
}

export interface FunnelDay { day: number; mrr: number; arr: number; active: number; gross: number; visits: number }

export interface FunnelResult { summary: FunnelSummary; weekly: FunnelWeek[]; daily: FunnelDay[] }

const r = (x: number, digits = 0) => {
  const f = 10 ** digits;
  return Math.round(x * f) / f;
};

export function runFunnel(p: FunnelInputs): FunnelResult {
  const days = p.days;
  const shape = p.weeklyShape;
  const organicTotal = Object.values(p.visitsPerDay).reduce((a, b) => a + b, 0) * days;
  const blended = PLAN_KEYS.reduce((a, k) => a + p.planMix[k] * PRICES[k], 0);
  const ys = p.yearlyShare;
  const yd = p.yearlyDiscount;
  const conv = p.signupRate * p.paidRate;
  const mult = p.paidConversionMultiplier;
  const ri = p.reinvest;

  const spend: Record<Bucket, number[]> = {
    creators: new Array(days).fill(0),
    boosts: new Array(days).fill(0),
    contentRewards: new Array(days).fill(0),
  };
  for (const line of p.budgetSchedule) {
    if (line.conditional) continue;
    const perDay = line.usd / (line.weeks.length * 7);
    for (const w of line.weeks) {
      for (let d = (w - 1) * 7; d < Math.min(w * 7, days); d++) spend[line.bucket][d] += perDay;
    }
  }
  const cpv: Record<Bucket, number> = {
    creators: p.creatorCPM / (1000 * p.creatorClickRate),
    boosts: p.adCPC,
    contentRewards: p.contentRewardsCPM / (1000 * p.contentRewardsClickRate),
  };

  const cohorts: [number, number][] = [];
  let yearlyActive = 0;
  const weeks = new Map<number, { visits: number; signups: number; gross: number; net: number; loop: number; spend: number; cash: number; active: number; mrr: number }>();
  const cum = { paidSpend: 0, paidNet: 0, gross: 0, net: 0, visits: 0, loopGross: 0, reinvest: 0, previewCost: 0, peakGrossDay: 0, firstCash: 0, activated: 0 };
  let activePrev = 0;
  let mrr = 0;
  const nW = Math.floor(days / 7) + 2;
  const weeklyCash = new Array(nW).fill(0);
  const weeklyReinvest = new Array(nW).fill(0);
  const mrrDay: number[] = [];
  const daily: FunnelDay[] = [];
  const pvw = p.preview ?? { enabled: false, fromWeek: 99, paidRateUplift: 1, takeRate: 0, costUsd: 0 };

  for (let d = 0; d < days; d++) {
    const w = Math.floor(d / 7) + 1;
    if (d % 7 === 0 && w >= ri.startWeek) {
      const cac = cum.paidNet > 0 ? cum.paidSpend / cum.paidNet : Infinity;
      let share = 0;
      if (cum.paidNet >= ri.minPaidPayers) {
        if (cac <= ri.cacTarget) share = ri.share;
        else if (cac <= ri.cacTarget * 1.25) share = ri.reducedShare;
      }
      let budget = share * weeklyCash[w - 1];
      const cap = Math.min(ri.maxWeeklyUsd, Math.max(ri.growthFloorUsd, weeklyReinvest[w - 1] * ri.maxWeeklyGrowth));
      budget = Math.min(budget, cap);
      weeklyReinvest[w] = budget;
      if (share > 0) {
        for (const line of p.budgetSchedule) {
          if (line.conditional && line.weeks.includes(w)) {
            const perDay = line.usd / (line.weeks.length * 7);
            for (let dd = d; dd < Math.min(d + 7, days); dd++) spend[line.bucket][dd] += perDay;
          }
        }
      }
      const crShare = mrr >= ri.contentRewardsMinMrr ? ri.contentRewardsShare : 0;
      for (let dd = d; dd < Math.min(d + 7, days); dd++) {
        spend.contentRewards[dd] += (budget * crShare) / 7;
        spend.creators[dd] += (budget * (1 - crShare)) / 7;
      }
      cum.reinvest += budget;
    }
    const org = (organicTotal * (shape[w - 1] ?? 0)) / 7;
    const pv: Record<Bucket, number> = {
      creators: spend.creators[d] / cpv.creators,
      boosts: spend.boosts[d] / cpv.boosts,
      contentRewards: spend.contentRewards[d] / cpv.contentRewards,
    };
    const paidVisits = pv.creators + pv.boosts + pv.contentRewards;
    const daySpend = spend.creators[d] + spend.boosts[d] + spend.contentRewards[d];
    const on = !!pvw.enabled && w >= (pvw.fromWeek ?? 99);
    const c = conv * (on ? pvw.paidRateUplift ?? 1 : 1);
    const paidGross = BUCKETS.reduce((a, b) => a + pv[b] * c * mult[b], 0);
    const loopGross = (p.viralCoefficient / 30) * activePrev;
    const gross = org * c + paidGross + loopGross;
    const previewCost = on ? (org + paidVisits) * p.signupRate * (pvw.takeRate ?? 0) * (pvw.costUsd ?? 0) : 0;
    const net = gross * (1 - p.refundRate);
    const newM = net * (1 - ys);
    const newY = net * ys;
    cohorts.push([d, newM]);
    yearlyActive += newY;
    let actM = 0;
    for (const [cd, n] of cohorts) actM += n * (1 - p.monthlyChurn) ** Math.floor((d - cd) / 30);
    const active = actM + yearlyActive;
    mrr = actM * blended + yearlyActive * blended * (1 - yd);
    mrrDay.push(mrr);
    const firstCash = newM * blended + newY * blended * 12 * (1 - yd);
    const netNewCash = firstCash * (1 - p.feePct) - net * p.feeFixed - previewCost;
    cum.previewCost += previewCost;
    cum.peakGrossDay = Math.max(cum.peakGrossDay, gross);
    cum.firstCash += netNewCash;
    const act = w <= 4 ? p.activationRate.weeks1to4 : p.activationRate.after;
    cum.activated += net * act;
    weeklyCash[w] += netNewCash;
    cum.paidSpend += daySpend;
    cum.paidNet += paidGross * (1 - p.refundRate);
    cum.gross += gross;
    cum.net += net;
    cum.visits += org + paidVisits;
    cum.loopGross += loopGross;
    const wk = weeks.get(w) ?? { visits: 0, signups: 0, gross: 0, net: 0, loop: 0, spend: 0, cash: 0, active: 0, mrr: 0 };
    wk.visits += org + paidVisits;
    wk.signups += (org + paidVisits) * p.signupRate;
    wk.gross += gross;
    wk.net += net;
    wk.loop += loopGross;
    wk.spend += daySpend;
    wk.cash += netNewCash;
    wk.active = active;
    wk.mrr = mrr;
    weeks.set(w, wk);
    activePrev = active;
    daily.push({ day: d + 1, mrr, arr: mrr * 12, active, gross, visits: org + paidVisits });
  }

  const weekly: FunnelWeek[] = [...weeks.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([w, v]) => ({
      week: w,
      visits: r(v.visits),
      signups: r(v.signups),
      grossPaid: r(v.gross, 1),
      netPaid: r(v.net, 1),
      loopShare: v.gross ? r(v.loop / v.gross, 3) : 0,
      paidSpend: r(v.spend),
      activeSubs: r(v.active),
      mrr: r(v.mrr),
      reinvest: r(weeklyReinvest[w] ?? 0),
    }));

  const last = mrrDay[mrrDay.length - 1] ?? 0;
  const summary: FunnelSummary = {
    qualifiedVisits: r(cum.visits),
    grossPaid: r(cum.gross),
    netPaid: r(cum.net),
    loopShareOverall: cum.gross ? r(cum.loopGross / cum.gross, 3) : 0,
    activeEnd: r(activePrev),
    mrrDay30: r(mrrDay[29] ?? 0),
    mrrDay60: r(mrrDay[59] ?? 0),
    mrrEnd: r(last),
    arrEnd: r(last * 12),
    paidSpendTotal: r(cum.paidSpend),
    reinvestedFromRevenue: r(cum.reinvest),
    paidCac: cum.paidNet ? r(cum.paidSpend / cum.paidNet, 1) : null,
    netArpu: r(blended * (1 - ys * yd), 2),
    visitToPaid: r(conv, 4),
    loopVisitsImplied: conv ? r(cum.loopGross / conv) : 0,
    activatedPayers: r(cum.activated),
    netNewCashFirstPayments: r(cum.firstCash),
    previewAiCost: r(cum.previewCost),
    peakGrossPerDay: r(cum.peakGrossDay, 1),
    aiLimitNeededPerDayUsd: [
      r(cum.peakGrossDay * p.firstBuildsPerPayerDay1 * p.firstSiteBuildCostUsd.median),
      r(cum.peakGrossDay * p.firstBuildsPerPayerDay1 * p.firstSiteBuildCostUsd.worst),
    ],
    monthlyContributionEnd: r(activePrev * PLAN_KEYS.reduce((a, k) => a + p.planMix[k] * p.contributionPerSubMonth[k], 0)),
  };
  return { summary, weekly, daily };
}

/** Compare a run with a scenario's referenceOutputs. Returns the keys that differ by more than tolerance. */
export function compareWithReference(s: FunnelSummary, ref: Record<string, unknown>, tolerance = 0.01) {
  const diffs: { key: string; got: number; want: number }[] = [];
  for (const [k, want] of Object.entries(ref)) {
    const got = (s as unknown as Record<string, unknown>)[k];
    if (Array.isArray(want) && Array.isArray(got)) {
      want.forEach((w, i) => {
        const g = got[i] as number;
        if (Math.abs(g - (w as number)) > Math.max(1, Math.abs(w as number) * tolerance)) diffs.push({ key: `${k}[${i}]`, got: g, want: w as number });
      });
    } else if (typeof want === 'number' && typeof got === 'number') {
      const tol = Math.max(Math.abs(want) * tolerance, want < 1 && want > -1 ? 0.002 : 1);
      if (Math.abs(got - want) > tol) diffs.push({ key: k, got, want });
    }
  }
  return diffs;
}

/** Scale factor on a chosen input that makes day-91 ARR reach the target (bisection). */
export function solveForArr(base: FunnelInputs, apply: (p: FunnelInputs, f: number) => FunnelInputs, target = 1_000_000, maxFactor = 50) {
  const arr = (f: number) => runFunnel(apply(base, f)).summary.arrEnd;
  if (arr(1) >= target) return 1;
  if (arr(maxFactor) < target) return null;
  let lo = 1;
  let hi = maxFactor;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (arr(mid) >= target) hi = mid;
    else lo = mid;
  }
  return hi;
}

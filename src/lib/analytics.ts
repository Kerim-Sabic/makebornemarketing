// Analytics on the logged actuals: funnel, MRR cohorts, CAC and payback, content ranking, the weekly scorecard and
// the plan's kill / scale rules. Pure functions; the Analytics page only renders what these return.
import type { ActualEntry, Checkpoint, Kpis } from './types';
import type { SpendEntry } from './stores';
import { acquisition, aggregate, cac, contentIdsIn, netPaid, sourceVerdict, type Agg } from './actuals';
import { addDays, diffDays, planWeek, WINDOW_START } from './util';
import { Book } from './cohorts';
import { GUARD, PLAN_RATES, contributionForStudioShare, priceForStudioShare } from './planRates';
import type { Analysis } from './forecast';

export type Rag = 'green' | 'amber' | 'red' | 'grey';
export const RAG_LABEL: Record<Rag, string> = { green: 'On track', amber: 'Watch', red: 'Act', grey: 'Not logged' };
export const ragTone = (r: Rag) => (r === 'green' ? 'good' : r === 'amber' ? 'warn' : r === 'red' ? 'bad' : 'muted') as 'good' | 'warn' | 'bad' | 'muted';

/** Higher is better: green at or above target, amber from `amber` × target. */
export const ragAtLeast = (v: number | null | undefined, target: number, amber = 0.8): Rag => (v == null || !Number.isFinite(v) ? 'grey' : v >= target ? 'green' : v >= target * amber ? 'amber' : 'red');
/** Lower is better: green at or below `max`, amber up to `redAbove`. */
export const ragAtMost = (v: number | null | undefined, max: number, redAbove: number): Rag => (v == null || Number.isNaN(v) ? 'grey' : v <= max ? 'green' : v <= redAbove ? 'amber' : 'red');

export const weekRows = (entries: ActualEntry[], week: number) => entries.filter((e) => planWeek(e.date) === week);

/**
 * Rows of every channel that has had paid spend. Blended paid CAC divides all of that spend by all of those
 * channels' net payers: payers often land on days with no payment, so counting only spend days undercounts them.
 */
export function paidChannelRows(entries: ActualEntry[], within: ActualEntry[] = entries) {
  const paid = new Set(acquisition(entries).filter((e) => (e.spend ?? 0) > 0).map((e) => e.channel));
  return acquisition(within).filter((e) => paid.has(e.channel));
}

/* ---------- funnel ---------- */

export interface FunnelStep {
  id: 'visits' | 'signups' | 'checkouts' | 'paid' | 'activated';
  label: string;
  count: number | null;
  rate: number | null; // from the previous step, over rows that logged both
  target: number | null;
  rateLabel: string;
  rag: Rag;
}

/** Sum of `num` over `den` across rows where both are logged (unknown is never counted as zero). */
function paired(rows: ActualEntry[], num: (e: ActualEntry) => number | null | undefined, den: (e: ActualEntry) => number | null | undefined) {
  let n = 0;
  let d = 0;
  for (const e of rows) {
    const a = num(e);
    const b = den(e);
    if (a == null || b == null) continue;
    n += a;
    d += b;
  }
  return d > 0 ? n / d : null;
}
const total = (rows: ActualEntry[], f: (e: ActualEntry) => number | null | undefined) => {
  let s = 0;
  let any = false;
  for (const e of rows) {
    const v = f(e);
    if (v != null) {
      s += v;
      any = true;
    }
  }
  return any ? s : null;
};

export function funnelSteps(rows: ActualEntry[]): { steps: FunnelStep[]; visitToPaid: number | null; visitToPaidRag: Rag } {
  const acq = acquisition(rows);
  const R = PLAN_RATES;
  const hasCheckout = acq.some((e) => e.checkouts != null);
  const actTargetNum = acq.reduce((s, e) => s + Math.max(0, (e.paid ?? 0) - (e.refunds ?? 0)) * R.activation(planWeek(e.date)), 0);
  const actTargetDen = acq.reduce((s, e) => s + Math.max(0, (e.paid ?? 0) - (e.refunds ?? 0)), 0);
  const actTarget = actTargetDen > 0 ? actTargetNum / actTargetDen : R.activation(1);
  const signupRate = paired(acq, (e) => e.signups, (e) => e.clicks);
  const checkoutRate = paired(acq, (e) => e.checkouts, (e) => e.signups);
  const paidRate = hasCheckout ? paired(acq, (e) => e.paid, (e) => e.checkouts) : paired(acq, (e) => e.paid, (e) => e.signups);
  const paidTarget = hasCheckout ? R.checkoutToPaidRate : R.checkoutOpenRate * R.checkoutToPaidRate;
  const actRate = paired(acq, (e) => (e.activated == null ? null : e.activated), (e) => (e.activated == null || e.paid == null ? null : Math.max(0, e.paid - (e.refunds ?? 0))));
  const steps: FunnelStep[] = [
    { id: 'visits', label: 'Visits (/go/ clicks)', count: total(acq, (e) => e.clicks), rate: null, target: null, rateLabel: '', rag: 'grey' },
    { id: 'signups', label: 'Sign-ups', count: total(acq, (e) => e.signups), rate: signupRate, target: R.signupRate, rateLabel: 'of visits', rag: ragAtLeast(signupRate, R.signupRate) },
    { id: 'checkouts', label: 'Checkout opened', count: total(acq, (e) => e.checkouts), rate: checkoutRate, target: R.checkoutOpenRate, rateLabel: 'of sign-ups', rag: ragAtLeast(checkoutRate, R.checkoutOpenRate) },
    { id: 'paid', label: 'Paid (gross)', count: total(acq, (e) => e.paid), rate: paidRate, target: paidTarget, rateLabel: hasCheckout ? 'of checkouts' : 'of sign-ups (checkouts not logged)', rag: ragAtLeast(paidRate, paidTarget) },
    { id: 'activated', label: 'Activated payers', count: total(acq, (e) => e.activated), rate: actRate, target: actTarget, rateLabel: 'of net payers', rag: ragAtLeast(actRate, actTarget, 0.85) },
  ];
  const visitToPaid = paired(acq, (e) => e.paid, (e) => e.clicks);
  return { steps, visitToPaid, visitToPaidRag: visitToPaid == null ? 'grey' : visitToPaid >= R.visitToPaid ? 'green' : visitToPaid >= GUARD.offerCheckMin ? 'amber' : 'red' };
}

/* ---------- MRR: new, churned and net by week ---------- */

export interface MrrWeek { week: number; newMrr: number | null; churnedMrr: number | null; netMrr: number | null; snapshot: number | null; active: number | null }

export function mrrByWeek(entries: ActualEntry[], snaps: { date: string; mrr: number }[], a: Analysis, asOf: string, weeks = 13): MrrWeek[] {
  const churn = a.est.churn.value;
  const ys = a.est.yearlyShare.value;
  const yd = PLAN_RATES.yearlyDiscount;
  const price = priceForStudioShare(a.est.studioShare.value);
  const perNew = (1 - ys) * price + ys * price * (1 - yd);
  const byDay = new Map<string, number>();
  for (const e of acquisition(entries)) if (e.date >= WINDOW_START) byDay.set(e.date, (byDay.get(e.date) ?? 0) + (e.paid ?? 0) - (e.refunds ?? 0));
  const book = new Book(weeks * 7 + 1);
  const out: MrrWeek[] = [];
  const lastDay = Math.min(weeks * 7 - 1, diffDays(asOf, WINDOW_START));
  for (let w = 0; w < weeks; w++) {
    if (w * 7 > lastDay) {
      out.push({ week: w + 1, newMrr: null, churnedMrr: null, netMrr: null, snapshot: null, active: null });
      continue;
    }
    let nw = 0;
    let ch = 0;
    for (let i = w * 7; i < Math.min((w + 1) * 7, lastDay + 1); i++) {
      ch += book.renew(i, churn).lost * price;
      const net = byDay.get(addDays(WINDOW_START, i)) ?? 0;
      book.add(i, net, ys);
      nw += net * perNew;
    }
    const start = addDays(WINDOW_START, w * 7);
    const end = addDays(WINDOW_START, w * 7 + 6);
    const snap = snaps.filter((s) => s.date >= start && s.date <= end).sort((x, y) => x.date.localeCompare(y.date)).pop();
    out.push({ week: w + 1, newMrr: nw, churnedMrr: ch, netMrr: book.mrr(price, yd), snapshot: snap ? snap.mrr : null, active: book.active });
  }
  return out;
}

/* ---------- CAC and payback ---------- */

export interface CacRow { key: string; label: string; spend: number; spendLog: number | null; netPaid: number; cac: number | null; contribution: number; paybackMonths: number | null; studioShare: number | null; via?: string }

const studioOf = (a: Agg) => (a.paid > 0 && a.studioOrScale > 0 ? a.studioOrScale / a.paid : null);
function cacRow(key: string, label: string, a: Agg, spendOverride?: number, spendLog: number | null = null, via?: string): CacRow {
  const spend = spendOverride ?? a.spend;
  const net = netPaid(a);
  const s = studioOf(a);
  const contribution = contributionForStudioShare(s ?? PLAN_RATES.studioShare);
  const c = spend > 0 ? (net > 0 ? spend / net : Infinity) : null;
  return { key, label, spend, spendLog, netPaid: net, cac: c, contribution, paybackMonths: c != null && Number.isFinite(c) ? c / contribution : c == null ? null : Infinity, studioShare: s, via };
}

export function cacByChannel(entries: ActualEntry[]): CacRow[] {
  const map = new Map<string, ActualEntry[]>();
  for (const e of acquisition(entries)) map.set(e.channel, [...(map.get(e.channel) ?? []), e]);
  return [...map.entries()].map(([ch, rows]) => cacRow(ch, ch, aggregate(rows))).filter((r) => r.spend > 0).sort((x, y) => (x.cac ?? Infinity) - (y.cac ?? Infinity));
}

const LINE_CHANNELS: Record<string, string[]> = { directories: ['ch-directories'], creators: ['ch-creators'], 'paid-social': ['ch-boosts'], instagram: ['ch-instagram'], reserve: ['ch-creators', 'ch-boosts', 'ch-contentrewards'] };

/** By budget line: spend from the spend log (the money), net payers from rows tagged with the line, else its channel. */
export function cacByLine(entries: ActualEntry[], log: SpendEntry[], lines: { id: string; item: string; usd: number; channel: string }[]): (CacRow & { planned: number })[] {
  const acq = acquisition(entries);
  return lines
    .map((l) => {
      const tagged = acq.filter((e) => e.budgetLineId === l.id);
      const logged = log.filter((s) => s.lineId === l.id).reduce((s, x) => s + x.usd, 0);
      const spendActuals = tagged.reduce((s, e) => s + (e.spend ?? 0), 0);
      const spend = logged > 0 ? logged : spendActuals;
      let agg = aggregate(tagged);
      let via: string | undefined;
      if (netPaid(agg) <= 0 && spend > 0) {
        // Payers often land on untagged days: credit the line's channel in proportion to its share of that channel's spend.
        const chans = LINE_CHANNELS[l.channel] ?? [];
        const chRows = acq.filter((e) => chans.includes(e.channel));
        const chSpend = chRows.reduce((s, e) => s + (e.spend ?? 0), 0);
        const share = chSpend > 0 ? Math.min(1, spendActuals / chSpend) : 0;
        if (share > 0) {
          const ca = aggregate(chRows);
          agg = { ...ca, paid: ca.paid * share, refunds: ca.refunds * share, studioOrScale: ca.studioOrScale * share };
          via = `${Math.round(share * 100)}% of ${chans.join(', ')}`;
        }
      }
      return { ...cacRow(l.id, l.item, agg, spend, logged || null, via), planned: l.usd };
    })
    .filter((r) => r.spend > 0 || r.planned > 0);
}

/* ---------- content leaderboard ---------- */

export interface ContentRank { id: string; clicks: number; signups: number; paid: number; netPaid: number; rows: number }
export function contentLeaderboard(entries: ActualEntry[], by: 'signups' | 'paid' = 'signups', limit = 15): ContentRank[] {
  const m = new Map<string, ContentRank>();
  for (const e of acquisition(entries)) {
    for (const id of contentIdsIn(e.notes)) {
      const r = m.get(id) ?? { id, clicks: 0, signups: 0, paid: 0, netPaid: 0, rows: 0 };
      r.clicks += e.clicks ?? 0;
      r.signups += e.signups ?? 0;
      r.paid += e.paid ?? 0;
      r.netPaid += (e.paid ?? 0) - (e.refunds ?? 0);
      r.rows += 1;
      m.set(id, r);
    }
  }
  const key = by === 'paid' ? (r: ContentRank) => [r.paid, r.signups] : (r: ContentRank) => [r.signups, r.paid];
  return [...m.values()].sort((x, y) => key(y)[0] - key(x)[0] || key(y)[1] - key(x)[1] || x.id.localeCompare(y.id)).slice(0, limit);
}

/* ---------- weekly scorecard ---------- */

export interface ScoreItem { id: string; label: string; value: string; target: string; rag: Rag; note?: string; northStar?: boolean }

const pct = (n: number | null, d = 0) => (n == null || !Number.isFinite(n) ? '–' : `${(n * 100).toFixed(d)}%`);
const usd = (n: number | null) => (n == null ? '–' : Number.isFinite(n) ? `$${Math.round(n).toLocaleString('en-US')}` : '∞');

export function scorecard(entries: ActualEntry[], week: number, kpis: Kpis, mrrWeeks: MrrWeek[], asOf: string): ScoreItem[] {
  const t = kpis.weeklyTargets[week - 1];
  const rows = acquisition(weekRows(entries, week));
  const a = aggregate(rows);
  const weekEnd = addDays(WINDOW_START, week * 7 - 1);
  const ripe = addDays(weekEnd, 7) <= asOf; // activated is filled in 7 days after the cohort pays
  const activatedRows = rows.filter((e) => e.activated != null);
  const activated = activatedRows.length ? activatedRows.reduce((s, e) => s + (e.activated ?? 0), 0) : null;
  const items: ScoreItem[] = [];
  // The latest week whose payers are all past their 7-day activation window, for when this week cannot be read yet.
  let lastRead = '';
  if (activated == null || !ripe) {
    for (let w = week - 1; w >= 1; w--) {
      const rw = acquisition(weekRows(entries, w)).filter((e) => e.activated != null);
      if (rw.length && addDays(WINDOW_START, w * 7 + 6) <= asOf) {
        lastRead = ` Last full read: W${w}, ${rw.reduce((s, e) => s + (e.activated ?? 0), 0)} against ${kpis.weeklyTargets[w - 1].activatedPayers}.`;
        break;
      }
    }
  }
  items.push({
    id: 'north', northStar: true, label: 'Activated payers (north star)', value: activated == null ? '–' : String(activated), target: `≥ ${t.activatedPayers}`,
    rag: activated == null ? 'grey' : !ripe && activated < t.activatedPayers ? 'grey' : ragAtLeast(activated, t.activatedPayers),
    note: (activated == null ? 'Fill in "activated" 7 days after each day.' : !ripe ? 'Cohort still inside its 7-day window.' : '') + lastRead || undefined,
  });
  const refundRate = a.paid > 0 ? a.refunds / a.paid : null;
  items.push({ id: 'refunds', label: 'Refunds within 14 days', value: pct(refundRate, 1), target: '≤ 15% (brake 20% per source)', rag: refundRate == null ? 'grey' : ragAtMost(refundRate, GUARD.refundMax, GUARD.refundBrake) });
  const paidRows = paidChannelRows(entries, rows);
  const paidCac = cac(aggregate(paidRows));
  items.push({
    id: 'cac', label: 'Blended paid CAC', value: usd(paidCac), target: '≤ $50 (ceiling $120)',
    rag: paidCac == null ? 'grey' : ragAtMost(paidCac, GUARD.cacTarget, GUARD.cacSoft),
    note: paidCac == null ? 'No paid spend this week.' : netPaid(aggregate(paidRows)) < GUARD.scaleMinPayers ? 'Under 3 net payers: read with care.' : undefined,
  });
  const unknown = rows.filter((e) => e.channel === 'unknown').reduce((s, e) => s + (e.paid ?? 0), 0);
  const coverage = a.paid > 0 ? 1 - unknown / a.paid : null;
  items.push({ id: 'attribution', label: 'Attribution coverage', value: pct(coverage), target: week >= 2 ? '≥ 90%' : '≥ 90% from week 2', rag: coverage == null ? 'grey' : week < 2 ? (coverage >= 0.9 ? 'green' : 'amber') : ragAtLeast(coverage, GUARD.attributionMin, 0.89) });
  const net = netPaid(a);
  const actShare = activated != null && net > 0 ? activated / net : null;
  const actTarget = PLAN_RATES.activation(week);
  items.push({ id: 'activation', label: 'Activated share of net payers', value: pct(actShare), target: `≥ ${pct(actTarget)}`, rag: actShare == null || !ripe ? 'grey' : ragAtLeast(actShare, actTarget, 0.85) });
  const v2p = a.clicks > 0 ? a.paid / a.clicks : null;
  items.push({ id: 'v2p', label: 'Visit-to-paid', value: pct(v2p, 2), target: '1.0% base (offer check < 0.7%)', rag: v2p == null ? 'grey' : v2p >= PLAN_RATES.visitToPaid ? 'green' : v2p >= GUARD.offerCheckMin ? 'amber' : 'red' });
  items.push({ id: 'paid', label: 'Gross paid vs target', value: rows.length ? String(a.paid) : '–', target: String(t.paid), rag: rows.length ? ragAtLeast(a.paid, t.paid) : 'grey' });
  const mw = mrrWeeks[week - 1];
  const mrr = mw?.snapshot ?? mw?.netMrr ?? null;
  const prev = mrrWeeks[week - 2];
  const prevBelow = prev && (prev.snapshot ?? prev.netMrr) != null && (prev.snapshot ?? prev.netMrr)! < kpis.weeklyTargets[week - 2].mrr * GUARD.mrrAlertShare;
  items.push({
    id: 'mrr', label: 'MRR vs weekly target', value: mrr == null || !rows.length ? '–' : usd(mrr), target: usd(t.mrr), rag: mrr == null || !rows.length ? 'grey' : ragAtLeast(mrr, t.mrr),
    note: mrr != null && rows.length && mrr < t.mrr * GUARD.mrrAlertShare && prevBelow ? 'Under 80% two Sundays in a row: re-forecast.' : mw?.snapshot != null ? 'Whop snapshot.' : 'Modelled from logged payers.',
  });
  items.push({ id: 'firstBuild', label: 'First build within 10 minutes', value: '–', target: '≥ 90% of payers', rag: 'grey', note: 'Not in the actuals log: read it from the app.' });
  items.push({ id: 'support', label: 'Support first reply', value: '–', target: '≤ 4 h', rag: 'grey', note: 'Not in the actuals log: read it from the support inbox.' });
  return items;
}

/* ---------- kill / scale: what to do this week ---------- */

export interface Action { tone: 'good' | 'warn' | 'bad' | 'muted'; verb: string; text: string }

export function weekActions(entries: ActualEntry[], log: SpendEntry[], asOf: string, checkpoints: Checkpoint[], a: Analysis): { actions: Action[]; reinvest: { share: number; amount: number; base: number; why: string }; due: Checkpoint[] } {
  const acq = acquisition(entries).filter((e) => e.date <= asOf);
  const actions: Action[] = [];
  const byCh = new Map<string, ActualEntry[]>();
  for (const e of acq) byCh.set(e.channel, [...(byCh.get(e.channel) ?? []), e]);

  for (const [ch, rows] of byCh) {
    const g = aggregate(rows);
    const braked = g.paid >= 3 && g.refunds / g.paid > GUARD.refundBrake;
    if (g.spend <= 0) {
      // Organic sources have nothing to pause, but a refund rate over the brake is still worth reading (5+ buyers).
      if (braked && g.paid >= 5 && ch !== 'unknown') actions.push({ tone: 'warn', verb: 'Read refunds', text: `${ch}: ${g.refunds} of ${g.paid} buyers refunded (${Math.round((g.refunds / g.paid) * 100)}%, brake at 20%). Check the posts' promises against the product.` });
      continue;
    }
    const v = sourceVerdict(g);
    const k = cac(g);
    const net = netPaid(g);
    if (v.label.startsWith('Pause')) actions.push({ tone: 'bad', verb: 'Pause', text: `${ch}: ${g.refunds} of ${g.paid} buyers refunded (${Math.round((g.refunds / g.paid) * 100)}%, brake at 20%).${ch === 'ch-creators' ? ' Re-brief or drop the creator.' : ''}` });
    else if (v.label.startsWith('Kill')) actions.push({ tone: 'bad', verb: 'Kill', text: `${ch}: $${Math.round(g.spend)} spent with ${net} net payer${net === 1 ? '' : 's'}.` });
    else if (k != null && Number.isFinite(k) && k > GUARD.cacCeiling) actions.push({ tone: 'bad', verb: 'Stop', text: `${ch}: CAC $${Math.round(k)} is over the $120 ceiling.` });
    else if (v.label.startsWith('Scale')) actions.push({ tone: 'good', verb: 'Scale', text: `${ch}: CAC $${Math.round(k!)} on ${net} net payers. Raise by 20-30% at most every 48-72 h.` });
    else if (v.label.startsWith('Keep')) actions.push({ tone: 'good', verb: 'Keep', text: `${ch}: CAC $${Math.round(k!)} is on target but ${net} net payer${net === 1 ? '' : 's'} is too few to scale (needs 3).` });
    else if (g.spend > 0) actions.push({ tone: 'warn', verb: 'Watch', text: `${ch}: $${Math.round(g.spend)} spent, ${net} net payer${net === 1 ? '' : 's'}${k != null && Number.isFinite(k) ? `, CAC $${Math.round(k)}` : ''}. Kill at $100 with 0 or $150 with 1.` });
    if (ch === 'ch-boosts' && g.spend >= GUARD.boostReadUsd) {
      const ctr = g.impressions > 0 ? g.clicks / g.impressions : null;
      const cpc = g.clicks > 0 ? g.spend / g.clicks : null;
      if (ctr != null && ctr < GUARD.boostMinCtr) actions.push({ tone: 'bad', verb: 'Stop boost', text: `link CTR ${(ctr * 100).toFixed(2)}% after $${Math.round(g.spend)} (rule: under 0.5% after $30-50).` });
      if (cpc != null && cpc > GUARD.boostMaxCpc) actions.push({ tone: 'bad', verb: 'Stop boost', text: `CPC $${cpc.toFixed(2)} (rule: over $2).` });
    }
    if (ch === 'ch-creators' && g.spend > 0) {
      const per = net > 0 ? g.spend / net : Infinity;
      actions.push(per <= GUARD.creatorRehireUsdPerPayer ? { tone: 'good', verb: 'Rehire', text: `creators: $${Math.round(per)} per net payer meets the 1-per-$40 rehire rule. Rehire the lowest-CAC creator from the reserve.` } : { tone: 'warn', verb: 'No rehire yet', text: `creators: ${Number.isFinite(per) ? `$${Math.round(per)} per net payer, above the 1-per-$40 rehire rule` : `$${Math.round(g.spend)} spent and no net payers yet`}. Judge each creator 14 days after video 2.` });
    }
  }

  // Overall guardrails over the last 7 days.
  const last7 = acq.filter((e) => e.date > addDays(asOf, -7));
  const l7 = aggregate(last7);
  if (l7.paid >= 5 && l7.refunds / l7.paid > GUARD.refundMax) actions.push({ tone: 'bad', verb: 'Refunds', text: `${Math.round((l7.refunds / l7.paid) * 100)}% over the last 7 days (guardrail 15%). Read every refund reason and check copy for overclaims.` });
  const unk = last7.filter((e) => e.channel === 'unknown').reduce((s, e) => s + (e.paid ?? 0), 0);
  if (planWeek(asOf) >= 2 && l7.paid >= 5 && 1 - unk / l7.paid < GUARD.attributionMin) actions.push({ tone: 'bad', verb: 'Freeze', text: `new creator payments and boosts: only ${Math.round((1 - unk / l7.paid) * 100)}% of last week's payers have a known source (needs 90%).` });
  const v2p = l7.clicks > 0 ? l7.paid / l7.clicks : null;
  if (v2p != null && l7.clicks >= 500 && v2p < GUARD.offerCheckMin) actions.push({ tone: 'bad', verb: 'Change the offer', text: `visit-to-paid is ${(v2p * 100).toFixed(2)}% (D2 trigger under 0.7%). Owner decisions D1 / D2 before buying more views.` });

  // D4 reinvestment: 30% of last week's net new cash at blended CAC <= $50, 10% up to $62.50, else 0.
  const paidAll = aggregate(paidChannelRows(acq));
  const blended = cac(paidAll);
  const anyQualifies = [...byCh.values()].some((rows) => {
    const g = aggregate(rows);
    const k = cac(g);
    return k != null && Number.isFinite(k) && k <= GUARD.cacTarget && netPaid(g) >= GUARD.scaleMinPayers;
  });
  const perPayer = l7.paid > 0 ? l7.revenue / l7.paid : priceForStudioShare(a.est.studioShare.value);
  const cash = Math.max(0, (l7.revenue - l7.refunds * perPayer) * (1 - GUARD.feePct) - netPaid(l7) * GUARD.feeFixed);
  let share = 0;
  let why = 'No source has 3+ net payers at ≤ $50 CAC yet, so D4 releases nothing.';
  if (planWeek(asOf) < 3) why = 'D4 starts on the Monday of week 3 at the earliest.';
  else if (anyQualifies && blended != null && blended <= GUARD.cacTarget) {
    share = GUARD.reinvestShare;
    why = `Blended paid CAC $${Math.round(blended)} is at or under $50: 30% into sources at or under target.`;
  } else if (anyQualifies && blended != null && blended <= GUARD.cacSoft) {
    share = GUARD.reinvestReduced;
    why = `Blended paid CAC $${Math.round(blended)} is within 25% of target: 10% only.`;
  } else if (anyQualifies) why = 'A source qualifies, but blended CAC is above $62.50: 0% this week.';
  const reinvest = { share, amount: cash * share, base: cash, why };
  if (share > 0) actions.push({ tone: 'good', verb: 'Reinvest', text: `$${Math.round(cash * share)} on Monday (${share * 100}% of about $${Math.round(cash)} net new cash last 7 days).` });

  const spentLog = log.filter((s) => s.date <= asOf).reduce((s, x) => s + x.usd, 0);
  if (spentLog > 0 && acq.reduce((s, e) => s + (e.spend ?? 0), 0) === 0) actions.push({ tone: 'warn', verb: 'Log spend', text: `$${Math.round(spentLog)} in the spend log but no spend on any actuals row: CAC cannot be read by channel.` });

  const due = checkpoints.filter((c) => c.date >= asOf && c.date <= addDays(asOf, 6));
  const cum = acq.reduce((s, e) => s + (e.paid ?? 0), 0);
  for (const c of due) {
    if (c.date === '2026-11-22') actions.push({ tone: cum >= 100 ? 'good' : 'warn', verb: 'Re-forecast gate', text: `${cum} cumulative gross payers so far: ${cum < 100 ? 'plan on the low-to-base band and protect margin' : cum < 200 ? 'plan on base' : 'the high or breakout path is live: raise reinvestment and AI capacity'}.` });
    else if (c.date === '2026-12-20') actions.push({ tone: cum >= 750 ? 'good' : 'warn', verb: 'Breakout check', text: `${cum} of about 750 cumulative gross payers. ${cum < 750 ? 'If it stays short, drop the $1M expectation in writing and optimise for base.' : 'On the $1M path.'}` });
    else actions.push({ tone: 'muted', verb: c.date === asOf ? 'Today' : 'Due', text: `${c.title} (${c.date}).` });
  }
  if (!actions.length) actions.push({ tone: 'muted', verb: 'Hold course', text: 'no kill, scale or guardrail rule fires on the logged data.' });
  const order = { bad: 0, warn: 1, good: 2, muted: 3 };
  actions.sort((x, y) => order[x.tone] - order[y.tone]);
  return { actions, reinvest, due };
}

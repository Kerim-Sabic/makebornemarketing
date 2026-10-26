import type { ActualEntry, ActualsFile } from './types';
import { isIsoDate, parseCsv, planWeek, sum, toCsv } from './util';
import template from '../../data/actuals.template.json';

export const ACTUALS_TEMPLATE = template as unknown as ActualsFile;
export const CHANNELS = ACTUALS_TEMPLATE.channels;
export const BUDGET_LINE_IDS = ACTUALS_TEMPLATE.budgetLineIds;

export const NUMERIC_FIELDS = ['spend', 'impressions', 'views', 'clicks', 'signups', 'paid', 'revenue', 'refunds', 'activated', 'studioOrScale', 'checkouts'] as const;
export type NumericField = (typeof NUMERIC_FIELDS)[number];
export const CSV_HEADER = ['date', 'channel', 'spend', 'impressions', 'views', 'clicks', 'signups', 'paid', 'revenue', 'notes', 'campaign', 'budgetLineId', 'refunds', 'activated', 'studioOrScale', 'checkouts'];

const parseNum = (v: unknown): number | null => {
  if (v === null || v === undefined || v === '') return null;
  const n = typeof v === 'number' ? v : Number(String(v).replace(/[$,\s]/g, ''));
  return Number.isFinite(n) ? n : null;
};
const MONEY_FIELDS = new Set(['spend', 'revenue']);
const str = (v: unknown) => (v == null ? '' : String(v).trim());

/**
 * Validate and normalise one entry. Returns null (with a reason) when it cannot be used, and a warning for
 * every value it had to drop or change: negative numbers, fractional counts, unknown channels or budget lines.
 */
export function normaliseEntry(input: unknown): { entry: ActualEntry | null; error?: string; warnings: string[] } {
  const warnings: string[] = [];
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { entry: null, error: 'not an object', warnings };
  const raw = input as Record<string, unknown>;
  const num = (k: string, v: unknown): number | null => {
    const n = parseNum(v);
    if (n == null) {
      if (v !== null && v !== undefined && v !== '') warnings.push(`${k} "${String(v)}" is not a number (left empty)`);
      return null;
    }
    if (n < 0) {
      warnings.push(`${k} ${n} is negative (left empty)`);
      return null;
    }
    if (!MONEY_FIELDS.has(k) && !Number.isInteger(n)) {
      warnings.push(`${k} ${n} is not a whole number (left empty)`);
      return null;
    }
    return n;
  };
  const opt = (raw.optional && typeof raw.optional === 'object' ? raw.optional : {}) as Record<string, unknown>;
  const pick = (k: string) => (raw[k] !== undefined ? raw[k] : opt[k]);
  const date = str(raw.date);
  if (!isIsoDate(date)) return { entry: null, error: `bad date "${date}"`, warnings };
  let channel = str(raw.channel) || 'unknown';
  if (!CHANNELS.includes(channel)) {
    warnings.push(`channel "${channel}" is not a plan channel (logged as unknown)`);
    channel = 'unknown';
  }
  let budgetLineId = str(pick('budgetLineId')) || null;
  if (budgetLineId && !BUDGET_LINE_IDS.includes(budgetLineId)) {
    warnings.push(`budget line "${budgetLineId}" does not exist (left empty)`);
    budgetLineId = null;
  }
  const entry: ActualEntry = {
    date,
    channel,
    spend: num('spend', raw.spend),
    impressions: num('impressions', raw.impressions),
    views: num('views', raw.views),
    clicks: num('clicks', raw.clicks),
    signups: num('signups', raw.signups),
    paid: num('paid', raw.paid),
    revenue: num('revenue', raw.revenue),
    notes: str(raw.notes),
    campaign: str(pick('campaign')) || null,
    budgetLineId,
    refunds: num('refunds', pick('refunds')),
    activated: num('activated', pick('activated')),
    studioOrScale: num('studioOrScale', pick('studioOrScale')),
    checkouts: num('checkouts', pick('checkouts')),
  };
  return { entry, warnings };
}

export function parseActualsText(text: string, filename: string): { entries: ActualEntry[]; mrr: { date: string; mrr: number }[]; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const entries: ActualEntry[] = [];
  let mrr: { date: string; mrr: number }[] = [];
  const isJson = /\.json$/i.test(filename) || /^\s*[[{]/.test(text);
  if (isJson) {
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return { entries, mrr, errors: [`Not valid JSON: ${(e as Error).message}`], warnings };
    }
    const list = Array.isArray(data) ? data : (data as ActualsFile)?.entries;
    if (!Array.isArray(list)) return { entries, mrr, errors: ['JSON needs an "entries" array (the actuals.template.json shape) or a plain array of entries.'], warnings };
    list.forEach((r, i) => {
      const { entry, error, warnings: w } = normaliseEntry(r);
      if (entry) entries.push(entry);
      else errors.push(`entry ${i + 1}: ${error}`);
      w.forEach((x) => warnings.push(`entry ${i + 1}: ${x}`));
    });
    const snaps = (data as ActualsFile)?.mrrSnapshots;
    if (Array.isArray(snaps)) {
      const ok = snaps.filter((s) => s && typeof s === 'object' && isIsoDate(String(s.date)) && Number.isFinite(Number(s.mrr)) && Number(s.mrr) >= 0);
      if (ok.length < snaps.length) warnings.push(`${snaps.length - ok.length} MRR snapshot(s) skipped (bad date or negative value)`);
      mrr = ok.map((s) => ({ date: s.date, mrr: Number(s.mrr) }));
    }
  } else {
    const rows = parseCsv(text);
    if (!rows.length) return { entries, mrr, errors: ['Empty CSV'], warnings };
    const header = rows[0].map((h) => h.trim());
    if (!header.includes('date') || !header.includes('channel')) return { entries, mrr, errors: ['CSV needs at least "date" and "channel" columns.'], warnings };
    rows.slice(1).forEach((r, i) => {
      const obj: Record<string, unknown> = {};
      header.forEach((h, j) => (obj[h] = r[j]));
      const { entry, error, warnings: w } = normaliseEntry(obj);
      if (entry) entries.push(entry);
      else errors.push(`row ${i + 2}: ${error}`);
      w.forEach((x) => warnings.push(`row ${i + 2}: ${x}`));
    });
  }
  return { entries, mrr, errors, warnings };
}

export const entryKey = (e: ActualEntry) => `${e.date}|${e.channel}|${e.campaign ?? ''}|${e.budgetLineId ?? ''}`;

/** Merge imported rows: same date + channel + campaign + budget line replaces the old row. */
export function mergeEntries(current: ActualEntry[], incoming: ActualEntry[]) {
  const map = new Map(current.map((e) => [entryKey(e), e]));
  for (const e of incoming) map.set(entryKey(e), e);
  return [...map.values()].sort((a, b) => a.date.localeCompare(b.date) || a.channel.localeCompare(b.channel));
}

export function toActualsJson(entries: ActualEntry[], mrr: { date: string; mrr: number }[]) {
  const file: ActualsFile = {
    ...ACTUALS_TEMPLATE,
    meta: { ...ACTUALS_TEMPLATE.meta, exportedAt: new Date().toISOString(), exportedFrom: 'Makeborne war room (browser localStorage)' },
    entries: entries.map((e) => ({ ...e })),
    mrrSnapshots: mrr,
  };
  return JSON.stringify(file, null, 2);
}

export function toActualsCsv(entries: ActualEntry[]) {
  return toCsv(
    CSV_HEADER,
    entries.map((e) => CSV_HEADER.map((h) => (e as unknown as Record<string, string | number | null>)[h] ?? null)),
  );
}

/* ---------- aggregation ---------- */

export interface Agg {
  spend: number; impressions: number; views: number; clicks: number; signups: number; paid: number;
  revenue: number; refunds: number; activated: number; studioOrScale: number; checkouts: number; rows: number;
}
export const emptyAgg = (): Agg => ({ spend: 0, impressions: 0, views: 0, clicks: 0, signups: 0, paid: 0, revenue: 0, refunds: 0, activated: 0, studioOrScale: 0, checkouts: 0, rows: 0 });

export function aggregate(entries: ActualEntry[]): Agg {
  const a = emptyAgg();
  for (const e of entries) {
    a.spend += e.spend ?? 0;
    a.impressions += e.impressions ?? 0;
    a.views += e.views ?? 0;
    a.clicks += e.clicks ?? 0;
    a.signups += e.signups ?? 0;
    a.paid += e.paid ?? 0;
    a.revenue += e.revenue ?? 0;
    a.refunds += e.refunds ?? 0;
    a.activated += e.activated ?? 0;
    a.studioOrScale += e.studioOrScale ?? 0;
    a.checkouts += e.checkouts ?? 0;
    a.rows += 1;
  }
  return a;
}

/** New-customer rows only: renewals are logged as their own channel and are not acquisition. */
export const acquisition = (entries: ActualEntry[]) => entries.filter((e) => e.channel !== 'renewals');

export function byWeek(entries: ActualEntry[], weeks = 13) {
  const out: Agg[] = Array.from({ length: weeks }, emptyAgg);
  for (const e of acquisition(entries)) {
    const w = planWeek(e.date);
    if (w >= 1 && w <= weeks) {
      const a = aggregate([e]);
      const t = out[w - 1];
      (Object.keys(a) as (keyof Agg)[]).forEach((k) => (t[k] += a[k]));
    }
  }
  return out;
}

export function byChannel(entries: ActualEntry[]) {
  const map = new Map<string, ActualEntry[]>();
  for (const e of entries) map.set(e.channel, [...(map.get(e.channel) ?? []), e]);
  return [...map.entries()].map(([channel, rows]) => ({ channel, ...aggregate(rows) }));
}

export const netPaid = (a: Agg) => a.paid - a.refunds;
export const cac = (a: Agg) => (a.spend > 0 ? (netPaid(a) > 0 ? a.spend / netPaid(a) : Infinity) : null);

/** Apply the plan's kill / scale / refund-brake rules (strategy 6.3) to one source. */
export function sourceVerdict(a: Agg): { label: string; tone: 'good' | 'warn' | 'bad' | 'muted' } {
  const net = netPaid(a);
  if (a.paid >= 3 && a.refunds / a.paid > 0.2) return { label: 'Pause: refund brake (>20%)', tone: 'bad' };
  if (a.spend >= 150 && net <= 1) return { label: 'Kill: $150+ with ≤1 net payer', tone: 'bad' };
  if (a.spend >= 100 && net === 0) return { label: 'Kill: $100+ with 0 net payers', tone: 'bad' };
  const c = cac(a);
  if (c != null && Number.isFinite(c) && c > 120) return { label: 'Over the $120 ceiling', tone: 'bad' };
  if (c != null && net >= 3 && c <= 50) return { label: 'Scale: CAC ≤ $50 on 3+', tone: 'good' };
  if (c != null && Number.isFinite(c) && c <= 50) return { label: 'Keep: on target, too few to scale', tone: 'good' };
  if (c != null && Number.isFinite(c) && c <= 62.5) return { label: 'Watch: within 25% of target', tone: 'warn' };
  if (a.spend === 0) return { label: 'Organic', tone: 'muted' };
  return { label: 'Watch', tone: 'warn' };
}

/** Find content ids (V01, C12) or /go/ codes (tt-v01-l1 → V01) in an entry's notes. */
export function contentIdsIn(notes: string): string[] {
  const ids = new Set<string>();
  for (const m of notes.matchAll(/\b([VC])(\d{2})\b/gi)) ids.add(`${m[1].toUpperCase()}${m[2]}`);
  for (const m of notes.matchAll(/\b[a-z]{1,3}-([vc])(\d{2})\b/gi)) ids.add(`${m[1].toUpperCase()}${m[2]}`);
  return [...ids];
}

export const totalOf = (entries: ActualEntry[], k: keyof Agg) => sum(entries.map((e) => (e as unknown as Record<string, number | null>)[k]));

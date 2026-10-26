// SAMPLE data for the empty state: 28 invented days (26 Oct - 22 Nov 2026), generated in memory from a fixed seed.
// It is never written to localStorage, never exported and never merged with logged rows.
import type { ActualEntry } from './types';
import type { SpendEntry } from './stores';
import { addDays, WINDOW_START } from './util';
import { mulberry32, gaussian } from './forecast';
import { planBase } from './planRates';

export const SAMPLE_DAYS = 28;
export const SAMPLE_AS_OF = addDays(WINDOW_START, SAMPLE_DAYS - 1); // Sun 22 Nov 2026

const SHARES: [string, number, number][] = [
  // channel, share of organic visits, visit-to-paid
  ['ch-tiktok', 0.3, 0.0085],
  ['ch-instagram', 0.2, 0.009],
  ['ch-linkedin', 0.14, 0.013],
  ['ch-x', 0.07, 0.007],
  ['ch-youtube', 0.06, 0.01],
  ['ch-directories', 0.08, 0.008],
  ['ch-community', 0.05, 0.011],
  ['ch-search', 0.05, 0.012],
  ['ch-press', 0.05, 0.006],
];
const CODES: Record<string, string> = { 'ch-tiktok': 'tt', 'ch-instagram': 'ig', 'ch-youtube': 'yt', 'ch-linkedin': 'li', 'ch-x': 'x' };
const WEEK_CONTENT = [
  ['V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07', 'V08'],
  ['V11', 'V12', 'V13', 'V14', 'V16', 'V29', 'V30', 'V31'],
  ['V17', 'V19', 'V20', 'V21', 'V22', 'V23', 'V27', 'V32'],
  ['V45', 'V49', 'V50', 'V51', 'V52', 'V53', 'V54', 'V55'],
];

let cache: { entries: ActualEntry[]; spend: SpendEntry[]; snaps: { date: string; mrr: number }[] } | null = null;

export function sampleData() {
  if (cache) return cache;
  const rng = mulberry32(7);
  const pois = (lambda: number) => {
    // Knuth for small means, normal approximation above 30.
    if (lambda <= 0) return 0;
    if (lambda > 30) return Math.max(0, Math.round(lambda + Math.sqrt(lambda) * gaussian(rng)));
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k++;
      p *= rng();
    } while (p > L);
    return k - 1;
  };
  const binom = (n: number, q: number) => {
    let k = 0;
    for (let i = 0; i < n; i++) if (rng() < q) k++;
    return k;
  };
  const noise = (sd: number) => Math.exp(sd * gaussian(rng));
  const revenueFor = (paid: number, studio: number) => {
    let r = 0;
    for (let i = 0; i < paid; i++) {
      const monthly = i < studio ? (rng() < 0.78 ? 49 : 99) : 20;
      r += rng() < 0.15 ? monthly * 12 * 0.8 : monthly;
    }
    return r;
  };
  const plan = planBase().daily;
  const entries: ActualEntry[] = [];
  const last = SAMPLE_AS_OF;
  const row = (date: string, channel: string, v: Partial<ActualEntry>): ActualEntry => ({
    date, channel, spend: null, impressions: null, views: null, clicks: null, signups: null, paid: null, revenue: null, notes: '',
    campaign: 'launch-2026-10', budgetLineId: null, refunds: null, activated: null, studioOrScale: null, checkouts: null, ...v,
  });
  const finish = (date: string, clicks: number, conv: number, studioQ: number, extra: Partial<ActualEntry>) => {
    const signups = Math.round(clicks * 0.05 * noise(0.15));
    const paid = pois(clicks * conv);
    const refunds = binom(paid, 0.13);
    const studio = binom(paid, studioQ);
    const ripe = date <= addDays(last, -7);
    return {
      clicks, signups, checkouts: Math.min(signups, Math.round(signups * 0.58 * noise(0.1))), paid, refunds, studioOrScale: studio,
      revenue: paid ? revenueFor(paid, studio) : 0, activated: ripe ? binom(Math.max(0, paid - refunds), 0.63) : null, ...extra,
    } as Partial<ActualEntry>;
  };

  for (let i = 0; i < SAMPLE_DAYS; i++) {
    const date = addDays(WINDOW_START, i);
    const week = Math.floor(i / 7);
    const organic = plan[i].visits * 0.88 * noise(0.12) * (i >= 7 && i < 14 ? 1.1 : 1);
    for (const [ch, share, conv] of SHARES) {
      if (ch === 'ch-press' && i > 9) continue;
      const clicks = Math.round(organic * share * noise(0.2) * (ch === 'ch-press' ? 2.2 : 1));
      const views = Math.round((clicks * 1000) / (4 + 2 * rng()));
      const content = WEEK_CONTENT[week];
      const id = content[Math.floor(rng() * content.length)];
      const notes = CODES[ch] ? `${CODES[ch]}-${id.toLowerCase()}-l1` : ch === 'ch-directories' && i === 0 ? 'TAAFT listing live' : '';
      const v = finish(date, clicks, conv, ch === 'ch-linkedin' ? 0.62 : 0.4, { views: CODES[ch] ? views : null, notes });
      if (ch === 'ch-directories' && i === 0) Object.assign(v, { spend: 49, budgetLineId: 'b1' });
      entries.push(row(date, ch, v));
    }
    // Wave-1 creators post from 9 Nov (day 15).
    if (i >= 14) {
      const clicks = Math.round(55 * noise(0.25) * (1 + 0.04 * (i - 14)));
      const spend = date === '2026-11-09' ? 150 : date === '2026-11-20' ? 150 : date === '2026-11-16' ? 30 : null;
      const id = WEEK_CONTENT[week][Math.floor(rng() * 8)];
      entries.push(row(date, 'ch-creators', { ...finish(date, clicks, 0.016, 0.45, { views: clicks * 160, notes: `c-sample${1 + (i % 3)}, ${id}` }), spend, budgetLineId: spend ? (spend === 30 ? 'b3' : 'b2') : null }));
    }
    // Boost slot A: two days of TikTok Spark at $52.
    if (date === '2026-11-10' || date === '2026-11-11') {
      const impressions = 9800 + Math.round(400 * rng());
      const clicks = Math.round(impressions * 0.0045);
      entries.push(row(date, 'ch-boosts', { ...finish(date, clicks, 0.008, 0.4, { impressions, views: impressions, notes: 'tt-v17-l1 spark' }), spend: 52, budgetLineId: 'b5' }));
    }
    // Loops from week 2, unattributed payers every day.
    if (i >= 7) {
      const paid = pois(0.1 + 0.018 * (i - 7));
      entries.push(row(date, 'ch-loops', { clicks: Math.round(paid * 30 * noise(0.3)), signups: paid * 3, paid, refunds: binom(paid, 0.08), studioOrScale: binom(paid, 0.55), revenue: revenueFor(paid, 0), activated: date <= addDays(last, -7) ? paid : null, notes: 'review page + badge' }));
    }
    const unknownPaid = pois(0.35);
    if (unknownPaid) entries.push(row(date, 'unknown', { paid: unknownPaid, refunds: binom(unknownPaid, 0.2), revenue: revenueFor(unknownPaid, 0), notes: 'no first touch' }));
  }

  const spend: SpendEntry[] = [
    { id: 'sample-1', date: '2026-10-26', lineId: 'b1', usd: 49, note: 'SAMPLE: TAAFT listing' },
    { id: 'sample-2', date: '2026-11-09', lineId: 'b2', usd: 150, note: 'SAMPLE: wave-1 halves on signing' },
    { id: 'sample-3', date: '2026-11-09', lineId: 'b8', usd: 6, note: 'SAMPLE: transfer fees' },
    { id: 'sample-4', date: '2026-11-10', lineId: 'b5', usd: 52, note: 'SAMPLE: Spark day 1' },
    { id: 'sample-5', date: '2026-11-11', lineId: 'b5', usd: 52, note: 'SAMPLE: Spark day 2' },
    { id: 'sample-6', date: '2026-11-16', lineId: 'b3', usd: 30, note: 'SAMPLE: view bonus week 1' },
    { id: 'sample-7', date: '2026-11-20', lineId: 'b2', usd: 150, note: 'SAMPLE: wave-1 halves on delivery' },
  ];
  cache = { entries, spend, snaps: [] };
  return cache;
}

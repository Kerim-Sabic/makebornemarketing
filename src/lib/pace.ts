// "On track or not": this week's logged numbers against the plan's weekly targets (data/kpis.json),
// pro rata for the days gone. Used by the Today and Results pages.
import type { ActualEntry } from './types';
import { acquisition, aggregate, netPaid } from './actuals';
import { addDays, diffDays, planWeek, WINDOW_START } from './util';

export interface Pace {
  status: 'none' | 'on' | 'off';
  week: number;
  elapsed: number;
  paid: number;
  expectedPaid: number;
  visits: number;
  expectedVisits: number;
  net: number;
  rows: number;
  headline: string;
  detail: string;
}

export function weekPace(entries: ActualEntry[], date: string, target: { paid: number; visits: number } | null | undefined): Pace {
  const week = Math.max(1, Math.min(13, planWeek(date)));
  const weekStart = addDays(WINDOW_START, (week - 1) * 7);
  const elapsed = Math.max(1, Math.min(7, diffDays(date, weekStart) + 1));
  const rows = acquisition(entries).filter((e) => e.date >= weekStart && e.date <= date);
  const a = aggregate(rows);
  const expectedPaid = (target?.paid ?? 0) * (elapsed / 7);
  const expectedVisits = (target?.visits ?? 0) * (elapsed / 7);
  const base = { week, elapsed, paid: a.paid, expectedPaid, visits: a.clicks, expectedVisits, net: netPaid(a), rows: rows.length };
  if (!rows.length || !target)
    return { ...base, status: 'none', headline: 'No numbers yet', detail: `Log this week's numbers on Results to see if you are on track (plan: ${target?.paid ?? '–'} paying customers this week).` };
  const ratio = expectedPaid > 0 ? a.paid / expectedPaid : 1;
  const on = ratio >= 0.9;
  return {
    ...base,
    status: on ? 'on' : 'off',
    headline: on ? 'On track' : 'Not on track',
    detail: `${a.paid} paying customer${a.paid === 1 ? '' : 's'} this week; the plan expects about ${Math.round(expectedPaid)} by today (${target.paid} for the week).`,
  };
}

import planJson from '../../data/plan.json';
import funnelJson from '../../data/funnel.json';
import type { BudgetLine, Plan } from './types';

export const PLAN = planJson as unknown as Plan;
export const LINES: BudgetLine[] = PLAN.budget.lines;
export const TOTAL = PLAN.budget.total;

export const defaultAllocation = () => Object.fromEntries(LINES.map((l) => [l.id, l.usd])) as Record<string, number>;

interface ScheduleLine { lineId: string; usd: number; weeks: number[]; conditional?: boolean; note?: string }
const visitLines = (funnelJson as unknown as { defaults: { budget: { visitLines: ScheduleLine[] } } }).defaults.budget.visitLines;

/**
 * Week placement of each line, used only for the "planned by now" pace line.
 * Visit-driving lines use data/funnel.json (b2-b5, b9). The rest are our placement [E]:
 * b1 day 1, b6 on the planned images day (week 4), b7 when the DM free tier is outgrown (week 3), b8 with creator payouts (weeks 3-6).
 */
export const LINE_WEEKS: Record<string, { weeks: number[]; share: number; estimated: boolean; conditional?: boolean }[]> = (() => {
  const out: Record<string, { weeks: number[]; share: number; estimated: boolean; conditional?: boolean }[]> = {};
  for (const l of LINES) {
    const slots = visitLines.filter((v) => v.lineId === l.id);
    if (slots.length) {
      const tot = slots.reduce((a, s) => a + s.usd, 0) || 1;
      out[l.id] = slots.map((s) => ({ weeks: s.weeks, share: s.usd / tot, estimated: false, conditional: s.conditional }));
    }
  }
  out.b1 ??= [{ weeks: [1], share: 1, estimated: false }];
  out.b6 ??= [{ weeks: [4], share: 1, estimated: true }];
  out.b7 ??= [{ weeks: [3], share: 1, estimated: true }];
  out.b8 ??= [{ weeks: [3, 4, 5, 6], share: 1, estimated: true }];
  return out;
})();

/** Planned cumulative spend at the end of each week 1..13 for an allocation (the b9 reserve is excluded: it is conditional). */
export function plannedCumulative(alloc: Record<string, number>, includeReserve = false) {
  const perWeek = new Array(13).fill(0);
  for (const [id, usd] of Object.entries(alloc)) {
    for (const slot of LINE_WEEKS[id] ?? [{ weeks: [1], share: 1, estimated: true }]) {
      if (slot.conditional && !includeReserve) continue;
      const each = (usd * slot.share) / slot.weeks.length;
      for (const w of slot.weeks) if (w >= 1 && w <= 13) perWeek[w - 1] += each;
    }
  }
  let run = 0;
  return perWeek.map((v) => (run += v));
}

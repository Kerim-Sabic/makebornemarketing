import { useStored } from './util';
import type { ActualEntry } from './types';

/* Content status (per video or creative id) */
export const STATUSES = ['todo', 'filming', 'posted', 'winner'] as const;
export type Status = (typeof STATUSES)[number];
export const STATUS_LABEL: Record<Status, string> = { todo: 'To do', filming: 'Filming', posted: 'Posted', winner: 'Winner' };
export const useContentStatus = () => useStored<Record<string, Status>>('content-status', {});

/* Daily actuals (compatible with data/actuals.template.json entries) */
export const useActuals = () => useStored<ActualEntry[]>('actuals', []);
export const useMrrSnapshots = () => useStored<{ date: string; mrr: number }[]>('mrr-snapshots', []);

/* Budget */
export interface SpendEntry { id: string; date: string; lineId: string; usd: number; note: string }
export const useSpendLog = () => useStored<SpendEntry[]>('spend-log', []);
export const useAllocation = () => useStored<Record<string, number> | null>('budget-alloc', null);

/* Per-day checklists (calendar actions and the founder routine) */
export const useChecks = () => useStored<Record<string, boolean>>('checks', {});

/* The "Start here" card on Today: true once dismissed. The footer's "How to use this" link sets it back to false. */
export const START_HERE_KEY = 'start-here-hidden';

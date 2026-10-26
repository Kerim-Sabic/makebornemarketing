// The 90-day calendar split per day at build time (scripts/data-plugin.mjs): the index is tiny and
// each day's posts and actions load as their own small chunk.
import { DAYS, DAY_LOADERS } from 'virtual:war-room/calendar-index';
import type { CalendarDay } from './types';

export { DAYS };
export const FIRST_DAY = DAYS[0].date;
export const LAST_DAY = DAYS[DAYS.length - 1].date;
export const hasDay = (date: string) => date in DAY_LOADERS;

const cache = new Map<string, Promise<CalendarDay>>();
/** One cached promise per date, so React's use() sees the same thenable on every render. */
export function loadDay(date: string): Promise<CalendarDay> {
  let p = cache.get(date);
  if (!p) {
    const loader = DAY_LOADERS[date] ?? DAY_LOADERS[FIRST_DAY];
    const tracked = loader() as Promise<CalendarDay> & { status?: string; value?: CalendarDay; reason?: unknown };
    // Record the outcome on the promise the way React's use() expects, so a day that has already
    // loaded renders synchronously instead of suspending again.
    tracked.then(
      (v) => {
        tracked.status = 'fulfilled';
        tracked.value = v;
      },
      (e) => {
        tracked.status = 'rejected';
        tracked.reason = e;
        cache.delete(date); // let a later visit retry a chunk that failed to load
      },
    );
    p = tracked;
    cache.set(date, p);
  }
  return p;
}

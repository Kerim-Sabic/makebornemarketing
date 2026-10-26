// Virtual modules generated at build time by scripts/data-plugin.mjs.

declare module 'virtual:war-room/calendar-index' {
  import type { CalendarDay } from './lib/types';
  export const DAYS: { date: string; day: number; phase: string }[];
  export const DAY_LOADERS: Record<string, () => Promise<CalendarDay>>;
}

declare module 'virtual:war-room/plan-weeks' {
  import type { LaunchDayCard, WeekCard } from './lib/types';
  export const WEEKS: WeekCard[];
  export const LAUNCH_DAYS: LaunchDayCard[];
  export const IG_DECISIONS: { id: string; question: string; recommendation: string }[];
}

declare module 'virtual:war-room/production-simple' {
  import type { ProductionSimple } from './lib/types';
  export const SIMPLE: ProductionSimple;
  export const DECISIONS: { id: string; question: string; recommendation: string; deadline?: string }[];
  export const COUNTS: Record<string, number>;
}

declare module 'virtual:war-room/content-index' {
  export interface ContentMeta {
    kind: 'video' | 'creative';
    title: string;
    format?: string;
    lengthSec?: number;
    hookCode?: string;
  }
  export const CONTENT_INDEX: Record<string, ContentMeta>;
}

declare module 'virtual:war-room/docs-index' {
  export interface DocMeta {
    slug: string;
    group: 'research' | 'plan' | 'content';
    path: string;
    title: string;
    intro: string;
    words: number;
    hasVerification: boolean;
    hasSources: boolean;
  }
  export const DOC_INDEX: DocMeta[];
}

declare module 'virtual:war-room/funnel-scenarios' {
  import type { FunnelInputs } from './lib/funnelModel';
  export const SCENARIOS: { id: string; name: string; inputs: FunnelInputs; referenceOutputs: Record<string, unknown> }[];
}

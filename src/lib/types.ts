// Loose types for the plan's JSON. Only the fields the site reads are typed;
// everything else stays available as `unknown` so the owner can add fields freely.

export interface WeeklyTarget { week: number; dates: string; target: number | string }

export interface Plan {
  headline: string;
  summary: string;
  northStar: { name: string; definition: string; baseTarget: string; guardrails: string[] };
  icps: { id: string; name: string; jtbd: string; channels: string[]; message: string; plan?: string; push?: string }[];
  positioning: {
    oneLiner: string; shortFormLine: string; proofLine: string;
    pillars: string[]; proof: string[];
    objections: { objection: string; answer: string }[];
  };
  channels: { id: string; name: string; role: string; cadence: string; owner: string; kpi: string }[];
  budget: {
    total: number; currency: string; gate: string;
    lines: BudgetLine[];
    sharedRules: {
      cacTargets: { createHeavy: number; blendedStudio35plus: number; hardCeiling: number };
      killSource: string; refundBrake: string; scale: string; offerCheck: string; reinvestment: string; contentRewards: string;
    };
    outsideBudget: { item: string; usdEstimate: number | string; note?: string }[];
  };
  phases: { id: string; name: string; days: string; goals: string[]; actions: string[] }[];
  launchWeek: { day: number; date: string; weekday: string; actions: string[] }[];
  beats: { id: string; feature: string; when: string; angle: string }[];
  beatGate: string[];
  growthAsks: { id: string; ask: string; impact: string; effort: string; why: string; when?: string }[];
  kpis: { id: string; name: string; stage: string; target: string; weeklyTargets?: WeeklyTarget[] }[];
  scenarios: {
    name: string; assumptions: Record<string, unknown>;
    mrrDay30: number; mrrDay60: number; mrrDay90: number; arrDay90: number; grossPaid: number; activeDay90: number;
  }[];
  whatMustBeTrueFor1M: string[];
  risks: { risk: string; mitigation: string }[];
  decisions: { id: string; question: string; recommendation: string }[];
  routine: string[];
  meta: { window: string; dayNumbering: string; builtFrom: string[]; masterPlan: string; modelNote: string; unverified: string[] };
}

export interface BudgetLine {
  id: string; item: string; usd: number; when: string; channel: string; killRule: string; scaleRule: string;
}

export interface WeeklyKpi {
  week: number; dates: string; visits: number; signups: number; paid: number; netPaid: number;
  activatedPayers: number; cumulativeGrossPaid: number; activeSubs: number; mrr: number;
  loopSharePct: number; contentPosts: number; contentPostsRange?: string; creatorsActive: number;
  cac: number | null; cacNote?: string;
}

export interface Kpis {
  meta: Record<string, string>;
  northStar: { name: string; definition: string; baseTarget: string; guardrails: string[]; event: string; source: string };
  funnelStages: { id: string; name: string; event: string; definition: string; source: string; target: string }[];
  weeklyTargets: WeeklyKpi[];
  channelKpis: { channel: string; kpis: { name: string; target: string }[] }[];
  alerts: { metric: string; threshold: string; action: string }[];
}

export interface ScriptBeat { t: string; visual: string; onScreenText: string; voiceover: string }

export interface Video {
  id: string; title: string; format: string; platforms: string[]; icp: string; lane: string; lengthSec: number;
  hook: { line: string; visual: string };
  script: ScriptBeat[];
  cta: string; caption: string; hashtags: string[]; sound: string; shotList: string[]; assetsNeeded: string[];
  reuseExisting: string[]; effort: string; priority: string; week: number; tag: string; whyItWorks: string;
  goLinks: string[]; utm: Record<string, string>; hookCode: string; budgetLine: string | null; checks: string[];
}

export interface Creative {
  id: string; type: string; platform: string; size: string; icp: string; concept: string; headline: string;
  subcopy: string; cta: string; slides: { n: number; text: string; visual: string }[]; visualDirection: string;
  generationPrompt: string; useAs: string;
  adCopyVariants: { primary: string; headline: string; primaryChars: number; headlineChars: number }[];
  tag: string; priority: number; week: number; weekNote: string; channel: string; budgetLine: string;
  hookCode: string; goLink: string; utmContent: string; beatId: string; prerequisites: string[];
}

export interface CalendarPost {
  channel: string; account: string; contentId: string | null; time: string; notes: string; tag: string; slot: string;
  link: string; utm: Record<string, string>; episode?: number; requires?: string; fallbackContentId?: string;
}
/** Launch day: Wed 28 Oct 2026 at 19:00 CET (data/plan.json launch). */
export interface LaunchInfo { label: string; timeCet: string; utc: string; runOfShow: { time: string; text: string; how: string }[] }
export interface CalendarDay {
  date: string; day: number; weekday: string; week: number; phase: string; focus: string;
  posts: CalendarPost[]; actions: { type: string; what: string; owner: string; budgetLineId?: string }[]; kpiCheck: string;
  /** Added at build time by scripts/plan-data.mjs (todayExtras). */
  extra?: TodayExtra;
}

export interface IgKickoff {
  title: string;
  main: { time: string; contentId: string; choose?: string; format: string; keyword: string; link: string; pin?: string; cover: string; caption: string };
  checklist: string[];
  stories: { time: string; contentId?: string; template?: string; link?: string }[];
}
export interface DueAd {
  id: string; title: string; platform: string; money: string; inThe1000: boolean; trigger: string; mustEndBy: string;
  kind: 'prep' | 'run' | 'check'; day?: number; days?: number; note: string;
}
export interface MoneyItem { label: string; usd: number; line: string; card?: string; conditional: boolean }
export interface TodayExtra {
  week: number; weekday: string;
  targets: { dates: string; visits: number; signups: number; paid: number; netPaid: number; activatedPayers: number; mrr: number } | null;
  ig: IgKickoff | null;
  make: { text: string; time: string; ids: string[]; sheets: string[]; shots: HfShotCard[] }[];
  ads: DueAd[];
  money: MoneyItem[];
  posts: { title: string | null; kind: 'video' | 'creative' | null; caption: string | null; onImage: string | null; hook: string | null; cta: string | null; length: string | null; igMain: boolean; teaser?: boolean; file: PostFile | null }[];
  reminders: { date: string; time: string; group: string; text: string; how: string }[];
  beforePosting: { key: string; text: string; how: string }[];
  launch?: LaunchInfo | null;
}
/** A calendar post's finished file (data/posting.json, scripts/sync-posting.mjs); `ready: false` means "to make". */
export interface PostFile {
  ready: boolean; reason: string | null;
  files?: string[]; laterFiles?: string[]; folder?: string; cover?: string | null;
  caption?: string | null; hashtags?: string[]; captionNote?: string | null; ytTitle?: string | null;
  keyword?: string | null; disclosure?: string | null; makeUp?: { date: string; time: string } | null;
}

export interface WeekCard {
  week: number; from: string; to: string; phase: string; title: string; goal: string; sunday: string;
  actions: { date: string; type: string; what: string }[];
  make: number;
  money: { week: number; running: number; ads: number; items: { label: string; usd: number; line: string; date?: string }[]; liveCards: string[]; note: string } | null;
  targets: { visits: number; paid: number; netPaid: number; activatedPayers: number; mrr: number; activeSubs: number } | null;
  checkpoints: { date: string; title: string; approx: boolean }[];
}
export interface LaunchDayCard { day: number; date: string; weekday: string; focus: string; actions: string[]; posts: number }

/** The copyable part of one Higgsfield shot (Today's "How" panel). */
export interface HfShotCard {
  id: string; title: string; for: string[]; model: string; mode: string; cameraPreset: string; durationSec: number; aspect: string; resolution: string;
  takes: number; credits: number; prompt: string; negative: string; referenceImage: string | null; keepRule: string; gate: string | null;
}
export interface HfShot extends HfShotCard { role: string; job: string; week: number; month: number; generateOn: string; creditsPerTake: number; seed: string; label: string; conditional: boolean; fallback: string | null; file: string }
export interface AbSide { date: string; go: string; also?: { date: string; go: string } }
export interface HfPlan {
  role: string; hardRules: string[]; presets: string; everyShot: string;
  modelGuide: { job: string; model: string; why: string }[];
  totals: { shots: number; conditionalShots: number; plannedCredits90Days: number; conditionalCredits90Days: number; videosNow: number; videosGated: number; creatives: number; abPairs: number };
  mix: {
    target: string; why: string[];
    measured: { higgsfieldVideos: number; seconds: number; realSec: number; higgsfieldSec: number; hyperframesOnlySec: number; realPct: number; higgsfieldPct: number; hyperframesOnlyPct: number; wholePlanHiggsfieldPct: number; wholePlanNote: string };
    rows: { id: string; gated: boolean; lengthSec: number; realSec: number; higgsfieldSec: number; hyperframesOnlySec: number; higgsfieldPct: number }[];
  };
  abTests: { metric: string; weeklyShift: string; caveat: string; pairs: { id: string; video: string; surface: string; note: string; real: AbSide; higgsfield: AbSide }[] };
  shots: HfShot[];
}
export interface ProductionBudget {
  title: string; separateFromAdsBudget: boolean; rule: string; owner: string; logging: string;
  tier: { recommended: string; priceUSD: number; creditsPerMonth: number; priceSource: string; conflicts: string; why: string; notThis: string };
  month1: { from: string; to: string; items: { item: string; usd: number }[]; totalUSD: number; capUSD: number; capNote: string };
  credits: {
    month1: { available: number; planned: number; conditional: number; reserve: number; reserveFor: string };
    perShotRule: string;
    byWeek: { week: number; dates: string; month: number; generateOn: string | null; shots: string[]; plannedCredits: number; conditionalCredits: number }[];
    creditCosts: { model: string; credits: number; source: string }[];
  };
  month2Rule: { decideOn: string; evidence: string; keepPlus: string; downgrade: string; cancel: string; month3: string };
  ninetyDays: { plannedUSD: string; capUSD: number; note: string };
}
export interface ProductionSheets {
  videos: {
    id: string; title: string; week: number; makeWith: string; template: string; readiness: string;
    mix: { lengthSec: number; realSec: number; higgsfieldSec: number; hyperframesOnlySec: number };
    slots: { slot: string; at: string; composition: string; variables: Record<string, string> }[];
    higgsfield: { shots: string[]; seconds: number; credits: number; posts: string[]; postedAs: string; readiness: string; sections: { slot: string; shot: string; at: string; clip: string; line: string }[] } | null;
  }[];
  creatives: { id: string; title: string; week: number; makeWith: string; template: string; readiness: string; variables: Record<string, string | number>; higgsfield: { frameFrom: string; layout: string; posts: string[]; readiness: string } | null }[];
}

export interface ProductionSimple {
  howWeMakeVideos: { title: string; intro: string; ways: { name: string; share: string; covers: string; steps: string[]; time: string }[]; everythingElse: string; rules: string[]; budget?: string; mix?: string };
  weeks: { week: number; dates: string; note?: string; items: { day: string; text: string; ids: string[]; links: { sheet: string; warRoom: string }[]; hf?: string[] }[] }[];
  launchWeekLink: string;
}

/* ---------- data/ads.json ---------- */
export interface AdCard {
  id: string; order: number; inThe1000: boolean; title: string; summary: string; statusTrigger: string; earliestDate: string; mustEndBy: string;
  platform: string; toolPath: string[]; objective: string; optimization: string; bidStrategy: string; attribution: string;
  budget: { totalUsd: number | string; perDayUsd: number | string; days: number | string; budgetLine: string; note: string };
  countries: { code: string; name: string }[]; age: string; gender: string; languages: string[];
  audience: { setting: string; suggestions: string[]; exclusions: string };
  placements: { on: string[]; off: string[] };
  creative: { contentId: string; fallbackContentId: string; file: string; mustShow: string };
  copy: { primaryText: string; headline: string; ctaButton: string };
  link: { url: string; redirectsWith: string; fallbackUrl?: string; fallbackRedirectsWith?: string; creatorPostUrl?: string };
  names: Record<string, string>;
  goodAfter48h: string[]; kill: string[]; scale: string[]; warRoomLog: string[];
  fallbackIfNotAvailableFromBiH: string; checksBeforeLaunch: string[];
}
export interface AdWeek {
  week: number; from: string; to: string; summary: string; liveCards: string[]; adSpendUsd: number;
  adItems: { line: string; item: string; usd: number; card?: string; from?: string; to?: string }[];
  otherPlanSpend: { line: string; item: string; usd: number; date?: string }[];
  weekTotalUsd: number; runningTotalUsd: number; note: string;
}
export interface AdsFile {
  meta: Record<string, string>;
  sharedRules: Record<string, string>;
  adCards: AdCard[];
  adCalendar: AdWeek[];
  channelVerdicts: { channel: string; inThe1000Usd: number; verdict: string; cards: string[] }[];
  expectedRanges: Record<string, unknown>;
}

export interface Template {
  id: string; channel: string; purpose: string; audience: string;
  planRefs: { budgetLines: string[]; channels: string[]; icp: string };
  subject: string; body: string; followUp: string; rules: string[]; beat: string | null;
}

export interface Outreach {
  meta: Record<string, string>;
  compliance: {
    notLegalAdvice: string;
    email: { law: string; applies: string; requires: string; source: string; verdict: string }[];
    platforms: { platform: string; rule: string; source: string }[];
    socialDmNote: string;
  };
  templates: Template[];
  launchCopy: {
    productHunt: {
      status: string; beat: string; tagline: string; taglineAlternatives: string[]; description: string;
      liveOnlyDescription: string; comingSoonPage: { tagline: string; text: string }; firstComment: string;
      gallery: { n: number; type: string; spec: string; content: string; source: string }[];
      galleryRules: string[]; makerStory: string; rules: string[];
    };
    showHN: { status: string; earliest: string; title: string; body: string; rules: string[] };
    reddit: { subreddit: string; when: string; title: string; body: string; rulesNote: string }[];
    redditDoNotPost: string[];
    linkedin: { id: string; when: string; format: string; body: string; firstComment: string }[];
    x: { id: string; when: string; thread: string[]; firstReply: string }[];
    indieHackers: { when: string; title: string; body: string; rules: string[] };
    newsletterPitch: {
      summary: string; subject: string; body: string;
      beatVariant: { beat: string; subject: string; body: string }; targets: string[]; rules: string[];
    };
    pressPitch: {
      angle: string; headlineOptions: string[];
      regional: { templateId: string; when: string; outlets: string[] };
      european: { templateId: string; when: string; outlets: string };
      factsBox: string[]; assets: string[]; rules: string[];
    };
    directoryListing: {
      name: string; url: string; codes: Record<string, string>; tagline: string; taglineLong: string;
      shortDescription: string; longDescription: string; pricingModel: string; startingPrice: string;
      categories: string[]; tags: string[]; features: string[]; useCases: string[]; alternativesTo: string[];
      alternativesNote: string; faq: { q: string; a: string }[]; submitOrder: string[];
      beatUpdates: Record<string, string>; rules: string[];
    };
  };
  targets: {
    type: string; examples: string[]; howToFind: string; count: string; priority: number;
    templates: string[]; budgetLines: string[];
  }[];
  affiliateProgram: {
    status: string;
    commission: { foundingPartners: string; public: string; yearlyPlans: string; examplesPerCustomer: Record<string, string>; economicsNote: string };
    cookieDays: number; cookieNote: string; payout: string; terms: string[]; pitch: string; assets: string[];
  };
}

export interface ActualEntry {
  date: string; channel: string;
  spend: number | null; impressions: number | null; views: number | null; clicks: number | null;
  signups: number | null; paid: number | null; revenue: number | null; notes: string;
  campaign?: string | null; budgetLineId?: string | null; refunds?: number | null;
  activated?: number | null; studioOrScale?: number | null; checkouts?: number | null;
}

export interface ActualsFile {
  meta: Record<string, unknown>;
  channels: string[];
  budgetLineIds: string[];
  entrySchema: Record<string, unknown>;
  entries: ActualEntry[];
  mrrSnapshots?: { date: string; mrr: number }[];
}

export interface Checkpoint {
  date: string; title: string; detail: string; decisions: string[]; source: string; approx?: boolean;
}

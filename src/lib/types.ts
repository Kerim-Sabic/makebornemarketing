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
  link: string; utm: Record<string, string>; episode?: number;
}
export interface CalendarDay {
  date: string; day: number; weekday: string; week: number; phase: string; focus: string;
  posts: CalendarPost[]; actions: { type: string; what: string; owner: string }[]; kpiCheck: string;
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

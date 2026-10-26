// The plan's rates and guardrails in one place, read from data/funnel.json (base scenario) and plan/strategy.md 2 and 6.3.
// Analytics compares actuals with these; Predictions uses them as the prior that fades as data comes in.
import { SCENARIOS } from 'virtual:war-room/funnel-scenarios';
import { PRICES, runFunnel, type FunnelInputs, type FunnelResult } from './funnelModel';

export const SCENARIO = Object.fromEntries(SCENARIOS.map((s) => [s.id, s])) as Record<string, (typeof SCENARIOS)[number]>;
export const BASE_INPUTS: FunnelInputs = SCENARIO.base.inputs;

let baseRun: FunnelResult | null = null;
/** The calculator's base run (91 days), computed once. */
export const planBase = () => (baseRun ??= runFunnel(BASE_INPUTS));

const mix = BASE_INPUTS.planMix;
/** Studio's share of Studio + Scale buyers in the plan mix (35 / 45). */
export const STUDIO_SPLIT = mix.studio / (mix.studio + mix.scale);

export const PLAN_RATES = {
  signupRate: BASE_INPUTS.signupRate,
  checkoutOpenRate: BASE_INPUTS.checkoutOpenRate ?? 0.6,
  checkoutToPaidRate: BASE_INPUTS.checkoutToPaidRate ?? 1 / 3,
  visitToPaid: BASE_INPUTS.signupRate * BASE_INPUTS.paidRate,
  refundRate: BASE_INPUTS.refundRate,
  monthlyChurn: BASE_INPUTS.monthlyChurn,
  yearlyShare: BASE_INPUTS.yearlyShare,
  yearlyDiscount: BASE_INPUTS.yearlyDiscount,
  viralCoefficient: BASE_INPUTS.viralCoefficient,
  studioShare: mix.studio + mix.scale,
  activation: (week: number) => (week <= 4 ? BASE_INPUTS.activationRate.weeks1to4 : BASE_INPUTS.activationRate.after),
};

/** Blended monthly list price when a share s of buyers is on Studio or Scale (the rest on Create). */
export const priceForStudioShare = (s: number) => (1 - s) * PRICES.create + s * (STUDIO_SPLIT * PRICES.studio + (1 - STUDIO_SPLIT) * PRICES.scale);
/** Net ARPU per month: list price less the yearly discount on the yearly share (base: $36.91). */
export const netArpu = (s: number, yearlyShare = PLAN_RATES.yearlyShare, yearlyDiscount = PLAN_RATES.yearlyDiscount) =>
  priceForStudioShare(s) * (1 - yearlyShare * yearlyDiscount);
/** Contribution per subscriber per month at 60% credit use (funnel.json contributionPerSubMonth), for payback. */
export const contributionForStudioShare = (s: number) => {
  const c = BASE_INPUTS.contributionPerSubMonth;
  return (1 - s) * c.create + s * (STUDIO_SPLIT * c.studio + (1 - STUDIO_SPLIT) * c.scale);
};

/** Guardrails and kill / scale thresholds (plan/strategy.md 2, 6.2, 6.3 and 13; data/kpis.json alerts). */
export const GUARD = {
  cacTarget: 50,
  cacCreate: 37,
  cacSoft: 62.5,
  cacCeiling: 120,
  refundMax: 0.15,
  refundBrake: 0.2,
  attributionMin: 0.9,
  offerCheckMin: 0.007,
  killZeroUsd: 100,
  killOneUsd: 150,
  scaleMinPayers: 3,
  boostMinCtr: 0.005,
  boostMaxCpc: 2,
  boostReadUsd: 30,
  creatorRehireUsdPerPayer: 40,
  mrrAlertShare: 0.8,
  reinvestShare: 0.3,
  reinvestReduced: 0.1,
  feePct: BASE_INPUTS.feePct,
  feeFixed: BASE_INPUTS.feeFixed,
};

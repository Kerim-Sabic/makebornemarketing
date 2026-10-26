// Forecast and analytics maths checks, run by scripts/check-routes.mjs (npm run check and npm run check:model).
// Deterministic: every Monte Carlo here uses a fixed seed, so a failure is a real change, not noise.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export async function runForecastChecks(load, root, fail) {
  const F = await load('/src/lib/forecast.ts');
  const A = await load('/src/lib/analytics.ts');
  const S = await load('/src/lib/sample.ts');
  const R = await load('/src/lib/planRates.ts');
  const C = await load('/src/lib/cohorts.ts');
  const actuals = await load('/src/lib/actuals.ts');
  const util = await load('/src/lib/util.ts');
  let ok = 0;
  const check = (cond, what) => {
    if (cond) ok++;
    else fail(`forecast: ${what}`);
  };
  const near = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

  // 1. Seeded RNG is deterministic and roughly uniform / normal.
  const r1 = F.mulberry32(42);
  const r2 = F.mulberry32(42);
  const a1 = Array.from({ length: 5 }, () => r1());
  const a2 = Array.from({ length: 5 }, () => r2());
  check(a1.every((x, i) => x === a2[i]), 'mulberry32 is not deterministic for one seed');
  check(F.mulberry32(43)() !== a1[0], 'different seeds give the same first number');
  const g = F.mulberry32(1);
  let s = 0;
  let s2 = 0;
  for (let i = 0; i < 20000; i++) {
    const z = F.gaussian(g);
    s += z;
    s2 += z * z;
  }
  check(Math.abs(s / 20000) < 0.03 && Math.abs(s2 / 20000 - 1) < 0.05, 'gaussian() mean or variance is off');

  // 2. The cohort book reproduces the calculator's MRR when fed the calculator's own net payers.
  const base = R.planBase();
  const bi = R.BASE_INPUTS;
  const book = new C.Book(100);
  const price = R.priceForStudioShare(R.PLAN_RATES.studioShare);
  base.daily.forEach((d, i) => {
    book.renew(i, bi.monthlyChurn);
    book.add(i, d.gross * (1 - bi.refundRate), bi.yearlyShare);
  });
  check(near(book.mrr(price, bi.yearlyDiscount), base.summary.mrrEnd, 0.005), `cohort book MRR ${book.mrr(price, bi.yearlyDiscount).toFixed(0)} vs calculator ${base.summary.mrrEnd}`);
  check(near(R.netArpu(R.PLAN_RATES.studioShare), base.summary.netArpu, 0.001), 'net ARPU helper does not match the calculator');

  // 3. Prior weight fades monotonically: 0 at 0 days, 50% at 7, towards 1.
  check(F.priorWeight(0) === 0 && F.priorWeight(F.MIN_DAYS) === 0.5 && F.priorWeight(90) > 0.9, 'prior weight is not 0 / 0.5 / >0.9 at 0 / 7 / 90 days');
  let mono = true;
  for (let n = 1; n < 120; n++) if (F.priorWeight(n) <= F.priorWeight(n - 1)) mono = false;
  check(mono, 'prior weight is not increasing in days');

  // 4. Empty and short data states: no forecast under 7 days.
  const asOf = '2026-11-30';
  check(F.analyse([], { asOf }).status === 'empty', 'no rows should give status "empty"');
  check(!F.isForecast(F.forecast([], { asOf })), 'no rows must not produce a forecast');
  const synth = (days, scale = 1, start = '2026-10-26') =>
    Array.from({ length: days }, (_, i) => {
      const d = base.daily[i];
      const visits = Math.round(d.visits * scale);
      const paid = Math.round(visits * 0.01);
      return { date: util.addDays(start, i), channel: 'ch-tiktok', spend: null, impressions: null, views: null, clicks: visits, signups: Math.round(visits * 0.05), paid, revenue: paid * 38, notes: '', campaign: null, budgetLineId: null, refunds: Math.round(paid * 0.15), activated: null, studioOrScale: Math.round(paid * 0.45), checkouts: null };
    });
  const short = F.analyse(synth(5), { asOf: '2026-10-30' });
  check(short.status === 'insufficient' && short.obs.dataDays === 5, `5 days should be "insufficient" with 5 data days (got ${short.status}, ${short.obs.dataDays})`);
  check(!F.isForecast(F.forecast(synth(6), { asOf: '2026-10-31' })), '6 days must not produce a forecast');
  check(F.isForecast(F.forecast(synth(7), { asOf: '2026-11-01', runs: 200 })), '7 days should produce a forecast');
  const renewalsOnly = [{ ...synth(1)[0], channel: 'renewals' }];
  check(F.analyse(renewalsOnly, { asOf }).obs.dataDays === 0, 'renewal rows alone must not count as data days');

  // 5. Deterministic Monte Carlo: same data and seed, same numbers; bands ordered.
  const { entries } = S.sampleData();
  const t0 = Date.now();
  const f1 = F.forecast(entries, { asOf: S.SAMPLE_AS_OF });
  const ms = Date.now() - t0;
  const f2 = F.forecast(entries, { asOf: S.SAMPLE_AS_OF });
  check(F.isForecast(f1), 'sample data should produce a forecast');
  check(JSON.stringify(f1.horizons) === JSON.stringify(f2.horizons) && JSON.stringify(f1.probabilities) === JSON.stringify(f2.probabilities), 'two runs with the same seed differ');
  const f3 = F.runForecast(f1.analysis, F.RUNS, 99);
  check(JSON.stringify(f3.horizons) !== JSON.stringify(f1.horizons), 'a different seed gives identical bands (the seed is not used)');
  check(f1.runs === 2000, `expected 2,000 runs, got ${f1.runs}`);
  check(ms < 4000, `2,000 runs took ${ms} ms (budget 4,000 ms in the SSR loader)`);
  let ordered = true;
  for (const h of f1.horizons) for (const k of ['mrr', 'arr', 'payers', 'visits', 'signups', 'cumGross']) if (!(h[k].p10 <= h[k].p50 && h[k].p50 <= h[k].p90)) ordered = false;
  f1.band.p10.forEach((v, i) => {
    if (!(v <= f1.band.p50[i] && f1.band.p50[i] <= f1.band.p90[i])) ordered = false;
  });
  check(ordered, 'P10 <= P50 <= P90 fails somewhere');
  const hz = [...f1.horizons].sort((x, y) => x.days - y.days);
  check(hz.every((h, i) => i === 0 || (h.visits.p50 >= hz[i - 1].visits.p50 && h.signups.p50 >= hz[i - 1].signups.p50 && h.cumGross.p50 >= hz[i - 1].cumGross.p50)), 'cumulative visits, sign-ups or gross payers fall with a longer horizon');
  check(f1.horizons.some((h) => h.date === F.DAY90), 'the day-90 review date (24 Jan 2027) is missing from the horizons');
  const pr = Object.fromEntries(f1.probabilities.map((p) => [p.id, p]));
  check(pr.gate100.probability >= pr.gate200.probability, 'P(100 payers) < P(200 payers) on the same date');
  check(pr.base90.probability >= pr.arr1m.probability, 'P(plan base MRR) < P($1M ARR) on the same date');
  check(f1.probabilities.every((p) => p.probability >= 0 && p.probability <= 1), 'a probability is outside 0..1');
  check(pr.gate100.decided && pr.gate100.actual != null, 'a checkpoint on or before the last logged day should be settled by data');

  // 6. Monotonic sanity on the central projection.
  const a = f1.analysis;
  const cp = F.centralParams(a);
  const H = 90;
  const mrrEnd = (sp) => F.simulate(a, sp, H).days[H - 1].mrr;
  const m0 = mrrEnd(cp);
  check(mrrEnd({ ...cp, p: cp.p * 1.2 }) > m0, 'higher conversion does not raise MRR');
  check(mrrEnd({ ...cp, churn: cp.churn + 0.05 }) < m0, 'higher churn does not lower MRR');
  check(mrrEnd({ ...cp, refund: cp.refund + 0.05 }) < m0, 'higher refunds do not lower MRR');
  check(mrrEnd({ ...cp, studioShare: cp.studioShare + 0.1 }) > m0, 'a richer plan mix does not raise MRR');
  check(mrrEnd({ ...cp, visits: (h) => cp.visits(h) * 1.3 }) > m0, 'more visits do not raise MRR');
  check(mrrEnd({ ...cp, loopShare: 0.3 }) > mrrEnd({ ...cp, loopShare: 0.1 }), 'a higher referral share does not raise MRR');
  const scaled = F.forecast(synth(21, 2), { asOf: '2026-11-15', runs: 400 });
  const plain = F.forecast(synth(21, 1), { asOf: '2026-11-15', runs: 400 });
  check(scaled.horizons[0].mrr.p50 > plain.horizons[0].mrr.p50, 'doubling logged traffic does not raise the forecast');

  // 7. Data that follows the plan forecasts close to the plan.
  const onPlan = F.forecast(synth(21), { asOf: '2026-11-15', runs: 1000 });
  const d90 = onPlan.horizons.find((h) => h.date === F.DAY90);
  check(d90.mrr.p10 <= base.summary.mrrEnd * 1.15 && d90.mrr.p90 >= base.summary.mrrEnd * 0.85, `plan-like data: plan base MRR ${base.summary.mrrEnd} outside the band ${d90.mrr.p10.toFixed(0)}-${d90.mrr.p90.toFixed(0)}`);

  // 8. Required pace: bigger targets need bigger multipliers, and the solution hits the target.
  const pace = f1.pace;
  const fac = (id) => pace.find((p) => p.id === id).levers.find((l) => l.lever === 'visits').factor;
  check(fac('arr1m') >= fac('arr500k') && fac('arr500k') >= fac('base'), 'required visit multipliers are not ordered $1M >= $500k >= base');
  const H90 = util.diffDays(F.DAY90, a.startDate);
  const hit = F.simulate(a, { ...cp, visits: (h) => cp.visits(h) * fac('arr1m') }, H90).days[H90 - 1].mrr * 12;
  check(near(hit, 1_000_000, 0.01), `the $1M visit multiplier gives ${hit.toFixed(0)} ARR`);

  // 9. Checkpoint targets exist in data/checkpoints.json.
  const cps = JSON.parse(readFileSync(join(root, 'data/checkpoints.json'), 'utf8')).checkpoints.map((c) => c.date);
  for (const t of F.checkpointTargets()) check(cps.includes(t.date), `checkpoint target ${t.id} (${t.date}) has no entry in data/checkpoints.json`);

  // 10. Sample data: valid rows, inside the window, deterministic, labelled.
  const again = S.sampleData().entries;
  check(again === entries, 'sample data is regenerated on every call (should be cached and fixed)');
  check(entries.every((e) => actuals.normaliseEntry(e).entry && actuals.normaliseEntry(e).warnings.length === 0), 'a sample row fails the actuals validation');
  check(entries.every((e) => e.date >= '2026-10-26' && e.date <= S.SAMPLE_AS_OF), 'a sample row is outside 26 Oct - 22 Nov');
  check(S.sampleData().spend.every((x) => x.note.startsWith('SAMPLE')), 'a sample spend entry is not labelled SAMPLE');

  // 11. Analytics: paired funnel rates, RAG thresholds, verdicts.
  const rows = [
    { date: '2026-11-02', channel: 'ch-tiktok', spend: null, impressions: null, views: null, clicks: 1000, signups: 50, paid: 10, revenue: null, notes: '', refunds: 1, activated: 6, studioOrScale: null, checkouts: 30 },
    { date: '2026-11-02', channel: 'ch-x', spend: null, impressions: null, views: null, clicks: 500, signups: null, paid: 2, revenue: null, notes: '', refunds: 0, activated: null, studioOrScale: null, checkouts: null },
  ];
  const fs = A.funnelSteps(rows);
  const step = Object.fromEntries(fs.steps.map((x) => [x.id, x]));
  check(near(step.signups.rate, 0.05, 1e-9), `sign-up rate should ignore the row with no sign-ups (got ${step.signups.rate})`);
  check(near(step.paid.rate, 10 / 30, 1e-9) && near(step.activated.rate, 6 / 9, 1e-9), 'checkout->paid or activation rate is off');
  check(near(fs.visitToPaid, 12 / 1500, 1e-9), 'visit-to-paid should use every row that logged both');
  check(A.ragAtMost(0.15, 0.15, 0.2) === 'green' && A.ragAtMost(0.16, 0.15, 0.2) === 'amber' && A.ragAtMost(0.25, 0.15, 0.2) === 'red', 'refund RAG thresholds are wrong');
  check(A.ragAtLeast(null, 1) === 'grey' && A.ragAtLeast(0.85, 1) === 'amber' && A.ragAtLeast(0.7, 1) === 'red', 'at-least RAG thresholds are wrong');
  const wa = A.weekActions(entries, S.sampleData().spend, S.SAMPLE_AS_OF, JSON.parse(readFileSync(join(root, 'data/checkpoints.json'), 'utf8')).checkpoints, a);
  check(wa.actions.some((x) => x.verb === 'Stop boost'), 'sample boosts at 0.45% CTR should trigger the stop-boost rule');
  check(wa.actions.some((x) => x.verb === 'Scale' && x.text.startsWith('ch-creators')), 'sample creators at CAC under $50 on 3+ payers should be "Scale"');
  const killRows = [{ date: '2026-11-10', channel: 'ch-boosts', spend: 160, impressions: 30000, views: null, clicks: 300, signups: 10, paid: 1, revenue: 20, notes: '', refunds: 0 }];
  check(A.weekActions(killRows, [], '2026-11-12', [], a).actions.some((x) => x.verb === 'Kill'), '$160 spent with 1 net payer should be "Kill"');
  const spendDay = { date: '2026-11-09', channel: 'ch-creators', spend: 100, impressions: null, views: null, clicks: 50, signups: 3, paid: 0, revenue: null, notes: '', refunds: 0 };
  const payDay = { ...spendDay, date: '2026-11-10', spend: null, paid: 5 };
  const organicDay = { ...payDay, channel: 'ch-tiktok', paid: 9 };
  const blended = actuals.cac(actuals.aggregate(A.paidChannelRows([spendDay, payDay, organicDay])));
  check(blended === 20, `blended paid CAC should count paid channels' payers on no-spend days and skip organic ones (got ${blended})`);
  const mw = A.mrrByWeek(entries, [], a, S.SAMPLE_AS_OF);
  check(mw[3].netMrr > 0 && mw[4].netMrr === null, 'MRR by week should stop at the as-of week');
  check(Math.abs(mw[3].netMrr - f1.central.history[f1.central.history.length - 1].mrr) / mw[3].netMrr < 0.01, 'Analytics MRR and the forecast starting MRR disagree');

  console.log(`  ok   ${ok} forecast and analytics checks (2,000 seeded runs in ${ms} ms)`);
}

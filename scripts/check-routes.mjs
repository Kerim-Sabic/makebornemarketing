// Route and model smoke test. Run after `npm run build`:  npm run check
// 1. Renders every route (the four tabs, the Library, deep links and the old routes that now redirect) to HTML through
//    Vite's SSR loader and fails on any error or empty page; checks that old hashes and old href ids resolve to their new homes.
// 2. Runs the TypeScript funnel model against every scenario's referenceOutputs in data/funnel.json (within 1%).
// 3. Checks dist/: every asset the page references exists, the CSP is present, and no external origin is loaded.
// 4. Fails when a data/plan.json scenario's mrrDay90 drifts more than 5% from the calculator (referenceOutputs.mrrEnd).
// 5. Scans the files that would be pushed for known confidential markers (the repo may be public; owner-only notes go in private/).
// 6. Tests the forecast and analytics maths with a fixed seed (scripts/check-forecast.mjs).
// 7. Checks the Today and Plan joins (scripts/plan-data.mjs): dated money adds up to $1,000, every make-list item and Instagram
//    kick-off day lands on a day, 13 complete week cards, and the one-form tracking codes from content/tracking.md.
// 8. Checks the production plan (data/production.json): the production budget is separate from the $1,000 (nothing in
//    ads.json or plan.json names Higgsfield), every Higgsfield shot has a full prompt card and credits and is generated on a
//    day and used by an item, every item says how it is made, the Higgsfield videos stay at 60-70% real / 20-30% Higgsfield,
//    every HyperFrames slot file exists, and every A/B pair has both sides marked on the calendar.
// 9. Checks the finished launch-week files (data/posting.json, written by scripts/sync-posting.mjs): every item names a
//    content id, a platform and files, no media sits in the repo, the Today join links the ready files to their posts, and
//    the sync script exits cleanly and leaves the JSON alone when the renders folders are missing (as on Netlify).
// 10. Checks the launch on Wed 28 Oct 2026 at 19:00 CET (18:00 UTC): the calendar runs pre-launch -2, -1, then day 1 = 28 Oct
//    to day 90 = Mon 25 Jan 2027; V01 posts at 19:00 on launch day (calendar and posting.json); no post before 28 Oct 18:00 UTC
//    says the product is live (only the countdown teasers T1-T7 and S1-S3, none of them before 19:00 claiming it); the
//    launch day has its run of show; the _justlaunched files apply from Thu 29 Oct.
// 11. Fails when copy outside research/ claims a finished output came from "one sentence" (or a one-line brief): every
//    real output came from a 500-1,000-character brief, so the copy says "one brief".
import { createServer } from 'vite';
import { readFileSync, existsSync, readdirSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runForecastChecks } from './check-forecast.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const modelOnly = process.argv.includes('--model-only');
let failures = 0;
const fail = (msg) => {
  failures++;
  console.log(`  FAIL ${msg}`);
};

const server = await createServer({ root, logLevel: 'error', server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  // ---------- model ----------
  console.log('Funnel model vs data/funnel.json referenceOutputs');
  const { runFunnel, compareWithReference } = await server.ssrLoadModule('/src/lib/funnelModel.ts');
  const funnel = JSON.parse(readFileSync(join(root, 'data/funnel.json'), 'utf8'));
  for (const s of funnel.scenarios) {
    const diffs = compareWithReference(runFunnel(s.inputs).summary, s.referenceOutputs);
    if (diffs.length) fail(`${s.id}: ${diffs.map((d) => `${d.key} got ${d.got} want ${d.want}`).join('; ')}`);
    else console.log(`  ok   ${s.id.padEnd(12)} ARR ${s.referenceOutputs.arrEnd}`);
  }

  // ---------- plan.json scenarios vs the calculator ----------
  console.log('\nplan.json scenarios vs data/funnel.json (mrrDay90 within 5%)');
  const plan = JSON.parse(readFileSync(join(root, 'data/plan.json'), 'utf8'));
  const byId = Object.fromEntries(funnel.scenarios.map((s) => [s.id, s]));
  const byName = (name) => {
    const n = name.toLowerCase();
    if (n.includes('strict')) return 'baseStrict';
    if (n.includes('preview')) return 'basePreview';
    if (n.startsWith('base')) return 'base';
    if (n.startsWith('low')) return 'low';
    if (n.startsWith('high')) return 'high';
    if (n.startsWith('breakout')) return 'breakout';
    return null;
  };
  for (const p of plan.scenarios) {
    const id = p.funnelScenarioId ?? byName(p.name);
    const ref = id && byId[id]?.referenceOutputs;
    if (!ref) {
      fail(`plan.json scenario "${p.name}" has no matching data/funnel.json scenario`);
      continue;
    }
    const drift = Math.abs(p.mrrDay90 - ref.mrrEnd) / ref.mrrEnd;
    if (drift > 0.05) fail(`plan.json "${p.name}": mrrDay90 ${p.mrrDay90} vs calculator ${ref.mrrEnd} (${(drift * 100).toFixed(1)}% off)`);
    else console.log(`  ok   ${p.name.padEnd(30)} MRR ${p.mrrDay90} (calculator ${ref.mrrEnd})`);
  }
  const breakout = byId.breakout?.referenceOutputs;
  if (breakout && breakout.arrEnd < 1_000_000) fail(`breakout scenario reaches ARR ${breakout.arrEnd}, below the $1M its name promises`);

  // ---------- Today and Plan joins (scripts/plan-data.mjs) ----------
  console.log('\nToday and Plan joins (ads.json money, Instagram kick-off, production, tracking codes)');
  {
    const { todayExtras, planWeeks } = await import('./plan-data.mjs');
    const j = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
    const files = {
      calendar: j('data/calendar.json'), instagram: j('data/instagram.json'), production: j('data/production.json'), ads: j('data/ads.json'),
      kpis: j('data/kpis.json'), creatives: j('data/creatives.json'), videos: j('data/videos.json'), checkpoints: j('data/checkpoints.json'),
      plan: j('data/plan.json'), calendarMd: readFileSync(join(root, 'content/calendar.md'), 'utf8'),
      posting: existsSync(join(root, 'data/posting.json')) ? j('data/posting.json') : null,
    };
    let money = 0;
    let make = 0;
    for (const d of files.calendar) {
      const x = todayExtras(files, d.date);
      money += x.money.reduce((s, m) => s + m.usd, 0);
      make += x.make.length;
      if (x.posts.length !== d.posts.length) fail(`today ${d.date}: ${x.posts.length} enriched posts for ${d.posts.length}`);
    }
    if (Math.abs(money - 1000) > 0.5) fail(`the dated money items add up to $${money.toFixed(2)}, not $1,000 (ads.json adCalendar dates)`);
    else console.log(`  ok   dated money over the ${files.calendar.length} calendar days adds up to $${money.toFixed(0)}`);
    const madeItems = files.production.simple.weeks.reduce((s, w) => s + w.items.length, 0);
    if (make !== madeItems) fail(`Today shows ${make} make items, production.json simple.weeks has ${madeItems}`);
    else console.log(`  ok   all ${make} production make-list items land on a day`);
    const { weeks } = planWeeks(files);
    const bad = weeks.filter((w) => !w.goal || w.actions.length < 5 || !w.money);
    if (weeks.length !== 13 || bad.length) fail(`plan weeks: ${weeks.length} weeks, missing goal / 5+ actions / money in ${bad.map((w) => w.week).join(', ')}`);
    else if (weeks[12].money.running !== 1000) fail(`plan weeks running total ends at ${weeks[12].money.running}`);
    else console.log('  ok   13 week cards, each with a goal, 5-10 actions and money; running total $1,000');
    const igDays = files.instagram.kickoffDays.filter((k) => todayExtras(files, k.date).ig).length;
    if (igDays !== files.instagram.kickoffDays.length) fail(`only ${igDays} Instagram kick-off days reach Today`);
    else console.log(`  ok   ${igDays} Instagram kick-off days reach Today`);
    // The one-form code fixes (26 Oct): calendar stories use the creatives.json code, directories use the tracking.md short codes.
    const text = ['data/calendar.json', 'data/outreach.json', 'data/instagram.json', 'content/tracking.md', 'content/where-to-post.md', 'content/outreach.md'].map((p) => readFileSync(join(root, p), 'utf8')).join('\n');
    for (const [re, what] of [[/go\/ig-c15"/, 'ig-c15 short code'], [/ig-bio-client\b(?! is not used)/, 'ig-bio-client'], [/\bdir-(alternativeto|saashub|microlaunch|futuretools|rundown)\b/, 'dir-* directory code']]) {
      if (re.test(text)) fail(`${what} is back; use one form (see content/tracking.md §1.2)`);
    }
    const tracking = readFileSync(join(root, 'content/tracking.md'), 'utf8');
    for (const v of ['`paid`', '`cpc`', '`google`', '`ig-<post>-b`', '`c-<handle>-s`', '`g-<adgroup>`', '`ig-dm-*`', '`ig-s<mmdd>-*`', '`ig-hl-*`']) if (!tracking.includes(v)) fail(`tracking.md does not register ${v}`);
    // The 20:15 posting-time test moved with the launch from Tue 3 / Wed 4 Nov to Wed 4 / Fri 6 Nov.
    const igReels = files.calendar.filter((d) => d.date === '2026-11-04' || d.date === '2026-11-06').flatMap((d) => d.posts.filter((p) => p.channel === 'Instagram Reels'));
    if (igReels.length !== 2 || igReels.some((p) => !p.time.startsWith('20:15'))) fail('the Wed 4 and Fri 6 Nov Instagram Reels are not at 20:15 (posting-time test)');
    else console.log('  ok   one-form tracking codes; 4 and 6 Nov Reels at 20:15 for the time test');
  }

  // ---------- production budget, Higgsfield and HyperFrames (data/production.json) ----------
  console.log('\nProduction budget, Higgsfield shots and HyperFrames slots (data/production.json)');
  {
    const j = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
    const P = j('data/production.json');
    const ads = j('data/ads.json');
    const planJ = j('data/plan.json');
    const cal = j('data/calendar.json');
    const before = failures;
    const B = P.productionBudget;
    // 1. The production budget is its own pot and never touches the $1,000.
    if (!B || B.separateFromAdsBudget !== true) fail('productionBudget missing or not marked separateFromAdsBudget');
    else {
      const m1 = B.month1.items.reduce((s, i) => s + i.usd, 0);
      if (Math.abs(m1 - B.month1.totalUSD) > 0.001) fail(`productionBudget month 1 items add up to $${m1}, not $${B.month1.totalUSD}`);
      if (B.month1.totalUSD > B.month1.capUSD) fail('productionBudget month 1 total is above its cap');
      if (B.tier.priceUSD !== B.month1.totalUSD) fail('productionBudget tier price and month 1 total differ');
      const c = B.credits.month1;
      if (Math.abs(c.planned + c.conditional + c.reserve - c.available) > 0.001 || c.reserve < 0) fail(`month 1 credits do not add up (${c.planned} + ${c.conditional} + ${c.reserve} vs ${c.available})`);
      const plannedW = B.credits.byWeek.filter((w) => w.month === 1).reduce((s, w) => s + w.plannedCredits, 0);
      if (Math.abs(plannedW - c.planned) > 0.001) fail(`weekly credits of month 1 add up to ${plannedW}, not ${c.planned}`);
      if (c.planned + c.conditional > B.tier.creditsPerMonth) fail('month 1 plans more credits than the tier gives');
    }
    const adsMoney = ads.adCalendar.flatMap((w) => [...w.adItems.map((a) => `${a.item} ${a.line ?? ''}`), ...w.otherPlanSpend.map((o) => `${o.item} ${o.line ?? ''}`)]);
    const leak = adsMoney.filter((t) => /higgsfield|production budget|production tool/i.test(t));
    if (leak.length) fail(`the $1,000 (ads.json adCalendar) has production items: ${leak.join('; ')}`);
    if (/higgsfield/i.test(JSON.stringify(planJ))) fail('plan.json names Higgsfield: production money is not part of the $1,000 plan');
    const adsTotal = ads.adCalendar.at(-1)?.runningTotalUsd;
    if (adsTotal !== 1000) fail(`ads.json running total is ${adsTotal}, not 1000`);
    // 2. Every Higgsfield shot has a full prompt card and credits.
    const H = P.higgsfield;
    const shots = new Map(H.shots.map((s) => [s.id, s]));
    for (const s of H.shots) {
      const miss = ['prompt', 'negative', 'model', 'mode', 'cameraPreset', 'aspect', 'resolution', 'seed', 'keepRule', 'label', 'generateOn'].filter((k) => !s[k] || String(s[k]).trim().length < 3);
      if (miss.length) fail(`${s.id}: missing ${miss.join(', ')}`);
      if (!(s.durationSec > 0) || !(s.takes >= 1) || !(s.creditsPerTake > 0) || Math.abs(s.credits - s.takes * s.creditsPerTake) > 0.001) fail(`${s.id}: credits ${s.credits} do not match ${s.takes} takes x ${s.creditsPerTake}`);
      if (String(s.prompt).length < 120) fail(`${s.id}: prompt too short to be exact`);
      if (s.aspect !== '9:16') fail(`${s.id}: aspect ${s.aspect}, the plan masters 9:16`);
      const i2v = s.mode === 'image-to-video';
      if (i2v ? !s.referenceImage || !/Nothing in the image changes/.test(s.prompt) : !/No people/.test(s.prompt)) fail(`${s.id}: ${i2v ? 'image-to-video needs a reference image and the no-change line' : 'text-to-video prompt must say No people'}`);
      if (/\b(makeborne|testimonial|avatar|customer|user interface|dashboard)\b/i.test(s.prompt)) fail(`${s.id}: prompt asks for the brand, a person or UI`);
      if (!!s.gate !== !!s.conditional) fail(`${s.id}: gate and conditional disagree`);
      if (!s.for?.length) fail(`${s.id}: used by nothing`);
    }
    const sumPlanned = H.shots.filter((s) => !s.conditional).reduce((a, s) => a + s.credits, 0);
    if (Math.abs(sumPlanned - H.totals.plannedCredits90Days) > 0.001) fail('higgsfield.totals.plannedCredits90Days does not match the shots');
    // 3. Every item names how it is made; Higgsfield items carry their shots, prompts, slots and label.
    const WAYS = ['real only', 'Higgsfield hook + real', 'Higgsfield scene + HyperFrames type', 'HyperFrames only'];
    const used = new Set();
    let hfSec = 0;
    let hfLen = 0;
    let hfReal = 0;
    for (const v of P.perVideo) {
      if (!WAYS.includes(v.makeWith)) fail(`${v.id}: makeWith "${v.makeWith}"`);
      if (!v.template?.id || !v.readiness || !v.mix) fail(`${v.id}: template, readiness or mix missing`);
      if (v.mix && Math.abs(v.mix.realSec + v.mix.higgsfieldSec + v.mix.hyperframesOnlySec - v.lengthSec) > 0.01) fail(`${v.id}: mix seconds do not add up to ${v.lengthSec}`);
      if (v.makeWith.startsWith('Higgsfield') !== !!v.higgsfield) fail(`${v.id}: makeWith and higgsfield disagree`);
      if (!v.higgsfield) continue;
      const x = v.higgsfield;
      for (const id of x.shots) {
        used.add(id);
        const s = shots.get(id);
        if (!s) fail(`${v.id}: unknown shot ${id}`);
        else if (!s.for.includes(v.id)) fail(`${v.id}: shot ${id} does not list it`);
      }
      for (const pr of x.prompts) {
        const s = shots.get(pr.shot);
        if (!s || pr.prompt !== s.prompt || pr.negative !== s.negative || pr.credits !== s.credits) fail(`${v.id}: prompt copy of ${pr.shot} differs from higgsfield.shots`);
      }
      if (x.prompts.length !== x.shots.length) fail(`${v.id}: ${x.shots.length} shots but ${x.prompts.length} prompts`);
      if (!/AI-generated scene|AI camera move/.test(x.label)) fail(`${v.id}: no on-screen AI label`);
      if (!v.template.hfSlots?.length || v.template.hfSlots.length !== x.sections.length) fail(`${v.id}: HyperFrames slots missing`);
      for (const sl of v.template.hfSlots ?? []) {
        const file = sl.composition.split(' ')[0];
        if (!existsSync(join(root, 'production/templates', file))) fail(`${v.id}: slot template ${file} does not exist`);
        if (!sl.variables.aiLabelText) fail(`${v.id}: slot ${sl.slot} has no aiLabelText`);
      }
      for (const sec of x.sections) if (!x.shots.includes(sec.shot)) fail(`${v.id}: section uses ${sec.shot} outside its shot list`);
      if (!/needs .*live/.test(v.readiness)) {
        hfSec += v.mix.higgsfieldSec;
        hfLen += v.mix.lengthSec;
        hfReal += v.mix.realSec;
      }
    }
    for (const c of P.perCreative) {
      if (!WAYS.includes(c.makeWith)) fail(`${c.id}: makeWith "${c.makeWith}"`);
      if (!c.template?.id || !c.template.variables || !c.readiness) fail(`${c.id}: template, variables or readiness missing`);
      if (c.higgsfield) {
        if (!shots.has(c.higgsfield.frameFrom)) fail(`${c.id}: frame grab of unknown shot ${c.higgsfield.frameFrom}`);
        used.add(c.higgsfield.frameFrom);
      }
    }
    for (const s of H.shots) if (!used.has(s.id)) fail(`${s.id}: no video or image uses it`);
    // 4. The mix in the Higgsfield videos: 60-70% real, 20-30% Higgsfield.
    const hfPct = Math.round((hfSec / hfLen) * 100);
    const realPct = Math.round((hfReal / hfLen) * 100);
    if (hfPct < 20 || hfPct > 30 || realPct < 60 || realPct > 70) fail(`mix in the Higgsfield videos is ${realPct}% real / ${hfPct}% Higgsfield (target 60-70 / 20-30)`);
    if (hfPct !== H.mix.measured.higgsfieldPct || realPct !== H.mix.measured.realPct) fail('higgsfield.mix.measured is stale');
    // 5. Each shot has a "generate" line on a day, every make-list shot id exists, and the owner's sign-up is on the list.
    const items = P.simple.weeks.flatMap((w) => w.items);
    for (const i of items) for (const id of i.hf ?? []) if (!shots.has(id)) fail(`make-list item names unknown shot ${id}: ${i.text}`);
    const genned = new Set(items.filter((i) => /generate \d+ Higgsfield/.test(i.text)).flatMap((i) => i.hf ?? []));
    for (const s of H.shots) if (!genned.has(s.id)) fail(`${s.id}: no "generate" line in simple.weeks`);
    if (!items.some((i) => /signs up for Higgsfield/.test(i.text))) fail('no owner sign-up line in simple.weeks');
    // 6. Calendar: Higgsfield posts belong to Higgsfield videos; every A/B pair has both sides on the calendar.
    const vHf = new Set(P.perVideo.filter((v) => v.higgsfield).map((v) => v.id));
    const posts = cal.flatMap((d) => d.posts.map((p) => ({ ...p, date: d.date })));
    for (const p of posts) if (p.version === 'higgsfield' && /^V/.test(p.contentId) && !vHf.has(p.contentId)) fail(`${p.date} ${p.contentId}: Higgsfield post for a real-only video`);
    for (const a of H.abTests.pairs) {
      for (const side of ['real', 'higgsfield']) {
        const ok = posts.some((p) => p.contentId === a.video && p.channel === a.surface && p.date === a[side].date && p.version === side && p.abPair === a.id && String(p.link).endsWith(`/go/${a[side].go}`));
        if (!ok) fail(`${a.id}: the ${side} post on ${a[side].date} is not marked on the calendar`);
      }
    }
    if (failures === before) console.log(`  ok   production budget separate from the $1,000 ($${B.month1.totalUSD} month 1, cap $${B.month1.capUSD}); ${H.shots.length} shots, each with a prompt, negative and credits; mix ${realPct}% real / ${hfPct}% Higgsfield; ${H.abTests.pairs.length} A/B pairs on the calendar`);
  }

  // ---------- finished files (data/posting.json, scripts/sync-posting.mjs) ----------
  console.log('\nFinished launch-week files (data/posting.json and scripts/sync-posting.mjs)');
  {
    const before = failures;
    const P = JSON.parse(readFileSync(join(root, 'data/posting.json'), 'utf8'));
    const ok = Array.isArray(P.items) && P.items.length > 0 && typeof P.folder === 'string';
    if (!ok) fail('data/posting.json has no items or no folder');
    const contentIds = new Set([...JSON.parse(readFileSync(join(root, 'data/videos.json'), 'utf8')).map((v) => v.id), ...JSON.parse(readFileSync(join(root, 'data/creatives.json'), 'utf8')).map((c) => c.id), ...Object.keys(P.teasers ?? {})]);
    for (const it of P.items ?? []) {
      if (!contentIds.has(it.id)) fail(`posting.json: ${it.id} is not a video or image in the plan`);
      if (!it.platforms?.length || !it.files?.length) fail(`posting.json: ${it.id} has no platform or no files`);
      for (const f of it.files ?? []) if (!/^[\w.-]+\.(mp4|mov|jpe?g|png|webp)$/i.test(f.name) || /[\\/]/.test(f.name)) fail(`posting.json: ${it.id} file "${f.name}" is not a plain file name`);
      if (it.ready && !it.files.every((f) => f.exists)) fail(`posting.json: ${it.id} is marked ready with a missing file`);
      if (it.date && !/^\d{4}-\d{2}-\d{2}$/.test(it.date)) fail(`posting.json: ${it.id} date ${it.date}`);
    }
    for (const k of ['toMake', 'beforePosting', 'reminders', 'teasers', 'schedule']) if (!P[k]) fail(`posting.json: hand-written ${k} is missing`);
    for (const id of ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'S1', 'S2', 'S3']) if (!P.teasers?.[id] || (!P.toMake?.[id] && !(P.items ?? []).some((i) => i.id === id))) fail(`posting.json: teaser ${id} has no title or no "to make" reason`);
    for (const id of ['V04', 'V07', 'V08', 'V09', 'V10', 'C02', 'C05', 'C15', 'C17']) if (!P.toMake?.[id]) fail(`posting.json: no "to make" reason for ${id}`);
    if ((P.beforePosting ?? []).length !== 3) fail('posting.json: the before-posting checklist should have its 3 steps');
    // No media in the repository: paths only.
    const media = [];
    const walkMedia = (dir) => {
      for (const e of readdirSync(join(root, dir), { withFileTypes: true })) {
        if (['node_modules', 'dist', '.git', 'private'].includes(e.name)) continue;
        const rel = `${dir}/${e.name}`;
        if (e.isDirectory()) walkMedia(rel);
        else if (/\.(mp4|mov|webm)$/i.test(e.name) || /^[VC]\d{2}_.*\.(jpe?g|png)$/i.test(e.name)) media.push(rel);
      }
    };
    walkMedia('.');
    if (media.length) fail(`media files in the repo (keep them in the renders folder): ${media.slice(0, 5).join(', ')}`);
    // The Today join: every ready item that has a calendar slot is linked from that day's post.
    const { todayExtras } = await import('./plan-data.mjs');
    const j = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
    const files = {
      calendar: j('data/calendar.json'), instagram: j('data/instagram.json'), production: j('data/production.json'), ads: j('data/ads.json'),
      kpis: j('data/kpis.json'), creatives: j('data/creatives.json'), videos: j('data/videos.json'), checkpoints: j('data/checkpoints.json'),
      plan: j('data/plan.json'), calendarMd: readFileSync(join(root, 'content/calendar.md'), 'utf8'), posting: P,
    };
    let linked = 0;
    let toMake = 0;
    for (const d of files.calendar) {
      const x = todayExtras(files, d.date);
      linked += x.posts.filter((p) => p.file?.ready).length;
      toMake += x.posts.filter((p) => p.file && !p.file.ready).length;
      if (x.posts.some((p) => p.file?.ready) && x.beforePosting.length !== 3) fail(`today ${d.date}: a ready post without the before-posting checklist`);
    }
    for (const it of (P.items ?? []).filter((i) => i.ready && i.date)) {
      const x = todayExtras(files, it.date);
      const day = files.calendar.find((d) => d.date === it.date);
      const hit = day?.posts.findIndex((p) => p.contentId === it.id && it.platforms.includes(p.channel));
      if (hit >= 0 && !x.posts[hit].file?.ready) fail(`today ${it.date}: ${it.id} on ${day.posts[hit].channel} is not linked to its file`);
    }
    const pre = todayExtras(files, '2026-10-26');
    if (!pre.reminders.some((r) => /Do not post V01/.test(r.text))) fail('26 Oct has no "Do not post V01" item (the launch is Wed 28 Oct 19:00 CET)');
    if ((P.reminders ?? []).some((r) => /before midnight/i.test(r.text))) fail('posting.json still says "Post V01 before midnight"');
    if (pre.beforePosting.length !== 3) fail('the pre-launch day does not show the before-posting checklist');
    // V01 at Wed 28 Oct 19:00 on TikTok, Reels and Shorts, with the _justlaunched variant from Thu 29 Oct.
    const launchDay = files.calendar.find((d) => d.date === '2026-10-28');
    const lx = todayExtras(files, '2026-10-28');
    for (const ch of ['TikTok', 'Instagram Reels', 'YouTube Shorts']) {
      const i = launchDay.posts.findIndex((p) => p.contentId === 'V01' && p.channel === ch);
      if (i < 0 || !launchDay.posts[i].time.startsWith('19:00')) fail(`calendar: V01 on ${ch} is not at Wed 28 Oct 19:00`);
      const it = P.items.find((x) => x.id === 'V01' && x.platforms.includes(ch));
      if (!it || it.date !== '2026-10-28' || it.time !== '19:00') fail(`posting.json: V01 on ${ch} is ${it?.date} ${it?.time}, not 2026-10-28 19:00`);
      if (i >= 0 && ch === 'TikTok' && (!lx.posts[i].file?.files?.includes('V01_tiktok_9x16.mp4') || !lx.posts[i].file.laterFiles?.includes('V01_tiktok_9x16_justlaunched.mp4'))) fail('28 Oct TikTok V01 does not show V01_tiktok_9x16.mp4 and its _justlaunched variant');
    }
    const later = files.calendar.filter((d) => d.date >= '2026-10-29').flatMap((d) => todayExtras(files, d.date).posts.filter((p) => p.file?.files?.some((f) => /^V01_(tiktok|reel|shorts)_9x16\.mp4$/.test(f))));
    if (later.length) fail('a V01 post after launch day shows the "We launched today" file instead of _justlaunched');
    if (!lx.launch || lx.launch.runOfShow.length < 6 || !lx.launch.runOfShow.some((r) => r.time === '19:00' && /V01/.test(r.text))) fail('launch day has no run of show with V01 at 19:00');
    if (todayExtras(files, '2026-10-29').launch) fail('the run of show shows on a day other than launch day');
    // The sync script: a missing renders folder is a no-op that exits 0 and leaves the JSON untouched.
    const { syncPosting, parsePosting } = await import('./sync-posting.mjs');
    const tmp = mkdtempSync(join(tmpdir(), 'mb-posting-'));
    try {
      const out = join(tmp, 'posting.json');
      writeFileSync(out, '{"keep":true}');
      const logs = [];
      const r = syncPosting({ dir: join(tmp, 'no-such-renders-folder'), teaserDir: join(tmp, 'no-such-teasers'), out, log: (m) => logs.push(m) });
      if (r.synced || readFileSync(out, 'utf8') !== '{"keep":true}') fail('sync-posting changed the JSON although the folder is missing');
      if (!/folder not found/.test(logs.join(' '))) fail('sync-posting did not say the folder is missing');
      const r2 = syncPosting({ dir: join(tmp, 'no-such-renders-folder'), teaserDir: join(tmp, 'no-such-teasers'), out: join(tmp, 'absent.json'), log: () => {} });
      if (r2.synced || existsSync(join(tmp, 'absent.json'))) fail('sync-posting wrote a JSON although the folder is missing');
      const { spawnSync } = await import('node:child_process');
      const run = spawnSync(process.execPath, [join(root, 'scripts/sync-posting.mjs'), '--dir', join(tmp, 'missing'), '--teasers', join(tmp, 'missing-teasers'), '--out', join(tmp, 'cli.json')], { encoding: 'utf8' });
      if (run.status !== 0 || existsSync(join(tmp, 'cli.json'))) fail(`node scripts/sync-posting.mjs with a missing folder exited ${run.status}`);
      const sample = parsePosting('## Videos\n\n### V01 · "We launched today."\n\n| | |\n|---|---|\n| **TikTok** | `V01_tiktok_9x16.mp4` · calendar Mon 26 Oct 12:00 |\n| **Cover** | `V01_cover.jpg` |\n| **Keyword** | SITE |\n\nTikTok caption:\n> Hello.\n> #makeborne\n');
      if (sample.length !== 1 || sample[0].date !== '2026-10-26' || sample[0].time !== '12:00' || sample[0].caption !== 'Hello.' || sample[0].hashtags[0] !== '#makeborne' || sample[0].cover !== 'V01_cover.jpg') fail(`parsePosting sample: ${JSON.stringify(sample[0])}`);
      const { applySchedule } = await import('./sync-posting.mjs');
      const mapped = applySchedule([{ ...sample[0], platforms: ['TikTok'] }, { ...sample[0], id: 'V05', date: '2026-10-28', time: '13:00', makeUp: { date: '2026-10-29', time: '13:00' } }], P.schedule);
      if (mapped[0].date !== '2026-10-28' || mapped[0].time !== '19:00' || mapped[1].date !== '2026-10-30' || mapped[1].time !== '13:00' || mapped[1].makeUp) fail(`schedule mapping: ${JSON.stringify(mapped.map((m) => [m.id, m.date, m.time, m.makeUp]))}`);
      const tsample = parsePosting('## Teasers\n\n### T1 · "Wednesday. 19:00."\n\n| | |\n|---|---|\n| **TikTok** | `T1_tiktok_9x16.mp4` · calendar Tue 27 Oct 09:00 |\n| **Instagram Reels** | `T1_reel_9x16.mp4` · calendar Tue 27 Oct 09:00 |\n\n### S1 · `S1_story_01.jpg` · Instagram Stories, Tue 27 Oct 09:15\nLink sticker: makeborne.com. Disclosure: none.\n> Wednesday, 19:00.\n');
      if (tsample.length !== 3 || tsample[0].id !== 'T1' || tsample[0].date !== '2026-10-27' || tsample[2].id !== 'S1' || tsample[2].files[0].name !== 'S1_story_01.jpg' || tsample[2].time !== '09:15') fail(`parsePosting teaser sample: ${JSON.stringify(tsample.map((t) => [t.id, t.platforms, t.date, t.time]))}`);
      // The teaser folder is optional: a present launch-week folder and a missing teaser folder still sync.
      const lwDir = join(tmp, 'lw');
      mkdirSync(lwDir);
      writeFileSync(join(lwDir, 'POSTING.md'), '## Videos\n\n### V01 · "We launched today."\n\n| | |\n|---|---|\n| **TikTok** | `V01_tiktok_9x16.mp4` · calendar Mon 26 Oct 12:00 |\n');
      const out3 = join(tmp, 'p3.json');
      writeFileSync(out3, JSON.stringify({ schedule: P.schedule, items: [] }));
      const r3 = syncPosting({ dir: lwDir, teaserDir: join(tmp, 'no-such-teasers'), out: out3, log: () => {} });
      const p3 = JSON.parse(readFileSync(out3, 'utf8'));
      if (!r3.synced || p3.items[0]?.date !== '2026-10-28' || p3.items[0]?.time !== '19:00' || !p3.toMake?.T1) fail('sync with a missing teaser folder did not map V01 to Wed 28 Oct 19:00 or lost the teaser "to make" reasons');
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
    if (failures === before) console.log(`  ok   ${P.items.length} finished items (${P.items.filter((i) => i.ready).length} ready); ${linked} calendar posts linked to a ready file, ${toMake} say "to make"; no media in the repo; sync with a missing folder is a clean no-op`);
  }

  // ---------- the launch: Wed 28 Oct 2026, 19:00 CET (18:00 UTC) ----------
  console.log('\nThe launch (Wed 28 Oct 2026, 19:00 CET) and the 90-day window');
  {
    const before = failures;
    const cal = JSON.parse(readFileSync(join(root, 'data/calendar.json'), 'utf8'));
    const P = JSON.parse(readFileSync(join(root, 'data/posting.json'), 'utf8'));
    const teasers = new Set(Object.keys(P.teasers ?? {}));
    const dayOf = (d) => cal.find((x) => x.date === d)?.day;
    if (cal[0].date !== '2026-10-26' || cal.at(-1).date !== '2027-01-25' || cal.length !== 92) fail(`calendar runs ${cal[0].date} to ${cal.at(-1).date} (${cal.length} days), want 2026-10-26 to 2027-01-25 (92)`);
    if (dayOf('2026-10-26') !== -2 || dayOf('2026-10-27') !== -1 || dayOf('2026-10-28') !== 1 || dayOf('2027-01-25') !== 90) fail('day numbers: want 26 Oct = -2, 27 Oct = -1, 28 Oct = day 1, 25 Jan = day 90');
    const launchedDays = cal.filter((d) => d.day >= 1).length;
    if (launchedDays !== 90) fail(`${launchedDays} launch days in the calendar, want 90`);
    // No launched post before Wed 28 Oct 18:00 UTC (19:00 CET): before it, only teasers, and none of them says it is live.
    const LIVE = /\b(we launched|launched today|just launched|live now|we're live|is live)\b/i;
    const at = (d, p) => Date.parse(`${d}T${p.time.slice(0, 5)}:00+01:00`);
    const LAUNCH_MS = Date.parse('2026-10-28T18:00:00Z');
    let early = 0;
    for (const d of cal.filter((x) => x.date <= '2026-10-28')) for (const p of d.posts) {
      if (!/^\d{2}:\d{2}/.test(p.time)) fail(`${d.date} ${p.channel} ${p.contentId}: no clock time around the launch`);
      if (at(d.date, p) >= LAUNCH_MS) continue;
      early++;
      if (!teasers.has(p.contentId)) fail(`${d.date} ${p.time.slice(0, 5)} ${p.channel} ${p.contentId}: a non-teaser post before the 19:00 CET launch`);
      else if (LIVE.test(P.teasers[p.contentId])) fail(`${p.contentId}: a teaser before 19:00 claims it is live`);
    }
    for (const it of P.items ?? []) if (it.date && it.time && Date.parse(`${it.date}T${it.time}:00+01:00`) < LAUNCH_MS && !teasers.has(it.id)) fail(`posting.json: ${it.id} on ${it.platforms.join('/')} is scheduled ${it.date} ${it.time}, before the launch`);
    const t7 = cal.find((d) => d.date === '2026-10-28').posts.filter((p) => p.contentId === 'T7');
    if (!t7.length || t7.some((p) => !p.time.startsWith('19:00'))) fail('the T7 "We\'re live" sting is not at Wed 28 Oct 19:00');
    // Day 90 holds the day-90 review; the plan's launch block names the moment.
    const d90 = cal.find((d) => d.date === '2027-01-25');
    if (!d90.actions.some((a) => /^Day-90 review/.test(a.what))) fail('Mon 25 Jan (day 90) has no day-90 review');
    const plan = JSON.parse(readFileSync(join(root, 'data/plan.json'), 'utf8'));
    if (plan.launch?.utc !== '2026-10-28T18:00:00Z' || plan.launchWeek[0].date !== '2026-10-28' || plan.launchWeek.at(-1).date !== '2026-11-03') fail('plan.json launch / launchWeek is not anchored on Wed 28 Oct');
    const ck = JSON.parse(readFileSync(join(root, 'data/checkpoints.json'), 'utf8')).checkpoints;
    for (const [date, re] of [['2026-11-22', /Re-forecast/], ['2026-12-20', /Breakout/], ['2027-01-25', /Day-90/]]) if (!ck.some((c) => c.date === date && re.test(c.title))) fail(`checkpoint ${re} is not on ${date}`);
    const ads = JSON.parse(readFileSync(join(root, 'data/ads.json'), 'utf8'));
    const a01 = ads.adCalendar.flatMap((w) => w.adItems).find((a) => a.card === 'A01');
    const a02 = ads.adCalendar.flatMap((w) => w.adItems).find((a) => a.card === 'A02');
    if (a01?.from !== '2026-11-12' || a01?.to !== '2026-11-15' || a02?.from !== '2026-12-03' || a02?.to !== '2026-12-04') fail('the ad slots A01 (12-15 Nov) and A02 (3-4 Dec) moved');
    if (failures === before) console.log(`  ok   26-27 Oct pre-launch, day 1 = Wed 28 Oct, day 90 = Mon 25 Jan; ${early} posts before 19:00 CET, all teasers that never say it is live; V01 and T7 at 19:00; A01, A02 and the checkpoints keep their dates`);
  }

  // ---------- forecast maths ----------
  console.log('\nForecast and analytics maths (seeded)');
  try {
    await runForecastChecks((m) => server.ssrLoadModule(m), root, fail);
  } catch (e) {
    fail(`forecast checks threw: ${e?.stack ?? e}`);
  }

  // ---------- confidential markers ----------
  console.log('\nConfidential-marker scan (README, data, plan, research, content, src)');
  const MARKERS = [
    [/grants? no credits|get no credits|memberships with no credits|store-page leak/i, 'unreleased checkout defect'],
    [/Gmail or Outlook|print-ready e-book/i, 'live copy that overclaims'],
    [/\$10 ?(?:a|\/|per) ?day (?:of (?:limit|cap) )?covers/i, 'daily AI spend figure'],
    [/45[-–]55 (?:h|hours)/i, 'staffing load'],
    [/BiH checklist|withholding tax|merchant[- ]of[- ]record|legal basis for product-update/i, 'open legal or tax question'],
    [/Z:\\(?!\\?makeborne-marketing\\{1,2}launch-(?:week|teasers)\\{1,2}renders)|src\/lib\/hosting|client-review-page\.tsx|LEGACY_SITE_URL_TEMPLATE|docs\/release-review|release\/minimum-launch|release worktree|alba\.makeborne\.site/i, 'internal code or infrastructure path'],
  ];
  const scanDirs = ['data', 'plan', 'research', 'content', 'src'];
  const files = ['README.md'];
  const walk = (dir) => {
    for (const e of readdirSync(join(root, dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`;
      if (e.isDirectory()) walk(rel);
      else if (/\.(md|json|py|ts|tsx|css|mjs)$/.test(e.name)) files.push(rel);
    }
  };
  scanDirs.forEach(walk);
  let markerHits = 0;
  for (const f of files) {
    const lines = readFileSync(join(root, f), 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const [re, what] of MARKERS) {
        if (re.test(line) && !line.includes('MARKERS')) {
          markerHits++;
          fail(`${f}:${i + 1}: ${what} (move it to private/owner-notes.md)`);
        }
      }
    });
  }
  if (!markerHits) console.log(`  ok   ${files.length} files clean`);

  // ---------- unsubstantiated input claims ("one sentence") ----------
  // Every real Makeborne output used in marketing came from a 500-1,000-character brief, so copy may not say a site, deck
  // or book came from one sentence (advertising claims must be substantiated); it says "one brief". research/ keeps
  // third-party quotes as they are, so it is not scanned. CLAIM_OK lists the only non-claim uses allowed elsewhere.
  console.log('\nInput claims outside research/ (no "one sentence" or "one-line brief"; say "one brief")');
  {
    const CLAIM = /\b(?:one|1|single)[- ]sentences?\b|\bone[- ]line (?:brief|idea)s?\b/i;
    const CLAIM_OK = [
      /\[one sentence from the brief below\]/, // content/videos.md creator brief: a writing instruction, not a product claim
      /v13 "One Sentence"/, // content/videos.md: title of the rejected v13 film, listed under "Never"
    ];
    const SKIP = new Set(['node_modules', 'dist', '.git', 'private', 'research']);
    const claimFiles = [];
    const walkClaims = (dir) => {
      for (const e of readdirSync(join(root, dir), { withFileTypes: true })) {
        if (SKIP.has(e.name)) continue;
        const rel = dir === '.' ? e.name : `${dir}/${e.name}`;
        if (e.isDirectory()) walkClaims(rel);
        else if (/\.(md|json|html|ts|tsx|mjs|js|css|py|txt|toml|svg|ya?ml)$/i.test(e.name) && rel !== 'scripts/check-routes.mjs') claimFiles.push(rel);
      }
    };
    walkClaims('.');
    let claimHits = 0;
    for (const f of claimFiles) {
      readFileSync(join(root, f), 'utf8').split(/\r?\n/).forEach((line, i) => {
        const rest = CLAIM_OK.reduce((l, re) => l.replace(new RegExp(re.source, 'g'), ''), line);
        const hit = rest.match(CLAIM);
        if (!hit) return;
        claimHits++;
        fail(`${f}:${i + 1}: "${hit[0]}" is not substantiated (real outputs came from 500-1,000-character briefs); say "one brief"`);
      });
    }
    if (!claimHits) console.log(`  ok   ${claimFiles.length} files outside research/ say "one brief", not "one sentence"`);
  }

  if (!modelOnly) {
    // ---------- routes ----------
    const React = await import('react');
    const { prerenderToNodeStream } = await import('react-dom/static');
    const { App } = await server.ssrLoadModule('/src/App.tsx');
    const research = readdirSync(join(root, 'research')).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
    const routes = [
      // The four tabs.
      ['#/today', 'Log numbers'],
      ['#/today', 'Start here'],
      ['#/today', 'How to use this site'],
      ['#/today/2026-10-29', 'ready to post'],
      ['#/today/2026-10-26', 'Do not post V01 tonight'],
      ['#/today/2026-10-26', 'Pre-launch day −2'],
      ['#/today/2026-10-26', 'Launch in'],
      ['#/today/2026-10-26', 'Before you post anything'],
      ['#/today/2026-10-27', 'Pre-launch day −1'],
      ['#/today/2026-10-27', 'countdown sticker'],
      ['#/today/2026-10-27', 'Optional'],
      ['#/today/2026-10-28', 'Day 1'],
      ['#/today/2026-10-28', 'LAUNCH — 19:00 CET'],
      ['#/today/2026-10-28', 'Run of show'],
      ['#/today/2026-10-28', 'V01_tiktok_9x16.mp4'],
      ['#/today/2026-10-28', 'We&#x27;re live'],
      ['#/today/2026-10-29', 'Before you post anything'],
      ['#/today/2026-10-29', 'to make'],
      ['#/today/2026-10-31', 'C06_carousel_01.jpg'],
      ['#/today/2026-10-28', 'TAAFT'],
      ['#/today/2026-11-03', 'Instagram Reel'],
      ['#/today/2026-11-11', 'Get ready A01'],
      ['#/today/2026-11-12', 'Launch A01'],
      ['#/today/2026-12-03', 'Launch A02'],
      ['#/today/2026-11-16', 'OFFER CHECK'],
      ['#/today/2027-03-01', 'outside the 90-day plan'],
      ['#/today/2026-11-31', 'Post'],
      ['#/today/2027-01-25', 'Day 90'],
      ['#/today/2027-01-25', 'Day-90 review'],
      ['#/plan', 'The plan in one screen'],
      ['#/plan/decisions', 'Decisions to make'],
      ['#/ads', 'Pre-flight'],
      ['#/ads/A01', 'STOP if'],
      ['#/ads/A06', 'from revenue, not the $1,000'],
      ['#/results', 'The verdict'],
      ['#/results/sample', 'SAMPLE'],
      ['#/results/sample/funnel', 'Weekly scorecard'],
      ['#/results/sample/forecast', 'Chance of each checkpoint'],
      ['#/results/forecast', 'How this is calculated'],
      // The Library.
      ['#/library', 'Search the library'],
      ['#/library/videos', 'Every <em>video</em>'],
      ['#/library/images', 'Every <em>image</em>'],
      ['#/library/videos/V01', 'Script'],
      ['#/library/images/C05', 'Generation prompt'],
      ['#/library/production', 'How we make <em>videos</em>'],
      ['#/library/production', 'Separate from the $1,000.'],
      ['#/library/production', 'Copy prompt HF01'],
      ['#/library/production', 'Per-video sheets'],
      ['#/today/2026-10-27', 'Higgsfield Plus'],
      ['#/today/2026-10-28', 'Higgsfield shots for V07'],
      ['#/library/instagram', 'Instagram playbook'],
      ['#/library/ads-playbook', 'Ads playbook'],
      ['#/library/where-to-post', 'master posting sheet'],
      ['#/library/outreach', 'Merge fields'],
      ['#/library/outreach/launch', 'Product Hunt'],
      ['#/library/outreach/targets', 'How to find'],
      ['#/library/outreach/affiliate', 'Commission'],
      ['#/library/outreach/compliance', 'Email law matrix'],
      ['#/library/tracking', 'Short link'],
      ['#/library/tracking/events', 'Event spec'],
      ['#/library/tracking/consent', 'Consent banner'],
      ['#/library/tracking/rules', 'Kill and scale'],
      ['#/library/budget', 'Allocator'],
      ['#/library/funnel', 'What must be true'],
      ['#/library/calendar', 'Ninety days'],
      ['#/library/calendar/2026-11-27', 'Day 31'],
      ['#/library/strategy', 'Executive summary'],
      ['#/library/research', 'The <em>evidence</em>'],
      ['#/library/research/strategy', 'Executive summary'],
      ['#/library/research/no-such-doc', 'Not in the library'],
      ['#/unknown-route', 'Post'],
      // Old routes land on their new homes.
      ['#/strategy', 'The plan in one screen'],
      ['#/strategy/decisions', 'Decisions to make'],
      ['#/calendar', 'The 13 weeks'],
      ['#/calendar/2026-11-27', 'Day 31'],
      ['#/analytics', 'The verdict'],
      ['#/analytics/sample', 'SAMPLE'],
      ['#/analytics/sample/funnel', 'Weekly scorecard'],
      ['#/predictions', 'How this is calculated'],
      ['#/predictions/sample', 'The verdict'],
      ['#/budget', 'Allocator'],
      ['#/funnel', 'What must be true'],
      ['#/content', 'Every <em>video</em>'],
      ['#/content/V01', 'Script'],
      ['#/content/C05', 'Generation prompt'],
      ['#/outreach/launch', 'Product Hunt'],
      ['#/tracking/consent', 'Consent banner'],
      ['#/research', 'The <em>evidence</em>'],
      ['#/research/strategy', 'Executive summary'],
      ...research.map((r) => [`#/library/research/${r}`, 'Contents']),
    ];

    // Old hashes resolve to the new routes, and links built with old ids point at the new homes.
    const R = await server.ssrLoadModule('/src/routes.tsx');
    const LEGACY_EXPECT = [
      ['#/analytics/sample/funnel', 'results/sample/funnel'],
      ['#/predictions', 'results'],
      ['#/content/V01', 'library/videos/V01'],
      ['#/content/C05', 'library/images/C05'],
      ['#/calendar/2026-11-27', 'today/2026-11-27'],
      ['#/calendar', 'plan'],
      ['#/strategy/decisions', 'plan/decisions'],
      ['#/budget', 'library/budget'],
      ['#/funnel', 'library/funnel'],
      ['#/outreach/launch', 'library/outreach/launch'],
      ['#/tracking/rules', 'library/tracking/rules'],
      ['#/research/paid-acquisition', 'library/research/paid-acquisition'],
    ];
    console.log('\nOld routes redirect to their new homes');
    for (const [old, want] of LEGACY_EXPECT) {
      const p = R.parseHash(old);
      const got = [p.id, ...p.params].join('/');
      const built = R.href(...old.slice(2).split('/'));
      if (got !== want || !p.legacy) fail(`${old} -> ${got} (want ${want})`);
      else if (built !== `#/${want}`) fail(`href(${old}) -> ${built}`);
      else console.log(`  ok   ${old.padEnd(32)} -> #/${want}`);
    }
    console.log(`\nRendering ${routes.length} routes`);
    const errors = [];
    const origError = console.error;
    console.error = (...a) => errors.push(a.map(String).join(' '));
    for (const [hash, expect] of routes) {
      errors.length = 0;
      try {
        const { prelude } = await prerenderToNodeStream(React.createElement(App, { initialHash: hash }), { onError: (e) => errors.push(String(e?.stack ?? e)) });
        let html = '';
        for await (const chunk of prelude) html += chunk;
        const text = html.replace(/<[^>]+>/g, ' ');
        if (errors.length) fail(`${hash}: ${errors[0].split('\n')[0]}`);
        else if (!html.includes('<h1')) fail(`${hash}: no <h1> rendered`);
        // React separates adjacent text nodes with <!-- --> in server HTML; read the text as the browser shows it.
        else if (!html.replace(/<!-- -->/g, '').includes(expect)) fail(`${hash}: expected "${expect}"`);
        else if (/Loading [A-Z]/.test(text) && !html.includes('<h1')) fail(`${hash}: stuck on the loading fallback`);
        else console.log(`  ok   ${hash.padEnd(40)} ${(html.length / 1024).toFixed(0).padStart(5)} kB`);
      } catch (e) {
        fail(`${hash}: ${e?.message ?? e}`);
      }
    }
    console.error = origError;

    // ---------- dist ----------
    console.log('\nBuilt output (dist/)');
    const dist = join(root, 'dist');
    if (!existsSync(join(dist, 'index.html'))) fail('dist/index.html missing: run npm run build first');
    else {
      const index = readFileSync(join(dist, 'index.html'), 'utf8');
      if (!index.includes('Content-Security-Policy')) fail('CSP meta tag missing from dist/index.html');
      const refs = [...index.matchAll(/(?:src|href)="\.\/([^"]+)"/g)].map((m) => m[1]);
      for (const r of refs) if (!existsSync(join(dist, r))) fail(`dist/${r} referenced but missing`);
      if (/(?:src|href)="https?:\/\//.test(index)) fail('index.html loads an external origin');
      const js = readdirSync(join(dist, 'assets')).filter((f) => f.endsWith('.js'));
      for (const f of js) {
        const src = readFileSync(join(dist, 'assets', f), 'utf8');
        if (/\bfetch\(\s*["'`]https?:/.test(src) || /new\s+WebSocket\(/.test(src) || /navigator\.sendBeacon/.test(src)) fail(`${f} makes a network call`);
      }
      console.log(`  ok   ${refs.length} referenced files present, ${js.length} JS chunks scanned, CSP present`);
    }
  }
} finally {
  await server.close();
}

console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
process.exit(failures ? 1 : 0);

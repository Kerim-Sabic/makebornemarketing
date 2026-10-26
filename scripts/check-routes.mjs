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
import { createServer } from 'vite';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
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
    else console.log(`  ok   dated money over the 91 days adds up to $${money.toFixed(0)}`);
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
    const igReels = files.calendar.filter((d) => d.date === '2026-11-03' || d.date === '2026-11-04').flatMap((d) => d.posts.filter((p) => p.channel === 'Instagram Reels'));
    if (!igReels.length || igReels.some((p) => !p.time.startsWith('20:15'))) fail('the Tue 3 and Wed 4 Nov Instagram Reels are not at 20:15 (posting-time test)');
    else console.log('  ok   one-form tracking codes; 3-4 Nov Reels at 20:15 for the time test');
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
    [/Z:\\|src\/lib\/hosting|client-review-page\.tsx|LEGACY_SITE_URL_TEMPLATE|docs\/release-review|release\/minimum-launch|release worktree|alba\.makeborne\.site/i, 'internal code or infrastructure path'],
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

  if (!modelOnly) {
    // ---------- routes ----------
    const React = await import('react');
    const { prerenderToNodeStream } = await import('react-dom/static');
    const { App } = await server.ssrLoadModule('/src/App.tsx');
    const research = readdirSync(join(root, 'research')).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
    const routes = [
      // The four tabs.
      ['#/today', 'Log numbers'],
      ['#/today/2026-10-26', 'TAAFT'],
      ['#/today/2026-11-03', 'Instagram Reel'],
      ['#/today/2026-11-11', 'Get ready A01'],
      ['#/today/2026-11-12', 'Launch A01'],
      ['#/today/2026-12-03', 'Launch A02'],
      ['#/today/2026-11-16', 'OFFER CHECK'],
      ['#/today/2027-03-01', 'outside the 90-day plan'],
      ['#/today/2026-11-31', 'Post'],
      ['#/today/2027-01-24', 'Day 91'],
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
      ['#/library/calendar/2026-11-27', 'Day 33'],
      ['#/library/strategy', 'Executive summary'],
      ['#/library/research', 'The <em>evidence</em>'],
      ['#/library/research/strategy', 'Executive summary'],
      ['#/library/research/no-such-doc', 'Not in the library'],
      ['#/unknown-route', 'Post'],
      // Old routes land on their new homes.
      ['#/strategy', 'The plan in one screen'],
      ['#/strategy/decisions', 'Decisions to make'],
      ['#/calendar', 'The 13 weeks'],
      ['#/calendar/2026-11-27', 'Day 33'],
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

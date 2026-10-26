// Route and model smoke test. Run after `npm run build`:  npm run check
// 1. Renders every route (and deep links) to HTML through Vite's SSR loader and fails on any error or empty page.
// 2. Runs the TypeScript funnel model against every scenario's referenceOutputs in data/funnel.json (within 1%).
// 3. Checks dist/: every asset the page references exists, the CSP is present, and no external origin is loaded.
// 4. Fails when a data/plan.json scenario's mrrDay90 drifts more than 5% from the calculator (referenceOutputs.mrrEnd).
// 5. Scans the files that would be pushed for known confidential markers (the repo may be public; owner-only notes go in private/).
import { createServer } from 'vite';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

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
      ['#/today', 'Posts'],
      ['#/today/2026-11-16', 'Offer check'],
      ['#/today/2027-03-01', 'Outside the window'],
      ['#/today/2026-11-31', 'Posts'],
      ['#/today/2027-01-24', 'Day-90 review'],
      ['#/strategy', 'Executive summary'],
      ['#/strategy/decisions', 'Owner decisions'],
      ['#/budget', 'Allocator'],
      ['#/funnel', 'What must be true'],
      ['#/analytics', 'Conversion by channel'],
      ['#/content', 'The <em>library</em>'],
      ['#/content/V01', 'Script'],
      ['#/content/C05', 'Generation prompt'],
      ['#/calendar', 'Ninety days'],
      ['#/calendar/2026-11-27', 'Day 33'],
      ['#/outreach', 'Merge fields'],
      ['#/outreach/launch', 'Product Hunt'],
      ['#/outreach/targets', 'How to find'],
      ['#/outreach/affiliate', 'Commission'],
      ['#/outreach/compliance', 'Email law matrix'],
      ['#/tracking', 'Short link'],
      ['#/tracking/events', 'Event spec'],
      ['#/tracking/consent', 'Consent banner'],
      ['#/tracking/rules', 'Kill and scale'],
      ['#/research', 'The <em>evidence</em>'],
      ['#/research/strategy', 'Executive summary'],
      ['#/research/no-such-doc', 'Not in the library'],
      ['#/unknown-route', 'Posts'],
      ...research.map((r) => [`#/research/${r}`, 'Contents']),
    ];
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
        else if (!html.includes(expect)) fail(`${hash}: expected "${expect}"`);
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

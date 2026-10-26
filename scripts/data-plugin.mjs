// Build-time slim indexes of the plan's data, so a page loads only what it shows.
//   virtual:war-room/calendar-index   date, day and phase of every day, plus one lazy loader per day
//   virtual:war-room/calendar-day/<d> one calendar day (its own small chunk), plus the Today page's joins (scripts/plan-data.mjs):
//                                     the week's targets, Instagram kick-off steps, what to make, ad cards due, today's money
//   virtual:war-room/plan-weeks       13 week cards and the launch-week day cards for the Plan page
//   virtual:war-room/production-simple  "How we make videos" and the weekly make-lists from data/production.json
//   virtual:war-room/content-index    id -> title, kind, format, length and hook code of every video and creative
//   virtual:war-room/funnel-scenarios id, name, inputs and reference outputs of every data/funnel.json scenario
//   virtual:war-room/docs-index       metadata of every Markdown document (the text itself loads per document)
// The source files stay the single source of truth: nothing is generated into the repository.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { planWeeks, todayExtras } from './plan-data.mjs';

const PREFIX = 'virtual:war-room/';
const RESOLVED = '\0' + PREFIX;
const DOC_GROUPS = ['plan', 'research', 'content'];

export function warRoomData() {
  let root = '.';
  const abs = (p) => join(root, p);
  const read = (ctx, p) => {
    ctx.addWatchFile(abs(p));
    return readFileSync(abs(p), 'utf8');
  };
  // Parsed files are cached by modification time: 91 day chunks would otherwise parse calendar.json 91 times.
  const cache = new Map();
  const json = (ctx, p) => {
    ctx.addWatchFile(abs(p));
    const mtime = statSync(abs(p)).mtimeMs;
    const hit = cache.get(p);
    if (hit && hit.mtime === mtime) return hit.value;
    const text = readFileSync(abs(p), 'utf8');
    const value = p.endsWith('.json') ? JSON.parse(text) : text;
    cache.set(p, { mtime, value });
    return value;
  };
  const files = (ctx) => ({
    calendar: json(ctx, 'data/calendar.json'),
    instagram: json(ctx, 'data/instagram.json'),
    production: json(ctx, 'data/production.json'),
    ads: json(ctx, 'data/ads.json'),
    kpis: json(ctx, 'data/kpis.json'),
    creatives: json(ctx, 'data/creatives.json'),
    videos: json(ctx, 'data/videos.json'),
    checkpoints: json(ctx, 'data/checkpoints.json'),
    plan: json(ctx, 'data/plan.json'),
    calendarMd: json(ctx, 'content/calendar.md'),
  });

  return {
    name: 'war-room-data',
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      if (id.startsWith(PREFIX)) return '\0' + id;
      return undefined;
    },
    load(id) {
      if (!id.startsWith(RESOLVED)) return undefined;
      const what = id.slice(RESOLVED.length);

      if (what === 'calendar-index') {
        const cal = json(this, 'data/calendar.json');
        const meta = cal.map((d) => ({ date: d.date, day: d.day, phase: d.phase }));
        const loaders = cal.map((d) => `  ${JSON.stringify(d.date)}: () => import(${JSON.stringify(`${PREFIX}calendar-day/${d.date}`)}).then((m) => m.default),`);
        return `export const DAYS = ${JSON.stringify(meta)};\nexport const DAY_LOADERS = {\n${loaders.join('\n')}\n};\n`;
      }

      if (what.startsWith('calendar-day/')) {
        const date = what.slice('calendar-day/'.length);
        const day = json(this, 'data/calendar.json').find((d) => d.date === date);
        if (!day) this.error(`No calendar day ${date} in data/calendar.json`);
        return `export default ${JSON.stringify({ ...day, extra: todayExtras(files(this), date) })};\n`;
      }

      if (what === 'plan-weeks') {
        const { weeks, launchDays } = planWeeks(files(this));
        const igDecisions = json(this, 'data/instagram.json').ownerDecisions.map((d) => ({ id: d.id, question: d.decision, recommendation: d.recommendation }));
        return `export const WEEKS = ${JSON.stringify(weeks)};\nexport const LAUNCH_DAYS = ${JSON.stringify(launchDays)};\nexport const IG_DECISIONS = ${JSON.stringify(igDecisions)};\n`;
      }

      if (what === 'production-simple') {
        const p = json(this, 'data/production.json');
        const decisions = p.decisions.map((d) => ({ id: d.id, question: d.question, recommendation: d.recommendation, deadline: d.deadline }));
        return `export const SIMPLE = ${JSON.stringify(p.simple)};\nexport const DECISIONS = ${JSON.stringify(decisions)};\nexport const COUNTS = ${JSON.stringify(p.meta.counts)};\n`;
      }

      if (what === 'content-index') {
        const out = {};
        for (const v of json(this, 'data/videos.json')) out[v.id] = { kind: 'video', title: v.title, format: v.format, lengthSec: v.lengthSec, hookCode: v.hookCode };
        for (const c of json(this, 'data/creatives.json')) out[c.id] = { kind: 'creative', title: c.concept || c.headline, hookCode: c.hookCode };
        return `export const CONTENT_INDEX = ${JSON.stringify(out)};\n`;
      }

      if (what === 'funnel-scenarios') {
        // Inputs and reference outputs only: the Analytics and Predictions pages need the plan's rates, not the notes.
        const f = json(this, 'data/funnel.json');
        const out = f.scenarios.map((s) => ({ id: s.id, name: s.name, inputs: s.inputs, referenceOutputs: s.referenceOutputs }));
        return `export const SCENARIOS = ${JSON.stringify(out)};
`;
      }

      if (what === 'docs-index') {
        const docs = [];
        for (const group of DOC_GROUPS) {
          for (const f of readdirSync(abs(group)).filter((x) => x.endsWith('.md'))) {
            const source = read(this, `${group}/${f}`);
            const slug = f.replace(/\.md$/, '');
            const title = (source.match(/^#\s+(.+)$/m)?.[1] ?? slug).trim();
            const intro =
              source
                .split(/\r?\n/)
                .map((l) => l.trim())
                .find((l) => l && !l.startsWith('#') && !l.startsWith('**') && !l.startsWith('-') && !l.startsWith('|') && l.length > 40) ?? '';
            docs.push({
              slug,
              group,
              path: `${group}/${f}`,
              title,
              intro,
              words: source.split(/\s+/).length,
              hasVerification: /##\s*Verification/i.test(source),
              hasSources: /##\s*(\d+\.\s*)?(Key\s+)?Sources/i.test(source),
            });
          }
        }
        return `export const DOC_INDEX = ${JSON.stringify(docs)};\n`;
      }

      this.error(`Unknown virtual module ${id}`);
      return undefined;
    },
  };
}

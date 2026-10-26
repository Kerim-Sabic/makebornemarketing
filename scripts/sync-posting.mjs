// Reads the render agent's POSTING.md (the finished launch-week videos and images) and writes data/posting.json,
// which the Today page joins to its post items: "File: V01_reel_9x16.mp4 (in <folder>)" and a "ready to post" badge.
//
//   node scripts/sync-posting.mjs                       read Z:\makeborne-marketing\launch-week\renders\POSTING.md
//   node scripts/sync-posting.mjs --dir <folder>        read <folder>/POSTING.md instead
//   node scripts/sync-posting.mjs --out <file>          write somewhere other than data/posting.json (used by npm run check)
//
// It never copies media: only file names, platforms, times, captions, hashtags, keywords, links, covers and disclosures.
// When the folder or POSTING.md is missing (a Netlify build, another computer) it prints a note, leaves the committed
// data/posting.json as it is and exits 0. The build only ever reads the JSON.
//
// Hand-written parts of data/posting.json survive a re-sync: `toMake` (why a post has no file yet, in plain words),
// `beforePosting` (the one-time checklist) and `reminders` (dated one-off Today items). Edit them in the JSON.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DEFAULT_DIR = 'Z:\\makeborne-marketing\\launch-week\\renders';

const MONTHS = { Oct: '10', Nov: '11', Dec: '12', Jan: '01' };
const WHEN = /\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (\d{1,2}) (Oct|Nov|Dec|Jan) (\d{1,2}:\d{2})/;
const iso = (d, mon) => `${mon === 'Jan' ? 2027 : 2026}-${MONTHS[mon]}-${String(d).padStart(2, '0')}`;
const hhmm = (t) => t.padStart(5, '0');
const PLATFORM_PREFIX = { tt: ['TikTok'], ig: ['Instagram Reels', 'Instagram feed', 'Instagram carousel', 'Instagram Stories'], yt: ['YouTube Shorts'], li: ['LinkedIn'], x: ['X'] };
const prefixOf = (platform) => Object.entries(PLATFORM_PREFIX).find(([, ps]) => ps.includes(platform))?.[0];
const ticks = (s) => [...String(s).matchAll(/`([^`]+)`/g)].map((m) => m[1]);
const isMedia = (f) => /\.(mp4|mov|jpg|jpeg|png|webp)$/i.test(f);
const clean = (s) => String(s ?? '').replace(/\*\*/g, '').trim();
/** 'TikTok and Shorts: "What should I build next? Comment it." · Instagram: SITE' -> the part for this platform. */
function keywordFor(row, platforms) {
  const parts = clean(row.replace(/`/g, '')).split(/\s+·\s+/).map((p) => p.match(/^([^:"]+):\s*(.+)$/)).filter(Boolean);
  if (!parts.length) return clean(row.replace(/`/g, ''));
  const hit = parts.find(([, label]) => platforms.some((p) => label.toLowerCase().includes(p.split(' ')[0].toLowerCase()) || (p === 'YouTube Shorts' && /shorts/i.test(label))));
  return (hit ?? parts[0])[2].replace(/^"(.*)"$/, '$1');
}

/** Default hand-written parts (used only when data/posting.json does not have them yet). */
const DEFAULTS = {
  toMake: {
    V04: 'Needs a real comment asking for a website, and that person\'s written OK, before it can be made. Until then post V02 in its TikTok slot.',
    V07: 'Needs the Higgsfield shots: you sign up on Tue 27 Oct and the shots are made on Wed 28 Oct.',
    V08: 'Needs a founder video: film yourself to camera (about 25 minutes).',
    V09: 'Needs the Day-7 numbers (Sun 1 Nov): film it once you know how many people paid.',
    V10: 'Needs one fictional brief built as a site, a deck and a client guide, then the three-up layout.',
    C02: 'Needs a phone screenshot of a client approving on the review page.',
    C05: 'Needs the Instagram comment-keyword DM switched on first, then the slides captured.',
    C15: 'Needs the Instagram keyword DM switched on, and the "30-second uncut build" it promises does not exist yet.',
    C17: 'Needs a screenshot of the deck opened in PowerPoint with the chart\'s data sheet open.',
  },
  beforePosting: [
    { key: 'music', text: 'Add the music inside each app', how: 'No music is baked into the videos. TikTok: pick a track from the Commercial Music Library. Instagram: the Meta music library. YouTube Shorts: the Shorts library. LinkedIn and X: no music. Keep it low so the sound effects still click.' },
    { key: 'keywords', text: 'Switch on the SITE, DECK and CLIENT DM keywords', how: 'Captions say "Comment SITE", "DM me DECK" and "Comment CLIENT". Turn on the Instagram comment-to-DM automation for those three words first (Instagram playbook, template t21).' },
    { key: 'uncut', text: 'Remove the "30-second uncut build" line from the DM', how: 'The keyword DM promises a 30-second uncut build, and that recording does not exist yet. Take the line out of the DM until it is recorded.' },
  ],
  reminders: [
    { date: '2026-10-26', time: '23:00', group: 'post', text: 'Post V01 before midnight, or use the _justlaunched file tomorrow', how: 'The V01 files say "We launched today." Post them tonight (TikTok, Instagram Reel, YouTube Shorts). From Tue 27 Oct use the _justlaunched files instead ("We just launched.") and write "We just launched Makeborne" in the captions.' },
  ],
};

/** Parse POSTING.md into one item per content id and platform. Pure: no file system access. */
export function parsePosting(md, { present } = {}) {
  const lines = md.split(/\r?\n/);
  const has = (f) => (present ? present.has(f) : true);
  const globs = [...md.matchAll(/`([A-Za-z0-9_*]+_justlaunched\.mp4)`/g)].map((m) => new RegExp(`^${m[1].replace(/\*/g, '[a-z0-9]+')}$`, 'i'));
  const laterOf = (file) => {
    const alt = file.replace(/\.mp4$/i, '_justlaunched.mp4');
    if (alt === file) return null;
    if (present) return present.has(alt) ? alt : null;
    return md.includes(alt) || globs.some((g) => g.test(alt)) ? alt : null;
  };
  const items = [];
  const sections = [];
  let cur = null;
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^### ([VC]\d{2}) · (.+)$/);
    if (h) {
      cur = { id: h[1], head: h[2], start: i };
      sections.push(cur);
    } else if (/^## /.test(lines[i])) cur = null;
    if (cur) cur.end = i;
  }

  for (const s of sections) {
    const body = lines.slice(s.start + 1, s.end + 1);
    const title = clean(s.head.replace(/^["“](.+?)["”].*$/, '$1').replace(/`[^`]*`/g, '').split(' · ')[0]);
    const rows = new Map();
    for (const l of body) {
      const m = l.match(/^\|\s*\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|\s*$/);
      if (m) rows.set(m[1].trim(), m[2].trim());
    }
    // Captions: a header line ending in ":" followed by "> " lines.
    const captions = [];
    for (let i = 0; i < body.length; i++) {
      const l = body[i].trim();
      // Stills put their caption straight after the "Link in the first comment: … Disclosure: none." line.
      const still = s.id.startsWith('C') && /^(Link in the first|Keyword:)/i.test(l);
      if ((!l.endsWith(':') && !still) || l.startsWith('|') || l.startsWith('>')) continue;
      const quote = [];
      let j = i + 1;
      while (j < body.length && body[j].startsWith('>')) quote.push(body[j++].replace(/^>\s?/, '').trim());
      if (!quote.length) continue;
      const tags = quote.filter((q) => /^(#\w+\s*)+$/.test(q));
      const text = quote.filter((q) => !tags.includes(q)).join('\n');
      const note = l.match(/\(([^)]*(?:comment|pin)[^)]*)\)/i)?.[1] ?? null;
      const ytTitle = l.match(/Title: `([^`]+)`/)?.[1] ?? null;
      const hdr = l.toLowerCase();
      const forPlatforms = [];
      if (/tiktok/.test(hdr)) forPlatforms.push('TikTok');
      if (/instagram/.test(hdr)) forPlatforms.push(...PLATFORM_PREFIX.ig);
      if (/shorts|youtube/.test(hdr)) forPlatforms.push('YouTube Shorts');
      if (/linkedin/.test(hdr)) forPlatforms.push('LinkedIn');
      captions.push({ forPlatforms, caption: text, hashtags: tags.join(' ').split(/\s+/).filter(Boolean), note, title: ytTitle });
    }
    const sameAs = body.find((l) => /Description: the same text/i.test(l));
    const codes = [...new Set(body.join(' ').match(/\b(?:tt|ig|yt|li|x)-[vc]\d{2}(?:-[a-z0-9]+)?\b/g) ?? [])];
    const goFor = (prefix) => codes.find((c) => c.startsWith(`${prefix}-`) && c.split('-').length === 2) ?? null;
    const utmFor = (prefix) => codes.find((c) => c.startsWith(`${prefix}-`) && c.split('-').length === 3) ?? null;
    const disclosureRow = rows.get('Disclosure');
    const keywordRow = rows.get('Keyword');

    const slots = [];
    if (s.id.startsWith('V')) {
      for (const [label, val] of rows) {
        if (['Cover', 'Keyword', 'Links', 'Disclosure'].includes(label)) continue;
        const files = ticks(val).filter(isMedia);
        if (!files.length) continue;
        slots.push({ platforms: label.split(/\s*\/\s*/), files, val });
      }
    } else {
      // Stills: "### C01 · `C01_static_01.jpg` · LinkedIn, Tue 27 Oct 09:30" (a carousel names its first and last slide).
      let files = ticks(s.head).filter(isMedia);
      if (files.length === 2 && /…|\.\.\./.test(s.head)) {
        const [a, b] = files.map((f) => f.match(/^(.*_)(\d+)(\.\w+)$/));
        if (a && b && a[1] === b[1]) files = Array.from({ length: Number(b[2]) - Number(a[2]) + 1 }, (_, k) => `${a[1]}${String(Number(a[2]) + k).padStart(a[2].length, '0')}${a[3]}`);
      }
      const where = s.head.split(' · ').at(-1);
      const platform = where.split(',')[0].trim();
      const also = where.match(/also fits (\w+)/)?.[1];
      slots.push({ platforms: [platform, ...(also ? [also] : [])], files, val: where });
    }

    for (const slot of slots) {
      const when = slot.val.match(WHEN);
      const makeUp = slot.val.match(new RegExp(`make-up: ${WHEN.source}`));
      const bank = !when && /not on .*calendar/i.test(slot.val);
      const cap = captions.find((c) => slot.platforms.some((p) => c.forPlatforms.includes(p))) ?? (s.id.startsWith('C') ? captions[0] : null);
      const prefix = prefixOf(slot.platforms[0]);
      const stillLine = s.id.startsWith('C') ? body.find((l) => /^Link in the first|^Keyword:/i.test(l.trim())) ?? '' : '';
      const keyword = keywordRow ? keywordFor(keywordRow, slot.platforms) : stillLine.match(/Keyword: (\w+)/)?.[1] ?? null;
      const disclosure = (disclosureRow ? clean(disclosureRow) : stillLine.match(/Disclosure: ([^.]+)/)?.[1] ?? null)?.replace(/\s*\(see [^)]*above\)/i, '').replace(/^none$/, 'None') ?? null;
      // "Description: the same text, ending with …" (V03 Shorts): reuse the first caption and keep the instruction.
      const same = !cap && sameAs && slot.platforms.includes('YouTube Shorts') ? captions[0] : null;
      const files = slot.files.map((name) => ({ name, exists: has(name), later: laterOf(name) }));
      items.push({
        id: s.id,
        title,
        platforms: slot.platforms,
        date: when ? iso(when[2], when[3]) : null,
        time: when ? hhmm(when[4]) : null,
        makeUp: makeUp ? { date: iso(makeUp[2], makeUp[3]), time: hhmm(makeUp[4]) } : null,
        bank,
        files,
        ready: files.length > 0 && files.every((f) => f.exists),
        cover: rows.get('Cover') ? ticks(rows.get('Cover'))[0] ?? null : null,
        caption: cap?.caption ?? same?.caption ?? null,
        hashtags: cap?.hashtags ?? [],
        captionNote: cap?.note ?? (same ? clean(sameAs.replace(/^YouTube Shorts\.\s*/, '').replace(/^Title: `[^`]+`\.\s*/, '').replace(/^Description: t/, 'Description: t')) : null),
        ytTitle: cap?.title ?? (sameAs && slot.platforms.includes('YouTube Shorts') ? sameAs.match(/Title: `([^`]+)`/)?.[1] ?? null : null),
        keyword,
        link: prefix && goFor(prefix) ? `makeborne.com/go/${goFor(prefix)}` : null,
        utmContent: prefix ? utmFor(prefix) : null,
        disclosure,
      });
    }
  }
  return items;
}

function argv(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
}

export function syncPosting({ dir = DEFAULT_DIR, out = join(ROOT, 'data/posting.json'), log = console.log } = {}) {
  const md = join(dir, 'POSTING.md');
  if (!existsSync(dir) || !existsSync(md)) {
    log(`sync-posting: ${existsSync(dir) ? 'no POSTING.md in' : 'folder not found:'} ${dir}. Kept ${existsSync(out) ? 'the committed' : 'no'} posting.json as it is.`);
    return { synced: false };
  }
  const present = new Set(readdirSync(dir));
  const items = parsePosting(readFileSync(md, 'utf8'), { present });
  const prev = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : {};
  const json = {
    note: 'Generated by scripts/sync-posting.mjs from POSTING.md in the renders folder. items is rewritten on every sync; toMake, beforePosting and reminders are hand-written and kept. No media is copied into this repo.',
    folder: dir,
    syncedAt: new Date().toISOString().slice(0, 10),
    items,
    toMake: prev.toMake ?? DEFAULTS.toMake,
    beforePosting: prev.beforePosting ?? DEFAULTS.beforePosting,
    reminders: prev.reminders ?? DEFAULTS.reminders,
  };
  writeFileSync(out, `${JSON.stringify(json, null, 2)}\n`);
  const ready = items.filter((i) => i.ready).length;
  log(`sync-posting: ${items.length} posts (${ready} with every file present) from ${md} -> ${out}`);
  return { synced: true, items: items.length, ready };
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)).toLowerCase() === resolve(process.argv[1]).toLowerCase()) {
  syncPosting({ dir: argv('--dir') ?? DEFAULT_DIR, out: argv('--out') ?? join(ROOT, 'data/posting.json') });
}

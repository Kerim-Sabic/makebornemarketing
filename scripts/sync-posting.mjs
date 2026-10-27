// Reads the render agent's POSTING.md (the finished launch-week videos and images) and writes data/posting.json,
// which the Today page joins to its post items: "File: V01_reel_9x16.mp4 (in <folder>)" and a "ready to post" badge.
//
//   node scripts/sync-posting.mjs                       read Z:\makeborne-marketing\launch-week\renders\POSTING.md and, when it
//                                                       exists, Z:\makeborne-marketing\launch-teasers-v2\renders\POSTING.md
//   node scripts/sync-posting.mjs --dir <folder>        read <folder>/POSTING.md instead of the launch-week folder
//   node scripts/sync-posting.mjs --teasers <folder>    read <folder>/POSTING.md instead of the launch-teasers folder
//   node scripts/sync-posting.mjs --out <file>          write somewhere other than data/posting.json (used by npm run check)
//
// It never copies media: only file names, platforms, times, captions, hashtags, keywords, links, covers and disclosures.
// When both folders (or their POSTING.md) are missing (a Netlify build, another computer) it prints a note, leaves the
// committed data/posting.json as it is and exits 0. The build only ever reads the JSON. The teaser folder is optional:
// without it the teasers stay "to make" and nothing fails. The v2 teasers (made 27 Oct; the first teasers were dropped and
// are never read) name their slots by time ("## TUE-1900 · …"). `teaserSlots` in data/posting.json maps each slot to its
// calendar id (TUE-1900 -> T3 and so on), and the schedule table at the top of that POSTING.md gives each platform's time.
//
// The launch moved from Mon 26 Oct to Thu 29 Oct 2026, 21:00 CET (via Wed 28 Oct 19:00). The launch-week POSTING.md still
// names the old dates, so `schedule` (hand-written, in data/posting.json) maps them: every launch-week slot from 26 Oct to
// 1 Nov moves 3 days later, the launch-day slots get their new times (V01 at 21:30) and the old make-up slots are dropped.
// The teaser POSTING.md was written for Wed 28 Oct 19:00: only the date-free videos are mapped (T7 "We're live", T8 "Guess
// the build time"), and `schedule.overrides` gives them their new dates, times, notes and caption lines.
//
// Hand-written parts of data/posting.json survive a re-sync: `toMake` (why a post has no file yet, in plain words),
// `beforePosting` (the one-time checklist), `reminders` (dated one-off Today items), `teasers` (teaser titles),
// `teaserSlots` (the v2 slot -> calendar id map), `teaserStills` (a cover reused as a Story; empty since the S1-S3 covers
// carry the old time) and `schedule` (the date mapping above). Edit them in the JSON.
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DEFAULT_DIR = 'Z:\\makeborne-marketing\\launch-week\\renders';
export const TEASER_DIR = 'Z:\\makeborne-marketing\\launch-teasers-v2\\renders';
const addDays = (isoDate, n) => new Date(Date.parse(`${isoDate}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);

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

/**
 * The countdown Stories S4-S8 are made on the phone from the real makeborne.com countdown (a screen recording plus
 * Instagram's countdown and link stickers), so they have no file and always show "to make". They replace S1-S3, whose
 * covers have the old Wednesday time burned in.
 */
const STORIES = {
  S4: { title: 'Story "New time: Thursday, 21:00" (screen recording of the countdown)', make: 'Make it on your phone: screen-record makeborne.com counting down for 10 seconds, post it as a Story, add Instagram\'s countdown sticker (Thu 29 Oct, 21:00, "Makeborne launch") and a link sticker to makeborne.com. Text: "Makeborne opens Thursday, 21:00 CET."' },
  S5: { title: 'Story "Find what\'s hidden behind our countdown"', make: 'Make it on your phone: on makeborne.com press, hold and drag on the dark background until a website appears; screen-record that, add a link sticker to makeborne.com and the text "Something is hidden behind our countdown. Find it. Tomorrow 21:00 CET." Never say the hidden sites were made with Makeborne.' },
  S6: { title: 'Story "Today, 21:00" (launch morning)', make: 'Make it on your phone: a 10-second screen recording of the countdown, the countdown sticker (Thu 29 Oct, 21:00) and a link sticker. Text: "Today. 21:00 CET."' },
  S7: { title: 'Story "1 hour" (20:00)', make: 'Make it on your phone at 20:00: screen-record the countdown at about 59:30 to go, add the countdown sticker and a link sticker. Text: "1 hour."' },
  S8: { title: 'Story "We\'re live": the real reveal at 21:00', make: 'Start a screen recording of makeborne.com on your phone at 20:59:45 and stop at about 21:00:15: the countdown hits zero and the site opens. Trim to 15 s, add a link sticker and the text "We\'re live." Post at once; the same clip goes to X and LinkedIn as a reply under the launch posts.' },
};
const STORY_TO_MAKE = Object.fromEntries(Object.entries(STORIES).map(([id, s]) => [id, s.make]));

/** Default hand-written parts (used only when data/posting.json does not have them yet). */
const DEFAULTS = {
  toMake: {
    V04: 'Needs a real comment asking for a website, and that person\'s written OK, before it can be made. Until then post V02 in its TikTok slot.',
    V07: 'Needs the Higgsfield shots: you sign up on Tue 27 Oct and the shots are made on Wed 28 Oct.',
    V08: 'Needs a founder video: film yourself to camera (about 25 minutes).',
    V09: 'Needs the Day-7 numbers (Wed 4 Nov): film it once you know how many people paid.',
    V10: 'Needs one fictional brief built as a site, a deck and a client guide, then the three-up layout.',
    C02: 'Needs a phone screenshot of a client approving on the review page.',
    C05: 'Needs the Instagram comment-keyword DM switched on first, then the slides captured.',
    C15: 'Needs the Instagram keyword DM switched on, and the "30-second uncut build" it promises does not exist yet.',
    C17: 'Needs a screenshot of the deck opened in PowerPoint with the chart\'s data sheet open.',
    ...STORY_TO_MAKE,
    ...Object.fromEntries(['T7', 'T8'].map((id) => [id, 'The file is in the launch-teasers-v2 renders folder: run node scripts/sync-posting.mjs on the computer with the Z: drive and this post shows "ready to post".'])),
  },
  // Only the date-free v2 teasers: TUE-1900 to WED-1859 (T3-T6) have Wed 28 Oct 19:00 burned in and are never posted.
  teaserSlots: { 'WED-1900': 'T7', EXTRA: 'T8' },
  teaserStills: {},
  teasers: {
    T7: '"We\'re live": the iris opens onto a real site',
    T8: '"Guess the build time" (a build-time quiz with no date in it)',
    ...Object.fromEntries(Object.entries(STORIES).map(([id, s]) => [id, s.title])),
  },
  schedule: {
    note: 'The launch moved from Mon 26 Oct to Thu 29 Oct 2026, 21:00 CET. The launch-week POSTING.md still has the Mon 26 Oct dates: every slot from 26 Oct to 1 Nov moves 3 days later, these launch-day slots get new times, and the old make-up slots are dropped. The teaser overrides give T7 and T8 their new days and times.',
    shift: { from: '2026-10-26', to: '2026-11-01', days: 3 },
    overrides: [
      { id: 'V01', platform: 'TikTok', date: '2026-10-29', time: '21:30' },
      { id: 'V01', platform: 'Instagram Reels', date: '2026-10-29', time: '21:30' },
      { id: 'V01', platform: 'YouTube Shorts', date: '2026-10-29', time: '21:30' },
      { id: 'V02', platform: 'TikTok', date: '2026-10-29', time: '22:00' },
      { id: 'V03', platform: 'TikTok', date: '2026-10-29', time: '22:30' },
      { id: 'C08', platform: 'X', date: '2026-10-29', time: '21:15' },
      ...['Instagram Reels', 'TikTok', 'YouTube Shorts'].map((platform, i) => ({
        id: 'T7', platform, date: '2026-10-29', time: `21:0${i}`,
        captionNote: `Thu 29 Oct ${`21:0${i}`}, only once makeborne.com is confirmed open (load it signed out first). The file name says WED-1900; the video itself has no date or time in it.`,
      })),
      ...['Instagram Reels', 'TikTok', 'YouTube Shorts'].map((platform, i) => ({
        id: 'T8', platform, date: '2026-10-28', time: ['21:00', '21:05', '21:10'][i],
        captionNote: 'Wed 28 Oct, 24 hours before the launch. The video has no date in it, so the caption says when.',
        captionAppend: 'Makeborne opens tomorrow, Thu 29 Oct, 21:00 CET (16:00 New York, 13:00 Los Angeles).',
      })),
    ],
    dropMakeUp: true,
  },
  beforePosting: [
    { key: 'music', text: 'Add the music inside each app', how: 'No music is baked into the videos. TikTok: pick a track from the Commercial Music Library. Instagram: the Meta music library. YouTube Shorts: the Shorts library. LinkedIn and X: no music. Keep it low so the sound effects still click.' },
    { key: 'keywords', text: 'Switch on the SITE, DECK and CLIENT DM keywords', how: 'Captions say "Comment SITE", "DM me DECK" and "Comment CLIENT". Turn on the Instagram comment-to-DM automation for those three words first (Instagram playbook, template t21).' },
    { key: 'uncut', text: 'Remove the "30-second uncut build" line from the DM', how: 'The keyword DM promises a 30-second uncut build, and that recording does not exist yet. Take the line out of the DM until it is recorded.' },
  ],
  reminders: [
    { date: '2026-10-26', time: '18:00', group: 'post', text: 'Do not post V01 tonight: the public launch is Thu 29 Oct at 21:00 CET', how: 'The owner moved the public launch to Thursday 29 October 2026 at 21:00 Sarajevo time (20:00 UTC). The V01 files say "We launched today." They go out on Thu 29 Oct at 21:30, after the "We\'re live" teaser, not before. From Fri 30 Oct use the _justlaunched files instead. Nothing that says "we launched" or "live now" goes out before Thu 21:00.' },
    { date: '2026-10-27', time: '18:00', group: 'post', text: 'Do not post T3 tonight, and delete Story S1 if it is up', how: 'The launch moved to Thu 29 Oct 21:00 CET. T3-T6 and the S1-S3 covers have "Wed 28 Oct, 19:00" burned in: never post them. Tonight\'s post is Story S4 at 19:00 (the real countdown with Instagram\'s countdown sticker set to Thu 29 Oct, 21:00).' },
    { date: '2026-10-27', time: '18:05', group: 'post', text: 'Do not post V01 yet: the public launch is Thu 29 Oct at 21:00 CET', how: 'The V01 files say "We launched today." They go out on Thu 29 Oct at 21:30, after the "We\'re live" teaser (TikTok, Instagram Reel, YouTube Shorts). Nothing that says "we launched" or "live now" goes out before then.' },
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
    const h = lines[i].match(/^### ([VC]\d{2}|[TS]\d{1,2}) · (.+)$/);
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
    // Videos (V, T) list one table row per platform; stills (C) name the file and platform in the heading. A Story (S)
    // can be either: table rows when it has them, otherwise a still.
    const mediaRows = [...rows].some(([label, val]) => !['Cover', 'Keyword', 'Links', 'Disclosure'].includes(label) && ticks(val).some(isMedia));
    const isStill = /^C/.test(s.id) || (/^S/.test(s.id) && !mediaRows);
    // Captions: a header line ending in ":" followed by "> " lines.
    const captions = [];
    for (let i = 0; i < body.length; i++) {
      const l = body[i].trim();
      // Stills put their caption straight after the "Link in the first comment: … Disclosure: none." line.
      const still = isStill && /^(Link in the first|Keyword:)/i.test(l);
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
    if (!isStill) {
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
      const cap = captions.find((c) => slot.platforms.some((p) => c.forPlatforms.includes(p))) ?? (isStill ? captions[0] : null);
      const prefix = prefixOf(slot.platforms[0]);
      const stillLine = isStill ? body.find((l) => /^Link in the first|^Keyword:/i.test(l.trim())) ?? '' : '';
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

const SHORT_PLATFORM = { Reels: 'Instagram Reels', TikTok: 'TikTok', Shorts: 'YouTube Shorts' };

/**
 * Parse the v2 teasers' POSTING.md into one item per calendar id and platform. Pure: no file system access.
 * Sections are "## TUE-1900 · "Tomorrow" (the speedrun)" with a **File** row, one row per platform (its cover), **When**,
 * **Comment keyword** and **Disclosure** rows, then the captions. The times come from the schedule table at the top:
 * "| **Tue 27 Oct 19:00** | `TUE-1900_tomorrow_9x16.mp4` | Reels 19:00 · TikTok 19:05 · Shorts 19:10 |". A sheet in the
 * older "### T1 · …" shape goes to parsePosting.
 */
export function parseTeasers(md, { present, slots = {}, stills = {} } = {}) {
  if (!/^## (?:[A-Z]{3}-\d{4}|EXTRA) · /m.test(md)) return parsePosting(md, { present });
  const has = (f) => (present ? present.has(f) : true);
  const lines = md.split(/\r?\n/);
  const times = new Map();
  for (const l of lines) {
    const m = l.match(/^\|\s*(.+?)\s*\|\s*`([^`]+\.mp4)`\s*\|\s*(.+?)\s*\|\s*$/);
    if (!m) continue;
    const when = clean(m[1]).match(WHEN);
    const per = Object.fromEntries([...m[3].matchAll(/\b(Reels|TikTok|Shorts) (\d{1,2}:\d{2})\b/g)].map(([, p, t]) => [SHORT_PLATFORM[p], hhmm(t)]));
    times.set(m[2], { date: when ? iso(when[2], when[3]) : null, time: when ? hhmm(when[4]) : null, per });
  }
  const sections = [];
  let cur = null;
  for (const l of lines) {
    const h = l.match(/^## ([A-Z]{3}-\d{4}|EXTRA) · (.+)$/);
    if (h) sections.push((cur = { slot: h[1], head: h[2], body: [] }));
    else if (/^## /.test(l)) cur = null;
    else if (cur) cur.body.push(l);
  }
  const items = [];
  for (const s of sections) {
    const id = slots[s.slot];
    if (!id) continue;
    const rows = new Map();
    for (const l of s.body) {
      const m = l.match(/^\|\s*\*\*(.+?)\*\*\s*\|\s*(.+?)\s*\|\s*$/);
      if (m) rows.set(m[1].trim(), m[2].trim());
    }
    const file = ticks(rows.get('File') ?? '').find(isMedia);
    if (!file) continue;
    // Captions: "Instagram caption:", "TikTok caption:" or "YouTube Shorts. Title: `…` Description:", then "> " lines.
    const captions = [];
    for (let i = 0; i < s.body.length; i++) {
      const l = s.body[i].trim();
      if (!l.endsWith(':') || l.startsWith('|') || l.startsWith('>')) continue;
      const quote = [];
      let j = i + 1;
      while (j < s.body.length && s.body[j].startsWith('>')) quote.push(s.body[j++].replace(/^>\s?/, '').trim());
      if (!quote.length) continue;
      const tags = quote.filter((q) => /^(#\w+\s*)+$/.test(q));
      const hdr = l.toLowerCase();
      captions.push({
        platform: /tiktok/.test(hdr) ? 'TikTok' : /shorts|youtube/.test(hdr) ? 'YouTube Shorts' : /instagram/.test(hdr) ? 'Instagram Reels' : null,
        caption: quote.filter((q) => !tags.includes(q)).join('\n'),
        hashtags: tags.join(' ').split(/\s+/).filter(Boolean),
        title: l.match(/Title: `([^`]+)`/)?.[1] ?? null,
      });
    }
    const t = times.get(file) ?? { date: null, time: null, per: {} };
    const whenNote = rows.get('When') ? clean(rows.get('When')) : null;
    const keyword = rows.get('Comment keyword')?.match(/^([A-Z]{2,})\b/)?.[1] ?? null;
    const disclosure = rows.get('Disclosure') ? clean(rows.get('Disclosure')) : null;
    for (const platform of ['Instagram Reels', 'TikTok', 'YouTube Shorts']) {
      const row = rows.get(platform);
      if (!row) continue;
      const cover = ticks(row).find(isMedia) ?? null;
      // TikTok takes a frame of the video as its cover; the sheet says which one.
      const coverNote = !cover && /\bcover:/i.test(row) ? `TikTok cover: pick ${clean(row).replace(/^.*?\bcover:\s*/i, '')}.` : null;
      const cap = captions.find((c) => c.platform === platform) ?? null;
      items.push({
        id,
        title: clean(s.head.replace(/["“”]/g, '')),
        platforms: [platform],
        date: t.date,
        time: t.per[platform] ?? t.time,
        makeUp: null,
        bank: !t.date,
        files: [{ name: file, exists: has(file), later: null }],
        ready: has(file) && (!cover || has(cover)),
        cover,
        caption: cap?.caption ?? null,
        hashtags: cap?.hashtags ?? [],
        captionNote: [whenNote?.replace(/([^.!?])$/, '$1.'), coverNote].filter(Boolean).join(' ') || null,
        ytTitle: cap?.title ?? null,
        keyword,
        link: null,
        utmContent: null,
        disclosure,
      });
    }
  }
  // The countdown-sticker Stories (S1-S3) reuse a teaser cover: the sticker itself is added in the Instagram app.
  for (const [id, name] of Object.entries(stills)) {
    items.push({
      id, title: id, platforms: ['Instagram Stories'], date: null, time: null, makeUp: null, bank: false,
      files: [{ name, exists: has(name), later: null }], ready: has(name), cover: null, caption: null, hashtags: [],
      captionNote: 'Add Instagram\'s countdown sticker (Thu 29 Oct, 21:00, "Makeborne launch") and a link sticker to makeborne.com in the app.',
      ytTitle: null, keyword: null, link: null, utmContent: null, disclosure: 'None needed',
    });
  }
  return items;
}

/**
 * Map POSTING.md dates to the launch on Thu 29 Oct 21:00 CET (see `schedule` in data/posting.json). An override can also
 * replace the post's note (`captionNote`) and add a closing line to its caption (`captionAppend`; the caption without it is kept
 * as `captionAfter` for reposts after that day). Pure.
 */
export function applySchedule(items, schedule) {
  if (!schedule) return items;
  const { shift, overrides = [], dropMakeUp } = schedule;
  const moved = (date) => (shift && date && date >= shift.from && date <= shift.to ? addDays(date, shift.days) : date);
  return items.map((it) => {
    const o = overrides.find((x) => x.id === it.id && it.platforms.includes(x.platform));
    const makeUp = dropMakeUp || !it.makeUp ? null : { date: moved(it.makeUp.date), time: it.makeUp.time };
    const caption = o?.captionAppend && it.caption ? `${it.caption}${/[.!?)]$/.test(it.caption) ? '' : '.'} ${o.captionAppend}` : it.caption;
    // A dated closing line ("opens tomorrow") is true only on the scheduled day: keep the plain caption for later reposts.
    const dated = caption !== it.caption ? { captionAfter: it.caption } : {};
    return { ...it, date: o ? o.date : moved(it.date), time: o ? o.time : it.time, makeUp, caption, ...dated, captionNote: o?.captionNote ?? it.captionNote };
  });
}

function argv(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
}

function readSource(dir, parse = parsePosting, opts = {}) {
  const md = join(dir, 'POSTING.md');
  if (!existsSync(dir) || !existsSync(md)) return { md, missing: existsSync(dir) ? 'no POSTING.md in' : 'folder not found:' };
  return { md, items: parse(readFileSync(md, 'utf8'), { ...opts, present: new Set(readdirSync(dir)) }) };
}

export function syncPosting({ dir = DEFAULT_DIR, teaserDir = TEASER_DIR, out = join(ROOT, 'data/posting.json'), log = console.log } = {}) {
  const prev = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : {};
  const lw = readSource(dir);
  const tz = readSource(teaserDir, parseTeasers, { slots: prev.teaserSlots ?? DEFAULTS.teaserSlots, stills: prev.teaserStills ?? DEFAULTS.teaserStills });
  if (lw.missing) log(`sync-posting: ${lw.missing} ${dir}.`);
  if (tz.missing) log(`sync-posting: teasers: ${tz.missing} ${teaserDir} (the teasers stay "to make").`);
  if (lw.missing && tz.missing) {
    log(`sync-posting: kept ${existsSync(out) ? 'the committed' : 'no'} posting.json as it is.`);
    return { synced: false };
  }
  const schedule = prev.schedule ?? DEFAULTS.schedule;
  const prevItems = prev.items ?? [];
  // A folder that is missing this time keeps its items from the last sync.
  const launchItems = lw.items ? applySchedule(lw.items, schedule) : prevItems.filter((i) => !i.folder);
  // Teasers keep their own dates; only the overrides (new days, times, notes and caption lines) apply, never the shift.
  const teaserItems = tz.items ? applySchedule(tz.items, { overrides: schedule.overrides }).map((i) => ({ ...i, folder: teaserDir })) : prevItems.filter((i) => i.folder);
  const items = [...launchItems, ...teaserItems];
  const json = {
    note: 'Generated by scripts/sync-posting.mjs from POSTING.md in the renders folders (launch week, plus the launch teasers when present). items is rewritten on every sync; toMake, beforePosting, reminders, teasers, teaserSlots, teaserStills and schedule are hand-written and kept. No media is copied into this repo.',
    folder: dir,
    teaserFolder: teaserDir,
    syncedAt: new Date().toISOString().slice(0, 10),
    items,
    toMake: { ...DEFAULTS.toMake, ...prev.toMake },
    beforePosting: prev.beforePosting ?? DEFAULTS.beforePosting,
    reminders: prev.reminders ?? DEFAULTS.reminders,
    teasers: { ...DEFAULTS.teasers, ...prev.teasers },
    teaserSlots: prev.teaserSlots ?? DEFAULTS.teaserSlots,
    teaserStills: prev.teaserStills ?? DEFAULTS.teaserStills,
    schedule,
  };
  writeFileSync(out, `${JSON.stringify(json, null, 2)}\n`);
  const ready = items.filter((i) => i.ready).length;
  log(`sync-posting: ${items.length} posts (${ready} with every file present; ${teaserItems.length} teaser posts) from ${[lw.items && lw.md, tz.items && tz.md].filter(Boolean).join(' and ')} -> ${out}`);
  return { synced: true, items: items.length, ready };
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)).toLowerCase() === resolve(process.argv[1]).toLowerCase()) {
  syncPosting({ dir: argv('--dir') ?? DEFAULT_DIR, teaserDir: argv('--teasers') ?? TEASER_DIR, out: argv('--out') ?? join(ROOT, 'data/posting.json') });
}

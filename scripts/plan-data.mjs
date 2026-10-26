// Build-time joins of the plan's files for the Today and Plan pages (used by scripts/data-plugin.mjs).
// Pure functions over the parsed files, so the result is the same in the dev server, the build and `npm run check`.
//   todayExtras(files, date)  everything the Today page needs for one day beyond calendar.json: the week's targets,
//                             Instagram kick-off steps, what to make, the ad cards that are due and today's money
//   planWeeks(files)          13 week cards and the 7 launch-week day cards for the Plan page

const DAY_MS = 86_400_000;
const toUtc = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};
export const addDays = (iso, n) => new Date(toUtc(iso) + n * DAY_MS).toISOString().slice(0, 10);
const diff = (a, b) => Math.round((toUtc(a) - toUtc(b)) / DAY_MS);
const START = '2026-10-26';
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekOf = (iso) => Math.floor(diff(iso, START) / 7) + 1;
const hm = (t) => {
  const m = String(t ?? '').match(/(\d{1,2}):(\d{2})/);
  return m ? `${m[1].padStart(2, '0')}:${m[2]}` : '';
};
const firstSentence = (s, max = 220) => {
  const t = String(s).replace(/\s+/g, ' ').trim();
  const m = t.match(/^(.+?[.!?])(\s|$)/);
  const out = m && m[1].length >= 40 ? m[1] : t;
  return out.length > max ? `${out.slice(0, max - 1).replace(/\s+\S*$/, '')}…` : out;
};
const CONTENT_ID = /\b([VC]\d{2})\b/g;
export const contentIdsIn = (s) => [...new Set(String(s ?? '').match(CONTENT_ID) ?? [])];

/** Actions that repeat on many days (the 08:00 numbers, the daily comment routine) are routine, not week goals. */
function recurringActions(calendar) {
  const n = new Map();
  for (const d of calendar) for (const a of d.actions) n.set(a.what, (n.get(a.what) ?? 0) + 1);
  return new Set([...n].filter(([, c]) => c >= 4).map(([w]) => w));
}

/** Per-day money items from ads.json adCalendar (dates added 26 Oct). Ads split evenly over their days. */
function moneyByDate(ads) {
  const out = new Map();
  const push = (date, item) => out.set(date, [...(out.get(date) ?? []), item]);
  for (const w of ads.adCalendar) {
    for (const o of w.otherPlanSpend) {
      if (!o.date) continue;
      push(o.date, { label: o.item, usd: o.usd, line: o.line, conditional: /\bonly if\b|\bif paid\b|\(if\b/i.test(o.item) });
    }
    for (const a of w.adItems) {
      if (!a.from) continue;
      const days = diff(a.to, a.from) + 1;
      for (let i = 0; i < days; i++) push(addDays(a.from, i), { label: `${a.card}: ${a.item.replace(/^A\d\d\s*/, '')}, day ${i + 1} of ${days}`, usd: Math.round((a.usd / days) * 100) / 100, line: a.line, card: a.card, conditional: true });
    }
  }
  return out;
}

/** The run window of each ad card. Revenue-paid cards are shown but never counted in the $1,000. */
function cardWindows(ads) {
  const fromCal = new Map();
  for (const w of ads.adCalendar) for (const a of w.adItems) if (a.card) fromCal.set(a.card, [a.from, a.to]);
  return ads.adCards.map((c) => {
    const days = typeof c.budget.days === 'number' ? c.budget.days : null;
    const [from, to] = fromCal.get(c.id) ?? [c.earliestDate, days ? addDays(c.earliestDate, days - 1) : (c.mustEndBy?.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? c.earliestDate)];
    return { card: c, from, to, weeklyCheck: c.id === 'A05' };
  });
}

function cardLine(c) {
  const b = c.budget;
  const money = typeof b.perDayUsd === 'number' ? `$${b.perDayUsd}/day` : String(b.perDayUsd);
  return { id: c.id, title: c.title, platform: c.platform, money, inThe1000: c.inThe1000, trigger: c.statusTrigger, mustEndBy: c.mustEndBy };
}

/** The copyable part of one Higgsfield shot (data/production.json higgsfield.shots) for Today's "How" panel. */
function shotCard(production, id) {
  const s = production.higgsfield?.shots.find((x) => x.id === id);
  if (!s) throw new Error(`production.json simple.weeks names Higgsfield shot ${id}, which is not in higgsfield.shots`);
  return { id: s.id, title: s.title, for: s.for, model: s.model, mode: s.mode, cameraPreset: s.cameraPreset, durationSec: s.durationSec, aspect: s.aspect, resolution: s.resolution, takes: s.takes, credits: s.credits, prompt: s.prompt, negative: s.negative, referenceImage: s.referenceImage, keepRule: s.keepRule, gate: s.gate };
}

/**
 * The finished file for one calendar post, from data/posting.json (scripts/sync-posting.mjs reads the render folder's POSTING.md).
 * Ready: the file names to post (after the first slot, a "_justlaunched" variant replaces a "launched today" file), the
 * caption and the rest of the posting sheet. Not ready: "to make", with the hand-written reason when there is one.
 */
export function postingFor(posting, post, date) {
  if (!posting || !post.contentId) return null;
  const it = posting.items.find((i) => i.id === post.contentId && i.platforms.includes(post.channel));
  if (!it) return { ready: false, reason: posting.toMake?.[post.contentId] ?? null };
  const after = !!it.date && date > it.date;
  return {
    ready: it.ready,
    reason: it.ready ? null : posting.toMake?.[post.contentId] ?? 'Some files are missing from the renders folder.',
    files: it.files.map((f) => (after && f.later ? f.later : f.name)),
    laterFiles: !after ? it.files.map((f) => f.later).filter(Boolean) : [],
    folder: posting.folder,
    cover: it.cover,
    caption: it.caption,
    hashtags: it.hashtags,
    captionNote: it.captionNote,
    ytTitle: it.ytTitle,
    keyword: it.keyword,
    disclosure: it.disclosure,
    makeUp: it.makeUp && date === it.date ? it.makeUp : null,
  };
}

export function todayExtras(files, date) {
  const { calendar, instagram, production, ads, kpis, creatives, videos, posting } = files;
  const week = Math.min(13, Math.max(1, weekOf(date)));
  const t = kpis.weeklyTargets[week - 1];
  const weekStart = addDays(START, (week - 1) * 7);
  const weekday = WEEKDAYS[diff(date, weekStart)] ?? 'Sun';

  // Instagram kick-off day (days 1-14): the main post's caption, cover and keyword, and its checklist.
  const ig = instagram.kickoffDays.find((k) => k.date === date) ?? null;

  // What to make today: production.json simple weeks, by weekday.
  const pw = production.simple.weeks.find((w) => w.week === week);
  const make = (pw?.items ?? [])
    // "Any" items (beat pieces, made only if the feature is live) go on the Monday of their week.
    .filter((i) => i.day === weekday || (i.day === 'Any' && weekday === 'Mon'))
    .map((i) => ({ text: i.text.replace(new RegExp(`^${weekday}(\\s+\\d{1,2}:\\d{2})?:\\s*`), ''), time: hm(i.text.slice(0, 12)), ids: i.ids, sheets: i.links.map((l) => l.sheet), shots: (i.hf ?? []).map((id) => shotCard(production, id)) }));

  // Ad cards that are due: a day of their run window, the day before (get it ready) or a weekly check.
  const dueAds = [];
  for (const w of cardWindows(ads)) {
    const c = w.card;
    if (w.weeklyCheck) {
      if (date >= c.earliestDate && weekday === 'Mon' && date <= '2027-01-24') dueAds.push({ ...cardLine(c), kind: 'check', note: 'Weekly check: search "makeborne" on Google. Run this card only if another advertiser shows up.' });
      continue;
    }
    if (date === addDays(w.from, -1)) dueAds.push({ ...cardLine(c), kind: 'prep', note: `Starts tomorrow (${w.from}). Check the trigger tonight; if it is met, build the ad (it can be published in advance so review finishes) and set the start to 00:00.` });
    if (date >= w.from && date <= w.to) {
      const n = diff(date, w.from) + 1;
      const of = diff(w.to, w.from) + 1;
      dueAds.push({ ...cardLine(c), kind: 'run', day: n, days: of, note: n === 1 ? 'Launch day, only if the trigger is met.' : `Day ${n} of ${of}: read the stop rule at 10 and 30 dollars spent; log the spend.` });
    }
  }

  const money = moneyByDate(ads).get(date) ?? [];

  // Post captions: the video caption and hashtags, or a creative's on-image words; Instagram kick-off captions win.
  const vById = new Map(videos.map((v) => [v.id, v]));
  const cById = new Map(creatives.map((c) => [c.id, c]));
  const day = calendar.find((d) => d.date === date);
  const posts = (day?.posts ?? []).map((p) => {
    const v = vById.get(p.contentId);
    const c = cById.get(p.contentId);
    const isIgMain = ig && /^Instagram (Reels|carousel)/.test(p.channel) && String(ig.main.contentId).includes(p.contentId ?? '###');
    return {
      title: v?.title ?? c?.concept ?? c?.headline ?? null,
      kind: v ? 'video' : c ? 'creative' : null,
      caption: isIgMain ? ig.main.caption : v ? `${v.caption}\n\n${v.hashtags.join(' ')}` : null,
      onImage: c ? [c.headline, c.subcopy, c.cta].filter(Boolean).join(' / ') : null,
      hook: v?.hook?.line ?? null,
      cta: v?.cta ?? c?.cta ?? null,
      length: v ? `${v.format}, ${v.lengthSec} s` : c ? `${c.type}, ${c.size}` : null,
      igMain: !!isIgMain,
      file: postingFor(posting, p, date),
    };
  });
  const anyReady = posts.some((p) => p.file?.ready);

  return {
    week,
    weekday,
    targets: t ? { dates: t.dates, visits: t.visits, signups: t.signups, paid: t.paid, netPaid: t.netPaid, activatedPayers: t.activatedPayers, mrr: t.mrr } : null,
    ig: ig && { title: ig.title, main: ig.main, checklist: ig.checklist, stories: ig.stories },
    make,
    ads: dueAds,
    money,
    posts,
    reminders: (posting?.reminders ?? []).filter((r) => r.date === date),
    // The one-time "Before posting" checklist rides along on every day that has a finished file.
    beforePosting: anyReady ? posting.beforePosting ?? [] : [],
  };
}

function parseCalendarMd(md) {
  const weeks = new Map();
  const lines = md.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^## Week (\d+) \(([^)]*)\):\s*(.+)$/);
    if (!m) continue;
    const w = { title: m[3].trim(), goal: '', sunday: '' };
    for (let j = i + 1; j < lines.length && !lines[j].startsWith('## '); j++) {
      const g = lines[j].match(/^\*\*Goal:\*\*\s*(.+)$/);
      if (g) w.goal = g[1].trim();
      const s = lines[j].match(/^\*\*Sunday check:\*\*\s*(.+)$/);
      if (s) w.sunday = s[1].trim();
    }
    weeks.set(Number(m[1]), w);
  }
  return weeks;
}

export function planWeeks(files) {
  const { calendar, calendarMd, ads, kpis, checkpoints, plan, production } = files;
  const md = parseCalendarMd(calendarMd);
  const routine = recurringActions(calendar);
  const weeks = [];
  for (let n = 1; n <= 13; n++) {
    const from = addDays(START, (n - 1) * 7);
    const to = addDays(from, 6);
    const days = calendar.filter((d) => d.date >= from && d.date <= to);
    const seen = new Set();
    const actions = [];
    const order = { launch: 0, ads: 1, outreach: 2, product: 3, analysis: 4 };
    for (const d of days) {
      for (const a of d.actions) {
        if (routine.has(a.what) || seen.has(a.what)) continue;
        seen.add(a.what);
        actions.push({ date: d.date, type: a.type, what: firstSentence(a.what), rank: order[a.type] ?? 5 });
      }
    }
    // 5-10 key actions: keep the calendar order, but prefer launches, ads and outreach over analysis when trimming.
    const keep = new Set([...actions].sort((a, b) => a.rank - b.rank || a.date.localeCompare(b.date)).slice(0, 10));
    const key = actions.filter((a) => keep.has(a)).map(({ rank, ...a }) => a);
    const ac = ads.adCalendar.find((w) => w.week === n);
    const tg = kpis.weeklyTargets[n - 1];
    const pw = production.simple.weeks.find((w) => w.week === n);
    // Quiet weeks (the holidays) have few one-off actions: top up to 5 with the week's make-list.
    for (const i of pw?.items ?? []) {
      if (key.length >= 5) break;
      const wd = WEEKDAYS.indexOf(i.day);
      key.push({ date: addDays(from, wd < 0 ? 0 : wd), type: 'make', what: firstSentence(i.text.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun|Any)(\s+\d{1,2}:\d{2})?:\s*/, '')) });
    }
    key.sort((a, b) => a.date.localeCompare(b.date));
    weeks.push({
      week: n,
      from,
      to,
      phase: days[0]?.phase ?? '',
      title: md.get(n)?.title ?? '',
      goal: md.get(n)?.goal ?? days[0]?.focus ?? '',
      sunday: md.get(n)?.sunday ?? '',
      actions: key,
      make: (pw?.items ?? []).length,
      money: ac
        ? {
            week: ac.weekTotalUsd,
            running: ac.runningTotalUsd,
            ads: ac.adSpendUsd,
            items: [...ac.adItems.map((a) => ({ label: a.item, usd: a.usd, line: a.line, date: a.from })), ...ac.otherPlanSpend.map((o) => ({ label: o.item, usd: o.usd, line: o.line, date: o.date }))],
            liveCards: ac.liveCards,
            note: ac.note,
          }
        : null,
      targets: tg ? { visits: tg.visits, paid: tg.paid, netPaid: tg.netPaid, activatedPayers: tg.activatedPayers, mrr: tg.mrr, activeSubs: tg.activeSubs } : null,
      checkpoints: checkpoints.checkpoints.filter((c) => c.date >= from && c.date <= to).map((c) => ({ date: c.date, title: c.title, approx: !!c.approx })),
    });
  }
  const launchDays = plan.launchWeek.map((d) => {
    const cal = calendar.find((c) => c.date === d.date);
    return { day: d.day, date: d.date, weekday: d.weekday, focus: cal?.focus ?? '', actions: d.actions, posts: cal?.posts.length ?? 0 };
  });
  return { weeks, launchDays };
}

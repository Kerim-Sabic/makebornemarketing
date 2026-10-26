import { use, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CalendarDay, CalendarPost, LaunchInfo, PostFile, TodayExtra } from '../lib/types';
import { addDays, dayLabel, fmtDate, fmtUsd, isIsoDate, LAUNCH_AT_UTC, LAUNCH_DAY, sarajevoToday, useStored, WINDOW_START } from '../lib/util';
import { LAST_DAY, hasDay, loadDay } from '../lib/calendarIndex';
import { useActuals, useChecks } from '../lib/stores';
import { weekPace } from '../lib/pace';
import { CopyField, Steps, TickItem } from '../components/Checklist';
import { HfShotBody } from '../components/HfShot';
import { Details } from '../components/ui';
import { plain } from '../lib/plain';
import { START_HERE_KEY } from '../lib/stores';
import { href, ROUTES, type RouteProps } from '../routes';

/** Ticks are keyed by the action's text, so reordering or inserting actions in calendar.json keeps them on the right action. */
const actionKey = (date: string, what: string) => `${date}:${what.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48)}`;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const GO_LIVE = '2026-10-29'; // /go/ short links target day (tracking.md §0)

function hm(t: string | undefined) {
  const m = String(t ?? '').match(/(\d{1,2}):(\d{2})/);
  return m ? `${m[1].padStart(2, '0')}:${m[2]}` : '';
}
const sortKey = (t: string) => (t ? Number(t.slice(0, 2)) * 60 + Number(t.slice(3)) : 24 * 60 + 1);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const goUrl = (l: string) => `https://${l.replace(/^https?:\/\//, '')}`;
const longUrl = (u: Record<string, string>) => `https://makeborne.com/?${new URLSearchParams(u).toString()}`;
const sentences = (s: string) => s.split(/(?<=[.!?])\s+(?=[A-Z'"(])/).map((x) => x.trim()).filter(Boolean);
const contentHref = (id: string) => href('library', /^C/.test(id) ? 'images' : 'videos', id);
const CHANNEL_SHORT: Record<string, string> = { 'Instagram Reels': 'Instagram Reel', 'Instagram Stories': 'Instagram Story', 'Instagram carousel': 'Instagram carousel' };

function clampDate(d: string) {
  if (d < WINDOW_START) return WINDOW_START;
  if (d > LAST_DAY) return LAST_DAY;
  return d;
}

interface Item { key: string; time: string; text: ReactNode; label: string; tag?: ReactNode; sub?: ReactNode; how?: ReactNode }
type GroupId = 'post' | 'make' | 'ads' | 'reach' | 'log';
/** Launch day's run of show has its own tick boxes, above the groups. */
const RUN_KEY = (date: string, time: string, text: string) => `${date}:run:${time}:${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32)}`;
const GROUPS: { id: GroupId; title: string; hint: string }[] = [
  { id: 'post', title: 'Post', hint: 'Times are Sarajevo time (CET)' },
  { id: 'make', title: 'Make', hint: 'Videos, images and set-up' },
  { id: 'ads', title: 'Ads', hint: 'Only when the card says so' },
  { id: 'reach', title: 'Reach out', hint: 'People, creators, listings' },
  { id: 'log', title: 'Log numbers', hint: 'Five minutes, every day' },
];
const GROUP_OF: Record<string, GroupId> = { launch: 'make', product: 'make', ads: 'ads', outreach: 'reach', analysis: 'log' };

export default function Today({ params }: RouteProps) {
  const realToday = sarajevoToday();
  const requested = params[0] && isIsoDate(params[0]) ? params[0] : realToday;
  const date = clampDate(requested);
  const outside = requested !== date;
  const day = use(loadDay(hasDay(date) ? date : WINDOW_START)) as CalendarDay;
  const x = day.extra as TodayExtra;
  const go = (d: string) => (window.location.hash = href('today', clampDate(d)));
  const [checks, setChecks] = useChecks();
  const [actuals] = useActuals();
  const toggle = (k: string) => setChecks((c) => ({ ...c, [k]: !c[k] }));

  // Warm the neighbouring days so Prev / Next do not wait for a chunk.
  useEffect(() => {
    for (const d of [addDays(date, -1), addDays(date, 1)]) if (hasDay(d)) void loadDay(d);
  }, [date]);

  const groups = useMemo(() => buildGroups(day, x, date), [day, x, date]);
  const all = Object.values(groups).flat();
  const done = all.filter((i) => checks[i.key]).length;
  const pace = weekPace(actuals, date, x.targets);
  const firm = x.money.filter((m) => !m.conditional);
  const maybe = x.money.filter((m) => m.conditional);
  const firmUsd = firm.reduce((s, m) => s + m.usd, 0);
  const maybeUsd = maybe.reduce((s, m) => s + m.usd, 0);
  const isToday = date === clampDate(realToday);
  const [startHidden, setStartHidden] = useStored<boolean>(START_HERE_KEY, false);
  const before = x.beforePosting ?? [];
  const beforeDone = before.filter((b) => checks[`before-posting:${b.key}`]).length;
  const beforeList = (
    <ul className="ticklist">
      {before.map((b) => (
        <TickItem key={b.key} checked={!!checks[`before-posting:${b.key}`]} onToggle={() => toggle(`before-posting:${b.key}`)} text={b.text} label={b.text} how={<p className="small">{plain(b.how)}</p>} />
      ))}
    </ul>
  );

  return (
    <div className="page page-narrow today">
      {!startHidden && <StartHere onClose={() => setStartHidden(true)} />}
      <header className="today-head">
        <div className="day-nav" role="group" aria-label="Change day">
          <button type="button" className="btn btn-ghost btn-nav" onClick={() => go(addDays(date, -1))} disabled={date <= WINDOW_START} aria-label="Previous day">
            ←<span className="hide-xs"> Prev</span>
          </button>
          <div className="day-nav-mid">
            {!isToday ? (
              <a className="btn btn-sm btn-ghost" href={href('today')}>
                Back to today
              </a>
            ) : (
              <span className="small muted">Today</span>
            )}
            {startHidden && (
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  setStartHidden(false);
                  window.scrollTo({ top: 0 });
                }}
              >
                How to use this
              </button>
            )}
          </div>
          <button type="button" className="btn btn-ghost btn-nav" onClick={() => go(addDays(date, 1))} disabled={date >= LAST_DAY} aria-label="Next day">
            <span className="hide-xs">Next </span>→
          </button>
        </div>
        <p className="eyebrow">
          Week {x.week}
          {date < LAUNCH_DAY ? ' · pre-launch' : ''} · {done} of {all.length} done
        </p>
        <h1 className="display today-title">
          {dayLabel(date)} <em>{fmtDate(date, { weekday: 'short', day: 'numeric', month: 'short' })}</em>
        </h1>
        {outside && (
          <p className="small muted" role="note">
            {fmtDate(requested, { day: 'numeric', month: 'short', year: 'numeric' })} is outside the 90-day plan. Showing the nearest planned day.
          </p>
        )}
        {date <= LAUNCH_DAY && <Countdown />}
        <div className="today-stats">
          <a className={`today-stat pace-${pace.status}`} href={href('results')}>
            <span className="today-stat-label">This week</span>
            <span className="today-stat-value">{pace.headline}</span>
            <span className="today-stat-sub">{pace.detail}</span>
          </a>
          <div className="today-stat">
            <span className="today-stat-label">Money to spend today</span>
            <span className="today-stat-value num">{fmtUsd(firmUsd)}</span>
            <span className="today-stat-sub">
              {firm.length ? firm.map((m) => `${fmtUsd(m.usd)} ${m.label.split(/[,(]/)[0]}`).join(' · ') : maybe.length ? '' : 'Nothing to pay today.'}
              {maybe.length > 0 && `${firm.length ? ' · ' : ''}+ ${fmtUsd(maybeUsd)} only if: ${maybe.map((m) => m.label.split(/[,(]/)[0]).join(', ')}`}
            </span>
          </div>
        </div>
      </header>

      {x.launch && <LaunchCard launch={x.launch} date={date} checks={checks} toggle={toggle} />}

      {GROUPS.map((g) =>
        groups[g.id].length ? (
          <section key={g.id} className="tgroup" aria-labelledby={`g-${g.id}`}>
            <div className="tgroup-head">
              <h2 id={`g-${g.id}`}>
                {g.title} <span className="muted num">{groups[g.id].filter((i) => checks[i.key]).length}/{groups[g.id].length}</span>
              </h2>
              <span className="tiny muted">{g.hint}</span>
            </div>
            {g.id === 'post' && before.length > 0 &&
              (beforeDone < before.length ? (
                <div className="before-post" role="group" aria-labelledby="bp-h">
                  <p id="bp-h" className="before-post-h">
                    <b>Before you post anything</b> <span className="muted num">{beforeDone}/{before.length}</span> <span className="tiny muted">· once, not every day</span>
                  </p>
                  {beforeList}
                </div>
              ) : (
                <Details summary={<span className="small">✓ Before posting: all {before.length} done (music, DM keywords, DM text)</span>}>{beforeList}</Details>
              ))}
            <ul className="ticklist">
              {groups[g.id].map((i) => (
                <TickItem key={i.key} checked={!!checks[i.key]} onToggle={() => toggle(i.key)} time={i.time} text={i.text} tag={i.tag} sub={i.sub} how={i.how} label={i.label} />
              ))}
            </ul>
          </section>
        ) : null,
      )}
      <p className="tiny muted" style={{ marginTop: 28 }}>
        Ticks are saved in this browser only.
      </p>
    </div>
  );
}

const HOW_STEPS: ReactNode[] = [
  'Each morning, open Today.',
  <>
    Do the items from top to bottom. Tap <b>How</b> for the exact words, links and files.
  </>,
  'Tick each one off when it is done.',
  <>
    Each evening, type your numbers into <a href={href('results')}>Results</a>.
  </>,
  <>
    On Sunday, read this week's card on <a href={href('plan')}>Plan</a> and the verdict on <a href={href('results')}>Results</a>.
  </>,
];
const TAB_USE: Record<string, string> = {
  today: "today's list: what to post, make and send",
  plan: 'the 13 weeks, the money for each week and the decisions',
  ads: 'each ad, click by click, on the day it is due',
  results: 'your numbers each evening, and the verdict',
  library: 'every video, image, playbook and tool',
};

/** The first-visit card: five steps and one line per tab. Hidden with "Got it"; "How to use this" brings it back. */
function StartHere({ onClose }: { onClose: () => void }) {
  return (
    <section className="start-here card" aria-labelledby="start-h">
      <div className="start-here-top">
        <div>
          <p className="kicker">New here?</p>
          <h2 id="start-h">Start here</h2>
        </div>
        <button type="button" className="btn btn-sm" onClick={onClose}>
          Got it, hide this
        </button>
      </div>
      <ol className="start-steps">
        {HOW_STEPS.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      <dl className="start-tabs">
        {ROUTES.map((r) => (
          <div key={r.id}>
            <dt>
              <a href={href(r.id)}>{r.label}</a>
            </dt>
            <dd>{TAB_USE[r.id] ?? r.blurb}</dd>
          </div>
        ))}
      </dl>
      <p className="tiny muted">To see this again, tap "How to use this" at the top of Today or at the bottom of any page.</p>
    </section>
  );
}

/** "File: V01_reel_9x16.mp4 (in <the renders folder>)" under a post whose finished file exists, or why it is still to make. */
function FileLine({ f }: { f: PostFile | null }) {
  if (!f) return null;
  if (!f.ready) return f.reason ? <span className="ti-file is-todo">To make: {plain(f.reason)}</span> : null;
  const files = f.files ?? [];
  const name = files.length > 2 ? `${files[0]} … ${files[files.length - 1]}` : files.join(' + ');
  return (
    <span className="ti-file">
      {files.length > 1 ? `Files (${files.length})` : 'File'}: <code>{name}</code> <span className="muted">(in {f.folder})</span>
    </span>
  );
}

function FileTag({ f }: { f: PostFile | null }) {
  if (!f) return null;
  return f.ready ? <span className="chip chip-good">✓ ready to post</span> : <span className="chip chip-muted">to make</span>;
}

function buildGroups(day: CalendarDay, x: TodayExtra, date: string): Record<GroupId, Item[]> {
  const g: Record<GroupId, Item[]> = { post: [], make: [], ads: [], reach: [], log: [] };

  /* ---------- Post ---------- */
  // Before the public launch (Wed 28 Oct 19:00 CET) the calendar holds only the countdown teasers.
  day.posts.forEach((p, i) => {
    const e = x.posts[i];
    const t = hm(p.time);
    const what = CHANNEL_SHORT[p.channel] ?? p.channel;
    const igMain = e?.igMain && x.ig ? x.ig : null;
    const time = igMain ? hm(igMain.main.time) || t : t;
    g.post.push({
      key: `${date}:p:${slug(p.channel)}:${t}:${p.contentId ?? ''}`,
      time,
      label: `${what} ${p.contentId ?? ''} at ${time}`,
      text: (
        <>
          <b>{what}</b> · {p.contentId && <span className="item-id">{p.contentId}</span>} {e?.title ?? 'Open slot'}
        </>
      ),
      tag: (
        <>
          <FileTag f={e?.file ?? null} />
          {e?.teaser && <span className="chip chip-accent">teaser</span>}
          {p.tag && p.tag !== 'live' ? <span className="chip chip-beat">Only if the feature is live</span> : p.requires ? <span className="chip chip-warn">{/^you want|optional/i.test(p.requires) ? 'Optional' : 'Has a condition'}</span> : null}
        </>
      ),
      sub: <FileLine f={e?.file ?? null} />,
      how: <PostHow post={p} e={e} ig={igMain} date={date} />,
    });
  });
  // One-off dated reminders from data/posting.json (for example: do not post V01 before the launch).
  for (const r of x.reminders ?? []) {
    const gid: GroupId = r.group in g ? (r.group as GroupId) : 'post';
    g[gid].push({
      key: `${date}:rem:${slug(r.text)}`,
      time: hm(r.time),
      label: r.text,
      text: <b>{r.text}</b>,
      tag: <span className="chip chip-warn">important</span>,
      how: (
        <div className="how">
          <p className="small">{plain(r.how)}</p>
        </div>
      ),
    });
  }
  // Instagram kick-off stories that are not already calendar posts.
  if (x.ig) {
    for (const s of x.ig.stories) {
      if (s.contentId && day.posts.some((p) => p.contentId === s.contentId && /Stories/.test(p.channel))) continue;
      const t = hm(s.time);
      g.post.push({
        key: `${date}:igs:${t}`,
        time: t,
        label: `Instagram Story at ${t}`,
        text: (
          <>
            <b>Instagram Story</b> · {s.template ?? s.contentId}
          </>
        ),
        how: (
          <div className="how">
            {s.link && <CopyField label="Link sticker" text={goUrl(s.link)} mono />}
            <p className="small">
              Story template "{s.template}". See the Instagram playbook for the template: <a href={href('library', 'instagram')}>Library › Instagram playbook</a>.
            </p>
          </div>
        ),
      });
    }
  }

  /* ---------- Make (production) ---------- */
  for (const m of x.make) {
    g.make.push({
      key: `${date}:m:${slug(m.text)}`,
      time: m.time,
      label: m.text,
      text: plain(cap(m.text)),
      tag: m.shots.length ? `Higgsfield · ~${Math.round(m.shots.reduce((a, s) => a + s.credits, 0))} credits` : undefined,
      how: m.ids.length || m.shots.length ? (
        <div className="how">
          {m.shots.length > 0 && (
            <>
              <p className="small">
                Higgsfield (production budget, not the $1,000). Copy each prompt and negative exactly; 9:16, 1080p, the camera preset on the card. Upload only what the card says: never unfinished features, client work or customer data. The 'AI-generated scene' label goes on in HyperFrames.
              </p>
              {m.shots.map((s) => (
                <div key={s.id} className="hf-shot-today">
                  <p className="small">
                    <b>{s.id}</b> {s.title}
                    {s.gate ? ` (only if ${s.gate})` : ''}
                  </p>
                  <HfShotBody s={s} />
                </div>
              ))}
            </>
          )}
          {m.ids.length > 0 && <p className="small">Open the sheet for each piece: the exact words on screen, the template and the time it takes.</p>}
          {m.ids.length > 0 && (
            <ul className="linklist">
              {m.ids.map((id) => (
                <li key={id}>
                  <a href={contentHref(id)}>
                    <span className="item-id">{id}</span> script, caption and prompts
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="small">
            How we make videos, the production budget and every Higgsfield shot: <a href={href('library', 'production')}>Library › Production</a>.
          </p>
        </div>
      ) : undefined,
    });
  }

  /* ---------- Calendar actions ---------- */
  const logSteps = (
    <Steps
      items={[
        "Open Whop: count yesterday's new paying customers, refunds and money in.",
        'Open each platform: views, link clicks and comments per channel.',
        <>
          Type them into the day sheet on <a href={href('results')}>Results</a> (one row per channel; leave a cell empty when you do not know it).
        </>,
      ]}
    />
  );
  let hasNumbers = false;
  for (const a of day.actions) {
    const lead = a.what.match(/^(\d{1,2}:\d{2})\b/)?.[1] ?? (/^Evening\b/i.test(a.what) ? '20:00' : '');
    const [first, ...rest] = sentences(a.what);
    const numbers = /^08:00 numbers/i.test(a.what);
    hasNumbers ||= numbers;
    g[GROUP_OF[a.type] ?? 'make'].push({
      key: actionKey(date, a.what),
      time: lead ? hm(lead) : '',
      label: first,
      text: numbers ? <><b>Yesterday's numbers:</b> {plain(first.replace(/^08:00 numbers:\s*/i, ''))}</> : plain(cap(first.replace(/^Evening:\s*/i, ''))),
      tag: a.budgetLineId ? <span className="chip chip-accent">budget line {a.budgetLineId}</span> : undefined,
      how:
        rest.length || a.owner || numbers ? (
          <div className="how">
            {numbers && logSteps}
            {numbers && day.kpiCheck && <p className="small muted">{plain(day.kpiCheck)}</p>}
            <Steps items={rest.map((r) => plain(r))} ordered={false} />
            <p className="tiny muted">Who: {a.owner}</p>
          </div>
        ) : undefined,
    });
  }

  /* ---------- Ad cards that are due ---------- */
  for (const ad of x.ads) {
    const verb = ad.kind === 'prep' ? 'Get ready' : ad.kind === 'check' ? 'Check' : ad.day === 1 ? 'Launch' : 'Running';
    g.ads.unshift({
      key: `${date}:ad:${ad.id}:${ad.kind}`,
      time: ad.kind === 'run' && ad.day === 1 ? '00:00' : ad.kind === 'run' ? '10:00' : '',
      label: `${verb} ad ${ad.id}`,
      text: (
        <>
          <b>
            {verb} {ad.id}
          </b>{' '}
          · {ad.platform} · {ad.money}
          {ad.kind === 'run' && ad.days ? ` · day ${ad.day} of ${ad.days}` : ''}
        </>
      ),
      tag: !ad.inThe1000 ? <span className="chip chip-owner">from revenue, not the $1,000</span> : undefined,
      how: (
        <div className="how">
          <p className="small">{plain(ad.note)}</p>
          <p className="small">
            <b>Only if:</b> {plain(ad.trigger)}
          </p>
          <p className="small">
            <a className="btn btn-sm" href={href('ads', ad.id)}>
              Open card {ad.id}: every click, the copy and the stop rule
            </a>
          </p>
        </div>
      ),
    });
  }

  /* ---------- Log numbers ---------- */
  if (!hasNumbers) g.log.push({
    key: `${date}:log`,
    time: '08:00',
    label: "Log yesterday's numbers",
    text: (
      <>
        <b>Log yesterday's numbers</b> and read the day's check
      </>
    ),
    how: (
      <div className="how">
        {logSteps}
        {day.kpiCheck && <p className="small muted">{plain(day.kpiCheck)}</p>}
      </div>
    ),
  });

  for (const k of Object.keys(g) as GroupId[]) g[k].sort((a, b) => sortKey(a.time) - sortKey(b.time));
  return g;
}

function PostHow({ post, e, ig, date }: { post: CalendarPost; e: TodayExtra['posts'][number] | undefined; ig: TodayExtra['ig']; date: string }) {
  const url = post.link ? goUrl(post.link) : '';
  const isGo = /\/go\//.test(post.link ?? '');
  const f = e?.file?.ready ? e.file : null;
  // The finished posting sheet's caption (per platform, from POSTING.md) wins over the plan's draft caption.
  const caption = f?.caption ? [f.caption, (f.hashtags ?? []).join(' ')].filter(Boolean).join('\n\n') : e?.caption;
  return (
    <div className="how">
      {e?.file && !e.file.ready && (
        <p className="notice small">
          <b>To make</b>
          <span>{e.file.reason ? plain(e.file.reason) : 'No finished file yet: make it from the full script (link below).'}</span>
        </p>
      )}
      {e?.teaser && (
        <p className="notice small">
          <b>Teaser</b>
          <span>It says when, never that it is live: no price, no "we launched". Link: makeborne.com (the countdown).</span>
        </p>
      )}
      {f && (
        <div className="how-file">
          {(f.files?.length ?? 0) > 2 && (
            <p className="small">
              <b>All {f.files?.length} files, in this order:</b> <code>{f.files?.join(', ')}</code>
            </p>
          )}
          {f.laterFiles && f.laterFiles.length > 0 && (
            <p className="small muted">
              After today, post <code>{f.laterFiles.join(', ')}</code> instead ("We just launched").
            </p>
          )}
          {f.makeUp && (
            <p className="small muted">
              Missed this slot? Post it {fmtDate(f.makeUp.date, { weekday: 'short', day: 'numeric', month: 'short' })} at {f.makeUp.time} instead.
            </p>
          )}
          {f.cover && <p className="small"><b>Cover:</b> <code>{f.cover}</code>{post.channel === 'TikTok' ? ' (on TikTok pick the frame at 0 or 1 s: it is the same picture)' : ''}</p>}
          {f.keyword && <p className="small"><b>Keyword:</b> {f.keyword}</p>}
          {f.disclosure && <p className="small"><b>Ad label or AI note:</b> {f.disclosure}</p>}
          {f.ytTitle && <CopyField label="YouTube title" text={f.ytTitle} />}
          {f.captionNote && <p className="small muted">{cap(f.captionNote)}</p>}
        </div>
      )}
      {post.requires && (
        <p className="notice small">
          <b>Only if</b>
          <span>
            {plain(post.requires)}
            {post.fallbackContentId ? `; otherwise post ${post.fallbackContentId}` : ''}.
          </span>
        </p>
      )}
      {ig?.main.choose && <p className="small"><b>Choose:</b> {plain(ig.main.choose)}</p>}
      {caption && <CopyField label={f?.caption ? (f.ytTitle ? 'Description' : 'Caption') : 'Caption'} text={caption} />}
      {!caption && e?.onImage && <CopyField label="Words on the image" text={e.onImage} />}
      {ig && !f?.cover && <p className="small"><b>Cover:</b> {ig.main.cover}</p>}
      {ig && <p className="small"><b>Comment keyword:</b> {ig.main.keyword} (the DM sends {ig.main.link})</p>}
      {url && !isGo && <CopyField label="Link" text={post.utm ? longUrl(post.utm) : url} mono copyLabel="Copy the link" />}
      {url && isGo && <CopyField label={date < GO_LIVE ? 'Link (from Thu 29 Oct)' : 'Link'} text={url} mono copyLabel={`Copy ${post.link.split('/go/')[1] ?? 'post'} link`} />}
      {url && isGo && date < GO_LIVE && post.utm && <CopyField label="Link until /go/ is live" text={longUrl(post.utm)} mono copyLabel="Copy the long link" />}
      {ig ? <Steps items={ig.checklist.map((c) => plain(c))} /> : <Steps items={sentences(post.notes).map((n) => plain(n))} ordered={false} />}
      <p className="small muted">
        {e?.length && `${e.length} · `}
        {post.account}
        {post.contentId && (
          <>
            {' · '}
            <a href={contentHref(post.contentId)}>Full script and prompts</a>
          </>
        )}
      </p>
    </div>
  );
}

/** Seconds until the public launch, ticking once a second (0 once it has passed). */
function useLaunchCountdown() {
  const target = Date.parse(LAUNCH_AT_UTC);
  const [now, setNow] = useState(() => Date.now());
  const live = now >= target;
  useEffect(() => {
    if (live) return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [live]);
  return Math.max(0, Math.floor((target - now) / 1000));
}

/** The countdown to Wed 28 Oct 19:00 CET, in the war room's stat-card style; makeborne.com counts down to the same moment. */
function Countdown() {
  const s = useLaunchCountdown();
  const parts: [number, string][] = [
    [Math.floor(s / 86400), 'days'],
    [Math.floor((s % 86400) / 3600), 'hours'],
    [Math.floor((s % 3600) / 60), 'min'],
    [s % 60, 'sec'],
  ];
  return (
    <div className={`countdown${s === 0 ? ' is-live' : ''}`} role="timer" aria-label={s === 0 ? 'Makeborne is live' : `Launch in ${parts.map(([n, u]) => `${n} ${u}`).join(', ')}`}>
      <span className="today-stat-label">{s === 0 ? 'Live since Wed 28 Oct, 19:00 CET' : 'Launch in'}</span>
      {s > 0 ? (
        <span className="countdown-digits num" aria-hidden="true">
          {parts.map(([n, u]) => (
            <span key={u} className="countdown-part">
              <b>{String(n).padStart(2, '0')}</b>
              <small>{u}</small>
            </span>
          ))}
        </span>
      ) : (
        <span className="today-stat-value">We are live.</span>
      )}
      <span className="today-stat-sub">Public launch Wed 28 Oct 2026, 19:00 Sarajevo time (18:00 UTC). makeborne.com counts down to the same moment.</span>
    </div>
  );
}

/** Launch day: "LAUNCH — 19:00 CET" and the minute-by-minute run of show (data/plan.json launch), each step a tick box. */
function LaunchCard({ launch, date, checks, toggle }: { launch: LaunchInfo; date: string; checks: Record<string, boolean>; toggle: (k: string) => void }) {
  return (
    <section className="tgroup launch-card" aria-labelledby="launch-h">
      <div className="tgroup-head">
        <h2 id="launch-h">LAUNCH — {launch.timeCet} CET</h2>
        <span className="tiny muted">
          Run of show <span className="num">{launch.runOfShow.filter((r) => checks[RUN_KEY(date, r.time, r.text)]).length}/{launch.runOfShow.length}</span>
        </span>
      </div>
      <p className="small">{plain(launch.label)}. Nothing that says "we launched" goes out before 19:00.</p>
      <ul className="ticklist">
        {launch.runOfShow.map((r) => {
          const k = RUN_KEY(date, r.time, r.text);
          return <TickItem key={k} checked={!!checks[k]} onToggle={() => toggle(k)} time={r.time} text={<b>{r.text}</b>} label={`${r.time} ${r.text}`} how={<p className="small">{plain(r.how)}</p>} />;
        })}
      </ul>
    </section>
  );
}

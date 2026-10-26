import { use, useEffect, useMemo, type ReactNode } from 'react';
import type { CalendarDay, CalendarPost, TodayExtra } from '../lib/types';
import { addDays, fmtDate, fmtUsd, isIsoDate, sarajevoToday, WINDOW_START } from '../lib/util';
import { LAST_DAY, hasDay, loadDay } from '../lib/calendarIndex';
import { useActuals, useChecks } from '../lib/stores';
import { weekPace } from '../lib/pace';
import { CopyField, Steps, TickItem } from '../components/Checklist';
import { href, type RouteProps } from '../routes';

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

interface Item { key: string; time: string; text: ReactNode; label: string; tag?: ReactNode; how?: ReactNode }
type GroupId = 'post' | 'make' | 'ads' | 'reach' | 'log';
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

  return (
    <div className="page page-narrow today">
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
          </div>
          <button type="button" className="btn btn-ghost btn-nav" onClick={() => go(addDays(date, 1))} disabled={date >= LAST_DAY} aria-label="Next day">
            <span className="hide-xs">Next </span>→
          </button>
        </div>
        <p className="eyebrow">
          Week {x.week} · {done} of {all.length} done
        </p>
        <h1 className="display today-title">
          Day {day.day} <em>{fmtDate(date, { weekday: 'short', day: 'numeric', month: 'short' })}</em>
        </h1>
        {outside && (
          <p className="small muted" role="note">
            {fmtDate(requested, { day: 'numeric', month: 'short', year: 'numeric' })} is outside the 90-day plan. Showing the nearest planned day.
          </p>
        )}
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

      {GROUPS.map((g) =>
        groups[g.id].length ? (
          <section key={g.id} className="tgroup" aria-labelledby={`g-${g.id}`}>
            <div className="tgroup-head">
              <h2 id={`g-${g.id}`}>
                {g.title} <span className="muted num">{groups[g.id].filter((i) => checks[i.key]).length}/{groups[g.id].length}</span>
              </h2>
              <span className="tiny muted">{g.hint}</span>
            </div>
            <ul className="ticklist">
              {groups[g.id].map((i) => (
                <TickItem key={i.key} checked={!!checks[i.key]} onToggle={() => toggle(i.key)} time={i.time} text={i.text} tag={i.tag} how={i.how} label={i.label} />
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

function buildGroups(day: CalendarDay, x: TodayExtra, date: string): Record<GroupId, Item[]> {
  const g: Record<GroupId, Item[]> = { post: [], make: [], ads: [], reach: [], log: [] };

  /* ---------- Post ---------- */
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
      tag: p.tag && p.tag !== 'live' ? <span className="chip chip-beat">Only if the feature is live</span> : p.requires ? <span className="chip chip-warn">Has a condition</span> : undefined,
      how: <PostHow post={p} e={e} ig={igMain} date={date} />,
    });
  });
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
      text: cap(m.text),
      how: m.ids.length ? (
        <div className="how">
          <p className="small">Open the sheet for each piece: the exact words on screen, the template and the time it takes.</p>
          <ul className="linklist">
            {m.ids.map((id) => (
              <li key={id}>
                <a href={contentHref(id)}>
                  <span className="item-id">{id}</span> script, caption and prompts
                </a>
              </li>
            ))}
          </ul>
          <p className="small">
            How we make videos (one screen): <a href={href('library', 'production')}>Library › Production</a>.
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
      text: numbers ? <><b>Yesterday's numbers:</b> {first.replace(/^08:00 numbers:\s*/i, '')}</> : first.replace(/^Evening:\s*/i, ''),
      tag: a.budgetLineId ? <span className="chip chip-accent">budget {a.budgetLineId}</span> : undefined,
      how:
        rest.length || a.owner || numbers ? (
          <div className="how">
            {numbers && logSteps}
            {numbers && day.kpiCheck && <p className="small muted">{day.kpiCheck}</p>}
            <Steps items={rest} ordered={false} />
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
          <p className="small">{ad.note}</p>
          <p className="small">
            <b>Only if:</b> {ad.trigger}
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
        {day.kpiCheck && <p className="small muted">{day.kpiCheck}</p>}
      </div>
    ),
  });

  for (const k of Object.keys(g) as GroupId[]) g[k].sort((a, b) => sortKey(a.time) - sortKey(b.time));
  return g;
}

function PostHow({ post, e, ig, date }: { post: CalendarPost; e: TodayExtra['posts'][number] | undefined; ig: TodayExtra['ig']; date: string }) {
  const url = post.link ? goUrl(post.link) : '';
  return (
    <div className="how">
      {post.requires && (
        <p className="notice small">
          <b>Only if</b>
          <span>
            {post.requires}
            {post.fallbackContentId ? `; otherwise post ${post.fallbackContentId}` : ''}.
          </span>
        </p>
      )}
      {ig?.main.choose && <p className="small"><b>Choose:</b> {ig.main.choose}</p>}
      {e?.caption && <CopyField label="Caption" text={e.caption} />}
      {!e?.caption && e?.onImage && <CopyField label="Words on the image" text={e.onImage} />}
      {ig && <p className="small"><b>Cover:</b> {ig.main.cover}</p>}
      {ig && <p className="small"><b>Comment keyword:</b> {ig.main.keyword} (the DM sends {ig.main.link})</p>}
      {url && <CopyField label={date < GO_LIVE ? 'Link (from Thu 29 Oct)' : 'Link'} text={url} mono copyLabel={`Copy ${post.link.split('/go/')[1] ?? 'post'} link`} />}
      {url && date < GO_LIVE && post.utm && <CopyField label="Link until /go/ is live" text={longUrl(post.utm)} mono copyLabel="Copy the long link" />}
      {ig ? <Steps items={ig.checklist} /> : <Steps items={sentences(post.notes)} ordered={false} />}
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

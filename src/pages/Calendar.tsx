import { useState } from 'react';
import calendarJson from '../../data/calendar.json';
import type { CalendarDay } from '../lib/types';
import { addDays, fmtDate, isIsoDate, normTag, sarajevoToday, WINDOW_START } from '../lib/util';
import { contentTitle } from '../lib/contentIndex';
import { BeatTag, Card, Chip, CopyButton, Page, Section, Segmented } from '../components/ui';
import { href, type RouteProps } from '../routes';

const CAL = calendarJson as unknown as CalendarDay[];
const LAST = CAL[CAL.length - 1].date;
const PHASES: Record<string, string> = { 'launch-week': 'Launch week', 'phase-1': 'Phase 1 · find the format', 'phase-2': 'Phase 2 · proof, Black Friday, loops', 'phase-3': 'Phase 3 · holiday bank, January, scale' };
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const time = (t: string) => t.match(/(\d{1,2}:\d{2})/)?.[1]?.padStart(5, '0') ?? '';

export default function Calendar({ params }: RouteProps) {
  const today = sarajevoToday();
  const fallback = today < WINDOW_START ? WINDOW_START : today > LAST ? LAST : today;
  const selected = params[0] && isIsoDate(params[0]) && CAL.some((d) => d.date === params[0]) ? params[0] : fallback;
  const day = CAL.find((d) => d.date === selected)!;
  const [view, setView] = useState<'week' | 'day'>(params[0] ? 'day' : 'week');
  const [channel, setChannel] = useState('');
  const [onlyBeats, setOnlyBeats] = useState(false);
  const channels = [...new Set(CAL.flatMap((d) => d.posts.map((p) => p.channel)))];
  const weeks = Array.from({ length: Math.ceil(CAL.length / 7) }, (_, i) => CAL.slice(i * 7, i * 7 + 7));
  const postFilter = (p: CalendarDay['posts'][number]) => (!channel || p.channel === channel) && (!onlyBeats || normTag(p.tag) !== 'live');

  return (
    <Page
      eyebrow={`${CAL.length} days (day 91 = the day-90 review) · ${CAL.reduce((a, d) => a + d.posts.length, 0)} planned posts · ${CAL.reduce((a, d) => a + d.actions.length, 0)} actions`}
      title={
        <>
          Ninety days, <em>one at a time</em>
        </>
      }
      lede="Pick a day to see its posts and actions. Violet dots are beat posts that only run if their feature has passed the gate; square marks are launch moments."
    >
      <div className="filters">
        <div className="field">
          <label htmlFor="cal-ch">Channel</label>
          <select id="cal-ch" value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="">All channels</option>
            {channels.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <label className="row small" style={{ alignSelf: 'end', minHeight: 38, cursor: 'pointer' }}>
          <input type="checkbox" checked={onlyBeats} onChange={(e) => setOnlyBeats(e.target.checked)} /> Only beat posts
        </label>
      </div>

      <div className="weekgrid" aria-label="90-day calendar">
        <div className="week-row" aria-hidden="true">
          <div />
          {WEEKDAYS.map((w) => (
            <div key={w} className="tiny muted" style={{ textAlign: 'center' }}>
              {w}
            </div>
          ))}
        </div>
        {weeks.map((wk, wi) => (
          <div key={wi}>
            {(wi === 0 || weeks[wi - 1][0].phase !== wk[0].phase) && <div className="phase-band">{PHASES[wk[0].phase] ?? wk[0].phase}</div>}
            <div className="week-row">
              <div className="week-label">
                <b>W{wk[0].week}</b>
                {fmtDate(wk[0].date, { day: 'numeric', month: 'short' })}
              </div>
              {wk.map((d) => {
                const posts = d.posts.filter(postFilter);
                const launches = d.actions.filter((a) => a.type === 'launch').length;
                return (
                  <a
                    key={d.date}
                    href={href('library', 'calendar', d.date)}
                    onClick={() => setView('day')}
                    className={`daycell ${d.date === today ? 'is-today' : ''} ${d.date === selected ? 'is-selected' : ''}`}
                    aria-current={d.date === selected ? 'date' : undefined}
                    aria-label={`Day ${d.day}, ${fmtDate(d.date, { weekday: 'long', day: 'numeric', month: 'long' })}: ${posts.length} posts, ${d.actions.length} actions`}
                  >
                    <span className="dc-date num">
                      <span>{fmtDate(d.date, { day: 'numeric' })}</span>
                      <span className="tiny" style={{ opacity: 0.6 }}>d{d.day}</span>
                    </span>
                    <span className="dc-focus">{d.focus}</span>
                    <span className="dc-dots" aria-hidden="true">
                      {posts.slice(0, 14).map((p, i) => (
                        <i key={i} className={normTag(p.tag) !== 'live' ? 'beat' : ''} />
                      ))}
                      {Array.from({ length: launches }, (_, i) => (
                        <i key={`l${i}`} className="act" />
                      ))}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Section
        id="detail"
        title={
          view === 'day' ? (
            <>
              Day {day.day} · <em>{fmtDate(day.date, { weekday: 'long', day: 'numeric', month: 'long' })}</em>
            </>
          ) : (
            <>
              Week {day.week} · <em>{fmtDate(addDays(WINDOW_START, (day.week - 1) * 7), { day: 'numeric', month: 'short' })} – {fmtDate(addDays(WINDOW_START, day.week * 7 - 1), { day: 'numeric', month: 'short' })}</em>
            </>
          )
        }
        kicker={PHASES[day.phase]}
        aside={
          <div className="row">
            <Segmented
              label="Detail view"
              value={view}
              onChange={setView}
              options={[
                { value: 'week', label: 'Week' },
                { value: 'day', label: 'Day' },
              ]}
            />
            <a className="btn btn-sm btn-ghost" href={href('today', day.date)}>
              Open in Today
            </a>
          </div>
        }
        className="cal-detail"
      >
        {view === 'day' ? (
          <DayDetail d={day} filter={postFilter} />
        ) : (
          <div className="stack">
            {weeks[day.week - 1].map((d) => (
              <Card key={d.date} className={`card-flat ${d.date === selected ? 'card-accent' : ''}`}>
                <div className="row-between">
                  <a href={href('library', 'calendar', d.date)} onClick={() => setView('day')}>
                    <b>
                      {fmtDate(d.date, { weekday: 'long', day: 'numeric', month: 'short' })} · day {d.day}
                    </b>
                  </a>
                  <span className="tiny muted">
                    {d.posts.filter(postFilter).length} posts · {d.actions.length} actions
                  </span>
                </div>
                <p className="small muted" style={{ margin: '4px 0 8px' }}>
                  {d.focus}
                </p>
                <div className="row">
                  {d.posts.filter(postFilter).map((p, i) => (
                    <a key={i} className={`chip ${normTag(p.tag) !== 'live' ? 'chip-beat' : 'chip-muted'}`} href={p.contentId ? href('content', p.contentId) : undefined} style={{ textDecoration: 'none' }} title={`${p.channel}: ${contentTitle(p.contentId)}`}>
                      {time(p.time)} {p.contentId ?? '—'} · {p.channel}
                    </a>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </Page>
  );
}

function DayDetail({ d, filter }: { d: CalendarDay; filter: (p: CalendarDay['posts'][number]) => boolean }) {
  const posts = d.posts.filter(filter).sort((a, b) => time(a.time).localeCompare(time(b.time)));
  return (
    <div className="split">
      <Card className="card-flat">
        <p style={{ fontSize: 16 }}>{d.focus}</p>
        <h4 style={{ marginTop: 16 }}>Posts · {posts.length}</h4>
        <ul className="list">
          {posts.map((p, i) => (
            <li key={i}>
              <div className="row-between">
                <div className="row">
                  <b className="num">{time(p.time)}</b>
                  <Chip>{p.channel}</Chip>
                  <BeatTag tag={p.tag} />
                  {p.slot !== 'original' && <Chip tone="muted">{p.slot}</Chip>}
                </div>
                {p.link && <CopyButton text={`https://${p.link}`} label="Copy link" />}
              </div>
              <div style={{ marginTop: 6 }}>
                {p.contentId ? (
                  <a href={href('content', p.contentId)}>
                    <span className="item-id">{p.contentId}</span> {contentTitle(p.contentId)}
                  </a>
                ) : (
                  <span className="muted">Unlinked slot</span>
                )}
              </div>
              <p className="tiny muted" style={{ margin: '4px 0 0' }}>
                {p.account} · <span className="code">{p.link}</span> · utm_content {p.utm?.utm_content}
              </p>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                {p.notes}
              </p>
            </li>
          ))}
        </ul>
      </Card>
      <div className="stack" style={{ alignContent: 'start' }}>
        <Card className="card-flat">
          <h4>Actions · {d.actions.length}</h4>
          <ul className="list small">
            {d.actions.map((a, i) => (
              <li key={i}>
                <div className="row" style={{ marginBottom: 4 }}>
                  <Chip tone={a.type === 'launch' ? 'accent' : a.type === 'analysis' ? 'owner' : a.type === 'ads' ? 'warn' : undefined}>{a.type}</Chip>
                  <span className="tiny muted">{a.owner}</span>
                </div>
                {a.what}
              </li>
            ))}
          </ul>
        </Card>
        {d.kpiCheck && (
          <div className="notice notice-good">
            <b>KPI check</b>
            <span>{d.kpiCheck}</span>
          </div>
        )}
      </div>
    </div>
  );
}

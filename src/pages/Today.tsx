import { use, useEffect, useState } from 'react';
import kpisJson from '../../data/kpis.json';
import checkpointsJson from '../../data/checkpoints.json';
import type { CalendarPost, Checkpoint, Kpis } from '../lib/types';
import { addDays, diffDays, fmtDate, fmtInt, fmtUsd, isIsoDate, planDay, planWeek, sarajevoToday, WINDOW_START } from '../lib/util';
import { PLAN, TOTAL, defaultAllocation, plannedCumulative } from '../lib/budget';
import { acquisition, aggregate, netPaid } from '../lib/actuals';
import { contentMeta, contentTitle } from '../lib/contentIndex';
import { LAST_DAY, hasDay, loadDay } from '../lib/calendarIndex';
import { STATUS_LABEL, STATUSES, useActuals, useAllocation, useChecks, useContentStatus, useSpendLog, type Status } from '../lib/stores';
import { BeatTag, Card, Chip, CopyButton, Empty, Page, Progress, Section, Stat } from '../components/ui';
import { href, type RouteProps } from '../routes';

const KPIS = kpisJson as unknown as Kpis;
const CHECKPOINTS = (checkpointsJson as unknown as { checkpoints: Checkpoint[] }).checkpoints;
const LAST = LAST_DAY;

/** Ticks are keyed by the action's text, so reordering or inserting actions in calendar.json keeps them on the right action. */
const actionKey = (date: string, what: string) => `${date}:${what.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48)}`;

const PHASE_NAME: Record<string, string> = {
  'launch-week': 'Launch week',
  'phase-1': 'Phase 1 · find the format',
  'phase-2': 'Phase 2 · proof, Black Friday, loops',
  'phase-3': 'Phase 3 · holiday bank, January, scale',
};

function parseTime(t: string) {
  const m = t.match(/(\d{1,2}):(\d{2})/);
  return { hm: m ? `${m[1].padStart(2, '0')}:${m[2]}` : '—', zone: t.match(/\b(CET|CEST|UTC[+-]?\d*|ET|PT|GMT)\b/)?.[1] ?? '', sort: m ? Number(m[1]) * 60 + Number(m[2]) : 9999 };
}

function clampDate(d: string) {
  if (d < WINDOW_START) return WINDOW_START;
  if (d > LAST) return LAST;
  return d;
}

export default function Today({ params }: RouteProps) {
  const realToday = sarajevoToday();
  const requested = params[0] && isIsoDate(params[0]) ? params[0] : realToday;
  const date = clampDate(requested);
  const outside = requested !== date;
  // loadDay falls back to day 1 for a date the calendar does not have, so the page never renders without a day.
  const day = use(loadDay(hasDay(date) ? date : WINDOW_START));
  const week = planWeek(date);
  const go = (d: string) => (window.location.hash = href('today', clampDate(d)));

  // The date field keeps a draft while the user types (a single "1" in the month would otherwise jump to January).
  const [pick, setPick] = useState(date);
  useEffect(() => setPick(date), [date]);

  // Warm the neighbouring days so Prev / Next do not wait for a chunk.
  useEffect(() => {
    for (const d of [addDays(date, -1), addDays(date, 1)]) if (hasDay(d)) void loadDay(d);
  }, [date]);

  const posts = [...day.posts].sort((a, b) => parseTime(a.time).sort - parseTime(b.time).sort);
  const [checks, setChecks] = useChecks();
  const [status, setStatus] = useContentStatus();
  const toggle = (k: string) => setChecks((c) => ({ ...c, [k]: !c[k] }));

  // One-time migration from the old position keys (`<date>:a<i>`) to text keys.
  useEffect(() => {
    const old = day.actions.map((_, i) => `${day.date}:a${i}`);
    if (!old.some((k) => k in checks)) return;
    setChecks((c) => {
      const next = { ...c };
      day.actions.forEach((a, i) => {
        const o = `${day.date}:a${i}`;
        if (o in next) {
          if (next[o]) next[actionKey(day.date, a.what)] = true;
          delete next[o];
        }
      });
      return next;
    });
  }, [day, checks, setChecks]);

  return (
    <Page
      eyebrow={
        <>
          <b>Day {day.day}</b> {day.day > 90 ? '· Day-90 review' : 'of 90'} · Week {week} · {PHASE_NAME[day.phase] ?? day.phase}
        </>
      }
      title={
        <>
          {fmtDate(date, { weekday: 'long' })}, <em>{fmtDate(date, { day: 'numeric', month: 'long' })}</em>
        </>
      }
      lede={day.focus}
      actions={
        <div className="row">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => go(addDays(date, -1))} disabled={date <= WINDOW_START} aria-label="Previous day">
            ← Prev
          </button>
          <input
            type="date"
            aria-label="Pick a day"
            value={pick}
            min={WINDOW_START}
            max={LAST}
            onChange={(e) => {
              const v = e.target.value;
              setPick(v);
              if (isIsoDate(v) && v >= WINDOW_START && v <= LAST && v !== date) go(v);
            }}
            onBlur={() => setPick(date)}
            style={{ width: 160 }}
          />
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => go(addDays(date, 1))} disabled={date >= LAST} aria-label="Next day">
            Next →
          </button>
          {date !== clampDate(realToday) && (
            <a className="btn btn-sm" href={href('today')}>
              Today
            </a>
          )}
        </div>
      }
    >
      {outside && (
        <div className="notice" style={{ marginBottom: 24 }}>
          <b>Outside the window.</b>
          <span>
            {fmtDate(requested, { day: 'numeric', month: 'short', year: 'numeric' })} is outside the 90-day plan ({fmtDate(WINDOW_START)} to {fmtDate(LAST)}). Showing the nearest planned day.
          </span>
        </div>
      )}

      <div className="split">
        <div className="stack" style={{ gap: 32 }}>
          <Section title={<>Posts <span className="muted">· {posts.length}</span></>} aside="Times are Sarajevo time" id="posts">
            {posts.length ? (
              <Card className="card-flat">
                <ol className="timeline">
                  {posts.map((p, i) => (
                    <PostRow key={i} post={p} status={p.contentId ? status[p.contentId] ?? 'todo' : undefined} onStatus={(s) => p.contentId && setStatus((m) => ({ ...m, [p.contentId!]: s }))} />
                  ))}
                </ol>
              </Card>
            ) : (
              <Empty>No posts planned for this day.</Empty>
            )}
          </Section>

          <Section title={<>Actions <span className="muted">· {day.actions.length}</span></>} id="actions" aside="Ticks are saved in this browser">
            <Card className="card-flat">
              <ul className="checklist">
                {day.actions.map((a) => {
                  const k = actionKey(date, a.what);
                  return (
                    <li key={k}>
                      <label>
                        <input type="checkbox" checked={!!checks[k]} onChange={() => toggle(k)} />
                        <span>
                          <span className={checks[k] ? 'done' : ''}>{a.what}</span>
                          <span className="row" style={{ marginTop: 6 }}>
                            <Chip tone={a.type === 'analysis' ? 'owner' : a.type === 'launch' ? 'accent' : a.type === 'ads' ? 'warn' : undefined}>{a.type}</Chip>
                            <span className="tiny muted">{a.owner}</span>
                          </span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Card>
            {day.kpiCheck && (
              <div className="notice notice-good" style={{ marginTop: 14 }}>
                <b>KPI check</b>
                <span>{day.kpiCheck}</span>
              </div>
            )}
          </Section>
        </div>

        <div className="stack" style={{ gap: 20, alignContent: 'start' }}>
          <NextDecision date={date} />
          <KpiStatus date={date} week={week} />
          <BudgetStatus date={date} week={week} />
          <Routine date={date} checks={checks} toggle={toggle} />
        </div>
      </div>
    </Page>
  );
}

function PostRow({ post, status, onStatus }: { post: CalendarPost; status?: Status; onStatus: (s: Status) => void }) {
  const t = parseTime(post.time);
  const c = contentMeta(post.contentId);
  const url = post.link ? `https://${post.link.replace(/^https?:\/\//, '')}` : '';
  return (
    <li>
      <div className="tl-time num">
        {t.hm}
        <small>{t.zone}</small>
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="row-between" style={{ alignItems: 'flex-start' }}>
          <div className="tl-title">
            {post.contentId ? (
              <a href={href('content', post.contentId)}>
                <span className="item-id">{post.contentId}</span> {contentTitle(post.contentId)}
              </a>
            ) : (
              'Unlinked slot'
            )}
          </div>
          {status && (
            <select className={`status-select status-${status}`} aria-label={`Status of ${post.contentId}, ${post.channel} ${t.hm}`} value={status} onChange={(e) => onStatus(e.target.value as Status)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="tl-meta">
          <Chip>{post.channel}</Chip>
          <BeatTag tag={post.tag} />
          {post.slot !== 'original' && <Chip tone="muted">{post.slot}</Chip>}
          {c?.kind === 'video' && <span className="tiny muted">{c.format} · {c.lengthSec}s</span>}
        </div>
        {post.link && (
          <div className="row" style={{ marginBottom: 6 }}>
            <span className="code">{post.link}</span>
            <CopyButton text={url} label="Copy link" ariaLabel={`Copy ${post.link.split('/go/')[1] ?? post.link} link`} />
          </div>
        )}
        <p className="small muted" style={{ margin: 0 }}>
          {post.notes}
        </p>
      </div>
    </li>
  );
}

function NextDecision({ date }: { date: string }) {
  const upcoming = CHECKPOINTS.filter((c) => c.date >= date).sort((a, b) => a.date.localeCompare(b.date));
  const next = upcoming[0];
  if (!next) return <Card>All dated checkpoints are behind you.</Card>;
  const days = diffDays(next.date, date);
  const decisionText = (id: string) => PLAN.decisions.find((d) => d.id === id)?.question ?? id;
  return (
    <Card className="card-ink">
      <p className="kicker" style={{ color: 'inherit', opacity: 0.7 }}>
        Next decision due
      </p>
      <div className="row-between" style={{ alignItems: 'baseline' }}>
        <h3 style={{ fontSize: 20, margin: 0 }}>{next.title}</h3>
        <span className="num" style={{ fontWeight: 650 }}>
          {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `in ${days} days`}
        </span>
      </div>
      <p className="small muted" style={{ marginTop: 4 }}>
        {next.approx ? 'About ' : ''}
        {fmtDate(next.date, { weekday: 'short', day: 'numeric', month: 'short' })} · Day {planDay(next.date)}
      </p>
      <p style={{ marginTop: 10 }}>{next.detail}</p>
      {next.decisions.length > 0 && (
        <ul className="list" style={{ marginTop: 8 }}>
          {next.decisions.map((d) => (
            <li key={d} style={{ borderColor: 'color-mix(in srgb, var(--bg) 18%, transparent)', padding: '8px 0' }}>
              <a href={href('strategy', 'decisions')} style={{ textDecoration: 'none' }}>
                <b>{d}</b> <span className="muted">· owner decision</span>
                <br />
                <span className="small">{decisionText(d)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
      {upcoming.length > 1 && (
        <p className="tiny muted" style={{ marginTop: 12, marginBottom: 0 }}>
          Then: {upcoming.slice(1, 3).map((c) => `${fmtDate(c.date, { day: 'numeric', month: 'short' })} ${c.title}`).join(' · ')}
        </p>
      )}
    </Card>
  );
}

function KpiStatus({ date, week }: { date: string; week: number }) {
  const [actuals] = useActuals();
  const target = KPIS.weeklyTargets[week - 1];
  const weekStart = addDays(WINDOW_START, (week - 1) * 7);
  const rows = acquisition(actuals).filter((e) => e.date >= weekStart && e.date <= date);
  const a = aggregate(rows);
  const elapsed = Math.min(7, diffDays(date, weekStart) + 1);
  const pace = elapsed / 7;
  const metrics = [
    { label: 'Visits (/go/ clicks)', actual: a.clicks, target: target.visits },
    { label: 'Sign-ups', actual: a.signups, target: target.signups },
    { label: 'Gross paid', actual: a.paid, target: target.paid },
    { label: 'Net paid', actual: netPaid(a), target: target.netPaid },
    { label: 'Activated payers', actual: a.activated, target: target.activatedPayers },
  ];
  return (
    <Card>
      <div className="row-between">
        <h3 style={{ margin: 0 }}>KPI status · week {week}</h3>
        <a className="small" href={href('analytics')}>
          Log actuals
        </a>
      </div>
      <p className="tiny muted">
        Week to date ({elapsed}/7 days) against {KPIS.weeklyTargets[week - 1].dates} targets. Pace line = target × {elapsed}/7.
      </p>
      {rows.length === 0 && (
        <p className="small muted" style={{ margin: '6px 0 10px' }}>
          No actuals logged for this week yet. Targets shown for reference.
        </p>
      )}
      <div className="stack" style={{ gap: 12, marginTop: 8 }}>
        {metrics.map((m) => {
          const expected = m.target * pace;
          const ratio = expected > 0 ? m.actual / expected : 0;
          const tone = rows.length === 0 ? undefined : ratio >= 1 ? 'good' : ratio >= 0.7 ? 'warn' : 'bad';
          return (
            <div key={m.label}>
              <div className="row-between small">
                <span>{m.label}</span>
                <span className="num">
                  <b>{rows.length ? fmtInt(m.actual) : '–'}</b> <span className="muted">/ {fmtInt(m.target)}</span>
                </span>
              </div>
              <Progress value={m.actual} max={m.target} tone={tone} label={`${m.label} against weekly target`} />
            </div>
          );
        })}
      </div>
      <p className="tiny muted" style={{ marginTop: 12, marginBottom: 0 }}>
        Plan of record for week {week}: {fmtInt(target.activeSubs)} active subscribers, {fmtUsd(target.mrr)} MRR.
      </p>
    </Card>
  );
}

function BudgetStatus({ date, week }: { date: string; week: number }) {
  const [log] = useSpendLog();
  const [alloc] = useAllocation();
  const allocation = alloc ?? defaultAllocation();
  const spent = log.filter((e) => e.date <= date).reduce((s, e) => s + e.usd, 0);
  const planned = plannedCumulative(allocation)[week - 1] ?? 0;
  const tone = spent > planned * 1.15 + 1 ? 'bad' : 'good';
  return (
    <Card>
      <div className="row-between">
        <h3 style={{ margin: 0 }}>Budget</h3>
        <a className="small" href={href('budget')}>
          Spend log
        </a>
      </div>
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))', marginTop: 10, gap: 8 }}>
        <Stat label="Spent" value={fmtUsd(spent)} tone={tone === 'bad' ? 'bad' : undefined} />
        <Stat label="Plan by wk end" value={fmtUsd(planned)} sub="[E] pace" />
        <Stat label="Left" value={fmtUsd(TOTAL - spent)} />
      </div>
      <div style={{ marginTop: 10 }}>
        <Progress value={spent} max={TOTAL} tone={tone} label="Spent of $1,000" />
      </div>
      <p className="tiny muted" style={{ marginTop: 10, marginBottom: 0 }}>
        {PLAN.budget.gate}
      </p>
    </Card>
  );
}

function Routine({ date, checks, toggle }: { date: string; checks: Record<string, boolean>; toggle: (k: string) => void }) {
  const done = PLAN.routine.filter((_, i) => checks[`${date}:r${i}`]).length;
  return (
    <Card>
      <div className="row-between">
        <h3 style={{ margin: 0 }}>Founder routine</h3>
        <span className="small muted num">
          {done}/{PLAN.routine.length}
        </span>
      </div>
      <ul className="checklist" style={{ marginTop: 6 }}>
        {PLAN.routine.map((r, i) => {
          const k = `${date}:r${i}`;
          return (
            <li key={k}>
              <label className="small">
                <input type="checkbox" checked={!!checks[k]} onChange={() => toggle(k)} />
                <span className={checks[k] ? 'done' : ''}>{r}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

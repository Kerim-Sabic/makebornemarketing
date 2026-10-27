import { useEffect } from 'react';
import planJson from '../../data/plan.json';
import * as weeksModule from 'virtual:war-room/plan-weeks';
import * as productionModule from 'virtual:war-room/production-simple';
import type { LaunchDayCard, Plan as PlanT, WeekCard } from '../lib/types';

// The virtual modules are typed loosely (ambient declarations); pin their shapes here.
const WEEKS = weeksModule.WEEKS as WeekCard[];
const LAUNCH_DAYS = weeksModule.LAUNCH_DAYS as LaunchDayCard[];
const IG_DECISIONS = weeksModule.IG_DECISIONS as Decision[];
const PRODUCTION_DECISIONS = productionModule.DECISIONS as Decision[];
interface Decision { id: string; question: string; recommendation: string }
import { fmtDate, fmtInt, fmtUsd, planWeek, sarajevoToday } from '../lib/util';
import { Details, Page, Term } from '../components/ui';
import { plain, Short } from '../lib/plain';
import { href, type RouteProps } from '../routes';

const PLAN = planJson as unknown as PlanT;
const short = (iso: string) => fmtDate(iso, { day: 'numeric', month: 'short' });
const range = (a: string, b: string) => `${fmtDate(a, { weekday: 'short', day: 'numeric', month: 'short' })} – ${fmtDate(b, { weekday: 'short', day: 'numeric', month: 'short' })}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const TYPE_LABEL: Record<string, string> = { launch: 'Launch', ads: 'Ads', outreach: 'Reach out', product: 'Product', analysis: 'Numbers', make: 'Make' };

/** Where the $1,000 goes, grouped in plain words from the plan's budget lines. */
const MONEY_GROUPS: { label: string; channels: string[] }[] = [
  { label: 'creators who film Makeborne', channels: ['creators'] },
  { label: 'two small ad tests', channels: ['paid-social'] },
  { label: 'listings (TAAFT, Uneed)', channels: ['directories'] },
  { label: 'the Instagram DM tool', channels: ['instagram'] },
  { label: 'a reserve for whatever works', channels: ['reserve'] },
];

export default function Plan({ params }: RouteProps) {
  const today = sarajevoToday();
  const thisWeek = Math.max(1, Math.min(13, planWeek(today)));
  const base = PLAN.scenarios.find((s) => /plan of record/i.test(s.name)) ?? PLAN.scenarios[1];
  const icp1 = PLAN.icps[0];
  const icp2 = PLAN.icps[1];
  const money = MONEY_GROUPS.map((g) => ({ ...g, usd: PLAN.budget.lines.filter((l) => g.channels.includes(l.channel)).reduce((s, l) => s + l.usd, 0) }));

  useEffect(() => {
    if (params[0] !== 'decisions') return;
    const raf = requestAnimationFrame(() => document.getElementById('decisions')?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(raf);
  }, [params]);

  return (
    <Page
      eyebrow={`Launch ${short('2026-10-29')} 21:00 CET – day 90 ${short('2027-01-26')} · 13 weeks · you are in week ${thisWeek}`}
      title={
        <>
          The plan, <em>week by week</em>
        </>
      }
      lede="On Sunday, open this week's card and answer its checkpoint question."
    >
      <section className="oneScreen card" aria-labelledby="one-h">
        <h2 id="one-h" className="kicker">
          The plan in one screen
        </h2>
        <dl className="five">
          <div>
            <dt>Who we sell to</dt>
            <dd>
              {icp1.name.replace(/, incl\..*$/, '')}, mostly on the Studio plan ($49/month). Also {icp2.name.charAt(0).toLowerCase() + icp2.name.slice(1)}.
            </dd>
          </div>
          <div>
            <dt>What we say</dt>
            <dd>
              “{PLAN.positioning.oneLiner}” {PLAN.positioning.proofLine}
            </dd>
          </div>
          <div>
            <dt>How we get customers</dt>
            <dd>Short videos of the real product every day, Instagram “comment SITE” messages that send the link, two small waves of paid creators, ads only on posts that already sold, and the client review link that brings in new people.</dd>
          </div>
          <div>
            <dt>Where the $1,000 goes</dt>
            <dd>
              {money.map((m, i) => (
                <span key={m.label}>
                  {i ? ', ' : ''}
                  <b className="num">{fmtUsd(m.usd)}</b> {plain(m.label)}
                </span>
              ))}
              . Nothing is paid before the tracking links work (except the $49 listing). <a href={href('ads')}>Ads in detail</a>.
            </dd>
          </div>
          <div>
            <dt>The target</dt>
            <dd>
              About <b className="num">{fmtUsd(base.mrrDay90)}</b> monthly revenue by 25 Jan 2027 (about {fmtUsd(base.arrDay90)} a year, {fmtInt(base.activeDay90)} paying customers). $1M a year is the breakout case, not the plan.
            </dd>
          </div>
        </dl>
      </section>

      <section className="section" aria-labelledby="launch-h">
        <div className="section-head">
          <div>
            <p className="kicker">Pre-launch −2, −1 · days 1-7</p>
            <h2 id="launch-h">Launch week, day by day (launch Thu 29 Oct, 21:00 CET)</h2>
          </div>
        </div>
        <div className="cards">
          {LAUNCH_DAYS.map((d) => (
            <details key={d.date} className="wcard" open={d.date === today}>
              <summary>
                <span className="wcard-n num">{d.day < 1 ? `−${-d.day}` : `D${d.day}`}</span>
                <span className="wcard-main">
                  <span className="wcard-title">
                    {d.weekday} {short(d.date)}
                    {d.date === today && <span className="chip chip-accent">today</span>}
                  </span>
                  <span className="wcard-sub">{plain(d.focus.split(/[.:]/)[0])}</span>
                </span>
                <span className="wcard-side num">{d.posts} posts</span>
              </summary>
              <div className="wcard-body">
                <ul className="bullets">
                  {d.actions.map((a) => (
                    <li key={a}>{plain(a)}</li>
                  ))}
                </ul>
                <a className="btn btn-sm" href={href('today', d.date)}>
                  Open {d.day < 1 ? `pre-launch day −${-d.day}` : `day ${d.day}`} as a checklist
                </a>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="weeks-h">
        <div className="section-head">
          <div>
            <p className="kicker">Tap a week to open it</p>
            <h2 id="weeks-h">The 13 weeks</h2>
          </div>
        </div>
        <div className="cards">
          {WEEKS.map((w) => (
            <details key={w.week} className={`wcard ${w.week === thisWeek ? 'is-now' : ''}`} open={w.week === thisWeek}>
              <summary>
                <span className="wcard-n num">W{w.week}</span>
                <span className="wcard-main">
                  <span className="wcard-title">
                    {plain(cap(w.title.replace(/^Phase [\d/]+:\s*/, '').replace(/^Launch week.*$/, 'Launch week')))}
                    {w.week === thisWeek && <span className="chip chip-accent">this week</span>}
                  </span>
                  <span className="wcard-sub">{range(w.from, w.to)}</span>
                </span>
                <span className="wcard-side">
                  <b className="num">{fmtUsd(w.money?.week ?? 0)}</b>
                  <span className="tiny muted">this week</span>
                </span>
              </summary>
              <div className="wcard-body">
                <h3>Goal</h3>
                <p>
                  <Short t={w.goal} />
                </p>
                <h3>Key actions</h3>
                <ol className="keyacts">
                  {w.actions.map((a) => (
                    <li key={a.date + a.what}>
                      <span className="tiny muted num">
                        {fmtDate(a.date, { weekday: 'short', day: 'numeric' })} · {TYPE_LABEL[a.type] ?? a.type}
                      </span>
                      <span>{plain(a.what)}</span>
                    </li>
                  ))}
                </ol>
                {w.make > 0 && <p className="small muted">Plus {w.make} things to film or design (they are on each day's Today list).</p>}
                <h3>Money this week</h3>
                {w.money && w.money.items.length ? (
                  <ul className="moneylist">
                    {w.money.items.map((m) => (
                      <li key={m.label}>
                        <b className="num">{fmtUsd(m.usd)}</b>
                        <span>
                          {plain(m.label)} <span className="tiny muted">({plain(m.line)}{m.date ? `, ${short(m.date)}` : ''})</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="small">$0 from the $1,000 this week.</p>
                )}
                <p className="small muted">
                  {fmtUsd(w.money?.running ?? 0)} of the $1,000 used by the end of this week. <Short t={w.money?.note} max={120} />
                </p>
                <h3>Checkpoint on Sunday {short(w.to)}</h3>
                {w.targets && (
                  <p>
                    Are you at about <b className="num">{fmtInt(w.targets.visits)}</b> visits, <b className="num">{fmtInt(w.targets.paid)}</b> new paying customers (<b className="num">{fmtInt(w.targets.activatedPayers)}</b> of them <Term t="activated payers">using it with a client</Term>) and <b className="num">{fmtUsd(w.targets.mrr)}</b> <Term t="MRR">monthly revenue</Term>? If not, read Results and follow its advice.
                  </p>
                )}
                {w.checkpoints.length > 0 && (
                  <ul className="bullets">
                    {w.checkpoints.map((c) => (
                      <li key={c.date + c.title}>
                        <b>{fmtDate(c.date, { weekday: 'short', day: 'numeric', month: 'short' })}</b>: {plain(c.title)}
                        {c.approx ? ' (approximate)' : ''}
                      </li>
                    ))}
                  </ul>
                )}
                {w.sunday && (
                  <Details summary="The full Sunday check">
                    <p className="small">{plain(w.sunday)}</p>
                  </Details>
                )}
                <p style={{ marginTop: 14 }}>
                  <a className="btn btn-sm" href={href('today', w.from)}>
                    Open Monday {short(w.from)} as a checklist
                  </a>
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="section" id="decisions" aria-labelledby="dec-h">
        <div className="section-head">
          <div>
            <p className="kicker">You decide · our recommendation in each row</p>
            <h2 id="dec-h">Decisions to make</h2>
          </div>
        </div>
        <ul className="declist">
          {PLAN.decisions.map((d) => (
            <li key={d.id}>
              <span className="item-id">{d.id}</span>
              <span>
                <b>{plain(d.question)}</b>
                <span className="dec-rec">Recommended: {plain(d.recommendation)}</span>
              </span>
            </li>
          ))}
        </ul>
        <Details summary={`Instagram and production decisions (${IG_DECISIONS.length + PRODUCTION_DECISIONS.length})`}>
          <ul className="declist">
            {[...IG_DECISIONS, ...PRODUCTION_DECISIONS].map((d) => (
              <li key={d.id}>
                <span className="item-id">{d.id}</span>
                <span>
                  <b>{d.question}</b>
                  <span className="dec-rec">Recommended: {d.recommendation}</span>
                </span>
              </li>
            ))}
          </ul>
        </Details>
      </section>
    </Page>
  );
}

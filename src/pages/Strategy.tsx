import { useEffect } from 'react';
import checkpointsJson from '../../data/checkpoints.json';
import { PLAN } from '../lib/budget';
import type { Checkpoint } from '../lib/types';
import { fmtDate, fmtInt, fmtPct, fmtUsd } from '../lib/util';
import { Card, Chip, Details, Labelled, Page, Section } from '../components/ui';
import { href, type RouteProps } from '../routes';

const CHECKPOINTS = (checkpointsJson as unknown as { checkpoints: Checkpoint[] }).checkpoints;

// Product state on 26 Oct 2026 (from the launch brief). Edit as features pass the gate.
const LIVE = [
  'AI-built websites, published on a Makeborne address',
  'AI books',
  'AI presentations (decks, PPTX export)',
  'Client review links with anonymous comments and Approve',
  'Basic CRM with a lead finder',
  'Manual GitHub export',
  'Projects library',
];
const COMING = [
  { f: 'Generated images in sites, decks and books (full-image slides, quality and aspect controls)', beat: 'beat-images' },
  { f: 'Credit top-ups', beat: 'beat-topups' },
  { f: 'Custom domains', beat: 'beat-domains' },
  { f: 'Automatic two-way GitHub sync', beat: 'beat-github' },
  { f: 'Agency tools', beat: 'beat-agency' },
  { f: 'AI lead research', beat: 'beat-leads' },
];

const SECTIONS = [
  ['summary', 'Summary'],
  ['north-star', 'North star'],
  ['messaging', 'Messaging house'],
  ['icps', 'ICPs'],
  ['beats', 'Feature beats'],
  ['phases', 'Phases'],
  ['channels', 'Channels'],
  ['scenarios', 'Scenarios'],
  ['million', '$1M conditions'],
  ['asks', 'Growth asks'],
  ['risks', 'Risks'],
  ['decisions', 'Owner decisions'],
] as const;

export default function Strategy({ params }: RouteProps) {
  useEffect(() => {
    if (!params[0]) return;
    const id = params[0];
    const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(raf);
  }, [params]);

  const dueFor = (id: string) => CHECKPOINTS.filter((c) => c.decisions.includes(id)).map((c) => c.date).sort()[0];

  return (
    <Page
      eyebrow="Plan of record · launch Thu 29 Oct 2026, 21:00 CET – day 90 Tue 26 Jan 2027"
      title={
        <>
          Sell Studio to the people who <em>make things</em> for clients
        </>
      }
      lede={PLAN.headline}
      actions={
        <a className="btn btn-ghost" href={href('research', 'strategy')}>
          Read the full plan
        </a>
      }
    >
      <nav className="pill-nav" aria-label="Jump to section" style={{ marginBottom: 36 }}>
        {SECTIONS.map(([id, label]) => (
          <a key={id} className="chip chip-muted" href={href('library', 'strategy', id)} style={{ textDecoration: 'none' }}>
            {label}
          </a>
        ))}
      </nav>

      <Section id="summary" title="Executive summary" kicker="01">
        <div className="split">
          <Card>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, margin: 0 }}>
              <Labelled text={PLAN.summary} />
            </p>
          </Card>
          <Card className="card-accent">
            <p className="kicker">The honest target</p>
            <p className="quote">Base case ~$174k ARR by 25 Jan (~$134k if creator traffic converts like average traffic). $1M is a breakout scenario, not the plan.</p>
            <p className="small muted" style={{ marginTop: 12, marginBottom: 0 }}>
              $1M ARR is about $83.3k MRR, or about 2,050 active subscribers at a Studio-heavy $41 blend. No company in the research reached it in 3 months from a cold start with no free tier.
            </p>
          </Card>
        </div>
      </Section>

      <Section id="north-star" title={<>North star: <em>{PLAN.northStar.name.toLowerCase()}</em></>} kicker="02">
        <div className="grid-2">
          <Card>
            <p style={{ fontSize: 16 }}>{PLAN.northStar.definition}</p>
            <p className="small muted" style={{ margin: 0 }}>
              <b>Base target:</b> {PLAN.northStar.baseTarget}
            </p>
          </Card>
          <Card>
            <h3>Guardrails, checked every Sunday</h3>
            <ul className="bullets">
              {PLAN.northStar.guardrails.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="messaging" title="Positioning and messaging house" kicker="03">
        <Card className="card-ink" >
          <p className="kicker" style={{ color: 'inherit', opacity: 0.65 }}>Category line</p>
          <p className="quote" style={{ fontSize: 'clamp(28px,3.6vw,44px)' }}>{PLAN.positioning.oneLiner}</p>
          <div className="grid-2" style={{ marginTop: 18 }}>
            <div>
              <p className="kicker" style={{ color: 'inherit', opacity: 0.65 }}>Short-form, on screen</p>
              <p style={{ fontSize: 17, margin: 0 }}>{PLAN.positioning.shortFormLine}</p>
            </div>
            <div>
              <p className="kicker" style={{ color: 'inherit', opacity: 0.65 }}>Proof line</p>
              <p style={{ fontSize: 17, margin: 0 }}>{PLAN.positioning.proofLine}</p>
            </div>
          </div>
        </Card>
        <div className="grid-3" style={{ marginTop: 16 }}>
          {PLAN.positioning.pillars.map((p, i) => {
            const [head, ...rest] = p.split(':');
            return (
              <Card key={p}>
                <p className="kicker">Pillar {i + 1}</p>
                <h3>{head}</h3>
                <p className="small muted" style={{ margin: 0 }}>
                  {rest.join(':').trim()}
                </p>
              </Card>
            );
          })}
        </div>
        <div className="grid-2" style={{ marginTop: 16 }}>
          <Card>
            <h3>Proof to show (all live today)</h3>
            <ul className="bullets small">
              {PLAN.positioning.proof.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3>Objection handling</h3>
            <div className="stack" style={{ gap: 8 }}>
              {PLAN.positioning.objections.map((o) => (
                <Details key={o.objection} summary={o.objection}>
                  <p className="small" style={{ margin: 0 }}>
                    {o.answer}
                  </p>
                </Details>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section id="icps" title="Who we sell to, in order" kicker="04">
        <div className="grid-3">
          {PLAN.icps.map((icp, i) => (
            <Card key={icp.id} className={i === 0 ? 'card-accent' : ''}>
              <div className="row-between">
                <span className="item-id">{icp.id.toUpperCase()}</span>
                {i === 0 && <Chip tone="accent">Primary · Studio $49</Chip>}
              </div>
              <h3 style={{ marginTop: 8 }}>{icp.name}</h3>
              <p className="small">
                <b>Job:</b> {icp.jtbd}
              </p>
              {icp.message && <p className="item-hook" style={{ fontSize: 16 }}>“{icp.message}”</p>}
              {icp.channels?.length > 0 && (
                <div className="row" style={{ marginTop: 8 }}>
                  {icp.channels.map((c) => (
                    <Chip key={c} tone="muted">
                      {c}
                    </Chip>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </Section>

      <Section id="beats" title="Live today, and the beats that follow" kicker="05" aside="A beat runs only after its feature passes the six-box gate">
        <div className="grid-2">
          <Card>
            <h3>
              <span className="chip chip-live">Live</span> May be promoted now
            </h3>
            <ul className="bullets">
              {LIVE.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3>
              <span className="chip chip-beat">Coming soon</span> Never promote as available
            </h3>
            <ul className="bullets">
              {COMING.map((c) => (
                <li key={c.f}>{c.f}</li>
              ))}
            </ul>
            <p className="tiny muted" style={{ margin: '8px 0 0' }}>
              Copy rule: unreleased features say "coming soon" with no date.
            </p>
          </Card>
        </div>
        <div className="grid-2" style={{ marginTop: 16 }}>
          <Card>
            <h3>The gate (all six boxes)</h3>
            <ol className="bullets">
              {PLAN.beatGate.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ol>
          </Card>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Beat</th>
                  <th>When</th>
                  <th>Angle</th>
                </tr>
              </thead>
              <tbody>
                {PLAN.beats.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <b>{b.feature}</b>
                      <div className="tiny muted">{b.id}</div>
                    </td>
                    <td className="small">{b.when}</td>
                    <td className="small">{b.angle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section id="phases" title="Four phases" kicker="06">
        <div className="grid-2">
          {PLAN.phases.map((p) => (
            <Card key={p.id}>
              <p className="kicker">Days {p.days}</p>
              <h3 style={{ fontSize: 18 }}>{p.name}</h3>
              <h4 style={{ marginTop: 12 }}>Goals</h4>
              <ul className="bullets small">
                {p.goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <h4 style={{ marginTop: 12 }}>Actions</h4>
              <ul className="bullets small">
                {p.actions.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="channels" title="Channels and cadence" kicker="07">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Channel</th>
                <th>Role</th>
                <th>Cadence</th>
                <th>Owner</th>
                <th>KPI</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.channels.map((c) => (
                <tr key={c.id}>
                  <td>
                    <b>{c.name}</b>
                    <div className="tiny muted">{c.id}</div>
                  </td>
                  <td className="small">{c.role}</td>
                  <td className="small">{c.cadence}</td>
                  <td className="small">{c.owner}</td>
                  <td className="small">{c.kpi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="scenarios" title="Scenarios at the day-90 review (25 Jan)" kicker="08" aside={<a href={href('funnel')}>Open the interactive model</a>}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Scenario</th>
                <th className="n">Visits (incl. loops)</th>
                <th className="n">Visit→paid</th>
                <th className="n">Gross paid</th>
                <th className="n">Active</th>
                <th className="n">MRR d30</th>
                <th className="n">MRR 25 Jan</th>
                <th className="n">ARR 25 Jan</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.scenarios.map((s) => (
                <tr key={s.name} className={/plan of record/i.test(s.name) ? 'is-current' : ''}>
                  <td>
                    <b>{s.name}</b>
                    <div className="tiny muted">{String(s.assumptions.note ?? '')}</div>
                  </td>
                  <td className="n">{fmtInt(Number(s.assumptions.qualifiedVisits90d))}</td>
                  <td className="n">{fmtPct(Number(s.assumptions.visitToPaid))}</td>
                  <td className="n">{fmtInt(s.grossPaid)}</td>
                  <td className="n">{fmtInt(s.activeDay90)}</td>
                  <td className="n">{fmtUsd(s.mrrDay30)}</td>
                  <td className="n">{fmtUsd(s.mrrDay90)}</td>
                  <td className="n">
                    <b>{fmtUsd(s.arrDay90)}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote">{PLAN.meta.modelNote}</p>
      </Section>

      <Section id="million" title={<>What must be true for <em>$1M ARR</em></>} kicker="09">
        <Card>
          <ol className="bullets" style={{ columns: '2 320px', columnGap: 32 }}>
            {PLAN.whatMustBeTrueFor1M.map((w) => (
              <li key={w} style={{ breakInside: 'avoid' }}>
                <Labelled text={w} />
              </li>
            ))}
          </ol>
        </Card>
      </Section>

      <Section id="asks" title="Product growth asks" kicker="10" aside="Ranked by impact and effort">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ask</th>
                <th>Impact</th>
                <th>Effort</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.growthAsks.map((g) => (
                <tr key={g.id}>
                  <td className="item-id">{g.id}</td>
                  <td className="small">{g.ask}</td>
                  <td>
                    <Chip tone={/very high/.test(g.impact) ? 'accent' : /high/.test(g.impact) ? 'warn' : 'muted'}>{g.impact}</Chip>
                  </td>
                  <td>
                    <Chip tone="muted">{g.effort}</Chip>
                  </td>
                  <td className="small">{g.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="risks" title="Risks and mitigations" kicker="11">
        <div className="grid-2">
          {PLAN.risks.map((r) => (
            <Card key={r.risk} className="card-flat">
              <h3>{r.risk}</h3>
              <p className="small muted" style={{ margin: 0 }}>
                {r.mitigation}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="decisions" title="Owner decisions" kicker="12" aside="Recommendations only. The owner decides.">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Recommendation</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.decisions.map((d) => {
                const due = dueFor(d.id);
                return (
                  <tr key={d.id}>
                    <td>
                      <Chip tone="owner">{d.id}</Chip>
                    </td>
                    <td>
                      <b className="small">{d.question}</b>
                    </td>
                    <td className="small">
                      <Labelled text={d.recommendation} />
                    </td>
                    <td className="small num" style={{ whiteSpace: 'nowrap' }}>
                      {due ? fmtDate(due, { day: 'numeric', month: 'short' }) : <span className="muted">open</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="grid-2" style={{ marginTop: 16 }}>
          <Card className="card-flat">
            <h3>Outside the $1,000 (needs D14)</h3>
            <ul className="bullets small">
              {PLAN.budget.outsideBudget.map((o) => (
                <li key={o.item}>
                  {o.item}: {typeof o.usdEstimate === 'number' ? `about ${fmtUsd(o.usdEstimate)}` : String(o.usdEstimate)} <abbr className="ev ev-E" title="Our estimate">E</abbr>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="card-flat">
            <h3>Still unverified</h3>
            <ul className="bullets small">
              {PLAN.meta.unverified.map((u) => (
                <li key={u}>
                  {u} <abbr className="ev ev-U" title="Unverified">U</abbr>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </Page>
  );
}

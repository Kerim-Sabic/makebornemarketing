import * as productionModule from 'virtual:war-room/production-simple';
import * as hfModule from 'virtual:war-room/production-hf';
import type { HfPlan, HfShot, HfShotCard, ProductionBudget, ProductionSheets, ProductionSimple } from '../lib/types';
import { docBySlug } from '../lib/docs';
import { planWeek, sarajevoToday } from '../lib/util';
import { Card, Details } from '../components/ui';
import { HfShotBody } from '../components/HfShot';
import { DocView } from './Research';
import { href } from '../routes';

const SIMPLE = productionModule.SIMPLE as ProductionSimple;
const COUNTS = productionModule.COUNTS as Record<string, number>;
const BUDGET = hfModule.BUDGET as ProductionBudget;
const HF = hfModule.HF as HfPlan;
const SHEETS = hfModule.SHEETS as ProductionSheets;
const contentHref = (id: string) => href('library', /^C/.test(id) ? 'images' : 'videos', id);
const n = (x: number) => x.toLocaleString('en-US', { maximumFractionDigits: 1 });

function IdLinks({ ids }: { ids: string[] }) {
  return (
    <span className="row" style={{ marginTop: 4 }}>
      {ids.map((id) =>
        /^HF/.test(id) ? (
          <span key={id} className="chip chip-accent">
            {id}
          </span>
        ) : (
          <a key={id} className="chip chip-muted" href={contentHref(id)} style={{ textDecoration: 'none' }}>
            {id}
          </a>
        ),
      )}
    </span>
  );
}

function BudgetSection() {
  const b = BUDGET;
  const m = b.credits.month1;
  return (
    <section style={{ marginTop: 36 }} aria-labelledby="prod-budget">
      <h2 id="prod-budget">Production budget</h2>
      <p className="lede">
        <b>Separate from the $1,000.</b> {b.rule}
      </p>
      <div className="grid-3" style={{ marginTop: 16 }}>
        <Card>
          <p className="kicker">
            Month 1 · {b.month1.from} to {b.month1.to}
          </p>
          <h3 style={{ fontSize: 17 }}>
            {b.tier.recommended}: ${b.month1.totalUSD}
          </h3>
          <p className="small">
            {n(b.tier.creditsPerMonth)} credits a month. Cap ${b.month1.capUSD}. {b.owner}
          </p>
        </Card>
        <Card>
          <p className="kicker">Credits in month 1</p>
          <h3 style={{ fontSize: 17 }}>
            {n(m.planned)} planned · {n(m.conditional)} if live · {n(m.reserve)} reserve
          </h3>
          <p className="small">{b.credits.perShotRule}</p>
        </Card>
        <Card>
          <p className="kicker">Month 2 and after</p>
          <h3 style={{ fontSize: 17 }}>Keep, Starter or cancel: {b.month2Rule.decideOn.split(';')[0]}</h3>
          <p className="small">
            {b.month2Rule.keepPlus} {b.month2Rule.downgrade} {b.month2Rule.cancel}
          </p>
        </Card>
      </div>
      <Details summary={<>Why Plus, the price source and the conflicting figures</>}>
        <p className="small">
          <b>Why:</b> {b.tier.why}
        </p>
        <p className="small">
          <b>Price:</b> {b.tier.priceSource}
        </p>
        <p className="small">
          <b>Conflicts:</b> {b.tier.conflicts}
        </p>
        <p className="small">
          <b>Not this:</b> {b.tier.notThis}
        </p>
        <p className="small">
          <b>90 days:</b> ${b.ninetyDays.plannedUSD}; cap ${b.ninetyDays.capUSD}. {b.ninetyDays.note}
        </p>
        <p className="small">
          <b>Logging:</b> {b.logging}
        </p>
        <p className="small">
          <b>Month 2 evidence:</b> {b.month2Rule.evidence} <b>Month 3:</b> {b.month2Rule.month3}
        </p>
      </Details>
      <Details summary={<>Credits by week</>}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Week</th>
                <th scope="col">Make on</th>
                <th scope="col">Shots</th>
                <th scope="col" className="n">
                  Planned
                </th>
                <th scope="col" className="n">
                  If live
                </th>
              </tr>
            </thead>
            <tbody>
              {b.credits.byWeek
                .filter((w) => w.shots.length)
                .map((w) => (
                  <tr key={w.week}>
                    <td>
                      {w.week} (month {w.month})
                    </td>
                    <td>{w.generateOn}</td>
                    <td>{w.shots.join(', ')}</td>
                    <td className="n">{n(w.plannedCredits)}</td>
                    <td className="n">{n(w.conditionalCredits)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <ul className="bullets small">
          {b.credits.creditCosts.map((c) => (
            <li key={c.model}>
              {c.model}: {c.credits} credits a take ({c.source})
            </li>
          ))}
        </ul>
      </Details>
    </section>
  );
}

function HiggsfieldSection() {
  const weeks = [...new Set(HF.shots.map((s) => s.week))];
  const mm = HF.mix.measured;
  return (
    <section style={{ marginTop: 36 }} aria-labelledby="prod-hf">
      <h2 id="prod-hf">Higgsfield shots</h2>
      <p className="lede">{HF.role}</p>
      <p className="small">
        {HF.totals.shots} shots ({HF.totals.conditionalShots} only once their feature is live) for {HF.totals.videosNow} videos now and {HF.totals.videosGated} later, plus frame grabs for {HF.totals.creatives} images. {n(HF.totals.plannedCredits90Days)} credits planned over the 90 days. {HF.presets}
      </p>
      <ul className="rules">
        {HF.hardRules.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <div className="cards">
        {weeks.map((w) => (
          <div key={w}>
            <h3 style={{ fontSize: 16, marginTop: 20 }}>
              Week {w} · {HF.shots.find((s) => s.week === w)?.generateOn}
            </h3>
            {HF.shots
              .filter((s) => s.week === w)
              .map((s: HfShot) => (
                <Details
                  key={s.id}
                  summary={
                    <>
                      <b>{s.id}</b> {s.title} · {s.for.join(', ')} · {n(s.credits)} credits{s.conditional ? ' · only if live' : ''}
                    </>
                  }
                >
                  <p className="small muted">{s.job}</p>
                  <HfShotBody s={s as HfShotCard} extra={{ generateOn: s.generateOn, seed: s.seed, label: s.label, fallback: s.fallback }} />
                </Details>
              ))}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: 28 }}>The mix</h3>
      <p className="small">
        <b>Target:</b> {HF.mix.target}
      </p>
      <p className="small">
        <b>Measured:</b> {mm.realPct}% real, {mm.higgsfieldPct}% Higgsfield, {mm.hyperframesOnlyPct}% HyperFrames-only cards across the {mm.higgsfieldVideos} Higgsfield videos ({mm.seconds} s). {mm.wholePlanNote}
      </p>
      <ul className="bullets small">
        {HF.mix.why.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <h3 style={{ marginTop: 28 }}>A/B: real vs Higgsfield</h3>
      <p className="small">
        {HF.abTests.metric} {HF.abTests.weeklyShift} {HF.abTests.caveat}
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Pair</th>
              <th scope="col">Item</th>
              <th scope="col">Surface</th>
              <th scope="col">Real</th>
              <th scope="col">Higgsfield</th>
            </tr>
          </thead>
          <tbody>
            {HF.abTests.pairs.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>
                  <a href={contentHref(a.video)}>{a.video}</a>
                </td>
                <td>{a.surface}</td>
                <td>
                  {a.real.date} /go/{a.real.go}
                  {a.real.also ? `, ${a.real.also.date} /go/${a.real.also.go}` : ''}
                </td>
                <td>
                  {a.higgsfield.date} /go/{a.higgsfield.go}
                  {a.higgsfield.also ? `, ${a.higgsfield.also.date} /go/${a.higgsfield.also.go}` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SheetsSection() {
  return (
    <section style={{ marginTop: 36 }} aria-labelledby="prod-sheets">
      <h2 id="prod-sheets">Per-video sheets</h2>
      <p className="small muted">
        How each piece is made: real only, Higgsfield hook + real, Higgsfield scene + HyperFrames type, or HyperFrames only. Every word on screen is HyperFrames. Open a row for the slots, the clip sections and the template variables; the shot cards above hold the prompts.
      </p>
      <div className="cards">
        {SHEETS.videos.map((v) => (
          <Details
            key={v.id}
            summary={
              <>
                <b>{v.id}</b> {v.title} · <span className={v.higgsfield ? 'chip chip-accent' : 'chip chip-muted'}>{v.makeWith}</span>
                {v.higgsfield ? ` · ${v.higgsfield.shots.join(' ')} · ${n(v.higgsfield.credits)} credits` : ''}
              </>
            }
          >
            <dl className="kv">
              <dt>Template</dt>
              <dd>{v.template}</dd>
              <dt>Mix</dt>
              <dd>
                {n(v.mix.realSec)} s real · {n(v.mix.higgsfieldSec)} s Higgsfield · {n(v.mix.hyperframesOnlySec)} s HyperFrames-only (of {v.mix.lengthSec} s)
              </dd>
              <dt>Ready</dt>
              <dd>{v.higgsfield ? v.higgsfield.readiness : v.readiness}</dd>
              {v.higgsfield && (
                <>
                  <dt>Posted as</dt>
                  <dd>{v.higgsfield.postedAs}</dd>
                  <dt>Posts</dt>
                  <dd>{v.higgsfield.posts.join('; ') || 'when the feature is live'}</dd>
                </>
              )}
            </dl>
            {v.slots.length > 0 && (
              <div className="table-wrap" style={{ marginTop: 10 }}>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">At</th>
                      <th scope="col">Slot</th>
                      <th scope="col">Clip</th>
                      <th scope="col">HyperFrames variables</th>
                    </tr>
                  </thead>
                  <tbody>
                    {v.slots.map((s, i) => {
                      const sec = v.higgsfield?.sections[i];
                      return (
                        <tr key={`${s.slot}-${s.at}`}>
                          <td>{s.at}</td>
                          <td>
                            {s.slot}
                            <br />
                            <span className="small muted">{s.composition}</span>
                          </td>
                          <td>{sec ? `${sec.shot} ${sec.clip}` : ''}</td>
                          <td className="small">
                            {Object.entries(s.variables)
                              .map(([k, val]) => `${k} = ${val}`)
                              .join(' · ')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <p className="small" style={{ marginTop: 8 }}>
              <a href={contentHref(v.id)}>Script, caption and on-screen words</a>
            </p>
          </Details>
        ))}
      </div>
      <h2 style={{ marginTop: 36 }}>Per-image sheets</h2>
      <div className="cards">
        {SHEETS.creatives.map((c) => (
          <Details
            key={c.id}
            summary={
              <>
                <b>{c.id}</b> {c.title} · <span className={c.higgsfield ? 'chip chip-accent' : 'chip chip-muted'}>{c.makeWith}</span>
              </>
            }
          >
            <dl className="kv">
              <dt>Template</dt>
              <dd>{c.template}</dd>
              <dt>Variables</dt>
              <dd>
                {Object.entries(c.variables)
                  .filter(([, val]) => val !== '')
                  .map(([k, val]) => `${k} = ${val}`)
                  .join(' · ')}
              </dd>
              <dt>Ready</dt>
              <dd>{c.readiness}</dd>
              {c.higgsfield && (
                <>
                  <dt>Higgsfield</dt>
                  <dd>
                    Frame grab of {c.higgsfield.frameFrom} in {c.higgsfield.layout}. {c.higgsfield.posts.join('; ')}. {c.higgsfield.readiness}.
                  </dd>
                </>
              )}
            </dl>
            <p className="small" style={{ marginTop: 8 }}>
              <a href={contentHref(c.id)}>Words, sizes and the compose text</a>
            </p>
          </Details>
        ))}
      </div>
    </section>
  );
}

/** Library > Production: "how we make videos" first, the weekly make-list, the production budget, every Higgsfield shot with
 *  copyable prompts, the per-item sheets, then the full production plan (content/production.md). */
export default function Production() {
  const doc = docBySlug('production');
  const week = Math.max(1, Math.min(13, planWeek(sarajevoToday())));
  const h = SIMPLE.howWeMakeVideos;
  const intro = (
    <div className="prod-simple">
      <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
        How we make <em>videos</em>
      </h2>
      <p className="lede">{h.intro}</p>
      <div className="grid-2" style={{ marginTop: 20 }}>
        {h.ways.map((w) => (
          <Card key={w.name}>
            <p className="kicker">{w.share}</p>
            <h3 style={{ fontSize: 17 }}>{w.name}</h3>
            <p className="small muted">{w.covers}</p>
            <ol className="steps">
              {w.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="small">
              <b>Time:</b> {w.time}
            </p>
          </Card>
        ))}
      </div>
      <p className="small" style={{ marginTop: 14 }}>
        {h.everythingElse}
      </p>
      {h.budget && (
        <p className="small">
          <b>Money:</b> {h.budget}
        </p>
      )}
      {h.mix && (
        <p className="small">
          <b>The mix:</b> {h.mix}
        </p>
      )}
      <ul className="rules">
        {h.rules.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <h2 style={{ marginTop: 36 }}>What to make, week by week</h2>
      <p className="small muted">
        {COUNTS.videos} videos, {COUNTS.creatives} images and {COUNTS.higgsfieldShots} Higgsfield shots in the plan. Each day's list is also on Today, with the prompts.
      </p>
      <div className="cards">
        {SIMPLE.weeks.map((w) => (
          <Details
            key={w.week}
            open={w.week === week}
            summary={
              <>
                Week {w.week} · {w.dates.replace(/2026-|2027-/g, '')}
                {w.week === week ? ' · this week' : ''}
              </>
            }
          >
            {w.note && <p className="small muted">{w.note}</p>}
            <ul className="bullets">
              {w.items.map((i) => (
                <li key={i.text}>
                  {i.text}
                  {(i.ids.length > 0 || (i.hf?.length ?? 0) > 0) && <IdLinks ids={[...i.ids, ...(i.hf ?? [])]} />}
                </li>
              ))}
            </ul>
          </Details>
        ))}
      </div>

      <BudgetSection />
      <HiggsfieldSection />
      <SheetsSection />

      <h2 style={{ marginTop: 36 }}>Every sheet, in full</h2>
      <p className="small muted">The full production plan (content/production.md): the tools, templates, the Higgsfield plan and every prompt, per-video and per-image sheets, naming and the quality bar.</p>
    </div>
  );
  if (!doc) return <div className="page">{intro}</div>;
  return <DocView doc={doc} back={{ href: href('library'), label: 'Library' }} before={intro} />;
}

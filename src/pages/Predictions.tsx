import { useId, useMemo, useState } from 'react';
import checkpointsJson from '../../data/checkpoints.json';
import type { Checkpoint } from '../lib/types';
import { useActuals, useMrrSnapshots } from '../lib/stores';
import { addDays, diffDays, fmtCompact, fmtCompactUsd, fmtDate, fmtInt, fmtPct, fmtUsd, sarajevoToday, WINDOW_START } from '../lib/util';
import {
  DAMPING, DAY90, ELASTICITY, MAX_DAILY_GROWTH, MIN_DAYS, PLAN_LOG_SD, PRIOR_DAYS, RUNS, TRAIL_DAYS,
  analyse, centralParams, channelOutlook, feedNext, planMrr, runForecast, simulate,
  type Analysis, type Band, type Est, type Forecast, type SimParams,
} from '../lib/forecast';
import { planBase, priceForStudioShare } from '../lib/planRates';
import { SAMPLE_AS_OF, sampleData } from '../lib/sample';
import { Card, Chip, Details, Page, Section, Stat } from '../components/ui';
import { Chart } from '../components/Chart';
import { href, type RouteProps } from '../routes';

const CHECKPOINTS = (checkpointsJson as unknown as { checkpoints: Checkpoint[] }).checkpoints;
const ONE_M_MRR = 1_000_000 / 12;

const range = (b: Band, f: (n: number) => string) => `${f(b.p10)}–${f(b.p90)}`;
const fmtProb = (p: number) => (p >= 0.995 ? '≥ 99%' : p <= 0.005 ? '< 1%' : `${Math.round(p * 100)}%`);
const fmtX = (x: number | null) => (x == null ? '–' : x >= 10 ? `${Math.round(x)}×` : `${x.toFixed(1)}×`);
const short = (iso: string) => fmtDate(iso, { day: 'numeric', month: 'short' });

export default function Predictions({ params }: RouteProps) {
  const sample = params[0] === 'sample';
  const [realEntries] = useActuals();
  const [realSnaps] = useMrrSnapshots();
  const S = sample ? sampleData() : null;
  const entries = S ? S.entries : realEntries;
  const snaps = S ? S.snaps : realSnaps;
  const asOf = S ? SAMPLE_AS_OF : sarajevoToday();

  const analysis = useMemo(() => analyse(entries, { asOf, snaps }), [entries, asOf, snaps]);
  const fc = useMemo<Forecast | null>(() => (analysis.status === 'ok' ? runForecast(analysis) : null), [analysis]);
  const outlook = useMemo(() => channelOutlook(entries, analysis), [entries, analysis]);
  const next = feedNext(outlook);
  const n = analysis.obs.dataDays;

  return (
    <Page
      eyebrow={sample ? 'SAMPLE data · invented numbers · nothing is saved' : fc ? `Forecast from ${n} logged days · ${RUNS.toLocaleString('en-US')} seeded runs · computed in this browser` : `${n} logged day${n === 1 ? '' : 's'} · the forecast starts at ${MIN_DAYS}`}
      title={
        <>
          Where this <em>pace</em> leads
        </>
      }
      lede="A forecast from your logged actuals, with the plan's base case as a prior that fades as days come in. Ranges, not promises: read the method at the bottom before quoting a number."
      actions={
        sample ? (
          <a className="btn btn-accent btn-sm" href={href('predictions')}>
            Leave sample
          </a>
        ) : (
          <a className="btn btn-ghost btn-sm" href={href('predictions', 'sample')}>
            Show SAMPLE data
          </a>
        )
      }
    >
      {sample && (
        <div className="notice sample-banner" role="note" style={{ marginBottom: 20 }}>
          <b>SAMPLE</b>
          <span>
            Forecast from 28 invented days (to {fmtDate(SAMPLE_AS_OF)}), dated as if today were {fmtDate(SAMPLE_AS_OF)}. Your own numbers are not used or changed. <a href={href('analytics', 'sample')}>See the sample in Analytics</a> · <a href={href('predictions')}>back to your data</a>.
          </span>
        </div>
      )}

      {fc ? <Summary fc={fc} next={next} /> : <NotEnough a={analysis} sample={sample} />}

      {fc && analysis.staleDays > 3 && (
        <div className="notice" style={{ marginTop: 16 }}>
          <b>Stale data.</b>
          <span>
            The last logged day is {fmtDate(analysis.obs.last!)}, {analysis.staleDays} days ago. The forecast projects the missing days; log them on the <a href={href('analytics', 'entry')}>Analytics page</a> for a better read.
          </span>
        </div>
      )}

      {fc && <ForecastSection fc={fc} />}
      {fc && <Probabilities fc={fc} />}
      {fc && <Pace fc={fc} />}
      <Sandbox a={analysis} fc={fc} />
      {n > 0 && <Outlook rows={outlook} next={next} />}
      <Estimates a={analysis} />
      <Method />
    </Page>
  );
}

/* ---------- top: plain English ---------- */

function Summary({ fc, next }: { fc: Forecast; next: ReturnType<typeof feedNext> }) {
  const a = fc.analysis;
  const d90 = fc.horizons.find((h) => h.date === DAY90) ?? fc.horizons[fc.horizons.length - 1];
  const pace1m = fc.pace.find((p) => p.id === 'arr1m');
  const p1m = fc.probabilities.find((p) => p.id === 'arr1m');
  const upcoming = fc.probabilities.find((p) => !p.decided && p.id !== 'arr1m');
  const sentences: string[] = [];
  sentences.push(
    `At the current pace you reach about ${fmtCompactUsd(d90.mrr.p50)} MRR by ${fmtDate(d90.date, { day: 'numeric', month: 'short' })} (range ${range(d90.mrr, fmtCompactUsd)}), a run-rate of about ${fmtCompactUsd(d90.arr.p50)} ARR with ${fmtInt(d90.payers.p50)} paying subscribers.`,
  );
  if (pace1m) {
    if (pace1m.onPace) sentences.push(`That is on pace for $1M ARR by ${short(DAY90)}${p1m ? ` (chance about ${fmtProb(p1m.probability)})` : ''}.`);
    else if (pace1m.multipleOfToday != null && pace1m.grossPerDayNeeded != null)
      sentences.push(
        `Reaching $1M ARR by ${short(DAY90)} needs about ${fmtX(pace1m.multipleOfToday)} today's paid conversions per day: about ${fmtInt(pace1m.grossPerDayNeeded)} new payers a day against ${pace1m.grossPerDayNow!.toFixed(1)} now${p1m ? `; the model puts the chance at ${fmtProb(p1m.probability)}` : ''}.`,
      );
    else sentences.push(`$1M ARR by ${short(DAY90)} is out of reach on any single lever in this model${p1m ? ` (chance ${fmtProb(p1m.probability)})` : ''}.`);
  }
  const third: string[] = [];
  if (upcoming) third.push(`The next checkpoint, ${upcoming.label.charAt(0).toLowerCase() + upcoming.label.slice(1)} by ${short(upcoming.date)}, has about a ${fmtProb(upcoming.probability)} chance.`);
  if (next) third.push(next.reason.startsWith('lowest') ? `Feed ${next.channel.channel} next (marginal CAC about ${fmtUsd(next.channel.marginalCac)}).` : `${next.channel.channel} is on target but too small to scale yet.`);
  else third.push('No paid channel qualifies to scale yet (needs 3+ net payers at ≤ $50).');
  sentences.push(third.join(' '));
  return (
    <Card className="card-ink summary">
      <p className="kicker" style={{ color: 'inherit', opacity: 0.75 }}>
        In plain English · {a.obs.dataDays} days of data, data weight {fmtPct(a.weight, 0)}, plan {fmtPct(1 - a.weight, 0)}
      </p>
      <ol className="summary-list">
        {sentences.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </Card>
  );
}

function NotEnough({ a, sample }: { a: Analysis; sample: boolean }) {
  const n = a.obs.dataDays;
  const base = planBase().summary;
  return (
    <div className="notice" role="status">
      <b>{n === 0 ? 'No data yet.' : `Not enough data: ${n} of ${MIN_DAYS} days logged.`}</b>
      <span>
        {n === 0
          ? 'The forecast starts once 7 days of actuals are logged on the Analytics page. '
          : `The forecast starts at ${MIN_DAYS} logged days; under that, a trend and its spread are noise. `}
        Until then the plan's base case is the only number: about {fmtCompactUsd(base.mrrEnd)} MRR ({fmtCompactUsd(base.arrEnd)} ARR) on {short(DAY90)}, from the <a href={href('funnel')}>calculator</a>.{' '}
        {!sample && (
          <>
            <a href={href('analytics', 'entry')}>Log a day</a> or <a href={href('predictions', 'sample')}>try the SAMPLE data</a>.
          </>
        )}
      </span>
    </div>
  );
}

/* ---------- forecast ---------- */

function ForecastSection({ fc }: { fc: Forecast }) {
  const a = fc.analysis;
  const hist = fc.central.history;
  const dates = [...hist.map((h) => h.date), ...fc.band.dates];
  const pad = (xs: (number | null)[], before: number) => [...new Array(before).fill(null), ...xs];
  const histVals = [...hist.map((h) => h.mrr), ...new Array(fc.band.dates.length).fill(null)];
  const nh = hist.length;
  // Join the band to the last history point so the lines start where the data ends.
  const last = hist[nh - 1]?.mrr ?? null;
  const join = (xs: number[]) => pad([last, ...xs], nh - 1);
  const planVals = dates.map((d) => planMrr(diffDays(d, WINDOW_START)));
  const maxShown = Math.max(...fc.band.p90, ...planVals.map((v) => v ?? 0));
  const d90 = fc.horizons.find((h) => h.date === DAY90);
  return (
    <Section id="forecast" title="Forecast" kicker={`From ${fmtDate(a.asOf)} · base = median, range = 10th to 90th percentile`}>
      {d90 && (
        <div className="statband" style={{ marginBottom: 16 }}>
          <Stat label={`MRR on ${short(DAY90)}`} value={fmtCompactUsd(d90.mrr.p50)} sub={`range ${range(d90.mrr, fmtCompactUsd)}`} tone="accent" />
          <Stat label="ARR run-rate" value={fmtCompactUsd(d90.arr.p50)} sub={`range ${range(d90.arr, fmtCompactUsd)}`} />
          <Stat label="Paying subscribers" value={fmtInt(d90.payers.p50)} sub={`range ${range(d90.payers, fmtInt)}`} />
          <Stat label="Plan base, same day" value={fmtCompactUsd(planBase().summary.mrrEnd)} sub={`${d90.mrr.p50 >= planBase().summary.mrrEnd ? 'ahead of' : 'behind'} plan by ${fmtPct(Math.abs(d90.mrr.p50 / planBase().summary.mrrEnd - 1), 0)}`} />
        </div>
      )}
      <Card>
        <Chart
          ariaLabel="MRR so far, and the forecast median with its 10th and 90th percentiles, against the plan base"
          labels={dates.map(short)}
          height={300}
          yFormat={fmtCompactUsd}
          refLines={maxShown > ONE_M_MRR * 0.4 ? [{ y: ONE_M_MRR, label: '$83.3k MRR = $1M ARR', color: 'var(--accent)' }] : []}
          series={[
            { id: 'hist', name: 'MRR so far (rebuilt from logged payers)', values: histVals, color: 'var(--ink)', width: 2.5 },
            { id: 'p90', name: 'High (90th percentile)', values: join(fc.band.p90), color: 'var(--c4)', dashed: true, width: 1.5 },
            { id: 'p50', name: 'Base forecast (median)', values: join(fc.band.p50), color: 'var(--c2)', kind: 'area', width: 2.5 },
            { id: 'p10', name: 'Low (10th percentile)', values: join(fc.band.p10), color: 'var(--c5)', dashed: true, width: 1.5 },
            { id: 'plan', name: 'Plan base (funnel.json)', values: planVals, color: 'var(--c3)', dashed: true, width: 1.2 },
          ]}
        />
        {a.anchor && <p className="footnote">History is anchored to your Whop MRR snapshot of {fmtUsd(a.anchor.mrr)} on {fmtDate(a.anchor.date)}.</p>}
      </Card>
      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table>
          <caption className="sr">Forecast by horizon: base (median) with the 10th to 90th percentile range</caption>
          <thead>
            <tr>
              <th scope="col">Horizon</th>
              <th scope="col" className="n">MRR</th>
              <th scope="col" className="n">ARR</th>
              <th scope="col" className="n">Payers</th>
              <th scope="col" className="n">Sign-ups (from today)</th>
              <th scope="col" className="n">Visits (from today)</th>
              <th scope="col" className="n">Gross payers since launch</th>
              <th scope="col" className="n">Plan base MRR</th>
            </tr>
          </thead>
          <tbody>
            {fc.horizons.map((h) => {
              const pm = planMrr(diffDays(h.date, WINDOW_START));
              return (
                <tr key={h.id} className={h.date === DAY90 ? 'is-current' : undefined}>
                  <th scope="row">
                    {h.label}
                    <div className="tiny muted">{fmtDate(h.date)}</div>
                  </th>
                  <BandCell b={h.mrr} f={fmtCompactUsd} />
                  <BandCell b={h.arr} f={fmtCompactUsd} />
                  <BandCell b={h.payers} f={fmtInt} />
                  <BandCell b={h.signups} f={(x) => fmtCompact(x)} />
                  <BandCell b={h.visits} f={(x) => fmtCompact(x)} />
                  <BandCell b={h.cumGross} f={fmtInt} />
                  <td className="n">{pm == null ? <span className="tiny muted">after the window</span> : fmtCompactUsd(pm)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="footnote">
        Payers = active paying subscribers on that day. Visits include the visits implied by loop payers, as in the calculator. The 90-day horizon runs past the plan window, where the plan's last week is held flat as the prior. {fc.runs.toLocaleString('en-US')} runs in {Math.round(fc.ms)} ms.
      </p>
    </Section>
  );
}

function BandCell({ b, f }: { b: Band; f: (n: number) => string }) {
  return (
    <td className="n">
      <b>{f(b.p50)}</b>
      <div className="tiny muted">{range(b, f)}</div>
    </td>
  );
}

function Probabilities({ fc }: { fc: Forecast }) {
  const title = (date: string) => CHECKPOINTS.find((c) => c.date === date)?.title;
  return (
    <Section id="chances" title="Chance of each checkpoint" kicker="data/checkpoints.json · share of the Monte Carlo runs that reach it">
      <ul className="probs">
        {fc.probabilities.map((p) => {
          const tone = p.decided ? (p.probability ? 'good' : 'bad') : p.probability >= 0.7 ? 'good' : p.probability >= 0.3 ? 'warn' : 'bad';
          return (
            <li key={p.id} className="card">
              <div className="row-between">
                <div>
                  <div className="small">
                    <b>{p.label}</b>
                  </div>
                  <div className="tiny muted">
                    {fmtDate(p.date)}
                    {title(p.date) ? ` · ${title(p.date)}` : ''}
                  </div>
                </div>
                <div className={`prob-value num tone-${tone}`}>{p.decided ? (p.probability ? 'Reached' : 'Missed') : fmtProb(p.probability)}</div>
              </div>
              {p.decided ? (
                <p className="tiny muted" style={{ margin: '6px 0 0' }}>
                  Settled by logged data: {p.metric === 'visitToPaid' ? fmtPct(p.actual, 2) : p.metric === 'cumGross' ? `${fmtInt(p.actual)} gross payers` : fmtUsd(p.actual)}.
                </p>
              ) : (
                <div className={`progress tone-${tone}`} role="meter" aria-label={`Chance: ${p.label}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(p.probability * 100)} style={{ marginTop: 8 }}>
                  <span style={{ width: `${Math.max(1, p.probability * 100)}%` }} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="footnote">A chance is the share of {fc.runs.toLocaleString('en-US')} runs that reach the target, given the uncertainty in today's conversion and growth. It does not include shocks the data has not seen (a 1M-view post, an outage), so treat values near 0% or 100% as "very unlikely" or "very likely", not certain.</p>
    </Section>
  );
}

function Pace({ fc }: { fc: Forecast }) {
  if (!fc.pace.length) return null;
  const a = fc.analysis;
  return (
    <Section id="pace" title="Required pace" kicker={`From ${fmtDate(a.startDate)} to the day-90 review (${short(DAY90)}), one lever at a time`}>
      <div className="table-wrap">
        <table>
          <caption className="sr">What each target needs against the current pace</caption>
          <thead>
            <tr>
              <th scope="col">Target</th>
              <th scope="col" className="n">Forecast ARR</th>
              <th scope="col" className="n">Paid / day needed</th>
              <th scope="col" className="n">Visits / day needed</th>
              <th scope="col" className="n">Visit→paid needed</th>
              <th scope="col" className="n">Referral share needed</th>
            </tr>
          </thead>
          <tbody>
            {fc.pace.map((p) => {
              const v = p.levers.find((l) => l.lever === 'visits')!;
              const c = p.levers.find((l) => l.lever === 'conversion')!;
              const r = p.levers.find((l) => l.lever === 'referral')!;
              const gap = (need: number | null, now: number | null, f: (n: number) => string) =>
                need == null ? <span className="muted">not reachable</span> : (
                  <>
                    <b>{f(need)}</b>
                    <div className="tiny muted">
                      now {now == null ? '–' : f(now)}
                      {p.onPace ? ' · the forecast path covers it' : now != null && now > 0 && need > now ? ` · gap ${fmtX(need / now)}` : now != null && need <= now ? ' · met' : ''}
                    </div>
                  </>
                );
              return (
                <tr key={p.id}>
                  <th scope="row" style={{ whiteSpace: 'nowrap' }}>
                    {p.label}
                    {p.id === 'base' && <div className="tiny muted">{fmtCompactUsd(p.targetArr)} ARR</div>}
                    {p.onPace && (
                      <div>
                        <Chip tone="good">On pace</Chip>
                      </div>
                    )}
                  </th>
                  <td className="n">{fmtCompactUsd(p.projectedArr)}</td>
                  <td className="n">{gap(p.grossPerDayNeeded, p.grossPerDayNow, (x) => x.toFixed(1))}</td>
                  <td className="n">{gap(v.required, v.current, fmtInt)}</td>
                  <td className="n">{gap(c.required, c.current, (x) => fmtPct(x, 2))}</td>
                  <td className="n">{r.required == null ? <span className="muted">not reachable by loops alone</span> : gap(r.required, r.current, (x) => fmtPct(x, 0))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="footnote">
        Each column moves one lever and holds the others at today's estimate, on the central path (not the median of the runs, so it can differ slightly from the forecast above). "Paid / day" is the average gross new payers a day needed over the remaining days, against the last 7 logged days. Referral share = loop payers as a share of all new payers. "Now" for visits and paid / day is the last 7 logged days; for visit-to-paid it is the logged rate.
      </p>
    </Section>
  );
}

/* ---------- sandbox ---------- */

interface Overrides { growth: number | null; p: number | null; churn: number | null; studio: number | null; loop: number | null }
const NO_OVERRIDES: Overrides = { growth: null, p: null, churn: null, studio: null, loop: null };

function Sandbox({ a, fc }: { a: Analysis; fc: Forecast | null }) {
  const [o, setO] = useState<Overrides>(NO_OVERRIDES);
  const cp = useMemo(() => centralParams(a), [a]);
  const H = Math.max(diffDays(DAY90, a.startDate), diffDays(addDays(a.asOf, 90), a.startDate), 1);
  const base = useMemo(() => simulate(a, cp, H), [a, cp, H]);
  const v1 = cp.visits(1);
  const growthDefault = Math.pow(Math.max(1e-6, cp.visits(Math.min(30, H)) + 1) / (v1 + 1), 7 / Math.max(1, Math.min(30, H) - 1)) - 1;
  const loopDefault = (() => {
    const g = base.days.reduce((s, d) => s + d.gross, 0);
    return g > 0 ? base.days.reduce((s, d) => s + d.loopGross, 0) / g : 0;
  })();
  const val = {
    growth: o.growth ?? growthDefault,
    p: o.p ?? cp.p,
    churn: o.churn ?? cp.churn,
    studio: o.studio ?? cp.studioShare,
    loop: o.loop ?? loopDefault,
  };
  const sp: SimParams = {
    ...cp,
    visits: o.growth == null ? cp.visits : (h) => v1 * Math.pow(1 + o.growth!, (h - 1) / 7),
    p: val.p,
    churn: val.churn,
    studioShare: val.studio,
    loopShare: o.loop,
  };
  const res = useMemo(() => simulate(a, sp, H), [a, H, o]); // eslint-disable-line react-hooks/exhaustive-deps
  const at = (date: string) => res.days.find((d) => d.date === date) ?? res.days[res.days.length - 1];
  const baseAt = (date: string) => base.days.find((d) => d.date === date) ?? base.days[base.days.length - 1];
  const d90 = at(DAY90);
  const b90 = baseAt(DAY90);
  const touched = Object.values(o).some((x) => x != null);
  const labels = res.days.map((d) => short(d.date));
  const planVals = res.days.map((d) => planMrr(diffDays(d.date, WINDOW_START)));
  const p50 = fc ? res.days.map((d) => { const i = fc.band.dates.indexOf(d.date); return i >= 0 ? fc.band.p50[i] : null; }) : null;
  const set = (k: keyof Overrides) => (v: number) => setO((cur) => ({ ...cur, [k]: v }));
  const delta = b90.mrr > 0 ? d90.mrr / b90.mrr - 1 : null;

  return (
    <Section
      id="sandbox"
      title="Scenario sandbox"
      kicker={fc ? 'Override any input; the projection updates as you move' : 'Plan inputs blended with the few days logged: a scenario, not a forecast'}
      aside={
        <button type="button" className="btn btn-sm btn-ghost" disabled={!touched} onClick={() => setO(NO_OVERRIDES)}>
          {fc ? 'Reset to the forecast' : 'Reset'}
        </button>
      }
    >
      <div className="split">
        <Card>
          <div className="stack" style={{ gap: 16 }}>
            <Slider label="Visits growth per week" value={val.growth} min={-0.3} max={0.6} step={0.01} fmt={(x) => `${x >= 0 ? '+' : ''}${(x * 100).toFixed(0)}%`} onChange={set('growth')} note={o.growth == null ? 'Forecast path (data trend blended with the plan)' : `Constant from ${fmtInt(v1)} visits a day`} />
            <Slider label="Visit → paid" value={val.p} min={0.001} max={0.04} step={0.0005} fmt={(x) => fmtPct(x, 2)} onChange={set('p')} note={`Logged ${a.est.p.obs == null ? '–' : fmtPct(a.est.p.obs, 2)} · plan 1.00% · $1M breakout 1.6%`} />
            <Slider label="Monthly churn" value={val.churn} min={0.02} max={0.25} step={0.005} fmt={(x) => fmtPct(x, 1)} onChange={set('churn')} note="Plan 10% · breakout 7%" />
            <Slider label="Plan mix: Studio or Scale share" value={val.studio} min={0.1} max={0.8} step={0.01} fmt={(x) => fmtPct(x, 0)} onChange={set('studio')} note={`List price about ${fmtUsd(priceForStudioShare(val.studio), true)} a month · plan 45%`} />
            <Slider label="Referral (loop) share of new payers" value={val.loop} min={0} max={0.5} step={0.01} fmt={(x) => fmtPct(x, 0)} onChange={set('loop')} note={o.loop == null ? `Model: ${fmtPct(loopDefault, 0)} from the loop coefficient` : 'Fixed share'} />
          </div>
        </Card>
        <Card className="card-accent">
          <h3>On {fmtDate(DAY90)}</h3>
          <div className="big-number num" aria-live="polite">
            {fmtCompactUsd(d90.mrr)} <span className="small muted">MRR</span>
          </div>
          <dl className="kv small">
            <dt>ARR run-rate</dt>
            <dd className="num">{fmtCompactUsd(d90.mrr * 12)}</dd>
            <dt>Paying subscribers</dt>
            <dd className="num">{fmtInt(d90.active)}</dd>
            <dt>Gross payers since launch</dt>
            <dd className="num">{fmtInt(d90.cumGross)}</dd>
            <dt>Against the {fc ? 'forecast path' : 'unmoved inputs'}</dt>
            <dd className="num">{delta == null ? '–' : `${delta >= 0 ? '+' : ''}${fmtPct(delta, 0)}`}</dd>
            <dt>$1M ARR</dt>
            <dd>{d90.mrr * 12 >= 1_000_000 ? <Chip tone="good">reached</Chip> : <span className="num">{fmtPct((d90.mrr * 12) / 1_000_000, 0)} of the way</span>}</dd>
          </dl>
        </Card>
      </div>
      <Card className="card-flat">
        <Chart
          ariaLabel="Sandbox MRR projection against the forecast median and the plan base"
          labels={labels}
          height={240}
          yFormat={fmtCompactUsd}
          series={[
            { id: 'sb', name: touched ? 'Your scenario' : 'Scenario (unmoved)', values: res.days.map((d) => d.mrr), color: 'var(--c2)', width: 2.5, kind: 'area' },
            ...(p50 ? [{ id: 'p50', name: 'Forecast median', values: p50, color: 'var(--ink)', dashed: true, width: 1.5 }] : []),
            { id: 'plan', name: 'Plan base', values: planVals, color: 'var(--c3)', dashed: true, width: 1.2 },
          ]}
        />
      </Card>
    </Section>
  );
}

function Slider(props: { label: string; value: number; min: number; max: number; step: number; fmt: (n: number) => string; onChange: (n: number) => void; note?: string }) {
  const id = useId();
  const v = Math.min(props.max, Math.max(props.min, props.value));
  return (
    <div className="slider-row">
      <div className="row-between">
        <label htmlFor={id}>{props.label}</label>
        <output htmlFor={id}>{props.fmt(props.value)}</output>
      </div>
      <input id={id} type="range" min={props.min} max={props.max} step={props.step} value={v} aria-valuetext={props.fmt(props.value)} onChange={(e) => props.onChange(Number(e.target.value))} />
      {props.note && <div className="tiny muted">{props.note}</div>}
    </div>
  );
}

/* ---------- channels ---------- */

function Outlook({ rows, next }: { rows: ReturnType<typeof channelOutlook>; next: ReturnType<typeof feedNext> }) {
  return (
    <Section id="channels" title="Channel outlook" kicker={`Each channel's own ${TRAIL_DAYS}-day trend and CAC · next 30 days`}>
      {next ? (
        <div className={`notice ${next.reason.startsWith('lowest') ? 'notice-good' : ''}`} style={{ marginBottom: 16 }}>
          <b>Feed next: {next.channel.channel}.</b>
          <span>
            {next.reason === 'lowest marginal CAC at or under $50 on 3+ net payers'
              ? `Marginal CAC about ${fmtUsd(next.channel.marginalCac)} (recent CAC ${fmtUsd(next.channel.recentCac)} ÷ ${ELASTICITY}), the lowest at or under $50 on 3+ net payers. Scale by 20-30% at most every 48-72 h.`
              : `CAC ${fmtUsd(next.channel.cac)} is on target but on fewer than 3 net payers: keep testing, do not scale yet.`}
          </span>
        </div>
      ) : (
        <div className="notice" style={{ marginBottom: 16 }}>
          <b>No paid channel to feed yet.</b>
          <span>None has 3+ net payers at a marginal CAC of $50 or less. Organic channels are ranked by projected payers below.</span>
        </div>
      )}
      <div className="table-wrap">
        <table>
          <caption className="sr">Projection for each channel over the next 30 days</caption>
          <thead>
            <tr>
              <th scope="col">Channel</th>
              <th scope="col" className="n">Visits / day</th>
              <th scope="col" className="n">Trend / week</th>
              <th scope="col" className="n">Visit→paid</th>
              <th scope="col" className="n">Net payers, 30 d</th>
              <th scope="col" className="n">MRR added, 30 d</th>
              <th scope="col" className="n">CAC</th>
              <th scope="col" className="n">Marginal CAC</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.channel} className={next?.channel.channel === r.channel ? 'is-current' : undefined}>
                <th scope="row">{r.channel}</th>
                <td className="n">{r.recentVisitsPerDay == null ? '–' : fmtInt(r.recentVisitsPerDay)}</td>
                <td className="n">{r.weeklyGrowth == null ? '–' : `${r.weeklyGrowth >= 0 ? '+' : ''}${fmtPct(r.weeklyGrowth, 0)}`}</td>
                <td className="n">{r.conversion == null ? '–' : fmtPct(r.conversion, 2)}</td>
                <td className="n">
                  <b>{r.netPayers30.toFixed(r.netPayers30 < 10 ? 1 : 0)}</b>
                </td>
                <td className="n">{fmtUsd(r.mrrAdded30)}</td>
                <td className="n">{r.cac == null ? <span className="tiny muted">organic</span> : Number.isFinite(r.cac) ? fmtUsd(r.cac) : '∞'}</td>
                <td className="n">
                  {r.marginalCac == null ? '–' : Number.isFinite(r.marginalCac) ? fmtUsd(r.marginalCac) : '∞'}
                  {r.spend > 0 && !r.readable && <div className="tiny muted">under 3 payers</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="footnote">
        Trend: the channel's log-linear {TRAIL_DAYS}-day fit, shrunk toward flat when it has few days, damped like the main forecast. Conversion: the channel's rate shrunk toward the blended rate (300 visits of prior), so a lucky week does not crown a channel. Marginal CAC = recent CAC ÷ {ELASTICITY}: the next dollar buys less than the average one, an assumption [A] until you see a scale-up.
      </p>
    </Section>
  );
}

/* ---------- transparency ---------- */

function Estimates({ a }: { a: Analysis }) {
  const rows: [string, Est, (n: number) => string][] = [
    ['Visit → paid (direct)', a.est.p, (x) => fmtPct(x, 2)],
    ['Sign-up rate', a.est.signupRate, (x) => fmtPct(x, 1)],
    ['Refund rate', a.est.refund, (x) => fmtPct(x, 1)],
    ['Monthly churn', a.est.churn, (x) => fmtPct(x, 1)],
    ['Studio or Scale share', a.est.studioShare, (x) => fmtPct(x, 0)],
    ['Yearly share', a.est.yearlyShare, (x) => fmtPct(x, 0)],
    ['Loop payers per active payer a month', a.est.viral, (x) => x.toFixed(3)],
  ];
  const t = a.trend;
  return (
    <Section id="inputs" title="What the model believes" kicker={`${a.obs.dataDays} logged day${a.obs.dataDays === 1 ? '' : 's'} · weight on data ${fmtPct(a.weight, 0)}`}>
      <div className="table-wrap">
        <table>
          <caption className="sr">Each input: what the data says, the plan's value, the weight on the data and the value used</caption>
          <thead>
            <tr>
              <th scope="col">Input</th>
              <th scope="col" className="n">Data says</th>
              <th scope="col" className="n">Plan</th>
              <th scope="col" className="n">Weight on data</th>
              <th scope="col" className="n">Used (± 1 sd)</th>
              <th scope="col">From</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, e, f]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td className="n">{e.obs == null ? '–' : f(e.obs)}</td>
                <td className="n">{f(e.prior)}</td>
                <td className="n">{fmtPct(e.weight, 0)}</td>
                <td className="n">
                  <b>{f(e.value)}</b> <span className="tiny muted">± {f(e.sd)}</span>
                </td>
                <td className="small muted src">{e.source}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Visits trend</th>
              <td className="n">{t.n >= 3 ? `${t.slope >= 0 ? '+' : ''}${fmtPct(Math.exp(t.slope * 7) - 1, 0)} / week` : '–'}</td>
              <td className="n">plan path</td>
              <td className="n">{fmtPct(a.weight, 0)}</td>
              <td className="n">
                {t.n >= 3 ? (
                  <>
                    <b>{fmtInt(Math.exp(t.level) - 1)}</b> <span className="tiny muted">a day, ± {fmtPct(Math.exp(t.seSlope * 7) - 1, 0)} / week</span>
                  </>
                ) : (
                  '–'
                )}
              </td>
              <td className="small muted src">log-linear fit, last {TRAIL_DAYS} days ({t.n} with clicks), damped {DAMPING} a day</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function Method() {
  return (
    <Section id="method" title="How this is calculated" kicker="And where it is weak">
      <div className="grid-2">
        <Card>
          <h3>Method</h3>
          <ol className="bullets small">
            <li>
              <b>Visits.</b> A straight-line fit of log(daily /go/ clicks) over the last {TRAIL_DAYS} logged days gives today's level and growth. Growth is damped by {Math.round((1 - DAMPING) * 100)}% a day, so a hot fortnight does not compound for months, and clamped to ±{Math.round(MAX_DAILY_GROWTH * 100)}% a day.
            </li>
            <li>
              <b>Prior.</b> The plan's base case (data/funnel.json, the Funnel page's calculator) is blended in. Weight on the data = n ÷ (n + {PRIOR_DAYS}) for n logged days: 50% at 7 days, 80% at 28, 93% at 90. Visit paths blend in log terms; rates blend linearly.
            </li>
            <li>
              <b>Cohorts.</b> The blended rates run the calculator's own mechanics: refunds, plan mix and yearly share set the net ARPU, monthly subscribers churn at each 30-day renewal, yearly ones do not churn inside the window, and loop payers grow with the active base. History is rebuilt from logged net payers and anchored to a Whop MRR snapshot from the last 7 days when one exists.
            </li>
            <li>
              <b>Uncertainty.</b> {RUNS.toLocaleString('en-US')} Monte Carlo runs with a fixed seed draw today's visit level and growth from the fit's standard errors, the plan path with a {Math.round(PLAN_LOG_SD * 100)}% log error, and every rate from its spread: the larger of the binomial error and the day-to-day variance of the logged rate, blended with a wide prior (±50% on conversion). Bands are the 10th, 50th and 90th percentiles. Same data, same numbers, every time.
            </li>
            <li>
              <b>Inferred inputs.</b> Yearly share comes from first-payment revenue per payer; churn from rows on the "renewals" channel against the renewals due; loop strength from "ch-loops" payers against the active base. Until those exist, the plan's values are used and the table above says so.
            </li>
          </ol>
        </Card>
        <Card>
          <h3>Limits</h3>
          <ul className="bullets small">
            <li>It extrapolates what has happened. A breakout post, a launch beat, Black Friday or an outage are not in the trend until they show up in the data. The plan's shape (launch, creator waves, holiday dip) enters only through the prior.</li>
            <li>Under {MIN_DAYS} logged days there is no forecast: a trend from 3 days is noise with a decimal point.</li>
            <li>Payers are credited on the day they are logged; the plan's "within 30 days" conversion lag is ignored, which flatters fast-growing weeks slightly.</li>
            <li>Rates are treated as independent and constant after today. Real conversion often falls as traffic broadens, so the high band is optimistic for large scale-ups.</li>
            <li>Marginal CAC assumes diminishing returns with an exponent of {ELASTICITY} [A]; replace it once a channel has been scaled.</li>
            <li>Garbage in, garbage out: missing days, clicks logged on some channels only, or payers logged twice move the forecast. The Analytics funnel only counts rows that logged both numbers; the forecast reads totals per day.</li>
            <li>Everything is computed in this browser from this browser's data. Nothing is sent anywhere.</li>
          </ul>
        </Card>
      </div>
      <Details summary="Why a damped trend and a fading prior, not a plain growth curve">
        <p className="small">
          Early-stage traffic is spiky: launch days, a post that travels, a quiet weekend. A plain exponential fit to two good weeks predicts absurd January numbers, and a plain average ignores real growth. Damping keeps the recent direction but lets it fade, which forecasting studies find is a robust default for short noisy series. The plan prior keeps week-one noise from dominating while handing over to your data within a few weeks. Both choices are explicit constants at the top of src/lib/forecast.ts; npm run check tests the maths with a fixed seed.
        </p>
      </Details>
    </Section>
  );
}

import { useMemo, useState } from 'react';
import funnelJson from '../../data/funnel.json';
import kpisJson from '../../data/kpis.json';
import { compareWithReference, runFunnel, solveForArr, type FunnelInputs } from '../lib/funnelModel';
import type { Kpis } from '../lib/types';
import { addDays, fmtCompactUsd, fmtDate, fmtInt, fmtPct, fmtUsd, LAUNCH_DAY } from '../lib/util';
import { PLAN } from '../lib/budget';
import { Card, Chip, Details, Labelled, Page, Section, Segmented, Stat } from '../components/ui';
import { Chart } from '../components/Chart';

interface Scenario { id: string; name: string; note: string; inputs: FunnelInputs; referenceOutputs: Record<string, unknown> }
interface FunnelFile {
  meta: { consistencyNotes: string[]; labels: Record<string, string>; liveOnly: string };
  defaults: Record<string, { label?: string; source?: string; low?: number; base?: number; high?: number } & Record<string, unknown>> & {
    weeklyShape: { base: number[]; breakout: number[] };
    visitsPerDay: { channels: Record<string, { name: string; low: number; base: number; high: number }>; source: string; notes: string[] };
  };
  scenarios: Scenario[];
}
const F = funnelJson as unknown as FunnelFile;
const KPIS = kpisJson as unknown as Kpis;
const SC = Object.fromEntries(F.scenarios.map((s) => [s.id, s])) as Record<string, Scenario>;
const clone = (p: FunnelInputs) => JSON.parse(JSON.stringify(p)) as FunnelInputs;
const TARGET_ARR = 1_000_000;

type Path = (string | number)[];
function setIn(p: FunnelInputs, path: Path, v: number | boolean | number[]): FunnelInputs {
  const next = clone(p);
  let o = next as unknown as Record<string | number, unknown>;
  for (let i = 0; i < path.length - 1; i++) o = o[path[i]] as Record<string | number, unknown>;
  o[path[path.length - 1]] = v;
  return next;
}

export default function Funnel() {
  const [presetId, setPresetId] = useState('base');
  const [inputs, setInputs] = useState<FunnelInputs>(() => clone(SC.base.inputs));
  const [dirty, setDirty] = useState(false);
  const [chart, setChart] = useState<'mrr' | 'arr' | 'active'>('mrr');

  const result = useMemo(() => runFunnel(inputs), [inputs]);
  const refs = useMemo(() => Object.fromEntries(['low', 'base', 'high', 'breakout'].map((id) => [id, runFunnel(SC[id].inputs)])), []);
  const s = result.summary;
  const diffs = !dirty ? compareWithReference(s, SC[presetId].referenceOutputs) : [];

  const pick = (id: string) => {
    setPresetId(id);
    setInputs(clone(SC[id].inputs));
    setDirty(false);
  };
  const upd = (path: Path, v: number | boolean | number[]) => {
    setInputs((p) => {
      let next = setIn(p, path, v);
      if (path[0] === 'checkoutOpenRate' || path[0] === 'checkoutToPaidRate') next = setIn(next, ['paidRate'], (next.checkoutOpenRate ?? 0) * (next.checkoutToPaidRate ?? 0));
      return next;
    });
    setDirty(true);
  };

  const organicMult = useMemo(() => {
    const base = Object.values(SC[presetId].inputs.visitsPerDay).reduce((a, b) => a + b, 0);
    const cur = Object.values(inputs.visitsPerDay).reduce((a, b) => a + b, 0);
    return base ? cur / base : 1;
  }, [inputs, presetId]);
  const setOrganicMult = (m: number) => {
    const base = SC[presetId].inputs.visitsPerDay;
    setInputs((p) => ({ ...clone(p), visitsPerDay: Object.fromEntries(Object.entries(base).map(([k, v]) => [k, Math.round(v * m * 10) / 10])) }));
    setDirty(true);
  };

  // What it takes: solve for traffic or conversion that reaches $1M ARR on day 91.
  const solve = useMemo(() => {
    const traffic = solveForArr(inputs, (p, f) => ({ ...clone(p), visitsPerDay: Object.fromEntries(Object.entries(p.visitsPerDay).map(([k, v]) => [k, v * f])) }));
    const conv = solveForArr(inputs, (p, f) => ({ ...clone(p), signupRate: p.signupRate * f }), TARGET_ARR, 20);
    return { traffic, conv };
  }, [inputs]);

  const cumGross = (day: number) => result.daily.slice(0, day).reduce((a, d) => a + d.gross, 0);
  // Breakout checkpoints come from the breakout scenario itself, so they move with data/funnel.json.
  const breakoutCum = (day: number) => Math.round(refs.breakout.daily.slice(0, day).reduce((a, d) => a + d.gross, 0) / 10) * 10;
  const labels = result.daily.map((d) => fmtDate(addDays(LAUNCH_DAY, d.day - 1), { day: 'numeric', month: 'short' }));
  const key = chart === 'mrr' ? 'mrr' : chart === 'arr' ? 'arr' : 'active';
  const series = [
    { id: 'low', name: 'Low', values: refs.low.daily.map((d) => d[key]), color: 'var(--c5)', dashed: true, width: 1.5 },
    { id: 'base', name: 'Base (plan of record)', values: refs.base.daily.map((d) => d[key]), color: 'var(--c3)', dashed: true, width: 1.5 },
    { id: 'high', name: 'High', values: refs.high.daily.map((d) => d[key]), color: 'var(--c4)', dashed: true, width: 1.5 },
    { id: 'breakout', name: 'Breakout', values: refs.breakout.daily.map((d) => d[key]), color: 'var(--accent)', dashed: true, width: 1.2 },
    { id: 'cur', name: dirty ? 'Your inputs' : `${SC[presetId].name} (selected)`, values: result.daily.map((d) => d[key]), color: 'var(--c2)', width: 3, kind: 'area' as const },
  ];
  const ref = chart === 'arr' ? [{ y: TARGET_ARR, label: '$1M ARR', color: 'var(--accent)' }] : chart === 'mrr' ? [{ y: TARGET_ARR / 12, label: '$83.3k MRR = $1M ARR', color: 'var(--accent)' }] : [{ y: 2050, label: '~2,050 active ≈ $1M ARR', color: 'var(--accent)' }];

  const D = F.defaults;
  const src = (k: string) => (D[k]?.source as string) ?? '';

  return (
    <Page
      eyebrow="The model behind the plan · 91 days"
      title={
        <>
          The funnel, <em>day by day</em>
        </>
      }
      lede="Pick a case (Low, Base, High …), then move the sliders to see what visits, sign-up rates and refunds do to revenue. Each input shows how sure we are of it."
    >
      <div className="row-between" style={{ marginBottom: 20 }}>
        <Segmented
          label="Scenario preset"
          value={presetId}
          onChange={pick}
          options={F.scenarios.map((x) => ({ value: x.id, label: x.name.replace(/\s*\(.*\)/, '').replace('Base, strict research inputs', 'Base strict').replace('Base + capped first-build preview from 16 Nov', 'Base + preview') }))}
        />
        <div className="row">
          {dirty ? (
            <>
              <Chip tone="warn">Custom inputs</Chip>
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => pick(presetId)}>
                Reset to {SC[presetId].name.split(' (')[0]}
              </button>
            </>
          ) : diffs.length === 0 ? (
            <Chip tone="good">✓ Matches funnel_model.py reference</Chip>
          ) : (
            <Chip tone="bad">Differs from reference: {diffs.map((d) => d.key).join(', ')}</Chip>
          )}
        </div>
      </div>
      <p className="small muted" style={{ marginTop: -8, marginBottom: 24, maxWidth: '90ch' }}>
        {SC[presetId].note}
      </p>

      <div className="statband">
        <Stat label="ARR on day 91" value={fmtCompactUsd(s.arrEnd)} tone={s.arrEnd >= TARGET_ARR ? 'good' : 'accent'} sub={`${((s.arrEnd / TARGET_ARR) * 100).toFixed(1)}% of $1M`} />
        <Stat label="MRR d30 / d60 / d91" value={fmtCompactUsd(s.mrrEnd)} sub={`${fmtCompactUsd(s.mrrDay30)} · ${fmtCompactUsd(s.mrrDay60)} · ${fmtCompactUsd(s.mrrEnd)}`} />
        <Stat label="Active subscribers" value={fmtInt(s.activeEnd)} sub={`${fmtInt(s.grossPaid)} gross · ${fmtInt(s.netPaid)} net`} />
        <Stat label="Qualified visits" value={fmtInt(s.qualifiedVisits)} sub={`+ ${fmtInt(s.loopVisitsImplied)} loop-implied · ${fmtPct(s.visitToPaid, 2)} to paid`} />
        <Stat label="Paid CAC" value={s.paidCac == null ? '–' : fmtUsd(s.paidCac)} tone={s.paidCac != null && s.paidCac <= 50 ? 'good' : 'bad'} sub={`${fmtUsd(s.paidSpendTotal)} paid spend · ${fmtUsd(s.reinvestedFromRevenue)} reinvested`} />
        <Stat label="AI limit on peak day" value={`${fmtUsd(s.aiLimitNeededPerDayUsd[0])}–${fmtUsd(s.aiLimitNeededPerDayUsd[1])}`} sub={`${s.peakGrossPerDay} peak new payers/day`} />
      </div>

      <Section
        id="chart"
        title="Over 91 days"
        kicker="Selected vs the plan's presets"
        aside={
          <Segmented
            label="Chart metric"
            value={chart}
            onChange={setChart}
            options={[
              { value: 'mrr', label: 'MRR' },
              { value: 'arr', label: 'ARR' },
              { value: 'active', label: 'Active subs' },
            ]}
          />
        }
      >
        <Card>
          <Chart ariaLabel={`${chart.toUpperCase()} by day for the selected inputs and the low, base and high presets`} labels={labels} series={series} refLines={ref} height={320} xTickEvery={14} yFormat={chart === 'active' ? (n) => fmtInt(n) : fmtCompactUsd} />
        </Card>
      </Section>

      <div className="split" style={{ marginTop: 40 }}>
        <Section id="inputs" title="Inputs" kicker="Sliders">
          <Card>
            <div className="stack" style={{ gap: 18 }}>
              <h4>Traffic</h4>
              <Slider label="Organic visits (× preset)" value={organicMult} min={0.25} max={4} step={0.05} fmt={(v) => `${v.toFixed(2)}× · ${fmtInt(Object.values(inputs.visitsPerDay).reduce((a, b) => a + b, 0) * inputs.days)} visits`} onChange={setOrganicMult} source={F.defaults.visitsPerDay.source} />
              <div className="row">
                <span className="small muted">Weekly shape</span>
                <Segmented
                  label="Weekly traffic shape"
                  value={inputs.weeklyShape.join() === D.weeklyShape.breakout.join() ? 'breakout' : 'base'}
                  onChange={(v) => upd(['weeklyShape'], v === 'breakout' ? D.weeklyShape.breakout : D.weeklyShape.base)}
                  options={[
                    { value: 'base', label: 'Base' },
                    { value: 'breakout', label: 'Back-loaded' },
                  ]}
                />
              </div>
              <Details summary="Visits per day by channel">
                <div className="form-grid">
                  {Object.entries(inputs.visitsPerDay).map(([ch, v]) => (
                    <div className="field" key={ch}>
                      <label htmlFor={`vpd-${ch}`}>{F.defaults.visitsPerDay.channels[ch]?.name ?? ch}</label>
                      <input id={`vpd-${ch}`} type="number" min={0} step={0.1} value={v} onChange={(e) => upd(['visitsPerDay', ch], Math.max(0, Number(e.target.value) || 0))} />
                    </div>
                  ))}
                </div>
                <ul className="bullets tiny muted" style={{ marginTop: 10 }}>
                  {F.defaults.visitsPerDay.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </Details>

              <h4>Conversion</h4>
              <Slider label="Visit → account" value={inputs.signupRate} min={0.005} max={0.12} step={0.0025} fmt={(v) => fmtPct(v)} onChange={(v) => upd(['signupRate'], v)} source={src('signupRate')} />
              <Slider label="Account → checkout opened" value={inputs.checkoutOpenRate ?? 0.6} min={0.2} max={0.95} step={0.01} fmt={(v) => fmtPct(v, 0)} onChange={(v) => upd(['checkoutOpenRate'], v)} source={src('checkoutOpenRate')} />
              <Slider label="Checkout → paid" value={inputs.checkoutToPaidRate ?? 0.33} min={0.1} max={0.7} step={0.005} fmt={(v) => fmtPct(v)} onChange={(v) => upd(['checkoutToPaidRate'], v)} source={src('checkoutToPaidRate')} />
              <p className="tiny muted" style={{ marginTop: -8 }}>
                Account → paid {fmtPct(inputs.paidRate)} · visit → paid <b>{fmtPct(inputs.signupRate * inputs.paidRate, 2)}</b>
              </p>

              <h4>Plan mix and retention</h4>
              <Slider label="Studio share of new payers" value={inputs.planMix.studio} min={0} max={Math.max(0, 1 - inputs.planMix.scale)} step={0.01} fmt={(v) => fmtPct(v, 0)} onChange={(v) => { setDirty(true); setInputs((p) => ({ ...clone(p), planMix: { create: Math.max(0, 1 - v - p.planMix.scale), studio: v, scale: p.planMix.scale } })); }} source="[A] strategy.md 14.2" />
              <Slider label="Scale share of new payers" value={inputs.planMix.scale} min={0} max={Math.max(0, 1 - inputs.planMix.studio)} step={0.01} fmt={(v) => `${fmtPct(v, 0)} · Create ${fmtPct(inputs.planMix.create, 0)}`} onChange={(v) => { setDirty(true); setInputs((p) => ({ ...clone(p), planMix: { create: Math.max(0, 1 - v - p.planMix.studio), studio: p.planMix.studio, scale: v } })); }} source="[A] strategy.md 14.2" />
              <Slider label="Yearly share" value={inputs.yearlyShare} min={0} max={0.6} step={0.01} fmt={(v) => fmtPct(v, 0)} onChange={(v) => upd(['yearlyShare'], v)} source={src('yearlyShare')} />
              <Slider label="Monthly churn" value={inputs.monthlyChurn} min={0.02} max={0.3} step={0.005} fmt={(v) => fmtPct(v)} onChange={(v) => upd(['monthlyChurn'], v)} source={src('monthlyChurn')} />
              <Slider label="Refund rate" value={inputs.refundRate} min={0} max={0.4} step={0.01} fmt={(v) => fmtPct(v, 0)} onChange={(v) => upd(['refundRate'], v)} source={src('refundRate')} />
              <Slider label="Loop coefficient k (monthly)" value={inputs.viralCoefficient} min={0} max={0.3} step={0.005} fmt={(v) => v.toFixed(3)} onChange={(v) => upd(['viralCoefficient'], v)} source={src('viralCoefficient')} />

              <h4>Paid sources</h4>
              <Slider label="Creator effective CPM" value={inputs.creatorCPM} min={1} max={30} step={0.5} fmt={(v) => fmtUsd(v, true)} onChange={(v) => upd(['creatorCPM'], v)} source={src('creatorCPM')} />
              <Slider label="Creator view → visit" value={inputs.creatorClickRate} min={0.001} max={0.02} step={0.0005} fmt={(v) => fmtPct(v, 2)} onChange={(v) => upd(['creatorClickRate'], v)} source={src('creatorClickRate')} />
              <Slider label="Warm-traffic uplift (creators, Content Rewards)" value={inputs.paidConversionMultiplier.creators} min={0.5} max={3} step={0.05} fmt={(v) => `${v.toFixed(2)}×`} onChange={(v) => { setDirty(true); setInputs((p) => ({ ...clone(p), paidConversionMultiplier: { ...p.paidConversionMultiplier, creators: v, contentRewards: v } })); }} source={src('paidConversionMultiplier')} />
              <Slider label="Boost CPC" value={inputs.adCPC} min={0.3} max={4} step={0.05} fmt={(v) => fmtUsd(v, true)} onChange={(v) => upd(['adCPC'], v)} source={src('adCPC')} />
              <Slider label="Content Rewards view → visit" value={inputs.contentRewardsClickRate} min={0.0005} max={0.01} step={0.0005} fmt={(v) => fmtPct(v, 2)} onChange={(v) => upd(['contentRewardsClickRate'], v)} source={src('contentRewardsClickRate')} />

              <h4>Reinvestment (D4, owner decision)</h4>
              <Slider label="Share of last week's net new cash" value={inputs.reinvest.share} min={0} max={0.8} step={0.05} fmt={(v) => fmtPct(v, 0)} onChange={(v) => upd(['reinvest', 'share'], v)} source="[O] decision D4" />
              <Slider label="Weekly reinvestment cap" value={inputs.reinvest.maxWeeklyUsd} min={0} max={4000} step={50} fmt={(v) => fmtUsd(v)} onChange={(v) => upd(['reinvest', 'maxWeeklyUsd'], v)} source="[A] stands in for creator supply" />

              <h4>Capped first-build preview (D2)</h4>
              <label className="row small" style={{ cursor: 'pointer' }}>
                <input type="checkbox" checked={!!inputs.preview?.enabled} onChange={(e) => { setDirty(true); setInputs((p) => ({ ...clone(p), preview: { ...(p.preview ?? { fromWeek: 4, costUsd: 0.9 }), enabled: e.target.checked, fromWeek: p.preview?.fromWeek ?? 4, costUsd: p.preview?.costUsd ?? 0.9, paidRateUplift: e.target.checked ? Math.max(1.3, p.preview?.paidRateUplift ?? 1.3) : 1, takeRate: e.target.checked ? Math.max(0.5, p.preview?.takeRate ?? 0.5) : 0 } })); }} />
                Model the preview from week 4 <Chip tone="owner">Owner decision · not live</Chip>
              </label>
              {inputs.preview?.enabled && (
                <Slider label="Preview uplift on account → paid" value={inputs.preview.paidRateUplift} min={1} max={2} step={0.05} fmt={(v) => `${v.toFixed(2)}×`} onChange={(v) => upd(['preview', 'paidRateUplift'], v)} source={String(D.preview?.source ?? '')} />
              )}
            </div>
          </Card>
        </Section>

        <div className="stack" style={{ alignContent: 'start', gap: 20 }}>
          <Section id="million" title={<>What must be true for <em>$1M</em></>} kicker="Readout">
            <Card className="card-ink">
              <div className="big-number num">{((s.arrEnd / TARGET_ARR) * 100).toFixed(0)}%</div>
              <p className="muted" style={{ marginTop: 6 }}>
                of $1M ARR at the end of the model run (day-90 review Mon 25 Jan) with these inputs ({fmtCompactUsd(s.arrEnd)}). $1M ARR ≈ {fmtUsd(TARGET_ARR / 12)} MRR ≈ {fmtInt(TARGET_ARR / 12 / s.netArpu)} active subscribers at {fmtUsd(s.netArpu, true)} net ARPU.
              </p>
              <dl className="kv" style={{ marginTop: 14 }}>
                <dt>Traffic needed</dt>
                <dd>
                  {solve.traffic == null ? 'Not reachable by traffic alone (×50)' : solve.traffic === 1 ? 'Already there' : (
                    <>
                      <b>{solve.traffic.toFixed(1)}×</b> organic visits ≈ {fmtInt(Object.values(inputs.visitsPerDay).reduce((a, b) => a + b, 0) * inputs.days * solve.traffic)} organic visits in 91 days
                    </>
                  )}
                </dd>
                <dt>Or conversion</dt>
                <dd>
                  {solve.conv == null ? 'Not reachable by conversion alone (×20)' : solve.conv === 1 ? 'Already there' : (
                    <>
                      <b>{solve.conv.toFixed(1)}×</b> sign-up rate ≈ {fmtPct(s.visitToPaid * solve.conv, 2)} visit → paid
                    </>
                  )}
                </dd>
                <dt>By 22 Nov (day 28)</dt>
                <dd>
                  {fmtInt(cumGross(28))} cumulative gross <span className="muted">(breakout needs ~{fmtInt(breakoutCum(28))})</span>
                </dd>
                <dt>By 20 Dec (day 56)</dt>
                <dd>
                  {fmtInt(cumGross(56))} cumulative gross <span className="muted">(breakout needs ~{fmtInt(breakoutCum(56))})</span>
                </dd>
                <dt>Net new cash</dt>
                <dd>{fmtUsd(s.netNewCashFirstPayments)} from first payments</dd>
                <dt>Contribution</dt>
                <dd>{fmtUsd(s.monthlyContributionEnd)} / month at the end <abbr className="ev ev-E">E</abbr></dd>
              </dl>
            </Card>
            <Card>
              <h3>The plan's conditions</h3>
              <ol className="bullets small">
                {PLAN.whatMustBeTrueFor1M.map((w) => (
                  <li key={w}>
                    <Labelled text={w} />
                  </li>
                ))}
              </ol>
            </Card>
          </Section>

          <Card>
            <h3>Consistency notes from the model</h3>
            <ol className="bullets small">
              {F.meta.consistencyNotes.map((n) => (
                <li key={n}>{n.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>
            <p className="tiny muted" style={{ marginBottom: 0 }}>
              {F.meta.liveOnly}
            </p>
          </Card>
        </div>
      </div>

      <Section id="weekly" title="Week by week" kicker="Model vs the plan of record (kpis.json)">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Week</th>
                <th className="n">Visits</th>
                <th className="n">Sign-ups</th>
                <th className="n">Gross paid</th>
                <th className="n">Plan gross</th>
                <th className="n">Net paid</th>
                <th className="n">Paid spend</th>
                <th className="n">Reinvested</th>
                <th className="n">Loop share</th>
                <th className="n">Active</th>
                <th className="n">MRR</th>
                <th className="n">Plan MRR</th>
              </tr>
            </thead>
            <tbody>
              {result.weekly.map((w) => {
                const t = KPIS.weeklyTargets[w.week - 1];
                return (
                  <tr key={w.week}>
                    <td>
                      <b>W{w.week}</b> <span className="tiny muted">{t?.dates ?? 'day 91'}</span>
                    </td>
                    <td className="n">{fmtInt(w.visits)}</td>
                    <td className="n">{fmtInt(w.signups)}</td>
                    <td className="n">{w.grossPaid.toFixed(1)}</td>
                    <td className="n muted">{t ? fmtInt(t.paid) : '–'}</td>
                    <td className="n">{w.netPaid.toFixed(1)}</td>
                    <td className="n">{fmtUsd(w.paidSpend)}</td>
                    <td className="n">{fmtUsd(w.reinvest)}</td>
                    <td className="n">{fmtPct(w.loopShare, 0)}</td>
                    <td className="n">{fmtInt(w.activeSubs)}</td>
                    <td className="n">
                      <b>{fmtUsd(w.mrr)}</b>
                    </td>
                    <td className="n muted">{t ? fmtUsd(t.mrr) : '–'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="footnote">Week 14 is the single model day 91 (Tue 26 Jan; model day 1 = the launch, Wed 28 Oct). Plan-of-record weekly targets include paid and loop traffic in visits, so the model's launch weeks run lower (consistency note 4).</p>
      </Section>
    </Page>
  );
}

function Slider(props: { label: string; value: number; min: number; max: number; step: number; fmt: (v: number) => string; onChange: (v: number) => void; source?: string }) {
  const id = `sl-${props.label.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <div className="slider-row">
      <div className="row-between">
        <label htmlFor={id}>{props.label}</label>
        <output htmlFor={id}>{props.fmt(props.value)}</output>
      </div>
      <input id={id} type="range" min={props.min} max={props.max} step={props.step} value={props.value} onChange={(e) => props.onChange(Number(e.target.value))} />
      {props.source && (
        <div className="tiny muted">
          <Labelled text={props.source} />
        </div>
      )}
    </div>
  );
}

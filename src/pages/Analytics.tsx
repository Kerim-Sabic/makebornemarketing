import { useMemo, useState } from 'react';
import kpisJson from '../../data/kpis.json';
import checkpointsJson from '../../data/checkpoints.json';
import type { ActualEntry, Checkpoint, Kpis } from '../lib/types';
import { ACTUALS_TEMPLATE, CSV_HEADER, acquisition, aggregate, byChannel, byWeek, cac, entryKey, mergeEntries, netPaid, parseActualsText, toActualsCsv, toActualsJson } from '../lib/actuals';
import { useActuals, useMrrSnapshots, useSpendLog } from '../lib/stores';
import { addDays, downloadText, fmtCompactUsd, fmtDate, fmtInt, fmtPct, fmtUsd, isIsoDate, planWeek, readFileText, sarajevoToday } from '../lib/util';
import { contentTitle } from '../lib/contentIndex';
import { LINES } from '../lib/budget';
import { analyse } from '../lib/forecast';
import { SAMPLE_AS_OF, sampleData } from '../lib/sample';
import { RAG_LABEL, cacByChannel, cacByLine, contentLeaderboard, funnelSteps, mrrByWeek, paidChannelRows, ragTone, scorecard, weekActions, type FunnelStep, type Rag } from '../lib/analytics';
import { GUARD } from '../lib/planRates';
import { Card, Chip, Details, Empty, Section, Segmented, Stat } from '../components/ui';
import { Chart } from '../components/Chart';
import { href } from '../routes';

const KPIS = kpisJson as unknown as Kpis;
const CHECKPOINTS = (checkpointsJson as unknown as { checkpoints: Checkpoint[] }).checkpoints;
const WEEKS = KPIS.weeklyTargets.map((w) => `W${w.week}`);

const fmtCac = (c: number | null) => (c == null ? '–' : Number.isFinite(c) ? fmtUsd(c) : '∞');
const fmtMonths = (m: number | null) => (m == null ? '–' : Number.isFinite(m) ? `${m.toFixed(1)} mo` : '∞');
function RagChip({ rag, children }: { rag: Rag; children?: React.ReactNode }) {
  return <Chip tone={ragTone(rag)}>{children ?? RAG_LABEL[rag]}</Chip>;
}

/**
 * Every Analytics section (scorecard, this week, funnel, weekly charts, monthly revenue, cost per customer,
 * content, alerts, rows, import and export). Results shows them as collapsible panels under the day sheet and the verdict.
 */
export function AnalyticsPanels({ sample, onEditRow, setMsg }: { sample: boolean; onEditRow: (e: ActualEntry) => void; setMsg: (m: string) => void }) {
  const [realEntries, setEntries] = useActuals();
  const [realSnaps, setSnaps] = useMrrSnapshots();
  const [realLog] = useSpendLog();
  const S = sample ? sampleData() : null;
  const entries = S ? S.entries : realEntries;
  const snaps = S ? S.snaps : realSnaps;
  const log = S ? S.spend : realLog;
  const today = sarajevoToday();
  const asOf = S ? SAMPLE_AS_OF : today;
  const [scope, setScope] = useState<'all' | 'week'>('all');
  const [rankBy, setRankBy] = useState<'signups' | 'paid'>('signups');

  const acq = useMemo(() => acquisition(entries), [entries]);
  const tot = aggregate(acq);
  const unknownPaid = acq.filter((e) => e.channel === 'unknown').reduce((s, e) => s + (e.paid ?? 0), 0);
  const analysis = useMemo(() => analyse(entries, { asOf, snaps }), [entries, asOf, snaps]);
  const weekly = useMemo(() => byWeek(entries), [entries]);
  const currentWeek = Math.max(1, Math.min(13, planWeek(asOf)));
  const lastComplete = Math.max(1, Math.min(13, planWeek(addDays(asOf, 1)) - 1));
  const [weekSel, setWeekSel] = useState<number | null>(null);
  const week = weekSel ?? lastComplete;
  const shown = (i: number) => i + 1 <= currentWeek || weekly[i].rows > 0;

  const mrrWeeks = useMemo(() => mrrByWeek(entries, snaps, analysis, asOf), [entries, snaps, analysis, asOf]);
  const score = useMemo(() => scorecard(entries, week, KPIS, mrrWeeks, asOf), [entries, week, mrrWeeks, asOf]);
  const plan = useMemo(() => weekActions(entries, log, asOf, CHECKPOINTS, analysis), [entries, log, asOf, analysis]);
  const funnelRows = scope === 'all' ? entries : entries.filter((e) => planWeek(e.date) === week);
  const funnel = useMemo(() => funnelSteps(funnelRows), [funnelRows]);
  const channels = useMemo(() => byChannel(acq).sort((a, b) => b.paid - a.paid || b.signups - a.signups), [acq]);
  const cacCh = useMemo(() => cacByChannel(entries), [entries]);
  const cacLines = useMemo(() => cacByLine(entries, log, LINES), [entries, log]);
  const ranking = useMemo(() => contentLeaderboard(entries, rankBy), [entries, rankBy]);

  const onImport = async (file?: File) => {
    if (!file) return;
    setMsg(`Reading ${file.name}…`);
    try {
      const { entries: inc, mrr, errors, warnings } = parseActualsText(await readFileText(file), file.name);
      if (inc.length) setEntries((cur) => mergeEntries(cur, inc));
      if (mrr.length) setSnaps((cur) => [...new Map([...cur, ...mrr].map((s) => [s.date, s])).values()].sort((a, b) => a.date.localeCompare(b.date)));
      setMsg(
        `Imported ${inc.length} row${inc.length === 1 ? '' : 's'}${mrr.length ? ` and ${mrr.length} MRR snapshots` : ''}.` +
          (errors.length ? ` Skipped ${errors.length}: ${errors.slice(0, 3).join('; ')}${errors.length > 3 ? '…' : ''}.` : '') +
          (warnings.length ? ` Changed ${warnings.length} value${warnings.length === 1 ? '' : 's'}: ${warnings.slice(0, 3).join('; ')}${warnings.length > 3 ? '…' : ''}.` : ''),
      );
    } catch (e) {
      setMsg(`Import failed: ${(e as Error).message}`);
    }
  };

  const chartPair = (title: string, actual: (number | null)[], target: number[], fmt: (n: number) => string, note?: string) => (
    <Card>
      <h3>{title}</h3>
      <Chart
        ariaLabel={`${title}: weekly actuals against targets`}
        labels={WEEKS}
        height={220}
        yFormat={fmt}
        series={[
          { id: 'a', name: 'Actual', values: actual, color: 'var(--c2)', kind: 'bar' },
          { id: 't', name: 'Weekly target (kpis.json)', values: target, color: 'var(--c3)', dashed: true },
        ]}
      />
      {note && <p className="footnote">{note}</p>}
    </Card>
  );

  const blendedCac = cac(aggregate(paidChannelRows(acq)));

  return (
    <>
      <Section id="totals" title="Totals so far" kicker="Everything logged in this browser">
        <div className="statband">
          <Stat label="Visits (/go/ clicks)" value={fmtInt(tot.clicks)} sub={`${fmtInt(tot.views)} views logged`} />
          <Stat label="Sign-ups" value={fmtInt(tot.signups)} sub={tot.clicks ? `${fmtPct(tot.signups / tot.clicks)} of visits` : '–'} />
          <Stat label="Paying customers (after refunds)" value={`${fmtInt(tot.paid)} / ${fmtInt(netPaid(tot))}`} sub={tot.clicks ? `${fmtPct(tot.paid / tot.clicks, 2)} of visits` : '–'} />
          <Stat label="Using it with a client" value={fmtInt(tot.activated)} sub="the north star, filled 7 days later" />
          <Stat label="Cost per paying customer (paid sources)" value={fmtCac(blendedCac)} tone={blendedCac != null && blendedCac > GUARD.cacTarget ? 'warn' : undefined} sub={`${fmtUsd(tot.spend)} spend ÷ paying customers after refunds`} />
          <Stat label="Sales we can trace to a source" value={tot.paid ? fmtPct(1 - unknownPaid / tot.paid, 0) : '–'} tone={tot.paid && 1 - unknownPaid / tot.paid < 0.9 ? 'warn' : undefined} sub="target 90% or more from week 2" />
        </div>
      </Section>

      <Section
        id="scorecard"
        title={<>Weekly scorecard · week {week}</>}
        kicker={`North star and guardrails · ${KPIS.weeklyTargets[week - 1].dates}${week === currentWeek && planWeek(asOf) === week && week !== lastComplete ? ' · week to date' : ''}`}
        aside={
          <label className="row small" style={{ gap: 6 }}>
            Week
            <select value={week} onChange={(e) => setWeekSel(Number(e.target.value))} style={{ width: 'auto' }} aria-label="Scorecard week">
              {KPIS.weeklyTargets.filter((t) => t.week <= currentWeek).map((t) => (
                <option key={t.week} value={t.week}>
                  W{t.week} · {t.dates}
                </option>
              ))}
            </select>
          </label>
        }
      >
        <ul className="scoregrid" aria-label={`Scorecard for week ${week}`}>
          {score.map((s) => (
            <li key={s.id} className={`card score score-${s.rag} ${s.northStar ? 'score-north' : ''}`}>
              <div className="row-between">
                <span className="stat-label">{s.label}</span>
                <RagChip rag={s.rag} />
              </div>
              <div className="stat-value num">{s.value}</div>
              <div className="stat-sub">
                Target {s.target}
                {s.note ? ` · ${s.note}` : ''}
              </div>
            </li>
          ))}
        </ul>
        <p className="footnote">Green meets the plan; amber is within 20% (refunds 15-20%, CAC $50-62.50); red needs action. Grey means the number is not in this log or the cohort is not 7 days old yet.</p>
      </Section>

      <Section id="actions" title="This week, plainly" kicker={`Kill and scale rules applied to the data · as of ${fmtDate(asOf)}`}>
        <div className="split">
          <Card>
            <ol className="actions">
              {plan.actions.map((a, i) => (
                <li key={i}>
                  <Chip tone={a.tone}>{a.verb}</Chip> <span>{a.text}</span>
                </li>
              ))}
            </ol>
          </Card>
          <Card className="card-accent">
            <h3>D4 reinvestment on Monday</h3>
            <div className="big-number num">{fmtUsd(plan.reinvest.amount)}</div>
            <p className="small">{plan.reinvest.why}</p>
            <p className="tiny muted">Net new cash, last 7 days ≈ {fmtUsd(plan.reinvest.base)} (first payments less refunds, Whop fees of 5% + $0.30) [E].</p>
            <p className="small" style={{ marginTop: 12 }}>
              <a href={sample ? href('results', 'sample', 'forecast') : href('results', 'forecast')}>Where this pace leads: the forecast →</a>
            </p>
          </Card>
        </div>
        <p className="footnote">Rules: kill a source at $100 with 0 net payers or $150 with 1; pause at refunds over 20%; scale at CAC ≤ $50 on 3+ net payers, +20-30% at most every 48-72 h; never above the $120 ceiling (plan/strategy.md 6.3).</p>
      </Section>

      <Section
        id="funnel"
        title="Funnel"
        kicker="Visits → sign-ups → checkout → paid → activated, against data/kpis.json"
        aside={<Segmented label="Funnel scope" value={scope} onChange={setScope} options={[{ value: 'all', label: 'All logged days' }, { value: 'week', label: `Week ${week}` }]} />}
      >
        <FunnelView steps={funnel.steps} />
        <p className="small" style={{ marginTop: 12 }}>
          Visit to paid: <b className="num">{fmtPct(funnel.visitToPaid, 2)}</b> against 1.0% base <RagChip rag={funnel.visitToPaidRag} /> <span className="muted">(D2 offer-check trigger under 0.7%)</span>
        </p>
        <p className="footnote">Each rate uses only the rows that logged both numbers, so an empty cell is never read as zero. Targets: sign-up 5% of visits, checkout 60% of sign-ups, paid 33% of checkouts, activated 60% of net payers in weeks 1-4 and 70% after (kpis.json funnel stages).</p>

        <h3 id="channels" style={{ marginTop: 28 }}>Conversion by channel</h3>
        {channels.length === 0 ? (
          <Empty>Channel rows appear once actuals are logged.</Empty>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Channel</th>
                  <th scope="col" className="n">Visits</th>
                  <th scope="col" className="n">Sign-up</th>
                  <th scope="col" className="n">Checkout</th>
                  <th scope="col" className="n">Paid</th>
                  <th scope="col" className="n">Activated</th>
                  <th scope="col" className="n">Visit→paid</th>
                  <th scope="col" className="n">Net paid</th>
                  <th scope="col" className="n">CAC</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((c) => {
                  const f = funnelSteps(acq.filter((e) => e.channel === c.channel));
                  const cell = (s: FunnelStep) => (
                    <td className="n">
                      {s.rate == null ? '–' : <span className={`rag-text rag-${s.rag}`}>{fmtPct(s.rate)}</span>}
                    </td>
                  );
                  return (
                    <tr key={c.channel}>
                      <th scope="row">{c.channel}</th>
                      <td className="n">{fmtInt(c.clicks)}</td>
                      {cell(f.steps[1])}
                      {cell(f.steps[2])}
                      {cell(f.steps[3])}
                      {cell(f.steps[4])}
                      <td className="n">{f.visitToPaid == null ? '–' : <span className={`rag-text rag-${f.visitToPaidRag}`}>{fmtPct(f.visitToPaid, 2)}</span>}</td>
                      <td className="n">{fmtInt(netPaid(c))}</td>
                      <td className="n">{fmtCac(cac(c))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="footnote">Colour: green at or above the stage target, amber within 20%, red below. The same targets apply to every channel; the plan expects creator traffic to convert about 1.5x the blend [A].</p>
      </Section>

      <Section id="weekly" title="Weekly charts against the targets" kicker="Plan of record, base case">
        <div className="grid-2">
          {chartPair('Visits', weekly.map((w, i) => (shown(i) ? w.clicks : null)), KPIS.weeklyTargets.map((t) => t.visits), (n) => fmtInt(n), 'Actual = /go/ clicks logged.')}
          {chartPair('Sign-ups', weekly.map((w, i) => (shown(i) ? w.signups : null)), KPIS.weeklyTargets.map((t) => t.signups), (n) => fmtInt(n))}
          {chartPair('Paid (gross new)', weekly.map((w, i) => (shown(i) ? w.paid : null)), KPIS.weeklyTargets.map((t) => t.paid), (n) => fmtInt(n))}
          {chartPair('Activated payers (north star)', weekly.map((w, i) => (shown(i) ? w.activated : null)), KPIS.weeklyTargets.map((t) => t.activatedPayers), (n) => fmtInt(n), 'Filled in 7 days after each day, so the latest week lags.')}
        </div>
      </Section>

      <Section id="mrr" title="Monthly revenue (MRR): new, lost and net" kicker="Rebuilt from the paying customers you logged">
        <Card>
          <Chart
            ariaLabel="Weekly new MRR, churned MRR and end-of-week net MRR against the weekly MRR target"
            labels={WEEKS}
            height={260}
            yFormat={fmtCompactUsd}
            series={[
              { id: 'new', name: 'New MRR', values: mrrWeeks.map((w) => w.newMrr), color: 'var(--c4)', kind: 'bar' },
              { id: 'churn', name: 'Churned MRR', values: mrrWeeks.map((w) => w.churnedMrr), color: 'var(--bad)', kind: 'bar' },
              { id: 'net', name: 'Net MRR (week end)', values: mrrWeeks.map((w) => w.netMrr), color: 'var(--c2)', width: 2.5 },
              { id: 'snap', name: 'Whop MRR snapshot', values: mrrWeeks.map((w) => w.snapshot), color: 'var(--ink)' },
              { id: 't', name: 'MRR target (kpis.json)', values: KPIS.weeklyTargets.map((t) => t.mrr), color: 'var(--c3)', dashed: true },
            ]}
          />
          <p className="footnote">
            New MRR = net new payers × net ARPU at the logged plan mix (Studio or Scale {fmtPct(analysis.est.studioShare.value, 0)}, yearly {fmtPct(analysis.est.yearlyShare.value, 0)}). Churned MRR = monthly subscribers lost at each 30-day renewal at{' '}
            {fmtPct(analysis.est.churn.value, 1)} a month ({analysis.est.churn.source}). Log renewals as channel "renewals" (paid = renewal payments) to replace the assumption with your own churn. Whop snapshots, when logged, are the truth for that week.
          </p>
        </Card>
        <MrrSnapshots snaps={snaps} setSnaps={setSnaps} readOnly={sample} />
      </Section>

      <Section id="cac" title="Cost per customer (CAC) and payback" kicker="Spend log and actuals · months until a customer has paid back what they cost">
        <div className="grid-2">
          <Card>
            <h3>Cost per customer by channel</h3>
            {cacCh.length === 0 ? (
              <Empty>Log spend on an actuals row (boosts, creators, listings) to read CAC by channel.</Empty>
            ) : (
              <Chart
                ariaLabel="Paid CAC by channel against the $50 target and the $120 ceiling"
                labels={cacCh.map((r) => r.label.replace(/^ch-/, ''))}
                height={220}
                yFormat={(n) => `$${Math.round(n)}`}
                refLines={[{ y: GUARD.cacTarget, label: '$50 target', color: 'var(--good)' }, { y: GUARD.cacCeiling, label: '$120 ceiling', color: 'var(--bad)' }]}
                series={[{ id: 'cac', name: 'CAC (spend ÷ net payers)', values: cacCh.map((r) => (r.cac != null && Number.isFinite(r.cac) ? r.cac : null)), color: 'var(--c2)', kind: 'bar' }]}
              />
            )}
          </Card>
          <Card>
            <h3>Payback months by channel</h3>
            {cacCh.length === 0 ? (
              <Empty>Appears with the first paid row.</Empty>
            ) : (
              <Chart
                ariaLabel="Months of contribution needed to pay back each channel's CAC"
                labels={cacCh.map((r) => r.label.replace(/^ch-/, ''))}
                height={220}
                yFormat={(n) => `${n.toFixed(1)}`}
                series={[{ id: 'pb', name: 'Payback (months)', values: cacCh.map((r) => (r.paybackMonths != null && Number.isFinite(r.paybackMonths) ? r.paybackMonths : null)), color: 'var(--c3)', kind: 'bar' }]}
              />
            )}
          </Card>
        </div>
        <div className="table-wrap" style={{ marginTop: 16 }}>
          <table>
            <caption className="sr">CAC and payback by budget line</caption>
            <thead>
              <tr>
                <th scope="col">Budget line</th>
                <th scope="col" className="n">Planned</th>
                <th scope="col" className="n">Spent</th>
                <th scope="col" className="n">Net payers</th>
                <th scope="col" className="n">CAC</th>
                <th scope="col" className="n">Payback</th>
                <th scope="col">Read</th>
              </tr>
            </thead>
            <tbody>
              {cacLines.map((r) => {
                const rag: Rag = r.spend <= 0 ? 'grey' : r.cac == null ? 'grey' : !Number.isFinite(r.cac) ? (r.spend >= GUARD.killZeroUsd ? 'red' : 'amber') : r.cac <= GUARD.cacTarget ? 'green' : r.cac <= GUARD.cacSoft ? 'amber' : 'red';
                return (
                  <tr key={r.key}>
                    <th scope="row" className="wrap">
                      <b>{r.key}</b> <span className="small muted">{r.label.split(/[:(]/)[0].slice(0, 48)}</span>
                    </th>
                    <td className="n">{fmtUsd(r.planned)}</td>
                    <td className="n">{r.spend ? fmtUsd(r.spend) : '–'}</td>
                    <td className="n">
                      {r.spend ? fmtInt(Math.round(r.netPaid * 10) / 10) : '–'}
                      {r.via && <span className="tiny muted"> ({r.via})</span>}
                    </td>
                    <td className="n">{r.spend ? fmtCac(r.cac) : '–'}</td>
                    <td className="n">{r.spend ? fmtMonths(r.paybackMonths) : '–'}</td>
                    <td>{r.spend ? <RagChip rag={rag}>{rag === 'green' ? '≤ $50' : rag === 'amber' ? 'Watch' : rag === 'red' ? 'Over target' : '–'}</RagChip> : <span className="tiny muted">not spent</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="footnote">
          Spend comes from the <a href={href('budget')}>spend log</a> when a line has payments there, otherwise from actuals rows tagged with the line. Net payers come from rows tagged with the line; when none are tagged, the line gets its share of its channel. Payback = CAC ÷ monthly contribution (about $13 on Create, $33 on Studio, $66 on Scale) at the channel's logged Studio or Scale share [E].
        </p>
      </Section>

      <div className="grid-2" style={{ marginTop: 48 }}>
        <Section id="best" title="Content leaderboard" kicker="Ids and /go/ codes in the notes" aside={<Segmented label="Rank content by" value={rankBy} onChange={setRankBy} options={[{ value: 'signups', label: 'Sign-ups' }, { value: 'paid', label: 'Paid' }]} />}>
          {ranking.length === 0 ? (
            <Empty>Put content ids (V01, C12) or /go/ codes (tt-v01-l1) in the notes to rank posts.</Empty>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col" className="n">Clicks</th>
                    <th scope="col" className="n">Sign-ups</th>
                    <th scope="col" className="n">Paid</th>
                    <th scope="col" className="n">Net</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((r, i) => (
                    <tr key={r.id}>
                      <td className="n muted">{i + 1}</td>
                      <td style={{ minWidth: 220 }}>
                        <a href={href('content', r.id)}>
                          <span className="item-id">{r.id}</span> <span className="small">{contentTitle(r.id)}</span>
                        </a>
                      </td>
                      <td className="n">{fmtInt(r.clicks)}</td>
                      <td className="n">{rankBy === 'signups' ? <b>{fmtInt(r.signups)}</b> : fmtInt(r.signups)}</td>
                      <td className="n">{rankBy === 'paid' ? <b>{fmtInt(r.paid)}</b> : fmtInt(r.paid)}</td>
                      <td className="n">{fmtInt(r.netPaid)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="footnote">A row that names several posts credits each of them, so totals can exceed the day's numbers. Re-cut the top 10% with two new hooks; retire the bottom half on Sunday.</p>
        </Section>
        <Section id="alerts" title="Alert rules" kicker="kpis.json">
          <div className="table-wrap" style={{ maxHeight: 460, overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Metric</th>
                  <th scope="col">Threshold</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {KPIS.alerts.map((a) => (
                  <tr key={a.metric + a.threshold}>
                    <td className="small">
                      <b>{a.metric}</b>
                    </td>
                    <td className="small num">{a.threshold}</td>
                    <td className="small">{a.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      <LoggedRows
        entries={entries}
        sample={sample}
        onEdit={onEditRow}
        onDelete={(e) => setEntries((cur) => cur.filter((x) => entryKey(x) !== entryKey(e)))}
        onClear={() => {
          if (window.confirm('Delete every logged row in this browser? Export first if you need a copy.')) {
            setEntries([]);
            setMsg('All rows cleared.');
          }
        }}
      />

      <Section id="files" title="Import and export" kicker="CSV and JSON, compatible with data/actuals.template.json">
        <div className="row">
          <label className={`btn btn-ghost btn-sm ${sample ? 'is-disabled' : ''}`} aria-disabled={sample || undefined}>
            Import CSV / JSON
            <input type="file" disabled={sample} accept=".csv,.json,text/csv,application/json" onChange={(e) => { void onImport(e.target.files?.[0]); e.target.value = ''; }} />
          </label>
          <button type="button" className="btn btn-ghost btn-sm" disabled={sample || !realEntries.length} onClick={() => downloadText(`actuals-${today}.json`, toActualsJson(realEntries, realSnaps))}>
            Export JSON
          </button>
          <button type="button" className="btn btn-ghost btn-sm" disabled={sample || !realEntries.length} onClick={() => downloadText(`actuals-${today}.csv`, toActualsCsv(realEntries), 'text/csv')}>
            Export CSV
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => downloadText('actuals-template.csv', CSV_HEADER.join(',') + '\r\n', 'text/csv')}>
            Blank CSV
          </button>
        </div>
        <p className="footnote">Keep exports out of the repository. Aggregate numbers only: no buyer names, emails or Whop IDs.</p>
        <Details summary="Where each number comes from">
          <dl className="kv small">
            {Object.entries(ACTUALS_TEMPLATE.meta.sourcesOfTruth as Record<string, string>).map(([k, v]) => (
              <div key={k} style={{ display: 'contents' }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="tiny muted">{String(ACTUALS_TEMPLATE.meta.privacy)}</p>
        </Details>
      </Section>
    </>
  );
}

function FunnelView({ steps }: { steps: FunnelStep[] }) {
  return (
    <div className="table-wrap">
      <table className="funnel">
        <caption className="sr">Funnel stages with counts, step conversion and the plan target</caption>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col" className="n">Count</th>
            <th scope="col" className="n">Step rate</th>
            <th scope="col" className="funnel-bar-col">Against target</th>
            <th scope="col">Read</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((s) => {
            const scale = s.target ? Math.min(1, (s.rate ?? 0) / (s.target * 1.5)) : 0;
            return (
              <tr key={s.id}>
                <th scope="row">{s.label}</th>
                <td className="n">
                  <b>{fmtInt(s.count)}</b>
                </td>
                <td className="n">
                  {s.rate == null ? '–' : fmtPct(s.rate, s.id === 'paid' || s.id === 'signups' ? 1 : 0)}
                  {s.rateLabel && <div className="tiny muted">{s.rateLabel}</div>}
                </td>
                <td className="funnel-bar-col">
                  {s.target != null ? (
                    <div className={`funnel-bar rag-${s.rag}`} aria-hidden="true">
                      <span style={{ width: `${scale * 100}%` }} />
                      <i style={{ left: `${(1 / 1.5) * 100}%` }} title="target" />
                    </div>
                  ) : (
                    <span className="tiny muted">top of funnel</span>
                  )}
                  {s.target != null && <div className="tiny muted">target {fmtPct(s.target, s.id === 'signups' ? 0 : 0)}</div>}
                </td>
                <td>{s.target != null ? <RagChip rag={s.rate == null ? 'grey' : s.rag} /> : null}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LoggedRows(props: { entries: ActualEntry[]; sample: boolean; onEdit: (e: ActualEntry) => void; onDelete: (e: ActualEntry) => void; onClear: () => void }) {
  const { entries, sample } = props;
  return (
    <Section
      id="rows"
      title={
        <>
          {sample ? 'SAMPLE rows' : 'Logged rows'} <span className="muted">· {entries.length}</span>
        </>
      }
      aside={
        !sample &&
        entries.length > 0 && (
          <button type="button" className="btn btn-sm btn-danger" onClick={props.onClear}>
            Clear all
          </button>
        )
      }
    >
      {entries.length === 0 ? (
        <Empty>No rows yet.</Empty>
      ) : (
        <div className="table-wrap" style={{ maxHeight: 520, overflowY: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Channel</th>
                <th scope="col" className="n">Spend</th>
                <th scope="col" className="n">Clicks</th>
                <th scope="col" className="n">Sign-ups</th>
                <th scope="col" className="n">Checkouts</th>
                <th scope="col" className="n">Paid</th>
                <th scope="col" className="n">Refunds</th>
                <th scope="col" className="n">Revenue</th>
                <th scope="col">Notes</th>
                {!sample && (
                  <th scope="col">
                    <span className="sr">Actions</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {[...entries].reverse().map((e) => (
                <tr key={entryKey(e)}>
                  <td className="num">{e.date}</td>
                  <td>{e.channel}</td>
                  <td className="n">{e.spend == null ? '–' : fmtUsd(e.spend, true)}</td>
                  <td className="n">{fmtInt(e.clicks)}</td>
                  <td className="n">{fmtInt(e.signups)}</td>
                  <td className="n">{fmtInt(e.checkouts)}</td>
                  <td className="n">{fmtInt(e.paid)}</td>
                  <td className="n">{fmtInt(e.refunds)}</td>
                  <td className="n">{e.revenue == null ? '–' : fmtUsd(e.revenue)}</td>
                  <td className="small">{e.notes}</td>
                  {!sample && (
                    <td>
                      <div className="row" style={{ flexWrap: 'nowrap' }}>
                        <button type="button" className="btn btn-sm btn-ghost" aria-label={`Edit ${e.date} in the day sheet`} onClick={() => props.onEdit(e)}>
                          Edit
                        </button>
                        <button type="button" className="btn btn-sm btn-danger" aria-label={`Delete ${e.date} ${e.channel}`} onClick={() => props.onDelete(e)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}

function MrrSnapshots({ snaps, setSnaps, readOnly }: { snaps: { date: string; mrr: number }[]; setSnaps: (f: (p: { date: string; mrr: number }[]) => { date: string; mrr: number }[]) => void; readOnly: boolean }) {
  const [d, setD] = useState(sarajevoToday());
  const [v, setV] = useState('');
  return (
    <Details summary={`Whop MRR snapshots (${snaps.length}) · the truth for that week, and the forecast's starting point`}>
      {readOnly ? (
        <p className="small muted">Snapshots are off while the SAMPLE is shown.</p>
      ) : (
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isIsoDate(d) || v === '' || !Number.isFinite(Number(v))) return;
            setSnaps((cur) => [...cur.filter((s) => s.date !== d), { date: d, mrr: Number(v) }].sort((a, b) => a.date.localeCompare(b.date)));
            setV('');
          }}
        >
          <input type="date" aria-label="Snapshot date" value={d} onChange={(e) => setD(e.target.value)} style={{ width: 170 }} />
          <input type="number" aria-label="MRR in USD" min={0} step="0.01" placeholder="MRR (USD)" value={v} onChange={(e) => setV(e.target.value)} style={{ width: 160 }} />
          <button type="submit" className="btn btn-sm">
            Add snapshot
          </button>
        </form>
      )}
      {snaps.length > 0 && (
        <ul className="list small" style={{ marginTop: 8 }}>
          {snaps.map((s) => (
            <li key={s.date} className="row-between">
              <span className="num">
                {s.date} · W{planWeek(s.date)} · <b>{fmtUsd(s.mrr)}</b>
              </span>
              {!readOnly && (
                <button type="button" className="btn btn-sm btn-danger" onClick={() => setSnaps((cur) => cur.filter((x) => x.date !== s.date))}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </Details>
  );
}


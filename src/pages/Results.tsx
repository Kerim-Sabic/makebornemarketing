import { useEffect, useMemo, useState } from 'react';
import kpisJson from '../../data/kpis.json';
import checkpointsJson from '../../data/checkpoints.json';
import type { Checkpoint, Kpis } from '../lib/types';
import { useActuals, useMrrSnapshots, useSpendLog } from '../lib/stores';
import { fmtCompactUsd, fmtDate, fmtUsd, planWeek, sarajevoToday, WINDOW_START } from '../lib/util';
import { analyse, DAY90, MIN_DAYS, runForecast, type Forecast } from '../lib/forecast';
import { weekActions } from '../lib/analytics';
import { planBase } from '../lib/planRates';
import { SAMPLE_AS_OF, sampleData } from '../lib/sample';
import { weekPace } from '../lib/pace';
import { DaySheet } from '../components/DaySheet';
import { Card, Folds, Page, Term } from '../components/ui';
import { AnalyticsPanels } from './Analytics';
import { PredictionsPanels } from './Predictions';
import { href, type RouteProps } from '../routes';
import { plain } from '../lib/plain';

const KPIS = kpisJson as unknown as Kpis;
/** The analytics rules' verbs, in plain words for the verdict. */
const VERB: Record<string, string> = { Kill: 'Stop', Scale: 'Spend more', Freeze: 'Hold' };
const CHECKPOINTS = (checkpointsJson as unknown as { checkpoints: Checkpoint[] }).checkpoints;

export default function Results({ params }: RouteProps) {
  const sample = params[0] === 'sample';
  const section = sample ? params[1] : params[0];
  const [realEntries, setEntries] = useActuals();
  const [realSnaps] = useMrrSnapshots();
  const [realLog] = useSpendLog();
  const S = sample ? sampleData() : null;
  const entries = S ? S.entries : realEntries;
  const snaps = S ? S.snaps : realSnaps;
  const log = S ? S.spend : realLog;
  const today = sarajevoToday();
  const asOf = S ? SAMPLE_AS_OF : today;
  const [msg, setMsg] = useState('');
  const [sheetDate, setSheetDate] = useState(() => (today < WINDOW_START ? WINDOW_START : today));

  const analysis = useMemo(() => analyse(entries, { asOf, snaps }), [entries, asOf, snaps]);
  const fc = useMemo<Forecast | null>(() => (analysis.status === 'ok' ? runForecast(analysis) : null), [analysis]);
  const week = Math.max(1, Math.min(13, planWeek(asOf)));
  const pace = weekPace(entries, asOf, KPIS.weeklyTargets[week - 1]);
  const plan = useMemo(() => weekActions(entries, log, asOf, CHECKPOINTS, analysis), [entries, log, asOf, analysis]);

  useEffect(() => {
    if (!section || section === 'entry') return;
    const raf = requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(raf);
  }, [section]);

  const d90 = fc?.horizons.find((h) => h.date === DAY90) ?? fc?.horizons[fc.horizons.length - 1];
  const base = planBase().summary;
  const todo = plan.actions.filter((a) => a.tone !== 'muted').slice(0, 2);

  return (
    <Page
      eyebrow={sample ? 'SAMPLE data · invented numbers · nothing is saved' : `Week ${week} · numbers stay in this browser`}
      title={
        <>
          Your <em>numbers</em>
        </>
      }
      lede="Each evening, type today's numbers into the table. The verdict under it says whether you are on track and what to do this week."
      actions={
        sample ? (
          <a className="btn btn-accent btn-sm" href={href('results')}>
            Leave sample
          </a>
        ) : (
          <a className="btn btn-ghost btn-sm" href={href('results', 'sample')}>
            Show SAMPLE data
          </a>
        )
      }
    >
      {sample && (
        <div className="notice sample-banner" role="note" style={{ marginBottom: 20 }}>
          <b>SAMPLE</b>
          <span>
            28 invented days (29 Oct - 25 Nov 2026) so you can see every panel working. Your own rows are untouched and hidden while this is on. <a href={href('results')}>Back to your data</a>.
          </span>
        </div>
      )}

      <section className="section-first" aria-labelledby="entry-h" id="entry">
        <div className="section-head">
          <div>
            <p className="kicker">One row per channel · leave a cell empty when you do not know it · tap a column name for its meaning</p>
            <h2 id="entry-h">Today's entry</h2>
          </div>
        </div>
        {sample ? (
          <p className="empty">Entry is off while the SAMPLE is shown, so invented numbers never reach your log.</p>
        ) : (
          <Card>
            <DaySheet date={sheetDate} setDate={setSheetDate} entries={realEntries} setEntries={setEntries} onMsg={setMsg} />
          </Card>
        )}
        <p className="small muted" role="status" aria-live="polite" style={{ minHeight: 20, marginTop: 8 }}>
          {msg}
        </p>
      </section>

      <Card className="card-ink verdict">
        <p className="kicker" style={{ color: 'inherit', opacity: 0.75 }}>
          The verdict · as of {fmtDate(asOf)}
        </p>
        <ol className="verdict-list">
          <li>
            <b>{pace.status === 'none' ? 'Not logged yet.' : `${pace.headline}.`}</b> {pace.detail}
          </li>
          <li>
            <b>This week:</b>{' '}
            {todo.length ? plain(todo.map((a) => `${VERB[a.verb] ?? a.verb}: ${a.text}`).join(' ')) :'Follow the plan: post every day, reach out, and log the numbers. No paid source has enough data to change yet.'}{' '}
            {plan.reinvest.amount > 0 && `Put ${fmtUsd(plan.reinvest.amount)} of revenue back into the best source on Monday.`}
          </li>
          <li>
            <b>25 Jan (day 90) forecast:</b>{' '}
            {fc && d90 ? (
              <>
                about {fmtCompactUsd(d90.mrr.p50)} <Term t="MRR">monthly revenue</Term> (likely {fmtCompactUsd(d90.mrr.p10)} to {fmtCompactUsd(d90.mrr.p90)}), against the plan's {fmtCompactUsd(base.mrrEnd)}.
              </>
            ) : (
              <>
                not yet: the forecast starts after {MIN_DAYS} logged days ({analysis.obs.dataDays} so far). Until then the plan says about {fmtCompactUsd(base.mrrEnd)} <Term t="MRR">monthly revenue</Term> ({fmtCompactUsd(base.arrEnd)} a year).
              </>
            )}
          </li>
        </ol>
      </Card>

      <div className="section">
        <div className="section-head">
          <div>
            <p className="kicker">Optional · tap a panel to open it</p>
            <h2>The detail</h2>
          </div>
        </div>
        <Folds open={section}>
          <div className="folds">
            <AnalyticsPanels
              sample={sample}
              setMsg={setMsg}
              onEditRow={(e) => {
                setSheetDate(e.date);
                const el = document.getElementById('entry');
                el?.scrollIntoView();
                window.setTimeout(() => el?.querySelector<HTMLInputElement>('.daysheet input')?.focus({ preventScroll: true }), 50);
              }}
            />
            <PredictionsPanels entries={entries} analysis={analysis} fc={fc} />
          </div>
        </Folds>
      </div>
    </Page>
  );
}

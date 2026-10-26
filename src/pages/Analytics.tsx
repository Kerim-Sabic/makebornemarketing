import { useMemo, useState } from 'react';
import kpisJson from '../../data/kpis.json';
import type { ActualEntry, Kpis } from '../lib/types';
import {
  ACTUALS_TEMPLATE, BUDGET_LINE_IDS, CHANNELS, CSV_HEADER, acquisition, aggregate, byChannel, byWeek, cac, contentIdsIn,
  entryKey, mergeEntries, netPaid, parseActualsText, sourceVerdict, toActualsCsv, toActualsJson,
} from '../lib/actuals';
import { useActuals, useMrrSnapshots } from '../lib/stores';
import { addDays, downloadText, fmtCompactUsd, fmtInt, fmtPct, fmtUsd, isIsoDate, planWeek, readFileText, sarajevoToday, WINDOW_START } from '../lib/util';
import { contentTitle } from '../lib/contentIndex';
import { Card, Chip, Details, Empty, Field, Page, Section, Stat } from '../components/ui';
import { Chart } from '../components/Chart';
import { href } from '../routes';

const KPIS = kpisJson as unknown as Kpis;
const WEEKS = KPIS.weeklyTargets.map((w) => `W${w.week}`);
const BASE_NET_ARPU = 36.91; // data/funnel.json base scenario netArpu, used only for the MRR proxy

const blank = (): ActualEntry => ({
  date: sarajevoToday() < WINDOW_START ? WINDOW_START : sarajevoToday(),
  channel: 'ch-tiktok', spend: null, impressions: null, views: null, clicks: null, signups: null, paid: null, revenue: null,
  notes: '', campaign: 'launch-2026-10', budgetLineId: null, refunds: null, activated: null, studioOrScale: null,
});

export default function Analytics() {
  const [entries, setEntries] = useActuals();
  const [snaps, setSnaps] = useMrrSnapshots();
  const [draft, setDraft] = useState<ActualEntry>(blank);
  const [msg, setMsg] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const acq = acquisition(entries);
  const tot = aggregate(acq);
  const weekly = useMemo(() => byWeek(entries), [entries]);
  const channels = useMemo(() => byChannel(entries).sort((a, b) => b.paid - a.paid || b.signups - a.signups), [entries]);
  const unknownPaid = acq.filter((e) => e.channel === 'unknown').reduce((s, e) => s + (e.paid ?? 0), 0);
  const today = sarajevoToday();
  const currentWeek = Math.max(1, Math.min(13, planWeek(today)));
  const shown = (i: number) => i + 1 <= currentWeek || weekly[i].rows > 0;

  // MRR: Whop snapshots when logged, otherwise a labelled proxy (cumulative net payers × base net ARPU, no churn).
  const mrrSeries = WEEKS.map((_, i) => {
    if (!shown(i)) return null;
    const end = addDays(WINDOW_START, (i + 1) * 7 - 1);
    const snap = [...snaps].filter((s) => s.date <= end).sort((a, b) => a.date.localeCompare(b.date)).pop();
    if (snap && snap.date >= addDays(WINDOW_START, i * 7)) return snap.mrr;
    const net = weekly.slice(0, i + 1).reduce((a, w) => a + w.paid - w.refunds, 0);
    return net * BASE_NET_ARPU;
  });

  const contentRank = useMemo(() => {
    const m = new Map<string, { signups: number; paid: number; clicks: number; rows: number }>();
    for (const e of acq) {
      for (const id of contentIdsIn(e.notes)) {
        const r = m.get(id) ?? { signups: 0, paid: 0, clicks: 0, rows: 0 };
        r.signups += e.signups ?? 0;
        r.paid += e.paid ?? 0;
        r.clicks += e.clicks ?? 0;
        r.rows += 1;
        m.set(id, r);
      }
    }
    return [...m.entries()].sort((a, b) => b[1].signups - a[1].signups || b[1].paid - a[1].paid).slice(0, 12);
  }, [acq]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isIsoDate(draft.date)) return setMsg('Pick a date.');
    const key = entryKey(draft);
    const exists = editingKey != null || entries.some((x) => entryKey(x) === key);
    // Editing a row and changing its date, channel, campaign or budget line moves it instead of copying it.
    const replaced = editingKey;
    setEntries((cur) => mergeEntries(replaced && replaced !== key ? cur.filter((x) => entryKey(x) !== replaced) : cur, [{ ...draft }]));
    setEditingKey(null);
    setMsg(exists ? `Updated ${draft.date} · ${draft.channel}.` : `Saved ${draft.date} · ${draft.channel}.`);
    setDraft({ ...blank(), date: draft.date, channel: draft.channel, campaign: draft.campaign });
  };

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

  const num = (k: keyof ActualEntry, label: string, step = '1') => (
    <Field label={label}>
      {(id) => (
        <input
          id={id}
          type="number"
          min={0}
          step={step}
          inputMode="decimal"
          value={(draft[k] as number | null) ?? ''}
          placeholder="unknown"
          onChange={(e) => setDraft({ ...draft, [k]: e.target.value === '' ? null : Number(e.target.value) })}
        />
      )}
    </Field>
  );

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

  return (
    <Page
      eyebrow="Daily actuals · localStorage · compatible with data/actuals.template.json"
      title={
        <>
          What <em>actually</em> happened
        </>
      }
      lede="Log one row per channel per day. Leave a field empty when it is unknown, never type 0 for unknown. Aggregate numbers only: no buyer names, emails or Whop IDs."
      actions={
        <div className="row">
          <label className="btn btn-ghost btn-sm">
            Import CSV / JSON
            <input type="file" accept=".csv,.json,text/csv,application/json" onChange={(e) => { void onImport(e.target.files?.[0]); e.target.value = ''; }} />
          </label>
          <button type="button" className="btn btn-ghost btn-sm" disabled={!entries.length} onClick={() => downloadText(`actuals-${today}.json`, toActualsJson(entries, snaps))}>
            Export JSON
          </button>
          <button type="button" className="btn btn-ghost btn-sm" disabled={!entries.length} onClick={() => downloadText(`actuals-${today}.csv`, toActualsCsv(entries), 'text/csv')}>
            Export CSV
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => downloadText('actuals-template.csv', CSV_HEADER.join(',') + '\r\n', 'text/csv')}>
            Blank CSV
          </button>
        </div>
      }
    >
      <p className="small muted" role="status" aria-live="polite" style={{ minHeight: 20, marginTop: -16 }}>
        {msg}
      </p>

      <div className="statband">
        <Stat label="Visits (/go/ clicks)" value={fmtInt(tot.clicks)} sub={`${fmtInt(tot.views)} views logged`} />
        <Stat label="Sign-ups" value={fmtInt(tot.signups)} sub={tot.clicks ? `${fmtPct(tot.signups / tot.clicks)} of visits` : '–'} />
        <Stat label="Gross / net paid" value={`${fmtInt(tot.paid)} / ${fmtInt(netPaid(tot))}`} sub={tot.signups ? `${fmtPct(tot.paid / tot.signups)} of sign-ups` : '–'} />
        <Stat label="First-payment revenue" value={fmtUsd(tot.revenue)} sub="gross of fees" />
        <Stat label="Blended paid CAC" value={(() => { const c = cac(aggregate(acq.filter((e) => (e.spend ?? 0) > 0))); return c == null ? '–' : Number.isFinite(c) ? fmtUsd(c) : '∞'; })()} sub={`${fmtUsd(tot.spend)} spend logged`} />
        <Stat label="Attribution coverage" value={tot.paid ? fmtPct(1 - unknownPaid / tot.paid, 0) : '–'} tone={tot.paid && 1 - unknownPaid / tot.paid < 0.9 ? 'warn' : undefined} sub="target ≥ 90% from week 2" />
      </div>

      <Section id="entry" title="Add a day" kicker="One row per channel per day">
        <Card>
          <form onSubmit={save} aria-label="Daily actuals entry">
            <div className="form-grid">
              <Field label="Date">{(id) => <input id={id} type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} required />}</Field>
              <Field label="Channel">
                {(id) => (
                  <select id={id} value={draft.channel} onChange={(e) => setDraft({ ...draft, channel: e.target.value })}>
                    {CHANNELS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              {num('spend', 'Spend (USD)', '0.01')}
              {num('impressions', 'Impressions')}
              {num('views', 'Views')}
              {num('clicks', '/go/ clicks')}
              {num('signups', 'Sign-ups')}
              {num('paid', 'Paid (gross)')}
              {num('revenue', 'Revenue (USD)', '0.01')}
              {num('refunds', 'Refunds')}
              {num('activated', 'Activated (7 d later)')}
              {num('studioOrScale', 'Studio or Scale')}
              <Field label="Campaign">{(id) => <input id={id} type="text" value={draft.campaign ?? ''} onChange={(e) => setDraft({ ...draft, campaign: e.target.value || null })} />}</Field>
              <Field label="Budget line">
                {(id) => (
                  <select id={id} value={draft.budgetLineId ?? ''} onChange={(e) => setDraft({ ...draft, budgetLineId: e.target.value || null })}>
                    <option value="">none</option>
                    {BUDGET_LINE_IDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <Field label="Notes: post ids, hook codes, beat tags" className="wide" hint="Content ids (V01, C12) or /go/ codes (tt-v01-l1) here feed 'best content'.">
                {(id) => <input id={id} type="text" value={draft.notes} maxLength={300} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="tt-v01-l1, ig-v01-l1; beat:images" />}
              </Field>
            </div>
            <div className="row" style={{ marginTop: 14 }}>
              <button className="btn btn-accent" type="submit">
                {editingKey ? 'Save changes' : 'Save row'}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setDraft(blank());
                  setEditingKey(null);
                }}
              >
                {editingKey ? 'Cancel edit' : 'Clear form'}
              </button>
              <span className="tiny muted">
                {editingKey ? `Editing ${editingKey.split('|').filter(Boolean).join(' · ')}: saving replaces that row.` : 'Same date + channel + campaign + budget line replaces the earlier row.'}
              </span>
            </div>
          </form>
        </Card>
        <Details summary="Sources of truth for each field">
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

      <Section id="weekly" title="Against the weekly targets" kicker="Plan of record, base case">
        {entries.length === 0 && (
          <div className="notice" style={{ marginBottom: 16 }}>
            <b>No actuals yet.</b>
            <span>The charts show the targets; bars appear as rows are logged or imported.</span>
          </div>
        )}
        <div className="grid-2">
          {chartPair('Visits', weekly.map((w, i) => (shown(i) ? w.clicks : null)), KPIS.weeklyTargets.map((t) => t.visits), (n) => fmtInt(n), 'Actual = /go/ clicks logged; the counter cannot attribute visits yet.')}
          {chartPair('Sign-ups', weekly.map((w, i) => (shown(i) ? w.signups : null)), KPIS.weeklyTargets.map((t) => t.signups), (n) => fmtInt(n))}
          {chartPair('Paid (gross new)', weekly.map((w, i) => (shown(i) ? w.paid : null)), KPIS.weeklyTargets.map((t) => t.paid), (n) => fmtInt(n))}
          {chartPair('MRR', mrrSeries, KPIS.weeklyTargets.map((t) => t.mrr), fmtCompactUsd, `Uses your Whop MRR snapshot for the week when logged; otherwise a proxy of cumulative net payers × $${BASE_NET_ARPU} base net ARPU with no churn [E].`)}
        </div>
        <MrrSnapshots snaps={snaps} setSnaps={setSnaps} />
      </Section>

      <Section id="channels" title="Conversion by channel" kicker="Kill / scale rules applied (strategy 6.3)">
        {channels.length === 0 ? (
          <Empty>Channel rows appear once actuals are logged.</Empty>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Channel</th>
                  <th className="n">Spend</th>
                  <th className="n">Views</th>
                  <th className="n">Clicks</th>
                  <th className="n">View→click</th>
                  <th className="n">Sign-ups</th>
                  <th className="n">Click→sign-up</th>
                  <th className="n">Paid</th>
                  <th className="n">Refunds</th>
                  <th className="n">Sign-up→paid</th>
                  <th className="n">CAC</th>
                  <th className="n">Studio+</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((c) => {
                  const v = sourceVerdict(c);
                  const k = cac(c);
                  return (
                    <tr key={c.channel}>
                      <td>
                        <b>{c.channel}</b>
                      </td>
                      <td className="n">{fmtUsd(c.spend)}</td>
                      <td className="n">{fmtInt(c.views)}</td>
                      <td className="n">{fmtInt(c.clicks)}</td>
                      <td className="n">{c.views ? fmtPct(c.clicks / c.views, 2) : '–'}</td>
                      <td className="n">{fmtInt(c.signups)}</td>
                      <td className="n">{c.clicks ? fmtPct(c.signups / c.clicks) : '–'}</td>
                      <td className="n">{fmtInt(c.paid)}</td>
                      <td className="n">{fmtInt(c.refunds)}</td>
                      <td className="n">{c.signups ? fmtPct(c.paid / c.signups) : '–'}</td>
                      <td className="n">{k == null ? '–' : Number.isFinite(k) ? fmtUsd(k) : '∞'}</td>
                      <td className="n">{c.paid ? fmtPct(c.studioOrScale / c.paid, 0) : '–'}</td>
                      <td>
                        <Chip tone={v.tone}>{v.label}</Chip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <div className="grid-2" style={{ marginTop: 48 }}>
        <Section id="best" title="Best content by sign-ups" kicker="From ids and /go/ codes in notes">
          {contentRank.length === 0 ? (
            <Empty>Put content ids (V01, C12) or /go/ codes (tt-v01-l1) in the notes field to rank posts.</Empty>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="n">Clicks</th>
                    <th className="n">Sign-ups</th>
                    <th className="n">Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {contentRank.map(([id, r]) => (
                    <tr key={id}>
                      <td>
                        <a href={href('content', id)}>
                          <span className="item-id">{id}</span> <span className="small">{contentTitle(id)}</span>
                        </a>
                      </td>
                      <td className="n">{fmtInt(r.clicks)}</td>
                      <td className="n">
                        <b>{fmtInt(r.signups)}</b>
                      </td>
                      <td className="n">{fmtInt(r.paid)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="footnote">A row that names several posts credits each of them (first-touch attribution per post needs ask 1).</p>
        </Section>
        <Section id="alerts" title="Alert rules" kicker="kpis.json">
          <div className="table-wrap" style={{ maxHeight: 460, overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Threshold</th>
                  <th>Action</th>
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

      <Section id="rows" title={<>Logged rows <span className="muted">· {entries.length}</span></>} aside={entries.length > 0 && (
        <button type="button" className="btn btn-sm btn-danger" onClick={() => { if (window.confirm('Delete every logged row in this browser? Export first if you need a copy.')) { setEntries([]); setMsg('All rows cleared.'); } }}>
          Clear all
        </button>
      )}>
        {entries.length === 0 ? (
          <Empty>No rows yet.</Empty>
        ) : (
          <div className="table-wrap" style={{ maxHeight: 520, overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Channel</th>
                  <th className="n">Spend</th>
                  <th className="n">Views</th>
                  <th className="n">Clicks</th>
                  <th className="n">Sign-ups</th>
                  <th className="n">Paid</th>
                  <th className="n">Revenue</th>
                  <th>Notes</th>
                  <th>
                    <span className="sr">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...entries].reverse().map((e) => (
                  <tr key={entryKey(e)}>
                    <td className="num">{e.date}</td>
                    <td>{e.channel}</td>
                    <td className="n">{e.spend == null ? '–' : fmtUsd(e.spend, true)}</td>
                    <td className="n">{fmtInt(e.views)}</td>
                    <td className="n">{fmtInt(e.clicks)}</td>
                    <td className="n">{fmtInt(e.signups)}</td>
                    <td className="n">{fmtInt(e.paid)}</td>
                    <td className="n">{e.revenue == null ? '–' : fmtUsd(e.revenue)}</td>
                    <td className="small">{e.notes}</td>
                    <td>
                      <div className="row" style={{ flexWrap: 'nowrap' }}>
                        <button type="button" className="btn btn-sm btn-ghost" onClick={() => {
                            setDraft({ ...e });
                            setEditingKey(entryKey(e));
                            const form = document.getElementById('entry');
                            form?.scrollIntoView();
                            form?.querySelector<HTMLInputElement>('input[type="date"]')?.focus({ preventScroll: true });
                          }}>
                          Edit
                        </button>
                        <button type="button" className="btn btn-sm btn-danger" aria-label={`Delete ${e.date} ${e.channel}`} onClick={() => setEntries((cur) => cur.filter((x) => entryKey(x) !== entryKey(e)))}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </Page>
  );
}

function MrrSnapshots({ snaps, setSnaps }: { snaps: { date: string; mrr: number }[]; setSnaps: (f: (p: { date: string; mrr: number }[]) => { date: string; mrr: number }[]) => void }) {
  const [d, setD] = useState(sarajevoToday());
  const [v, setV] = useState('');
  return (
    <Details summary={`Whop MRR snapshots (${snaps.length}) · replaces the proxy for that week`}>
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
      {snaps.length > 0 && (
        <ul className="list small" style={{ marginTop: 8 }}>
          {snaps.map((s) => (
            <li key={s.date} className="row-between">
              <span className="num">
                {s.date} · W{planWeek(s.date)} · <b>{fmtUsd(s.mrr)}</b>
              </span>
              <button type="button" className="btn btn-sm btn-danger" onClick={() => setSnaps((cur) => cur.filter((x) => x.date !== s.date))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </Details>
  );
}

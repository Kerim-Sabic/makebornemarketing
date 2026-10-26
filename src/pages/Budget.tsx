import { useState } from 'react';
import { LINES, LINE_WEEKS, PLAN, TOTAL, defaultAllocation, plannedCumulative } from '../lib/budget';
import { useAllocation, useSpendLog, type SpendEntry } from '../lib/stores';
import { addDays, DAY90, downloadText, fmtUsd, isIsoDate, planWeek, readFileText, sarajevoToday, uid, WINDOW_START } from '../lib/util';
import { Card, Details, Field, Page, Progress, Section, Stat } from '../components/ui';
import { Chart } from '../components/Chart';
import { href } from '../routes';

const WEEK_LABELS = Array.from({ length: 13 }, (_, i) => `W${i + 1}`);

export default function Budget() {
  const [stored, setAlloc] = useAllocation();
  const alloc = { ...defaultAllocation(), ...(stored ?? {}) };
  const [log, setLog] = useSpendLog();
  const total = Object.values(alloc).reduce((a, b) => a + b, 0);
  const delta = total - TOTAL;
  const changed = LINES.some((l) => alloc[l.id] !== l.usd);
  const spentBy = (id: string) => log.filter((e) => e.lineId === id).reduce((s, e) => s + e.usd, 0);
  const spent = log.reduce((s, e) => s + e.usd, 0);

  const setLine = (id: string, v: number) => setAlloc({ ...alloc, [id]: Math.max(0, Math.round(Number.isFinite(v) ? v : 0)) });

  const planned = plannedCumulative(alloc);
  const plannedWithReserve = plannedCumulative(alloc, true);
  const actualByWeek: (number | null)[] = WEEK_LABELS.map((_, i) => {
    const end = i >= 12 ? DAY90 : addDays(WINDOW_START, (i + 1) * 7 - 1); // week 13 also holds day 90 (Mon 25 Jan)
    const startOfWeek = addDays(WINDOW_START, i * 7);
    if (startOfWeek > sarajevoToday() && !log.some((e) => e.date >= startOfWeek)) return null;
    return log.filter((e) => e.date <= end).reduce((s, e) => s + e.usd, 0);
  });

  return (
    <Page
      eyebrow="$1,000 · one concentrated test"
      title={
        <>
          Every dollar <em>behind a gate</em>
        </>
      }
      lede="Move money between lines, keep the total at $1,000, and log every payment. Allocation and spend log are saved in this browser only; export them to keep a private copy."
    >
      <div className="notice notice-bad" style={{ marginBottom: 28 }}>
        <b>Spend gate.</b>
        <span>{PLAN.budget.gate}</span>
      </div>

      <div className="statband" style={{ marginBottom: 40 }}>
        <Stat label="Allocated" value={fmtUsd(total)} tone={delta === 0 ? 'good' : 'bad'} sub={delta === 0 ? 'Sum check passes' : delta > 0 ? `${fmtUsd(delta)} over $1,000` : `${fmtUsd(-delta)} unallocated`} />
        <Stat label="Spent (log)" value={fmtUsd(spent, true)} sub={`${log.length} payment${log.length === 1 ? '' : 's'}`} />
        <Stat label="Remaining" value={fmtUsd(TOTAL - spent, true)} sub="of the cash budget" />
        <Stat label="Planned by week 4" value={fmtUsd(planned[3])} sub="[E] pace, reserve excluded" />
      </div>

      <Section
        id="allocator"
        title="Allocator"
        kicker="Starts from plan.json"
        aside={
          <div className="row">
            <span className={`sumcheck ${delta === 0 ? 'ok' : 'off'}`} role="status" aria-live="polite">
              {delta === 0 ? '✓ Sums to $1,000' : delta > 0 ? `Over by ${fmtUsd(delta)}` : `Under by ${fmtUsd(-delta)}`}
            </span>
            {delta !== 0 && (
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => setLine('b9', (alloc.b9 ?? 0) - delta)} disabled={(alloc.b9 ?? 0) - delta < 0}>
                Balance into reserve
              </button>
            )}
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setAlloc(null)} disabled={!changed}>
              Reset to plan
            </button>
          </div>
        }
      >
        <Card>
          {LINES.map((l) => {
            const v = alloc[l.id] ?? 0;
            const s = spentBy(l.id);
            return (
              <div className="alloc-row" key={l.id}>
                <div style={{ minWidth: 0 }}>
                  <div className="row" style={{ gap: 6 }}>
                    <span className="item-id">{l.id}</span>
                    <b className="small">{l.item.split(/[:(]/)[0].trim()}</b>
                  </div>
                  <div className="tiny muted" style={{ marginTop: 2 }}>
                    {l.when}
                  </div>
                  <Details summary={<span className="tiny">Rules {LINE_WEEKS[l.id]?.some((w) => w.estimated) ? '· timing [E]' : ''}</span>}>
                    <p className="small" style={{ margin: '0 0 6px' }}>{l.item}</p>
                    <p className="small" style={{ margin: '0 0 4px' }}>
                      <b className="bad-dot">Kill:</b> {l.killRule}
                    </p>
                    <p className="small" style={{ margin: 0 }}>
                      <b className="ok-dot">Scale:</b> {l.scaleRule}
                    </p>
                  </Details>
                </div>
                <div className="alloc-slider">
                  <input type="range" min={0} max={TOTAL} step={1} value={v} onChange={(e) => setLine(l.id, Number(e.target.value))} aria-label={`${l.id} ${l.item.split(/[:(]/)[0].trim()} amount`} />
                  <div className="row-between tiny muted">
                    <span>
                      plan {fmtUsd(l.usd)} · {((v / TOTAL) * 100).toFixed(1)}%
                    </span>
                    <span className={s > v ? 'bad-dot' : ''}>spent {fmtUsd(s)}</span>
                  </div>
                  <Progress value={s} max={v || 1} tone={s > v ? 'bad' : 'accent'} label={`${l.id} spent of allocation`} />
                </div>
                <Field label={`${l.id} USD`}>{(id) => <input id={id} type="number" min={0} step={1} inputMode="numeric" value={v} onChange={(e) => setLine(l.id, Number(e.target.value))} />}</Field>
              </div>
            );
          })}
        </Card>
      </Section>

      <Section id="pace" title="Spend against plan" kicker="Cumulative by week">
        <Card>
          <Chart
            ariaLabel="Cumulative planned and actual spend by week"
            labels={WEEK_LABELS}
            yFormat={(n) => `$${Math.round(n)}`}
            refLines={[{ y: TOTAL, label: '$1,000 cash', color: 'var(--bad)' }]}
            series={[
              { id: 'p', name: 'Planned (reserve held)', values: planned, color: 'var(--c5)', kind: 'area' },
              { id: 'pr', name: 'Planned incl. reserve', values: plannedWithReserve, color: 'var(--c3)', dashed: true },
              { id: 'a', name: 'Actual (spend log)', values: actualByWeek, color: 'var(--c2)', width: 2.5 },
            ]}
          />
          <p className="footnote">
            Week placement of b2–b5 and b9 comes from data/funnel.json. b1 is day 1; b6 (week 4), b7 (week 3) and b8 (weeks 3–6) are our placement <abbr className="ev ev-E">E</abbr>. The reserve (b9) is released only by the scale rule.
          </p>
        </Card>
      </Section>

      <SpendLog log={log} setLog={setLog} alloc={alloc} />

      <Section id="rules" title="Kill and scale rules" kicker="Every source">
        <div className="grid-3">
          <Card>
            <h3>CAC targets</h3>
            <dl className="kv">
              <dt>Create-heavy</dt>
              <dd className="num">≤ {fmtUsd(PLAN.budget.sharedRules.cacTargets.createHeavy)}</dd>
              <dt>Blended, Studio 35%+</dt>
              <dd className="num">≤ {fmtUsd(PLAN.budget.sharedRules.cacTargets.blendedStudio35plus)}</dd>
              <dt>Hard ceiling</dt>
              <dd className="num">{fmtUsd(PLAN.budget.sharedRules.cacTargets.hardCeiling)}</dd>
            </dl>
          </Card>
          {(
            [
              ['Kill a source', PLAN.budget.sharedRules.killSource, 'bad'],
              ['Refund brake', PLAN.budget.sharedRules.refundBrake, 'bad'],
              ['Scale', PLAN.budget.sharedRules.scale, 'good'],
              ['Offer check', PLAN.budget.sharedRules.offerCheck, 'warn'],
              ['Reinvestment (D4, owner decision)', PLAN.budget.sharedRules.reinvestment, 'owner'],
              ['Content Rewards', PLAN.budget.sharedRules.contentRewards, 'muted'],
            ] as const
          ).map(([h, t]) => (
            <Card key={h}>
              <h3>{h}</h3>
              <p className="small" style={{ margin: 0 }}>
                {t}
              </p>
            </Card>
          ))}
        </div>
        <p className="footnote">
          Per-source verdicts from logged actuals are on the <a href={href('analytics')}>analytics page</a>.
        </p>
      </Section>
    </Page>
  );
}

function SpendLog({ log, setLog, alloc }: { log: SpendEntry[]; setLog: (v: SpendEntry[] | ((p: SpendEntry[]) => SpendEntry[])) => void; alloc: Record<string, number> }) {
  const [draft, setDraft] = useState<SpendEntry>({ id: '', date: sarajevoToday(), lineId: 'b1', usd: 0, note: '' });
  const [msg, setMsg] = useState('');
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isIsoDate(draft.date) || !(draft.usd > 0)) {
      setMsg('Add a date and an amount above $0.');
      return;
    }
    const lineLeft = (alloc[draft.lineId] ?? 0) - log.filter((x) => x.lineId === draft.lineId).reduce((s, x) => s + x.usd, 0);
    setLog((l) => [...l, { ...draft, id: uid() }].sort((a, b) => a.date.localeCompare(b.date)));
    setMsg(draft.usd > lineLeft ? `Logged. Warning: ${draft.lineId} is now over its allocation by ${fmtUsd(draft.usd - lineLeft)}.` : 'Logged.');
    setDraft({ ...draft, usd: 0, note: '' });
  };
  const onImport = async (file: File | undefined) => {
    if (!file) return;
    try {
      const data = JSON.parse(await readFileText(file));
      const list: unknown[] = Array.isArray(data) ? data : data?.entries;
      if (!Array.isArray(list)) throw new Error('needs an "entries" array');
      // Only real payments on real budget lines: a negative or unknown-line row would silently lower "Spent".
      const clean = list
        .filter((r): r is Partial<SpendEntry> => r != null && typeof r === 'object')
        .filter((r) => isIsoDate(String(r.date)) && Number.isFinite(Number(r.usd)) && Number(r.usd) > 0 && LINES.some((l) => l.id === r.lineId))
        .map((r) => ({ id: r.id ? String(r.id) : uid(), date: String(r.date), lineId: String(r.lineId), usd: Number(r.usd), note: String(r.note ?? '') }));
      setLog((cur) => {
        const m = new Map(cur.map((x) => [x.id, x]));
        clean.forEach((x) => m.set(x.id, x));
        return [...m.values()].sort((a, b) => a.date.localeCompare(b.date));
      });
      setMsg(`Imported ${clean.length} payment${clean.length === 1 ? '' : 's'}${clean.length < list.length ? ` (${list.length - clean.length} skipped: bad date, amount not above $0, or a budget line that does not exist)` : ''}.`);
    } catch (e) {
      setMsg(`Import failed: ${(e as Error).message}`);
    }
  };
  const exportJson = () =>
    downloadText(
      `spend-log-${sarajevoToday()}.json`,
      JSON.stringify({ meta: { title: 'Makeborne $1,000 spend log', exportedAt: new Date().toISOString(), currency: 'USD', allocation: alloc, privacy: 'Amounts and line ids only. No payee names or account numbers.' }, entries: log }, null, 2),
    );

  return (
    <Section
      id="log"
      title="Spend log"
      kicker="localStorage · JSON export and import"
      aside={
        <div className="row">
          <button type="button" className="btn btn-sm btn-ghost" onClick={exportJson} disabled={!log.length}>
            Export JSON
          </button>
          <label className="btn btn-sm btn-ghost">
            Import JSON
            <input type="file" accept="application/json,.json" onChange={(e) => { void onImport(e.target.files?.[0]); e.target.value = ''; }} />
          </label>
        </div>
      }
    >
      <Card>
        <form onSubmit={add} className="form-grid" aria-label="Log a payment">
          <Field label="Date">{(id) => <input id={id} type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} required />}</Field>
          <Field label="Budget line">
            {(id) => (
              <select id={id} value={draft.lineId} onChange={(e) => setDraft({ ...draft, lineId: e.target.value })}>
                {LINES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.id} · {l.item.split(/[:(,]/)[0].slice(0, 36)}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field label="Amount (USD)">{(id) => <input id={id} type="number" min={0} step="0.01" value={draft.usd || ''} onChange={(e) => setDraft({ ...draft, usd: Number(e.target.value) })} required />}</Field>
          <Field label="Note (no payee names)" className="wide">{(id) => <input id={id} type="text" value={draft.note} maxLength={140} placeholder="e.g. wave-1 creator 2 of 5, first half" onChange={(e) => setDraft({ ...draft, note: e.target.value })} />}</Field>
          <div className="row wide">
            <button className="btn btn-accent" type="submit">
              Log payment
            </button>
            <span className="small muted" role="status" aria-live="polite">
              {msg}
            </span>
          </div>
        </form>
      </Card>
      {log.length > 0 && (
        <div className="table-wrap" style={{ marginTop: 14 }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Week</th>
                <th>Line</th>
                <th className="n">USD</th>
                <th>Note</th>
                <th>
                  <span className="sr">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {log.map((e) => (
                <tr key={e.id}>
                  <td className="num">{e.date}</td>
                  <td className="num">{planWeek(e.date)}</td>
                  <td className="item-id">{e.lineId}</td>
                  <td className="n">{fmtUsd(e.usd, true)}</td>
                  <td className="small">{e.note}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => setLog((l) => l.filter((x) => x.id !== e.id))} aria-label={`Remove ${e.date} ${e.lineId} payment`}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Total</td>
                <td className="n">{fmtUsd(log.reduce((s, e) => s + e.usd, 0), true)}</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </Section>
  );
}

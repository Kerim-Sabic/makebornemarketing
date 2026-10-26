import { useEffect, useMemo, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import type { ActualEntry } from '../lib/types';
import { BUDGET_LINE_IDS, CHANNELS, entryKey, mergeEntries, normaliseEntry } from '../lib/actuals';
import { addDays, fmtDate, fmtInt, fmtUsd, isIsoDate, planDay } from '../lib/util';
import { CODES } from 'virtual:war-room/glossary';
import { Term } from './ui';

/** Spreadsheet-style entry: one row per channel for one day. Columns follow the actuals template order. */
const COLS = [
  { k: 'spend', label: 'Spend $', money: true, tip: 'Money spent on this channel today, in dollars.' },
  { k: 'impressions', label: 'Impr.', tip: 'Impressions: how many times the post or ad was shown.' },
  { k: 'views', label: 'Views', tip: 'Video views the platform reports.' },
  { k: 'clicks', label: '/go/ clicks', tip: 'Clicks on the /go/ short links for this channel.' },
  { k: 'signups', label: 'Sign-ups', tip: 'New accounts created.' },
  { k: 'checkouts', label: 'Checkouts', tip: 'Checkouts opened in Whop (people who started to pay).' },
  { k: 'paid', label: 'Paid', tip: 'New paying customers today.' },
  { k: 'revenue', label: 'Revenue $', money: true, tip: 'Money in today, in dollars.' },
  { k: 'refunds', label: 'Refunds', tip: 'Customers refunded today.' },
  { k: 'activated', label: 'Activated', tip: 'Paying customers who used it with a client within 7 days (sent a review link, or published or exported a deck or book).' },
  { k: 'studioOrScale', label: 'Studio+', tip: 'New paying customers on the Studio plan or bigger.' },
] as const;
type NumKey = (typeof COLS)[number]['k'];
const CORE = ['ch-tiktok', 'ch-instagram', 'ch-youtube', 'ch-linkedin', 'ch-x'];
const DEFAULT_CAMPAIGN = 'launch-2026-10';

interface Row { id: string; origKey: string | null; channel: string; campaign: string; budgetLineId: string; notes: string; v: Record<NumKey, string> }

let seq = 0;
const nextId = () => `r${++seq}`;
const emptyVals = () => Object.fromEntries(COLS.map((c) => [c.k, ''])) as Record<NumKey, string>;
const isEmpty = (r: Row) => !r.notes.trim() && COLS.every((c) => r.v[c.k].trim() === '');

function rowsFor(date: string, entries: ActualEntry[], showAll: boolean): Row[] {
  const onDay = entries.filter((e) => e.date === date);
  const recent = new Set(entries.filter((e) => e.date >= addDays(date, -14) && e.date <= date).map((e) => e.channel));
  const lastCampaign = (ch: string) => [...entries].reverse().find((e) => e.channel === ch && e.campaign)?.campaign ?? DEFAULT_CAMPAIGN;
  const rows: Row[] = onDay.map((e) => ({
    id: nextId(), origKey: entryKey(e), channel: e.channel, campaign: e.campaign ?? '', budgetLineId: e.budgetLineId ?? '', notes: e.notes ?? '',
    v: Object.fromEntries(COLS.map((c) => [c.k, (e as unknown as Record<string, number | null>)[c.k] == null ? '' : String((e as unknown as Record<string, number>)[c.k])])) as Record<NumKey, string>,
  }));
  for (const ch of CHANNELS) {
    if (ch === 'renewals' && !showAll) continue;
    if (rows.some((r) => r.channel === ch)) continue;
    if (showAll || CORE.includes(ch) || recent.has(ch)) rows.push({ id: nextId(), origKey: null, channel: ch, campaign: lastCampaign(ch), budgetLineId: '', notes: '', v: emptyVals() });
  }
  const order = (ch: string) => CHANNELS.indexOf(ch);
  return rows.sort((a, b) => order(a.channel) - order(b.channel));
}

/** Reuse row ids for the same channel slot so a reload after saving keeps focus in the cell being edited. */
function keepIds(prev: Row[], next: Row[]) {
  const pool = new Map<string, string[]>();
  for (const r of prev) pool.set(r.channel, [...(pool.get(r.channel) ?? []), r.id]);
  return next.map((r) => {
    const ids = pool.get(r.channel);
    return ids?.length ? { ...r, id: ids.shift()! } : r;
  });
}

export function DaySheet(props: { date: string; setDate: (d: string) => void; entries: ActualEntry[]; setEntries: (f: (cur: ActualEntry[]) => ActualEntry[]) => void; onMsg: (m: string) => void }) {
  const { date, entries } = props;
  const [showAll, setShowAll] = useState(false);
  const [rows, setRows] = useState<Row[]>(() => rowsFor(date, entries, false));
  const [dirty, setDirty] = useState(false);
  const grid = useRef<HTMLTableElement>(null);

  // Reload the sheet when the day, the channel set or the stored rows change (unless the sheet has unsaved edits).
  const dayEntries = useMemo(() => JSON.stringify(entries.filter((e) => e.date === date)), [entries, date]);
  useEffect(() => {
    if (!dirty) setRows((prev) => keepIds(prev, rowsFor(date, entries, showAll)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, showAll, dayEntries]);

  const go = (d: string) => {
    if (!isIsoDate(d) || d === date) return;
    if (dirty && typeof window !== 'undefined' && !window.confirm(`Discard unsaved changes for ${date}?`)) return;
    setDirty(false);
    props.setDate(d);
  };

  const edit = (id: string, patch: Partial<Row> | ((r: Row) => Row)) => {
    setRows((cur) => cur.map((r) => (r.id === id ? (typeof patch === 'function' ? patch(r) : { ...r, ...patch }) : r)));
    setDirty(true);
  };

  const save = () => {
    const warnings: string[] = [];
    const incoming: ActualEntry[] = [];
    const remove = new Set<string>();
    let cleared = 0;
    for (const r of rows) {
      if (isEmpty(r)) {
        if (r.origKey) {
          remove.add(r.origKey);
          cleared++;
        }
        continue;
      }
      const raw: Record<string, unknown> = { date, channel: r.channel, notes: r.notes, campaign: r.campaign, budgetLineId: r.budgetLineId };
      for (const c of COLS) raw[c.k] = r.v[c.k];
      const { entry, warnings: w } = normaliseEntry(raw);
      w.forEach((x) => warnings.push(`${r.channel}: ${x}`));
      if (!entry) continue;
      if (r.origKey && r.origKey !== entryKey(entry)) remove.add(r.origKey);
      incoming.push(entry);
    }
    const keys = incoming.map(entryKey);
    const dupes = keys.filter((k, i) => keys.indexOf(k) !== i);
    props.setEntries((cur) => mergeEntries(cur.filter((e) => !remove.has(entryKey(e))), incoming));
    setDirty(false);
    props.onMsg(
      `Saved ${fmtDate(date)}: ${incoming.length} row${incoming.length === 1 ? '' : 's'}${cleared ? `, ${cleared} cleared` : ''}.` +
        (dupes.length ? ` Two rows shared ${dupes[0].split('|').slice(1).filter(Boolean).join(' · ')}: the lower one was kept.` : '') +
        (warnings.length ? ` Check: ${warnings.slice(0, 3).join('; ')}${warnings.length > 3 ? '…' : ''}.` : ''),
    );
  };

  // Arrow keys and Enter move between cells like a spreadsheet; Ctrl/Cmd+Enter saves; PageUp / PageDown change the day.
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      save();
      return;
    }
    if (e.key === 'PageUp' || e.key === 'PageDown') {
      e.preventDefault();
      go(addDays(date, e.key === 'PageUp' ? -1 : 1));
      return;
    }
    const t = e.target as HTMLElement;
    const r = Number(t.dataset.r);
    const c = Number(t.dataset.c);
    if (!Number.isFinite(r) || !Number.isFinite(c) || t.tagName === 'SELECT') return;
    let dr = 0;
    if (e.key === 'ArrowDown' || (e.key === 'Enter' && !e.shiftKey)) dr = 1;
    else if (e.key === 'ArrowUp' || (e.key === 'Enter' && e.shiftKey)) dr = -1;
    if (!dr) return;
    e.preventDefault();
    grid.current?.querySelector<HTMLInputElement>(`input[data-r="${r + dr}"][data-c="${c}"]`)?.focus();
  };

  // Paste a block copied from a spreadsheet (tabs and new lines) starting at the focused cell.
  const onPaste = (e: ClipboardEvent<HTMLInputElement>, r0: number, c0: number) => {
    const text = e.clipboardData.getData('text');
    if (!/[\t\n]/.test(text.trim())) return;
    e.preventDefault();
    const block = text.replace(/\r/g, '').replace(/\n$/, '').split('\n').map((l) => l.split('\t'));
    setRows((cur) =>
      cur.map((row, ri) => {
        const line = block[ri - r0];
        if (!line) return row;
        const v = { ...row.v };
        let notes = row.notes;
        line.forEach((cell, j) => {
          const c = c0 + j;
          if (c < COLS.length) v[COLS[c].k] = cell.trim();
          else if (c === COLS.length) notes = cell.trim();
        });
        return { ...row, v, notes };
      }),
    );
    setDirty(true);
  };

  const sum = (k: NumKey) => {
    let s = 0;
    let any = false;
    for (const r of rows) {
      const n = Number(r.v[k].replace(/[$,\s]/g, ''));
      if (r.v[k].trim() !== '' && Number.isFinite(n)) {
        s += n;
        any = true;
      }
    }
    return any ? s : null;
  };

  const day = planDay(date);
  return (
    <div onKeyDown={onKey}>
      <div className="row-between" style={{ marginBottom: 12 }}>
        <div className="row">
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => go(addDays(date, -1))} aria-label="Previous day">
            ‹ Prev
          </button>
          <input type="date" aria-label="Day to log" value={date} onChange={(e) => go(e.target.value)} style={{ width: 170 }} />
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => go(addDays(date, 1))} aria-label="Next day">
            Next ›
          </button>
          <span className="small muted">
            {fmtDate(date, { weekday: 'long', day: 'numeric', month: 'short' })}
            {day >= 1 && day <= 91 ? ` · day ${day}` : ''}
          </span>
        </div>
        <label className="row small" style={{ gap: 6 }}>
          <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} />
          All channels
        </label>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
        aria-label={`Actuals for ${date}`}
      >
        <div className="table-wrap daysheet">
          <table ref={grid}>
            <caption className="sr">One row per channel for {date}. Leave a cell empty when it is unknown.</caption>
            <thead>
              <tr>
                <th scope="col">Channel</th>
                {COLS.map((c) => (
                  <th key={c.k} scope="col" className="n">
                    <Term t={c.label} meaning={c.tip}>
                      {c.label}
                    </Term>
                  </th>
                ))}
                <th scope="col">Notes</th>
                <th scope="col">Budget line</th>
                <th scope="col">Campaign</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={r.id} className={r.origKey ? 'is-logged' : undefined}>
                  <th scope="row" className="ds-ch">
                    {r.channel.replace(/^ch-/, '')}
                    {r.origKey && <span className="sr"> (logged)</span>}
                  </th>
                  {COLS.map((c, ci) => (
                    <td key={c.k} className="n">
                      <input
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        data-r={ri}
                        data-c={ci}
                        aria-label={`${r.channel} ${c.label}`}
                        value={r.v[c.k]}
                        onChange={(e) => {
                          const val = e.target.value;
                          edit(r.id, (x) => ({ ...x, v: { ...x.v, [c.k]: val } }));
                        }}
                        onPaste={(e) => onPaste(e, ri, ci)}
                      />
                    </td>
                  ))}
                  <td>
                    <input type="text" className="ds-notes" data-r={ri} data-c={COLS.length} aria-label={`${r.channel} notes`} value={r.notes} maxLength={300} placeholder="tt-v01-l1, V12" onChange={(e) => edit(r.id, { notes: e.target.value })} onPaste={(e) => onPaste(e, ri, COLS.length)} />
                  </td>
                  <td>
                    <select aria-label={`${r.channel} budget line`} value={r.budgetLineId} onChange={(e) => edit(r.id, { budgetLineId: e.target.value })}>
                      <option value="">–</option>
                      {BUDGET_LINE_IDS.map((b) => (
                        <option key={b} value={b}>
                          {CODES[b] ? `${b} · ${CODES[b].replace(/^Budget line \w+ of the \$1,000: /, '')}` : b}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="text" className="ds-camp" aria-label={`${r.channel} campaign`} value={r.campaign} onChange={(e) => edit(r.id, { campaign: e.target.value })} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                {COLS.map((c) => {
                  const s = sum(c.k);
                  return (
                    <td key={c.k} className="n">
                      {s == null ? '–' : 'money' in c ? fmtUsd(s) : fmtInt(s)}
                    </td>
                  );
                })}
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn btn-accent" type="submit">
            Save {fmtDate(date, { day: 'numeric', month: 'short' })}
          </button>
          <button type="button" className="btn btn-ghost" disabled={!dirty} onClick={() => { setDirty(false); setRows(rowsFor(date, entries, showAll)); }}>
            Revert
          </button>
          <AddRow onAdd={(ch) => { setRows((cur) => [...cur, { id: nextId(), origKey: null, channel: ch, campaign: DEFAULT_CAMPAIGN, budgetLineId: '', notes: '', v: emptyVals() }]); setDirty(true); }} />
          <span className="tiny muted" role="status" aria-live="polite">
            {dirty ? 'Unsaved changes. ' : ''}Enter or ↓ moves down · Ctrl+Enter saves · PageUp / PageDown change the day · paste a block from a spreadsheet
          </span>
        </div>
      </form>
    </div>
  );
}

function AddRow({ onAdd }: { onAdd: (ch: string) => void }) {
  return (
    <select aria-label="Add a second row for a channel (another campaign or budget line)" value="" onChange={(e) => e.target.value && onAdd(e.target.value)} style={{ width: 'auto' }}>
      <option value="">+ Row for…</option>
      {CHANNELS.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

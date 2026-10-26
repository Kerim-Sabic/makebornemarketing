import { useLayoutEffect, useMemo, useRef, useState } from 'react';

export interface Series {
  id: string;
  name: string;
  values: (number | null)[];
  kind?: 'line' | 'bar' | 'area';
  color: string; // a CSS colour or var()
  dashed?: boolean;
  width?: number;
}

export interface RefLine { y: number; label: string; color?: string }

interface Props {
  labels: string[];
  series: Series[];
  height?: number;
  yFormat?: (n: number) => string;
  xTickEvery?: number;
  refLines?: RefLine[];
  ariaLabel: string;
  yMax?: number;
}

function niceStep(range: number, ticks: number) {
  const raw = range / Math.max(1, ticks);
  const mag = 10 ** Math.floor(Math.log10(raw || 1));
  const n = raw / mag;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * mag;
}

/** Small dependency-free SVG chart: lines, areas and grouped bars with a hover readout. */
export function Chart({ labels, series, height = 260, yFormat = (n) => String(Math.round(n)), xTickEvery, refLines = [], ariaLabel, yMax }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [hover, setHover] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    // Measure before the first paint so a narrow card never shows a 640 px chart for one frame.
    const w0 = Math.floor(el.getBoundingClientRect().width);
    if (w0 > 0) setWidth(w0);
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0].contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = labels.length;
  const pad = { l: width < 420 ? 40 : 52, r: 22, t: 14, b: 28 };
  const iw = Math.max(10, width - pad.l - pad.r);
  const ih = Math.max(10, height - pad.t - pad.b);

  const { max, step } = useMemo(() => {
    let m = 0;
    for (const s of series) for (const v of s.values) if (v != null && Number.isFinite(v)) m = Math.max(m, v);
    for (const r of refLines) m = Math.max(m, r.y);
    if (yMax != null) m = yMax;
    if (m <= 0) m = 1;
    const st = niceStep(m, 4);
    return { max: Math.ceil(m / st) * st, step: st };
  }, [series, refLines, yMax]);

  const x = (i: number) => pad.l + (n <= 1 ? iw / 2 : (i * iw) / (n - 1));
  const bandW = iw / Math.max(1, n);
  const xb = (i: number) => pad.l + i * bandW + bandW / 2;
  const hasBars = series.some((s) => s.kind === 'bar');
  const px = hasBars ? xb : x;
  const y = (v: number) => pad.t + ih - (Math.min(v, max) / max) * ih;

  const bars = series.filter((s) => s.kind === 'bar');
  const barGap = 2;
  const groupW = Math.min(bandW * 0.78, 64);
  const bw = bars.length ? Math.max(2, (groupW - barGap * (bars.length - 1)) / bars.length) : 0;

  const ticks: number[] = [];
  for (let v = 0; v <= max + 1e-9; v += step) ticks.push(v);
  const every = xTickEvery ?? Math.max(1, Math.ceil(n / Math.max(2, Math.floor(iw / 64))));

  const path = (vals: (number | null)[]) => {
    let d = '';
    let pen = false;
    vals.forEach((v, i) => {
      if (v == null || !Number.isFinite(v)) {
        pen = false;
        return;
      }
      d += `${pen ? 'L' : 'M'}${px(i).toFixed(1)},${y(v).toFixed(1)}`;
      pen = true;
    });
    return d;
  };

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
    const rel = e.clientX - rect.left;
    const i = hasBars ? Math.floor(rel / bandW) : Math.round((rel / iw) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  const onKey = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (!n) return;
    const cur = hover ?? -1;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = Math.min(n - 1, cur + 1);
    else if (e.key === 'ArrowLeft') next = cur < 0 ? n - 1 : Math.max(0, cur - 1);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else if (e.key === 'Escape') {
      setHover(null);
      return;
    }
    if (next == null) return;
    e.preventDefault();
    setHover(next);
  };

  const fmtCell = (v: number | null | undefined) => (v == null || !Number.isFinite(v) ? '–' : yFormat(v));
  const liveText = hover != null ? `${labels[hover]}: ${series.map((s) => `${s.name} ${fmtCell(s.values[hover])}`).join(', ')}` : '';

  const tipLeft = hover != null ? Math.min(Math.max(px(hover) + 12, 0), width - 190) : 0;

  return (
    <div className="chart" ref={wrap}>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`${ariaLabel}. Use the left and right arrow keys to read each point; a data table follows.`}
        tabIndex={0}
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
      >
        <g className="chart-grid">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={pad.l + iw} y1={y(t)} y2={y(t)} />
              <text x={pad.l - 8} y={y(t)} dy="0.32em" textAnchor="end">
                {yFormat(t)}
              </text>
            </g>
          ))}
          {labels.map((l, i) =>
            i % every === 0 || i === n - 1 ? (
              <text key={i} x={px(i)} y={height - 8} textAnchor={!hasBars && i === n - 1 ? 'end' : !hasBars && i === 0 ? 'start' : 'middle'}>
                {l}
              </text>
            ) : null,
          )}
        </g>
        {refLines.map((r) => (
          <g key={r.label} className="chart-ref">
            <line x1={pad.l} x2={pad.l + iw} y1={y(r.y)} y2={y(r.y)} style={{ stroke: r.color }} />
            <text x={pad.l + iw - 4} y={y(r.y) - 6} textAnchor="end" style={{ fill: r.color }}>
              {r.label}
            </text>
          </g>
        ))}
        {bars.map((s, bi) => (
          <g key={s.id} style={{ fill: s.color }}>
            {s.values.map((v, i) =>
              v == null || !Number.isFinite(v) ? null : (
                <rect
                  key={i}
                  x={xb(i) - groupW / 2 + bi * (bw + barGap)}
                  y={y(v)}
                  width={bw}
                  height={Math.max(0, pad.t + ih - y(v))}
                  rx={Math.min(3, bw / 2)}
                  opacity={hover == null || hover === i ? 1 : 0.55}
                />
              ),
            )}
          </g>
        ))}
        {series
          .filter((s) => s.kind === 'area')
          .map((s) => {
            const d = path(s.values);
            if (!d) return null;
            const firstIdx = s.values.findIndex((v) => v != null);
            const lastIdx = s.values.length - 1 - [...s.values].reverse().findIndex((v) => v != null);
            return (
              <g key={s.id}>
                <path d={`${d}L${px(lastIdx)},${pad.t + ih}L${px(firstIdx)},${pad.t + ih}Z`} style={{ fill: s.color }} opacity={0.12} />
                <path d={d} fill="none" style={{ stroke: s.color }} strokeWidth={s.width ?? 2} strokeLinejoin="round" />
              </g>
            );
          })}
        {series
          .filter((s) => !s.kind || s.kind === 'line')
          .map((s) =>
            // A point with no neighbours (a single Whop snapshot in a week) gets a dot, since a path of one point is invisible.
            s.values.map((v, i) =>
              v != null && Number.isFinite(v) && (s.values[i - 1] == null || !Number.isFinite(s.values[i - 1]!)) && (s.values[i + 1] == null || !Number.isFinite(s.values[i + 1]!)) ? (
                <circle key={`${s.id}-${i}`} cx={px(i)} cy={y(v)} r={3.5} style={{ fill: s.color }} />
              ) : null,
            ),
          )}
        {series
          .filter((s) => !s.kind || s.kind === 'line')
          .map((s) => (
            <path
              key={s.id}
              d={path(s.values)}
              fill="none"
              style={{ stroke: s.color }}
              strokeWidth={s.width ?? 2}
              strokeDasharray={s.dashed ? '5 5' : undefined}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
        {hover != null && (
          <g className="chart-hover">
            <line x1={px(hover)} x2={px(hover)} y1={pad.t} y2={pad.t + ih} />
            {series
              .filter((s) => s.kind !== 'bar')
              .map((s) => {
                const v = s.values[hover];
                return v == null || !Number.isFinite(v) ? null : <circle key={s.id} cx={px(hover)} cy={y(v)} r={3.5} style={{ fill: s.color }} />;
              })}
          </g>
        )}
        <rect
          x={pad.l}
          y={pad.t}
          width={iw}
          height={ih}
          fill="transparent"
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHover(null)}
        />
      </svg>
      {hover != null && (
        <div className="chart-tip" style={{ left: tipLeft }} aria-hidden="true">
          <div className="chart-tip-title">{labels[hover]}</div>
          {series.map((s) => (
            <div key={s.id} className="chart-tip-row">
              <i style={{ background: s.color }} />
              <span>{s.name}</span>
              <b className="num">{fmtCell(s.values[hover])}</b>
            </div>
          ))}
        </div>
      )}
      <div className="sr" aria-live="polite">
        {liveText}
      </div>
      {/* The wrapper hides the table: an absolutely positioned table ignores width: 1px and would widen the page. */}
      <div className="sr">
      <table>
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th scope="col">Point</th>
            {series.map((s) => (
              <th key={s.id} scope="col">
                {s.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labels.map((l, i) => (
            <tr key={i}>
              <th scope="row">{l}</th>
              {series.map((s) => (
                <td key={s.id}>{fmtCell(s.values[i])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <ul className="legend" aria-label="Legend">
        {series.map((s) => (
          <li key={s.id}>
            <i className={s.dashed ? 'dashed' : s.kind === 'bar' ? 'bar' : ''} style={{ background: s.dashed ? undefined : s.color, borderColor: s.color }} />
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

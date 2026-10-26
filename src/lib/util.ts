import { useCallback, useEffect, useRef, useState } from 'react';

/* ---------- storage (every read and write is guarded: private windows and SSR) ---------- */

const PREFIX = 'mb-war-room:';

export function readStore<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('mb-store', { detail: key }));
  } catch {
    /* storage blocked: the page keeps working for this session */
  }
}

/** useState that persists to localStorage and stays in sync across components and tabs. */
export function useStored<T>(key: string, fallback: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => readStore(key, fallback));
  useEffect(() => {
    const onChange = (e: Event) => {
      const k = e instanceof StorageEvent ? e.key?.replace(PREFIX, '') : (e as CustomEvent).detail;
      if (k === key) setValue(readStore(key, fallback));
    };
    window.addEventListener('mb-store', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('mb-store', onChange);
      window.removeEventListener('storage', onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  // The write happens outside the state updater: updaters must stay pure (StrictMode runs them twice,
  // and the 'mb-store' event would otherwise update other components in the middle of a render).
  const ref = useRef(value);
  ref.current = value;
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(ref.current) : v;
      ref.current = next;
      setValue(next);
      writeStore(key, next);
    },
    [key],
  );
  return [value, set];
}

/* ---------- formatting ---------- */

const usd0 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const int = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

export const fmtUsd = (n: number | null | undefined, cents = false) =>
  n == null || !Number.isFinite(n) ? '–' : cents ? usd2.format(n) : usd0.format(n);
export const fmtInt = (n: number | null | undefined) => (n == null || !Number.isFinite(n) ? '–' : int.format(n));
export const fmtPct = (n: number | null | undefined, digits = 1) =>
  n == null || !Number.isFinite(n) ? '–' : `${(n * 100).toFixed(digits)}%`;
export function fmtCompactUsd(n: number) {
  if (!Number.isFinite(n)) return '–';
  const a = Math.abs(n);
  if (a >= 1_000_000) return `$${(n / 1_000_000).toFixed(a >= 10_000_000 ? 0 : 2)}M`;
  if (a >= 10_000) return `$${(n / 1000).toFixed(0)}k`;
  if (a >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${Math.round(n)}`;
}
export function fmtCompact(n: number) {
  if (!Number.isFinite(n)) return '–';
  const a = Math.abs(n);
  if (a >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (a >= 10_000) return `${(n / 1000).toFixed(0)}k`;
  if (a >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${Math.round(n)}`;
}

/* ---------- dates (the plan runs on the Sarajevo calendar day) ---------- */

export const WINDOW_START = '2026-10-26';
export const WINDOW_DAYS = 90;

export function sarajevoToday(): string {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Sarajevo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const toUtc = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};
export const addDays = (iso: string, n: number) => new Date(toUtc(iso) + n * 86_400_000).toISOString().slice(0, 10);
export const diffDays = (a: string, b: string) => Math.round((toUtc(a) - toUtc(b)) / 86_400_000);
/** Day number in the plan (day 1 = Mon 26 Oct 2026). */
export const planDay = (iso: string) => diffDays(iso, WINDOW_START) + 1;
export const planWeek = (iso: string) => Math.floor((planDay(iso) - 1) / 7) + 1;
export function fmtDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }) {
  return new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'UTC' }).format(new Date(toUtc(iso)));
}
/** A real calendar date in YYYY-MM-DD form (rejects 2026-11-31 and 2026-13-45, not just the shape). */
export const isIsoDate = (s: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
};

/* ---------- files ---------- */

export function downloadText(filename: string, text: string, type = 'application/json') {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function readFileText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result ?? ''));
    fr.onerror = () => reject(fr.error);
    fr.readAsText(file);
  });
}

/** Minimal RFC 4180 CSV parser (quotes, escaped quotes, CRLF). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let q = false;
  const s = text.replace(/^﻿/, '');
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (q) {
      if (ch === '"') {
        if (s[i + 1] === '"') { cell += '"'; i++; } else q = false;
      } else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && s[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((c) => c !== '')) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c !== '')) rows.push(row);
  return rows;
}

export function toCsv(header: string[], rows: (string | number | null | undefined)[][]) {
  const esc = (v: string | number | null | undefined) => {
    if (v == null) return '';
    let t = String(v);
    // Spreadsheet formula injection: text starting with = + - @ (or a tab / CR) would run as a formula in Excel or Sheets.
    if (typeof v === 'string' && /^[=+\-@\t\r]/.test(t)) t = `'${t}`;
    return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
  };
  return [header.map(esc).join(','), ...rows.map((r) => r.map(esc).join(','))].join('\r\n');
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

export const sum = (xs: (number | null | undefined)[]) => xs.reduce<number>((a, b) => a + (b ?? 0), 0);

/* ---------- tags ---------- */

const BEAT_ALIASES: Record<string, string> = {
  'beat:custom-domains': 'beat:domains',
  'beat:agency-tools': 'beat:agency',
  'beat:ai-lead-research': 'beat:leads',
  'beat:github-sync': 'beat:github',
};
/** videos.json uses long beat names; calendar and creatives use short ones. Normalise to the short form. */
export const normTag = (t: string | null | undefined) => (t ? BEAT_ALIASES[t] ?? t : 'live');
export const BEAT_LABELS: Record<string, string> = {
  live: 'Live today',
  'beat:images': 'Beat: generated images',
  'beat:topups': 'Beat: credit top-ups',
  'beat:domains': 'Beat: custom domains',
  'beat:agency': 'Beat: agency tools',
  'beat:leads': 'Beat: AI lead research',
  'beat:github': 'Beat: two-way GitHub sync',
};

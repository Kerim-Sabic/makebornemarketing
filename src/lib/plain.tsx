import { useState, type ReactNode } from 'react';
import { CODES } from 'virtual:war-room/glossary';
import { GLOSSARY, Term } from '../components/ui';

/**
 * Plain language for the plan's own text, at display time only: the data files (and so the plan's numbers and rules) stay
 * exactly as written. Two passes:
 *   1. Swaps: shorthand that has a plain equivalent is replaced ("PH" -> "Product Hunt", "[U]" -> "(not confirmed yet)").
 *   2. Terms and codes: marketing words (CAC, Spark, TAAFT …) and the plan's codes (decisions D1, growth asks ga1, budget
 *      lines b1, templates t08, ad cards A01, hooks like (F2)) keep their spelling but get a tap-to-read meaning.
 */
const SWAPS: [RegExp, string][] = [
  [/\s*\[U\]/g, ' (not confirmed yet)'],
  [/\bPH\b/g, 'Product Hunt'],
  [/\bIG\b/g, 'Instagram'],
  [/ -> /g, ' → '],
  [/->/g, '→'],
  [/\bP0 videos\b/g, 'first-priority videos'],
  [/\bATTRIBUTION TARGET DAY\b/g, 'Tracking links go live'],
  [/\bch-([a-z]+)\b/g, '$1'],
  [/\s*\(placeholder\)/g, ' (date not fixed yet)'],
];

const WORDS = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
const WORD_RE = WORDS.map((w) => (/^\w/.test(w) ? `\\b${esc(w)}${/\w$/.test(w) ? '\\b' : ''}` : esc(w))).join('|');
// Codes: decisions (D1, O-IG1, P-D1), growth asks (ga1), budget lines (b1), templates (t08), ad cards (A01), hooks in brackets.
const CODE_RE = String.raw`\b(?:O-IG\d|P-D\d{1,2}|D\d{1,2}|ga\d{1,2}|b\d|t\d{2}|A0\d)\b|\((?:R|F|A|B|P)\d\)`;
const RE = new RegExp(`(${CODE_RE}|${WORD_RE})`, 'g');

function meaningOf(token: string): string | undefined {
  const hook = token.match(/^\(([A-Z]\d)\)$/);
  if (hook) return CODES[`hook:${hook[1]}`];
  return CODES[token] ?? GLOSSARY[token];
}

export function plainText(text: string): string {
  let out = String(text ?? '');
  for (const [re, to] of SWAPS) out = out.replace(re, to);
  return out;
}

/** Render plan text with swaps applied and each term or code explained (first time it appears in this text only). */
export function plain(text: string | null | undefined): ReactNode {
  if (!text) return text ?? null;
  const s = plainText(text);
  const seen = new Set<string>();
  const parts = s.split(RE);
  if (parts.length === 1) return s;
  return parts.map((p, i) => {
    if (i % 2 === 0 || !p) return p;
    const m = meaningOf(p);
    if (!m || seen.has(p)) return p;
    seen.add(p);
    return (
      <Term key={i} t={p} meaning={m}>
        {p}
      </Term>
    );
  });
}

/** <P t="…" /> is plain() as a component, for JSX that reads better that way. */
export function P({ t }: { t: string | null | undefined }) {
  return <>{plain(t)}</>;
}

const SENTENCE = /(?<=[.!?])\s+(?=[A-Z0-9'"“(])/;

/**
 * Long plan text, shortened: the first sentence or two stay on screen (up to about `max` characters) and the rest opens
 * under "More". Terms and codes are explained in both parts.
 */
export function Short({ t, max = 170 }: { t: string | null | undefined; max?: number }) {
  const [open, setOpen] = useState(false);
  if (!t) return null;
  const parts = plainText(t).split(SENTENCE);
  let head = parts[0];
  let n = 1;
  while (n < parts.length && head.length + parts[n].length + 1 <= max) head += ` ${parts[n++]}`;
  const rest = parts.slice(n).join(' ');
  if (!rest) return <>{plain(head)}</>;
  // A button, not <details>: this often sits inside a <p>, where <details> is not allowed.
  return (
    <>
      {plain(head)}{' '}
      {open ? (
        plain(rest)
      ) : (
        <button
          type="button"
          className="more-btn"
          aria-label="More: show the rest"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
        >
          More
        </button>
      )}
    </>
  );
}

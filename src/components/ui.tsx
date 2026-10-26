import { createContext, useContext, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { BEAT_LABELS, normTag } from '../lib/util';

export function Page(props: { eyebrow?: ReactNode; title: ReactNode; lede?: ReactNode; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="page">
      <header className="page-head">
        <div>
          {props.eyebrow && <p className="eyebrow">{props.eyebrow}</p>}
          <h1 className="display">{props.title}</h1>
          {props.lede && <p className="lede">{props.lede}</p>}
        </div>
        {props.actions && <div className="page-actions">{props.actions}</div>}
      </header>
      {props.children}
    </div>
  );
}

/**
 * Inside <Folds>, every Section becomes a collapsible panel (closed unless its id is `open`).
 * Results uses it to stack the Analytics and Predictions sections under one short verdict.
 */
const FoldContext = createContext<{ open?: string } | null>(null);
export function Folds({ open, children }: { open?: string; children: ReactNode }) {
  return <FoldContext.Provider value={{ open }}>{children}</FoldContext.Provider>;
}

export function Section(props: { title: ReactNode; kicker?: ReactNode; aside?: ReactNode; id?: string; children: ReactNode; className?: string }) {
  const fold = useContext(FoldContext);
  if (fold)
    return (
      <details className={`fold ${props.className ?? ''}`} id={props.id} open={!!props.id && fold.open === props.id}>
        <summary>
          <span className="fold-title">
            <span className="fold-h">{props.title}</span>
            {props.kicker && <span className="fold-kicker">{props.kicker}</span>}
          </span>
          <svg className="fold-chev" viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
            <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </summary>
        <div className="fold-body">
          {props.aside && <div className="section-aside" style={{ marginBottom: 12 }}>{props.aside}</div>}
          {props.children}
        </div>
      </details>
    );
  return (
    <section className={`section ${props.className ?? ''}`} id={props.id} aria-labelledby={props.id ? `${props.id}-h` : undefined}>
      <div className="section-head">
        <div>
          {props.kicker && <p className="kicker">{props.kicker}</p>}
          <h2 id={props.id ? `${props.id}-h` : undefined}>{props.title}</h2>
        </div>
        {props.aside && <div className="section-aside">{props.aside}</div>}
      </div>
      {props.children}
    </section>
  );
}

export function Card(props: { children: ReactNode; className?: string; as?: 'div' | 'article' | 'li' }) {
  const Tag = props.as ?? 'div';
  return <Tag className={`card ${props.className ?? ''}`}>{props.children}</Tag>;
}

export function Stat(props: { label: ReactNode; value: ReactNode; sub?: ReactNode; tone?: 'good' | 'warn' | 'bad' | 'accent' | 'muted' }) {
  return (
    <div className={`stat ${props.tone ? `tone-${props.tone}` : ''}`}>
      <div className="stat-label">{props.label}</div>
      <div className="stat-value num">{props.value}</div>
      {props.sub && <div className="stat-sub">{props.sub}</div>}
    </div>
  );
}

export function BeatTag({ tag }: { tag: string | null | undefined }) {
  const t = normTag(tag);
  const live = t === 'live';
  return (
    <span className={`chip ${live ? 'chip-live' : 'chip-beat'}`} title={live ? 'Live at launch: may be promoted' : 'Not live today: never promote as available now'}>
      {live ? 'Live' : (BEAT_LABELS[t] ?? t).replace('Beat: ', 'Beat · ')}
    </span>
  );
}

/** Plain meanings of the few marketing words the plan cannot avoid. */
export const GLOSSARY: Record<string, string> = {
  CAC: 'Cost per customer: what a source cost, divided by the paying customers it brought (after refunds).',
  MRR: 'Monthly revenue: what all active subscriptions bring in each month.',
  ARR: "Yearly revenue at today's pace: monthly revenue × 12.",
  CTR: 'Click rate: the share of people who saw the ad and clicked the link.',
  CPC: 'Cost per click.',
  CPM: 'Cost per 1,000 times the ad was shown.',
  ICP: 'The kind of customer we aim at.',
  UTM: 'Tags on a link that tell us which post or ad a visitor came from.',
  Spark: "TikTok Spark ad: pays to show an existing TikTok post (ours or a creator's) to more people, with its likes and comments.",
  Partnership: "Meta partnership ad: pays to show a creator's own Reel, under their name and ours.",
  'net payers': 'Paying customers after refunds.',
  'activated payers': 'Paying customers who sent a client review link, or published or exported a deck or book, within 7 days.',
  TAAFT: "There's An AI For That: a large directory of AI tools. Our first paid listing.",
  Uneed: 'A launch directory for new products, with paid pick-your-date launch slots.',
  PPC: 'Pay-per-click: ads you pay for only when someone clicks.',
  attribution: 'Knowing which post, ad or creator each visitor and customer came from (the /go/ links do this).',
  'spend gate': 'The rule that no money is spent on ads or creators until the tracking links work.',
  blackout: 'The days with no paid ads at all (20 Nov to 2 Dec, when Black Friday makes ads expensive).',
  'Lane A': 'Creators who sell websites: freelance web designers, agencies, "sell sites to local businesses".',
  'Lane B': 'Creators who make decks, productivity or side-hustle content.',
  'wave-1': 'The first group of 5 paid creators (they post between 10 and 22 Nov).',
  'wave-2': 'The second, smaller group of paid creators, for image-led builds.',
  beat: 'A feature-launch moment: posts about a feature that go out only once that feature is live.',
  Whop: 'The checkout and payments service Makeborne sells through.',
  pixel: 'A tracking snippet from Meta, TikTok or Google on the website. Not installed before the consent banner.',
  'Advantage+': "Meta's automatic audience: Meta decides who sees the ad within our limits.",
  UGC: 'User-generated content: videos made by creators instead of by us.',
  speedrun: 'A video of one build in real time, start to finish.',
  'end card': 'The last seconds of a video: logo, price and where to click.',
  'go/no-go': 'A yes-or-no decision on a set day.',
  gated: 'Waiting for a condition (for example a feature going live) before it can run.',
  organic: 'Not paid: normal posts.',
  'gross payers': 'New paying customers before refunds.',
};

/**
 * A word or code with its plain meaning: hover or focus shows it as a tooltip, and a tap opens it inline (phones have no
 * hover). Inside a tick-box label or a <summary>, the tap only opens the meaning; it does not tick or toggle.
 */
export function Term({ t, children, meaning: given }: { t: string; children?: ReactNode; meaning?: string }) {
  const meaning = given ?? GLOSSARY[t];
  const [open, setOpen] = useState(false);
  if (!meaning) return <>{children ?? t}</>;
  const toggle = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((o) => !o);
  };
  return (
    <>
      <abbr
        className="term"
        title={meaning}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggle(e);
          else if (e.key === 'Escape') setOpen(false);
        }}
      >
        {children ?? t}
      </abbr>
      {open && (
        <span className="term-tip" role="note">
          {meaning}
        </span>
      )}
    </>
  );
}

export function Chip({ children, tone }: { children: ReactNode; tone?: 'accent' | 'good' | 'warn' | 'bad' | 'owner' | 'muted' }) {
  return <span className={`chip ${tone ? `chip-${tone}` : ''}`}>{children}</span>;
}

/** Turn evidence labels like [F], [E], [O] into small chips. */
export function Labelled({ text }: { text: string }) {
  const parts = text.split(/(\[(?:F|S|V|E|A|O|U)(?:\/[FSVEAOU])*\])/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[([FSVEAOU](?:\/[FSVEAOU])*)\]$/);
        if (!m) return <span key={i}>{p}</span>;
        return (
          <abbr key={i} className={`ev ev-${m[1][0]}`} title={EVIDENCE[m[1][0]]}>
            {m[1]}
          </abbr>
        );
      })}
    </>
  );
}
export const EVIDENCE: Record<string, string> = {
  F: 'Verified fact',
  S: 'Secondary source',
  V: 'Vendor or self-reported claim',
  E: 'Our estimate or arithmetic',
  A: 'Assumption to replace with week 1-2 data',
  O: 'Owner decision',
  U: 'Unverified',
};

/** ariaLabel names what is copied ("Copy hook", "Copy ig-v01 link") so several copy buttons on one screen stay distinct. */
export function CopyButton({ text, label = 'Copy', className, ariaLabel }: { text: string; label?: string; className?: string; ariaLabel?: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'err'>('idle');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        ta.remove();
      } catch {
        ok = false;
      }
    }
    setState(ok ? 'ok' : 'err');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState('idle'), 1600);
  };
  const name = ariaLabel ?? (label ? undefined : 'Copy');
  return (
    <>
      <button type="button" className={`btn btn-ghost btn-sm copy ${className ?? ''}`} onClick={copy} aria-label={name}>
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14"><rect x="5" y="5" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M11 3.5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h.5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        {(label || state !== 'idle') && <span aria-hidden={name ? true : undefined}>{state === 'ok' ? 'Copied' : state === 'err' ? 'Copy failed' : label}</span>}
      </button>
      <span className="sr" aria-live="polite">
        {state === 'ok' ? 'Copied' : state === 'err' ? 'Copy failed' : ''}
      </span>
    </>
  );
}

export function Progress({ value, max, tone, label }: { value: number; max: number; tone?: 'good' | 'warn' | 'bad' | 'accent'; label: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0;
  return (
    <div className={`progress ${tone ? `tone-${tone}` : ''}`} role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={Math.round(value)}>
      <span style={{ width: `${pct * 100}%` }} />
    </div>
  );
}

export function Field(props: { label: string; children: (id: string) => ReactNode; hint?: ReactNode; className?: string }) {
  const id = useId();
  return (
    <div className={`field ${props.className ?? ''}`}>
      <label htmlFor={id}>{props.label}</label>
      {props.children(id)}
      {props.hint && <div className="hint">{props.hint}</div>}
    </div>
  );
}

export function Sheet(props: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (props.open && !d.open) d.showModal();
    if (!props.open && d.open) d.close();
  }, [props.open]);
  return (
    <dialog
      ref={ref}
      className={`sheet ${props.wide ? 'sheet-wide' : ''}`}
      onClose={props.onClose}
      onClick={(e) => {
        if (e.target === ref.current) props.onClose();
      }}
      aria-labelledby="sheet-title"
    >
      <div className="sheet-inner">
        <div className="sheet-head">
          <h2 id="sheet-title">{props.title}</h2>
          <button type="button" className="btn btn-ghost btn-icon" onClick={props.onClose} aria-label="Close">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="sheet-body">{props.open && props.children}</div>
      </div>
    </dialog>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty">{children}</div>;
}

/** Arrow, Home and End keys for a radio group with a roving tabindex (one Tab stop, arrows move and select). */
export function radioKeys<T>(values: T[], current: T, onChange: (v: T) => void) {
  return (e: KeyboardEvent<HTMLElement>) => {
    const i = Math.max(0, values.indexOf(current));
    const n = values.length;
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (i + 1) % n
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (i - 1 + n) % n
      : e.key === 'Home' ? 0
      : e.key === 'End' ? n - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    onChange(values[next]);
    const buttons = e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]');
    buttons[next]?.focus();
  };
}

export function Segmented<T extends string>(props: { value: T; options: { value: T; label: ReactNode }[]; onChange: (v: T) => void; label: string }) {
  const values = props.options.map((o) => o.value);
  return (
    <div className="segmented" role="radiogroup" aria-label={props.label} onKeyDown={radioKeys(values, props.value, props.onChange)}>
      {props.options.map((o, i) => {
        const on = props.value === o.value;
        const stop = on || (i === 0 && !values.includes(props.value));
        return (
          <button key={o.value} type="button" role="radio" aria-checked={on} tabIndex={stop ? 0 : -1} className={on ? 'on' : ''} onClick={() => props.onChange(o.value)}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Pre({ text }: { text: string }) {
  return <pre className="copytext">{text}</pre>;
}

export function Details(props: { summary: ReactNode; children: ReactNode; open?: boolean }) {
  return (
    <details className="details" open={props.open}>
      <summary>{props.summary}</summary>
      <div className="details-body">{props.children}</div>
    </details>
  );
}

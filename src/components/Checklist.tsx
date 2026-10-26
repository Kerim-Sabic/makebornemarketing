import { useId, useState, type ReactNode } from 'react';
import { CopyButton } from './ui';

/** One line: a big tick box, the time, the text, and a "How" button that opens the exact steps underneath. */
export function TickItem(props: { checked: boolean; onToggle: () => void; time?: string; text: ReactNode; tag?: ReactNode; how?: ReactNode; label: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className={`ti ${props.checked ? 'is-done' : ''}`}>
      <div className="ti-row">
        <input id={`${id}-c`} type="checkbox" className="tick" checked={props.checked} onChange={props.onToggle} aria-label={`Done: ${props.label}`} />
        <label htmlFor={`${id}-c`} className="ti-main">
          <span className={`ti-time num ${props.time ? '' : 'is-empty'}`}>{props.time || 'Any'}</span>
          <span className="ti-text">
            {props.text}
            {props.tag && <span className="ti-tag">{props.tag}</span>}
          </span>
        </label>
        {props.how && (
          <button type="button" className="ti-how" aria-expanded={open} aria-controls={`${id}-b`} onClick={() => setOpen((o) => !o)}>
            How
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {props.how && (
        <div id={`${id}-b`} className="ti-body" hidden={!open}>
          {open && props.how}
        </div>
      )}
    </li>
  );
}

/** A labelled block of copyable text (caption, link, headline) inside a "How" panel. */
export function CopyField({ label, text, mono, copyLabel }: { label: string; text: string; mono?: boolean; copyLabel?: string }) {
  return (
    <div className="copyfield">
      <div className="copyfield-head">
        <span className="copyfield-label">{label}</span>
        <CopyButton text={text} label="Copy" ariaLabel={copyLabel ?? `Copy ${label.toLowerCase()}`} />
      </div>
      <p className={mono ? 'copyfield-text mono' : 'copyfield-text'}>{text}</p>
    </div>
  );
}

export function Steps({ items, ordered = true }: { items: ReactNode[]; ordered?: boolean }) {
  if (!items.length) return null;
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className="steps">
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </Tag>
  );
}

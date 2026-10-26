import { Component, Suspense, startTransition, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from 'react';
import { ROUTES, href, parseHash, routeById } from './routes';
import { planDay, sarajevoToday, useStored, WINDOW_DAYS } from './lib/util';
import { radioKeys } from './components/ui';

type Theme = 'system' | 'light' | 'dark';

function useHash() {
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash));
  useEffect(() => {
    // A transition keeps the current page on screen while the next route or calendar day loads,
    // instead of flashing the loading fallback.
    const on = () => startTransition(() => setHash(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

function Mark() {
  return (
    <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true" className="mark">
      <rect width="64" height="64" rx="14" className="mark-bg" />
      <path d="M13 44V28a7.5 7.5 0 0 1 15 0v16M28 28a7.5 7.5 0 0 1 15 0v16" fill="none" className="mark-fg" strokeWidth="5" strokeLinecap="round" />
      <circle cx="51" cy="41" r="3.6" className="mark-dot" />
    </svg>
  );
}

/** Catches a page that throws (or a lazy chunk that fails to load after a redeploy) so the shell and navigation survive. */
class ErrorBoundary extends Component<{ children: ReactNode; label: string }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page failed to render', error, info.componentStack);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="page" role="alert">
        <header className="page-head">
          <div>
            <p className="eyebrow">{this.props.label}</p>
            <h1 className="display">This page failed to render</h1>
            <p className="lede">Your saved numbers are safe in this browser. Reload to try again, or pick another section from the menu.</p>
          </div>
        </header>
        <p className="small muted">{this.state.error.message}</p>
        <button type="button" className="btn" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }
}

const THEMES: Theme[] = ['system', 'light', 'dark'];

export function App({ initialHash }: { initialHash?: string }) {
  const liveHash = useHash();
  const hash = initialHash ?? liveHash;
  const { id, params } = parseHash(hash);
  const route = routeById(id)!;
  const [theme, setTheme] = useStored<Theme>('theme', 'system');
  const [navOpen, setNavOpen] = useState(false);
  const main = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.title = `${route.label} · Makeborne war room`;
    setNavOpen(false);
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    main.current?.focus({ preventScroll: true });
  }, [route.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Escape closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setNavOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [navOpen]);

  const today = sarajevoToday();
  const day = planDay(today);
  const dayLabel =
    day < 1 ? `Launch in ${1 - day} day${day === 0 ? '' : 's'}`
    : day === WINDOW_DAYS + 1 ? `Day ${day} · day-90 review`
    : day > WINDOW_DAYS ? `Window closed (day ${day})`
    : `Day ${day} of ${WINDOW_DAYS}`;

  return (
    <div className={`shell ${navOpen ? 'nav-open' : ''}`}>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); main.current?.focus(); }}>
        Skip to content
      </a>
      <aside className="rail" aria-label="Sections">
        <div className="rail-top">
          <a className="brand" href={href('today')}>
            <Mark />
            <span>
              <b>Makeborne</b>
              <em>war room</em>
            </span>
          </a>
          <button ref={toggleRef} type="button" className="btn btn-ghost btn-icon nav-toggle" aria-expanded={navOpen} aria-controls="nav" onClick={() => setNavOpen((o) => !o)}>
            <span className="sr">Menu</span>
            <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
              {navOpen ? <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /> : <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
        <nav id="nav" className="nav">
          <ol>
            {ROUTES.map((r) => (
              <li key={r.id}>
                <a href={href(r.id)} aria-current={r.id === id ? 'page' : undefined} onClick={() => setNavOpen(false)} onMouseEnter={() => void r.load()} onFocus={() => void r.load()}>
                  <span className="nav-num num">{r.short}</span>
                  <span className="nav-label">{r.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="rail-foot">
            <div className="rail-day">
              <span className="pulse" aria-hidden="true" />
              {dayLabel}
            </div>
            <div className="theme-switch" role="radiogroup" aria-label="Colour theme" onKeyDown={radioKeys(THEMES, theme, setTheme)}>
              {THEMES.map((t) => (
                <button key={t} type="button" role="radio" aria-checked={theme === t} tabIndex={theme === t ? 0 : -1} className={theme === t ? 'on' : ''} onClick={() => setTheme(t)}>
                  {t === 'system' ? 'Auto' : t === 'light' ? 'Light' : 'Dark'}
                </button>
              ))}
            </div>
            <p className="rail-note">Private plan. Static, no trackers, nothing leaves this browser.</p>
          </div>
        </nav>
      </aside>
      <main id="main" ref={main} tabIndex={-1}>
        <ErrorBoundary key={`${route.id}/${params.join('/')}`} label={route.label}>
          <Suspense fallback={<div className="loading" role="status">Loading {route.label}…</div>}>
            <route.Component params={params} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

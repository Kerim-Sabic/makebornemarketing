import { Component, Suspense, startTransition, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from 'react';
import { ROUTES, href, parseHash, routeById } from './routes';
import { planDay, sarajevoToday, useStored, WINDOW_DAYS } from './lib/util';

type Theme = 'system' | 'light' | 'dark';

function useHash() {
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash));
  useEffect(() => {
    // A transition keeps the current page on screen while the next route or day loads,
    // instead of flashing the loading fallback.
    const on = () => startTransition(() => setHash(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}

function Mark() {
  return (
    <svg viewBox="0 0 64 64" width="28" height="28" aria-hidden="true" className="mark">
      <rect width="64" height="64" rx="14" className="mark-bg" />
      <path d="M13 44V28a7.5 7.5 0 0 1 15 0v16M28 28a7.5 7.5 0 0 1 15 0v16" fill="none" className="mark-fg" strokeWidth="5" strokeLinecap="round" />
      <circle cx="51" cy="41" r="3.6" className="mark-dot" />
    </svg>
  );
}

const ICONS: Record<string, ReactNode> = {
  today: <path d="M4 12.5l4.5 4.5L20 6.5" />,
  plan: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  ads: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z" />
      <path d="M17.5 9a4 4 0 0 1 0 6" />
    </>
  ),
  results: <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />,
  library: (
    <>
      <path d="M5 4h4v16H5zM10 4h4v16h-4z" />
      <path d="M15.5 5.2l3.8-1 3.3 15.3-3.8 1z" />
    </>
  ),
};
const Icon = ({ id }: { id: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {ICONS[id]}
  </svg>
);

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
            <p className="lede">Your saved numbers and ticks are safe in this browser. Reload to try again, or pick another tab.</p>
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
const THEME_LABEL: Record<Theme, string> = { system: 'Auto', light: 'Light', dark: 'Dark' };

export function App({ initialHash }: { initialHash?: string }) {
  const liveHash = useHash();
  const hash = initialHash ?? liveHash;
  const { id, params, legacy } = parseHash(hash);
  const route = routeById(id)!;
  const [theme, setTheme] = useStored<Theme>('theme', 'system');
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
  }, [theme]);

  // Old links (#/analytics, #/content/V01, …) land on their new home; the address bar shows the new route.
  useEffect(() => {
    if (!legacy || initialHash) return;
    window.history.replaceState(null, '', href(id, ...params));
  }, [legacy, id, params.join('/')]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.title = `${route.label} · Makeborne war room`;
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    main.current?.focus({ preventScroll: true });
  }, [route.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const today = sarajevoToday();
  const day = planDay(today);
  const dayLabel = day < 1 ? `Starts in ${1 - day} d` : day > WINDOW_DAYS + 1 ? 'Plan finished' : `Day ${Math.min(day, WINDOW_DAYS + 1)} of ${WINDOW_DAYS}`;
  const nextTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];

  const links = (cls: string) =>
    ROUTES.map((r) => (
      <a key={r.id} className={cls} href={href(r.id)} aria-current={r.id === id ? 'page' : undefined} onMouseEnter={() => void r.load()} onFocus={() => void r.load()} onTouchStart={() => void r.load()}>
        <Icon id={r.id} />
        <span>{r.label}</span>
      </a>
    ));

  return (
    <div className="shell">
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); main.current?.focus(); }}>
        Skip to content
      </a>
      <header className="topbar">
        <div className="topbar-in">
          <a className="brand" href={href('today')} aria-label="Makeborne war room, go to Today">
            <Mark />
            <span>
              <b>Makeborne</b>
              <em>war room</em>
            </span>
          </a>
          <nav className="tabs" aria-label="Main">
            {links('tab')}
          </nav>
          <div className="topbar-right">
            <span className="day-pill num">
              <span className="pulse" aria-hidden="true" />
              {dayLabel}
            </span>
            <button type="button" className="btn btn-ghost btn-sm theme-btn" onClick={() => setTheme(nextTheme)} aria-label={`Colour theme: ${THEME_LABEL[theme]}. Switch to ${THEME_LABEL[nextTheme]}`}>
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10 3a7 7 0 0 1 0 14z" fill="currentColor" />
              </svg>
              <span>{THEME_LABEL[theme]}</span>
            </button>
          </div>
        </div>
      </header>
      <main id="main" ref={main} tabIndex={-1}>
        <ErrorBoundary key={`${route.id}/${params.join('/')}`} label={route.label}>
          <Suspense fallback={<div className="loading" role="status">Loading {route.label}…</div>}>
            <route.Component params={params} />
          </Suspense>
        </ErrorBoundary>
        <footer className="foot">Private plan. Static site, no trackers: your ticks and numbers stay in this browser.</footer>
      </main>
      <nav className="tabbar" aria-label="Main">
        {links('tabbar-item')}
      </nav>
    </div>
  );
}

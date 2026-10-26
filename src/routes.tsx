import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export interface RouteProps { params: string[] }

export interface RouteDef {
  id: string;
  label: string;
  blurb: string;
  load: () => Promise<{ default: ComponentType<RouteProps> }>;
  Component: LazyExoticComponent<ComponentType<RouteProps>>;
}

function def(id: string, label: string, blurb: string, load: () => Promise<{ default: ComponentType<RouteProps> }>): RouteDef {
  return { id, label, blurb, load, Component: lazy(load) };
}

/** The four main tabs plus the Library. Every page loads on its own when it is opened. */
export const ROUTES: RouteDef[] = [
  def('today', 'Today', 'One checklist for today', () => import('./pages/Today')),
  def('plan', 'Plan', 'The 13 weeks on one screen', () => import('./pages/Plan')),
  def('ads', 'Ads', 'Every ad, step by step', () => import('./pages/Ads')),
  def('results', 'Results', 'Your numbers and the forecast', () => import('./pages/Results')),
  def('library', 'Library', 'Videos, images, playbooks, tools', () => import('./pages/Library')),
];

export const routeById = (id: string) => ROUTES.find((r) => r.id === id);

/**
 * Old routes (the 11-page site) and where they live now. `#/analytics/sample` still works:
 * parseHash and href both send it to `#/results/sample`, and the App rewrites the address bar.
 */
const LEGACY: Record<string, (p: string[]) => string[]> = {
  strategy: (p) => (p[0] === 'decisions' ? ['plan', 'decisions'] : ['plan']),
  calendar: (p) => (p[0] ? ['today', p[0]] : ['plan']),
  analytics: (p) => ['results', ...p],
  predictions: (p) => ['results', ...p],
  budget: () => ['library', 'budget'],
  funnel: () => ['library', 'funnel'],
  content: (p) => (p[0] ? ['library', /^C/i.test(p[0]) ? 'images' : 'videos', ...p] : ['library', 'videos']),
  outreach: (p) => ['library', 'outreach', ...p],
  tracking: (p) => ['library', 'tracking', ...p],
  research: (p) => ['library', 'research', ...p],
};

/** Map any route (new or old) to its canonical id and params. */
export function canonical(id: string, params: string[]): { id: string; params: string[]; legacy: boolean } {
  if (routeById(id)) return { id, params, legacy: false };
  const m = LEGACY[id];
  if (m) {
    const [nid, ...np] = m(params);
    return { id: nid, params: np, legacy: true };
  }
  return { id: 'today', params: [], legacy: false };
}

export function parseHash(hash: string): { id: string; params: string[]; legacy: boolean } {
  const clean = hash.replace(/^#\/?/, '').split('?')[0];
  const parts = clean.split('/').filter(Boolean).map((p) => {
    try {
      return decodeURIComponent(p);
    } catch {
      return p;
    }
  });
  if (!parts[0]) return { id: 'today', params: [], legacy: false };
  return canonical(parts[0], parts.slice(1));
}

/** Link to a page. Old ids still work and resolve to their new home. */
export function href(id: string, ...params: string[]) {
  const c = canonical(id, params);
  return `#/${[c.id, ...c.params].map(encodeURIComponent).join('/')}`;
}

import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export interface RouteProps { params: string[] }

export interface RouteDef {
  id: string;
  label: string;
  short: string;
  blurb: string;
  load: () => Promise<{ default: ComponentType<RouteProps> }>;
  Component: LazyExoticComponent<ComponentType<RouteProps>>;
}

function def(id: string, label: string, short: string, blurb: string, load: () => Promise<{ default: ComponentType<RouteProps> }>): RouteDef {
  return { id, label, short, blurb, load, Component: lazy(load) };
}

export const ROUTES: RouteDef[] = [
  def('today', 'Today', '01', 'Posts, actions, pace and the next call', () => import('./pages/Today')),
  def('strategy', 'Strategy', '02', 'North star, positioning, beats, decisions', () => import('./pages/Strategy')),
  def('budget', 'Budget', '03', 'The $1,000 allocator and spend log', () => import('./pages/Budget')),
  def('funnel', 'Funnel & ARR', '04', 'The 91-day model and the $1M question', () => import('./pages/Funnel')),
  def('analytics', 'Analytics', '05', 'Daily actuals against the weekly targets', () => import('./pages/Analytics')),
  def('predictions', 'Predictions', '06', 'Forecast, chances and the pace $1M needs', () => import('./pages/Predictions')),
  def('content', 'Content', '07', 'Videos and creatives with scripts and prompts', () => import('./pages/Content')),
  def('calendar', 'Calendar', '08', '90 days, by week and by day', () => import('./pages/Calendar')),
  def('outreach', 'Outreach', '09', 'Templates, launch copy, targets, partners', () => import('./pages/Outreach')),
  def('tracking', 'Tracking', '10', 'UTM builder, events, consent', () => import('./pages/Tracking')),
  def('research', 'Research', '11', 'Reports, sources and verification', () => import('./pages/Research')),
];

export const routeById = (id: string) => ROUTES.find((r) => r.id === id);

export function parseHash(hash: string): { id: string; params: string[] } {
  const clean = hash.replace(/^#\/?/, '').split('?')[0];
  const parts = clean.split('/').filter(Boolean).map((p) => {
    try {
      return decodeURIComponent(p);
    } catch {
      return p;
    }
  });
  const id = parts[0] && routeById(parts[0]) ? parts[0] : 'today';
  return { id, params: parts[0] && routeById(parts[0]) ? parts.slice(1) : [] };
}

export const href = (id: string, ...params: string[]) => `#/${[id, ...params].map(encodeURIComponent).join('/')}`;

import { lazy, Suspense, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DOCS, docBySlug, loadSearchCorpus } from '../lib/docs';
import { Chip, Empty, Page } from '../components/ui';
import { href, type RouteProps } from '../routes';
import { plain } from '../lib/plain';

// Every Library page is its own chunk: opening the Library loads only this index.
const Content = lazy(() => import('./Content'));
const Production = lazy(() => import('./Production'));
const Outreach = lazy(() => import('./Outreach'));
const Tracking = lazy(() => import('./Tracking'));
const Research = lazy(() => import('./Research'));
const Budget = lazy(() => import('./Budget'));
const Funnel = lazy(() => import('./Funnel'));
const Calendar = lazy(() => import('./Calendar'));
const Strategy = lazy(() => import('./Strategy'));
const DocPage = lazy(() => import('./Research').then((m) => ({ default: ({ slug }: { slug: string }) => <m.DocView doc={docBySlug(slug)!} back={{ href: href('library'), label: 'Library' }} /> })));

interface Item { id: string; title: string; blurb: string; howto: string; group: string; words: string; doc?: string; render: (rest: string[]) => ReactNode }
const ITEMS: Item[] = [
  { id: 'videos', howto: 'Open a video when Today names it: the script, the words on screen and the caption are on its sheet.', group: 'Make', title: 'Videos', blurb: '60 videos: hook, script, caption, shot list and status.', words: 'reels tiktok shorts script hook caption', render: (r) => <Content params={r} kind="videos" /> },
  { id: 'images', howto: 'Open an image when Today names it: the exact words, the layout and the sizes are on its sheet.', group: 'Make', title: 'Images', blurb: '48 statics, carousels and stories: exact words, layout and ad variants.', words: 'creatives carousel story static picture', render: (r) => <Content params={r} kind="creatives" /> },
  { id: 'production', howto: 'Nothing to do here daily: Today lists what to make. Come here for the finished files and the full method.', group: 'Make', title: 'Production', blurb: 'How we make videos, what to make each week, and the sheet for every video and image.', words: 'hyperframes templates capture film edit', doc: 'production', render: () => <Production /> },
  { id: 'instagram', howto: 'Use this when you set up or change the Instagram profile, or when Today points here.', group: 'Playbooks', title: 'Instagram playbook', blurb: 'Profile, bio links, the 12-post grid, DM keywords, stories and the first 14 days.', words: 'instagram bio dm keyword reels stories highlights', doc: 'instagram-playbook', render: () => <DocPage slug="instagram-playbook" /> },
  { id: 'ads-playbook', howto: 'Background for the Ads tab. Read it once before the first ad; the Ads tab has the steps.', group: 'Playbooks', title: 'Ads playbook', blurb: 'Why each ad, the platform rules, setting up from Bosnia, and how to read the results.', words: 'meta tiktok google spark partnership boost', doc: 'ads-playbook', render: () => <DocPage slug="ads-playbook" /> },
  { id: 'where-to-post', howto: "Look up a channel: when to post there and which link to use. Today already has each day's posts.", group: 'Playbooks', title: 'Where to post', blurb: 'Every channel and directory, when to post there and which link to use.', words: 'channels directories taaft product hunt reddit', doc: 'where-to-post', render: () => <DocPage slug="where-to-post" /> },
  { id: 'hype-playbook', howto: "Today already has each hype post with its exact words and a copy button. Come here for the rules of each subreddit and platform, and what gets an account banned.", group: 'Playbooks', title: 'Hype playbook', blurb: 'Reddit, X, LinkedIn, Threads, Product Hunt and Bosnian spaces: day by day from Tue 27 Oct to Sun 8 Nov, with every post written out.', words: 'reddit x twitter threads linkedin product hunt hacker news indie hackers subreddit thread hype launch', doc: 'hype-playbook', render: () => <DocPage slug="hype-playbook" /> },
  { id: 'ads-step-by-step', howto: 'Open it on the day an ad card says so, and follow the numbered steps. The Ads tab has the cards and the money.', group: 'Playbooks', title: 'Ads, click by click', blurb: 'Setting up Meta and TikTok from Bosnia, then every click for A01, A02 and A03, the daily 10-minute check, and what to do if an account is rejected.', words: 'meta ads manager tiktok spark partnership pixel verification payment business portfolio click path', doc: 'ads-step-by-step', render: () => <DocPage slug="ads-step-by-step" /> },
  { id: 'outreach', howto: 'Copy a message from here when Today names a template (t01 to t23). Nothing is ever sent for you.', group: 'Playbooks', title: 'Outreach', blurb: 'Message templates, launch copy, who to contact, the partner program, the rules.', words: 'email dm templates creators press product hunt affiliate', render: (r) => <Outreach params={r} /> },
  { id: 'strategy', howto: 'The full plan, for reference. You do not need it for the daily work.', group: 'Playbooks', title: 'Full strategy', blurb: 'The whole plan in full: what we say, who we sell to, the phases, channels and risks.', words: 'strategy positioning icp phases risks scenarios', render: (r) => <Strategy params={r} /> },
  { id: 'tracking', howto: 'Make a new /go/ tracking link here when a post or creator needs one.', group: 'Tools', title: 'Tracking', blurb: 'Make a /go/ short link with the right tracking tags, plus the events and the cookie banner.', words: 'utm link go code builder consent pixel', render: (r) => <Tracking params={r} /> },
  { id: 'budget', howto: 'Log each payment here (or on the ad card) so the $1,000 bar stays true.', group: 'Tools', title: 'Budget detail', blurb: 'The $1,000 by line, the allocator and the spend log.', words: 'money spend log allocation', render: () => <Budget /> },
  { id: 'funnel', howto: 'For what-if questions: move the sliders to see what the plan needs. Not needed daily.', group: 'Tools', title: 'Funnel calculator', blurb: 'The model behind the plan: what visits and sign-up rates give, and what $1M a year needs.', words: 'model forecast calculator arr mrr', render: () => <Funnel /> },
  { id: 'calendar', howto: 'See any day of the 90 at a glance. Tap a day to open it as a checklist on Today.', group: 'Tools', title: '90-day calendar', blurb: 'Every day of the plan in one grid, with its posts and actions.', words: 'calendar grid days', render: (r) => <Calendar params={r} /> },
  { id: 'research', howto: 'The evidence behind the plan, for reference. Search finds any word.', group: 'Evidence', title: 'Research', blurb: 'Every report with its sources and verification, and search inside every document.', words: 'reports sources evidence', render: (r) => <Research params={r} /> },
];
const GROUPS = ['Make', 'Playbooks', 'Tools', 'Evidence'];

export default function Library({ params }: RouteProps) {
  const item = ITEMS.find((i) => i.id === params[0]);
  if (!item) return <LibraryIndex />;
  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        <a href={href('library')}>Library</a>
        <span aria-hidden="true"> › </span>
        <span aria-current="page">{item.title}</span>
      </nav>
      {params.length === 1 && <p className="lib-howto">{plain(item.howto)}</p>}
      <Suspense fallback={<div className="loading" role="status">Loading {item.title}…</div>}>{item.render(params.slice(1))}</Suspense>
    </>
  );
}

function LibraryIndex() {
  const [q, setQ] = useState('');
  const t = q.trim().toLowerCase();
  const [corpus, setCorpus] = useState<Map<string, string> | null>(null);
  useEffect(() => {
    if (t.length < 3 || corpus) return;
    let live = true;
    loadSearchCorpus().then((c) => live && setCorpus(c), () => undefined);
    return () => {
      live = false;
    };
  }, [t, corpus]);
  const items = ITEMS.filter((i) => !t || `${i.title} ${i.blurb} ${i.words}`.toLowerCase().includes(t));
  const docHits = useMemo(() => {
    if (t.length < 3 || !corpus) return [];
    return DOCS.map((d) => ({ d, n: (corpus.get(d.slug) ?? '').split(t).length - 1 }))
      .filter((x) => x.n > 0)
      .sort((a, b) => b.n - a.n)
      .slice(0, 12);
  }, [t, corpus]);
  const docHref = (slug: string) => {
    const own = ITEMS.find((i) => i.doc === slug);
    return own ? href('library', own.id) : href('library', 'research', slug);
  };

  return (
    <Page
      eyebrow={`${ITEMS.length} sections · ${DOCS.length} documents`}
      title={
        <>
          The <em>library</em>
        </>
      }
      lede="Look things up here when Today sends you: every video and image, the playbooks, the tools and the research. Search finds any word."
    >
      <div className="filters" role="search">
        <div className="field grow">
          <label htmlFor="lib-q">Search the library</label>
          <input id="lib-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => void loadSearchCorpus().catch(() => undefined)} placeholder="e.g. Spark, bio link, refund, carousel" />
        </div>
      </div>
      {GROUPS.map((g) => {
        const list = items.filter((i) => i.group === g);
        if (!list.length) return null;
        return (
          <section key={g} className="section" aria-labelledby={`lg-${g}`}>
            <div className="section-head">
              <h2 id={`lg-${g}`}>{g}</h2>
            </div>
            <div className="libgrid">
              {list.map((i) => (
                <a key={i.id} className="card libcard" href={href('library', i.id)}>
                  <span className="libcard-title">{i.title}</span>
                  <span className="small muted">{i.blurb}</span>
                  <span className="libcard-go" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
            </div>
          </section>
        );
      })}
      {t.length >= 3 && (
        <section className="section" aria-labelledby="lg-docs">
          <div className="section-head">
            <h2 id="lg-docs">Inside the documents</h2>
          </div>
          {!corpus ? (
            <p className="small muted" role="status">
              Searching…
            </p>
          ) : docHits.length === 0 ? (
            <Empty>No document mentions “{q}”.</Empty>
          ) : (
            <ul className="linklist">
              {docHits.map(({ d, n }) => (
                <li key={d.slug}>
                  <a href={docHref(d.slug)}>{d.title}</a> <Chip tone="accent">{n} matches</Chip> <span className="tiny muted">{d.path}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      {!items.length && t.length < 3 && <Empty>No section matches “{q}”.</Empty>}
    </Page>
  );
}


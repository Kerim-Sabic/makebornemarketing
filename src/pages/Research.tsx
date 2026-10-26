import { use, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DOCS, docBySlug, loadDocSource, loadSearchCorpus, type Doc, type DocGroup } from '../lib/docs';
import { renderMarkdown } from '../components/Markdown';
import { Card, Chip, Empty, Page } from '../components/ui';
import { href, type RouteProps } from '../routes';

const GROUP_LABEL: Record<DocGroup, string> = { plan: 'Plan', research: 'Research reports', content: 'Content and tracking' };

export default function Research({ params }: RouteProps) {
  const doc = params[0] ? docBySlug(params[0]) : undefined;
  if (params[0] && !doc)
    return (
      <Page title="Not in the library" lede={`There is no document called "${params[0]}". It may have been renamed or not yet written.`}>
        <a className="btn" href={href('research')}>
          All documents
        </a>
      </Page>
    );
  return doc ? <DocView doc={doc} /> : <DocIndex />;
}

function DocIndex() {
  const [q, setQ] = useState('');
  // The full text loads only when someone searches; the index itself is a few kB.
  const [corpus, setCorpus] = useState<Map<string, string> | null>(null);
  const [corpusError, setCorpusError] = useState('');
  const searching = q.trim().length > 0;
  useEffect(() => {
    if (!searching || corpus) return;
    let live = true;
    loadSearchCorpus().then(
      (c) => live && setCorpus(c),
      (e) => live && setCorpusError((e as Error).message),
    );
    return () => {
      live = false;
    };
  }, [searching, corpus]);
  const hits = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t || !corpus) return DOCS.map((d) => ({ d, n: 0 }));
    return DOCS.map((d) => ({ d, n: (corpus.get(d.slug) ?? '').split(t).length - 1 })).filter((x) => x.n > 0);
  }, [q, corpus]);
  const pending = searching && !corpus;
  const groups = (['research', 'plan', 'content'] as DocGroup[]).map((g) => [g, hits.filter((h) => h.d.group === g)] as const);
  return (
    <Page
      eyebrow={`${DOCS.length} documents · ${Math.round(DOCS.reduce((a, d) => a + d.words, 0) / 1000)}k words · read 26 Oct 2026`}
      title={
        <>
          The <em>evidence</em>
        </>
      }
      lede="Research reports with their sources and verification tables, the master plan and its drafts, and the content and tracking documents. A report's Verification section overrides its body."
    >
      <div className="filters" role="search">
        <div className="field grow">
          <label htmlFor="r-q">Search all documents</label>
          <input id="r-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => void loadSearchCorpus().catch(() => undefined)} placeholder="e.g. Content Rewards, Spark, refund" />
        </div>
      </div>
      <div className="row small muted" style={{ marginBottom: 24, gap: 12 }}>
        Evidence labels:
        {(['F', 'S', 'V', 'E', 'A', 'O', 'U'] as const).map((l) => (
          <span key={l}>
            <abbr className={`ev ev-${l}`}>{l}</abbr> {({ F: 'verified fact', S: 'secondary', V: 'vendor claim', E: 'estimate', A: 'assumption', O: 'owner decision', U: 'unverified' } as const)[l]}
          </span>
        ))}
      </div>
      <p className="sr" aria-live="polite">
        {pending ? 'Loading the search index…' : searching ? `${hits.length} document${hits.length === 1 ? '' : 's'} match` : ''}
      </p>
      {pending && (
        <p className="small muted" role="status">
          {corpusError ? `Search could not load: ${corpusError}` : 'Loading the full text for search…'}
        </p>
      )}
      {!pending && hits.length === 0 && <Empty>No document mentions “{q}”.</Empty>}
      {groups.map(([g, list]) =>
        list.length ? (
          <section key={g} className="section">
            <div className="section-head">
              <h2>{GROUP_LABEL[g]}</h2>
            </div>
            <div className="items">
              {list.map(({ d, n }) => (
                <a key={d.slug} href={href('research', d.slug)} className="card item" style={{ textDecoration: 'none' }}>
                  <span className="item-id">{d.path}</span>
                  <span className="item-title">{d.title}</span>
                  <span className="small muted" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {d.intro}
                  </span>
                  <span className="row" style={{ marginTop: 'auto' }}>
                    <Chip tone="muted">{Math.round(d.words / 100) / 10}k words</Chip>
                    {d.hasVerification && <Chip tone="good">Verification table</Chip>}
                    {d.hasSources && <Chip tone="muted">Sources</Chip>}
                    {n > 0 && <Chip tone="accent">{n} matches</Chip>}
                  </span>
                </a>
              ))}
            </div>
          </section>
        ) : null,
      )}
    </Page>
  );
}

/** One document with its contents. Library pages (playbooks, production) pass their own back link and an optional intro. */
export function DocView({ doc, back, before }: { doc: Doc; back?: { href: string; label: string }; before?: ReactNode }) {
  const source = use(loadDocSource(doc));
  const { html, headings } = useMemo(() => renderMarkdown(source, doc.slug), [source, doc.slug]);
  const toc = headings.filter((h) => h.depth === 2 || h.depth === 3);
  const evidence = headings.filter((h) => h.depth === 2 && /verification|sources/i.test(h.text));
  const idx = DOCS.findIndex((d) => d.slug === doc.slug);
  const prev = DOCS[idx - 1];
  const next = DOCS[idx + 1];
  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ block: 'start' });
      el.focus({ preventScroll: true });
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [doc.slug]);
  return (
    <div className="page">
      <div className="row-between" style={{ marginBottom: 22 }}>
        <a href={back?.href ?? href('research')} className="small">
          ← {back?.label ?? 'All documents'}
        </a>
        <div className="row">
          {evidence.map((h) => (
            <button key={h.id} type="button" className="btn btn-sm btn-ghost" onClick={() => jump(h.id)}>
              Jump to {/verification/i.test(h.text) ? 'verification' : 'sources'}
            </button>
          ))}
          <span className="code">{doc.path}</span>
        </div>
      </div>
      {before}
      <div className="docs-layout">
        <nav className="toc" aria-label="Contents">
          <p className="kicker">Contents</p>
          <ol>
            {toc.map((h) => (
              <li key={h.id} className={`d${h.depth} ${/verification|sources/i.test(h.text) ? 'ev-h' : ''}`}>
                <button type="button" onClick={() => jump(h.id)}>
                  {h.text}
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <article>
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          {!back && (
          <Card className="card-flat" >
            <div className="row-between">
              {prev ? <a href={href('research', prev.slug)}>← {prev.title}</a> : <span />}
              {next ? <a href={href('research', next.slug)}>{next.title} →</a> : <span />}
            </div>
          </Card>
          )}
        </article>
      </div>
    </div>
  );
}

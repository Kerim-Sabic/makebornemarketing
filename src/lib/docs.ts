// Every Markdown document in the plan. The index (titles, intros, word counts) is built at build time by
// scripts/data-plugin.mjs; each document's text is its own lazy chunk, loaded when it is opened or searched.
import { DOC_INDEX, type DocMeta } from 'virtual:war-room/docs-index';

const loaders = import.meta.glob(['../../research/*.md', '../../plan/*.md', '../../content/*.md'], { query: '?raw', import: 'default' }) as Record<
  string,
  () => Promise<string>
>;

export type DocGroup = DocMeta['group'];
export type Doc = DocMeta;

const order: Record<DocGroup, number> = { plan: 0, research: 1, content: 2 };

export const DOCS: Doc[] = [...DOC_INDEX].sort(
  (a, b) => order[a.group] - order[b.group] || (a.slug === 'strategy' ? -1 : b.slug === 'strategy' ? 1 : a.slug.localeCompare(b.slug)),
);

export const docBySlug = (slug: string) => DOCS.find((d) => d.slug === slug);

type Tracked = Promise<string> & { status?: string; value?: string; reason?: unknown };
const cache = new Map<string, Tracked>();

/** The document's Markdown, as one cached promise per document (React's use() reads its recorded status). */
export function loadDocSource(doc: Doc): Promise<string> {
  let p = cache.get(doc.slug);
  if (!p) {
    const load = loaders[`../../${doc.path}`];
    const t = (load ? load() : Promise.resolve('')) as Tracked;
    t.then(
      (v) => {
        t.status = 'fulfilled';
        t.value = v;
      },
      (e) => {
        t.status = 'rejected';
        t.reason = e;
        cache.delete(doc.slug);
      },
    );
    p = t;
    cache.set(doc.slug, p);
  }
  return p;
}

let corpus: Promise<Map<string, string>> | null = null;
/** Lower-cased text of every document, for the library search. Loaded only once the user searches. */
export function loadSearchCorpus(): Promise<Map<string, string>> {
  corpus ??= Promise.all(DOCS.map(async (d) => [d.slug, (await loadDocSource(d)).toLowerCase()] as const)).then((pairs) => new Map(pairs));
  return corpus;
}

export { docRoute } from './docRoute';

export { extractSection } from './sections';

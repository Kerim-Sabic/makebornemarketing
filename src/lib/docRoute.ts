// Lightweight link mapping, kept separate from docs.ts so rendering Markdown does not pull every document into the bundle.

/** Documents that have their own Library page; every other document opens in Library > Research. */
export const DOC_PAGES: Record<string, string> = {
  production: 'production',
  'instagram-playbook': 'instagram',
  'ads-playbook': 'ads-playbook',
  'where-to-post': 'where-to-post',
};

/** Map a repo path like `research/paid-acquisition.md` (optionally with ../ or a #section) to an in-app route. */
export function docRoute(href: string): string | null {
  const m = href.match(/(?:^|\/)(research|plan|content)\/([\w-]+)\.md(?:#.*)?$/);
  if (!m) return null;
  const page = m[1] === 'content' ? DOC_PAGES[m[2]] : undefined;
  return page ? `#/library/${page}` : `#/library/research/${m[2]}`;
}

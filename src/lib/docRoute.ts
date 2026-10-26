// Lightweight link mapping, kept separate from docs.ts so rendering Markdown does not pull every document into the bundle.

/** Map a repo path like `research/paid-acquisition.md` (optionally with ../ or a #section) to an in-app route. */
export function docRoute(href: string): string | null {
  const m = href.match(/(?:^|\/)(research|plan|content)\/([\w-]+)\.md(?:#.*)?$/);
  return m ? `#/research/${m[2]}` : null;
}

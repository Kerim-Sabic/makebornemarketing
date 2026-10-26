import { Marked, type Tokens } from 'marked';
import { useMemo } from 'react';
import { docRoute } from '../lib/docRoute';

export interface Heading { id: string; text: string; depth: number }

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');
export const slugify = (s: string) =>
  stripTags(s)
    .toLowerCase()
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'section';

/** Render Markdown to HTML with heading ids, safe links, wrapped tables and evidence-label chips. */
export function renderMarkdown(src: string, idPrefix = 'md') {
  const headings: Heading[] = [];
  const seen = new Map<string, number>();
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        let id = `${idPrefix}-${slugify(inner)}`;
        const n = seen.get(id) ?? 0;
        seen.set(id, n + 1);
        if (n) id += `-${n}`;
        const plain = stripTags(inner).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        headings.push({ id, text: plain, depth });
        const cls = /verification|sources|evidence|research limits/i.test(plain) ? ' class="h-evidence"' : '';
        return `<h${depth} id="${id}"${cls} tabindex="-1">${inner}</h${depth}>`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const internal = docRoute(href);
        if (internal) return `<a href="${internal}">${inner}</a>`;
        if (/^https?:\/\//i.test(href)) {
          return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer nofollow"${title ? ` title="${escapeHtml(title)}"` : ''}>${inner}</a>`;
        }
        if (/^mailto:/i.test(href)) return `<span>${inner}</span>`;
        return `<span class="dead-link" title="${escapeHtml(href)}">${inner}</span>`;
      },
      codespan({ text }: Tokens.Codespan) {
        const raw = text.replace(/&amp;/g, '&');
        const internal = docRoute(raw.replace(/\s.*$/, ''));
        if (internal) return `<a class="code-link" href="${internal}"><code>${text}</code></a>`;
        return `<code>${text}</code>`;
      },
      html({ text }: Tokens.HTML | Tokens.Tag) {
        // Plan documents are trusted, but raw HTML is shown as text so nothing in a doc can run.
        return escapeHtml(text);
      },
    },
  });
  let html = md.parse(src, { async: false }) as string;
  html = html
    .replace(/<table>/g, '<div class="table-wrap" tabindex="0"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/\[((?:F|S|V|E|A|O|U)(?:\/(?:F|S|V|E|A|O|U))*)\]/g, (_m, l: string) => `<abbr class="ev ev-${l[0]}" title="Evidence label ${l}">${l}</abbr>`);
  return { html, headings };
}

export function Markdown({ source, idPrefix, className }: { source: string; idPrefix?: string; className?: string }) {
  const { html } = useMemo(() => renderMarkdown(source, idPrefix), [source, idPrefix]);
  return <div className={`prose ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

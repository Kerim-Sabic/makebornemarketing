/** Return the Markdown from a heading (matched by its text prefix) up to the next heading of the same or higher level. */
export function extractSection(source: string, headingStartsWith: string): string {
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((l) => /^#{1,6}\s/.test(l) && l.replace(/^#+\s*/, '').startsWith(headingStartsWith));
  if (start < 0) return '';
  const level = lines[start].match(/^#+/)![0].length;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#+)\s/);
    if (m && m[1].length <= level) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

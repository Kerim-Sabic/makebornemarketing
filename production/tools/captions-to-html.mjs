// Turn a word-timed transcript into the captions sub-composition every template mounts.
//
//   npx hyperframes transcribe assets/audio/vo.wav --model small.en      (writes assets/transcript.json)
//   node production/tools/captions-to-html.mjs assets/transcript.json compositions/captions.html --max-words 4 [--fix "make born=Makeborne"]
//
// Input: [{ "text": "Hello", "start": 0.0, "end": 0.5 }, ...] (the transcribe output; also accepts { words: [...] }).
// Groups: at most --max-words words (3-5 conversational, 2-3 high energy), broken at sentence ends and pauses >= 150 ms.
// One group visible at a time, opening 0.05 s before its first word, closing at its last word's end, with a hard kill.
// Read the transcript first: fix brand words (Makeborne, Sarajevo, PPTX) with --fix "wrong=Right" (repeatable).
import fs from "node:fs";

const args = process.argv.slice(2);
const [src, dst] = args;
if (!src || !dst) {
  console.error("usage: node captions-to-html.mjs <transcript.json> <out.html> [--max-words 4] [--fix a=b]");
  process.exit(1);
}
const maxWords = Number(args[args.indexOf("--max-words") + 1]) || 4;
const fixes = args.flatMap((a, i) => (a === "--fix" ? [args[i + 1].split("=")] : []));
const raw = JSON.parse(fs.readFileSync(src, "utf8"));
// Per-word fixes only ("makeborn=Makeborne"): timings stay matched by position, never by text.
const fixMap = new Map(fixes.map(([a, b]) => [a.toLowerCase(), b]));
const words = (Array.isArray(raw) ? raw : raw.words || [])
  .filter((w) => /[\p{L}\p{N}]/u.test(w.text))
  .map((w) => {
    const m = /^(.*?)([.,!?;:]*)$/.exec(w.text.trim());
    const fixed = fixMap.get(m[1].toLowerCase());
    return { ...w, text: fixed ? fixed + m[2] : w.text.trim() };
  });

const groups = [];
let cur = [];
for (let k = 0; k < words.length; k++) {
  const w = words[k];
  cur.push(w);
  const next = words[k + 1];
  const sentenceEnd = /[.!?]$/.test(w.text);
  const pause = next ? next.start - w.end >= 0.15 : true;
  if (cur.length >= maxWords || sentenceEnd || pause) {
    groups.push(cur);
    cur = [];
  }
}
if (cur.length) groups.push(cur);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const total = Math.max(...words.map((w) => w.end), 1) + 0.5;
const items = groups
  .map((g, n) => `      <div id="cap-${n}" class="cap"><span class="cap-text">${esc(g.map((w) => w.text).join(" "))}</span></div>`)
  .join("\n");
const tweens = groups
  .map((g, n) => {
    const s = Math.max(0.1, g[0].start - 0.05).toFixed(3);
    const e = Math.max(g[g.length - 1].end, g[0].start + 0.6).toFixed(3);
    return `      tl.fromTo("#cap-${n}", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, ${s});
      tl.to("#cap-${n}", { opacity: 0, duration: 0.1, ease: "power2.in" }, ${(e - 0.1).toFixed(3)});
      tl.set("#cap-${n}", { opacity: 0, visibility: "hidden" }, ${e});`;
  })
  .join("\n");

const html = `<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <link rel="stylesheet" href="assets/shared/brand.css" />
      <style>
        #root { position: absolute; inset: 0; pointer-events: none; }
        .cap { position: absolute; left: 0; right: 0; top: var(--caption-y, 1060px); display: flex; justify-content: center; opacity: 0; overflow: visible; }
        .cap-text {
          max-width: 82%; text-align: center; padding: 12px 24px; border-radius: 22px;
          background: rgba(255, 255, 255, 0.94); box-shadow: var(--mb-shadow-contact);
          font-family: var(--mb-sans); font-weight: 640; letter-spacing: -0.02em; line-height: 1.12;
          font-size: calc(52px * var(--type-scale, 1)); color: var(--mb-ink);
        }
      </style>
      <div id="root" data-composition-id="captions" data-width="1080" data-height="1920" data-duration="${total.toFixed(2)}">
${items}
      </div>
      <script>
      const tl = gsap.timeline({ paused: true });
${tweens}
      window.__timelines["captions"] = tl;
      </script>
    </template>
  </body>
</html>
`;
fs.writeFileSync(dst, html);
console.log(`${groups.length} caption groups -> ${dst} (${total.toFixed(1)} s). Set the root size to the project's format before rendering.`);

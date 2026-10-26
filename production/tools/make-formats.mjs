// Build native format variants of a HyperFrames project (the v9 Fly-over pattern: edit the master, re-run this).
//
//   node production/tools/make-formats.mjs <projectDir> --formats 4x5,1x1,16x9
//
// The master is whatever size the project's index.html root declares. Each variant is a full project in
// <projectDir>/formats/<fmt>/ with data-width/data-height, the viewport and the root's fmt-* class swapped in every
// .html file, so brand.css can re-lay out type and safe zones per format. Recompose, never crop: if a scene needs a
// different arrangement, add a .fmt-<fmt> rule in that scene's <style>; do not scale the master.
import fs from "node:fs";
import path from "node:path";

const FORMATS = {
  "9x16": { w: 1080, h: 1920 },
  "4x5": { w: 1080, h: 1350 },
  "1x1": { w: 1080, h: 1080 },
  "16x9": { w: 1920, h: 1080 },
};
const args = process.argv.slice(2);
const dir = path.resolve(args[0] || ".");
const i = args.indexOf("--formats");
const wanted = (i >= 0 ? args[i + 1] : "").split(",").filter(Boolean);
const index = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const mw = Number(/data-width="(\d+)"/.exec(index)?.[1]);
const mh = Number(/data-height="(\d+)"/.exec(index)?.[1]);
const master = Object.entries(FORMATS).find(([, f]) => f.w === mw && f.h === mh)?.[0];
if (!master) throw new Error(`master size ${mw}x${mh} is not one of ${Object.keys(FORMATS).join(", ")}`);

const SKIP = new Set(["formats", "renders", ".hyperframes", "node_modules"]);
const copy = (src, dst, fmt) => {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const f of fs.readdirSync(src)) if (!SKIP.has(f)) copy(path.join(src, f), path.join(dst, f), fmt);
    return;
  }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  if (!src.endsWith(".html")) return fs.copyFileSync(src, dst);
  const f = FORMATS[fmt];
  const html = fs
    .readFileSync(src, "utf8")
    .replaceAll(`data-width="${mw}"`, `data-width="${f.w}"`)
    .replaceAll(`data-height="${mh}"`, `data-height="${f.h}"`)
    .replaceAll(`width=${mw}, height=${mh}`, `width=${f.w}, height=${f.h}`)
    .replaceAll(`fmt-${master}`, `fmt-${fmt}`);
  fs.writeFileSync(dst, html);
};

for (const fmt of wanted) {
  if (!FORMATS[fmt]) throw new Error(`unknown format ${fmt}`);
  if (fmt === master) continue;
  const out = path.join(dir, "formats", fmt);
  fs.rmSync(out, { recursive: true, force: true });
  copy(dir, out, fmt);
  const meta = path.join(out, "meta.json");
  const m = fs.existsSync(meta) ? JSON.parse(fs.readFileSync(meta, "utf8")) : {};
  fs.writeFileSync(meta, JSON.stringify({ ...m, id: `${m.id || path.basename(dir)}-${fmt}`, name: `${m.name || path.basename(dir)}-${fmt}` }, null, 2) + "\n");
  console.log(`built formats/${fmt} (${FORMATS[fmt].w}x${FORMATS[fmt].h}) from the ${master} master`);
}

// Start a HyperFrames project for one content item from a template.
//
//   node production/tools/new-project.mjs <template> <contentId> [--episode 2] [--formats 4x5,16x9] [--out <dir>]
//   node production/tools/new-project.mjs T02-speedrun V02 --episode 1 --formats 4x5,16x9
//
// Writes production/projects/<contentId>-e<episode>/ (gitignored: captures and renders never reach this public repo),
// copies the template, the shared brand files and the fonts (from the war-room's own @fontsource packages),
// writes BRIEF.md from data/videos.json or data/creatives.json plus data/production.json, then builds the
// format variants with make-formats.mjs. Nothing is fetched from the network.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const here = path.dirname(fileURLToPath(import.meta.url));
const prod = path.resolve(here, "..");
const repo = path.resolve(prod, "..");

const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : dflt;
};
const [templateArg, contentId] = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
if (!templateArg || !contentId) {
  console.error("usage: node production/tools/new-project.mjs <template> <contentId> [--episode N] [--formats 4x5,16x9] [--out dir]");
  process.exit(1);
}
const episode = flag("episode", "1");
const formats = (flag("formats", "") || "").split(",").filter(Boolean);
const templateDir = fs.existsSync(templateArg) ? path.resolve(templateArg) : path.join(prod, "templates", templateArg);
if (!fs.existsSync(path.join(templateDir, "index.html"))) {
  console.error(`template not found: ${templateDir}`);
  process.exit(1);
}
const out = path.resolve(flag("out", path.join(prod, "projects", `${contentId}-e${episode}`)));
if (fs.existsSync(out) && fs.readdirSync(out).length) {
  console.error(`refusing to overwrite a non-empty project: ${out}`);
  process.exit(1);
}

const copy = (src, dst, skip = () => false) => {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const f of fs.readdirSync(src)) if (!skip(f)) copy(path.join(src, f), path.join(dst, f), skip);
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
};

copy(templateDir, out, (f) => ["formats", "renders", ".hyperframes", "node_modules"].includes(f));
copy(path.join(prod, "shared"), path.join(out, "assets", "shared"));
// Every template mounts compositions/captions.html; start from the shared placeholder unless the template ships its own.
const captions = path.join(out, "compositions", "captions.html");
if (!fs.existsSync(captions)) copy(path.join(prod, "shared", "captions.html"), captions);

const fonts = [
  ["node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", "inter-latin-wght-normal.woff2"],
  ["node_modules/@fontsource/newsreader/files/newsreader-latin-400-italic.woff2", "newsreader-latin-400-italic.woff2"],
];
for (const [src, name] of fonts) {
  const from = path.join(repo, src);
  if (fs.existsSync(from)) copy(from, path.join(out, "assets", "fonts", name));
  else console.warn(`font missing (run npm install in the repo root): ${src}`);
}
for (const d of ["capture", "gen", "face", "audio"]) fs.mkdirSync(path.join(out, "assets", d), { recursive: true });

// BRIEF.md from the plan's own data
const read = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
const videos = read(path.join(repo, "data", "videos.json")) || [];
const creatives = read(path.join(repo, "data", "creatives.json")) || [];
const production = read(path.join(repo, "data", "production.json")) || {};
const item = videos.find((v) => v.id === contentId) || creatives.find((c) => c.id === contentId);
const plan = (production.perVideo || []).concat(production.perCreative || []).find((p) => p.id === contentId);
const lines = [`# ${contentId} episode ${episode}${item ? `: ${item.title || item.concept}` : ""}`, ""];
if (item?.hook) lines.push(`**Hook (frame 0):** ${item.hook.line}`, `**Frame-0 picture:** ${item.hook.visual}`, "");
if (item?.script) {
  lines.push("| Time | Picture | On-screen text | Voice-over |", "|---|---|---|---|");
  for (const s of item.script) lines.push(`| ${s.t} | ${s.visual} | ${s.onScreenText} | ${s.voiceover} |`);
  lines.push("");
}
if (item?.headline) lines.push(`**Headline:** ${item.headline}`, `**Subcopy:** ${item.subcopy}`, "");
if (plan) lines.push("## Production plan (data/production.json)", "", "```json", JSON.stringify(plan, null, 2), "```", "");
lines.push("## Before posting", "", "Run the quality bar in content/production.md section 7, then `npx hyperframes check --json` and `npx hyperframes snapshot --review`.");
fs.writeFileSync(path.join(out, "BRIEF.md"), lines.join("\n") + "\n");
fs.writeFileSync(path.join(out, "meta.json"), JSON.stringify({ id: `${contentId}-e${episode}`, name: `${contentId}-e${episode}` }, null, 2) + "\n");

console.log(`created ${path.relative(repo, out)}`);
if (formats.length) {
  const r = spawnSync(process.execPath, [path.join(here, "make-formats.mjs"), out, "--formats", formats.join(",")], { stdio: "inherit" });
  process.exit(r.status ?? 0);
}

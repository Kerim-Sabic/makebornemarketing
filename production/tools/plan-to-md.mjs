// Regenerate content/production.md and production/templates/README.md from data/production.json
// (data/production.json is the source of truth; edit it, then run: node production/tools/plan-to-md.mjs)
import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";
const repo = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".."));
const P = JSON.parse(fs.readFileSync(path.join(repo, "data/production.json"), "utf8"));
const videos = JSON.parse(fs.readFileSync(path.join(repo, "data/videos.json"), "utf8"));
const creatives = JSON.parse(fs.readFileSync(path.join(repo, "data/creatives.json"), "utf8"));
const vById = Object.fromEntries(videos.map((v) => [v.id, v]));
const cById = Object.fromEntries(creatives.map((c) => [c.id, c]));
const src = Object.fromEntries(P.sources.map((s) => [s.id, s]));
const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const L = [];
const h = (n, t) => L.push("", `${"#".repeat(n)} ${t}`, "");
const p = (t) => L.push(t, "");
const ul = (arr) => { arr.forEach((x) => L.push(`- ${x}`)); L.push(""); };
const ol = (arr) => { arr.forEach((x, i) => L.push(`${i + 1}. ${x}`)); L.push(""); };
const table = (head, rows) => { L.push(`| ${head.join(" | ")} |`, `|${head.map(() => "---").join("|")}|`); rows.forEach((r) => L.push(`| ${r.map(esc).join(" | ")} |`)); L.push(""); };
const cite = (id) => (src[id] ? `[${src[id].label.split(" ")[0]}] (${src[id].url}, ${src[id].date})` : "");

L.push("# Makeborne launch production plan", "");
p(`Written ${P.meta.updated} by the head of creative production, for the owner and whoever edits. **Status: plan only. Nothing was bought, generated, signed up for or posted.** The machine-readable version is \`data/production.json\` (same content, plus every variable). Template scaffolds are in \`production/\`. Evidence labels: [F] fact from a cited source, [V] vendor or agency data, [U] unverified, [O] owner decision.`);

// 0. simple
h(2, "0. The short version (read this first)");
const S = P.simple.howWeMakeVideos;
h(3, S.title);
p(S.intro);
for (const w of S.ways) {
  L.push(`**${w.name}** (${w.share}). ${w.covers}. ${w.time}.`, "");
  ol(w.steps);
}
p(S.everythingElse);
p(`**Four rules:** ${S.rules.join(" ")}`);
h(3, "This week's production (week 1 is the launch-week plan in section 13)");
for (const wk of P.simple.weeks) {
  L.push(`<details><summary><strong>Week ${wk.week}</strong> (${wk.dates})</summary>`, "");
  for (const it of wk.items) {
    const links = it.ids.length ? " " + it.ids.map((id) => `[${id}](#${id.toLowerCase()})`).join(" ") : "";
    L.push(`- [ ] ${it.text}${links}`);
  }
  L.push("", "</details>", "");
}
p("Each line links to that piece's full sheet below (sections 4 and 5). The war-room content page also opens it at `#/content/<id>`.");

// 1. overview
h(2, "1. The stack and why");
p(`**Recommendation: ${P.stack.recommendation}** ${P.stack.why}`);
ul([
  "**Real screen captures are the backbone.** Conversion content for AI tools shows the visible UI, the finished artifact and a next step " + cite("lightreel") + "; text-plus-product statics lead Meta hit rates " + cite("motion-2026") + "; fully AI-made versions of the same ads did worse on sales impact than human-made ones " + cite("syracuse-ipsos") + "; and the AI tells (uncanny visuals, fast montages that hide flaws) are what get ads pulled " + cite("nng-ai-ad") + ". No controlled public study of screen recording versus AI b-roll for SaaS exists (searched 26 Oct 2026; vendor opinions only " + cite("arcade-demo") + ").",
  "**HyperFrames does the whole edit.** Every overlay letter is HTML, so type is exact; speed chips, captions, format variants and stills come from the same projects; it renders locally for $0 and the v9/v10/v12-v14 films prove the pipeline.",
  "**The founder is the trust engine.** Day-N videos, the voice on every speedrun, no synthetic voice.",
  "**Higgsfield is a narrow, optional test,** not part of the base stack: a 2.5 s labelled opening shot with no text, no people and no product, tested as a B-variant against a real-UI A-variant. Not for product shots, outputs, avatars, UGC ads or testimonials.",
  "**The mix:** about 90% of posted seconds are real (captures, founder, real B-roll), at most 10% generated, and 0 generated product images. Of the 48 creatives, 36 are real screenshots composed in HyperFrames, 8 are typeset HyperFrames stills, 4 are built inside Makeborne itself, and none uses AI-generated art.",
]);
h(3, "Tools");
table(["Tool", "Role", "Use for", "Plan and cost", "Rights notes"], P.tools.map((t) => [t.name, t.role, t.useFor.join("; "), `${t.plan} ($${t.costUSDMonth}/month)`, t.rights]));
h(3, "Higgsfield, researched (26 Oct 2026)");
const R = P.research.higgsfield;
ul([`**Products:** ${R.products.join("; ")}.`, `**Pricing:** ${R.pricing}`, `**Credits per generation:** ${R.creditsPerGeneration}`, `**Rights and watermarks:** ${R.rights}`, `**Limits:** ${R.limits}`, `**API:** ${R.api}`, `**Strengths for short-form ads:** ${R.strengths}`, `**Weaknesses:** ${R.weaknesses}`, `**Verdict for Makeborne:** ${R.verdictForMakeborne}`]);
p("Sources: " + R.sources.map((id) => `${src[id].url} (${src[id].date}, ${src[id].label})`).join("; ") + ".");
h(3, "Alternatives, only where clearly better");
ul([
  "**Veo, Kling, Seedance directly:** no. Higgsfield already exposes them; a second subscription adds cost and a second rights regime for five test shots.",
  "**Runway:** no job in this plan needs it.",
  "**CapCut for the final edit and captions:** no. HyperFrames covers both; CapCut's reported terms grant a broad licence to uploaded content [U] " + cite("capcut") + ", which is wrong for unreleased product and creator footage. TikTok's own editor covers reply bubbles and Stitch.",
  "**ElevenLabs for voice:** not now. The founder's voice is the brand. If a faceless series is ever approved, Starter is about $6/month with a commercial licence; the free tier is non-commercial " + cite("elevenlabs") + ".",
  "**The existing film-library image script** (made the v13/v14 stills, about $0.06 per 2560x1440 still per the v14 run log): the cheapest way to make a still plate if a hook ever needs one; animate it with a HyperFrames camera move. Never for product imagery.",
]);
h(3, "Real screen recordings vs AI b-roll: the recommended mix");
p(P.research.realVsAiBroll.finding);
p(`**Mix:** ${P.research.realVsAiBroll.recommendation}`);

// 2. pipelines
h(2, "2. Pipelines, step by step (SOPs)");
h(3, "Capture standards (every pipeline)");
ul(Object.entries(P.captureStandards).map(([k, v]) => `**${k}:** ${v}`));
for (const pl of P.pipelines) {
  h(3, `${pl.id}: ${pl.name}`);
  p(`Used by: ${pl.usedBy}. Template: ${pl.template}. Time: about ${pl.minutes.firstTime} min the first time, ${pl.minutes.repeat} min after.`);
  ol(pl.steps);
}

// 3. templates
h(2, "3. Template specs (build once, in `production/templates/`)");
p("Each template is a HyperFrames project skeleton that follows the composition contract: one paused GSAP timeline registered on `window.__timelines`, `data-*` timing, variables on the root `<html>`, media timed on the element itself, captions on one captions track, no `Date.now()` or unseeded randomness. Start a piece with `node production/tools/new-project.mjs <template> <id> --episode <n> --formats 4x5,16x9` (copies the shared brand CSS, components and fonts, writes `BRIEF.md` from this plan, builds the format variants). T01 was checked (`hyperframes check` ok) and snapshotted in 9:16 and 16:9; the others lint clean apart from the expected missing-media errors (captures are never committed) and structural warnings.");
table(["Template", "Purpose", "Inputs (variables)", "Length", "Sizes", "Registry blocks"], P.templates.map((t) => [t.id, t.purpose, t.inputs.join(", "), `${t.lengthSec} s`, t.sizes.join(", "), t.registry.join("; ")]));
p("**Shared components** (`production/shared/components/`): flat mark, sentence chip, clock chip (`Real time · m:ss` / `Sped up ×N`), keyword CTA, AI label (`AI-generated scene`), concept line (`Projects shown are AI-generated concepts.`), ad disclosure (`Ad · Paid partnership with Makeborne`). **Tools** (`production/tools/`): `new-project.mjs`, `make-formats.mjs` (the v9 pattern: edit the master, regenerate 4:5, 1:1 and 16:9; recompose, never crop), `captions-to-html.mjs` (transcript to the captions sub-composition).");

// 4. per-video
h(2, "4. Per-video production sheet (all 60)");
table(["ID", "P", "First post", "Pipeline", "Template", "Len", "B-variant", "Min (first / repeat)", "Ready"], P.perVideo.map((v) => [`[${v.id}](#${v.id.toLowerCase()})`, v.priority, v.firstPost, v.pipeline, v.template.id, `${v.lengthSec}s`, v.higgsfield ? v.higgsfield.variant : "-", `${v.estMinutes.total} / ${v.estMinutes.repeatTotal}`, v.readiness]));
h(3, "Details");
for (const v of P.perVideo) {
  const raw = vById[v.id];
  const p0 = v.priority === "P0";
  h(4, v.id);
  L.push(`**${v.title}** · ${v.priority} · week ${v.week} · ${v.lengthSec} s · first post ${v.firstPost} · **readiness: ${v.readiness}**`, "");
  L.push(`- **Pipeline / template:** ${v.pipeline} / ${v.template.id}. **Tools:** ${v.toolMix.join(", ")}.`);
  L.push(`- **Capture in the app:**`);
  v.capture.forEach((c) => L.push(`  - ${c}`));
  const vars = Object.entries(v.template.variables || {});
  if (vars.length) L.push(`- **Template variables:** ${vars.map(([k, val]) => `\`${k}\` = ${typeof val === "object" ? JSON.stringify(val) : val}`).join("; ")}`);
  if (p0 || raw.script.length <= 6) {
    L.push(`- **On-screen text, exactly:**`);
    raw.script.forEach((s) => L.push(`  - ${s.t}: "${s.onScreenText}"${s.voiceover && !/^None/.test(s.voiceover) ? ` (VO: ${s.voiceover})` : ""}`));
  }
  L.push(`- **Audio:** music: ${v.audio.music} VO: ${v.audio.vo} SFX: ${v.audio.sfx}`);
  L.push(`- **Captions:** ${v.captions}`);
  L.push(`- **Disclosure:** ${v.disclosure.join(" ")}`);
  L.push(`- **Render:** ${v.renderSizes.join("; ")}.`);
  L.push(`- **Time and cost:** capture ${v.estMinutes.capture} min, edit ${v.estMinutes.edit} min, about ${v.estMinutes.total} min the first time (${v.estMinutes.repeatTotal} min once routine). Tool cost $0${v.higgsfield ? `; B-variant about $${v.higgsfield.estCostUSD}` : ""}. ${v.estToolCostUSD.note}.`);
  if (v.higgsfield) {
    const x = v.higgsfield;
    L.push(`- **Higgsfield (${x.variant}, only after P-D1):** model ${x.model}; camera ${x.cameraPreset}; ${x.duration}; ${x.aspect}; about ${x.estCredits} credits.`);
    L.push(`  - Prompt: "${x.prompt}"`);
    L.push(`  - Negative: ${x.negative}. Use: ${x.use} Label: ${x.label}.`);
  }
  if (p0) L.push(`- **P0 checks:** ${raw.checks.join(" · ")}`);
  L.push("");
}

// 5. creatives
h(2, "5. Image production sheet (all 48)");
p("**What each still is made of.** Real product screenshot composited in a HyperFrames still: 36. HyperFrames-rendered typographic still: 8. Built inside Makeborne (the export is the creative): 4. AI-generated art in the v14 reference style: **0**. The v14 sheet stays the internal quality bar for the images beat; posting concept art as if Makeborne made it would show a coming feature as live. After the images beat, image-led creatives use real outputs of the shipped product, which carry the product's own machine-readable marking.");
table(["ID", "Type", "Made of", "Template / layout", "Sizes", "First post", "Min", "Ready"], P.perCreative.map((c) => [`[${c.id}](#${c.id.toLowerCase()})`, c.type, c.imageKind, `${c.template.id} · ${c.template.layout}`, c.sizes.join("; "), c.firstPost, c.estMinutes, c.readiness]));
h(3, "Capture lists");
for (const c of P.perCreative) {
  h(4, c.id);
  L.push(`**${c.concept}** · ${c.type} · ${c.platform} · ${c.sizes.join("; ")}`, "");
  L.push(`- **Capture:** ${c.capture}`);
  L.push(`- **Compose:** ${c.compose} Headline: "${cById[c.id].headline}"`);
  L.push(`- **Disclosure:** ${c.disclosure}. **Readiness:** ${c.readiness}. About ${c.estMinutes} min.`, "");
}

// 6. weekly
h(2, "6. The weekly rhythm");
table(["Day", "Block (Sarajevo)", "Job"], P.weeklySchedule.rhythm.map((r) => [r.day, r.block, r.job]));
p("**Output per week, from the calendar** (a production = a new brief and output, never a re-upload; re-edits are native versions for other surfaces):");
table(["Week", "Dates", "New videos", "New stills", "Beat items (on gate)", "Re-edits", "Winner re-cuts", "Creator drafts", "Est. hours", "Note"], P.weeklySchedule.weeks.map((w) => [w.week, w.dates, w.output.newVideoProductions, w.output.newStillProductions, w.output.beatItems, w.output.nativeReEdits, w.output.winnerRecuts, w.output.creatorPostsToReview, w.estHours, w.note]));
p("**The honest finding:** at the calendar's volume, production needs about 20-25 hours a week after launch week, against the routine's 10-12 hours of make blocks plus evenings. Ways to close the gap, in order: (1) batch strictly (Mon screen, Thu face, Wed stills), (2) cut long YouTube and X-only extras first (strategy section 18), (3) lean on the six-cuts-per-capture rule in section 10, (4) bring the editor hire forward from revenue (P-D11). Do not close it by lowering the truth rules.");

// 7. quality bar
h(2, "7. Quality bar (before anything posts)");
for (const g of P.qualityBar) { L.push(`**${g.group}**`, ""); g.checks.forEach((c) => L.push(`- [ ] ${c}`)); L.push(""); }

// 8. naming
h(2, "8. Folder and file naming");
ul([`**Files:** \`${P.naming.file}\``, `**Surfaces:** ${Object.entries(P.naming.surfaces).map(([k, v]) => `\`${k}\` ${v}`).join(", ")}`, `**Cuts:** ${Object.entries(P.naming.cuts).map(([k, v]) => `\`${k}\` ${v}`).join(", ")}`, `**Examples:** ${P.naming.examples.map((e) => `\`${e}\``).join(", ")}`, `**UTM:** ${P.naming.utm}`, `**Captures:** ${P.naming.captures}`, `**Generations:** ${P.naming.generations}`, "**Projects:** `production/projects/<id>-e<episode>/` (gitignored), created by `new-project.mjs`; format variants in `formats/<4x5|1x1|16x9>/`; renders in `renders/`."]);

// 9. library
h(2, "9. Asset library structure");
p(P.library.where);
L.push("```", ...P.library.tree, "```", "");

// 10. review + repurposing
h(2, "10. Review loop and repurposing");
h(3, "Review loop");
table(["Step", "Who", "What"], P.reviewLoop.map((r) => [r.step, r.who, r.what]));
h(3, "One capture, six cuts");
p(P.repurposing.rule);
table(["#", "Cut", "Made from", "Why"], P.repurposing.cuts.map((c) => [c.n, c.cut, c.from, c.note]));

// 11. rights
h(2, "11. Rights and disclosure rules");
p(P.disclosure.summary);
table(["Where", "Rule", "Source"], P.disclosure.byPlatform.map((r) => [r.platform, r.rule, `${src[r.source].url} (${src[r.source].date})`]));
p("**Never allowed:**");
ul(P.disclosure.neverAllowed);
p("**A fake 'customer' testimonial by an AI avatar is not allowed, in any form, on any surface, paid or organic.** The FTC rule bans AI-generated testimonials from people who do not exist, and the ASA applies its testimonial rules to synthetic people. Higgsfield's UGC-avatar and Click-to-Ad features are therefore out of scope for this brand.");
p("**Music rights:** brand TikTok uses the Commercial Music Library only; Instagram/Facebook and YouTube use their own libraries on their own platforms; Mixkit 'Opalescent' only after the licence is re-read, never on TikTok ads. Log every track ID in the rights log.");
p("**Generated material:** keep the prompt, model, plan, date and credits for every generated shot; download only paid-plan (unwatermarked) files; never upload unreleased UI, client material, customer data or creator footage to a generator whose terms allow training.");

// 12. costs
h(2, "12. Costs");
p(P.costs.note);
table(["Stack", "Monthly", "What", "Who pays"], P.costs.stacks.map((s) => [s.name, `$${s.monthlyUSD}`, s.items.join("; "), s.pays]));
p(`**90-day totals:** minimal $${P.costs.ninetyDayTotalUSD.minimal}; recommended $${P.costs.ninetyDayTotalUSD.recommended}; max about $${P.costs.ninetyDayTotalUSD.max}.`);
table(["Unit", "Tool cost (USD)", "Other"], P.costs.perUnit.map((u) => [u.what, u.toolUSD, u.other]));

// 13. launch week
h(2, "13. Launch week, day by day (26 Oct - 1 Nov)");
p("The ten P0 videos post this week: V01, V02, V03, V08 (Mon), V04 (Tue), V05 (Wed), V10 (Wed/Thu), V06 and V07 (Fri), V09 (Sun). Templates are built while the first pieces are produced, so day 1 is long. Times are Sarajevo (CET).");
h(3, "Launch week day by day");
for (const d of P.weeklySchedule.launchWeek) {
  L.push(`**${d.date}.** Posts: ${d.posts}.`, "");
  d.blocks.forEach((b) => L.push(`- ${b}`));
  L.push("");
}

// 14. decisions
h(2, "14. Owner decisions");
table(["#", "Question", "Recommendation", "By"], P.decisions.map((d) => [d.id, d.question, d.recommendation, d.deadline]));

// 15. sources
h(2, "15. Sources");
table(["What", "URL", "Date", "Label"], P.sources.map((s) => [s.what, s.url, s.date, s.label]));

fs.writeFileSync(path.join(repo, "content/production.md"), L.join("\n").replace(/\n{3,}/g, "\n\n") + "\n");

// templates README
const T = ["# Production templates", "", "HyperFrames scaffolds for the launch plan. Specs and the reasons behind them: `content/production.md` section 3; data: `data/production.json` `templates[]`. These are skeletons, not renders: captures, generations and renders never live in this public repository (`production/.gitignore`).", "", "## Start a piece", "", "```bash", "npm install                                   # once, in the repo root (fonts come from the site's own packages)", "node production/tools/new-project.mjs T02-speedrun V02 --episode 1 --formats 4x5,16x9", "cd production/projects/V02-e1", "# drop captures into assets/capture/, VO into assets/audio/, re-encode with -g 60", "npx --yes hyperframes@0.8.205 transcribe assets/audio/vo.wav --model small.en", "node ../../tools/captions-to-html.mjs assets/transcript.json compositions/captions.html --max-words 4 --fix makeborn=Makeborne", "npx --yes hyperframes@0.8.205 check --json && npx --yes hyperframes@0.8.205 snapshot --review", "npx --yes hyperframes@0.8.205 preview          # owner review", "npx --yes hyperframes@0.8.205 render --quality delivery --output renders/V02-e1_tt_punch_r3_1080x1920_v01.mp4", "node ../../tools/make-formats.mjs . --formats 4x5,16x9   # after any master edit", "```", "", "Render on a local disk with at least 20 GB free. Never render on the network drive.", "", "## Templates", ""];
for (const t of P.templates) {
  T.push(`### ${t.id}`, "", `- **Purpose:** ${t.purpose}`, `- **Inputs:** ${t.inputs.join(", ")}`, `- **Length:** ${t.lengthSec} s`, `- **Sizes:** ${t.sizes.join(", ")}`, `- **Registry blocks:** ${t.registry.join("; ")} (install with \`npx hyperframes add <name>\` inside the project)`, `- **Used by:** ${t.usedBy.join(", ")}`, `- **State:** ${t.status}`, "");
}
T.push("## Contract reminders", "", "- One paused timeline per composition, registered on `window.__timelines[\"<composition id>\"]`.", "- Time a `<video>` or its wrapper, never both; captures are `muted` unless their own sound is wanted (`data-has-audio=\"true\"`).", "- Animate transforms and opacity only; never `top`/`left`/`width`/`height`, never `visibility` on a `.clip`.", "- Fonts: Inter and Newsreader Italic come from `assets/fonts/` via `assets/shared/brand.css`.", "- Variables live on the root `<html>` so the Studio panel and `render --batch` can drive them; sub-compositions take `data-variable-values` on their host.", "- Speed honesty: `data-playback-rate` on the build video must equal the factor in the clock chip.", "");
fs.writeFileSync(path.join(repo, "production/templates/README.md"), T.join("\n"));
console.log("md", L.join("\n").length, "bytes");

# Makeborne war room

A private, static website for the Makeborne 90-day growth plan (26 Oct 2026 to 24 Jan 2027). The founder opens it every day to see today's posts and actions, pace against the weekly targets, budget spent against plan, and the next decision due.

It reads the plan's own files at build time (`data/*.json`, `plan/*.md`, `research/*.md`, `content/*.md`), so editing the plan updates the site. There is no backend, no tracker and no runtime network call: fonts, data and code are bundled, and a strict Content Security Policy in the built page forbids external origins.

## Pages

| Route | What it does |
|---|---|
| `#/today` (or `#/today/2026-11-16`) | Posts and actions from `data/calendar.json`, week-to-date KPI pace against `data/kpis.json`, budget spent against plan, the next dated checkpoint from `data/checkpoints.json`, and the founder routine. Ticks are saved in the browser. |
| `#/strategy` | Executive summary, north star, messaging house, ICPs, live-vs-coming features and beats, phases, channels, scenarios, the $1M conditions, growth asks, risks and owner decisions (from `data/plan.json`). |
| `#/budget` | Interactive $1,000 allocator starting from `plan.json` budget lines with a sum check, cumulative plan-vs-actual chart, spend log (localStorage, JSON export and import) and the kill and scale rules. |
| `#/funnel` | The daily cohort model from `data/funnel.json`, ported to TypeScript (`src/lib/funnelModel.ts`) and checked against every scenario's `referenceOutputs`. Presets, sliders, MRR / ARR / active-subscriber charts over 91 days, the weekly table, and a "what must be true for $1M ARR" readout that solves for the traffic or conversion needed. |
| `#/analytics` (or `#/analytics/sample`) | A spreadsheet-style day sheet (one row per channel, arrow / Enter navigation, Ctrl+Enter saves, PageUp / PageDown change the day, paste a block from a spreadsheet), CSV and JSON import and export compatible with `data/actuals.template.json`, the weekly scorecard (north star and guardrails, red / amber / green), "this week, plainly" (the kill, scale, refund-brake, boost and D4 reinvestment rules applied to the data, plus checkpoints due), the funnel (visits → sign-ups → checkout → paid → activated against the kpis.json stages, overall and per channel), weekly charts against the targets, new / churned / net MRR from cohorts, CAC and payback by channel and budget line (using the spend log), the content leaderboard and the alert rules. `/sample` shows 28 invented days labelled SAMPLE; they are generated in memory and never saved, exported or mixed with logged rows. |
| `#/predictions` (or `#/predictions/sample`) | Forecast of MRR, ARR, payers, sign-ups and visits at +30, +60, +90 days and on the day-90 review (24 Jan 2027) with 10th-90th percentile bands, the chance of each checkpoint in `data/checkpoints.json` and of $1M ARR (2,000 seeded Monte Carlo runs in the browser), the required pace for $1M, $500k and the plan base, a scenario sandbox, a per-channel outlook with the channel to feed next by marginal CAC, every input with its data and plan values, and the method and its limits. No forecast under 7 logged days. The engine is `src/lib/forecast.ts`. |
| `#/content` (or `#/content/V01`) | Filterable library of `data/videos.json` and `data/creatives.json` with full scripts, captions, prompts and ad variants, copy buttons and a per-item status (to do, filming, posted, winner). |
| `#/calendar` (or `#/calendar/2026-11-27`) | 90-day grid with week and day detail, linked to the content items. |
| `#/outreach` | Templates, launch copy (Product Hunt, Show HN, Reddit, X, LinkedIn, Indie Hackers, newsletters, press, directories), targets, the affiliate program and the compliance tables from `data/outreach.json`. |
| `#/tracking` | UTM and `/go/` builder following `content/tracking.md` (validation, channel mapping, beat warnings, a local code register with CSV export), the event spec, the consent prerequisites, and the rules and rituals. |
| `#/research` (or `#/research/paid-acquisition`) | Every Markdown report rendered with a table of contents, evidence labels and jump links to its Sources and Verification sections, plus full-text search. |

## Run it

Requires Node 20.19+ (or 22.12+).

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # type-check and build to dist/
npm run preview   # serve dist/ locally
npm run check     # after a build: render every route, test the funnel model and the forecast maths, scan dist/
```

`npm run check` renders all routes (including every research report and deep links) through Vite's SSR loader and fails on any error, compares the TypeScript funnel model with each scenario's `referenceOutputs` in `data/funnel.json` (within 1%), tests the forecast and analytics maths with a fixed seed (`scripts/check-forecast.mjs`: empty and short data states, band ordering, monotonic sanity checks, plan-like data landing on the plan, the required-pace solver, the kill / scale rules), fails when a `data/plan.json` scenario's `mrrDay90` drifts more than 5% from the calculator, scans the plan files for known confidential markers (see `scripts/check-routes.mjs`), and checks the built page for missing assets, the CSP and network calls.

## Edit the data

- Change any file in `data/`, `plan/`, `research/` or `content/`, then rebuild (or keep `npm run dev` running). The JSON shapes are typed loosely in `src/lib/types.ts`; new fields are ignored, renamed fields need a matching change there.
- `data/checkpoints.json` (added for this site) lists the dated decision checkpoints shown as "next decision due". It was collected from `content/tracking.md` §6.5 and §7.5, `plan/strategy.md` §6 and §17 and the calendar actions. Dates marked `approx` are planning guesses.
- The live-today and coming-soon feature lists on the Strategy page are constants at the top of `src/pages/Strategy.tsx`. Move an item when its feature passes the six-box gate.
- If you change the funnel formulas, change `data/funnel_model.py` and `src/lib/funnelModel.ts` together, regenerate `referenceOutputs`, update the `data/plan.json` scenarios and the `plan/strategy.md` 14.2 table from the same run, and run `npm run check`.
- Pages load only the data they show: `scripts/data-plugin.mjs` builds slim indexes at build time (calendar per day, content titles, document metadata) and each research document loads on its own. Nothing is generated into the repository.
- Owner-only notes go in `private/` (gitignored). The research page does not read that folder.

## Where your numbers live

Actuals, the spend log, the allocation, content statuses, checklist ticks and the UTM code register are stored in this browser's `localStorage` only. They never leave the device and are not shared between browsers. Export them (JSON or CSV) to keep a copy, and import them on another device.

**Keep exports out of this repository**, especially if it is public. The `.gitignore` ignores `actuals-*.json`, `actuals-*.csv` and `spend-log-*.json` as a safety net. Log aggregate numbers only: no buyer names, emails, Whop IDs, payment IDs or creator contact details.

## Deploy privately

> **Repository visibility.** On 26 Oct 2026 the GitHub remote (`origin`) was **public** (and still empty). Switch it to Private before the first push (GitHub: Settings > General > Danger zone > Change visibility). The plan files were cleaned so a push would not leak the known confidential items (owner-only material now lives in the gitignored `private/` folder, and `npm run check` fails if known confidential markers come back), but competitive strategy, budgets and content plans are still in the repo and are not meant to be public.

The build is a plain static folder (`dist/`) with hash routing and a relative base, so it works on any static host without rewrites. The page sets `noindex`, but that is not access control: protect it.

**Vercel (recommended)**
1. Import the repository (keep the repository private) or run `npx vercel` in this folder.
2. Framework preset: Vite. Build command `npm run build`, output directory `dist`.
3. Turn on Deployment Protection: Vercel Authentication restricts the site to your Vercel team, or Password Protection adds a shared password (a paid Vercel feature). Apply it to production as well as previews.

**GitHub Pages**
GitHub Pages sites are public on free plans, even from a private repository. Use it only with GitHub Enterprise Cloud's private Pages (access limited to people with repository access). Otherwise prefer Vercel, Netlify or Cloudflare Pages with access control, or simply run `npm run preview` locally.

**Local only**
`npm run build && npm run preview` serves the site at http://localhost:4173. Nothing else is needed.

## Notes

- Stack: Vite 7, React 19, TypeScript 5.9, `marked` for Markdown, bundled Inter and Newsreader fonts (SIL Open Font License). Charts are hand-written SVG (no chart library). Dependency versions are pinned exactly in `package.json`.
- Light and dark themes follow the system setting, with a manual switch in the sidebar.
- Accessibility: keyboard focus styles, labelled inputs, a skip link, native `<dialog>` for item details, reduced-motion support, and tables that scroll inside their own frame so the page never scrolls sideways down to 360 px.

## Licence

All rights reserved. See `LICENSE`.

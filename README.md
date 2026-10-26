# Makeborne war room

A private, static website for the Makeborne 90-day growth plan: public launch **Wed 28 Oct 2026 at 19:00 Sarajevo time** (CET, 18:00 UTC; day 1) to the day-90 review on Mon 25 Jan 2027. Mon 26 and Tue 27 Oct are pre-launch days −2 and −1. The founder opens it every day to see today's posts and actions, pace against the weekly targets, budget spent against plan, and the next decision due.

It reads the plan's own files at build time (`data/*.json`, `plan/*.md`, `research/*.md`, `content/*.md`), so editing the plan updates the site. There is no backend, no tracker and no runtime network call: fonts, data and code are bundled, and a strict Content Security Policy in the built page forbids external origins.

## Pages

Four tabs and a Library. On a phone the tabs sit in a bottom bar; on a desktop, in the top bar.

| Route | What it does |
|---|---|
| `#/today` (or `#/today/2026-11-12`) | One checklist for the day, grouped Post / Make / Ads / Reach out / Log numbers. Each line has a time, a tick box (saved in this browser) and a "How" panel with the exact caption, link and steps. It merges `data/calendar.json` (posts and actions), `data/instagram.json` `kickoffDays`, `data/production.json` `simple.weeks` (Higgsfield make-items carry their shot cards, so the How panel has each prompt and negative with a copy button) and the `data/ads.json` ad cards that are due. At the top: the day number ("Pre-launch day −2 / −1" on Mon 26 and Tue 27 Oct, then Day 1 = Wed 28 Oct), a live countdown to the launch (Wed 28 Oct, 19:00 CET, the same moment as makeborne.com's), "on track / not on track" from your logged numbers, today's money to spend, and previous / next day. On launch day a **LAUNCH — 19:00 CET** card holds the minute-by-minute run of show (`data/plan.json` `launch`). |
| `#/plan` (or `#/plan/decisions`) | "The plan in one screen" (who we sell to, what we say, how we get customers, where the $1,000 goes, the target), the seven launch-week days and the 13 week cards (goal, 5-10 key actions, money this week, the Sunday checkpoint), then the owner decisions with a recommendation each. |
| `#/ads` (or `#/ads/A01`) | The $1,000 money bar (spent from the spend log against the planned running total by week), the pre-flight checklist, the "if Bosnia billing does not work" fallback, and the seven ad cards in order. A card opens to: when to launch and every click, budget, who sees it and where, the creative and the words (with copy buttons), the link and names, good-after-48-hours, STOP, SCALE, and what to log (with a "Log spend" form). Cards A04-A07 are marked "from revenue, not the $1,000". |
| `#/results` (or `#/results/sample`, `#/results/forecast`) | Today's entry (the day sheet), a three-line verdict (on track?, what to do this week, the 25 Jan (day 90) forecast range), then collapsible panels: totals, scorecard, this week, funnel, weekly charts, monthly revenue, cost per customer, content, alerts, rows, import and export, forecast, chances, required pace, sandbox, channel outlook, inputs and method. `/sample` shows 28 invented days, never saved. |
| `#/library` | Searchable index (sections and the text of every document): Videos, Images, Production, Instagram playbook, Ads playbook, Where to post, Outreach, Full strategy, Tracking (the `/go/` and UTM builder), Budget detail, Funnel calculator, 90-day calendar, Research. Each opens as `#/library/<section>/…` and loads on its own. |

Old links keep working: `#/strategy`, `#/calendar`, `#/analytics`, `#/predictions`, `#/budget`, `#/funnel`, `#/content`, `#/outreach`, `#/tracking` and `#/research` (with their deep links) open their new home and the address bar is rewritten (`src/routes.tsx`).

## First visit and plain words

- The first time Today opens it shows a **Start here** card: five steps (open Today, do the items top to bottom, tick them, enter numbers in Results each evening, read the Plan week card and the Results verdict on Sunday) and one line per tab. "Got it" hides it (saved in this browser); "How to use this" on Today and "How to use this site" at the bottom of every page bring it back.
- Plan text is shown in plain words at display time only (`src/lib/plain.tsx`): shorthand like "PH" or "[U]" is spelled out, and the plan's terms and codes (CAC, Spark, TAAFT, decisions D1, growth asks ga1, budget lines b1, templates t08, ad cards A01, hooks like (F2)) get a meaning you can tap (`virtual:war-room/glossary` builds the code meanings from the data files). Long paragraphs show one or two sentences with a "More" button. The data files, and so the plan's numbers and rules, are not changed.

## Finished launch-week files

The rendered videos and images live outside the repository, in the renders folder named in `data/posting.json` (`folder`), next to the render agent's `POSTING.md`. The pre-launch countdown teasers (T1-T7 on TikTok, Reels and Shorts; Stories S1-S3 with Instagram's countdown sticker) come from a second folder (`teaserFolder`, `launch-teasers\renders`) with a `POSTING.md` in the same format; until it exists they show "to make". Nothing in that folder is copied here: only file names, platforms, times, captions, hashtags, keywords, links, covers and disclosures.

```bash
node scripts/sync-posting.mjs                 # read POSTING.md from the default renders folder, rewrite data/posting.json
node scripts/sync-posting.mjs --dir <folder>  # another launch-week folder
node scripts/sync-posting.mjs --teasers <folder>  # another teaser folder
```

Run it after new renders land, then commit `data/posting.json`. When the folder or `POSTING.md` is missing (Netlify, another computer) the script says so, leaves the JSON alone and exits 0; the build only reads the committed JSON. `items` is rewritten on every sync; `toMake` (why a post has no file yet), `beforePosting` (the one-time checklist), `reminders` (dated one-off Today items), `teasers` (teaser titles) and `schedule` are hand-written and kept. The launch moved from Mon 26 to Wed 28 Oct 19:00 CET after the launch-week `POSTING.md` was written, so `schedule` maps its dates: slots from 26 Oct to 1 Nov move 2 days later, V01 goes to Wed 28 Oct 19:00 (V02 TikTok 20:00, C08 on X 19:15) and the old make-up slots are dropped. A missing teaser folder is never an error.

Today joins it to each post (`postingFor` in `scripts/plan-data.mjs`): a post with its file shows "✓ ready to post" and a "File: … (in <folder>)" line, its How panel has the finished caption, cover, keyword and disclosure (and, after launch day, the `_justlaunched` file); every other post says "to make", with the reason when there is one. Library › Production lists the finished files and what is still to make.

## Run it

Requires Node 20.19+ (or 22.12+).

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # type-check and build to dist/
npm run preview   # serve dist/ locally
npm run check     # after a build: render every route, test the funnel model and the forecast maths, scan dist/
```

`npm run check` renders all routes (the four tabs, the Library, every research report, deep links and the old routes), checks that old hashes redirect, checks the Today and Plan joins in `scripts/plan-data.mjs` (dated money adds up to $1,000, every make-list item lands on a day, the one-form tracking codes), checks the production plan (the production budget is its own pot and nothing in the $1,000 names Higgsfield; every Higgsfield shot has a prompt, a negative, settings and credits, a "generate" line on a day and a video or image that uses it; every item says how it is made; the Higgsfield videos stay at 60-70% real and 20-30% Higgsfield; every A/B pair is marked on the calendar), through Vite's SSR loader and fails on any error, compares the TypeScript funnel model with each scenario's `referenceOutputs` in `data/funnel.json` (within 1%), tests the forecast and analytics maths with a fixed seed (`scripts/check-forecast.mjs`: empty and short data states, band ordering, monotonic sanity checks, plan-like data landing on the plan, the required-pace solver, the kill / scale rules), fails when a `data/plan.json` scenario's `mrrDay90` drifts more than 5% from the calculator, scans the plan files for known confidential markers (see `scripts/check-routes.mjs`), fails when copy outside `research/` says a site, deck or book came from a sentence rather than a brief (every real output came from a 500-1,000-character brief, so the copy says "one brief"; `CLAIM` in `scripts/check-routes.mjs`), checks `data/posting.json` and the sync script (plain file names only, no media in the repo, ready files linked on Today, the Start here card renders, and a missing renders folder is a clean no-op), checks the launch (calendar 26 Oct - 25 Jan with pre-launch days −2 / −1, day 1 = Wed 28 Oct, day 90 = Mon 25 Jan; V01 at Wed 28 Oct 19:00 in the calendar and `posting.json`; no post before 28 Oct 18:00 UTC except teasers that never say it is live; the `_justlaunched` files from Thu 29 Oct; the run of show; A01, A02 and the checkpoints on their dates), and checks the built page for missing assets, the CSP and network calls.

## Edit the data

- Change any file in `data/`, `plan/`, `research/` or `content/`, then rebuild (or keep `npm run dev` running). The JSON shapes are typed loosely in `src/lib/types.ts`; new fields are ignored, renamed fields need a matching change there.
- `data/checkpoints.json` (added for this site) lists the dated decision checkpoints shown as "next decision due". It was collected from `content/tracking.md` §6.5 and §7.5, `plan/strategy.md` §6 and §17 and the calendar actions. Dates marked `approx` are planning guesses.
- The live-today and coming-soon feature lists on the Library > Full strategy page are constants at the top of `src/pages/Strategy.tsx`. Move an item when its feature passes the six-box gate.
- If you change the funnel formulas, change `data/funnel_model.py` and `src/lib/funnelModel.ts` together, regenerate `referenceOutputs`, update the `data/plan.json` scenarios and the `plan/strategy.md` 14.2 table from the same run, and run `npm run check`.
- Pages load only the data they show: `scripts/data-plugin.mjs` builds slim indexes at build time (calendar per day, content titles, document metadata) and each research document loads on its own. Nothing is generated into the repository.
- Owner-only notes go in `private/` (gitignored). The research page does not read that folder.
- Production (`data/production.json`) is the source of truth for `content/production.md` and `production/templates/README.md`: edit the JSON, then run `node production/tools/plan-to-md.mjs`. `productionBudget` (Higgsfield, an owner purchase) is a separate pot and never part of the $1,000 in `data/plan.json` and `data/ads.json`. Library › Production shows the budget, every Higgsfield shot card (copy buttons for the prompt and negative) and the per-video sheets (`virtual:war-room/production-hf`, loaded only on that page).

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
- Light and dark themes follow the system setting, with a manual switch (Auto / Light / Dark) in the top bar.
- Accessibility: keyboard focus styles, labelled inputs, a skip link, native `<dialog>` for item details, reduced-motion support, and tables that scroll inside their own frame so the page never scrolls sideways down to 360 px.

## Licence

All rights reserved. See `LICENSE`.

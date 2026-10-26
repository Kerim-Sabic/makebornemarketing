# Production templates

HyperFrames scaffolds for the launch plan. Specs and the reasons behind them: `content/production.md` section 3; data: `data/production.json` `templates[]`. These are skeletons, not renders: captures, generations and renders never live in this public repository (`production/.gitignore`).

## Start a piece

```bash
npm install                                   # once, in the repo root (fonts come from the site's own packages)
node production/tools/new-project.mjs T02-speedrun V02 --episode 1 --formats 4x5,16x9
cd production/projects/V02-e1
# drop captures into assets/capture/, VO into assets/audio/, re-encode with -g 60
npx --yes hyperframes@0.8.205 transcribe assets/audio/vo.wav --model small.en
node ../../tools/captions-to-html.mjs assets/transcript.json compositions/captions.html --max-words 4 --fix makeborn=Makeborne
npx --yes hyperframes@0.8.205 check --json && npx --yes hyperframes@0.8.205 snapshot --review
npx --yes hyperframes@0.8.205 preview          # owner review
npx --yes hyperframes@0.8.205 render --quality delivery --output renders/V02-e1_tt_punch_r3_1080x1920_v01.mp4
node ../../tools/make-formats.mjs . --formats 4x5,16x9   # after any master edit
```

Render on a local disk with at least 20 GB free. Never render on the network drive.

## Templates

### T01-endcard

- **Purpose:** True end card: mark, 'Make yours at makeborne.com', price, refund line, keyword CTA
- **Inputs:** headLead, headAccent, priceLine, refundLine, ctaText
- **Length:** 2.5 s
- **Sizes:** 9:16, 4:5, 1:1, 16:9
- **Registry blocks:** logo-brand-close (reference for the cascade; restyled to the flat mark); grain-overlay (optional, 2% grain) (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V01, V24, V40, V49, V50, and as T11's sub-composition
- **State:** Scaffold checked with `hyperframes check` (ok) and snapshotted in 9:16 and 16:9 on 26 Oct

### T02-speedrun

- **Purpose:** Frame-0 output on a phone, composer, sped or real-time build with clock chip, 3 labels, one chat edit, publish, loop
- **Inputs:** hookLine, briefText, timerLine, clockText, label1-3, editRequest, liveText, ctaText, phoneScrollSrc, composerSrc, buildSrc (+ data-playback-rate), editSrc, publishSrc, musicSrc, voSrc
- **Length:** 32 s
- **Sizes:** 9:16 master, 4:5, 16:9
- **Registry blocks:** cursor-zoom-follow (auto punch-in to clicks); ui-focus-zoom (zoom to the edited section); number-wheel (clock digits, optional); kinetic-center-build (label build, optional); device-frame-stage (alternative phone stage) (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V02, V03, V04, V07, V10, V20, V25, V27, V28, V41, V42, V51, V52, V55, V56, V57, V58, V59
- **State:** Scaffold; lint clean apart from missing media and two structural warnings (kept monolithic so the root variables drive batch renders)

### T03-split

- **Purpose:** Before/after: stacked on 9:16, side by side on 16:9/1:1, onion skin to prove nothing else moved
- **Inputs:** headline, beforeLabel, afterLabel, pollText, mode (stack|wipe|onion), beforeSrc, afterSrc, musicSrc, voSrc
- **Length:** 27 s
- **Sizes:** 9:16, 4:5, 1:1, 16:9
- **Registry blocks:** before-after-wipe; comparison-split (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V06, V14, V30, V48, V49, V60
- **State:** Scaffold

### T04-showcase

- **Purpose:** Real outputs with their sentence: 8 s scroll episode, 15 s slides (and photo-mode stills), 6 s triptych
- **Inputs:** sentence, series, footnote (run log), pageSrc, s1-s5 / f1-f5, brief, line
- **Length:** 8 / 14.6 / 6 s
- **Sizes:** 9:16, 4:5, 1:1, 16:9 (triptych)
- **Registry blocks:** parallax-zoom; pan-stations; swipe-rail; screen-flow-carousel (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V10, V15, V16, V29, V37, C27, C28
- **State:** Scaffold (scroll, slides, triptych sub-compositions)

### T05-founder

- **Purpose:** Founder A-roll with Day-N pill, real-number ledger count-up, b-roll inserts in the lower half, captions
- **Inputs:** dayLabel, hookLine, n1-n3 + labels, arollSrc, broll1Src, broll2Src
- **Length:** 45 s
- **Sizes:** 9:16, 4:5 (LinkedIn), 16:9 (X, YouTube)
- **Registry blocks:** count-up; lt-soft-pill (pill styling reference); caption-editorial-emphasis (caption restyle option) (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V08, V09, V11, V19, V21, V31, V37, V38, V39, V43, V44, V45, V47, V54
- **State:** Scaffold

### T06-tutorial

- **Purpose:** Step chips over trimmed windows of one continuous capture, sped build step with clock chip, punch-ins, optional face-cam
- **Inputs:** title, step1-4, ctaText, clockText, captureSrc, faceSrc
- **Length:** 90 (V24: 540 at 16:9) s
- **Sizes:** 9:16, 16:9
- **Registry blocks:** ui-focus-zoom; cursor-zoom-follow; marker-checklist-card (V20 checklist) (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V13, V17, V22, V23, V24
- **State:** Scaffold

### T07-cinematic-hook

- **Purpose:** 2.5 s generated plate + masked HTML hook + AI label, hard cut to the real capture
- **Inputs:** hookLead, hookAccent, aiLabelText, plateSrc, nextSrc
- **Length:** 3 s
- **Sizes:** 9:16, 4:5
- **Registry blocks:** focus-blur-resolve; beat-freeze-cut (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V02-B, V07-B, V18-B, V40-B, V42-B, V48-B
- **State:** Scaffold; used only after P-D1

### T08-props

- **Purpose:** Honest props with invented names: inbox stack, e-mail thread, notification over a clock, crossed-out fake sale banner, comment card
- **Inputs:** m1-m4, sender, badge, line
- **Length:** 4 s
- **Sizes:** 9:16, 4:5
- **Registry blocks:** notification-cascade; chat-message; typing-indicator (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V05, V18, V21, V26, V37, V40
- **State:** Scaffold

### T09-stills

- **Purpose:** Every static: proof split, type only, carousel step card, end strip; one page per second, exported with snapshot
- **Inputs:** page markup per creative (COMPOSE text from creatives.json), capture PNGs
- **Length:** 1 per page s
- **Sizes:** 1080x1350, 1080x1080, 1200x1200, 1080x1920, 1600x900, 1920x1080, 1200x630, 1280x720, 1270x760
- **Registry blocks:** grain-overlay (2%) (install with `npx hyperframes add <name>` inside the project)
- **Used by:** C01-C48 (except C07, C20, C38, C45), V16 photo-mode pages, video covers
- **State:** Scaffold (3 sample pages)

### T10-ugc-pack

- **Purpose:** Creator finishing pass for the Spark/partnership version: in-video ad disclosure, captions, end card with code
- **Inputs:** adText, handle, code, creatorSrc
- **Length:** 45 s
- **Sizes:** 9:16
- **Registry blocks:** none needed (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V32, V33, V34, V35, V36, V53
- **State:** Scaffold

### T11-film-recut

- **Purpose:** Wrap a finished film render with a hook line, the optional AI-concept line and the T01 end card
- **Inputs:** filmSrc, hookLine, showConceptLine
- **Length:** 17 s
- **Sizes:** 9:16, 4:5 (from the 5:4 master project, recomposed), 16:9
- **Registry blocks:** none (end card is T01 as a sub-composition) (install with `npx hyperframes add <name>` inside the project)
- **Used by:** V01, V50
- **State:** Scaffold

## Contract reminders

- One paused timeline per composition, registered on `window.__timelines["<composition id>"]`.
- Time a `<video>` or its wrapper, never both; captures are `muted` unless their own sound is wanted (`data-has-audio="true"`).
- Animate transforms and opacity only; never `top`/`left`/`width`/`height`, never `visibility` on a `.clip`.
- Fonts: Inter and Newsreader Italic come from `assets/fonts/` via `assets/shared/brand.css`.
- Variables live on the root `<html>` so the Studio panel and `render --batch` can drive them; sub-compositions take `data-variable-values` on their host.
- Speed honesty: `data-playback-rate` on the build video must equal the factor in the clock chip.

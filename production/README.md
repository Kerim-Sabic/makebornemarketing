# Production kit

How Makeborne's launch videos and images get made. The plan is `content/production.md` (read section 0 first: one screen and a weekly checklist); the data is `data/production.json`.

```
production/
  shared/brand.css          house tokens, fonts, safe zones per format (.fmt-9x16, .fmt-4x5, .fmt-1x1, .fmt-16x9)
  shared/captions.html      captions track placeholder (replaced per video by tools/captions-to-html.mjs)
  shared/components/        flat mark, sentence chip, clock chip, keyword CTA, AI label, concept line, ad disclosure
  templates/T01-T11/        HyperFrames composition skeletons (specs: templates/README.md)
  tools/new-project.mjs     start a piece from a template: copies brand files and fonts, writes BRIEF.md from the plan
  tools/make-formats.mjs    build 4:5, 1:1 and 16:9 variants from the master (recompose, never crop)
  tools/captions-to-html.mjs  word-timed transcript -> captions sub-composition
  tools/plan-to-md.mjs      regenerate content/production.md from data/production.json (the JSON is the source of truth)
  projects/                 your working projects (gitignored)
```

Rules that matter most:

- Every product frame is a real capture from production. Every letter on screen is HTML. Nothing generated is ever shown as Makeborne output.
- A sped-up build always carries the `Sped up ×N` chip, and `data-playback-rate` on the video equals N.
- Captures, generations, audio and renders never go into this public repository (`production/.gitignore` blocks them). They live in the private asset library (`content/production.md` section 9).
- Render on a local disk with at least 20 GB free, never on the network drive.
- Nothing here buys, generates or posts anything. Higgsfield is a planned part of production with its own budget (not the $1,000); the owner signs up himself (P-D1). Every shot, its prompt and its credits are in `data/production.json` `higgsfield.shots`; every generated second carries the AI label and never shows product UI, people or text.
- Higgsfield clips go into HyperFrames slots: `templates/T07-cinematic-hook/` (hook, `compositions/bridge.html`, `compositions/match-to-ui.html`, `compositions/endplate.html`) and `templates/T04-showcase/compositions/i2v.html` (camera move over a real output). Each video's slots and variables are in `perVideo[].template.hfSlots`.

HyperFrames is pinned to `hyperframes@0.8.205` in each template's `package.json`. T01 passed `npx hyperframes check` and was snapshotted in 9:16 and 16:9 on 26 Oct 2026; the other templates lint clean apart from the expected missing-media errors.

# Shared components (snippets)

Copy the markup into a scene, keep the ids prefixed with the scene id, and animate it from that scene's own paused timeline. Styles come from `assets/shared/brand.css`. Every snippet is text in HTML, so every letter renders exactly; no image model ever redraws UI or type.

| Snippet | File | What it is | Rules |
|---|---|---|---|
| Flat mark | `mark.svg` | The flat vector m (`#18181B`) | Never stretched, rotated, shadowed or gradient-filled. Clear space 1/5 of its width. Glossy m only in the v9/v14 film projects |
| Sentence chip | `sentence-chip.html` | White pill with a pencil glyph and the brief | The brand device: the brief that made the output is always on screen while the output is. Exact brief text, in quotes, max 2 lines |
| Clock chip | `clock-chip.html` | Dark pill: `Real time · 0:52` or `Sped up ×8` | Mandatory on any build footage. Real time only when the footage plays at 1×; otherwise the factor. Never round down |
| Keyword CTA | `keyword-cta.html` | `Comment SITE` / `DECK` / `BOOK` / `CLIENT` card | Matches the Instagram keyword DM. TikTok version says `Link in bio, or DM me SITE` |
| AI label | `ai-label.html` | Small chip `AI-generated scene` (image-to-video over a real output: `AI camera move on a real Makeborne output`) | On every frame of a generated shot (Higgsfield or any model), bottom-left of the safe band, 28 px on 9:16, held for the whole shot. In addition to the platform toggle when the shot is realistic |
| Concept line | `concept-line.html` | `Projects shown are AI-generated concepts.` | Only for v13/v14 concept frames. Cap height at least 2.5% of frame height, held at least 3 s, readable on a phone |
| Ad disclosure | `ad-disclosure.html` | `Ad · Paid partnership with Makeborne` | Creator videos: in-video for the first 3 s, plus the creator saying "Ad" and the platform toggle and `#ad` first in the caption |
| Real-output footnote | (inline, `.mb-footnote`) | `Built in 0:52 · 31 credits · unedited` | Filled from the run log only |

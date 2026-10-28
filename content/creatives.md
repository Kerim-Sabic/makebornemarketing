# Makeborne creative library: images, carousels and ads

Written 26 Oct 2026, before the launch (Thu 29 Oct 2026, 01:30 CET since the 28 Oct move); dates updated 27 Oct. The machine-readable source is `data/creatives.json`; ad copy matrices are in `content/ad-copy.md`; the plan of record is `plan/strategy.md`. Nothing here has been made, posted or bought yet.

**Labels:** [F] verified at the source or in our own files · [S] secondary · [V] vendor claim · [E] our estimate · [A] assumption · [O] owner decision · [U] unverified.

**Counts:** 48 creatives: 16 static, 8 x-image, 6 carousel, 5 thumbnail, 5 og, 4 linkedin-doc, 4 story. 38 are live today; 10 are held for feature beats (beat:images ×5, beat:topups ×1, beat:domains ×1, beat:agency ×1, beat:leads ×1, beat:github ×1). 11 live creatives are paid-ready (useAs ad or both), which matches the research target of about 12 paid-ready creatives in 4-5 different concepts.

## 1. The honest constraint behind every frame

- **Generated images are not live today.** So no live creative shows an image-model picture as if Makeborne made it. Every product frame is a **real capture** from production, a real output, or pure typography. The v14 reference sheet is the **quality bar** for how these frames are composed (exact layout splits, hex colours, one confident type pairing, every text line quoted) and the target the image pipeline must hit on the images beat. It is not product proof [F, `research/creative-assets.md` §2.2].
- **Live features only.** Sites published on a Makeborne address (`sites.makeborne.com/<slug>` in the launch code [F]), books (screen and PDF), decks (.pptx), client review links (comments plus "Approve this version" and "Request changes" [F, launch code]), the basic CRM and Lead finder ("Local businesses" mode [F]), manual GitHub export and download, the projects library.
- **Beat creatives** (tag `beat:<feature>`) are written now so they ship on the day a feature passes the six-box gate, and not a day earlier.
- **Prompts don't name vendors.** The `generationPrompt` field says "image model" where one is meant. Customer copy never names a model vendor.

## 2. Brand visual system: "made, not generated"

### 2.1 Colour

| Token | Hex | Use | Contrast on canvas / on white |
|---|---|---|---|
| Canvas | `#F8F7F4` | Every background unless a real output fills the frame | n/a |
| Ink | `#18181B` | Headlines, body, the flat m mark | 16.5:1 / 17.7:1 |
| Secondary | `#5C616D` | Labels, footnotes, the proof line | 5.8:1 / 6.2:1 (passes AA for small text) |
| Hairline | `#E4E1DA` | 1 px rules, card borders, dividers (our proposed token [E]) | decorative only |
| Card | `#FFFFFF` | Cards that hold captures | n/a |
| Brand gradient | `#2858CB` → `#6355CF` | **Only** on one italic accent word per piece, and the Create button in UI captures | 5.9:1 and 5.3:1 at the two ends |
| Coral | `#F76F53` | **At most once per piece**: a final full stop, or a ring around the one thing that changed | 2.7:1: never for text |

Ink value: the house notes carry both `#18181B` and `#18191E`; this library uses `#18181B` until the owner locks one [O]. Contrast figures are our arithmetic (WCAG formula) [E].

### 2.2 Type

- **Display and body:** Inter (Display cut where available), weight 640-720, tracking -0.05 em, line-height about 0.96 for display; body 400-500. In prompts: "a tight geometric grotesk in the style of Inter Display".
- **Accent:** Newsreader Italic 420, about 1.06-1.12x the Inter beside it, on the same baseline, gradient-filled. **One accent word per piece**, usually the last word ("call.", "yes.", "real.").
- **Minimum sizes:** anything that must be read is at least 5.5% of frame height in video, and at least 24 px on a 1080-wide static. Captions on carousels: two lines maximum.
- Both families are on disk with OFL licence files [F, `research/creative-assets.md` §2.3].

### 2.3 Layout rules

- **Margins:** at least 7% of the width on every side. Mark top-left inside the margin; proof strip at about 89% height.
- **The four layouts** (every creative uses one):
  1. **Text stance:** type only, one idea, the proof strip. (Motion ranks text-only statics first by hit rate on Meta [V].)
  2. **Proof split:** headline block plus one real capture in a white card (18 px corners, two-layer shadow `0 2px 6px rgba(20,22,40,.12)` + `0 50px 90px -35px rgba(30,40,90,.35)`).
  3. **Before / after:** two captures, one change ringed in coral.
  4. **Output full-bleed:** the real output fills the frame (story covers, thumbnails), with the sentence chip as the only overlay.
- **The sentence chip** is the brand device: a white pill with a pencil glyph and the exact brief. Whenever an output is shown, the brief that made it is visible.
- **Proof strip:** "makeborne.com" left, "From $20/month + tax · Full refund until you use credits" right, under a hairline.
- **9:16:** keep text out of the top 14%, bottom 35% and 6% at the sides (third-party Meta safe zone [U]); check each platform's template before export.
- **Captures:** production, clean owner account, 2x UI scale, fictional trademark-checked names, e-mail/avatar/tabs cropped, never a Whop store page, never an unreleased menu item.
- **Build method:** compose in the HTML/HyperFrames template so every letter is exact. An image model may only make backgrounds or texture plates, never the type and never the product UI.

### 2.4 Do and don't

| Do | Don't |
|---|---|
| Warm canvas, editorial type, one idea per frame | Purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots |
| Real outputs from first runs, with the brief, time and credits | Cherry-picked re-rolls presented as typical, or concept art presented as output |
| A visible clock or "sped up 4x" chip on any timed claim | A speed number nobody measured |
| Flat m mark, unaltered | Stretched, rotated, shadowed or gradient-filled marks |
| "No per-site fee (fair use applies)" | "Unlimited sites" |
| "Full refund until you use credits" | "Free", "trial", "start free", "money-back guarantee" |
| Fictional, trademark-checked names; real businesses only with written OK | Real businesses' data, real people's faces, legible "Tern", "Tidal" or "Northface Labs" |
| Generous comparisons on organic posts ("great for apps with logins") | Competitor names in paid copy, "better than" claims, competitor logos |
| Founder on camera as himself; real photos | Photoreal generated people (they need AI labels and read as slop) |
| Grain about 2%, light vignette | Bloom, glow, 3D tilt of UI, walls or grids of cards |

### 2.5 Anti-slop score (every creative, before it ships)

- [ ] Every product frame is a real capture or real output, or it is labelled "concept".
- [ ] None of the forbidden looks in 2.4.
- [ ] No photoreal generated person.
- [ ] No sped-up generation without a visible clock.
- [ ] The CTA matches the live offer (paid plans, refund until credits are used).
- [ ] No feature from the coming-soon list shown as available.
- [ ] Readable at phone size; understandable muted in 3 seconds.
- [ ] No real business, school or person without written OK; invented names checked against trademarks.
- [ ] No vendor names in customer-facing copy.
- [ ] `goLink` and `utmContent` set, so the creative can be judged on `/go/` clicks and Whop sales.

## 3. Production order (launch week first)

| Priority | Week | IDs |
|---|---|---|
| 1 | 1 | C01, C02, C03, C06, C07, C08, C16, C17, C27, C37 |
| 1 | 2 | C05, C09, C18, C23, C29, C32, C33, C36 |
| 1 | 3 | C39, C40 |
| 1 | 6 | C44 |
| 2 | 1 | C04, C12, C15, C19, C28 |
| 2 | 2 | C10, C11, C20, C30, C34, C35 |
| 2 | 3 | C24, C26, C42 |
| 2 | 4 | C41 |
| 2 | 5 | C38 |
| 2 | 7 | C45 |
| 2 | 11 | C46 |
| 3 | 2 | C13, C22, C25, C31 |
| 3 | 3 | C14, C21, C43, C48 |
| 3 | 8 | C47 |

Weeks follow the plan (week 1 = 26 Oct-1 Nov). Beat weeks are earliest planning guesses, not promises; the gate decides.

**Paid-ready live set (11):** C01 (Win before the call), C02 (Approval without email chaos), C03 (Text-only stance), C09 (Play the client), C10 (Win before the call, part 1), C16 (Change one value. Only that value changes.), C17 (It's a real chart, not a picture), C24 (A client welcome guide from one brief), C26 (The lead magnet people actually open), C29 (One brief, three deliverables), C30 (Price anchor and risk reversal). These run only as b5 boosts of an organic post that already has a tracked sale, or from revenue under D4 [O]. Judge on `/go/` clicks and net Whop sales; with no pixel and no consent banner yet, never on platform conversions.

**Real captures to record on day 2 (one session covers most of the library):** Lead finder (Local businesses), composer with a brief, Publish website dialog, Share for review → Create review link, review page at 390 px with a comment, Approve this version, a deck build at real speed with a clock, the .pptx open in PowerPoint with Edit Data, a book run exported to PDF, a manual GitHub export into a test repository, the projects library with six client sites.

## 4. Live: freelancers and small studios (icp1)

### C01 · static · 1080x1350 · Meta (Instagram + Facebook feed)

- **Concept:** Win before the call: a real demo site under the brief that made it
- **Headline:** Send your client a real website before the first call.
- **Subcopy:** Studio, $49/month: build the site, send a review link, get the yes.
- **CTA:** Open the studio
- **Tag / priority / week:** `live` · P1 · week 1
- **Use as:** both · channel ch-boosts / ch-instagram · budget b5 (only as a boost of an organic winner) or organic · hook W1 · link `makeborne.com/go/ig-c01` · utm_content `ig-c01-w1`
- **Visual:** Proof split. Top 60%: a fresh production capture of the Kafa Tamo coffee-roastery hero (cream, terracotta italic 'tamo') in a white card, the sentence chip above it. Bottom 40%: canvas with the headline in Inter, one accent word in Newsreader Italic gradient. Strip with price and refund line.
- **Ad / caption variants:** "Your next client sees a real website before the call. Build it, send a review link, get the yes." / "Win the client first" | "Freelancers: show up to the first call with the site already built. Studio is $49/month." / "A site before the call" | "Build the demo site, send one link, let the client approve it. Full refund until you use credits." / "Build it. Get the yes."

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Run the brief "A website for a small specialty coffee roastery in Sarajevo with a monthly bean subscription." and capture the published site's first screen at 1440x900 (the hero with headline, illustration and primary button). COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Warm canvas #F8F7F4 background. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. The upper 60% (y 9%-60%) holds the capture inside a white #FFFFFF card with 18 px corners and the two-layer shadow (contact shadow 0 2px 6px rgba(20,22,40,.12) plus ambient shadow 0 50px 90px -35px rgba(30,40,90,.35)), 86% of the width, centred; overlapping its top-left edge by 40 px sits a white #FFFFFF pill with a 1 px #E4E1DA border and the two-layer shadow (contact shadow 0 2px 6px rgba(20,22,40,.12) plus ambient shadow 0 50px 90px -35px rgba(30,40,90,.35)), holding a small ink pencil glyph and the brief in the grotesk 28 px #18181B: "A website for a small coffee roastery in Sarajevo." . The lower 40% is canvas: the headline left-aligned in the grotesk at 84 px ink #18181B on three lines "Send your client" / "a real website" / "before the first" followed on the third line by the word "call." set in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); below it at 34 px in #5C616D "Studio, $49/month: build it, send the review link, get the yes." Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C02 · static · 1080x1350 · Meta (Instagram + Facebook feed)

- **Concept:** Approval without email chaos: the client approves on a phone
- **Headline:** Your client approves from their phone. No account. No screenshots.
- **Subcopy:** They comment on the live site and tap Approve this version.
- **CTA:** See how review works
- **Tag / priority / week:** `live` · P1 · week 1
- **Use as:** both · channel ch-instagram / ch-boosts · budget b5 or organic · hook A2 · link `makeborne.com/go/ig-c02` · utm_content `ig-c02-a2`
- **Visual:** A real phone-width (390) capture of the client review page with the 'Approve this version' button and one pinned comment, standing in a white rounded phone-shaped card (flat, no device photo). Left column type on canvas.
- **Ad / caption variants:** "Clients comment on the live site and approve it from their phone. No login, no screenshots." / "Approval in one link" | "Stop collecting feedback in 40 emails. Send one review link. Studio is $49/month." / "One link. One yes."

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Open a client review link for a fictional published site on a 390 px wide viewport; leave one comment as "Ana" reading "Can the opening hours go under the map?"; capture the screen with the comment visible and the "Approve this version" and "Request changes" buttons in view. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Right 50% (x 48%-93%): the 390 px capture scaled to 980 px tall inside a flat white #FFFFFF rounded rectangle (48 px corners, 10 px ink #18181B hairline bezel, the two-layer shadow), upright, no tilt, no hand. Left 46%: the headline in the grotesk at 72 px ink on five lines "Your client" / "approves from" / "their phone." / "No account." / "No screenshots" then a full stop in coral #F76F53; one word, "phone.", is set in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Below at 30 px #5C616D: "They comment on the live site and tap Approve this version." Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C03 · static · 1080x1350 · Meta + LinkedIn

- **Concept:** Text-only stance (Motion ranks text-only statics first on Meta [V]): 40 emails vs one link
- **Headline:** 40 emails of feedback. Or one link.
- **Subcopy:** Client review links with comments and Approve, on every Makeborne site.
- **CTA:** Make client work like this
- **Tag / priority / week:** `live` · P1 · week 1
- **Use as:** both · channel ch-instagram / ch-linkedin / ch-boosts · budget b5 or organic · hook A3 · link `makeborne.com/go/ig-c03` · utm_content `ig-c03-a3`
- **Visual:** Type only. Top half: '40 emails of feedback.' with a thin struck-through stack of 6 grey e-mail subject lines (typeset, not screenshots). Bottom: 'Or one link.' with 'link.' in the italic gradient. Nothing else.
- **Ad / caption variants:** "Your client comments on the live site, then approves it. The 40-email thread can retire." / "40 emails, or one link" | "Send a review link with every site you build. Comments and Approve, no client login." / "Feedback in one place"

<details><summary>Generation / capture prompt</summary>

A text-only social graphic on warm canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Upper half (y 12%-50%): six short e-mail subject lines stacked left-aligned in the grotesk 30 px #5C616D, each with a 2 px #5C616D strike-through line: "Re: Re: homepage v3" / "Fwd: small changes" / "Re: logo bigger?" / "Re: Re: Re: final final" / "Re: can we make it pop" / "Re: one more thing". Middle (y 52%-70%): the headline in the grotesk at 96 px ink #18181B on two lines "40 emails of" / "feedback.". Lower (y 71%-84%): "Or one" in the grotesk 96 px ink followed by "link." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C04 · static · 1080x1080 · Instagram + LinkedIn + X

- **Concept:** Tagline card: Build it. Send the link. Get the yes.
- **Headline:** Build it. Send the link. Get the yes.
- **Subcopy:** The AI studio for client work.
- **CTA:** makeborne.com
- **Tag / priority / week:** `live` · P2 · week 1
- **Use as:** organic · channel ch-instagram / ch-linkedin / ch-x · budget organic · hook TAG · link `makeborne.com/go/li-c04` · utm_content `li-c04-tag`
- **Visual:** Three lines of type stacked like a checklist, each with a small ink tick drawn as a single stroke. Only 'yes.' carries the italic gradient. Square for profile pins and LinkedIn.
- **Ad / caption variants:** "The AI studio for client work: websites, decks and books, plus a review link your client approves." / "Build. Send. Get the yes."

<details><summary>Generation / capture prompt</summary>

A square typographic poster on warm canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 48 px tall, and beside it the wordmark "Makeborne" in the grotesk at 26 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Centre-left block (x 9%-91%, y 26%-74%): three lines in the grotesk at 104 px ink #18181B: "Build it." / "Send the link." / "Get the" followed by "yes." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); to the left of each line a small hand-drawn single-stroke tick in ink, 40 px. Below at 32 px #5C616D: "The AI studio for client work." Bottom band: a 1 px hairline #E4E1DA across the full inner width at 90% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 1:1 graphic filling the entire 1080x1080 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C05 · carousel · 1080x1350 · Instagram (organic carousel) + LinkedIn document re-export

- **Concept:** How I get a client's yes without one e-mail (the live client workflow, step by step)
- **Headline:** How I get a client's yes without one e-mail.
- **Subcopy:** Lead finder, demo site, review link, Approve. All live today.
- **CTA:** Comment CLIENT for the 3 briefs I use
- **Tag / priority / week:** `live` · P1 · week 2
- **Use as:** organic · channel ch-instagram / ch-linkedin · budget organic · hook F1 · link `makeborne.com/go/ig-c05-client` · utm_content `ig-c05-f1`
- **Before it ships:** Instagram keyword DM 'CLIENT' set up (ch-instagram)
- **Visual:** Eight 4:5 cards, same grid: step number top-left in the grotesk 40 px ink, caption top (2 lines max), real capture in a white card bottom 62%. No two cards share a capture.
- **Slides:**
  1. "How I get a client's yes / without one e-mail." · Cover: type only on canvas, 'e-mail.' in italic gradient, small 'Swipe' arrow in SEC grey bottom-right.
  2. "1. Find the business. / Lead finder: what kind of business, and where." · CAPTURE the Lead finder in 'Local businesses' mode with 'What kind of business?' = 'bakery' and 'Where?' = a city; results list cropped to 4 rows with business names blurred.
  3. "2. Build them a better site. / One brief in." · CAPTURE the composer with the brief typed and the Plan step visible; sentence chip over it.
  4. "3. Publish it. / Live on a Makeborne address." · CAPTURE the Publish website dialog showing the sites.makeborne.com/<slug> address (fictional slug).
  5. "4. Send one review link. / Share for review." · CAPTURE 'Share for review' → 'Create review link' with the copied-link toast.
  6. "5. They comment on the live site." · CAPTURE the review page at 390 px with one comment pinned.
  7. "6. They tap Approve this version." · CAPTURE the approve confirmation on the phone-width page; the decision note field empty.
  8. "Studio, $49/month. / Full refund until you use credits. / Comment CLIENT." · End card: price, refund line, 'Comment CLIENT' in a white pill; makeborne.com bottom-left.
- **Ad / caption variants:** "The whole client loop, live today: find the business, build the site, send the link, get Approve." / "From lead to yes"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Record slides 2-7 in one session on one fictional bakery (name it 'Mlin & Kora', checked); capture each state listed in slides[].visual. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Every card: canvas #F8F7F4, Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 40 px tall, and beside it the wordmark "Makeborne" in the grotesk at 22 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. caption in the grotesk 58 px ink #18181B at y 12%-30%, two lines maximum, exactly the slide text; capture in a white #FFFFFF card with 18 px corners and the two-layer shadow at y 34%-92%, 86% wide. Card 1 is type only: "How I get a client's yes" / "without one" + "e-mail." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image), 92 px. Card 8 is type only with the strip.  Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C06 · carousel · 1080x1350 · Instagram (organic carousel)

- **Concept:** 5 sites from one brief each (real outputs only; the day-4 carousel in the plan)
- **Headline:** 5 websites. 5 briefs.
- **Subcopy:** Each one built from the brief on its card. Unedited.
- **CTA:** Comment SITE and I'll send the briefs
- **Tag / priority / week:** `live` · P1 · week 1
- **Use as:** organic · channel ch-instagram · budget organic · hook R1 · link `makeborne.com/go/ig-c06-site` · utm_content `ig-c06-r1`
- **Before it ships:** Five fresh production runs recorded with time and credits; Trademark check of every business name on screen
- **Visual:** Each output card: the brief on top in quotes (grotesk 50 px), the real hero capture in a white card, and a small grey footnote with the real build time and credits used, read from the run log. Never show a site the brief didn't produce.
- **Slides:**
  1. "5 websites. / 5 briefs. / Unedited." · Cover: type only; 'briefs.' in italic gradient.
  2. ""A small coffee roastery in Sarajevo."" · CAPTURE Kafa Tamo-style hero, fresh production run of the same brief, 1440 first screen.
  3. ""A bouldering gym in an old tram depot."" · CAPTURE Crux Yard-style hero (yellow highlight 'GO AGAIN.'), fresh run; trademark-check the name first or rename.
  4. ""A 28-seat osteria in Ljubljana."" · CAPTURE Osteria Brina-style hero, fresh run.
  5. ""A handoff tracker for small logistics teams."" · CAPTURE Relay Operations-style SaaS hero, fresh run.
  6. ""A seafood smokehouse by the harbour."" · CAPTURE Saltwater & Smoke-style hero, fresh run.
  7. "From $20/month + tax. / Full refund until you use credits. / Comment SITE." · End card with price, refund line and keyword pill.
- **Ad / caption variants:** "Five sites, five briefs, no edits. Swipe, then comment SITE for the exact briefs." / "5 briefs, 5 sites"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Run each brief once on production on launch week, keep the first output (no cherry-picked re-rolls; if one fails, say so on the card or drop it), and note build time and credits from the run. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Every card: canvas #F8F7F4; the brief in the grotesk 50 px ink #18181B in curly quotes at y 9%-22%; the capture in a white card at y 26%-86%; footnote at y 89% in the grotesk 24 px #5C616D: "Built in [m:ss] · [N] credits · unedited" filled from the run log. Card 1 and card 7 are type only. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C07 · linkedin-doc · 1080x1350 · LinkedIn (document post, PDF)

- **Concept:** The client-approval workflow in 8 pages, built in Makeborne as a deck and exported as PDF (with a 'Made with Makeborne' end page)
- **Headline:** The approval workflow I use for every client site.
- **Subcopy:** 8 pages. Built in Makeborne from one brief.
- **CTA:** Comment 'workflow' and I'll send the review link to play the client
- **Tag / priority / week:** `live` · P1 · week 1
- **Use as:** organic · channel ch-linkedin · budget organic · hook F1 · link `makeborne.com/go/li-c07` · utm_content `li-c07-f1`
- **Visual:** A deck built in Makeborne, so the document itself is proof. Cream canvas, editorial serif headings allowed (it is an output, not an ad), captures placed as images.
- **Slides:**
  1. "The approval workflow / I use for every client site." · Deck title slide made in Makeborne, portrait 4:5 export.
  2. "The problem: feedback lives in 6 places." · Typographic list: e-mail, WhatsApp, PDF markup, calls, screenshots, 'quick note'.
  3. "Step 1. Build the first version before the call." · Real site capture.
  4. "Step 2. One review link. No client account." · Review page capture.
  5. "Step 3. Comments sit on the live page." · Pinned comment capture.
  6. "Step 4. Fix it in chat. Only that thing changes." · Before/after of one edit.
  7. "Step 5. 'Approve this version.' Done." · Approve capture on a phone-width page.
  8. "Made with Makeborne. / Studio, $49/month. Full refund until you use credits." · End page with makeborne.com/go/li-c07.
- **Ad / caption variants:** "My client-approval workflow in 8 pages. The document itself was built in Makeborne." / "The approval workflow"

<details><summary>Generation / capture prompt</summary>

BUILD IN MAKEBORNE (the document is the proof): create a presentation with the brief "An 8-slide portrait guide for freelance web designers: the client approval workflow. Warm cream background, near-black text, one muted blue accent, calm editorial type, one idea per slide." Paste the slide texts exactly as in slides[]; insert the real captures from C05 as images; export PDF at 1080x1350 per page. Do not touch up the output outside Makeborne. If the output misses the bar, regenerate the brief, not the pixels.

</details>

### C08 · static · 1200x1200 · LinkedIn (founder post image) + X

- **Concept:** Founder 'Day 1' card: what it is, who it's for, the price and the refund rule
- **Headline:** Day 1. Makeborne is live.
- **Subcopy:** An AI studio for client work, built in Sarajevo. Websites, decks and books, plus a link your client approves.
- **CTA:** Comment what you want built first
- **Tag / priority / week:** `live` · P1 · week 1
- **Use as:** organic · channel ch-linkedin / ch-x · budget organic · hook P1 · link `makeborne.com/go/li-c08` · utm_content `li-c08-p1`
- **Visual:** A plain editorial 'notice' card: large 'Day 1.' with 'live.' in the italic gradient, four short facts in a two-column list, founder's small signature line. No photo needed; if a founder photo is used it is a real photo, not generated.
- **Ad / caption variants:** "Day 1: Makeborne is live. Websites, decks and books for client work. From $20/month." / "Day 1"

<details><summary>Generation / capture prompt</summary>

A square founder announcement card on warm canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 48 px tall, and beside it the wordmark "Makeborne" in the grotesk at 26 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Upper block (y 14%-46%): "Day 1." in the grotesk 150 px ink #18181B, under it "Makeborne is" in the grotesk 88 px ink followed by "live." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Middle (y 52%-82%): a two-column list in the grotesk 34 px; left column labels in #5C616D: "Makes" / "For" / "Price" / "Refund"; right column values in ink: "Websites, decks and books" / "Freelancers and small studios" / "From $20/month" / "In full, until you use credits"; 1 px #E4E1DA rules between rows. Bottom-left at y 92%: "Built in Sarajevo, sold worldwide." in the grotesk 26 px #5C616D. Flat, straight-on 1:1 graphic filling the entire 1200x1200 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C09 · story · 1080x1920 · Instagram + Facebook Stories / Reels cover

- **Concept:** Play the client: open the public sample review link and approve a site yourself (the trial substitute)
- **Headline:** Play the client.
- **Subcopy:** Open our sample review link. Leave a comment. Tap Approve.
- **CTA:** Link in story: play the client
- **Tag / priority / week:** `live` · P1 · week 2
- **Use as:** both · channel ch-instagram / ch-boosts · budget organic, b5 if boosted · hook PC1 · link `makeborne.com/go/ig-c09-play` · utm_content `ig-c09-pc1`
- **Before it ships:** Growth ask ga5: public sample review link ('play the client') is live; ga6 review-page link tagged utm_source=review_page
- **Visual:** Full-height real capture of the sample review page at 390 px, centred in a flat phone-shaped card; top text in the safe zone; link sticker area kept clear above the bottom 35%.
- **Ad / caption variants:** "Before you pay, be the client: open our sample review link, leave a comment and approve a site." / "Play the client" | "See exactly what your client sees: a live site, comments, one Approve button. No sign-up to look." / "Try the client side"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Open the public sample review link at 390 px wide and capture the full first screen, showing a comment marker and the Approve this version button. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4, 1080x1920. Keep all text out of the top 14% (270 px), the bottom 35% (670 px) and 6% at each side, the third-party Reels/Stories safe zone [U]; check the platform template before export. Upper text block (y 15%-30%): "Play the" in the grotesk 120 px ink #18181B followed by "client." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); below at 40 px #5C616D: "Open our sample review link." / "Leave a comment. Tap Approve.". Centre (y 32%-64%): the capture in a flat white rounded rectangle (52 px corners, 10 px ink bezel, the two-layer shadow), 62% of the width, upright. Leave y 65%-100% empty canvas for the link sticker and UI. Flat, straight-on 9:16 graphic filling the entire 1080x1920 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C10 · static · 1080x1350 · Meta + LinkedIn

- **Concept:** Win before the call, part 1: the lead finder (live), not the coming AI lead research
- **Headline:** Find local businesses. Show up with a better site.
- **Subcopy:** Lead finder, demo site, review link and a basic CRM to track the follow-up.
- **CTA:** Find your first five
- **Tag / priority / week:** `live` · P2 · week 2
- **Use as:** both · channel ch-linkedin / ch-instagram / ch-boosts · budget b5 or organic · hook F4 · link `makeborne.com/go/li-c10` · utm_content `li-c10-f4`
- **Visual:** Left: real Lead finder capture (Local businesses mode, filled fields, 4 results with names blurred). Right column: a three-step ladder in type: Find / Build / Send.
- **Ad / caption variants:** "Find local businesses, build them a better site, send the link, track the follow-up. One studio." / "Win the client first" | "Lead finder plus demo site plus review link. Every message you send stays one-to-one and personal." / "Find, build, send"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Lead finder → 'Local businesses' → 'What kind of business?' = "bakery", 'Where?' = a mid-size city; capture the result list; blur every real business name and address with a 12 px Gaussian blur. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Top text (y 10%-34%): the headline in the grotesk 76 px ink #18181B on three lines "Find local businesses." / "Show up with a" / "better" followed by "site." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Lower-left 62% (y 38%-86%): the capture in a white card with the two-layer shadow. Lower-right 30%: three stacked steps in the grotesk 34 px: "01 Find" / "02 Build" / "03 Send the link", numbers in #5C616D, 1 px #E4E1DA rules between. Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C11 · x-image · 1600x900 · X + LinkedIn

- **Concept:** One plan, every client site, no per-site fee (fair use applies)
- **Headline:** One plan. Every client site. No per-site fee.
- **Subcopy:** Host your client sites on one Makeborne plan (fair use applies).
- **CTA:** See the plans
- **Tag / priority / week:** `live` · P2 · week 2
- **Use as:** organic · channel ch-x / ch-linkedin · budget organic · hook F3 · link `makeborne.com/go/x-c11` · utm_content `x-c11-f3`
- **Visual:** A wide row of 6 small real site thumbnails (fresh captures) sitting on one hairline 'shelf' labelled 'Studio · $49/month'. Headline above. Footnote 'fair use applies' in grey.
- **Ad / caption variants:** "Host your client sites on one plan, no per-site fee (fair use applies). Studio is $49/month." / "One plan, every client"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Six first-screen captures (1440x900) of six different fictional client sites published on the same owner account; also capture the projects library grid showing them together. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 16:9 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 44 px tall, and beside it the wordmark "Makeborne" in the grotesk at 24 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Headline top-left (y 12%-34%) in the grotesk 76 px ink #18181B: "One plan. Every client site." / "No per-site" followed by "fee." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Lower 50% (y 44%-84%): six captures as 16:10 white cards with 12 px corners and the contact shadow only, evenly spaced on one 2 px ink #18181B shelf line at y 85%; under the line, left: "Studio · $49/month" in the grotesk 28 px ink; right: "Fair use applies." 24 px #5C616D. Flat, straight-on 16:9 graphic filling the entire 1600x900 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C12 · x-image · 1600x900 · X + Indie Hackers + LinkedIn (organic only)

- **Concept:** Contrarian founder stance (P3): paid plans only, on purpose, with the three trial substitutes
- **Headline:** Paid plans only, on purpose.
- **Subcopy:** Watch the uncut build. Play the client. If you don't use a credit, you get every cent back.
- **CTA:** Read why
- **Tag / priority / week:** `live` · P2 · week 1
- **Use as:** organic · channel ch-x / ch-community / ch-linkedin · budget organic · hook P3 · link `makeborne.com/go/x-c12` · utm_content `x-c12-p3`
- **Visual:** Big statement left; right column of three numbered substitutes. Organic only: never as a paid ad or search ad.
- **Ad / caption variants:** "Everyone said give it away first. Here's why I didn't, and what you get instead." / "Paid plans only, on purpose"

<details><summary>Generation / capture prompt</summary>

A 16:9 founder statement card on warm canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 44 px tall, and beside it the wordmark "Makeborne" in the grotesk at 24 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Left 55% (y 22%-70%): "Paid plans only," in the grotesk 92 px ink #18181B and on the next line "on" in the grotesk followed by "purpose." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Right 38%: three rows in the grotesk 34 px, numbers in #5C616D, 1 px #E4E1DA rules: "01  Watch the uncut build" / "02  Play the client on our sample review link" / "03  Don't use a credit? Every cent back.". Bottom-left y 90%: "Day [N] · building in public from Sarajevo" 24 px #5C616D, [N] filled on posting day. Flat, straight-on 16:9 graphic filling the entire 1600x900 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C13 · x-image · 1600x900 · X + LinkedIn

- **Concept:** You own it: download the source, export to GitHub by hand (never imply automatic sync)
- **Headline:** Your client's site is yours. Download the source any time.
- **Subcopy:** Or export it to a GitHub repository in one step.
- **CTA:** See export
- **Tag / priority / week:** `live` · P3 · week 2
- **Use as:** organic · channel ch-x / ch-linkedin · budget organic · hook O1 · link `makeborne.com/go/x-c13` · utm_content `x-c13-o1`
- **Visual:** Split: left the published site capture; right the exported repository file list (real export to a test repository, names cropped). An arrow between them labelled 'Export'.
- **Ad / caption variants:** "Download the source any time, or export the project to GitHub in one step. It's your work." / "You own the code"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. From a fictional project, run the manual GitHub export into a fresh private test repository; capture the repository file tree (crop the owner name) and the project's Download source control. Do not show any 'sync' wording. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 16:9 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 44 px tall, and beside it the wordmark "Makeborne" in the grotesk at 24 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Top (y 10%-30%): "Your client's site is" in the grotesk 64 px ink #18181B followed by "yours." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Lower 60%: left card (x 7%-46%) the site capture; right card (x 54%-93%) the repository capture; between them a 2 px ink arrow with the label "Export" in the grotesk 24 px #5C616D. Bottom y 92%: "Download the source any time. GitHub export is one step, by hand." 24 px #5C616D. Flat, straight-on 16:9 graphic filling the entire 1600x900 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C14 · thumbnail · 1280x720 · YouTube (long tutorial)

- **Concept:** Long tutorial thumbnail: win web design clients with a demo site (3 variants for Test & Compare, judged on watch-time share)
- **Headline:** Win the client before the call
- **Subcopy:** Variant B: 'Demo site → client yes'. Variant C: 'I built it before they asked'.
- **CTA:** Watch
- **Tag / priority / week:** `live` · P3 · week 3
- **Use as:** organic · channel ch-youtube · budget organic · hook YT1 · link `makeborne.com/go/yt-c14` · utm_content `yt-c14-yt1`
- **Visual:** Left 55%: a real demo-site capture showing the real approved confirmation from the review page; right 45%: 4-6 words of type. Founder face optional (real photo only). No arrows-and-shock-face clichés.
- **Ad / caption variants:** "How to win web design clients with a demo site and a review link (uncut tutorial)." / "Win the client first"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Capture the approved state of a review link for a fictional site (the confirmation after Approve this version) at 1440 wide. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1280x720. Left 55%: the capture filling the panel edge to edge with 1 px #E4E1DA divider. Right 45% on canvas #F8F7F4: "Win the client" in the grotesk 92 px ink #18181B and "before the" + "call." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); max 6 words. Small flat m mark bottom-right 40 px. Make variants B and C by changing only the words. Flat, straight-on 16:9 graphic filling the entire 1280x720 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C15 · story · 1080x1920 · Instagram Stories

- **Concept:** Keyword DM prompt: reply CLIENT for 3 copyable briefs and a 30-second uncut build
- **Headline:** Reply CLIENT.
- **Subcopy:** I'll send the 3 briefs I use for client demo sites and a 30-second uncut build.
- **CTA:** Reply CLIENT
- **Tag / priority / week:** `live` · P2 · week 1
- **Use as:** organic · channel ch-instagram · budget organic · hook DM1 · link `makeborne.com/go/ig-c15-client` · utm_content `ig-c15-dm1`
- **Before it ships:** IG keyword automation for CLIENT on the free tier (b7 only if outgrown)
- **Visual:** Type-only story: a white message bubble with 'CLIENT' in it, three numbered brief lines underneath. Inside the safe zone.
- **Ad / caption variants:** "Reply CLIENT and I'll send three briefs that make strong client demo sites." / "Reply CLIENT"

<details><summary>Generation / capture prompt</summary>

A 1080x1920 story on warm canvas #F8F7F4. Keep all text out of the top 14% (270 px), the bottom 35% (670 px) and 6% at each side, the third-party Reels/Stories safe zone [U]; check the platform template before export. y 15%-26%: "Reply" in the grotesk 132 px ink #18181B followed by a white #FFFFFF message bubble (40 px corners, the two-layer shadow) containing "CLIENT" in the grotesk 104 px ink. y 30%-58%: three numbered rows in the grotesk 40 px: "01  A bakery that sells out by 11" / "02  A physio clinic with online booking" / "03  A wedding florist in the hills", numbers in #5C616D, 1 px #E4E1DA rules. y 60%-64%: "+ a 30-second uncut build" in the serif 44 px filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Flat, straight-on 9:16 graphic filling the entire 1080x1920 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C29 · static · 1080x1350 · Meta + LinkedIn

- **Concept:** One brief, three deliverables: the site, the deck and the guide in one brand
- **Headline:** One brief. The site, the deck and the guide.
- **Subcopy:** All three in one brand, ready to send to your client.
- **CTA:** Make all three
- **Tag / priority / week:** `live` · P1 · week 2
- **Use as:** both · channel ch-boosts / ch-linkedin / ch-instagram · budget b5 or organic · hook T3 · link `makeborne.com/go/ig-c29` · utm_content `ig-c29-t3`
- **Visual:** Triptych of real outputs from one brief: site hero (16:10), deck slide (16:9), book cover (portrait), aligned on one baseline with the brief chip above. Same brand colours across all three prove the point.
- **Ad / caption variants:** "Your client asked for a site. Then a deck. Then a guide. One brief makes all three, in one brand." / "Site, deck and guide" | "Websites, decks and books from one brief, in one brand. Studio is $49/month." / "One brief, three outputs"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. One brief run three times (website, presentation, book) on production for one fictional business; capture the site hero, the title slide and the book cover. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. y 9%-27%: the headline in the grotesk 68 px ink #18181B: "One brief. The site," / "the deck and the" followed by "guide." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 30%-36%: a white #FFFFFF pill with a 1 px #E4E1DA border and the two-layer shadow (contact shadow 0 2px 6px rgba(20,22,40,.12) plus ambient shadow 0 50px 90px -35px rgba(30,40,90,.35)), holding a small ink pencil glyph and the brief in the grotesk 26 px #18181B: "[the brief]". y 42%-84%: the three outputs in white cards on one shared baseline at 84%, sizes in proportion: site 46% wide, slide 30%, book cover 18%; 2% gaps. Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C30 · static · 1080x1350 · Meta (Instagram + Facebook feed)

- **Concept:** Price anchor and risk reversal (Motion lists price anchor among the top hook types [V])
- **Headline:** From $20/month + tax. Full refund until you use credits.
- **Subcopy:** Create $20 · Studio $49 · Scale $99. Yearly is 20% off.
- **CTA:** See plans
- **Tag / priority / week:** `live` · P2 · week 2
- **Use as:** ad · channel ch-boosts · budget b5 · hook PR1 · link `makeborne.com/go/ig-c30` · utm_content `ig-c30-pr1`
- **Visual:** A typeset price card, not a pricing-page screenshot: three rows with plan, price, credits and one-line use; Studio row marked 'best for client work'. Refund line as the hero.
- **Ad / caption variants:** "Websites, decks and books from $20/month + tax. Full refund until you use credits." / "From $20/month" | "Studio is $49/month with 750 credits and client review links. Yearly is 20% off." / "Studio for client work"

<details><summary>Generation / capture prompt</summary>

A typeset pricing graphic on warm canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. y 10%-34%: "From $20/month." in the grotesk 96 px ink #18181B; next line "Full refund until you use" in the grotesk 60 px and "credits." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 40%-80%: three rows, each a white #FFFFFF card with 18 px corners and the contact shadow: "Create" / "$20/month" / "300 credits"; "Studio" / "$49/month" / "750 credits" with a small ink pill "Best for client work"; "Scale" / "$99/month" / "1,550 credits"; labels in the grotesk 40 px ink, credits 30 px #5C616D. y 84%: "Yearly is 20% off. Cancel any time." 28 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C31 · x-image · 1600x900 · X + LinkedIn (organic only; no competitor names in paid copy)

- **Concept:** Honest lane statement: app builders build apps; Makeborne delivers client work
- **Headline:** Need an app with logins? Use an app builder. Need the client's site, deck and yes? That's us.
- **Subcopy:** Lovable is great for apps with logins. Makeborne is for client deliverables.
- **CTA:** See what we make
- **Tag / priority / week:** `live` · P3 · week 2
- **Use as:** organic · channel ch-x / ch-linkedin · budget organic · hook L1 · link `makeborne.com/go/x-c31` · utm_content `x-c31-l1`
- **Visual:** Two plain columns, no logos, no 'vs' graphics, no quality claims. Left 'Apps with logins and databases', right 'The site, the deck, the book and the client's approval'.
- **Ad / caption variants:** "Lovable is great for apps with logins. Makeborne is for client deliverables: site, deck, book, approval." / "Different jobs"

<details><summary>Generation / capture prompt</summary>

A 16:9 statement card on warm canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 44 px tall, and beside it the wordmark "Makeborne" in the grotesk at 24 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Two columns separated by a 1 px #E4E1DA vertical rule at x 50%. Left (x 7%-46%): label "App builders" in the grotesk 28 px #5C616D; body "Apps with logins," / "databases and payments." in the grotesk 56 px ink #18181B. Right (x 54%-93%): label "Makeborne" 28 px #5C616D; body "The site, the deck, the book" / "and the client's" followed by "yes." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). No competitor logos anywhere. Flat, straight-on 16:9 graphic filling the entire 1600x900 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C32 · og · 1200x630 · Link preview (all platforms)

- **Concept:** OG link-preview image for the format-matched landing page /client-work (growth ask ga7)
- **Headline:** Send your client a real website before the first call.
- **Subcopy:** Build it. Send the link. Get the yes.
- **CTA:** makeborne.com/client-work
- **Tag / priority / week:** `live` · P1 · week 2
- **Use as:** organic · channel ch-loops / all · budget organic · hook OG · link `makeborne.com/client-work` · utm_content `og-c32`
- **Before it ships:** Growth ask ga7: the landing page exists
- **Visual:** Left 56% type, right 44% one real output capture cropped to the panel; matches the landing page's top example so the click feels continuous.
- **Ad / caption variants:** "Build it. Send the link. Get the yes." / "Send your client a real website before the first call."

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. The top example on the /client-work landing page, captured at its native ratio. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1200x630 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 40 px tall, and beside it the wordmark "Makeborne" in the grotesk at 22 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Left 56% (x 6%-54%, y 26%-72%): "Send your client a real website before the first" in the grotesk 54 px ink #18181B followed by "call." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); below at 24 px #5C616D: "Build it. Send the link. Get the yes.". Right 40%: the capture edge to edge in the panel with a 1 px #E4E1DA divider. Bottom-left y 90%: "makeborne.com/client-work" 20 px #5C616D. Text stays inside the centre 1080x566 so square crops survive. Flat, straight-on 1.91:1 graphic filling the entire 1200x630 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C36 · og · 1200x630 · Link preview (all platforms)

- **Concept:** OG link-preview image for the format-matched landing page /examples (growth ask ga7)
- **Headline:** Real outputs. With the brief that made them.
- **Subcopy:** Unedited sites, decks and books, with time and credits used.
- **CTA:** makeborne.com/examples
- **Tag / priority / week:** `live` · P1 · week 2
- **Use as:** organic · channel ch-loops / all · budget organic · hook OG · link `makeborne.com/examples` · utm_content `og-c36`
- **Before it ships:** Growth ask ga7: /examples gallery exists
- **Visual:** Left 56% type, right 44% one real output capture cropped to the panel; matches the landing page's top example so the click feels continuous.
- **Ad / caption variants:** "Unedited sites, decks and books, with time and credits used." / "Real outputs. With the brief that made them."

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. The top example on the /examples landing page, captured at its native ratio. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1200x630 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 40 px tall, and beside it the wordmark "Makeborne" in the grotesk at 22 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Left 56% (x 6%-54%, y 26%-72%): "Real outputs. With the brief that made" in the grotesk 54 px ink #18181B followed by "them." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); below at 24 px #5C616D: "Unedited sites, decks and books, with time and credits used.". Right 40%: the capture edge to edge in the panel with a 1 px #E4E1DA divider. Bottom-left y 90%: "makeborne.com/examples" 20 px #5C616D. Text stays inside the centre 1080x566 so square crops survive. Flat, straight-on 1.91:1 graphic filling the entire 1200x630 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C37 · x-image · 1600x900 · X + LinkedIn + Indie Hackers + TikTok photo post

- **Concept:** Build-in-public numbers card (P2 'Day 7: here's exactly how many people paid'), reused weekly and for the day-30 and day-90 beats
- **Headline:** Day [N]: here's exactly how many people paid.
- **Subcopy:** Payers, refunds, MRR and AI cost per build. Every number from Whop and our own logs.
- **CTA:** Follow the build
- **Tag / priority / week:** `live` · P1 · week 1 · beat beat-day30 / beat-day90 (same template)
- **Use as:** organic · channel ch-x / ch-linkedin / ch-community · budget organic · hook P2 · link `makeborne.com/go/x-c37` · utm_content `x-c37-p2`
- **Visual:** A ledger-style card: four big numbers with labels, a small 'refunds included' note. Numbers are typed in from Whop on the day; never estimated, never rounded up.
- **Ad / caption variants:** "Day [N] of an AI studio from Sarajevo. Every number, refunds included." / "Every number in public"

<details><summary>Generation / capture prompt</summary>

A 16:9 ledger card on warm canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 44 px tall, and beside it the wordmark "Makeborne" in the grotesk at 24 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. y 10%-24%: "Day [N]:" in the grotesk 64 px ink #18181B + "exactly how many people" + "paid." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 34%-74%: four equal columns separated by 1 px #E4E1DA rules; each a big figure in the grotesk 110 px ink and a label 26 px #5C616D: "[payers]" / "paid"; "[refunds]" / "refunded"; "$[MRR]" / "MRR"; "$[cost]" / "AI cost per first build". y 86%: "Refunds included. Source: Whop and our own logs. Buyer data cropped." 22 px #5C616D. Every bracket is filled from the live data on the day. Flat, straight-on 16:9 graphic filling the entire 1600x900 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C38 · linkedin-doc · 1080x1350 · LinkedIn document + Indie Hackers + press follow-up PDF

- **Concept:** 30 days of an AI studio from Sarajevo, every number in public (day-30 beat, Wed 25 Nov)
- **Headline:** 30 days. Every number.
- **Subcopy:** MRR, payers, refunds, AI cost per build, what worked and what failed.
- **CTA:** Read the 30-day report
- **Tag / priority / week:** `live` · P2 · week 5 · beat beat-day30
- **Use as:** organic · channel ch-linkedin / ch-community / ch-press · budget organic · hook P4 · link `makeborne.com/go/li-c38` · utm_content `li-c38-p4`
- **Visual:** Built in Makeborne as a deck (proof again). Charts are real charts from the source report.
- **Slides:**
  1. "30 days. / Every number." · Cover, type only.
  2. "What we sell, and to whom." · One paragraph plus the three plan prices.
  3. "Payers, refunds, MRR." · Ledger card from C37, real figures.
  4. "Where buyers came from." · Bar chart of net payers by source from the weekly source report (real).
  5. "What a build costs us." · Median AI cost per first build by format (real logs).
  6. "What worked." · Three bullets with a link to each post.
  7. "What failed." · Three bullets, plainly.
  8. "What's next." · Only features already live on the day; anything else says 'coming soon' with no date.
  9. "makeborne.com / From $20/month + tax. Full refund until you use credits." · End page.
- **Ad / caption variants:** "30 days of selling a paid-only AI studio: every number, including what failed." / "30 days, every number"

<details><summary>Generation / capture prompt</summary>

BUILD IN MAKEBORNE: a 9-slide portrait report from the real 30-day numbers (weekly source report + Whop export with buyer data removed). Every figure must trace to a source row kept outside this repo. No projections presented as results.

</details>

## 5. Live: consultants and founders who need decks (icp2)

### C16 · static · 1080x1350 · Meta + X

- **Concept:** Change one value. Only that value changes. (the real one-value chart edit, before and after)
- **Headline:** Change one number. Only that number changes.
- **Subcopy:** Edit a real deck in chat. Everything else stays exactly where it was.
- **CTA:** Make a deck
- **Tag / priority / week:** `live` · P1 · week 1
- **Use as:** both · channel ch-boosts / ch-x / ch-instagram · budget b5 or organic · hook D2 · link `makeborne.com/go/ig-c16-deck` · utm_content `ig-c16-d2`
- **Visual:** Two real slide captures stacked: before (12, 18, 25, 30) and after (12, 21, 25, 30), the changed bar outlined with a 3 px coral ring (the coral's one use). The chat message between them in a white bubble.
- **Ad / caption variants:** "Ask for one change and get exactly one change. The rest of your deck stays put." / "Change only what you ask" | "A deck you can edit in plain words. One number changes; nothing else moves." / "Precise deck edits"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Use the v12 real deck-edit pair (slide 6 before/after, values 12, 18, 25, 30 → 12, 21, 25, 30) or re-run it fresh on production with a new fictional company; the deck's brand name must not be legible (crop or rename; 'Tern' is a real brand). COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Headline (y 8%-24%) in the grotesk 68 px ink #18181B: "Change one number." / "Only that number" followed by "changes." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 27%-52%: the before slide in a white card labelled top-left "Before" 24 px #5C616D. y 54%-60%: a white chat bubble with "Make Q2 21, not 18." in the grotesk 30 px ink. y 62%-87%: the after slide card labelled "After", with a 3 px #F76F53 ring around the one changed bar only. Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C17 · static · 1080x1350 · Meta + LinkedIn + X

- **Concept:** It's a real chart, not a picture (the PPTX opened in PowerPoint with the chart data sheet open)
- **Headline:** Open it in PowerPoint. Click the chart. It's real.
- **Subcopy:** Every Makeborne deck downloads as an editable .pptx with real charts and speaker notes.
- **CTA:** Download a sample deck
- **Tag / priority / week:** `live` · P1 · week 1
- **Use as:** both · channel ch-boosts / ch-linkedin / ch-x · budget b5 or organic · hook D3 · link `makeborne.com/go/li-c17-deck` · utm_content `li-c17-d3`
- **Visual:** A real PowerPoint window capture (desktop app, light theme) with the chart selected and its data grid open. Clean desktop, no other apps. Big type above.
- **Ad / caption variants:** "Your deck downloads as a .pptx with real, editable charts and speaker notes on every slide." / "A real chart, not a picture" | "Notes in, editable PowerPoint out. Click any chart and edit the numbers. From $20/month." / "Editable decks"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Download the .pptx of a fictional deck, open it in desktop PowerPoint (light theme, 100% zoom), select the bar chart and open Edit Data so the value grid shows; capture the window only, with no file path, user name or other apps visible. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Headline (y 9%-31%) in the grotesk 72 px ink #18181B: "Open it in PowerPoint." / "Click the chart." / "It's" followed by "real." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 35%-86%: the capture in a white card with the two-layer shadow, 90% wide; a 3 px #F76F53 ring around the value cell that the chart reads. Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C18 · carousel · 1080x1350 · Instagram + LinkedIn document

- **Concept:** Notes in. An editable deck out. (messy notes to finished deck, real slides)
- **Headline:** Notes in. An editable deck out.
- **Subcopy:** Real slides from one paste of messy notes. Opens in PowerPoint.
- **CTA:** Comment DECK
- **Tag / priority / week:** `live` · P1 · week 2
- **Use as:** organic · channel ch-instagram / ch-linkedin · budget organic · hook D1 · link `makeborne.com/go/ig-c18-deck` · utm_content `ig-c18-d1`
- **Visual:** Same grid as C05. Slides shown at their real 16:9 inside white cards; caption above each.
- **Slides:**
  1. "Notes in. / An editable deck out." · Cover: type only; 'out.' in the italic gradient.
  2. "The notes I pasted:" · Typeset messy notes (fictional), set in a monospace on a white card, with typos left in.
  3. "Slide 1." · CAPTURE the deck's title slide from 'From Brief to Better Work' or a fresh run.
  4. "Slide 4. The numbers." · CAPTURE a data slide with a native chart.
  5. "Slide 7. The plan." · CAPTURE a timeline or process slide.
  6. "It opens in PowerPoint." · CAPTURE the .pptx in PowerPoint with the slide sorter visible.
  7. "Speaker notes on every slide." · CAPTURE PowerPoint's notes pane for one slide.
  8. "From $20/month + tax. / Full refund until you use credits. / Comment DECK." · End card.
- **Ad / caption variants:** "I pasted messy notes and got an editable deck. Swipe for the real slides. Comment DECK for the brief." / "Notes to deck"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Paste one block of fictional notes (about 180 words, a café's expansion plan) into a new presentation, keep the first output, download the .pptx, open in PowerPoint and capture the states in slides[]. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Every card: canvas #F8F7F4, Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 40 px tall, and beside it the wordmark "Makeborne" in the grotesk at 22 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. caption in the grotesk 58 px ink #18181B at y 12%-26%; capture in a white card at y 32%-80% (16:9 inside); footnote y 88% in the grotesk 24 px #5C616D: "Real output · first run · [N] credits". Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C19 · x-image · 1600x900 · X + LinkedIn

- **Concept:** Pitch deck from one brief, with the real stopwatch on screen
- **Headline:** A pitch deck from one brief.
- **Subcopy:** The clock on the right is the real build time from the recording.
- **CTA:** Make yours
- **Tag / priority / week:** `live` · P2 · week 1
- **Use as:** organic · channel ch-x / ch-linkedin · budget organic · hook D1 · link `makeborne.com/go/x-c19` · utm_content `x-c19-d1`
- **Before it ships:** Real-speed recording with measured time
- **Visual:** Left: the sentence chip. Right: a 2x2 grid of the first four real slides. A small typeset stopwatch shows the measured time from the recording; never rounded down.
- **Ad / caption variants:** "One brief in, a pitch deck out. The clock is the real build time." / "Deck from one brief"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Record one deck build from a single brief at real speed with an on-screen clock; note the measured time to the finished first slide set. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 16:9 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 44 px tall, and beside it the wordmark "Makeborne" in the grotesk at 24 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Left 40%: "A pitch deck from" in the grotesk 72 px ink #18181B and "one brief." with "brief." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); below, a white #FFFFFF pill with a 1 px #E4E1DA border and the two-layer shadow (contact shadow 0 2px 6px rgba(20,22,40,.12) plus ambient shadow 0 50px 90px -35px rgba(30,40,90,.35)), holding a small ink pencil glyph and the brief in the grotesk 26 px #18181B: "A seed-round deck for a solar installer in Split.". Right 54%: 2x2 grid of the first four real slides in white cards with 10 px corners; top-right corner a typeset stopwatch "[m:ss]" in the grotesk 40 px ink with the label "real time" 20 px #5C616D, filled from the recording. Flat, straight-on 16:9 graphic filling the entire 1600x900 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C20 · linkedin-doc · 1920x1080 pages (16:9 PDF) · LinkedIn (document post, PDF)

- **Concept:** Post the actual deck: a real Makeborne output (e.g. 'From Brief to Better Work') shared as a LinkedIn document, with a 'Made with Makeborne' end page
- **Headline:** The deck I'd send a client who asks 'why should we pay for a process?'
- **Subcopy:** 10 slides, built in Makeborne from one brief. Unedited.
- **CTA:** Comment 'deck' for the .pptx
- **Tag / priority / week:** `live` · P2 · week 2
- **Use as:** organic · channel ch-linkedin · budget organic · hook D4 · link `makeborne.com/go/li-c20` · utm_content `li-c20-d4`
- **Visual:** The output is the creative. No overlay, no edits outside the product.
- **Slides:**
  1-10. "The real deck slides, unedited." · Export of a fresh production run of the 'From Brief to Better Work' brief (freelance designers selling their process).
  11. "Made with Makeborne. / This deck took one brief. / From $20/month." · End page appended in Makeborne itself, same theme.
- **Ad / caption variants:** "A 10-slide deck on selling your design process to clients. Built in Makeborne, unedited." / "A real Makeborne deck"

<details><summary>Generation / capture prompt</summary>

BUILD IN MAKEBORNE: re-run the 'From Brief to Better Work' brief on production (10 slides for freelance designers selling their process to clients), keep the first output, add an 11th slide in chat with the exact end-page text, export PDF. Check every slide for invented statistics; if the deck states a number, replace it with a real one or remove it before posting.

</details>

### C21 · thumbnail · 1280x720 · YouTube (long tutorial)

- **Concept:** Tutorial thumbnail: messy notes to an editable PowerPoint, uncut
- **Headline:** Messy notes → real PowerPoint
- **Subcopy:** Variant B: 'Uncut: notes to deck'. Variant C: 'Click the chart. It's real.'
- **CTA:** Watch
- **Tag / priority / week:** `live` · P3 · week 3
- **Use as:** organic · channel ch-youtube · budget organic · hook YT2 · link `makeborne.com/go/yt-c21` · utm_content `yt-c21-yt2`
- **Visual:** Left third: messy notes card at a slight paper texture, flat. Right two-thirds: one strong real slide. A single ink arrow between.
- **Ad / caption variants:** "Uncut: turning messy meeting notes into an editable PowerPoint deck." / "Notes to PowerPoint"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Capture the strongest real slide from the C18 run at 1920x1080. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1280x720 on canvas #F8F7F4. Left 32%: a flat white card with 8 lines of typeset messy notes in a monospace 18 px #5C616D. Centre: a 4 px ink #18181B arrow. Right 60%: the real slide in a white card with the two-layer shadow. Top band y 6%-22%: "Messy notes →" in the grotesk 64 px ink and "real PowerPoint" with "PowerPoint" in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Flat, straight-on 16:9 graphic filling the entire 1280x720 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C22 · story · 1080x1920 · Instagram Stories

- **Concept:** Keyword DM prompt: reply DECK for the brief and a sample .pptx
- **Headline:** Reply DECK.
- **Subcopy:** I'll send the brief, the .pptx and a 30-second uncut build.
- **CTA:** Reply DECK
- **Tag / priority / week:** `live` · P3 · week 2
- **Use as:** organic · channel ch-instagram · budget organic · hook DM2 · link `makeborne.com/go/ig-c22-deck` · utm_content `ig-c22-dm2`
- **Before it ships:** IG keyword automation for DECK
- **Visual:** Same system as C15, with one real slide card under the bubble.
- **Ad / caption variants:** "Reply DECK for the brief, the .pptx and an uncut build." / "Reply DECK"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. One real data slide from C18. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1080x1920 canvas #F8F7F4. Keep all text out of the top 14% (270 px), the bottom 35% (670 px) and 6% at each side, the third-party Reels/Stories safe zone [U]; check the platform template before export. y 15%-26%: "Reply" in the grotesk 132 px ink #18181B + white bubble "DECK". y 30%-50%: the slide in a white card, 86% wide. y 52%-62%: "The brief, the .pptx and" in the grotesk 40 px ink and "a 30-second uncut build." in the serif 44 px filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Flat, straight-on 9:16 graphic filling the entire 1080x1920 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C33 · og · 1200x630 · Link preview (all platforms)

- **Concept:** OG link-preview image for the format-matched landing page /decks (growth ask ga7)
- **Headline:** A deck that opens in PowerPoint and still looks designed.
- **Subcopy:** Notes in. An editable deck out.
- **CTA:** makeborne.com/decks
- **Tag / priority / week:** `live` · P1 · week 2
- **Use as:** organic · channel ch-loops / all · budget organic · hook OG · link `makeborne.com/decks` · utm_content `og-c33`
- **Before it ships:** Growth ask ga7: the landing page exists
- **Visual:** Left 56% type, right 44% one real output capture cropped to the panel; matches the landing page's top example so the click feels continuous.
- **Ad / caption variants:** "Notes in. An editable deck out." / "A deck that opens in PowerPoint and still looks designed."

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. The top example on the /decks landing page, captured at its native ratio. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1200x630 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 40 px tall, and beside it the wordmark "Makeborne" in the grotesk at 22 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Left 56% (x 6%-54%, y 26%-72%): "A deck that opens in PowerPoint and still looks" in the grotesk 54 px ink #18181B followed by "designed." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); below at 24 px #5C616D: "Notes in. An editable deck out.". Right 40%: the capture edge to edge in the panel with a 1 px #E4E1DA divider. Bottom-left y 90%: "makeborne.com/decks" 20 px #5C616D. Text stays inside the centre 1080x566 so square crops survive. Flat, straight-on 1.91:1 graphic filling the entire 1200x630 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

## 6. Live: coaches, creators and authors (icp3, text-led books)

### C23 · carousel · 1080x1350 · Instagram (organic carousel) + LinkedIn document

- **Concept:** Your notes app is full of book ideas. Here's one, finished. (a text-led book page-through)
- **Headline:** Your notes app is full of book ideas. Here's one, finished.
- **Subcopy:** A real, text-led book from one brief. For screen and PDF.
- **CTA:** Comment BOOK
- **Tag / priority / week:** `live` · P1 · week 2
- **Use as:** organic · channel ch-instagram / ch-linkedin · budget organic · hook B4 · link `makeborne.com/go/ig-c23-book` · utm_content `ig-c23-b4`
- **Visual:** Book pages at their real portrait ratio inside white cards with a thin page-edge shadow (flat, no 3D book mock-up).
- **Slides:**
  1. "Your notes app is full of book ideas. / Here's one, finished." · Cover card: type only, 'finished.' in italic gradient.
  2. "The note:" · Typeset phone-note style card with the 2-line idea (fictional).
  3. "The cover." · CAPTURE the book cover page (typographic, no generated imagery) from a fresh run, e.g. 'The Useful Client Brief'.
  4. "The contents." · CAPTURE the contents page.
  5. "A chapter opener." · CAPTURE one chapter opener.
  6. "A checklist you can use." · CAPTURE a checklist page.
  7. "For screen and PDF. / From $20/month. / Comment BOOK." · End card; never 'print-ready'.
- **Ad / caption variants:** "A notes-app brief became a finished guide. Swipe through the real pages. Comment BOOK." / "Notes to a finished book"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Run a book brief ("A practical 40-page guide for freelance designers on writing a useful client brief") on production, keep the first output, export PDF, capture the pages listed. Pages must be typographic; no generated pictures until the images beat. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Every card: canvas #F8F7F4, caption in the grotesk 58 px ink #18181B at y 10%-22%; page capture centred at y 26%-90% in a white card with the contact shadow only; card 1 and 7 type only. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C24 · static · 1080x1350 · Meta + LinkedIn

- **Concept:** A client welcome guide from one brief (books for client work; bridges ICP 3 and ICP 1)
- **Headline:** A welcome guide for every new client. From one brief.
- **Subcopy:** Process, timeline and what you need from them, as a designed PDF.
- **CTA:** Make your guide
- **Tag / priority / week:** `live` · P2 · week 3
- **Use as:** both · channel ch-instagram / ch-linkedin / ch-boosts · budget b5 or organic · hook B5 · link `makeborne.com/go/li-c24-book` · utm_content `li-c24-b5`
- **Visual:** Two real book pages side by side flat (cover + 'What happens in week 1' page). Headline above.
- **Ad / caption variants:** "Turn how you work into a designed welcome guide your new clients actually read." / "Your client welcome guide" | "One brief, a finished PDF guide: your process, timeline and what you need from the client." / "Onboard clients better"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Run the brief "A 12-page welcome guide for new clients of a two-person web studio: how we work, the timeline, what we need from you." and capture the cover and one process page. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Headline (y 9%-30%) in the grotesk 70 px ink #18181B: "A welcome guide for" / "every new client." / "From one" followed by "brief." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 34%-86%: two portrait pages side by side, each in a white card with the contact shadow, 4% gap. Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C25 · story · 1080x1920 · Instagram Stories

- **Concept:** Keyword DM prompt: reply BOOK for the brief and the PDF
- **Headline:** Reply BOOK.
- **Subcopy:** I'll send the brief and the finished PDF.
- **CTA:** Reply BOOK
- **Tag / priority / week:** `live` · P3 · week 2
- **Use as:** organic · channel ch-instagram · budget organic · hook DM3 · link `makeborne.com/go/ig-c25-book` · utm_content `ig-c25-dm3`
- **Before it ships:** IG keyword automation for BOOK
- **Visual:** Same system as C15 with one real book page.
- **Ad / caption variants:** "Reply BOOK for the brief and the finished PDF." / "Reply BOOK"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. One chapter-opener page from C23. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1080x1920 canvas #F8F7F4. Keep all text out of the top 14% (270 px), the bottom 35% (670 px) and 6% at each side, the third-party Reels/Stories safe zone [U]; check the platform template before export. y 15%-26%: "Reply" in the grotesk 132 px ink #18181B + white bubble "BOOK". y 30%-58%: the page in a white card, 60% wide, centred. y 60%-64%: "the brief and the finished PDF" in the serif 44 px filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Flat, straight-on 9:16 graphic filling the entire 1080x1920 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C26 · static · 1080x1350 · Meta + Instagram

- **Concept:** The lead magnet people actually open: 12 posts become a 20-page guide
- **Headline:** Turn 12 of your posts into a guide people open.
- **Subcopy:** Paste your best posts. Get a designed PDF to give away or sell.
- **CTA:** Make your guide
- **Tag / priority / week:** `live` · P2 · week 3
- **Use as:** both · channel ch-instagram / ch-boosts · budget b5 or organic · hook B2 · link `makeborne.com/go/ig-c26-book` · utm_content `ig-c26-b2`
- **Visual:** Left column: 12 tiny typeset post cards (fictional text, no real accounts); right: the real guide cover and one page.
- **Ad / caption variants:** "Paste your best posts and get a designed guide to give away or sell. For screen and PDF." / "Your posts, as a guide"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Paste 12 fictional short posts (a fitness coach's tips) into a book brief, keep the first output, capture the cover and one inside page. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Headline (y 9%-29%) in the grotesk 70 px ink #18181B: "Turn 12 of your posts" / "into a guide people" followed by "open." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Lower-left 34%: a 3x4 grid of small white post cards with 3 lines of typeset grey text each. Lower-right 58%: the cover and one page in white cards. Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C34 · og · 1200x630 · Link preview (all platforms)

- **Concept:** OG link-preview image for the format-matched landing page /books (growth ask ga7)
- **Headline:** Your notes, as a finished book.
- **Subcopy:** Guides, lead magnets and client welcome books. For screen and PDF.
- **CTA:** makeborne.com/books
- **Tag / priority / week:** `live` · P2 · week 2
- **Use as:** organic · channel ch-loops / all · budget organic · hook OG · link `makeborne.com/books` · utm_content `og-c34`
- **Before it ships:** Growth ask ga7: the landing page exists
- **Visual:** Left 56% type, right 44% one real output capture cropped to the panel; matches the landing page's top example so the click feels continuous.
- **Ad / caption variants:** "Guides, lead magnets and client welcome books. For screen and PDF." / "Your notes, as a finished book."

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. The top example on the /books landing page, captured at its native ratio. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1200x630 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 40 px tall, and beside it the wordmark "Makeborne" in the grotesk at 22 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Left 56% (x 6%-54%, y 26%-72%): "Your notes, as a finished" in the grotesk 54 px ink #18181B followed by "book." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); below at 24 px #5C616D: "Guides, lead magnets and client welcome books. For screen and PDF.". Right 40%: the capture edge to edge in the panel with a 1 px #E4E1DA divider. Bottom-left y 90%: "makeborne.com/books" 20 px #5C616D. Text stays inside the centre 1080x566 so square crops survive. Flat, straight-on 1.91:1 graphic filling the entire 1200x630 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

## 7. Live: small business owners, light push (icp4)

### C27 · thumbnail · 1080x1920 · TikTok + Reels cover frame (comment-reply speedrun series)

- **Concept:** Comment-reply speedrun cover: 'Replying to @___: here's your bakery's website' (frame 0 is the finished site)
- **Headline:** Your bakery's website. Built from one brief.
- **Subcopy:** Lives on a Makeborne address today.
- **CTA:** Comment your business
- **Tag / priority / week:** `live` · P1 · week 1
- **Use as:** organic · channel ch-tiktok / ch-instagram · budget organic · hook R2 · link `makeborne.com/go/tt-c27` · utm_content `tt-c27-r2`
- **Before it ships:** Consent log for real businesses kept outside the repo (D15)
- **Visual:** Frame 0 of the video: the finished site scrolling on a 390 capture, the platform's own reply bubble on top (added in-app), a 4-word label. This is the cover template for the whole series.
- **Ad / caption variants:** "Comment your business and I'll build the next one. It lives on a Makeborne address." / "Comment your business"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Only for a business that asked in the comments, with written OK and public information only, unpublished by default; otherwise a fictional bakery. Capture the published site at 390 px, first screen. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1080x1920. Full-bleed capture scaled to the full width. Keep all text out of the top 14% (270 px), the bottom 35% (670 px) and 6% at each side, the third-party Reels/Stories safe zone [U]; check the platform template before export. Overlay at y 16%-24%: a white #FFFFFF label with 24 px corners and the contact shadow holding "Your bakery's website." in the grotesk 56 px ink #18181B; under it "Built from one brief." in the serif 52 px filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image) on a matching label. The platform reply bubble is added in TikTok, not baked in. Flat, straight-on 9:16 graphic filling the entire 1080x1920 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C28 · thumbnail · 1080x1920 · TikTok + Reels + Shorts cover frames

- **Concept:** 'Made from one brief #N' series cover template (daily output scroll)
- **Headline:** Made from one brief. #[N]
- **Subcopy:** The brief is always on screen.
- **CTA:** Follow for #[N+1]
- **Tag / priority / week:** `live` · P2 · week 1
- **Use as:** organic · channel ch-tiktok / ch-instagram / ch-youtube · budget organic · hook R1 · link `makeborne.com/go/tt-c28` · utm_content `tt-c28-r1`
- **Visual:** Grid-consistent covers so the profile reads as a gallery: the sentence chip at a fixed position, the output behind it, the series number in the corner.
- **Ad / caption variants:** "Made from one brief, #[N]. The brief is on screen. Unedited." / "Made from one brief"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. 390 px full-page scroll capture of the day's real output (site, deck or book). COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1080x1920. Output capture full-bleed. Keep all text out of the top 14% (270 px), the bottom 35% (670 px) and 6% at each side, the third-party Reels/Stories safe zone [U]; check the platform template before export. At y 16%: a white #FFFFFF pill with a 1 px #E4E1DA border and the two-layer shadow (contact shadow 0 2px 6px rgba(20,22,40,.12) plus ambient shadow 0 50px 90px -35px rgba(30,40,90,.35)), holding a small ink pencil glyph and the brief in the grotesk 40 px #18181B: "[the exact brief]", 84% wide, centred. Top-right inside the safe zone: "#[N]" in the grotesk 64 px ink #18181B on a white label. Same positions every day. Flat, straight-on 9:16 graphic filling the entire 1080x1920 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C35 · og · 1200x630 · Link preview (all platforms)

- **Concept:** OG link-preview image for the format-matched landing page /sites (growth ask ga7)
- **Headline:** One brief in. A finished website.
- **Subcopy:** Published on a Makeborne address. Download the source any time.
- **CTA:** makeborne.com/sites
- **Tag / priority / week:** `live` · P2 · week 2
- **Use as:** organic · channel ch-loops / all · budget organic · hook OG · link `makeborne.com/sites` · utm_content `og-c35`
- **Before it ships:** Growth ask ga7: the landing page exists
- **Visual:** Left 56% type, right 44% one real output capture cropped to the panel; matches the landing page's top example so the click feels continuous.
- **Ad / caption variants:** "Published on a Makeborne address. Download the source any time." / "One brief in. A finished website."

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. The top example on the /sites landing page, captured at its native ratio. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1200x630 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 40 px tall, and beside it the wordmark "Makeborne" in the grotesk at 22 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. Left 56% (x 6%-54%, y 26%-72%): "One brief in. A finished" in the grotesk 54 px ink #18181B followed by "website." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); below at 24 px #5C616D: "Published on a Makeborne address. Download the source any time.". Right 40%: the capture edge to edge in the panel with a 1 px #E4E1DA divider. Bottom-left y 90%: "makeborne.com/sites" 20 px #5C616D. Text stays inside the centre 1080x566 so square crops survive. Flat, straight-on 1.91:1 graphic filling the entire 1200x630 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

## 8. Held for beats (publish only after the gate)

### C39 · static · 1080x1350 · Meta + Instagram + X

- **Concept:** Same brief, now with its own images: before (typography-led) and after (image-led) of one real brief
- **Headline:** Your site, deck and book now come with their own images.
- **Subcopy:** Same brief. Now with images made for it.
- **CTA:** Make one with images
- **Tag / priority / week:** `beat:images` · P1 · week 3 (On gate; planning guess 3-20 Nov)
- **Use as:** both · channel ch-instagram / ch-x / ch-boosts / ch-creators · budget b4 (wave-2 creators) / b5 / organic · hook N1 · link `makeborne.com/go/ig-c39-images` · utm_content `ig-c39-n1`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check
- **Visual:** Top half: the launch-week output of a brief (typographic). Bottom half: the same brief re-run after the images beat (image-led). The quality bar is the v14 reference sheet, met by real product output, not concept art.
- **Ad / caption variants:** "New: your sites, decks and books now come with images made for the brief." / "Now with images" | "Same brief, new result: Makeborne now makes the images too. From $20/month." / "Images, built in"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. After images pass the gate: re-run the exact brief used for C01 on the shipped version with images on; keep the first output; capture the hero at 1440x900. Pair it with the launch-week capture of the same brief. The pictures inside the site must come from the product's own run (and carry its machine-readable marking once ga21 ships), never from a separate image-model session. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. y 8%-22%: "Your site, deck and book now" in the grotesk 60 px ink #18181B / "come with their own" + "images." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 26%-54%: the launch-week capture in a white card labelled "Before" 24 px #5C616D. y 58%-86%: the images-on capture labelled "Now". Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C40 · carousel · 1270x760 · Product Hunt gallery

- **Concept:** Product Hunt images-launch gallery (at least 2 images required; plan 5) [F, PH 'Preparing for launch']
- **Headline:** Websites, decks and books from one brief. Now with images.
- **Subcopy:** Built for client work: review links your client approves.
- **CTA:** makeborne.com/go/ph-images
- **Tag / priority / week:** `beat:images` · P1 · week 3 (PH main launch on the images beat day; 09:01 Sarajevo from 1 Nov)
- **Use as:** organic · channel ch-producthunt · budget organic (b6 Uneed runs the same day) · hook N1 · link `makeborne.com/go/ph-images` · utm_content `ph-c40-n1`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check; Images pass all six gate boxes; PH100 code live (ga10); /launch/images page with OG (ga11)
- **Visual:** Each gallery frame is one real output plus at most 8 words. Thumbnail (240x240) is the flat m on canvas, not a GIF.
- **Slides:**
  1. "One brief. Website, deck and book. / Now with their own images." · Real image-led site hero capture, full panel, chip with the brief.
  2. "Full-image slides." · Real full-image title slide from the shipped deck feature.
  3. "Books with pictures." · Real image-led book spread (shipped version).
  4. "Your client approves from a link." · Review page capture with Approve this version.
  5. "From $20/month + tax. Full refund until you use credits." · Price card from C30, 1270x760 recomposition.
- **Ad / caption variants:** "Makeborne makes websites, decks and books from one brief, now with their own images." / "Now with images"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. All frames from the shipped images version on production. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Each 1270x760 frame: canvas #F8F7F4; caption top-left in the grotesk 46 px ink #18181B, one accent word in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image); capture filling x 6%-94%, y 22%-92% in a white card. Thumbnail: the flat m mark, ink on canvas, 240x240. Flat, straight-on 1270:760 graphic filling the entire 1270x760 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C41 · carousel · 1080x1350 · Instagram + LinkedIn

- **Concept:** Picture books and gift books, now possible (only after images pass the gate; holiday gift push only if live)
- **Headline:** Same brief. Now it's a picture book.
- **Subcopy:** Images made for every page.
- **CTA:** Comment BOOK
- **Tag / priority / week:** `beat:images` · P2 · week 4 (Images beat + 1 week; gift framing only before ~20 Dec)
- **Use as:** organic · channel ch-instagram / ch-linkedin · budget organic · hook N2 · link `makeborne.com/go/ig-c41-book` · utm_content `ig-c41-n2`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check
- **Visual:** Pages flat, at their real ratio; the v14 whale and lighthouse-cat spreads are the quality bar, not the content.
- **Slides:**
  1. "Same brief. / Now it's a picture book." · Cover card type only.
  2. "The brief:" · Typeset chip.
  3. "The cover." · Real image-led cover from the shipped version.
  4. "Page 2." · Real spread.
  5. "Page 6." · Real spread.
  6. "For screen and PDF. / Comment BOOK." · End card; KDP note in caption: AI disclosure required by KDP.
- **Ad / caption variants:** "Picture books from one brief, with images for every page. For screen and PDF." / "Picture books, now"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. A fictional children's picture-book brief run on the shipped images version; first output kept. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Same grid as C23 on canvas #F8F7F4; captions in the grotesk 58 px ink #18181B. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C42 · x-image · 1600x900 · X + LinkedIn

- **Concept:** Full-image slides with quality and aspect controls (images beat, deck day)
- **Headline:** Full-image slides. From the same brief.
- **Subcopy:** Pick the quality and the aspect. The slide stays editable.
- **CTA:** Make a deck
- **Tag / priority / week:** `beat:images` · P2 · week 3
- **Use as:** organic · channel ch-x / ch-linkedin · budget organic · hook N3 · link `makeborne.com/go/x-c42` · utm_content `x-c42-n3`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check
- **Visual:** Left: the controls panel capture (quality, aspect) from the shipped UI. Right: the resulting full-image slide. Alba-deck quality is the bar.
- **Ad / caption variants:** "New: full-image slides, with quality and aspect controls. Still an editable deck." / "Full-image slides"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Shipped version only: capture the image quality and aspect controls and the resulting full-image slide. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 16:9 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 44 px tall, and beside it the wordmark "Makeborne" in the grotesk at 24 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. y 10%-26%: "Full-image slides." in the grotesk 64 px ink #18181B / "From the same" + "brief." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Lower: controls capture left 30%, slide right 62%, white cards. Flat, straight-on 16:9 graphic filling the entire 1600x900 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C43 · static · 1080x1350 · Instagram + X + customer email header

- **Concept:** Credit top-ups: run out mid-project, top up without changing plan
- **Headline:** Run out mid-project? Top up without changing plan.
- **Subcopy:** Add credits in one step. Your plan stays the same.
- **CTA:** See top-ups
- **Tag / priority / week:** `beat:topups` · P3 · week 3 (Day 4 of the images Launch Week, or alone)
- **Use as:** organic · channel ch-instagram / ch-x / ch-email · budget organic · hook N4 · link `makeborne.com/go/ig-c43` · utm_content `ig-c43-n4`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check
- **Visual:** Real top-up dialog capture with the price per pack, plain headline.
- **Ad / caption variants:** "New: credit top-ups. Run out mid-project and add credits without changing plan." / "Top-ups are here"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Shipped top-up dialog on billing, with pack sizes and prices exactly as live. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. y 10%-30%: "Run out mid-project?" in the grotesk 76 px ink #18181B / "Top up without changing" + "plan." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 36%-84%: the dialog capture in a white card. Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C44 · static · 1080x1350 · Meta + LinkedIn

- **Concept:** Custom domains: your client's site, on your client's domain (also unlocks the full small-business push)
- **Headline:** Your client's site, on your client's domain.
- **Subcopy:** Connect a domain in a few steps. The review link still works.
- **CTA:** Connect a domain
- **Tag / priority / week:** `beat:domains` · P1 · week 6 (On gate; planning guess mid Nov-Dec)
- **Use as:** both · channel ch-linkedin / ch-boosts / ch-instagram · budget b5 or revenue (D4) · hook N5 · link `makeborne.com/go/li-c44-domains` · utm_content `li-c44-n5`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check
- **Visual:** A real customer site moved end to end: the connect-domain steps capture, then the live site with its own address in a flat address bar strip (typeset, matching the real address).
- **Ad / caption variants:** "New: publish client sites on the client's own domain. Build, review, approve, connect." / "Custom domains are live" | "Your client's site now lives on your client's domain. Studio is $49/month." / "Their site, their domain"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. With written consent from a real customer, or a fictional site on a domain the owner holds: capture the connect-domain steps and the live site. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. y 9%-27%: "Your client's site," in the grotesk 76 px ink #18181B / "on your client's" + "domain." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 32%-56%: steps capture. y 60%-86%: site capture with a typeset address strip above it showing the real domain. Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C45 · linkedin-doc · 1080x1350 · LinkedIn document

- **Concept:** Agency tools: run client work in one place (build, review, approve, publish)
- **Headline:** Run client work in one place.
- **Subcopy:** Build, review, approve, publish.
- **CTA:** See agency tools
- **Tag / priority / week:** `beat:agency` · P2 · week 7 (On gate; planning guess Dec)
- **Use as:** organic · channel ch-linkedin / ch-community · budget organic · hook N6 · link `makeborne.com/go/li-c45-agency` · utm_content `li-c45-n6`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check
- **Visual:** Built in Makeborne as a deck. Slide 6 lists only what is in the shipped release notes.
- **Slides:**
  1. "Run client work / in one place." · Cover.
  2. "Build." · Shipped agency workspace capture.
  3. "Review." · Review link capture.
  4. "Approve." · Approve capture on a phone.
  5. "Publish." · Publish capture.
  6. "What's new for agencies." · Exactly the shipped items, named as in the UI.
  7. "Studio $49 · Scale $99." · End page.
- **Ad / caption variants:** "New for agencies: build, review, approve and publish client work in one place." / "Agency tools are live"

<details><summary>Generation / capture prompt</summary>

BUILD IN MAKEBORNE after the agency-tools gate: a 7-slide portrait deck; slide texts exactly as slides[]; captures from the shipped version only.

</details>

### C46 · static · 1080x1350 · Meta + LinkedIn + X

- **Concept:** AI lead research: find the clients whose websites need you, and show up with a better one
- **Headline:** Find the clients whose websites need you.
- **Subcopy:** Research the business, build its site, send the review link. One session.
- **CTA:** Research your first lead
- **Tag / priority / week:** `beat:leads` · P2 · week 11 (On gate; planning guess Jan)
- **Use as:** both · channel ch-linkedin / ch-x / ch-boosts · budget revenue (D4) · hook N7 · link `makeborne.com/go/li-c46-leads` · utm_content `li-c46-n7`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check
- **Visual:** Three real captures in a row: research notes on a fictional business, the pitch site, the review link. Never show real businesses' data.
- **Ad / caption variants:** "New: research a business, build its better site and send the review link in one session." / "Lead research is live"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Shipped AI lead research run on a fictional business (or a consenting one); blur any real personal data. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): Canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 56 px tall, and beside it the wordmark "Makeborne" in the grotesk at 30 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. y 9%-28%: "Find the clients whose" in the grotesk 72 px ink #18181B / "websites need" + "you." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). y 34%-84%: three captures stacked with labels "Research" / "Build" / "Send" 24 px #5C616D. Bottom band: a 1 px hairline #E4E1DA across the full inner width at 89% of the height; under it, left-aligned, "makeborne.com" in the grotesk 26 px #18181B; right-aligned, "From $20/month + tax · Full refund until you use credits" in the grotesk 26 px #5C616D. Flat, straight-on 4:5 graphic filling the entire 1080x1350 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C47 · x-image · 1600x900 · X (one thread) + YouTube demo thumbnail

- **Concept:** Automatic two-way GitHub sync (one X thread and one YouTube demo only; developers are not the ICP)
- **Headline:** Edit in Makeborne or in your code. Both stay in sync.
- **Subcopy:** Two-way GitHub sync for every project.
- **CTA:** See the demo
- **Tag / priority / week:** `beat:github` · P3 · week 8 (Any time after the gate)
- **Use as:** organic · channel ch-x / ch-youtube · budget organic · hook N8 · link `makeborne.com/go/x-c47-github` · utm_content `x-c47-n8`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check
- **Visual:** Split screen: Makeborne chat edit left, the same change as a commit in the repository right, a two-headed arrow between.
- **Ad / caption variants:** "New: two-way GitHub sync. Edit in Makeborne or in your code; both stay in sync." / "Two-way GitHub sync"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. Shipped sync only: make one chat edit and capture the resulting commit; then edit a file in the repository and capture it arriving in Makeborne. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 16:9 canvas #F8F7F4. Top-left at the 7% margin: the flat vector Makeborne "m" mark in #18181B, 44 px tall, and beside it the wordmark "Makeborne" in the grotesk at 24 px; clear space around the mark of at least 1/5 of its width; the mark is never shadowed, rotated or gradient-filled. y 10%-26%: "Edit in Makeborne or in your code." in the grotesk 56 px ink #18181B / "Both stay in" + "sync." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Lower: two captures, a 2 px ink two-headed arrow between. Flat, straight-on 16:9 graphic filling the entire 1600x900 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

### C48 · thumbnail · 1280x720 · YouTube (images beat demo)

- **Concept:** YouTube thumbnail for the images-beat demo: same brief, before and after images
- **Headline:** Same brief. Now with images.
- **Subcopy:** Variant B: 'It makes the pictures now'. Variant C: 'Before → after, one brief'.
- **CTA:** Watch
- **Tag / priority / week:** `beat:images` · P3 · week 3
- **Use as:** organic · channel ch-youtube · budget organic · hook N1 · link `makeborne.com/go/yt-c48` · utm_content `yt-c48-n1`
- **Before it ships:** Feature passes all six gate boxes (strategy §9): 48 h live + 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ + UTM tracking and per-wave code, legal check
- **Visual:** Diagonal-free split: left half the typographic launch-week site, right half the image-led result; 4-6 words.
- **Ad / caption variants:** "Same brief, before and after: Makeborne now makes the images too." / "Now with images"

<details><summary>Generation / capture prompt</summary>

CAPTURE (real product, not generated): record on production makeborne.com from a clean owner account at 2x UI scale, using only fictional, trademark-checked business names; crop out the account e-mail, avatar, browser tabs and bookmarks; never show a Whop store page or any unreleased menu item. The C39 pair. COMPOSE (render in the HTML template so every letter is exact; never let an image model redraw the captured UI): 1280x720: left 50% before, right 50% after, 2 px ink divider; top band on canvas #F8F7F4: "Same brief." in the grotesk 72 px ink #18181B + "Now with images." with "images." in the serif filled with a flat left-to-right gradient #2858CB to #6355CF (the only gradient anywhere in the image). Flat, straight-on 16:9 graphic filling the entire 1280x720 canvas edge to edge: no device mock-up unless stated, no hands, no desk, no perspective, no 3D tilt. Quiet editorial print-studio design, margins of at least 7% of the width, one idea per frame, subtle 2% film grain, no bloom. All text spelled exactly as given, perfectly legible, correctly kerned, no extra words, no garbled letters, no lorem ipsum. Forbidden: purple-blue gradient fields, glowing prompt boxes, glass cards, orbs, particles, lens flare, sparkles, robots, photoreal people, stock laptops.

</details>

## 9. Sources and dates

- Visual bar: `film library (private)/v14/gen/sheet_v14.jpg` and `write_prompts.py` (read-only, viewed 26 Oct 2026).
- Real outputs used as references: the launch code's evaluation fixtures (private) (Kafa Tamo, Crux Yard, Osteria Brina, Relay Operations, Saltwater & Smoke, From Brief to Better Work, The Useful Client Brief; measured 18 Oct 2026) and `film library (private)/v12/assets/real/` (deck-edit pair, book pages). Ads use fresh production captures of the same briefs, not these files.
- Launch-code facts (publish address, review buttons, Lead finder labels): launch code (private), read-only, 26 Oct 2026.
- Creative evidence (Motion 2026 ranking, Buffer 2026 formats, TikTok best practice, Product Hunt gallery rules, AI-ad backlash): `research/creative-assets.md` and its Verification section (26 Oct 2026). Key URLs: https://motionapp.com/library/research/creative-benchmarks-2026/top-asset-types (updated 2026-04-17) [V]; https://ads.tiktok.com/help/article/creative-best-practices (updated June 2025) [F]; https://buffer.com/resources/data-best-content-format-social-media/ (2026-03-19) [V]; https://www.producthunt.com/launch/preparing-for-launch (read 2026-10-26) [F]; https://www.nngroup.com/articles/ai-ad/ (2025-12-19) [F].
- Platform text limits: see `content/ad-copy.md` §1.

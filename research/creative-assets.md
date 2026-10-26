# Creative assets and visual direction

Research track: existing creative assets, visual direction, ad creative styles and creative volume.
Written 26 October 2026, the day the paid beta launches. Web sources were read on 26 October 2026 unless a different date is given.

**Evidence labels used in this file**
- **[F]** A fact stated by a cited source, or something I read in the files or code myself.
- **[V]** Vendor or agency data. It is usually correlational and comes from a party that sells the service.
- **[U]** Unverified or secondary: known only from a summary, or the sources disagree.
- **[I]** My inference or recommendation. Untagged recommendations are [I].
- **[O]** An owner decision is needed.

**Limits.** I reviewed the films folder and the product repo read-only, and wrote nothing outside this repo. I did not watch any external video. Partway through, the shared web-search budget for this run ran out, so a few points (FTC AI-claims enforcement, Meta's own spec pages, TikTok's ad spec page) rely on sources already fetched or on the earlier film research (dated 18 and 24 October 2026). Those points are marked. No Makeborne film or ad has ever been published, so **there is no audience data for any Makeborne creative**. Everything about what will work is either third-party evidence or inference.

---

## 1. Summary

1. **The asset bank is large and well crafted, but most of the flashiest material is not shippable as-is on launch day.** The bank holds five film generations, two of them finished renders, plus about 40 image-model design stills that the owner loves.
   - The v13 and v14 films are built on **image-model concept designs** of websites, books and decks. Makeborne did not make them. Generated images in sites, decks and books are **not live today**: the launch config turns image generation off.
   - The v14 end card says **"Start free"**, but there is **no free tier and no trial**.
   - In the latest v14 fix round, the "Projects shown are AI-generated concepts." line was **removed**. In draft 1 it was too small to read on a phone.
   - The v14 draft 2 render **failed**, so the only v14 file on disk is draft 1 (24 Oct, 16:9 1080p60, 43.4 s). There is no v14 vertical cut.
2. **What can run today, honestly:**
   - the v9 "Fly-over" film (14.5 s; 16:9 4K, 9:16 and 5:4 renders), which shows the real home page;
   - **real product output**: the Relay Operations site, The Repair Table book, the Tern deck and its one-value chart edit, Crux Yard, Kafa Tamo and other fixtures;
   - **new screen recordings** of the real composer, studio, publish and client-review flow. Client review with Approve and Request changes is in the launch code.
3. **Keep v14 as the brand hero, with three fixes before it goes out:** replace the "Start free" CTA, restore a readable AI-concept line, and re-render.
   - Then **hold its image-heavy cut for the "images are live" launch beat** a few days from now. At that point the same look becomes true, provided the outputs shown come from real product runs.
   - The image pipeline already produces real, image-rich sites in internal quality runs (26 Oct). Those runs, not the concept stills, should be the source footage for that beat.
4. **Visual direction: "made, not generated".**
   - Keep the house system: warm canvas `#F8F7F4`, near-black ink, Inter display with a Newsreader Italic accent word, and the brand gradient only on the accent word and the Create button.
   - Motion: masked type, a frame that never parks, one big contrast per piece.
   - Every product claim is proved by real UI and real output, shown at real speed or with a visible clock.
   - Avoid the category's AI look: purple-blue gradient fields, glowing prompt pills, glass, orbs, particles, uncanny people, morphing text.
5. **Creative styles that work for AI tools in 2025-2026:**
   - On Meta, Motion's 2026 benchmark ranks **text-only** and **product image with text** statics first by hit rate. UGC is 4th and high production 5th. Carousel ranks last among 15 asset types [V]. *(Verification 26 Oct: Motion's own page gives the ranking and a band of about 4-12%, not per-type numbers. The figures 11.6%, 8.75% and 7.56% come from a secondary summary (Sepia Lab). The 6.87% for high production was not found in any source read.)*
   - On LinkedIn, **document carousels** lead engagement in every 2026 study found [V].
   - Gamma and Lovable lean on creators who show **one input, one finished result**, before/after rescues and tutorials [V/U].
   - Base44's founder reports that paid ads and influencers did not work for him early on. Building in public plus a share-for-credits loop did [F, self-reported].
6. **Volume and refresh:**
   - Launch with **about 12 paid-ready creatives in 4-5 genuinely different concepts**, each in 9:16 plus 4:5 or 1:1.
   - Add **3-5 new ones a week**, and many more organic posts.
   - Refresh on signals: hook rate or CTR down about 30% from the first days, frequency above about 3, or cost per sale up. In practice that means every 2-3 weeks at this spend. Use each feature launch (images, custom domains, GitHub sync, top-ups, agency tools) as a "newness" refresh.
7. **Most of the creative budget is time, not money.** Production can be almost all in-house (HyperFrames, screen recordings, real product runs at cents to about $2 of provider cost each). A paid creative test of roughly $300-400 out of the $1,000 is enough to find which concepts get clicks. It is not enough to optimise conversions.

---

## 2. Asset catalogue

Paths are relative to the films folder (`makeborne-films/`), or to the product repo where noted. Durations and specs were measured with ffprobe.

### 2.1 Films (motion)

| Asset | Format(s) on disk | Length | What it is | State | Honesty and legal flags |
|---|---|---|---|---|---|
| **v9 "Fly-over"** `v9-flyover/renders/` | 16:9 3840×2160/60 · **9:16 1080×1920/60** · 5:4 1440×1152/60 master | 14.5 s | One continuous camera over the real makeborne.com home page (captured 14 Oct), lifting the real UI pieces. Ends on "One idea. *Every possibility.*" | **Final, all three formats** | The page shows style previews labelled as AI concepts. The home page may have changed since 14 Oct, so check it matches the live site. The owner later rejected fly-overs as a film style (v13 notes), but as an ad it is honest and clean. Music: Mixkit "Opalescent" (licence covers web, social and online ads; not broadcast) |
| **v10 "The List"** `v10-the-list/` | 9:16 1080×1920/60 video-only segment; audio mixes for 42.6 s, 15 s and 6 s as separate WAVs | 42.6 s | A notes-app list of unmade ideas, each made in Makeborne. "Make the thing you keep describing." | **No muxed final.** The 15 s and 6 s cuts have audio only | Uses the real mobile studio UI. The "made" items are hand-built concepts, labelled. Its premise devices (notes list, paper planes, Grandma Rosa, Lumen) were marked "spent" on 18 Oct |
| **v12 labs** `v12/lab/doodle/renders/doodle-reel-v1/v2.mp4`, `v12/lab/rigs/renders/rigs-lab.mp4` | 16:9 | short | Motion experiments (doodle strokes, rigs) | Lab only | Not campaign-ready. Useful only as texture or reference |
| **v13 "One Sentence"** `v13/renders/drafts/v13_draft2_1080p60.mp4` | 16:9 1920×1080/60 | 41.6 s | A sentence on slot reels becomes a site, a book and a deck. End card "What will you make *next?*" | Draft 2 | **Rejected by the owner** ("boring"). Built on image-model concept designs (Alba Bakehouse, The Fox Who Baked the Moon, the Tidal deck). "Tidal" is a well-known brand name |
| **v14 "Anything"** `v14/renders/v14_draft_1080p60.mp4` | 16:9 1920×1080/60 (draft 1 only) | 43.4 s | Glossy m and dawn ring; the real composer types "A website for my bakery."; a reel of about 30 worlds; "Anything you can *imagine.*"; the click is the drop; a burst of outputs; a chat edit ("Paris at 2 a.m."); publish; book; deck; **client review with comment, fix and Approve**; the m prints the work; end card | **Draft 1 only.** The draft 2 render failed on 26 Oct with a file-rename error | **Blockers:** (1) end card "Start free" with no free tier; (2) the AI-concept line was removed in fix round 1 and was tiny in draft 1; (3) every output is an image-model concept, not product output, and generated images are not live; (4) the "Paris at 2 a.m." beat changes the hero photo, which implies image editing; (5) the publish URL shown in the film does not match the launch code's default publish address (`sites.makeborne.com/<slug>`); (6) some concept brand names may collide with real brands (§2.4) |

### 2.2 Stills

| Asset | Size | Count | What it is | Usable as |
|---|---|---|---|---|
| **v14 reel worlds and Alba deck** `v14/gen/out/*.png`, sheet `v14/gen/sheet_v14.jpg` | about 2560×1440 PNG | 21 | Image-model "screenshots" of fictional sites (Spoke & Chain, Good Walks, Petal & Stem, Galerie Nord, Round Nine, Kazu, Salt & Swell, Tsuki, Vino Lento), book covers and spreads (Captain Biscuit, Mushrooms of the Northern Woods, Nonna Rosa's Soups, Ollie the whale), slides (Red Planet Lemonade, Helio, Year 6 Science Fair) and the 4-slide Alba deck, plus the night bakery hero | **Concept art and mood board only.** These are the owner's quality bar, and the target the product's image pipeline should hit. They are not product output. Several show photoreal people (the gym, the surfer), which triggers AI labelling on TikTok and Meta |
| **v13/v14 full designs** `v14/full_designs_sheet.jpg`, `v13/gen/out/sheet_*.jpg` | various | about 25 | Alba Bakehouse desktop and mobile, the Fox picture book cover and spreads, the Tidal deck, montage worlds (Osteria Verde, Studio Halden, Lemon & Salt, Ana & Luca, Form & Fire, Small Boats, Sala, Slow Pour, "Northface Labs" Higher.) | Same as above. "Northface Labs" sits close to a famous outdoor brand, so drop it from any public cut |
| **v9 UI pieces** `v9-flyover/assets/pieces/*.png`, `page.png` | UI crops | about 20 | Real home-page capture (14 Oct): composer, mode chips, style cards, client steps, nav CTA | Real-UI overlays for statics and motion. Re-capture if the page changed |
| **v10 art** `v10-the-list/assets/art`, `assets/tex` | jpg | about 100 | Concept site, book and deck artwork and square textures | Set dressing only |
| **v12 real outputs** `v12/assets/real/` (book-repair pages 1-17, deck slides 1-8, deck-edit 1-8, book and deck sheets) | 720×1080 pages; 1600×900 slides | about 35 | **Real product runs:** The Repair Table book (contents, chapter openers, checklists) and the Tern deck **before and after a one-value chart edit** | **The most honest proof stills in the bank.** The Tern name belongs to a real bicycle brand: never let it be legible. Slide 6 is safe. Crop the bracketed placeholders |
| **Product repo real outputs** (launch code output folders, private) | 1440 and 390 wide full pages, book pages, slides | dozens | Relay Operations site (rated 9/10 internally), Crux Yard (9), Kafa Tamo (8.5), Osteria Brina, Saltwater & Smoke, The Useful Client Brief book (44 pp), From Brief to Better Work deck | Real output for "made with Makeborne" carousels and scroll-capture videos. The **390-wide captures are native 9:16 scroll footage**. Provenance traps recorded on 18 Oct: never show the synthetic "Tide Tables" fixtures, the derived book openings, or the real-business redesigns |
| **Image-pipeline quality runs** (launch code eval runs, private) | 1080 desktop and mobile shots | new, 26 Oct | Real builder runs with the image pipeline on, from a pre-release branch (e.g. the "Good Dog" shop: "Walk. Eat. Rest.", illustrated hero marked "Illustrative artwork") | **Source footage for the images launch beat.** Use only after images go live, and only from runs on the shipped version |

### 2.3 Sound, type and brand

- **Music:** Mixkit tracks. "Opalescent" #593 is in v9 and v14; "Driving Ambition" #32 is in v10. The licence as recorded in the film notes covers web, social and online ads. It does not cover broadcast or Content ID.
  - Re-read the licence before any paid YouTube placement.
  - On TikTok, a business account must not use the general sound library to promote. TikTok's help page says: "Businesses cannot use the general music library for commercial usage." Use the free, pre-cleared Commercial Music Library (about 1M tracks, covering organic posts, ads and branded content). TikTok says any other licensed sound needs a proper licence checked by legal [F, TikTok Ads Help, read 26 Oct]. **Corrected:** posting the Mixkit track as an "original sound" is only safe if the Mixkit licence covers TikTok ads. That licence text could not be read on 26 Oct [U]. Until it is confirmed, use a Commercial Music Library track for paid TikTok.
- **Fonts on disk:** Inter, Newsreader (and Italic), Fraunces, Caveat, Gloock, Bricolage Grotesque, Young Serif and others. The ones checked carry OFL licence files.
- **Mark:** the flat vector m (`public/brand/makeborne-mark*.svg` in the product). The glossy black three.js m is the film-only material. Rules from the brand notes: never stretch, rotate, shadow or gradient-fill the flat mark. Clear space is 1/5 of its width.

### 2.4 Flags to clear before anything public
1. **CTA truth.** No "Start free", "free trial" or "try free" anywhere. Use "Make yours at makeborne.com", "Start at $20/month" or "Open the studio".
2. **AI-concept line.** Restore it in every cut that shows concept imagery, readable on a phone (cap height about 2.5% of frame height or more, held 3 s or more).
3. **Feature truth.** Do not show generated images, image editing, custom domains, two-way GitHub sync, top-ups or agency tools as available until each one ships.
4. **Publish address.** Show whichever address production actually issues (the launch code defaults to `sites.makeborne.com/<slug>`).
5. **Third-party names.** Check every invented brand in a public frame against real trademarks: Tern (real), Tidal (real), "Northface Labs", Galerie Nord, Kazu, Round Nine, Salt & Swell, Petal & Stem.
6. **Photoreal AI people or places.** These need the platform AI label: TikTok's realistic-AIGC rule [U, TikTok's support page did not load on 26 Oct] and Meta's "AI info" label. Meta applies that label automatically when its own generative tools create or significantly edit an ad, or when C2PA metadata shows a third-party AI tool. It appears under "About this ad" [V, Marketing Dive 2026-07-09]. **EU AI Act Art. 50 applies from 2 Aug 2026** [F, artificialintelligenceact.eu Art. 50 and its implementation timeline]. Art. 50(4) requires deployers of deepfake image, audio or video to disclose it. For evidently artistic or fictional work, a lighter disclosure applies that does not hamper the work. The disclosure must come no later than first exposure.
7. **Copy claims.** No speed, user, revenue or "print-ready" claims. No testimonials until real customers give them. The FTC final rule (announced 14 Aug 2024) bans fake reviews and testimonials, explicitly including AI-generated reviews from people who do not exist. It also bans undisclosed insider reviews and incentives tied to review sentiment. Civil penalties apply to knowing violators [F, FTC]. This matters for any "share for credits" loop: the reward must not depend on the post being positive.

---

## 3. How to cut the existing assets

| Source | Cut | Format | Length | Placement | Use it when |
|---|---|---|---|---|---|
| v9 Fly-over | As-is with a CTA end card added (replace the last 1.5 s) | 9:16, 4:5 (recompose from the 5:4 master), 16:9 | 14.5 s | Reels, TikTok and Shorts organic; Meta test ad; X and LinkedIn launch post | **Now.** It is the only finished, honest brand film |
| v9 Fly-over | 6 s bumper: the rise and dive, then the "One idea. *Every possibility.*" card | 9:16, 16:9 | 6 s | YouTube bumper, Stories | Now |
| v14 Anything (fixed) | Hero | 16:9 | 43 s | X launch post, LinkedIn, YouTube, website "Watch the film", Product Hunt | **After the 3 fixes and a re-render.** With concept outputs it must carry the readable concept line, and it reads as a brand film, not a demo |
| v14 | 15 s vertical: frame 0 (lit m), composer typing (real UI), 4 readable reel worlds, "Anything you can *imagine.*", the click on the drop, the burst, the end card | 9:16 recomposed (never cropped) | 15 s | Reels, TikTok, Shorts | **Images launch beat.** Swap concept worlds for real image-pipeline outputs where possible |
| v14 | "Your client approves" segment (25.7-29.1 s): comment, fix, Approve, stamp | 4:5 and 9:16 | 6-8 s | LinkedIn and Meta ads aimed at freelancers and agencies | **Now.** The flow is live. Swap the concept slide for a real deck (e.g. the Tern slide 6 or From Brief to Better Work) to make it fully true |
| v14 | Composer typing → "Anything you can *imagine.*" (0-12 s) | 16:9, 9:16 | 10-12 s | Website hero loop (muted, 6-10 s), X | Now, using only the frames from before the burst (all real UI) |
| v14 | Burst only (12.0-13.8 s) | 9:16, 1:1 | 2 s loop | GIF-style organic, Stories sticker, PH gallery | Images beat |
| v12 real deck edit | Before/after split of slide 6 (12, 18, 25, 30 → 12, 21, 25, 30; nothing else changes) | 4:5 static, 1:1 carousel, 9:16 6 s | 6 s | Meta static test; X proof post | **Now.** The strongest truthful precision demo ("Change one thing. Only that thing changes.") |
| v12 real book | Page riffle: cover → contents → chapter opener → intake checklist | 9:16, 4:5 carousel | 8-10 s, 5 cards | Instagram carousel, LinkedIn document | Now |
| Product real outputs (Relay, Crux Yard, Kafa Tamo, Osteria Brina) | 390-wide full-page scroll capture with a sentence-chip overlay ("A site for my bouldering gym.") | 9:16 | 6-10 s each | TikTok and Reels series "Made from one sentence" | Now |
| v13/v14 concept stills | Mood board, internal quality target, "coming soon" teaser with a label | 1:1, 4:5 | n/a | Owner's X/LinkedIn "what's coming" teaser | Only with a clear "concept / coming soon" label. Better: wait for real outputs |

**Rules for every cut [I, from the film research]**
- Recompose for 9:16; never crop or letterbox a 16:9 master.
- Keep type inside the safe zone. For Meta Reels ads, third parties quote about 14% top, 35% bottom and 6% sides [U]. TikTok's in-feed template is more conservative [U]. Check each platform's downloadable template before export.
- Frame 0 is the thumbnail: lit, moving, showing an output or the m, never black.
- Master at −14 LUFS with true peak at −1 dBTP or below.
- Make it fully understandable muted.

---

## 4. Visual direction: "made, not generated"

### 4.1 The idea
The category looks generated: purple-blue gradients, glowing prompt boxes, floating orbs, and fast montages that hide flaws. Makeborne's advantage is that its outputs look **designed and finished**. So the marketing should feel like a well-made print studio: warm paper light, editorial type, real objects, and one honest demonstration at a time.

The evidence for why this matters:
- **AI-looking ads are now punished.** McDonald's Netherlands pulled its fully AI-generated 45 s holiday ad within days in Dec 2025, after viewers called it "unsettling" and "poorly edited". It was posted about 6 Dec, and its removal was confirmed on 10 Dec [F, NN/G 2025-12-19; NBC News 2025-12-11].
- NN/G names the tells: uncanny visuals, rapid one-second montages and distant shots that hide flaws, and obscured human involvement [F].
- A Gartner survey of 1,539 US consumers (press release dated 16 Mar 2026, per the secondary source) reportedly found that 50% prefer brands that avoid generative AI in consumer-facing content [U: the Gartner page returned 403, so this is secondary only].
- **Corrected 26 Oct.** The Ipsos and Syracuse Newhouse study (18 May 2026; 3,000 US respondents; 20 ads across 10 brands) found that human-made ads beat Ipsos's sales-validated benchmark by 11 points on average, while fully AI-made versions of the same briefs fell 5 points below it. Only 13% of viewers were at least somewhat confident an AI ad was AI, and the same 13% suspected the human-made ads. The "14-17% stronger" figure in the earlier draft is not in the primary release [F, Syracuse University News].
- Makeborne is itself an AI product, so it cannot hide the AI. It can show **human intent, real output and restraint** instead.

### 4.2 Tokens

| Element | Rule |
|---|---|
| Ground | Canvas `#F8F7F4` (live site). The dawn ring (black → indigo → wine → rust → taupe → cream) is the owned film material. Per-output worlds use the output's own colours (e.g. book navy) |
| Ink | `#18181B` / `#18191E` (both appear in the notes; pick one and lock it [O]). Secondary `#5C616D` |
| Accent | Brand gradient `#2858CB → #6355CF`, only on (a) one italic accent word per line and (b) the Create button. Coral `#F76F53` at most once per piece (e.g. a final full stop) |
| Display type | Inter 640-720, tracking −0.05 em, line-height about 0.96, at least 5.5% of frame height for anything that must be read |
| Accent type | Newsreader Italic 420, about 1.06-1.12× the Inter beside it, on the same baseline. Line 2 lands one beat after line 1 ("Beautiful / *websites.*", "Books worth / *opening.*", "Slides that / *stay with you.*") |
| Shadows | Two layers: contact `0 2px 6px rgba(20,22,40,.12)` plus ambient `0 50px 90px -35px rgba(30,40,90,.35)` |
| Texture | Film grain about 1.6-4%. A light vignette. No bloom, flares or particles |
| Logo | Flat vector m in UI and statics. The glossy m only in film. Brand in frame 0 and the last 2-4 s |

### 4.3 Motion grammar
- **Type moves through masks:** it rises out of an invisible slot (power4.out), lands, and then holds dead still while it is read. Exits go upward, faster than entrances.
- **Never park the frame:** every hold drifts 0.5-1%/s. v13 failed with 39% near-still frames. The liked films ran 22-23% [F, measured on Makeborne's own renders].
- **One big contrast per piece:** stillness, then one burst, landing about 25-30% of the way in. Hits land on the beat.
- **No bounce on opacity or colour.** No crossfades between worlds. UI never tilts in 3D. No walls or grids of cards, which the owner rejected.
- **Speed honesty:** generation is never shown sped up as if it were real time. If time is compressed, a small clock or "×8" chip says so. The real build time is a feature when it is fast, and never a claim when it is not.

### 4.4 The four kinds of product shot
1. **Real screen recordings (the backbone).**
   - The real composer, typed by a real hand. Plan → Create → the output arrives.
   - Capture at 2× UI scale so text is readable on a phone. Use cursor emphasis, not flashy zooms.
   - Record on a clean account with fictional, checked brand names.
2. **Before/after (the proof).**
   - Brief text → finished page.
   - "Change one thing" chat edits (the Tern chart edit is the template: only the changed value moves).
   - Client comment → fix → Approve.
   - Split frames make great statics.
3. **The outputs themselves (the desire).**
   - Full-page scroll captures (390 wide = native 9:16), book page riffles and slide decks dealt on the beat.
   - Each carries a small sentence chip with the one-line brief that made it. That chip is the brand device: the sentence is always visible.
4. **Brand films (the stance).** v9 now, v14 once fixed. They are used sparingly, for launch posts, the website and YouTube, not as the main paid workhorse.

### 4.5 Anti-slop checklist (score every creative before it ships)
- [ ] Every product frame comes from a real run, or is labelled "concept".
- [ ] No purple-blue gradient field, glowing prompt pill, glass card, orb, particle, lens flare or morphing text.
- [ ] No photoreal AI person, unless labelled and needed.
- [ ] No sped-up generation without a visible clock.
- [ ] The CTA matches the live offer (paid plans, refund until credits are used, no free tier).
- [ ] No feature from the "coming in days" list shown as available.
- [ ] Text that must be read is at least 5.5% of frame height and held at least max(0.83 s, 0.3 s × words).
- [ ] It is understandable muted by 3 s.
- [ ] There are no real businesses, schools or people. Invented names are checked against trademarks.
- [ ] No model or vendor names in customer-facing copy.

---

## 5. Which ad creative styles perform for AI tools (2025-2026)

### 5.1 Evidence

| Finding | Number | Source, date | Label |
|---|---|---|---|
| Meta asset types ranked by hit rate (15 types) | 1 Text only, 2 Product image with text, 3 Lifestyle-product image, 4 UGC, 5 High production … 14 Animation, **15 Carousel**. Motion's page states the band only ("approximately 4-12%"). Per-type figures from a secondary summary: text only about 11.6%, product image with text about 8.75%, UGC about 7.56%. The 7.59% and 6.87% figures were not found in any source read. Overall winner rate about 5% | Motion, Creative Benchmarks 2026 (578,750 creatives, 6,015 accounts, $1.29B Meta spend, 1 Sep 2025-1 Jan 2026, which includes BFCM; page updated 2026-04-17); Sepia Lab for the per-type figures | V (ranking); U (per-type %) |
| Motion's suggested portfolio | Text-forward and UGC for testing and discovering winners; lifestyle-product, hybrid and GIF as workhorses; high production and animation for brand and scaling a proven angle. Technology is listed among verticals where high production is "baseline" | Motion, same | V |
| Winners rise with spend | Motion's talk reports **winner share** (not hit rate) of Micro 3.7%, Small 6.2%, Medium 7.3%, Large 8.1%, Enterprise 8.2%. A secondary summary rounds this to "about 4% to 8-9%". The earlier "4.0% to 8.8%" was not found in the primary. Micro accounts (<$10K/month) ship 2.80 creatives a week on average (top quartile 4.83), and **both groups average 0.00 winners a month** | Motion talk, March 2026; Sepia Lab | V |
| Hook types with the highest hit rates | Newness, Sale Announcement, Price Anchor (Announcement is 5th) | Motion 2026, via v14 research (24 Oct) | V |
| Meta video hook rate (3 s plays ÷ impressions) | Median 20.9%; top decile 44.8%. Hold (ThruPlay ÷ impressions) median 4.6%. **Top spenders did not have meaningfully higher hook rates** | Biddy Co, 479 ads, Jun-Aug 2026, via v14 research. Not re-verified on 26 Oct: Biddy Co's Andromeda post (2026-09-17) has no hook-rate figures, and the original page was not located | U |
| TikTok official best practice | 9:16, at least 720p, proposition in 3 s, hook in 6 s, sound on, people on screen, **3-5 different creatives per ad group** and 3-5 ad groups, refresh when delivery trends down | TikTok Ads Help, updated June 2025 | F |
| LinkedIn engagement by format | Documents/carousels first in every 2026 study: about 6.6-7.0% (Socialinsider; van der Blom), video about 5.6-6.0%, image about 3.2-5.3% | 2026 studies via search summaries | V/U |
| Engagement by format, all platforms | LinkedIn carousel 21.77% median, video 7.35%, image 6.52%. Instagram carousel 6.9%, image 4.4%, Reels 3.3%. **X: text 3.56%, image 3.40%, video 2.96%**. TikTok video 3.39%, photo carousel 1.92% | Buffer, 2026-03-19. Figures re-checked on 26 Oct. The "45M+ posts" total was not stated on the page as read; the only sample size given was n=520 for Instagram Stories | V |
| X launch videos | 16:9 had about 11× the median views of 9:16 (n=154). Strong hooks: median 32,119 views vs 345 decent | Infinite, data 2026-08-17, via v14 research | V |
| Gamma | Always-on creator program: 150+ creators and 6 agencies (Offlight, 2025-06-15); 70% of creator spend on micro creators (10K-100K followers), 30% on big names during launches; "snackable demo videos" on TikTok; a "Made with Gamma" watermark on **free-tier** decks, removed on paid plans; $100M ARR, profitable, about 50 staff (Nov 2025) | Offlight (2025-06-15); Product Growth (2026-02-28, updated 2026-08-11) | V (third-party teardowns) |
| AI tools on TikTok and Instagram (Oct 2026) | Gamma creators repeat one message: old deck → client-ready deck (before/after, one-prompt, human-plus-AI skits). Lovable is framed as "personal software". (The split-screen tutorial "at 351K views" appears only in the report's FAQ, not its analysis, and the FAQ contradicts the body elsewhere, so treat that number as unverified.) Discovery content is creator-led; **conversion content shows visible UI, the finished artifact and a next step**. Comment-keyword CTAs work after a convincing demo | LightReel weekly report, 2026-10-24 (7-day scan, no sample sizes) | V/U |
| Lovable's first brand campaign | "Earworm" (Mar 2026, Strange Family / Even/Odd): a song stuck in a woman's head ends when she builds the band's app. **The app in the ad was really built on Lovable** ("genuinely live and functional", per the credits page). Directed by Thuan Tran. The placements (social, YouTube, CTV) were not confirmed on 26 Oct, because The Drum page returned no content | Ads of the World | F (story and credits); U (placements) |
| Base44 | "3 weeks to go from $0 to $1M ARR" is from an X post that could not be opened (403); the wording is unconfirmed. In the CEO Insider interview he says a goal of $1.5M ARR by the end of 2025 was hit "in four weeks". Growth came from **building in public on LinkedIn** (failures, lessons, numbers) and **extra credits for users who shared what they built** ("a viral loop"). Paid ads and influencers failed: "a few thousand dollars with no real return". TechCrunch: 10,000 users in the first 3 weeks, about 250,000 at 6 months, $189K profit in May 2025, sold to Wix for $80M cash on 18 Jun 2025, with 8 employees | CEO Insider interview; TechCrunch 2025-06-18; X post (Apr 2025, snippet only) | F (self-reported / press) |
| UGC vs screen-recorded demo for SaaS | No rigorous public head-to-head found. Vendor claims conflict | Several vendor blogs, 2026 | U |
| YouTube thumbnails | Test & Compare picks the winner by **watch-time share**, not CTR. Faces are common in breakout thumbnails but also in underperformers. Most breakouts use about 3-6 words or fewer | SEJ; vidIQ (Jul 2026); Eden (507K videos) | V |
| Product Hunt | Gallery 1270×760 recommended, **at least 2 images** (no maximum stated); thumbnail square, ideally 240×240 and under 3 MB (a GIF animates only on hover, so frame 1 is what shows); video optional, as a public YouTube link only, full URL (short links fail) | Product Hunt, "Preparing for launch" (read 2026-10-26); Screenhance (2026-04-21, updated 2026-09-01) | F |

### 5.2 What this means for Makeborne

1. **Static is not dead. On Meta it is the cheapest way to find a winning angle.**
   - Text-only and product-image-plus-text statics lead Motion's hit rates.
   - For a tiny budget, statics are also cheap to make in volume. Each one is a real output plus one line of copy.
   - Use video for the stance and for proof that needs time (an edit, the approval flow).
2. **"UGC" for Makeborne means the founder and real users at the keyboard, not actors.**
   - The owner rejects talking-head films, but screen-and-voice or screen-and-captions recordings from the owner's account are native.
   - Base44's numbers came from posts in the founder's own voice.
   - Paid creators are a test for later, not a launch dependency. Base44's early influencer spend failed; Gamma's program worked at scale and over time.
3. **Carousels on LinkedIn and Instagram organic, not as Meta ads.**
   - Carousel is last on Meta hit rate, but first for LinkedIn and Instagram organic engagement.
   - A five-slide "one sentence → finished site / book / deck" carousel and a book page-through belong there.
4. **The proposition must be visible muted by 3 s,** and conversion creatives must show the UI and the finished artifact. This is LightReel's discovery vs conversion split, plus TikTok's guidance.
5. **On X, use 16:9 video plus a strong first line,** or a single proof image. Text and image posts out-engage video on X in Buffer's data [V].
6. **Use newness as the main hook.** The roadmap gives Makeborne a natural run of "new" announcements over the next weeks: images, custom domains, two-way GitHub sync, credit top-ups, agency tools, AI lead research. Each one is a fresh creative concept. Each must be announced only when live.

---

## 6. Concept matrix: what to make first

The launch set is **12 paid-ready creatives across 5 concepts**, plus organic. Every concept is genuinely different in angle and format, because Meta's retrieval treats near-duplicates as one ad [V, Biddy Co 2026-09-17; Meta engineering 2024-12-02 confirms Andromeda's scale, not this specific claim].

| # | Concept (angle) | Proof device | Executions (size) | Audience | Live today? |
|---|---|---|---|---|---|
| C1 | **One sentence → a published site** | Real screen recording at real speed (or with a clock chip): type the brief → Plan → Create → publish → live address | 15 s 9:16; 6 s 9:16; 4:5 static (sentence chip over the finished hero) | Small businesses, creators | Yes |
| C2 | **Change one thing. Only that thing changes.** | Tern slide 6 chart edit, before/after split | 4:5 static; 1:1 static; 6 s 9:16 | Freelancers, founders | Yes |
| C3 | **Your client approves** (paying segment) | Client review link: anonymous comment → fix → Approve → "Approved by …". Recorded on a real deck | 15 s 4:5 and 9:16; 4:5 static (comment bubble next to the Approve button) | Freelancers, agencies (Studio plan, $49, "best for client work") | Yes |
| C4 | **Text-only stance** (Motion's top hit-rate type) | Big Inter type on canvas, one italic accent word, a small real output in a corner. E.g. "Your client wants a site, a deck and a brochure *by Friday.*" / "Websites. Books. Decks. *One studio.*" | 3 × 4:5 statics; 1 × 9:16 static | All | Yes |
| C5 | **Brand film** | v9 now; v14 fixed later | 14.5 s 9:16 and 16:9; 43 s 16:9 (organic) | Awareness, retargeting once pixels and consent exist | v9 yes; v14 after fixes |
| C6 (organic) | **Made from one sentence** series | Real output scroll captures with the sentence chip; one per day | 9:16 6-10 s; Instagram carousel | Organic TikTok, Reels, Shorts | Yes |
| C7 (organic) | **Build-in-public** | Owner posts: real numbers (sales, sites published, refunds) and failures, with screenshots | Text + image; LinkedIn document | Founders and builders (the Base44 route) | Yes |
| C8 (organic, X) | **"Reply with your business, we make its site"** | Make 10-20 real sites for repliers and reply with the address. This uses X's reply weighting [F, but dated: in the open-sourced config of 5 Apr 2023, a reply weighs 13.5 and a reply the author engages with 75.0, against 0.5 for a like. The config notes weights can change at any time, so current weights are unknown] | Text + 16:9 video; reply screenshots | X and LinkedIn | Yes. Cost is credits only (see §8) |
| Later | **Images are live** | v14 15 s vertical with real image-pipeline outputs; before/after of the same brief without and with images | 9:16, 4:5, 16:9 | All | **Not yet: launch beat** |
| Later | **Your own domain**, **GitHub two-way sync**, **Top up credits**, **Agency tools** | One screen recording each, plus one static | 9:16, 4:5 | Segment-specific | **Not yet: one beat per feature** |

**Copy guardrails for all concepts:** state what it makes and what it costs ("from $20/month"). The refund promise ("full refund until you use credits") is a strong risk-reverser for a no-trial product, so put it in the ad copy and the end card. No speed, user or revenue claims. No "AI" as the first word of a headline (a v10 rule [O] to keep or drop).

---

## 7. Sizes, counts and refresh

### 7.1 Sizes to produce

| Placement | Size | Notes |
|---|---|---|
| TikTok, Reels, Shorts, Stories | 9:16 1080×1920 (or 1440×2560 source) | Native recomposition. Captions inside the safe zone |
| Meta and Instagram feed | 4:5 1080×1350 (or 1440×1800) | The main paid static size. Meta's own spec page was not re-checked this pass [U] |
| X, LinkedIn, square fallbacks | 1:1 1080×1080 | For X single images and LinkedIn statics |
| X video, YouTube, website, Product Hunt | 16:9 1920×1080 (4K master available) | The X launch film is 16:9 |
| LinkedIn document carousel | 1080×1350 pages, exported as PDF | 5-8 pages |
| YouTube thumbnail | 1280×720 | 3 variants for Test & Compare. Judge by watch-time share |
| Product Hunt | Gallery 1270×760 (at least 2; plan 4-6), thumbnail 240×240 under 3 MB (a GIF only animates on hover), video as a public full YouTube URL | Confirmed on PH's "Preparing for launch" page, 26 Oct |
| Link previews (OG image) | 1200×630 | One per landing page variant |

### 7.2 How many
- **Launch week (26 Oct - 1 Nov):** 12 paid-ready creatives (C1-C5 above) plus about 10 organic posts (C6-C8).
  - This matches TikTok's 3-5 creatives per ad group.
  - It is about 2-3 weeks of what Motion's small accounts ship. At about 4% hit rate, 12 ads will most likely produce zero or one clear winner [V]. So **the paid test is for finding angles, not for scaling**.
- **After that:** 3-5 new paid creatives a week (about the top-quartile pace for micro accounts [V]).
  - At least one must be a new concept, not a variant.
  - Plus a daily organic output (C6), which costs almost nothing.
- **Per launch beat (images, domains, GitHub sync, top-ups, agency tools):** 1 screen recording (9:16 and 16:9), 2 statics (4:5, 1:1), 1 owner post, and 1 X or LinkedIn video. That is about 5 assets per beat.

### 7.3 When to refresh
TikTok officially says to refresh when delivery trends down [F]. Agency heuristics put fatigue at about 2-4 weeks for top performers, or frequency above about 3 [V/U]. Rules [I]:
- **Kill** a creative after about 1,000-2,000 impressions if its hook rate is below about 15% (video) or its CTR is below the account median. Keep the angle and try a new execution.
- **Refresh** when hook rate or CTR falls about 30% from the first 3 days' average, frequency passes about 3, or cost per sale (from UTMs and Whop) rises about 50% over 7 days.
- **Cadence:** at this budget, expect to refresh every 2-3 weeks. Every feature launch is a scheduled refresh.
- **Judge on sales, not hooks.** Top spenders' hook rates were not higher [V]. With no pixels yet, measure by UTM per creative and Whop sales. The consent banner comes before any Meta or TikTok pixel or retargeting.

---

## 8. Production plan and costs (estimates)

| Item | How | Cost (USD) | Effort |
|---|---|---|---|
| Fix and re-render v14 (CTA, AI line, URL, names); 16:9 plus a 15 s 9:16 recomposition | HyperFrames, in-house. Re-render on a local disk to avoid the network-drive rename failure | $0 | 1-2 days |
| v9 end-card swap plus 4:5 recomposition | HyperFrames | $0 | 2-4 h |
| 10-15 real demo runs for recordings and statics (fictional briefs) | The live product on an owner account. Observed provider cost per real build was about $0.25-0.32 (books, decks) and $1.68 for an image-led site (26 Oct run) [F] | about $5-25 of provider cost (credits) | 1 day |
| Screen recordings (C1, C3, launch beats) | OBS or the OS recorder at 2× UI scale; edited in HyperFrames | $0 | 2-3 h each |
| 12 statics (C2, C4, C1 stills) | HyperFrames or Figma templates from the tokens in §4 | $0 | 1 day for the template, then 15 min each |
| "Reply with your business" sites (C8), 10-20 | Real runs | about $5-35 of provider cost | 1-2 days spread over the launch week |
| Optional micro-creator test (2-3 creators, after organic winners are known) | Paid posts or Spark Ads | **about $150-300 (assumption; rates vary widely, unverified)** | 1 week |
| Paid creative test (Meta 4:5 and 9:16; TikTok 9:16) | 3-5 creatives per ad group, equal budgets, 5-7 days | **$300-400 of the $1,000 (my recommendation; the overall plan sets the split [O])** | Daily checks |

---

## 9. Risks

1. **Misleading-demo risk.** Shipping v13/v14 imagery as if it were current output, while image generation is off, invites refunds, platform rejection and backlash. It also breaks the house honesty rules.
2. **"Start free" in v14** contradicts the no-free-tier decision. It is a consumer-law and refund risk.
3. **Missing or unreadable AI labels** on concept or photoreal content: EU AI Act Art. 50 (in force from 2 Aug 2026 [F]), TikTok's realistic-AIGC rule [U], and Meta's "AI info" label [V].
4. **Trademark collisions** in invented names: Tern, Tidal and "Northface Labs" are the clearest.
5. **Music licence scope:** Mixkit does not cover broadcast or Content ID. TikTok business-account music rules apply.
6. **A tiny budget can't find winners statistically.** At about 4% hit rate and $300-400, results will be directional only. Over-reading early CTRs is a real risk.
7. **No pixel, so the platforms optimise poorly.** Optimisation will be for clicks or landing-page views, not purchases, until consent and server-side events exist.
8. **Owner taste vs audience.** The owner's liked style (high-energy, music-led, produced) is not the format with the best hit rate on Meta (text-only and UGC). Keep films for brand and launch posts, and let statics and recordings carry the paid tests.
9. **The film pipeline is fragile:** the v14 draft 2 render failed, and there is no v14 vertical cut. Budget time for renders.
10. **Copy drift:** "What will you make *next?*" was flagged on 18 Oct as too close to Canva's line, but v13 and v14 end on it [O].

---

## 10. Owner decisions needed [O]
1. Approve the v14 fixes: the CTA wording, restoring the AI-concept line, and the publish address shown.
2. Hold v14's image-heavy cut until images are live, or ship it now as a clearly labelled "concept film".
3. Choose an end line: keep "What will you make *next?*" or switch to an owned line ("Make the thing you keep describing." / "Books worth *opening.*").
4. Lock one ink value (`#18181B` or `#18191E`).
5. Decide the split of the $1,000 between paid tests, creators and everything else.
6. Decide whether the owner will appear (voice or screen-only) in build-in-public recordings.
7. Pricing levers are outside this track, but they change creative: a free tier or trial was decided against. If ever reconsidered, the economics belong in the pricing track.

---

## Sources

Web (read 2026-10-26 unless noted):
- Motion, "Top asset types on Meta in 2026" (Creative Benchmarks 2026, updated 2026-04-17): https://motionapp.com/library/research/creative-benchmarks-2026/top-asset-types
- Motion, "Meta Ads in 2026: How many creatives do you actually need to launch?" (March 2026): https://motionapp.com/library/talk/meta-ads-in-2026-how-many-creatives-do-you-actually-need-to-launch/
- Sepia Lab summary of Motion 2026 benchmarks: https://sepia-lab.com/en/blog/ad-creative-volume-benchmarks
- TikTok Ads Help, "Creative best practices for performance ads" (updated June 2025): https://ads.tiktok.com/help/article/creative-best-practices
- Buffer, "Best content format on social platforms in 2026" (2026-03-19): https://buffer.com/resources/data-best-content-format-social-media/
- Socialinsider, 2026 Instagram organic benchmarks: https://www.socialinsider.io/blog/instagram-benchmarks/
- Dataslayer, LinkedIn algorithm 2026 (format summary): https://www.dataslayer.ai/blog/linkedin-algorithm-february-2026-whats-working-now
- LightReel, "AI Prosumer Tool Marketing" weekly report (updated 2026-10-24): https://www.lightreel.ai/blogs/ai-prosumer-tools-on-tiktok
- Offlight, "How Gamma scaled to 50M users": https://blog.offlight.work/post/how-gamma-scaled-to-50m-users-the-power-of-creator-marketing-and-ai
- Product Growth, Gamma growth teardown: https://www.productgrowth.blog/p/gamma-growth-teardown-100m-arr
- Ads of the World, Lovable "Earworm" (March 2026): https://www.adsoftheworld.com/campaigns/earworm
- The Drum, Lovable debut campaign: https://www.thedrum.com/news/ad-of-the-day-lovable-s-debut-campaign-brings-an-earworm-idea-to-life
- Maor Shlomo on X, Base44 growth thread (April 2025; read via search snippet, the page returned 403): https://x.com/MS_BASE44/status/1911778607548051605
- CEO Insider, interview with Maor Shlomo: https://ceoinsider.io/interview/maor-shlomo
- TechCrunch, Base44 sold to Wix (2025-06-18): https://techcrunch.com/2025/06/18/six-month-old-solo-owned-vibe-coder-base44-sells-to-wix-for-80m-cash
- NN/G, "Why AI-generated holiday ads fail" (2025-12-19): https://www.nngroup.com/articles/ai-ad/
- NBC News, McDonald's pulls AI Christmas ad (Dec 2025): https://www.nbcnews.com/world/europe/mcdonalds-ai-generated-christmas-advert-social-media-backlash-rcna248590
- Grey Journal, "AI slop backlash in 2026" (secondary summary of the Ipsos/Syracuse and Gartner figures): https://greyjournal.net/hustle/grow/ai-slop-backlash-2026/
- FTC, final rule banning fake reviews and testimonials (2024-08-14): https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
- Meta Engineering, "Meta Andromeda" (2024-12-02): https://engineering.fb.com/2024/12/02/production-engineering/meta-andromeda-advantage-automation-next-gen-personalized-ads-retrieval-engine/
- Biddy Co, "Meta Andromeda" (2026-09-17; agency): https://www.biddyco.com/blog-posts/meta-andromeda
- Marketing Dive, Meta AI disclosure tags for ads: https://www.marketingdive.com/news/sociable-meta-adds-updated-disclosure-tags-for-ai-generated-ads/824833/
- CineRads, AI ad disclosure requirements 2026 (secondary): https://www.cinerads.com/blog/ai-ad-disclosure-requirements
- Stellar Search, TikTok AI ad disclosure rules (secondary): https://www.stellarsearch.co.uk/insight/tiktoks-ai-ad-disclosure-rules-are-live-what-brands-running-ai-creative-need-to-do-now
- Search Engine Journal, faces in YouTube thumbnails: https://www.searchenginejournal.com/do-faces-help-youtube-thumbnails-heres-what-the-data-says/563944/
- vidIQ thumbnail study (July 2026): https://vidiq.com/research/youtube-thumbnail-study/
- Eden, 507,478-video thumbnail analysis: https://eden.so/blog/what-makes-a-good-youtube-thumbnail/
- Screenhance, Product Hunt gallery sizes (2026): https://screenhance.com/blog/product-hunt-gallery-size
- Jon Loomer, Meta ads safe-zone template: https://www.jonloomer.com/qvt/safe-zones-template-meta-ads/
- Metricool, Social media advertising trends 2026 (2026-09-22; averages skew to its user base, not used for planning): https://metricool.com/social-media-advertising-trends/

Internal (read-only, 26 Oct 2026):
- Film briefs and specs: `v9-flyover/BRIEF.md` (14 Oct), `v10-the-list/STORYBOARD.md` (14 Oct), `v12/research/CREATIVE_INTELLIGENCE.md` and `v12/concepts/REAL_OUTPUTS.md` (18 Oct), `v13/film/SPEC.md`, `STORYLINES.md`, `BUILD_BRIEF.md` (24 Oct), `v14/film/SPEC.md` (24 Oct), `v14/film/FIX1_REPORTS.md` (26 Oct), `v14/research/DOSSIER.md` and `virality.md` (24 Oct; these carry the Biddy Co, Infinite, Doomers and TikTok 2020-21 figures cited above), `v14/gen/write_prompts.py`, `v14/renders_draft2.log`.
- Images viewed: v9 review contact sheets (16:9, 9:16); v10 snapshot contact sheet; v13 `renders/drafts/hi_sheet.jpg`; `v14/gen/sheet_v14.jpg`; `v14/full_designs_sheet.jpg`; v14 draft 1 sheets at 0, 10, 14, 26 and 38 s; `v12/assets/real/book_sheet.jpg` and `deck_sheet.jpg`; product eval shot `quality-v14-sites-c/.../desktop-01-of-6.jpg`.
- Launch code (private, read only): default publish address `sites.makeborne.com/<slug>`; client review page with Approve and Request changes live; the launch brief (no free tier, no trial).

---

## Verification (26 Oct 2026)

This was an adversarial re-check of the most decision-relevant claims, done on 26 Oct 2026 against primary pages where they could be opened. The shared web-search budget was used up at the start of this pass, so every check below is a direct fetch of a known URL. Pages that returned 403 or no content are marked unverified. I also spot-checked three internal claims read-only: the v14 draft 1 file (ffprobe), the "Start free" end card (the v14 build reports) and the default publish address (launch code, private).

| # | Claim (as first written) | Verdict | Correction or note | Source |
|---|---|---|---|---|
| 1 | Motion 2026: text-only 11.6%, product image with text 8.75%, UGC 7.56%, high production 6.87%; carousel last of 15 | **Corrected** | The ranking and the last place for carousel are confirmed. Motion's page gives only a band of about 4-12%. The per-type figures come from Sepia Lab, a secondary source. The 6.87% and 7.59% figures were not found anywhere. Dataset confirmed: 578,750 creatives, 6,015 accounts, $1.29B, 1 Sep 2025-1 Jan 2026 (includes BFCM). Overall winner rate is about 5% | motionapp.com/library/research/creative-benchmarks-2026 and /top-asset-types (updated 2026-04-17); sepia-lab.com/en/blog/ad-creative-volume-benchmarks |
| 2 | Hit rate rises from 4.0% (<$10K/mo) to 8.8% ($1M+) | **Corrected** | Motion's talk reports winner share, not hit rate: Micro 3.7% up to Enterprise 8.2%. Micro accounts ship 2.80 creatives a week (top quartile 4.83), confirmed. Both groups average **0.00 winners a month**, confirmed. That supports "the paid test is for angles, not scaling" | motionapp.com/library/talk/meta-ads-in-2026-how-many-creatives-do-you-actually-need-to-launch (Mar 2026) |
| 3 | TikTok: 9:16, ≥720p, proposition in 3 s, hook in 6 s, 3-5 creatives per ad group, 3-5 ad groups, refresh on declining delivery | **Confirmed** | TikTok also says to add new creatives to the existing ad group rather than open a new one | ads.tiktok.com/help/article/creative-best-practices (updated June 2025) |
| 4 | Buffer 2026 median engagement by format (LinkedIn carousel 21.77%, X text 3.56% > image 3.40% > video 2.96%, etc.) | **Confirmed** (figures) | The "45M+ posts" total was not visible on the page as read. Instagram rates are a share of reach | buffer.com/resources/data-best-content-format-social-media (2026-03-19) |
| 5 | Base44: "$0 to $1M ARR in 3 weeks" | **Unverified** | The X post returned 403. In the CEO Insider interview he says a $1.5M ARR goal for end of 2025 was hit "in four weeks". The two accounts differ in wording, and both are self-reported | x.com/MS_BASE44/status/1911778607548051605 (403); ceoinsider.io/interview/maor-shlomo |
| 6 | Base44: paid ads and influencers did not work; building in public plus credits for sharing did | **Confirmed** (self-reported) | "a few thousand dollars with no real return". He names building in public on LinkedIn, and credits for sharing as "a viral loop" | ceoinsider.io/interview/maor-shlomo |
| 7 | Base44 sold to Wix for $80M on 18 Jun 2025 | **Confirmed** | All cash. About 250K users at 6 months, 10K in the first 3 weeks, $189K profit in May 2025, 8 employees, $25M retention pool | techcrunch.com/2025/06/18/six-month-old-solo-owned-vibe-coder-base44-sells-to-wix-for-80m-cash |
| 8 | Lovable "Earworm" (Mar 2026, Strange Family / Even/Odd); the app shown was really built on Lovable; runs on social, YouTube, CTV | **Partly confirmed** | Story, credits, date and the "genuinely live and functional" app are confirmed. The placements are unverified, because The Drum page returned no content | adsoftheworld.com/campaigns/earworm |
| 9 | Gamma: 150+ creators, 6 agencies, 70% of spend on micro creators, "Made with Gamma" watermark | **Confirmed** (third-party) | The watermark is on **free-tier** decks. Gamma reached $100M ARR profitably in Nov 2025 with about 50 staff. Makeborne has no free tier, so the watermark loop does not transfer directly: a "Made with Makeborne" badge on published paid sites would need an owner decision [O] | blog.offlight.work (2025-06-15); productgrowth.blog/p/gamma-growth-teardown-100m-arr (2026-02-28, updated 2026-08-11) |
| 10 | LightReel: Lovable split-screen tutorial at 351K views | **Unverified** | The number appears only in the report's FAQ, which contradicts the body elsewhere. The report gives no sample sizes. Its qualitative point (conversion content shows UI, the artifact and a next step) is confirmed as the report's claim | lightreel.ai/blogs/ai-prosumer-tools-on-tiktok (updated 2026-10-24) |
| 11 | McDonald's Netherlands pulled its AI holiday ad in Dec 2025; NN/G names the tells | **Confirmed** | Posted about 6 Dec 2025, pulled by 10 Dec. Made by The Sweetshop Films and TBWA/Neboko. NN/G (2025-12-19) also covers Coca-Cola's 2024 and 2025 ads | nbcnews.com (2025-12-11); nngroup.com/articles/ai-ad |
| 12 | Ipsos/Syracuse: human-made ads 14-17% stronger; only about 13% spot AI ads | **Corrected** | Primary: human ads beat the Ipsos benchmark by 11 points, AI versions fell 5 points below it, and the gap is described as "surprisingly slim". 13% were at least somewhat confident an AI ad was AI, and the same 13% suspected human ads; 40% were unsure. 3,000 US respondents, 20 ads, 10 brands. The "14-17%" figure is not in the primary | news.syr.edu/2026/05/18/newhouse-research-finds-ai-ads-fall-short-on-sales-impact |
| 13 | Gartner: 50% of US consumers prefer brands that avoid GenAI | **Unverified** | Secondary only: 1,539 US consumers, release dated 16 Mar 2026. The Gartner page returned 403 | greyjournal.net/hustle/grow/ai-slop-backlash-2026 |
| 14 | FTC rule bans fake or AI-generated testimonials | **Confirmed** | It explicitly covers AI-generated fake reviews. It also bans incentives tied to review sentiment and undisclosed insider reviews. Civil penalties apply to knowing violators. Any share-for-credits loop must reward sharing, not praise | ftc.gov press release (2024-08-14) |
| 15 | EU AI Act Art. 50 transparency duties apply from 2 Aug 2026 | **Confirmed** | Art. 50(4) requires deployers of deepfake image, audio or video to disclose it, with a lighter duty for evidently artistic or fictional work. The site's timeline also lists **2 Dec 2026** as the Art. 50(2) marking deadline for generative systems placed on the market before 2 Aug 2026. Check this against EUR-Lex [U] | artificialintelligenceact.eu/article/50 and /implementation-timeline |
| 16 | TikTok: business accounts must not use the general sound library; use your own export as an "original sound" | **Corrected** | The first half is confirmed. TikTok points businesses to the free Commercial Music Library (about 1M tracks, covering organic posts, ads and branded content). For any other licensed sound it says to check the licence with legal. The "original sound" workaround is only safe if the Mixkit licence covers it | ads.tiktok.com/help/article/commercial-music-library |
| 17 | Mixkit licence covers web, social and online ads, but not broadcast or Content ID | **Unverified** | The licence text could not be read (mixkit.co/license shows links only; the User Terms bar resale and sublicensing). Re-read it before any paid use | mixkit.co/license; mixkit.co/terms |
| 18 | Meta "AI info" label on AI ads | **Confirmed** (press) | It is applied automatically for Meta's own generative tools, or when C2PA metadata shows a third-party AI tool, and appears under "About this ad" | marketingdive.com (2026-07-09) |
| 19 | X ranks replies heavily (2023 weights) | **Confirmed, dated** | In the config of 5 Apr 2023: reply 13.5, reply the author engages with 75.0, like 0.5, report −369. Current weights are unknown | github.com/twitter/the-algorithm-ml (projects/home/recap/README.md) |
| 20 | Meta Andromeda treats near-duplicates as one concept | **Confirmed** (agency) | Biddy Co (2026-09-17): headline-colour, crop or CTA-wording changes share one entity ID. Meta's own post confirms Andromeda exists, not this mechanism | biddyco.com/blog-posts/meta-andromeda |
| 21 | Biddy Co hook-rate benchmarks (median 20.9%, top decile 44.8%) | **Unverified** | Known only via internal v14 research. The Biddy Andromeda post has no hook figures | (original not located) |
| 22 | Product Hunt: gallery 1270×760, up to 8 images, thumbnail 240×240, YouTube video | **Corrected** | At least 2 images, with no maximum stated. Thumbnail under 3 MB; a GIF animates only on hover. The video must be a public YouTube link with the full URL | producthunt.com/launch/preparing-for-launch |
| 23 | Internal: v14 draft 1 is 16:9 1080p60, 43.4 s; its end card says "Start free"; the default publish address is `sites.makeborne.com/<slug>` | **Confirmed** | ffprobe gives 1920×1080, 60 fps, 43.43 s. "Start free at makeborne.com" is in the v14 build reports. The default publish address `sites.makeborne.com/<slug>` was checked in the launch code (private) | local, read-only |

### What changes in the plan because of this check
- **Volume math stands, and is stronger:** Motion's micro accounts average 0.00 winners a month. Treat the $300-400 test strictly as angle discovery, judged on UTM clicks and Whop sales.
- **Do not quote hit-rate percentages as Motion's.** Say "Motion ranks text-only statics first" and cite the band.
- **Anti-AI-look argument, re-weighted:** the Ipsos/Syracuse effect is real but modest (+11 against −5 points), and viewers mostly cannot tell AI from human. The case for "made, not generated" rests more on backlash risk (McDonald's) and on honesty than on a large effectiveness gap.
- **TikTok music:** use a Commercial Music Library track on paid TikTok until the Mixkit licence is confirmed for ads.
- **Share-for-credits loop (the Base44 route):** reward the act of sharing, never positive sentiment, to stay inside the FTC rule.

### Gaps this report missed
1. **Art. 50(2) applies to Makeborne as a provider, not only as an advertiser.** Once generated images ship, Makeborne itself may need machine-readable marking of its image outputs, from launch: the 2 Dec 2026 deadline is only for systems already on the market before 2 Aug 2026, and Makeborne's image generation ships later [U, check against EUR-Lex]. This is a product and legal task, but it affects the "images are live" launch beat.
2. **No landing-page creative plan.** Ads point to makeborne.com, but there is no message-match plan per concept (C1-C4 landing variants, an above-the-fold proof asset, the refund line) and no OG image per variant beyond the size.
3. **No accessibility spec:** burned-in captions for all video, contrast checks for the canvas plus grey `#5C616D` on small type, and alt text for statics.
4. **No localisation decision.** The seller sells worldwide from Bosnia and Herzegovina, but there is no plan for regional or language cuts, or for EU versus US copy (the refund wording under EU consumer law).
5. **No creative-to-UTM naming convention.** Without pixels, every creative needs a unique `utm_content` ID mapped to the concept matrix, or the refresh rules in §7.3 cannot run.
6. **No current X ranking evidence after 2023.** C8 rests on dated weights.
7. **No YouTube Shorts or Pinterest data,** although both are named placements.
8. **Paid-creator rates ($150-300) are an unsourced assumption.** Get real quotes before budgeting.
9. **Ad-platform policy for AI-tool advertisers** (Meta's restrictions on "make money fast" or before/after claims) was not checked. The C8 "we make your site" framing and the before/after edits should be reviewed against Meta's Advertising Standards before spend.

### Sources added in this pass (read 2026-10-26)
- Motion, Creative Benchmarks 2026 overview: https://motionapp.com/library/research/creative-benchmarks-2026
- Product Hunt, Preparing for launch: https://www.producthunt.com/launch/preparing-for-launch
- TikTok Ads Help, Commercial Music Library: https://ads.tiktok.com/help/article/commercial-music-library
- Syracuse University News, Newhouse/Ipsos AI ads study (2026-05-18): https://news.syr.edu/2026/05/18/newhouse-research-finds-ai-ads-fall-short-on-sales-impact/
- EU AI Act Article 50: https://artificialintelligenceact.eu/article/50/ and implementation timeline: https://artificialintelligenceact.eu/implementation-timeline/
- X (Twitter) open-sourced ranker weights (config dated 2023-04-05): https://github.com/twitter/the-algorithm-ml/blob/main/projects/home/recap/README.md
- Mixkit licence and terms (licence text not readable on this pass): https://mixkit.co/license/ , https://mixkit.co/terms/

# Makeborne short-form video library

> **Launch moved (owner decision, 26 Oct 2026 evening).** The public launch is **Wednesday 28 October 2026 at 19:00 Sarajevo time** (CET, 18:00 UTC); makeborne.com shows a countdown to that moment. Day 1 = Wed 28 Oct; Mon 26 and Tue 27 Oct are pre-launch days −2 and −1 (profiles, scheduling, extra footage, DM keywords, countdown teasers that never say it is live). The launch week moved 2 days later with its times (days 1-7 = 28 Oct - 3 Nov); everything after it keeps its date (ads A01 12-15 Nov and A02 3-4 Dec, creator waves, the no-boost window 20 Nov - 2 Dec, Black Friday, the 22 Nov and 20 Dec checkpoints) and day numbers are recomputed. The 90 days run Wed 28 Oct 2026 - Mon 25 Jan 2027 (day 90, the day-90 review). `data/calendar.json` and the war room are the source of truth; dates and day numbers in the text below that disagree are from before the move.


**Written:** Monday 26 October 2026, day 1 of the paid beta. **Window:** weeks 1-13 (26 Oct 2026 - 24 Jan 2027), matching `plan/strategy.md`.
**Machine-readable version:** `data/videos.json` (one object per video, same IDs). This file is generated from the same data, so the two always agree.
**Status:** plan only. Nothing here has been filmed, posted, paid for or sent. Creator contacts, payments and every post are the owner's or founder's call.

**Labels** (as in the master plan): **[F]** verified fact · **[S]** secondary · **[V]** vendor or self-reported · **[E]** our estimate · **[A]** assumption · **[O]** owner decision · **[U]** unverified.

---

## 0. Summary

- **60 video concepts:** 10 P0, 36 P1, 14 P2.
- **48 are tagged `live`** and promote only what works today: AI websites published on a Makeborne address, AI books, AI presentations, client review links, the basic CRM and lead finder, manual GitHub export and the projects library.
- **12 are tagged `beat:<feature>`**: `beat:agency-tools` 1, `beat:ai-lead-research` 1, `beat:custom-domains` 2, `beat:github-sync` 1, `beat:images` 6, `beat:topups` 1. They are written now so they can be shot on the day a feature passes the six-box gate (strategy §9). **None of them may be posted, teased or scheduled before that.** Their week numbers are the plan's earliest planning guesses, not promises.
- **By format:** speedrun 6, before-after 3, POV 2, tutorial 5, slideshow 2, founder 9, reaction 2, UGC 6, demo 18, meme 3, listicle 2, case-study 2.
- **The 10 P0 videos are the launch-week set** (section 2 and 3). They cover the plan's day-by-day launch week: the pinned Fly-over, two day-1 brand TikToks (site and deck), the first comment-reply speedrun, the client-approval POV, the PPTX chart proof, the lead-finder video, one-brief-three-deliverables, and the founder's Day 1 and Day 7.
- **ICP coverage** follows the plan's order: ICP 1 (freelancers and small studios, sold on Studio $49) carries most videos; ICP 2 (decks), ICP 3 (text-led books) and ICP 4 (small businesses, light until custom domains) follow. ICP 5 (education) is not targeted.
- **Budget ids** are the plan's: creator videos sit on `b2` (wave-1 fees) and `b3` (per-view bonus), wave-2 visual creators on `b4`, boosts of proven winners on `b5`, the Uneed slot on `b6`, payout fees on `b8`. Organic videos spend nothing beyond demo-build credits (about $0.25-$1.35 of provider cost per build [F, product-funnel-audit §8.1]).

---

## 1. Rules for every video

These come from the master plan (§4.4 copy hygiene, §5.5, §9, §16) and the research files. Every video in this library was written to them; re-check them on the day of posting.

**Truth**
1. **Only live features are shown as available.** Generated images, credit top-ups, custom domains, automatic two-way GitHub sync, agency tools and AI lead research are not live. Until each passes the gate, customer copy says only "coming soon", with no date.
2. **Speed is never faked.** A website build takes minutes, not seconds (research/product-funnel-audit.md §2, step 9). Every on-screen time is the measured time from that recording, or the clip carries a visible "sped up ×N" chip. Hooks in this file that show `[real time]` must be filled from the recording. The plan's example "52 seconds" is a placeholder, not a claim.
3. **Never say "free", "trial" or "start free".** The proof line is "From $20/month + tax. Full refund until you use credits." If the owner changes the refund rule (decision D1), change it in every video before it posts.
4. **No AI model vendor names** in any caption, voice-over, on-screen text or creator script.
5. **No "better than Lovable, Gamma or Framer"** and no competitor scores. No revenue, user-count or income claims. No testimonials except real, consented ones (FTC fake-review rule, 14 Aug 2024 [F]).
6. **The lane rule:** nothing that says "I replaced my agency" or "you don't need a designer" on founder LinkedIn, creator Lane A briefs or anything an agency buyer sees. On brand TikTok only "a first version before you hire a designer".
7. **Publish address:** show the address production actually issues. Never imply a custom domain.
8. **Books** are for screen and PDF. Never say "print-ready" or imply KDP printing.

**People and data**
9. **Real businesses** appear only when the owner asked, with public information only, with a written OK before anything stays published, and unpublished by default (decision D15). Lead-finder results are always blurred: names, addresses, phones and emails.
10. **No personal data** of buyers, clients or commenters on screen. Crop every Whop screenshot. Handles are blurred unless the person agrees to be shown.
11. **Fictional business names** that a build invents are checked against real trademarks before posting (the creative audit already flags Tern, Tidal and "Northface Labs").

**Craft**
12. **Frame 0 is the result** (the finished site, slide or book page), with 4-8 words of hook text inside the safe zone. Proposition by 3 s, hook by 6 s [F, TikTok Ads Help, updated Jun 2025].
13. **Two cuts of every idea** where it fits: a 25-35 s punch cut and a 60-150 s full build (Socialinsider H1 2026: TikTok under 30 s wins engagement, 120-180 s gets about 10x the views [F]).
14. **Burned-in captions on everything.** About 80% of LinkedIn video is watched without sound [F, LinkedIn Creative Labs via PPC Land, Jul 2025].
15. **Real UI at 2x scale**, real outputs, the house look: canvas `#F8F7F4`, Inter display with one Newsreader Italic accent word, no purple-blue gradient fields, glowing prompt pills, orbs or morphing text (research/creative-assets.md §4.5 anti-slop checklist).
16. **Loop the last frame into frame 0** on TikTok and Shorts (Shorts count every replay as a view since 31 Mar 2025 [F, TechCrunch]).
17. **Native re-edits, not duplicate uploads.** No TikTok watermark on Reels; a new hook for a re-post (TikTok makes "unoriginal or reused material without anything new" ineligible for For You [F, read 26 Oct 2026]).

**Sound**
18. **Brand TikTok is a business account, so it uses the Commercial Music Library only** ("Businesses cannot use the general music library for commercial usage" [F, TikTok Ads Help, updated Jul 2025]). Original voice-over is always allowed.
19. **The Mixkit tracks in the films** ("Opalescent" in v9 and v14) are used as the film notes record their licence (web, social and online ads; not broadcast or Content ID). That licence text could not be read on 26 Oct [U]. Use them on Instagram, LinkedIn, X and YouTube organic; on TikTok, and on any paid placement, swap to a Commercial Music Library track until the licence is re-read.

**Links and tracking**
20. Every video has its own `makeborne.com/go/<surface>-<id>` link and a `utm_content` of `<surface>-<id>-<hook code>` (strategy §12). Never a Whop store link or Whop tracking link: only Makeborne-created checkout links are used.
21. CTAs by surface: **Instagram** "Comment SITE / DECK / BOOK / CLIENT" (the DM returns the `/go/` link, 3 briefs, a 30 s uncut build and the refund line); **TikTok** "DM me SITE" plus the business-account bio link (ManyChat's TikTok channel has no comment trigger and excluded EU, UK and US businesses as of Sep 2025; BiH eligibility unknown [F/U]); **LinkedIn and X** link in the first comment or reply; **YouTube** link in the description and pinned comment.
22. No pixels or retargeting until the consent banner is live (planned by about 6 Dec). Judge videos on `/go/` clicks, DM keywords and Whop sales, never on views alone.

---

## 2. Launch week: what to film and post, day by day

Times are Sarajevo (CET). Brand TikTok posts at about 13:00 and 21:00 (move the evening slot to 20:00-00:00 from Sun 1 Nov, when US clocks change); LinkedIn at 16:00-17:00. Each P0 master is re-edited natively for Reels and Shorts, so the 10 P0s plus re-edits and the comment-reply episodes give the plan's 25-30 owned posts for the week.

| Day | Film or edit | Post | Video |
|---|---|---|---|
| **Mon 26 Oct** (day 1) | Add the end card and hook text to the v9 Fly-over; record the bakery site build and the deck build; founder Day 1 to camera | Pin V01 on TikTok and Instagram; V02 and V03 as the two brand TikToks (+ Reels/Shorts re-edits); V08 on LinkedIn and X | V01, V02, V03, V08 |
| **Tue 27 Oct** | The plan's 4-6 real-speed captures at 2x UI scale: lead finder → demo site → review link; client comment → fix → Approve on a phone; one brief → site, deck, book; PPTX chart edit; GitHub export | First comment-reply speedrun (with consent); one-brief-three-deliverables | V04 (episode 1), V10 |
| **Wed 28 Oct** | Cut the POV from Tuesday's phone capture | Freelancer POV on TikTok, Reels and founder LinkedIn | V05 |
| **Thu 29 Oct** | Batch-film day (8-10 videos): comment-reply episodes 2-4, V30 change-one-thing, V16 carousel frames | V04 episodes as requests come in | V04 |
| **Fri 30 Oct** | — | Deck proof and lead-finder video; LinkedIn/X "Day 5: exact numbers" text post | V06, V07 |
| **Sat 31 Oct** | Batch-film 10 videos for week 2 (V11-V16, V18, V21, V29, V44) | — | — |
| **Sun 1 Nov** (day 7) | Founder Day 7 with real Whop numbers, refunds included, buyer data cropped | LinkedIn, X, TikTok, Indie Hackers | V09 |

**P0 order of priority if time runs short:** V02, V05, V04, V01, V08, V09, V03, V06, V07, V10. The first three test the two strongest formats (speedrun and client-work POV) and the series that feeds itself.

**Sunday review (1 Nov):** keep the top 2 formats, re-cut every post above 3x the account median with 2 new hooks, retire the bottom half (strategy §7, day 7). Boost candidates (`b5`) qualify only from 9 Nov and only with a tracked sale.


## 3. Launch week: the 10 P0 videos, specs

#### V01 · The Fly-over, pinned: 'We launched today'

`demo` · **P0** · week 1 (26 Oct-1 Nov) · `live` · all · lane A+B · 17 s · effort low

**Platforms:** TikTok, Instagram Reels, YouTube Shorts, X, LinkedIn

**Hook (first 2 s):** "We launched today. This is the real studio."  
*Visual:* Frame 0 of the v9 Fly-over: the real makeborne.com home page already lifting toward camera (never black), headline text over the top third.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | v9 frame 0, camera already moving over the real home page | We launched today. This is the real studio. | None (music only), or founder: 'We launched today.' |
| 2-12s | v9 fly-over continues: composer, mode chips, style cards, client steps lift off the page | Websites. Books. Decks. | None |
| 12-14.5s | v9 end line | One idea. Every possibility. | None |
| 14.5-17s | New 2.5 s end card on canvas #F8F7F4, flat m, Inter display | makeborne.com · from $20/mo + tax · full refund until you use credits | None |

- **CTA:** Pinned post. TikTok: 'Link in bio, or DM me SITE'. Instagram: 'Comment SITE for the link and 3 briefs to copy'. X/LinkedIn: link in the first reply/comment.
- **Caption:** We launched Makeborne today: an AI studio that makes websites, books and presentations from one brief, plus client review links. From $20/month + tax. Full refund until you use credits. Comment SITE and I'll send the link.
- **Hashtags:** #makeborne #websitedesign #pitchdeck #buildinpublic
- **Sound:** IG/LinkedIn/X/YouTube: the film's Mixkit 'Opalescent' mix as recorded in the film notes (licence text unread on 26 Oct [U]; re-read before any paid use). TikTok: swap to a Commercial Music Library track until the Mixkit licence is confirmed for TikTok commercial use.
- **Shot list:** No new filming. Re-export v9 9:16 with a 2-3 s end card appended; 16:9 version from the 4K render for X and LinkedIn; 4:5 recomposed from the 5:4 master for Instagram feed (recompose, never crop a 16:9 master); Cover frame: a moving frame of the home page with the hook text centred
- **Assets needed:** 2.5 s end card (HyperFrames, house tokens); Side-by-side check of v9 frames against today's live home page (captured 14 Oct); Hook text overlay inside the safe zone
- **Reuse from the films folder:** `film library (private)/v9-flyover/renders/makeborne-v9-flyover-9x16-1080x1920-60fps.mp4`; `film library (private)/v9-flyover/renders/makeborne-v9-flyover-16x9-3840x2160-60fps.mp4`; `film library (private)/v9-flyover/renders/makeborne-v9-flyover-master-1440x1152-60fps.mp4`
- **Checks before posting:** Home page in the film must still match the live page; if a section changed, cut before it · The page shows style previews labelled as AI concepts: keep that label readable or cut those frames · End card must not say free or trial
- **Tracking:** `makeborne.com/go/ig-v01`, `makeborne.com/go/li-v01`, `makeborne.com/go/tt-v01`, `makeborne.com/go/x-v01`, `makeborne.com/go/yt-v01`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v01-l1`
- **Why it works:** The only finished, honest brand film in the bank: it shows the real home page (research/creative-assets.md §2.1, §3). Polished films earn mostly paid reach, so it is a pinned trust asset and a paid-test candidate, not the volume engine (research/short-form-video.md §14).

#### V02 · One brief in, a whole website out (bakery speedrun)

`speedrun` · **P0** · week 1 (26 Oct-1 Nov) · `live` · icp4 · lane A+B · 32 s · effort low

**Platforms:** TikTok, Instagram Reels, YouTube Shorts, X

**Hook (first 2 s):** "One brief in. A whole website out."  
*Visual:* Frame 0: the finished bakery site scrolling on a phone (390-wide capture), the brief pinned on top as a sentence chip.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Finished site scrolling on a phone; sentence chip 'A website for a family bakery in Leeds that opens at 7.' | One brief in. A whole website out. | One brief. Watch. |
| 2-5s | Hard cut to the real composer at 2x UI scale; the brief is typed by hand; Plan, then Create | Timer's on. | I type a brief about a bakery. |
| 5-20s | The build streams in the studio; cut-ins on headline, menu and opening hours. Clock chip: '[real time]' filled from the recording, or 'sped up ×N' if compressed. Never show compressed time as real time. | Headline. / Menu. / Opening hours. | It writes the page, picks the type, lays out the menu. |
| 20-28s | One chat edit ('make it warmer and put the opening hours at the top'); only that section changes; Publish; the real Makeborne address appears | Live. [real time] | One edit, publish, and it's live on a Makeborne address. |
| 28-32s | Back to the frame-0 phone shot so it loops | What should I build next? Comment it. | Tell me what to build next. |

- **CTA:** 'DM me SITE' (TikTok, bio link) / 'Comment SITE' (Instagram DM with link, 3 briefs and the uncut build).
- **Caption:** AI website for a bakery from one brief, real build, one edit, published. From $20/month + tax, full refund until you use credits. Comment SITE for the brief I used.
- **Hashtags:** #websitedesign #smallbusiness #aiwebsitebuilder #bakery
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Composer, typed live at 2x UI scale; Studio build, full uncut recording (keep it for the 90-150 s full cut and the landing page); One chat edit; Publish dialog and the live address in a browser; 390-wide phone scroll of the published site for frame 0 and the loop
- **Assets needed:** A clean demo account; One fictional brief; check the business name the build invents against real trademarks and local businesses; Clock chip graphic; Full 90-150 s cut from the same recording
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Builds take minutes (research/product-funnel-audit.md §2, step 9): the punch cut must carry the 'sped up ×N' chip · Say 'a Makeborne address', never 'your own domain' · No 'free'
- **Tracking:** `makeborne.com/go/ig-v02`, `makeborne.com/go/tt-v02`, `makeborne.com/go/x-v02`, `makeborne.com/go/yt-v02`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v02-r3`
- **Budget line:** b5 (boost candidate only if it passes the qualify rule)
- **Why it works:** Result-first speedruns are the highest-converting format for a paid-only tool: the viewer sees the exact job they would pay for (research/short-form-video.md §3, formats 1-2). TikTok wants the proposition inside 3 s [F, TikTok Ads Help, Jun 2025].

#### V03 · Pitch deck from one brief

`speedrun` · **P0** · week 1 (26 Oct-1 Nov) · `live` · icp2 · lane B · 30 s · effort low

**Platforms:** TikTok, Instagram Reels, YouTube Shorts, LinkedIn, X

**Hook (first 2 s):** "Pitch deck from one brief. Timer's on."  
*Visual:* Frame 0: the finished title slide and a chart slide fanned on the canvas, the brief as a sentence chip above.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Finished deck: title slide, then the chart slide slides in | Pitch deck from one brief. Timer's on. | One brief. A whole pitch deck. |
| 2-5s | Composer set to Presentation; brief typed: 'A 10-slide pitch for a bike repair shop raising money for a second workshop.' | One brief. | Presentation, one brief, create. |
| 5-20s | Slides arrive one by one, dealt on the beat. Clock chip: '[real time]' filled from the recording, or 'sped up ×N' if compressed. Never show compressed time as real time. | Story. / Numbers. / The ask. | It builds the story, the numbers slide and the ask. |
| 20-27s | Export PPTX; the file opens in PowerPoint; click the chart: it's a real chart object | Opens in PowerPoint. Real chart. | And it opens in PowerPoint. That chart is real, not a picture. |
| 27-30s | Back to the frame-0 fan | Comment DECK. | Comment DECK and I'll send the brief. |

- **CTA:** 'Comment DECK' (Instagram) / 'DM me DECK' (TikTok) / link in first comment (LinkedIn, X).
- **Caption:** How to make a pitch deck from one brief, then open it in PowerPoint with a real, editable chart. From $20/month. Comment DECK for the brief.
- **Hashtags:** #pitchdeck #presentation #powerpoint #startup
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Composer in Presentation mode; Uncut deck build; PPTX export and open in PowerPoint; Click-to-select the chart, data sheet open
- **Assets needed:** Fictional brief (no real company); PowerPoint on the recording machine; Clock chip
- **Reuse from the films folder:** `film library (private)/v12/assets/real/book_sheet.jpg, deck_sheet.jpg (deck_sheet.jpg as a frame-0 fallback; never let the 'Tern' name be legible)`
- **Checks before posting:** Use the measured time; strategy hook D1 says '40 seconds' only if that is the real time · Decks are typography-led today: no generated images on any slide
- **Tracking:** `makeborne.com/go/ig-v03`, `makeborne.com/go/li-v03`, `makeborne.com/go/tt-v03`, `makeborne.com/go/x-v03`, `makeborne.com/go/yt-v03`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v03-d1`
- **Budget line:** b5 (boost candidate only if it qualifies)
- **Why it works:** ICP 2's job is 'notes in, editable deck out'. Gamma's creators win with one input and one finished result (research/creative-assets.md §5.1); the PPTX proof answers 'is it a picture?' before it is asked.

#### V04 · Replying to @___: here's your bakery's website (comment-reply series)

`speedrun` · **P0** · week 1 (26 Oct-1 Nov) · `live` · icp4 · lane A+B · 32 s · effort low

**Platforms:** TikTok, Instagram Reels

**Hook (first 2 s):** "Replying to @___: here's your bakery's website."  
*Visual:* Frame 0: the TikTok reply bubble with the commenter's request, over the finished site scrolling on a phone.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Reply bubble ('can you do one for a bakery in Porto?') over the finished site on a phone | Replying to @___: here's your bakery's website. | You asked for a bakery in Porto. Here it is. |
| 2-5s | Composer: the commenter's own words pasted as the brief | Your words. Timer's on. | I paste exactly what you wrote. |
| 5-20s | Build streams; cut-ins. Clock chip: '[real time]' filled from the recording, or 'sped up ×N' if compressed. Never show compressed time as real time. | 3-5 word labels | Here's the menu, the hours, the story. |
| 20-28s | One edit the commenter asked for; preview (published only with their written OK) | Built. [real time] | One change, and that's yours. |
| 28-32s | Loop to frame 0 | Comment your business. I'll build the next one. | Comment your business and I'll build the next one. |

- **CTA:** 'Comment your business, I'll build the next one.' Pinned comment: makeborne.com/go/tt-v04 (text).
- **Caption:** Built a bakery website for a commenter from one brief. Comment your business type and city and I'll build the next one. From $20/month + tax, full refund until you use credits.
- **Hashtags:** #websitedesign #smallbusiness #replyingtocomments #aiwebsitebuilder
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Screenshot of the comment (handle blurred unless they agree to be shown); Composer and build; Phone scroll of the result; Loop frame
- **Assets needed:** A private consent log of requests and written OKs (never in this repo); Template project per business type to keep it under 45 minutes
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Only for someone who asked · Public information only; no personal data · Unpublished by default; publish only with written OK · Never imply the business endorses Makeborne · If the commenter names no real business, build a fictional one of that type
- **Tracking:** `makeborne.com/go/ig-v04`, `makeborne.com/go/tt-v04`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v04-r2`
- **Budget line:** b5 (boost candidate only if it qualifies)
- **Why it works:** The comment becomes the next video, so the series feeds itself and the commenter shares it (research/short-form-video.md §0.3, §3). Plan rule D15 allows it with consent.

#### V05 · POV: the client says 'make it pop' for the 9th time

`POV` · **P0** · week 1 (26 Oct-1 Nov) · `live` · icp1 · lane A · 28 s · effort med

**Platforms:** TikTok, Instagram Reels, LinkedIn, YouTube Shorts

**Hook (first 2 s):** "POV: the client says 'make it pop' for the 9th time."  
*Visual:* Frame 0: an email notification stack, the top one reading 'can you make it pop?', a small '9' badge, freelancer's hand on the trackpad.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Email stack with 'make it pop' (invented names, no real inbox) | POV: 'make it pop' for the 9th time. | None (sigh), or: 'Ninth time.' |
| 2-6s | Freelancer copies a client review link from the project instead of replying | So I sent one link instead. | So I stopped replying and sent one link. |
| 6-14s | Phone, client side: the live site opens with no account; tap on the hero; type 'warmer colours, bigger phone number' | Client comments on the live site. No account. | My client taps the exact spot and comments. No account, no screenshots. |
| 14-22s | Laptop: the comment appears; freelancer types the change in chat; only that section changes | Fix exactly that. | I fix exactly that. |
| 22-28s | Phone: client taps Approve; the approved state appears | Approved. | And they approve it. Done. |

- **CTA:** 'Comment CLIENT' (Instagram DM: the client-work page, Studio plan, 3 briefs). LinkedIn: link in the first comment.
- **Caption:** How freelancers get client approval in one link: the client comments on the live site, no account, then taps Approve. Studio plan $49/month, best for client work. Comment CLIENT.
- **Hashtags:** #freelancer #webdesigner #clientwork #agencylife
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts. LinkedIn cut: no music, captions only.
- **Shot list:** Inbox prop (made-up names and addresses); Copy review link in the studio; Phone screen recording of the review page (comment, Approve); Laptop: comment arrives, chat fix; Over-shoulder hand shot for texture
- **Assets needed:** A demo client project and a review link on a test account; A second phone or browser profile to play the client; Burned-in captions
- **Reuse from the films folder:** `film library (private)/v14/renders/v14_draft_1080p60.mp4 (25.7-29.1 s client comment/fix/Approve segment as a motion reference only; it shows a concept slide, so prefer a fresh real capture)`
- **Checks before posting:** Review links expire after 3-90 days (default 14): show only what the review page really shows · Never show a real client
- **Tracking:** `makeborne.com/go/ig-v05`, `makeborne.com/go/li-v05`, `makeborne.com/go/tt-v05`, `makeborne.com/go/yt-v05`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v05-f2`
- **Budget line:** b5 (boost candidate only if it qualifies)
- **Why it works:** This is the paying ICP's pain (revision rounds) and the Studio plan's reason to exist. Real people on screen lift LinkedIn video engagement (+14%, face to camera +34%) [F, LinkedIn Creative Labs via PPC Land, Jul 2025]. It also seeds the review-page loop.

#### V06 · It's a real chart, not a picture

`demo` · **P0** · week 1 (26 Oct-1 Nov) · `live` · icp2 · lane B · 25 s · effort low

**Platforms:** TikTok, Instagram Reels, LinkedIn, X

**Hook (first 2 s):** "It's a real chart, not a picture."  
*Visual:* Frame 0: a cursor clicking a bar on a finished slide and the chart's selection handles appearing in PowerPoint.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Click on the chart in PowerPoint; selection handles appear | It's a real chart, not a picture. | This chart is real. Watch. |
| 2-8s | Split frame: the slide before and after a one-value edit in chat ('change Q2 to 21') | Change one thing. | I asked for one change. |
| 8-14s | Only the one bar moves; everything else stays exactly put | Only that thing changes. | Only that value moved. Nothing else touched. |
| 14-21s | PPTX opens in PowerPoint; chart data sheet opens; type a number; the bar updates | Opens in PowerPoint. Edit the data. | Download it, open it in PowerPoint, edit the data yourself. |
| 21-25s | Back to frame 0 | Comment DECK. | Comment DECK. |

- **CTA:** 'Comment DECK' / link in first comment.
- **Caption:** AI pitch deck you can actually edit: the chart opens in PowerPoint as a real chart. Change one value and only that value changes. Comment DECK.
- **Hashtags:** #powerpoint #pitchdeck #consulting #presentation
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** The v12 before/after of slide 6 as the split frame; Fresh capture of a chat edit on a new fictional deck; PowerPoint chart-data editing at 2x scale
- **Assets needed:** A new fictional deck for the PowerPoint segment; Crop to hide any brand name on the v12 slides
- **Reuse from the films folder:** `film library (private)/v12/assets/real/deck/slide-06.png`; `film library (private)/v12/assets/real/deck-edit/slide-06.png (real product runs: 12, 18, 25, 30 -> 12, 21, 25, 30; the 'Tern' name must never be legible, slide 6 is safe)`
- **Checks before posting:** Confirm on the launch build that exported charts are native PPTX charts before posting
- **Tracking:** `makeborne.com/go/ig-v06`, `makeborne.com/go/li-v06`, `makeborne.com/go/tt-v06`, `makeborne.com/go/x-v06`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v06-d3`
- **Why it works:** The most honest precision demo in the bank (research/creative-assets.md §3, 'Change one thing. Only that thing changes.'). It answers the 'is it just a picture/template?' objection (strategy §4.4).

#### V07 · I found 20 local businesses to pitch, before lunch

`demo` · **P0** · week 1 (26 Oct-1 Nov) · `live` · icp1 · lane A · 40 s · effort med

**Platforms:** TikTok, Instagram Reels, LinkedIn, YouTube Shorts

**Hook (first 2 s):** "I found 20 local businesses to pitch in [real time]."  
*Visual:* Frame 0: the lead finder results list filling in (names, addresses and contacts blurred), a counter ticking to 20.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Results list filling, details blurred | I found 20 local businesses to pitch in [real time]. | Twenty local businesses to pitch. Here's how. |
| 2-10s | Lead finder: 'Local businesses', type 'dentists', city 'Austin, Texas', how many: 20; start search | Business type. City. Go. | I pick a business type and a city. |
| 10-20s | Results with what the finder really shows (e.g. found on the web, public contact or 'No public email'); save the best ones to the CRM | Save the good ones. | I save the ones worth pitching straight into my CRM. |
| 20-32s | CRM board: leads in stages; open one; build a demo site from a brief written for that type of business (fictional demo content) | Then build them something. | Then I build a first version I can show them. |
| 32-40s | Create a review link for the demo; move the card to 'Demo sent' | Send the link. Track the follow-up. | Send the link, track the follow-up. Comment CLIENT. |

- **CTA:** 'Comment CLIENT' / LinkedIn link in first comment.
- **Caption:** How freelancers find local businesses to pitch: lead finder, a demo site and a review link, tracked in a basic CRM. Studio plan, best for client work. Comment CLIENT.
- **Hashtags:** #freelancer #webdesign #leadgeneration #clientwork
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Lead finder search (map search only); Results list, blurred; Save to CRM; CRM stages; Demo build and review link
- **Assets needed:** Blur mask for every business name, address, phone and email; A fictional demo brief for the business type; Clock chip
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Show only steps that are live in production: before filming, confirm which lead-finder steps (profile reading, ranking for your offer, 'redesign their website') ship today; anything that belongs to AI lead research is a later beat · Do not claim 'no website' unless the finder shows that field · No automated cold email; never headline 'email outreach' (strategy risk 21) · Do not build or publish a site for a real business without its written OK
- **Tracking:** `makeborne.com/go/ig-v07`, `makeborne.com/go/li-v07`, `makeborne.com/go/tt-v07`, `makeborne.com/go/yt-v07`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v07-f4`
- **Why it works:** 'Win before the call' is pillar 1 for the paying ICP; the lead finder is live and few competitors bundle it with the builder (strategy §4.2). Hook F4 from the plan.

#### V08 · Founder Day 1: we launched, comment what to build first

`founder` · **P0** · week 1 (26 Oct-1 Nov) · `live` · icp1 · lane A · 45 s · effort low

**Platforms:** LinkedIn, TikTok, Instagram Reels, X

**Hook (first 2 s):** "We launched today. Comment what you want built first."  
*Visual:* Frame 0: founder face to camera at the desk in Sarajevo, laptop showing a finished site; caption bar 'Day 1'.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Founder to camera, laptop visible | Day 1. We launched today. | We launched Makeborne today. |
| 2-12s | Cut to a real build clip (from V02) playing on the laptop | Websites. Books. Decks. | It makes websites, books and presentations from one brief. |
| 12-24s | Phone: a client review link, comment, Approve (from V05) | And your client approves on one link. | And it's built for client work: your client comments on the live site and approves it. |
| 24-36s | Founder to camera | From $20/mo + tax. Full refund until you use credits. | It's paid from day one, from twenty dollars a month. If you don't use a credit, you get every cent back. |
| 36-45s | Founder to camera, smiling | Comment what I should build first. | Comment what you want built first, and I'll build it on camera. |

- **CTA:** Comment what to build first (feeds V04). LinkedIn/X: link in the first comment/reply.
- **Caption:** Day 1. I launched Makeborne today: an AI studio for client work, from Sarajevo. Websites, books and decks from one brief, plus client review links. From $20/month + tax, full refund until you use credits. Comment what I should build first.
- **Hashtags:** #buildinpublic #startup #freelancer #sarajevo
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Face to camera, window light, phone at eye level; B-roll from V02 and V05 captures
- **Assets needed:** V02 and V05 recordings; Day-N caption bar template
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Say 'a small studio' unless 'solo founder' is literally true · No competitor valuation numbers unless re-checked on the posting day
- **Tracking:** `makeborne.com/go/ig-v08`, `makeborne.com/go/li-v08`, `makeborne.com/go/tt-v08`, `makeborne.com/go/x-v08`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v08-p4`
- **Why it works:** Building in public on LinkedIn is what Base44's founder credits [F, self-reported, CEO Insider 4 Aug 2025]. The comment ask feeds the comment-reply series.

#### V09 · Founder Day 7: exactly how many people paid

`founder` · **P0** · week 1 (26 Oct-1 Nov) · `live` · icp1 · lane A · 60 s · effort low

**Platforms:** LinkedIn, X, TikTok, Instagram Reels

**Hook (first 2 s):** "Day 7: here's exactly how many people paid."  
*Visual:* Frame 0: founder to camera holding the phone with a cropped Whop payments screen (buyer data hidden), the payer count readable.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Founder with cropped Whop screen | Day 7: exactly how many people paid. | Seven days in. Here's exactly how many people paid. |
| 2-15s | Screen: payer count, refunds, MRR (real numbers, buyer data cropped) | [N] paid · [N] refunded · $[MRR] | [N] people paid, [N] asked for a refund, and that's [MRR] a month. |
| 15-35s | Founder to camera; cut-ins of what people built (only with consent) | What worked. What broke. | Here's what worked, and here's what broke. |
| 35-50s | Screen: the post or source that sold most (from /go/ data) | Best source: [source] | The best source this week was [source]. |
| 50-60s | Founder to camera | Next week: [one thing] | Next week I'm doing [one thing]. Follow for day 14. |

- **CTA:** Follow for Day 14. Link in first comment.
- **Caption:** Day 7 of launching an AI studio for client work from Sarajevo, with every number in public: [N] payers, [N] refunds, $[MRR] MRR. What worked and what broke.
- **Hashtags:** #buildinpublic #indiehackers #startup #saas
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Face to camera; Cropped screen recordings of Whop and the /go/ source report
- **Assets needed:** Sunday numbers from the weekly source report; Crop/blur every buyer name and email
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Real numbers only, refunds included; never round up · No buyer data on screen
- **Tracking:** `makeborne.com/go/ig-v09`, `makeborne.com/go/li-v09`, `makeborne.com/go/tt-v09`, `makeborne.com/go/x-v09`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v09-p2`
- **Why it works:** Public numbers are the trust engine and a free press angle (D11, D19). Cluely's numbered episodes had a median of 552K TikTok views [F, public counts via viral.app, Oct 2026], although its views did not convert, which is why this series carries real product proof too.

#### V10 · One brief: the site, the pitch deck and the client guide

`demo` · **P0** · week 1 (26 Oct-1 Nov) · `live` · icp1 · lane A · 30 s · effort med

**Platforms:** TikTok, Instagram Reels, YouTube Shorts, LinkedIn, X

**Hook (first 2 s):** "One brief. The website, the deck and the client guide."  
*Visual:* Frame 0: three finished outputs in one brand side by side (phone site, deck slide, book page), the brief chip above them.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Three outputs in one brand | One brief. Website, deck and guide. | One brief. Three client deliverables. |
| 2-10s | Composer: Website mode, brief; build (sped-up chip) | 1. The website | First the website. |
| 10-18s | Switch to Presentation with the same brief; deck arrives | 2. The pitch deck | Same brief, now the pitch deck. |
| 18-26s | Switch to Book: a client welcome guide; page riffle | 3. The client guide | And a welcome guide for the client. |
| 26-30s | All three again | Comment CLIENT. | Comment CLIENT for the brief. |

- **CTA:** 'Comment CLIENT'.
- **Caption:** One brief, three client deliverables: a website, a pitch deck and a welcome guide in one brand. Studio $49/month, best for client work. Comment CLIENT.
- **Hashtags:** #freelancer #agencylife #clientwork #webdesign
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Three builds from the same brief (record each uncut); Book page riffle; Hero three-up composition on canvas
- **Assets needed:** One fictional client brief; Three-up layout template
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** These are three builds from one brief, not one click: say 'same brief', never 'it made all three automatically' · Books are for screen and PDF; do not say print-ready
- **Tracking:** `makeborne.com/go/ig-v10`, `makeborne.com/go/li-v10`, `makeborne.com/go/tt-v10`, `makeborne.com/go/x-v10`, `makeborne.com/go/yt-v10`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v10-x2`
- **Why it works:** Pillar 3 'one brief, three deliverables' is the line no single competitor covers (strategy §3.2, §4.2): Lovable and Base44 build apps, Gamma builds decks.


## 4. The rest of the library, grouped by format

Within each format, live videos come first (by week), then beat videos, which must not be posted until their feature passes the gate.


### 4.1 speedrun (3)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V27 | Coaches: your lead magnet guide, written in one sitting | P1 | 3 | `live` |
| V41 | Your 2027 pitch deck, from your 2026 notes | P1 | 11 | `live` |
| V57 | Comment your business: built and live on its own domain | P2 | 7 | `beat:custom-domains` |

#### V27 · Coaches: your lead magnet guide, written in one sitting

`speedrun` · **P1** · week 3 (9-15 Nov) · `live` · icp3 · lane B · 35 s · effort low

**Platforms:** Instagram Reels, TikTok, LinkedIn

**Hook (first 2 s):** "Coaches: your lead magnet, written before your coffee's cold."  
*Visual:* Frame 0: a finished guide cover on a tablet next to a steaming coffee cup.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Guide cover + coffee | Your lead magnet, before your coffee's cold. | Your lead magnet, before your coffee goes cold. |
| 2-8s | Composer, Book mode: '7-day guide to sleeping better for new parents, by a sleep coach' | One brief. | One brief about what you teach. |
| 8-25s | Build (chip); page riffle | Chapters. Checklists. Your voice. | Chapters, checklists, a 7-day plan. |
| 25-35s | Export PDF; it lands in an email draft | Export the PDF. | Export the PDF and give it away. Comment BOOK. |

- **CTA:** 'Comment BOOK'.
- **Caption:** How coaches can make a lead magnet guide from one brief: chapters, checklists, exported as a PDF. Comment BOOK for the brief.
- **Hashtags:** #coach #leadmagnet #onlinecoach #ebook
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Coffee hero shot; Book build capture; PDF export
- **Assets needed:** Fictional coach topic; Real coffee
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Text-led; no generated cover images · Tell coaches to review content for accuracy (health topics especially)
- **Tracking:** `makeborne.com/go/ig-v27`, `makeborne.com/go/li-v27`, `makeborne.com/go/tt-v27`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v27-b5`
- **Why it works:** ICP 3 job ('package expertise as a book to give away'), with a cheap build (books cost about $0.27-0.42 of provider cost) [F, product-funnel-audit §8.1].

#### V41 · Your 2027 pitch deck, from your 2026 notes

`speedrun` · **P1** · week 11 (4-10 Jan) · `live` · icp2 · lane B · 30 s · effort low

**Platforms:** LinkedIn, TikTok, Instagram Reels

**Hook (first 2 s):** "Your 2027 pitch deck, from your 2026 notes."  
*Visual:* Frame 0: a title slide reading '2027 plan' flipping up out of a pile of notes.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Title slide out of notes | Your 2027 deck, from your 2026 notes. | Your 2027 deck, from your 2026 notes. |
| 2-20s | Paste notes, build (chip), slides | Paste. Build. | Paste last year's notes. |
| 20-30s | Export PPTX; chart click | Opens in PowerPoint. | Edit it in PowerPoint. Comment DECK. |

- **CTA:** 'Comment DECK'.
- **Caption:** New year planning deck: paste your 2026 notes, get an editable 2027 pitch deck. Comment DECK.
- **Hashtags:** #newyear #pitchdeck #planning #consultant
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Notes prop; Build; PowerPoint
- **Assets needed:** Bank in week 9 (half cadence)
- **Reuse from the films folder:** none (new capture)
- **Tracking:** `makeborne.com/go/ig-v41`, `makeborne.com/go/li-v41`, `makeborne.com/go/tt-v41`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v41-d4`
- **Why it works:** 'New year, new clients' window in phase 3 (from 4 Jan).

#### V57 · Comment your business: built and live on its own domain

`speedrun` · **P2** · week 7 (7-13 Dec) · `beat:custom-domains` · icp4 · lane B · 35 s · effort med

**Platforms:** TikTok, Instagram Reels

**Hook (first 2 s):** "Replying to @___: built, and live on your own domain."  
*Visual:* Frame 0: reply bubble over the finished site with the business's own domain in the address bar.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Reply bubble + domain | Built. On your own domain. | Built, and live on your own domain. |
| 2-22s | Brief, build (chip), one edit | Clock chip: '[real time]' filled from the recording, or 'sped up ×N' if compressed. Never show compressed time as real time. | Your words, one build, one edit. |
| 22-32s | Connect the domain they already own (only with their OK and their own DNS access) | Your domain. | Then it goes on the domain you already own. |
| 32-35s | Loop | Comment your business. | Comment your business. |

- **CTA:** 'Comment your business'.
- **Caption:** Built a small business website from a comment and put it on the business's own domain. Comment yours.
- **Hashtags:** #smallbusiness #websitedesign #replyingtocomments
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** As V04 plus the domain step
- **Assets needed:** Written OK; the business connects its own DNS (we never handle their credentials)
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · Same consent rules as V04 · We never log in to a customer's registrar
- **Tracking:** `makeborne.com/go/ig-v57`, `makeborne.com/go/tt-v57`; `utm_campaign=domains-beat`, `utm_content=<surface>-v57-cd2`
- **Why it works:** ICP 4 moves from light to full push only after domains pass the gate (strategy §3.1).


### 4.2 before-after (3)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V14 | My slides vs the deck I made from the same notes | P1 | 2 | `live` |
| V48 | A dated website vs a first version from one brief | P2 | 4 | `live` |
| V49 | Same brief, now with its own images (before/after) | P1 | 3 | `beat:images` |

#### V14 · My slides vs the deck I made from the same notes

`before-after` · **P1** · week 2 (2-8 Nov) · `live` · icp2 · lane B · 27 s · effort low

**Platforms:** TikTok, Instagram Reels, LinkedIn, X

**Hook (first 2 s):** "My slides vs. the deck I made from the same notes. Be honest."  
*Visual:* Frame 0: split screen, left a cramped bullet-point slide, right the finished Makeborne slide.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Split screen | My slides vs. the same notes in Makeborne. | Same notes. Be honest. |
| 2-10s | Left: flick through 4 cramped slides made by hand | Before: 2 hours | This is mine. Two hours. |
| 10-20s | Right: paste the notes; build (chip); slides dealt in | After: [real time] | Same notes, pasted in. |
| 20-27s | Both side by side; poll sticker | Left or right? | Left or right? Comment. |

- **CTA:** 'Comment DECK'.
- **Caption:** Before and after: my hand-made slides vs a deck built from the same notes, exported to PowerPoint. Which would you present? Comment DECK for the brief.
- **Hashtags:** #pitchdeck #beforeandafter #presentation #consultant
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Make the 'before' deck honestly (founder's own notes, fictional company); Uncut after build
- **Assets needed:** Before deck; Fictional notes
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** The 'before' must be genuinely ours; never use someone else's deck
- **Tracking:** `makeborne.com/go/ig-v14`, `makeborne.com/go/li-v14`, `makeborne.com/go/tt-v14`, `makeborne.com/go/x-v14`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v14-d2`
- **Why it works:** Before/after was Gamma's highest-engagement creator angle [V, Passionfroot Q2 2025; LightReel 24 Oct 2026].

#### V48 · A dated website vs a first version from one brief

`before-after` · **P2** · week 4 (16-22 Nov) · `live` · icp4 · lane B · 25 s · effort med

**Platforms:** TikTok, Instagram Reels

**Hook (first 2 s):** "Your 2014 website vs. a first version from one brief."  
*Visual:* Frame 0: split screen; left a deliberately dated fictional site we built, right the new one.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Split | 2014 vs one brief. | Left: 2014. Right: one brief. |
| 2-15s | Scroll both; brief chip on the right | Same business. One brief. | Same business, one brief. |
| 15-25s | Phone view of the new one; publish | A first version, before you hire anyone. | A first version before you hire a designer. Comment SITE. |

- **CTA:** 'DM me SITE'.
- **Caption:** Before and after: a dated small business website vs a first version built from one brief. Fictional business.
- **Hashtags:** #beforeandafter #websitedesign #smallbusiness
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Build the dated 'before' ourselves; New build
- **Assets needed:** Fictional dated site
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Never a real business's site without written OK · Brand TikTok only: softened lane wording ('a first version before you hire a designer'), never on Lane A surfaces
- **Tracking:** `makeborne.com/go/ig-v48`, `makeborne.com/go/tt-v48`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v48-r5`
- **Why it works:** Before/after is a high-conversion format (research/short-form-video.md §3, format 3), kept to Lane B per the lane rule.

#### V49 · Same brief, now with its own images (before/after)

`before-after` · **P1** · week 3 (9-15 Nov) · `beat:images` · all · lane A+B · 30 s · effort med

**Platforms:** TikTok, Instagram Reels, YouTube Shorts, LinkedIn, X

**Hook (first 2 s):** "Same brief. Yesterday vs today."  
*Visual:* Frame 0: split screen of the same site, left typography-only, right with generated images in the hero.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Split screen | Same brief. Now with images. | Same brief. Now it makes the images too. |
| 2-12s | Site before/after | Sites | Sites. |
| 12-20s | Deck: full-image slide before/after | Decks | Decks, with full-image slides. |
| 20-27s | Book cover/spread before/after | Books | And books. |
| 27-30s | End card | makeborne.com · from $20/mo + tax · full refund until you use credits | Comment SITE. |

- **CTA:** Comment SITE / DECK / BOOK; launch page /launch/images.
- **Caption:** New: Makeborne now makes the images for your websites, decks and books. Same brief, before and after. From $20/month.
- **Hashtags:** #newfeature #websitedesign #pitchdeck #ebook
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Same 3 briefs run before and after on the shipped version
- **Assets needed:** Real image-pipeline outputs from the shipped version only (not pre-release quality runs); AI-image marking per EU AI Act Art. 50(2) check [U]; PH100 code on screen if live
- **Reuse from the films folder:** `film library (private)/v14/gen/sheet_v14.jpg as the quality target only (concept art, never shown as product output)`
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · No photoreal people unless labelled · Check generated business names and any visible text in images
- **Tracking:** `makeborne.com/go/ig-v49`, `makeborne.com/go/li-v49`, `makeborne.com/go/tt-v49`, `makeborne.com/go/x-v49`, `makeborne.com/go/yt-v49`; `utm_campaign=images-beat`, `utm_content=<surface>-v49-i1`
- **Budget line:** Uneed b6 runs the same day
- **Why it works:** Newness is among the highest hit-rate hook types [V, Motion 2026]; the before/after proves the upgrade on our own briefs.


### 4.3 POV (1)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V26 | POV: the client wants last year's deck at 5 p.m. | P2 | 4 | `live` |

#### V26 · POV: the client wants last year's deck at 5 p.m.

`POV` · **P2** · week 4 (16-22 Nov) · `live` · icp2 · lane A · 20 s · effort low

**Platforms:** TikTok, Instagram Reels

**Hook (first 2 s):** "POV: 4:58 p.m. 'Can you resend last year's deck?'"  
*Visual:* Frame 0: a phone notification over a clock reading 4:58.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Notification over clock | 4:58 p.m. 'Resend last year's deck?' | None |
| 2-10s | Projects library: search, open the deck | Projects library | None (keys) |
| 10-16s | Change the year on the title slide in chat; export PPTX | One edit. Export. | None |
| 16-20s | Clock 5:00; laptop closes | 5:00. Done. | None |

- **CTA:** 'Comment DECK'.
- **Caption:** Every client site, deck and book in one projects library: find it, change one thing, export. Comment DECK.
- **Hashtags:** #freelancerlife #pitchdeck #workhacks #agencylife
- **Sound:** Commercial Music Library ticking or comedic track.
- **Shot list:** Notification prop; Projects library capture; Export
- **Assets needed:** Demo account with several projects
- **Reuse from the films folder:** none (new capture)
- **Tracking:** `makeborne.com/go/ig-v26`, `makeborne.com/go/tt-v26`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v26-f7`
- **Why it works:** Relatable POV with real UI; promotes the projects library, which is live.


### 4.4 tutorial (5)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V13 | How I get a client to approve a site in one link (tutorial) | P1 | 2 | `live` |
| V17 | How to put your AI-built site on GitHub (manual export) | P2 | 3 | `live` |
| V22 | How to make a website for your holiday rental (tutorial) | P1 | 3 | `live` |
| V23 | How to turn a messy brief into a pitch deck (tutorial) | P1 | 3 | `live` |
| V24 | The full client workflow, start to finish (long YouTube tutorial) | P1 | 3 | `live` |

#### V13 · How I get a client to approve a site in one link (tutorial)

`tutorial` · **P1** · week 2 (2-8 Nov) · `live` · icp1 · lane A · 75 s · effort med

**Platforms:** YouTube Shorts, TikTok, LinkedIn, Instagram Reels

**Hook (first 2 s):** "How I get a client to approve a site in one link."  
*Visual:* Frame 0: the 'Approved' state on a phone, then a rewind effect to the studio.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Approved state on phone | How I get approval in one link. | Here's how I get a client to approve a site in one link. |
| 2-20s | Studio: create a review link, choose expiry (3-90 days), copy | Step 1: create the review link | Step one: create a review link and pick how long it stays open. |
| 20-40s | Client phone: anonymous comment pinned to the section | Step 2: they comment on the live page | Step two: they comment right on the page. No account. |
| 40-60s | Studio: comments listed, fixes made in chat, new version | Step 3: fix in chat | Step three: I fix each comment in chat. |
| 60-75s | Client taps Approve; studio shows the decision | Step 4: Approve | Step four: they approve, and I have it in writing. Comment CLIENT. |

- **CTA:** 'Comment CLIENT' / YouTube: link in description to the client-work page.
- **Caption:** Client approval link tutorial: how to send a website for review, collect comments on the live page and get it approved. Works for sites, decks and books.
- **Hashtags:** #clientapproval #webdesign #freelancetips #tutorial
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Studio review-link dialog; Client phone capture; Comments list and chat fixes; Approve
- **Assets needed:** Demo project; Step captions
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Say 'review link', not 'client portal for agencies' (agency tools are a later beat)
- **Tracking:** `makeborne.com/go/ig-v13`, `makeborne.com/go/li-v13`, `makeborne.com/go/tt-v13`, `makeborne.com/go/yt-v13`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v13-f3`
- **Why it works:** Search intent ('client approval link') plus the Studio job; longer tutorials get more reach on TikTok (120-180 s about 10x the views of under-30 s) [F, Socialinsider H1 2026, 21 Aug 2026].

#### V17 · How to put your AI-built site on GitHub (manual export)

`tutorial` · **P2** · week 3 (9-15 Nov) · `live` · icp1 · lane A · 60 s · effort low

**Platforms:** X, YouTube Shorts, YouTube

**Hook (first 2 s):** "Your site isn't locked in. Here's the code on GitHub."  
*Visual:* Frame 0: the GitHub repo page with the exported site files and the README, split with the live site.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Split: live site and GitHub repo | Your site isn't locked in. | You own this. Here's the code on GitHub. |
| 2-20s | Studio: export to GitHub (manual) | Export to GitHub | From the studio, export to GitHub. |
| 20-40s | GitHub: files, README; or download the source ZIP | Or download the source | Or just download the source. |
| 40-60s | Founder voice over the repo | Manual export today. | It's a manual export today. Take your work anywhere. |

- **CTA:** Link in first reply (X) / description (YouTube).
- **Caption:** How to export an AI-built website to GitHub: a manual export of the full source, plus a source download any time.
- **Hashtags:** #github #webdev #nocode #freelancer
- **Sound:** Voice-over only (X and YouTube).
- **Shot list:** Export flow; Repo page; Source download
- **Assets needed:** A test GitHub account/repo with nothing private visible
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Never say 'sync' or imply edits flow back (two-way sync is beat:github-sync) · No tokens, org names or private repos on screen
- **Tracking:** `makeborne.com/go/x-v17`, `makeborne.com/go/yt-v17`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v17-t3`
- **Why it works:** Pillar 4 'you own it' answers lock-in fear; developers are not the ICP, so it stays on X and YouTube (strategy §9).

#### V22 · How to make a website for your holiday rental (tutorial)

`tutorial` · **P1** · week 3 (9-15 Nov) · `live` · icp4 · lane B · 90 s · effort med

**Platforms:** YouTube Shorts, TikTok, Instagram Reels

**Hook (first 2 s):** "How to make a website for your holiday rental, no code."  
*Visual:* Frame 0: the finished rental site on a phone, the 'Book a stay' section in view.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Finished site on phone | How to make a website for your rental. | Here's how to make a website for your holiday rental. |
| 2-20s | Brief written live: location, rooms, house rules, contact | Step 1: one detailed brief | Step one: describe the place in one detailed paragraph. |
| 20-50s | Build (chip); use your own photos if you have them | Step 2: build | Step two: build it. Use your own photos if you have them. |
| 50-75s | Edits in chat: house rules, check-in times | Step 3: edit in chat | Step three: tell it what to change. |
| 75-90s | Publish to a Makeborne address | Step 4: publish | Step four: publish. It's live on a Makeborne address. Comment SITE. |

- **CTA:** 'Comment SITE' / YouTube description link.
- **Caption:** How to make a website for your Airbnb or holiday rental without code: brief, build, edit, publish. From $20/month.
- **Hashtags:** #airbnbhost #holidayrental #howto #websitedesign
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Full tutorial capture; Step cards
- **Assets needed:** Fictional rental; founder's own photos only if used
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Check photo upload works on production before saying 'use your own photos' · No custom domain claim
- **Tracking:** `makeborne.com/go/ig-v22`, `makeborne.com/go/tt-v22`, `makeborne.com/go/yt-v22`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v22-t1`
- **Why it works:** Matches a real search query; TikTok search insights and transcripts feed discovery [S, Search Engine Land].

#### V23 · How to turn a messy brief into a pitch deck (tutorial)

`tutorial` · **P1** · week 3 (9-15 Nov) · `live` · icp2 · lane B · 90 s · effort med

**Platforms:** YouTube Shorts, TikTok, LinkedIn

**Hook (first 2 s):** "How to turn a messy brief into a pitch deck."  
*Visual:* Frame 0: a wall of messy pasted notes, then the finished title slide snapping in front of them.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Messy notes then finished slide | Messy brief → pitch deck | Messy notes in. Pitch deck out. |
| 2-25s | Paste notes into the composer, Presentation mode | Step 1: paste the mess | Paste the mess. Don't clean it up. |
| 25-55s | Build (chip); deck arrives | Step 2: build | Build it. |
| 55-75s | Chat edits: 'merge slides 3 and 4', 'make the ask clearer' | Step 3: edit in chat | Tell it what to change. |
| 75-90s | Export PPTX/PDF | Step 4: export | Export to PowerPoint or PDF. Comment DECK. |

- **CTA:** 'Comment DECK'.
- **Caption:** Pitch deck tutorial: paste messy notes, build, edit in chat, export to PowerPoint or PDF.
- **Hashtags:** #pitchdeck #howto #presentationtips #founder
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Full tutorial capture
- **Assets needed:** Fictional messy notes
- **Reuse from the films folder:** none (new capture)
- **Tracking:** `makeborne.com/go/li-v23`, `makeborne.com/go/tt-v23`, `makeborne.com/go/yt-v23`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v23-t2`
- **Why it works:** Search-led tutorial for ICP 2; LinkedIn video does best at 120-180 s in Socialinsider's H1 2026 data [F].

#### V24 · The full client workflow, start to finish (long YouTube tutorial)

`tutorial` · **P1** · week 3 (9-15 Nov) · `live` · icp1 · lane A · 540 s · effort high

**Platforms:** YouTube

**Hook (first 2 s):** "From finding a client to their approval, in one studio."  
*Visual:* Frame 0: a 3-panel cold open (lead list blurred, demo site, Approved stamp on a phone).

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-0:20 | Cold open: the three panels | Find → build → approve | In the next nine minutes: find a client, build their first version, and get it approved. |
| 0:20-2:30 | Lead finder and CRM | 1. Find and track | Finding local businesses and tracking them. |
| 2:30-5:00 | Demo site build from a brief, one edit, publish | 2. Build the first version | Building the first version they'll see. |
| 5:00-7:00 | Review link; client comments; fixes; Approve | 3. Review and approval | Sending the review link and getting the yes. |
| 7:00-8:30 | Deck and guide from the same brief; PPTX; manual GitHub export | 4. The extras | The proposal deck, the guide, and exporting the code. |
| 8:30-9:00 | Pricing and refund line | makeborne.com · from $20/mo + tax · full refund until you use credits | Studio is forty-nine a month. Full refund until you use credits. |

- **CTA:** Description link /go/yt-v24; chapters.
- **Caption:** How freelancers can run client website work in one place: lead finder, AI site build, client review link and approval, deck and GitHub export. Chapters below.
- **Hashtags:** #webdesign #freelancing #tutorial #clientwork
- **Sound:** Voice-over; no music under speech.
- **Shot list:** Screen capture at 2x UI scale; Face-cam corner optional; Chapter cards
- **Assets needed:** Thumbnail 1280x720 x3 for Test & Compare; Chapters
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Do not call it 'agency tools' (that's a beat) · Blur every real business in the lead finder
- **Tracking:** `makeborne.com/go/yt-v24`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v24-t4`
- **Why it works:** The plan's long tutorial every 2 weeks from week 3; Shorts link to it; YouTube Test & Compare picks thumbnails on watch time [V, SEJ / vidIQ Jul 2026].


### 4.5 slideshow (2)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V16 | 5 websites, each from one brief (swipe) | P1 | 2 | `live` |
| V29 | Made from one brief (daily 8-second series) | P1 | 2 | `live` |

#### V16 · 5 websites, each from one brief (swipe)

`slideshow` · **P1** · week 2 (2-8 Nov) · `live` · icp4 · lane B · 15 s · effort low

**Platforms:** TikTok, Instagram Reels

**Hook (first 2 s):** "5 websites, each from one brief. Swipe."  
*Visual:* Slide 1: the best output on a phone mockup, sentence chip under it, '1/5' marker.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| slide 1 (0-2s) | Best site on a phone, sentence chip | 5 websites, each from one brief. | None (music) |
| slides 2-5 | One real output per slide with its sentence chip and credits used | 'A site for a bouldering gym.' · [N] credits | None |
| slide 6 | CTA card | Comment SITE for all 5 briefs. | None |

- **CTA:** 'Comment SITE for all 5 briefs'.
- **Caption:** 5 AI websites made from one brief each, real outputs, unedited, with the credits each one used. Which one wins? Comment SITE for the briefs.
- **Hashtags:** #websitedesign #webdesigninspiration #smallbusiness #aiwebsitebuilder
- **Sound:** TikTok photo mode: Commercial Music Library track. Instagram carousel: no audio or a cleared library track.
- **Shot list:** Phone-mockup frames of 5 real fixture outputs; Sentence chip on every frame
- **Assets needed:** 5 real outputs; check every invented business name against real trademarks; never show the synthetic 'Tide Tables' fixtures or real-business redesigns
- **Reuse from the films folder:** Product repo real outputs (Relay Operations, Crux Yard, Osteria Brina and similar fixtures; 390-wide captures are native 9:16) - read only
- **Checks before posting:** Unedited outputs only; say so
- **Tracking:** `makeborne.com/go/ig-v16`, `makeborne.com/go/tt-v16`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v16-s1`
- **Why it works:** Carousels earn saves and comments at low effort [V, ttcalculator Q3 2025-Q1 2026]; Instagram carousels out-engage Reels in Buffer's 2026 data (6.9% vs 3.3%) [V, Buffer 19 Mar 2026].

#### V29 · Made from one brief (daily 8-second series)

`slideshow` · **P1** · week 2 (2-8 Nov) · `live` · icp4 · lane B · 8 s · effort low

**Platforms:** TikTok, Instagram Reels, YouTube Shorts

**Hook (first 2 s):** "'A site for my bouldering gym.' Made from that."  
*Visual:* Frame 0: the sentence chip alone on the canvas, then the finished site scroll starts.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Sentence chip on canvas | 'A site for my bouldering gym.' | None |
| 2-7s | 390-wide full-page scroll of the real output | Made from that brief. | None |
| 7-8s | Brand mark, loops to frame 0 | makeborne.com | None |

- **CTA:** Bio link; caption 'Comment SITE for the brief'.
- **Caption:** Made from one brief: a bouldering gym website, unedited. Comment SITE for the brief.
- **Hashtags:** #madewithmakeborne #websitedesign #webdesigninspiration
- **Sound:** Commercial Music Library loop; same sonic signature every episode.
- **Shot list:** One real output per day as a 390-wide scroll capture
- **Assets needed:** A queue of 30 real outputs, names checked
- **Reuse from the films folder:** Product repo 390-wide real-output captures (Relay Operations, Crux Yard and similar) - read only
- **Checks before posting:** One per day at most; a new output each time (no duplicate uploads)
- **Tracking:** `makeborne.com/go/ig-v29`, `makeborne.com/go/tt-v29`, `makeborne.com/go/yt-v29`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v29-s4`
- **Why it works:** Concept C6 in research/creative-assets.md: near-zero cost daily volume, and Buffer shows volume raises the 90th-percentile post (3,722 to 14,401 views) [F, Buffer 8 Oct 2025].


### 4.6 founder (7)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V11 | Founder: why there's no free plan | P1 | 2 | `live` |
| V31 | Founder Day 14: what broke this week | P1 | 2 | `live` |
| V44 | Who's behind this? A small studio in Sarajevo | P1 | 2 | `live` |
| V45 | I answered the first 100 support tickets myself. The top 3 questions. | P2 | 4 | `live` |
| V39 | Founder Day 30: every number in public | P1 | 5 | `live` |
| V43 | Founder Day 90: every number, including what failed | P1 | 13 | `live` |
| V54 | We're on Product Hunt today: the real thing, no upvote ask | P1 | 3 | `beat:images` |

#### V11 · Founder: why there's no free plan

`founder` · **P1** · week 2 (2-8 Nov) · `live` · icp1 · lane A · 50 s · effort low

**Platforms:** LinkedIn, X, TikTok, Instagram Reels

**Hook (first 2 s):** "Everyone said 'add a free plan'. Here's why I didn't."  
*Visual:* Frame 0: founder to camera, pricing page on the laptop behind, the three plan cards readable.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Founder to camera | Everyone said 'add a free plan'. | Everyone told me to add a free plan. |
| 2-15s | Founder; cut to the pricing page | Every build costs real money. | Every build costs us real money, so free users would be paid for by paying ones. |
| 15-30s | Screen: the most a request can cost, shown before Send | You see the max cost before it runs. | Instead you see the most a request can cost before it starts. |
| 30-42s | Screen: sample review link, the examples gallery or an uncut build | Watch it first. Play the client. | Watch a full uncut build first, or open our sample review link and play the client. |
| 42-50s | Founder | Full refund until you use credits. | And if you don't use a credit, you get every cent back. |

- **CTA:** Link in first comment to the uncut build page.
- **Caption:** No free tier, on purpose. Watch the uncut build, play the client on our sample review link, and if you don't use a credit you get every cent back.
- **Hashtags:** #buildinpublic #saas #pricing #startup
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Face to camera; Pricing page; Cost-before-send UI; Uncut build or sample review link
- **Assets needed:** The sample review link if it has shipped (ask 5); otherwise cut that line
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** If the owner adopts D1 (7-day / 100-credit refund), update the refund line in this and every other video · Free tier stays an owner decision (D17)
- **Tracking:** `makeborne.com/go/ig-v11`, `makeborne.com/go/li-v11`, `makeborne.com/go/tt-v11`, `makeborne.com/go/x-v11`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v11-p3`
- **Why it works:** The contrarian stance is the press and Indie Hackers angle in the messaging house, and it pre-empts the top objection (strategy §4.1, §4.4).

#### V31 · Founder Day 14: what broke this week

`founder` · **P1** · week 2 (2-8 Nov) · `live` · icp1 · lane A · 60 s · effort low

**Platforms:** LinkedIn, X, TikTok

**Hook (first 2 s):** "Day 14: three things broke. Here's what I did."  
*Visual:* Frame 0: founder to camera, a whiteboard or notebook with three numbered items.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Founder + list | Day 14: 3 things broke. | Day fourteen. Three things broke. |
| 2-40s | Each item: what broke, screenshot, the fix | 1. [real issue] 2. [real issue] 3. [real issue] | [Real issues and fixes only] |
| 40-55s | Numbers: payers, refunds, best source | [N] payers · [N] refunds | [Real numbers] |
| 55-60s | Founder | Day 21 next. | See you on day twenty-one. |

- **CTA:** Follow; link in first comment.
- **Caption:** Day 14 of building an AI studio for client work in public: what broke, what I fixed, and the real numbers.
- **Hashtags:** #buildinpublic #startup #indiehackers
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Face to camera; Cropped screenshots
- **Assets needed:** Weekly numbers
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Never publish unreleased security issues or infrastructure details
- **Tracking:** `makeborne.com/go/li-v31`, `makeborne.com/go/tt-v31`, `makeborne.com/go/x-v31`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v31-p6`
- **Why it works:** Failures and lessons in public were Base44's LinkedIn engine [F, self-reported].

#### V44 · Who's behind this? A small studio in Sarajevo

`founder` · **P1** · week 2 (2-8 Nov) · `live` · icp1 · lane A · 40 s · effort low

**Platforms:** TikTok, Instagram Reels, LinkedIn

**Hook (first 2 s):** "You're paying a company in Sarajevo. Here's who we are."  
*Visual:* Frame 0: founder walking out of the office building onto a Sarajevo street, phone camera, morning light.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Walk-and-talk on the street | Who's behind Makeborne? | You're paying a company in Sarajevo. Fair to ask who we are. |
| 2-20s | Desk, team (only those who agree), the support inbox | Small studio. Sells worldwide. | We're a small studio. We sell worldwide. |
| 20-32s | Founder answering a support ticket (customer details blurred) | I answer support myself. | I answer support myself. |
| 32-40s | Founder to camera | Full refund until you use credits. | And if you don't use a credit, you get every cent back. |

- **CTA:** Follow; bio link.
- **Caption:** Who's behind Makeborne: a small studio in Sarajevo, selling worldwide. The founder answers support and our numbers are public.
- **Hashtags:** #sarajevo #startup #buildinpublic
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Walk-and-talk; Office B-roll; Support inbox (blurred)
- **Assets needed:** Consent from anyone on camera
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** No customer data on screen
- **Tracking:** `makeborne.com/go/ig-v44`, `makeborne.com/go/li-v44`, `makeborne.com/go/tt-v44`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v44-p9`
- **Why it works:** Answers the 'Who are you?' objection (strategy §4.4) for a paid-only product from an unfamiliar country.

#### V45 · I answered the first 100 support tickets myself. The top 3 questions.

`founder` · **P2** · week 4 (16-22 Nov) · `live` · icp1 · lane A · 50 s · effort low

**Platforms:** LinkedIn, TikTok, X

**Hook (first 2 s):** "I answered the first 100 support tickets myself. Top 3 questions."  
*Visual:* Frame 0: founder with the support inbox count visible (subjects blurred).

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Founder + inbox | 100 tickets. Top 3 questions. | A hundred support tickets. Here are the top three. |
| 2-40s | Three questions and the honest answers | 1. [real] 2. [real] 3. [real] | [Real answers] |
| 40-50s | What we changed because of them | What we changed | [Real change] |

- **CTA:** Link in first comment.
- **Caption:** The top 3 questions from Makeborne's first 100 support tickets, and what we changed because of them.
- **Hashtags:** #buildinpublic #customersupport #saas
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Face to camera
- **Assets needed:** Ticket tally (no personal data)
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Use the real ticket count; change the number in the hook if it is not 100
- **Tracking:** `makeborne.com/go/li-v45`, `makeborne.com/go/tt-v45`, `makeborne.com/go/x-v45`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v45-p10`
- **Why it works:** Trust and objection content from real data.

#### V39 · Founder Day 30: every number in public

`founder` · **P1** · week 5 (23-29 Nov) · `live` · icp1 · lane A · 90 s · effort med

**Platforms:** LinkedIn, X, TikTok, YouTube Shorts

**Hook (first 2 s):** "30 days, $1,000, every number. Here's the whole thing."  
*Visual:* Frame 0: founder with a single slide made in Makeborne showing MRR, payers, refunds and AI cost per build.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Founder + numbers slide | Day 30: every number. | Thirty days. Every number. |
| 2-30s | Slides (built in Makeborne): MRR, payers, refunds, CAC by source | MRR $[x] · payers [n] · refunds [n] | [Real numbers] |
| 30-60s | What worked / what didn't (formats, creators, boosts) | Worked / didn't | [Real lessons] |
| 60-85s | What's next | Next 30 days | [Plan] |
| 85-90s | Made with Makeborne end slide | This deck was made in Makeborne. | And yes, this deck was made in Makeborne. |

- **CTA:** Link to the public numbers post / Indie Hackers.
- **Caption:** Day 30 of an AI studio built in Sarajevo, with every number in public: MRR, payers, refunds, AI cost per build and what failed.
- **Hashtags:** #buildinpublic #indiehackers #startup #saas
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Face to camera; Deck built in Makeborne
- **Assets needed:** Redacted Whop screenshots; Funnel numbers
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Wed 25 Nov 2026; numbers verified the same day · No buyer data
- **Tracking:** `makeborne.com/go/li-v39`, `makeborne.com/go/tt-v39`, `makeborne.com/go/x-v39`, `makeborne.com/go/yt-v39`; `utm_campaign=day30`, `utm_content=<surface>-v39-p7`
- **Why it works:** A beat that needs no feature (strategy §9); also the press follow-up asset.

#### V43 · Founder Day 90: every number, including what failed

`founder` · **P1** · week 13 (18-24 Jan) · `live` · icp1 · lane A · 120 s · effort med

**Platforms:** LinkedIn, X, YouTube, TikTok

**Hook (first 2 s):** "90 days. Here's every number, including what failed."  
*Visual:* Frame 0: founder with the day-90 deck (made in Makeborne), MRR and churn visible.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Founder + deck | Day 90: every number. | Ninety days. Every number. |
| 2-50s | Net payers, MRR, CAC by source, refunds, month-2 renewal, loop share | [real numbers] | [Real numbers vs the base case] |
| 50-95s | What failed, what we stopped | What failed | [Real failures] |
| 95-120s | Next quarter (incl. the free-tier decision, if made) | Next 90 days | [Plan] |

- **CTA:** Link to the public report.
- **Caption:** Day 90 of Makeborne: net payers, MRR, CAC by source, refunds, renewals and what failed. Every number in public.
- **Hashtags:** #buildinpublic #startup #indiehackers
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Face to camera; Deck
- **Assets needed:** Day-90 report
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Sun 24 Jan 2027 · Compare honestly to the base case (~$14.5k MRR at day 91, calculator; $14.2k in the weekly table) and to $1M ARR
- **Tracking:** `makeborne.com/go/li-v43`, `makeborne.com/go/tt-v43`, `makeborne.com/go/x-v43`, `makeborne.com/go/yt-v43`; `utm_campaign=day90`, `utm_content=<surface>-v43-p8`
- **Why it works:** Day-90 report beat (strategy §9); press angle.

#### V54 · We're on Product Hunt today: the real thing, no upvote ask

`founder` · **P1** · week 3 (9-15 Nov) · `beat:images` · all · lane A+B · 45 s · effort low

**Platforms:** X, LinkedIn

**Hook (first 2 s):** "Today Makeborne makes the images too. Here's an uncut build."  
*Visual:* Frame 0: founder at the desk, the images build already running on screen.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Founder + running build | Images are live. | Today Makeborne makes the images too. |
| 2-35s | Uncut (or clearly sped-up) image-led build | Clock chip: '[real time]' filled from the recording, or 'sped up ×N' if compressed. Never show compressed time as real time. | Here's a build, start to finish. |
| 35-45s | Founder | We're on Product Hunt today. | We're on Product Hunt today if you want to tell us what you think. |

- **CTA:** Link to the Product Hunt page in the first reply; never 'upvote'.
- **Caption:** Makeborne now makes images for your websites, decks and books. We're on Product Hunt today: comments and honest feedback welcome.
- **Hashtags:** #producthunt #buildinpublic #launch
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Face to camera; Uncut build
- **Assets needed:** PH page live at 09:01 Sarajevo (after 1 Nov)
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · No upvote asks, vote swaps or paid hunters, ever (Product Hunt rules)
- **Tracking:** `makeborne.com/go/li-v54`, `makeborne.com/go/x-v54`; `utm_campaign=images-beat`, `utm_content=<surface>-v54-i4`
- **Budget line:** Uneed b6 same day
- **Why it works:** The main Product Hunt launch is reserved for images (strategy §1.6); a real build video belongs in the maker comment.


### 4.7 reaction (2)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V21 | Founder reads the first week's comments (and answers them) | P2 | 2 | `live` |
| V20 | Stitch: 'what should a small business website have?' then build it | P2 | 3 | `live` |

#### V21 · Founder reads the first week's comments (and answers them)

`reaction` · **P2** · week 2 (2-8 Nov) · `live` · icp1 · lane A · 55 s · effort low

**Platforms:** TikTok, Instagram Reels, LinkedIn

**Hook (first 2 s):** "You asked if it's just templates. Let's check."  
*Visual:* Frame 0: a real comment screenshot ('isn't this just a template?', handle blurred) next to the founder's face.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Comment card + founder | 'Isn't this just a template?' | You asked if this is just templates. |
| 2-25s | Brief and result side by side; one live edit | Brief → result → one live edit | Here's the brief, the result, and a live edit nobody planned. |
| 25-40s | Second comment: 'can I use my own domain?' | 'Own domain?' Not yet. | Own domain? Not yet. Sites publish on a Makeborne address today, and you can download the source. |
| 40-55s | Third comment: 'does it make images?' | 'Images?' Not yet. | Images? Not yet. Today it's typography or your own photos. |

- **CTA:** 'Ask me anything in the comments.'
- **Caption:** Answering the honest questions from launch week: is it templates, can I use my own domain, does it make images. Straight answers.
- **Hashtags:** #buildinpublic #ama #webdesign #startup
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Comment cards (handles blurred); Face to camera; Brief/result split
- **Assets needed:** 3 real comments
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Use the objection answers word for word from strategy §4.4; no dates for coming features
- **Tracking:** `makeborne.com/go/ig-v21`, `makeborne.com/go/li-v21`, `makeborne.com/go/tt-v21`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v21-p5`
- **Why it works:** Answers the objections that stop a paid-only purchase, in public, and turns comments into content.

#### V20 · Stitch: 'what should a small business website have?' then build it

`reaction` · **P2** · week 3 (9-15 Nov) · `live` · icp4 · lane B · 60 s · effort low

**Platforms:** TikTok

**Hook (first 2 s):** "You said every small business site needs these 5 things. Let's build one."  
*Visual:* Frame 0: the stitched creator's tip clip (first 3-5 s, as TikTok's Stitch allows), then hard cut to the composer.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-4s | Stitched clip (only from creators who enable Stitch; credit them) | Let's test this. | You said every small business site needs these five things. |
| 4-15s | Composer: a fictional business brief that names the five things | Their 5 rules, one brief | I put all five in one brief. |
| 15-45s | Build (chip); tick each rule off on screen | ✔ Hours ✔ Phone ✔ Map... | Hours, phone, location, services, booking button. |
| 45-60s | Finished site, all five ticked | 5/5. Credit: @creator | Five out of five. Thanks for the checklist. |

- **CTA:** 'DM me SITE' / bio link.
- **Caption:** Testing a web designer's small business website checklist: one brief, five rules, one build. Credit to the original creator.
- **Hashtags:** #stitch #smallbusinesstips #websitedesign #webdesigntips
- **Sound:** Original audio of the stitched clip plus voice-over (stitch keeps the source audio for the stitched part).
- **Shot list:** Stitch inside the TikTok app; Build capture; Checklist overlay
- **Assets needed:** A tip video from a creator who allows stitches; add value, never mock
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Never use a real business; never imply the creator endorses Makeborne
- **Tracking:** `makeborne.com/go/tt-v20`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v20-r7`
- **Why it works:** Borrows an existing audience's question and answers it with product proof (research/short-form-video.md §3, format 9).


### 4.8 UGC (6)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V32 | UGC 1, Lane A web designer: I send clients a real site before the first call | P1 | 3 | `live` |
| V33 | UGC 2, Lane A side-hustle: pitching a local business with a demo site | P1 | 3 | `live` |
| V35 | UGC 4, Lane B productivity: notes to a client-ready deck with a real chart | P1 | 3 | `live` |
| V34 | UGC 3, Lane A agency owner on LinkedIn: approvals in one link | P1 | 4 | `live` |
| V36 | UGC 5, Lane B creator/coach: my notes became a guide I give away | P1 | 4 | `live` |
| V53 | Wave-2 UGC (visual creator): an image-led site, deck or book | P1 | 4 | `beat:images` |

#### V32 · UGC 1, Lane A web designer: I send clients a real site before the first call

`UGC` · **P1** · week 3 (9-15 Nov) · `live` · icp1 · lane A · 45 s · effort med

**Platforms:** TikTok, Instagram Reels

**Hook (first 2 s):** "Ad: I send clients a real website before we even talk."  
*Visual:* Frame 0: the creator's phone showing a demo site they built, with a review comment bubble on it.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-3s | Creator to camera holding the phone with the demo site | Ad · I send the site before the call | This is an ad for Makeborne. I send clients a real first version before the first call. |
| 3-20s | Their screen: brief, build, one edit | Built from their brief | I build it from what they told me in the enquiry. |
| 20-35s | Review link; client-side comment; Approve | They comment on the live page | Then I send one link. They comment right on the page. |
| 35-45s | Creator to camera | Link in bio · code [CODE] | Link's in my bio if you want my brief. |

- **CTA:** Creator's /go/c-<handle> link in bio; use-my-brief link in DM replies.
- **Caption:** #ad I send clients a real first-version website before the first call, then get feedback on one link. Paid partnership with Makeborne. My brief is in my bio link.
- **Hashtags:** #ad #webdesigner #freelancer #clientwork
- **Sound:** Creator's own voice and a sound the creator's account may use commercially (on TikTok, branded content must use the Commercial Music Library).
- **Shot list:** Creator's own screen recording of their real use during the comped Studio month; Face to camera in natural light, no filters; Phone capture of the output
- **Assets needed:** Comped Studio account for the campaign month; /go/c-<handle> link + use-my-brief link + custom affiliate code; One-page brief (content/videos.md, UGC section); Signed agreement with the 60-day Spark/partnership-ad clause
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Paid-partnership toggle on + 'Ad' said in the first seconds and shown on screen + '#ad' at the start of the caption (FTC: disclosure must be in the video itself; platform tools alone are not enough). · Only live features; no 'free'; no vendor names; no income claims · Founder reviews the draft before it posts; pay only after the attribution gate
- **Tracking:** `makeborne.com/go/c-<handle>`, `makeborne.com/go/c-<handle>?brief=<id> (use-my-brief, once live)`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v32-u1`
- **Budget line:** b2 + b3 (wave 1)
- **Why it works:** Lane A is where Studio buyers live; creator content that shows visible UI, the finished artifact and a next step converts (LightReel 24 Oct 2026 [V/U]).

#### V33 · UGC 2, Lane A side-hustle: pitching a local business with a demo site

`UGC` · **P1** · week 3 (9-15 Nov) · `live` · icp1 · lane A · 45 s · effort med

**Platforms:** TikTok, YouTube Shorts

**Hook (first 2 s):** "Ad: here's how I'd pitch a local business this week."  
*Visual:* Frame 0: a street of shopfronts (no readable names) then cut to a demo site on the creator's laptop.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-3s | Shopfront B-roll (names unreadable) | Ad · how I'd pitch a local business | Ad for Makeborne. Here's how I'd pitch a local business this week. |
| 3-15s | Lead finder: business type + city (results blurred) | 1. Find them | First I find businesses of one type in one city. |
| 15-32s | Demo site for a fictional business of that type | 2. Build a first version | Then I build a first version to show them. |
| 32-45s | Review link + CRM card 'Demo sent' | 3. Send one link, track it | Send one link and track the follow-up. Link in bio. |

- **CTA:** Creator /go/ link; use-my-brief link.
- **Caption:** #ad How I'd pitch websites to local businesses: find them, build a first version, send one review link. Paid partnership with Makeborne.
- **Hashtags:** #ad #sidehustle #webdesign #smallbusiness
- **Sound:** Creator's own voice and a sound the creator's account may use commercially (on TikTok, branded content must use the Commercial Music Library).
- **Shot list:** Creator's own screen recording of their real use during the comped Studio month; Face to camera in natural light, no filters; Phone capture of the output
- **Assets needed:** Comped Studio account for the campaign month; /go/c-<handle> link + use-my-brief link + custom affiliate code; One-page brief (content/videos.md, UGC section); Signed agreement with the 60-day Spark/partnership-ad clause
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Paid-partnership toggle on + 'Ad' said in the first seconds and shown on screen + '#ad' at the start of the caption (FTC: disclosure must be in the video itself; platform tools alone are not enough). · Only live features; no 'free'; no vendor names; no income claims · Founder reviews the draft before it posts; pay only after the attribution gate · No income or 'make $X a month' claims of any kind · No automated cold email or 'email outreach' framing
- **Tracking:** `makeborne.com/go/c-<handle>`, `makeborne.com/go/c-<handle>?brief=<id> (use-my-brief, once live)`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v33-u2`
- **Budget line:** b2 + b3 (wave 1)
- **Why it works:** Side-hustle creators reach the 'sell websites to local businesses' crowd inside ICP 1; the plan books 3 Lane A creators.

#### V35 · UGC 4, Lane B productivity: notes to a client-ready deck with a real chart

`UGC` · **P1** · week 3 (9-15 Nov) · `live` · icp2 · lane B · 45 s · effort med

**Platforms:** TikTok, Instagram Reels, YouTube Shorts

**Hook (first 2 s):** "Ad: I turned my meeting notes into this deck. The chart is real."  
*Visual:* Frame 0: the creator clicking a chart in PowerPoint; selection handles appear.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-3s | PowerPoint chart click | Ad · notes → deck → real chart | Ad for Makeborne. These were my meeting notes. |
| 3-25s | Paste notes, build (label speed), slides | My notes, pasted | I pasted them in, messy. |
| 25-38s | Export, open in PowerPoint, edit a chart value | Opens in PowerPoint | And it opens in PowerPoint with a real chart. |
| 38-45s | Creator to camera | Link in bio | Link in bio for my exact prompt. |

- **CTA:** Creator link + use-my-brief link.
- **Caption:** #ad Meeting notes to a client-ready deck you can edit in PowerPoint (yes, the chart is real). Paid partnership with Makeborne.
- **Hashtags:** #ad #productivity #powerpoint #worktok
- **Sound:** Creator's own voice and a sound the creator's account may use commercially (on TikTok, branded content must use the Commercial Music Library).
- **Shot list:** Creator's own screen recording of their real use during the comped Studio month; Face to camera in natural light, no filters; Phone capture of the output
- **Assets needed:** Comped Studio account for the campaign month; /go/c-<handle> link + use-my-brief link + custom affiliate code; One-page brief (content/videos.md, UGC section); Signed agreement with the 60-day Spark/partnership-ad clause
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Paid-partnership toggle on + 'Ad' said in the first seconds and shown on screen + '#ad' at the start of the caption (FTC: disclosure must be in the video itself; platform tools alone are not enough). · Only live features; no 'free'; no vendor names; no income claims · Founder reviews the draft before it posts; pay only after the attribution gate · No generated images on slides (not live)
- **Tracking:** `makeborne.com/go/c-<handle>`, `makeborne.com/go/c-<handle>?brief=<id> (use-my-brief, once live)`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v35-u4`
- **Budget line:** b2 + b3 (wave 1)
- **Why it works:** Lane B reach with ICP 2 proof; the plan's 2 Lane B creators cover decks and productivity.

#### V34 · UGC 3, Lane A agency owner on LinkedIn: approvals in one link

`UGC` · **P1** · week 4 (16-22 Nov) · `live` · icp1 · lane A · 45 s · effort med

**Platforms:** LinkedIn, Instagram Reels

**Hook (first 2 s):** "Ad: our studio stopped doing feedback by email. Here's what we do now."  
*Visual:* Frame 0: agency owner at their desk, a client review page open on the second screen.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-3s | Owner to camera | Ad · feedback without the email chaos | Paid partnership with Makeborne. We stopped doing feedback by email. |
| 3-25s | Their real review-link workflow on a client-safe demo project | One link. Comments on the page. | Here's how a review works now. |
| 25-38s | Same brief to a short proposal deck | Same brief, proposal deck | And the proposal deck comes from the same brief. |
| 38-45s | Owner to camera | Link in comments | Link's in the comments. |

- **CTA:** Link in the first comment (/go/c-<handle>).
- **Caption:** #ad Paid partnership: how our studio handles client feedback with one review link instead of email threads, plus a proposal deck from the same brief.
- **Hashtags:** #ad #agencyowner #webdesignagency #clientexperience
- **Sound:** Creator's own voice and a sound the creator's account may use commercially (on TikTok, branded content must use the Commercial Music Library).
- **Shot list:** Creator's own screen recording of their real use during the comped Studio month; Face to camera in natural light, no filters; Phone capture of the output
- **Assets needed:** Comped Studio account for the campaign month; /go/c-<handle> link + use-my-brief link + custom affiliate code; One-page brief (content/videos.md, UGC section); Signed agreement with the 60-day Spark/partnership-ad clause
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Paid-partnership toggle on + 'Ad' said in the first seconds and shown on screen + '#ad' at the start of the caption (FTC: disclosure must be in the video itself; platform tools alone are not enough). · Only live features; no 'free'; no vendor names; no income claims · Founder reviews the draft before it posts; pay only after the attribution gate · Testimonial must reflect the creator's real experience (FTC rule on reviews, 14 Aug 2024) · Lane rule: nothing about replacing designers or agencies
- **Tracking:** `makeborne.com/go/c-<handle>`, `makeborne.com/go/c-<handle>?brief=<id> (use-my-brief, once live)`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v34-u3`
- **Budget line:** b2 + b3 (wave 1)
- **Why it works:** The plan wants at least 1 LinkedIn creator in wave 1: LinkedIn reaches the agency buyer, and document/video content leads engagement there [V, Buffer 2026].

#### V36 · UGC 5, Lane B creator/coach: my notes became a guide I give away

`UGC` · **P1** · week 4 (16-22 Nov) · `live` · icp3 · lane B · 45 s · effort med

**Platforms:** Instagram Reels, TikTok

**Hook (first 2 s):** "Ad: the guide I give my audience used to be a mess of notes. Now it's this."  
*Visual:* Frame 0: the creator flicking through the finished guide on a tablet.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-3s | Guide on a tablet | Ad · notes → finished guide | Ad for Makeborne. My guide used to be a mess of notes. |
| 3-25s | Book mode, their notes, build, page riffle | Chapters, checklists | Now it has chapters and checklists. |
| 25-38s | PDF export, shared in their newsletter or link page | Exported as a PDF | I export the PDF and give it away. |
| 38-45s | Creator to camera | Link in bio | Link's in my bio. |

- **CTA:** Creator link + use-my-brief link.
- **Caption:** #ad I turned my notes into the guide I give my audience: chapters, checklists, PDF. Paid partnership with Makeborne.
- **Hashtags:** #ad #contentcreator #leadmagnet #coaching
- **Sound:** Creator's own voice and a sound the creator's account may use commercially (on TikTok, branded content must use the Commercial Music Library).
- **Shot list:** Creator's own screen recording of their real use during the comped Studio month; Face to camera in natural light, no filters; Phone capture of the output
- **Assets needed:** Comped Studio account for the campaign month; /go/c-<handle> link + use-my-brief link + custom affiliate code; One-page brief (content/videos.md, UGC section); Signed agreement with the 60-day Spark/partnership-ad clause
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Paid-partnership toggle on + 'Ad' said in the first seconds and shown on screen + '#ad' at the start of the caption (FTC: disclosure must be in the video itself; platform tools alone are not enough). · Only live features; no 'free'; no vendor names; no income claims · Founder reviews the draft before it posts; pay only after the attribution gate · No picture-book, generated-cover or 'print on KDP' claims
- **Tracking:** `makeborne.com/go/c-<handle>`, `makeborne.com/go/c-<handle>?brief=<id> (use-my-brief, once live)`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v36-u5`
- **Budget line:** b2 + b3 (wave 1)
- **Why it works:** ICP 3 on Instagram, where carousels and Reels reach creators; books cost little to build, so the comped month is cheap [E].

#### V53 · Wave-2 UGC (visual creator): an image-led site, deck or book

`UGC` · **P1** · week 4 (16-22 Nov) · `beat:images` · icp3 · lane B · 45 s · effort med

**Platforms:** TikTok, Instagram Reels

**Hook (first 2 s):** "Ad: one brief, and it made the images too."  
*Visual:* Frame 0: the creator's finished image-led output on a phone, held to camera.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-3s | Output to camera | Ad · it made the images too | Ad for Makeborne. One brief, and it made the images too. |
| 3-30s | Their real build on the shipped version | My brief, my build | Here's my brief and the build. |
| 30-45s | Creator to camera | Link in bio | Link in bio. |

- **CTA:** Creator /go/ link; PH100 code if live.
- **Caption:** #ad One brief in, images included: my site/deck/book made in Makeborne. Paid partnership.
- **Hashtags:** #ad #design #contentcreator
- **Sound:** Creator's own voice and a sound the creator's account may use commercially (on TikTok, branded content must use the Commercial Music Library).
- **Shot list:** Creator's own screen recording of their real use during the comped Studio month; Face to camera in natural light, no filters; Phone capture of the output
- **Assets needed:** Comped Studio account for the campaign month; /go/c-<handle> link + use-my-brief link + custom affiliate code; One-page brief (content/videos.md, UGC section); Signed agreement with the 60-day Spark/partnership-ad clause
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Paid-partnership toggle on + 'Ad' said in the first seconds and shown on screen + '#ad' at the start of the caption (FTC: disclosure must be in the video itself; platform tools alone are not enough). · Only live features; no 'free'; no vendor names; no income claims · Founder reviews the draft before it posts; pay only after the attribution gate · Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · If images are not live by 30 Nov, cancel and rehire the best wave-1 creator (budget line b4)
- **Tracking:** `makeborne.com/go/c-<handle>`, `makeborne.com/go/c-<handle>?brief=<id> (use-my-brief, once live)`; `utm_campaign=images-beat`, `utm_content=<surface>-v53-u6`
- **Budget line:** b4 (wave 2)
- **Why it works:** The plan reserves $140 for 2 visual creators only after the images gate.


### 4.9 demo (14)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V12 | Be the client for 30 seconds (sample review link) | P1 | 2 | `live` |
| V15 | Your notes app is full of book ideas: here's one, finished | P1 | 2 | `live` |
| V30 | Change one thing. Only that thing changes. (site edit) | P1 | 2 | `live` |
| V25 | My client pipeline lives next to the sites I build (CRM) | P2 | 4 | `live` |
| V28 | My grandma never wrote a recipe down, so we made a book | P2 | 4 | `live` |
| V42 | New year, new clients: lead finder → demo → review link | P1 | 11 | `live` |
| V50 | 'Anything': the fixed v14 launch film (15 s vertical + 43 s 16:9) | P1 | 3 | `beat:images` |
| V51 | Full-image slides from one brief (deck images demo) | P1 | 3 | `beat:images` |
| V55 | Run out mid-project? Top up without changing plan | P2 | 3 | `beat:topups` |
| V52 | A bedtime book where my son is the hero (picture book) | P1 | 5 | `beat:images` |
| V56 | Your client's site, on your client's domain | P1 | 6 | `beat:custom-domains` |
| V58 | Run client work in one place: build, review, approve, publish | P1 | 7 | `beat:agency-tools` |
| V60 | Edit in Makeborne or in your code. Both stay in sync. | P2 | 7 | `beat:github-sync` |
| V59 | Find the business, research it, build its site, send the link | P1 | 11 | `beat:ai-lead-research` |

#### V12 · Be the client for 30 seconds (sample review link)

`demo` · **P1** · week 2 (2-8 Nov) · `live` · icp1 · lane A · 25 s · effort low

**Platforms:** Instagram Reels, TikTok, LinkedIn

**Hook (first 2 s):** "Be my client for 30 seconds. Tap anything."  
*Visual:* Frame 0: phone held out to camera showing the sample review page, a finger hovering over the hero.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Phone held out, sample review page | Be my client for 30 seconds. | You're the client now. |
| 2-10s | Tap the headline, leave a comment | Tap anything. Comment. | Tap anything and comment. No account. |
| 10-18s | Request changes or Approve | Approve or ask for changes. | Approve it, or ask for changes. |
| 18-25s | End card with the /go/ link to the sample review | Try it: link in bio | The link is in my bio. Try it. |

- **CTA:** Bio link / DM CLIENT: the public sample review link.
- **Caption:** Play the client: open our sample review link, comment on the live page and approve it. No account. This is what your clients see. Comment CLIENT for the link.
- **Hashtags:** #freelancer #clientwork #webdesigner #agencylife
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Phone POV of the sample review page; Hand-held over-the-shoulder
- **Assets needed:** The public sample review link (growth ask 5) must be live
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Post only after ask 5 ships; review links themselves are live today
- **Tracking:** `makeborne.com/go/ig-v12`, `makeborne.com/go/li-v12`, `makeborne.com/go/tt-v12`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v12-f1`
- **Why it works:** The plan's trial substitute at zero AI cost (strategy §10.4); activation means a review link sent, so showing the client side sells the job.

#### V15 · Your notes app is full of book ideas: here's one, finished

`demo` · **P1** · week 2 (2-8 Nov) · `live` · icp3 · lane B · 24 s · effort low

**Platforms:** Instagram Reels, TikTok, YouTube Shorts

**Hook (first 2 s):** "Your notes app is full of book ideas. Here's one, finished."  
*Visual:* Frame 0: a phone notes list ('book about fixing old furniture'), then a hard cut to the finished book cover.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Notes app list on phone | Your notes app is full of book ideas. | Your notes app is full of book ideas. |
| 2-6s | Cover of the finished text-led book | Here's one, finished. | Here's one, finished. |
| 6-18s | Page riffle: contents, chapter opener, a checklist page | Contents. Chapters. Checklists. | Contents, chapters, checklists. Ready to read on screen or as a PDF. |
| 18-24s | Composer in Book mode with the brief | Comment BOOK. | Comment BOOK and I'll send the prompt. |

- **CTA:** 'Comment BOOK'.
- **Caption:** How to turn a note into a finished guide: one brief in, a full book out, for screen and PDF. Comment BOOK for the brief.
- **Hashtags:** #writing #ebook #leadmagnet #notesapp
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Notes-app prop; Book riffle from real output; Composer in Book mode
- **Assets needed:** Crop bracketed placeholders from the v12 pages
- **Reuse from the films folder:** `film library (private)/v12/assets/real/book-repair/page-01.png ... page-17.png (The Repair Table: real product run)`; `film library (private)/v12/assets/real/book_sheet.jpg`
- **Checks before posting:** Text-led only: no picture-book or gift framing until images pass the gate · No 'print-ready' and no KDP claim (KDP needs AI disclosure)
- **Tracking:** `makeborne.com/go/ig-v15`, `makeborne.com/go/tt-v15`, `makeborne.com/go/yt-v15`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v15-b4`
- **Why it works:** ICP 3 message from the plan; the v10 'notes list' insight without its spent devices (research/short-form-video.md §14).

#### V30 · Change one thing. Only that thing changes. (site edit)

`demo` · **P1** · week 2 (2-8 Nov) · `live` · icp1 · lane A · 15 s · effort low

**Platforms:** TikTok, Instagram Reels, LinkedIn, X

**Hook (first 2 s):** "Change one thing. Only that thing changes."  
*Visual:* Frame 0: a finished site with one element highlighted ('phone number') and the chat request typed.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Highlighted element + chat | Change one thing. | None |
| 2-10s | Edit applies; onion-skin overlay shows nothing else moved | Only that thing changes. | None |
| 10-15s | Before/after flicker | No surprises in revision 9. | None |

- **CTA:** 'Comment CLIENT'.
- **Caption:** Edit an AI-built website in chat: change one thing and only that thing changes. No surprises in revision nine.
- **Hashtags:** #webdesign #freelancer #websiteedit
- **Sound:** Commercial Music Library minimal track.
- **Shot list:** Before/after captures at identical scroll positions; Onion-skin overlay in HyperFrames
- **Assets needed:** Two identical-position captures
- **Reuse from the films folder:** `film library (private)/v12/assets/real/deck/slide-06.png and film library (private)/v12/assets/real/deck-edit/slide-06.png as the 4:5 static companion`
- **Checks before posting:** Only post if the edit genuinely changes nothing else; re-record if anything shifts
- **Tracking:** `makeborne.com/go/ig-v30`, `makeborne.com/go/li-v30`, `makeborne.com/go/tt-v30`, `makeborne.com/go/x-v30`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v30-c2`
- **Budget line:** Paid-ready static companion (4:5) for any later Meta test
- **Why it works:** Concept C2 from the creative matrix: precision is the reason freelancers trust it with clients.

#### V25 · My client pipeline lives next to the sites I build (CRM)

`demo` · **P2** · week 4 (16-22 Nov) · `live` · icp1 · lane A · 30 s · effort low

**Platforms:** LinkedIn, Instagram Reels, TikTok

**Hook (first 2 s):** "My client pipeline lives next to the sites I build."  
*Visual:* Frame 0: the CRM board with cards moving from 'Lead' to 'Approved' (names blurred or fictional).

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | CRM board, a card moving | Pipeline next to the work. | My pipeline sits right next to the work. |
| 2-14s | Open a lead; its demo site and review link attached | Lead → demo → review | Each lead has its demo and review link attached. |
| 14-24s | Client approves; move the card | Approved → won | When they approve, I move it. |
| 24-30s | Board view | Basic CRM. Built in. | A basic CRM, built in. Comment CLIENT. |

- **CTA:** 'Comment CLIENT'.
- **Caption:** A basic CRM inside the AI website studio: leads, demo sites and review links in one place. Studio plan, best for client work.
- **Hashtags:** #crm #freelancer #webdesignbusiness #clientwork
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** CRM board capture with fictional leads
- **Assets needed:** Fictional CRM data on a demo account
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Call it a basic CRM; show only features in the launch build
- **Tracking:** `makeborne.com/go/ig-v25`, `makeborne.com/go/li-v25`, `makeborne.com/go/tt-v25`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v25-f6`
- **Why it works:** Shows breadth for the Studio buyer without overclaiming (pillar 1).

#### V28 · My grandma never wrote a recipe down, so we made a book

`demo` · **P2** · week 4 (16-22 Nov) · `live` · icp3 · lane B · 40 s · effort med

**Platforms:** Instagram Reels, TikTok

**Hook (first 2 s):** "My grandma never wrote a recipe down. So we made a book."  
*Visual:* Frame 0: real hands (with consent) holding a phone open on the finished text-led recipe book's contents page.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Hands holding the book on a phone | Grandma never wrote a recipe down. | My grandma never wrote a recipe down. |
| 2-12s | Voice notes transcribed into the brief | So I typed what she told me. | So I typed up what she told me. |
| 12-30s | Book build; pages: contents, a recipe page, her notes | Her recipes. Her words. | Her recipes, in her words. |
| 30-40s | PDF on the family group chat | Now the whole family has it. | Now the whole family has it. Comment BOOK. |

- **CTA:** 'Comment BOOK'.
- **Caption:** Turned my family's recipes into a book from voice notes: text-led, shared as a PDF with the whole family. Comment BOOK.
- **Hashtags:** #familyrecipes #recipebook #grandma #cooking
- **Sound:** Warm acoustic track from the Commercial Music Library; founder voice-over.
- **Shot list:** Hands and kitchen B-roll (real, not generated); Build capture; Group-chat prop with no real names
- **Assets needed:** Written consent from the family member shown or quoted; Own photos only
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Text-led family recipe book only; no gift push until images pass the gate (strategy risk 19) · Must be a true story; if not, do not film it
- **Tracking:** `makeborne.com/go/ig-v28`, `makeborne.com/go/tt-v28`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v28-b1`
- **Why it works:** Emotional, highly sendable content; sends are Instagram's strongest non-follower signal [S]. The plan allows text-led family recipe books now.

#### V42 · New year, new clients: lead finder → demo → review link

`demo` · **P1** · week 11 (4-10 Jan) · `live` · icp1 · lane A · 45 s · effort low

**Platforms:** LinkedIn, TikTok, Instagram Reels, YouTube Shorts

**Hook (first 2 s):** "January is when businesses fix their websites. Be the first to show them a better one."  
*Visual:* Frame 0: a January calendar page turning into the lead finder results (blurred).

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Calendar → results | Be first in January. | January is when businesses fix their websites. |
| 2-15s | Lead finder (live steps only) | Find | Find them. |
| 15-32s | Demo site (fictional) | Build | Build a first version. |
| 32-45s | Review link, CRM 'Demo sent' | Send | Send one link. Comment CLIENT. |

- **CTA:** 'Comment CLIENT'.
- **Caption:** New year, new clients: find local businesses, build a first-version site and send one review link. Studio plan, best for client work. One-to-one, and only where the law allows.
- **Hashtags:** #freelancer #newyear #webdesign #clientwork
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Re-use V07 workflow with a fresh recording
- **Assets needed:** Blur masks
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** If AI lead research has passed the gate by then, use V59 instead; otherwise show only the live finder · January 'businesses fix their websites' is our framing, not a statistic: do not present it as data
- **Tracking:** `makeborne.com/go/ig-v42`, `makeborne.com/go/li-v42`, `makeborne.com/go/tt-v42`, `makeborne.com/go/yt-v42`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v42-f8`
- **Why it works:** Phase 3 'new year, new clients' push (strategy §8).

#### V50 · 'Anything': the fixed v14 launch film (15 s vertical + 43 s 16:9)

`demo` · **P1** · week 3 (9-15 Nov) · `beat:images` · all · lane A+B · 43 s · effort high

**Platforms:** X, LinkedIn, YouTube, TikTok, Instagram Reels

**Hook (first 2 s):** "Anything you can imagine."  
*Visual:* Frame 0: the lit glossy m on the dawn ring, then the real composer typing 'A website for my bakery.'

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Lit m on the dawn ring | None | None (music) |
| 2-12s | Real composer typing (real UI frames only) | A website for my bakery. | None |
| 12-14s | Burst of outputs: real image-pipeline outputs swapped in for concept worlds | Anything you can imagine. | None |
| 14-38s | Edit, publish (correct production address), book, deck, client review with Approve | Projects shown: real Makeborne outputs (or the AI-concept line where any concept frame remains) | None |
| 38-43s | New end card | Make yours at makeborne.com · from $20/mo | None |

- **CTA:** Product Hunt gallery video and /launch/images.
- **Caption:** Makeborne, now with images: websites, books and presentations from one brief. From $20/month + tax, full refund until you use credits.
- **Hashtags:** #launch #producthunt #design
- **Sound:** Mixkit 'Opalescent' per the film notes [U: re-read licence before paid YouTube]; TikTok version on a Commercial Music Library track.
- **Shot list:** No new shoot; re-render on a local disk (draft 2 failed on a network-drive rename); 15 s 9:16 recomposition (never crop the 16:9 master)
- **Assets needed:** Fix 'Start free' end card; Restore a readable AI-concept line (cap height ≥2.5% of frame, ≥3 s) wherever concept frames remain; Replace the publish URL with the production address; Drop risky names (Northface Labs, Tidal, Tern; check Galerie Nord, Kazu, Round Nine, Salt & Swell, Petal & Stem); Swap concept outputs for real shipped outputs where possible; Drop or relabel the 'Paris at 2 a.m.' image-edit beat unless image editing ships
- **Reuse from the films folder:** `film library (private)/v14/renders/v14_draft_1080p60.mp4 (draft 1, 16:9 1080p60, 43.4 s)`; `film library (private)/v14/gen/sheet_v14.jpg (quality target)`
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · Brand film, not product proof (strategy §4.2)
- **Tracking:** `makeborne.com/go/ig-v50`, `makeborne.com/go/li-v50`, `makeborne.com/go/tt-v50`, `makeborne.com/go/x-v50`, `makeborne.com/go/yt-v50`; `utm_campaign=images-beat`, `utm_content=<surface>-v50-i2`
- **Why it works:** The owner's quality bar becomes honest only once images are live; it serves the Product Hunt launch and X, where 16:9 launch video outperformed 9:16 [V, Infinite via internal v14 research].

#### V51 · Full-image slides from one brief (deck images demo)

`demo` · **P1** · week 3 (9-15 Nov) · `beat:images` · icp2 · lane B · 25 s · effort low

**Platforms:** LinkedIn, TikTok, Instagram Reels, X

**Hook (first 2 s):** "Full-image slides. From one brief."  
*Visual:* Frame 0: a full-bleed image slide with a single line of type.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Full-bleed slide | Full-image slides. One brief. | Full-image slides, from one brief. |
| 2-14s | Quality and aspect controls set; build (chip) | Pick quality. Pick aspect. | Pick the quality and aspect. |
| 14-22s | Deck deals in | Your deck, your images. | Every slide gets its own image. |
| 22-25s | End | Comment DECK. | Comment DECK. |

- **CTA:** 'Comment DECK'.
- **Caption:** New in Makeborne: full-image slides with quality and aspect controls, from one brief. Comment DECK.
- **Hashtags:** #pitchdeck #presentationdesign #newfeature
- **Sound:** Brand TikTok: Commercial Music Library track only (business account) under original voice-over. Instagram/YouTube: original voice-over plus a library track cleared for business use [U: re-check each platform's business library]. No trending chart songs on brand accounts.
- **Shot list:** Shipped-version capture of the controls and output
- **Assets needed:** Real outputs; credit cost per image shown honestly
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · Show the real credit cost of image slides
- **Tracking:** `makeborne.com/go/ig-v51`, `makeborne.com/go/li-v51`, `makeborne.com/go/tt-v51`, `makeborne.com/go/x-v51`; `utm_campaign=images-beat`, `utm_content=<surface>-v51-i3`
- **Why it works:** Day 2 of the images Launch Week (strategy §8); decks are where Gamma trained buyers to expect images.

#### V55 · Run out mid-project? Top up without changing plan

`demo` · **P2** · week 3 (9-15 Nov) · `beat:topups` · icp1 · lane A · 20 s · effort low

**Platforms:** TikTok, Instagram Reels, LinkedIn, X

**Hook (first 2 s):** "Out of credits at 11 p.m. before a client deadline?"  
*Visual:* Frame 0: the credits meter near zero next to a calendar showing a deadline tomorrow.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Meter + deadline | Out of credits before a deadline? | Out of credits the night before a deadline? |
| 2-14s | Top-up flow (shipped version) | Top up. Keep your plan. | Top up. Your plan stays the same. |
| 14-20s | Build continues | Back to work. | Back to work. |

- **CTA:** Link in first comment.
- **Caption:** New: credit top-ups. Run out mid-project and top up without changing your plan.
- **Hashtags:** #newfeature #freelancer
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Top-up flow capture
- **Assets needed:** Real top-up prices from the shipped pricing page
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · Until top-ups ship, objection copy stays 'upgrade any time; unused credits carry over for two months'
- **Tracking:** `makeborne.com/go/ig-v55`, `makeborne.com/go/li-v55`, `makeborne.com/go/tt-v55`, `makeborne.com/go/x-v55`; `utm_campaign=images-beat`, `utm_content=<surface>-v55-tu1`
- **Why it works:** Tier-3 beat; a 20 s UI clip is all it needs (strategy §9).

#### V52 · A bedtime book where my son is the hero (picture book)

`demo` · **P1** · week 5 (23-29 Nov) · `beat:images` · icp3 · lane B · 35 s · effort med

**Platforms:** Instagram Reels, TikTok

**Hook (first 2 s):** "I made my son a bedtime book where he's the hero."  
*Visual:* Frame 0: a parent's hands turning the illustrated cover on a tablet in a dim bedroom.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Tablet in bedroom light | A bedtime book where he's the hero. | I made my son a bedtime book where he's the hero. |
| 2-10s | Brief: name, favourite animal, one fear to beat (no photo of the child uploaded) | His name. His dinosaur. | His name, his favourite dinosaur, the thing he's scared of. |
| 10-28s | Illustrated spreads | Illustrated, page by page. | Illustrated, page by page. |
| 28-35s | End | Comment BOOK. | Comment BOOK. |

- **CTA:** 'Comment BOOK'.
- **Caption:** New: illustrated picture books in Makeborne. I made a bedtime story starring my son. Comment BOOK for the brief.
- **Hashtags:** #bedtimestory #picturebook #parenting #giftidea
- **Sound:** Soft Commercial Music Library lullaby; parent voice-over.
- **Shot list:** Real bedroom B-roll (no child's face); Book capture
- **Assets needed:** A real parent's consent; no child images or personal data; AI-image marking check
- **Reuse from the films folder:** v14 concept 'Ollie the whale' spread in film library (private)/v14/gen/sheet_v14.jpg as style reference only
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · Gift framing only if images are live before about 10 Dec (strategy: picture/gift pushes wait for images) · Never upload or show a real child's face
- **Tracking:** `makeborne.com/go/ig-v52`, `makeborne.com/go/tt-v52`; `utm_campaign=images-beat`, `utm_content=<surface>-v52-b2`
- **Why it works:** Gift books are the most sendable book idea; held until images make them good (strategy risk 19).

#### V56 · Your client's site, on your client's domain

`demo` · **P1** · week 6 (30 Nov-6 Dec) · `beat:custom-domains` · icp1 · lane A · 35 s · effort med

**Platforms:** LinkedIn, TikTok, Instagram Reels, YouTube Shorts

**Hook (first 2 s):** "Your client's site, now on your client's own domain."  
*Visual:* Frame 0: a browser address bar changing from the Makeborne address to the client's own domain.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Address bar swap | Now on your client's domain. | Client sites can now go live on the client's own domain. |
| 2-25s | Connect-domain flow end to end on a real (consented) customer site or our own test domain | Connect. Verify. Live. | Connect it, verify it, and it's live. |
| 25-35s | Phone shows the site on the new domain | Comment CLIENT. | Comment CLIENT. |

- **CTA:** 'Comment CLIENT'.
- **Caption:** New: custom domains. Your client's site, live on your client's own domain. Studio plan, best for client work.
- **Hashtags:** #newfeature #webdesign #customdomain
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Full connect flow including DNS step (no registrar account details on screen)
- **Assets needed:** A consented customer move, or our own test domain
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · Hide registrar logins, DNS tokens and account IDs
- **Tracking:** `makeborne.com/go/ig-v56`, `makeborne.com/go/li-v56`, `makeborne.com/go/tt-v56`, `makeborne.com/go/yt-v56`; `utm_campaign=domains-beat`, `utm_content=<surface>-v56-cd1`
- **Why it works:** Removes the biggest objection for small businesses and agencies (strategy §4.4); unlocks full-volume small-business speedruns.

#### V58 · Run client work in one place: build, review, approve, publish

`demo` · **P1** · week 7 (7-13 Dec) · `beat:agency-tools` · icp1 · lane A · 45 s · effort med

**Platforms:** LinkedIn, YouTube Shorts, X, Instagram Reels

**Hook (first 2 s):** "Build, review, approve, publish. One place."  
*Visual:* Frame 0: a four-step strip lighting up in order over the shipped agency view.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Four-step strip | Build · Review · Approve · Publish | Client work, in one place. |
| 2-38s | The shipped agency tools, step by step (only what shipped) | [shipped features] | [Describe only shipped features] |
| 38-45s | End | Comment CLIENT. | Comment CLIENT. |

- **CTA:** 'Comment CLIENT'; PH 'Makeborne for agencies' only if a significant iteration.
- **Caption:** New: agency tools in Makeborne. Build, review, approve and publish client work in one place.
- **Hashtags:** #agencyowner #newfeature #webdesignagency
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Shipped agency view capture
- **Assets needed:** Final feature list from the release notes
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · Write the script from the shipped release notes, not the roadmap · PH relaunch only if at least 4 weeks after the images launch
- **Tracking:** `makeborne.com/go/ig-v58`, `makeborne.com/go/li-v58`, `makeborne.com/go/x-v58`, `makeborne.com/go/yt-v58`; `utm_campaign=agency-beat`, `utm_content=<surface>-v58-ag1`
- **Why it works:** Tier-1 beat for the paying ICP (strategy §9); LinkedIn series plus community workshop.

#### V60 · Edit in Makeborne or in your code. Both stay in sync.

`demo` · **P2** · week 7 (7-13 Dec) · `beat:github-sync` · icp1 · lane A · 60 s · effort med

**Platforms:** X, YouTube

**Hook (first 2 s):** "Edit here or in your code. Both stay in sync."  
*Visual:* Frame 0: split screen, the studio on the left, a code editor on the right; a change on one side appears on the other.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Split screen, change propagates | Edit either side. | Edit in Makeborne or in your code. |
| 2-30s | Studio edit → commit appears in the repo | Makeborne → GitHub | A change in the studio lands in the repo. |
| 30-55s | Code edit pushed → studio updates | GitHub → Makeborne | And a code change comes back. |
| 55-60s | End | Both stay in sync. | Both stay in sync. |

- **CTA:** Link in first reply.
- **Caption:** New: two-way GitHub sync. Edit in Makeborne or in your code; both stay in sync.
- **Hashtags:** #github #webdev #newfeature
- **Sound:** Voice-over only.
- **Shot list:** Split-screen capture on a test repo
- **Assets needed:** Test repo with nothing private
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · One X thread and one YouTube demo only, not a wave (strategy §8) · No tokens or org names on screen
- **Tracking:** `makeborne.com/go/x-v60`, `makeborne.com/go/yt-v60`; `utm_campaign=github-beat`, `utm_content=<surface>-v60-gh1`
- **Why it works:** Tier-3 developer beat; X and YouTube are where that audience is.

#### V59 · Find the business, research it, build its site, send the link

`demo` · **P1** · week 11 (4-10 Jan) · `beat:ai-lead-research` · icp1 · lane A · 50 s · effort med

**Platforms:** LinkedIn, TikTok, YouTube Shorts, Instagram Reels

**Hook (first 2 s):** "It found the business, read its site and told me what to pitch."  
*Visual:* Frame 0: the AI research panel for a lead (business identity blurred or fictional), 'what's holding their site back' visible.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Research panel | Found it. Read it. Told me what to pitch. | It found the business and told me what to pitch. |
| 2-20s | Lead finder + AI research on a fictional or consented business | Research | Here's what it read. |
| 20-40s | Pitch site from the research brief (fictional/consented only) | Build the better version | Then it builds the better version. |
| 40-50s | Review link, CRM 'Demo sent' | Send the link. | Send the link. Comment CLIENT. |

- **CTA:** 'Comment CLIENT'.
- **Caption:** New: AI lead research. Find the clients whose websites need you, and show up with a better one.
- **Hashtags:** #leadgeneration #freelancer #newfeature
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Shipped research flow on a consented or fictional business
- **Assets needed:** A business that agreed to be shown, or a fictional one
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Post only after the six-box beat gate passes (strategy §9): 48 h live, 10 golden briefs, AI limit raised, founder free for support, copy reviewed, /go/ links. · Never show a real business's weaknesses without its consent · No automated cold email
- **Tracking:** `makeborne.com/go/ig-v59`, `makeborne.com/go/li-v59`, `makeborne.com/go/tt-v59`, `makeborne.com/go/yt-v59`; `utm_campaign=leads-beat`, `utm_content=<surface>-v59-lr1`
- **Why it works:** Tier-2 beat in January, aligned with 'new year, new clients' (strategy §8-9).


### 4.10 meme (3)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V18 | 40-email feedback thread vs one link | P1 | 2 | `live` |
| V40 | Black Friday: yearly is 20% off. That's the whole deal. | P2 | 5 | `live` |
| V46 | 'Can you make the logo bigger?' (pinned to the logo) | P2 | 5 | `live` |

#### V18 · 40-email feedback thread vs one link

`meme` · **P1** · week 2 (2-8 Nov) · `live` · icp1 · lane A · 15 s · effort low

**Platforms:** TikTok, Instagram Reels, LinkedIn

**Hook (first 2 s):** "40-email feedback thread vs one link."  
*Visual:* Frame 0: left half an endless email thread scrolling fast, right half a single review link card.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Split: thread scrolling vs one link | 40 emails vs one link. | None |
| 2-9s | Left: 'RE: RE: RE: final_v7_FINAL'; right: client comments pinned on the live page | 'final_v7_FINAL' vs comments on the page | None |
| 9-15s | Right: Approve; left: still scrolling | Approved. (Left: still scrolling.) | None |

- **CTA:** 'Comment CLIENT'.
- **Caption:** The client feedback thread vs one review link where the client comments on the live site and approves it. Comment CLIENT.
- **Hashtags:** #freelancerlife #clientsfromhell #webdesigner #agencylife
- **Sound:** Commercial Music Library comedic track on TikTok; no voice needed.
- **Shot list:** Fake email thread (invented names); Review page capture
- **Assets needed:** Email thread prop
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** No real client names or emails
- **Tracking:** `makeborne.com/go/ig-v18`, `makeborne.com/go/li-v18`, `makeborne.com/go/tt-v18`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v18-a3`
- **Why it works:** Hook A3 in the plan; relatable pain gets sends, which Instagram weighs for non-follower reach [S, Kompozy summary 25 Sep 2026].

#### V40 · Black Friday: yearly is 20% off. That's the whole deal.

`meme` · **P2** · week 5 (23-29 Nov) · `live` · all · lane A+B · 12 s · effort low

**Platforms:** TikTok, Instagram Reels, X, LinkedIn

**Hook (first 2 s):** "Our Black Friday deal is the same as every day. Here's why."  
*Visual:* Frame 0: a fake flashing 'MEGA SALE 90% OFF' banner that gets calmly crossed out by a cursor.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Flashing fake banner crossed out | No countdown. No fake sale. | None |
| 2-8s | Pricing page, yearly toggle | Yearly is 20% off. Every day. | Yearly is twenty percent off. Every day, including today. |
| 8-12s | End card | makeborne.com · from $20/mo + tax · full refund until you use credits | None |

- **CTA:** Bio link to pricing.
- **Caption:** Our Black Friday deal: yearly plans are 20% off, the same as every other day. No countdowns. Full refund until you use credits.
- **Hashtags:** #blackfriday #saas #honestmarketing
- **Sound:** Commercial Music Library track.
- **Shot list:** Banner prop; Pricing page capture
- **Assets needed:** 
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Owner decision D5: no extra discount, no countdown
- **Tracking:** `makeborne.com/go/ig-v40`, `makeborne.com/go/li-v40`, `makeborne.com/go/tt-v40`, `makeborne.com/go/x-v40`; `utm_campaign=bf-2026`, `utm_content=<surface>-v40-bf1`
- **Budget line:** No boosts 20 Nov-2 Dec
- **Why it works:** Honest-pricing pillar; stands out in a week of fake urgency.

#### V46 · 'Can you make the logo bigger?' (pinned to the logo)

`meme` · **P2** · week 5 (23-29 Nov) · `live` · icp1 · lane A · 10 s · effort low

**Platforms:** TikTok, Instagram Reels

**Hook (first 2 s):** "'Can you make the logo bigger?'"  
*Visual:* Frame 0: a review comment pin sitting exactly on the logo of a live demo site.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Comment pin on the logo | 'Can you make the logo bigger?' | None |
| 2-7s | Chat: 'bigger logo'; logo grows; second pin: 'bigger' | Bigger. / Bigger. | None |
| 7-10s | Approve tapped | At least it's on one link. | None |

- **CTA:** 'Comment CLIENT'.
- **Caption:** Every designer has heard it. At least now the comment is pinned to the logo and the approval is one tap.
- **Hashtags:** #designermemes #clientsfromhell #webdesigner
- **Sound:** Commercial Music Library comedic sting.
- **Shot list:** Review page capture; Chat edit
- **Assets needed:** 
- **Reuse from the films folder:** none (new capture)
- **Tracking:** `makeborne.com/go/ig-v46`, `makeborne.com/go/tt-v46`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v46-m1`
- **Why it works:** Shareable in-group joke for designers that still shows the real review flow.


### 4.11 listicle (2)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V19 | 3 things I send a client before the first call | P1 | 3 | `live` |
| V47 | 5 questions to ask before paying for any AI website builder (including us) | P1 | 3 | `live` |

#### V19 · 3 things I send a client before the first call

`listicle` · **P1** · week 3 (9-15 Nov) · `live` · icp1 · lane A · 45 s · effort low

**Platforms:** LinkedIn, TikTok, Instagram Reels

**Hook (first 2 s):** "3 things I send a client before the first call."  
*Visual:* Frame 0: founder (or creator) holding up three fingers; behind, a laptop with a demo site.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Three fingers to camera | 3 things before the first call. | Three things I send before the first call. |
| 2-15s | 1: a demo site built from their public info (fictional example on screen) | 1. A real first version | One: a real first version of their site. |
| 15-28s | 2: a short proposal deck from the same brief | 2. A one-page proposal deck | Two: a short proposal deck in the same brand. |
| 28-40s | 3: a review link so they can comment | 3. A link they can comment on | Three: a link they can comment on before we even talk. |
| 40-45s | Founder | Comment CLIENT. | Comment CLIENT for my brief. |

- **CTA:** 'Comment CLIENT' / LinkedIn first comment.
- **Caption:** How to win a web design client before the first call: a first-version site, a proposal deck and a review link. All made in one studio.
- **Hashtags:** #freelancetips #webdesign #salestips #agencyowner
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Face to camera; Screen inserts of site, deck and review link
- **Assets needed:** Fictional prospect brief
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Demo for a real prospect only with their OK; on screen use a fictional one
- **Tracking:** `makeborne.com/go/ig-v19`, `makeborne.com/go/li-v19`, `makeborne.com/go/tt-v19`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v19-f5`
- **Why it works:** Listicles retain through the count; this one maps one-to-one onto the agency hero line 'Send your client a real website before the first call'.

#### V47 · 5 questions to ask before paying for any AI website builder (including us)

`listicle` · **P1** · week 3 (9-15 Nov) · `live` · icp1 · lane A+B · 55 s · effort low

**Platforms:** TikTok, YouTube Shorts, LinkedIn, Instagram Reels

**Hook (first 2 s):** "5 questions before you pay for any AI website builder. Including us."  
*Visual:* Frame 0: founder holding up a hand, the five questions listed on a card beside them.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Founder + card | 5 questions. Including us. | Five questions to ask any AI website builder, including us. |
| 2-14s | Q1: Can I see an uncut build? | 1. Uncut build? | Can you watch a real, uncut build? Ours is on the site. |
| 14-24s | Q2: What's the most a request can cost? | 2. Max cost shown first? | Do you see the cost before it runs? We show the maximum first. |
| 24-34s | Q3: Can I leave with my code? | 3. Can I export? | Can you take your code? Yes: download or export to GitHub. |
| 34-46s | Q4: Own domain? Q5: Images? | 4. Domain? 5. Images? | Own domain and generated images? Not yet for us. Coming soon. |
| 46-55s | Founder | Full refund until you use credits. | And full refund until you use credits. |

- **CTA:** Bio link.
- **Caption:** What to check before paying for an AI website builder: uncut builds, cost limits, code export, domains and images. Honest answers for Makeborne included.
- **Hashtags:** #aiwebsitebuilder #webdesign #smallbusiness
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Face to camera; Screen inserts for each answer
- **Assets needed:** Question card
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Never name or score competitors; no 'better than' claims · Coming features: 'coming soon', no date
- **Tracking:** `makeborne.com/go/ig-v47`, `makeborne.com/go/li-v47`, `makeborne.com/go/tt-v47`, `makeborne.com/go/yt-v47`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v47-l2`
- **Why it works:** Honesty as a differentiator; handles the domain and image objections up front so refunds stay low.


### 4.12 case-study (2)

| ID | Title | Pri | Week | Tag |
|---|---|---|---|---|
| V37 | We built every site you asked for in the comments: what happened | P2 | 4 | `live` |
| V38 | First customer story: how [freelancer] used it on a real client (consented) | P1 | 7 | `live` |

#### V37 · We built every site you asked for in the comments: what happened

`case-study` · **P2** · week 4 (16-22 Nov) · `live` · icp1 · lane A+B · 60 s · effort med

**Platforms:** TikTok, LinkedIn, Instagram Reels, X

**Hook (first 2 s):** "You asked for [N] websites in the comments. Here's what happened."  
*Visual:* Frame 0: a grid of the real comment-reply builds (only those with consent), the count on top.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Grid of builds | [N] sites from your comments. | You asked for [N] websites. I built them. |
| 2-20s | Fast tour, sentence chip on each | Bakery · gym · dentist... | Here are the ones we can show. |
| 20-40s | Numbers: views, DMs, payers from the series (real) | [views] → [DMs] → [payers] | Here's what the series actually did. |
| 40-60s | Founder: what I learned | What I'd change | What I'd do differently. |

- **CTA:** 'Comment your business for round 2.'
- **Caption:** Case study: every website I built from your comments, with the real views, DMs and payers the series produced.
- **Hashtags:** #buildinpublic #casestudy #websitedesign
- **Sound:** Original founder voice-over and real UI sound (keys, click, publish chime); quiet Commercial Music Library bed on TikTok.
- **Shot list:** Grid composite; Cropped analytics
- **Assets needed:** Consent log; Series analytics from the weekly sheet
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Only builds whose requesters gave written OK · Real numbers
- **Tracking:** `makeborne.com/go/ig-v37`, `makeborne.com/go/li-v37`, `makeborne.com/go/tt-v37`, `makeborne.com/go/x-v37`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v37-cs1`
- **Why it works:** Our own data is the only case study available in month 1; it turns a series into proof.

#### V38 · First customer story: how [freelancer] used it on a real client (consented)

`case-study` · **P1** · week 7 (7-13 Dec) · `live` · icp1 · lane A · 75 s · effort high

**Platforms:** LinkedIn, YouTube Shorts, Instagram Reels

**Hook (first 2 s):** "[Name] sent [N] demo sites in a month. [N] became clients."  
*Visual:* Frame 0: the customer on a video call (with consent), their real approved project beside them.

| Time | Picture | On screen | Voice-over |
|---|---|---|---|
| 0-2s | Customer on call + project | [N] demos sent · [N] won | [Customer's own words, from the call] |
| 2-30s | Their workflow, in their screen recording | Their workflow | [Their words] |
| 30-60s | Before/after of their revision rounds (their numbers) | Revision rounds: [before] → [after] | [Their words] |
| 60-75s | Founder outro | Comment CLIENT. | If that sounds like your week, comment CLIENT. |

- **CTA:** 'Comment CLIENT'.
- **Caption:** Customer story: how a freelance designer uses Makeborne demo sites and review links with real clients. Their numbers, shared with permission.
- **Hashtags:** #customerstory #freelancer #webdesign
- **Sound:** Founder voice, no music or a very low bed; LinkedIn plays muted by default, so burned-in captions carry it.
- **Shot list:** Recorded call; Customer's screen recording
- **Assets needed:** Written case-study consent; Customer approval of the final cut
- **Reuse from the films folder:** none (new capture)
- **Checks before posting:** Do not film until a real customer agrees in writing; never invent or paraphrase numbers · If incentivised (credits), disclose it in the video
- **Tracking:** `makeborne.com/go/ig-v38`, `makeborne.com/go/li-v38`, `makeborne.com/go/yt-v38`; `utm_campaign=launch-2026-10`, `utm_content=<surface>-v38-cs2`
- **Why it works:** Agency draft's first-3-case-studies plan; real testimonials are the only allowed kind (FTC fake-review rule, 14 Aug 2024).


---

## 5. Beat calendar for coming features

Nothing in this table may be posted, teased or scheduled until the feature has passed all six gate boxes (strategy §9): 48 h live in production with 10 golden briefs passed, the AI daily limit raised, the founder free for support, copy reviewed (no vendor names, nothing not live), every link on `/go/` with UTMs and the wave code working, and a legal check on any new duty (for images, a hard box: EU AI Act Art. 50(2) machine-readable marking from day 1; marking applies at launch for a new image feature: the 2 Dec 2026 date is only the transition for systems on the market before 2 Aug 2026 [U, confirm on EUR-Lex]). Weeks are the plan's earliest planning guesses.

| Beat (tag) | Earliest guess | Videos | Hero | Notes |
|---|---|---|---|---|
| `beat:images` | week 3-5 (3-20 Nov guess) | V49, V50, V51, V52, V53, V54 | V49 before/after, V50 fixed v14 film | Run as Launch Week 1 (sites, decks, books, top-ups, gallery); main Product Hunt launch (V54, no upvote asks); Uneed `b6`; wave-2 creators `b4` only if images are live by 30 Nov. Use only outputs from the **shipped** version, not the pre-release quality runs |
| `beat:topups` | day 4 of the images week | V55 | V55 | Tier 3: one 20 s UI clip |
| `beat:custom-domains` | week 4-8 | V56, V57 | V56 | Small-business speedruns move from light to full push only now |
| `beat:agency-tools` | week 7-8 | V58 | V58 | Script from the shipped release notes; PH relaunch only if significant and 4+ weeks after images |
| `beat:github-sync` | any time | V60 | V60 | One X thread and one YouTube demo only |
| `beat:ai-lead-research` | week 11-12 | V59 | V59 | Pairs with "new year, new clients"; until then V07 and V42 show only the live lead finder |

**Re-shoots when images go live.** The research recommends re-shooting the speedrun, before/after, book and slideshow formats with images (research/short-form-video.md §3). Do it as new versions of V02, V14, V16 and V29 with a new hook code (`-img`), never by editing a posted live video into a beat video.

---

## 6. UGC creator program: brief template, deliverables, rates and usage rights

### 6.1 How it fits the plan

- **Wave 1 (`b2` + `b3`, $390):** 5 creators, 2 videos each, posting 9-22 Nov. 3 Lane A (freelance web design or "sell sites to local businesses", at least 1 on LinkedIn) and 2 Lane B (decks or productivity; side-hustle or creator). Recruiting runs 27 Oct - 6 Nov. **The owner makes every contact; this plan contacts no one.**
- **Wave 2 (`b4`, $140):** 2 visual creators, only after images pass the gate; if images are not live by 30 Nov, rehire the best wave-1 creator instead.
- **Spend gate:** no creator is paid until `/go/` links, first-touch storage and `mb_src` / `mb_campaign` / `mb_aff` on the Makeborne-created checkout are live (target Thu 29 Oct). Never hand a creator a Whop store or tracking link.
- **The five briefs** below map one-to-one to videos V32-V36, and the wave-2 brief to V53.

### 6.2 Rates (plan) and what the market quotes

| Item | Plan terms | Source |
|---|---|---|
| Flat fee | **$60 per creator for 2 videos** ($30 a video): half on signing, half on delivery, both after the spend gate | strategy §6.2 line 2 [O] |
| Per-view bonus | **$1.50 per 1,000 verified views in each video's first 7 days, capped at $40 a video** (so at most $80 per creator) | line 3 |
| Product | A comped Studio month (750 credits; at most about $22.50 of provider cost at full use) | [E] |
| Commission | A Whop custom affiliate code: founding partners 30% recurring for 12 months, public 20% (decision D3), live only after the Whop affiliate purchase-and-refund test | D3 [O] |
| Payout | One low-fee transfer service or batched payouts, never a $30 SWIFT wire (`b8`); payout tax checks in the owner's private notes | line 8 [A] |
| **Most a wave-1 creator can earn from the $1,000** | **$140** ($60 + $80 bonus), plus commission from revenue | arithmetic [E] |

**Market check (read 26 Oct 2026, vendor sources [V], no stated methodology):**
- Influee's 2026 guide (published 18 Apr 2025, page carries 2026 copyright) gives an average of $150-212 and a median of about $175 for one UGC video. It prices usage rights at 30-50% of the base rate, and whitelisting or Spark access at 30% of the base rate per month. https://influee.co/blog/ugc-price
- Xolo's guide (5 Jan 2026) gives €100-300 for a 15-30 s video and €150-500 for 60 s+. It adds €200-500 per video for 30 days of paid-ads use and €1,000+ for a buyout. https://blog.xolo.io/top-ugc-creator-pricing-guide-with-rate-examples
- The plan's own research found reported market posts of $175-290 [S, unverified] (strategy risk 10).

**What that means, honestly:** $30 a video plus 60 days of ad rights is far below what these guides quote, so expect most experienced UGC creators to decline. The plan's answers are kept: aim at 2k-50k-follower creators who already post about the niche (they price lower and convert better), lead with the bonus and the recurring commission, and if needed **hire 4 at $75 instead of 5 at $60** (risk 10). Do not raise rates from the reserve until a creator has shown CAC ≤$50.

### 6.3 Deliverables (every wave-1 creator)

1. **2 videos**, 9:16, 15-60 s, posted on the creator's main account (TikTok, Reels, Shorts or LinkedIn native video) between 9 and 22 Nov.
2. **A draft shared 24 h before posting.** One revision round, on facts and compliance only (live features, disclosure, no vendor names). We never script their opinions.
3. **Disclosure:** the platform's paid-partnership or branded-content toggle, "Ad" said in the first seconds **and** shown on screen, and "#ad" at the start of the caption. The FTC says the disclosure must be in the video itself and that a platform's tool alone may not be enough [F, FTC "Disclosures 101", Nov 2019, older]. EU creators also follow their country's rules under the Unfair Commercial Practices Directive (read at the source before wave 1 [U]).
4. **Links:** their `makeborne.com/go/c-<handle>` link in bio or pinned, their use-my-brief link once it ships, and their affiliate code.
5. **Spark code or Meta partnership-ad permission**, valid for **60 days**, delivered within 48 h of posting.
6. **Proof:** an audience-geography screenshot before signing (at least 60% in the US, UK, EU, Canada or Australia), and a 7-day view screenshot for the bonus.
7. **Post stays up** for at least 60 days.

### 6.4 Usage rights (proposed terms; have counsel check the template once)

| Right | Proposed term |
|---|---|
| Paid amplification | 60 days of Spark / partnership ads from the creator's handle, on TikTok, Instagram and Facebook (plan line 2) |
| Organic reshare | Makeborne may reshare or embed the post with credit on its own accounts and makeborne.com for 12 months **[O, not in the plan yet]** |
| Edits for ads | Captions, an end card and trims only; never change the creator's words or claims |
| Buyout or raw footage | Not included (it costs €1,000+ at market [V]); ask separately later if a video wins |
| Exclusivity | None at this fee. Ask only that the creator does not post a competing AI-builder sponsorship within 7 days of a Makeborne post **[O]** |
| Ownership | The creator keeps ownership of the video |
| Takedown | Either side can ask for removal of a paid amplification at any time; organic posts stay the creator's |

**Keep and kill (per creator, strategy §6.2):** keep at 1 net payer per $40 spent, counted 14 days after the 2nd video; kill at $100 spent with 0 net payers or $150 with 1; pause if more than 20% of their buyers refund within 14 days.

### 6.5 The one-page brief template

> **Makeborne creator brief: [lane] · [creator handle] · wave [1/2]**
>
> **Who we are.** Makeborne is an AI studio for client work, made by a small studio in Sarajevo. It makes websites (published on a Makeborne address), books and presentations from a brief, and lets clients comment on and approve work through one review link. From $20/month + tax. Full refund until you use credits.
>
> **Your job.** [one sentence from the brief below]
>
> **Must show:** the finished output in the first 2 seconds; your real brief and the real build (label any speed-up "sped up ×N"); one honest moment of your own reaction; one CTA with your link.
>
> **Talking points, not a script.** [3 points from the brief below]. Say it your way.
>
> **Never:** say "free" or "trial"; show or promise generated images, custom domains, two-way GitHub sync, credit top-ups, agency tools or AI lead research (coming soon, not live); name any AI model company; make income or speed claims you didn't measure; show anyone's personal data or a real client without their OK; say Makeborne is better than a named competitor.
>
> **Format:** 9:16, 15-60 s, natural light, no filters, burned-in captions.
>
> **Disclosure:** paid-partnership toggle + say "Ad" in the first seconds + "#ad" first in the caption.
>
> **Links:** `makeborne.com/go/c-[handle]` · use-my-brief link · affiliate code [code].
>
> **Timeline:** draft by [date], live by [date] (window 9-22 Nov), Spark/partnership code within 48 h.
>
> **Pay:** $60 for 2 videos (half on signing, half on delivery) + $1.50 per 1,000 views in each video's first 7 days, up to $40 a video + [commission terms]. Paid by [transfer method].
>
> **Rights:** 60-day paid amplification; organic reshare with credit [if agreed]; you keep ownership.
>
> **Contact for questions:** the founder, [channel set by the owner].

### 6.6 The five wave-1 briefs

| # | Video | Lane | Creator profile | The job | Must show | Talking points |
|---|---|---|---|---|---|---|
| 1 | **V32** | A | Freelance web designer, 2k-50k, posts about client work | Show how you win a client before the first call: a demo site, then a review link | Finished site first; your real brief and build; one client-side comment; Approve or Request changes | A first version beats a call with nothing to show; clients comment on the live page with no account; Studio $49, full refund until you use credits |
| 2 | **V33** | A | "Sell websites to local businesses" / side-hustle educator | Walk through a realistic pitch workflow: live lead finder, demo site for a fictional business of that type, review link | Lead finder with results blurred; the demo; the review link; the CRM card | Process, not earnings; one-to-one outreach only, never mass cold email; sites publish on a Makeborne address today |
| 3 | **V34** | A (LinkedIn) | Owner of a 1-10 person studio with an agency-owner audience | Show your real client-review workflow from the comped month | The review page from the client's side; one fix; the approval; a proposal deck from the same brief | Only what you actually experienced; Studio "best for client work"; no "we replaced our designers" |
| 4 | **V35** | B | Productivity, consulting or career creator | Show your notes becoming an editable deck | Finished deck first; a real paste and build; the PPTX open in PowerPoint with the chart selected | It's editable, not a picture; Create $20 |
| 5 | **V36** | B | Coach, educator or creator with a lead magnet | Show your notes becoming a text-led guide you give away | Finished guide first; real notes and build; PDF export | Books are for screen and PDF; text-led today |

**Wave 2 (V53, `beat:images`, `b4`):** 2 design, illustration or aesthetic creators showing an image-led site, deck or book from their own brief on the shipped version. Same terms, $60 for 2 videos plus a $20 bonus pool.

### 6.7 Later: Content Rewards (from revenue only)

Whop Content Rewards opens only after a source shows CAC ≤$50 on 3+ payers and MRR passes about $1.5k (strategy §6.3). Plan at $1.60 per 1,000 approved views (Lovable's campaign worked out at about $1.56 against a $1 headline: $26,119 for 16.7M views [F, campaign page read 26 Oct 2026]), $3 minimum payout, $150 cap per video, a geo rule, #ad, a real build on screen, a tracked `/go/` link, live features only. The 60 concepts in this file are the brief library for that program: point clippers at V02, V04, V05, V06 and V14 first.

---

## 7. Founder face-to-camera series: "Day N"

**Line (messaging house):** "Day N: building an AI studio for client work from Sarajevo, with $1,000 and every number in public."
**Why:** Base44's founder credits building in public on LinkedIn [F, self-reported, CEO Insider 4 Aug 2025]; numbered series hold an audience (Cluely's numbered TikTok episodes: median 552K views [F, public counts, viral.app Oct 2026], although its views did not convert, so every episode here carries product proof or real numbers). Decision D19 says yes to the founder on camera.

**Format rules**
- Face to camera, phone at eye level, window light, no studio look. 45-90 s; LinkedIn cut up to 120 s.
- The first line is a number or a plain admission ("Day 7: here's exactly how many people paid").
- One real screen insert per episode (a build, a review link, a cropped Whop screen). Buyer data always cropped.
- One lesson, one next step, and the next episode's day as the sign-off.
- Native upload to LinkedIn (link in the first comment), then TikTok, Reels and X re-edits.
- Never publish infrastructure details, unreleased security issues, buyer data or competitor numbers that were not re-checked that day.

| Episode | Date (Sarajevo) | Video | Hook | Surfaces |
|---|---|---|---|---|
| Day 1: we launched | Mon 26 Oct | V08 | "We launched today. Comment what you want built first." | LinkedIn, TikTok, Reels, X |
| Day 5: exact numbers | Fri 30 Oct | (text post per plan; a 30 s face-cam version is optional) | "Day 5: exact numbers." | LinkedIn, X |
| Day 7: who paid | Sun 1 Nov | V09 | "Day 7: here's exactly how many people paid." | LinkedIn, X, TikTok, IH |
| Who's behind this | week 2 | V44 | "You're paying a company in Sarajevo. Here's who we are." | TikTok, Reels, LinkedIn |
| No free plan, on purpose | week 2 | V11 | "Everyone said 'add a free plan'. Here's why I didn't." | LinkedIn, X, TikTok |
| Your questions | week 2 | V21 | "You asked if it's just templates. Let's check." | TikTok, Reels, LinkedIn |
| Day 14: what broke | Sun 8 Nov | V31 | "Day 14: three things broke. Here's what I did." | LinkedIn, X, TikTok |
| Day 21: the offer check | Mon 16 Nov | (new episode from V31's template) | "Day 21: are people buying? The honest answer." | LinkedIn, X |
| Support, first 100 tickets | week 4 | V45 | "I answered the first 100 support tickets myself." | LinkedIn, TikTok, X |
| Images launch day | images beat | V54 | "Today Makeborne makes the images too." | X, LinkedIn |
| Day 30: every number | Wed 25 Nov | V39 | "30 days, $1,000, every number." | LinkedIn, X, TikTok, Shorts |
| Day 60 note | around Thu 24 Dec | (template from V39) | "Day 60: what the holidays did to sales." | LinkedIn, X |
| Day 90: including what failed | Sun 24 Jan | V43 | "90 days. Every number, including what failed." | LinkedIn, X, YouTube, TikTok |

Cadence between numbered episodes: one face-to-camera a week on LinkedIn and TikTok (the plan's 15% "Day N" share of video output), filmed on the Monday or Thursday batch day.

---

## 8. Existing film assets: what to cut and what to hold

All paths are in the film library (private; read only; nothing is written there). Status from `research/creative-assets.md`.

| Asset | Use now | Use at a beat | Never |
|---|---|---|---|
| v9 Fly-over `v9-flyover\renders\makeborne-v9-flyover-9x16-1080x1920-60fps.mp4`, `-16x9-3840x2160-60fps.mp4`, `-master-1440x1152-60fps.mp4` | **V01** (pinned film, after the home-page and end-card check); 6 s bumper | — | Crop the 16:9 master to 9:16 |
| v12 real outputs `v12\assets\real\deck\slide-06.png`, `deck-edit\slide-06.png` | **V06**, **V30** static companion | — | Let the "Tern" name be legible |
| v12 real book `v12\assets\real\book-repair\page-01..17.png`, `book_sheet.jpg` | **V15** riffle | — | Show bracketed placeholders (crop them) |
| v14 "Anything" `v14\renders\v14_draft_1080p60.mp4` (draft 1, 43.4 s, 16:9) | Client-approval segment (25.7-29.1 s) as a motion reference for V05 only | **V50** after the fixes listed there | Post as-is: "Start free" end card, concept outputs, missing AI-concept line, wrong publish address |
| v14 stills `v14\gen\sheet_v14.jpg`, `v14\gen\out\*.png`, `v14\gen\write_prompts.py` | Internal quality target for the images pipeline | Style reference for V49-V52 | Show as Makeborne product output |
| v13 "One Sentence" `v13\renders\drafts\v13_draft2_1080p60.mp4` | — | — | Public use (rejected by the owner; concept imagery; "Tidal" is a real brand; its premise is not substantiated: real outputs came from 500-1,000-character briefs) |
| v10 "The List" | The notes-app-to-book insight behind V15 | — | Its spent devices (notes list visuals, paper planes, Grandma Rosa, Lumen); it has no muxed final |
| v12 labs (doodle, rigs) | Texture only, if ever | — | Campaign use |
| Product repo real outputs (Relay Operations, Crux Yard, Osteria Brina and similar; 390-wide captures) | **V16**, **V29** | — | The synthetic "Tide Tables" fixtures, derived book openings or real-business redesigns |

---

## 9. Measuring each video

- **Weekly sheet, per video:** views, 3 s hold, average watch %, sends/shares, saves, comments, profile visits, `/go/` clicks, DM keywords, checkouts opened, net payers (from the Sunday Whop reconciliation by `utm_content`).
- **Keep a format** when it shows at least 1 net payer per 10,000 views across 3+ posts (phase 1 exit gate). Retire the bottom 50% of formats every Sunday.
- **Boost candidate (`b5`):** 3x the account median views in 48 h, a 65%+ 3-second hold, and at least 1 tracked sale or 5+ link clicks per 1,000 views; no boosts 20 Nov - 2 Dec; ad accounts must be billable from BiH (check by 9 Nov [U]).
- **Re-cut rule:** any post above 3x the median gets 2 new hooks within 48 h (new hook code, new `utm_content`).
- **Never judge on views alone.** Cluely's founder reports a 49M-view video that produced fewer than 100 downloads [V, self-reported].

---

## 10. Owner decisions this library raises

| # | Question | Recommendation |
|---|---|---|
| V-O1 | Creator organic reshare rights for 12 months (not in the plan) | Ask for it in the contract; drop it if it costs the deal |
| V-O2 | 7-day no-competing-sponsorship clause | Ask, don't insist |
| V-O3 | If creators refuse $60 for 2 videos | Use the plan's fallback: 4 creators at $75, commission-first |
| V-O4 | Which family or customer stories (V28, V38) may be told | Only true ones, with written consent |
| V-O5 | New `utm_campaign` value `github-beat` for V60 (not in the plan's list) | Approve, or fold it into `launch-2026-10` |
| V-O6 | The refund line in every end card | Update everywhere if D1 changes the rule |

---

## 11. Sources

Read on 26 Oct 2026 unless noted. Internal: `plan/strategy.md`, `data/plan.json`, `research/short-form-video.md`, `research/creative-assets.md`, `research/product-funnel-audit.md`, `research/paid-acquisition.md`, `plan/draft-creator-led.md`, and a read-only look at `film library (private)` (file listing, `v14\gen\sheet_v14.jpg`, the v9 9:16 contact sheet).

New in this pass:
- Influee, "UGC Rates 2026" (published 18 Apr 2025; vendor; no methodology): https://influee.co/blog/ugc-price
- Xolo, "2026's Top UGC Creator Pricing Guide" (5 Jan 2026; vendor): https://blog.xolo.io/top-ugc-creator-pricing-guide-with-rate-examples
- FTC, "Disclosures 101 for Social Media Influencers" (Nov 2019, older but current guidance): https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers
- YouTube Shorts up to 3 minutes from 15 Oct 2024 (secondary, search result; older): https://engadget.com/entertainment/youtube/youtube-shorts-can-now-run-up-to-three-minutes-160002081.html

Carried from the research files (dates as cited there):
- TikTok Ads Help, creative best practices (updated Jun 2025): https://ads.tiktok.com/help/article/creative-best-practices
- TikTok Ads Help, Commercial Music Library (updated Jul 2025): https://ads.tiktok.com/help/article/commercial-music-library
- TikTok Community Guidelines, integrity and authenticity: https://www.tiktok.com/community-guidelines/en/integrity-authenticity
- Socialinsider, 2026 video statistics (21 Aug 2026): https://www.socialinsider.io/social-media-benchmarks/social-media-video-statistics
- Buffer, TikTok posting frequency (8 Oct 2025): https://buffer.com/resources/how-often-should-you-post-on-tiktok/
- Buffer, best content format by platform (19 Mar 2026): https://buffer.com/resources/data-best-content-format-social-media/
- PPC Land on LinkedIn Creative Labs B2B video (Jul 2025): https://ppc.land/linkedin-creative-labs-reveals-what-makes-b2b-video-content-successful/
- TechCrunch, Shorts view counting (26 Mar 2025): https://techcrunch.com/2025/03/26/youtube-is-changing-how-youtube-shorts-views-are-counted
- ManyChat on TikTok (21 Jan 2025; replies to Sep 2025): https://community.manychat.com/product-updates/manychat-is-now-on-tiktok-4826
- Content Rewards, Lovable campaign: https://contentrewards.com/discover/2166e4e5-e0dd-41e3-92d7-42f87590f5f4
- CEO Insider, Maor Shlomo interview (4 Aug 2025): https://ceoinsider.io/interview/maor-shlomo
- viral.app, Cluely (updated 1 Oct 2026): https://viral.app/blog/cluely-viral-strategy
- LightReel, AI prosumer tools on TikTok (24 Oct 2026): https://www.lightreel.ai/blogs/ai-prosumer-tools-on-tiktok
- Passionfroot, Gamma LinkedIn campaign (Q2 2025): https://www.passionfroot.me/partner-story/gamma
- Motion, Creative Benchmarks 2026 (updated 17 Apr 2026): https://motionapp.com/library/research/creative-benchmarks-2026
- FTC final rule on fake reviews (14 Aug 2024): https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
- EU AI Act Art. 50 and timeline (timeline updated 31 Aug 2026, read 26 Oct 2026: the 2 Dec 2026 date covers only systems on the market before 2 Aug 2026; confirm on EUR-Lex): https://artificialintelligenceact.eu/article/50/
- Kompozy, Instagram ranking signals (25 Sep 2026, secondary): https://kompozy.io/news/instagram-mosseri-ranking-signals-guidance

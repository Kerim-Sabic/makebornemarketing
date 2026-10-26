# Makeborne 90-day content and action calendar

**Window:** pre-launch Mon 26 and Tue 27 Oct 2026 (days −2 and −1), then Wed 28 Oct 2026 (day 1, public launch at 19:00 CET) to Mon 25 Jan 2027 (day 90), when the day-90 report posts and the review runs.

> **Launch moved (owner decision, 26 Oct 2026 evening).** The public launch is **Wednesday 28 October 2026 at 19:00 Sarajevo time** (CET, 18:00 UTC); makeborne.com shows a countdown to that moment. Day 1 = Wed 28 Oct; Mon 26 and Tue 27 Oct are pre-launch days −2 and −1 (profiles, scheduling, extra footage, DM keywords, countdown teasers that never say it is live). The launch week moved 2 days later with its times (days 1-7 = 28 Oct - 3 Nov); everything after it keeps its date (ads A01 12-15 Nov and A02 3-4 Dec, creator waves, the no-boost window 20 Nov - 2 Dec, Black Friday, the 22 Nov and 20 Dec checkpoints) and day numbers are recomputed. The 90 days run Wed 28 Oct 2026 - Mon 25 Jan 2027 (day 90, the day-90 review). `data/calendar.json` and the war room are the source of truth; dates and day numbers in the text below that disagree are from before the move.

**Built:** 26 Oct 2026 from `plan/strategy.md`, `data/plan.json`, `data/videos.json`, `data/creatives.json`, `data/outreach.json` and `data/kpis.json`.
**Machine-readable version:** `data/calendar.json` (92 entries: 2 pre-launch days and days 1-90, one per day: date, week, phase, focus, posts, actions, kpiCheck).
**Status:** a plan only. Nothing here has been posted, booked, bought, paid or sent. The owner sends every pitch and approves every payment.

Labels are the plan's: [F] fact, [S] secondary, [V] vendor claim, [E] estimate, [A] assumption, [O] owner decision, [U] unverified.

## How to read it

- **Times** are Sarajevo local time: CET, UTC+1 for the whole window (the EU changed clocks on 25 Oct; the US changes on Sun 1 Nov). The TikTok evening slot is 21:00 until 31 Oct and **21:30 from 1 Nov** (15:30 US East), inside the plan's 20:00-00:00 band. Other fixed slots come from the plan's daily routine: LinkedIn 09:30, TikTok 13:00 with the Reel (13:15) and Short (13:30) re-edits, carousels 18:00 (Thu) and 12:00 (Sat), X 20:00, long YouTube 17:00, Indie Hackers 16:00 on Sundays. Treat them as starting points and move them to what your own analytics show after week 2. (Sprout Social's 2026 study puts TikTok best on Tue 2-6 p.m. and Wed 1-8 p.m. in viewers' local time and LinkedIn Tue-Thu 11 a.m.-5 p.m. [F, sproutsocial.com/insights/best-times-to-post-on-social-media, 31 Mar 2026, data 27 Nov 2025-27 Feb 2026].)
- **contentId** is a video (V01-V60, `data/videos.json`) or a creative (C01-C48, `data/creatives.json`).
- **tag** is `live` (works today and may be promoted) or `beat:<feature>` (coming soon). Beat ids follow `data/plan.json` (`beat-images` -> `beat:images`). The asset files use longer aliases for some beats; they map as `beat:custom-domains` = `beat:domains`, `beat:agency-tools` = `beat:agency`, `beat:ai-lead-research` = `beat:leads`, `beat:github-sync` = `beat:github`.
- **Beat placeholders** (`slot: beat-placeholder`) run **only after that feature has passed the six-box gate** (plan section 9). Every beat slot carries a `fallbackContentId` that is live, so the cadence holds when a feature slips. `null` means skip the slot. The dates are planning guesses, not promises. Move the whole block when the gate passes earlier or later.
- **Conditional live posts** (`requires`) depend on a growth ask or a consent, for example V12 and C09 need the public sample review link (ga5), and V38 needs the customer's written consent (t19).
- **WIN(Vxx)** is a winner slot. In the Sunday review, replace it with the top post of the last 7 days by `/go/` clicks and tracked sales, re-cut with 2 new hooks. The id shown is only a default.
- **Episodes.** When a format id comes back in a later week (for example V04, V02, V29, C06, C37), it is a new episode with a new brief and a new output, never a re-upload. The episode number is in `episode`, and the link and `utm_content` get an `-eNN` suffix so each post is tracked on its own.
- **Links.** Every post has a `makeborne.com/go/<surface>-<id>[-eNN]` link and UTMs (plan section 12). Until `/go/` is live (target Thu 29 Oct), use the full makeborne.com URL with the same UTMs. Never use a Whop store page or a Whop tracking link: only Makeborne-created checkout links are used. `utm_campaign` is `launch-2026-10` for the always-on organic stream, the plan's beat and event ids (`images-beat`, `domains-beat`, `agency-beat`, `leads-beat`, `bf-2026`, `day30`), and two added ids: `topups-beat` and `github-beat`.
- **Action types:** outreach, launch (also covers content production and directory/PH operations), ads, product, analysis. `budgetLineId` is the plan's b1-b9.
- **Creators** post on their own accounts. `/go/c-<handle>` is filled in per creator. Their personal details stay out of this repo.

## Cadence check (scheduled posts per week)

| Week | Dates | TikTok | IG Reels | IG carousels | LinkedIn | X | YT Shorts | YT long | Creator posts | Other (Stories, IH, Reddit, PH, HN) | Counted owned posts* |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 26 Oct-1 Nov | 9 | 5 | 2 | 6 | 7 | 5 | 0 | 0 | 7 | 34 |
| 2 | 2-8 Nov | 9 | 5 | 2 | 5 | 7 | 5 | 0 | 0 | 5 | 33 |
| 3 | 9-15 Nov | 8 | 5 | 2 | 5 | 7 | 5 | 1 | 5 | 5 | 33 |
| 4 | 16-22 Nov | 8 | 5 | 2 | 5 | 7 | 5 | 1 | 7 | 8 | 33 |
| 5 | 23-29 Nov | 8 | 5 | 2 | 5 | 7 | 5 | 1 | 2 | 6 | 33 |
| 6 | 30 Nov-6 Dec | 8 | 5 | 2 | 5 | 7 | 5 | 0 | 1 | 6 | 32 |
| 7 | 7-13 Dec | 8 | 5 | 2 | 5 | 7 | 5 | 1 | 1 | 5 | 33 |
| 8 | 14-20 Dec | 8 | 5 | 2 | 5 | 7 | 5 | 1 | 0 | 6 | 33 |
| 9 | 21-27 Dec | 4 | 3 | 1 | 2 | 3 | 2 | 1 | 0 | 1 | 16 |
| 10 | 28 Dec-3 Jan | 4 | 3 | 1 | 2 | 3 | 2 | 0 | 0 | 1 | 15 |
| 11 | 4-10 Jan | 8 | 5 | 2 | 5 | 7 | 5 | 1 | 0 | 5 | 33 |
| 12 | 11-17 Jan | 8 | 5 | 2 | 5 | 7 | 5 | 0 | 0 | 6 | 32 |
| 13 | 18-24 Jan | 8 | 5 | 2 | 5 | 6 | 5 | 1 | 0 | 4 | 32 |

\* Plan section 5.1 sets the cadence for each surface: TikTok 8-10, Instagram 5 Reels + 2 carousels, LinkedIn 5, X 1 original a day, YouTube 5 Shorts + 1 long every 2 weeks from week 3. This calendar schedules exactly that, using TikTok's lower bound of 8 (9 in weeks 1-2) to protect founder time. Those cadences add up to about 32 posts a week, slightly above the plan's headline "about 25-30 owned posts a week". The difference is X: its daily original is mostly text, about 15 minutes of work. If time runs short, cut X replies first and then long YouTube, as the plan says. Never cut support. Original pieces are about 15 a week (8 TikTok originals, 2 carousels and about 5 LinkedIn/X originals). Reels and Shorts are native re-edits. Weeks 9-10 run at half cadence (about 15 a week), as the plan sets out (12-15).

## Staged feature beats (placeholders)

Each beat runs only after all six gate boxes are ticked: 48 h live in production with 10 golden briefs passed, the AI daily limit raised, the founder free for support that day and the next, copy reviewed (no vendor names, nothing that is not live), `/go/` + UTM links and the per-wave code working, and a legal check on any new duty. For images this is a hard box: EU AI Act Art. 50(2) machine-readable marking from day 1 (marking applies at launch for a new image feature: the 2 Dec 2026 date is only the transition for systems on the market before 2 Aug 2026 [U, confirm on EUR-Lex]). Announce in the first week a feature passes the gate. Never hold a feature for a calendar slot. Keep 7+ days between tier-1 beats. Until a beat runs, customer copy says only "coming soon", with no date.

| Beat | Placeholder in this calendar | Assets scheduled | Live fallbacks in those slots | How to move it |
|---|---|---|---|---|
| `beat:images` (tier 1) | Launch Week 1, Mon 16 - Fri 20 Nov: Mon sites, **Tue 17 Nov Product Hunt main launch 09:01** + Uneed (b6) + PH100, Wed decks, Thu top-ups, Fri books + gallery; follow-ups 21 Nov - 15 Jan (C41, V53 wave 2, V52 picture-book episodes 23 Dec and 14 Jan) | V49, V50, V51, V52, V54, V53 (wave-2 creators), C39, C40, C41, C42, C48 | V48, V25, V26, V28, V37, V15, V02/V03/V29 episodes, C02, C06, C16, C17, C23, C31 | If the gate passes by Fri 6 Nov, the whole block moves to 9-13 Nov. If it passes later, it moves to the first week after the gate. PH runs Tue-Thu only with 400+ committed supporters, otherwise Sat-Sun (go/no-go on Sun 1 Nov). Wave 2 runs only if images are live by Mon 30 Nov; otherwise b4 rehires the best wave-1 creator (4 and 9 Dec). |
| `beat:topups` (tier 3) | Thu 19 Nov (day 4 of Launch Week 1) | V55, C43 | V28, V45, C29 | If it passes alone, run it as a one-day beat on the first weekday after the gate. |
| `beat:domains` (tier 2) | Tue 1 Dec, then V57 speedruns from Wed 9 Dec and in weeks 8 and 11-13 | V56, V57, C44 (+ badge and partner directory, ga17) | V03, V02, V04, V16, C06, C11 | Small-business speedruns go to full volume only after this beat. |
| `beat:agency` (tier 1) | Tue 8 Dec (LinkedIn series); optional PH 'Makeborne for agencies' relaunch Tue 15 Dec | V58, C45 | V26, C07, C13, C20, C10, C31, V29 | The PH relaunch only if it is a significant iteration and 4+ weeks after the images PH launch. |
| `beat:github` (tier 3) | Thu 17 Dec | C47 (one X thread), V60 (one YouTube demo) | V17, V13 | Any time after the gate; never a wave. |
| `beat:leads` (tier 2) | Launch Week 2, Mon 11 Jan (+ gallery expansion Tue, partner program Wed); long tutorial Thu 21 Jan | V59, C46 | V07, V42, V24, V13, C06, C16, C24 | Can join the gallery expansion and the partner program as one Launch Week. |
| Day 30 numbers (no feature) | Wed 25 Nov | V39, C38, C37 | — | Fixed date. |
| Day 90 report (no feature) | Sun 24 Jan (just after this window); filmed 22 Jan | V43, C37 | — | Fixed date. |

## The $1,000, by date

No dollar moves until the spend gate is live (`/go/` links, first touch, and `mb_src`/`mb_campaign`/`mb_aff` on the Makeborne-created Whop checkout). TAAFT is the only exception.

| Line | USD | Date(s) in this calendar | Condition |
|---|---|---|---|
| b1 TAAFT | 49 | Mon 26 Oct | Submitted before any other listing |
| b2 Wave-1 fees (5 x $60) | 300 | Sign from Sat 31 Oct; $150 on Fri 6 Nov (half on signing); $150 on Mon 23 Nov (on delivery of video 2) | Only after the spend gate; videos 10-14 Nov and 17-21 Nov |
| b3 Wave-1 per-view bonus | 90 | Fri 20 Nov and Fri 27 Nov | $1.50 per 1,000 verified views in the first 7 days, capped at $40 a video |
| b4 Wave-2 visual creators | 140 | $60 on Mon 16 Nov, $60 on Fri 27 Nov, $20 pool on Fri 4 Dec | Only if images passed the gate; if not live by Mon 30 Nov, it rehires the best wave-1 creator (posts 4 and 9 Dec) |
| b5 Boosts | 200 | Slot A: Meta partnership ad (card A01) $96 (Thu 12 - Sun 15 Nov, decided by Wed 11 Nov). Slot B: TikTok Spark (card A02) $104 (Thu 3 - Fri 4 Dec). Swap the platforms if the slot-A qualifier is a TikTok (content/ads-playbook.md) | Only posts with a tracked sale; none from 20 Nov to 2 Dec; BiH billing confirmed by 9 Nov, or the line moves to creator rehires |
| b6 Uneed | 30 | Booked only after the 1 Nov images go/no-go (or once Uneed confirms rescheduling [U]); runs on the images PH day (placeholder Tue 17 Nov) | Moves with the images beat; if images slip, the slot moves to the next gated beat |
| b7 IG DM tooling | 30 | Decided Sun 15 Nov | Only if the free tier is outgrown; unspent money joins the reserve on 1 Dec |
| b8 Payout fees | 25 | With each payout: 6 Nov, 20 Nov, 23 Nov, 4 Dec | Low-fee transfer service or batching, never a $30 SWIFT wire |
| b9 Reserve | 136 | Release checks Mon 23 Nov and Mon 14 Dec; unspent money goes to the best source on Thu 24 Dec (day 60) | Released only at CAC <=$50 over 3+ net payers |
| **Total** | **1,000** | | Everything after this is paid from revenue under D4 (30% / 10% / 0% reinvestment, an owner decision) |

## Asset coverage

- **P0 videos first:** all ten P0 videos are used in launch week: V01 Mon 26 Oct, V02 Mon 26 Oct, V03 Mon 26 Oct, V04 Tue 27 Oct, V05 Wed 28 Oct, V06 Fri 30 Oct, V07 Fri 30 Oct, V08 Mon 26 Oct, V09 Sun 01 Nov, V10 Wed 28 Oct.
- **Priority-1 live creatives:** C01 27 Oct, C02 28 Oct, C03 27 Oct, C05 31 Oct, C06 29 Oct, C07 29 Oct, C08 26 Oct, C09 29 Oct, C16 29 Oct, C17 31 Oct, C18 05 Nov, C23 07 Nov, C27 27 Oct, C29 06 Nov, C37 30 Oct.
- **Winners are reposted or re-cut:** every week from week 2 has a TikTok winner slot (Fri 21:30), an Instagram winner Reel (Sun 19:00) and a YouTube winner Short (Fri 13:30). Each is filled at the Sunday review, from the 48-hour reads (posts at 3x or more the median get 2 new hooks).
- **Day 91 (Sun 24 Jan):** V43, the day-90 film (filmed Fri 22 Jan), posts on LinkedIn, TikTok, YouTube Shorts and X.
- **Not posted as their own item (bank/optional):** C32-C36 are link-preview (OG) images for the landing pages, shipped with growth ask ga7 in week 2. C27 and C28 are covers on every V04 and V29 post, and C14, C21, C47 and C48 are long-form thumbnails (`coverId` / `thumbnailId`).

## Standing rules for every post

- Promote only what is live today: AI websites on a Makeborne address, AI books (screen and PDF), AI presentations (PPTX), client review links, the basic CRM and lead finder, manual GitHub export, and the projects library.
- Never say "free", "trial" or "start free". The proof line is "From $20/month + tax. Full refund until you use credits." Change it everywhere if the owner changes D1.
- Never name AI model vendors. Never claim "better than Lovable, Gamma or Framer". Every speed claim is timed on screen or labelled "sped up".
- The lane rule: no "replaced my agency" content on founder LinkedIn, in Lane A briefs, or in anything an agency buyer sees.
- Real businesses appear only on request, using public information only, with a written OK (t20), and stay unpublished by default. Lead-finder results are always blurred.
- No pixels, retargeting or device-stored referral cookies until the consent banner is live (target Sun 6 Dec). Judge every post on `/go/` clicks, DM keywords and Whop sales, never on views.

## Week 1 (26 Oct-1 Nov): Pre-launch (days −2, −1) and launch week (days 1-5; days 6-7 are Mon 2 and Tue 3 Nov)

**Goal:** Ship the paid beta without overclaiming, get the first ~35 gross payers, and have attribution live by Thu 29 Oct so every later dollar can be judged. All 10 P0 videos (V01-V10) go out this week; TAAFT is the only spend.

**Base targets (kpis.json):** 3,500 qualified visits, 35 gross payers (30 net), 18 activated payers, MRR about $1,098 at week end, loop share 0%, owned posts 25-30, creators active 0.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 26 Oct (d1) | Launch day: paid beta live. TAAFT first, P0 launch posts (V01, V02, V03, V08), warm network, nothing promoted that is not live. | V01<br>V02<br>V03 | Reel V01<br>Story C15 | V08 | C08 | V01 | - | Before any post: confirm the three copy fixes and 'coming soon' labels are live or hide the copy (ga3); raise the AI...<br>[b1] Submit the TAAFT listing FIRST ($49, check the launch-first $300 PPC bonus applies to the $49 tier [U]); hold every...<br>Ask engineering for growth asks 1-4 today: /go/ attribution plumbing (ga1), AI limit that scales with paid sign-ups...<br>Set up TikTok business account, Instagram professional, YouTube channel, LinkedIn page; bios 'From $20/month. Full...<br>Check the v9 Fly-over 9:16 against today's home page and its end card; add the 2 s true end card if needed; never...<br>30-50 one-to-one personal messages to the founder's network asking for feedback and intros to agency owners...<br>Evening: reply to every comment; log 'build mine' requests and consent in a private sheet (never in this repo);... |
| Tue 27 Oct (d2) | Directories after TAAFT is live, PH coming-soon page, record the real-speed capture bank, first comment-reply speedrun. | V04 | Reel V02 | C01 | C03 | V02 | - | When the TAAFT listing is live: free directories AlternativeTo (as an alternative to Lovable, Gamma, Framer and...<br>Open the Product Hunt coming-soon page (live features only) and start collecting followers; no upvote asks, ever.<br>Record 4-6 real-speed captures at 2x UI scale: lead finder -> demo site -> review link; client comment -> fix ->...<br>Build the creator shortlist of 30 (wave 1 Lane A + Lane B): audience geography screenshot (60%+ US/UK/EU/CA/AU),...<br>Verify the checkout path: list every link in bios and posts; none may point to a Whop store page or Whop tracking link. |
| Wed 28 Oct (d3) | Client-approval POV (F2) on 3 surfaces, Indie Hackers launch post, r/SideProject story, press draft, join one agency community. | V05 | Reel V05<br>Story C02 | V05 | C12 [no 'play the client' until ga5] | - | Indie Hackers: C12 [no 'play the client' until ga5]<br>Reddit: V10 | Draft /press and the local-language release (Bosnian/Croatian/Serbian) for Friday.<br>Join one agency/freelancer community (Skool, Slack or Discord); contribute only, no links.<br>Owner contacts the top 10 shortlisted creators from the owner's own accounts (t01 Lane A, t02 Lane B). Offer $60 for... |
| Thu 29 Oct (d4) | ATTRIBUTION TARGET DAY (ga1 + ga4). First carousel. First customer calls. No Uneed booking before the 1 Nov go/no-go. | V10 | Carousel C06<br>Story C09 [if ga5; else C22] | C07 [CTA 'uncut build' until ga5] | C16 | V10 | - | Attribution target: ga1 (/go/ redirect, first touch on the account, mb_src/mb_campaign/mb_aff on Makeborne-created...<br>Ship the public sample review link ('play the client', ga5) if ready; otherwise week 2.<br>2-3 video calls with the first payers (t18); fix whatever broke within 24 h.<br>[b6] Do not book Uneed yet: ask Uneed whether a pick-your-date slot can be rescheduled [U]. Book only after the 1 Nov images go/no-go, unless rescheduling is confirmed; fallback: the slot moves to the next gated beat. |
| Fri 30 Oct (d5) | Regional press (owner sends), first 48-hour read and re-cuts, Day 5 numbers, deck proof + lead finder. | V06<br>V07 | Reel V07<br>Story C22 | C37 | C37 | V07 | - | Regional press pitch (owner sends, t16): Netokracija, Bloomberg Adria, Startit, BiH business portals; local-language...<br>First 48-hour read: re-cut every post above 3x the account median with 2 new hooks (they fill next week's winner slots). |
| Sat 31 Oct (d6) | Batch-film day (10 videos for week 2), first creator agreements, write the images-beat PH copy (held until the gate). | - | Carousel C05 | - | C17 | V03 | - | Batch-film 10 videos for week 2 (V11, V13, V14, V15, V16, V18, V30, V44 and two V04/V29 episodes).<br>[b2] Sign the first wave-1 creator agreements (#ad + paid-partnership toggle, 60-day Spark/partnership rights, comped...<br>Write the images-beat Product Hunt copy now (3 taglines <=60 chars, maker first comment, gallery shot list for C40).... |
| Sun 01 Nov (d7) | Day 7 numbers (P2) everywhere, first Sunday review, US clocks change, images go/no-go. | V09 | Reel V09 | V09 | V09 | - | Indie Hackers: C37 | First Sunday review (90 min): scorecard; keep the top 2 formats and retire the bottom half; move the TikTok evening...<br>Images go/no-go: in production and passing 10 golden briefs? If yes, pick the PH day: Tue-Thu with 400+ committed...<br>Confirm the wave-1 lineup (3 Lane A incl. 1+ LinkedIn, 2 Lane B). |

**Sunday check:** Week-1 extras: 5 customer calls; 100+ PH coming-soon followers; 1 regional press mention; >=80% of payers start a first build within 10 minutes (>=90% from week 2). Week 1 scorecard vs base (kpis.json): qualified visits 3500, gross paid 35, net paid 30, activated payers 18, cumulative gross 35, active subs 30, MRR $1098, loop share 0%, owned posts 25-30, creators active 0, CAC n/a. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 2 (2-8 Nov): Phase 1: find the format

**Goal:** Run the full cadence on the 4 core surfaces, onboard wave-1 creators (calls, briefs, use-my-brief links), and ship the trial substitutes: sample review link, review-page loop, format-matched landing pages and /examples. Confirm ad-account billing from BiH by Mon 9 Nov.

**Base targets (kpis.json):** 2,500 qualified visits, 25 gross payers (21 net), 13 activated payers, MRR about $1,882 at week end, loop share 2%, owned posts 25-30, creators active 0.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 02 Nov (d8) | Batch-film day + client-work and comment-reply posts. | V44<br>V04 | Reel V44<br>Story C15 | V11 [CTA 'uncut build' until ga5 + ga7] | C11 | V13 | - | Wave-1 onboarding: one 20-minute call per signed creator this week (brief t03, use-my-brief link, disclosure rules).<br>Week-2 ships: sample review link (ga5), review-page 'Review powered by Makeborne' link with utm_source=review_page +...<br>Read FTC 'Disclosures 101', the EU UCPD and TikTok's branded-content policy at the source before wave 1 posts; get a... |
| Tue 03 Nov (d9) | Deck day. | V14 | Reel V12 [if ga5; else V14] | C10 | C31 | V15 | - | [b5] Start the ad-account checks: can TikTok Ads (Spark) and Meta (partnership ads) accounts be registered and billed...<br>YouTube tutorial creators: contact 8-10 from the list of 20 (t05, affiliate-first t04; commission only after ga9... |
| Wed 04 Nov (d10) | Founder 'Day N' + speedrun. | V11 [CTA 'uncut build' until ga5 + ga7]<br>V16 | Reel V16<br>Story C22 | V13 | V14 | V29 | - | Newsletter editorial pitches with live features only (t12, launchCopy.newsletterPitch), 8-10, owner sends.<br>Ask the agency community admin for a 20-minute no-pitch workshop every two weeks from week 3 (t10). |
| Thu 05 Nov (d11) | Batch-film day + book post + carousel. | V15 | Carousel C18<br>Story C09 [if ga5; else C15] | C20 | C13 | V05 | - | Whop custom affiliates sandbox test (ga9): links to makeborne.com, code passed into the Makeborne-created checkout. |
| Fri 06 Nov (d12) | Client-work post, winner re-cut, boost/payout decisions. | V18<br>WIN(V02) | Reel V15<br>Story C25 | C29 | V30 | WIN(V02) | - | [b2] Creator recruiting window closes (27 Oct - 6 Nov). Pay the first half of wave-1 fees ONLY if the spend gate (ga1) is...<br>[b8] Payout transfer fees for the first-half creator fees (never a $30 SWIFT wire). |
| Sat 07 Nov (d13) | Carousel + light X; no TikTok. | - | Carousel C23 | - | C04 | - | - | - |
| Sun 08 Nov (d14) | Sunday review ritual + winner reel + weekly numbers. | V31 | Reel WIN(V02) | - | V31 | - | Indie Hackers: C37 | Re-forecast rule starts: recompute low/base/high from real visit-to-paid, refund and churn (data/funnel.json). |

**Sunday check:** Week 2 scorecard vs base (kpis.json): qualified visits 2500, gross paid 25, net paid 21, activated payers 13, cumulative gross 60, active subs 51, MRR $1882, loop share 2%, owned posts 25-30, creators active 0, CAC n/a. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 3 (9-15 Nov): Phase 1: first creator wave

**Goal:** Wave-1 creators post video 1 (10-14 Nov). Boost slot A runs only on a post with a tracked sale. Prove Whop custom affiliates with a live purchase and refund. First agency-community workshop and first long YouTube tutorial.

**Base targets (kpis.json):** 3,500 qualified visits, 35 gross payers (30 net), 18 activated payers, MRR about $2,980 at week end, loop share 4%, owned posts 25-30, creators active 5.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 09 Nov (d15) | Batch-film day + client-work and comment-reply posts. | V19<br>V04 | Reel V19<br>Story C15 | V19 | V17 | V22 | - | [b5] DEADLINE: ad accounts registrable and billable from BiH? If not, move b5 ($200) into creator rehires. Boost slot A...<br>Images gate prep: confirm EU AI Act Art. 50(2) timing on EUR-Lex (may apply from 2 Dec 2026 [U]) and...<br>Wave-2 visual creators: shortlist 10 (research only). Contact (t22) only once images are in production and passing...<br>Optional: one experienced PH maker/hunter who has used Makeborne, for pre-launch feedback (t14). Default stays a... |
| Tue 10 Nov (d16) | Deck day. | V23 | Reel V22 | C24 | C19 | V23 | creator TikTok: V32 | Affiliate live test: one real purchase and refund through a custom affiliate link to prove payout and clawback... |
| Wed 11 Nov (d17) | Founder 'Day N' + speedrun. | V21<br>V20 | Reel V21<br>Story C22 | C05 | V20 | V47 | creator TikTok: V33 | - |
| Thu 12 Nov (d18) | Batch-film day + book post + carousel. | V27 | Carousel C06<br>Story C09 [if ga5; else C15] | V23 | V24 | V17<br>long V24 | creator TikTok: V35 | Community workshop #1 (20 min, no pitch): 'win the client before the call'.<br>Newsletter rate-card enquiries (t11), 5 in phase 1; no paid placement until D4 releases revenue. |
| Fri 13 Nov (d19) | Client-work post, winner re-cut, boost/payout decisions. | V47<br>WIN(V04) | Reel V27<br>Story C25 | V30 | V47 | WIN(V04) | creator LinkedIn: V34 | [b5] Boost decision, slot A: qualify = 3x median views in 48 h, 65%+ 3-s hold, AND 1+ tracked sale or 5+ link clicks per...<br>Images gate check (six boxes). If passed, confirm Launch Week 1 for 16-20 Nov, raise the AI limit, recruit wave-2... |
| Sat 14 Nov (d20) | Carousel + light X; no TikTok. | - | Carousel C26 | - | C29 | - | creator Instagram Reels: V36 | [b5] Boost slot A (card A01) runs Thu 12 - Sun 15 Nov if a post qualified: Meta partnership ad $24/day x 4 ($96)... |
| Sun 15 Nov (d21) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V04) | - | C37 | - | Indie Hackers: C37 | [b7] Instagram DM tooling: is the free tier outgrown? Upgrade only if so (b7, up to $30). |

**Sunday check:** Week 3 scorecard vs base (kpis.json): qualified visits 3500, gross paid 35, net paid 30, activated payers 18, cumulative gross 95, active subs 81, MRR $2980, loop share 4%, owned posts 25-30, creators active 5, CAC measure. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 4 (16-22 Nov): Phase 1: offer check + images Launch Week (placeholder)

**Goal:** Mon 16 Nov offer check decides D1/D2 before any more paid views. If images passed the gate, run Launch Week 1 (sites, PH main launch Tue 17 Nov, decks, top-ups, books). Otherwise every beat slot posts its live fallback. Creators post video 2. No boosts from Fri 20 Nov. Sun 22 Nov band check.

**Base targets (kpis.json):** 4,000 qualified visits, 40 gross payers (34 net), 20 activated payers, MRR about $4,234 at week end, loop share 6%, owned posts 25-30, creators active 5.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 16 Nov (d22) | Beat slot: beat:images (each post has a live fallback). | V49 [beat:images; else V48]<br>V04 | Reel V49 [beat:images; else V48]<br>Story C15 | C39 [beat:images; else C02] | C39 [beat:images; else C16] | V49 [beat:images; else V29] | - | OFFER CHECK (week 3): if no source has net payers at <=$50 CAC, or /go/ visit-to-paid <0.7%, change the offer before...<br>[b4] If images passed: sign the 2 wave-2 visual creators, half fee on signing.<br>If MRR >= ~$2k: review help from revenue (owner's private notes).<br>IMAGES LAUNCH WEEK 1, day 1 (placeholder): images in sites (V49, C39). Only if the six-box gate passed by Fri 13... |
| Tue 17 Nov (d23) | Beat slot: beat:images (each post has a live fallback). | V50 [beat:images; else V25] | Reel V50 [beat:images; else V25] | V54 [beat:images; else V25] | V54 [beat:images; else C31] | V50 [beat:images; else V03] | creator TikTok: V32<br>Product Hunt: C40 [beat:images; else skip] | [b6] IMAGES BEAT (placeholder): PH main launch 09:01 CET from the founder's account; Uneed slot runs today; PH100 code...<br>European press follow-up at the images beat (t17, owner sends) and newsletter editorial re-pitch (t12). Only if the... |
| Wed 18 Nov (d24) | Beat slot: beat:images (each post has a live fallback). | V51 [beat:images; else V26]<br>V45 | Reel V51 [beat:images; else V26]<br>Story C22 | C42 [beat:images; else C16] | C42 [beat:images; else C17] | V51 [beat:images; else V02] | creator TikTok: V33<br>Reddit: V49 [beat:images; else skip] | IMAGES LAUNCH WEEK 1, day 3 (placeholder): images in decks: full-image slides with quality and aspect controls (V51,... |
| Thu 19 Nov (d25) | Beat slot: beat:images, beat:topups (each post has a live fallback). | V55 [beat:topups; else V28] | Carousel C39 [beat:images; else C06]<br>Story C09 [if ga5; else C15] | V55 [beat:topups; else V45] | V55 [beat:topups; else V45] | V29 | creator TikTok: V35<br>creator TikTok: V53 [beat:images; else skip] | TOP-UPS BEAT (placeholder, day 4 of Launch Week): changelog line + C43 header; only if top-ups passed the gate. |
| Fri 20 Nov (d26) | Beat slot: beat:images (each post has a live fallback). | V52 [beat:images; else V37]<br>WIN(V05) | Reel V52 [beat:images; else V28]<br>Story C25 | V50 [beat:images; else V37] | V50 [beat:images; else V37] | WIN(V05)<br>long C48 [beat:images; else skip] | creator LinkedIn: V34<br>Indie Hackers: V54 [beat:images; else skip] | IMAGES LAUNCH WEEK 1, day 5 (placeholder): images in books + the gallery showcase (V52, C41 next day, C48 YouTube...<br>NO BOOSTS from today to Wed 2 Dec (Black Friday CPMs).<br>[b3] Wave-1 per-view bonus payout, week 1 videos: $1.50 per 1,000 verified views in each video's first 7 days, cap $40 a...<br>[b8] Payout transfer fees for the bonus batch. |
| Sat 21 Nov (d27) | Beat slot: beat:images, beat:topups (each post has a live fallback). | - | Carousel C41 [beat:images; else C23] | - | C43 [beat:topups; else C29] | - | creator Instagram Reels: V36 | - |
| Sun 22 Nov (d28) | Beat slot: beat:images (each post has a live fallback). | - | Reel WIN(V05) | - | C37 | - | Indie Hackers: C37<br>creator Instagram Reels: V53 [beat:images; else skip] | Cumulative gross paid check: <100 = low-to-base band, protect margin; 100-300 = base; >=300 = breakout path, raise... |

**Sunday check:** Cumulative gross paid band check (<100 / 100-200 / >=200; breakout needs ~200). Week 4 scorecard vs base (kpis.json): qualified visits 4000, gross paid 40, net paid 34, activated payers 20, cumulative gross 135, active subs 115, MRR $4234, loop share 6%, owned posts 25-30, creators active 5, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 5 (23-29 Nov): Phase 2: proof and Black Friday

**Goal:** Day-30 public numbers on Wed 25 Nov (Indie Hackers, LinkedIn, X, press follow-up). Black Friday to Cyber Monday says only 'yearly is 20% off'. Images follow-ups and wave-2 creators run only if images are live. Phase-2 product loops start (referral credits, share links, lifecycle emails).

**Base targets (kpis.json):** 4,500 qualified visits, 45 gross payers (38 net), 27 activated payers, MRR about $5,552 at week end, loop share 8%, owned posts 25-30, creators active 7.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 23 Nov (d29) | Batch-film day + client-work and comment-reply posts. | V46<br>V04 | Reel V46<br>Story C15 | C03 | V37 | V29 | - | [b2] Wave-1 second half of fees on delivery of video 2 (only verified, disclosed posts).<br>[b8] Payout transfer fees for the second-half creator fees.<br>[b9] Reserve release check (b9): only if a source shows CAC <=$50 over 3+ net payers. Order: bonus overflow, rehire... |
| Tue 24 Nov (d30) | Deck day. | V03 | Reel V03 | V13 | C17 | V23<br>long V23 | - | Community workshop #2 (moved from Thu 26 Nov, US Thanksgiving): 'approval without email chaos'. |
| Wed 25 Nov (d31) | Beat slot: beat:images (each post has a live fallback). | V39<br>V02 | Reel V39<br>Story C22 | V39 | V39 | V39 | creator TikTok: V53 [beat:images; else skip] | DAY-30 PUBLIC NUMBERS (beat-day30): MRR, payers, refunds, AI cost per build, lessons; Indie Hackers, LinkedIn (C38...<br>Day-30 press follow-up: European tech reporters (t17) and the regional outlets from week 1 (owner sends).<br>Phase-2 product kickoff: referral credits +100 each side on a non-refunded first payment (ga12), deck/book share... |
| Thu 26 Nov (d32) | Batch-film day + book post + carousel. | V27 | Carousel C38<br>Story C09 [if ga5; else C15] | V07 | C04 | V02 | - | - |
| Fri 27 Nov (d33) | Client-work post, winner re-cut, boost/payout decisions. | V40<br>WIN(V03) | Reel V40<br>Story C25<br>Story C30 | V40 | V40 | WIN(V03) | - | BLACK FRIDAY to Cyber Monday (27-30 Nov): message is only 'yearly is 20% off' (already true). No extra discount, no...<br>[b3] Wave-1 per-view bonus payout, week 2 videos (cap per video $40; pool total $90; overflow from reserve means a winner).<br>[b4] If wave 2 ran: second half of wave-2 fees on delivery. |
| Sat 28 Nov (d34) | Beat slot: beat:images (each post has a live fallback). | - | Carousel C18 | - | V02 | - | creator Instagram Reels: V53 [beat:images; else skip] | - |
| Sun 29 Nov (d35) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V03) | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 5 scorecard vs base (kpis.json): qualified visits 4500, gross paid 45, net paid 38, activated payers 27, cumulative gross 180, active subs 150, MRR $5552, loop share 8%, owned posts 25-30, creators active 7, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 6 (30 Nov-6 Dec): Phase 2: domains beat (placeholder) and consent

**Goal:** Custom-domains beat placeholder Tue 1 Dec (badge + partner directory). Boost slot B from Thu 3 Dec. Consent banner and server-side purchase events by Sun 6 Dec. Wave-1 keep/kill read. Founding-partner invites start.

**Base targets (kpis.json):** 3,500 qualified visits, 35 gross payers (30 net), 21 activated payers, MRR about $6,566 at week end, loop share 10%, owned posts 25-30, creators active 7.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 30 Nov (d36) | Batch-film day + client-work and comment-reply posts. | V40<br>V04 | Reel V40<br>Story C15<br>Story C30 | V12 [if ga5; else C02] | V40 | V29 | - | [b4] Images not live by today? Then move b4 to rehiring the best wave-1 creator (2 videos, posts 4 and 9 Dec).<br>Consent banner (CMP) + Google Consent Mode v2 build starts (ga15); target live by Sun 6 Dec, then server-side... |
| Tue 01 Dec (d37) | Beat slot: beat:domains (each post has a live fallback). | V56 [beat:domains; else V03] | Reel V56 [beat:domains; else V03] | V56 [beat:domains; else C11] | C13 | V56 [beat:domains; else V03] | - | CUSTOM-DOMAINS BEAT (placeholder): 'Client sites now go live on the client's own domain'; LinkedIn li-beat-domains,...<br>[b7] Unspent IG DM tooling budget rolls into the reserve today. |
| Wed 02 Dec (d38) | Founder 'Day N' + speedrun. | V31<br>V37 | Reel V37<br>Story C22 | C37 | V31 | V02 | - | Founding-partner invites to paying agencies and active community members (t09): 30% recurring for 12 months, first... |
| Thu 03 Dec (d39) | Beat slot: beat:domains (each post has a live fallback). | V15 | Carousel C44 [beat:domains; else C06]<br>Story C09 [if ga5; else C15] | C05 | C19 | V13 | - | [b5] Boost slot B (card A02) from today: TikTok Spark on the best qualifying post ($52/day x 2, Thu 3 - Fri 4 Dec, $104)... |
| Fri 04 Dec (d40) | Client-work post, winner re-cut, boost/payout decisions. | V25<br>WIN(V07) | Reel V15<br>Story C25 | V30 | V06 | WIN(V07) | creator TikTok: V32 | [b4] Wave-2 bonus pool ($20) on verified views, or rehire payout if b4 moved.<br>[b8] Payout transfer fees. |
| Sat 05 Dec (d41) | Carousel + light X; no TikTok. | - | Carousel C23 | - | V10 | - | - | - |
| Sun 06 Dec (d42) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V07) | - | C37 | - | Indie Hackers: C37 | Consent banner live target (ga15). Until it is live: no pixels, no retargeting, no device-stored referral cookies.<br>Wave-1 keep/kill read (14 days after video 2): keep at 1 net payer per $40; kill at $100 with 0 or $150 with 1;... |

**Sunday check:** Consent banner live? Phase-2 exit gate items: loops >=15%, refunds <=15%, 1+ creator rehired on the scale rule, consent live. Week 6 scorecard vs base (kpis.json): qualified visits 3500, gross paid 35, net paid 30, activated payers 21, cumulative gross 215, active subs 178, MRR $6566, loop share 10%, owned posts 25-30, creators active 7, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 7 (7-13 Dec): Phase 2: agency beat (placeholder) and loops

**Goal:** Agency-tools beat placeholder Tue 8 Dec. First consented customer story. Content Rewards from revenue only if the gate is met (Mon 7 Dec). Loops toward 12% of new payers.

**Base targets (kpis.json):** 4,000 qualified visits, 40 gross payers (34 net), 24 activated payers, MRR about $7,716 at week end, loop share 12%, owned posts 25-30, creators active 9.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 07 Dec (d43) | Batch-film day + client-work and comment-reply posts. | V07<br>V04 | Reel V07<br>Story C15 | V07 | V30 | V07 | - | Content Rewards gate: a source at <=$50 CAC on 3+ payers AND MRR > ~$1.5k? If yes, open Whop Content Rewards from... |
| Tue 08 Dec (d44) | Beat slot: beat:agency (each post has a live fallback). | V26 | Reel V58 [beat:agency; else V26] | V58 [beat:agency; else C07] | V58 [beat:agency; else C13] | V58 [beat:agency; else V29] | - | AGENCY-TOOLS BEAT (placeholder): 'Run client work in one place'; LinkedIn series (li-beat-agency), community... |
| Wed 09 Dec (d45) | Beat slot: beat:domains (each post has a live fallback). | V21<br>V57 [beat:domains; else V02] | Reel V57 [beat:domains; else V02]<br>Story C22 | C37 | V57 [beat:domains; else V02] | V57 [beat:domains; else V02] | creator TikTok: V32 | - |
| Thu 10 Dec (d46) | Beat slot: beat:agency (each post has a live fallback). | V28 | Carousel C06<br>Story C09 [if ga5; else C15] | C45 [beat:agency; else C20] | C16 | V22 | - | Community workshop #3: 'one brief, three deliverables'. |
| Fri 11 Dec (d47) | Client-work post, winner re-cut, boost/payout decisions. | V18<br>WIN(V06) | Reel V28<br>Story C25 | V38 [if written consent from the customer; else C24] | V38 [if written consent from the customer; else C29] | WIN(V06)<br>long V17 | - | - |
| Sat 12 Dec (d48) | Carousel + light X; no TikTok. | - | Carousel C18 | - | V06 | - | - | - |
| Sun 13 Dec (d49) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V06) | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 7 scorecard vs base (kpis.json): qualified visits 4000, gross paid 40, net paid 34, activated payers 24, cumulative gross 255, active subs 209, MRR $7716, loop share 12%, owned posts 25-30, creators active 9, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 8 (14-20 Dec): Phase 2: last push before the holidays

**Goal:** Optional PH 'Makeborne for agencies' relaunch Tue 15 Dec (only if significant and 4+ weeks after images). GitHub-sync beat Thu 17 Dec (X thread + YouTube demo only). Last text-led book push before ~20 Dec. Breakout check Sun 20 Dec. Bank the holiday content.

**Base targets (kpis.json):** 4,000 qualified visits, 40 gross payers (34 net), 24 activated payers, MRR about $8,847 at week end, loop share 15%, owned posts 25-30, creators active 10.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 14 Dec (d50) | Batch-film day + client-work and comment-reply posts. | V05<br>V04 | Reel V05<br>Story C15 | C02 | V05 | V05 | - | [b9] Reserve check (b9) and D4 split for the last full pre-holiday week; share-for-credits (ga20) scoping for phase 3. |
| Tue 15 Dec (d51) | Beat slot: beat:agency (each post has a live fallback). | V14 | Reel V14 | V58 [beat:agency; else C10] | C45 [beat:agency; else C31] | V29 | Product Hunt: V58 [beat:agency; else skip] | OPTIONAL PH 'Makeborne for agencies' relaunch: only if a significant iteration and 4+ weeks after the images launch;... |
| Wed 16 Dec (d52) | Beat slot: beat:domains (each post has a live fallback). | V31<br>V57 [beat:domains; else V16] | Reel V57 [beat:domains; else V16]<br>Story C22 | C37 | V31 | V57 [beat:domains; else V02] | - | - |
| Thu 17 Dec (d53) | Beat slot: beat:github (each post has a live fallback). | V15 | Carousel C23<br>Story C09 [if ga5; else C15] | V05 | C47 [beat:github; else V17] | V03<br>long V60 [beat:github; else V13] | - | GITHUB-SYNC BEAT (placeholder): one X thread (x-beat-github, C47) and one YouTube demo (V60) only. Not a wave.<br>Batch-film and schedule all banked content for 21 Dec - 3 Jan (half cadence). |
| Fri 18 Dec (d54) | Client-work post, winner re-cut, boost/payout decisions. | V48<br>WIN(V10) | Reel V15<br>Story C25 | V25 | V14 | WIN(V10) | - | - |
| Sat 19 Dec (d55) | Carousel + light X; no TikTok. | - | Carousel C06 | - | V10 | - | - | - |
| Sun 20 Dec (d56) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V10) | - | C37 | - | Indie Hackers: C37 | Breakout check: ~750 cumulative gross payers needed for the $1M path by today. Last day for text-led book pushes;... |

**Sunday check:** Breakout check (~750 cumulative gross). Week 8 scorecard vs base (kpis.json): qualified visits 4000, gross paid 40, net paid 34, activated payers 24, cumulative gross 295, active subs 240, MRR $8847, loop share 15%, owned posts 25-30, creators active 10, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 9 (21-27 Dec): Phase 2/3: half cadence

**Goal:** Banked posts only (about 15 a week). Support and customer calls continue. Day-60 note on Thu 24 Dec; unspent reserve moves to the best source.

**Base targets (kpis.json):** 3,000 qualified visits, 30 gross payers (26 net), 18 activated payers, MRR about $9,593 at week end, loop share 15%, owned posts 12-15, creators active 8.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 21 Dec (d57) | Batch-film day + client-work and comment-reply posts. | V16 | Reel V16 | C37 | V16 | - | - | Half cadence starts (21 Dec - 3 Jan): banked posts only, replies and support continue, customer calls continue. |
| Tue 22 Dec (d58) | Deck day. | - | Carousel C06 | - | - | V22<br>long V22 | - | - |
| Wed 23 Dec (d59) | Beat slot: beat:images (each post has a live fallback). | V52 [beat:images; else V03] | Reel V52 [beat:images; else V03] | C07 | - | - | - | - |
| Thu 24 Dec (d60) | Batch-film day + book post + carousel. | - | - | - | C37 | - | Indie Hackers: C37 | [b9] Day 60: draft the day-60 note; unspent reserve (b9) moves to the best source by CAC; loops share check (exit gate 15%). |
| Fri 25 Dec (d61) | Client-work post, winner re-cut, boost/payout decisions. | V29 | - | - | - | V29 | - | - |
| Sat 26 Dec (d62) | Carousel + light X; no TikTok. | - | Reel V09 | - | - | - | - | - |
| Sun 27 Dec (d63) | Sunday review ritual + winner reel + weekly numbers. | V09 | - | - | V21 | - | - | - |

**Sunday check:** Week 9 scorecard vs base (kpis.json): qualified visits 3000, gross paid 30, net paid 26, activated payers 18, cumulative gross 325, active subs 260, MRR $9593, loop share 15%, owned posts 12-15, creators active 8, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 10 (28 Dec-3 Jan): Phase 3: half cadence and January bank

**Goal:** Banked posts only. Bank 'new year, new clients' content. No beats.

**Base targets (kpis.json):** 2,500 qualified visits, 25 gross payers (21 net), 15 activated payers, MRR about $10,180 at week end, loop share 16%, owned posts 12-15, creators active 8.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 28 Dec (d64) | Batch-film day + client-work and comment-reply posts. | V18 | Reel V18 | - | V30 | - | - | Bank 'new year, new clients' content: V41, V42, lead finder episodes, 'new year, new website' speedruns (V57 if... |
| Tue 29 Dec (d65) | Deck day. | - | - | C37 | - | V22 | - | - |
| Wed 30 Dec (d66) | Founder 'Day N' + speedrun. | V14 | Reel V14 | C24 | - | - | - | - |
| Thu 31 Dec (d67) | Batch-film day + book post + carousel. | - | Carousel C18 | - | C12 | - | - | - |
| Fri 01 Jan (d68) | Client-work post, winner re-cut, boost/payout decisions. | V29 | - | - | - | V29 | - | - |
| Sat 02 Jan (d69) | Carousel + light X; no TikTok. | - | Reel V44 | - | - | - | - | - |
| Sun 03 Jan (d70) | Sunday review ritual + winner reel + weekly numbers. | V44 | - | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 10 scorecard vs base (kpis.json): qualified visits 2500, gross paid 25, net paid 21, activated payers 15, cumulative gross 350, active subs 276, MRR $10180, loop share 16%, owned posts 12-15, creators active 8, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 11 (4-10 Jan): Phase 3: new year, new clients

**Goal:** Full cadence returns. Lead finder + demo site + review link, 2027 pitch decks, 'new year, new website' speedruns (on own domains if that beat has run). Consent-based purchase-optimised boosts from revenue only.

**Base targets (kpis.json):** 4,500 qualified visits, 45 gross payers (38 net), 27 activated payers, MRR about $11,381 at week end, loop share 18%, owned posts 25-30, creators active 14.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 04 Jan (d71) | Beat slot: beat:domains (each post has a live fallback). | V42<br>V57 [beat:domains; else V04] | Reel V42<br>Story C15 | V42 | V42 | V42 | - | Full cadence back: 'new year, new clients'.<br>D16 check: add a faceless outputs account or freelancer-niche TikTok only if the editor is in place and a format has... |
| Tue 05 Jan (d72) | Deck day. | V41 | Reel V41 | V41 | V41 | V03 | - | With consent live: move winning Spark/partnership ads to purchase-optimised campaigns and small retargeting of... |
| Wed 06 Jan (d73) | Founder 'Day N' + speedrun. | V31<br>V02 | Reel V02<br>Story C22 | C37 | V31 | V02 | - | - |
| Thu 07 Jan (d74) | Batch-film day + book post + carousel. | V27 | Carousel C10<br>Story C09 [if ga5; else C15] | C10 | C11 | V13<br>long V42 | - | Community workshop #4: 'new year, new clients' (the 24 Dec slot was skipped). |
| Fri 08 Jan (d75) | Client-work post, winner re-cut, boost/payout decisions. | V19<br>WIN(V04) | Reel V27<br>Story C25 | V38 [if written consent from the customer; else C29] | C19 | WIN(V04) | - | - |
| Sat 09 Jan (d76) | Carousel + light X; no TikTok. | - | Carousel C18 | - | V02 | - | - | - |
| Sun 10 Jan (d77) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V04) | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 11 scorecard vs base (kpis.json): qualified visits 4500, gross paid 45, net paid 38, activated payers 27, cumulative gross 395, active subs 308, MRR $11381, loop share 18%, owned posts 25-30, creators active 14, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 12 (11-17 Jan): Phase 3: Launch Week 2 (placeholder)

**Goal:** AI lead research beat Mon 11 Jan if gated; /examples gallery expansion; public partner program. Show HN only if a capped preview or no-login demo exists.

**Base targets (kpis.json):** 5,000 qualified visits, 50 gross payers (42 net), 30 activated payers, MRR about $12,717 at week end, loop share 19%, owned posts 25-30, creators active 18.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 11 Jan (d78) | Beat slot: beat:domains, beat:leads (each post has a live fallback). | V59 [beat:leads; else V07]<br>V57 [beat:domains; else V04] | Reel V59 [beat:leads; else V07]<br>Story C15 | V59 [beat:leads; else V42] | C46 [beat:leads; else C16] | V59 [beat:leads; else V07] | - | LAUNCH WEEK 2 (placeholder): Mon AI lead research beat (if gated), Tue /examples gallery expansion, Wed public... |
| Tue 12 Jan (d79) | Deck day. | V16 | Reel V16 | C20 | V16 | V29 | - | Gallery expansion: /examples grows to 30+ unedited outputs with brief, time and credits (C36 OG). |
| Wed 13 Jan (d80) | Founder 'Day N' + speedrun. | V31<br>V02 | Reel V02<br>Story C22 | C37 | C29 | V02 | - | Public affiliate program opens (20% for 12 months; yearly first payment only; no brand bidding; Whop custom... |
| Thu 14 Jan (d81) | Beat slot: beat:images, beat:leads (each post has a live fallback). | V52 [beat:images; else V15] | Carousel C46 [beat:leads; else C06]<br>Story C09 [if ga5; else C15] | C46 [beat:leads; else C24] | C31 | V13 | Hacker News: V10 [if D2 capped preview or a no-login demo exists; else skip] | - |
| Fri 15 Jan (d82) | Beat slot: beat:images, beat:leads (each post has a live fallback). | V12 [if ga5; else V05]<br>WIN(V02) | Reel V52 [beat:images; else V15]<br>Story C25 | V38 [if written consent from the customer; else C29] | V59 [beat:leads; else V07] | WIN(V02) | - | - |
| Sat 16 Jan (d83) | Carousel + light X; no TikTok. | - | Carousel C23 | - | V03 | - | - | - |
| Sun 17 Jan (d84) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V02) | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 12 scorecard vs base (kpis.json): qualified visits 5000, gross paid 50, net paid 42, activated payers 30, cumulative gross 445, active subs 345, MRR $12717, loop share 19%, owned posts 25-30, creators active 18, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 13 (18-25 Jan, day 90 on Mon 25 Jan): Phase 3: scale what pays, day-90 report

**Goal:** Reinvest only into sources at or under target CAC. Film V43 and build the day-90 numbers; post them and run the review on Sun 24 Jan (day 91).

**Base targets (kpis.json):** 5,500 qualified visits, 55 gross payers (47 net), 33 activated payers, MRR about $14,198 at week end, loop share 20%, owned posts 25-30, creators active 22.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 18 Jan (d85) | Beat slot: beat:domains (each post has a live fallback). | V05<br>V57 [beat:domains; else V04] | Reel V05<br>Story C15 | C01 | V05 | V05 | - | Scale review: only sources at or under target CAC get the D4 reinvestment; Content Rewards +20-30% steps only at CAC... |
| Tue 19 Jan (d86) | Deck day. | V06 | Reel V06 | C17 | C17 | V03 | - | - |
| Wed 20 Jan (d87) | Founder 'Day N' + speedrun. | V21<br>V02 | Reel V02<br>Story C22 | C37 | V21 | V02 | - | - |
| Thu 21 Jan (d88) | Beat slot: beat:leads (each post has a live fallback). | V27 | Carousel C06<br>Story C09 [if ga5; else C15] | V13 | C13 | V59 [beat:leads; else V13]<br>long V59 [beat:leads; else V24] | - | Community workshop #5: AI lead research (if live) or the full client workflow. |
| Fri 22 Jan (d89) | Client-work post, winner re-cut, boost/payout decisions. | V07<br>WIN(V05) | Reel V27<br>Story C25 | V38 [if written consent from the customer; else C29] | C12 | WIN(V05) | - | Film the day-90 founder video V43 and build the numbers card C37 for Sun 24 Jan (outside this window): net payers,... |
| Sat 23 Jan (d90) | Carousel + light X; no TikTok. | - | Reel WIN(V05)<br>Carousel C18 | - | C37 | - | - | Day-90 report prep and review agenda for Sun 24 Jan: which surfaces to keep; free-tier and preview decision for next... |
| Sun 24 Jan (d91) | Day-90 report and review. | V43 | - | V43 | V43 | V43 (Short) | - | Day-90 review with the owner (keep / kill surfaces, free-tier and preview decision, D17); publish the public report if D11 is approved; day-90 press follow-up (owner sends). |

**Sunday check:** Week 13 scorecard vs base (kpis.json): qualified visits 5500, gross paid 55, net paid 47, activated payers 33, cumulative gross 500, active subs 385, MRR $14198, loop share 20%, owned posts 25-30, creators active 22, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast. (Week 13 ends Sun 24 Jan, outside this window; the day-90 review uses the full week.)

## Every day (recurring, in `calendar.json` actions)

- 08:00 numbers block (Whop sales and refunds, `/go/` clicks by source, AI limit hits, first-build times) every day except Sunday.
- Weekdays: 15 LinkedIn comments on agency-owner posts, 20 X replies, 1 contribution to the agency community with no links, and 1 customer call from week 2. Weeks 9-10 drop to replies only.
- Mondays and Thursdays: a batch-film block (8-10 videos). Mondays from 9 Nov: the D4 reinvestment calculation. Thursdays from 5 Nov: the customer changelog email (owner sign-off before the first send). Fridays: the boost check (only inside a slot window and only with b5 money left) and the support sweep. Sundays: the 90-minute review.
- Daily KPI check: first build within 10 minutes for 90%+ of payers; the AI limit not hit on a day with new payers; support first reply within 4 hours; any Whop payment without a Makeborne-created checkout triggers a same-day alert; a 48-hour read on each post.

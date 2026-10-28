# Makeborne 90-day content and action calendar

**Window:** pre-launch Mon 26, Tue 27 and Wed 28 Oct 2026 (days −3, −2 and −1), then Thu 29 Oct 2026 (day 1, public launch at 01:30 CET, overnight) to Tue 26 Jan 2027 (day 90), when the day-90 report posts and the review runs.

> **Launch moved again (owner decision, Wed 28 Oct 2026, 22:00).** The public launch is **Thursday 29 October 2026 at 01:30 Sarajevo time** (CET, 00:30 UTC), overnight; makeborne.com counts down to that moment. The launch posts (T7, S8) and the waitlist invite go out at 01:30-01:35; Thursday's daytime and evening posts say it is open (LinkedIn 08:45, X thread 14:00, V01 21:30). On 27 Oct it had moved to Thu 21:00. Day 1 = Thu 29 Oct; Mon 26, Tue 27 and Wed 28 Oct are pre-launch days −3, −2 and −1. The launch week moved 1 more day (days 1-7 = 29 Oct - 4 Nov); launch day runs around 21:00 (T7 "We're live" at 21:00, V01 at 21:30). The countdown teasers T3-T6 and Stories S1-S3 have the old Wednesday time burned in and are not posted; "Guess the build time" (T8) is the Wed 28 Oct 21:00 post, and screen-recording Stories S4-S8 use the real countdown. Everything after the launch week keeps its date (ads A01 12-15 Nov and A02 3-4 Dec, creator waves, the no-boost window 20 Nov - 2 Dec, Black Friday, the 22 Nov and 20 Dec checkpoints). The 90 days run Thu 29 Oct 2026 - Tue 26 Jan 2027 (day 90, the day-90 review). `data/calendar.json` and the war room are the source of truth; dates and day numbers in the text below that disagree are from before the move.

**Built:** 26 Oct 2026 from `plan/strategy.md`, `data/plan.json`, `data/videos.json`, `data/creatives.json`, `data/outreach.json` and `data/kpis.json`.
**Machine-readable version:** `data/calendar.json` (93 entries: 3 pre-launch days and days 1-90, one per day: date, week, phase, focus, posts, actions, kpiCheck).
**Status:** a plan only. Nothing here has been posted, booked, bought, paid or sent. The owner sends every pitch and approves every payment.

Labels are the plan's: [F] fact, [S] secondary, [V] vendor claim, [E] estimate, [A] assumption, [O] owner decision, [U] unverified.

## How to read it

- **Times** are Sarajevo local time: CET, UTC+1 for the whole window (the EU changed clocks on 25 Oct; the US changes on Sun 1 Nov). On launch night T7 goes out at 01:30-01:32 and on launch evening the TikToks go out between 21:30 and 22:30; from Mon 2 Nov the TikTok evening slot is **21:30** (15:30 US East, after the US clock change on Sun 1 Nov), inside the plan's 20:00-00:00 band. Other fixed slots come from the plan's daily routine: LinkedIn 09:30, TikTok 13:00 with the Reel (13:15) and Short (13:30) re-edits, carousels 18:00 (Thu) and 12:00 (Sat), X 20:00, long YouTube 17:00, Indie Hackers 16:00 (on Sundays from week 2). Treat them as starting points and move them to what your own analytics show after week 2. (Sprout Social's 2026 study puts TikTok best on Tue 2-6 p.m. and Wed 1-8 p.m. in viewers' local time and LinkedIn Tue-Thu 11 a.m.-5 p.m. [F, sproutsocial.com/insights/best-times-to-post-on-social-media, 31 Mar 2026, data 27 Nov 2025-27 Feb 2026].)
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
| 1 | 26 Oct-1 Nov | 8 | 5 | 1 | 4 | 4 | 5 | 0 | 0 | 10 | 27 |
| 2 | 2-8 Nov | 11 | 5 | 3 | 5 | 7 | 6 | 0 | 0 | 7 | 37 |
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
| 13 | 18-26 Jan | 9 | 5 | 2 | 6 | 7 | 6 | 1 | 0 | 4 | 36 |

\* Plan section 5.1 sets the cadence for each surface: TikTok 8-10, Instagram 5 Reels + 2 carousels, LinkedIn 5, X 1 original a day, YouTube 5 Shorts + 1 long every 2 weeks from week 3. This calendar schedules exactly that, using TikTok's lower bound of 8 to protect founder time. Week 1 is lighter because it starts with three pre-launch days (teasers and Stories only); week 2 is heavier because it finishes the launch week (to Wed 4 Nov) and holds an optional T8 repost; week 13 runs 9 days, to day 90 on Tue 26 Jan. Those cadences add up to about 32 posts a week, slightly above the plan's headline "about 25-30 owned posts a week". The difference is X: its daily original is mostly text, about 15 minutes of work. If time runs short, cut X replies first and then long YouTube, as the plan says. Never cut support. Original pieces are about 15 a week (8 TikTok originals, 2 carousels and about 5 LinkedIn/X originals). Reels and Shorts are native re-edits. Weeks 9-10 run at half cadence (about 15 a week), as the plan sets out (12-15).

## Staged feature beats (placeholders)

Each beat runs only after all six gate boxes are ticked: 48 h live in production with 10 golden briefs passed, the AI daily limit raised, the founder free for support that day and the next, copy reviewed (no vendor names, nothing that is not live), `/go/` + UTM links and the per-wave code working, and a legal check on any new duty. For images this is a hard box: EU AI Act Art. 50(2) machine-readable marking from day 1 (marking applies at launch for a new image feature: the 2 Dec 2026 date is only the transition for systems on the market before 2 Aug 2026 [U, confirm on EUR-Lex]). Announce in the first week a feature passes the gate. Never hold a feature for a calendar slot. Keep 7+ days between tier-1 beats. Until a beat runs, customer copy says only "coming soon", with no date.

| Beat | Placeholder in this calendar | Assets scheduled | Live fallbacks in those slots | How to move it |
|---|---|---|---|---|
| `beat:images` (tier 1) | Launch Week 1, Mon 16 - Fri 20 Nov: Mon sites, **Tue 17 Nov Product Hunt main launch 09:01** + Uneed (b6) + PH100, Wed decks, Thu top-ups, Fri books + gallery; follow-ups 21 Nov - 15 Jan (C41, V53 wave 2, V52 picture-book episodes 23 Dec and 14 Jan) | V49, V50, V51, V52, V54, V53 (wave-2 creators), C39, C40, C41, C42, C48 | V48, V25, V26, V28, V37, V15, V02/V03/V29 episodes, C02, C06, C16, C17, C23, C31 | If the gate passes by Fri 6 Nov, the whole block moves to 9-13 Nov. If it passes later, it moves to the first week after the gate. PH runs Tue-Thu only with 400+ committed supporters, otherwise Sat-Sun (go/no-go on Wed 4 Nov). Wave 2 runs only if images are live by Mon 30 Nov; otherwise b4 rehires the best wave-1 creator (4 and 9 Dec). |
| `beat:topups` (tier 3) | Thu 19 Nov (day 4 of Launch Week 1) | V55, C43 | V28, V45, C29 | If it passes alone, run it as a one-day beat on the first weekday after the gate. |
| `beat:domains` (tier 2) | Tue 1 Dec, then V57 speedruns from Wed 9 Dec and in weeks 8 and 11-13 | V56, V57, C44 (+ badge and partner directory, ga17) | V03, V02, V04, V16, C06, C11 | Small-business speedruns go to full volume only after this beat. |
| `beat:agency` (tier 1) | Tue 8 Dec (LinkedIn series); optional PH 'Makeborne for agencies' relaunch Tue 15 Dec | V58, C45 | V26, C07, C13, C20, C10, C31, V29 | The PH relaunch only if it is a significant iteration and 4+ weeks after the images PH launch. |
| `beat:github` (tier 3) | Thu 17 Dec | C47 (one X thread), V60 (one YouTube demo) | V17, V13 | Any time after the gate; never a wave. |
| `beat:leads` (tier 2) | Launch Week 2, Mon 11 Jan (+ gallery expansion Tue, partner program Wed); long tutorial Thu 21 Jan | V59, C46 | V07, V42, V24, V13, C06, C16, C24 | Can join the gallery expansion and the partner program as one Launch Week. |
| Day 30 numbers (no feature) | Wed 25 Nov | V39, C38, C37 | — | Fixed date. |
| Day 90 report (no feature) | Tue 26 Jan (day 90); filmed Fri 22 Jan | V43, C37 | — | Fixed date. |

## The $1,000, by date

No dollar moves until the spend gate is live (`/go/` links, first touch, and `mb_src`/`mb_campaign`/`mb_aff` on the Makeborne-created Whop checkout). TAAFT is the only exception.

| Line | USD | Date(s) in this calendar | Condition |
|---|---|---|---|
| b1 TAAFT | 49 | Thu 29 Oct, right after the 01:30 launch posts (08:00 at the latest) | Submitted before any other listing |
| b2 Wave-1 fees (5 x $60) | 300 | Sign from Sat 31 Oct; $150 on Fri 6 Nov (half on signing); $150 on Mon 23 Nov (on delivery of video 2) | Only after the spend gate; videos 10-14 Nov and 17-21 Nov |
| b3 Wave-1 per-view bonus | 90 | Fri 20 Nov and Fri 27 Nov | $1.50 per 1,000 verified views in the first 7 days, capped at $40 a video |
| b4 Wave-2 visual creators | 140 | $60 on Mon 16 Nov, $60 on Fri 27 Nov, $20 pool on Fri 4 Dec | Only if images passed the gate; if not live by Mon 30 Nov, it rehires the best wave-1 creator (posts 4 and 9 Dec) |
| b5 Boosts | 200 | Slot A: Meta partnership ad (card A01) $96 (Thu 12 - Sun 15 Nov, decided by Wed 11 Nov). Slot B: TikTok Spark (card A02) $104 (Thu 3 - Fri 4 Dec). Swap the platforms if the slot-A qualifier is a TikTok (content/ads-playbook.md) | Only posts with a tracked sale; none from 20 Nov to 2 Dec; BiH billing confirmed by 9 Nov, or the line moves to creator rehires |
| b6 Uneed | 30 | Booked only after the Wed 4 Nov images go/no-go (or once Uneed confirms rescheduling [U]); runs on the images PH day (placeholder Tue 17 Nov) | Moves with the images beat; if images slip, the slot moves to the next gated beat |
| b7 IG DM tooling | 30 | Decided Sun 15 Nov | Only if the free tier is outgrown; unspent money joins the reserve on 1 Dec |
| b8 Payout fees | 25 | With each payout: 6 Nov, 20 Nov, 23 Nov, 4 Dec | Low-fee transfer service or batching, never a $30 SWIFT wire |
| b9 Reserve | 136 | Release checks Mon 23 Nov and Mon 14 Dec; unspent money goes to the best source on Thu 24 Dec (the day-60 note, day 57) | Released only at CAC <=$50 over 3+ net payers |
| **Total** | **1,000** | | Everything after this is paid from revenue under D4 (30% / 10% / 0% reinvestment, an owner decision) |

## Asset coverage

- **P0 videos first:** all ten P0 videos are used in launch week (Thu 29 Oct - Wed 4 Nov): V01 Thu 29 Oct, V02 Thu 29 Oct, V03 Thu 29 Oct, V04 Fri 30 Oct, V05 Sat 31 Oct, V06 Mon 02 Nov, V07 Mon 02 Nov, V08 Thu 29 Oct, V09 Wed 04 Nov, V10 Sat 31 Oct.
- **Priority-1 live creatives:** C01 30 Oct, C02 31 Oct, C03 30 Oct, C05 03 Nov, C06 01 Nov, C07 01 Nov, C08 29 Oct, C09 01 Nov, C16 01 Nov, C17 03 Nov, C18 05 Nov, C23 07 Nov, C27 30 Oct (cover on V04), C29 06 Nov, C37 02 Nov.
- **Winners are reposted or re-cut:** every week from week 2 has a TikTok winner slot (Fri 21:30), an Instagram winner Reel (Sun 19:00) and a YouTube winner Short (Fri 13:30). Each is filled at the Sunday review, from the 48-hour reads (posts at 3x or more the median get 2 new hooks).
- **Day 90 (Tue 26 Jan):** V43, the day-90 film (filmed Fri 22 Jan), posts on LinkedIn, TikTok, YouTube Shorts and X.
- **Not posted as their own item (bank/optional):** C32-C36 are link-preview (OG) images for the landing pages, shipped with growth ask ga7 in week 2. C27 and C28 are covers on every V04 and V29 post, and C14, C21, C47 and C48 are long-form thumbnails (`coverId` / `thumbnailId`).

## Standing rules for every post

- Promote only what is live today: AI websites on a Makeborne address, AI books (screen and PDF), AI presentations (PPTX), client review links, the basic CRM and lead finder, manual GitHub export, and the projects library.
- Never say "free", "trial" or "start free". The proof line is "From $20/month + tax. Full refund until you use credits." Change it everywhere if the owner changes D1.
- Never name AI model vendors. Never claim "better than Lovable, Gamma or Framer". Every speed claim is timed on screen or labelled "sped up".
- The lane rule: no "replaced my agency" content on founder LinkedIn, in Lane A briefs, or in anything an agency buyer sees.
- Real businesses appear only on request, using public information only, with a written OK (t20), and stay unpublished by default. Lead-finder results are always blurred.
- No pixels, retargeting or device-stored referral cookies until the consent banner is live (target Sun 6 Dec). Judge every post on `/go/` clicks, DM keywords and Whop sales, never on views.

## Week 1 (26 Oct-1 Nov): Pre-launch (days −3 to −1) and launch days 1-4 (days 5-7 are Mon 2 to Wed 4 Nov)

**Goal:** Launch on Thu 29 Oct at 01:30 CET without overclaiming, get the first ~35 gross payers, and have attribution live on launch day so every later dollar can be judged. Seven of the 10 P0 videos go out by Sun 1 Nov and the other three (V06, V07, V09) on Mon 2 - Wed 4 Nov; TAAFT is the only spend.

**Base targets (kpis.json):** 3,500 qualified visits, 35 gross payers (30 net), 18 activated payers, MRR about $1,098 at week end, loop share 0%, owned posts 25-30, creators active 0.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 26 Oct (d−3) | Pre-launch day −3. The public launch is Thu 29 Oct at 21:00 CET (20:00 UTC). Set up the profiles, prepare and schedule the posts, check the countdown on makeborne.com. Nothing that says "we launched" goes out. | - | - | - | - | - | - | Set up the profiles: TikTok business account, Instagram professional (name, bio and the Start here, Pricing and...<br>Prepare and schedule the launch posts: load V01, V02, V03, V08, C08 and C15 with their captions (open Thu 29 Oct...<br>Check the countdown on makeborne.com: it counts down to Thu 29 Oct 21:00 CET (20:00 UTC) on a phone and on a...<br>Work through the before-posting checklist under Post (music in each app, the DM keywords, the DM text). |
| Tue 27 Oct (d−2) | Pre-launch day −2. The launch moved to Thu 29 Oct at 21:00 CET. Tonight at 19:00 Story S4 announces the new time with the real makeborne.com countdown. No teaser video tonight: T3-T6 have the old Wednesday time in them and are never posted. Set the bio link, switch on GO, check the countdown. | - | Story S4 | - | - | - | - | If Story S1 or anything else that says "Wed 28 Oct" or "19:00 CET" is already up, delete it now. Do not post T3...<br>Record 4-6 real-speed captures at 2x UI scale: lead finder -> demo site -> review link; client comment -> fix ->...<br>Before 19:00: set up and test the DM keyword automation. GO comes first (every teaser asks for it; the DM sends...<br>Verify the checkout path: list every link in bios and posts; none may point to a Whop store page or Whop tracking link.<br>Schedule Wednesday: S5 "find what's hidden" Story at 12:00; T8 "Guess the build time" at 21:00 on Reels (TikTok...<br>Check the countdown on makeborne.com (phone and laptop): it ends at Thu 29 Oct 21:00 CET.<br>+ 15 playbook steps on Today (ads, guerrilla, hype, outreach, press) |
| Wed 28 Oct (d−1) | **Update 22:00: the launch moved to tonight, Thu 29 Oct 01:30 CET; 22:30 "New time" Story and caption fixes, run of show from 00:30.** Pre-launch day −1, 24 hours to go: the launch is tomorrow, Thu 29 Oct at 21:00 CET. 12:00 Story S5 "something is hidden behind our countdown"; 21:00 "Guess the build time" (T8) on Reels, TikTok 21:05 and Shorts 21:10, captioned "opens tomorrow 21:00 CET". Schedule Thursday. Nothing says it is live. | T8 | Reel T8<br>Story S5 | - | - | T8 | - | Schedule Thursday: S6 "Today" Story at 09:15 and S7 "1 hour" at 20:00. Post these by hand on Thursday: T7 "We're...<br>Check the countdown on makeborne.com (phone and laptop): it ends at Thu 29 Oct 21:00 CET and nothing says "live".<br>After T8 goes out at 21:00: answer every GO with makeborne.com (the countdown and the waitlist) and reply to a few...<br>+ 22 playbook steps on Today (ads, guerrilla, hype, outreach, press) |
| Thu 29 Oct (d1) | Launch day, 01:30 CET (overnight): the public launch. 00:30 Story S7 "1 hour"; 01:10 GO gate; at 01:30 the countdown ends, T7 "We're live" goes out (Reels, TikTok 01:31, Shorts 01:32) with the real reveal Story S8 at 01:31; 01:35 waitlist invite. Daytime "now open" push: 08:30 press, 08:45 LinkedIn V08, 09:15 Story S6, 14:00 X thread; evening: C15 21:05, V01 21:30, the TikToks V02 22:00 and V03 22:30. TAAFT first among the listings, warm network, nothing promoted that is not live. | T7<br>V01<br>V02<br>V03 | Reel T7<br>Reel V01<br>Story C15<br>Story S6<br>Story S7<br>Story S8 | V08 | C08 | T7<br>V01 | - | Attribution target: ga1 (/go/ redirect, first touch on the account, mb_src/mb_campaign/mb_aff on Makeborne-created...<br>Ship the public sample review link ('play the client', ga5) if ready; otherwise week 2.<br>00:30 Before any post: confirm the three copy fixes and 'coming soon' labels are live or hide the copy (ga3);...<br>[b1] Submit the TAAFT listing FIRST, right after the 01:30 posts ($49, check the launch-first $300 PPC bonus applies to...<br>Ask engineering for growth asks 1-4 today: /go/ attribution plumbing (ga1), AI limit that scales with paid...<br>Check the v9 Fly-over 9:16 against today's home page and its end card; add the 2 s true end card if needed; never...<br>30-50 one-to-one personal messages to the founder's network asking for feedback and intros to agency owners...<br>Evening: keep replying to every comment; log 'build mine' requests and consent in a private sheet (never in this...<br>+ 25 playbook steps on Today (guerrilla, hype, outreach, press, product) |
| Fri 30 Oct (d2) | Day 2: directories after TAAFT is live, PH coming-soon page, first comment-reply speedrun. Attribution target was launch day, Thu 29 Oct (ga1 + ga4, sample review link ga5 if ready). | V04 | Reel V02 | C01 | C03 | V02 | - | When the TAAFT listing is live: free directories AlternativeTo (as an alternative to Lovable, Gamma, Framer and...<br>Open the Product Hunt coming-soon page (live features only) and start collecting followers; no upvote asks, ever.<br>Build the creator shortlist of 30 (wave 1 Lane A + Lane B): audience geography screenshot (60%+ US/UK/EU/CA/AU),...<br>+ 12 playbook steps on Today (guerrilla, hype, press) |
| Sat 31 Oct (d3) | Client-approval POV (F2) on 3 surfaces, Indie Hackers launch post, r/SideProject story, press draft, join one agency community. | V05 | Reel V05<br>Story C02 | V05 | C12 [no 'play the client' until ga5] | - | Indie Hackers: C12 [no 'play the client' until ga5]<br>Reddit: V10 | Draft the /press page from the Bosnia press kit (Bosnia press §3.10). The Bosnian, Croatian and Serbian releases...<br>Join one agency/freelancer community (Skool, Slack or Discord); contribute only, no links.<br>Owner contacts the top 10 shortlisted creators from the owner's own accounts (t01 Lane A, t02 Lane B). Offer $60...<br>LinkedIn 15 comments on agency-owner posts (t07, comments first, no pitch); X 20 replies; 1 helpful contribution...<br>+ 3 playbook steps on Today (hype, press) |
| Sun 01 Nov (d4) | First carousel. First customer calls. Book Uneed. | V10 | Carousel C06<br>Story C09 [if ga5; else C22] | C07 [CTA 'uncut build' until ga5] | C16 | V10 | - | 2-3 video calls with the first payers (t18); fix whatever broke within 24 h.<br>[b6] Do not book Uneed yet: ask Uneed whether a pick-your-date slot can be rescheduled [U]. Book only after the 4 Nov...<br>LinkedIn 15 comments on agency-owner posts (t07, comments first, no pitch); X 20 replies; 1 helpful contribution...<br>+ 6 playbook steps on Today (guerrilla, hype, outreach) |

**Sunday check:** Launch-week extras (read on Wed 4 Nov, day 7): 5 customer calls; 100+ PH coming-soon followers; 1 regional press mention; >=80% of payers start a first build within 10 minutes (>=90% from week 2). Week 1 scorecard vs base (kpis.json): qualified visits 3500, gross paid 35, net paid 30, activated payers 18, cumulative gross 35, active subs 30, MRR $1098, loop share 0%, owned posts 25-30, creators active 0, CAC n/a. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 2 (2-8 Nov): Launch days 5-7, then phase 1: find the format

**Goal:** Finish the launch week (Day 5 numbers Mon 2 Nov, regional press Tue 3 Nov, Day 7 numbers and the images go/no-go Wed 4 Nov), then run the full cadence on the 4 core surfaces, onboard wave-1 creators (calls, briefs, use-my-brief links), and ship the trial substitutes: sample review link, review-page loop, format-matched landing pages and /examples. Confirm ad-account billing from BiH by Mon 9 Nov.

**Base targets (kpis.json):** 2,500 qualified visits, 25 gross payers (21 net), 13 activated payers, MRR about $1,882 at week end, loop share 2%, owned posts 25-30, creators active 0.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 02 Nov (d5) | First 48-hour read and re-cuts, Day 5 numbers (the regional press pitch goes on Tue 3 Nov, day 6), deck proof + lead finder. | V06<br>V07<br>T8 [optional] | Reel V07<br>Reel T8 [optional]<br>Story C22 | C37 | C37 | V07<br>T8 [optional] | - | First 48-hour read: re-cut every post above 3x the account median with 2 new hooks (they fill next week's winner slots).<br>LinkedIn 15 comments on agency-owner posts (t07, comments first, no pitch); X 20 replies; 1 helpful contribution...<br>+ 7 playbook steps on Today (ads, guerrilla, hype, press) |
| Tue 03 Nov (d6) | Launch day 6: Batch-film day (10 videos for week 2), first creator agreements, write the images-beat PH copy (held until the gate). Also week 2: Full cadence on the 4 core surfaces; onboard wave-1 creators; ship sample review link, review-page loop, landing pages and use-my-brief links. Batch-film day + client-work and comment-reply posts. | V44<br>V04 | Carousel C05<br>Story C15 | V11 [CTA 'uncut build' until ga5 + ga7] | C17 | V03 | - | 10:00 Regional press pitch (owner sends, t16): the ex-Yugoslav tech and business outlets (Netokracija, Startit,...<br>Batch-film the rest of week 2 (V13, V14, V15, V16, V18, V30 and two V04/V29 episodes). V11 and V44 were filmed on...<br>[b2] Sign the first wave-1 creator agreements (#ad + paid-partnership toggle, 60-day Spark/partnership rights, comped...<br>Write the images-beat Product Hunt copy now (3 taglines <=60 chars, maker first comment, gallery shot list for...<br>Wave-1 onboarding: one 20-minute call per signed creator this week (brief t03, use-my-brief link, disclosure rules).<br>Week-2 ships: sample review link (ga5), review-page 'Review powered by Makeborne' link with utm_source=review_page...<br>Read FTC 'Disclosures 101', the EU UCPD and TikTok's branded-content policy at the source before wave 1 posts; get...<br>+ 5 playbook steps on Today (hype, press) |
| Wed 04 Nov (d7) | Launch day 7: Day 7 numbers (P2) everywhere, first weekly review (US clocks changed on Sun 1 Nov), images go/no-go. Also week 2: Full cadence on the 4 core surfaces; onboard wave-1 creators; ship sample review link, review-page loop, landing pages and use-my-brief links. Deck day. | V09<br>V14 | Reel V09<br>Story C22 | V09 | V09 | V29 | Indie Hackers: C37 | First weekly review, day 7 (90 min): scorecard; keep the top 2 formats and retire the bottom half; move the TikTok...<br>Images go/no-go: in production and passing 10 golden briefs? If yes, pick the PH day: Tue-Thu with 400+ committed...<br>Confirm the wave-1 lineup (3 Lane A incl. 1+ LinkedIn, 2 Lane B).<br>Weekly review, day 7 (90 min cap): scorecard; keep/kill/scale each source; re-cut the top 10% with 2 new hooks...<br>[b5] Start the ad-account checks: can TikTok Ads (Spark) and Meta (partnership ads) accounts be registered and billed...<br>YouTube tutorial creators: contact 8-10 from the list of 20 (t05, affiliate-first t04; commission only after ga9...<br>Newsletter editorial pitches with live features only (t12, launchCopy.newsletterPitch), 8-10, owner sends.<br>Ask the agency community admin for a 20-minute no-pitch workshop every two weeks from week 3 (t10).<br>+ 5 playbook steps on Today (hype, press) |
| Thu 05 Nov (d8) | Week 2: Full cadence on the 4 core surfaces; onboard wave-1 creators; ship sample review link, review-page loop, landing pages and use-my-brief links. Batch-film day + book post + carousel. | V15 | Carousel C18<br>Story C09 [if ga5; else C15] | C20 | C13 | V05 | - | Whop custom affiliates sandbox test (ga9): links to makeborne.com, code passed into the Makeborne-created checkout.<br>+ 7 playbook steps on Today (ads, guerrilla, hype, outreach) |
| Fri 06 Nov (d9) | Week 2: Full cadence on the 4 core surfaces; onboard wave-1 creators; ship sample review link, review-page loop, landing pages and use-my-brief links. Client-work post, winner re-cut, boost/payout decisions. | V18<br>WIN(V02) | Reel V15<br>Story C25 | C29 | V30 | WIN(V02) | - | [b2] Creator recruiting window closes (27 Oct - 6 Nov). Pay the first half of wave-1 fees ONLY if the spend gate (ga1)...<br>[b8] Payout transfer fees for the first-half creator fees (never a $30 SWIFT wire).<br>+ 6 playbook steps on Today (guerrilla, hype, outreach, press) |
| Sat 07 Nov (d10) | Week 2: Full cadence on the 4 core surfaces; onboard wave-1 creators; ship sample review link, review-page loop, landing pages and use-my-brief links. Carousel + light X; no TikTok. | - | Carousel C23 | - | C04 | - | - | + 7 playbook steps on Today (ads, guerrilla, hype, press) |
| Sun 08 Nov (d11) | Week 2: Full cadence on the 4 core surfaces; onboard wave-1 creators; ship sample review link, review-page loop, landing pages and use-my-brief links. Sunday review ritual + winner reel + weekly numbers. | V31 | Reel WIN(V02) | - | V31 | - | Indie Hackers: C37 | Re-forecast rule starts: recompute low/base/high from real visit-to-paid, refund and churn (data/funnel.json).<br>+ 3 playbook steps on Today (hype, outreach, product) |

**Sunday check:** Week 2 scorecard vs base (kpis.json): qualified visits 2500, gross paid 25, net paid 21, activated payers 13, cumulative gross 60, active subs 51, MRR $1882, loop share 2%, owned posts 25-30, creators active 0, CAC n/a. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 3 (9-15 Nov): Phase 1: first creator wave

**Goal:** Wave-1 creators post video 1 (10-14 Nov). Boost slot A runs only on a post with a tracked sale. Prove Whop custom affiliates with a live purchase and refund. First agency-community workshop and first long YouTube tutorial.

**Base targets (kpis.json):** 3,500 qualified visits, 35 gross payers (30 net), 18 activated payers, MRR about $2,980 at week end, loop share 4%, owned posts 25-30, creators active 5.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 09 Nov (d12) | Batch-film day + client-work and comment-reply posts. | V19<br>V04 | Reel V19<br>Story C15 | V19 | V17 | V22 | - | [b5] DEADLINE: ad accounts registrable and billable from BiH? If not, move b5 ($200) into creator rehires. Boost slot A...<br>Images gate prep: build EU AI Act Art. 50(2) machine-readable marking (metadata / C2PA) into images from day 1...<br>Wave-2 visual creators: shortlist 10 (research only). Contact (t22) only once images are in production and passing...<br>Optional: one experienced PH maker/hunter who has used Makeborne, for pre-launch feedback (t14). Default stays a...<br>D4 reinvestment: only once a source has 3+ net payers at <=$50 CAC (earliest about 23 Nov); until then, nothing is...<br>+ 2 playbook steps on Today (guerrilla, press) |
| Tue 10 Nov (d13) | Deck day. | V23 | Reel V22 | C24 | C19 | V23 | creator TikTok: V32 | Affiliate live test: one real purchase and refund through a custom affiliate link to prove payout and clawback...<br>+ 1 playbook step on Today (outreach) |
| Wed 11 Nov (d14) | Founder 'Day N' + speedrun. | V21<br>V20 | Reel V21<br>Story C22 | C05 | V20 | V47 | creator TikTok: V33 | + 1 playbook step on Today (outreach) |
| Thu 12 Nov (d15) | Batch-film day + book post + carousel. | V27 | Carousel C06<br>Story C09 [if ga5; else C15] | V23 | V24 | V17<br>long V24 | creator TikTok: V35 | Community workshop #1 (20 min, no pitch): 'win the client before the call'.<br>Newsletter rate-card enquiries (t11), 5 in phase 1; no paid placement until D4 releases revenue.<br>+ 1 playbook step on Today (outreach) |
| Fri 13 Nov (d16) | Client-work post, winner re-cut, boost/payout decisions. | V47<br>WIN(V04) | Reel V27<br>Story C25 | V30 | V47 | WIN(V04) | creator LinkedIn: V34 | [b5] Boost decision, slot A: qualify = 3x median views in 48 h, 65%+ 3-s hold, AND 1+ tracked sale or 5+ link clicks...<br>Images gate check (six boxes). If passed, confirm Launch Week 1 for 16-20 Nov, raise the AI limit, recruit wave-2...<br>+ 3 playbook steps on Today (outreach) |
| Sat 14 Nov (d17) | Carousel + light X; no TikTok. | - | Carousel C26 | - | C29 | - | creator Instagram Reels: V36 | [b5] Boost slot A (ad card A01) runs Thu 12 - Sun 15 Nov if a post qualified: Meta partnership ad $24/day x 4 days... |
| Sun 15 Nov (d18) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V04) | - | C37 | - | Indie Hackers: C37 | [b7] Instagram DM tooling: is the free tier outgrown? Upgrade only if so (b7, up to $30).<br>+ 1 playbook step on Today (press) |

**Sunday check:** Week 3 scorecard vs base (kpis.json): qualified visits 3500, gross paid 35, net paid 30, activated payers 18, cumulative gross 95, active subs 81, MRR $2980, loop share 4%, owned posts 25-30, creators active 5, CAC measure. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 4 (16-22 Nov): Phase 1: offer check + images Launch Week (placeholder)

**Goal:** Mon 16 Nov offer check decides D1/D2 before any more paid views. If images passed the gate, run Launch Week 1 (sites, PH main launch Tue 17 Nov, decks, top-ups, books). Otherwise every beat slot posts its live fallback. Creators post video 2. No boosts from Fri 20 Nov. Sun 22 Nov band check.

**Base targets (kpis.json):** 4,000 qualified visits, 40 gross payers (34 net), 20 activated payers, MRR about $4,234 at week end, loop share 6%, owned posts 25-30, creators active 5.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 16 Nov (d19) | Beat slot: beat:images (each post has a live fallback). | V49 [beat:images; else V48]<br>V04 | Reel V49 [beat:images; else V48]<br>Story C15 | C39 [beat:images; else C02] | C39 [beat:images; else C16] | V49 [beat:images; else V29] | - | OFFER CHECK on organic conversion (16 Nov): the creator test cannot be read yet (wave-1 first videos 9-15 Nov;...<br>[b4] If images passed: sign the 2 wave-2 visual creators, half fee on signing.<br>If MRR >= ~$2k: review help from revenue (owner's private notes).<br>IMAGES LAUNCH WEEK 1, day 1 (placeholder): images in sites (V49, C39). Only if the six-box gate passed by Fri 13...<br>D4 reinvestment: only once a source has 3+ net payers at <=$50 CAC (earliest about 23 Nov); until then, nothing is... |
| Tue 17 Nov (d20) | Beat slot: beat:images (each post has a live fallback). | V50 [beat:images; else V25] | Reel V50 [beat:images; else V25] | V54 [beat:images; else V25] | V54 [beat:images; else C31] | V50 [beat:images; else V03] | creator TikTok: V32<br>Product Hunt: C40 [beat:images; else skip] | [b6] IMAGES BEAT (placeholder): PH main launch 09:01 CET from the founder's account; Uneed slot runs today; PH100 code...<br>European press follow-up at the images beat (t17, owner sends) and newsletter editorial re-pitch (t12). Only if... |
| Wed 18 Nov (d21) | Beat slot: beat:images (each post has a live fallback). | V51 [beat:images; else V26]<br>V45 | Reel V51 [beat:images; else V26]<br>Story C22 | C42 [beat:images; else C16] | C42 [beat:images; else C17] | V51 [beat:images; else V02] | creator TikTok: V33<br>Reddit: V49 [beat:images; else skip] | IMAGES LAUNCH WEEK 1, day 3 (placeholder): images in decks: full-image slides with quality and aspect controls... |
| Thu 19 Nov (d22) | Beat slot: beat:images, beat:topups (each post has a live fallback). | V55 [beat:topups; else V28] | Carousel C39 [beat:images; else C06]<br>Story C09 [if ga5; else C15] | V55 [beat:topups; else V45] | V55 [beat:topups; else V45] | V29 | creator TikTok: V35<br>creator TikTok: V53 [beat:images; else skip] | TOP-UPS BEAT (placeholder, day 4 of Launch Week): changelog line + C43 header; only if top-ups passed the gate. |
| Fri 20 Nov (d23) | Beat slot: beat:images (each post has a live fallback). | V52 [beat:images; else V37]<br>WIN(V05) | Reel V52 [beat:images; else V28]<br>Story C25 | V50 [beat:images; else V37] | V50 [beat:images; else V37] | WIN(V05)<br>long C48 [beat:images; else skip] | creator LinkedIn: V34<br>Indie Hackers: V54 [beat:images; else skip] | IMAGES LAUNCH WEEK 1, day 5 (placeholder): images in books + the gallery showcase (V52, C41 next day, C48 YouTube...<br>NO BOOSTS from today to Wed 2 Dec (Black Friday CPMs).<br>[b3] Wave-1 per-view bonus payout, week 1 videos: $1.50 per 1,000 verified views in each video's first 7 days, cap $40...<br>[b8] Payout transfer fees for the bonus batch. |
| Sat 21 Nov (d24) | Beat slot: beat:images, beat:topups (each post has a live fallback). | - | Carousel C41 [beat:images; else C23] | - | C43 [beat:topups; else C29] | - | creator Instagram Reels: V36 | - |
| Sun 22 Nov (d25) | Beat slot: beat:images (each post has a live fallback). | - | Reel WIN(V05) | - | C37 | - | Indie Hackers: C37<br>creator Instagram Reels: V53 [beat:images; else skip] | Cumulative gross paid check: <100 = low-to-base band, protect margin; 100-200 = base; >=200 = high or breakout... |

**Sunday check:** Cumulative gross paid band check (<100 / 100-200 / >=200; breakout needs ~200). Week 4 scorecard vs base (kpis.json): qualified visits 4000, gross paid 40, net paid 34, activated payers 20, cumulative gross 135, active subs 115, MRR $4234, loop share 6%, owned posts 25-30, creators active 5, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 5 (23-29 Nov): Phase 2: proof and Black Friday

**Goal:** Day-30 public numbers on Wed 25 Nov (Indie Hackers, LinkedIn, X, press follow-up). Black Friday to Cyber Monday says only 'yearly is 20% off'. Images follow-ups and wave-2 creators run only if images are live. Phase-2 product loops start (referral credits, share links, lifecycle emails).

**Base targets (kpis.json):** 4,500 qualified visits, 45 gross payers (38 net), 27 activated payers, MRR about $5,552 at week end, loop share 8%, owned posts 25-30, creators active 7.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 23 Nov (d26) | Batch-film day + client-work and comment-reply posts. | V46<br>V04 | Reel V46<br>Story C15 | C03 | V37 | V29 | - | [b2] Wave-1 second half of fees on delivery of video 2 (only verified, disclosed posts).<br>[b8] Payout transfer fees for the second-half creator fees.<br>[b9] Reserve release check (b9): only if a source shows CAC <=$50 over 3+ net payers. Order: bonus overflow, rehire... |
| Tue 24 Nov (d27) | Deck day. | V03 | Reel V03 | V13 | C17 | V23<br>long V23 | - | Community workshop #2 (moved from Thu 26 Nov, US Thanksgiving): 'approval without email chaos'. |
| Wed 25 Nov (d28) | Beat slot: beat:images (each post has a live fallback). | V39<br>V02 | Reel V39<br>Story C22 | V39 | V39 | V39 | creator TikTok: V53 [beat:images; else skip] | DAY-30 PUBLIC NUMBERS (beat-day30): MRR, payers, refunds, AI cost per build, lessons; Indie Hackers, LinkedIn (C38...<br>Day-30 press follow-up: European tech reporters (t17) and the regional outlets from week 1 (owner sends).<br>Phase-2 product kickoff: referral credits +100 each side on a non-refunded first payment (ga12), deck/book share... |
| Thu 26 Nov (d29) | Batch-film day + book post + carousel. | V27 | Carousel C38<br>Story C09 [if ga5; else C15] | V07 | C04 | V02 | - | - |
| Fri 27 Nov (d30) | Client-work post, winner re-cut, boost/payout decisions. | V40<br>WIN(V03) | Reel V40<br>Story C25<br>Story C30 | V40 | V40 | WIN(V03) | - | BLACK FRIDAY to Cyber Monday (27-30 Nov): message is only 'yearly is 20% off' (already true). No extra discount,...<br>[b3] Wave-1 per-view bonus payout, week 2 videos (cap per video $40; pool total $90; overflow from reserve means a winner).<br>[b4] If wave 2 ran: second half of wave-2 fees on delivery. |
| Sat 28 Nov (d31) | Beat slot: beat:images (each post has a live fallback). | - | Carousel C18 | - | V02 | - | creator Instagram Reels: V53 [beat:images; else skip] | - |
| Sun 29 Nov (d32) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V03) | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 5 scorecard vs base (kpis.json): qualified visits 4500, gross paid 45, net paid 38, activated payers 27, cumulative gross 180, active subs 150, MRR $5552, loop share 8%, owned posts 25-30, creators active 7, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 6 (30 Nov-6 Dec): Phase 2: domains beat (placeholder) and consent

**Goal:** Custom-domains beat placeholder Tue 1 Dec (badge + partner directory). Boost slot B from Thu 3 Dec. Consent banner and server-side purchase events by Sun 6 Dec. Wave-1 keep/kill read. Founding-partner invites start.

**Base targets (kpis.json):** 3,500 qualified visits, 35 gross payers (30 net), 21 activated payers, MRR about $6,566 at week end, loop share 10%, owned posts 25-30, creators active 7.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 30 Nov (d33) | Batch-film day + client-work and comment-reply posts. | V40<br>V04 | Reel V40<br>Story C15<br>Story C30 | V12 [if ga5; else C02] | V40 | V29 | - | PAID-CAC OFFER CHECK (before any money beyond wave 1): if no source has net payers at <=$50 CAC, change the offer...<br>[b4] Images not live by today? Then move b4 to rehiring the best wave-1 creator (2 videos, posts 4 and 9 Dec).<br>Consent banner (CMP) + Google Consent Mode v2 build starts (ga15); target live by Sun 6 Dec, then server-side... |
| Tue 01 Dec (d34) | Beat slot: beat:domains (each post has a live fallback). | V56 [beat:domains; else V03] | Reel V56 [beat:domains; else V03] | V56 [beat:domains; else C11] | C13 | V56 [beat:domains; else V03] | - | CUSTOM-DOMAINS BEAT (placeholder): 'Client sites now go live on the client's own domain'; LinkedIn...<br>[b7] Unspent IG DM tooling budget rolls into the reserve today. |
| Wed 02 Dec (d35) | Founder 'Day N' + speedrun. | V31<br>V37 | Reel V37<br>Story C22 | C37 | V31 | V02 | - | Founding-partner invites to paying agencies and active community members (t09): 30% recurring for 12 months, first... |
| Thu 03 Dec (d36) | Beat slot: beat:domains (each post has a live fallback). | V15 | Carousel C44 [beat:domains; else C06]<br>Story C09 [if ga5; else C15] | C05 | C19 | V13 | - | [b5] Boost slot B (ad card A02) from today: TikTok Spark on the best qualifying post ($52/day x 2 days, Thu 3 - Fri 4... |
| Fri 04 Dec (d37) | Client-work post, winner re-cut, boost/payout decisions. | V25<br>WIN(V07) | Reel V15<br>Story C25 | V30 | V06 | WIN(V07) | creator TikTok: V32 | [b4] Wave-2 bonus pool ($20) on verified views, or rehire payout if b4 moved.<br>[b8] Payout transfer fees. |
| Sat 05 Dec (d38) | Carousel + light X; no TikTok. | - | Carousel C23 | - | V10 | - | - | - |
| Sun 06 Dec (d39) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V07) | - | C37 | - | Indie Hackers: C37 | Consent banner live target (ga15). Until it is live: no pixels, no retargeting, no device-stored referral cookies.<br>Wave-1 keep/kill read (14 days after video 2): keep at 1 net payer per $40; kill at $100 with 0 or $150 with 1;... |

**Sunday check:** Consent banner live? Phase-2 exit gate items: loops >=15%, refunds <=15%, 1+ creator rehired on the scale rule, consent live. Week 6 scorecard vs base (kpis.json): qualified visits 3500, gross paid 35, net paid 30, activated payers 21, cumulative gross 215, active subs 178, MRR $6566, loop share 10%, owned posts 25-30, creators active 7, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 7 (7-13 Dec): Phase 2: agency beat (placeholder) and loops

**Goal:** Agency-tools beat placeholder Tue 8 Dec. First consented customer story. Content Rewards from revenue only if the gate is met (Mon 7 Dec). Loops toward 12% of new payers.

**Base targets (kpis.json):** 4,000 qualified visits, 40 gross payers (34 net), 24 activated payers, MRR about $7,716 at week end, loop share 12%, owned posts 25-30, creators active 9.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 07 Dec (d40) | Batch-film day + client-work and comment-reply posts. | V07<br>V04 | Reel V07<br>Story C15 | V07 | V30 | V07 | - | Content Rewards gate: a source at <=$50 CAC on 3+ payers AND MRR > ~$1.5k? If yes, open Whop Content Rewards from... |
| Tue 08 Dec (d41) | Beat slot: beat:agency (each post has a live fallback). | V26 | Reel V58 [beat:agency; else V26] | V58 [beat:agency; else C07] | V58 [beat:agency; else C13] | V58 [beat:agency; else V29] | - | AGENCY-TOOLS BEAT (placeholder): 'Run client work in one place'; LinkedIn series (li-beat-agency), community... |
| Wed 09 Dec (d42) | Beat slot: beat:domains (each post has a live fallback). | V21<br>V57 [beat:domains; else V02] | Reel V57 [beat:domains; else V02]<br>Story C22 | C37 | V57 [beat:domains; else V02] | V57 [beat:domains; else V02] | creator TikTok: V32 | - |
| Thu 10 Dec (d43) | Beat slot: beat:agency (each post has a live fallback). | V28 | Carousel C06<br>Story C09 [if ga5; else C15] | C45 [beat:agency; else C20] | C16 | V22 | - | Community workshop #3: 'one brief, three deliverables'. |
| Fri 11 Dec (d44) | Client-work post, winner re-cut, boost/payout decisions. | V18<br>WIN(V06) | Reel V28<br>Story C25 | V38 [if written consent from the customer; else C24] | V38 [if written consent from the customer; else C29] | WIN(V06)<br>long V17 | - | - |
| Sat 12 Dec (d45) | Carousel + light X; no TikTok. | - | Carousel C18 | - | V06 | - | - | - |
| Sun 13 Dec (d46) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V06) | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 7 scorecard vs base (kpis.json): qualified visits 4000, gross paid 40, net paid 34, activated payers 24, cumulative gross 255, active subs 209, MRR $7716, loop share 12%, owned posts 25-30, creators active 9, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 8 (14-20 Dec): Phase 2: last push before the holidays

**Goal:** Optional PH 'Makeborne for agencies' relaunch Tue 15 Dec (only if significant and 4+ weeks after images). GitHub-sync beat Thu 17 Dec (X thread + YouTube demo only). Last text-led book push before ~20 Dec. Breakout check Sun 20 Dec. Bank the holiday content.

**Base targets (kpis.json):** 4,000 qualified visits, 40 gross payers (34 net), 24 activated payers, MRR about $8,847 at week end, loop share 15%, owned posts 25-30, creators active 10.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 14 Dec (d47) | Batch-film day + client-work and comment-reply posts. | V05<br>V04 | Reel V05<br>Story C15 | C02 | V05 | V05 | - | [b9] Reserve check (b9) and D4 split for the last full pre-holiday week; share-for-credits (ga20) scoping for phase 3. |
| Tue 15 Dec (d48) | Beat slot: beat:agency (each post has a live fallback). | V14 | Reel V14 | V58 [beat:agency; else C10] | C45 [beat:agency; else C31] | V29 | Product Hunt: V58 [beat:agency; else skip] | OPTIONAL PH 'Makeborne for agencies' relaunch: only if a significant iteration and 4+ weeks after the images... |
| Wed 16 Dec (d49) | Beat slot: beat:domains (each post has a live fallback). | V31<br>V57 [beat:domains; else V16] | Reel V57 [beat:domains; else V16]<br>Story C22 | C37 | V31 | V57 [beat:domains; else V02] | - | - |
| Thu 17 Dec (d50) | Beat slot: beat:github (each post has a live fallback). | V15 | Carousel C23<br>Story C09 [if ga5; else C15] | V05 | C47 [beat:github; else V17] | V03<br>long V60 [beat:github; else V13] | - | GITHUB-SYNC BEAT (placeholder): one X thread (x-beat-github, C47) and one YouTube demo (V60) only. Not a wave.<br>Batch-film and schedule all banked content for 21 Dec - 3 Jan (half cadence). |
| Fri 18 Dec (d51) | Client-work post, winner re-cut, boost/payout decisions. | V48<br>WIN(V10) | Reel V15<br>Story C25 | V25 | V14 | WIN(V10) | - | - |
| Sat 19 Dec (d52) | Carousel + light X; no TikTok. | - | Carousel C06 | - | V10 | - | - | - |
| Sun 20 Dec (d53) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V10) | - | C37 | - | Indie Hackers: C37 | Breakout check: ~750 cumulative gross payers needed for the $1M path by today. Last day for text-led book pushes;... |

**Sunday check:** Breakout check (~750 cumulative gross). Week 8 scorecard vs base (kpis.json): qualified visits 4000, gross paid 40, net paid 34, activated payers 24, cumulative gross 295, active subs 240, MRR $8847, loop share 15%, owned posts 25-30, creators active 10, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 9 (21-27 Dec): Phase 2/3: half cadence

**Goal:** Banked posts only (about 15 a week). Support and customer calls continue. Day-60 note on Thu 24 Dec; unspent reserve moves to the best source.

**Base targets (kpis.json):** 3,000 qualified visits, 30 gross payers (26 net), 18 activated payers, MRR about $9,593 at week end, loop share 15%, owned posts 12-15, creators active 8.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 21 Dec (d54) | Batch-film day + client-work and comment-reply posts. | V16 | Reel V16 | C37 | V16 | - | - | Half cadence starts (21 Dec - 3 Jan): banked posts only, replies and support continue, customer calls continue. |
| Tue 22 Dec (d55) | Deck day. | - | Carousel C06 | - | - | V22<br>long V22 | - | - |
| Wed 23 Dec (d56) | Beat slot: beat:images (each post has a live fallback). | V52 [beat:images; else V03] | Reel V52 [beat:images; else V03] | C07 | - | - | - | - |
| Thu 24 Dec (d57) | Batch-film day + book post + carousel. | - | - | - | C37 | - | Indie Hackers: C37 | [b9] Day 57 (24 Dec): draft the day-60 note; unspent reserve (b9) moves to the best source by CAC; loops share check... |
| Fri 25 Dec (d58) | Client-work post, winner re-cut, boost/payout decisions. | V29 | - | - | - | V29 | - | - |
| Sat 26 Dec (d59) | Carousel + light X; no TikTok. | - | Reel V09 | - | - | - | - | - |
| Sun 27 Dec (d60) | Sunday review ritual + winner reel + weekly numbers. | V09 | - | - | V21 | - | - | - |

**Sunday check:** Week 9 scorecard vs base (kpis.json): qualified visits 3000, gross paid 30, net paid 26, activated payers 18, cumulative gross 325, active subs 260, MRR $9593, loop share 15%, owned posts 12-15, creators active 8, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 10 (28 Dec-3 Jan): Phase 3: half cadence and January bank

**Goal:** Banked posts only. Bank 'new year, new clients' content. No beats.

**Base targets (kpis.json):** 2,500 qualified visits, 25 gross payers (21 net), 15 activated payers, MRR about $10,180 at week end, loop share 16%, owned posts 12-15, creators active 8.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 28 Dec (d61) | Batch-film day + client-work and comment-reply posts. | V18 | Reel V18 | - | V30 | - | - | Bank 'new year, new clients' content: V41, V42, lead finder episodes, 'new year, new website' speedruns (V57 if... |
| Tue 29 Dec (d62) | Deck day. | - | - | C37 | - | V22 | - | - |
| Wed 30 Dec (d63) | Founder 'Day N' + speedrun. | V14 | Reel V14 | C24 | - | - | - | - |
| Thu 31 Dec (d64) | Batch-film day + book post + carousel. | - | Carousel C18 | - | C12 | - | - | - |
| Fri 01 Jan (d65) | Client-work post, winner re-cut, boost/payout decisions. | V29 | - | - | - | V29 | - | - |
| Sat 02 Jan (d66) | Carousel + light X; no TikTok. | - | Reel V44 | - | - | - | - | - |
| Sun 03 Jan (d67) | Sunday review ritual + winner reel + weekly numbers. | V44 | - | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 10 scorecard vs base (kpis.json): qualified visits 2500, gross paid 25, net paid 21, activated payers 15, cumulative gross 350, active subs 276, MRR $10180, loop share 16%, owned posts 12-15, creators active 8, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 11 (4-10 Jan): Phase 3: new year, new clients

**Goal:** Full cadence returns. Lead finder + demo site + review link, 2027 pitch decks, 'new year, new website' speedruns (on own domains if that beat has run). Consent-based purchase-optimised boosts from revenue only.

**Base targets (kpis.json):** 4,500 qualified visits, 45 gross payers (38 net), 27 activated payers, MRR about $11,381 at week end, loop share 18%, owned posts 25-30, creators active 14.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 04 Jan (d68) | Beat slot: beat:domains (each post has a live fallback). | V42<br>V57 [beat:domains; else V04] | Reel V42<br>Story C15 | V42 | V42 | V42 | - | Full cadence back: 'new year, new clients'.<br>D16 check: add a faceless outputs account or freelancer-niche TikTok only if the editor is in place and a format... |
| Tue 05 Jan (d69) | Deck day. | V41 | Reel V41 | V41 | V41 | V03 | - | With consent live: move winning Spark/partnership ads to purchase-optimised campaigns and small retargeting of... |
| Wed 06 Jan (d70) | Founder 'Day N' + speedrun. | V31<br>V02 | Reel V02<br>Story C22 | C37 | V31 | V02 | - | - |
| Thu 07 Jan (d71) | Batch-film day + book post + carousel. | V27 | Carousel C10<br>Story C09 [if ga5; else C15] | C10 | C11 | V13<br>long V42 | - | Community workshop #4: 'new year, new clients' (the 24 Dec slot was skipped). |
| Fri 08 Jan (d72) | Client-work post, winner re-cut, boost/payout decisions. | V19<br>WIN(V04) | Reel V27<br>Story C25 | V38 [if written consent from the customer; else C29] | C19 | WIN(V04) | - | - |
| Sat 09 Jan (d73) | Carousel + light X; no TikTok. | - | Carousel C18 | - | V02 | - | - | - |
| Sun 10 Jan (d74) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V04) | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 11 scorecard vs base (kpis.json): qualified visits 4500, gross paid 45, net paid 38, activated payers 27, cumulative gross 395, active subs 308, MRR $11381, loop share 18%, owned posts 25-30, creators active 14, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 12 (11-17 Jan): Phase 3: Launch Week 2 (placeholder)

**Goal:** AI lead research beat Mon 11 Jan if gated; /examples gallery expansion; public partner program. Show HN only if a capped preview or no-login demo exists.

**Base targets (kpis.json):** 5,000 qualified visits, 50 gross payers (42 net), 30 activated payers, MRR about $12,717 at week end, loop share 19%, owned posts 25-30, creators active 18.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 11 Jan (d75) | Beat slot: beat:domains, beat:leads (each post has a live fallback). | V59 [beat:leads; else V07]<br>V57 [beat:domains; else V04] | Reel V59 [beat:leads; else V07]<br>Story C15 | V59 [beat:leads; else V42] | C46 [beat:leads; else C16] | V59 [beat:leads; else V07] | - | LAUNCH WEEK 2 (placeholder): Mon AI lead research beat (if gated), Tue /examples gallery expansion, Wed public... |
| Tue 12 Jan (d76) | Deck day. | V16 | Reel V16 | C20 | V16 | V29 | - | Gallery expansion: /examples grows to 30+ unedited outputs with brief, time and credits (C36 OG). |
| Wed 13 Jan (d77) | Founder 'Day N' + speedrun. | V31<br>V02 | Reel V02<br>Story C22 | C37 | C29 | V02 | - | Public affiliate program opens (20% for 12 months; yearly first payment only; no brand bidding; Whop custom... |
| Thu 14 Jan (d78) | Beat slot: beat:images, beat:leads (each post has a live fallback). | V52 [beat:images; else V15] | Carousel C46 [beat:leads; else C06]<br>Story C09 [if ga5; else C15] | C46 [beat:leads; else C24] | C31 | V13 | Hacker News: V10 [if D2 capped preview or a no-login demo exists; else skip] | - |
| Fri 15 Jan (d79) | Beat slot: beat:images, beat:leads (each post has a live fallback). | V12 [if ga5; else V05]<br>WIN(V02) | Reel V52 [beat:images; else V15]<br>Story C25 | V38 [if written consent from the customer; else C29] | V59 [beat:leads; else V07] | WIN(V02) | - | - |
| Sat 16 Jan (d80) | Carousel + light X; no TikTok. | - | Carousel C23 | - | V03 | - | - | - |
| Sun 17 Jan (d81) | Sunday review ritual + winner reel + weekly numbers. | - | Reel WIN(V02) | - | C37 | - | Indie Hackers: C37 | - |

**Sunday check:** Week 12 scorecard vs base (kpis.json): qualified visits 5000, gross paid 50, net paid 42, activated payers 30, cumulative gross 445, active subs 345, MRR $12717, loop share 19%, owned posts 25-30, creators active 18, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast.

## Week 13 (18-26 Jan, day 90 on Tue 26 Jan): Phase 3: scale what pays, day-90 report

**Goal:** Reinvest only into sources at or under target CAC. Film V43 and build the day-90 numbers; post them and run the review on Tue 26 Jan (day 90).

**Base targets (kpis.json):** 5,500 qualified visits, 55 gross payers (47 net), 33 activated payers, MRR about $14,198 at week end, loop share 20%, owned posts 25-30, creators active 22.

| Day | Focus | TikTok | IG | LinkedIn | X | YouTube | Other | Key actions (non-recurring) |
|---|---|---|---|---|---|---|---|---|
| Mon 18 Jan (d82) | Beat slot: beat:domains (each post has a live fallback). | V05<br>V57 [beat:domains; else V04] | Reel V05<br>Story C15 | C01 | V05 | V05 | - | Scale review: only sources at or under target CAC get the D4 reinvestment; Content Rewards +20-30% steps only at... |
| Tue 19 Jan (d83) | Deck day. | V06 | Reel V06 | C17 | C17 | V03 | - | - |
| Wed 20 Jan (d84) | Founder 'Day N' + speedrun. | V21<br>V02 | Reel V02<br>Story C22 | C37 | V21 | V02 | - | - |
| Thu 21 Jan (d85) | Beat slot: beat:leads (each post has a live fallback). | V27 | Carousel C06<br>Story C09 [if ga5; else C15] | V13 | C13 | V59 [beat:leads; else V13]<br>long V59 [beat:leads; else V24] | - | Community workshop #5: AI lead research (if live) or the full client workflow. |
| Fri 22 Jan (d86) | Client-work post, winner re-cut, boost/payout decisions. | V07<br>WIN(V05) | Reel V27<br>Story C25 | V38 [if written consent from the customer; else C29] | C12 | WIN(V05) | - | Film the day-90 founder video V43 and build the numbers card C37 for Tue 26 Jan (day 90): net payers, MRR, CAC by... |
| Sat 23 Jan (d87) | Carousel + light X; no TikTok. | - | Reel WIN(V05)<br>Carousel C18 | - | C37 | - | - | Day-90 report prep and review agenda for Tue 26 Jan: which surfaces to keep; free-tier and preview decision for... |
| Sun 24 Jan (d88) | Week 13: the last Sunday review and the final day-90 report prep (the report posts Tue 26 Jan). No new posts. | - | - | - | - | - | - | - |
| Mon 25 Jan (d89) | Week 13: final day-90 report prep (the report posts Tue 26 Jan). No new posts. | - | - | - | - | - | - | - |
| Tue 26 Jan (d90) | Day 90: the day-90 report and review. Post V43 with every number, run the review, decide what the next quarter keeps. | V43 | - | V43 | V43 | V43 | - | Day-90 review (90 minutes plus the owner): net payers, MRR, CAC by source, refunds, month-2 renewal, loop share...<br>Publish the day-90 public report (if the owner approves D11) and send the day-90 press follow-up (owner sends). |

**Sunday check:** Week 13 scorecard vs base (kpis.json): qualified visits 5500, gross paid 55, net paid 47, activated payers 33, cumulative gross 500, active subs 385, MRR $14198, loop share 20%, owned posts 25-30, creators active 22, CAC <=$50. Guardrails: refunds <=15% (per-source brake 20%), attribution coverage >=90% from week 2, activated >=60% of net payers (weeks 1-4) / >=70% after, IG DM keyword replies >=3 per 1,000 views, MRR below 80% of target two Sundays running -> re-forecast. (Week 13 runs to Tue 26 Jan, day 90, when the day-90 review runs.)

## Every day (recurring, in `calendar.json` actions)

- 08:00 numbers block (Whop sales and refunds, `/go/` clicks by source, AI limit hits, first-build times) every day except Sunday.
- Weekdays: 15 LinkedIn comments on agency-owner posts, 20 X replies, 1 contribution to the agency community with no links, and 1 customer call from week 2. Weeks 9-10 drop to replies only.
- Mondays and Thursdays: a batch-film block (8-10 videos). Mondays from 9 Nov: the D4 reinvestment calculation. Thursdays from 5 Nov: the customer changelog email (owner sign-off before the first send). Fridays: the boost check (only inside a slot window and only with b5 money left) and the support sweep. Sundays: the 90-minute review.
- Daily KPI check: first build within 10 minutes for 90%+ of payers; the AI limit not hit on a day with new payers; support first reply within 4 hours; any Whop payment without a Makeborne-created checkout triggers a same-day alert; a 48-hour read on each post.

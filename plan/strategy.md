# Makeborne 90-day growth plan (final)

> **Launch moved again (owner decision, 27 Oct 2026).** The public launch is **Thursday 29 October 2026 at 21:00 Sarajevo time** (CET, 20:00 UTC); makeborne.com counts down to that moment. Day 1 = Thu 29 Oct; Mon 26, Tue 27 and Wed 28 Oct are pre-launch days −3, −2 and −1. The launch week moved 1 more day (days 1-7 = 29 Oct - 4 Nov); launch day runs around 21:00 (T7 "We're live" at 21:00, V01 at 21:30). The countdown teasers T3-T6 and Stories S1-S3 have the old Wednesday time burned in and are not posted; "Guess the build time" (T8) is the Wed 28 Oct 21:00 post, and screen-recording Stories S4-S8 use the real countdown. Everything after the launch week keeps its date (ads A01 12-15 Nov and A02 3-4 Dec, creator waves, the no-boost window 20 Nov - 2 Dec, Black Friday, the 22 Nov and 20 Dec checkpoints). The 90 days run Thu 29 Oct 2026 - Tue 26 Jan 2027 (day 90, the day-90 review). `data/calendar.json` and the war room are the source of truth; dates and day numbers in the text below that disagree are from before the move.


**Window:** pre-launch Mon 26 - Wed 28 October 2026, public launch Thursday 29 October 2026 at 21:00 CET, to the day-90 review on Tuesday 26 January 2027.
**Day numbering:** day 1 = Thu 29 Oct (launch 21:00 CET); Mon 26, Tue 27 and Wed 28 Oct are pre-launch days −3, −2 and −1. Launch week = days 1-7 (29 Oct - 4 Nov). Phase 1 = days 8-27 (5-24 Nov). Phase 2 = days 28-57 (25 Nov - 24 Dec). Phase 3 = days 58-90 (25 Dec - 26 Jan). The day-90 review is Tue 26 Jan.
**Cash budget:** $1,000, allocated exactly in section 6. Everything after it is paid from revenue under a reinvestment rule (an owner decision).
**Status:** final plan for owner review. Nothing in it has been posted, bought, submitted or sent. Every pitch, listing, payment and creator contact is something the owner does or approves.
**Built from:** `plan/draft-creator-led.md` (the judges' spine), `plan/draft-launch-events.md` (calendar and gates) and `plan/draft-agency-community.md` (buyer, loops and partner terms), with every flaw the three judges raised fixed. Evidence is in `research/*.md`, whose Verification sections override their bodies.

**Labels**
- **[F]** verified fact, read at the source on or before 26 Oct 2026
- **[S]** secondary source
- **[V]** vendor or self-reported claim
- **[E]** our estimate or arithmetic on stated inputs
- **[A]** assumption, to be replaced with real data from weeks 1-2
- **[O]** owner decision
- **[U]** unverified: check before it gates any spend

---

## 1. Executive summary

1. **The honest target.** $1M ARR is about $83.3k MRR, or about 2,050 active subscribers at a Studio-heavy $41 blend (about 2,260 at $36.90). No company in our research reached $1M ARR within 3 months from a cold start with no free tier [F/S, `research/case-studies-ai-builders.md`]. Lovable's "$1M ARR in a week" (Nov 2024) came with a free tier and a 50k-star open-source audience [F]. Base44's "$1M in 3 weeks" is from Lenny's show notes; the founder self-reports a $1.5M ARR goal hit in four weeks (CEO Insider, 4 Aug 2025) [V]. No audited data. Never in public copy. **The plan of record is the base case: about $174k ARR (about $14.5k MRR) at the day-90 review on Tue 26 January** (calculator day 91, `data/funnel.json`). If creator traffic converts like average traffic, base falls to about $134k ARR and paid CAC to about $100 (the "strict research inputs" column in 14.2); the 16 Nov and 30 Nov checks decide which applies. $1M is a breakout scenario with named conditions (section 15). It is not the plan.
2. **Who we sell to first.** Freelancers and small agencies who build sites for clients, sold on **Studio $49**. Everything they need is live today: AI sites published on a Makeborne address, client review links with anonymous comments and Approve, a basic CRM with a lead finder, manual GitHub export and a projects library. Studio earns about $33 a month of contribution against about $13 for Create [E, `research/product-funnel-audit.md` §8.2], so every Studio buyer is worth about 2.5 Create buyers.
3. **What we say.** *"The AI studio for client work. Build it. Send the link. Get the yes."* Short-form line: *"One brief in. A finished website, deck or book out."* Proof line: *"From $20/month + tax. Full refund until you use credits."*
4. **The engine.** It comes from the creator-led draft. Every post shows the product working: the finished output in frame 0, a visible timer, one live edit, publish, and a loop back to frame 0. That traffic goes through Instagram comment-keyword DMs (SITE, DECK, BOOK, CLIENT) to landing pages that match the format, with "use my brief" deep links. Small paid creator waves follow, then boosts only for posts that already sold, then revenue-funded Content Rewards at about $1.60 per 1,000 views (a Lovable clipping campaign run by Virality, now paused: $26,119 for 16.7M approved views [F]).
5. **The loop.** It comes from the agency draft. After a client decides, the review page shows "Review powered by Makeborne" with the agency's referral code. A public "play the client" sample review link (ask 5, shipping in weeks 1-2, not live at launch) will stand in for a trial at zero AI cost. Activation means **a review link sent**, not a sign-up.
6. **The calendar.** It comes from the launch-events draft. Each feature that is coming soon becomes a news beat only after it passes the **gate**: 48 hours live in production, 10 golden briefs passed, the AI limit raised, the founder free for support, copy reviewed and links tracked. Features that land close together are announced as one five-day Launch Week. The main Product Hunt launch is kept for generated images. Day-30 and day-90 public-numbers posts and free regional press are beats that need no feature.
7. **The money.** $1,000 goes to one concentrated test and nothing is sliced nine ways:
   - $49 TAAFT on day 1
   - $390 for wave-1 creators (fees plus a per-view bonus)
   - $140 for wave-2 visual creators
   - $200 to boost posts with a tracked sale
   - $30 Uneed on the images day
   - $30 DM tooling
   - $25 creator payout fees
   - $136 reserve

   No dollar is spent until attribution works.
8. **The workload, stated honestly.** The plan runs 4 core surfaces at about 25-30 owned posts a week. Founder time is the binding constraint: support always comes first, and X replies are the first thing cut. Staffing and the time budget are in the owner's private notes.
9. **Link discipline.** Only Makeborne-created checkout links are used [O]. Every link we hand out goes to `makeborne.com/go/<code>`, and every checkout is created by Makeborne with `mb_src`, `mb_campaign` and `mb_aff` metadata.
---

## 2. North-star metric

**Weekly net new paying accounts that sent at least one client review link, or published or exported a deck or book, within 7 days of paying.** We call these "activated payers".

Why this metric:
- it counts money (net of refunds)
- it counts the behaviour that predicts retention and feeds the review-page loop
- it cannot be inflated by views or sign-ups

**Base target:** about 13-27 a week in November (13, 18, 20, 27 in weeks 2-5, per `data/kpis.json`), rising to about 27-33 a week in January. That is 60% of weekly net payers in weeks 1-4 and 70% after.

**Guardrails, checked every Sunday:**
- refunds within 14 days at or below 15%
- blended CAC on paid lines at or below $50
- first build started within 10 minutes of paying for at least 90% of payers
- support first reply within 4 hours

---

## 3. ICPs and positioning

### 3.1 ICP order

| # | ICP | Plan | Job to be done | Channels | Message | Push |
|---|---|---|---|---|---|---|
| 1 | **Freelance web designers and small studios (1-10 people)**, plus the "sell websites to local businesses" side-hustle crowd | Studio $49, Scale $99 | Win the client before the first call, then get the approval without email chaos | Founder LinkedIn, wave-1 Lane A creators, partners and affiliates, the review-page loop, one agency community, brand TikTok client-work POVs | "Build it. Send the link. Get the yes." | Now |
| 2 | **Consultants, founders and agency owners who need decks** | Create $20, Studio | Turn messy notes into a deck they can open and edit in PowerPoint | Founder X and LinkedIn, brand TikTok and Reels, YouTube Shorts | "Notes in. An editable deck out. Click the chart: it's real." | Now |
| 3 | **Coaches, creators and authors** (guides, lead magnets, client welcome books) | Create | Package their expertise as a book they can give away or sell on screen | Instagram Reels and carousels, brand TikTok | "Your notes app is full of book ideas. Here's one, finished." | Text-led books now. Picture and gift books only after images pass the gate |
| 4 | **Small business owners (DIY)** | Create | A credible website today, without hiring anyone | Brand TikTok comment-reply speedruns, reached through agencies by the badge | "Comment your business. Watch its site get built." | Light now (sites publish on a Makeborne address). Full push only after custom domains pass the gate |
| 5 | Educators and students | — | — | — | — | Not in this 90 days (needs an education price [O]) |

**Who we do not target:** people building apps with logins and databases. That is Lovable and Base44 territory, and we say so openly.

**Lane rule:** content saying "I replaced my agency" or "you don't need a designer" never runs on founder LinkedIn, the creator Lane A briefs or anything an agency buyer sees. On brand TikTok only the softened version is allowed: "a first version before you hire a designer".

### 3.2 Positioning statement (internal)

For freelancers and small agencies who make things for clients, Makeborne turns one brief into a website, a deck and a book in one brand. It then gives the client a link to comment and approve. Lovable and Base44 build apps and Gamma builds decks. Makeborne covers the whole client deliverable and the approval, and is honest about what each request costs.

---

## 4. Messaging house

### 4.1 One-liners

| Use | Line |
|---|---|
| Category (site header, bios, LinkedIn) | **The AI studio for client work.** |
| Agency hero (UTM-matched, `utm_medium` creator, affiliate, linkedin, community) | **Send your client a real website before the first call.** |
| Tagline | **Build it. Send the link. Get the yes.** |
| Short-form, on screen | **One brief in. A finished website, deck or book out.** |
| Proof line (end cards, DMs, landing pages) | **From $20/month + tax where applicable. Full refund until you use credits.** (Launch checkout shows prices before tax, so EU and UK consumer-facing ads must say tax is added or show VAT-inclusive prices [U], section 16 risk 27. Update everywhere if the owner changes the refund rule, D1 in section 17.) |
| Founder series | "Day N: building an AI studio for client work from Sarajevo, with $1,000 and every number in public." |
| Contrarian (press, Indie Hackers) | "Paid plans only, on purpose. Watch the uncut build. If you don't use a credit, you get every cent back." |

### 4.2 Pillars and proof (all live today)

| Pillar | Say | Proof to show |
|---|---|---|
| **Win before the call** | "Find local businesses with weak sites, build them something better, track the follow-up." | A 45 s real-timer recording: lead finder (live, not the coming AI lead research), demo site, review link |
| **Approval without email chaos** | "Your client comments on the live site. No account, no screenshots." | The public **sample review link** ("play the client"); a phone clip of the client tapping Approve |
| **One brief, three deliverables** | "The site, the pitch deck and the client guide, in one brand." | One brief, three outputs, 30 s; the PPTX opened in PowerPoint with a real, clickable chart |
| **You own it** | "Download the source any time. Export to GitHub." | A manual export clip. Never imply automatic sync |
| **Honest billing** | "The most a request can cost is shown before it starts. Full refund until you use credits." | The pricing promises in plain words; founder "Day N" posts with real refund numbers |
| **Made, not generated** (look and feel) | — | Cream canvas, Inter display with one Newsreader Italic accent word, real UI only, timed builds |

**Proof assets in the bank (honest today):**
- the v9 "Fly-over" (9:16, 16:9), which shows the real home page; check its end card, and re-check that it matches the live home page before use
- v12 real product outputs: the book riffle and the one-value deck chart edit; never let the "Tern" brand name be legible
- fresh real-speed screen captures recorded in launch week

v13 and v14 are built on concept imagery. The v14 end card says "Start free", which is false. **The v14 film and the v14 reference stills (`sheet_v14.jpg`) are brand art and the quality target for the images beat. They are not product proof** [F, `research/creative-assets.md`].

### 4.3 Hook bank (true today; the hook code goes in `utm_content`)

- R1 "This website took 52 seconds. Watch." (use the real time)
- R2 "Replying to @___: here's your bakery's website." (only for someone who asked, with written OK and public information)
- F1 "Freelancers: steal this client-approval trick."
- F2 "POV: the client says 'make it pop' for the 9th time."
- F4 "I found 20 local businesses to pitch in [real time]." (the live lead finder, shown live; never claim "no website", which the launch finder does not read)
- A3 "40-email feedback thread vs one link."
- D1 "Pitch deck from one brief. 40 seconds."
- D3 "It's a real chart, not a picture." (PPTX)
- B4 "Your notes app is full of book ideas. Here's one, finished."
- P2 "Day 7: here's exactly how many people paid."
- P3 "Everyone said 'give it away first'. Here's why I didn't."

### 4.4 Objection handling

| Objection | Answer |
|---|---|
| "No free plan?" | "Watch the full uncut build first, open our sample review link and play the client (once live, ask 5), and browse real unedited outputs with their briefs (once the gallery is live, ask 7). If you don't use a credit, you get every cent back." |
| "Is it just templates?" | Show the brief and the result side by side, plus one live edit. |
| "Can I use my own domain?" | "Not yet. Sites publish on a Makeborne address today. Demos and approvals don't need a domain, and you can download the source." (No date, ever.) |
| "Does it make images?" | "Not yet. That's coming soon. Today sites, decks and books are typography-led or use your own photos." |
| "Will my client see your brand?" | "Your client sees your work and a simple review page with no account needed." (Badge-removal wording only once confirmed [O].) |
| "What happens to client sites if I cancel?" | "Sites stay live while your plan is active, and you can download the source any time." (Decision D7 may improve this.) |
| "Why not Lovable?" | "Lovable is great for apps with logins. Makeborne is for client deliverables: the site, the deck, the book and the client's approval." |
| "Can I print the book on KDP?" | "Not yet. Books are made for screen and PDF. KDP requires you to disclose AI-generated text and images" [F]. |
| "What if I run out of credits?" | "Upgrade your plan any time. Unused credits carry over for two months." Top-ups only once they are live. |
| "Who are you?" | "A small studio in Sarajevo, selling worldwide. The founder answers support, and our numbers are public." |

**Copy hygiene:**
- Never say "free", "trial" or "start free".
- Never name AI model vendors anywhere customer-facing.
- Never make a "better than Lovable, Gamma or Framer" claim. No blind evaluation has run, and EU comparative-advertising rules need verifiable claims.
- Every speed claim is timed on screen or labelled "sped up".
- Unreleased features say "coming soon" with no date.
- Avoid "unlimited sites". Say "host your client sites on one plan, no per-site fee (fair use applies)".

---

## 5. Channels and cadence

### 5.1 Four core surfaces, days 1-60

The judges cut the creator draft's 7-9 accounts. There are no faceless accounts, no niche TikTok and no language clone in the first 60 days, because each splits early signals and adds TikTok multi-account and originality risk [F, TikTok Integrity and Authenticity guidelines]. Reels and Shorts are **native re-edits, not extra accounts**.

| Surface | Role | Cadence | Owner | KPI |
|---|---|---|---|---|
| **Brand TikTok** (business account: clickable bio link, Commercial Music Library only [F]) | Lottery tickets. Comment-reply speedruns, client-work POVs, deck proofs. The founder appears on camera | 8-10 a week, posted around 13:00 and 21:00 Sarajevo (move to 20:00-00:00 from 1 Nov for the US East) | Founder (editor from about $2k MRR) | Profile visits per 1,000 views ≥5; `/go/tt-*` clicks |
| **Brand Instagram** (professional) | **The DM conversion engine.** Comment SITE, DECK, BOOK or CLIENT and the DM returns a `/go/` link, 3 copyable briefs, a 30 s uncut build and the exact refund line | 5 Reels (re-edits) and 2 carousels a week | Founder | DM keyword replies per 1,000 views ≥3; DM-to-paid |
| **Founder LinkedIn** | The Lane A buyer. Carousels **built in Makeborne** with a "Made with Makeborne" end slide, client-workflow stories, weekly numbers | 5 a week, plus 15 comments a day on agency-owner posts | Founder | `/go/li-*` clicks; Studio share of buyers |
| **Founder X** | Build in public, AI-builder circles, Product Hunt and developer beats | 1 original a day, plus 20 replies a day, link in the first reply | Founder | `/go/x-*` clicks; PH supporters |
| YouTube (Shorts plus long-form) | Re-edits of TikTok winners. Long tutorials for search from week 3 | 5 Shorts a week (re-edits); 1 long tutorial every 2 weeks | Founder | Shorts-to-tutorial clicks |
| **Total owned** | | **about 25-30 a week**, of which about 15 are original pieces | | |

### 5.2 Supporting channels (low time, fixed cadence)

| Channel | Cadence | Notes |
|---|---|---|
| Paid creators (waves 1 and 2) and affiliates | Wave 1 posts 9-22 Nov; wave 2 at the images beat | Section 6 |
| Gated boosts (TikTok Spark, Meta partnership ads) | At most 2 slots | Only posts with a tracked sale. None 20 Nov - 2 Dec |
| Whop Content Rewards | From revenue only, after the gate in 6.3 | Plan at $1.60 per 1,000 views |
| Directories | TAAFT day 1; free directories from day 2; Uneed on the images day | No other paid directories |
| Product Hunt | Coming-soon page once TAAFT is live; main launch at the images beat; "Makeborne for agencies" relaunch only if agency tools are a significant iteration | No upvote asks, ever [F] |
| Indie Hackers | 1 numbers update a week | — |
| Reddit | r/SideProject at launch and at beats, after reading every sidebar by hand [U] | Never the same text twice |
| One agency community | Contribute daily from week 1; a 20-minute live workshop every 2 weeks from week 3 | Show-and-tell channels only, no cold DMs |
| Regional press (owner sends) | Week 1 local-language release; day-30 and day-90 numbers | Netokracija, Bloomberg Adria, Startit and BiH portals |
| Customer email | 1 changelog a week, plus 1 per beat | Opt-out in every email; owner sign-off before the first send |
| Product loops | Always on | Review page, badge, share links, referral |

### 5.3 Two lanes, one funnel

- **Lane A (client work):** founder LinkedIn, Lane A creators, community workshops, the review-page loop and brand TikTok client POVs.
- **Lane B (reach):** speedruns, decks and text-led books on brand TikTok and Reels.

Comment-reply speedruns for local businesses are framed for **both** lanes ("here's what you could send this bakery today"). This stays honest that the site publishes on a Makeborne address.

### 5.4 Content mix (brand and founder video)

| Format | Share | Live? |
|---|---|---|
| Client-work POVs and tutorials (review link, Approve on phone, lead finder, CRM, export) | 25% | Yes |
| Comment-reply and 60-second speedruns (sites) | 25% | Yes |
| Decks (notes to deck, before and after, the PPTX chart proof) | 20% | Yes |
| Founder "Day N" build in public | 15% | Yes |
| Books, text-led (guides, lead magnets, family recipe books) | 10% | Yes. Picture and gift books wait for images |
| Before and after, stitches, "rate my website" | 5% | Yes |

**Two cuts of every idea:**
- a 25-35 s punch cut (TikTok engagement peaks under 30 s)
- a 60-150 s full build (120-180 s TikToks got about 10x the views in Socialinsider's H1 2026 data, with methodology caveats [F])

### 5.5 Core shot list (comment-reply speedrun)

| Time | Picture | On-screen text |
|---|---|---|
| 0-1.5 s | Finished site scrolling on a phone, with the reply bubble | "Your bakery's website. Built from one brief." |
| 1.5-4 s | Composer with the brief typed; stopwatch starts | "Timer's on." |
| 4-20 s | Real-speed build, or labelled "sped up 4x" | 3-5 word labels |
| 20-28 s | One live edit, then Publish to a Makeborne address | "Live. 52 s." (the real time) |
| 28-32 s | Back to the frame-0 shot so it loops | "Comment your business. I'll build the next one." |

**Real businesses:** only when the person asks, only public information, written OK before anything stays published, unpublished by default, and never anyone's personal data.

---

## 6. The $1,000 budget

### 6.1 Spend gate (applies to every line except TAAFT)

No creator is paid and no boost runs until all three are live:
1. `makeborne.com/go/<code>` short links
2. first-touch storage on the account
3. `mb_src`, `mb_campaign` and `mb_aff` written into the **Makeborne-created** Whop checkout metadata

Target: live by Thu 29 Oct. Organic posting does not wait. If engineering slips, the "How did you hear about us?" onboarding field (with a creator-handle box) ships first as the fallback, and creator payments still wait.

**Never hand out Whop store links or Whop tracking links.** Only Makeborne-created checkout links are used [O].

### 6.2 Line items

| # | Item | USD | When | Owner | Kill rule | Scale rule |
|---|---|---|---|---|---|---|
| 1 | **TAAFT listing**, submitted before any other listing to keep the launch-first $300 PPC bonus (check on the form that it applies to the $49 tier) [F/U] | **$49** | Thu 29 Oct (day 1), right after the 21:00 launch posts | Owner | Sunk. No TAAFT upgrades unless it brings 3+ tracked net payers in 30 days | The $437 bundle only from revenue, and only if it converts [O] |
| 2 | **Wave-1 creator flat fees**: 5 creators × $60 for 2 videos. 3 Lane A (freelance web design or "sell sites to local businesses", at least 1 on LinkedIn) and 2 Lane B (decks or productivity, side-hustle). 2k-50k followers, at least 60% of the audience in US, UK, EU, CA or AU (screenshot required). Each gets a comped Studio month, a `/go/c-<handle>` link, a use-my-brief link, a custom affiliate code and **60 days of Spark or partnership-ad rights**. Half paid on signing, half on delivery, and only after the gate | **$300** | Recruit 27 Oct - 6 Nov; posts 9-22 Nov | Owner (contacts), founder (briefs) | **Per creator** (each costs at most $140: $60 flat, half on signing and half on delivery, plus up to $80 of view bonus, so a signed contract cannot be stopped at $100): **no rehire** if 0 net payers 14 days after video 2; **rehire only** at 1 net payer per $40. The $100 / $150 kill rule applies to boosts, rehires and reserve spend | Rehire from the reserve, then from revenue; move to the 30% founding-partner rate |
| 3 | **Wave-1 per-view bonus pool**: $1.50 per 1,000 views in each video's first 7 days, capped at $40 a video | **$90** | Paid weekly from 16 Nov | Founder | Pay on verified views only; watch for views clustering at the cap | Overflow beyond $90 is paid from the reserve (overflow means a winner) |
| 4 | **Wave-2 visual creators**: 2 × $60 for 2 videos, plus a $20 bonus pool, for image-led sites, decks and books | **$140** | Only after **images pass the gate**. **If images are not live by 30 Nov**, rehire the best wave-1 creator instead | Owner, founder | Same as line 2 | Same as line 2 |
| 5 | **Boosts of gated winners**: TikTok Spark ($52/day × 2 days; the floor is "more than $50" a day [F]) and a Meta partnership ad (about $24/day × 4 days, Reels and Feed). Geos: US, UK, CA, AU, IE, NZ, DACH, Nordics, Benelux. **Qualify:** 3x or more the account's median views in 48 h, a 65%+ 3-second hold, **and** at least 1 tracked sale or 5+ link clicks per 1,000 views. **Precondition:** confirm by 9 Nov that both ad accounts can be registered and billed from Bosnia and Herzegovina [U]. If they can't, move the line into creator rehires | **$200** | Slot A no earlier than 9 Nov; slot B from 3 Dec. **None 20 Nov - 2 Dec** (Black Friday CPMs) | Founder | Stop after $30-50 if link CTR is under 0.5% or CPC is over $2. Stop a source at $100 with 0 net payers | +20-30% at most every 48-72 h, and only at CAC ≤$50 over 3+ net payers. A 2-day burst is a lottery ticket, not a clean read: judge it on `/go/` sales |
| 6 | **Uneed** pick-your-date slot for the images Product Hunt day [S] | **$30** | Book only after the Wed 4 Nov images go/no-go, or first confirm Uneed allows rescheduling [U]; runs on the images day | Owner | — | Fallback if images slip: move the slot to the next beat that passes the gate |
| 7 | **Instagram DM automation**: start on the free tier; upgrade only when the free tier is outgrown [A, price unverified] | **$30** | When needed | Founder | Unspent money rolls into the reserve on 1 Dec | — |
| 8 | **Creator payout fees and FX**: lines 2-4 pay up to 9 people abroad from a BiH company. Prefer one low-fee transfer service or batch payments, and never a $30 SWIFT wire. Payout tax checks are in the owner's private notes [A] | **$25** | With each payout | Owner | Unspent money rolls into the reserve | — |
| 9 | **Reserve**: released only by the scale rule. Uses, in order: (a) bonus overflow on a breakout video, (b) rehire the creator with the lowest CAC, (c) extend a winning Spark or partnership ad, (d) a small Whop Content Rewards pilot (Whop's docs list no minimum and no fee [F, read 26 Oct 2026]) | **$136** | Weeks 3-8 | Owner approves | Unspent at day 60 goes to the best source | Released when a source shows CAC ≤$50 over 3+ net payers |
| | **Total** | **$1,000** | | | | |

**Cut on purpose:**
- TopAI and Fazier (low-intent backlink buys)
- niche newsletter tests at $60-75 (too small to read)
- Google brand-search defence (only if someone bids on "Makeborne")
- a cash Content Rewards pilot inside the $1,000
- the blind evaluation (competitor subscriptions and founder time in the busiest stretch)

**Not in the $1,000 (operating cost, owner approval D14):**
- brand demo builds: about 2 a day × about $1 × 90 days ≈ $180 [E]
- comped creator Studio credits: at most $22.50 each at full use, about $160 for 7 creators [E]
- per-wave bonus credits: at most about $3 per redeemer [E]

### 6.3 Rules shared by every source

**CAC targets:**
- $37 or less on Create-heavy sources
- $50 or less blended when Studio is 35%+ of the mix
- hard ceiling $120

At 60% credit use, contribution is about $13.3-13.8 a month on Create and $32.7-33.9 on Studio [E, funnel audit §8.2]. So $50 pays back in about 1.5 months on Studio and about 3.7 months on Create.

**Creator-traffic assumption [A]:** the base case assumes creator traffic converts **1.5x** the blended rate (or clicks at 0.8%+). At the research's own inputs (creator CPM $5, 0.6% view-to-visit, 1.0% visit-to-paid) a paid creator payer costs about $100, double the $50 gate, D4 never releases money, and base falls to about $134k ARR (`data/funnel.json` scenario `baseStrict`). The 30 Nov paid-CAC check decides which case applies.

**Keep, kill and pause:**
- **Kill a source** at $100 spent with 0 net payers, or $150 with 1 (boosts, rehires and reserve spend; signed wave-1 creators use the per-creator rule in line 2).
- **Refund brake:** pause any source where **more than 20%** of its buyers refund within 14 days. This is tightened from the drafts' 30%.
- **Scale:** CAC ≤$50 over 3+ net payers, then +20-30% at most every 48-72 h.

**Week-4 offer check (Mon 16 Nov):** the creator test cannot be read yet (wave-1 first videos post 9-15 Nov, and the keep rule counts payers 14 days after video 2, about 30 Nov - 6 Dec). Judge 16 Nov on **organic `/go/` visit-to-paid** (the D2 trigger: under 0.7%) plus boost slot A. Levers: D1 (usage-capped refund) and D2 (capped first-build preview).

**Paid-CAC offer check (Mon 30 Nov):** this comes before any money beyond wave 1. If no source has delivered net payers at ≤$50 each, **change the offer before buying more views**. D4 reinvestment starts only once a source has 3+ net payers at ≤$50 (earliest about 23 Nov).

**Reinvestment after the $1,000 [O, D4]:**
- Each Monday from week 3, put **30% of the previous week's net new cash** (after refunds and Whop fees) into the sources at or under their CAC target.
- Drop to 10% when blended CAC sits between the target and 25% above it.
- Put 0% into any source above that.

**Content Rewards (from revenue only).** Start only after a source shows CAC ≤$50 on 3+ payers **and** MRR passes about $1.5k. Settings:
- UGC at $1.50-2.00 per 1,000 views
- $3 minimum payout
- $150 cap per video
- a geo rule
- #ad disclosure
- a real build on screen
- a tracked `/go/` link
- live features only
- no vendor names

Plan at **$1.60 per 1,000 views**. Lovable's effective rate was $1.56 against a $1 headline [F]. Budget about 3% for processing until Whop confirms fees.

---

## 7. Launch week, day by day (pre-launch 26-28 Oct, then 29 Oct - 4 Nov 2026)

Times are Sarajevo (CET, UTC+1). The EU changed clocks on 25 Oct and the US changes on Sun 1 Nov. Product Hunt's 12:01 am Pacific is 08:01 Sarajevo before 1 Nov and 09:01 from 1 Nov [F]. The public launch is **Thu 29 Oct at 21:00**, when makeborne.com's countdown ends. Today (`data/calendar.json`) has every post and action below with its exact time.

### Pre-launch - Mon 26 to Wed 28 Oct (days −3 to −1)
- **Nothing public says "we launched"**, "live", "Wed 28 Oct" or "19:00". The teasers T3-T6 and Stories S1-S3 have the old time burned in and are never posted.
- **Set up accounts:**
  - TikTok business account, Instagram professional account, YouTube channel and LinkedIn page
  - bios say "From $20/month + tax. Full refund until you use credits."
  - Instagram DM keywords (GO first, then SITE, DECK, CLIENT and BOOK) on the free tier of the DM tool
- **Record 4-6 real-speed captures** at 2x UI scale:
  1. lead finder, then demo site, then review link
  2. client comment, then fix, then Approve, on a phone
  3. one brief to a site, a deck and a book
  4. PPTX chart edit
  5. GitHub export
- **Verify the checkout path:** list every link in bios and posts and confirm none points to a Whop store page.
- **Check the v9 Fly-over** (9:16). It must match today's home page and its end card must be true. If needed, add a 2 s card: "makeborne.com · from $20/mo + tax · full refund until you use credits".
- **Teasers:** Tue 27 Oct 19:00 Story S4 (the new time, with the real countdown); Wed 28 Oct 12:00 Story S5 (something is hidden behind the countdown) and 21:00 T8 "Guess the build time", captioned "Makeborne opens tomorrow, Thu 29 Oct, 21:00 CET".
- Set up the ad accounts from Bosnia with no money spent, and prepare the Bosnian press (the embargoed release goes out Thu 08:30; `content/bosnia-guerrilla-press.md`).

### Day 1 - Thursday 29 Oct (launch at 21:00)
- **Before any post:**
  - confirm the three copy fixes and the "coming soon" labels are live, or hide the copy (section 11, ask 3)
  - raise the AI daily limit for the day (D6)
  - confirm support cover and a 4-hour reply target
- **Launch sequence:** 20:59:45 start the phone recording of the countdown reaching zero; 21:00 T7 "We're live", only once makeborne.com is open; 21:01 the reveal Story; 21:15 founder LinkedIn "Day 1" (what it is, who it's for, price, the refund rule, one real build clip, "comment what you want built first") and an X thread with a real-speed build, link in the first reply; 21:30 the v9 Fly-over (V01), pinned on TikTok and Instagram.
- 2 brand TikToks using fixture businesses: a site (R3) at 22:00 and a deck (D1) at 22:30.
- **Submit TAAFT ($49) right after the 21:00 posts.** Hold AlternativeTo, SaaSHub, the Product Hunt coming-soon page and every other listing until the TAAFT listing is live [F].
- **Attribution target day:** asks 1 and 4 should be live. If they are not, the "How did you hear" field ships today and creator spend waits. Ask engineering for asks 1-4 today (section 11).
- The sample review link ("play the client"), if it is ready. Posts that point to it (C07, C12, V11) wait until it is live (ask 5).
- Personal one-to-one messages to 30-50 people in the founder's network, asking for feedback and introductions to agency owners. No mass sends.
- **Evening:**
  - reply to every comment
  - log "build mine" requests and consent in a private sheet (never in this repo)
  - start the market-access checklist (owner's private notes)

### Day 2 - Friday 30 Oct
- **When the TAAFT listing is live:**
  - free directories: AlternativeTo (as an alternative to Lovable, Gamma, Framer and Wix), SaaSHub, Microlaunch, Future Tools
  - the Product Hunt coming-soon page, and start collecting followers there
- The first comment-reply speedrun (R2), with consent.
- Build a creator shortlist of 30. Check audience geography, quality and past disclosure habits.

### Day 3 - Saturday 31 Oct
- A freelancer POV (F2): the review link and Approve on a phone. Post it on TikTok, Reels and founder LinkedIn.
- An Indie Hackers launch post ("Launched with paid plans only, on purpose").
- An r/SideProject founder story, but only after the sidebar has been read by hand.
- Draft `/press` from the Bosnia press kit; the Bosnian, Croatian and Serbian releases already went out on launch day.
- Join one agency community and contribute only, with no links.
- The owner contacts the top 10 creators from their own accounts. This plan contacts no one.

### Day 4 - Sunday 1 Nov (US clocks change)
- The first Instagram carousel ("5 sites from one brief", real outputs only).
- 2-3 customer video calls with the first payers. Fix whatever broke within 24 h.
- Do not book Uneed yet: book after the Wed 4 Nov images go/no-go, unless Uneed confirms the slot can be rescheduled [U] (line 6).

### Day 5 - Monday 2 Nov
- The first 48-hour read: re-cut every post above 3x the median with 2 new hooks.
- A "Day 5: exact numbers" post on LinkedIn and X.
- A deck proof (D3) and a lead-finder video (F4).

### Day 6 - Tuesday 3 Nov
- **Regional press pitch (the owner sends):** Netokracija, Bloomberg Adria, Startit and the other ex-Yugoslav tech and business outlets. Send the local-language release, 3 real outputs and a founder photo. Angle: "a Sarajevo studio launches an AI studio for client work and sells worldwide". Use Lovable only as contrast, never as "better than".
- Batch-film the rest of next week's videos.
- Sign the first creator agreements, with payment on the gate.
- Write the images-beat Product Hunt copy: 3 taglines of 60 characters or fewer, the maker first comment and a gallery shot list.

### Day 7 - Wednesday 4 Nov
- "Day 7: exactly how many people paid" (P2) with real Whop numbers, refunds included and buyer data cropped. Post it on LinkedIn, X, TikTok, Reels and Indie Hackers.
- **First weekly review (90 minutes):**
  - the scorecard (section 13)
  - keep the top 2 formats and retire the bottom half
  - keep the TikTok evening slot inside 20:00-00:00 Sarajevo (21:30 from 1 Nov)
- **Images go/no-go:** is it in production and passing 10 golden briefs? If so, pick the PH day and book Uneed for it: Tue-Thu with 400+ committed supporters, otherwise Sat-Sun [F/S].
- Confirm the wave-1 lineup.

**Launch-week targets (base, days 1-7):**
- about 3,500 qualified visits
- about 35 gross payers
- ≥80% start a first build within 10 minutes (≥90% from week 2)
- refunds ≤15%
- attribution live on launch day (29 Oct)
- 25-30 owned posts
- 5 customer calls
- 100+ Product Hunt coming-soon followers
- 1 regional press mention

---

## 8. Phases

### Phase 1 - Find the format and land the first spike (days 8-27, 5-24 Nov)

**Goals:**
- find 2-3 house formats that produce at least 1 net payer per 10,000 views
- prove the creator unit (≤$50 CAC) or change the offer
- launch generated images if they pass the gate

**Actions:**
- **Week 2 (2-8 Nov):**
  - full cadence on the 4 surfaces
  - wave-1 creators onboarded with a 20-minute call each (Gamma's founder onboarded early creators personally [S])
  - ship the sample review link and the review-page "Review powered by Makeborne" link
  - ship the format-matched landing pages and use-my-brief links if possible
  - check ad-account billing from BiH by 9 Nov
- **Week 3 (9-15 Nov):**
  - wave-1 first videos
  - boost slot A on a qualifying post with a tracked sale
  - test the Whop custom affiliate with one real purchase and refund
  - first community workshop
- **Week 4 (16-22 Nov):**
  - **offer check on Mon 16 Nov** (6.3)
  - wave-1 second videos
  - pick the house formats
  - **no boosts from 20 Nov**
- **Images beat (if it passes the gate):** run it as Launch Week 1, Mon-Fri:
  - images in sites
  - images in decks (full-image slides, quality and aspect controls)
  - images in books
  - credit top-ups, if ready
  - the gallery showcase

  Alongside it:
  - **main Product Hunt launch** from the founder's account at 09:01 Sarajevo, with a maker first comment and a real video; no upvote asks
  - the per-wave code PH100 (+100 credits on the first paid month)
  - the Uneed slot
  - wave-2 creators
  - the re-cut v14 film, with "Start free" replaced, the AI-concept line restored, the publish address matched to production, risky invented names dropped and real outputs swapped in
  - a European press follow-up
  - generated images carry machine-readable AI marking (metadata / C2PA) from day 1 (ask 21). The 2 Dec 2026 transitional date covers only generative systems already on the market before 2 Aug 2026; Makeborne's image generation is new in November, so the duty most likely applies from the first day of the beat (artificialintelligenceact.eu implementation timeline, updated 31 Aug 2026, read 26 Oct 2026; confirm on EUR-Lex [U])

**Exit gate:**
- one format shows ≥1 net payer per 10,000 views across 3+ posts, **or** the offer has changed
- attribution covers ≥90% of purchases
- the sources at or under $50 CAC are named

### Phase 2 - Proof, Black Friday, loops on (days 28-57, 25 Nov - 24 Dec)

**Goals:**
- 15%+ of new payers from loops (review page, badge, referral, affiliates)
- Studio at 35%+ of the mix
- Content Rewards funded from revenue if the gate is met

**Actions:**
- **Wed 25 Nov - 30-day public numbers post:** MRR, payers, refunds, AI cost per build and lessons. Post it on Indie Hackers, LinkedIn and X, and send it to press as a follow-up.
- **Black Friday (Fri 27 Nov) to Cyber Monday (30 Nov):** the message is "yearly is 20% off", which is already true. No extra discount, no countdowns (D5).
- **Consent banner by about 6 Dec** (week 6), plus server-side purchase events from the Whop payment webhook. These are needed before any pixel or retargeting.
- **Shipping:**
  - customer referral credits (+100 credits each side, paid on a non-refunded first payment)
  - public share links for decks and books with a removable "Made with Makeborne" end card
  - lifecycle emails ("send your first review link"; weekly "your client sites had N visitors")
- **Custom-domains beat (if it passes the gate):**
  - "Client sites now go live on the client's own domain"
  - LinkedIn, community workshop, founder X
  - small-business speedruns move from light to full
  - launch the "Made by [Agency] with Makeborne" badge and partner directory
- **Agency-tools beat (if it passes the gate):** the "Makeborne for agencies" PH relaunch, but only if it is a significant iteration and comes at least 4 weeks after the images launch. Otherwise LinkedIn and community only.
- **Text-led books until about 20 Dec.** Picture-book and gift pushes run only if images are live.
- **Help from revenue** (owner's private notes). Winning creators move to the 30% founding-partner rate plus small retainers.
- **Boost slot B** on the best post from 3 Dec.

**Exit gate:**
- loops ≥15% of new payers
- refunds ≤15%
- at least one creator rehired on the scale rule
- the consent banner live

### Phase 3 - Holiday bank, January pipeline, scale what pays (days 58-90, 25 Dec - 26 Jan)

**Goals:**
- base-case MRR of about $14k or better
- scale only the sources at or under target CAC
- set up days 91-180

**Actions:**
- **21 Dec - 3 Jan:** half cadence. Bank January content. Keep customer calls going. Draft a day-60 note.
- **From 4 Jan, "new year, new clients":**
  - lead finder plus demo site plus review link
  - "your 2027 pitch deck" for consultants
  - "new year, new website" speedruns, now strongest if domains are live
- **AI lead research beat (if it passes the gate):** "Find the business, research it, build its site, send the review link." It can run as Launch Week 2 with the gallery expansion and the partner program.
- **Two-way GitHub sync beat:** **one X thread and one YouTube demo only**, not a wave (developers are not the ICP).
- **Show HN only if** a capped preview or no-login demo exists. Most AI-builder Show HNs since 2025 scored 1-12 points [F].
- **With consent live:** move winning Spark and partnership ads to purchase-optimised campaigns, and run small retargeting of consenting `/go/` visitors, from revenue only.
- Scale Content Rewards and creator retainers under the reinvestment rule, at +20-30% steps.
- **Add accounts only now, and only if earned:** the faceless outputs account or the freelancer-niche TikTok, once the editor is in place. A language clone only after a format has 3+ wins and output quality in that language is checked (D16).
- **Tue 26 Jan (day 90) - day-90 report and review:**
  - net payers, MRR, CAC by source, refunds, month-2 renewal, loop share
  - which surfaces to keep
  - the free-tier and preview decision for the next quarter

---

## 9. Staged launch beats for coming features

**The gate for every beat:** all six boxes must be ticked, or the beat slips a week.
1. 48 h or more live in production, passing 10 golden briefs
2. AI daily limit raised for the spike
3. founder free for support on the day and the day after
4. copy reviewed: no vendor names, nothing that isn't live
5. every link carries `/go/` and UTM tracking, and the per-wave code works
6. a legal check on any new compliance duty. **For generated images this is a hard box: machine-readable AI marking (metadata / C2PA) on every generated image from day 1**

**Announce in the first week a feature passes the gate. Never hold a feature for a calendar slot.** Features that pass within the same week become one Launch Week (one item a day for 5 days, the Supabase format [F]). Keep at least 7 days between tier-1 beats. Until a feature is live, customer copy says only "coming soon", with no date.

| Beat | Earliest planning guess (not a promise) | Angle | Assets | Tier |
|---|---|---|---|---|
| Generated images (sites, decks, books; full-image slides; quality and aspect controls) | 3-20 Nov | "Your site, deck and book now come with their own images." | Same brief before and after; the fixed v14 re-cut; wave-2 creators; PH main; Uneed; PH100 | 1 |
| Credit top-ups | Day 4 of the images Launch Week, or alone | "Run out mid-project? Top up without changing plan." | A 20 s UI clip, a founder post | 3 |
| Custom domains | Mid Nov - Dec | "Your client's site, on your client's domain." | A real customer site moved end to end; the badge and partner directory; small-business speedruns at full volume | 2 |
| Agency tools | Dec | "Run client work in one place: build, review, approve, publish." | Lead finder, demo, review, Approve on a phone; PH "Makeborne for agencies" if significant; LinkedIn series | 1 |
| AI lead research | Jan | "Find the clients whose websites need you, and show up with a better one." | Live research, 3 pitch sites, one session | 2 |
| Two-way GitHub sync | Any time | "Edit in Makeborne or in your code. Both stay in sync." | One X thread and one YouTube split-screen demo | 3 |
| 30-day numbers (no feature) | Wed 25 Nov | "30 days of an AI studio from Sarajevo, every number in public." | Redacted Whop screenshots, the funnel, refunds | Press |
| Day-90 report (no feature) | Tue 26 Jan | "90 days, every number." | The same, plus what failed | Press |

---

## 10. Funnel mechanics between the view and the paywall

1. **Format-matched landing pages** (`/sites`, `/decks`, `/books`, `/client-work`). Each puts the video's example on top, then the price and refund line, a silent 20-40 s real-build loop and one CTA. Agency UTMs get the hero "Send your client a real website before the first call", chosen on the server with no new cookies.
2. **Use-my-brief deep links** (`/go/<code>?brief=<id>`). These pre-fill the composer with the creator's exact brief and carry their code through sign-up and checkout.
3. **Instagram keyword DMs** (SITE, DECK, BOOK, CLIENT). Each DM sends the format link, 3 briefs, an uncut 30 s build, the refund line and "Reply STOP to stop". On TikTok, say "DM me SITE" and point to the business-account bio link. ManyChat's TikTok channel excluded EU, UK and US businesses as of Sep 2025, and eligibility for BiH is unknown [F/U]. Reply by hand for the first 2 weeks.
4. **Trial substitutes, no free tier:**
   - the "play the client" sample review link
   - an `/examples` gallery of unedited outputs, each with its brief, time and credits used
   - an uncut build on every landing page
   - per-wave bonus-credit codes
5. **Activation:** a review link sent within 7 days (agencies), or a deck or book published or exported (others).

---

## 11. Product growth asks, ranked by impact and effort

Effort: XS under half a day, S 1-2 days, M 3-7 days. Code locations are left out on purpose, because this repo may be public.

| Rank | Ask | Impact | Effort | Needed by | Why |
|---|---|---|---|---|---|
| 1 | **Attribution plumbing:** `/go/<code>` server redirect; aggregate `utm_*`, an allow-listed referrer host and a referral-code flag; first and last touch on the account; `mb_src`, `mb_campaign` and `mb_aff` plus `affiliate_code` on the Makeborne-created checkout; a weekly source report reconciled with Whop's payment webhook | Very high | S | Thu 29 Oct | Gates every dollar. Without it no creator, boost or beat can be judged |
| 2 | **AI daily limit that scales with paid sign-ups**, plus an honest queue message | Very high | XS | Day 1, and before every push | The AI daily limit must scale with paid sign-ups: a first site build costs about $0.93 of provider cost (median) [E], and a stalled first build becomes a refund or a dispute ($15) |
| 3 | **Copy accuracy and labels:** live product copy matches what ships at launch (the list is in the owner's private notes); "coming soon" on every unreleased item | High | XS | Day 1 | Creators will screen-record the product, so overclaims become public |
| 4 | **"How did you hear about us?" onboarding field** with a creator-handle box | Medium | XS | Day 1-2 | The fallback if ask 1 slips; also recovers view-through sales that links miss |
| 5 | **Public sample review link ("play the client")** | High | S | Week 1 | The best trial substitute for the agency buyer, at zero AI cost |
| 6 | **Review-page loop:** after the client decides, "Review powered by Makeborne: make client work like this" with `utm_source=review_page` and the agency's referral code; UTM and code on the published-site badge and portal footer | High | S | Week 2 | The product-native viral loop. Today the badge links to the homepage with no tag [F] |
| 7 | **Format-matched landing pages and an `/examples` proof gallery** (10 sites, 10 decks with PPTX, 10 books as PDF, each with brief, time and credits) | High | S-M | Week 2 | "The landing step matters more than the video"; the proof library replaces a trial |
| 8 | **Use-my-brief deep links** | High | S-M | Week 2 (before wave 1 posts) | Cuts the steps from video to first output |
| 9 | **Whop custom affiliates:** links to makeborne.com; the code passed into the Makeborne checkout; a sandbox test, then one live purchase and refund to prove payout and clawback | High | S-M | Before wave 1 earns commission | Pays creators from revenue. Only Makeborne-created checkout links are used [O] |
| 10 | **Per-wave bonus-credit codes** (e.g. PH100) at Makeborne's checkout creation | Medium | S | Images beat | Rewards launch-day buyers at ≤$3 each; measurable per wave |
| 11 | **`/changelog` and a `/launch/<wave>` template** (OG image, UTM-aware CTA) and a `/press` kit with a "verified numbers" box | Medium | S | Images beat | Every beat needs a permalink |
| 12 | **Customer referral credits:** +100 credits each side on a non-refunded first payment | Medium-high | M | Phase 2 | About $6 of provider cost per converted referral, about 10x cheaper than commission [E] |
| 13 | **Public share and present links for decks and books** with a removable "Made with Makeborne: make your own" end card | Medium-high | M | Phase 2 | Gamma's main loop; decks and books have no shareable surface today |
| 14 | **Lifecycle emails:** welcome; "send your first review link"; weekly "your client sites had N visitors" | Medium | M | Phase 2 | Activation and retention for Studio |
| 15 | **Consent banner (CMP) plus Google Consent Mode v2**, then server-side purchase events (Whop webhook, Conversions API) with consent | Medium (high in January) | S-M plus legal | By about 6 Dec | The prerequisite for any pixel, purchase-optimised boost or retargeting |
| 16 | **Lapsed client sites stay online with the badge forced on** (D7) instead of going dark | Medium | S | Phase 2 | Agencies ask about it first; it avoids "my site disappeared" posts and keeps badge reach |
| 17 | **"Made by [Agency] with Makeborne" badge plus a partner directory** | Medium | M | Custom-domains beat | Gives agencies a reason to keep the badge (it sends them leads) |
| 18 | **"Client approved. Share the win?" prompt** plus a case-study opt-in with written consent | Medium | S | Phase 2 | Turns the happiest moment into distribution |
| 19 | **Template packs as brief seeds** ("10 local trades", proposal deck, client welcome guide) | Medium | S | Phase 2 | Shareable content; lowers the blank-page problem |
| 20 | **Share-for-credits** (100 credits for posting a build, disclosed; rewards sharing, never praise, per the FTC rule [F]) | Medium | M | Phase 2-3 | The Base44 loop the founder credits [V] |
| 21 | **Machine-readable marking of generated images** (EU AI Act Art. 50(2): metadata / C2PA) | Compliance | S-M | Before the images beat | The 2 Dec 2026 date is only the transitional deadline for systems on the market before 2 Aug 2026; a new image feature most likely needs marking from launch [U, confirm on EUR-Lex] |
| 22 | **Capped first-build preview** (about 30 credits, no publish or export, one per verified email), only if D2 says yes | High if conversion is weak | M | After 16 Nov | About $0.90 per preview; makes Show HN viable |

---

## 12. Analytics and tracking plan

**Principle:** first-party, server-side and aggregate until the consent banner is live. **No ad pixels, retargeting or device-stored referral cookies before consent.** EU visitors are covered by EU consent rules even though the seller is in Bosnia and Herzegovina.

The EDPB's Guidelines 2/2023 put tracking links, affiliate links included, inside ePrivacy Art. 5(3) [F]. **Get a short legal view on `/go/`, `?a=` and `?ref=` handling before pushing EU traffic at scale.**

**Link scheme (one lowercase standard):**
- Short link: `makeborne.com/go/<channel>-<id>` redirects on the server to the matching page with UTMs. Examples: `tt-0412`, `ig-0031-site`, `li-0107`, `x-0210`, `c-<handle>`, `ph-images`, `taaft`.
- `utm_source`: tiktok, instagram, youtube, linkedin, x, producthunt, taaft, uneed, reddit, indiehackers, press-<outlet>, review_page, badge, deck_share, c-<handle>
- `utm_medium`: organic, dm, bio, creator, affiliate, spark, partnership, directory, launch, press, product_loop, email, referral
- `utm_campaign`: launch-2026-10, images-beat, domains-beat, agency-beat, leads-beat, bf-2026, day30, day90
- `utm_content`: `<surface>-<post#>-<hook code>` (e.g. `tt-0412-r2`)

**Server-side events, joined on the account ID** (names as in `content/tracking.md` §3.3):
- landing_viewed
- brief_started
- account_created
- email_confirmed
- checkout_opened
- subscription_started (Whop `payment.succeeded`)
- refund_issued
- build_started with first_build=true (and the time from payment)
- site_published (with its format: site, deck or book) or export_downloaded
- review_link_created
- review_decided
- referral_converted
- dm_keyword_received (logged by hand at first)

**Checkout:** every checkout is created by Makeborne for a signed-in account, with `mb_src`, `mb_campaign` and `mb_aff` (and `affiliate_code` for partners).
- Never use the Whop store page, the open affiliate network or Whop tracking links: only Makeborne-created checkout links are used.
- Reconcile every Sunday: Whop payments against the account's first touch.

**Fallback:** the onboarding "How did you hear about us?" field. Report "unknown" honestly. Do not assign it to the best channel.

**Weekly source report:** per source, the columns are:
- spend
- clicks
- checkouts opened
- gross paid
- refunds
- net paid
- CAC
- Studio share
- activated payers

**After consent (by about 6 Dec):** send server-side Purchase events from the Whop payment webhook, de-duplicated by event ID [F], so January Spark and partnership ads can optimise for purchases.

**Repo hygiene:** no Whop IDs, keys, buyer data, creator contact details or infrastructure details in this repo. Crop every screenshot.

---

## 13. KPI tree and weekly targets (base case)

```
North star: weekly activated payers
├── Reach: owned views/week, creator views, PH/press/directory visits
├── Intent: /go/ clicks + DM keyword replies per 1,000 views (target 3-8)
├── Conversion: qualified visit -> paid within 30 days (base 1.0%)
│   ├── qualified visit -> checkout opened (base 3% [A]; stretch ≥8% of /go/ format-page landings only)
│   └── checkout opened -> paid (measure)
├── Activation: first build ≤10 min (≥90%), review link sent / deck-book shared ≤7 days (≥60-70%)
├── Retention: refunds ≤14 days (≤15%, brake 20% per source), month-2 renewal (base ≥90% [A], alert under 85%, 70% is a kill-review floor only)
├── Loops: share of new payers from review page, badge, referral, affiliates (0% -> 20% base, 25% breakout)
└── Economics: CAC by source (≤$37 Create-heavy, ≤$50 blended), contribution per payer
```

**Weekly targets (base case; weeks start Monday; MRR at week end):**

| Week | Dates | Qualified visits | Gross paid | Cumulative gross | Active subs | MRR | Loop share | Owned posts |
|---|---|---|---|---|---|---|---|---|
| 1 | 26 Oct - 1 Nov | 3,500 | 35 | 35 | 30 | $1.1k | 0% | 25-30 |
| 2 | 2-8 Nov | 2,500 | 25 | 60 | 51 | $1.9k | 2% | 25-30 |
| 3 | 9-15 Nov | 3,500 | 35 | 95 | 81 | $3.0k | 4% | 25-30 |
| 4 | 16-22 Nov | 4,000 | 40 | 135 | 115 | $4.2k | 6% | 25-30 |
| 5 | 23-29 Nov | 4,500 | 45 | 180 | 150 | $5.6k | 8% | 25-30 |
| 6 | 30 Nov - 6 Dec | 3,500 | 35 | 215 | 178 | $6.6k | 10% | 25-30 |
| 7 | 7-13 Dec | 4,000 | 40 | 255 | 209 | $7.7k | 12% | 25-30 |
| 8 | 14-20 Dec | 4,000 | 40 | 295 | 240 | $8.8k | 15% | 25-30 |
| 9 | 21-27 Dec | 3,000 | 30 | 325 | 260 | $9.6k | 15% | 12-15 |
| 10 | 28 Dec - 3 Jan | 2,500 | 25 | 350 | 276 | $10.2k | 16% | 12-15 |
| 11 | 4-10 Jan | 4,500 | 45 | 395 | 308 | $11.4k | 18% | 25-30 |
| 12 | 11-17 Jan | 5,000 | 50 | 445 | 345 | $12.7k | 19% | 25-30 |
| 13 | 18-26 Jan | 5,500 | 55 | 500 | 385 | $14.2k | 20% | 25-30 |

**Every week:**
- refunds ≤15%
- first build ≤10 minutes for ≥90% of payers
- activated payers ≥60% of net payers in weeks 1-4, ≥70% after
- attribution coverage ≥90% of purchases from week 2
- blended paid CAC ≤$50 once measured (from week 4)

**Re-forecast rule:** from week 2, every Sunday, recompute low, base and high from real visit-to-paid, refund and churn rates.
- **By Sun 22 Nov**, if cumulative gross paid is under 100, plan on the low-to-base band and protect margin.
- Between 100 and 200, plan on base.
- At 200 or more (calculator: breakout about 200, high about 230 by day 28), the high or breakout path is live, so raise reinvestment and prepare AI capacity.

---

## 14. Funnel and ARR model

### 14.1 Method

- **Qualified visits** to makeborne.com over 13 weeks. They are spread by a weekly shape: launch, creator waves, the images beat, a Black Friday dip, a holiday dip and a January lift. Base weekly shares: 7, 5, 7, 8, 9, 7, 8, 8, 6, 5, 9, 10 and 11%. The breakout is back-loaded, because a breakout comes from later viral posts and Content Rewards.
- **Gross paid** = visits × visit-to-paid (within 30 days).
- **Net** = gross × (1 - refund rate).
- **Active** = each net cohort × (1 - monthly churn) at each 30-day renewal.
- **MRR** = active × net ARPU (plan mix, with 15% of buyers on yearly plans at 20% off).
- Model inputs are assumptions [A]. There is no published visit-to-paid benchmark for a paid-only AI builder with no trial [F]. Older freemium benchmarks (3-8% of sign-ups, Aug 2023) do not apply [F]. Lovable's Product Hunt launch converted about 5.3% of sign-ups **with** a free tier [S].
- The output is our arithmetic [E]. The model was run on 26 Oct 2026.

### 14.2 Scenarios

Every figure below comes from the calculator (`python data/funnel_model.py`, the same model as the site's Funnel page), regenerated on 26 Oct 2026. MRR is read at model day 91 (Wed 27 Jan, the day after the day-90 review; model day 1 = the launch, Thu 29 Oct). Visits include loop-implied visits.

| | Low | **Base (plan of record)** | Base, strict research inputs | High | Breakout ($1M) |
|---|---|---|---|---|---|
| Qualified visits, 91 days (incl. loops) | ~14,000 | **~46,100** | ~38,600 | ~93,700 | ~116,600 (back-loaded) |
| Visit-to-paid (30 days) | 0.4% | **1.0%** | 1.0% (creator traffic at the blended rate) | 1.3% | 1.6% |
| Refunds | 20% | **15%** | 15% | 12% | 10% |
| Monthly churn | 12% | **10%** | 10% | 8% | 7% |
| Plan mix (Create/Studio/Scale) | 65/27/8 | **55/35/10** | 55/35/10 | 50/38/12 | 45/42/13 |
| Net ARPU per month | $33.13 | **$36.91** | $36.91 | $39.28 | $41.18 |
| Paid CAC | ~$1,271 | **~$48** | ~$103 (D4 never releases money) | ~$20 | ~$11 |
| Gross new paid | 56 | **~497** | ~386 | ~1,429 | ~2,319 |
| Active at day 91 | 41 | **~394** | ~304 | ~1,200 | ~2,027 |
| **MRR, day 30 (27 Nov)** | ~$0.4k | **~$3.8k** | ~$3.4k | ~$8.9k | ~$8.6k |
| **MRR, day 60 (27 Dec)** | ~$0.9k | **~$8.6k** | ~$7.1k | ~$23.2k | ~$31.7k |
| **MRR, day 91 (27 Jan)** | ~$1.3k | **~$14.5k** | ~$11.2k | ~$47.1k | ~$83.4k |
| **ARR run-rate, 27 Jan** | **~$16k** | **~$174k** | **~$134k** | **~$565k** | **~$1.00M** |

Breakout's organic visits were raised 2% on 26 Oct so it clears $1M in the calculator (before that it gave $0.99M; `data/funnel.json` consistency note 6).

**Where base-case visits come from [E]:**

| Source | Visits |
|---|---|
| Owned short-form plus Instagram DM | 16,000 |
| Founder LinkedIn and X | 8,000 |
| Loops (review page, badge, referral, share links) | 6,000 |
| Paid creators and boosts | 6,000 |
| Revenue-funded Content Rewards (about $1.8k over 90 days under D4, at $1.60 per 1,000, about 1.1M views) | 3,300 |
| Product Hunt images launch | 3,000 |
| Directories | 2,500 |
| Search, comparison and LLM pages | 2,500 |
| Regional and European press | 1,500 |
| **Total (planned source mix)** | **48,800** |

The calculator's base reaches about 46,100 visits including loop-implied visits; the planned source mix above is slightly higher because the hand estimate of owned and founder traffic was not reduced for overlap [E].

**Reading the table:**
- **Base** sits inside the judges' consensus band of $140-250k. It is in line with the launch-events draft's conservative model ($140k) and the creator draft's view-based base ($169k).
- **Low** means no format works and the paywall before the "wow" holds conversion down. The $1,000 still buys the knowledge of which creators and formats convert.
- **High** needs one or two 1M-view product posts and about $4.6k of revenue-funded Content Rewards over 90 days (what D4 releases in the calculator).
- **Base, strict research inputs** is the downside if creator traffic converts like average traffic: paid CAC about $103, so the $50 gate and D4 never release money.
- AI capacity at base peaks at about 10 payers a day, roughly $20 a day of first builds. Breakout peaks of 100+ payers a day need about $186-270 a day [E, funnel audit §8.1]. This is covered by revenue, as long as the limit scales automatically.

---

## 15. What must be true to reach $1M ARR in 90 days

Plainly: **it is unlikely, and it is not the plan.** No comparable company did it from a cold start with no free tier [F/S]. To get there, all of the following must hold together:

1. **About 2,320 gross new subscribers** (about 2,030 active after 10% refunds and 7% monthly churn), at a Studio-heavy mix (45/42/13) worth $41.18 a month each. At the base mix ($36.91) it would take about 2,600 gross payers [E].
2. **About 117,000 qualified visits including loop-implied visits** (about 99,000 direct), mostly in weeks 5-13. That means about 2,000-2,250 a day in January [E, calculator].
3. **Visit-to-paid of 1.6% or more without a free tier.** Nothing in the research benchmarks this. If week 2-3 data shows under 0.7%, the capped preview (D2) becomes the deciding lever.
4. **3-5 product-on-screen posts above 1M views**, most likely comment-reply speedruns or the images beat. Each must link to a format-matched page.
5. **About $5k of revenue-funded Content Rewards over 90 days (about $1k by mid-December) under D4** (30% of weekly net cash, at most 1.5x growth a week, a $150 floor, a $2,000 weekly cap). It only happens if early sources hold CAC ≤$50. $10k by mid-December needs the owner to lift D4's 1.5x weekly growth cap and the weekly maximum [O].
6. **Loops carry about 12-16% of new payers by week 8** (review page, badge, referrals and affiliates; the calculator's breakout has about 11% in week 8 and 16% at most). A 25% loop share would need a higher viral coefficient than any scenario assumes.
7. **Refunds at or below 10-12% and churn at or below 7%**, with dispute ratios kept low. Each dispute costs $15 and puts the Whop account at risk [F].
8. **Images pass the gate by about week 5**, at the quality of the v14 reference sheets.
9. **AI capacity scales automatically** to 100+ new payers a day, and first builds start within minutes.
10. **The founder has help by week 4-6** with editing and support. Bolt's founder spent about 95% of his day on support after launch [S].

**Check:** by Sun 22 Nov the breakout path needs about 200+ cumulative gross payers, and by Sun 20 Dec about 750 (calculator breakout). If week 4 is under 200, drop the $1M expectation in writing and optimise for the base case.

---

## 16. Risks and mitigations

| # | Risk | Mitigation |
|---|---|---|
| 1 | **A Whop store, affiliate or tracking link is handed out instead of a Makeborne-created checkout link** | `/go/` links only; Makeborne-created checkout; no open affiliate network; a live purchase-and-refund test before any partner link |
| 2 | **Views without buyers** (Cluely: a self-reported 49M-view video gave fewer than 100 downloads [V]) | Every post shows the product working and has its own link; judge on net sales, never views |
| 3 | **The paywall before the "wow"** caps conversion | Sample review link, `/examples`, uncut builds, use-my-brief links, the week-3 offer check, D1 and D2 |
| 4 | **Attribution not live** | Spend gate; onboarding survey fallback; per-creator codes |
| 5 | **AI capacity stalls a spike** | Ask 2 before any push; honest queue messages; the gate's "limit raised" box |
| 6 | **Promoting what isn't live** | The six-box gate; "coming soon" with no dates; v14 held and fixed; copy review on every brief |
| 7 | **Founder overload** | 4 surfaces only; two batch-film days; support first; a 90-minute cap on the Sunday ritual; cut X replies before LinkedIn; help from revenue (owner's private notes) |
| 8 | **Ad accounts, Spark or partnership ads unavailable or unbillable from BiH** [U] (TikTok says available locations depend on the registration country; no source confirms BiH: ads.tiktok.com/help/article/placements-available-locations, page updated Jun 2025, read 26 Oct 2026) | Check by 9 Nov; fallback: move line 5 into creator rehires |
| 9 | **ManyChat or TikTok DM and bio-link eligibility for a BiH business** [U] | Instagram carries DMs; TikTok "DM me SITE" answered by hand; business account from day 1 |
| 10 | **Creator rates above $60** (market posts reportedly $175-290 [S, unverified]) | Hire 4 at $75 and keep the other lines; commission-first offers; the 30% founding-partner rate |
| 11-14 | **Payments, tax and consumer-law checks** | Tracked in the owner's private notes |
| 15 | **EU AI Act Art. 50(2) image marking** | Applies at launch for new systems (the 2 Dec 2026 date is a transition only for systems on the market before 2 Aug 2026); confirm on EUR-Lex [U]; ask 21 and gate box 6 |
| 16 | **Disclosure failures** on paid posts | "#ad" at the start of the caption and "ad" said in the first 3 s, plus the platform paid-partnership toggle (a platform label alone is not enough under UK ASA/CAP Code 2.1/2.4 and CMA guidance [U]); #ad on any post with a creator's affiliate code; review before pay; read FTC "Disclosures 101", the EU UCPD, the UK ASA influencer guide (asa.org.uk/resource/influencers-guide.html, page dated 23 Oct 2026, read 26 Oct 2026; full PDF to be read before wave 1) and TikTok's branded-content policy at the source before wave 1 |
| 17 | **Black Friday and Q4 CPMs** | No boosts 20 Nov - 2 Dec |
| 18 | **Positioning collision** (consumer speedruns vs agency buyers) | Lane rule; no "replaced my agency" on Lane A surfaces |
| 19 | **Weak gift books before images** | No holiday gift push on text-only books; text-led books framed as guides and family recipe books only |
| 20 | **Real businesses in speedruns** | Requests only, public information only, written OK, unpublished by default |
| 21 | **Lead-finder outreach read as spam** (cold B2B email rules differ by EU member state) | No automated cold email; one-to-one only; no "email outreach" headline |
| 22 | **Client sites going dark when an agency churns** | D7: keep lapsed sites online with the badge forced on |
| 23 | **Product Hunt penalties** | Self-hunt from an account at least a week old; no upvote asks, vote swaps or paid hunters |
| 24 | **Press frame turns to "Lovable clone" or "AI slop"** | Lead with real outputs and client approval; generous comparisons; no "better than" claims |
| 25 | **Platform policy drift** (music, originality, DM automation) | Commercial Music Library only; native re-edits; a monthly re-check |
| 26 | **Public-repo leak** | No secrets, IDs, buyer or creator data or infrastructure details; cropped screenshots; owner-only notes live in the gitignored `private/` folder; `npm run check` scans for known confidential markers |
| 27 | **Prices shown before tax** in ads to EU and UK consumers (EU Price Indication Directive; UCPD Art. 7(4)(c)) [U] | Consumer-facing copy says "From $20/month + tax where applicable", or shows VAT-inclusive EU prices; legal check before paid EU/UK traffic |

**Market-access checklist for this week** (ad accounts, DM tooling, payments, tax and consumer-law checks): kept in the owner's private notes. Checks, not legal advice.
---

## 17. Owner decisions

| # | Question | Recommendation |
|---|---|---|
| D1 | **Refund rule**: keep "full refund until you use credits", or switch to "full refund within 7 days if under 100 credits used"? | **Switch**, after a quick legal check on EU digital-content withdrawal (express consent and acknowledgement at checkout). The current rule ends the safety net the moment someone tries the product. Exposure is about $3 of AI cost per refund [E]. Adopt by the 16 Nov offer check at the latest; earlier if the check clears |
| D2 | **Capped first-build preview** for `/go/` traffic (about 30 credits, publish and export locked, one per verified email)? | Decide on **16 Nov** from real data. Turn it on if `/go/` visit-to-paid is under 0.7% or no source is at ≤$50 CAC. About $0.90 per preview; at 5% preview-to-paid, about $18 of AI cost per payer [E] |
| D3 | **Affiliate and partner terms**? | Founding 20 partners: 30% recurring for 12 months. Public: 20% for 12 months. Yearly plans: first payment only. 30-day hold, refund clawback, payout only after the window, no self-referral, no brand bidding. Whop custom affiliates only, never the open network |
| D4 | **Reinvestment rule**? | 30% of weekly net new cash into sources at or under target CAC; 10% when up to 25% above; 0% beyond |
| D5 | **Black Friday**? | "Yearly is 20% off" only, which is already true. No extra discount |
| D6 | **AI daily limit**? | An automatic rise tied to new paid accounts, plus a manual raise before every beat or creator post |
| D7 | **Lapsed client sites**? | Keep them online with the badge forced on (and a win-back offer) instead of going dark |
| D8 | **Review-page "Review powered by Makeborne" link**? | On by default. Removable on Studio and Scale when white label ships |
| D9-D10 | **Staffing** (support and editing) | In the owner's private notes |
| D11 | **Public numbers** at day 30 and day 90? | Yes. It is the strongest free press and Indie Hackers angle |
| D12 | **Per-wave bonus codes**? | +100 credits on the first paid month per beat (≤$3 AI cost each) |
| D13 | **Share-for-credits and referral**? | 100 credits for a disclosed share; +100 each side for referrals on a non-refunded first payment |
| D14 | **Operating costs outside the $1,000** (demo builds about $180, comped creator credits about $160)? | Approve as cost of goods |
| D15 | **Comment-reply builds for real businesses**? | Allow, with written consent, public information only, unpublished by default |
| D16 | **Extra accounts** (faceless outputs, freelancer niche, a language clone)? | None before day 60. Then only with an editor and a format with 3+ wins |
| D17 | **Free tier**? | Keep none for now (owner decision). Revisit at the day-90 review with real conversion data |
| D18 | **Blind evaluation vs competitors**? | Not in this 90 days. If run later, publish results even where Makeborne loses |
| D19 | **Founder on camera** and as the face of the press story? | Yes; the "Day N" series is the trust engine |

---

## 18. Founder daily operating routine

The cap is about 6 hours of marketing a day, Monday-Friday, plus support. Support comes first whenever a spike hits.

| Time (Sarajevo) | Block | What |
|---|---|---|
| 08:00-08:30 | **Numbers** | Yesterday's Whop sales, refunds, `/go/` clicks by source, AI limit hits, first-build times. Flag any source above the 20% refund brake |
| 08:30-09:30 | **Support** (with the support owner) | Every ticket answered; anything broken goes to engineering with a 24 h fix target |
| 09:30-10:30 | **LinkedIn** | Post (Mon-Fri), then 15 comments on agency-owner posts |
| 10:30-12:30 | **Make** | Mon and Thu are batch-film days (8-10 videos). Other days: edit, carousels built in Makeborne, one real-speed capture |
| 13:00 | **Publish** | First brand TikTok, plus the Reel and Short re-edits |
| 13:00-14:00 | **Comments and DMs** | Reply to every comment within 2 hours; run keyword DMs; turn the best comments into the next videos |
| 14:00-15:00 | **Creators and partners** | Briefs, review of drafts before posting, payouts on verified views (Fridays), one onboarding call |
| 15:00-16:00 | **Customer calls** | 1 call a day; ask happy customers to share a build (disclosed if incentivised) |
| 16:00-17:00 | **Beats and press** | Gate checks, Product Hunt prep, `/launch` pages, the press list (the owner sends) |
| 20:00-21:00 | **Evening slot** | Second TikTok (US East afternoon); X post and 20 replies; check the boost gate on posts at 48 h |
| Friday | | Boost decision; creator payouts; week-end support sweep |
| Sunday, 90 minutes | **Review ritual** | Scorecard; keep, kill and scale every source; re-cut the top 10% with 2 new hooks; retire the bottom 50% of formats; schedule the week; a one-page growth note to the owner |

Time is the binding constraint (the weekly time budget is in the owner's private notes). When it breaks, cut X replies first, then long YouTube, and never support.
---

## 19. Key sources

Sources were read on 26 Oct 2026 unless noted. Full lists are in `research/*.md`.

- **Lovable Content Rewards campaign:** $1 per 1,000 headline, $26,119, 1,717 creators, 16.7M views. https://contentrewards.com/discover/2166e4e5-e0dd-41e3-92d7-42f87590f5f4
- **Whop Content Rewards docs:** no minimum or fee stated; pay after approval. https://docs.whop.com/memberships-and-access/third-party-apps/content-rewards.md
- **Whop affiliates, checkout and fees:**
  - https://docs.whop.com/developer/guides/affiliates
  - https://docs.whop.com/api-reference/checkout-configurations/create-checkout-configuration
  - https://docs.whop.com/fees
  - https://docs.whop.com/developer/guides/sandbox
- **TikTok:**
  - location availability by registration country (page updated Jun 2025): https://ads.tiktok.com/help/article/placements-available-locations
  - budget floors (updated Jul 2026): https://ads.tiktok.com/resources/help/article/budget
  - Commercial Music Library (updated Jul 2025): https://ads.tiktok.com/help/article/commercial-music-library
  - integrity and authenticity: https://www.tiktok.com/community-guidelines/en/integrity-authenticity
- **Buffer, TikTok posting frequency** (11.4M posts, 8 Oct 2025): https://buffer.com/resources/how-often-should-you-post-on-tiktok/
- **Socialinsider, video statistics** (21 Aug 2026): https://www.socialinsider.io/social-media-benchmarks/social-media-video-statistics
- **ManyChat on TikTok** (21 Jan 2025; replies to 3 Sep 2025): https://community.manychat.com/product-updates/manychat-is-now-on-tiktok-4826
- **Product Hunt launch guide:** https://www.producthunt.com/launch/before-launch ; leaderboards: https://www.producthunt.com/leaderboard/daily/2026/10/24
- **Show HN guidelines:** https://news.ycombinator.com/showhn.html
- **TAAFT Get Featured** ($49; $300 launch-first bonus): https://theresanaiforthat.com/get-featured/
- **Lovable affiliates:** https://lovable.dev/affiliates ; **Base44 affiliates:** https://base44.com/affiliates
- **Lovable founder transcript** ("1 million ARR in a week", Mar 2025): https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/anton-osika/transcript.md
- **Base44 founder interview** (self-reported, 4 Aug 2025): https://ceoinsider.io/interview/maor-shlomo
- **Base44 sale to Wix** (TechCrunch, 18 Jun 2025): https://techcrunch.com/2025/06/18/6-month-old-solo-owned-vibe-coder-base44-sells-to-wix-for-80m-cash/
- **Elena Verna, growth lessons behind Lovable** (19 Dec 2025): https://www.elenaverna.com/p/growth-lessons-behind-lovables-66b
- **Cluely views vs downloads** (updated 1 Oct 2026): https://viral.app/blog/cluely-viral-strategy
- **EDPB Guidelines 2/2023 v2.0** (adopted 7 Oct 2024): https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf
- **EU AI Act Art. 50 and timeline** (timeline updated 31 Aug 2026, read 26 Oct 2026: the 2 Dec 2026 Art. 50(2) date covers only systems placed on the market before 2 Aug 2026; confirm on EUR-Lex): https://artificialintelligenceact.eu/article/50/ ; https://artificialintelligenceact.eu/implementation-timeline/
- **UK ASA influencers' guide** (page dated 23 Oct 2026, read 26 Oct 2026; PDF not yet read): https://www.asa.org.uk/resource/influencers-guide.html
- **Amazon KDP AI disclosure:** https://kdp.amazon.com/en_US/help/topic/G200672390
- **Supabase Launch Week format:** https://supabase.com/launch-week
- **Internal research:**
  - `research/product-funnel-audit.md` (checkout, costs, contribution, lapsed sites)
  - `research/creative-assets.md` (v9 and v14 status)
  - `research/short-form-video.md`
  - `research/paid-acquisition.md`
  - `research/platforms-community.md`
  - `research/audience-positioning.md`
  - `research/case-studies-*.md`

**Still unverified, and each one gates something:**
- ad-account availability and billing from BiH
- ManyChat eligibility for BiH
- TikTok bio-link country rules
- the Whop Content Rewards dashboard minimum
- Whop refund-clawback behaviour, which needs the live test
- micro-creator market rates
- EU AI Act Art. 50(2) timing for a new image feature (EUR-Lex)
- UK ASA/CAP influencer guidance (PDF) and EU/UK price-indication wording
- FTC, EU UCPD and TikTok branded-content rules read at the source
- Reddit sidebars
- the TAAFT bonus on the $49 tier

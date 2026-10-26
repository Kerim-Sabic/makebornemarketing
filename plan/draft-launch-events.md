# Makeborne 90-day growth plan: event-driven launch waves

**Draft angle:** growth through a calendar of news beats. Each capability that is "coming in days" gets its own launch wave: Product Hunt launches, a Show HN only when there is a fair way to try the product, directories, newsletters, a press story ("a founder in Sarajevo takes on Lovable"), and small paid boosts for posts that have already won organically.

**Window:** Monday 26 October 2026 (paid beta launch, day 0) to Sunday 24 January 2027 (day 90).
**Budget:** $1,000 cash, plus founder time and credits.
**Status:** draft for owner review. Nothing here has been posted, bought, submitted or sent. Every pitch, listing and payment below is something the owner does or approves.

**Labels used throughout**
- **[V]** verified on a primary or official page (dates in Sources)
- **[S]** secondary source
- **[E]** my estimate, with the reasoning shown
- **[A]** an assumption that has to be measured
- **[O]** an owner decision
- **[U]** unverified; check before acting
- **[K]** general background knowledge, not checked against a source this session

---

## 0. The plan on one page

1. **The idea.** Makeborne has no audience, no free tier and $1,000. What it does have is a queue of real capabilities shipping over the next weeks: generated images, credit top-ups, custom domains, two-way GitHub sync, agency tools and AI lead research. Each one is a **reason to be in the news again**. Lovable has 10 Product Hunt launches and Base44 about 5 of its own; Base44's first launch got about 64 votes and no badge, and its 2.0 relaunch was #1 of the day [V]. Product Hunt allows a relaunch for each "significant new product iteration" [V]. The plan turns the roadmap into **six launch waves in 13 weeks**, with founder build-in-public posting every day in between.
2. **Who each wave is for (ICP order).** (1) Agencies and freelancers on Studio ($49), today. (2) Consultants and founders, through decks, today. (3) Coaches, creators and authors, from the images wave. (4) Small business owners, from the custom-domains wave. (5) Educators and students, later and only after a pricing decision (§2).
3. **What we say.** *"One brief. A website, a deck and a book. Your client approves it from a link."* The press story: *"Made in Sarajevo, sold worldwide: a small European studio against a $13B builder, with $1,000 and its numbers in public."* (§3)
4. **Wave calendar (provisional; a wave moves when its feature moves).**
   - **W0, 26 Oct:** paid beta "soft wave": TAAFT first, founder posts, Indie Hackers, r/SideProject, free directories.
   - **W1, target 3–12 Nov:** **generated images**, the visual "wow". **Main Product Hunt launch**, creator squad 1, European tech press pitch. Top-ups ride along as day 2 of the same launch week if they are ready.
   - **W2, target 16–20 Nov:** **custom domains** (plus top-ups if separate). Opens the small-business ICP before Black Friday (27 Nov).
   - **W3, target 1–4 Dec:** **two-way GitHub sync**, a developer beat. Show HN only if there is a no-login demo or a capped preview build.
   - **W4, target 8–10 Dec:** **agency tools**. Second Product Hunt launch ("Makeborne for agencies"), creator squad 2 on LinkedIn.
   - **W5, target 5–15 Jan:** **AI lead research** plus "Launch Week 2" (gallery, referral program, small ships) and the "new year client pipeline" story.
   - **Press beats without a feature:** day-30 numbers (25 Nov) and the day-90 report (24 Jan).
5. **Rule zero.** A wave starts only after its feature has been **live in production for 48 hours and has passed the quality check**, and after the daily AI spend limit has been raised for the spike. Nothing that isn't live is promoted, ever (§1).
6. **What the $1,000 buys (§5).** $155 of directories and launch slots, $400 for two creator squads timed to waves, $150 for niche newsletter tests, $200 to boost proven winners only, $40 for Google brand defence and $55 of reserve. **Total: $1,000.** No cold ads. Revenue, not the $1,000, pays for scaling what works.
7. **Honest outlook (§10).**
   - Low: about $14k ARR at day 90.
   - Base: about $140k ARR.
   - High: about $740k ARR.
   - **$1M ARR (about $83.3k MRR, about 2,300 active subscribers) is a stretch.** It needs about 200k qualified visits, at least 1.5% visit-to-paid, refunds at or below 12%, and at least one breakout (a top-3 Product Hunt day plus a press pickup, or a video with 1M+ views).
   - No company in the case studies reached $1M ARR in 3 months from a cold start without a free tier (research/case-studies-ai-builders.md).
   - Waves produce spikes that fade. The plan only works if every spike leaves something behind: badge traffic, referrals, gallery pages and affiliate creators.
8. **What engineering must ship before wave 1 (§6):**
   - attribution plumbing (UTM, `mb_src` and `mb_campaign` into Whop checkout metadata)
   - a daily AI limit that rises with paid sign-ups, with an honest queue message
   - three copy fixes and "coming soon" labels
   - a public proof gallery with a sample review link, as a stand-in for a free trial
   - one dated `/changelog` and one `/launch/<wave>` page per wave

---

## 1. Ground rules for every launch wave

**May be promoted today (live):** AI-built websites published on a Makeborne address; AI books; AI presentations (editable PPTX); client review links with anonymous comments and approval; basic CRM with a lead finder; manual GitHub export; the projects library; pricing at $20, $49 and $99 a month, or 20% off yearly; a full refund until credits are used.

**Never promoted as available until live:** generated images, credit top-ups, custom domains, automatic two-way GitHub sync, agency tools and AI lead research. Before launch they may appear only as "coming soon", with no date promise. The same applies to any film or still that shows generated imagery. The v14 film and its reference stills are the quality target for the images wave, **not current proof** (research/creative-assets.md).

**Wave go/no-go gate.** All boxes must be ticked or the wave slips by a week:
1. The feature has been live in production for 48 hours or more and passes the golden-brief quality check on at least 10 briefs.
2. The daily AI spend limit has been raised for the expected spike, and the queue message works (§6, item 2).
3. The founder is free for support on the launch day and the day after. Bolt's founder reportedly spent about 95% of his day on support (research/case-studies-ai-builders.md).
4. The copy has been reviewed: no model vendor names, no claims about features that aren't live, and the price and refund line are present.
5. Every link in the wave carries UTM parameters, and the wave's Whop tracking link exists.
6. Images wave only: check how EU AI Act Art. 50 applies to generated images, including machine-readable marking (2 Dec 2026 deadline for systems already on the market, per the act's timeline site [U, confirm on EUR-Lex]).

**Spacing rule.** Leave at least 7 days between tier-1 waves. If several features land in the same week, ship them for customers at once with honest changelog dates, but **announce them as one Launch Week**: one item a day for 5 days, the Supabase format (Launch Week 15: Monday to Friday, one main announcement a day, plus a hackathon and meetups [V, supabase.com/launch-week]). Never hold back a feature customers need. The wave is the announcement, not the release.

**Product Hunt rules that are not negotiable [V]:** self-hunt from the owner's personal account, which must be at least a week old; launch at 12:01 am Pacific (08:01 Sarajevo before 1 Nov, 09:01 from 1 Nov); never ask for upvotes; no paid hunters, vote swaps or new accounts; post a maker first comment.

**Comparisons with competitors.** Be generous and factual. Say "where Lovable is better, and where we win for client work". Use no Lovable logos or trademarks in ad text. Make no "better than" quality claim until a published blind evaluation exists (§3.4). Comparative advertising in the EU has to be objective and verifiable [K: Directive 2006/114/EC; legal check before paid use].

---

## 2. Target ICP order, and the wave that unlocks each

| # | ICP | Plan | Why now | Unlocked by wave | Main channels in this plan |
|---|---|---|---|---|---|
| 1 | **Agencies and freelancers** who deliver client websites | Studio $49 | Everything they need is live: sites, client review links, CRM and lead finder, export. Unlimited hosted sites on one plan. | W0 (now); amplified at W4 (agency tools) and W5 (AI lead research) | LinkedIn founder posts, Product Hunt #2, agency newsletters, creator squad 2 |
| 2 | **Consultants and founders**, through decks | Create $20 / Studio | The largest searchable demand: "ai presentation maker" about 14.8k/mo and "gamma ai" about 74k/mo (US) [S, Google Ads buckets in research/audience-positioning.md]. Editable PPTX with native charts is a difference people can check. | W0; refreshed at W1 (full-image slides) | X, LinkedIn carousels made in Makeborne, directories |
| 3 | **Coaches, creators, authors** (expert guides and lead magnets, not KDP fiction) | Create | The output needs images to be truly shareable | **W1 (images)** | TikTok and Reels, holiday book-gift series, creator squad 1 |
| 4 | **Small business owners** | Create | Every rival bundles a domain. Without one the offer is weak, and paid search costs up to about $42 a click [S]. | **W2 (custom domains)** | Directories, Reddit help threads (no links), Black Friday yearly offer |
| 5 | **Educators and students** | — | Canva and Lovable give education discounts. This needs a pricing decision. | After day 90 [O] | — |

---

## 3. Positioning and messaging

### 3.1 Category and statement

- **Category:** the AI studio for client work.
- **Statement:** *Makeborne turns one brief into a website, a presentation and a book, and lets your client review and approve it from a link. From $20 a month + tax, refundable until you use credits.*
- **Three pillars:**
  1. **Three products in one.** No competitor covers more than two of site, deck and book (research/audience-positioning.md).
  2. **Client approval built in.** Anonymous comments and an approve button on a link.
  3. **Honest billing.** You pay for credits you use, and you can get a refund until you use them. Show the design quality; don't claim it.

### 3.2 Each wave's one-line news

| Wave | Headline (customer-facing, only once live) | Proof asset |
|---|---|---|
| W0 paid beta | "One brief → a website, a deck and a book. Paid beta is open." | v9 flyover with a new paid-truthful CTA end card; real-speed screen recordings |
| W1 images | "Your site, deck and book now come with their own images." | Before/after of the same brief, text-only vs with images; full-image slides; the v14 film, re-cut with a corrected CTA and real outputs |
| W1b top-ups | "Run out mid-project? Top up credits without changing plan." | A 20-second UI clip |
| W2 domains | "Publish on your own domain." | A real customer site moved to its own domain, filmed end to end |
| W3 GitHub sync | "Edit in Makeborne or in your code. Both stay in sync." | A split screen: edit in the repo, the change appears in Makeborne, and the reverse |
| W4 agency tools | "Run your client work in one place: build, review, approve, publish." | Lead finder → demo site → review link → client approves on a phone |
| W5 AI lead research | "Find the clients whose websites need you, and show up with a better one." | Live lead research → 3 pitch sites in one sitting |
| Day 30 / Day 90 | "30 days / 90 days of an AI studio from Sarajevo, every number in public." | Whop dashboard screenshots (buyer data cropped), the funnel, refunds and lessons |

### 3.3 The press story: "a founder in Sarajevo vs Lovable"

**Why it can work:** journalists cover contrast and specifics. Lovable is a Stockholm company [K: widely reported; verify] that raised a $400M Series C at a **$13.3B valuation on 12 Aug 2026** [V, Lovable blog]. Makeborne is a small Sarajevo company (ZORBY&CO D.O.O.) launching with a $1,000 marketing budget. That is a clean David-and-Goliath frame. It is also a **European** story (two European AI builders, very different scales) and a **regional** one (software built in Bosnia and Herzegovina and sold worldwide).

**Angles, from safest to strongest:**
1. **Regional launch story** (BiH, Croatia, Serbia, the Adriatic region): "Sarajevo team launches an AI studio that makes websites, decks and books, and sells it worldwide."
2. **Contrarian business story:** "No free tier, on purpose: why a small AI startup refuses to give away credits." Indie Hackers, founder newsletters and podcasts like this one.
3. **Transparency story** (day 30, day 90): real MRR, refunds, AI cost per build and what failed. This only works if the founder is willing to publish numbers [O].
4. **Data story** (only with a fair method): "We gave the same 20 briefs to five AI builders." Publish every brief, every output and the scoring. It is the strongest pitch and also the riskiest; see §3.4.

**Never:** call Lovable names; imply a feud; claim "better than Lovable" without the blind test; mention model vendors; give numbers that aren't true at the moment you send them.

**Press tiers** (the owner pitches; nothing in this plan contacts anyone):

| Tier | Targets | What they need | When |
|---|---|---|---|
| T1 regional | Netokracija (Zagreb; covers regional startups and AI, e.g. an Oct 2026 piece on a Croatian designer who built a game with AI coding tools; takes tips through the generic newsroom address on its contact page [V, netokracija.com/kontakt]). Bloomberg Adria (lists Sarajevo among its editorial hubs [S, Muck Rack]). Startit (Serbia) and BiH business portals [U: check each one's tips process]. Ecosystem amplifiers: Techstars Sarajevo community programme and Sarajevo Slush'D (Oct 2026) [S, LinkedIn posts, low confidence]. | A local-language release (Bosnian, Croatian or Serbian), founder photo, 3 real outputs, price, "sells worldwide" | W0 days 3–5, then again at W1 |
| T2 European tech | EU-Startups, Sifted, Tech.eu [U: tip pages returned 403; check by hand] | A number or an angle: images launch plus first-week paid customers, or the no-free-tier bet | W1 (images), day 30 |
| T3 global and niche | AI newsletters' free "tools" sections, founder podcasts, Indie Hackers' newsletter, agency-trade newsletters | A data story or transparent numbers | Day 30, W4, day 90 |
| T4 tier-1 tech (TechCrunch and similar) | Only with a real hook: rapid paid growth, a notable customer, or the blind test | — | Not before day 30; low probability [E] |

**Press kit (`/press`, built in week 1):** a one-paragraph description; a fact sheet (founded in, based in Sarajevo, live products, prices, refund policy); founder bio and photo [O]; logo files; 6 screenshots of real output; the v9 film; a "verified numbers" box updated on each wave date; no internal infrastructure details.

### 3.4 Blind evaluation (the data story; optional, [O])

- **Method:** 20 public briefs across sites, decks and books; the same brief to each tool on paid plans; 3 to 5 outside reviewers who don't know which tool made which output; publish everything.
- **Cost:** subscriptions to competitor plans for one month, outside this $1,000 [O], plus founder time.
- **Rule:** publish the results even if Makeborne loses some categories. A fair loss is still a story; a rigged win is a crisis.
- **Timing:** run in weeks 4–6 and publish at day 30 or with W4.

### 3.5 Objections to answer in every wave

| Objection | Answer |
|---|---|
| "No free trial?" | A refund until you use credits; a public gallery of unedited outputs with their briefs; a sample review link anyone can open; a real-speed build video. |
| "Is it just another Lovable?" | Lovable builds apps. Makeborne makes the client's website, the pitch deck and the guide from one brief, and gets the client's approval. |
| "Can I use my own domain?" | Coming soon (until W2). |
| "Are the books print-ready?" | Not yet. They are made for screen, PDF and lead magnets. KDP requires you to disclose AI-generated text and images [V, in research/audience-positioning.md]. |
| "Who are you?" | A small studio in Sarajevo; the founder answers support himself; here are our numbers. |

---

## 4. Channels and weekly cadence

### 4.1 Always-on (every week, between waves)

| Channel | Cadence | Owner time a week [E] | Notes |
|---|---|---|---|
| **Founder LinkedIn** | 5 posts a week; 15–20 comments a day on agency-owner posts | 5 h | Carousels built in Makeborne with a "Made with Makeborne" end slide. Base44's founder credits LinkedIn building in public over any paid channel [S]. |
| **Founder X** | 1–3 posts a day; 20–30 replies a day on AI-builder posts | 5 h | Link in the first reply. Real-speed build clips, honest numbers, generous comparisons. |
| **Brand TikTok** | 10–14 posts a week, at 13:00 and 21:00 Sarajevo | 4 h | Formats from research/short-form-video.md: comment-reply speedruns ("comment your business and I'll build its site"), before/after, client-approval clips. Use the Commercial Music Library only [V]. |
| **Reels and Shorts** | Daily re-edits of the TikTok posts, without watermarks | 2 h | Instagram comment-keyword DMs (SITE, DECK, BOOK, CLIENT) once automation is set up [U: check eligibility]. |
| **Indie Hackers** | 1 update a week | 1 h | Revenue, refunds and lessons. |
| **Reddit** | At most 1–2 posts a week, never the same text twice; daily helpful comments | 1.5 h | Read every sidebar by hand first. r/SideProject and r/indiehackers flaired posts; r/SaaS once in 60 days; r/smallbusiness and r/freelance comments only, no links [S]. |
| **Communities** (No Code Founders Slack, agency Skool groups and others) | Contribute daily; share only in show-and-tell channels | 2 h | No cold DMs. Offer one live workshop a month ("client site plus review loop in 20 minutes"). |
| **Customer calls** | 3–5 calls a week | 3 h | Fix what breaks within 24 hours; ask each happy customer to share their build. |
| **Changelog** | Every ship, dated | 0.5 h | Each entry is also an X post. |

### 4.2 Per-wave pack (produced in the 7 days before a wave)

| Asset | Spec |
|---|---|
| `/launch/<wave>` page | One CTA, the wave's UTM, the price and refund line, 3 real outputs, a 45–75 s video |
| Product Hunt (tier-1 waves only) | 60-character tagline, 500-character description, at least 2 gallery images at 1270×760 (plan 4–6), a public YouTube video, a 240×240 static thumbnail, a maker first comment, and an optional free Arcade or Storylane demo [V] |
| Videos | A 45–75 s 16:9 demo for YouTube and Product Hunt; a 25–35 s vertical punch cut; a 60–150 s vertical full build |
| Founder posts | A LinkedIn post plus carousel; an X thread; a launch-day "live numbers" post; a T+3 results post |
| Customer email | "What's new" to existing customers (owner sign-off before the first send) |
| Listings refresh | Update TAAFT, AlternativeTo, SaaSHub, Toolify or TopAI and the Product Hunt product page |
| Newsletter and press | Submissions to free "tools" sections; the T1/T2 press pitch for waves W1, W4 and day 30 |
| Creator brief | A one-page brief with a disclosure requirement, the live-only rule, a UTM or affiliate link and a delivery date |
| Results write-up | Indie Hackers and r/SideProject at T+3 to T+5, with real numbers |

### 4.3 Wave runbook (T = launch day)

| When | Action |
|---|---|
| T-14 | Confirm the feature's ship date with engineering. Start the Product Hunt "coming soon" page update and grow the supporter list (aim for 400+ people with Product Hunt accounts at least a week old). |
| T-7 | Gate check (§1). Book creators; brief them for a T to T+2 posting window. Record real screen captures. Draft all copy. Book any paid slot (Uneed, Fazier, newsletter). |
| T-3 | Seed 10–20 customers and beta users who are willing to write honest comments on launch day (no upvote asks). Pre-schedule the Product Hunt post. Raise the AI limit. |
| T-1 | Final copy review (live only, no vendor names). Test every link and checkout end to end. |
| **T** | Product Hunt at 12:01 am Pacific; first comment at once; reply to every comment within 10 minutes; X and LinkedIn waves at the Sarajevo morning, the US morning (15:00–18:00) and the US afternoon. Personal (not mass) messages to supporters: "we're live, we'd love your feedback". |
| T+1 | Thank-you post; Product Hunt badge on the site; boost decision for any post at 3× median or more (§5). |
| T+3 to T+5 | Results write-up with numbers. Press follow-up with the results. |
| T+7 | Wave review: visits, net paid, CAC per line, refunds, activation. Decide which formats to keep. |

---

## 5. The exact $1,000 allocation

The principle: **pay for timing, not for reach.** Each dollar is tied to a wave date, so that paid items land on the days organic attention is already highest. No cold Meta, TikTok, Google head-term, Reddit, X or retargeting campaigns. They can't exit the learning phase on this budget, and pixels need a consent banner first (research/paid-acquisition.md).

| # | Line item | Amount | When | What it buys | Kill rule | Scale rule |
|---|---|---|---|---|---|---|
| 1 | **There's An AI For That (TAAFT) listing**, submitted **before any other listing** to keep the launch-first bonus [V: "$300 PPC bonus if you launch on TAAFT first"; check on the form whether it applies to the $49 tier] | **$49** | Day 0 | A permanent listing (DR 78 dofollow [S]), "Just Released" | Sunk cost. Buy no TAAFT upgrades unless the listing brings at least 3 tracked net paid customers in 30 days | If it does: consider the $437 newsletter bundle for W4, **paid from revenue** [O] |
| 2 | **TopAI.tools fast track** | **$47** | Day 2 | Listing (DR 64 dofollow [S]) | As above | — |
| 3 | **Uneed pick-your-date** (list price $29.99) | **$30** | Booked in week 1 **for the W1 images day** | Launch-day ranking slot, DR 75 link [S] | — | — |
| 4 | **Fazier launch slot** | **$29** | Booked for the **W2 custom-domains day** | Launch slot and link [S] | — | — |
| | *Subtotal, directories and launch slots* | *$155* | | | | |
| 5 | **Creator squad 1 (images wave):** 3 micro-creators (5k–50k followers) in the freelance web-design, presentations and creator-tools niches; $80 flat each plus a Whop affiliate code and a comped Studio month (credits only) | **$240** | Contracted T-7 for W1; posts go up T to T+2; half paid on signing, half on delivery | 3 disclosed (#ad) videos timed to launch day, each with partnership or Spark ad rights for 60+ days | A creator whose post is below 1,000 views or brings 0 checkout starts is not rehired | A post at 3× or more the creator's median, or with at least 1 net payer: rehire from line 10 and boost from line 8 |
| 6 | **Creator squad 2 (agency-tools wave):** 2 LinkedIn agency, freelance or design voices; $80 each, same terms | **$160** | Contracted T-7 for W4 (about 1 Dec); posts at T to T+2 | 2 disclosed posts or carousels for agency buyers | As line 5 | As line 5 |
| 7 | **Niche newsletter tests:** one agency or web-design newsletter (under 20k subscribers) at **W2** and one at **W4**, at most $75 each, each with its own Whop tracking link | **$150** | Booked T-7 for W2 and W4 | 2 tracked placements (typical rate $50–250 for under 5k subscribers [S, CreativeAINews, Mar 2026]) | Not repeated unless CAC is $50 or less over 3 or more net payers | Repeat, paid from revenue |
| 8 | **Boost proven winners only** (TikTok Spark Ads, Meta partnership ads): **$60 at W1, $60 at W2 (before 20 Nov to avoid Black Friday prices), $80 at W4** | **$200** | T+1 to T+4 of each wave | Spend only on posts that beat the account's median by 3× or more, hold at least 25% of viewers past 3 seconds and have real comments. Target US, UK, CA, AU, IE, NZ, DACH, the Nordics and Benelux. | Stop a boost after $30 if link CTR is below 0.5% or CPC above $2. Stop a source at $100 spent with 0 net paid. Pause if more than 30% of its buyers refund within 14 days. | Raise budgets by 20–30% at most every 48–72 hours, and only after CAC of $50 or less over 3 or more net paid. TikTok's ad minimums (about $50 a day per campaign [S]) may force 1-day bursts. |
| 9 | **Google Search brand defence:** exact and phrase "makeborne" plus misspellings; manual CPC at most $1 | **$40** | From the W1 Product Hunt day to week 8 | Captures people who heard the name from a launch or the press | If there are fewer than 100 impressions by week 4, stop and move the balance to line 10 | — |
| 10 | **Reserve** | **$55** | Released only by the scale rule | A rehire of the best creator, or extra boost on a proven winner | — | Released when any line shows CAC of $50 or less over 3 or more net payers |
| | **Total** | **$1,000** | | | | |

**Spend timeline:** day 0 $49 · day 2 $47 · week 1 $30 + $29 booked · week 2 (W1) $240 + $60 + brand · week 4 (W2) $75 + $60 · week 6 (W4) $160 + $75 + $80 · reserve as earned.

**Paid from revenue, not from the $1,000** (each gated on the conditions given):
- **Whop Content Rewards** (pay per 1,000 views on TikTok, Shorts, Reels and X [V]) from the W1 images wave **once net new MRR passes $1,500**. The minimum budget is disputed (one source says $1,000, others say none [S]). Settings: $1.50 per 1,000 views for clips, $3 for original UGC, $3 minimum payout, $150 cap per video, a geo rule, #ad disclosure, and live features only.
- **One large AI newsletter slot** (Ben's Bites primary slot is $3,500 [V]; Superhuman Featured Tool is $3,500 [V]) only once MRR is above $15k and a channel has shown a visitor-to-paid rate of 1% or more. It is a single test with a written stop rule: the expected cost per paying customer is $300–1,000 [E, research/platforms-community.md].
- **Reinvestment rule:** after each wave, reinvest up to **30% of that wave's net first-month revenue** in the lines that met CAC of $50 or less. The hard CAC ceiling is $120.

---

## 6. Product growth changes to ask engineering for (ranked)

Ranked by "what breaks or wastes a wave if missing". Sizes are rough: XS under half a day, S 1–2 days, M 3–5 days.

| Rank | Change | Why it matters for waves | Size | Needed by |
|---|---|---|---|---|
| 1 | **Attribution plumbing.** Aggregate counts of `utm_source`, `utm_medium`, `utm_campaign`, an allow-listed referrer host, and whether a referral code is present. Carry first touch through sign-up. Write `mb_src`, `mb_campaign` and `mb_aff` into Whop checkout metadata. Send server-side events (landing_view, signup_completed, checkout_opened, purchase via `payment.succeeded`, refund, first_build, first_publish, review_link_shared). | Without it, no wave can be judged, and no paid line can be killed or scaled by its rules. | S | **Before W1** |
| 2 | **A daily AI limit that scales with paid sign-ups**, plus an honest queue message ("your build starts in about N minutes") [O for the rule] | The limit must scale with paid sign-ups; a first website build costs about $0.93 of provider cost (median) [E, research/product-funnel-audit.md]. A Product Hunt day can stall buyers at their first build, which turns into refunds and public complaints. | XS–S | **Before W1** |
| 3 | **Copy accuracy and labels:** live product copy matches what ships at launch (list in the owner's private notes); label everything coming as "coming soon" | A wave sends sceptical traffic. Each overpromise becomes a refund, a $15 dispute or a bad comment. | XS | **Day 0–1** |
| 4 | **Public proof gallery** (`/examples`): 10 sites, 10 decks (downloadable PPTX), 10 books (PDF), each unedited and shown with its brief, time and credits used; plus **one sample client review link** anyone can open and comment on | This is the stand-in for a free trial on Product Hunt, Reddit and in press. It is also SEO and LLM-citation surface. | S–M | Before W1 |
| 5 | **`/changelog` and `/launch/<wave>` page template** (dated entries, OG image per wave, UTM-aware CTA) | Every wave needs a permalink for press, Product Hunt and directories. | S | Before W1 |
| 6 | **Event offer codes:** a per-wave bonus-credit code (for example `PH100` for 100 bonus credits on the first paid month) applied at Makeborne's own checkout creation [O for the offer] | It rewards launch-day buyers without a free tier, costs at most about $3 per redeemer in AI cost [E], and is measurable per wave. | S | W1 |
| 7 | **"Made with Makeborne" loop made measurable:** add UTMs to the badge link; make the review-page brand mark a link with "Build yours with Makeborne"; add a credit to deck and book exports | Spikes fade; badge traffic doesn't. This is what carries growth between waves. | XS–S | W1 |
| 8 | **Customer referral program:** +100 credits for the invitee on the first paid month, and +100 for the referrer when that payment clears without a refund | The cheapest loop: at most about $6 of provider cost per customer, against $40–297 of affiliate commission [E, research/product-funnel-audit.md]. | M | W2 |
| 9 | **Whop custom affiliates** whose links land on makeborne.com (`?a=code`); Makeborne passes `affiliate_code` into the checkout it creates; tested in the sandbox, then with one small live internal purchase to prove payout and refund clawback | Only Makeborne-created checkout links are used, so the affiliate code has to travel through Makeborne's own checkout. Creator squads need this. | S–M | Before W1 creators post (else use UTM links and pay flat) |
| 10 | **In-app "What's new" banner** and a public **status page** | Brings dormant users back on each wave, and is honest during spikes. | S | W2 |
| 11 | **Public share links for decks and books** with a removable "Made with Makeborne" end card | Decks and books currently have no shareable surface, so W1 image-rich decks can't spread. | M | W1–W2 |
| 12 | **Capped free preview build** (no publish or export, one per verified email) [O] | The only way Show HN becomes viable, and it would lift Product Hunt conversion. Cost: about $0.60–1.20 per preview [E]. | M | W3, only if the owner says yes |
| 13 | **Consent banner (CMP) plus Google Consent Mode v2** | The prerequisite for any pixel, Conversions API or retargeting of wave visitors. Tracking links may also fall under ePrivacy Art. 5(3) per EDPB Guidelines 2/2023 [S, research/product-funnel-audit.md]: get a legal view before an EU push. | S | Week 5–6 |
| 14 | **Machine-readable marking of generated images** (EU AI Act Art. 50(2)) | Possibly required for generated images; 2 Dec 2026 deadline for systems already on the market [U]. | S–M | With W1 |

---

## 7. Launch week, day by day (26 Oct – 1 Nov)

This is wave W0, a **soft wave**. The big Product Hunt launch is kept for images. Times are Sarajevo (CET).

### Day 0, Monday 26 Oct: paid beta opens
- **First thing:** confirm copy fixes (item 3) are live or the copy is hidden. Raise the AI limit for the day [O].
- **Submit TAAFT ($49) before any other listing** so the launch-first bonus isn't lost [V]. Hold AlternativeTo, SaaSHub, the Product Hunt coming-soon page and all other directories until the TAAFT listing is live.
- Create UTM links for every channel and a Whop tracking link for each.
- Founder launch posts: LinkedIn ("Today I'm opening Makeborne, built in Sarajevo...": the story, the three outputs, the price, the refund promise, one real build clip) and an X thread with a real-speed build (link in the first reply).
- Personal messages to 30–50 people in the founder's own network (individual, not mass). Ask for feedback and for introductions to agency owners.
- Post v9 flyover (9:16, with the new CTA end card) to TikTok, Reels and Shorts.
- Evening: answer every comment; first "Day 0" numbers post if there is anything to show.

### Day 1, Tuesday 27 Oct
- Check the TAAFT listing is live. Then: AlternativeTo (as an alternative to Lovable, Gamma, Framer and Wix), SaaSHub, Microlaunch (free) and the **Product Hunt coming-soon page**. Start collecting followers there.
- r/SideProject founder story (sidebar read by hand first): "I built an AI that turns one brief into a site, a deck and a book. Here's what launching with no free tier looks like." Include a GIF.
- Start the "comment your business and I'll build its site" series: build the first 5 from replies (with consent and public information only).
- TikTok 2 posts.

### Day 2, Wednesday 28 Oct
- TopAI fast track ($47). Batch-submit the free directories: Future Tools, Rundown Supertools, ToolPilot, ShowMeBest and others.
- Indie Hackers launch post (flaired).
- Join 5–8 communities (No Code Founders, agency Skool groups, Freelance Marketplace Discord and others). Contribute, don't post links.
- Build the `/press` page draft and the local-language release.
- Recruit creator squad 1 (shortlist 8, pick 3) for the images wave; send briefs that are labelled "for a feature launching soon, post only on our go".

### Day 3, Thursday 29 Oct
- 2–3 customer calls; fix whatever broke within 24 hours.
- "Day 3: what happened" post on LinkedIn and X, with real numbers.
- Record 4–6 real-speed screen captures at 2× UI scale (brief → plan → build → publish; chat edit; client comment → fix → approve).
- Book Uneed ($30) for the provisional W1 date.

### Day 4, Friday 30 Oct
- **T1 regional press pitch** (owner sends): Netokracija, Bloomberg Adria, Startit and BiH business portals, with the local-language release, 3 outputs and the founder photo. Angle 1, the regional launch story.
- First "Made from one sentence" carousel on LinkedIn, built in Makeborne.
- Weekly community workshop offer to one agency group (if its rules allow).

### Day 5, Saturday 31 Oct
- A weekend "best builds this week" recap.
- Re-cut the top 2 TikToks with new hooks.
- Write the Product Hunt W1 copy: 3 taglines, the first comment and gallery shot list.

### Day 6, Sunday 1 Nov (US clocks change: Product Hunt 12:01 am Pacific = **09:01 Sarajevo** from today)
- **Week 1 review:** visits by source, checkout starts, net paid, refunds, time to first build, credits used.
- **Images go/no-go:** is images in production, and does it pass on 10 golden briefs? If so, pick the Product Hunt day by the supporter rule: **400 or more committed supporters → Tuesday to Thursday; otherwise Saturday or Sunday** (weekend #1 took 285–319 points on 24–25 Oct, and weekends get 15% more Visit clicks [V]).
- Confirm creator squad 1 dates.

**Week 1 targets (base [E]):** 4,000 visits; 40 net paying customers; 70% or more of buyers run a first build within 24 hours; refunds at or below 15%; 150 Product Hunt coming-soon followers; 1 regional press mention.

---

## 8. Weeks 2–13 by phase

### Phase 1: The images wave and the first spike (weeks 2–4, 2–22 Nov)

**Week 2–3 (target 3–12 Nov): W1, generated images. Tier 1.**
- Run as **Launch Week 1** if top-ups are also ready: Mon images in sites; Tue images in decks (full-image slides, quality and aspect controls); Wed images in books; Thu credit top-ups; Fri the gallery plus "your best build this week" showcase.
- **Main Product Hunt launch** on the day picked by the supporter rule. Tagline candidates (60 characters or fewer): "Turn one brief into a website, a book and a deck" (48) and "AI websites, decks and books, with their own images" (51).
- Creator squad 1 posts T to T+2. Boost $60 on the winner at T+1 to T+4. Google brand defence on.
- **T2 European press pitch:** "Sarajevo AI studio adds images, with first-week paid numbers."
- Uneed slot goes live. Refresh all listings with images.
- Free editorial pitches to AI newsletters' tools sections.
- r/SideProject or r/indiehackers results post at T+3 to T+5, plus an Indie Hackers Product Hunt postmortem.
- Holiday book-gift series starts ("a bedtime book starring your child", "grandma's recipes"), 3 a week until 20 Dec.

**Week 4 (target 16–20 Nov): W2, custom domains (and top-ups if not in W1). Tier 2, no Product Hunt launch.**
- Message: "Publish on your own domain." Opens ICP 4 (small business).
- Fazier slot; niche newsletter #1 ($75); boost $60 before 20 Nov.
- Reddit: helpful answers in small-business and freelance threads where people ask about websites (no links where banned).
- Ship the referral program (§6 item 8) and announce it to customers.

**Phase 1 exit criteria:** at least 150 net paying customers cumulative; refunds at or below 15%; at least one source with CAC of $50 or less; attribution working on 90% or more of purchases.

### Phase 2: Proof, Black Friday and the developer and agency waves (weeks 5–7, 23 Nov – 13 Dec)

**Week 5 (23–29 Nov): day 30 and Black Friday.**
- **Day-30 report (25 Nov):** a public post with MRR, customers, refunds, AI cost per build and lessons, on Indie Hackers, LinkedIn and X; send it as a press follow-up (angle 3).
- **Black Friday (27 Nov) to Cyber Monday (30 Nov):** "yearly is 20% off" is already true, so lead with that. Any extra discount is **[O]**; I recommend none, because the beta price is already low and a discount trains buyers to wait. No paid boosts from about 20 Nov to 2 Dec, when CPMs rise [S].
- Run the blind evaluation (§3.4) if approved.

**Week 6 (target 1–4 Dec): W3, two-way GitHub sync. Tier 2, developer audience.**
- X dev thread with a split-screen clip; r/webdev **Showoff Saturday** thread only if confirmed [U]; a dev-focused YouTube demo.
- **Show HN, only if a capped free preview (§6 item 12) or a no-login demo exists.** Show HN's guidelines ask for something people can try, "ideally without barriers such as signups" [V]. Use first-person technical framing, for example "Show HN: I built two-way sync between an AI site builder and GitHub", or "how we test generated sites against golden briefs". The one AI-presentation Show HN that worked (260 points) was a first-person story [V, HN Algolia]. Without a try path, **skip it**: since 2025, most AI-website-builder Show HNs scored 1–12 points [V].

**Week 7 (target 8–10 Dec): W4, agency tools. Tier 1.**
- **Second Product Hunt launch: "Makeborne for agencies"** (lead finder → demo site → review link → client approval → publish on the client's domain). This is a significant iteration, so a relaunch is allowed [V].
- Creator squad 2 (LinkedIn agency voices); niche newsletter #2 ($75); boost $80.
- LinkedIn-heavy week: daily agency-workflow carousels; one live workshop in an agency community.
- Optional: TAAFT $437 newsletter bundle, **from revenue**, if the TAAFT listing has proven conversion [O].
- Publish the blind evaluation, if run.

**Phase 2 exit criteria:** at least 400 net paying customers cumulative; Studio at 35% or more of the mix; referral program producing 5% or more of new customers; at least one creator rehired on the scale rule.

### Phase 3: The holiday stretch (weeks 8–10, 14 Dec – 3 Jan)

Press and B2B attention drop over the holidays [E]. Don't spend a tier-1 wave here.
- **Week 8 (14–20 Dec):** final holiday book-gift push (deadline about 20 Dec); "your 2027 pitch deck" content for founders and consultants; a "best of 2026 made with Makeborne" gallery post.
- **Weeks 9–10 (21 Dec – 3 Jan):** low posting cadence (founder at about 50%); customer calls; produce the W5 pack; write the day-60 numbers post (25 Dec, published 28 Dec).
- Whop Content Rewards from revenue, if its gate (§5) has been met, using the images-era formats that won in Phase 1.
- Ship the consent banner (§6 item 13) so January can use retargeting, if revenue funds it.

### Phase 4: New year pipeline and scale what works (weeks 11–13, 4–24 Jan 2027)

**Week 11–12 (target 5–15 Jan): W5, AI lead research and "Launch Week 2". Tier 1.**
- Story: "New year, new clients: find the businesses whose websites need you, and show up with a better one." It lands when agencies plan Q1 [E].
- Launch Week 2: Mon AI lead research; Tue a public share link for decks and books (if shipped); Wed the referral or affiliate program for agencies; Thu an `/examples` gallery expansion; Fri a capped buildathon for paying members with credit prizes [O].
- A third Product Hunt launch only if AI lead research is a significant iteration and the W4 launch ended in the top 5; otherwise use directories and LinkedIn.
- Scale: every line that met CAC of $50 or less gets the reinvestment rule (30% of the wave's net first-month revenue).

**Week 13 (18–24 Jan): the day-90 report.**
- **Day-90 public report (24 Jan):** every number, what worked, what didn't, the next 90 days. This is the final press beat for T1 to T3 (angle 3, plus the data story if it exists).
- Decide the next quarter: which ICP to double down on, whether to add a free preview, and whether to fund a larger AI newsletter or Content Rewards budget.

---

## 9. Content mix and volume

### 9.1 Weekly volume (from week 2; about 50% in weeks 9–10)

| Output | A week | Mix |
|---|---|---|
| TikTok (brand) | 10–14 | 40% speedrun or build-from-a-comment, 20% before/after, 15% client approval, 15% founder "Day N from Sarajevo", 10% tutorial |
| Reels and Shorts | 7 each | Re-edits of TikTok winners |
| LinkedIn | 5 posts (2 carousels made in Makeborne) | 40% agency workflow, 25% build in public with numbers, 20% output showcases, 15% opinion (no free tier, pricing, AI and client work) |
| X | 10–20 posts plus 150–200 replies | 50% real-speed clips and outputs, 30% numbers and lessons, 20% threads |
| Indie Hackers and Reddit | 1 + 1–2 | Lessons and numbers, never repeated text |
| Long-form video (YouTube) | 1 every 2 weeks | Wave demos and "Lovable vs Makeborne for client websites" (fair) |
| Gallery additions | 5 | Real outputs with briefs and credits used |
| Per wave | The full pack (§4.2) | — |

### 9.2 Creative rules

- **"Made, not generated":** cream canvas, Inter display with one Newsreader Italic accent word, the brand gradient only on the accent word and the Create button; every claim proved by real UI or output (research/creative-assets.md).
- **Fix v14 before any use:** replace "Start free" with "Make yours at makeborne.com · from $20/mo + tax · refund until you use credits"; restore a readable AI-concept line; use it only from W1 on, and only with outputs that are live.
- Open every video on the finished output; show the brief; put a visible timer on screen, or a "sped up" label.
- Burned-in captions on all video; alt text on all images.
- Sound on TikTok: Commercial Music Library only [V].
- Disclose every paid post (#ad and the platform's paid-partnership tool).

---

## 10. Honest funnel model

### 10.1 Assumptions (all [A] unless marked)

- **Visit-to-paid within 30 days:** low 0.4%, base 1.0%, high 1.5%. There is no benchmark for a paid-only AI builder with no trial. Lovable's 16,000 Product Hunt sign-ups produced 850 payers (about 5.3% of sign-ups) with a free tier [S]; BrandingStudio.ai got about 0.25% [S].
- **Refunds** (refundable until credits are used): low 20%, base 15%, high 12%.
- **Monthly churn:** 12% / 10% / 8%. The average subscriber is about 1.5 months old at day 90, so the retention factor is about 0.83 / 0.85 / 0.87 (0.88 in the $1M path).
- **Net MRR per active subscriber:** about **$36**. That is a 55/35/10 Create/Studio/Scale mix (list blend $38.05 [E, research/product-funnel-audit.md]) with about 15% of buyers on yearly plans (20% off).
- **Contribution** at 60% credit use is about $13.76 / $33.88 / $68.13 a month before tax and add-on fees [E, research/product-funnel-audit.md]. International cards add 1.5% and currency conversion 1%.

### 10.2 Traffic by source over 90 days (visits, [E])

| Source | Low | Base | High | Reasoning |
|---|---|---|---|---|
| W0 soft wave (founder network, Indie Hackers, r/SideProject, X, LinkedIn) | 1,500 | 4,000 | 10,000 | Cold start, no audience |
| Directories and launch sites (cumulative) | 1,000 | 3,000 | 8,000 | A trickle; TAAFT newsletter not included |
| Product Hunt W1 (images) | 800 | 3,000 | 8,000 | A featured top-5 launch brings 1,500–5,000 visitors [S] |
| Product Hunt W4 (agency) | 300 | 1,500 | 4,000 | A relaunch; Lovable's 2026 launches scored 107–328 [V] |
| Other waves' social reach (W2, W3, W5) | 1,500 | 4,500 | 15,000 | About 500 / 1,500 / 5,000 each |
| Show HN (only with a try path) | 0 | 500 | 5,000 | Mostly 1–12 points; the rare hit is large |
| Press (T1–T3) | 300 | 2,000 | 15,000 | High = one European or global pickup |
| Newsletters (niche plus free editorial) | 200 | 800 | 2,000 | — |
| Creators plus boosts | 1,000 | 5,000 | 25,000 | 5 paid creators; high = one breakout |
| Always-on content, badge, referrals and SEO between waves | 5,400 | 20,700 | 58,000 | Grows each week if the loops work |
| **Total** | **12,000** | **45,000** | **150,000** | |

### 10.3 Scenarios to day 90

| | Low | Base | High |
|---|---|---|---|
| Visits | 12,000 | 45,000 | 150,000 |
| Visit-to-paid | 0.4% | 1.0% | 1.5% |
| Gross new paying customers | 48 | 450 | 2,250 |
| After refunds | 38 | 383 | 1,980 |
| Active at day 90 (after churn) | 32 | 325 | 1,723 |
| **MRR at day 90** | **~$1.2k** | **~$11.7k** | **~$62k** |
| **ARR run rate** | **~$14k** | **~$140k** | **~$744k** |

The base case is lower than some other research tracks' base cases ($220k–440k in research/case-studies-ai-builders.md), because launch spikes fade within days and this model counts only 90 days of traffic. Treat the gap as the range of uncertainty, not as precision.

### 10.4 What has to be true for $1M ARR by 24 Jan 2027 (about $83.3k MRR)

About **2,315 active subscribers** at $36. One path that gets there:
1. **About 200,000 qualified visits** (about 2,200 a day on average). That means the high case plus one breakout: a top-3 Product Hunt day **and** a European or global press pickup, **or** one video above 1M views that links to a real build.
2. **Visit-to-paid at 1.5% or more**, which is close to impossible without the proof gallery, the sample review link, launch-offer codes and (probably) a capped free preview [O].
3. **Refunds at or below 12%** and **churn at or below 8% a month**, which means time to first good build stays short under load.
4. **At least 25% of new customers from loops** (badge, referral, affiliates) by day 60, so growth doesn't depend on the next wave.
5. **AI capacity that keeps up:** about 3,000 gross new payers, each running about 2 builds on day one, is about **$5.6k of provider cost** in total [E], which revenue covers, provided the daily limit scales automatically.
6. **Studio at 35% or more of the mix**, which means agencies actually buy.

If two of these fail by day 45, plan for the base case and protect margin. Don't chase reach with discounts.

---

## 11. Tracking and KPIs

### 11.1 Scheme

- **UTM:** `utm_source` (producthunt, taaft, topai, uneed, fazier, newsletter-<name>, creator-<handle>, press-<outlet>, linkedin, x, tiktok, reddit, ih), `utm_medium` (launch, directory, organic_social, creator, paid_social, cpc, newsletter, press, referral, affiliate, badge), `utm_campaign` (w0-beta-2026-10, w1-images-2026-11, w2-domains-2026-11, w3-github-2026-12, w4-agency-2026-12, w5-leads-2027-01, day30, day90), `utm_content` = a creative ID.
- **Whop:** one tracking link per wave and per paid line [V: clicks, revenue, conversion rate and converted users].
- **Server-side:** the funnel events in §6 item 1, joined on account ID.
- **No pixels** until the consent banner is live.

### 11.2 KPIs per stage (base targets [E])

| Stage | KPI | Wk 1 | Day 30 | Day 60 | Day 90 |
|---|---|---|---|---|---|
| Awareness | Visits per week | 4,000 | 4,500 | 3,500 | 5,000 |
| Awareness | Product Hunt result | — | W1 top 5 of the day | W4 top 5 | — |
| Awareness | Press mentions (cumulative) | 1 | 3 | 5 | 8 |
| Acquisition | Visit → sign-up started | 5% | 6% | 6% | 7% |
| Acquisition | Sign-up → paid | 20% | 20% | 18% | 18% |
| Acquisition | Net new paid per week | 40 | 35 | 25 | 45 |
| Activation | First build within 24 h of paying | 70% | 80% | 80% | 85% |
| Activation | First publish, export or review link within 7 days | 50% | 55% | 60% | 60% |
| Revenue | Net paying customers (cumulative) | 40 | 150 | 260 | 325 active |
| Revenue | MRR | $1.4k | $5.4k | $9k | $11.7k |
| Revenue | Studio share | 30% | 33% | 35% | 35% |
| Revenue | Refund rate | ≤15% | ≤15% | ≤13% | ≤12% |
| Retention | Month-1 churn | — | — | ≤10% | ≤10% |
| Loops | Share of new paid from badge, referral and affiliates | — | 5% | 15% | 25% |
| Efficiency | Blended paid CAC (lines 5–9) | — | ≤$80 | ≤$60 | ≤$50 |

**Per-wave scorecard (T+7):** visits, Product Hunt rank and comments, net paid, refunds within 14 days, activation, CAC per paid line, best-performing creative, and the decision (keep, change or drop).

---

## 12. Risks

| # | Risk | Effect | Mitigation |
|---|---|---|---|
| 1 | **Features slip.** "Coming in days" becomes weeks. | Waves bunch up or vanish; dead air. | Waves move with features. Between waves, always-on content carries. Keep day-30 and day-90 beats that don't depend on features. |
| 2 | **A spike stalls on AI capacity.** | Buyers wait, refund and post about it. | §6 item 2 before W1; the gate check; an honest queue message; a status page. |
| 3 | **Promoting a feature that isn't live.** | Backlash, refunds, EU consumer-law exposure. | The gate check and copy review; no generated imagery in any asset before W1. |
| 4 | **Product Hunt penalties** (upvote asks, vote rings, launch agencies). | Unfeatured or banned. | The rules in §1; personal messages asking for feedback only. |
| 5 | **The press frame turns hostile** ("AI slop", "Lovable clone"). | Reputation. | Lead with real outputs and client approval; generous comparisons; no "better than" claim without the blind test. |
| 6 | **Comparative claims** in ads or press. | Legal risk under EU comparative-advertising rules. | Objective, verifiable claims only; legal check before paid use [K]. |
| 7 | **No free tier** limits Show HN and lowers Product Hunt and Reddit conversion. | Lower visit-to-paid. | Proof gallery, sample review link, offer codes; capped preview [O]. |
| 8 | **Black Friday and holiday ad prices and attention.** | Boosts cost more; press is quiet. | No boosts 20 Nov – 2 Dec; no tier-1 wave in weeks 8–10. |
| 9 | **Affiliate and creator issues:** only Makeborne-created checkout links may be used; refund clawback unconfirmed; self-referrals. | Unhappy buyers; paying for refunded sales. | §6 item 9 before creators post; a 30-day hold; approval on every payout. |
| 10 | **Founder burnout.** Daily posting plus support plus six waves. | Quality and support drop. | Batch content on Sundays; half cadence in weeks 9–10; drop the lowest-yield channel after each wave review. |
| 11 | **Refund and dispute ratio** with no trial. | Whop reserve or account risk [U: thresholds not researched]. | Copy accuracy; a clear refund flow; monitor disputes weekly. |
| 12 | **EU AI Act marking for generated images.** | A compliance gap at the W1 wave. | §6 item 14; a legal check before W1 [U]. |
| 13 | **Data quality:** every funnel rate here is an assumption; vendor audience claims are self-reported. | Wrong decisions. | Kill and scale rules based on tracked net paid only. |
| 14 | **Public-repo hygiene.** | Leaks. | No Whop IDs, keys, buyer data or internal infrastructure details in this repo; crop every screenshot. |

---

## 13. Owner decisions

| # | Decision | My recommendation | Economics |
|---|---|---|---|
| 1 | **TAAFT $49 or the $437 bundle, today** | $49 now; the bundle later from revenue, if the listing converts | The bundle is 44% of the budget, on self-reported audience claims |
| 2 | **Free trial or free credits** (currently none) | Keep no free tier. Add a public gallery, a sample review link and launch-offer codes now. Decide on a **capped free preview build** (no publish or export, one per verified email) by week 5, mainly to make Show HN and Product Hunt fair. | About $0.60–1.20 per preview [E]; 600 previews on a Product Hunt day ≈ $360–720 of AI cost |
| 3 | **Launch-day offer** | +100 bonus credits on the first paid month for each wave's code | At most about $3 per redeemer at full use [E] |
| 4 | **Affiliate commission** | Public: 25% recurring for 12 months. The first 20 hand-picked creators: 30% recurring for 12 months. Yearly plans: first payment only. No self-referral, no brand bidding. Only after refund clawback is confirmed. | 30% for 10 months on Studio ≈ $147, or 43% of lifetime contribution [E] |
| 5 | **Customer referral** | +100 credits each side, on the friend's first payment that is not refunded | At most about $6 of provider cost per new customer [E] |
| 6 | **Daily AI limit rule** | Raise it before each wave and tie it automatically to new paid accounts | About $186–270 a day for 100 new payers building twice [E] |
| 7 | **Black Friday** | Yearly 20% off only (already true). No extra discount. | Protects the beta price |
| 8 | **Revenue transparency** | Publish MRR, customers and refunds at day 30 and day 90 | It is the strongest press and Indie Hackers angle, and it costs nothing |
| 9 | **The founder as the face of the story** | Yes, for the "Sarajevo vs Lovable" press frame | Press needs a person and a photo |
| 10 | **Blind evaluation** | Yes, if the founder will publish losses too | About 1 month of competitor subscriptions, outside the $1,000 |
| 11 | **Refund policy** | Consider "full refund within 7 days if under 100 credits used" instead of "until any credit is used" | It cuts refund abuse and makes trying feel safer |
| 12 | **Local-language launch** (Bosnian, Croatian, Serbian) | Yes for press and LinkedIn at W0 and W1; English stays the main market | Low cost; it opens regional press |
| 13 | **Consent banner timing** | Ship by week 6 | Unlocks retargeting of wave visitors in January |

---

## 14. Sources

Accessed 26 Oct 2026 unless stated. Full source lists are in `research/*.md`; the Verification section of each report overrides its body.

**Primary [V]**
- Product Hunt launch guide (timing, self-hunt 79%/60%, 1-week account rule, no upvote asks, relaunch for significant iterations, weekend +15% Visit clicks, 53% video, 70% first comment): https://www.producthunt.com/launch ; https://www.producthunt.com/launch/before-launch ; https://www.producthunt.com/launch/preparing-for-launch ; https://www.producthunt.com/launch/sharing-your-launch
- Product Hunt daily leaderboards 20, 22, 24 and 25 Oct 2026: https://www.producthunt.com/leaderboard/daily/2026/10/24 (and /20, /22, /25)
- Lovable and Base44 launch histories: https://www.producthunt.com/products/lovable/launches ; https://www.producthunt.com/products/base44/launches
- Show HN guidelines: https://news.ycombinator.com/showhn.html ; HN Algolia search of Show HN since 1 Jan 2025: https://hn.algolia.com/api/v1/search?query=AI%20website%20builder&tags=show_hn
- TAAFT Get Featured ($49, $437 bundle, $300 launch-first bonus): https://theresanaiforthat.com/get-featured/
- Ben's Bites ads ($3,500 primary slot): https://ads.bensbites.com/ ; Superhuman AI rate card ($3,500 Featured Tool): https://www.passionfroot.me/zain-kahn
- Whop affiliate program, tracking links and Content Rewards: https://docs.whop.com/manage-your-business/growth-marketing/affiliate-program.md ; https://docs.whop.com/manage-your-business/growth-marketing/tracking-links.md ; https://docs.whop.com/memberships-and-access/third-party-apps/content-rewards.md
- Lovable Series C ($400M at $13.3B, 12 Aug 2026): https://lovable.dev/blog/series-c
- Supabase Launch Week format (Launch Week 15, Monday to Friday, one main announcement a day; year not shown in the page extract): https://supabase.com/launch-week
- Netokracija home and contact page (regional coverage; generic newsroom tips address): https://www.netokracija.com/ ; https://www.netokracija.com/kontakt
- EU AI Act Art. 50 and its implementation timeline: https://artificialintelligenceact.eu/article/50/ ; https://artificialintelligenceact.eu/implementation-timeline/ (the 2 Dec 2026 marking date is [U] until checked on EUR-Lex)

**Secondary [S]**
- Uneed, Fazier, TopAI and Toolify prices (read 18 Aug 2026): https://orangebot.ai/blog/where-to-submit-your-ai-tool-2026
- Niche newsletter rates (22 Mar 2026): https://www.creativeainews.com/articles/ai-newsletter-landscape-2026/
- Bloomberg Adria outlet profile (editorial hubs including Sarajevo): https://muckrack.com/media-outlet/bloombergadria
- Sarajevo ecosystem leads (Techstars Sarajevo programme, Slush'D Sarajevo; LinkedIn posts, low confidence): https://ba.linkedin.com/in/ahmetovicajdin
- Base44 building in public on LinkedIn (episode summary): https://www.lennysnewsletter.com/p/the-base44-bootstrapped-startup-success-story-maor-shlomo

**Internal research (this repo)**
- research/platforms-community.md: Product Hunt plan, directories, newsletters, Reddit, Show HN
- research/product-funnel-audit.md: AI cost per build, contribution, attribution gaps, Whop affiliate checkout issue
- research/paid-acquisition.md: kill and scale rules, Black Friday CPM risk, no cold ads
- research/short-form-video.md: video formats, cadence, Content Rewards settings
- research/creative-assets.md: v9 and v14 status, creative direction, EU AI Act note
- research/audience-positioning.md: ICP order, keyword volumes, KDP disclosure, Lovable funding
- research/case-studies-ai-builders.md and research/case-studies-adjacent.md: benchmarks and loops

**Not verified this session:** the tip and submission processes of EU-Startups and Sifted (both returned 403), and of Startit and BiH portals; whether TAAFT's launch-first bonus applies to the $49 tier; whether Whop Content Rewards has a minimum budget; Reddit sidebars; whether ManyChat works on TikTok for a business in Bosnia and Herzegovina; Whop dispute-ratio thresholds.

# Makeborne 90-day growth plan: short-form video and creator-led

**Angle:** the outputs are the content. Makeborne builds websites, books and decks, so every post can end on a finished thing. The plan runs a small, honest network of founder, brand and disclosed faceless accounts. It pays micro-creators a flat fee plus a per-view bonus, turns posts that have already won into TikTok Spark and Meta partnership ads, and turns comments into DMs that carry a tracked link to a page that matches the format.

**Window:** Monday 26 Oct 2026 (paid beta launch) to Sunday 24 Jan 2027 (day 90).
**Budget:** $1,000 of cash marketing, allocated exactly in section 5. After that, growth is funded from revenue under a reinvestment rule that is an owner decision.
**Status:** draft for the owner. Every rate, price and threshold marked [O] is an owner decision.

**Evidence labels used throughout**
- [F] verified fact, re-read at the source on or before 26 Oct 2026
- [S] secondary source
- [V] vendor or self-reported claim
- [E] estimate (our arithmetic on stated inputs)
- [A] assumption, to be replaced with real data from weeks 1 and 2
- [O] owner decision

Full evidence is in `research/*.md`. Each report's Verification section overrides anything earlier in that report.

---

## 0. The plan on one page

1. **Show the product working; skip vibes.** Makeborne has no free tier and no trial, so a view only converts if the viewer watches a brief turn into a finished site, book or deck at honest speed. Cluely is the warning: a self-reported 49M-view video produced fewer than 100 downloads [V].
2. **The core format is the comment-reply speedrun:** "Comment your business and I'll build its website." Open on the finished output, show the brief with a visible timer, make one live edit, publish, then loop back to frame 0.
3. **Run 7 to 8 accounts for real, not a farm.** Brand accounts on TikTok, Instagram, YouTube and LinkedIn. The founder on LinkedIn and on TikTok or Instagram. Two disclosed faceless accounts ("Made with Makeborne" outputs, and a freelancer and agency niche). From week 8, one language clone, but only if a format is already winning. Each account makes its own content with a disclosed bio. TikTok bars deceptive multi-account use and makes "unoriginal or reused material" ineligible for the For You feed [F].
4. **Volume buys lottery tickets.** Post 10 to 14 TikToks a week on the brand account, with native re-edits for Reels and Shorts. Across 11.4M posts in Buffer's study, median views stay flat as posting rises, but the 90th-percentile post grows about 3.9x from 1 a week to 11+ a week [F].
5. **Pay creators for views and sales, never for reach promises.** Wave 1 (week 2): 6 micro-creators at $30 per video plus $1.50 per 1,000 views, each with a tracked link. Wave 2 (the images beat): 2 visual creators. From about week 5, a Whop Content Rewards UGC campaign funded from revenue, priced off Lovable's own benchmark of $1 per 1,000 views ($26,119 across 1,717 creators for 16.7M approved views [F]).
6. **Boost only proven winners.** A post qualifies at 3x or more the account's median views within 48 hours, plus a 3-second hold of 65% or more and at least one tracked sale or 5+ link clicks per 1,000 views. Boost it as a TikTok Spark ad or Meta partnership ad, and never run cold campaigns.
7. **Comment-to-DM is the conversion engine on Instagram.** The keywords are SITE, BOOK, DECK and CLIENT, and each returns a format-matched `/go/` link, three example briefs and the exact refund line. TikTok has no comment trigger, so use "DM me SITE" and a business-account bio link.
8. **Attribution comes first, spend second.** No creator is paid before `/go/` short links, first-touch storage and checkout metadata work. No pixels or retargeting before a consent banner is live (EU law).
9. **Feature launches are content beats.** Generated images, top-ups, custom domains, two-way GitHub sync, agency tools and AI lead research each get a beat, and **only once they are live and verified in production**.
10. **The honest maths.** $1M ARR is about $83.3k MRR, or about 2,280 active subscribers at a blended $36.60 [E]. This plan alone produces about $10k ARR in the low case, about $170k in the base case and about $1.0–1.3M in the high case (section 10). The high case needs 3 to 5 product-on-screen posts at 1M+ views, a click-to-paid rate of 3% or better with no free tier (which has no benchmark), and revenue-funded creator spend rising to about $10k+ by December.

---

## 1. Ground rules (non-negotiable)

1. **Never promote a feature before it is live.** Generated images, credit top-ups, custom domains, two-way GitHub sync, agency tools and AI lead research are all "coming". Concept frames carry a readable "Projects shown are AI-generated concepts" line. The v14 film is held for the images beat (section 7.4).
2. **Never say "free" or "trial."** The refund line must be exact: "Full refund until you use credits." The v14 end card currently says "Start free" and must be changed before any use [F, creative-assets audit].
3. **Disclose every paid or incentivised post.** Use the platform's paid-partnership or branded-content toggle, plus "#ad" or "Paid partnership" at the start of the caption, plus a spoken or on-screen mention. Credits given for sharing count as a material connection. Read FTC "Disclosures 101", the EU Unfair Commercial Practices Directive and TikTok's branded-content policy at the primary source before wave 1 goes live. The research only read these through summaries [gap].
4. **No AI model vendor names** in captions, voice-overs, on-screen text, creator briefs or landing pages.
5. **Real businesses and people.** Build a commenter's site only when they ask, using only public information. Do not leave it published on a Makeborne address without their written OK. Never show anyone's personal data, and never imply endorsement.
6. **No fake engagement:** no bought views, followers or accounts, and no engagement pods. Bought engagement means a permanent ban on Whop Content Rewards and breaks TikTok's rules [F/S].
7. **Speed claims are timed on screen.** Any speed-up is labelled ("sped up 4x").
8. **Music:** the TikTok business account uses only the Commercial Music Library. "Businesses cannot use the general music library for commercial usage", and that covers organic posts [F, TikTok Ads Help, updated Jul 2025]. Otherwise use original voice-over or the Makeborne sonic logo.
9. **Tracking:** first-party short links and server-side events only, until a consent banner (CMP) is live. The EDPB's Guidelines 2/2023 put tracking links, affiliate links included, inside ePrivacy Art. 5(3) [F, product-funnel-audit verification], so get a legal view before pushing EU traffic at scale.
10. **The marketing repo may be public.** No secrets, keys, infrastructure details or personal data go in it, including creator contact details. Keep those in a private sheet.

---

## 2. Target ICP order (through a short-form lens)

The ICP order follows `research/audience-positioning.md`. Short-form reaches consumers and prosumers more easily than agencies, so the plan runs **two lanes** and keeps them on separate accounts so the messages do not collide.

| # | ICP | Plan they fit | When | Short-form lane | Main surfaces |
|---|---|---|---|---|---|
| 1 | **Freelancers and agencies delivering client sites** | Studio $49 ("best for client work"), Scale $99 | Now | **Lane A: client work.** Lead finder, demo site, review link, client approves on a phone | Founder LinkedIn, freelancer-niche TikTok, Wave-1 freelancer creators, LinkedIn carousels made in Makeborne |
| 2 | **Consultants and founders (decks)** | Create $20, Studio $49 | Now | Lane B: "notes into deck", "open the PPTX and click the chart" | LinkedIn, X, brand TikTok and Reels, YouTube Shorts plus a long tutorial |
| 3 | **Coaches, creators, authors and gift-givers (books)** | Create $20 | Text-led books now (recipes, family stories, guides, lead magnets). Picture books and bedtime books **wait for the images beat** | Lane B: holiday book gifts from 1 Nov to about 20 Dec | Instagram Reels (sends), TikTok, the faceless outputs account |
| 4 | **Small business owners** | Create $20 | Push hard only **after custom domains are live** (Wix, Durable and Hostinger include domains) | Lane B: comment-reply speedruns for local businesses | Brand TikTok and Reels |
| 5 | **Educators and students** | Needs an education price [O] | Later | Deck content only, no push | — |

**Positioning conflict to avoid.** "I replaced my agency" content works on small businesses and repels agencies, who are the Studio and Scale buyers. It never runs on the founder, LinkedIn or freelancer accounts. Only the brand TikTok may use a softened version ("a first version before you hire a designer").

---

## 3. Positioning and messaging

### 3.1 Statements
- **Category line (site, LinkedIn, bios):** "The AI studio for client work: websites, decks and books from one brief."
- **Short-form line (on screen, in captions):** "One brief in. A finished website, book or deck out."
- **Proof line (end cards, DMs, landing pages):** "From $20/month + tax. Full refund until you use credits."

### 3.2 Message house

| Pillar | What we say | How short-form proves it |
|---|---|---|
| **Watch it build** | A real brief becomes a finished output in about a minute | Timer on screen, result in frame 0, no cuts during the build except labelled speed-ups |
| **Three products, one plan** | Site, deck and book from one subscription. No single competitor covers all three [S, audience research] | Video format X2: "I asked for a website. It also wrote the book and the deck." |
| **Your client approves** | Review links where clients comment and approve without an account | A freelancer POV showing the client tapping Approve on a phone |
| **Honest billing** | Clear credits, and a full refund until credits are used | Founder "Day N" posts with real refund numbers |
| **Made, not generated** (look and feel) | Cream canvas, Inter display type with one Newsreader Italic accent word, real UI | Every post shows real product UI or real output, with no AI-look clichés [creative-assets direction] |

### 3.3 Hook bank (customer-facing, true on launch day)
Taken from `research/short-form-video.md` §4. Hook codes go in `utm_content`.

- **Speedrun:**
  - R1 "This website took 52 seconds. Watch." (use the real time)
  - R2 "Replying to @___: here's your bakery's website."
  - R3 "One brief in. A whole website out."
- **Before/after:** R5 "Your 2014 website vs the one I made in a minute." (fixture businesses, or real ones with written OK)
- **Books:**
  - B1 "My grandma never wrote down a recipe. So I made her a book."
  - B4 "Your notes app is full of book ideas. Here's one, finished."
  - B2, the bedtime book where your child is the hero, waits for images.
- **Decks:**
  - D1 "Pitch deck from one brief. 40 seconds."
  - D2 "My slides vs the deck I generated. Be honest."
- **Freelancer:**
  - F1 "Freelancers: steal this client-approval trick."
  - F2 "POV: the client says 'make it pop' for the 9th time."
  - F4 "I found 20 local businesses to pitch in [real time]." This uses the live lead finder; it is **not** the coming AI lead research.
- **Founder:**
  - P1 "Day 1: a founder in Sarajevo with $1,000 versus the biggest AI builders." Name no valuation unless it is re-checked on the day, and confirm any "solo" wording is literally true.
  - P2 "Day 7: here's exactly how many people paid."
  - P3 "Everyone said 'add a free plan'. Here's why I didn't."
- **Slideshow:**
  - S1 "5 websites, one brief each, this week (swipe)."
  - S3 "Which deck would you present? A, B or C."

### 3.4 Objections to answer in DMs, pinned comments and landing pages
- **"No free plan?"** Answer: "Watch the full uncut build first. If you don't use a credit, you get every cent back."
- **"Is it just templates?"** Answer by showing the brief and the result side by side, plus one live edit.
- **"Can I use my own domain?"** Say only: "Not yet. Sites publish on a Makeborne address today." When domains ship, it becomes a beat.
- **"Can I print the book on KDP?"** Do not promise print-ready books. Amazon KDP requires disclosure of AI-generated text [F].

---

## 4. Channels and weekly cadence

### 4.1 Account network (genuinely run, disclosed)

| # | Account | Voice | Job | Cadence (from week 2) | Start |
|---|---|---|---|---|---|
| 1 | TikTok **@makeborne** (business account, for the clickable bio link) | Brand, founder on camera often | Speedruns, comment replies, book gifts, tutorials | **12 a week** (13:00 and 21:00 Sarajevo; 20:00–23:00 covers the US East afternoon from 1 Nov) | Day 0 |
| 2 | Instagram **@makeborne** (professional) | Native re-edits, no watermarks | **Comment-keyword DM conversion**, carousels, sends | 7 Reels and 3 carousels a week | Day 0 |
| 3 | YouTube **@makeborne** | Shorts plus 1 long tutorial a week | Search, loops, links from Shorts to long videos | 7 Shorts and 1 long video a week | Day 0 |
| 4 | LinkedIn **Makeborne** page | Reposts of the founder, carousels | Credibility for Lane A | 3 a week | Day 0 |
| 5 | **Founder LinkedIn** | First person, "Day N" | Agencies, freelancers and founders (the Base44 route) | 5 a week: 2 video, 2 carousel built in Makeborne, 1 numbers post | Day 0 |
| 6 | **Founder TikTok or Instagram** | Raw underdog diary | Trust and the series hook | 4 a week | Day 0 |
| 7 | TikTok and Instagram **"Made with Makeborne"** (faceless, disclosed in bio as run by Makeborne) | Output slideshows and scroll captures | Saves and discovery. TikTok carousels showed ~81% more engagement than videos at similar reach in one H1 2025 sample [V] | 1 a day | Week 1 (day 3), after warm-up |
| 8 | TikTok **freelancer and agency niche** (disclosed) | Client-work POVs and tutorials | Lane A on TikTok | 5 a week | Week 3 |
| 9 | (Optional) **Language clone**: Bosnian, Croatian and Serbian, or German | Winning formats re-made natively, not re-uploaded | Home market and DACH | 5 a week | Week 8, **only if** a format has 3+ wins and Makeborne's output quality in that language has been checked [A] |

**Warm-up** (vendor advice only [V]): 2 to 3 days of 10 to 15 minutes a day of real niche watching, comments and a few follows. Use one device per account. Brand accounts post from day 0. Never delete early low-view posts.

### 4.2 Weekly operating rhythm

| Day | Work |
|---|---|
| **Mon** | Film batch 1: 8 to 10 speedruns and comment replies. Publish founder "week N" numbers on LinkedIn |
| **Tue–Wed** | Publish. Reply to comments within 2 hours of posting (comment replies become the next videos). Creator check-ins |
| **Thu** | Film batch 2: books, decks, freelancer POVs, one long tutorial |
| **Fri** | Boost decision on any post that passed the gate in the last 48 h. Creator payouts for verified views |
| **Sat** | Carousels and faceless slideshows for next week (15 to 20 minutes each, from real outputs) |
| **Sun** | **Review ritual:** export numbers, tag the top 10%, re-cut each with 2 new hooks, retire the bottom 50% of formats, schedule the week, write the weekly growth note |

Founder time is about 2 to 3 hours a day [E]. Help is hired from revenue (owner's private notes).

### 4.3 Comment-to-DM funnels

| Surface | Trigger | What the DM or reply sends | Notes |
|---|---|---|---|
| Instagram Reels and carousels | Comment **SITE**, **BOOK**, **DECK** or **CLIENT** | (1) the format-matched link `makeborne.com/go/ig-<post>-<kw>`, (2) three example briefs to copy, (3) a 30 s uncut build, (4) "From $20/month. Full refund until you use credits.", (5) "Reply STOP to stop messages." | ManyChat or similar. The Pro price was unverified (about $15–30 a month [S]); start on the free tier |
| TikTok | Say "**DM me SITE**" (no comment-to-DM exists) | The same pack, sent by automation if eligible, otherwise by hand for the first 2 weeks | ManyChat's TikTok channel is DM-only, and EU, UK and US businesses were excluded as of Sep 2025 [F]. Eligibility for a Bosnian business is unknown, so check |
| TikTok bio | Business account | `makeborne.com/go/tt-bio` | Clickable at 1,000+ followers or with a business account; some countries need registration proof [S] |
| YouTube Shorts | Related-video link plus pinned comment | `/go/yt-<id>` leading to the long tutorial | — |
| LinkedIn | Link in the first comment | `/go/li-<post>` | — |
| Creators | Their own link and code | `makeborne.com/go/c-<handle>` with the affiliate code carried through to checkout | Section 6, items 1 and 5 |

### 4.4 Link and naming scheme (one lowercase standard)
- **Short link:** `makeborne.com/go/<channel>-<id>` redirects on the server to a format page with these parameters:
  - `utm_source`: tiktok, instagram, youtube, linkedin, x or `c-<handle>`
  - `utm_medium`: organic, creator, spark, partnership, dm, bio or affiliate
  - `utm_campaign`: launch-2026-10, books-holiday-2026, images-beat-2026-11, bf-2026, domains-beat and so on
  - `utm_content`: `<account>-<video#>-<hook code>`, for example `tt-0412-r2`
- **Storage:** first touch and last touch are stored on the account at sign-up. `mb_src`, `mb_campaign` and `mb_aff` are passed into the Whop checkout metadata, and sales are reconciled weekly against Whop's payment webhook.
- **Fallback until this ships:** ask "How did you hear about us?" at onboarding, with a free-text creator handle field. Do not use Whop's own tracking or store links. A purchase on Whop's store page does not grant Makeborne credits [F, product-funnel-audit].

---

## 5. The exact $1,000 allocation

**Gate before any line is spent:** `/go/` links, first-touch storage and checkout metadata are live (section 6, item 1), and the copy fixes have shipped (item 12). If attribution is not live by day 7, creator spend waits. Organic posting does not.

| # | Line item | Amount | Timing | Mechanics |
|---|---|---|---|---|
| 1 | **Wave-1 micro-creators: flat fees** | **$360** | Recruit days 2–8. Videos post 9–22 Nov (weeks 3–4) | 6 creators × 2 videos × $30. Lanes: 3 freelance web-design or agency creators (Lane A), 2 small-business or side-hustle creators, 1 deck or productivity creator. Audience 2k–50k followers, with **at least 60% in US, UK, EU, CA or AU** (audience screenshot required). Each gets a comped Studio account for the campaign month, a one-page brief, a `/go/c-<handle>` link and an affiliate code (rate [O-2]). Contract: TikTok Spark code or Meta partnership permission for **60 days**, delivered within 48 h of posting |
| 2 | **Wave-1 per-view bonus pool** | **$100** | Paid weekly on views from days 1–7 of each video | $1.50 per 1,000 views, capped at $40 per video. Overflow beyond $100 is paid from the reserve (line 6), because overflow means a winner |
| 3 | **Wave-2 visual creators (images beat)** | **$150** | Only after generated images are **live and quality-checked in production**. Expected weeks 5–6 | 2 creators × 2 videos × $30 = $120, plus a $30 per-view bonus pool on the same terms. Image-led site, deck and book builds. **If images are not live by 30 Nov**, the line rehires the best Wave-1 creator for 4 more videos |
| 4 | **Boosting proven winners** | **$200** | First slot no earlier than 9 Nov. Second slot weeks 5–8. Avoid 25–30 Nov (Black Friday CPMs) unless the winner is the BF post | Slot A: TikTok Spark, $52 a day × 2 days = $104 (TikTok's campaign floor is "more than $50" a day [S]). Slot B: Meta partnership ad, $24 a day × 4 days = $96, Reels and Feed only, no Stories at first (Stories CPA was 25% higher [V]). Geos: US, UK, CA, AU, IE, NZ, DACH, Nordics, Benelux. With no pixel, optimise for profile visits or landing-page traffic and judge on `/go/` sales |
| 5 | **Comment-to-DM tooling** | **$40** | Upgrade from the free tier only when needed. About 2–3 months | ManyChat Pro or equivalent for Instagram (price unverified, about $15/month assumed [A]). Unspent money rolls into the reserve |
| 6 | **Scale reserve** | **$150** | Weeks 3–8 | Released **only** by the scale rule below. Uses, in order: (a) bonus overflow on a breakout creator video, (b) rehire the creator with the lowest cost per paid customer, (c) extend the winning Spark or partnership ad, (d) a small Whop Content Rewards pilot **if** the Whop dashboard shows no $1,000 minimum (third parties dispute it [S]) |
| | **Total** | **$1,000** | | |

**Not in the $1,000** (operating cost, owner approval needed [O-10]):
- Provider cost of brand demo builds: about 2 a day × about $1 [E] × 90 days ≈ $180 [E].
- Comped creator credits: up to about $22.50 each at full Studio use (750 × $0.03) [E], about $180 for 8 creators at full use.
- Founder time.
- Free tiers of an editing app and schedulers (TikTok web scheduler, Meta Business Suite, YouTube Studio).

**Creator rates are an assumption.** Market posts reportedly run about $175–290 [S, unverified]. Many 2k–20k creators accept $30–50 plus affiliate income [V, one creator's observation]. If good creators insist on more, buy 4 creators instead of 6 and keep lines 2–6 unchanged.

### 5.1 Kill and scale rules
- **Creator keep rule:** at least 1 net paying customer per $40 spent through their link or code, counted 14 days after their second video. If they miss it, do not rehire.
- **Creator kill rule:** the source has spent $100 with 0 net paying customers, or $150 with 1.
- **Boost kill rule:** link CTR below 0.5% or CPC above $2 after $30–50 spent. Stop the boost and keep the organic post.
- **Refund brake:** pause any source where more than 30% of buyers refund within 14 days.
- **Scale rule (releases the reserve, later revenue):** a source shows net CAC of **$50 or less over at least 3 net paying customers**. Raise its budget by no more than 20–30% every 48–72 hours.
- **CAC target:** $37 or less, about one month of blended ARPU. Contribution is about $17–24 a month per subscriber after Whop fees, depending on credit use and add-ons [E]. A $37 CAC pays back in about 1.5–2.2 months.
- **Creative refresh:** when CTR or hook rate drops about 30%, frequency passes 3, or after about 30 days. Winning ads fatigued after about 36 days in Agentio's data [V].
- **Day-21 offer check (16 Nov):** if no source has delivered paying customers under $50 each by then, change the offer before buying more views. See owner decision O-1 (capped first-build preview) and O-6 (usage-capped refund).

### 5.2 After the $1,000: revenue reinvestment [O-3]
- **Recommended:** reinvest **30% of each week's net new cash** (after refunds and Whop fees) into creator CPM (Whop Content Rewards plus rehires) and winner boosts, while blended creator CAC stays at $37 or less.
- Drop to 10% if CAC is $37–50. Stop if CAC is above $50.
- **Whop Content Rewards (Stage 2) settings** [I]:
  - UGC type at $1.50–2.00 per 1,000 views
  - $3 minimum payout (about 2,000 views)
  - $150 maximum per video
  - $5 flat bonus per approved video
  - TikTok, Instagram and YouTube
  - at least 60% of the audience in target geos
  - no reposts or AI-voice spam; disclosure required; real build on screen; tracked link; no vendor names; nothing that isn't live
- Lovable's effective rate was about **$1.56 per 1,000 approved views** ($26,119 / 16.7M) against a $1 headline rate [E from F]. The gap is unexplained, so plan at $1.60 per 1,000.
- The ~10% fee reportedly comes out of creator payouts, plus about 2.7% + $0.30 processing [S]. Budget about 3% on top until Whop confirms.
- **Fraud controls:** watch for views clustering at the cap, require audience screenshots, spot-check comments.

---

## 6. Product growth changes for engineering (ranked)

Ranked by effect on this plan per unit of effort. S, M and XS are effort sizes. Code locations are left out on purpose because this repo may be public.

| Rank | Change | Why it matters for creator-led growth | Size |
|---|---|---|---|
| 1 | **Attribution plumbing.** A `/go/<code>` server redirect. The counter records aggregated `utm_*`, an allow-listed referrer host and whether a referral code is present. First and last touch go on the account at sign-up. `mb_src`, `mb_campaign` and `mb_aff` go into Whop checkout metadata. A weekly source report covers net customers, refunds and CAC | Without it, no creator, video or boost can be judged. This is the gate for all spend | S, $0 |
| 2 | **A daily AI spend cap that scales with paid sign-ups** [O-7], plus honest queue messages | A viral day otherwise stalls people who just paid at their first build. The cap must scale with paid sign-ups; a first site build costs about $0.93 of provider cost (median) [E, funnel audit] | XS |
| 3 | **Format-matched landing pages:** `/sites`, `/books`, `/decks`, `/client-work`. The example from the video sits at the top, then price, the refund line, a 20–40 s silent real-build loop and one CTA | "The landing step matters more than the video." A creator's book video must land on books | S |
| 4 | **"Use my brief" deep links.** `/go/<code>?brief=<id>` opens the composer with the creator's exact brief pre-filled and their code attached. The brief survives sign-up and checkout, as the plan choice already does | Every video ends "try my exact prompt", which cuts the steps between video and first output | S–M |
| 5 | **Creator affiliates through Whop custom affiliates.** Links go to makeborne.com, and Makeborne passes `affiliate_code` on the checkout it creates. Prove attribution in the Whop sandbox, then run one small live purchase-and-refund test for payout and clawback | Pays creators from revenue instead of cash up front. Only Makeborne-created checkout links are used [O] | S–M |
| 6 | **Badge, review page and portal links carry UTM and referral.** The badge link carries the site owner's referral code. The review-page brand mark becomes a link, with a "Build yours with Makeborne" CTA | Every published output becomes a measurable ad. Today the badge links to the homepage with no tag [F] | S |
| 7 | **Public share and present links for decks and books,** with a tasteful "Made with Makeborne: make your own" end card (on by default for personal work, removable) | Books and decks become filmable, shareable artifacts, and viewers can open the real thing from the bio | M |
| 8 | **A public `/examples` gallery** of real, unedited outputs (10 sites, 10 decks with PPTX, 10 books as PDF), each showing its brief, time and credits used, plus a "Make one like this" button | The proof library that replaces a free trial. It is also the source for faceless slideshows and LLM-citable pages | M |
| 9 | **A one-question onboarding survey:** "How did you hear about us?" with a creator-handle field | Recovers the 20–50% of view-through conversions that links miss [A] | XS |
| 10 | **Share-for-credits** [O-5]. After publishing, prompt "Post it, tag us, get N credits" with the disclosure built into the suggested caption | Base44's founder credits this loop [F, self-reported]. Also a source of free UGC | M |
| 11 | **Consent banner (CMP) plus Google Consent Mode v2,** then pixels or conversions APIs with consent | The prerequisite for purchase-optimised Spark and partnership ads and any retargeting in month 3 | S–M plus legal |
| 12 | **Copy accuracy before any creator posts:** live product copy matches what ships at launch (list in the owner's private notes). Every coming-soon item gets a "coming soon" label | Creators will screen-record these. Overclaims become public | XS |

---

## 7. Launch week, day by day (26 Oct – 1 Nov 2026)

Times are Sarajevo (CET, UTC+1). Until US clocks change on 1 Nov, the US East afternoon (2–6 pm ET) is 19:00–23:00. From 1 Nov it is 20:00–00:00.

### Day 0: Monday 26 Oct (launch)
- **Morning:**
  - Set up the TikTok business account, Instagram professional account, YouTube channel and LinkedIn page, with bios that state "From $20/month + tax. Full refund until you use credits."
  - Set up Instagram DM keywords on the free tier.
  - Ask engineering for items 1, 2 and 12 today.
- **Pin the v9 Fly-over (9:16)** on TikTok and Instagram, and only after checking its end card says nothing false. If it does, add a 2 s truthful end card: "makeborne.com · from $20/mo + tax · refund until you use credits." Also check that the film still matches the live home page.
- **13:00:** Founder LinkedIn post, "Day 1": what Makeborne is, who it is for, price, refund rule, and "comment what you want built first" (P4).
- **13:00 and 21:00 TikTok:** two speedruns using fixture businesses: a site (R3) and a deck (D1).
- **All day:** reply to every comment. Collect "build mine" requests in a private sheet, together with each commenter's consent.
- **Evening:** record 4–6 real-speed screen captures at 2x UI scale (composer to publish, a chat edit, client comment then fix then Approve). These are the raw library for the week.

### Day 1: Tuesday 27 Oct
- First **comment-reply speedruns** (R2) from day-0 comments, with consent and public information only.
- First **text-led book** post (B1 or B4).
- Reels and Shorts: native re-edits of day 0.
- Founder TikTok "Day 2: here's what broke."
- Build a creator shortlist of 30 candidates. Check audience geography, content quality and past disclosure habits.

### Day 2: Wednesday 28 Oct
- Freelancer POV (F2) showing the review link and Approve on a phone.
- Before/after on a fixture business (R5).
- First Instagram carousel ("5 sites from one brief", S1).
- Start owner outreach to the top 12 creators. The owner does this from their own accounts; this plan does not contact anyone.
- Founder LinkedIn post: a short clip of the client-approval flow.

### Day 3: Thursday 29 Oct
- Faceless **"Made with Makeborne"** accounts start after warm-up: scroll captures of real outputs with the brief as a chip.
- First long YouTube tutorial: "How to turn a messy brief into a pitch deck" (T2, 6–8 min).
- 20-minute onboarding calls with interested creators. The owner onboards each one personally; Gamma's founder did this for every early creator [S].

### Day 4: Friday 30 Oct
- **First 48-hour read:** which posts beat 3x the median? Re-cut each with 2 new hooks.
- A deck before/after (D2) and a lead-finder video (F4, live lead finder only).
- Sit on video calls with the first 3–5 paying users if they agree. Fix what breaks within 24 hours and ask each one to post their build (disclosed if they receive credits).

### Day 5: Saturday 31 Oct
- Batch-film day: 10 videos for next week.
- Holiday book-gift series teaser ("gift ideas that take 2 minutes", B3 framing; text-led books only).
- Sign the first creator agreements. **No payment until attribution is live.**

### Day 6: Sunday 1 Nov (US clocks change)
- Founder "Day 7: exactly how many people paid" (P2) with real Whop numbers, refunds included, on LinkedIn, TikTok and Reels.
- **First Sunday review ritual.** Keep the top 2 formats, set the week-2 schedule, move the 21:00 slot to fit 20:00–00:00 Sarajevo for the US East.
- Weekly growth note to the owner: views, link clicks, DMs, sign-ups, paid, refunds, AI cap hits.

**Launch-week volume target:** about 12 brand TikToks, 6 Reels, 6 Shorts, 2 carousels, 5 founder LinkedIn posts, 4 founder TikToks, 3 faceless posts and 1 long tutorial. That is about 39 posts.

---

## 8. Weeks 2–13 by phase

The feature beats below are **conditional**. Each goes out on the first weekday after the feature is live and verified in production. The slots shown are planning guesses, not dates the owner has confirmed.

### Phase 1: Find the format (weeks 2–4, 2–22 Nov)
- **Volume:** the full cadence from section 4.1, about 50 posts a week across the network.
- **Week 2 (2–8 Nov):**
  - Comment-reply series at full speed.
  - Holiday book-gift series starts (1 Nov to about 20 Dec), text-led for now.
  - Wave-1 creators onboarded, and they get the "use my brief" link if it has shipped.
  - First **build contest** for paying users: the best build of the week wins credits and is shown in a video, disclosed.
- **Week 3 (9–15 Nov):**
  - Wave-1 videos go live.
  - The freelancer-niche TikTok starts.
  - First **boost slot A** (Spark) if a post passes the gate.
- **Week 4 (16–22 Nov):**
  - Wave-1 second videos.
  - **Day-21 offer check on 16 Nov** (section 5.1).
  - Pick the 2–3 "house formats" that will carry the rest of the quarter.
- **Gate to exit Phase 1:** at least one format shows **at least 1 paying customer per 10,000 views** across 3+ posts, **or** the owner has changed the offer (O-1 or O-6).

### Phase 2: The images beat and Black Friday (weeks 5–7, 23 Nov – 13 Dec)
- **Images beat (when live):** "Launch #2."
  - Publish the v14 "Anything" hero, but only after these fixes: CTA corrected, readable AI-concept line restored, publish address matched to production, risky invented names dropped, re-rendered, and a 9:16 cut made.
  - Re-shoot formats 2, 3, 4 and 8 with images.
  - The picture-book and bedtime-book (B2) series starts.
  - Wave-2 creators go live.
  - The main Product Hunt launch is timed to this beat (owned by the platforms track). Launch at 12:01 am PT, which is 09:01 Sarajevo after 1 Nov.
  - **Machine-readable marking of generated images** under EU AI Act Art. 50(2) most likely applies from the first day of the beat (2 Dec 2026 is only the transition for systems already on the market). Confirm on EUR-Lex [U].
- **Black Friday, Friday 27 Nov:** the message "yearly is 20% off" is already true. Any extra discount is O-4. Avoid boosts from 25 to 30 Nov unless the winning post is the Black Friday post.
- **Stage-2 Whop Content Rewards** opens if Wave-1 CAC is $37 or less and the dashboard minimum is affordable from revenue under rule 5.2.
- **Custom domains beat (when live):** "your site on your own .com in 60 s." This opens Lane B for small businesses with comment-reply speedruns aimed at local businesses.
- **Credit top-ups beat (when live):** one founder post and one tutorial. Low drama, high trust.
- **Boost slot B** goes to the best images-beat post.

### Phase 3: Holiday and client-work season (weeks 8–10, 14 Dec – 3 Jan)
- Book gifts peak until about 20 Dec, with the order-by framing "make it tonight, gift it tomorrow." Between 21 Dec and 3 Jan the content turns to "new year, new website" and "your 2027 pitch deck".
- **Agency tools and AI lead research beats (when live):** a LinkedIn-led Lane A series ("from lead to approved site in one afternoon") on the founder account and the freelancer-niche TikTok.
- **Language clone account** (optional, O-8) starts with the 2–3 house formats, re-made natively.
- Help from revenue (owner's private notes). Winning creators move to monthly retainers plus affiliate.
- Expect lower B2B attention from 21 Dec to 3 Jan. Keep consumer book and deck content running, and use the quiet stretch to bank January content.

### Phase 4: Scale what pays (weeks 11–13, 4–24 Jan 2027)
- January brings new-year intent for business sites, portfolios and pitch decks. This is the strongest window for Lane B speedruns.
- **Two-way GitHub sync beat (when live):** an X and YouTube developer tutorial.
- If the consent banner is live, move winning Spark and partnership ads to purchase-optimised campaigns, with consent, and start small retargeting of `/go/` visitors who gave consent.
- Scale Content Rewards and creator retainers under rule 5.2, keeping the 20–30% budget-step limit.
- **Day-90 review on Sunday 24 Jan:**
  - Net subscribers, MRR, CAC by source, refund rate and month-2 renewal.
  - Which accounts to keep, merge or retire.
  - Plan for days 91–180.

---

## 9. Content mix and volume

### 9.1 Weekly volume from week 2 (organic)

| Surface | Posts per week |
|---|---|
| Brand TikTok | 12 |
| Brand Instagram | 7 Reels and 3 carousels |
| Brand YouTube | 7 Shorts and 1 long video |
| LinkedIn page | 3 |
| Founder LinkedIn | 5 |
| Founder TikTok or Instagram | 4 |
| Faceless outputs account (TikTok and IG, each native) | 7 + 7 |
| Freelancer-niche TikTok (from week 3) | 5 |
| **Total owned** | **about 61 a week** (about 54 before week 3) |
| Creator videos | Weeks 3–4: about 6 a week. Weeks 5–6: about 2 a week. From Stage 2: whatever the CPM budget buys |

Every idea is made in **two lengths**:
- A **25–35 s punch cut.** On TikTok, videos under 30 s had the best engagement rate.
- A **60–150 s full build.** On TikTok, 120–180 s videos got about 10x the views. On Reels, 45–60 s was best for both engagement and views [F, Socialinsider H1 2026, with methodology caveats].

### 9.2 Format mix (share of brand and founder video output)

| Format | Share | Live today? | Lane |
|---|---|---|---|
| Comment-reply and 60-second speedruns (sites) | 30% | Yes | B (A on the niche account) |
| Freelancer and agency POVs and tutorials (review link, CRM, lead finder, GitHub export) | 20% | Yes | A |
| Books: gifts, guides, lead magnets | 15% (rising to 25% from 1 Nov to 20 Dec) | Text-led yes; picture books at the images beat | B |
| Decks: notes to deck, before/after, PPTX proof | 15% | Yes | A and B |
| Founder "Day N" build-in-public | 10% | Yes | Both |
| Before/after, stitches and duets ("rate my website") | 10% | Yes | B |

Carousels and slideshows are built from real outputs only, with 5–6 slides: a hook, 4 outputs, then a CTA. Motion's 2026 dataset of 578,750 creatives ranks text-only and product-image statics highest for Meta ads [S/F], so test 2–3 stance statics in boost slot B if no video qualifies.

### 9.3 The core shot list (comment-reply speedrun)

| Time | Picture | On-screen text |
|---|---|---|
| 0–1.5 s | The finished site scrolling on a phone, with the reply bubble | "Your bakery's website. Built from one brief." |
| 1.5–4 s | The composer with the brief typed and a stopwatch starting | "Timer's on." |
| 4–20 s | The build streams at real speed or labelled "sped up 4x" | 3–5 word labels |
| 20–28 s | One live edit, then Publish to a Makeborne address | "Live. 52 s." (the real time) |
| 28–32 s | Back to the frame-0 shot, so the video loops | "Comment your business. I'll build the next one." |

---

## 10. Honest funnel model

### 10.1 Assumptions
- **Blended ARPU:** $36.60 a month, from a 60/30/10 mix of Create, Studio and Scale at list prices [A]. Short-form may skew to Create, which gives about $34 [A]. Yearly plans lower the monthly equivalent by 20%.
- **$1M ARR** = $83,333 MRR ≈ **2,280 active subscribers** at $36.60 [E].
- **Refunds plus churn by day 90:** 20% of gross paid in the base and high cases, 25% in the low case [A]. There is no benchmark for a paid-before-output AI builder [gap].
- **Funnel rates:** there is **no published view-to-paid benchmark for a hard-paywall AI builder** [gap]. All rates below are assumptions to be replaced with week-2 data.
- The model covers **short-form and creator-attributed sales only**. Founder LinkedIn text posts, directories, Product Hunt, search and the badge loop come from other tracks and would add to it.

### 10.2 Scenarios to day 90 (24 Jan 2027)

| | Low | Base | High |
|---|---|---|---|
| Qualified views in 90 days | 0.8M | 4M | 15M |
| Where they come from [E] | Owned posts at the median only (about 650 posts × 500–1,000 views ≈ 0.35–0.65M [E; small accounts average about 300–700 per post, F]) plus Wave 1, Wave 2 and boosts, about 0.15M | Owned 2.0M (2–4 posts at 100–300k), creators 0.3M, Content Rewards from revenue about 1.5M (about $2.4k at $1.60/1k), boosts 0.2M | Owned 6M (3–5 posts at 1M+), Content Rewards about 8M (about $13k from revenue), creators and boosts 1M |
| View to link click | 0.3% | 0.6% | 0.8% |
| Link clicks | 2,400 | 24,000 | 120,000 |
| Click to paid (no free tier) | 1.2% | 2.0% | 3.0% |
| **Gross new paid** | **≈29** | **≈480** | **≈3,600** |
| After refunds and churn | ≈22 | ≈385 | ≈2,880 |
| **MRR on day 90** (at $36.60) | **≈$0.8k** | **≈$14.1k** | **≈$105k** |
| **ARR run-rate** | **≈$10k** | **≈$169k** | **≈$1.26M** |
| Implied views per paying customer | ≈27,800 | ≈8,300 | ≈4,200 |
| AI capacity needed on peak days [E] | Fine at launch cap | About 30–60 first builds a day | About 200–400 first builds a day, so the cap must scale (item 2) |

**Reading the table**
- **Low:** no breakout, and the paywall before the "wow" holds conversion at conservative rates. The $1,000 still buys the knowledge of which formats and creators convert.
- **Base:** a few 100k+ posts and a working Instagram DM funnel, with revenue-funded Content Rewards from week 5. This is about in line with the cross-channel base of $220–440k ARR in `research/case-studies-ai-builders.md` once other channels are added.
- **High:** there is no documented precedent in the research for $1M ARR in 3 months from a cold start with no free tier [F/S]. Base44 claims $1.5M ARR "in four weeks", self-reported and with a free tier [V].

### 10.3 What has to be true for $1M ARR by 24 Jan 2027 (≈$83k MRR)
1. **About 2,850 gross new subscribers** (2,280 active after 20% loss), or fewer if the mix shifts to Studio and Scale. Moving 10 points of the mix from Create to Studio raises ARPU by about $2.90 and cuts the subscriber target by about 7% [E].
2. **About 14M qualified views at a "good" funnel** (0.8% × 2.5%), or about 5M at a "warm" DM-heavy funnel (1.5% × 4%). At conservative rates it would be about 95M, which is out of reach [E].
3. **3–5 product-on-screen posts at 1M+ views,** most likely from the comment-reply series and the images beat.
4. **Click-to-paid of 2.5–3% or better without a free tier.** No benchmark exists. If week-2 data shows under 1.5%, O-1 (a capped preview) becomes the deciding lever.
5. **Creator CAC at $37 or less,** so that rule 5.2 can fund about $10k+ of Content Rewards by mid-December out of revenue.
6. **AI capacity scales automatically** with paid sign-ups, and the first build starts within minutes on a viral day.
7. **Refunds stay under about 15%** and disputes stay rare. Each dispute costs $15 [F], and dispute ratios put the Whop account at risk.
8. **The images beat lands by about week 5** and its quality matches the v14 reference sheets.
9. **The founder has help** with editing and support by week 4–6. Bolt's founder spent about 95% of his day on support [S].

---

## 11. KPIs per stage, with targets (base case)

### 11.1 Content and funnel KPIs

| Stage | Metric | Target | Action if missed |
|---|---|---|---|
| Attention | 3-second hold | 70% or more [V rule of thumb] | Re-hook: result in frame 0, bigger text |
| Attention | Average watch on cuts under 35 s | 50% or more | Cut dead air; something new every 0.5–1 s |
| Engagement | Comments per 1,000 views (reply formats) | 3 or more | Ask a specific question; answer with a video reply |
| Engagement | Instagram sends per reach | Rising week on week | Add "send this to…" and gift framing |
| Intent | Profile visits per 1,000 views | 5 or more | Stronger CTA; consistent bio |
| Intent | Link clicks plus DM keyword replies per 1,000 views | 3–8 | Fix bio, keyword and landing-page match |
| Conversion | Landing to checkout opened | 8% or more [A] | Landing proof: example, uncut loop, refund line |
| Conversion | Paid per 100 clicks | 1.5–3 | Offer review (O-1, O-6) |
| Activation | First build started within 10 minutes of paying | 90% or more | AI cap, queue messages, onboarding |
| Activation | First publish or export within 24 h | 60% or more [A] | Onboarding nudges, use-my-brief links |
| Retention | Refunds within 14 days | Under 15% (brake at 30% per source) | Pause the source; review claims in its creative |
| Retention | Month-2 renewal | 70% or more [A] | Lifecycle email (engineering backlog) |
| Loop | Badge, review-link and share-link clicks per published output | Tracked from item 6; target set in week 4 | — |
| Economics | Creator CAC / boost CAC | $37 or less / $50 or less | Kill and scale rules in 5.1 |

### 11.2 Checkpoints (base case)

| Checkpoint | Owned views per week | Cumulative gross paid | Active subs | MRR | Creator CAC |
|---|---|---|---|---|---|
| Week 1 (1 Nov) | 20–40k | 10–20 | 10–18 | $0.4–0.6k | — |
| Week 4 (22 Nov) | 100–200k | 70–100 | 60–85 | $2.2–3.1k | Measured, $50 or less |
| Week 8 (20 Dec) | 250–400k (plus Content Rewards) | 220–300 | 180–240 | $6.6–8.8k | $37 or less |
| Week 13 (24 Jan) | 400–600k (plus Content Rewards) | about 480 | about 385 | about $14k | $37 or less |

Each Sunday the plan is re-scored against these numbers, and the low, base and high cases are recomputed from real rates from week 2 onward.

---

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| **Views without buyers** (the Cluely trap) | Every post shows the product working, lands on a format-matched page and has its own link; judge on sales, not views |
| **The paywall before the "wow"** caps conversion | An uncut build on every landing page, the refund line, use-my-brief links; O-1 capped preview if day-21 data is weak |
| **No attribution at launch** | Spend gate (section 5); onboarding survey; per-creator codes |
| **AI capacity stalls a viral day** | Item 2 (auto-scaling cap); honest queue messages; boosts only when capacity is confirmed |
| **Creator fraud and poor-geo views** | Audience screenshots, caps, minimum views, geo rules, pay on verified views, and keep rule tied to sales |
| **Undisclosed or overclaiming creator content** | One-page brief, review before posting, platform toggles, no live payment until a post complies |
| **TikTok link friction** (bio link rule, no comment-to-DM, ManyChat eligibility unknown for a Bosnian business) | Business account from day 0; "DM me SITE"; Instagram and YouTube carry the clicks early |
| **Ad accounts and Spark or partnership ads may not be available or billable from Bosnia and Herzegovina** [gap] | Check before 9 Nov. Fallback: in-app TikTok Promote or Instagram boost (also check), or move line 4 into creator bonuses |
| **Black Friday and Q4 CPM inflation** | No boosts 25–30 Nov unless it is the BF post |
| **Positioning collision** (consumer speedruns vs agency buyers) | Separate accounts and lanes; no "replaced my agency" on Lane A surfaces |
| **Platform policy drift** (music, DM automation, links, originality rules) | Monthly re-check; native re-edits, never duplicate uploads |
| **Feature beats slip** (images, domains) | Beats are conditional; Wave-2 money has a fallback (line 3) |
| **Using real businesses in comment replies** | Consent in writing, public information only, unpublish unless approved, never show customers' data |
| **EU AI Act marking for generated images** (Art. 50(2), most likely from launch for a new image feature [U]) | Legal check before the images beat |
| **Tracking-link consent under the EDPB reading** | Legal view before pushing EU traffic; aggregate counts only |
| **Founder burnout** | Two batch-film days, editor from revenue, weekly ritual capped at 90 minutes |
| **Refunds and disputes after spikes** | Refund line in every DM and on every page; fast support; pause sources with refunds above 30% |
| **Whop terms unconfirmed** (Content Rewards minimum, fee, affiliate payout and clawback, UTM pass-through) | Dashboard check plus one small live affiliate purchase-and-refund test before Wave 1 is paid commissions |

---

## 13. Owner decisions [O]

| # | Decision | Recommendation and economics |
|---|---|---|
| O-1 | **Capped first-build preview** for `/go/` video traffic (one preview, about 30 credits, publish and export locked) vs keep paid-only | Decide by **16 Nov** from day-21 data. Cost is about $0.90 per preview [E]. At 5% preview-to-paid, provider cost per payer is about $18 (repaid in month 1); at 2% about $45. Mitigate abuse with one preview per verified email or device. If paid-only stays, lead with the refund guarantee |
| O-2 | **Creator affiliate commission** | 30% recurring for 12 months for the first 20 hand-picked creators; 20% recurring for 12 months for the public program; first payment only on yearly plans; 30-day hold; clawback on refunds; no self-referral, no brand bidding [funnel audit]. Whop's default is 30% [F] |
| O-3 | **Revenue reinvestment rule** | 30% of weekly net new cash into creators and boosts while CAC is $37 or less (section 5.2) |
| O-4 | **Black Friday offer** | Yearly 20% off only. That message is already true and protects margin |
| O-5 | **Share-for-credits amount** for paying users who post a build | 100 credits (about $3 of provider cost [E]), disclosure in the suggested caption |
| O-6 | **Refund rule** | Option to change to a usage-capped money-back window ("full refund within 7 days if under 100 credits used") for better conversion copy. Weigh against dispute risk |
| O-7 | **AI spend cap rule** | Auto-raise tied to new paid accounts before any boost or creator post goes live |
| O-8 | **Language clone account** (Bosnian, Croatian and Serbian, or German) | Only after 3+ wins on a format and a quality check of output in that language |
| O-9 | **Staffing** | In the owner's private notes |
| O-10 | **Operating cost** of demo builds and comped creator credits (about $180 + $180 over 90 days [E]) | Approve as cost of goods, outside the $1,000 |
| O-11 | **Founder on camera daily** | Strongly recommended; the "Day N" series is the trust engine |
| O-12 | **Comment-reply builds for real businesses** | Allow with written consent; unpublish by default |

---

## 14. Key sources (read 26 Oct 2026 unless noted; full lists in `research/*.md`)

- Lovable [Official Clipping] campaign on Content Rewards: $1 per 1k, $26,119, 1,717 creators, 16.7M approved views [read 26 Oct 2026]. https://contentrewards.com/discover/2166e4e5-e0dd-41e3-92d7-42f87590f5f4
- Whop Docs, Content Rewards [read 26 Oct 2026]. https://docs.whop.com/memberships-and-access/third-party-apps/content-rewards.md
- ClipSpeed on the Content Rewards fee and minimum [13 Sep 2026, third party]. https://www.clipspeed.ai/blog/whop-content-rewards-clipping-guide.html
- FindClout, Content Rewards pricing [26 Aug 2026, third party]. https://findclout.com/blog/whop-clipping-pricing
- Elena Verna, growth lessons behind Lovable [19 Dec 2025]. https://www.elenaverna.com/p/growth-lessons-behind-lovables-66b
- CEO Insider, interview with Base44's founder [4 Aug 2025, self-reported]. https://ceoinsider.io/interview/maor-shlomo
- TechCrunch, Base44 sells to Wix for $80M cash [18 Jun 2025]. https://techcrunch.com/2025/06/18/6-month-old-solo-owned-vibe-coder-base44-sells-to-wix-for-80m-cash/
- viral.app, Cluely UGC strategy [updated 1 Oct 2026]. https://viral.app/blog/cluely-viral-strategy
- Buffer, TikTok posting frequency, 11.4M posts [8 Oct 2025]. https://buffer.com/resources/how-often-should-you-post-on-tiktok/
- Socialinsider, 2026 video performance statistics [21 Aug 2026; data Jan–Jun 2026]. https://www.socialinsider.io/social-media-benchmarks/social-media-video-statistics
- Sprout Social, best times to post [31 Mar 2026]. https://sproutsocial.com/insights/best-times-to-post-on-social-media/
- TikTok Ads Help, creative best practices [updated Jun 2025]. https://ads.tiktok.com/resources/help/article/creative-best-practices
- TikTok Ads Help, Commercial Music Library [updated Jul 2025]. https://ads.tiktok.com/help/article/commercial-music-library
- TikTok Community Guidelines, integrity and authenticity [read 26 Oct 2026]. https://www.tiktok.com/community-guidelines/en/integrity-authenticity
- ManyChat Community, ManyChat on TikTok [21 Jan 2025; replies to 3 Sep 2025]. https://community.manychat.com/product-updates/manychat-is-now-on-tiktok-4826
- Buffer, TikTok bio links [9 Dec 2025]. https://buffer.com/resources/how-to-put-a-link-in-tiktok-bio
- PPC Land, LinkedIn Creative Labs B2B video study [16 Jul 2025]. https://ppc.land/linkedin-creative-labs-reveals-what-makes-b2b-video-content-successful/
- Net Influencer, Agentio partnership ads vs licensed UGC [13 Aug 2026, vendor]. https://www.netinfluencer.com/meta-partnership-ads-outperform-licensed-ugc-across-130m-usd-in-ad-spend-report-finds/
- Relevant Audience, Spark Ads authorisation codes [secondary]. https://www.relevantaudience.com/tiktok-ads/tiktok-spark-ads-guide/
- Passionfroot, Gamma LinkedIn creator campaign [Q2 2025, vendor]. https://www.passionfroot.me/partner-story/gamma
- Internal: `research/product-funnel-audit.md` (launch code read only; Whop affiliate and checkout behaviour), `research/creative-assets.md` (film states and v14 blockers), `research/paid-acquisition.md` (boost floors, kill rules), `research/audience-positioning.md` (ICP order).

**Unverified items this plan depends on (check before relying on them):**
- the Whop Content Rewards minimum and fee
- ManyChat's TikTok eligibility for a Bosnian business
- Instagram's 5-bio-link rule
- TikTok bio-link rules by country
- Spark and partnership ad availability and billing from Bosnia and Herzegovina
- micro-creator market rates
- the ManyChat Pro price
- FTC, EU UCPD and TikTok branded-content rules, read at the primary source
- the timing of EU AI Act Art. 50(2)

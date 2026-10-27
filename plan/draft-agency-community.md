# Makeborne 90-day growth plan: the agency and freelancer wedge

> **Superseded draft (kept for reference).** This was one of three competing drafts written on 26 Oct 2026 for a Mon 26 Oct launch. The plan of record is `plan/strategy.md`, and the dated plan is Today (`data/calendar.json`): the public launch is **Thu 29 Oct 2026 at 21:00 CET** (day 1) and day 90 is Tue 26 Jan 2027. Dates, day numbers and prices below are the draft's and are not updated.

**Draft angle:** B2B wedge through agencies and freelancers. LinkedIn and X build-in-public, Reddit and communities, client review links as a viral loop, an affiliate program for agency owners and YouTubers, templates and case studies.

**Window:** Monday 26 October 2026 (paid beta launch, day 0) to Sunday 24 January 2027 (day 90).
**Budget:** $1,000 cash, plus founder time and credits.
**Status:** draft for owner review. Nothing here has been posted, bought or sent.

**Labels used throughout**
- **[V]** verified on a primary or official page (date given in Sources)
- **[S]** secondary source
- **[E]** my estimate
- **[A]** assumption that has to be measured
- **[O]** owner decision

---

## 0. The plan on one page

1. **Who we sell to first.** Freelancers and small agencies that build websites for clients, sold on **Studio ($49)**. What is live today fits them best: unlimited hosted client sites on one plan, client review links that clients can comment on and approve with no account, a CRM with a local-business lead finder, and source or GitHub export. Decks and books are the upsell: "the site, the pitch deck and the client guide, from one brief."
2. **What we say.** *"The AI studio for client work. Build it. Send the link. Get the yes."*
3. **How we grow.** The founder posts on LinkedIn and X every day. We help in agency communities and never spam them. A partner program pays agency owners and YouTubers 20–30% recurring for 12 months. Everything a customer sends to a client carries a measurable "Made with / Reviewed with Makeborne" mark, which turns the agency's own clients and peers into the loop.
4. **What the $1,000 buys.** It is not enough to buy growth: at the $50–200 paid CAC the benchmarks suggest, it buys about 5–20 customers. It is used to **find the 2–3 creators and formats that turn into paying customers at under $50 each**, and then revenue pays for scaling them. Exact split in §5.
5. **Honest outlook (estimates, §10).**
   - Low: about $65k ARR at day 90.
   - Base: about $360k ARR.
   - $1M ARR (about $83.3k MRR, about 1,900–2,000 active subscribers): needs about 150k qualified visitors, a 1.5% visit-to-paid rate, a Studio-heavy plan mix and at least one breakout content or partner event.
   - No comparable company reached $1M ARR in 3 months from a cold start with no audience and no free tier (research/case-studies-ai-builders.md).
6. **What has to ship before anything is amplified (engineering, §6):**
   - attribution plumbing (UTM and referral codes carried into Whop checkout metadata)
   - a daily AI spending limit that rises with paid sign-ups
   - three copy fixes
   - a link and CTA on the client review page
   - Whop custom affiliates with `affiliate_code` passed through

---

## 1. Ground rules for every piece of marketing

**May be promoted today:**
- AI websites published on a Makeborne address
- AI books (on-screen PDF)
- AI presentations (PDF or editable PPTX with native charts and speaker notes)
- client review links (anonymous comments, approve or request changes)
- the basic CRM and lead finder
- manual GitHub export
- the projects library
- the billing promises: maximum cost shown first, errors cost nothing, credits carry over two months, cancel any time, full refund until credits are used

**Never promote as available. Each one is a later launch beat, announced only on the day it is live:**
- generated images in sites, decks and books
- credit top-ups
- custom domains
- automatic two-way GitHub sync
- agency tools (white label and the wider agency workflow)
- AI lead research

**Do not say:**
- "free", "free trial" or "start free" (the v14 end card says "Start free" and must be changed before any use)
- "print-ready" or "KDP-ready" books
- "email outreach" as a headline
- "white label" or "your domain"
- "better or faster than Lovable, Gamma or Framer" (no blind evaluation has run yet, and EU comparative-advertising rules require verifiable claims)
- the names of the underlying AI model vendors

**Never put in public copy:** "Base44 hit $1M ARR in 3 weeks". It comes only from Lenny's paywalled episode description, not from founder data [S, Lenny's 6 Jul 2025].

**Creative honesty:**
- The v14 reference generations (the `sheet_v14.jpg` look) are **brand art** and the quality target for the images beat. They are not product output today and must not be shown as such.
- Product proof is real UI and real output: typography-led sites and decks, or the customer's own photos.
- Every on-screen time is a real, measured run. Compressed time is labelled "sped up".

**Disclosure:** every paid creator or affiliate post carries #ad or the platform's paid-partnership label (FTC and EU UCPD; platform branded-content tools).

**Tracking:**
- No ad pixels until an EU consent banner is live.
- Under EDPB Guidelines 2/2023 v2.0, tracking links (affiliate links are the named example) can fall under ePrivacy Art. 5(3) too [V, EDPB, adopted 7 Oct 2024]. Get a short legal check on the `?a=` and `?ref=` handling before pushing EU traffic. Until then, keep the first-party counter aggregate-only.

---

## 2. Target ICP order

| # | ICP | Why this order | Plan to lead with | Start |
|---|---|---|---|---|
| **1** | **Freelance web designers and small studios (1–10 people)** who sell sites and care plans to local businesses, plus the "AI agency" side-hustle crowd | Strongest pain (revision rounds, per-site tool bills, winning clients) and highest willingness to pay. The live product covers their workflow end to end. They show work to clients, so every project touches non-users. Score 26/25 in research/audience-positioning.md §3.1 [E]. | **Studio $49** ("best for client work"), Scale $99 for studios | Day 0 |
| **2** | **Agency owners who also need decks and proposals:** marketing agencies, consultants, fractional CMOs | Decks are live and editable in PowerPoint, and the search pool is large: "ai presentation maker" 14.8k/mo, "pitch deck" 14.8k (US) [S, Google Ads buckets, see audience report] | Studio, or Create $20 | Day 0, as the second message |
| **3** | **YouTube and TikTok educators** who teach "sell websites to local businesses", "start a web design agency" or AI tool reviews | Not buyers so much as the **distribution layer** for ICP 1: affiliates and creators | Comped Studio plus a partner deal | Week 1 recruiting |
| **4** | **Coaches, creators and authors** (books as lead magnets and client guides) | Books are live, but without images until the images beat | Create $20 | Images beat (weeks 2–3) |
| **5** | **Small business owners (DIY)** | Need a custom domain. Wix, Durable and Hostinger offer domains at $0–25. They arrive *through* the agency loop (badge and review pages) more than directly. | Create $20 | Custom-domains beat |
| — | Educators and students | Need an education price decision [O] | — | Not in this 90-day plan |

**Who is not targeted:** app builders who need logins and databases. That is Lovable and Base44 territory, and Makeborne has no app backend. Say so openly, because it builds trust.

**Rescore the ICPs** after 20 customer calls and the first 200 sales.

---

## 3. Positioning and messaging

### 3.1 Category and statement

**Category:** *the AI studio for client work.* Not "AI app builder", where Lovable and Base44 lead, and not "website builder", which is Wix and Hostinger's price war.

**Statement (internal):** For freelancers and small agencies who make things for clients, Makeborne turns one brief into a website, a deck and a book in one brand, and gives the client a link to comment and approve. Unlike Lovable or Base44, which build apps, or Gamma, which builds decks, Makeborne covers the whole client deliverable and the approval, with unlimited hosted sites on one plan.

### 3.2 Message house

| Pillar | Say (true today) | Proof to show |
|---|---|---|
| **Win before the call** | "Send your client a real website before the first call." "Find local businesses with weak sites, build them something better, track every follow-up." | 45 s screen recording: lead finder, demo site, review link (real timer) |
| **Approval without email chaos** | "Your client comments on the live site. No account, no screenshots, no email threads." "Approve this version, from their phone." | A public **sample review link** where the visitor plays the client; a vertical phone clip of the approval |
| **One plan, many clients** | "Unlimited client sites on one $49 plan." (Fair use: 50 new a day, 1,000 live per workspace.) | Stack calculator: Markup.io from $79/mo [V], HoneyBook $29–109/mo [V], Framer $10–30 per site per month [V], against Studio $49 |
| **More revenue per client** | "The site, the pitch deck and the client guide, from one brief, in one brand." | One brief, three outputs, one 30 s video |
| **You own it, honest billing** | "Download the source any time. Export to GitHub." "The most a request can cost is shown before it starts. Errors cost nothing. Refundable in full until you use a credit." | Export clip; the pricing promises in plain words |

### 3.3 Lines to test (one per variant, tracked through utm_content)

1. "Build it. Send the link. Get the yes."
2. "Send a real website before the first call."
3. "Your client approves from their phone. No account. No screenshots."
4. "Unlimited client sites on one plan."
5. "The site, the deck and the client guide. One brief. One brand."
6. Founder line: "I'm building an AI studio for client work from Sarajevo with $1,000. Here's day N."

### 3.4 Homepage message match

- Agency traffic (`utm_medium` of creator, affiliate, linkedin or community) lands on hero A: *"Send your client a real website before the first call."*
- Subhead: *"Makeborne builds the site, the deck and the book from one brief, then gives your client a link to comment and approve. From $20 a month + tax, refundable until you use credits."*
- Show the sample review link and a 45 s real build above the fold.
- Variants are picked from the UTM on the server. No client-side A/B tool and no new cookies.

### 3.5 Objections to answer everywhere

| Objection | Answer |
|---|---|
| "No free trial?" | "Here's exactly what you get: real, unedited sites, decks and books with the brief and credits used. Play the client on our sample review link. And you're refundable in full until you use a credit." |
| "Will my client see your brand?" | "Your client sees your work and a simple review page with no account needed." Only add badge-removal wording once it is confirmed for promotion [O]. |
| "No custom domain?" | "Coming in days. Demos and approvals don't need one, and you can download the source." |
| "Why not Lovable?" | "Lovable is great for apps with logins. Makeborne is for client deliverables: the site, the deck, the book, and the client's approval." |

---

## 4. Channels and weekly cadence

The founder account is the channel; company pages reach few people [E]. Every link carries a UTM (scheme in §11).

| Channel | Role in the wedge | Weekly cadence (from week 1) | Daily engagement | Time per week [E] |
|---|---|---|---|---|
| **LinkedIn (founder)** | Main channel for agency owners. Base44's founder grew through daily LinkedIn posting [S, Lenny's 6 Jul 2025; founder LinkedIn post, Mar 2025]. Gamma reports LinkedIn converts 4–5× better than its other platforms [S, case-studies-adjacent]. | **5 posts** (Mon–Fri): 2 carousels built in Makeborne (PDF document posts with a "Made with Makeborne" end slide), 1 native vertical video, 1 build-in-public numbers post, 1 client-workflow story. Post at 08:30 CET (EU) or 15:30 CET (US East morning); alternate weekly and keep the better slot. | 15–20 thoughtful comments on agency-owner, web-designer and freelancer posts | 8–10 h |
| **X (founder)** | Build in public, AI-builder circles, amplifier for launch beats | **7–14 posts**: real-time builds, side-by-sides, weekly MRR, generous competitor notes. Link in the first reply [E]. | 20–30 replies on AI-builder, Framer, Webflow and design posts | 6–8 h |
| **Reddit** | Founder stories that follow each subreddit's rules; help answers | **1–2 posts** across different subreddits, never the same text; check the sidebar by hand first. Comment-only help in r/freelance, r/smallbusiness, r/web_design. | 3–5 helpful comments, with no links where links are banned | 2–3 h |
| **Indie Hackers** | Revenue transparency; founders and freelancers | 1 weekly update with real numbers | Reply to every comment | 1 h |
| **Agency communities** (Skool: Agency World, RC Agency Owners & Freelancers, AI Freelancers; Slack: No Code Founders, Fractionals United; Discord: Freelance Marketplace) [S, Hive Index sizes] | Trust and workshops | Contribute for 1–2 weeks before sharing anything. Then **1 live workshop every 2 weeks**, "Build a client site and approval loop in 20 minutes", as a demo with no pitch. Post only in show-and-tell channels. | 2 contributions a day | 3–4 h |
| **Short-form video** (TikTok, Reels, Shorts, LinkedIn native) | Proof of the product working; reach beyond the founder's network | **7–10 posts a week** on the brand accounts (TikTok 13:00 and 21:00 Sarajevo [S]); each idea in a 25–35 s cut and a 60–150 s cut | Reply to comments with video replies | 6–8 h |
| **YouTube long-form** (from week 3) | Search intent: "Lovable alternative for client websites", "AI website builder for freelancers", "how to get web design clients with AI" | **1 tutorial a week**, 8–15 min screen recording | — | 4 h |
| **Partner and affiliate program** | Agency owners and YouTubers sell for us on commission | Recruit 5 creators a week in weeks 1–4, then support active partners | Partner channel in the community | 3 h |
| **Customer community** (Whop chat or Discord) | Support, a #showcase of client work, referral asks, case-study pipeline | Weekly "client win of the week" | Answer within 2 h during CET working hours | 3 h |
| **Email to customers** | Activation, referrals, launch beats | 1 changelog email a week, plus one per launch beat | — | 1 h |
| **SEO, comparison and LLM pages** | 5 comparison pages and 9 growth guides already exist; add agency pages | 1 new page a week (list in §6, item 13) | — | 2 h |
| **Product Hunt** | Spike and proof, not the engine | Coming-soon page today. **Main launch at the images beat.** Optional second launch at the agency-tools beat (relaunches are allowed for significant iterations [V, Product Hunt launch guide]). | Daily engagement from the founder's account until launch | — |
| **AI directories** | Backlinks and trickle traffic | Week 1: TAAFT first (if no other listing exists yet), then Uneed, Fazier and the free directories | — | 2 h once |

**Founder time** on marketing and support is the main constraint. Bolt's founder spent about 95% of his day on support after launch [S]. Decide now who answers support in week 1 [O].

---

## 5. The exact $1,000 allocation

**Principles**
- No cold paid acquisition. Meta SaaS benchmarks of about $27 CPM and $2.02 CPC [S], and Google CPCs of $22.55 for "ai website builder" (US) [S], buy 44–500 visits. Meta needs about 50 events a week to optimise, and there is no pixel yet.
- Money goes to **creators who show the agency workflow**, to **boosting posts that already won organically**, and to a few **cheap, time-sensitive listings**.
- Comped creator accounts and referral credits cost provider credits, not budget cash. Estimate: about $14–23 of provider cost per comped Studio month at 60–100% use, so about $120–200 in total for 8 creators [E].

| # | Line item | Amount | When | Detail | Kill rule | Scale rule |
|---|---|---|---|---|---|---|
| 1 | **Agency creator wave 1:** 6 micro-creators (2k–50k followers): 3 LinkedIn voices (agency owners, freelance web designers), 2 TikTok or YouTube "sell websites to local businesses" educators, 1 deck or proposal creator | **$300** (6 × $50 flat) | Book days 2–6; posts in days 7–20 | Each gets a comped Studio account, a one-page brief (true claims only, disclosure required, no AI vendor names), a unique `?a=` code and UTM link, and a 20-minute onboarding call with the founder (Gamma's founder onboarded every early creator personally [S]). They must show a **real build and a client review link** on screen, and grant 60 days of partnership-ad rights. The $50 rate is an **unsourced assumption** [A]; if real rates are higher, hire 4 at $75. | Do not rehire a creator whose post brings 0 paid customers after 14 days. | ≥2 net paid customers per $50, or a post at ≥3× their median views: rehire at up to 2× the fee from line 9 (reserve) or from revenue, and move them to the 30% partner rate. |
| 2 | **Creator wave 2 (visual):** 2 creators showing image-led client sites and decks | **$150** (2 × $75) | **Only after generated images are live and quality-checked in production** (expected weeks 2–3) | Same terms as wave 1. The brief is the images beat: a client site and its pitch deck with images. | If images slip past week 6, release this money to line 4. | As line 1. |
| 3 | **Whop Content Rewards pilot:** agency-workflow clips | **$150** | Weeks 2–4 | $1.50 per 1,000 views for clips, $3 per 1,000 for original UGC ("I built my client's site and got it approved in 10 minutes"); $3 minimum payout; $50 cap per video. Supply the v9 flyover (new end card), and real recordings of lead finder, site, review link and approval. Rules: real build on screen, "Makeborne" named, tracked link only, #ad, no vendor names, no features that aren't live. [V, Whop Content Rewards docs; rates are E] | If Whop requires a minimum above $150 (sources disagree [S]), skip and move the money to line 4. Stop at $75 spent if approved views are under 30k or there are no tracked sales. | Winning hooks go into the brand's own video schedule and into line 4 boosts. |
| 4 | **Boost proven organic winners** | **$150** | From week 2, only for posts that qualify | Qualify: ≥3× the account's median views, a ≥25% 3-second hold, and a strong comment signal. Use Meta partnership ads ($15–25 a day for 3–4 days) or TikTok Spark Ads (about $50 a day for 2 days, the platform minimum [S]). LinkedIn boosts only for a carousel that brought tracked sales. Target the US, UK, CA, AU, IE, NZ, DACH, the Nordics and Benelux. UTM landing links; no retargeting. | Kill a boost at $30–50 if link CTR is under 0.5% or CPC is over $2. | Raise budgets by 20–30% at most every 48–72 h while CAC stays ≤ $50. |
| 5 | **TAAFT listing** (There's An AI For That) | **$49** | Day 0, as the first listing | Lean listing. The $437 bundle (with the $300 launch-first PPC bonus [V, TAAFT get-featured page]) is not justified for an agency wedge, so launch-first ordering matters only if the owner upgrades. Check TAAFT's terms before creating any other listing that day. | — | — |
| 6 | **Uneed** pick-your-date launch | **$29.99** | Book in week 1 for a date in weeks 3–4 (after the images beat) | Backlink and maker audience | — | — |
| 7 | **Fazier** launch | **$29.00** | Week 1 booking, week 4–5 slot | Backlink and maker audience | — | — |
| 8 | **Agency newsletter or Skool community sponsorship test** | **$60** | Weeks 4–6 | One small agency or web-design newsletter or community post with a verified audience (ask for open rate and audience country before paying). A tracked UTM and code is required. | Kill if it brings 0 checkouts opened. | If CAC ≤ $50, repeat from revenue. |
| 9 | **Reserve** | **$82.01** | Released only by the scale rule | Rehire the best creator, extend the best partnership ad, or defend the brand on Google ("makeborne" exact match) only if a competitor or affiliate starts bidding on it. | Unspent at day 60: move it to the best channel. | — |
| | **Total** | **$1,000.00** | | | | |

**Rules across all lines**
- **Target CAC:** ≤ $50 per net paying customer, about 1.5 months of Studio contribution or 3.7 months of Create contribution at 60% credit use [E, research/product-funnel-audit.md §8.2]. **Hard ceiling: $120.**
- **Kill a source** at $100 spent with 0 net paying customers, or at $150 with 1.
- **Pause a source** if more than 30% of its buyers refund within 14 days. That is a sign it attracts the wrong buyer or promises something that isn't live.
- **Judge on** UTM- and code-tracked Whop sales, net of refunds. Never on views alone: Cluely's 49M-view video reportedly produced fewer than 100 downloads [S].
- **Reinvestment rule [O]:** from week 3, reinvest up to 30% of the previous week's net new revenue into channels with a proven CAC of $50 or less. This money is outside the $1,000. The $1,000 proves the unit; revenue scales it.

---

## 6. Product growth changes for engineering (ranked)

Effort: XS under half a day, S 1–2 days, M 3–7 days (one developer).

| Rank | Change | Why, for the agency wedge | Effort | Needed by |
|---|---|---|---|---|
| **1** | **Attribution plumbing.** The counter aggregates `utm_source`, `utm_medium`, `utm_campaign`, an allow-listed referrer host and whether a referral code is present. The source is carried through sign-up in the URL (as the brief and plan already are) and first touch is stored on the account. `mb_src`, `mb_campaign` and `mb_aff` go into Whop checkout metadata. Help and comparison pages are counted one by one. | Without it no creator can be paid fairly and no line in §5 can be judged | S | **Day 3**, before any money is spent |
| **2** | **Daily AI limit that scales with paid sign-ups,** plus honest queue messages | The AI daily limit must scale with paid sign-ups (a first website build costs about $0.93 of provider cost) [E, funnel audit §8.1]. A creator spike would stall people who just paid, at their first build. | XS / S | Day 2, and before every push |
| **3** | **Copy accuracy:** live product copy matches what ships at launch (list in the owner's private notes); every coming feature labelled "coming soon" | Overpromising to paid traffic leads to refunds, $15 disputes and EU consumer-law risk | XS | Day 1 |
| **4** | **Review-page loop.** After the client sends a decision, show a subtle "Review powered by Makeborne: make client work like this" link with `utm_source=review_page`, `utm_campaign=<project>` and the agency's referral code. Add a UTM and code to the portal's "Powered by Makeborne" footer and the GitHub README link. | **This is the core viral loop of the wedge.** Every agency's client, and everyone the client forwards the link to, sees Makeborne at the moment of approval. It is measurable once item 1 ships. Studio and Scale customers may switch it off when white label ships [O]. | S | Week 1 |
| **5** | **Partner and affiliate program on Whop custom affiliates.** Links go to `makeborne.com/?a=<code>`. Makeborne passes `affiliate_code` on the checkout it creates. Prove it in the Whop sandbox, then with one live internal purchase and refund (the sandbox has no payouts [V, Whop sandbox docs]). **Do not list on Whop's open affiliate network**: only Makeborne-created checkout links are used. | YouTubers and agency owners sell on commission; budget is spent only on sales | S–M | Week 2 |
| **6** | **Customer referral credits plus a member rate.** The invitee gets +100 credits on the first paid month. The referrer gets +100 credits once that payment clears and is not refunded. Agencies referring agencies can optionally earn the Whop member rate instead [O]. | Agencies know other freelancers. Cost is at most about $6 of provider cost per converted referral [E]. | M | Week 4 |
| **7** | **"Made by [Agency] with Makeborne" badge and partner directory (proposal).** The published-site badge carries a UTM and the site owner's code, and can optionally credit the agency. A click opens a small page: "This site was made by [Agency] with Makeborne. Hire [Agency] · Make your own." | Gives agencies a reason to **keep** the badge on (it sends them leads) instead of removing it. Today any paid customer can remove it, and there is no free tier to carry it. Turns the client's own site visitors into leads for agencies and brand reach for Makeborne. | M | Week 6 (custom-domains beat, when client sites go live on real domains) |
| **8** | **Public sample review link** ("play the client"): a demo project the visitor can comment on and approve | The best substitute for a free trial in this wedge: the visitor experiences the client side at no AI cost | S | Week 1 |
| **9** | **Homepage agency proof:** 3–6 real published examples (site, deck, book), a 45 s real build, "from $20/month + tax, refundable until you use credits", client approval near the top, and the UTM-matched hero (§3.4) | Cold visitors meet the paywall before the aha moment | S | Week 1 |
| **10** | **Agency template packs as brief seeds:** "10 local trades" (bakery, dentist, plumber, gym, salon, restaurant, physio, real estate, law office, café), "proposal deck", "client welcome guide (book)", "case-study deck". Each is a "Make one like this" link. | Templates are shareable content and lower the blank-page problem after payment | S | Week 2, then one pack a week |
| **11** | **"Use my brief" links:** a short link that opens the composer with a creator's exact brief and their code | Every creator and founder video ends with "try my exact brief" | S | Week 2 |
| **12** | **Share and case-study prompt after a client approves:** "Client approved. Share the win?" with prefilled LinkedIn and X text plus a link, and a "Feature us as a case study" opt-in | Turns the happiest moment into distribution and fills the case-study pipeline with consent | S | Week 3 |
| **13** | **Agency SEO pages:** "AI website builder for freelancers", "Website feedback and approval tool for agencies" ("website feedback tool" has 390/mo US at a $21.15 CPC [S]), "CRM for freelance web designers", "How to get web design clients" (210/mo [S]), "Lovable alternative for client work", and an agency stack calculator | Captures search intent that paid search can't afford at this budget | S each | One a week from week 2 |
| **14** | **Public share or present links for decks and books** with a "Made with Makeborne: make your own" end card, on by default for personal work and removable [O] | Gamma's main loop. Agencies' proposal decks are seen by prospects. | M | Week 5–6 |
| **15** | **Opt-in showcase gallery** of real client work (with the client's consent), each item an indexable page with "Make one like this" | Proof, SEO pages and a remix loop | M | Week 6–8 |
| **16** | **Faster sign-up:** make sure Google sign-in is on in production; consider a code-only sign-up instead of the 12-character password | Removes a known drop-off step | S | Week 2 |
| **17** | **Lifecycle emails:** welcome; first build done; "send your first review link"; weekly "your client sites had N visitors" | Activation is "a review link sent", not "signed up" | M | Week 3–4 |
| **18** | **In-app upgrade (Create to Studio)** and, when live, credit top-ups | Agencies that land more clients expand. That moves ARR without new acquisition. | M | With the top-ups beat |

**Launch beats (each announced only on the day it is live):**
- generated images
- credit top-ups
- **custom domains** (the biggest agency beat: client sites go live on the client's domain)
- automatic two-way GitHub sync
- **agency tools** (second big agency beat)
- AI lead research

Each beat gets a demo video, a founder post on LinkedIn and X, a changelog entry, an email to members and a refreshed creator kit.

---

## 7. Launch week, day by day

Sarajevo is on CET (UTC+1) since 25 Oct. US clocks change on **Sunday 1 Nov**. Product Hunt's 12:01 am Pacific is 08:01 Sarajevo before 1 Nov and 09:01 from 1 Nov [V].

### Day 0: Monday 26 Oct (launch)

- **Before posting:**
  - raise the AI daily limit (item 2)
  - ship the copy fixes (item 3)
  - put a paid-truthful end card on the v9 flyover: "Make yours at makeborne.com · from $20/mo + tax · refundable until you use credits"
- **Submit TAAFT ($49) first**, as the first directory listing.
- Create the UTM sheet and one Whop tracking link per channel.
- **Posts:**
  - LinkedIn founder launch post: "Today I'm launching Makeborne from Sarajevo, the AI studio for client work. One brief, a site, a deck and a book, and a link your client can approve." Use the v9 9:16 film.
  - X launch thread, link in the first reply.
  - Indie Hackers launch post ("Launched paid-only, no free tier, a deliberate bet").
  - r/SideProject post after reading its rules: a GIF of brief, site and review link, with honest numbers.
- Create the Product Hunt coming-soon page after the TAAFT listing is live (if the owner chooses the $437 bundle, first confirm whether a coming-soon page counts as "another platform" under TAAFT's launch-first terms).
- Open the customer community channel with #showcase, #feedback and #partners.
- **Onboard every buyer personally:** a short message offering a 15-minute call. Goal: video calls with the first 5–10 payers in week 1, and every problem they hit fixed within 24 h (the Base44 first-users method [S]).

### Day 1: Tuesday 27 Oct

- Record 4–6 real-speed screen recordings at 2× UI scale:
  1. lead finder, demo site and review link
  2. client comment, fix and Approve, on a phone
  3. one brief to a site, a deck and a book
  4. GitHub export
  5. a chat edit
- Post recording 1 as a LinkedIn native video and a TikTok/Reel.
- Join 5–8 agency communities (contribute only; no links).
- Build the creator shortlist: 20 candidates across LinkedIn agency voices, YouTube "web design business" and "AI agency" educators, and deck creators. Check audience country and authenticity.

### Day 2: Wednesday 28 Oct

- "Reply with your business and I'll build its site" post on LinkedIn and X. Build 10–20 real demo sites, only for people who ask in the replies, using only public information. Reply with each live link and a review link. **Do not publish anything under a real business name without that person's request or consent.**
- Ship the sample review link (item 8) if it is ready.
- First creator invitations go out (the founder sends them; one-to-one).

### Day 3: Thursday 29 Oct

- **Attribution plumbing must be live today** (item 1). No paid line starts before it.
- LinkedIn carousel built in Makeborne: "What a 3-page client site costs: by hand vs with AI" (honest numbers, with a "Made with Makeborne" end slide).
- Book the Uneed and Fazier dates for weeks 3–5.
- Submit to the free directories: AlternativeTo (as an alternative to Lovable, Gamma, Framer and Wix), SaaSHub, Future Tools, Microlaunch.

### Day 4: Friday 30 Oct

- **First build-in-public numbers post** on LinkedIn, X and Indie Hackers: real Whop numbers (subscribers, refunds, builds), with buyer names and emails cropped out.
- Recap the customer calls: the 3 biggest problems and what was fixed today.
- Sign the first 2–3 creators. Hold their onboarding calls and send the brand kit.

### Day 5: Saturday 31 Oct

- r/webdev Showoff Saturday post, if the rules allow it: lead with GitHub export and output quality, never "AI replaces developers".
- Batch-record next week's 8–10 short videos.

### Day 6: Sunday 1 Nov (US clocks change)

- **Weekly review:**
  - scorecard (§9)
  - re-cut the top 10% of videos with new hooks; retire the bottom 50% of formats
  - pick the images-beat Product Hunt date: Tuesday to Thursday with 400+ committed supporters, otherwise Saturday or Sunday [V/E, platforms report]
- Decide on the creator wave-1 lineup.

**Week-1 targets (base):**
- 25–60 paying subscribers
- visit-to-paid of at least 0.8%
- at least 80% of payers run a first build within 10 minutes (90% from week 2)
- refunds at or below 10%
- 7 LinkedIn and 14 X posts published
- 5 customer calls held
- attribution live by day 3

---

## 8. Weeks 2–13 by phase

### Phase 1: Proof and the images beat (weeks 2–4, 2–22 Nov)

**Goal:** prove that agencies convert and get value; land the first spike.

- **Images beat (expected days 5–14, only once live and quality-checked):**
  - raise the AI limit first
  - main Product Hunt launch from the founder's account (self-hunt; a first comment and a video; never ask for upvotes [V]). Daily #1 scores in October 2026 were 285–493 [V, live leaderboards].
  - X and LinkedIn threads
  - r/SideProject follow-up
  - Indie Hackers postmortem
  - creator wave 2 (line 2)
  - the v14 film re-cut with a paid-truthful end card: the concept-art look becomes honest once images are live, as long as every frame shown as output is real output
- **Creator wave 1** posts go live (line 1). Content Rewards pilot (line 3).
- **First 3 case studies, with consent.** Format: "Freelancer X sent 12 demo sites, won 3 clients and cut revision rounds from 4 to 1." Use real numbers only, and ask permission in writing. Publish each as a Makeborne deck (LinkedIn carousel) plus a page.
- **Template pack 1:** "10 local trades" demo briefs. Pack 2: "proposal deck and client welcome guide".
- Engineering: items 4, 5, 8–11 and 16.
- First YouTube tutorial: "How I pitch local businesses with a finished site before the first call."

### Phase 2: Turn on the loops (weeks 5–7, 23 Nov–13 Dec)

**Goal:** at least 15% of new paid customers come from loops (referral, affiliate, review page, badge).

- Referral credits live (item 6). Affiliate program opened to the public at the public rate (§12).
- **Custom-domains beat** (when live). This is the biggest agency story: "Client sites now go live on the client's own domain." It unlocks ICP 5 through the agencies. Push it on LinkedIn, in the communities and in a workshop, and launch the badge and partner directory (item 7).
- **Black Friday (Fri 27 Nov) and Cyber Monday (30 Nov):** no fake scarcity and no countdowns. Options [O]: (a) none; (b) bonus credits on yearly Studio purchased that week; (c) "agency starter kit" content (templates plus a workshop). Yearly is already 20% off all year. Expect Q4 ad costs to rise, so do not boost cold that week.
- Uneed and Fazier launches. Agency newsletter test (line 8).
- Workshops in two agency communities.

### Phase 3: Agency tools and pipeline season (weeks 8–10, 14 Dec–3 Jan)

**Goal:** expansion and retention; partners producing every week.

- **Agency-tools beat** (when live; final scope to be confirmed by engineering, planned to include white label and the wider agency workflow). Optional second Product Hunt launch as a significant iteration. The LinkedIn story: "Your brand on the review page."
- Automatic two-way GitHub sync beat, for developer-freelancers: X and r/webdev Showoff Saturday.
- Holiday angle: "Build your January pipeline in December". Use the lead finder (live) to prepare demo sites for 20 local businesses before New Year, and send each prospect a one-to-one message (GDPR and anti-spam rules apply; no blasts).
- Case studies 4–8; "Client win of the week" in the community.
- Keep 20+ active partners by now; rehire winning creators from revenue.

### Phase 4: Scale what works (weeks 11–13, 4–24 Jan 2027)

**Goal:** reach the base case or better; prepare the next quarter.

- **AI lead research beat** (when live): "Find the business, research it, build its site, send the review link."
- New Year story for local businesses, carried by agencies: "New year, new website: approved from your phone."
- Shift all surplus revenue into the 2–3 sources with a CAC of $50 or less.
- **Day-90 review (Sun 24 Jan):**
  - ARR against the scenarios
  - CAC by source
  - churn and refunds by source
  - K-factor from referrals and review pages
  - ICP rescore
  - free-trial or first-deck test decision

---

## 9. Content mix and volume

### 9.1 Weekly volume (from week 2)

| Format | Per week | Platforms | Specs |
|---|---|---|---|
| Short vertical videos | 7–10 originals, re-edited natively for each platform | TikTok, Reels, Shorts, LinkedIn native | 9:16, 1080×1920; burned-in captions; first frame is the finished output; 25–35 s and 60–150 s cuts. Socialinsider H1 2026: 120–180 s TikToks got about 10× the views of short ones, while short ones win engagement [S]. Commercial Music Library only on TikTok business accounts [V]. |
| LinkedIn carousels (PDF document posts) | 2 | LinkedIn, then Instagram as a 4:5 carousel | **Built as Makeborne decks**, 8–10 slides, 4:5 (1080×1350), with a "Made with Makeborne" end slide |
| TikTok or Instagram photo carousels | 3 | TikTok, Instagram | Real output screens: brief chip, hero, sections, phone view, review comment, CTA. Carousels drew about 81% more engagement than videos at similar reach (about 700k posts, H1 2025) [S]. |
| Static images | 3–5 | X, LinkedIn, community posts | (1) before/after split (an old site next to the Makeborne demo, only for the business owner who asked, or our own fictional brand); (2) a phone screenshot of "Approved"; (3) text-only stance statics on the cream canvas (text-only statics had the top hit rate in Motion's 2026 dataset [S]); (4) redacted Whop numbers |
| Build-in-public posts | 2–3 | LinkedIn, X, Indie Hackers | Real numbers, refunds and lessons |
| Case studies | 1 (from week 3) | Page, carousel, short video | Real customer with written consent |
| Template drop | 1 | Gallery, LinkedIn, community | A "Make one like this" link |
| YouTube tutorial | 1 (from week 3) | YouTube | 8–15 min screen recording |
| Reddit or Indie Hackers posts | 1–3 | Different subreddits | Never repeated text |
| Total | about 30–40 pieces a week | | |

### 9.2 The video library for this wedge (hooks in the first 2 seconds)

| ID | Concept | Hook | Length | Proof on screen |
|---|---|---|---|---|
| A1 | **Pitch before the call** | "I found a bakery with a 2009 website and rebuilt it before lunch." | 45 s and 2 min | Lead finder, site, review link (real timer) |
| A2 | **Approved from the phone** | The phone screen shows "Approve this version", and the thumb taps. | 15–20 s | Client view, approval, notification |
| A3 | **Feedback hell vs review link** | Split screen: a 40-message email thread vs one link with pinned comments | 25 s | Review page |
| A4 | **One brief, three deliverables** | "My client asked for a site. I sent a site, a pitch deck and a welcome guide." | 30 s | Site, PPTX opened in PowerPoint, PDF book |
| A5 | **Unlimited client sites** | A counter ticks up through the client sites in one workspace | 20 s | Projects library and the stack calculator |
| A6 | **Comment your business** speedrun | "Comment your business and I'll build its site." | 60–90 s | Done only for people who ask, with public information |
| A7 | **Day N from Sarajevo** | "Day 12 of launching an AI studio with $1,000. Here are the real numbers." | 45–90 s | Redacted Whop dashboard |
| A8 | **You own the code** | "Here's the GitHub repo of the site I built for my client." | 30 s | Export |
| A9 | **Open the PPTX, click the chart** | "It's a real chart, not a picture." | 20 s | PowerPoint |
| A10 (images beat) | **Client site and pitch deck with images** | The before frame (text only) flips to the image-led version | 30 s | Real generated output, only once it is live |

**Visual direction ("made, not generated"):**
- a cream canvas
- Inter display with one Newsreader Italic accent word
- the brand gradient only on the accent word and the Create button
- real UI, a frame that never parks, no generic AI-look clichés

**Distinct concepts:** keep 5 or more concepts in the paid rotation. Near-duplicates are treated as one concept by Meta's system [S, Biddy Andromeda post, 17 Sep 2026].

**Refresh** a creative when CTR or hook rate drops about 30%, or frequency goes above 3.

---

## 10. Honest funnel model

### 10.1 Assumptions (all [A] unless marked)

- **Target:** $1M ARR = **$83,333 MRR**.
- **Blended revenue per subscriber (MRR-equivalent):**
  - base: plan mix 45% Create, 42% Studio, 13% Scale, with 15% on yearly plans at 20% off, gives about **$41**
  - low: $36 (Create-heavy)
  - high: $44 (agency-heavy)
- **Subscribers needed** at $41: about **2,030 active**; at $44: about **1,900**.
- **Funnel stages:** visit → sign-up started → email confirmed → checkout opened → paid.
- **No benchmark exists** for a paid-only, no-trial AI builder. Older (Aug 2023) freemium benchmarks of 3–8% do not apply [S, funnel audit §8.4]. Every rate below is an estimate to be replaced with week-1 data.
- **Refunds:** 7–12% of gross paid. **Monthly churn:** 6–12%. The average subscriber is about 1.5 months old at day 90.
- **Unit economics at 60% credit use, with Whop's Billing and Tax add-ons on** [E, funnel audit §8.2]: contribution about $13.26 (Create), $32.66 (Studio) and $65.66 (Scale) a month. International cards cost another 1.5%, and currency conversion 1%.

### 10.2 Stage rates

| Stage | Low | Base | High |
|---|---|---|---|
| Visit → sign-up started | 5% | 7% | 8% |
| Sign-up → email confirmed | 70% | 75% | 80% |
| Confirmed → checkout opened | 45% | 50% | 50% |
| Checkout → paid | 45% | 46% | 47% |
| **Visit → paid** | **0.71%** | **1.21%** | **1.50%** |

### 10.3 Scenarios to day 90

| | Low | Base | High (target) |
|---|---|---|---|
| Qualified visitors over 90 days | 30,000 | 75,000 | 150,000 |
| Visitors a day, on average | 330 | 830 | 1,670 |
| Gross paid subscribers | 210 | 900 | 2,250 |
| After refunds (12% / 8% / 7%) | 185 | 828 | 2,093 |
| Active at day 90 after churn (12% / 8% / 6% a month) | ~153 | ~729 | ~1,906 |
| Blended MRR per subscriber | $36 | $41 | $44 |
| **MRR at day 90** | **~$5.5k** | **~$29.9k** | **~$83.9k** |
| **ARR at day 90** | **~$66k** | **~$359k** | **~$1.0M** |
| New paid customers a day (average) | 2–3 | 10 | 25 (peaks of 150+) |

The base case matches the case-study estimate of about $220k–440k ARR (research/case-studies-ai-builders.md §8).

### 10.4 Where base-case traffic comes from [E]

| Source | 90-day visitors |
|---|---|
| Creators and affiliates (YouTube, TikTok, LinkedIn partners) | 18,000 |
| LinkedIn founder posts | 12,000 |
| X founder posts | 8,000 |
| Reddit, Indie Hackers and agency communities | 8,000 |
| **Loops:** review pages, badge, portal, referrals, shared decks | 8,000 |
| Search, comparison pages and LLM answers | 7,000 |
| Product Hunt (images beat, plus the agency-tools relaunch) | 6,000 |
| AI directories and launch sites | 4,000 |
| Content Rewards and boosts | 4,000 |
| **Total** | **75,000** |

### 10.5 What has to be true for $1M ARR by 24 Jan 2027

1. **About 150k qualified visitors** (about 1,700 a day on average). That realistically needs **one or two breakout events**: a video or creator post above 1M views that shows the real product, or 3–5 partners who each bring 100 or more subscribers. Founder posting alone will not do it.
2. **Visit-to-paid of 1.5% or more.** That needs homepage proof, the sample review link, and probably the **usage-capped money-back** offer [O, §13]. Without a free tier, proof does the trial's job.
3. **An agency-heavy mix.** At least 45% of new paid customers on Studio or Scale, so that blended revenue per subscriber reaches about $44.
4. **Loops carry at least 25% of new paid customers by week 8.** Review-page, badge, referral and affiliate sales, measured through item 1. Without loops, traffic has to be bought, and $1,000 cannot buy it.
5. **Churn of 6% a month or less, and refunds of 7% or less.** Agencies with live client work churn less than hobbyists [A]. Activation means a review link sent in week 1.
6. **AI capacity scales with demand.** At 25 to 150 new payers a day, each building about twice on day one, provider spend runs about $50–400 a day [E, from $0.93–1.35 per first build]. Plan prices cover it; the daily limit must not block it.
7. **Launch beats land on time.** Custom domains and agency tools ship in weeks 2–8. They unlock small businesses through agencies, and give the Product Hunt relaunch.
8. **Revenue is reinvested.** About 30% of weekly net new revenue goes back into channels at a CAC of $50 or less.

**Why $1M is unlikely, honestly:**
- None of the five comparables did this from a cold start, paid-only.
- Base44 had a free tier and reached about 20k users and profitability in about two months [V, founder LinkedIn, Mar 2025]. Its jump to $100M+ ARR came with Wix marketing money [V, Wix Q2 2026 and Globes 13 May 2026, per research].
- Plan on base. Build every system so that a breakout can carry the business to high.

---

## 11. Tracking and KPIs

### 11.1 UTM and code scheme

One lowercase scheme in a shared sheet.

| Field | Values |
|---|---|
| `utm_source` | `linkedin`, `x`, `tiktok`, `instagram`, `youtube`, `reddit`, `indiehackers`, `skool`, `producthunt`, `taaft`, `review_page`, `badge`, `portal`, `github_readme`, `deck_share`, `<creator-handle>` |
| `utm_medium` | `organic_social`, `creator`, `affiliate`, `community`, `paid_social`, `directory`, `product_loop`, `email` |
| `utm_campaign` | `launch_2026-10`, `images_beat_2026-11`, `domains_beat`, `agency_tools_beat`, `bf_2026` |
| `utm_content` | creative ID (`a1-pitch-45s-v2`) |

- **Codes:** `?a=<partner>` (affiliate) and `?ref=<customer>` (referral) are both carried to checkout metadata (`mb_aff`, `mb_src`, `mb_campaign`).
- **Server-side events, joined on account ID:**
  - `landing_view`
  - `brief_started`
  - `signup_completed`
  - `email_confirmed`
  - `checkout_opened`
  - `purchase` (Whop `payment.succeeded`)
  - `refund`
  - `first_build`
  - `first_publish`
  - `review_link_sent`
  - `client_decision` (approve or request changes)
  - `referral_converted`
- **Pixels:** none until the consent banner is live. Get the legal check on tracking links (§1).

### 11.2 KPIs per stage (base targets)

| Stage | Weeks | Acquisition | Activation | Revenue | Loop | Health |
|---|---|---|---|---|---|---|
| **0. Launch** | 1 | 4,000–6,000 visits; attribution live by day 3 | ≥80% of payers build within 24 h | 25–60 paid; visit→paid ≥0.8% | Review links sent by ≥30% of payers | Refunds ≤10%; build failure rate known |
| **1. Proof** | 2–4 | 18,000 cumulative visits; 6 creators live | ≥50% of Studio payers send a review link within 7 days | 200–250 paid cumulative; Studio share ≥35%; creator CAC ≤ $50 on at least 2 creators | 3 case studies; review-page clicks measured | Refunds ≤10%; support reply < 4 h |
| **2. Loops** | 5–7 | 40,000 cumulative | Average clients per Studio workspace ≥3 [A] | 450–500 paid cumulative; MRR $15–18k | ≥15% of new paid from loops; 20 active partners | Monthly churn ≤10% |
| **3. Agency tools** | 8–10 | 58,000 cumulative | Create→Studio upgrades ≥5% a month | 700 paid cumulative; MRR $22–25k | ≥20% from loops; referral K ≥0.15 [A] | Churn ≤9% |
| **4. Scale** | 11–13 | 75,000 cumulative | — | ~900 gross, ~730 active; **MRR ~$30k (ARR ~$360k)** | ≥25% from loops | Churn ≤8%; refunds ≤8% |

**High-case checkpoints:** about 650 paid by week 4, about 1,300 by week 8, about 2,250 by week 13. If week 4 is under 300, drop the $1M expectation and optimise for the base case.

**Weekly scorecard (every Sunday):**
- visits by source
- checkouts opened
- net paid by source
- CAC by paid line
- refunds by source
- first build within 24 h
- review links sent
- client decisions
- loop share
- MRR
- churn
- top and bottom content

---

## 12. Affiliate and partner program design (recommended; [O] on every rate)

| Tier | Who | Terms | Economics on Studio [E] |
|---|---|---|---|
| **Founding partners** | The first 20 hand-picked agency owners and YouTubers | **30% recurring for 12 months**; first payment only on yearly plans (30% of $470.40 = $141.12) | $14.70/month against about $32.66 contribution at 60% use, leaving about $18 |
| **Public partners** | Anyone approved | **20% recurring for 12 months**; yearly first payment only | $9.80/month |
| **Customer referral** | Every customer | +100 credits each side when the friend's first payment clears and is not refunded | ≤ about $6 of provider cost per converted referral |
| **Member rate** (optional) | Agencies referring agencies | 20–30% as Whop member rate *instead of* credits | As above |

**For comparison:**
- Lovable pays "up to $100 per first-time subscriber" [V, lovable.dev/affiliates].
- Base44 pays a flat $100 per paid referral, with a $300 minimum payout [V, base44.com/affiliates].
- Framer pays up to 50% for 12 months [S].
- A 30% recurring rate on Studio pays about $176 over 12 months, which beats the flat $100 offers for agency-focused creators.

**Rules**
- Whop holds commissions for 30 days, and refunds inside the attribution window claw back commission [V, Whop developer guide].
- Makeborne refunds have no time limit while credits are unused. Pay out only on payments past the window that have not been refunded, or accept the small exposure [O].
- No self-referral (same account or payment method). No affiliate bidding on the "Makeborne" brand. Only first-time subscribers count.
- Disclosure is mandatory. A partner who claims features that aren't live loses commission.
- Partners need a Whop account to be paid [V]. Test creator willingness with the first 5.

**Partner kit:**
- the one-page brief and the claims allowed today
- the v9 film with the new end card
- 6 real screen recordings
- the template packs
- the sample review link
- the "use my brief" link
- an FAQ on refunds and pricing

---

## 13. Owner decisions

| # | Decision | Recommendation | Economics and notes |
|---|---|---|---|
| 1 | **Free trial or free credits** | Keep no free tier now. **Adopt a usage-capped money-back offer at once**: "Full refund within 7 days if you've used under 100 credits." It replaces "refundable until any credit is used", which ends the moment someone tries the product. | Costs at most about $3 of provider cost per refunded user, plus card fees Whop may not return. Hostinger and Gamma are reported to use similar caps (not re-verified on 26 Oct) [unverified]. Test a **free first deck** (about $0.25 of provider cost) as a later launch beat, once capacity and abuse controls exist. |
| 2 | Affiliate rates | 30%/12 months for founding partners, 20%/12 months for the public, yearly plans first payment only | §12; caps the margin risk from heavy users |
| 3 | Review-page "Powered by Makeborne" link | On by default. Removable on Studio and Scale when white label ships. | It is the core loop. Agencies may object because clients see the tool; the partner-directory badge gives them a reason to keep it. |
| 4 | Badge policy | Keep the badge on by default. Build "Made by [Agency] with Makeborne" and the partner directory. Reward keeping it on with leads, not nags. | Confirm the badge-removal wording before promoting it |
| 5 | Whop open affiliate network or marketplace listing | **No.** Custom affiliates only. | Only Makeborne-created checkout links are used |
| 6 | Daily AI limit rule | An automatic rise tied to new paid accounts, plus a manual raise before every push | Covered by plan prices |
| 7 | Black Friday | No discount theatre. Optionally, bonus credits on yearly Studio that week. | Q4 ad costs are inflated, so don't boost cold that week |
| 8 | Reinvestment | Up to 30% of weekly net new revenue into channels with a CAC of $50 or less | Outside the $1,000 |
| 9 | Consent banner timeline | Ship it before day 30, so partnership ads and pixels can optimise for purchases later | A prerequisite for any pixel or retargeting |
| 10 | Whop Tax and Billing add-ons, VAT | Confirm in the dashboard what is on, and whether Whop handles EU VAT for a seller in Bosnia and Herzegovina | Changes contribution by about 2.5% |
| 11 | "We never train on your work" promise | Adopt it if true. It is a strong trust line for agencies handling client data. | Not a published promise today |
| 12 | Who answers support in week 1 | Name a person and set a 4-hour reply target | The founder's time is the binding constraint |
| 13 | Case-study incentive | One free Studio month (credits) for a published case study with written consent | Provider cost about $14–23 |
| 14 | Education price | Not in this 90 days | — |

---

## 14. Risks

| Risk | Likelihood [E] | Impact | Mitigation |
|---|---|---|---|
| **Paywall before the aha moment** keeps visit-to-paid under 1% | High | High | Sample review link, real-output gallery, timed builds, usage-capped money-back (decision 1) |
| **AI capacity cap** fails a creator spike or launch day | Medium | Very high (refunds and public complaints) | Item 2; raise the limit before every push; honest queue messages |
| **Agencies don't want clients to see Makeborne,** which weakens the review loop | Medium | Medium | Subtle placement after the decision; the partner directory gives agencies leads; white label is planned as a paid feature |
| **Promoting features that aren't live** | Medium | High (EU consumer law, refunds, Product Hunt and Reddit backlash) | §1 rules in every brief; creators lose commission for false claims |
| **Founder burnout** (marketing plus support) | High | High | Batch recording; a named support owner; cut X replies before cutting LinkedIn |
| **Affiliate attribution breaks** (`affiliate_code` behaviour unproven; refunds outside Whop's window) | Medium | Medium | Sandbox plus a live internal test before inviting creators; pay only on payments past the window |
| **Reddit and community bans** for self-promotion | Medium | Low–medium | Read sidebars by hand; personal account with disclosure; value first; stop any community after 2 removals |
| **Creator rates higher than $50** | Medium | Low | Hire 4 at $75; commission-first offers to YouTubers |
| **Churn after spikes** (Lovable's traffic reportedly fell about 40% from its 2025 peak [unverified]) | Medium | High | Activation means a review link sent; weekly "your client sites had N visitors" emails; templates |
| **Disputes and chargebacks** at $15 each; card-network dispute ratios | Low–medium | Medium | Clear billing copy, fast refunds, the maximum cost shown first |
| **Tracking-link consent** (EDPB Art. 5(3) reading) | Medium | Medium | Legal check before EU pushes; aggregate-only counting |
| **Outreach compliance:** lead-finder prospecting misread as spam | Medium | Medium | One-to-one messages only; no "email outreach" headline; GDPR-compliant copy |
| **Q4 ad-cost inflation** | High | Low (small boost budget) | Boost only proven winners; skip Black Friday week |
| **Competitors copy client approvals** (rivals are building internal approval flows) | Medium | Medium | Move fast on case studies and the partner network: distribution is the moat |

---

## 15. Sources (accessed 26 Oct 2026 unless stated; full lists in `research/*.md`)

**Base44**
- Lenny's Newsletter, Base44 episode, 6 Jul 2025 (paywalled; claims marked unverified): https://www.lennysnewsletter.com/p/the-base44-bootstrapped-startup-success-story-maor-shlomo
- Maor Shlomo, LinkedIn post on 20k users and profitability, Mar 2025: https://www.linkedin.com/posts/maor-shlomo-1088b4144_yesterday-base44-crossed-20k-users-and-became-activity-7303077044597252098-gbXW
- SiliconANGLE, Wix acquires Base44, 18 Jun 2025: https://siliconangle.com/2025/06/18/base44-joins-wix-80m-deal-support-natural-language-software-development

**Lovable, Bolt and growth commentary**
- Elena Verna on Lenny's, Dec 2025: https://www.lennysnewsletter.com/p/the-new-ai-growth-playbook-for-2026-elena-verna
- Anton Osika transcript, Lenny's, Mar 2025: https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/anton-osika/transcript.md
- Eric Simons transcript, Lenny's, 13 Mar 2025: https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/eric-simons/transcript.md
- TechCrunch on Lovable, 11 Mar 2026: https://techcrunch.com/2026/03/11/lovable-says-it-added-100m-in-revenue-last-month-alone-with-just-146-employees/

**Gamma (older items labelled)**
- SaaStr, undated: https://www.saastr.com/gammas-ceo-why-getting-to-100m-arr-without-a-sales-team-worked-and-why-it-was-a-mistake/
- GTMnow, 14 Nov 2025: https://gtmnow.com/how-gamma-grew-to-100m-arr-and-a-2-1b-valuation/
- Gamma affiliate help page: https://help.gamma.app/en/articles/11048092-how-do-i-join-the-gamma-affiliate-program

**Whop**
- Affiliate program: https://docs.whop.com/manage-your-business/growth-marketing/affiliate-program
- Developer guide, affiliates: https://docs.whop.com/developer/guides/affiliates
- Create checkout configuration (`affiliate_code`, metadata): https://docs.whop.com/api-reference/checkout-configurations/create-checkout-configuration
- Fees: https://docs.whop.com/fees
- Sandbox: https://docs.whop.com/developer/guides/sandbox
- Content Rewards: https://docs.whop.com/memberships-and-access/third-party-apps/content-rewards.md
- Tracking links: https://docs.whop.com/manage-your-business/growth-marketing/tracking-links.md

**Competitor affiliate programs**
- Lovable: https://lovable.dev/affiliates
- Base44: https://base44.com/affiliates

**Product Hunt**
- Launch guide: https://www.producthunt.com/launch
- Before launch: https://www.producthunt.com/launch/before-launch
- Daily leaderboards for 20, 22 and 24 Oct 2026: https://www.producthunt.com/leaderboard/daily/2026/10/24

**Directories**
- TAAFT: https://theresanaiforthat.com/get-featured/

**Tools agencies pay for today**
- Markup.io pricing: https://www.markup.io/pricing
- HoneyBook pricing: https://www.honeybook.com/pricing

**Platform and posting data**
- Buffer, TikTok posting frequency: https://buffer.com/resources/how-often-should-you-post-on-tiktok/
- Buffer, best content format: https://buffer.com/resources/data-best-content-format-social-media/

**Consent and tracking**
- EDPB Guidelines 2/2023 v2.0 on the technical scope of ePrivacy Art. 5(3), adopted 7 Oct 2024: https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-22023-technical-scope-art-53-eprivacy-directive_en

**Internal (not public)**
- Funnel, code and cost facts come from research/product-funnel-audit.md (read-only review of the launch code; build-cost runs of 18 Oct 2026). Code locations are left out on purpose.

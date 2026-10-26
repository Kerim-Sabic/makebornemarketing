# Paid acquisition economics on $1,000

Research track for the Makeborne launch plan. Prepared 26 October 2026, launch day of the paid beta.

**Evidence labels used throughout**

| Label | Meaning |
|---|---|
| **(V)** | Verified: we opened the source page and read the figure there |
| **(S)** | Secondary: the figure comes from a search summary of the source; we did not open the page itself (often because it blocked automated access) |
| **(E)** | Our estimate, with the arithmetic shown |
| **(A)** | Assumption: a planning input that must be replaced by Makeborne's own data as soon as it exists |
| **(I)** | Makeborne internal analysis (23 October 2026 pricing and competitor teardown) |

Benchmarks are almost all published by agencies and tool vendors, not by the ad platforms. They disagree with each other, often by 2 to 4 times. Treat every benchmark below as a range. Your own numbers replace them after the first week.

---

## 1. Summary

1. **$1,000 cannot buy $1M ARR through ads. It can buy the first answers.** At a blended price of about $36.60 a month (A: 60% Create, 30% Studio, 10% Scale), $1M ARR is about **2,280 paying customers**. If the paid CAC is $200, which is what cold ads cost on the benchmarks below, that is about $455,000 of spend. At a good CAC of $50 it is still about $114,000. The $1,000 has three jobs: find the one or two angles that convert, start a creator and affiliate engine that keeps working without upfront cost, and set up tracking you can trust. (E)
2. **Base44 and Lovable did not grow through paid ads at this stage.** Base44 reached about $1M ARR three weeks after launch. Lenny's Newsletter reports it did this without spending on marketing, mainly through building in public on LinkedIn (V, summary only). A secondary account says the founder tested one influencer and Meta ads, found low ROI and went back to organic and affiliate growth (V, secondary). Lovable's growth is credited to a highly shareable product, with an implied weekly viral coefficient of about 1.24, plus about $22M of early funding: a €6.8M (about $7.5M) pre-seed in October 2024 and a $15M pre-Series A in February 2025. Lovable said it reached $17M ARR and 30,000 paying customers having spent only about $2M of the pre-seed (V, Demand Curve; TechCrunch, 25 Feb 2025). Both had **free tiers** (V, pricing pages checked 26 Oct 2026). Makeborne has none, so the loop has to come from what customers publish and share, and from creators.
3. **Cold paid traffic loses money at launch.** Meta's SaaS benchmarks run at about **$27 CPM, $2.02 CPC and 1.4% CTR** (V, Superads, July 2025 to July 2026). With a 0.4% to 2% visit-to-paid rate for a product with no free tier (E), cold Meta CAC lands at **$100 to $500, base about $200**. Google's head term "ai website builder" costs about **$22.55 per click** in the US (V, Google Ads API data via seodata.dev), so $1,000 buys only about 44 clicks.
4. **The learning phases cannot be met on this budget.** Meta needs about 50 optimisation events in 7 days (V, ppc.land). At a $200 CAC, purchase optimisation needs about **$10,000 a week**. TikTok requires more than **$50 a day per campaign and more than $20 a day per ad group** (V, TikTok Help Center, updated July 2026). Google says bid calibration takes about 50 conversions or 3 conversion cycles (V, ppc.land). Reddit practitioners suggest a **$3,000 to $5,000** test (V, EnrichLabs). None of these fit in $1,000.
5. **Creators plus boosting what already works is the best use of the money.** Creator posts cost about **$175 to $290** at market rates (S, Collabstr and Billo, 2025). Micro creators can be paid less upfront plus a recurring affiliate commission tracked by Whop. Boosting a post that already proved itself organically, through TikTok Spark Ads or Meta partnership ads, outperforms brand-handle ads. In Agentio's study of $130M of spend, partnership ads had **+19% CTR, +10% CVR and −5% CPA, at +19% CPM**, against licensed creator content (UGC) run from brands' own accounts (V, August 2026; the comparison is licensed UGC in general, not a matched test of identical creative). TikTok's older data (2020 to 2021) shows Spark Ads with **+43% CVR and +142% engagement** (S).
6. **Recommended allocation of the $1,000:**
   - **$450** for creator content with paid-usage rights. Of this, $300 goes on live features now and $150 is held for the image-generation launch beat.
   - **$300** for boosting proven organic winners only, through Spark Ads and partnership ads.
   - **$100** for a Google Search probe: brand defence on "makeborne" plus long-tail terms for decks and books.
   - **$150** as a reserve, released only by the scale rule.
   - **$0** on cold Meta or TikTok conversion campaigns, Reddit Ads, X Ads, YouTube in-stream and retargeting until consent is live.
7. **Expected outcome for the full $1,000** (E, assumptions in section 9):
   - **Low:** 1 to 3 paying customers (CAC about $350 to $1,000).
   - **Base:** about 7 to 10 paying customers (CAC about $100 to $140), roughly $3,000 to $4,000 ARR.
   - **High:** a breakout creator post produces about 60 to 80 customers (CAC about $12 to $17), roughly $26,000 to $35,000 ARR.

   The real return is the creative and audience knowledge, a bench of creators on affiliate terms, and ad assets you have the rights to use.
8. **Prerequisites before any pixel or retargeting:**
   - A consent banner (CMP) for EU, EEA, UK and Swiss visitors.
   - Google Consent Mode v2 for EEA remarketing and measurement (S).
   - A check of what Whop's own pixel forwards to ad platforms.

   Until those exist, track with **UTM links, Whop sales data and server-side events** only. A server-side event feed (the Conversions API) is not a way around consent (S).

---

## 2. Makeborne's unit economics: what a customer is worth

This section sets the CAC ceiling every later rule depends on.

**Assumptions (I, adapted to the new prices):**
- AI cost is $0.033 per credit used, which is the $0.03 provider cost plus 10% for failed work.
- Whop charges 4.2% + $0.30 per international card charge. Whop's public pricing lists 2.7% + $0.30 domestic, +1.5% for international cards and +1% for FX (I, checked 23 October 2026 at whop.com/network/pricing; re-checked 26 October 2026, V). **Correction (26 Oct):** the same page lists optional add-ons that the 4.2% does not include: Billing 0.5% per transaction, Tax and remittance 2% per transaction when tax is collected, 3DS $0.03 and Radar $0.07 per transaction, and a $15 dispute fee. If Makeborne's subscriptions use Whop Billing and Whop tax collection, fees rise to about 6.7% + $0.40, which cuts the 60%-use contribution by about $0.60 (Create), $1.33 (Studio) and $2.58 (Scale) a month, and the blended figure from $18.27 to about $17.25 (E). The CAC target and ceiling below barely move. Confirm which add-ons are switched on in the Whop account.
- Hosting costs $0.50, $2 and $6 a month, and support $2, $5 and $12 a month, for Create, Studio and Scale respectively.
- Taxes, salaries and acquisition costs are excluded.

| Plan (monthly) | Price | Contribution at 60% of credits used | Contribution at 100% used |
|---|---|---|---|
| Create, 300 credits | $20 | **$10.42 (52%)** | $6.46 (32%) |
| Studio, 750 credits | $49 | **$24.79 (51%)** | $14.89 (30%) |
| Scale, 1,550 credits | $99 | **$45.85 (46%)** | $25.39 (26%) |
| Blended (60/30/10 mix, A) | $36.60 | **$18.27 / month** | about $11.50 / month |

**Lifetime contribution per paying customer** (E). Monthly churn is not yet known. Prosumer AI tools churn fast: RevenueCat finds AI apps churn about 30% faster (S, via ppc.land).

| Monthly churn (A) | Average lifetime | Lifetime contribution (blended, 60% use) |
|---|---|---|
| 8% | 12.5 months | about $228 |
| 12% | 8.3 months | about $152 |
| 15% | 6.7 months | about $122 |

**CAC rules that follow from this** (E):
- **Target CAC is $50 or less** per paying customer. That is about a 3-month contribution payback ($18.27 × 3 = $55).
- **The hard ceiling is $120.** Above that, a source loses money at 15% churn.
- **Refunds:** customers get a full refund until they use credits. Ad-driven, low-intent buyers may refund more often. Secondary sources report that apps with a hard paywall see more refunds than freemium apps (S). Count only **net** paid customers (paid minus refunded within 14 days) in every CAC calculation.

**What $1M ARR requires** (E): $1,000,000 ÷ 12 = $83,333 MRR. At $36.60 per customer that is about 2,277 customers. Reaching that by late January 2027 means about **25 net new paying customers a day**. At a 1% visit-to-paid rate, that is about 2,500 qualified visits a day. At a paid CAC of $50 it costs about $114,000. At $200 it costs about $455,000. So nearly all of the growth has to come from organic sharing, creators and affiliates. The paid budget's job is to find out which messages move people.

---

## 3. What the companies we are compared with actually did

| Company | What is known | Label | What it means for Makeborne |
|---|---|---|---|
| **Base44** | About $1M ARR roughly 3 weeks after launch (founder's claim in Lenny's episode; not independently audited). About 250,000 users at the Wix sale, roughly 6 months in, and 10,000 users in its first 3 weeks (TechCrunch); 400,000+ users by Lenny's episode in July 2025. Growth came from building in public on LinkedIn and X, word of mouth and partnerships with Israeli tech companies, with "no money on marketing" per Lenny's summary. **Corrected:** acquired by Wix for **$80M in cash**, of which $25M was a retention bonus for the eight employees (announced 18 June 2025; Lenny calls it "over $80 million"), not "up to $80M". | V (Lenny's summary, 6 Jul 2025; TechCrunch, 18 Jun 2025; woshipm, 6 Oct 2025) | Founder-led content was the engine. It cost time, not budget. |
| **Base44** | Tried one influencer deal and Meta ads, found the ROI low, and favoured affiliate distribution plus organic growth (June 2025 review). The same article is inconsistent about whether Meta tests continued. | V (woshipm, secondary) | Paid ads did not work for them at the start either. Affiliates did. |
| **Base44 under Wix** | Wix is hiring an Influencer Marketing Lead to "build a creator engine" around Base44 across YouTube, LinkedIn, TikTok and Instagram. | S (Base44 careers page) | With money, they invest in creators, not cold ads. |
| **Lovable** | $100M ARR in about 8 months (from the November 2024 launch). About $2M of capital spent by February 2025, at 30,000 paying customers, 500,000 users and $17M ARR. Implied peak weekly viral coefficient (K) of about 1.24 (Demand Curve's own estimate, not a company figure). Funding: €6.8M (about $7.5M) pre-seed in October 2024, then a $15M pre-Series A led by Creandum in February 2025 and a $200M Series A in July 2025. | V (Demand Curve #267, 31 Jul 2025; TechCrunch, 25 Feb 2025; tech.eu, 23 Jul 2025) | The product spread itself: visual output, easy to show. Copying their list of 12 channels is survivorship bias. |
| **Lovable** | Demand Curve's advice to startups: build shareability into the product, then test 3 to 5 channels with **$3,000 to $5,000 each**. | V | $1,000 does not fund even one properly powered paid-channel test. |
| **Both** | Both have free tiers: Lovable gives 5 build credits a day, capped at 30 a month; Base44 gives 25 message credits a month. | V (lovable.dev/pricing and base44.com/pricing, 26 Oct 2026; I, competitor teardown, 23 Oct 2026) | Makeborne has no free tier, so its viral loop is smaller. See the owner decision in section 11. |

---

## 4. Channel benchmarks for 2025 and 2026

### 4.1 Meta (Facebook and Instagram)

| Metric | Value | Scope and date | Label |
|---|---|---|---|
| CPM, SaaS and cloud | about **$27.10** average (range $19.34 to $40.96) | Superads, about $3B of spend, roughly Jul 2025 to Jul 2026 (the page header gives different dates) | V |
| CPC, SaaS and cloud | about **$2.02** median (range $1.14 to $2.79); all-industry baseline about $1.05 | Superads, same period | V |
| CTR, SaaS and cloud | about **1.40%** (range 1.17% to 1.68%); all-industry baseline about 2.04% | Superads, same period | V |
| Traffic campaigns, all industries | CTR 1.93%, CPC $0.60 | WordStream/LocaliQ Facebook Benchmarks 2026, via Coupler (25 Sep 2026) | V |
| Lead campaigns, all industries | CTR 2.70%, CPC $1.80, CVR 8.54%, CPL $27.39 | Same | V |
| Earlier year | Traffic CTR 1.71%, CPC $0.70; Lead CTR 2.59%, CPC $1.92, CVR 7.72% | WordStream 2025, via martech.zone | V |
| Sales campaigns (ecommerce medians) | CPM $15.06, CTR 2.39%, CVR 1.53%, CPA $38.99 | Triple Whale 2026 data, via Coupler | V |
| CPM by country (2026 estimates) | US about $16 to $23; UK $10 to $12; Germany $8 to $10; India $1.36 to $2.70 | AdMake/Lebesgue compilation | S |
| Creative "hit rate" by format | Text-only 11.6%; product image with text 8.75%; UGC 7.56%; high-production 6.97%; animation 4.57% | Motion Creative Benchmarks 2026 (550,000+ ads, about $1.3B spend), via Coupler | V |
| Learning phase | About **50 optimisation events in 7 days** after the last significant edit. Edits to targeting, placements, event or bid, adding an ad, pauses over 7 days and large budget changes all reset it. | ppc.land explainer citing Meta Help (23 Sep 2026) | V |

**What this means for Makeborne:**
- SaaS clicks cost about twice the all-industry baseline. A cold CPC of about $2 combined with a no-free-tier conversion rate of about 1% gives a CAC of about $200 (E).
- The creative data has a direct lesson for the launch films. **High-production video had a lower hit rate than plain text and product-image ads.** Use the v9, v13 and v14 films as the payoff or end card. Do not make the polished film the whole ad. Test raw screen recordings of real builds and simple text-on-product frames as well.
- Meta's Andromeda delivery changes (2025 to 2026) reward variety in the creative itself: hooks, formats and angles, not small tweaks. They also reward simple structures with broad targeting. Practitioners suggest 3 to 6 distinct ads per test on a small budget (S, Billo and Insense).

### 4.2 TikTok, including Spark Ads

| Metric | Value | Scope and date | Label |
|---|---|---|---|
| Median CPM | **$4.08** | Focus Digital, 5,900 brands, Aug 2025 to Jul 2026 (8 Oct 2026) | V |
| Median CTR / CVR / CPA | 0.61% / 1.56% / $17.07 | Same (mostly ecommerce) | V |
| Utility Software category | CTR 0.34%, CPC $1.22 | Focus Digital B2B table, calendar 2025 | V |
| Full-year 2025 (Triple Whale) | CPM $13.26 (+16% year on year), CTR 1.77% (all clicks), CVR 2.01%, CPA $32.74 | Via Influee | S |
| Median CPC | $0.50 (vs Facebook $1.72) | Varos, March 2025 | S |
| **Minimum budgets** | Campaign **more than $50 a day**; ad group **more than $20 a day**. A lifetime ad group budget must be at least days × $20. | TikTok Ads Manager Help, updated July 2026 | V |
| Scaling limits from TikTok | Raise budgets by **no more than 40%** per change during learning and **no more than 30%** after; no more often than **every 2 days**. | Same | V |
| Learning phase | One TikTok page says about 25 results or 7 days; its FAQ treats 50 conversions as the main sign. The two pages conflict. | ppc.land (23 Sep 2026) | V |
| Spark Ads vs non-Spark in-feed ads | +30% completion, +142% engagement, +43% CVR, −4% CPM | TikTok Creative Center, data from Q4 2020 to Q2 2021 (**older data**) | S |
| How Spark codes work | The creator authorises **one post at a time** and picks a period (commonly 7, 30, 60 or 365 days). The ad runs from the creator's handle and keeps the post's organic likes and comments. | Relevant Audience, Leadsie guides | S |

**What this means for Makeborne:** TikTok's $50-a-day campaign floor means $1,000 runs one campaign for 20 days, which is too little to learn a purchase event. Use TikTok as an **organic and creator channel**. Spend only on **Spark boosts of posts that are already winning**, at just over $50 a day for 2 days per test. TikTok's floor is "more than $50" a day per campaign, so set $51 or more; a $50.00 budget may be rejected.

### 4.3 Google Search, including competitor terms

| Keyword (US, monthly) | Searches | Estimated CPC | Date | Label |
|---|---|---|---|---|
| ai website builder | 40,500 | **$22.55** | 4 Jul 2026 | V |
| website builder | 90,500 | $26.30 | 6 Jul 2026 | V |
| ai app builder | 4,400 | $13.80 | 10 May 2026 | V |
| ai presentation maker | 14,800 | **$6.44** | 11 Jul 2026 | V |
| ai powerpoint generator | 12,100 | $6.42 | 11 Jul 2026 | V |
| ai book generator | 2,900 | **$3.44** | 13 May 2026 | V |
| lovable / lovable ai | 60,500 / 27,100 | $2.41 / $3.02 | 18 Jun 2026 | V |
| gamma ai alternative | 390 | $7.18 | 27 Sep 2026 | V |
| gamma alternative | 50 | $7.01 | 27 Sep 2026 | V |
| lovable alternative | **not found** in the data we could reach | — | — | — |

These figures come from seodata.dev, which says they are Google Ads API (Keyword Planner) monthly averages for the US. Keyword Planner CPCs are bid estimates. Actual CPCs can be lower with good Quality Score and outside the US.

| All-industry search benchmark | Value | Label |
|---|---|---|
| Average CPC | **$5.42** (up from $4.66) | V (WordStream/LocaliQ 2025 data, 16,000+ campaigns, via Shopifreaks, 19 May 2026) |
| Conversion rate / cost per lead | 8.18% / $70.11 | V (same) |
| Smart bidding learning | Calibration "up to around 50 conversion events or 3 conversion cycles"; judge Target CPA over at least 30 conversions | V (ppc.land, 23 Sep 2026) |
| Remarketing audience minimum | **100 active users in the last 30 days**, on Search, Display and YouTube, for remarketing and Customer Match lists | V (ppc.land, bylined 23 Dec 2025; the article says the change was already in Google's documentation by 17 Dec 2024, so the rule dates from late 2024) |
| Competitor brand bidding | Bidding on a competitor's brand as a keyword is generally allowed. Using the trademark in ad text is restricted if the owner complains. The EU and EFTA have exceptions where Google may restrict trademark keywords. | S (BrandVerity, Benly) |

**What this means for Makeborne:**
- Head terms are out of reach. $1,000 at $22.55 is 44 clicks.
- Searchers for decks and books are cheaper ($3.44 to $7.18), and Makeborne makes all three products.
- People searching "lovable" are mostly looking for Lovable itself. At about $2.41 a click, conversion would be low (A: 0.5% to 1%), giving a CAC of $240 to $480.
- **Do not put "Lovable" in ad text.** Write "an AI builder for client websites, decks and books" instead, and keep comparisons factual and on Makeborne's own pages.
- The first job of search is **brand defence**. Once creators drive brand searches, someone has to own the "makeborne" results.

### 4.4 Reddit Ads

| Metric | Value | Label |
|---|---|---|
| CPM, tech/SaaS communities | $6 to $12 (broad Reddit $3 to $9) | V (EnrichLabs 2026, citing Stackmatix's agency compilation) |
| CPC, tech/SaaS communities | $1.50 to $4.00 (SaaS/fintech broad $3 to $5) | V (same) |
| CTR, promoted posts | about 0.3% to 1.0% | S |
| Minimums | $5 a day per ad group; $100 campaign minimum (**2023 data**) | V (ppc.land, 21 Dec 2023) |
| Suggested test | **$3,000 to $5,000 over 3 to 4 weeks** at $50 to $100 a day, with a 5 to 7 day no-edit window. Reddit recommends 14 days without changes for Max campaigns. | V (EnrichLabs; ppc.land) |

**What this means for Makeborne:** paid Reddit gets $0. Reddit is for **organic** participation by the founder: answering questions in freelancer, web-design, self-publishing and no-code communities within each subreddit's self-promotion rules. Practitioners note that a promoted post which teaches something can beat LinkedIn on CPC. Revisit once there is a proven "how I built a client site in 10 minutes" post.

### 4.5 X (Twitter) Ads

| Metric | Value | Label |
|---|---|---|
| Median CPC / CPE / CPA | $0.18 / $0.13 / $21.55 | V (EnrichLabs, about 7,000 agency accounts, via Hootsuite, 19 Sep 2025) |
| Conversion rate / engagement rate | **0.02%** / 0.59% | V (same) |
| Hootsuite's own account | CPM $2.09, CPC $0.74 | V (same) |

**What this means for Makeborne:** **Correction (26 Oct):** the 0.02% "conversion rate" cannot be a per-click rate. The same dataset's median CPA of $21.55 at a $0.18 CPC implies about 120 clicks per conversion, or roughly 0.8% per click (E), so 0.02% is most likely conversions per impression. The CPA is for whatever "conversion" each advertiser set (often sign-ups or leads, rarely SaaS purchases), across agency accounts, so it says little about a $20 to $99 subscription. X is still not funded on this budget, but the reason is unproven purchase quality and an untracked funnel, not a 0.02% rate. X is the **build-in-public** channel, as it was for Base44: daily revenue screenshots, real builds and threads. Paid X gets $0. The reserve may fund a small boost of one proven founder post.

### 4.6 YouTube

| Metric | Value | Label |
|---|---|---|
| CPM, skippable in-stream | $5 to $10 | V (Store Growers, 19 Feb 2026, citing Strike Social, inBeat and Inceptly 2024 to 2025) |
| CPV, in-stream | about $0.05 average (**2023 to 2024 data**); Shorts $0.10 to $0.30 (10-second view threshold) | V (same) |
| CTR | about 0.65% overall; in-feed 1% to 3%+; Shorts 0.1% to 0.5% | V (same; Pixability, Nov 2025) |
| Creator Partnerships Boost (paid boost of a creator's Short) | CPMs **30% lower** than Meta partnership ads for the same creative | V (Agentio via Net Influencer, 13 Aug 2026) |
| Sponsored integrations, tech channels | about **$15 to $70 per 1,000 views** (e.g. 50,000 views × $25 CPM ≈ $1,250) | S (creatorsjet, Collabpals calculator, 2026) |

**What this means for Makeborne:** in-stream ads get $0. A sponsored integration on a channel with about 10,000 views costs about $150 to $700, which a micro-creator deal can beat. If a creator's Short wins, **Creator Partnerships Boost** is the cheapest way to add paid reach on YouTube.

### 4.7 Sign-up and paid conversion for SaaS with no free tier

| Benchmark | Value | Label |
|---|---|---|
| Visitor-to-trial, opt-out trial (card required), **paid traffic** | **2.2%** (organic 2.5%) | V (Electroiq, July 2025, via shno.co) |
| Trial-to-paid, opt-out trial | 48.8% organic, about 51% paid | V (First Page Sage, 86 companies, Q1 2022 to Q3 2025, via shno.co) |
| Visitor-to-trial, opt-in trial (no card), paid traffic | 7.1% | V (Electroiq, via shno.co) |
| Trial-to-paid, opt-in trial | 18.2% | V (First Page Sage, via shno.co) |
| B2B SaaS website conversion | 1.1% to 1.2% | V (Electroiq, via shno.co) |
| Freemium free-to-paid, self-serve | "good" 3% to 5%, "great" 6% to 8% | V (Lenny's Newsletter, 1 Aug 2023, **older data**) |
| Hard paywall vs freemium (mobile apps) | Median download-to-paid **10.7% vs 2.1%**; the hard-paywall floor (4.2%) is about twice the freemium median | V (RevenueCat, 29 Apr 2026) |

**Planning rate for Makeborne paid traffic** (E). Makeborne asks for payment up front with a refund until credits are used, which is closest to an opt-out trial. Paid-traffic visitor-to-trial of 2.2% times about 50% trial-to-paid gives **about 1.1% visit-to-paid**. We plan with:
- **Low 0.4%:** cold social traffic, an unclear landing page.
- **Base 1.0%.**
- **High 2.0%:** warm creator audiences who saw a real build.

Account sign-up is free and generation needs a plan, so the in-between events are measurable: brief started, account created, checkout opened.

---

## 5. Why cold ads fail on $1,000 at launch

### 5.1 What $1,000 of cold ads would buy (E)

| Channel | Price input | Clicks for $1,000 | Paying customers (low / base / high) | CAC (low / base / high) |
|---|---|---|---|---|
| Meta cold, SaaS medians | CPC $2.02 | about 495 | 2 / 5 / 10 (0.4% / 1% / 2%) | $500 / $200 / $100 |
| TikTok cold | CPC about $1.00 (A, between $0.50 and $1.22) | about 1,000 | 2 / 5 / 10 (0.2% / 0.5% / 1%, A) | $500 / $200 / $100 |
| Google "ai website builder" (US) | CPC $22.55 | about 44 | 0 / 1 / 2 (1% / 3% / 5%) | n/a / about $750 / about $450 |
| Google decks long tail | CPC $6.44 | about 155 | 1.5 / 3 / 6 (1% / 2% / 4%) | about $650 / about $320 / about $160 |
| Google books long tail | CPC $3.44 | about 290 | 1 / 4 / 9 (0.5% / 1.5% / 3%) | about $700 / about $230 / about $115 |

Every base case is above the $120 ceiling and far above the $50 target.

### 5.2 Learning-phase arithmetic (E)

| Platform | What it needs | Weekly cost at Makeborne's likely CPA |
|---|---|---|
| Meta, purchase-optimised | 50 purchases in 7 days | $50 CPA → $2,500 a week; $200 CPA → **$10,000 a week** |
| Meta, optimised on account sign-up (proxy event) | 50 sign-ups in 7 days | at $4 to $12 per sign-up (A) → $200 to $600 a week. This also needs pixel, consent and CAPI, and the sign-up-to-paid rate is unknown. |
| TikTok | More than $50 a day per campaign; 25 to 50 results | $350+ a week for one campaign, which still will not exit learning on purchases |
| Google smart bidding | About 30 to 50 conversions | $1,000 at about $5 CPC = about 200 clicks = 4 to 10 conversions; never calibrates |
| Reddit | $3,000 to $5,000 suggested test | Not fundable |

### 5.3 Signals and tracking

There are no ad pixels today. Without a consent banner, EU visitors cannot be tracked by Meta, TikTok or Google pixels. So any cold conversion campaign would have to optimise for **link clicks**, which buys the cheapest and least interested clickers.

### 5.4 Why creators and boosts do better on the same money

- **Creators** come with audience trust and their own reach. Each post is also an ad asset you have rights to use.
- **Boosting a proven post** spends money only after the market has voted for it for free.
- **Partnership and Spark ads** optimise on the creator's follower graph plus the brand's signals. That is the likely reason they beat licensed UGC run from brand accounts (V, Agentio: +19% CTR, +10% CVR, −5% CPA, though at +19% CPM; the mechanism is our interpretation, not Agentio's finding).
- **Weak spots:** partnership ads in Instagram **Stories** had 25% higher CPA (V). Winning ads fatigued after about **36 days** on average (V).

---

## 6. Creator whitelisting: partnership ads and Spark Ads

### 6.1 How it works

| Platform | Mechanism | What Makeborne needs |
|---|---|---|
| Meta (Instagram/Facebook) | **Partnership ads**: the creator grants the brand permission and the ad runs showing both handles. Paid ads must carry the "Paid partnership" label. | The creator's approval for each post (or a standing permission); the brand's Meta ad account; payment method. |
| TikTok | **Spark Ads**: the creator turns on ad authorisation for one post, picks a period of 7 to 365 days, and sends the code. The brand adds it in Ads Manager. | One code per post. Ask for **60 days or more** so the post can be boosted after it proves itself. |
| YouTube | **Creator Partnerships Boost** for Shorts | The creator links the video; check eligibility in Google Ads. |

### 6.2 Contract terms for every creator deal

These are recommended terms. Have counsel check the template once.

1. **Fee:** a fixed fee plus a Whop affiliate link. Whop attributes a sale automatically when the checkout link carries the affiliate's ID parameter (S, Whop docs). Suggested commission is **25% to 40% recurring for 12 months** (A). This is an owner decision: at 30%, the blended contribution of $18.27 falls to about $7.30 a month for those customers.
2. **Paid-usage rights:** 60 to 90 days on Meta, TikTok and YouTube, with the Spark or partnership code delivered within 48 hours of posting.
3. **Claims:** only features that are **live today**. That means websites with publishing on a Makeborne address, books, presentations, client review links, the basic CRM and lead finder, manual GitHub export and the projects library. **Generated images, credit top-ups, custom domains, automatic two-way GitHub sync, agency tools and AI lead research are not live** and must not be shown or promised until they ship.
4. **Disclosure:** use the platform's paid-partnership or branded-content toggle plus a clear #ad, as advertising law in the creator's country requires.
5. **No model or vendor names** in the creator's script. Describe what Makeborne does, not which AI providers sit behind it.
6. **A free Studio account** for the creator. This costs Makeborne only the credits they use, about $15 to $25 of provider cost at full use (E).

---

## 7. Tracking: UTM discipline, server-side events, the Conversions API and consent

### 7.1 Where tracking stands today

- One first-party, cookieless counter.
- No ad pixels.
- Checkout runs on Whop.
- **EU, EEA, UK and Swiss visitors need opt-in consent before Meta, TikTok or Google tags fire.** This comes from the ePrivacy rules on storing or reading data on a device and from GDPR for personal data.
- Google requires Consent Mode v2 signals to keep EEA measurement, personalisation and remarketing. The requirement started in March 2024 (S, Search Engine Journal; the start date is unverified against a Google page, but Google's consent mode help page, read 26 Oct 2026, confirms the mechanism: with `ad_personalization` denied, remarketing receives no data, and `ad_user_data` is required for enhanced conversions and tag-based conversion tracking).
- A server-side feed such as Meta's Conversions API **does not avoid consent** when it sends identifiers (hashed emails, IPs) of EU users. Practitioner guidance is consistent on this (S, FlexyConsent). Not legal advice: confirm with EU privacy counsel, including how Bosnia and Herzegovina law applies to ZORBY&CO.

### 7.2 What to do now, without pixels

1. **One UTM scheme, all lowercase, no spaces, kept in a shared sheet:**
   - `utm_source`: tiktok, instagram, facebook, youtube, x, linkedin, reddit, google, newsletter, or the creator's handle for creator links.
   - `utm_medium`: organic_social, creator, paid_social, cpc, affiliate, email, community.
   - `utm_campaign`: `launch_2026-10`, `images_beat_2026-11`, `brand_search`.
   - `utm_content`: a creative ID, e.g. `c014_hook-clientsite_9x16_v2`.
   - `utm_term`: keyword or audience.
   - Every link anyone posts, including the founder's own posts, gets a UTM. A link without a UTM counts as "unattributed" and is a process failure.
2. **Store UTMs on the server.** Read UTMs from the landing URL, carry them through to sign-up, and save the **first touch and last touch on the account record on the server**. Pass the account ID or email into Whop checkout metadata. Avoid client-side storage for this unless counsel confirms it needs no consent. The simplest consent-free path is to keep UTMs in the URL until sign-up.
3. **Server-side funnel events,** all first-party and joined on account ID:
   1. `landing_view` (the existing counter)
   2. `brief_started`
   3. `signup_completed`
   4. `checkout_opened`
   5. `purchase` (Whop `payment.succeeded` webhook)
   6. `refund` (Whop)
   7. `first_credit_use`
   8. `first_publish`
   9. `review_link_shared`
4. **Creator attribution has two layers:** a creator-specific UTM link and a Whop affiliate link. Report both. They will not always agree.
5. **Weekly report by `utm_source` / `utm_campaign` / `utm_content`:**
   - visits
   - sign-ups
   - checkout opens
   - purchases
   - refunds
   - net paying customers
   - plan mix
   - net revenue
   - CAC (spend ÷ net paying customers)
   - contribution payback

### 7.3 Before turning on any pixel or retargeting (owner and Codex)

1. **A consent banner (CMP)** where rejecting is as easy as accepting. Tags load only after opt-in. Google Consent Mode v2 is configured for EEA, UK and Swiss traffic.
2. **Check Whop's own pixel and forwarding.** Whop says its pixel attributes conversions to ads and that **sales on Whop checkout are forwarded to "the ad platforms" as their standard Purchase event**. It also says not to fire your own Purchase event for those sales, because that double-counts (V, Whop docs). The docs do not name the platforms and do not mention consent. Confirm what Whop sends and whether it respects the visitor's consent before relying on it.
3. **Conversions API or Events API** for consenting users only, de-duplicated with the pixel using a shared `event_id`. Whop's docs support `event_id` de-duplication (V). Meta's training material says CAPI alongside the pixel improved CPA by about **13%** on average (S, Meta Blueprint). A 2023 agency case reported 13% better cost per result and 19% more attributed conversions (S, Brainlabs).
4. **Privacy policy and the consent text** updated to name each ad platform.

### 7.4 What retargeting needs

Retargeting needs consented pixel traffic and audiences big enough to deliver. Google requires **at least 100 active users in 30 days** (V). Meta's minimums are commonly quoted as similar, but we have not checked them.

**Makeborne rule (A):** keep retargeting at $0 until the CMP is live and at least **1,000 consented visitors in 30 days** have reached pricing or checkout. Then spend $5 to $10 a day on Meta or Instagram retargeting of pricing and checkout visitors. Use proof-led creative (a real client site and review link), cap frequency, and exclude buyers.

---

## 8. Kill and scale rules for Makeborne

Purchases will be rare in week 1, so decisions use **leading indicators first** and CAC once enough purchases exist. The thresholds below are Makeborne starting rules built from the benchmarks above (E/A). Revise them after 2 weeks of data.

### 8.1 Leading-indicator gates for organic posts, decided within 48 hours

| Signal | Threshold to call a post a winner (A) | Benchmark basis |
|---|---|---|
| Views vs the account's median | ≥ 3× the account's median views | Relative to the account, so it works for any size |
| Hook (3-second view rate, paid) | ≥ 25% | Practitioner norm (A) |
| Link CTR when boosted | ≥ 0.8% on Meta, ≥ 0.6% on TikTok | SaaS all-click CTR about 1.4% (Meta); TikTok median 0.61% |
| CPC when boosted | ≤ $1.00 social | Below the SaaS median of $2.02 |
| Landing → sign-up | ≥ 10% | (A) |
| Sign-up → checkout opened | ≥ 20% | (A) |
| Checkout opened → paid | ≥ 30% | (A) |

### 8.2 Kill rules

1. **Boost test:** spend **$30 to $50 per post** on Meta, or **2 days at just over $50** on TikTok (the platform minimum is "more than $50" a day per campaign). Kill if link CTR < 0.5% or CPC > $2 at the end of the test.
2. **Kill at 2 × target CAC with no purchase.** A creative or channel that has spent **$100** ($50 target × 2) with **zero net paying customers**, and sign-up cost above $10, gets stopped.
3. **Kill at 3 × target CAC with 1 purchase.** At **$150** spent with ≤ 1 net paying customer, stop unless sign-ups cost ≤ $5 and checkout opens are growing.
4. **Refund rule:** if more than **30%** of a source's buyers refund within 14 days, pause that source and review its message for over-promising (A).
5. **Creator rule:** do not rehire a creator if their post drove fewer than 1 net paid customer per $75 of fee *and* fewer than 50 UTM visits.
6. **Fatigue:** when CTR falls 30% from its peak, or after about 30 days, rotate the creative (V: winners fatigued after about 36 days in Agentio's data).

### 8.3 Scale rules

1. **Scale** when a creative or source shows **CAC ≤ $50 over at least 3 net paying customers**, or sign-ups at ≤ $8 with ≥ 15% sign-up-to-paid.
2. **Raise budgets** by **20% to 30% at most**, no more often than every **48 to 72 hours**. TikTok's own guidance is ≤ 40% per change during learning, ≤ 30% after, and not more often than every 2 days (V).
3. **Carry winners across platforms:**
   - Instagram Reels → TikTok Spark → YouTube Shorts via Creator Partnerships Boost.
   - Agentio suggests moving fatigued Meta winners to Shorts (V).
4. **Winning creators** get a 3-post follow-on deal with Spark or partnership codes for 90 days.
5. **Next budget:** do not raise the budget above $1,000 until one source shows CAC ≤ $50 on at least 5 customers. Then the next step is **$3,000 to $5,000 in that single channel**, as Demand Curve advises (V).

---

## 9. The recommended $1,000 allocation

### 9.1 Line items

| # | Line | Amount | When | Rules |
|---|---|---|---|---|
| 1 | **Creator content with paid-usage rights, wave 1** (live features) | **$300** | Contracts 27 to 30 Oct; posts 29 Oct to 9 Nov | 3 to 4 micro creators (5,000 to 50,000 followers) at about $75 to $100 upfront plus a Whop affiliate link plus a Studio account. Niches: freelance web designers and agency owners (client sites plus review links), teachers and consultants (decks), self-publishing authors (books). Each delivers 1 short video (9x16) and a Spark or partnership code for 60+ days. If creators insist on market rates (about $175 to $290), buy 2 posts instead of 4. |
| 2 | **Creator content, wave 2: the image-generation launch beat** | **$150** | Only after generated images are **live in production** (expected "in days") | 1 to 2 creators who make visual content. Image-led sites, decks and books are the most shareable output, which is the core of Lovable's growth loop. Do not pre-announce. |
| 3 | **Boosting proven organic winners** | **$300** | From about day 3, continuously | Only posts that pass the section 8.1 gate. Use Spark Ads on TikTok (just over $50 a day, e.g. $51, for 2 days per test) and partnership ads or own-account boosts on Meta ($15 to $25 a day for 3 to 4 days). Plan for about 3 to 4 winner tests. Targeting: US, UK, CA, AU, IE, NZ, DACH, Nordics and Benelux first (A), where buyers can pay $20 to $99 a month. Exclude Instagram Stories for partnership ads at first (V: higher CPA there). |
| 4 | **Google Search probe** | **$100** | From launch week | (a) **Brand defence:** exact and phrase match on "makeborne" plus misspellings, capped at $40 in total. (b) **One long-tail ad group:** "ai book generator" and "ai presentation maker" plus close variants, in US, UK, CA and AU, manual CPC capped at $3, maximum $60. **No head terms and no competitor trademarks in ad text.** Expect a probe, not a statistically meaningful result. |
| 5 | **Reserve, released only by the scale rule** | **$150** | Weeks 2 to 6 | Goes to whichever line meets the scale rule: rehire the best creator, extend the best Spark or partnership ad, or Creator Partnerships Boost on a winning Short. It may fund retargeting only if the section 7.4 conditions are met. |
| | **Total** | **$1,000** | | |

**Lines set to $0, and why:**
- Cold Meta or TikTok conversion campaigns: they cannot exit learning, have no consented signal yet, and the base-case CAC is about $200.
- Reddit Ads: the suggested test is $3,000 to $5,000.
- X Ads: cheap clicks ($0.18 CPC), but no evidence they buy SaaS subscriptions, and the benchmark "conversion" is not a purchase (see 4.5).
- YouTube in-stream: low intent and a CPV-billed format.
- LinkedIn Ads: not benchmarked here; expensive for B2B audiences.
- Retargeting: no consent or pixel yet.

### 9.2 Expected ranges (E)

Planning inputs (A):
- Creator views per post: low 1,500, base 6,000, high 40,000 (one breakout).
- Link click rate from creator views: 0.3%, 0.6%, 1.0%.
- Boost CPM: $12, $8, $5.
- Boost link CTR: 0.5%, 0.9%, 1.5%.
- Visit-to-paid: 0.4% to 0.5% low, 1.0% base, 2.0% high.
- Google: CPC $4 / $2.50 / $1.50 and conversion 1% / 3% / 6%.

| Line | Low | Base | High |
|---|---|---|---|
| Creators, 6 posts total ($450) | 9,000 views → 27 visits → about 0 paid | 36,000 views → 216 visits → about 2 paid | 240,000 views → 2,400 visits → about 48 paid |
| Boosts ($300) | 25,000 impressions → 125 visits → about 0.5 paid | 37,500 impressions → 338 visits → about 3.4 paid | 60,000 impressions → 900 visits → about 18 paid |
| Google ($100) | 25 clicks → about 0.25 paid | 40 clicks → about 1.2 paid | 67 clicks → about 4 paid |
| Reserve ($150), redeployed at the best observed rate | about 0.5 paid | about 2 paid | about 9 paid |
| **Total net paying customers** | **about 1 to 3** | **about 7 to 10** | **about 60 to 80** |
| **Blended CAC** | about $350 to $1,000 | about $100 to $140 | about $12 to $17 |
| **New MRR / ARR** (blended $36.60) | about $40 to $110 / $0.4k to $1.3k | about $260 to $370 / $3.1k to $4.4k | about $2.2k to $2.9k / $26k to $35k |

These figures exclude effects we cannot measure ahead of time:
- brand searches and word of mouth
- affiliate creators who keep posting at no upfront cost
- the founder's organic content
- sites customers publish on a Makeborne address that show the brand to their clients

Those effects are where the Base44 and Lovable-style growth comes from. The base case does not pay back in the first month on its own. That is acceptable only because the $1,000 is buying learning and assets. If the low case appears after wave 1, **stop spending and fix the offer and landing page first.** See section 11.

### 9.3 Week by week

| Dates | Paid spend | Activities |
|---|---|---|
| 26 to 28 Oct (launch) | about $0 to $10 (brand search) | Founder build-in-public posts on LinkedIn and X; UTM sheet live; creator outreach and contracts; consent banner work starts |
| 29 Oct to 9 Nov | up to $300 creators + $150 boosts + $50 Google | Wave 1 posts; daily gate review; boost winners; first kill and scale decisions |
| Image beat (when live, expected early to mid November) | $150 creators + $150 boosts | Wave 2 image-led creator posts; boost the best; update ads only once images are verifiably live |
| Weeks 3 to 6 | reserve $150 + remaining Google $50 | Scale the single best source; retargeting only if consent and audience conditions are met; decide the next budget step |

---

## 10. Creative guidance for the paid layer

The full creative plan belongs to another research track. This is what matters for paid spend.

- **Use real builds as the hero.** A screen recording of a brief turning into a published client site, deck or book in under 60 seconds. Motion's 2026 data shows text and product-led ads out-hitting high-production video (V).
- **The launch films are payoffs, not the main ad:**
  - `v9-flyover` 9x16 (1080×1920) works as the 2 to 3 second closing reveal or end card on Reels, TikTok and Shorts.
  - The 16x9 4K master works for YouTube and the website.
  - `v14_draft_1080p60` is a **draft**. Do not put spend behind it until it is final.
- **Angles to test,** each as a separate creative, as Andromeda rewards:
  1. "Client site in 10 minutes, client review link included" (freelancers and agencies, Studio plan).
  2. "Your whole pitch: site + deck + one-pager from one brief."
  3. "Turn your expertise into a book this weekend" (books).
  4. "I replaced three tools" (website builder + deck tool + client feedback tool).
  5. Founder build in public: "day 3 of launch, real revenue."
- **Never in ads yet:** generated images, custom domains, credit top-ups, two-way GitHub sync, agency tools, AI lead research. No model or vendor names. No competitor trademarks in ad text.

---

## 11. Owner decisions this research surfaces

These are labelled as decisions. The current policy stays unless the owner changes it.

1. **No free tier and no trial (current owner decision).** Paid traffic converts best when visitors can see value first. Options, with their economics:
   - **(a) A free first-build preview** before payment: a hero section, deck outline or book chapter. Capped at about 50 credits, it costs at most about **$1.65 of provider cost per sign-up** (I). If 3% of preview users pay, that is at most about $55 of preview cost per customer, which is still inside the CAC ceiling.
   - **(b) A 7-day card-required trial.** Opt-out trials convert about 49% to 51% from trial to paid, but only about 2.2% of paid visitors start one (V, First Page Sage and Electroiq via shno.co).
   - **(c) Keep the hard paywall,** but lead with the refund promise ("refundable until you use credits") in every ad and on every landing page. RevenueCat's data shows hard paywalls can convert strongly (V).

   Recommendation: test (c) during wave 1. If the visit-to-paid rate from creator traffic stays below 0.5%, the owner should consider (a).
2. **Affiliate commission level** (25% to 40% recurring for 12 months). It decides how many creators accept a low upfront fee.
3. **Consent banner and pixels** go to Codex and the owner as a prerequisite for any retargeting or CAPI. Not needed for the $1,000 plan above.

---

## 12. Risks

1. **Benchmark error.** Vendor benchmarks vary 2 to 4 times and lean towards ecommerce. Makeborne's real CPC and conversion rate may sit outside every range. Mitigation: decisions run on our own data after about 7 days.
2. **Small samples.** With 1 to 10 purchases, CAC is noise. The rules above use leading indicators first, but false winners and false losers will happen.
3. **Creator quality and fraud.** Fake followers and engagement pods. Check comments and audience country, and pay part on results through affiliate commission.
4. **Over-promising.** A creator showing a feature that is not live, such as images or custom domains, risks refunds, chargebacks ($15 Whop dispute fee, I) and consumer-law exposure. Use the feature list in the brief and review scripts before posting.
5. **Consent and privacy non-compliance.** Firing pixels or CAPI for EU users without consent risks regulatory and platform penalties. No pixels until the CMP is live; get legal review.
6. **Whop attribution gaps.** Whop's affiliate and pixel attribution may not match Makeborne's UTM records. Keep both and reconcile weekly.
7. **Refunds distort CAC.** Under the full-refund-until-used policy, ad-driven buyers may refund before using anything. Always report net customers.
8. **Trademark and comparative claims.** Competitor names in ad text can be disapproved, and in the EU and EFTA trademark keywords can be restricted. Keep comparisons factual and on Makeborne's own pages.
9. **Costs from heavy users.** Heavy users at 100% of credits cut contribution to 26% to 32% (I/E). CAC ceilings assume 60% use.
10. **Attention spikes fade.** Creator posts peak in 24 to 72 hours, and winning ads fatigue in about 36 days (V). Budget for fresh creative every 2 to 4 weeks.
11. **Expectation risk.** A $1M ARR goal set against a $1,000 budget invites over-spending on cold ads after a slow first week. The rules in section 8 exist to prevent that.

---

## 13. Research limits

- The shared web-search budget for this research run ran out before we could reach several primary sources:
  - ChartMogul's 2026 conversion report.
  - Meta's own Help Center text on the learning phase and partnership ads. Meta's page returned no readable body.
  - TikTok's Spark Ads playbook page. It returned a server error.
  - WordStream's original pages, which blocked automated access.

  Figures from those sources are marked (S) or taken from pages that cite them.
- Search volume and CPC for **"lovable alternative"** were not available in the data we reached. Check it in Google Keyword Planner before bidding.
- Benchmarks for X and Reddit come mainly from one agency dataset each (EnrichLabs and Stackmatix), so they are not independent.
- Spark Ads lift figures from TikTok date from 2020 to 2021.
- Nothing here is legal advice. Consent, trademark and creator-disclosure points need counsel.

---

## 14. Sources

All accessed 26 October 2026 unless noted. "Date" is the publication or update date shown on the page.

**Meta**
1. Superads, Facebook CPM for SaaS & Cloud Platforms (data about Jul 2025 to Jul 2026): https://www.superads.ai/facebook-ads-costs/cpm-cost-per-mille/saas-cloud-platforms (V)
2. Superads, Facebook CPC for SaaS & Cloud Platforms (same period): https://www.superads.ai/facebook-ads-costs/cpc-cost-per-click/saas-cloud-platforms (V)
3. Superads, Facebook CTR for SaaS & Cloud Platforms (same period): https://www.superads.ai/facebook-ads-costs/ctr-click-through-rate/saas-cloud-platforms (V)
4. Coupler.io, Facebook Ads Statistics 2026 (WordStream/LocaliQ 2026, Triple Whale 2026, Motion Creative Benchmarks 2026), 25 Sep 2026: https://blog.coupler.io/facebook-ads-statistics/ (V)
5. Martech Zone, Online ad benchmarks (WordStream 2025 Facebook and Google), published 3 Oct 2025, modified 24 Oct 2026: https://martech.zone/online-ad-benchmarks (V)
6. Triple Whale, Facebook ads benchmarks (2025): https://triplewhale.com/blog/facebook-ads-benchmarks (S; page blocked automated access)
7. AdMake, Facebook ads cost 2026 (country CPM compilation): https://admakeai.com/blog/how-much-do-facebook-ads-cost (S)
8. Lebesgue, Facebook CPM by country: https://lebesgue.io/facebook-ads/facebook-cpm-by-country (S)
9. ppc.land, Learning phase explainer (Meta, Google, TikTok, Reddit), 23 Sep 2026: https://ppc.land/learning-phase/ (V)
10. Net Influencer, Agentio report on Meta Partnership Ads vs licensed UGC ($130M spend), 13 Aug 2026: https://www.netinfluencer.com/meta-partnership-ads-outperform-licensed-ugc-across-130m-usd-in-ad-spend-report-finds/ (V)
11. Martechvibe, Creator ads deliver 19% higher CTR on Meta Partnership Ads, 14 Aug 2026: https://martechvibe.com/article/creator-ads-deliver-19-higher-ctr-on-meta-partnership-ads (V)
12. Search Engine Land, Instagram rebranded branded content ads to partnership ads (Meta 2022 data; older): https://searchengineland.com/instagram-has-rebranded-content-ads-to-partnership-ads-409470 (S)
13. Meta Blueprint, Conversions API course (13% CPA improvement claim): https://certification.facebookblueprint.com/student/path/514683/activity/466137 (S)
14. Brainlabs, Conversions API Gateway results, 18 Nov 2023 (older): https://www.brainlabsdigital.com/jon-molina-shares-results-from-our-implementation-of-metas-conversions-api-gateway/ (S)
15. Billo, Meta Andromeda update explained (2025 to 2026): https://billo.app/blog/meta-andromeda-update/ (S)
16. Insense, Meta Andromeda guide: https://insense.pro/blog/meta-andromeda (S)

**TikTok**

17. TikTok Ads Manager Help, About budgets, last updated July 2026: https://ads.tiktok.com/resources/help/article/budget (V)
18. Focus Digital, Average TikTok ads CTR and CPM by industry (Aug 2025 to Jul 2026), 8 Oct 2026: https://focus-digital.co/average-tiktok-ads-ctr-and-cpm-by-industry/ (V)
19. Influee, TikTok Ads Benchmarks (Triple Whale 2025): https://influee.co/blog/tiktok-ads-benchmarks (S)
20. TikTok Creative Center, Spark Ads Creative Playbook (Q4 2020 to Q2 2021 data; older): https://ads.tiktok.com/business/creativecenter/quicktok/online/Spark-Ads-Creative-Playbook/pc/en (S; page returned an error)
21. Relevant Audience, TikTok Spark Ads authorisation codes guide: https://www.relevantaudience.com/tiktok-ads/tiktok-spark-ads-guide/ (S)
22. Leadsie, TikTok Spark Ads allowlisting: https://www.leadsie.com/blog/tiktok-spark-ads-allowlisting-whitelisting (S)

**Google**

23. Shopifreaks, Google Ads CPCs rose to $5.42 in 2025 (WordStream/LocaliQ, 16,000+ campaigns), 19 May 2026: https://www.shopifreaks.com/google-ads-cpcs-rose-to-5-42-in-2025-with-87-of-industries-seeing-increases-but-conversion-rates-climbed-to-8-18-as-automation-improves/ (V)
24. Search Engine Land, Google Ads costs keep rising but conversion rates improved in 2025: https://searchengineland.com/google-ads-costs-keep-rising-but-conversion-rates-improved-in-2025-477927 (S)
25. seodata.dev, "ai website builder" (US, Google Ads API), 4 Jul 2026: https://www.seodata.dev/keyword/ai-website-builder (V)
26. seodata.dev, "website builder", 6 Jul 2026: https://www.seodata.dev/keyword/website-builder (V)
27. seodata.dev, "ai powered app builder" / "ai app builder", 10 May 2026: https://www.seodata.dev/keyword/ai-powered-app-builder (V)
28. seodata.dev, "ai presentation maker", 11 Jul 2026: https://www.seodata.dev/keyword/ai-presentation-maker (V)
29. seodata.dev, "ai book generator", 13 May 2026: https://www.seodata.dev/keyword/ai-book-generator (V)
30. seodata.dev, "lovable", 18 Jun 2026: https://www.seodata.dev/keyword/lovable (V)
31. seodata.dev, "gamma alternative", 27 Sep 2026: https://www.seodata.dev/keyword/gamma-alternative (V)
32. ppc.land, Google slashes audience thresholds to 100 users, 23 Dec 2025: https://ppc.land/google-slashes-audience-targeting-thresholds-to-100-users-across-all-networks/ (V)
33. BrandVerity, Google Ads trademark rules 101: https://www.brandverity.com/blog/google-ads-trademark-rules-101 (S)
34. Benly, Google Ads competitor targeting: https://benly.ai/learn/google-ads/google-ads-competitor-targeting (S)
35. Search Engine Journal, Consent Mode v2 key details for advertisers (2024): https://www.searchenginejournal.com/consent-mode-v2-google-shares-shares-key-details-for-advertisers/508623/ (S)

**Reddit, X, YouTube**

36. Enrich Labs, Reddit Ads complete guide 2026 (Stackmatix benchmarks), 2026: https://www.enrichlabs.ai/blog/reddit-ads-complete-guide-2026 (V)
37. ppc.land, Reddit ads minimum prices, 21 Dec 2023 (older): https://ppc.land/reddit-ads-minimum-prices (V)
38. Hootsuite, X (Twitter) ads guide with EnrichLabs 2025 benchmarks, 19 Sep 2025: https://blog.hootsuite.com/twitter-ads (V)
39. Store Growers, YouTube ads benchmarks, updated 19 Feb 2026: https://www.storegrowers.com/youtube-ads-benchmarks/ (V)
40. CreatorsJet, YouTube sponsorship rates (2026): https://www.creatorsjet.com/blog/how-much-do-brands-pay-for-youtube-sponsorships (S)
41. Collabpals, YouTube sponsorship rate calculator: https://www.collabpals.com/tools/youtube-sponsorship-rate-calculator (S)

**Creators and UGC**

42. Collabstr, What influencers really cost in 2025: https://collabstr.com/blog/influencer-costs-2025 (S)
43. Influencer Marketing Hub, Micro-influencer rates: https://influencermarketinghub.com/influencer-rates/micro-influencer-rates (S)
44. Later, Influencer pricing benchmarks 2026: https://later.com/blog/influencer-pricing-benchmarks-the-complete-2026-guide/ (S)
45. Billo, UGC rates in 2025: https://billo.app/blog/ugc-rates/ (S)
46. Influee, UGC price guide (18 Apr 2025): https://influee.co/blog/ugc-price (S)

**Conversion benchmarks**

47. shno.co, Free trial conversion statistics (First Page Sage Sept 2025; Electroiq Jul 2025), 2026: https://www.shno.co/marketing-statistics/free-trial-conversion-statistics (V)
48. Lenny's Newsletter, What is a good free-to-paid conversion rate, 1 Aug 2023 (older): https://www.lennysnewsletter.com/p/what-is-a-good-free-to-paid-conversion (V)
49. RevenueCat, Hard paywall vs freemium, 29 Apr 2026: https://www.revenuecat.com/blog/growth/hard-paywall-vs-freemium (V)
50. ppc.land, AI apps earn 41% more per user but churn 30% faster (RevenueCat): https://ppc.land/ai-apps-earn-41-more-per-user-but-churn-30-faster-revenuecat-finds/ (S)

**Competitor growth stories**

51. Lenny's Newsletter, The Base44 bootstrapped startup success story (Maor Shlomo), 6 Jul 2025: https://www.lennysnewsletter.com/p/the-base44-bootstrapped-startup-success-story-maor-shlomo (V, public summary only)
52. Woshipm (Chinese), Base44 growth strategy breakdown, 6 Oct 2025: https://www.woshipm.com/ai/6276780.html (V, secondary)
53. Base44 careers, Influencer Marketing Lead (Technology): https://base44.com/careers/influencer-marketing-lead-technology-us-remote (S)
54. Demand Curve, Growth Newsletter #267, Why Lovable's growth playbook isn't yours, 31 Jul 2025: https://www.demandcurve.com/newsletters/growth-newsletter-267 (V)
55. Tech.eu, Lovable becomes fastest software company to $100M ARR, 23 Jul 2025: https://tech.eu/2025/07/23/lovable-becomes-fastest-software-company-ever-to-reach-100m-arr/ (S)

**Whop and consent**

56. Whop docs, Pixel guide: https://docs.whop.com/developer/guides/pixel.md (V)
57. Whop docs, Website tracking: https://docs.whop.com/developer/websites/tracking.md (V)
58. Whop docs, Ads pixel (forwarding to ad platforms, event_id de-duplication, customer matching): https://docs.whop.com/developer/ads/pixel (V)
59. Whop docs, Attribute affiliates in embedded checkout: https://docs.whop.com/third-party-integrations/embedded-checkouts/attribute-affiliates-embedded-checkout.md (S)
60. Whop docs, payment.succeeded webhook: https://docs.whop.com/api-reference/payments/payment-succeeded.md (S)
61. Whop pricing (fees), checked 23 Oct 2026 in Makeborne's internal analysis: https://whop.com/network/pricing/ (I)
62. FlexyConsent, Meta Pixel and Conversions API: GDPR and CCPA consent guide (2026): https://flexyconsent.com/blog/meta-pixel-facebook-conversions-api-consent-guide/ (S)

**Kill and scale heuristics (vendor or practitioner rules, not studies)**

63. Young Urban Project, Meta ads creative decision framework: https://www.youngurbanproject.com/how-to-build-a-meta-ads-creative-decision-framework/ (S)
64. echai.ventures, Founder budget for ad testing and kill/scale rules: https://echai.ventures/how-founders-use-ai/ads-performance/how-much-should-founders-budget-for-ad-testing-and-when-should-they-kill-or-scale-a-creative (S)

**Internal (Makeborne)**

65. Makeborne pricing and margin analysis, 23 Oct 2026: AI cost per credit, Whop fee assumptions, hosting and support allowances, preview cost estimate (I)
66. Makeborne competitor teardown, 23 Oct 2026: Lovable and Base44 free tiers (I)

**Added during verification (26 Oct 2026)**

67. TechCrunch, 6-month-old, solo-owned vibe coder Base44 sells to Wix for $80M cash, 18 Jun 2025: https://techcrunch.com/2025/06/18/6-month-old-solo-owned-vibe-coder-base44-sells-to-wix-for-80m-cash/ (V)
68. TechCrunch, Sweden's Lovable raises $15M pre-Series A, 25 Feb 2025: https://techcrunch.com/2025/02/25/swedens-lovable-an-app-building-ai-platform-rakes-in-16m-after-spectacular-growth/ (V)
69. Lovable pricing, read 26 Oct 2026: https://lovable.dev/pricing (V)
70. Base44 pricing, read 26 Oct 2026: https://base44.com/pricing (V)
71. Google Ads Help, consent mode behaviour for EEA traffic, read 26 Oct 2026: https://support.google.com/google-ads/answer/13802165 (V)

---

## Verification (26 Oct 2026)

An adversarial check of the most decision-relevant claims, done on launch day. Each claim was re-read at its source page with WebFetch. **Limit:** the shared web-search budget for this research run was used up before this check began, so no new searches could be run. Only known URLs could be fetched, and claims we could not reach a source for stay "unverified". Corrections have been made inline above.

| # | Claim in the report | Verdict | Correction or note | Source |
|---|---|---|---|---|
| 1 | Base44 reached about $1M ARR about 3 weeks after launch, without spending on marketing | Confirmed (founder's claim) | Lenny's page says "$1 million ARR just three weeks after launch" and "without spending any money on marketing". This is the founder's account, not audited revenue. TechCrunch gives 10,000 users in the first 3 weeks and adds word of mouth and partnerships with Israeli tech companies as channels. | lennysnewsletter.com (6 Jul 2025); techcrunch.com (18 Jun 2025) |
| 2 | Wix bought Base44 for "up to $80M", announced 18 June 2025 | **Corrected** | It was $80M in cash, of which $25M was an employee retention bonus. Lenny calls it "over $80 million". "Up to" understated the deal. Earn-out reports were not checked. The 18 June 2025 date is confirmed. | techcrunch.com (18 Jun 2025) |
| 3 | Base44 had 400,000+ users "by about 6 months" | **Corrected** | It had about 250,000 users at the sale, around 6 months in. The 400,000+ figure is from Lenny's July 2025 episode, after the acquisition. | techcrunch.com; lennysnewsletter.com |
| 4 | Lovable: $100M ARR in about 8 months; $17M ARR and 30,000 paying customers by February 2025; about $2M spent; "$7.5M pre-seed" | Confirmed, with an addition | All figures are confirmed. The report left out that Lovable then raised a $15M pre-Series A (February 2025) and a $200M Series A (July 2025). The €6.8M pre-seed is about $7.5M. The $2M is capital spent in total, not marketing spend. The K of 1.24 is Demand Curve's estimate. | demandcurve.com #267 (31 Jul 2025); techcrunch.com (25 Feb 2025); tech.eu (23 Jul 2025) |
| 5 | Free tiers: Lovable 5 daily credits; Base44 25 messages a month | Confirmed, with a detail added | Lovable caps the 5 daily credits at 30 a month. Base44 has 25 message credits plus 100 integration credits a month. Base44's paid plans start at $16 a month billed annually. | lovable.dev/pricing; base44.com/pricing (26 Oct 2026) |
| 6 | TikTok minimums: more than $50 a day per campaign and more than $20 a day per ad group; budget increases of at most 40% during learning and 30% after, at least 2 days apart | Confirmed | "More than $50" means a budget of exactly $50 may be refused, so plan on $51 or more. A lifetime ad group budget must be at least the number of days × $20. Page updated July 2026. | ads.tiktok.com/resources/help/article/budget |
| 7 | Meta learning phase needs about 50 optimisation events in 7 days; Google calibration takes about 50 conversions or 3 cycles; TikTok's pages conflict (25 results vs 50) | Confirmed (secondary) | This is ppc.land's reading of the platform help pages. Meta's own page was not readable. | ppc.land/learning-phase (23 Sep 2026) |
| 8 | Google's remarketing minimum is 100 active users in 30 days (dated 23 Dec 2025) | Confirmed, date corrected | It applies to Search, Display and YouTube, including Customer Match. The change was documented by 17 Dec 2024. The article's byline is 23 Dec 2025. | ppc.land |
| 9 | Agentio: partnership ads +19% CTR, +10% CVR, −5% CPA "against the same creative run from the brand's account"; Stories CPA 25% higher; fatigue after 36 days; YouTube boost CPM 30% lower | **Corrected** (comparison group) | The numbers are confirmed. The comparison group is "traditional licensed UGC run from brand accounts", not a matched test of identical creative. CPM was also 19% higher. | netinfluencer.com (13 Aug 2026) |
| 10 | X Ads: 0.02% conversion rate makes X unusable for direct response | **Corrected** (misreading) | The figures are confirmed as published ($0.18 CPC, $21.55 CPA, 0.02%). But a $21.55 CPA at a $0.18 CPC implies about 0.8% of clicks convert, so 0.02% is almost certainly per impression. The $0 X allocation stays, for other reasons. | blog.hootsuite.com/twitter-ads (19 Sep 2025) |
| 11 | Whop fees: 2.7% + $0.30, +1.5% international, +1% FX, $15 dispute fee | Confirmed, but incomplete | Optional add-ons are left out: Billing 0.5%, Tax and remittance 2% when collected, 3DS $0.03, Radar $0.07, early dispute alert $29. If Billing and Tax are on, blended contribution falls from about $18.27 to about $17.25 (E). | whop.com/network/pricing (26 Oct 2026) |
| 12 | Google CPC for "ai website builder" is $22.55 (US, 40,500 searches) | Confirmed | Google Ads API average, updated 4 Jul 2026. Keyword Planner figures are bid estimates. | seodata.dev |
| 13 | Meta SaaS CPC about $2.02 (range $1.14 to $2.79), all-industry about $1.05 | Confirmed | The page itself is inconsistent on the data period (Oct 2025 to Sep 2026 in the header, Jul 2025 to Jul 2026 in the text) and on median vs average. | superads.ai |
| 14 | TikTok median CPM $4.08, CTR 0.61%, CVR 1.56%, CPA $17.07; Utility Software CTR 0.34%, CPC $1.22 | Confirmed | The Utility Software row comes from a separate sample of 2,500 advertisers covering calendar 2025. The overall medians are mostly ecommerce. | focus-digital.co (8 Oct 2026) |
| 15 | RevenueCat: hard paywall vs freemium download-to-paid 10.7% vs 2.1%; hard-paywall floor 4.2% | Confirmed | These are mobile-app medians. The article says nothing about refunds, so the report's line that hard paywalls see more refunds is still unverified. | revenuecat.com (29 Apr 2026) |
| 16 | Whop forwards checkout sales to "the ad platforms" as a Purchase event and supports `event_id` de-duplication | Confirmed | The page names no platforms and does not mention consent, as the report says. | docs.whop.com/developer/ads/pixel |
| 17 | Google Consent Mode v2 has been required for EEA measurement and remarketing since March 2024 | Mechanism confirmed, date unverified | Google's help page confirms that with consent denied, remarketing gets no data and conversion measurement is limited. The page gives no start date. | support.google.com/google-ads/answer/13802165 |
| 18 | Creator posts cost about $175 to $290 at market rates (Collabstr and Billo, 2025) | Unverified | Collabstr returned HTTP 403, and no search budget was left to find another source. Treat the $75 to $100 micro-creator fee in section 9.1 as an assumption until quotes arrive. | collabstr.com (blocked) |
| 19 | TikTok Spark Ads: +43% CVR, +142% engagement | Unverified | The source page returned an error, and the data is from 2020 to 2021. Do not cite it externally. | TikTok Creative Center |

**Arithmetic re-checked (E):** blended price $36.60; contribution of $10.42, $24.79 and $45.85 a month and $18.27 blended; 2,277 customers for $1M ARR; about 25 a day by late January 2027; and the totals in the section 9.2 scenario table (base about 8.8 customers, high about 79, low about 1.4). All are consistent with the stated inputs.

### Gaps the report missed

1. **Q4 and Black Friday ad prices.** The launch, the images beat and the boosts all fall in November, when Black Friday and Cyber Monday traffic usually pushes CPMs up. None of the CPM ranges are adjusted for this. Either move boost spend away from roughly 20 November to 2 December or expect higher CPMs.
2. **Whop add-on fees and tax handling** for worldwide B2C sales change net price and margin. Check in the Whop account (owner's private notes).
3. **No LinkedIn benchmark,** even though Base44's main engine was organic LinkedIn and the Studio target is agencies. A paid-LinkedIn floor should at least be documented before ruling it out.
4. **Launch platforms and directories with no budget cost** (Product Hunt, Hacker News Show HN, AI tool directories) are not costed or sequenced against the paid plan.
5. **Creator rates are unverified** (see row 18). The core $450 line depends on micro creators accepting $75 to $100 upfront.
6. **Meta's own minimums** (daily budget per ad set, partnership-ad eligibility and permission flow) were not checked against Meta's pages.
7. **Search CPCs outside the US** are not given, although section 9.1 targets the UK, Canada, Australia, DACH and the Nordics.
8. **No source on refund or chargeback rates** for paid traffic sent to a hard paywall, which section 8.2's 30% refund rule depends on.
9. **Base44's paid spend under Wix** was not researched. The only sign in the report is the influencer-lead job posting. The "no marketing spend" story is verified only for the first 6 months, before the acquisition. Whatever Base44 has spent since then, with Wix's budget behind it, is not a benchmark for a $1,000 plan.

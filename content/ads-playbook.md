# Ads playbook: where, when and exactly how the paid money runs

> **Launch moved again (owner decision, 27 Oct 2026).** The public launch is **Thursday 29 October 2026 at 21:00 Sarajevo time** (CET, 20:00 UTC); makeborne.com counts down to that moment. Day 1 = Thu 29 Oct; Mon 26, Tue 27 and Wed 28 Oct are pre-launch days −3, −2 and −1. The launch week moved 1 more day (days 1-7 = 29 Oct - 4 Nov); launch day runs around 21:00 (T7 "We're live" at 21:00, V01 at 21:30). The countdown teasers T3-T6 and Stories S1-S3 have the old Wednesday time burned in and are not posted; "Guess the build time" (T8) is the Wed 28 Oct 21:00 post, and screen-recording Stories S4-S8 use the real countdown. Everything after the launch week keeps its date (ads A01 12-15 Nov and A02 3-4 Dec, creator waves, the no-boost window 20 Nov - 2 Dec, Black Friday, the 22 Nov and 20 Dec checkpoints). The 90 days run Thu 29 Oct 2026 - Tue 26 Jan 2027 (day 90, the day-90 review). `data/calendar.json` and the war room are the source of truth; dates and day numbers in the text below that disagree are from before the move.


**Written:** Monday 26 October 2026 (dates updated 27 Oct for the Thursday launch). **Window:** Thu 29 Oct 2026 (day 1) to Tue 26 Jan 2027 (day 90), after the pre-launch days Mon 26 - Wed 28 Oct.
**Machine-readable twin:** `data/ads.json`.
**Plan of record:** `plan/strategy.md` §6 (the $1,000) and `content/tracking.md` §§1, 5, 7 (links, consent, kill and scale). Where this file and the plan disagree, the plan wins and this file should be corrected. Copy ids come from `content/ad-copy.md`; post ids from `data/videos.json` and `data/creatives.json`.

**Labels:** **[F]** read at the platform's own page on 26 Oct 2026 · **[S]** secondary source · **[V]** vendor claim · **[E]** our estimate · **[A]** assumption · **[O]** owner decision · **[U]** unverified.

**This file buys nothing and opens no account.** Every account, payment method, OAuth grant and campaign is created and approved by the owner. Ads Manager labels drift; the click paths below were written against late-2026 interfaces and must be checked on screen.

---

> **Click by click (27 Oct):** `content/ads-step-by-step.md` (Library › Ads, click by click) walks through every screen: the accounts from Bosnia, A01, A02 and A03 from Create to Publish, the daily 10-minute check and the rejected-account runbook. It also lists seven findings that need an owner decision (Meta location fees, spending limits, the Instagram music rule for partnership ads, TikTok from BiH, BiH VAT). No card's money changes.

## 0. The simple version: the ads you will actually run

One card per ad, in the order you run them. Full detail for each card (exact clicks, countries, audience, placements, copy, link, names, "good after 48 h", kill, scale, what to log, and the fallback if a platform doesn't work from Bosnia) is in `data/ads.json` → `adCards`.

| Card | When (earliest) | $ | Platform | Audience | From |
|---|---|---|---|---|---|
| **A01** Boost the best wave-1 creator Reel (client approval) as a partnership ad | Thu 12 Nov, 4 days, done by 19 Nov | **$96** ($24/day × 4) | Meta: Instagram + Facebook Reels and Feed | Advantage+ audience, 16 English-speaking countries, 18+, suggestions web design / freelancing / small business | b5 |
| **A02** Spark-boost the best-selling TikTok (default V04 speedrun) | Thu 3 Dec, 2 days | **$104** ($52/day × 2) | TikTok only | Broad, 16 countries, 18-54, English | b5 |
| **A03** Re-run whichever of A01/A02 hit CAC ≤ $50 over 3+ payers | Sat 5 Dec onwards | **max $52** | Same as the winner | Same as the winner | b9 (reserve) |
| A04 Meta Advantage+ sales with the 3-6 posts that sold | Mon 4 Jan 2027 | $30/day | Meta | Advantage+, 16 countries, 18+ | Revenue (D4) |
| A05 Google brand defence, only if someone bids on "makeborne" | When it happens | $5/day | Google Search | "makeborne" searchers | Revenue (D4) |
| A06 Google "AI presentation maker" 15-day test (optional) | Mon 11 Jan 2027 | $150 | Google Search | US, UK, CA, AU, IE, NZ | Revenue (D4) |
| A07 Remind consenting visitors who didn't pay (optional) | Mon 11 Jan 2027 | $5/day | Meta | Consented `/go/` visitors, 30 days | Revenue (D4) |

**Ads inside the $1,000: $96 + $104 + up to $52 = $252.** `data/ads.json` → `adCalendar` lists every week with the live cards and **all** plan spend (TAAFT, creators, bonuses, Uneed, DM tool, fees, reserve), so the running total reaches exactly $1,000 by week 8 and each line b1-b9 matches `data/plan.json`.

**Swap rule:** if the best qualifying post in week 3 is a TikTok rather than an Instagram Reel, run A02's set-up in week 3 and A01's in week 6. The dollars per card stay the same.

---

## 1. The verdict in one table

Of the $1,000, **$200 is paid media** (line b5). Everything else is creators, listings, tools and reserve (strategy §6.2). This file covers b5, the reserve's paid use (b9 c) and what runs later from revenue.

| Channel | Money in the $1,000 | When | What runs | Verdict |
|---|---|---|---|---|
| **Meta: partnership ad (or boost of our own Reel)** | **$96** (about $24/day × 4 days) from b5 | One slot: A (from Mon 9 Nov, finished by Thu 19 Nov) or B (from Thu 3 Dec) | One post that already sold: a wave-1 creator Reel as a partnership ad, or our own Instagram Reel | **Yes, gated** |
| **TikTok: Spark Ad** | **$104** ($52/day × 2 days; the floor is "more than $50" a day per campaign [F]) from b5 | The other slot | One TikTok post that already sold (ours or a creator's, via Spark code) | **Yes, gated, and only if a TikTok ad account can be opened and billed from Bosnia and Herzegovina** |
| Extension of a winner | From the reserve b9 (c), only under the scale rule | Weeks 3-8, never 20 Nov-2 Dec | The same ad, +20-30% at most every 48-72 h | Only at CAC ≤ $50 over 3+ net payers |
| **Google Search** | **$0** | Brand defence only if someone bids on "makeborne"; a decks probe only from revenue (D4) in January | G1 brand; G2 decks | **Not worth it on this budget** (section 6) |
| **Reddit Ads** | **$0** | — | Organic founder posts only | A readable test costs $3,000-5,000 [V, `research/paid-acquisition.md` §4.4] |
| LinkedIn Ads, X Ads, YouTube in-stream | **$0** | — | Organic founder posts; YouTube Shorts re-edits | No room in $200; X and LinkedIn are organic channels in the plan |
| YouTube Creator Partnerships Boost | $0 now | From revenue only, if a creator's Short wins | Boost of that Short | Cheapest YouTube paid reach (CPMs reported 30% below Meta partnership ads [V, Agentio via netinfluencer.com, 13 Aug 2026]) |
| Cold Advantage+ sales campaigns, retargeting | $0 now | January, from revenue, after the consent banner and server-side purchase events (about 6 Dec) | Purchase-optimised versions of proven posts | Phase 3 of the plan |

**Two slots, $200, no more.** By default slot A is Meta (card A01, creator Reels from 10 Nov) and slot B is TikTok (card A02). If the week-3 qualifier is a TikTok and no Reel qualifies, swap them. If only one platform has an account that bills from BiH, both slots run there (Meta: A02 becomes $26/day × 4; TikTok: A01 becomes $51/day × 2, the extra $6 from the reserve). If neither does by Mon 9 Nov, **b5 moves into creator rehires**, exactly as the plan says.

**Blackout: no boosts from Fri 20 Nov to Wed 2 Dec** (Black Friday and Cyber Monday CPMs). Slot A must have **finished by Thu 19 Nov 23:59 CET**.

---

## 2. Why no cold ads until organic winners exist

1. **The arithmetic.** At a SaaS Meta CPC of about $2.02 [V, Superads, about $3B of spend, Jul 2025-Jul 2026] and a no-free-tier visit-to-paid of about 1% [E/A, `research/paid-acquisition.md` §4.7], a cold buyer costs about **$200**, four times the $50 CAC gate and above the $120 hard ceiling. On TikTok at about $1 CPC and 0.5%, also about $200 (paid-acquisition §5.1).
2. **Learning needs volume we can't buy.** Meta's delivery system wants about 50 optimisation events in 7 days per ad set [S, Meta developer guidance as summarised by admanage.ai and ppc.land, 23 Sep 2026]. At a $50 CPA that is about $2,500 a week of purchases; at $200 it is $10,000 (paid-acquisition §5.2). A $96 boost never leaves learning: it is a reach purchase, judged on `/go/` sales, not on Ads Manager's optimisation.
3. **No pixel, no consent yet.** There is no ad pixel and there will be none before the consent banner (target about 6 Dec, tracking.md §5). A cold conversion campaign could only optimise for clicks, which buys the cheapest and least interested clickers.
4. **Organic posting is the free test lab.** The plan posts 25-30 pieces a week. The market votes for free; we pay only to amplify what already produced a tracked sale (or 5+ link clicks per 1,000 views). That flips the odds: the creative is proven, and partnership and Spark ads keep the post's social proof and run from the creator's or our handle [S, paid-acquisition §5.4].
5. **Q4 prices.** November CPMs rise into Black Friday; the blackout keeps the $200 out of the most expensive fortnight (paid-acquisition Verification gap 1).

---

## 3. Prerequisites checklist (owner; finish by Mon 9 Nov)

Tick every box before any slot runs. Each item names its evidence.

### 3.1 Meta (Instagram and Facebook)

- [ ] **Facebook Page "Makeborne"** linked to @makeborne (Instagram playbook §1.1).
- [ ] **Meta Business portfolio** (business.facebook.com → Create a business portfolio) in **Makeborne's legal name and real business address in Bosnia and Herzegovina**, owner as admin with 2FA, founder added with their own login.
- [ ] **Ad account:** Business settings → Accounts → Ad accounts → Add → Create a new ad account.
  - **Currency: USD.** Bosnia-Herzegovina Mark (BAM) is **not** on Meta's list of supported ad-account currencies; USD and EUR are [F, developers.facebook.com/documentation/ads-commerce/marketing-api/currencies, read 26 Oct 2026, page undated]. USD matches the prices and the CAC rules.
  - **Time zone: Europe/Sarajevo**, so the daily budget resets at local midnight and lines up with the 08:00 numbers block. Currency and time zone are hard to change after creation [S]: get them right first time.
- [ ] **Billing from BiH [U]:** Billing and payments → Payment settings → Add payment method. Use a Visa or Mastercard **issued to the company** (or the owner, if the company has no card), with online and international payments switched on at the bank. Meta's payment options depend on the country and currency of the account [S]; no Meta page found on 26 Oct confirms or rules out BiH. **Test in week 1 by adding the card with no campaign running** (a small temporary authorisation is normal). If it fails, try the other card network, then a PayPal business account in USD if Meta offers it for the account [U]. Record the outcome in the owner's private notes.
- [ ] **Domain verification of makeborne.com:** Business settings → Brand safety and suitability → Domains → Add → DNS TXT record (engineering adds it) → Verify. Needed before any link-ownership or event configuration and good hygiene for partnership ads.
- [ ] **EU "beneficiary and payer":** ads that reach people in the EU require the beneficiary (who benefits) and payer (who pays) under the Digital Services Act; ads won't publish without them, and they appear in the Ad Library [S, jonloomer.com; socialmediatoday.com]. For us both are Makeborne's legal entity. Set them once in the ad account's defaults.
- [ ] **Branded content and partnership ads:** on @makeborne, branded content tools on with "require approval" (Instagram playbook §1.7). Every wave-1 creator contract (outreach t03) grants **60 days** of partnership-ad rights and delivers the **partnership ad code within 48 hours of posting**: the creator opens the post → Partnership label and ads → adds Makeborne as brand partner → turns on "Get partnership ad code" → sends it [S, stackinfluence.com; reshiftmedia.com; Meta Partnership Ads API docs updated 26 Mar 2026]. Alternative: the creator turns on "Allow brand partner to boost", which creates account-level permission [S]. Since December 2025 a creator can share a code even when the brand is not tagged [S, Marketing Dive via search]; we still require the Paid partnership label on every paid post.
- [ ] **No pixel and no Conversions API yet.** Both wait for the consent banner (tracking.md §5.2). Do not switch on Whop's own pixel integrations.

### 3.2 TikTok

- [ ] **Brand TikTok business account** (already in the plan) with Commercial Music Library only [F, ads.tiktok.com/help/article/commercial-music-library].
- [ ] **TikTok Ads Manager account** (ads.tiktok.com → Create account) with **country of registration Bosnia and Herzegovina, currency USD, time zone Europe/Sarajevo**. TikTok says the available targeting options depend on the country or region used to register [F, ads.tiktok.com/help/article/placements-available-locations, updated Jun 2025, read 26 Oct 2026], and payment options depend on the billing country and contract currency [F, ads.tiktok.com/help/article/supported-payment-methods via search]. **No source confirms BiH as a registration country [U].** If BiH is missing from the country list, stop: do not pick another country.
- [ ] **Business Center** (optional) and **link the brand TikTok account** under Assets → Identities, so our own posts can run as Spark Ads without codes.
- [ ] Every creator contract includes a **Spark authorisation of 60 days** per video (codes are per post; the creator picks 7, 30, 60 or 365 days [S, leadsie.com; relevantaudience.com; insense.pro 2026]). Captions cannot be edited after authorisation [S]: the creator's caption must already meet the ≤100-character and copy rules when posted (ad-copy §2).

### 3.3 Google (only if Google ever gets money)

- [ ] Google Ads account in Makeborne's name, currency USD, time zone Europe/Sarajevo.
- [ ] **Advertiser identity verification:** Google asks advertisers registered in Bosnia and Herzegovina to complete it (phased rollout from Jan 2022), with 30 days to submit documents [S, support.google.com/adspolicy/answer/11512520 via search].
- [ ] **Automatic payments by card:** manual payments are not available in Bosnia and Herzegovina [S, support.google.com/google-ads/answer/2393016 via search].
- [ ] No Google tag before the consent banner and Consent Mode v2 (tracking.md §5.2).
- [ ] Add `google` to `utm_source` and `cpc` to `utm_medium` in tracking.md before the first click (section 4.4).

### 3.4 Shared

- [ ] **Spend gate live** (strategy §6.1): `/go/` redirects, first touch on the account, `mb_src` / `mb_campaign` / `mb_aff` on the Makeborne-created Whop checkout. No slot runs before this, whatever the date.
- [ ] Format-matched landing page live for the boosted post's format (ask 7), or the home page through `/go/` with the right tags.
- [ ] AI daily limit raised before the slot starts (D6).
- [ ] Every `/go/` code for the slot registered in the private code register.
- [ ] EU and UK copy says "+ tax" next to any price (ad-copy §10).

### 3.5 What NOT to do if an account can't be opened or billed from BiH

These break the platforms' terms and can get every Makeborne account banned, including the organic ones that carry the plan.

- **No ad account in someone else's name** (a friend, relative, freelancer or company abroad). Meta's terms require the name you use in everyday life and forbid sharing your password or giving others access to your account [F, facebook.com/terms.php, effective 1 Jan 2025, read 26 Oct 2026, Bosnian-language version].
- **No rented, bought or "aged" ad accounts** and no "agency accounts" sold on marketplaces.
- **No false registration country, address or VPN** to unlock a market.
- **No card or payment method that belongs to someone outside the business.**

**Legitimate fallbacks, in order:**
1. Run both slots on the platform that works (section 1).
2. Move b5 into creator rehires (the plan's rule): creators still produce reach, and their posts can be boosted later when an account exists.
3. Only after a source has proved CAC ≤ $50: a real, contracted agency or authorised reseller that runs ads from its own business account with **Makeborne declared as beneficiary**, invoicing Makeborne. Fees come out of the budget; get the contract reviewed.

---

## 4. Exact setups

### 4.1 The creative selection rule (every platform)

A post may be boosted only if, **at 48 hours** (the Friday boost decision, strategy §18):
1. **3x or more the account's median views**, and
2. **65%+ 3-second hold** (read the share of viewers still watching at 3 seconds on each platform's retention graph; TikTok's 2-second and 6-second view rates are not substitutes), and
3. **at least 1 tracked sale** on its `/go/` code **or 5+ link clicks per 1,000 views**.

When several qualify, rank by tracked net sales, then by `/go/` clicks per 1,000 views, then by **sends per reach** (Instagram) or shares per view (TikTok). Only **live features** on screen; only posts whose caption already meets the copy rules (no "free", no vendor names, real timer, "a Makeborne address"). Creator posts must carry the Paid partnership label and #ad.

**Default candidates** (if they qualify): V05 or V12 (approval, Lane A), V02/V04 (speedruns), V07 (lead finder), V06 (PPTX chart), wave-1 UGC V32-V36.

### 4.2 Meta: one partnership ad (or own-Reel boost), Ads Manager click path

**Do not use the Instagram app's Boost button** for a slot: Ads Manager gives exact placements, countries, schedule and the `/go/` link.

**Campaign**
1. Ads Manager → **Create** → objective **Traffic** → Continue.
2. Campaign name: `mb-meta-traffic-<slot>-<yyyymmdd>` (e.g. `mb-meta-traffic-slota-20261112`).
3. Special ad categories: **none** (credit, employment, housing, social issues/elections/politics and financial products do not apply).
4. Advantage campaign budget: off (one ad set). A/B test: off.

**Ad set**
5. Ad set name: `t1en-advplus-reelsfeed-24d`.
6. Conversion location: **Website**. Performance goal: **Maximise number of landing page views**. Meta has shown that landing-page-view optimisation can work without a pixel, using modelling [S, jonloomer.com]; another 2026 source says it needs a pixel PageView [S, theadspend.com, Jul 2026]. **If Ads Manager asks for a dataset, choose Maximise number of link clicks instead.** Do not create a pixel to get past the prompt.
7. Budget: **Daily $24.00**. Schedule: start **00:00**, end **23:59 on day 4** (Europe/Sarajevo). Slot A example: Thu 12 Nov 00:00 → Sun 15 Nov 23:59. Slot B example: Thu 3 Dec → Sun 6 Dec.
8. Audience: **Advantage+ audience on**. Audience **controls** (hard limits): Locations = the country list in 4.5; Minimum age = **18**; Languages = **English (All)** if the field is offered under audience controls [U]. Audience **suggestions** (soft): age 24-54; Lane A posts: interests "Web design", "Freelancing", "Small business"; Lane B decks: "Microsoft PowerPoint", "Presentation", "Entrepreneurship". Most targeting in Advantage+ is treated as a suggestion, not a limit [S, searchengineland.com; blckalpaca.at].
9. Placements: **Manual placements**. On: Instagram **Reels**, Facebook **Reels**, Instagram **Feed**, Instagram **Explore** and Explore home. Off: Stories (partnership ads in Stories showed 25% higher CPA [V, Agentio]), Audience Network, Messenger, Threads, in-stream, search results. (Reels-first, as the plan's "Reels and Feed" line.)
10. Optimisation and delivery: Bid strategy **Highest volume** (no cost cap, no bid cap: too little data). Delivery: standard.
11. Attribution setting: leave the default. It does not drive a Traffic campaign, and we judge on `/go/` sales (section 4.6).

**Ad**
12. Ad name: the `utm_content` of the link (e.g. `c-<handle>-v1` or `ig-v05-f2`).
13. Identity: Makeborne Facebook Page + @makeborne.
14. **Partnership ad** toggle on → "Use partnership ad code" → paste the creator's code → the creator's Reel loads. (For our own Reel: Ad setup → **Use existing post** → Instagram → select the Reel.)
15. Destination: **Website**. URL: the slot's `/go/` link (4.4). **URL parameters: empty** (the `/go/` redirect sets the UTMs; anything Meta appends, such as its click ID, is dropped by the redirect, per tracking.md §3.1).
16. Call to action: **Learn more** (ad-copy §4). Headline: the cell's headline from `content/ad-copy.md` (e.g. **A2-M1** "One link. One yes." for an approval post; **A1-M1** "Win the client first" for a lead-finder post; **D1-M1** "A real chart, not a picture" for V06; **S1-M1** "Your site, today" for a speedrun). Primary text: the creator's caption for partnership ads; for our own Reel, the matching M1 line (≤125 characters, already counted).
17. **Advantage+ creative enhancements: all off** (text variations, music, visual touch-ups, image expansion, generated backgrounds, translations, site links). Every word and frame must stay what we approved.
18. Multi-advertiser ads: off.
19. Confirm beneficiary and payer → **Publish** at least 24 hours before the start time so review finishes in time.

**Keyword comments on the ad:** keep the post's "Comment CLIENT/SITE" CTA. Comments on our own boosted Reel still trigger the DM flow (Instagram playbook §5); on a creator's partnership ad, comments land on the creator's post, so the creator's `/go/c-<handle>` stays in their caption or bio.

### 4.3 TikTok: one Spark Ad, Ads Manager click path

**Get the post**
1. Our own post: it is available through the linked identity. A creator's post: the creator opens the post → **···** → **Ad settings** → turns on **Ad authorization** → accepts the terms → **Generate code** → duration **60 days** → sends the code [S, leadsie.com; help.archive.com creator guide].

**Campaign**
2. TikTok Ads Manager → **Campaign → Create** → choose a **manual** campaign (not Smart+) → objective **Traffic**.
3. Campaign name: `mb-tt-traffic-<slot>-<yyyymmdd>`. Budget strategy: **Ad group budget**; ad group budget **Daily $52** (TikTok's manual flow changed in Oct 2026: a manual campaign now sets its budget on the ad group, see `content/ads-step-by-step.md` finding 5). The floor is more than $50 a day; $50.00 may be refused [F, ads.tiktok.com/resources/help/article/budget, updated Jul 2026]. If an older screen still shows a campaign budget switch, leave campaign budget optimisation off.

**Ad group**
4. Ad group name: `t1en-broad-tiktokonly-52d`.
5. Optimisation location: **Website**.
6. Placements: **Select placement → TikTok only** (untick Pangle, Global App Bundle and any other partner placement). User comments: **on**. Video download: off. Video sharing: on.
7. Targeting: Locations = the list in 4.5. Language: English. Age: **25-54** for Lane A posts, **18-54** for Lane B posts. Gender: all. Interests and behaviours: none (broad). Device: all.
8. Budget and schedule: **Daily $52**, start 00:00 day 1, end 23:59 day 2 (Europe/Sarajevo). Dayparting: off. (Ad group floor is more than $20 a day [F].)
9. Optimisation goal: **Click** (landing-page-view optimisation needs a TikTok pixel, which we don't have [U]). Bid strategy: **Maximum delivery** (lowest cost). Billing event: CPC.

**Ad**
10. Ad name: the `utm_content` (e.g. `tt-v04-r2` or `c-<handle>-v1`).
11. Identity: **Spark Ads → "Use TikTok account to deliver Spark Ads"** → **+ Add authorized post** → paste the code (or pick our post) → select it.
12. Destination: **Website URL** = the slot's `/go/` link (4.4). Call to action: **Learn more**. The ad text is the organic caption (fixed). Display name: Makeborne.
13. Tracking: no pixel, no events. Third-party tracking: none.
14. Submit at least 24 hours before the start.

**Scaling rule from TikTok itself:** raise budgets by no more than 40% per change during learning and 30% after, no more often than every 2 days [F, same budget page]. Our own scale rule (section 5) is stricter.

### 4.4 Links, UTMs and naming

| Case | `/go/` link | Tags set by the redirect | Status in tracking.md |
|---|---|---|---|
| Meta partnership ad of a creator post | `makeborne.com/go/c-<handle>-p` | `utm_source=instagram&utm_medium=partnership&utm_campaign=creators-w1&utm_content=c-<handle>-v1` + the creator's affiliate code on the server | Defined (§1.3) |
| Meta boost of our own Reel | `makeborne.com/go/ig-<post>-b` | `utm_source=instagram&utm_medium=paid&utm_campaign=launch-2026-10&utm_content=ig-<post>-<hook>` | `paid` is in the tracking.md `utm_medium` list and the code is registered (26 Oct) |
| TikTok Spark of our own post | `makeborne.com/go/tt-<post>-s` | `utm_source=tiktok&utm_medium=spark&utm_campaign=launch-2026-10&utm_content=tt-<post>-<hook>` | Defined (§1.3) |
| TikTok Spark of a creator post | `makeborne.com/go/c-<handle>-s` | `utm_source=tiktok&utm_medium=spark&utm_campaign=creators-w1&utm_content=c-<handle>-v1` + affiliate code | Mirrors the Meta `-p` pattern; register it |
| Google Search (revenue-funded only) | `makeborne.com/go/g-<adgroup>` (e.g. `g-decks`) | `utm_source=google&utm_medium=cpc&utm_campaign=<campaign>&utm_content=g-<adgroup>-<ad#>` | **Add `google` and `cpc`** before any spend |

The channel mapping (tracking.md §3.5) already routes `spark` and `partnership` to ch-boosts; `paid` and `cpc` need the same treatment.

**Naming convention** (lowercase, hyphens, the date the campaign starts):
- Campaign: `mb-<platform>-<objective>-<slot or campaign>-<yyyymmdd>` (`mb-meta-traffic-slota-20261112`, `mb-tt-traffic-slotb-20261203`, `mb-google-search-g2decks-20260111`)
- Ad set / ad group: `<geo>-<audience>-<placements>-<budget>` (`t1en-advplus-reelsfeed-24d`)
- Ad: the `utm_content` value, so Ads Manager rows join the `/go/` log with no lookup table.

### 4.5 Countries, languages and age (with the reasoning)

**Exact list (16 countries, the plan's b5 geos):** United States (US), United Kingdom (GB), Canada (CA), Australia (AU), Ireland (IE), New Zealand (NZ), Germany (DE), Austria (AT), Switzerland (CH), Netherlands (NL), Belgium (BE), Luxembourg (LU), Sweden (SE), Norway (NO), Denmark (DK), Finland (FI).

Why:
- **The product is English-first and priced in USD at $20-99.** Buyers who can pay $49 a month for a client-work tool are concentrated in high-income markets with high card use and high English proficiency.
- **CPM trade-off:** the US costs most (about $16-23 [S, AdMake/Lebesgue compilations 2026; Lebesgue Mar 2026: US $16.08, UK $11.81]) but converts best; the UK about $10-12 and Germany about $8-10 [S]. DACH, the Nordics and Benelux add cheaper impressions with high English use, which matters on a $96 slot.
- **Cheap-CPM markets are left out on purpose** (India about $1.36-2.70 CPM [S], the Philippines, Nigeria, much of LATAM and the Balkans). A $49 USD subscription in English converts far less there, and cheap clicks raise refund and dispute risk ($15 per dispute [F, Whop fees]). Lovable's clipping campaign rejected creators with more than 10% of their audience in the Philippines [F, contentrewards.com campaign page], a signal that low-cost views did not pay. Bosnia and Herzegovina and the region are reached through organic posts and regional press instead.
- **EU and UK consumers:** prices in ads say "+ tax" (ad-copy §10, strategy §16 risk 27).
- **Language:** English. **Age:** 18+ minimum (Meta control), suggestions 24-54; TikTok 25-54 for Lane A, 18-54 for Lane B. Freelancers and agency owners skew 25-45 [A].

**Advantage+ audience vs suggestions:** keep Advantage+ audience on with location, minimum age and language as controls; give interests only as suggestions. With 100-400 link clicks per slot, narrow targeting would starve delivery.

### 4.6 Attribution and how we judge a slot

- **Source of truth: `/go/` code → first touch on the account → Whop payment** (tracking.md §3.2, §4.3), 30-day window, first touch wins. Platform-reported conversions are not used to decide anything until server-side purchase events exist.
- **Meta default attribution** in 2026 is reported as 7-day click and 1-day view (with a 1-day "engage-through" type added); the 7-day and 28-day view windows were removed in January 2026 [S, jonloomer.com "How Meta Ads Attribution Works in 2026"; dataslayer.ai]. For January's purchase-optimised campaigns use **7-day click, 1-day view**, and read **7-day click** alone next to our `/go/` sales to avoid view-through credit for organic buyers.
- **TikTok:** leave the default; judge on `/go/` sales.
- **A 2-day or 4-day slot is a lottery ticket, not a clean read** (strategy §6.2): judge it on `/go/` sales within 7 days of the last click, plus `checkout_opened` with the slot's `mb_src`.

### 4.7 Ad copy used per slot (from `content/ad-copy.md`)

| Post type | Meta headline / primary (own Reel) | TikTok (caption must already fit) |
|---|---|---|
| Approval (V05, V12, V18, C02) | A2-M1 | A2-T1 / A2-T2 |
| Win before the call (V07, V19, C01, C10) | A1-M1 / A1-M2 | A1-T1 / A1-T2 |
| One brief, three deliverables (V10, C29) | A4-M1 | A4-T1 |
| Decks (V03, V06, V14, C16-C18) | D1-M1, D2-M1, D3-M1 | D1-T1, D2-T1, D3-T1 |
| Books (V15, V27, C23, C26) | B1-M1, B2-M1 | B1-T1, B2-T1 |
| Site speedruns (V02, V04, V16) | S1-M1 | S1-T1 / S1-T2 |

The P3 contrarian line ("Paid plans only, on purpose") never runs paid (ad-copy §8).

### 4.8 Meta Advantage+ sales campaigns: later, not now

From January, from revenue under D4, and only once the consent banner, Conversions API `Purchase` events from the Whop webhook (with `event_id` de-duplication within 48 hours [F, Meta developer docs, tracking.md §5.3]) and at least 3 creatives with tracked sales exist:
- **One Advantage+ sales campaign** (renamed from Advantage+ shopping; the streamlined set-up now applies to Sales, Leads and App campaigns [S, searchengineland.com]), **one ad set**, Advantage+ audience with the 4.5 countries as location controls, Advantage+ placements, **3-6 proven creatives** (different concepts, not small tweaks: Meta's Andromeda delivery rewards variety [S, paid-acquisition §4.1]).
- Budget: start at **$30-50 a day** from D4 cash, accept "Learning limited" (50 purchases a week would cost $2,500 at a $50 CPA), and judge weekly on `/go/` and Whop CAC, never on platform ROAS alone.
- **Creative testing method then:** a cut-down 3-3-3 (3 concepts × 1-3 hooks) inside one ad set, or one ad set per concept with equal budgets (ABO) if each can afford $15+/day [S, extuitive.com; topgrowthmarketing.com]. Dynamic or flexible creative only for text variants we wrote ourselves. **Until then, organic posting is the creative test** and paid slots carry one proven ad each.

---

## 5. Kill and scale rules (exact numbers)

All rules from strategy §6.3 and tracking.md §7, made concrete per platform. "Net payers" are first payments not refunded within 14 days.

| Rule | Meta slot ($24/day × 4) | TikTok slot ($52/day × 2) | Google (if ever funded) |
|---|---|---|---|
| **Delivery check** | After $10: no delivery or CPM above $40 → check review status and placements | After $10: same, CPM above $25 | After $10: impressions with 0 clicks → check search terms and bids |
| **Stop the ad (early read)** | At **$30**: link CTR **under 0.5%** or CPC **over $2.00** (plan) | At **$30**: link CTR under 0.5% or CPC over $2.00 | At **$30**: CTR under 2% on exact match, or CPC over the $3 cap |
| **Stop the ad (leading indicator)** | At **$50** with **0 `checkout_opened`** on its code | At **$50** with 0 `checkout_opened` | At **$60** with 0 `checkout_opened` |
| **Kill the source** | **$100** spent with **0 net payers**, or **$150 with 1** | same | same |
| **Refund brake** | Pause if **more than 20%** of the source's buyers refund within 14 days | same | same |
| **Hard ceiling** | Never fund a source above **$120 CAC** | same | same |
| **Keep** | CAC **≤ $50** blended (Studio 35%+ of the mix) or ≤ $37 on Create-heavy posts | same | same |
| **Scale** | Only at **CAC ≤ $50 over 3+ net payers**: +20% per step, at most every **48-72 h**, paid from the reserve (b9 c) then revenue (D4) | Same, and within TikTok's own limit (≤30% per change after learning, ≥2 days apart [F]) | Same |
| **Targets to beat** | Link CTR ≥ 0.8%, CPC ≤ $1.00 (`data/kpis.json` ch-boosts) | Link CTR ≥ 0.6%, CPC ≤ $1.00 | — |
| **Blackout** | No delivery 20 Nov-2 Dec | same | Brand defence may run if a competitor bids; nothing else |

**Daily check routine while a slot runs** (10 minutes, added to the 08:00 numbers block, strategy §18):
1. Spend yesterday vs plan ($24 or $52); delivery status; any rejection or limited delivery.
2. CTR, CPC, CPM; landing page views ÷ link clicks (under 70% means the page is slow or the redirect breaks).
3. `/go/` redirect count for the slot's code; `checkout_opened` with that `mb_src`; Whop first payments matched to it (tracking.md §4.3).
4. Apply the table above. Write the decision in the private log.
5. 20:00 evening block: reply to comments on the ad (our own Reel) or check the creator has (partnership ad); hide spam.
6. Friday: next slot decision; Sunday: the weekly source report row (spend, clicks, checkouts, gross, refunds, net, CAC, Studio share, activated).

---

## 6. Google Search: the keywords, the CPCs and the verdict

**US monthly averages from the Google Ads API (Keyword Planner) via seodata.dev** [V]; CPCs are top-of-page bid estimates and run lower outside the US and with good Quality Score.

| Keyword | US searches / month | Est. CPC | Data date | Fit |
|---|---|---|---|---|
| ai website builder | 40,500 | $22.55 | 4 Jul 2026 | Head term: 44 clicks for $1,000 |
| website builder for agencies | 170 | $20.12 | 12 Oct 2026 | ICP 1, but tiny and expensive |
| website feedback tool | 390 | $21.15 | 26 Jul 2026 | ICP 1 approval; expensive |
| ai presentation maker | 14,800 | $6.44 | 11 Jul 2026 | ICP 2, the cheapest real volume |
| ai powerpoint generator | 12,100 | $6.42 | 11 Jul 2026 | ICP 2 |
| ai pitch deck generator | 1,000 | $14.46 | 10 May 2026 | ICP 2 |
| gamma alternative / gamma ai alternative | 50 / 390 | $7.01 / $7.18 | 27 Sep 2026 | ICP 2, decks intent; small |
| lovable alternatives | 260 | $9.49 | 18 Aug 2026 | Mixed intent: many want app builders (not our ICP) |
| lovable alternative (singular) | not found in the data | — | — | — |
| ai book generator | 2,900 | $3.44 | 13 May 2026 | ICP 3 |

Sources: seodata.dev keyword pages read 26 Oct 2026 (gamma-alternative, ai-presentation-maker, ai-pitch-deck-generator, website-builder-for-agencies, website-feedback-tool, lovable-alternatives) and `research/paid-acquisition.md` §4.3.

**Is a tiny budget worth it? No, not inside the $1,000.** At 1% visit-to-paid [A], a payer costs CPC × 100: about **$640** on "ai presentation maker", **$2,000+** on any website term. Even at a generous 3% it is $215 on decks. Smart bidding needs about 30-50 conversions to calibrate [V, ppc.land], which $150 never reaches. The plan cut Google, and this research confirms it.

**When Google does get money (from revenue, owner decision):**
1. **G1 brand defence**, the day anyone bids on "makeborne" (check the results page weekly from week 3). Keywords `makeborne`, `makeborne ai`, `makeborne.com`, `make borne`; $5/day; copy from ad-copy §6 G1.
2. **G2 decks probe**, January, only if `/decks` is live and organic `/go/` visit-to-paid is ≥ 1.5%: $10/day for 15 days ($150), exact and phrase match, countries US, GB, CA, AU, IE, NZ.
3. **Competitor terms** ("gamma alternative(s)"): a separate ad group, exact match only, **no competitor name in any ad text**, and **not targeted at EEA countries**, where Google may restrict trademark keywords [S, brandverity.com]. "lovable alternatives" stays out: wrong intent for our ICP (strategy §3.1).

**Google click path (when funded):** ads.google.com → **New campaign** → "Create a campaign without guidance" → **Search** → goal: Website visits → URL `makeborne.com/go/g-<adgroup>` → name `mb-google-search-<adgroup>-<yyyymmdd>` → **Networks: untick Search partners and Display Network** → Locations: the list above, **"Presence: people in or regularly in your included locations"** → Language English → Audience segments none → **Broad match off, AI Max off, automatically created assets off** → Budget $10/day (G1 $5/day) → Bidding **Maximize clicks with a $3.00 maximum CPC limit** (the research's cap) → Ad schedule all hours → ad group per G-cell with exact `[ ]` and phrase `" "` keywords → RSA from ad-copy §6 (unpinned unless Ad Strength allows) → no conversion tag before consent.

**Negative keywords (campaign-level list `mb-negatives-shared`, applied to G1-G5; not to a competitor ad group):** the ad-copy §6 list (free, free trial, template free, jobs, job, course, salary, crack, login, app builder, mobile app, lovable, base44, bolt, v0, gamma, canva, wix, framer, kdp royalties, print on demand) **plus** open source, download, apk, ios, android, database, backend, logo maker, image generator, ai image, children's book, picture book, custom domain, wordpress plugin, shopify, cheap, student, students, examples pdf, chatgpt, google slides, sign in. Review the search terms report daily in the first week and add every irrelevant term.

---

## 7. Testing calendar, week by week

| Week | Dates | Paid | What goes in | Gate or check |
|---|---|---|---|---|
| 1 | 26 Oct-1 Nov | $0 | Organic only (all posts are tests). Owner opens the Meta Business portfolio and ad account (USD, Europe/Sarajevo), adds the card with no campaign; tries TikTok Ads Manager registration with BiH | Attribution target Thu 29 Oct |
| 2 | 2-8 Nov | $0 | Fri 6 Nov and Sun 8 Nov: list the posts that meet the 48-hour gate (4.1). Build the slot-A campaign in **draft** on Sat 7 Nov | **Mon 9 Nov deadline:** accounts billable from BiH, or b5 → creator rehires |
| 3 | 9-15 Nov | **Slot A ($96 or $104)** | The best qualifying post from weeks 1-2 (brand post), or a wave-1 creator video once it is 48 h old (earliest about Thu 12 Nov) | Spend gate live; daily routine; stop rules |
| 4 | 16-22 Nov | Slot A must end by **Thu 19 Nov** | No new tests. Read slot A on `/go/` sales | **Mon 16 Nov offer check** reads organic `/go/` visit-to-paid and slot A |
| 5 | 23-29 Nov | **$0 (blackout)** | Organic; Black Friday "yearly is 20% off" posts only | — |
| 6 | 30 Nov-6 Dec | **Slot B ($104 or $96) from Thu 3 Dec** | The best post with a tracked sale from weeks 3-5 (wave-1 second videos are prime candidates) on the other platform | **Mon 30 Nov paid-CAC check**; consent banner target about 6 Dec |
| 7-8 | 7-20 Dec | Reserve b9 (c) only | Extend slot B's ad by +20% steps if CAC ≤ $50 over 3+ net payers | Scale rule |
| 9-10 | 21 Dec-3 Jan | $0 | Half cadence; bank January creatives | — |
| 11-13 | 4-26 Jan | From revenue (D4) | With consent and CAPI live: purchase-optimised versions of proven posts (4.8); small retargeting of consenting `/go/` visitors; Google G1 if needed; optional G2 decks probe | D4 weekly; refund brake |

---

## 8. Compliance

### 8.1 Claims and creative (all platforms)

- **Live features only**, exactly as listed in the plan; coming features never appear in paid copy until their beat passes the gate.
- **No "free", "trial", "start free", "unlimited" or "print-ready"; no AI model vendor names; no competitor names in paid copy; no "better than" claims** (strategy §4.4; EU comparative-advertising rules need verifiable claims).
- **Speed claims** are the measured, on-screen time, or labelled "sped up ×N".
- **No earnings claims.** Lane A side-hustle posts ("sell websites to local businesses") must not promise income ("make $5k a month"). Income and "get rich" claims are restricted or banned on Meta, TikTok and Google [U, read each policy page before wave 1].
- **Before/after:** only real outputs and genuinely our own "before" (V14, V48 checks). The platforms' strict before/after rules target health and weight loss; ours are design comparisons, but they must not be staged.
- **Personal attributes (Meta):** address the profession ("Freelancers:"), never assert a personal trait or hardship ("Struggling to pay rent?") (ad-copy §10).
- **Landing page = the ad:** the `/go/` page shows the same example, the price with "+ tax" and the refund line; no fake buttons or play icons in statics.
- **Prices to EU and UK consumers** carry "+ tax" or the VAT-inclusive price [U, EU Price Indication Directive; UCPD Art. 7(4)(c)].
- **Refund wording** matches the live terms; if D1 changes, every ad changes the same day.

### 8.2 "AI-generated" disclosure

- Today's creatives are real screen captures of real product outputs; no photorealistic generated people or scenes. No AI label is needed for that, but **do not switch on Meta's generative creative enhancements** (they would change the ad and may trigger an "AI info" label).
- Meta labels ads as "AI info" when its own generative tools significantly edit an image or video, or when C2PA metadata shows third-party AI content; advertisers are expected to disclose material AI edits [S, cinerads.com; commonthreadco.com, Jul 2026].
- TikTok requires a label on realistic AI-generated content, including ads; reports say the ad rules tightened in July 2026 [S, cinerads.com; stellarsearch.co.uk].
- **From the images beat:** any generated image in an ad is labelled per platform and carries machine-readable marking (C2PA / metadata) under EU AI Act Art. 50(2) from day 1 (strategy §8, ask 21, gate box 6).

### 8.3 Special ad categories and EU duties

- **None apply** (credit, employment, housing, social issues/elections/politics, financial products and services). Ticking one would cripple targeting; not ticking a required one gets ads rejected. We are a software subscription.
- **EU DSA:** beneficiary and payer set to Makeborne for every ad reaching the EU (3.1).
- **No pixel, retargeting or conversion upload before consent** (tracking.md §5). Boosts in November and December run without any tracking tag.

### 8.4 Creator disclosure

- Every paid or affiliated creator post: **#ad at the start of the caption, "ad" said in the first 3 seconds, and the platform label** (Instagram/Facebook "Paid partnership" with Makeborne as brand partner; TikTok content disclosure "Paid partnership"; YouTube "Paid promotion") [F, outreach.json compliance: FTC "Disclosures 101", TikTok branded content policy (published 4 Aug 2026, in force 31 Aug 2026), YouTube help]. A platform label alone is not enough under UK ASA/CAP guidance [U, strategy §16 risk 16].
- Partnership ads show the "Paid partnership" label automatically; the creator's caption still starts with #ad.
- TikTok: undisclosed commercial content may be kept out of the For You feed [S, creatable.io]; disclosed posts showed no reach penalty in TikTok's own comparison [S, megadigital.ai].
- The founder reviews every creator draft before posting and before any code is used.

---

## 9. Expected ranges (one slot each)

Inputs are labelled; outputs are our arithmetic [E]. Visit-to-paid low/base/high = 0.4% / 1.0% / 2.0% (paid-acquisition §4.7, plan of record).

| | Meta slot, $96 | TikTok slot, $104 | b5 total, $200 | Google decks probe, $150 (revenue, not planned) |
|---|---|---|---|---|
| CPM low / base / high case | $25 / $15 / $9 [V/S: Superads SaaS $27.10 avg; Lebesgue Mar 2026 US $16.08, UK $11.81; DE $8-10] | $13.26 / $8 / $4.08 [S/V: Triple Whale 2025 via Influee; Focus Digital median, 8 Oct 2026] | — | CPC $6.44 [V] |
| Impressions | 3,800 / 6,400 / 10,700 | 7,800 / 13,000 / 25,500 | — | — |
| Link CTR | 0.6% / 1.0% / 1.5% [V: Superads SaaS 1.40%] | 0.34% / 0.6% / 1.0% [V: Focus Digital utility software 0.34%, median 0.61%] | — | — |
| Clicks | 23 / 64 / 160 | 27 / 78 / 255 | 50 / 142 / 415 | 23 |
| Visits (LPV 70% / 80% / 90% of clicks [S, theadspend.com]) | 16 / 51 / 144 | 19 / 62 / 230 | 35 / 113 / 374 | 21 |
| Net payers | 0.1 / 0.5 / 2.9 | 0.1 / 0.6 / 4.6 | **0.1 / 1.1 / 7.5** | 0.1 / 0.2 / 0.4 (at 0.5% / 1% / 2%) |
| CAC | n/a / ~$190 / ~$33 | n/a / ~$170 / ~$23 | n/a / ~$180 / ~$27 | ~$1,430 / ~$710 / ~$360 |

**How to read it:** the base case does **not** pay back. The $200 is worth spending only because it amplifies posts that already sold, where warm creator audiences and proven hooks push the result towards the high column. That is why the gate requires a tracked sale or 5+ link clicks per 1,000 views, and why a slot that misses its stop rules is stopped at $30-50, not finished.

---

## 10. Owner decisions in this file

| # | Decision | Recommendation |
|---|---|---|
| O-AD1 | Split of b5: Meta $96 (4 days) and TikTok $104 (2 days), one slot each; both slots on one platform if only one bills from BiH; b5 → creator rehires if neither by 9 Nov | Approve (it is the plan's line, made exact) |
| O-AD2 | Ad accounts in Makeborne's legal name, USD, Europe/Sarajevo, a company card | Approve; test the card in week 1 |
| O-AD3 | Google stays $0; brand defence only if someone bids; decks probe from revenue only under the stated conditions | Approve |
| O-AD4 | Add `paid` and `cpc` (utm_medium) and `google` (utm_source) to tracking.md; register `ig-<post>-b`, `c-<handle>-s`, `g-<adgroup>` | Done 26 Oct (tracking.md §1.2) |
| O-AD5 | Advantage+ creative enhancements off on every ad | Approve (honesty and copy control) |

## 11. Sources

Read on 26 Oct 2026 unless noted.

- Meta Marketing API, supported ad-account currencies (BAM not listed; USD, EUR listed; undated): https://developers.facebook.com/documentation/ads-commerce/marketing-api/currencies
- Meta Terms of Service (effective 1 Jan 2025): https://www.facebook.com/terms.php
- Meta partnership ads: https://developers.facebook.com/documentation/ads-commerce/marketing-api/ad-creative/partnership-ads (updated 26 Mar 2026) ; https://stackinfluence.com/blog/meta-partnership-ads-guide-setup-rights-and-roi ; https://www.reshiftmedia.com/how-to-set-up-partnership-ads-on-meta/
- Meta learning phase and budgets (secondary): https://admanage.ai/blog/facebook-ads-learning-phase-guide ; https://www.tryvizup.com/blog/meta-ads-minimum-budget-requirements-2026 ; ppc.land learning-phase explainer (23 Sep 2026, via `research/paid-acquisition.md`)
- Meta Advantage+ set-up: https://searchengineland.com/meta-advantage-campaign-setup-leads-campaigns-451713 ; https://blckalpaca.at/en/knowledge-base/social-media/paid-social-performance-marketing/meta-andromeda-gem-advantage-plus.md
- Meta landing page views without a pixel: https://www.jonloomer.com/qvt/landing-page-views-no-longer-require-a-pixel/ ; https://theadspend.com/blog/landing-page-views
- Meta attribution 2026: https://www.jonloomer.com/meta-ads-attribution-2026/ ; https://dataslayer.ai/blog/meta-ads-attribution-window-removed-january-2026
- Meta EU beneficiary and payer: https://www.jonloomer.com/beneficiary-and-payer-requirements-for-meta-ads-in-the-european-union/
- Meta and TikTok AI disclosure (secondary): https://www.cinerads.com/blog/ai-ad-disclosure-requirements ; https://www.stellarsearch.co.uk/insight/tiktoks-ai-ad-disclosure-rules-are-live-what-brands-running-ai-creative-need-to-do-now
- Creative testing (secondary): https://extuitive.com/articles/meta-ads-creative-testing-framework ; https://topgrowthmarketing.com/meta-ads-creative-testing-framework/
- CPM by country (secondary): https://adligator.com/blog/meta-ads-cpm-by-country-benchmarks ; AdMake/Lebesgue via `research/paid-acquisition.md` §4.1
- TikTok budget floors and scaling (updated Jul 2026): https://ads.tiktok.com/resources/help/article/budget
- TikTok location availability by registration country (updated Jun 2025): https://ads.tiktok.com/help/article/placements-available-locations
- TikTok payment methods by billing country: https://ads.tiktok.com/help/article/supported-payment-methods
- TikTok Spark codes (secondary): https://www.leadsie.com/blog/tiktok-spark-ads-allowlisting-whitelisting ; https://help.archive.com/en/articles/10199084-creator-s-guide-to-providing-tiktok-spark-codes ; https://insense.pro/blog/tiktok-spark-ads
- TikTok One Creator Marketplace (secondary; no official market list found): https://stackinfluence.com/blog/tiktok-marketplace-requirements ; https://www.socialchamp.com/blog/tiktok-creator-marketplace/
- TikTok disclosure: https://ads.tiktok.com/help/article/about-the-content-disclosure-setting-for-creators ; https://www.tiktok.com/legal/page/global/bc-policy/en
- Google advertiser verification (BiH) and manual payments: https://support.google.com/adspolicy/answer/11512520 ; https://support.google.com/google-ads/answer/2393016
- Google trademark policy (secondary): https://www.brandverity.com/blog/google-ads-trademark-rules-101
- Keyword data (Google Ads API averages via seodata.dev): https://www.seodata.dev/keyword/gamma-alternative ; https://www.seodata.dev/keyword/ai-presentation-maker ; https://www.seodata.dev/keyword/ai-pitch-deck-generator ; https://www.seodata.dev/keyword/website-builder-for-agencies ; https://www.seodata.dev/keyword/website-feedback-tool ; https://www.seodata.dev/keyword/lovable-alternatives
- Internal: `plan/strategy.md` §§6, 8, 12, 16, 17; `content/tracking.md` §§1, 3, 4, 5, 7; `content/ad-copy.md`; `data/kpis.json` ch-boosts; `research/paid-acquisition.md` §§4-7, 9 and its Verification.

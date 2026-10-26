# How AI app and site builders grew: Base44, Lovable, Bolt.new, v0, Replit Agent

Research track: growth case studies for the Makeborne launch plan.
Prepared: 26 October 2026 (Makeborne paid-beta launch day).
Scope: what these five companies actually did in their first 90 days, how they got their first 1,000 users, how they priced, which viral loops worked, and which parts a small team with about $1,000 can copy.

Confidence labels used throughout:

- **High**: company statement, founder interview transcript, filing-backed reporting (TechCrunch, Fortune, Calcalist quoting Wix results), or the company's own live pricing/docs page.
- **Medium**: reputable secondary reporting or a founder social post seen only through a summary; numbers that agree across several secondary sources.
- **Low**: aggregator, stats site or teardown blog with no primary source; numbers that conflict.

Every "Makeborne" number below that is not a public fact is marked **Estimate** or **Assumption**. Nothing here was posted, bought or sent.

Research limit: this pass hit the shared web-search cap partway through. Items marked "not verified in this pass" (chiefly Bolt's 2025 hackathon details and 2026 revenue, Lovable's launch-day pricing, v0's revenue) still need checking before anyone quotes them publicly. A fact-check pass on 26 Oct 2026 corrected several statements inline; see "Verification (26 Oct 2026)" at the end.

---

## 1. Summary

**The headline growth stories are real, but four of the five companies started with something Makeborne does not have.**

| | Base44 | Lovable | Bolt.new | v0 | Replit Agent |
|---|---|---|---|---|---|
| Launch | Side project late 2024, company Jan 2025 | 21 Nov 2024 (third attempt, ex-"GPT Engineer") | Oct 2024, announced with one tweet | Research preview, autumn 2023 | 5 Sep 2024 (inside an existing product) |
| Owned audience before launch | Founder network only (prior startup, Explorium) | 50k+ GitHub stars on an open-source project, waitlist | StackBlitz developer community, ViteConf stage | Vercel + Next.js ecosystem | 30M+ existing Replit users |
| First revenue signal | Profitable at about 20k users (early Mar 2025) | About $1M ARR in week one | +$60K ARR on day one | $1M ARR took **10 months** | $2.8M to $150M annualized in under a year |
| Big milestone | ~$80M Wix exit at 6 months; $200M ARR Aug 2026 | $100M ARR in ~8 months; $400M Feb 2026 | ~$20M ARR in 2 months; ~$40M by Mar 2025 | 3.5M+ users by Sep 2025; revenue not disclosed | $100M ARR Jun 2025; $9B valuation Mar 2026 |
| Paid marketing early | ~None (failed influencer tests) | Company said "just $2M spent" by Feb 2025 (about $17M ARR); this is total spend, not stated as marketing spend | ViteConf keynote + one tweet | Parent company channels | Existing user base |
| Free tier | Yes (today 25 messages/month) | Yes (today 5 credits/day, 30/month) | Yes (today 1M tokens/month) | Yes (today 7 messages/day) | Yes, limited; Agent at first only for paid subscribers |
| Main loop | Build in public on LinkedIn; shared apps; referral credits | Shareable live URL + "Edit with Lovable" badge; remix; founder and employee posting | Users posting demos; open-source repo; deploy links | Community gallery with one-click forks | Massive existing base; free agent days |

The ten things that matter most for Makeborne:

1. **None of these companies hit $1M ARR in 3 months from a cold start with no audience and no free tier.** Lovable and Bolt got there in weeks, but on top of a 50k-star open-source project and a developer platform with an existing community. Base44, the true no-audience, no-VC case, reached roughly 20k users and profitability in about two months and an estimated low-single-digit millions ARR at six months. Base44 is the honest model for Makeborne's first quarter (High).
2. **Every one of the five used free usage as the top of the funnel.** Lovable's head of growth calls giving the product away "the baseline", and Lovable books free credits as a marketing cost, not as lost margin (High). Makeborne's decision to launch with no free tier and no trial is unlike all five. It can still work, because the refund policy is generous, but it makes the "see it work before you pay" proof (videos, public examples, a gallery) far more important (Estimate).
3. **The product was the ad.** Each tool's output is a shareable live link, and users posted their builds. Base44's founder judged readiness by a "virality coefficient" of 1 or more, meaning each user stays and brings in at least one more, before he spent any effort on distribution (High).
4. **Founder posting with raw numbers was the cheapest channel that worked.** Base44: building in public on LinkedIn "drove more growth than any paid channel" (Lenny's, High). Lovable: Anton Osika posted revenue milestones, and all employees post their launches and boost each other's posts in the first two hours ("beeswarming", Medium).
5. **Badges are a standard loop, removable on paid plans.** Lovable puts "Edit with Lovable" on free published sites and lets paid plans hide it; Bolt shows branding on free sites (High). Makeborne already injects a "Made with Makeborne" link on every published site, but it currently links to the homepage with **no ref or UTM tag**, so its traffic cannot be attributed. That is a zero-cost fix.
6. **Creators beat paid social for AI builders.** Lovable's head of growth says influencer marketing is about 10x bigger than paid social for them, because short video demos explain the product better than text (High). But Base44's first small influencer tests did not work (Medium). Small, measured, performance-based creator deals are the right size for $1,000.
7. **Free days and hackathons create news.** Lovable's Women's Day free day (8 Mar 2026) pushed projects built or updated to over 500k in one day, against a normal ~200k (High). Replit made Agent free for 24 hours on its 10th birthday with a $100K buildathon (High). Makeborne can run a small, capped version without a permanent free tier (owner decision).
8. **Ship constantly and announce every ship.** Lovable ships daily, and the engineers announce their own features; bigger "tier-1" launches are "big moments" that bring back dormant users (High; Verna gives no fixed cadence, so "every one to two months" is a secondary-source estimate, Low). Makeborne's "coming in days" features (images, top-ups, custom domains, GitHub sync, agency tools, AI lead research) are a ready-made calendar of launch beats.
9. **Pricing can break on day one.** Bolt had one $9 plan; users burned it in 48 hours and begged to pay more, so within a week it shipped tiered usage plans (High). Base44's gross margin was "near zero" at the start of 2026 before it built its own model (High). Makeborne's credit costs (about $0.03 per credit) give roughly 53–55% gross margin at full plan usage before payment fees, and roughly 48–51% after Whop's base card fees (Estimate, see §8), so watch heavy users from day one.
10. **What is not replicable:** VC war chests (Lovable about $550M raised across four rounds by Dec 2025; Replit $400M at $9B), Wix's marketing machine behind Base44 after June 2025 (Super Bowl spot, 679M+ YouTube ad views in Q1 2026), Vercel's Next.js distribution, and Replit's 30M+ users. What is replicable: founder posting, the badge loop, a public gallery, short demo videos, sitting with the first users, small creator deals, capped free events, and a fast launch cadence.

**Bottom line for the plan:** $1M ARR is about $83.3k MRR, or roughly 1,900–2,300 paying subscribers at Makeborne's prices (Estimate, see §8). The case studies say that number is reachable only through a viral loop plus founder distribution, not through $1,000 of ads. Treat $1M ARR in 90 days as the stretch scenario, and build the plan so that one breakout video or post can carry the business there if it happens.

---

## 2. Base44 (Maor Shlomo): bootstrapped to a Wix exit

### 2.1 Snapshot

- Solo founder, ex-founder of Explorium (raised $125M, ~100 staff), so he had a professional network but no product audience. Built Base44 after reserve military duty, starting late 2024 as a side project; company formed January 2025. Bootstrapped with roughly $10–20K of his own money, mostly spent on model usage and failed influencer tests ([What A Startup, 21 Jun 2025](https://whatastartup.substack.com/p/a-solo-founder-just-sold-his-6-months-old-ai-startup-for-80-million-dollars); [SiliconANGLE, 18 Jun 2025](https://siliconangle.com/2025/06/18/base44-joins-wix-80m-deal-support-natural-language-software-development)).
- Product angle: "batteries included". The backend (database, auth, storage, email, analytics, hosting) was built in, handled by deterministic code rather than AI, and hosted by Base44 ([Seed to Sequoia, 17 Jul 2025](https://seedtosequoia.silverwood.ai/p/10-lessons-from-base44-s-meteoric-acquisition-e59d)).

### 2.2 Timeline

| Date | Metric | Value | Source | Confidence |
|---|---|---|---|---|
| Late 2024 | Build starts as side project | — | What A Startup (21 Jun 2025) | Medium |
| Jan 2025 | Company founded | — | SiliconANGLE (18 Jun 2025) | High |
| First 3 weeks | Sign-ups | ~10,000 | GetLatka citing TechCrunch (18 Jun 2025); What A Startup says ~10k by end of month one | Medium |
| ~3 weeks after "launch" | ARR | $1M (Lenny's episode description, verbatim: "hit $1 million ARR just three weeks after launch") | Lenny's (6 Jul 2025) | **Low–Medium**: host's summary, not a founder figure; conflicts with 10k users at 3 weeks; probably measured from the start of paid plans, not first launch |
| ~Early Mar 2025 | Users, profitability | 20k+ users and profitable | Maor Shlomo LinkedIn post (date shown only as "1y"); SiliconANGLE: "more than 20,000 users as of March" | High |
| May 2025 | Monthly profit after model costs | $189K | Founder LinkedIn, via Gigazine/GetLatka | Medium–High |
| 18 Jun 2025 | Acquisition | ~$80M cash + earn-outs through 2029; ~$25M retention for 8 staff | Wix release via SiliconANGLE; TechCrunch via GetLatka | High |
| 18 Jun 2025 | Users / ARR at sale | ~250,000 users (some say 300k–400k; Lenny's episode description, 6 Jul 2025, says "more than 400,000 users", probably counted a few weeks after the sale); ARR "a few million" (Wix), ~$3.5M common estimate; SiliconANGLE confirms "about $80 million plus additional earn-out payments through 2029" but gives no cash/retention split | GetLatka, What A Startup, Lenny's, SiliconANGLE | Medium (users), Low (ARR) |
| Aug 2025 | ARR | ~$15M | Founder LinkedIn via GetLatka | Medium |
| 19 Nov 2025 | Users / paying | 2M users (7x since June); >1,000 new paying subscribers per day; category share low single digits to >10%; ~$50M ARR expected by year end | [Calcalist/CTech, 19 Nov 2025](https://www.calcalistech.com/ctechnews/article/sy194qsg11g) (Wix Q3 results) | High |
| 8 Feb 2026 | First Super Bowl ad ("It's App to You") | 69.4M TV impressions (iSpot) | [Wix press room, 28 Jan 2026](https://www.wix.com/press-room/home/post/base44-to-air-its-first-super-bowl-ad); [Marketing Brew, 15 Jun 2026](https://www.marketingbrew.com/stories/base44-app-advertising-strategy-youtube-smart-tvs-superbowl) | High |
| ~4 Mar 2026 | ARR | $100M | Founder post; Wix Q4 2025 results (via GetLatka, Investing.com) | High |
| Q1 2026 | YouTube | 8th most-viewed US brand on YouTube, 679M+ views (incl. ads) | Marketing Brew (15 Jun 2026) | Medium–High |
| May 2026 | ARR | ~$150M | Wix disclosure, Calcalist 25 May 2026 (via GetLatka); [Investing.com, Aug 2026](https://www.investing.com/news/company-news/wix-q2-2026-slides-ai-push-drives-15-revenue-growth-base44-scales-93CH-4834907) | High |
| Jun 2026 | Discord | 44,000+ active members; ~1,000 higher-education partners incl. MIT | Marketing Brew | Medium–High |
| 20 Aug 2026 | ARR | $200M+ ("We just blew past $200M ARR") | [CTech, 20 Aug 2026](https://www.calcalistech.com/ctechnews/article/syw900pvdzg) | High |
| 2026 | Gross margin | "Near zero" / "close to break-even" at start of 2026; ~60% expected in H2 2026 after its own model (Base1); Wix plans to reinvest the savings in marketing | Investing.com (4 Aug 2026); CTech (20 Aug 2026) | High |
| 20 Aug 2026 | Earn-out | Wix to pay Shlomo another $41M after further milestones; total proceeds above $150M | CTech (20 Aug 2026) | High |

### 2.3 First 1,000 users

- **Three close friends first.** He sat next to them, watched where the product broke and fixed it on the spot, then repeated. His rule: find 3–5 people who will live inside a broken v1 every day (Maor Shlomo LinkedIn post; Seed to Sequoia) (High).
- **Then his own network:** friends, ex-colleagues and WhatsApp groups, asking for feedback rather than selling (What A Startup) (Medium).
- **Retention before distribution.** He deliberately held back on scaling until the average new user stayed, used the product and brought someone else in (virality coefficient of 1 or more) (LinkedIn post) (High).
- **Shipping speed:** about 13 production deploys a day in the early weeks (What A Startup) (Medium).

### 2.4 Channels and tactics in the first 90 days

| Tactic | What happened | Confidence |
|---|---|---|
| Build in public on LinkedIn (and X) | The main channel. Product updates, prototypes, user wins and setbacks. Lenny's: it drove more growth than any paid channel. Some users converted only after seeing 10+ updates. Fit his audience because he was selling building to builders. | High |
| Users sharing what they built | Word of mouth and shared apps did the rest. Unexpected users (doctors, NGOs, teachers) reinforced the story. | Medium |
| Paid ads / marketing hires | None. "Without spending any money on marketing" (Lenny's episode description). | High |
| Influencer experiments | Tried, did not work, part of the $10–20K spent. | Medium |
| Logos | eToro and SimilarWeb named as users (no formal partnership confirmed). | Medium |
| Activation cut | Removed a "helpful" review step (better code, but an extra step before the first result); Lenny's says this tripled activation. | High (claim), Medium (exact multiple) |

### 2.5 Pricing and free tier

- Today ([base44.com/pricing](https://base44.com/pricing), 26 Oct 2026): Free (25 message credits/month, 100 integration credits, up to 5 apps), Starter $16/mo yearly (~$20 monthly), Builder $40, Pro $80, Elite $160 (yearly prices). Paid plans include connecting a custom domain (High).
- Unit: per message, not per amount of work. The internal teardown (23 Oct 2026) found a 15-minute build with testing cost 1 of 25 free monthly messages. Simple, predictable units build trust.
- Launch-era pricing was not found in this pass.

### 2.6 Viral loops

1. **Founder content loop:** post, people try, people post their builds, the founder reposts them.
2. **Shared app links:** every app is published on a base44.app address (the teardown saw a badge on free published apps).
3. **Referral credits** (docs, 26 Oct 2026): the invitee gets 30 credits at sign-up; the referrer gets 30 when the friend publishes a first app and 100 when the friend upgrades; credits expire after 40 days. An earlier version (Sep 2025 changelog) gave 10 credits each, capped at 5 referrals ([docs](https://docs.base44.com/Community-and-support/Referral-program)) (High).
4. **After the acquisition, the paid machine:** Super Bowl ad (one roundup says it ended with a $50,000 app-building contest; Medium), CTV, heavy YouTube pre-roll, Discord as the community home, university partnerships. Wix's non-GAAP sales and marketing spend was $173M in Q2 2026, 46% of non-GAAP gross profit, up from 31% in Q2 2024 (Investing.com, 4 Aug 2026, High). The "+67% year on year" figure comes only from GetLatka citing Calcalist and was not confirmed in the primary summary (Low). The Wix press release (28 Jan 2026) mentions no contest or prize.

### 2.7 Replicable with $1,000?

| Replicable | Not replicable |
|---|---|
| Sitting with 3–5 first users; fixing live | Wix distribution, Super Bowl, $173M/quarter marketing |
| Daily LinkedIn/X build-in-public with real numbers | His prior-founder reputation (partly) |
| Removing steps before the first "wow" | Earn-out money to fund growth |
| Referral credits (Makeborne credits cost ~$0.03 each) | A home-built model to fix margins |
| A Discord/WhatsApp community for builders | 1,000 university partnerships |

---

## 3. Lovable (Anton Osika, Fabian Hedin): the fastest ARR curve

### 3.1 Snapshot

- Stockholm. Grew out of **GPT Engineer**, an open-source project created 29 Apr 2023; Osika tweeted a demo video and it became one of the most-starred AI coding repos (55,003 GitHub stars on 26 Oct 2026, [GitHub](https://github.com/AntonOsika/gpt-engineer)). A hosted "GPT Engineer app" ran behind a waitlist and was iterated on before the product was relaunched as **Lovable on 21 November 2024** ([Osika on Lenny's Podcast, 9 Mar 2025, transcript](https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/anton-osika/transcript.md)) (High). Positioning: "packaging for non-technical people", plus GitHub sync for teams.

### 3.2 Timeline

| Date | Metric | Value | Source | Confidence |
|---|---|---|---|---|
| 29 Apr 2023 | GPT Engineer open-sourced | 50k+ stars later | GitHub; Osika (Lenny's) | High |
| Oct 2024 | Pre-seed | $7.5M / €6.8M (Hummingbird, byFounders), still as GPT Engineer | productgrowth.blog; catalaize | Medium |
| 21 Nov 2024 | Lovable launch | #1 Product Hunt and Hacker News reported | Osika (date); productgrowth.blog (PH/HN) | High (date), Medium (rankings) |
| Week 1 | ARR | ~$1M, then "faster than 1 million ARR per week" | Osika (Lenny's) | High |
| ~4 weeks | ARR | $4M | Lenny's intro; Osika did not confirm it on air ("We don't anchor on the numbers") | Medium |
| ~2 months | ARR / team | $10M with 15 people | Lenny's episode title (host framing, not repeated by Osika in the transcript) | Medium |
| End 2024 | ARR | ~$7M | Sacra estimate | Low–Medium |
| Feb 2025 | ARR / paying | $17M ARR, 30,000 paying customers; $15M pre-Series A (Creandum); "just $2 million spent" | [TechCrunch, 17 Jul 2025](https://techcrunch.com/2025/07/17/lovable-becomes-a-unicorn-with-200m-series-a-just-8-months-after-launch) | High |
| ~Mar 2025 | Users | 300k MAU, 30k paying, "almost only through organic word of mouth"; 15,000 projects per day hitting GitHub | Osika (Lenny's) | High |
| 17 Jul 2025 | ARR / users | $75M ARR in 7 months; 2.3M active users; 180k+ paying; 45 FTE; ~10M projects; $200M Series A at $1.8B (Accel) | TechCrunch (17 Jul 2025) | High |
| ~23 Jul 2025 | ARR | $100M | [Sifted, 23 Jul 2025](https://sifted.eu/articles/lovable-hits-100m-arr) (read via search summary; TechCrunch 11 Mar 2026 also lists $100M in July 2025) | High |
| Nov 2025 | ARR | $200M (Slush); ARR = prior month revenue x 12; ~half of customers have enterprise accounts | [Fortune, 21 Nov 2025](https://fortune.com/2025/11/21/lovables-ceo-ai-vibe-coding-enterprise-ambitions-annual-revenue) | High |
| Nov 2025 | Users | ~8M | TechCrunch (11 Mar 2026) | High |
| Dec 2025 | Funding | $330M Series B at $6.6B | The AI Corner citing TechCrunch | Medium–High |
| Jan 2026 | ARR | $300M | TechCrunch (11 Mar 2026) | High |
| Feb 2026 | ARR / staff | $400M+; +$100M in one month; 146 FTE (~$2.77M ARR per employee) | [TechCrunch, 11 Mar 2026](https://techcrunch.com/2026/03/11/lovable-says-it-added-100m-in-revenue-last-month-alone-with-just-146-employees/) | High |
| 8 Mar 2026 | Free day | 500k+ projects built/updated vs ~200k typical | TechCrunch (11 Mar 2026) | High |
| Jun 2026 | Run rate | ~$500M (self-reported) | productgrowth.blog citing TechTimes | Medium |
| Sep 2025 | Traffic | ~40% below 2025 peak (Barclays, via press) | productgrowth.blog; Scroll | Medium |

Implied blended revenue per payer (Estimate, from the numbers above): Feb 2025 $17M / 30k = ~$47/month; Jul 2025 $75M / 180k = ~$35/month.

### 3.3 First 1,000 users

Lovable never had a "first 1,000 users" problem: the open-source community and the waitlist from the earlier GPT Engineer app were the launch audience, and the PH/HN launch converted them. The replicable part is **the sequence**: give away an open tool, build a following around a demo video, run a waitlisted beta, iterate until the product is "lovable", then relaunch loudly (High/Medium).

### 3.4 Channels and tactics in the first 90 days

| Tactic | Detail | Source | Confidence |
|---|---|---|---|
| Relaunch to an owned audience | GPT Engineer followers + waitlist + PH/HN | Osika; productgrowth.blog | High/Medium |
| Founder posting | Raw revenue milestones, hiring photos, product ideas on X and LinkedIn | The AI Corner; Fortune | Medium |
| Employee "beeswarming" | Everyone ships, builds side projects on Lovable and posts; internal channel to boost within ~2 hours | The AI Corner (29 May 2026) | Medium |
| Co-marketing | Supabase (webinars, example apps), Replicate, Resend | productgrowth.blog; catalaize | Medium |
| Daily shipping | Ships daily or several times a week as a re-engagement tactic; engineers announce their own features | [Elena Verna, Lenny's, Dec 2025](https://www.lennysnewsletter.com/p/the-new-ai-growth-playbook-for-2026-elena-verna) | High |
| Free weekend | Early 2025 free weekend for acquisition (another in summer 2025 to reactivate) | The AI Corner | Medium |
| Spend | "Just $2 million spent" by Feb 2025 at $17M ARR. TechCrunch quotes this from an Osika post without saying what it covers; it reads as total money spent, not marketing spend | TechCrunch | High (quote), Low (that it was marketing) |

Later (not first 90 days): influencer marketing ~10x bigger than paid social; sponsored hackathons with free credits (e.g. SheBuilds, women-only 48-hour hackathon); ambassador programme; Discord with "hundreds of thousands" of members and community managers; student discounts (50% off Pro back-to-school campaign, Aug 2025, Medium); out-of-home ads in NYC, SF and London from early 2026 (Medium); no brand-marketing team, "brand through product" (Verna, High).

### 3.5 Pricing and free tier

- Today ([lovable.dev/pricing](https://lovable.dev/pricing); [docs FAQ](https://docs.lovable.dev/introduction/faq), 26 Oct 2026): Free gives 5 build credits a day, up to 30 a month, plus monthly Cloud and AI credits; publishing to a lovable.app address is free on all plans. Pro starts at $25/month or $250/year (~$21/month) for 100 monthly credits, plus 5 daily build credits with no monthly cap, and scales in credit tiers up to $2,250/month for 10,000 credits; Business starts at $50/month for 100 credits; top-ups (Pro and Business only) last 12 months ([docs: subscription plans](https://docs.lovable.dev/introduction/subscription-plans); [plans and credits](https://docs.lovable.dev/introduction/plans-and-credits), 26 Oct 2026) (High).
- Lovable books free usage and giveaways **as marketing cost**, and Verna calls freemium "just a baseline" (High). The idea that free giveaways should *exceed* paid marketing spend is **not** in the Verna transcript; it is The AI Corner's inference (Low–Medium).
- Launch-day prices were not verified in this pass.

### 3.6 Viral loops

1. **The "Edit with Lovable" badge.** It appears on live sites published from free projects. Paid plans hide it under Project settings > Publishing; downgrading to Free brings it back on the next publish ([docs FAQ](https://docs.lovable.dev/introduction/faq)) (High). Every free site is an ad that links back to the builder.
2. **Shareable live preview and URL from the first prompt.** Verna calls the first preview the "wow moment", earlier than a classic "aha" (High).
3. **Remix.** Any plan can copy a project (code and database structure); a showcase of products built with Lovable (Osika mentions a launched.lovable.app gallery, itself built in Lovable) (High).
4. **Referral:** the invitee gets 10 bonus credits; the referrer gets 100 credits when the invitee pays for a first Pro or Business plan; credits expire after 12 months (docs FAQ) (High).
5. **#BuiltWithLovable** posts and creator demos on X, TikTok and YouTube (catalaize, Medium).
6. **Free days** as news events (8 Mar 2026 record) (High).

### 3.7 Replicable with $1,000?

| Replicable | Not replicable |
|---|---|
| Badge on every published output, linking back with attribution | 50k-star open-source audience at launch |
| Daily shipping and posting; team-wide boosting in the first 2 hours | ~$555M+ venture funding; 146-person team |
| Public gallery with remix | #1 PH/HN on the strength of an existing following |
| Referral credits | Paid hackathon sponsorships at scale, OOH billboards |
| One capped free day as a news event (owner decision) | Supabase-level co-marketing partners (partly) |

---

## 4. Bolt.new (StackBlitz, Eric Simons): one tweet, a near-dead company

### 4.1 Snapshot

StackBlitz spent seven years building WebContainers (a Node.js runtime inside the browser). Before Bolt it was under $1M ARR; Simons says "we were at 600" on launch day, which reads as ~$600K ARR (other sources say as low as $80K; Low). The team had planned to shut down. A Feb 2024 prototype was shelved because models were not good enough; early access to a new frontier coding model in June 2024 made it work, and they **built Bolt in 90 days** ([Contrary Research, updated 2 May 2025](https://research.contrary.com/company/bolt); [Simons on Lenny's, 13 Mar 2025, transcript](https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/eric-simons/transcript.md)) (High).

### 4.2 Timeline

| Date | Metric | Value | Source | Confidence |
|---|---|---|---|---|
| 24 Sep 2024 | Open-source bolt.new repo created | 16,578 stars, 14,831 forks (26 Oct 2026); community fork bolt.diy 19,992 stars | [GitHub](https://github.com/stackblitz/bolt.new), [bolt.diy](https://github.com/stackblitz-labs/bolt.diy) | High |
| ~3 Oct 2024 | Launch: announced in Simons's ViteConf 2024 keynote (Evil Martians) and, in Simons's words, "with just a tweet" (Lenny's); both were true, so the "one tweet" story leaves out the conference stage | — | Simons (Lenny's); [Evil Martians, 2 Dec 2024](https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts) | High (method), Medium (exact date) |
| Day 1 / Day 2 | New ARR | +$60K / +$80K | Simons (Lenny's) | High |
| Week 1 | Pricing | $9 single plan burned in 48 hours; tiered usage plans shipped within a week | Simons (Lenny's) | High |
| 4 weeks | ARR | $0 to $4M, "tens of thousands of new customers" | Model provider's customer story (via Evil Martians) | High |
| 12 Nov 2024 | Users | 100k+ per week | Simons tweet (via Evil Martians) | Medium |
| Nov 2024 | Series A | $22M | Contrary | High |
| ~2 months | ARR | ~$20M ("without a mobile responsive view") | Simons (Lenny's) | High |
| Jan 2025 | Series B | $105M (Emergence, GV), ~$700M valuation reported | Contrary | High (round), Medium (valuation) |
| Mar 2025 | ARR / users | ~$40M ARR; 3M+ registered; ~1M MAU; 67% non-developers; 1M+ sites deployed on Netlify | Simons (Lenny's); Contrary | High |
| 2025 | Target | $100M ARR by end of 2025 | Simons (Lenny's) | High (as a target) |
| 2025–2026 | Later ARR | Not verified in this pass | — | — |

### 4.3 First 1,000 users

The StackBlitz developer community (millions had used StackBlitz) plus the ViteConf audience and Simons's X following. Day-one revenue of $60K ARR is roughly 550 subscribers at the $9 launch plan (about 250 if everyone had paid $20; Estimate; corrected 26 Oct 2026, since the only plan on day one was $9), so the first thousand paying users came within the first two days from an audience they already had (Medium).

### 4.4 Channels and tactics in the first 90 days

- **One tweet with a live demo, no marketing spend** (Contrary; Simons) (High).
- **Open source on day zero** (repo created 9 days before launch), which earned developer goodwill and a community fork (High).
- **"True virality across channels"**: users and creators posted builds on X, Reddit (r/boltnewbuilders), YouTube and TikTok (Contrary; Evil Martians) (High/Medium).
- **Partner integrations as distribution:** one-click deploy to Netlify, Supabase database, later Expo (mobile), Stripe, Figma. Supabase's CEO posted about the sign-up spike that Bolt sent them (Evil Martians) (Medium).
- **Founder and chief of staff on support** about 95% of the day in the first weeks (Simons) (High).
- **Hiring from the community** (Simons) (High).
- Later: a large online hackathon in mid-2025 ("World's Largest Hackathon") with a required built-with-Bolt badge was reported but **not verified in this pass** (Low).

### 4.5 Pricing and free tier

- Launch: one $9 plan, replaced within a week by tiered usage plans that let people pay far more for more AI work. Simons says competitors copied this. "Netflix-style" flat pricing cannot fund agent-style usage (High).
- Contrary (May 2025): $20/month (10M tokens) to $200/month (120M tokens).
- Today ([bolt.new/pricing](https://bolt.new/pricing), 26 Oct 2026): Free (1M tokens/month, 300K/day, Bolt branding on websites, no custom domain); Pro $18/month billed yearly (10M tokens, rollover, badge removed, custom domains); Teams $27/member/month (High).
- The browser runs the code on the user's CPU, so the free tier was cheap to serve (Simons) (High). Makeborne does not have that cost advantage.

### 4.6 Viral loops

Deploy links (every build gets a real URL), Bolt branding on free sites, public demos by creators, open-source forks, and partner cross-promotion (Supabase, Netlify).

### 4.7 Replicable with $1,000?

| Replicable | Not replicable |
|---|---|
| A launch post with a 30–60 second live demo | 7 years of runtime tech; near-zero serving cost |
| Usage-based tiers from day one; let heavy users pay more | Existing developer community and conference stage |
| Founder on support during launch weeks | Early access to a new frontier model |
| Integration partners who will repost | $105M Series B |

---

## 5. v0 (Vercel, Guillermo Rauch): slow start, then a community gallery

### 5.1 Snapshot

v0 launched as a research preview in autumn 2023 (Acquired: September 2023), first as a UI generator for Vercel's Next.js world, later a full app builder. It is the **counter-example**: it took **10 months to reach $1M ARR**, then $2M 14 days later and $4M about 20 days after that, once models got good at code and non-developers arrived ([Acquired ACQ2, 18 Feb 2025](https://www.acquired.fm/acq2-episodes/building-web-apps-with-just-english-and-ai-with-vercel-ceo-guillermo-rauch)) (High).

### 5.2 Timeline

| Date | Metric | Value | Source | Confidence |
|---|---|---|---|---|
| Autumn 2023 | Research preview | Waitlist (~100k claimed, unsourced) | Acquired; DevGraphiq | High (launch), Low (waitlist) |
| ~10 months later | ARR | $1M | Rauch (Acquired) | High |
| +14 days / +20 days | ARR | $2M / $4M | Acquired; secondary | High / Medium |
| Apr 2025 | Users | 1.3M+ have used v0; "v0 Community" gallery: 20,000+ submissions in under a month; one showcase had 2,000 forks | [Rauch on Lenny's, 13 Apr 2025, transcript](https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/guillermo-rauch/transcript.md) | High |
| 30 Sep 2025 | Users | 3.5M+ unique users; Teams + Enterprise >50% of v0 revenue | Vercel Series F release (via [DevGraphiq, upd. 20 Oct 2026](https://devgraphiq.com/v0-statistics)) | High |
| Feb 2026 | Users | 4M+ | Sacra (via DevGraphiq) | Medium |
| 2026 | v0 revenue | Not disclosed by Vercel; third-party guesses $30–70M are unsourced | DevGraphiq | — |

### 5.3 Channels, pricing, loops

- **Distribution:** Vercel's existing users (6M+ per Acquired), Next.js and shadcn/ui ecosystem, Rauch's large X following, open-source templates and SDKs that seeded imitators (Acquired; Lenny's) (High).
- **Loop:** the v0 Community gallery. People publish what they built; others open the code and **fork it** as a starting point, which also fixes "prompt writer's block" (Rauch, High). Sales and marketing teams build prospect tools in v0 (Rauch on Lenny's describes a VP of sales engineering building one; whether teams send v0 links to prospects as a habit was not confirmed in the transcript, Medium).
- **Pricing today** ([v0.app/pricing](https://v0.app/pricing), re-checked directly 26 Oct 2026): Free with a 7 messages/day limit; Plus $30/user/month with $30 of monthly credits plus $2 of free daily credits on login; Business $100/user/month; $5 of one-time credits for new users (High). Rauch himself mentioned paying the $20 subscription in April 2025 (High).

### 5.4 Replicable with $1,000?

The gallery-plus-fork loop and "send a link instead of a deck" behaviour are fully replicable. The Vercel and Next.js distribution is not. Lesson: **a good product with weak model quality and a developer-only audience grew slowly; the jump came when output quality crossed a threshold and non-developers arrived.**

---

## 6. Replit Agent (Amjad Masad): a pivot inside a giant user base

### 6.1 Snapshot

Replit spent about nine years as a browser coding environment (34M users by Nov 2024). It launched **Replit Agent in early access on 5 September 2024**, at no extra cost for paid Core and Teams subscribers, with pricing to follow ([Gigazine/The Decoder, Sep 2024](https://www.gigazine.net/gsc_news/en/20240909-replit-agent)) (High). The pivot from professional developers to non-programmers, which Masad called controversial, is credited with finding the market ([TechCrunch, 11 Mar 2026](https://techcrunch.com/2026/03/11/replit-snags-9b-valuation-6-months-after-hitting-3b)) (High).

### 6.2 Timeline

| Date | Metric | Value | Source | Confidence |
|---|---|---|---|---|
| 5 Sep 2024 | Agent early access | Paid subscribers only at first | Gigazine / The Decoder | High |
| Nov 2024 | Users | 34M registered; B2B package since Jul 2024 | [Masad on Lenny's, 21 Nov 2024, transcript](https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/amjad-masad/transcript.md) | High |
| Dec 2024 | ARR | ~$10M | ARR Club; Unite.ai | Medium |
| Jun 2025 | ARR | ~$100M | Masad (via secondary) | Medium–High |
| 10 Sep 2025 | Revenue / round | Annualized revenue $2.8M to $150M in under a year; 40M+ users; $250M at $3B; Agent 3 | [Replit press release, 10 Sep 2025](https://kyodonewsprwire.jp/release/202509115002) | High |
| 2025 | Full-year revenue | ~$240M | Unite.ai | Medium |
| 11 Mar 2026 | Round | $400M Series D at $9B; target $1B ARR by end of 2026; no current ARR released | TechCrunch (11 Mar 2026) | High |
| 2 May 2026 | Free Agent Day | Agent free for 24 hours for the 10th birthday + 24-hour buildathon with $100K+ prizes | [Replit forum, 1 May 2026](https://replit.discourse.group/t/replit-agent-is-free-on-may-2nd/11713) | High |
| Oct 2026 | Status | Still chasing the $1B run-rate target | [ARR Club, 19 Oct 2026](https://www.arr.club/signal/replit-announced-1b-run-rate-revenue-target-for-end-of-2026) | Medium |

### 6.3 Channels, pricing, loops

- **Distribution:** the existing 30M+ users and Masad's X presence (he names X as Replit's most active channel) (High).
- **Monetisation first:** Agent was a reason to upgrade, not a free toy, at launch (High). Later free allowances and a free day were added.
- **Loops:** viral posts by users (for example, a parent sharing a child's app), deployed apps on Replit URLs, buildathons and free days (High/Medium).

### 6.4 Replicable with $1,000?

Replit's lesson for Makeborne is the reverse of Lovable's: **a new AI feature can be sold to people who already pay.** Makeborne has no installed base, so this is not replicable today. What is replicable: anniversary or milestone free days, small buildathons, and making the paid plan the only way to get the new capability.

---

## 7. Cross-cutting patterns

| Pattern | Base44 | Lovable | Bolt | v0 | Replit | Copyable by Makeborne? |
|---|---|---|---|---|---|---|
| Rode a model quality step-change | Yes | Yes | Yes (decisive) | Yes (jump after 10 months) | Yes | Yes: images "in days" is Makeborne's own step-change beat |
| Output is a shareable live link | Yes | Yes | Yes | Yes | Yes | **Yes, already live** (sites on a Makeborne address; review links) |
| Branding on free output | Badge on free apps (teardown) | "Edit with Lovable" | Bolt branding | Gallery attribution | Replit URLs | Yes: "Made with Makeborne" exists; add attribution and extend to review links, books and decks |
| Free usage at top of funnel | Yes | Yes | Yes | Yes | Partly | **No (owner decision)**: replace with videos, gallery, refund promise, capped events |
| Founder posting with numbers | Core channel | Yes | Launch tweet | Yes | Yes | Yes |
| Existing audience at launch | Small (network) | Large | Large | Very large | Huge | No |
| Community (Discord) | 44k+ | Hundreds of thousands | Subreddit | Gallery | Forum | Yes, start small |
| Paid ads early | No | Small or unknown ("$2M spent" by $17M ARR is total spend, not ad spend) | No | No | No | Tiny budget only |
| Tier-1 launches + daily ships | Yes | Yes | Yes | Yes | Yes | Yes: coming features give 6+ beats |
| Pricing iteration in week 1 | — | — | Yes ($9 to tiers) | — | Yes (later effort-based) | Watch credit burn daily |

**The two models of fast growth:**

1. **Audience-first (Lovable, Bolt, v0, Replit):** launch to an audience you already own and convert it in days. Makeborne cannot do this at launch.
2. **Loop-first (Base44):** start with 3–5 obsessive users, fix until they bring others, post every day in public, and let shared output spread. This is Makeborne's path. Base44 shows it can take a solo founder from 0 to ~20k users and profitability in roughly two months, and to an estimated few million ARR in six, without ad spend.

---

## 8. What "$1M ARR in 3 months" means at Makeborne's prices

All figures in this section are **estimates** built on stated assumptions; none are forecasts.

**Target:** $1,000,000 ARR = $83,333 MRR.

| Plan mix (Create $20 / Studio $49 / Scale $99), monthly billing | Blended $/month | Paying subscribers needed |
|---|---|---|
| All Create | $20.00 | 4,167 |
| 60% / 30% / 10% (consumer-heavy) | $36.60 | ~2,277 |
| 40% / 45% / 15% (agency-heavy) | $44.90 | ~1,856 |
| Lovable's Feb 2025 blended ARPU (~$47) as a benchmark | ~$47 | ~1,770 |

Yearly plans (20% off) lower the ARR per subscriber by up to 20% but bring cash forward; with 30% of subscribers on yearly, blended ARR falls by about 6% (Estimate).

**Funnel arithmetic (Assumptions):** to add ~2,000–2,300 subscribers in 90 days you need about 22–26 new paying subscribers a day. With no free tier, visitor-to-paid conversion might be 0.5–2% for well-targeted traffic (Assumption; to be replaced with real Whop and UTM data in week 1). That implies roughly 100k–500k targeted visitors in 90 days (about 1,100–5,100 a day). $1,000 of paid clicks at $0.50–$2.00 each buys only 500–2,000 visits, so **paid media cannot carry this target**. It has to come from founder posts, creators, the badge and review-link loop, and at least one breakout video.

**Gross margin check (Estimate):** at about $0.03 provider cost per credit, a fully used plan costs Create $9 of $20, Studio $22.50 of $49, Scale $46.50 of $99, which is roughly 53–55% gross margin at full use and more for typical partial use. **Payment fees lower this** (added 26 Oct 2026): Whop's base card fee is 2.7% + $0.30, plus 1.5% for international cards and 1% for currency conversion, with optional add-ons (billing 0.5%, tax 2%) stacking on top ([Whop fees](https://docs.whop.com/fees)). With international cards, full-use margin is about 49% on Create ($20 - $9 - $1.14), 49% on Studio ($49 - $22.50 - $2.36) and 48.5% on Scale ($99 - $46.50 - $4.46) (Estimate). Refunds and chargebacks ($15 per dispute) come on top. Base44 sat near zero gross margin in early 2026 while it grew; Makeborne cannot afford that on $1,000.

**Free-usage economics, if the owner reconsiders (owner decision):** a capped first-build allowance of 25 credits costs at most ~$0.75 per new account. 1,000 such accounts cost at most ~$750, close to the whole budget. If 3% converted at $20 (Assumption), that is 30 subscribers and $600 MRR, paying back in about 1.3 months on revenue, or about 2.5 months on gross profit if those subscribers use their full credits (~50% margin after fees; Estimate). A **time-boxed free day** concentrates the same cost into one news moment (the Lovable and Replit pattern) and is easier to cap than a permanent free tier.

**Scenarios for day 90 (Estimates, for planning only):**

| Scenario | What has to happen | Paying subs | ARR |
|---|---|---|---|
| Conservative | Founder posting + network + small creator tests; no breakout | 150–400 | ~$65K–$175K |
| Base | Above + badge/gallery loop working + 2–3 launch beats land + one creator hit | 500–1,000 | ~$220K–$440K |
| Stretch (the owner's goal) | Above + one or more breakout videos (millions of views) + PH/HN top placement on an image-generation launch + referral loop above 1 | 1,900–2,300+ | ~$1M |

---

## 9. Tactics for Makeborne (ranked), with the case evidence behind each

Only features **live at launch** are promoted. Coming features appear only as future launch beats.

| # | Tactic | Why (case evidence) | Cost | Effort | Expected impact |
|---|---|---|---|---|---|
| 1 | **Founder build-in-public, daily, on LinkedIn and X**: real numbers (subscribers, builds, refunds), before/after builds, failures, one short clip a day | Base44's main channel ("more growth than any paid channel"); Lovable's founder posting | $0 | 45–60 min/day | High; the single most proven no-budget channel |
| 2 | **Fix the badge loop**: add `?ref=badge&utm_source=made-with-makeborne&utm_medium=referral&utm_campaign=<site>` to the existing "Made with Makeborne" link; add the same clickable credit to client review pages (today they show the brand mark, but not as a link), book exports and deck exports; keep it on by default | Lovable "Edit with Lovable"; Bolt branding; every case used output as the ad | $0 (small product change, owner/Codex executes) | 0.5–1 day | Medium–High; compounding, and measurable from day one |
| 3 | **Public gallery of real Makeborne outputs with "Make one like this"** (pre-fills the brief): sites, books and decks, each with a live link | v0 Community (20k submissions in under a month, forks); Lovable remix and showcase; also replaces the missing free tier as proof | $0–$50 | 2–4 days | High for conversion; Medium for reach |
| 4 | **Short demo videos, 3–5 a week** (Reels, TikTok, Shorts, X, LinkedIn): brief in, finished site, book or deck out in under 60 seconds; reuse the v14 and v9 vertical films for launch posts | Verna: short video demos work because the product is hard to explain in text; creators ~10x paid social for Lovable | $0 (in-house) | 1–2 h per video | High if one breaks out; this is the stretch-scenario lever |
| 5 | **Sit with the first 5–10 paying users** (video calls), fix what breaks within 24 hours, and ask each to post their build | Base44's first-users method; virality coefficient of 1 or more before scaling | $0 | 1–2 h/day for 2 weeks | High for retention and testimonials |
| 6 | **Micro-creator tests, performance-weighted**: 3–5 niche creators (freelancers, web-design and agency YouTubers/TikTokers, 5k–50k followers), $100–250 each plus a tracked affiliate link (Whop has a built-in affiliate programme: unique links per affiliate, a global rate that defaults to 30%, custom percent or fixed rates per partner, recurring or first-payment-only commissions, 30-day hold before payout; [Whop docs](https://docs.whop.com/manage-your-business/growth-marketing/affiliate-program.md), checked 26 Oct 2026), clearly disclosed as ads | Lovable's creator programme; Base44's early influencer tests failed, so keep tests small and measured | $500–$700 of the $1,000 | 3–5 days total | Medium (high variance) |
| 7 | **Referral credits**: invitee and referrer get credits (e.g. 50 each, ~$1.50 max cost) when the friend becomes a paying subscriber | Base44 (30/30/100) and Lovable (10/100) referral programmes | ~$3 per paid referral at full use (Estimate) | Product work: 1–3 days (credit grants are tied to the top-up work) | Medium |
| 8 | **Launch-beat calendar**: one "tier-1" launch every 1–2 weeks for the coming features (image generation in sites/decks/books, credit top-ups, custom domains, two-way GitHub sync, agency tools, AI lead research), each with a demo video, founder post, changelog and email; ship small things daily in between | Lovable tier-1 launches every 1–2 months plus daily ships; Bolt's mobile launch was its biggest reception | $0 | Ongoing | High; gives the algorithm a reason to show Makeborne again |
| 9 | **One big public launch (Product Hunt, Show HN) on the most demo-able beat**, likely image generation once it is live, not today | Lovable #1 PH and HN at launch | $0 | 3–5 days prep | Medium–High for a spike; plan the date carefully |
| 10 | **Capped "Build Day"** (owner decision): 24 hours where a new account gets a small credit allowance, tied to a theme (e.g. "a website for a local business in one prompt"), with a small prize pool | Lovable free day (500k projects vs 200k); Replit Free Agent Day + buildathon | $200–$400 (credits capped + prizes in plan credits) | 3–4 days | Medium–High as a news moment |
| 11 | **Agency/freelancer wedge content**: "client approval in one link" demos using the live review links, CRM and lead finder; post in freelancer and agency communities where self-promotion is allowed | Lovable's bottom-up enterprise path (individuals bring tools to work); Wix/Readdy compete here (internal teardown) | $0 | Weekly | Medium; ties to the higher-priced Studio plan |
| 12 | **Small community home** (Discord or similar) with #showcase and #feedback; seed it with early fans before it opens widely | Base44 Discord 44k+; Lovable seeded Discord with builders first | $0 | 30 min/day | Medium for retention and user posts |
| 13 | **Measure everything without pixels**: UTM on every link, Whop sales by UTM and affiliate code, server-side "build finished" and "site published" events, weekly cohort review; no Meta/TikTok/Google pixels until a consent banner is live | Bolt's pricing fix came from watching usage daily; EU consent law | $0 | 1 day setup, 1 h/week | Enables every decision above |

**What to avoid, based on the cases:** big paid-social spend before the loop works (Base44 skipped it and Lovable spent little); promoting features that are not live; flat "unlimited" pricing (Bolt's $9 lesson); copying Wix-era Base44 tactics (Super Bowl, CTV) that need nine-figure budgets.

---

## 10. Risks

1. **Survivorship bias.** These five are the winners of a crowded field; many builders with similar tactics did not take off.
2. **Audience gap.** Lovable, Bolt, v0 and Replit launched to big owned audiences; a cold start will be slower, as v0's 10-month crawl to $1M ARR shows.
3. **No free tier.** All five used free usage; Makeborne's paid-only funnel may convert visitors at a fraction of their rates. Mitigate with proof (gallery, videos, refund promise) and measure in week 1.
4. **Virality without retention.** Lovable's traffic reportedly fell ~40% from its 2025 peak; spikes from free days or viral videos fade if the product does not keep people.
5. **AI cost blow-ups.** Bolt's users burned a $9 plan in 48 hours; Base44 had near-zero gross margin in early 2026. Heavy users can erase margin; watch credit use daily.
6. **Creator spend can flop.** Base44's early influencer tests failed. Keep each test small, tracked and disclosed.
7. **Promoting unreleased features** (images, custom domains, sync, agency tools, AI lead research) would break trust and may breach consumer-protection rules.
8. **Privacy and marketing law.** Pixels and retargeting need a consent banner first; cold email to EU businesses has legal limits; creator posts must be labelled as ads.
9. **Infrastructure strain at a spike.** Bolt's model provider ran out of capacity; plan rate limits and a status message before any big launch.
10. **Unverified numbers.** Several widely shared figures (Base44's "$1M ARR in 3 weeks", Lovable's waitlist size, v0 revenue, Bolt's 2026 ARR) are low-confidence; do not repeat them in public copy.
11. **Agency white-label tension.** Adding Makeborne credits to client review links helps growth but some agencies want white-label; keep it removable on higher plans (owner decision).

---

## 11. Open questions (not verified in this pass)

- Bolt's 2025 hackathon (size, prizes, badge rule) and Bolt's 2025–2026 ARR.
- Lovable's launch-day pricing and free-tier limits (Nov 2024).
- Base44's launch-day pricing, and whether the "$1M ARR in 3 weeks" figure counts from first launch or from the start of paid plans.
- v0 revenue (Vercel has not disclosed it).
- ~~Whether Whop has affiliate tooling~~ Resolved 26 Oct 2026: it does (see §9 tactic 6). Still open: whether the default 30% global rate is switched on for Makeborne's Whop store (if so, anyone can promote and earn 30%; set it deliberately), and how a Whop commission interacts with the full-refund policy.

---

## Sources

Publication or update dates as shown on each page; all accessed 26 October 2026 unless stated. "Via search" means the figure was read from a search summary of that page because the page itself blocked fetching.

**Base44**

1. Lenny's Newsletter / Podcast, "Solo founder, $80M exit, 6 months" (Maor Shlomo), 6 Jul 2025: https://www.lennysnewsletter.com/p/the-base44-bootstrapped-startup-success-story-maor-shlomo
2. What A Startup, "A solo founder just sold his 6 months old AI startup for $80 million", 21 Jun 2025: https://whatastartup.substack.com/p/a-solo-founder-just-sold-his-6-months-old-ai-startup-for-80-million-dollars
3. SiliconANGLE, "Base44 joins Wix in $80M deal", 18 Jun 2025: https://siliconangle.com/2025/06/18/base44-joins-wix-80m-deal-support-natural-language-software-development
4. Maor Shlomo, LinkedIn post "Yesterday, Base44 crossed 20k users and became profitable" (about Mar 2025; page shows "1y"): https://www.linkedin.com/posts/maor-shlomo-1088b4144_yesterday-base44-crossed-20k-users-and-became-activity-7303077044597252098-gbXW
5. Seed to Sequoia, "10 lessons from Base44's meteoric acquisition", 17 Jul 2025: https://seedtosequoia.silverwood.ai/p/10-lessons-from-base44-s-meteoric-acquisition-e59d
6. Intro.co, "How Base44 got acquired in 500 days", 8 Aug 2025: https://intro.co/blog/how-base44-got-acquired-in-500-days
7. Henry Shi (Lean AI), "How a founder sold his 1-person AI startup for 9 figures in 6 months", 26 Jun 2025: https://henrythe9th.substack.com/p/how-a-founder-sold-his-1-person-ai
8. CTech (Calcalist), "Base44 becomes Wix's surprise growth engine with 2 million users, $50M ARR", 19 Nov 2025: https://www.calcalistech.com/ctechnews/article/sy194qsg11g
9. CTech (Calcalist), "Base44 doubles ARR to $200 million in just five months", 20 Aug 2026: https://www.calcalistech.com/ctechnews/article/syw900pvdzg
10. GetLatka, "Base44 revenue" (timeline citing TechCrunch, Wix and Calcalist), first published 18 Jun 2025, updated 31 Aug 2026: https://getlatka.com/blog/base44-revenue-acquired-wix
11. Investing.com, "Wix Q2 2026 slides: AI push drives 15% revenue growth, Base44 scales", ~4 Aug 2026: https://www.investing.com/news/company-news/wix-q2-2026-slides-ai-push-drives-15-revenue-growth-base44-scales-93CH-4834907
12. Marketing Brew, "Base44's ad strategy, broken down", 15 Jun 2026: https://www.marketingbrew.com/stories/base44-app-advertising-strategy-youtube-smart-tvs-superbowl
13. Wix press room, "Base44 to air its first Super Bowl ad", 28 Jan 2026: https://www.wix.com/press-room/home/post/base44-to-air-its-first-super-bowl-ad
14. Base44 pricing page, accessed 26 Oct 2026: https://base44.com/pricing
15. Base44 docs, referral programme, accessed 26 Oct 2026: https://docs.base44.com/Community-and-support/Referral-program

**Lovable**

16. Lenny's Podcast, "Building Lovable: $10M ARR in 60 days with 15 people" (Anton Osika), 9 Mar 2025. Episode: https://www.lennysnewsletter.com/p/building-lovable-anton-osika ; transcript: https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/anton-osika/transcript.md
17. Lenny's Podcast, "The new AI growth playbook for 2026: How Lovable hit $200M ARR in one year" (Elena Verna), Dec 2025. Episode: https://www.lennysnewsletter.com/p/the-new-ai-growth-playbook-for-2026-elena-verna ; transcript: https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/elena-verna-40/transcript.md
18. TechCrunch, "Lovable becomes a unicorn with $200M Series A just 8 months after launch", 17 Jul 2025: https://techcrunch.com/2025/07/17/lovable-becomes-a-unicorn-with-200m-series-a-just-8-months-after-launch
19. Sifted, "Lovable hits $100m ARR", 23 Jul 2025 (via search; page blocked fetching): https://sifted.eu/articles/lovable-hits-100m-arr
20. Fortune, Lovable CEO at Slush ($200M ARR), 21 Nov 2025: https://fortune.com/2025/11/21/lovables-ceo-ai-vibe-coding-enterprise-ambitions-annual-revenue
21. TechCrunch, "Lovable says it added $100M in revenue last month alone, with just 146 employees", 11 Mar 2026: https://techcrunch.com/2026/03/11/lovable-says-it-added-100m-in-revenue-last-month-alone-with-just-146-employees/
22. The AI Corner (Ivan Landabaso), "How Lovable hit $400M ARR in 14 months with 146 people and almost zero paid ads", 29 May 2026: https://www.the-ai-corner.com/p/lovable-growth-playbook-0-to-400m-arr-14-months
23. Product Growth blog, "How Lovable hit $100M ARR in 8 months", 5 May 2025, updated 7 Aug 2026: https://www.productgrowth.blog/p/how-lovable-dev-hacked-their-growth
24. catalaize, "How Lovable reached 2.3M users", 22 Aug 2025: https://catalaize.substack.com/p/lovables-path-from-open-source-to
25. Sacra, "Lovable at $17M ARR" (via search): https://sacra.com/research/lovable-at-17m-arr/
26. Lovable docs FAQ (badge, referral, remix, community), accessed 26 Oct 2026: https://docs.lovable.dev/introduction/faq
27. Lovable pricing page, accessed 26 Oct 2026: https://lovable.dev/pricing
28. GitHub, AntonOsika/gpt-engineer (created 29 Apr 2023; 55,003 stars on 26 Oct 2026): https://github.com/AntonOsika/gpt-engineer

**Bolt.new**

29. Lenny's Podcast, "Inside Bolt: From near-death to one of the fastest-growing products in history" (Eric Simons), 13 Mar 2025. Episode: https://www.lennysnewsletter.com/p/inside-bolt-eric-simons ; transcript: https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/eric-simons/transcript.md
30. Contrary Research, Bolt business breakdown, updated 2 May 2025: https://research.contrary.com/company/bolt
31. Evil Martians, "bolt.new from StackBlitz: how they surfed the AI wave", 2 Dec 2024: https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts
32. Model provider customer story on StackBlitz ($0 to $4M ARR in 4 weeks), via search and Evil Martians (original URL now redirects): https://www.anthropic.com/customers/stackblitz
33. Bolt pricing page, accessed 26 Oct 2026: https://bolt.new/pricing
34. GitHub, stackblitz/bolt.new (created 24 Sep 2024; 16,578 stars on 26 Oct 2026): https://github.com/stackblitz/bolt.new ; stackblitz-labs/bolt.diy (19,992 stars): https://github.com/stackblitz-labs/bolt.diy

**v0**

35. Acquired ACQ2, "Building web apps with just English and AI" (Guillermo Rauch), 18 Feb 2025: https://www.acquired.fm/acq2-episodes/building-web-apps-with-just-english-and-ai-with-vercel-ceo-guillermo-rauch
36. Lenny's Podcast, "Everyone's an engineer now: Inside v0's mission to create 100 million builders" (Guillermo Rauch), 13 Apr 2025, transcript: https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/guillermo-rauch/transcript.md
37. DevGraphiq, "v0 statistics 2026" (compiles Vercel Series F release, pricing page), updated 20 Oct 2026: https://devgraphiq.com/v0-statistics

**Replit**

38. Lenny's Podcast, "Behind the product: Replit" (Amjad Masad), 21 Nov 2024, transcript: https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/amjad-masad/transcript.md
39. Gigazine, "Replit releases Replit Agent", 9 Sep 2024: https://www.gigazine.net/gsc_news/en/20240909-replit-agent
40. Replit press release, "Replit closes $250 million in funding", 10 Sep 2025 (Kyodo PR wire copy): https://kyodonewsprwire.jp/release/202509115002
41. TechCrunch, "Replit snags $9B valuation 6 months after hitting $3B", 11 Mar 2026: https://techcrunch.com/2026/03/11/replit-snags-9b-valuation-6-months-after-hitting-3b
42. Replit community forum, "Replit Agent is free on May 2nd", 1 May 2026: https://replit.discourse.group/t/replit-agent-is-free-on-may-2nd/11713
43. ARR Club, "Replit nearing $1B run-rate revenue target for end of 2026", 19 Oct 2026: https://www.arr.club/signal/replit-announced-1b-run-rate-revenue-target-for-end-of-2026
44. Unite.ai, "Replit's $9B valuation proves the vibe coding gold rush is real" (2025 revenue ~$240M; via search), Mar 2026: https://www.unite.ai/replits-9b-valuation-proves-the-vibe-coding-gold-rush-is-real/

**Internal (not public)**

45. Makeborne competitor teardown and comparison, 23 Oct 2026 (private product docs). Used for competitor free-tier and per-message pricing observations.
46. Makeborne product code, checked 26 Oct 2026: the published-site "Made with Makeborne" link points to the homepage without attribution parameters; client review pages show a "Shared with Makeborne" brand mark that is not a link.

---

## Verification (26 Oct 2026)

An adversarial fact-check re-read 18 decision-relevant claims against primary sources (company pages and docs, press releases, founder transcripts, reputable press). The shared web-search budget was already spent, so every check below fetched the cited primary page directly; nothing was found through new searches. Corrections are made inline above and summarised here.

| # | Claim in report | Verdict | Correction / note | Source (accessed 26 Oct 2026) |
|---|---|---|---|---|
| 1 | Base44 passed $200M ARR on 20 Aug 2026, about 5 months after $100M | Confirmed | Also: Wix pays Shlomo another $41M earn-out (total proceeds above $150M); Wix will reinvest margin savings in marketing | [CTech, 20 Aug 2026](https://www.calcalistech.com/ctechnews/article/syw900pvdzg) |
| 2 | Base44 had 2M users, >1,000 new paying subscribers a day, ~$50M ARR expected by end of 2025 (19 Nov 2025) | Confirmed | — | [CTech, 19 Nov 2025](https://www.calcalistech.com/ctechnews/article/sy194qsg11g) |
| 3 | Base44 sold to Wix for ~$80M plus earn-outs through 2029; 20k+ users as of March; profitable | Confirmed | SiliconANGLE does not state the cash/stock split or the ~$25M retention; those come from secondary sources only | [SiliconANGLE, 18 Jun 2025](https://siliconangle.com/2025/06/18/base44-joins-wix-80m-deal-support-natural-language-software-development); [Shlomo LinkedIn](https://www.linkedin.com/posts/maor-shlomo-1088b4144_yesterday-base44-crossed-20k-users-and-became-activity-7303077044597252098-gbXW) |
| 4 | Base44 "$1M ARR 3 weeks after launch", "no money on marketing", LinkedIn beat paid channels, activation tripled | Confirmed as Lenny's wording; unverified as founder data | All four come from Lenny's (paywalled) episode description and teasers, not from data the founder published. Lenny's also says 400k+ users, not ~250k. Do not use "$1M in 3 weeks" in public copy | [Lenny's, 6 Jul 2025](https://www.lennysnewsletter.com/p/the-base44-bootstrapped-startup-success-story-maor-shlomo) |
| 5 | Base44 gross margin near zero early 2026; ~60% expected in H2 2026; Wix S&M $173M in Q2 2026, up 67% | Corrected | Margin and $173M confirmed (non-GAAP, 46% of gross profit vs 31% in Q2 2024). The "+67% YoY" was not in the primary summary (Low) | [Investing.com, 4 Aug 2026](https://www.investing.com/news/company-news/wix-q2-2026-slides-ai-push-drives-15-revenue-growth-base44-scales-93CH-4834907) |
| 6 | Base44 Super Bowl ad 8 Feb 2026, 69.4M TV impressions; 679M+ YouTube views Q1 2026; 44k Discord; ~1,000 universities; ad ended with a $50k contest | Corrected | Impressions, views (Tubular Labs), Discord and universities confirmed. The Wix release mentions no contest or prize; the $50k contest stays unverified | [Marketing Brew, 15 Jun 2026](https://www.marketingbrew.com/stories/base44-app-advertising-strategy-youtube-smart-tvs-superbowl); [Wix press room](https://www.wix.com/press-room/home/post/base44-to-air-its-first-super-bowl-ad) |
| 7 | Lovable launched 21 Nov 2024; ~$1M ARR in week one; 300k MAU / 30k paying "almost only through organic word of mouth"; GPT Engineer 50k+ stars | Confirmed | Osika: "We just hit 1 million ARR in a week". Waitlist size never stated | [Osika transcript, Lenny's, Mar 2025](https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/anton-osika/transcript.md) |
| 8 | Lovable $4M ARR at ~4 weeks and $10M at ~2 months (High) | Corrected | Downgraded to Medium: host framing; Osika did not confirm the figures on air | Same transcript |
| 9 | Lovable Feb 2025: $17M ARR, 30k paying, "~$2M spent" read as paid marketing | Corrected | ARR and payers confirmed; "just $2 million spent" is the company's total-spend claim, never described as marketing spend | [TechCrunch, 17 Jul 2025](https://techcrunch.com/2025/07/17/lovable-becomes-a-unicorn-with-200m-series-a-just-8-months-after-launch) |
| 10 | Lovable Jul 2025: $75M ARR in 7 months, 2.3M active users, 180k+ paying, 45 FTE, $200M Series A at $1.8B; $100M Jul 2025, $200M Nov 2025, $300M Jan 2026, $400M+ Feb 2026 with 146 FTE; free day 8 Mar 2026 with 500k+ projects vs ~200k | Confirmed | ARR = prior month revenue x 12 (Fortune). The free day was the SheBuilds / Women's Day event | [TechCrunch, 17 Jul 2025](https://techcrunch.com/2025/07/17/lovable-becomes-a-unicorn-with-200m-series-a-just-8-months-after-launch); [TechCrunch, 11 Mar 2026](https://techcrunch.com/2026/03/11/lovable-says-it-added-100m-in-revenue-last-month-alone-with-just-146-employees/); [Fortune, 21 Nov 2025](https://fortune.com/2025/11/21/lovables-ceo-ai-vibe-coding-enterprise-ambitions-annual-revenue) |
| 11 | Verna: influencer marketing ~10x paid social; free usage booked as marketing cost; giveaways should exceed paid spend; tier-1 launches every 1–2 months | Corrected | "10x" and "marketing cost" confirmed verbatim. "Giveaways should exceed paid spend" is not in the transcript, and Verna gives no tier-1 cadence | [Verna transcript](https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/elena-verna-40/transcript.md) |
| 12 | Lovable pricing: Free 5 credits/day up to 30/month; Pro $25/month for 100 credits; badge hidden on paid plans; referral 10 credits / 100 credits, 12-month expiry | Confirmed | Added: Pro is $250/year (~$21/month), credit tiers up to $2,250/month, Business from $50/month; paid plans also get 5 daily credits with no monthly cap | [Lovable docs: subscription plans](https://docs.lovable.dev/introduction/subscription-plans); [FAQ](https://docs.lovable.dev/introduction/faq); [plans and credits](https://docs.lovable.dev/introduction/plans-and-credits) |
| 13 | Bolt: +$60K ARR day 1, +$80K day 2; $9 plan burned in 48 h; $20M ARR in 2 months; ~$40M by Mar 2025; 67% non-developers; $4M in 4 weeks; launched "with one tweet" | Corrected | Figures confirmed. Launch was also a ViteConf 2024 keynote, so "one tweet" understates the stage. The day-one subscriber estimate was wrong: at the $9 launch plan, $60K ARR is about 550 subscribers, not ~250 | [Simons transcript](https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/eric-simons/transcript.md); [Evil Martians, 2 Dec 2024](https://evilmartians.com/chronicles/bolt-new-from-stackblitz-how-they-surfed-the-ai-wave-with-no-wipeouts) |
| 14 | v0: research preview Sep 2023; 10 months to $1M ARR, +14 days to $2M, +20 days to $4M; 1.3M users and 20k gallery submissions in under a month (Apr 2025); Free 7 msgs/day, Plus $30, Business $100 | Confirmed | Pricing re-checked on v0.app directly (also $5 one-time credits for new users). "Sales teams send v0 links to prospects" was only partly supported (Medium) | [Acquired, 18 Feb 2025](https://www.acquired.fm/acq2-episodes/building-web-apps-with-just-english-and-ai-with-vercel-ceo-guillermo-rauch); [Rauch transcript](https://github.com/ChatPRD/lennys-podcast-transcripts/blob/main/episodes/guillermo-rauch/transcript.md); [v0 pricing](https://v0.app/pricing) |
| 15 | Replit: Agent on 5 Sep 2024 for paid subscribers only; $2.8M to $150M annualized in under a year; 40M+ users; $250M at $3B (Sep 2025); $400M at $9B (Mar 2026); $1B ARR target; free Agent 24 h on 2 May 2026 with $100K+ buildathon prizes | Confirmed | TechCrunch words the Sep 2025 figure as "on track for" $150M; no current ARR released in Mar 2026 | [Gigazine, 9 Sep 2024](https://www.gigazine.net/gsc_news/en/20240909-replit-agent); [press release, 10 Sep 2025](https://kyodonewsprwire.jp/release/202509115002); [TechCrunch, 11 Mar 2026](https://techcrunch.com/2026/03/11/replit-snags-9b-valuation-6-months-after-hitting-3b); [Replit forum](https://replit.discourse.group/t/replit-agent-is-free-on-may-2nd/11713) |
| 16 | Base44 pricing today: Free 25 messages / 100 integration credits / 5 apps; Starter $16, Builder $40, Pro $80, Elite $160 (yearly); referral 30 / 30 / 100 credits, 40-day expiry | Confirmed | Yearly billing saves 20%, so monthly prices are about $20 / $50 / $100 / $200 (calculation). Paid plans include a free domain for 1 year. Referrals are uncapped | [Base44 pricing](https://base44.com/pricing); [Base44 referral docs](https://docs.base44.com/Community-and-support/Referral-program) |
| 17 | Bolt pricing today: Free 1M tokens/month, 300K/day, branding, no custom domain; Pro $18/month billed yearly, no branding | Confirmed | Pro is $216/year (list $300), Teams $27/member/month yearly | [Bolt pricing](https://bolt.new/pricing) |
| 18 | Makeborne unit economics: 53–55% gross margin at full use; free-credit payback ~1.3 months; whether Whop has affiliate tooling | Corrected | The arithmetic checks out, but payment fees were left out. After Whop's 2.7% + $0.30 (+1.5% international, +1% FX), full-use margin is about 48–51%. Payback on gross profit is about 2.5 months, not 1.3. Whop does have an affiliate programme (30% default global rate, recurring or first payment, 30-day hold) | [Whop fees](https://docs.whop.com/fees); [Whop affiliate programme](https://docs.whop.com/manage-your-business/growth-marketing/affiliate-program.md) |

**Still unverified after this pass:** Base44's $10–20K bootstrap spend and failed influencer tests (What A Startup only); Lovable #1 on Product Hunt and Hacker News at launch; the Lovable ~40% traffic decline (Barclays via press); Lovable ~$500M run rate in Jun 2026; Bolt's 2025 hackathon and 2025–2026 ARR; Base44's 13 deploys a day; the $50k Super Bowl contest; Replit 2025 full-year revenue (~$240M, Unite.ai only).

### Gaps the report missed (decision-relevant for Makeborne)

1. **Payment fees and refunds in unit economics.** Whop fees (about 4–6% plus $0.30 on international cards), the full-refund-until-credits-used policy and chargebacks all lower margin and should be modelled in the ARR scenarios.
2. **Whop affiliate default.** Whop's global affiliate rate defaults to 30%. The owner should decide deliberately whether it is on, the rate, whether it is recurring, and how it interacts with refunds (commissions are held 30 days, which helps).
3. **Non-builder comparables.** The report covers code and app builders only. Makeborne's live launch products are websites, books and decks, so Gamma (decks), Durable and Framer (sites) and Canva are closer comparables for messaging, pricing and creator-led growth, and none of them is analysed.
4. **No paid-only, no-trial comparable.** All five cases used free tiers. The report never finds a builder that grew fast without a free tier or trial, so the conversion assumption (0.5–2% visitor to paid) has no benchmark. Treat it as an assumption until week-one Whop and UTM data exist.
5. **Retention and churn.** The scenarios count subscribers but give no monthly churn benchmark. Lovable's reported traffic drop shows the risk of high churn after viral spikes. At 10–20% monthly churn (Assumption), the gross adds needed for $1M ARR rise sharply.
6. **Day-one capacity of a small team.** Bolt's founder and chief of staff spent about 95% of the day on support. The plan should budget founder support time and a status page before any launch beat.
7. **Region and payment acceptance.** The seller is in Bosnia and Herzegovina and sells worldwide through Whop. Card acceptance, VAT/sales-tax handling (Whop's 2% tax add-on) and currency effects on conversion are not covered.

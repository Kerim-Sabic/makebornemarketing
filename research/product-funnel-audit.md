# Makeborne funnel and growth-surface audit

Research track: product funnel and built-in growth surfaces
Date: 26 October 2026 (paid beta launch day)
Method: read the exact launch code (private, read only), the 23 October internal competitor teardown, and official Whop, Lovable, Base44 and Gamma documentation (fetched 26 October 2026). Every number is labelled **verified** (read in code or an official page), **derived** (my arithmetic from verified inputs) or **assumption** (my estimate, to be replaced by measured data).

> Public-repo note: this report leaves out file paths, internal service names, configuration values and anything security-related. It describes product surfaces only.

---

## 1. Summary

1. **The "aha" moment sits behind four gates.** A visitor types a brief on the homepage, presses Create, then must (1) create an account with email and a 12-character password, (2) confirm a 6-digit email code, (3) pick a plan, and (4) pay in Whop checkout before seeing any output. That is about 8 steps and a $20 minimum from intent to the first preview. Every major competitor (Lovable, Base44, Bolt, Gamma) shows output for free first. With no free tier (owner decision), the homepage has to do the convincing, and today it shows no real output, no video, no price and no social proof. *(verified in code)*
2. **One strength worth promoting:** the brief survives the whole journey. What the visitor typed (kind, effort, mode and attached files) is kept through sign-up and checkout, and the studio opens with it ready to send. The plan choice is also kept through email confirmation. *(verified)*
3. **A "Made with Makeborne" badge exists on every published website, and it is the main viral surface.** It is on by default and links to the homepage. Every customer is a paying customer, so every customer can turn it off in Settings. The link has **no UTM and no referral code**, so badge traffic cannot be measured or rewarded today. *(verified)*
4. **Client review links show the brand to clients, but weakly.** The page shows a small Makeborne mark with "Shared for review". It has no link and no call to action. The client portal footer does link: "Powered by Makeborne", without a UTM. GitHub exports include a README saying "made with Makeborne" with a link. *(verified)*
5. **Decks and books have no public share link.** The only way to share them is a client review link (expires in 3 to 90 days, noindex) or a PDF or PPTX download. Exported decks and books from the current builder carry no Makeborne attribution. Gamma's main loop ("Made with Gamma" decks seen by every audience) is missing. *(verified)*
6. **No public gallery of real work, no referral program, no affiliate program.** The homepage gallery has 18 style directions illustrated with concept images, not real customer output. Nothing in the product rewards a customer for bringing another customer. *(verified)*
7. **Whop's affiliate program can pay creators, but the default setup does not fit Makeborne's checkout.** Whop pays affiliates automatically: 30% default rate, first-payment or recurring, 30-day attribution cookie, 30-day wait before payout, automatic clawback on refunds inside the window. Its links send buyers to Whop's own product or checkout pages. A Makeborne subscription only grants credits when the purchase comes from a checkout that Makeborne created for a signed-in account. So affiliate links must point to makeborne.com, and Makeborne must pass the affiliate code into the checkout it creates. Whop's checkout API has an optional `affiliate_code` field for this. That path must be proven in the Whop sandbox before launch. *(verified in docs and code; the end-to-end behaviour is not yet tested)* **[Corrected 26 Oct, fact-check]:** Whop's sandbox has no payouts, so attribution can be checked there but commission payout and refund clawback cannot be proven end to end. Run one small live test with an internal affiliate and a refund as well.
8. **Measurement today can count, but it cannot attribute.** The admin console has a cohort funnel (signed up, confirmed, created project, ran build, shared review, published, paid), daily unique visitors for six page groups, recurring revenue and AI runs. Customer sites get their own analytics (path, referrer host, country, device). The makeborne.com counter strips query strings and records no referrer, and the Whop checkout carries no source. **Nobody can say which video, post, creator or badge produced a sale.** Fixing this costs about one or two days of work and $0, and should come before any of the $1,000 is spent. *(verified)*
9. **Activation capacity is a hidden growth ceiling.** The launch keeps a deliberately small global daily AI spending limit. A typical first website build costs about $0.93 of provider cost (range $0.46 to $1.35). A viral day would stall at the first build. Before any push, the limit has to scale with paid sign-ups. *(derived from the measured costs; the limit is an owner setting)*
10. **Small copy fixes are needed before ads.**
    - Some live copy promises more than launch ships (the list is in the owner's private notes).

    Mismatches like these create refund requests and complaints. *(verified)*

**Ranked top 5 product changes for growth:**
1. Attribution plumbing (S)
2. A daily AI limit that scales with paid sign-ups (XS, owner decision)
3. Proof on the homepage: real outputs, a film, the price and the refund promise (S)
4. A customer referral program plus a badge that earns referral credit (M)
5. A creator and affiliate program through Whop custom affiliates, linking to makeborne.com (S to M, after the sandbox test)

After those come public deck and book share links (M) and an opt-in showcase gallery (M). Details are in §6.

---

## 2. The real funnel at launch (from the code)

| # | Step | What the visitor sees (verified in code) | Friction and drop-off risk | Measurable today? |
|---|---|---|---|---|
| 1 | Land on makeborne.com | Hero: "What will you make next?" and "Beautiful websites. Books worth opening. Slides that stay with you." A Website / Book / Presentation switch, a brief box, Plan/Create and effort controls, idea chips, then the 18-style gallery, a "For your client work" band and the footer. | No real output, no video, no price, no testimonials, no refund promise above the fold. The agency angle (client approval, CRM) comes after the gallery. Plan and effort controls add choices before the visitor understands the product. | Daily unique "home" visits only. No source, no referrer. |
| 2 | Type a brief and press Create | The brief is saved on the device and the visitor is sent to the studio. | Low friction. The idea chips help. | No event. |
| 3 | Studio gate, signed out | Redirect to the sign-up page. The brief is carried along. | First surprise: an account is needed before anything appears. | "login" visits only. |
| 4 | Sign up | Heading "Make room for your ideas". Email and password (at least 12 characters). Google and GitHub buttons appear only when the sign-in service has them enabled (GitHub passed in production on 22 Oct). | A 12-character password is a known drop-off point. Social sign-in removes this step when it is on. | Database: signed up. |
| 5 | Confirm the email | A 6-digit code or a link. On the plan path, entering the code goes straight back to the plan. | Inbox switching. Mail deliverability is a dependency. | Database: confirmed. |
| 6 | Pricing and plan choice | Plans-first page: Create $20, Studio $49 ("Best for client work"), Scale $99. Monthly or yearly (20% off). Honest per-plan estimates (for example, about 6 to 9 first website builds a month on Create). Promises: limit shown first, errors free, credits carry over, cancel any time, refundable until used. A "not ready yet" list. | A dense page. No free tier and no trial. "Refundable until used" means any real test of the product uses up the refund. Plan switching means emailing support. | "pricing" visits. A checkout-started record exists in the database. |
| 7 | Whop checkout | The same tab goes to Whop's hosted checkout. Tax and fees are shown there. | Leaving the brand to pay. International card and FX fees for buyers outside the US. | Whop: payments and memberships. Makeborne: membership bound to the account by its checkout. |
| 8 | Return and confirmation | "Confirming your membership", then the studio with the saved brief. | Webhook delay. Handled with a retry state. | Database: paid. |
| 9 | First build | The studio shows the most a request can charge, and the user presses Send. The welcome dialog and a 6-step "Getting started" checklist appear for new accounts. | Build time is minutes (not measured here). Capacity depends on the daily AI limit (§7.3). | Database: ran build, credits charged, provider cost. |
| 10 | Preview and edit | Live preview, hand editing, versions. | Quality decides retention. | Not as events. |
| 11 | Publish | Choose an address, confirm. The site goes live on a Makeborne web address with the badge. Custom domains are not available yet. | No custom domain yet: some business owners will wait. | Database: published. |
| 12 | Share | "Copy link" for sites. Review links (expire in 3 to 90 days, default 14) with comments and approve or request changes for sites, decks and books. PDF and PPTX export. Manual GitHub export. | No public share link for decks and books. No share prompt after publishing ("post it", "send it to your client"). | Database: review link created. Review opens and seconds viewed. Site views per site. |
| 13 | Renewal or churn | Renews at the same price until cancelled in Whop. A site stops being served when its owner's paid plan ends (launch decision). | The site disappearing on churn is a word-of-mouth risk, and the badge disappears with it. | Whop renewals and cancellations. |

**Step count from intent to first output: about 8, including a payment** *(verified)*. Competitors put payment after the first output. With the no-free-tier rule kept, the levers are a more convincing homepage, a stronger guarantee and faster sign-up.

---

## 3. Built-in viral surfaces: what exists and what is missing

| Surface | Exists at launch? | Brand exposure | Link / UTM / referral code | Removable? | Gap and recommendation |
|---|---|---|---|---|---|
| "Made with Makeborne" badge on published websites | **Yes**: a small pill in the footer, added when the site is served, on by default | Every visitor to every customer site | Links to makeborne.com, `nofollow`, opens in a new tab. **No UTM, no referral code.** | Yes, by any paid plan (that is every customer). The setting covers the whole workspace and applies immediately. | Add `utm_source=badge&utm_medium=site` plus the owner's referral code. Turn "keep the badge on" into a reward (§6, item 5). Never nag. |
| Published-site share image and SEO | Yes: per-page title, description, Open Graph and Twitter card, structured data, sitemap. Production sites are indexable. | Link previews show the customer's brand, not Makeborne's | n/a | n/a | Fine as it is. The badge carries the brand. |
| Client review page | Yes, for websites, decks and books | Small Makeborne mark and "Shared for review". **No link, no CTA.** Noindex, no referrer. | None | Not configurable | After a decision is sent, show a subtle "Review powered by Makeborne: create client work like this" link with a UTM. Let Studio and Scale customers turn it off (white-label). |
| Client portal (agency-branded) | Yes | "Powered by Makeborne" footer link | Link with no UTM | No | Add a UTM and the agency's referral code. |
| GitHub export README | Yes | "This website was made with Makeborne" plus a link | No UTM | No | Add a UTM. It is a developer audience. |
| Exported website and book HTML from the standard export | Yes | "Made with Makeborne" text in the footer | Not a link | No | Low priority. |
| Deck and book PDF/PPTX from the current builder | Yes, as downloads | **No attribution** | none | n/a | An optional end slide or colophon. Default on for personal work, off for client work (owner decision). |
| Public share or "present" link for decks and books | **No** | | | | Build it (M) with a tasteful end card. This is Gamma's main loop. |
| Public showcase or community gallery | **No.** The homepage has 18 style directions with concept images. | | | | An opt-in showcase of real published work with "Make one like this" prefilled briefs (M). |
| Templates and remix | Style directions with brief seeds. No remix of real projects. | | | | Brief share links ("use my exact brief"), useful in creator videos (S). |
| Referral program | **No** | | | | Build it (M), §6. |
| Affiliate program | **No.** Whop's built-in program is available but not wired in. | | | | Whop custom affiliates with links to makeborne.com, plus `affiliate_code` on checkout (S to M after the sandbox test). |
| Comparison and growth content | **Yes:** 15 help articles, 9 growth guides and 5 comparison pages (vs Lovable, Bolt, Gamma, Framer, and "best AI website builder for agencies") in the sitemap | Search traffic | Internal | n/a | The visitor counter puts all of these in one "help" bucket. Count each article separately. |
| AI-search overview (`/llms.txt`) | Yes | AI answer engines | n/a | n/a | Keep it true to what ships. |

---

## 4. How competitors use these surfaces (for calibration)

| Product | Badge | Referral | Affiliate | Free entry | Source (date) |
|---|---|---|---|---|---|
| Lovable | Lovable badge on free projects. Paid plans can hide it ("Hide Lovable badge"). It returns on the next publish after a downgrade. | Invitee **10 credits** at sign-up. Referrer **100 credits** when the invitee pays for a first Pro or Business plan. "A sign-up alone does not earn you credits." Credits expire after 12 months. | "Up to $100 for each first-time subscriber", through Impact, monthly payouts, tiered bonuses | 5 credits a day, up to 30 a month | docs.lovable.dev FAQ; lovable.dev/affiliates (both fetched 26 Oct 2026) |
| Base44 | Shown on free; "Hide badge" on paid (hands-on, 23 Oct) | Friend **30 credits** at sign-up. Referrer **30** when the friend publishes a first app and sends a message, **100** when the friend upgrades. Credits expire 40 days after they are earned. No cap. | $100 fixed commission per referral that becomes a paid user within a month, through Impact, 30-day cookie, monthly payouts, $300 minimum payout, approval required (base44.com/affiliates, fetched 26 Oct 2026) | 5 message credits a day, 25 a month, 100 integration credits a month; Starter and above can remove the badge (docs.base44.com Credits and Billing pages, fetched 26 Oct 2026) | docs.base44.com referral page (fetched 26 Oct 2026); internal teardown 23 Oct |
| Gamma | "Made with Gamma" on Free. Any paid plan (Plus, Pro or Ultra) removes it from exports made after upgrading; exports already made on Free keep it, and it returns if the plan lapses (Gamma help, fetched 26 Oct 2026). | **200 credits per referral** (Free users), at most 2,000 credits held | n/a here | 400 credits once | help.gamma.app credits article (fetched 26 Oct 2026); internal teardown 23 Oct |
| Bolt | "Made in Bolt" on Free plan sites; a paid plan removes it | Referee 20% off (first 3 months monthly, or once on annual). Referrer 15% of what the friend pays, up to $50 per referral, paid through Cello, held 30 days, lost if the friend is refunded. | n/a here | 1M tokens a month, 300K a day cap | support.bolt.new billing, tokens and referral pages (fetched 26 Oct 2026) |
| v0 | **Removed** from published apps and generated repositories on 14 Aug 2026 | **[Corrected]** The "Invite & earn" referral credit program ($20 in credits each, Oct 2025) was **discontinued on 15 Jul 2026**. No $50 cap appears in the changelog. | n/a here | Free tier | v0.app/changelog (fetched 26 Oct 2026) |
| Framer / Emergent / GoHighLevel | n/a here | Framer remix links, often with affiliate codes | Framer up to 50% for 12 months; Emergent 20 to 30% for 6 months; GoHighLevel 40% recurring | n/a here | internal teardown 23 Oct |

**What this means for Makeborne.** Competitors use the badge as the price of free use, and removing it is the first paid upgrade. Makeborne has no free tier, so the badge appears only on paying customers' sites, and each of them can remove it. The badge will reach fewer people than Lovable's or Base44's unless keeping it on is rewarded. The referral pattern that works across the field is "both sides get credits, the referrer is paid only when the friend pays". It fits Makeborne's credit ledger well and costs very little (§8).

---

## 5. Whop's built-in affiliate program (researched 26 Oct 2026)

### 5.1 Facts from Whop's documentation

- **How to turn it on:** Dashboard → Marketing → Affiliates. The **global rate defaults to 30%** and can be set to any percentage. A separate **member rate** applies to existing members who refer others. If it is set to 0%, members earn the global rate. *(Whop docs: affiliate program; global setup)*
- **Who can promote:** by default, "any affiliate in Whop's network can promote it" once the product is listed. *(global setup)*
- **Custom deals:** invite a person by email, Whop username or user ID. Choose a **percentage or flat fee**, and a **first payment only** or **recurring (every payment)** reward. Optionally limit which plans they may refer. *(custom setup)*
- **Attribution:** affiliate links carry `?a=<username>`, as product-page links and checkout-page links. Whop stores an affiliate cookie with a **30-day default window**. "Checkout configurations attribute sales automatically when referral cookies are set." *(developer guide: affiliates)*
- **API attribution field:** creating a checkout configuration accepts an optional **`affiliate_code`**: "An affiliate tracking code to attribute the checkout to a specific affiliate." Checkout **`metadata`** is passed on to the payments and memberships created from that session. *(API reference, spec version date 2026-10-24)*
- **Commission objects:** an affiliate record alone sets no pay. Overrides do. A *standard* override is per plan, a percentage or flat fee, on the first payment or all payments. A *rev-share* override is a percentage, for one product or the whole account. *(developer guide)*
- **Payouts:** Whop pays affiliates automatically. There is a **30-day waiting period** between the referred purchase and the commission. Earnings go to the affiliate's Whop account balance through transfers, so affiliates need a Whop account. *(affiliate program; developer guide)*
- **Refunds:** the developer guide says a refund inside the attribution window claws the commission back automatically [V]; the affiliate-program page does not say so. Prove it with the live purchase-and-refund test. *(developer guide)*
- **Tracking:** there is no `affiliate.*` webhook in v1, and the payment object does not show the affiliate. Earnings are read by polling overrides (`total_referral_earnings_usd`). *(developer guide)*
- **Fees (Whop fee page, undated):** cards cost 2.7% + $0.30, plus 1.5% for international cards and 1% when currency is converted. Dispute: $15. No separate affiliate or platform fee is listed on that page. Some 2026 third-party reviews mention an extra 3% platform fee on some sales. The sources conflict, so check the live dashboard. **[Added 26 Oct, fact-check]:** the same page lists optional add-ons that stack on the card rate when enabled: Billing 0.5%, Orchestration 0.8%, and Tax and remittance 2% when tax is collected (all enabled: 6% + $0.30 for a domestic card). It also lists early dispute alerts at $29, 3DS at $0.03 and Radar at $0.07 per transaction, and seller payout fees (for example $2.50 next-day ACH, $23 bank wire). The add-ons together come close to the "extra 3%" that third-party reviews describe, which probably explains the conflict. Check which add-ons are switched on in the dashboard; selling worldwide from Bosnia and Herzegovina may require tax collection.

### 5.2 Link policy

Only Makeborne-created checkout links are used. Do **not** list Makeborne on Whop's open affiliate network, and do not hand out links to the Whop store page.

- **Whop's cookie is set on Whop's domain, not on makeborne.com.** A creator's link to makeborne.com sets no Whop cookie, so the sale is not attributed unless Makeborne passes the code itself.

### 5.3 Recommended setup

1. Use **custom affiliates** (invited creators and partners), not the open network. The links point to `makeborne.com/?a=<code>`.
2. Makeborne reads `a` (and `ref`) on arrival and carries it through sign-up in the URL, the same way it already carries the brief and the plan choice. It stores the code on the account at creation (first touch), then sets **`affiliate_code`** and `metadata.mb_aff` on the checkout configuration it creates.
3. **Before launch, test in the Whop sandbox** that (a) `affiliate_code` takes the affiliate's username or code, (b) the sale appears on the affiliate's override, and (c) a refund claws it back. The docs disagree on how `affiliate_code` behaves. Treat it as unproven until this test passes. **[Corrected 26 Oct, fact-check]:** Whop's sandbox (sandbox.whop.com) takes card payments only and has no payouts, so (b) and (c) may not be provable there. Add a small live test: one internal custom affiliate, one real purchase, one refund inside 30 days.
4. Commission (owner decision; economics in §8): **20% recurring for 12 months** for the public creator program, **30% recurring for 12 months** for a hand-picked first 20 creators, and **first payment only for yearly plans** (for example 20% of $192 = $38.40), so a single sale cannot cost too much.
5. Makeborne refunds have no time limit while credits are unused, but Whop only claws back inside its window. Pay commissions on payments that are past the window and not refunded, or accept the small exposure.
6. Fraud controls: no self-referral (same account or payment method), and no paid search bidding on the "Makeborne" brand by affiliates. Only first-time subscribers count.

---

## 6. Highest-leverage product changes, ranked

Effort: XS under half a day, S 1 to 2 days, M 3 to 7 days, L over 1 week (one experienced developer). Impact is my estimate and needs measuring. "Owner" marks an owner decision.

| Rank | Change | Why it matters | Effort | Cash cost | Expected impact |
|---|---|---|---|---|---|
| 1 | **Attribution plumbing**:<br>(a) the counter records `utm_source`, `utm_medium` and `utm_campaign`, an allow-listed referrer host and the `a`/`ref` code being present, all aggregated with no new identifiers<br>(b) count help articles one by one<br>(c) carry the source through sign-up in the URL and store first touch on the account<br>(d) add `mb_src`, `mb_campaign` and `mb_aff` to the Whop checkout metadata, which Whop passes to payments and memberships<br>(e) add UTMs to the badge, portal, review page and README links | Without it, the $1,000 cannot be judged and creators cannot be paid fairly | S | $0 | Prerequisite for everything else |
| 2 | **A daily AI limit that scales with paid sign-ups**, plus honest queue messages ("your build starts in about N minutes") | The limit must scale with paid sign-ups; a first website build costs about $0.93 of provider cost (§8). A viral spike would stall people who just paid at their first build, which leads to refunds and bad posts. | XS (config) / S (automatic rule) | Provider spend, already covered by the plan price | Protects activation during any push |
| 3 | **Copy accuracy fixes**:<br>- live product copy matches what ships at launch (list in the owner's private notes)<br>- list everything coming next as "coming soon" | Overpromising in paid traffic leads to refunds, chargebacks ($15 each) and consumer-law risk | XS | $0 | Trust. Fewer refunds. |
| 4 | **Proof on the homepage**: 3 to 6 real published examples (site, deck, book) made by the team, the v14 launch film or a 60 to 90 s real screen recording of a build, a price line ("from $20/month + tax, refundable until you use credits"), and the agency angle (client approval links) near the top | Paywall before aha: cold visitors need proof before they will pay $20 | S | $0 (existing films) | High on visitor-to-paid conversion |
| 5 | **Customer referral program**: invitee gets +100 credits on the first paid month; referrer gets +100 credits when the invitee's first payment clears and is not refunded. Plus **badge-as-referral**: the badge link carries the site owner's code, so paying sign-ups from their site earn them credits. | Compounding and nearly free (at most about $6 of provider cost per converted referral). Gives customers a reason to keep the badge. | M | Credits only | High over time |
| 6 | **Creator and affiliate program** through Whop custom affiliates (§5.3) | With $1,000 you cannot buy reach. Commission only on sales turns the budget into seed content and pays creators from revenue. | S to M, after the sandbox test | Commission on sales only | High |
| 7 | **Public share or present link for decks and books** with an end card ("Made with Makeborne: make your own"), on by default for personal projects and removable | Gamma's main loop. Decks are seen by audiences of 5 to 500 people each. | M (reuse the review-link base) | $0 | High for decks |
| 8 | **Opt-in showcase gallery** of real published work. Each item is an indexable page with "Make one like this" (a prefilled brief and style). | Proof, SEO pages and a remix loop | M | $0 | Medium to high |
| 9 | **"Use my brief" links**: a short link that opens the composer with a creator's exact brief and their referral code | Lets every TikTok, Reel or Short end with a one-tap "try my prompt" | S | $0 | Medium to high with creator content |
| 10 | **A first-website guarantee** (owner): a full refund within 7 days if the first website is not usable, even after credits were used (one per person or payment method) | Turns "no trial" into a risk-free first purchase. Cost per claim: about the plan price, plus up to $1.35 of provider cost, plus card fees Whop does not return. | XS (policy and copy) | Refunds | Medium to high on conversion. Watch for abuse. |
| 11 | **Keep lapsed sites online with the badge forced on** (owner), instead of stopping them | Avoids "my site disappeared" posts, keeps the badge reaching people, and creates a natural win-back offer | S | Small hosting cost | Medium |
| 12 | **Pre-paywall demo within the no-free-tier rule**: put the scripted interactive demos that already exist on help pages onto the homepage. Optionally, a free Plan-mode outline before payment (owner; costs cents per visitor; needs abuse limits). | Shows the product working before checkout | S / M | ~$0 / cents per outline | Medium |
| 13 | **Service emails**:<br>- welcome<br>- "your brief is saved", sent to people who started checkout (legal check)<br>- first build done<br>- publish nudge<br>- weekly "your site had N visitors" (site analytics already exist) | Activation and retention. Today there are no lifecycle emails beyond sign-in mail. | M | Email provider costs | Medium |
| 14 | **In-app plan upgrade and credit top-ups** (top-ups arrive in days), plus a clear "out of credits" upgrade | Expansion revenue moves ARR. Today plan switching goes by email. | M | $0 | Medium |
| 15 | **A share prompt after publishing**: "Post it" with prefilled text and link, "Send to your client" (review link), "Add to the showcase" | Turns every publish into a distribution moment | S | $0 | Medium |
| 16 | **Faster sign-up**: make sure Google sign-in is on in production, consider magic-link or code-only sign-up instead of a 12-character password, and keep the plan and brief | Removes a known drop-off step | S | $0 | Medium |
| 17 | Optional colophon or end slide on exported PDF/PPTX (owner default) | Small reach on files that get passed around | S | $0 | Low to medium |

**Coming-soon features as launch beats (never promote them as available today):** generated images in sites, decks and books; credit top-ups; custom domains; automatic two-way GitHub sync; agency tools; AI lead research. Give each one a dated release-note post, an email to members, a refreshed creator kit (new clips) and one homepage proof update. Custom domains matter most for local businesses waiting to go live. Image generation matters most for visual short-form content.

---

## 7. Measurement: what exists, what to add

### 7.1 Measurable today (verified)

| Source | What it gives | Limits |
|---|---|---|
| First-party cookieless counter (makeborne.com) | Daily unique visitors for six page groups: home, pricing, login, studio, portal, help. It respects Global Privacy Control and Do Not Track. | No source, referrer or UTM. Query strings are stripped. All help articles share one bucket. No conversion events. |
| Admin cohort funnel (1 to 90 days) | Signed up → confirmed → created project → ran build → shared review → published → paid, plus sign-ups per day | It cannot be split by source. Funnel order differs from reality (paid comes before the build). |
| Admin money and AI | Subscriptions by plan and status, recurring revenue, credit movements, AI runs with credits charged or absorbed and provider cost | Cost and usage only. No acquisition data. |
| Checkout records | Checkout started (plan, time) for each account | Abandonment can be calculated as started with no membership within 24 hours. |
| Whop | Payments, memberships, renewals, refunds, disputes (dashboard and webhooks), checkout metadata (today: request ID and terms version) | No source until metadata is added. |
| Customer-site analytics | Views per site with path, referrer host, country and device, using a visitor hash that rotates daily, with no cookies | Gives **badge impressions** (views of sites with the badge on). Badge clicks need the UTM. |
| Review-link analytics | Opens, active seconds, device class, time per slide or page, approve or change decisions | Per link. Can be totalled for "client touches". |

### 7.2 Funnel events to add (all server-side or cookieless; no ad pixels)

Naming: `object_action`. Account-bound events are stored first-party with the account ID and described in the privacy notice. Anonymous events are daily aggregates, as the counter does today.

| Event | When | Key properties | Type |
|---|---|---|---|
| `landing_viewed` | Any public page | page, utm_source, utm_medium, utm_campaign, utm_content, ref_present, referrer_host (allow-listed), device_class | Anonymous aggregate |
| `plan_selected` | Plan button on pricing | tier, interval, signed_in | Anonymous aggregate |
| `account_created` | Account created | first_touch {source, medium, campaign, content, aff_code, ref_code}, method (email/google/github) | Account |
| `email_confirmed` | Code or link verified | minutes_since_signup | Account |
| `checkout_opened` | Makeborne creates a Whop checkout | tier, interval, has_brief, aff_code | Account |
| `subscription_started` | First paid payment confirmed by webhook | tier, interval, amount, first_touch, aff_code | Account |
| `checkout_abandoned` | Derived: opened with no payment after 24 h | tier, interval | Derived |
| `brief_submitted` | Send pressed in the studio | kind, mode, effort, used_idea_chip, used_style, has_files | Account |
| `build_completed` / `build_failed` | AI run settles | kind, credits_charged, duration_s, first_build | Account |
| `time_to_first_build` | Derived | minutes from payment to the first successful build | Derived |
| `site_published` | First and later publishes | first_publish, badge_on | Account |
| `share_clicked` | Copy-link, post-to-social and email buttons | surface (site / deck / book / review), channel | Account |
| `review_link_created` / `review_opened` / `review_decided` | Already in the database | kind, decision | Account / existing |
| `export_downloaded` | PDF / PPTX / ZIP / GitHub | format | Account |
| `badge_toggled` | Settings | on/off | Account |
| `badge_clickthrough` | Landing with `utm_source=badge` | site referrer code (not the visitor) | Anonymous aggregate |
| `referral_converted` | The referred account's first payment clears | referrer, invitee, credits_granted | Account |
| `credits_exhausted` | Balance reaches 0 | tier, days_into_period | Account |
| `plan_changed` / `subscription_canceled` / `refund_issued` | Whop webhook or support | reason (where given), credits_used | Account |

**North-star metric (proposal):** paying workspaces that delivered something in the last 7 days (published a site, had a review link opened, or exported a deck or book). It tracks value delivered, and it drives the viral surfaces.

**Weekly dashboard (one screen):**
- visitors by source
- sign-up rate
- confirm rate
- checkout-open rate
- paid rate
- time to first build (median)
- first build → publish or share
- badge impressions and click-throughs
- referral and affiliate sales
- refunds and disputes
- MRR, net new MRR, and plan mix

### 7.3 Prerequisites and legal notes

- **A consent banner comes before any Meta, TikTok or Google pixel, retargeting audience or ad-platform conversion upload tied to EU visitors.** EDPB Guidelines 2/2023 (v2.0, adopted 7 Oct 2024, published 16 Oct 2024) set the technical scope of ePrivacy Art. 5(3) for access to and storage on a visitor's device. My reading, which needs a legal check: pixels need consent. UTM parameters on your own links, read on your own server and saved on the account the visitor creates, are the lower-risk path. **[Corrected 26 Oct, fact-check]:** "lower-risk" is not "out of scope". Section 3.1 (paragraphs 49 to 51) of the same guidelines says **tracking links** (an identifier appended to the URL) fall under Art. 5(3) just like pixels, and names affiliate partner links as the example. Under the EDPB reading, `?a=`/`?ref=` codes, and possibly campaign UTMs, need consent unless an exemption applies. The guidelines are an interpretation, not binding law, and national regulators differ. Get a legal opinion before launching the affiliate and referral links in the EU, and keep URL tags to campaign level, never per person.
- Storing a referral code in the visitor's browser for 30 days counts as device storage. Carry it in the URL through sign-up instead (the product already does this for the brief and plan), or store it only after consent. **[Corrected 26 Oct, fact-check]:** carrying it in the URL avoids the cookie but does not, under the EDPB reading above, take the tracking link out of Art. 5(3). Treat both as needing the legal check.
- Abandoned-checkout and marketing emails: the EU "soft opt-in" covers existing customers. Someone who never paid is not a customer. Get a legal check, or limit it to one service message ("your brief is saved").

---

## 8. Economics appendix

### 8.1 Build costs (verified measurements, 18 Oct 2026 test runs, Medium effort, no AI images; credits at $0.03)

| Output | Provider cost per first build | Credits | Samples |
|---|---|---|---|
| Website (includes automatic continuation and design review) | $0.46 to $1.35, median ≈ $0.93 | 16 to 45, median 32 | 20 |
| Presentation (8 and 10 slides) | $0.19 to $0.25 | 7 to 9 | 2 (rough guide) |
| Book (13 and 38 pages) | $0.27 to $0.42 | 9 to 14 | 2 (rough guide) |

First website builds per month (derived): **Create 6 to 9, Studio 16 to 23, Scale 34 to 48.**

**Daily AI limit capacity (derived):** the limit must scale with paid sign-ups; a first website build costs about $0.93 (median) to $1.35 (worst case). Example: 100 new paid accounts a day, each building twice on day one, needs about $186 to $270 a day.

### 8.2 Contribution per subscriber-month (derived; assumption: 60% credit use, domestic card fee)

| Plan | Price | Whop card fee | AI cost at 60% use | Contribution | At 100% use |
|---|---|---|---|---|---|
| Create | $20 | $0.84 | $5.40 | **$13.76** | $10.16 |
| Studio | $49 | $1.62 | $13.50 | **$33.88** | $24.88 |
| Scale | $99 | $2.97 | $27.90 | **$68.13** | $49.53 |

These figures leave out tax, hosting, email, support, refunds, disputes and payout fees. International cards add 1.5% of the price. **[Added 26 Oct, fact-check]:** if Whop's Tax and remittance add-on (2%) and Billing add-on (0.5%) are on, contribution at 60% use falls to about **$13.26 (Create), $32.66 (Studio) and $65.66 (Scale)** *(derived: price × 2.5% more in fees)*. Add 1.5% for international cards and 1% for currency conversion, which is likely for most buyers outside the US.

### 8.3 Affiliate and referral cost (derived; assumption: about 10-month average lifetime, which has to be measured)

| Plan | Lifetime contribution | 20% recurring (to month 10) | 30% recurring (to month 10) | Customer referral (at most 200 credits) |
|---|---|---|---|---|
| Create | ≈ $138 | $40 (29%) | $60 (44%) | ≤ $6.00 provider cost |
| Studio | ≈ $339 | $98 (29%) | $147 (43%) | ≤ $6.00 |
| Scale | ≈ $681 | $198 (29%) | $297 (44%) | ≤ $6.00 |

Customer referrals are about 10 times cheaper per customer than affiliate commission. Creators, though, bring the reach a $1,000 budget cannot buy.

### 8.4 What $1M ARR means (derived; assumptions labelled)

- $1M ARR = **$83,333 MRR**.
- Assumed plan mix of 55% Create, 35% Studio and 10% Scale gives a blended average of **$38.05 a month** per subscriber.
- That is about **2,190 paying subscribers**. Allowing for churn and refunds, roughly 2,500 gross new subscribers over 90 days, or **about 28 a day on average**.
- If 2% of visitors end up paying (an assumption; to be measured), that needs about 1,400 visitors a day, roughly 125,000 over 90 days.
- With $1,000 and an assumed paid customer-acquisition cost of $40 to $100, ads alone would buy about 10 to 25 subscribers.
- **Conclusion:** the jump has to come from creators, affiliates, referrals and the share surfaces above. Paid media can only boost posts that are already working.

**Free-to-paid benchmarks (older data, Aug 2023):** freemium self-serve, good 3 to 5% and great 6 to 8%; free trial, good 8 to 12% and great 15 to 25%. Makeborne has neither, so there is no direct benchmark. Measure visitor → paid and checkout-open → paid from day one.

---

## 9. Risks

1. **Activation stalls during a spike** if the daily AI limit does not scale. People who just paid wait, ask for refunds and post about it.
2. **The paywall comes before the aha moment.** Cold traffic will convert poorly. Once a test build uses credits, the "refundable until used" promise no longer applies, and frustrated buyers turn to disputes ($15 each).
3. **Whop affiliate mismatch.** Network affiliates or store-page links bypass the Makeborne-created checkout. Do not list on Whop's open network. Test `affiliate_code` in the sandbox first.
4. **Commission leakage and fraud:** self-referrals, brand-keyword bidding, and refunds after Whop's clawback window.
5. **EU consent.** Pixels, retargeting and device-stored referral codes need consent. Fines and platform bans are possible.
6. **Badge reach is limited**, because every customer can turn it off and agencies will, for client work. Reward keeping it on rather than forcing it.
7. **Sites going dark on churn** creates negative word of mouth and removes badge reach.
8. **Copy overpromising** leads to refunds and complaints.
9. **Blind spending.** Until attribution ships, no channel can be judged, and the $1,000 may be spent on the wrong thing.
10. **Manual operations at scale:** plan changes by email, refunds by email. Support load grows with success.
11. **Whop documentation conflicts** (`affiliate_code` behaviour, platform fee). Confirm in the sandbox and the dashboard.
12. **Public repo hygiene.** Keep internal limits, infrastructure and security details out of this repository.

---

## 10. Sources

Official and primary (fetched 26 Oct 2026 unless noted):
- Whop: affiliate program. https://docs.whop.com/manage-your-business/growth-marketing/affiliate-program
- Whop: set up global affiliates. https://docs.whop.com/affiliates/setup-global
- Whop: set up custom affiliates. https://docs.whop.com/affiliates/setup-custom
- Whop: promote your business (affiliate side). https://docs.whop.com/affiliates/promote-your-business
- Whop developer guide: affiliates. https://docs.whop.com/developer/guides/affiliates
- Whop API: create checkout configuration (`affiliate_code`, `metadata`; spec version date 2026-10-24). https://docs.whop.com/api-reference/checkout-configurations/create-checkout-configuration
- Whop developer guide: webhooks. https://docs.whop.com/developer/guides/webhooks
- Whop fees (undated page). https://docs.whop.com/fees
- Lovable FAQ (badge, referral, free credits). https://docs.lovable.dev/introduction/faq
- Lovable affiliates. https://lovable.dev/affiliates
- Base44 referral program. https://docs.base44.com/Community-and-support/Referral-program
- Base44 affiliates (fetched 26 Oct 2026 during fact-check). https://base44.com/affiliates
- Base44 credits and plans docs (fetched 26 Oct 2026). https://docs.base44.com/Account-and-billing/Credits.md and https://docs.base44.com/Account-and-billing/Billing-and-plans.md
- Bolt help centre: referral, billing, tokens (fetched 26 Oct 2026). https://support.bolt.new/account/referral-program.md, https://support.bolt.new/account/billing.md, https://support.bolt.new/account/tokens.md
- v0 changelog (14 Aug 2026 badge entry; 7 Jul 2026 referral deprecation). https://v0.app/changelog
- Gamma: badge removal article (fetched 26 Oct 2026). https://help.gamma.app/en/articles/8022861-how-do-i-remove-the-made-with-gamma-badge
- Whop developer guide: sandbox (fetched 26 Oct 2026). https://docs.whop.com/developer/guides/sandbox
- EDPB Guidelines 2/2023 v2.0, full PDF (section 3.1, paragraphs 47 to 51). https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf
- Gamma: how credits work ("updated this week"). https://help.gamma.app/en/articles/7834324-how-do-credits-work-in-gamma
- EDPB Guidelines 2/2023 on the technical scope of Art. 5(3) ePrivacy Directive, v2.0 (16 Oct 2024). https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-22023-technical-scope-art-53-eprivacy-directive_en
- Lenny's Newsletter, "What is a good free-to-paid conversion rate" (1 Aug 2023; older data). https://www.lennysnewsletter.com/p/what-is-a-good-free-to-paid-conversion

Secondary (conflicting; used only to flag uncertainty):
- Dodo Payments, "Whop fees explained" (2026; competitor-authored). https://dodopayments.com/blogs/whop-fees-explained

Internal (not public URLs):
- Makeborne launch release code, read only, 26 Oct 2026: landing, pricing, sign-up, checkout, onboarding, publishing, badge, review, portal, export, counter and admin funnel.
- Makeborne internal competitor teardown and pricing economics, 23 Oct 2026. Badge, referral and affiliate facts there for Bolt, v0, Framer, Emergent and GoHighLevel cite v0's changelog (https://v0.app/changelog), Bolt's publishing docs (https://support.bolt.new/cloud/hosting/publish) and Lovable's credits page (https://docs.lovable.dev/introduction/credits-and-usage), as checked on 18 to 23 Oct 2026.

Research note: the shared web-search allowance for this run ran out partway through this track. Competitor facts not re-checked today rely on the 23 Oct internal teardown and are marked as such.

---

## Verification (26 Oct 2026)

An adversarial fact-check re-checked the most decision-relevant claims against primary pages (fetched 26 Oct 2026 with WebFetch). The shared web-search allowance had run out, so every check below went straight to the official page. Internal code claims were spot-checked in the launch code (private, read only) and match the report.

| # | Claim | Verdict | Correction | Source |
|---|---|---|---|---|
| 1 | Lovable referral: invitee 10 credits, referrer 100 when the invitee pays for a first Pro or Business plan; credits expire after 12 months | Confirmed | Also available on Free, Pro and Business in the web app | https://docs.lovable.dev/introduction/faq |
| 2 | Lovable free plan 5 credits a day, up to 30 a month; paid plans can hide the badge, which returns on the next publish after a downgrade | Confirmed | None | https://docs.lovable.dev/introduction/faq |
| 3 | Lovable affiliate "up to $100 for each first-time subscriber", Impact, monthly payouts, tiered bonuses | Confirmed | Impact is inferred from the application link and is not named on the page | https://lovable.dev/affiliates |
| 4 | Base44 referral: friend 30 credits; referrer 30 on first publish plus message, 100 on upgrade; 40-day expiry; no cap | Confirmed | None | https://docs.base44.com/Community-and-support/Referral-program |
| 5 | Base44 affiliate $100 per new subscriber, monthly (previously only a search snippet) | Confirmed | Now fetched: $100 fixed, 30-day cookie, referral must pay within a month, $300 minimum payout, Impact, approval required | https://base44.com/affiliates |
| 6 | Base44 free: 5 messages a day, 25 a month; paid hides the badge | Confirmed | 100 integration credits a month; Starter and above can remove the badge | https://docs.base44.com/Account-and-billing/Credits.md ; https://docs.base44.com/Account-and-billing/Billing-and-plans.md |
| 7 | Gamma: 400 sign-up credits, 200 per referral, at most 2,000 held; Plus removes the badge but not on past work | Corrected (minor) | Any paid plan (Plus, Pro, Ultra) removes it, only for exports made afterwards; it returns after a lapse | https://help.gamma.app/en/articles/7834324-how-do-credits-work-in-gamma ; https://help.gamma.app/en/articles/8022861-how-do-i-remove-the-made-with-gamma-badge |
| 8 | Bolt: Made in Bolt badge on free; referee 20% off, referrer 15% up to $50; 1M free tokens a month | Confirmed | Details: the referee discount covers 3 months (monthly) or once (annual); the reward is held 30 days and lost on a refund; Free also has a 300K daily cap | https://support.bolt.new/account/referral-program.md ; https://support.bolt.new/account/billing.md ; https://support.bolt.new/account/tokens.md |
| 9 | v0 removed its badge on 14 Aug 2026; v0 has a "$50-capped referral" | Corrected | The badge date is confirmed (published apps and generated repos). The referral program ("Invite & earn", $20 credits each) was discontinued on 15 Jul 2026. No $50 cap was found. | https://v0.app/changelog |
| 10 | Whop: 30% default global rate; member rate 0% falls back to global; anyone in Whop's network can promote once listed | Confirmed | None | https://docs.whop.com/affiliates/setup-global ; https://docs.whop.com/manage-your-business/growth-marketing/affiliate-program |
| 11 | Whop: `?a=` links, 30-day cookie, 30-day payout wait, refund clawback in the window, no `affiliate.*` webhook, earnings via `total_referral_earnings_usd`; custom deals by email, username or ID, percent or flat, first or recurring, plan limits | Confirmed, except clawback | Developer guide says a refund inside the window reverses the commission [V]; the affiliate-program page does not; prove with the live purchase-and-refund test | https://docs.whop.com/developer/guides/affiliates ; https://docs.whop.com/affiliates/setup-custom |
| 12 | Whop checkout configuration has optional `affiliate_code`; metadata passes to payments and memberships; spec date 2026-10-24 | Confirmed | The metadata inheritance is stated in the response schema, not in the request field description | https://docs.whop.com/api-reference/checkout-configurations/create-checkout-configuration |
| 13 | Prove `affiliate_code`, override credit and refund clawback in the Whop sandbox | Corrected | The sandbox exists but has no payouts and takes cards only. Clawback and payout need a small live test. | https://docs.whop.com/developer/guides/sandbox |
| 14 | Whop fees 2.7% + $0.30, +1.5% international, +1% FX, $15 dispute, no platform fee | Corrected (incomplete) | Optional add-ons: Billing 0.5%, Orchestration 0.8%, Tax 2% when collected (up to 6% + $0.30); RDR alerts $29; payout fees. Contribution in §8.2 drops by about 2.5% of the price if Billing and Tax are on. | https://docs.whop.com/fees |
| 15 | EDPB 2/2023 v2.0 dated 16 Oct 2024; UTM and URL-carried referral codes are the lower-risk path versus pixels | Corrected | Adopted 7 Oct 2024. Section 3.1 puts tracking links, with affiliate links named as the example, inside Art. 5(3), like pixels. URL codes are not a consent-free path under the EDPB reading. A legal check is required. | https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf |
| 16 | Free-to-paid benchmarks: freemium 3 to 5% good, 6 to 8% great; trial 8 to 12% good, 15 to 25% great (1 Aug 2023) | Confirmed (older data) | None | https://www.lennysnewsletter.com/p/what-is-a-good-free-to-paid-conversion |
| 17 | Derived economics: $83,333 MRR; $38.05 blended; about 2,190 subscribers; about 28 a day; card fees $0.84 / $1.62 / $2.97; contribution $13.76 / $33.88 / $68.13; 6 to 9, 16 to 23 and 34 to 48 first builds; $186 to $270 a day for 200 builds | Confirmed (arithmetic) | The arithmetic is correct. The inputs (60% use, 10-month life, 2% visitor-to-paid, plan mix) are still assumptions. | Recomputed from the report's own inputs |
| 18 | "Whop does not return card fees on refunds" (§6, item 10) | Unverified | The Whop refunds page returned no content. Confirm in the dashboard. | https://docs.whop.com/manage-your-business/payments/refunds (empty on fetch) |
| 19 | "The docs disagree on how `affiliate_code` behaves" | Unverified | No conflicting passage was found on the pages fetched. Keep the sandbox and live tests either way. | Whop pages above |

### Gaps the report missed

1. **Tax handling.** Kept in the owner's private notes; model the 2% tax add-on until it is confirmed in the Whop dashboard.
2. **Chargeback thresholds.** With no trial and "refundable until used", disputes are the main risk. Card network dispute-ratio monitoring thresholds and Whop's own reserve or ban rules were not researched. One bad viral day could breach them.
3. **No benchmark for a hard paywall before first output.** The 2023 freemium and trial benchmarks do not apply. A 2025-2026 hard-paywall benchmark (for example subscription-app reports) would anchor the 2% visitor-to-paid assumption.
4. **Consent for tracking links, not only pixels.** See claim 15. The attribution plan in §6 item 1 and §7.2 needs a legal view on Art. 5(3) for UTMs, `?a=` and `?ref=` before EU traffic is pushed.
5. **Affiliate payout friction.** Custom affiliates must hold a Whop account to be paid. Base44 and Lovable use Impact with monthly payouts. Creator willingness to join through Whop was not tested.
6. **Time to first build is unmeasured.** It is the main activation risk in a spike and should be measured before ads.
7. **Competitor referral sizes compared with Makeborne's credit value.** Lovable, Base44 and Gamma credits are not equal units. A dollar-value comparison of referral rewards is missing.

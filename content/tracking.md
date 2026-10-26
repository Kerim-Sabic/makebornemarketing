# Makeborne tracking, attribution and decision rules

**Version:** 26 October 2026 (paid beta launch day). **Window:** 26 Oct 2026 to 24 Jan 2027.
**Companion files:** `data/kpis.json` (targets and alerts), `data/funnel.json` (calculator inputs and formulas), `data/actuals.template.json` (daily log). The master plan is `plan/strategy.md`. Where this file and the plan disagree, the plan wins and this file should be corrected.

**Labels:** [F] verified at the source, [S] secondary source, [V] vendor claim, [E] our estimate, [A] assumption to replace with week 1-2 data, [O] owner decision, [U] unverified.

**Public-repo rule:** this file contains no keys, IDs, buyer data, creator contact details, code locations or infrastructure details. Keep it that way. Real Whop exports, consent records and the daily log live in a private place, never in this repo.

---

## 0. What we can and cannot measure today (honest baseline)

| Question | Can we answer it on 26 Oct? | How |
|---|---|---|
| How many people visited makeborne.com? | Yes, as daily unique visitors for six page groups | First-party cookieless counter |
| Where did they come from? | **No** | The counter strips query strings and records no referrer [F, `research/product-funnel-audit.md` §7.1] |
| How many signed up, confirmed, built, shared, published, paid? | Yes, as a cohort funnel | Admin cohort funnel in the app database |
| Which post, creator or listing produced a sale? | **No** | Whop checkout metadata carries only a request ID and terms version today [F, audit §7.1] |
| Revenue, renewals, refunds, disputes | Yes | Whop dashboard and webhooks |
| Badge, review-page and portal clicks | **No** | Those links carry no UTM or referral code [F, audit §3] |
| Views, profile visits, link clicks per post | Yes | Each platform's own analytics |

**So, until ask 1 ships (target Thu 29 Oct):** read platform link-click counts, add the onboarding "How did you hear about us?" field (ask 4) as the fallback, report everything else as "unknown", and pay no creator or boost (spend gate, strategy §6.1). Organic posting does not wait.

---

## 1. UTM and short-link convention

### 1.1 The rules

1. **Every link we hand out is a short link:** `makeborne.com/go/<code>`. The server redirects it to the right makeborne.com page with the full UTM set and, for partners, the affiliate code. Nobody types UTMs by hand into a post.
2. **Never hand out a Whop store link, a Whop affiliate `?a=` link or a Whop tracking link.** Only Makeborne-created checkout links are used [O]. Every checkout is created by Makeborne for a signed-in account.
3. **Lowercase, a-z, 0-9 and hyphens only.** No spaces and no underscores in `/go/` codes. Underscores appear only in the fixed `utm_source` and `utm_medium` values listed in 1.2 (for example `review_page`, `product_loop`). Codes are at most 32 characters.
4. **No personal data in any URL, ever.** No emails, names, phone numbers, client names or account IDs. The only person-like token allowed is a creator's **public handle**, used with their agreement. Tags stay at campaign level, never per visitor (this also keeps us closer to the EDPB reading in §5.1).
5. **One code per post, per surface.** A TikTok and its Reel re-edit get different codes, so each surface is judged on its own sales.
6. **Codes are never reused.** Retired codes keep redirecting to the homepage with their original tags.
7. **Features that are not live never get a link.** Beat links (for example `ph-images`) are created only after that beat passes the six-box gate. They are tagged `beat:<feature>` in the code register.

### 1.2 The values

**`/go/` code:** `<surface>-<id>[-<suffix>]`

| Surface prefix | Used for |
|---|---|
| `tt-` | Brand TikTok posts (`tt-0412`), bio (`tt-bio`) |
| `ig-` | Instagram posts and DMs (`ig-0031-site`), bio links (`ig-bio`, `ig-bio-site`), paid boosts of our own Reels (`ig-<post>-b`), DM automation links (`ig-dm-site`), daily stories (`ig-s1103-deck`), highlights (`ig-hl-start`) |
| `yt-` | YouTube Shorts and tutorials (`yt-0005`), channel links (`yt-bio`) |
| `li-` | Founder LinkedIn posts (`li-0107`), profile (`li-bio`), company page (`li-page`) |
| `x-` | Founder X posts (`x-0210`), bio (`x-bio`) |
| `c-` | Paid and affiliate creators (`c-<handle>`), their Meta partnership ad (`c-<handle>-p`) and TikTok Spark ad (`c-<handle>-s`) |
| `g-` | Google Search ads, one code per ad group (`g-brand`, `g-decks`) |
| `cr-` | Whop Content Rewards campaigns (`cr-2026-12`) |
| `ph-` | Product Hunt (`ph-soon`, later `ph-images`) |
| `taaft`, `uneed`, `alt`, `saashub`, `microlaunch`, `futuretools`, `rundown` | Directories (one form only: `outreach.json` `directoryListing.codes` uses the same codes; there are no `dir-` codes) |
| `ih-`, `rd-`, `com-` | Indie Hackers, Reddit, the agency community |
| `press-<outlet>` | Press (`press-netokracija`) |

**`utm_source`** (from strategy §12; additions marked +):
`tiktok`, `instagram`, `youtube`, `linkedin`, `x`, `producthunt`, `taaft`, `uneed`, `reddit`, `indiehackers`, `press-<outlet>`, `review_page`, `badge`, `deck_share`, `c-<handle>`; + `alternativeto`, `saashub`, `microlaunch`, `futuretools`, `community-<name>`, `content_rewards`, `changelog`, `customer`, `portal`, `github_readme`, `google` (Google Search ads), `rundown`.

**`utm_medium`** (strategy §12; additions marked +): `organic`, `dm`, `bio`, `creator`, `affiliate`, `spark`, `partnership`, `directory`, `launch`, `press`, `product_loop`, `email`, `referral`; + `paid` (a boost of our own post that is not Spark or partnership, for example a Meta boost of our own Reel), `cpc` (Google Search ads).

**`utm_campaign`** (strategy §12; additions marked +): `launch-2026-10`, `images-beat`, `domains-beat`, `agency-beat`, `leads-beat`, `bf-2026`, `day30`, `day90`; + `always-on` (bios and product loops), `creators-w1`, `creators-w2`, `cr-2026-12` (and later months), `topups-beat`, `github-beat`.
Beat campaigns (`images-beat`, `topups-beat`, `domains-beat`, `agency-beat`, `leads-beat`, `github-beat`) are **beat:<feature>** campaigns: they exist only after that feature is live and passes the gate.

**`utm_content`:** `<surface>-<post#>-<hook code>`, for example `tt-0412-r2`. Hook codes come from the hook bank (strategy §4.3: `r1`, `r2`, `f1`, `f2`, `f4`, `a3`, `d1`, `d3`, `b4`, `p2`, `p3`). For DMs the last part is the keyword: `ig-0031-site`.

**Registered code families (26 Oct, for `content/ads-playbook.md` and `content/instagram-playbook.md`):**

| Code | Use | Redirects with |
|---|---|---|
| `ig-<post>-b` | Meta boost of our own Reel (cards A01 fallback, A04) | `utm_source=instagram&utm_medium=paid&utm_content=ig-<post>-<hook>` |
| `c-<handle>-s` | TikTok Spark ad of a creator's post (card A02) | `utm_source=tiktok&utm_medium=spark&utm_campaign=creators-w1&utm_content=c-<handle>-v1` |
| `c-<handle>-p` | Meta partnership ad of a creator's Reel (card A01) | `utm_source=instagram&utm_medium=partnership&utm_campaign=creators-w1&utm_content=c-<handle>-v1` |
| `g-<adgroup>` | Google Search ad group (`g-brand`, `g-decks`; cards A05, A06) | `utm_source=google&utm_medium=cpc&utm_campaign=always-on&utm_content=g-<adgroup>-<n>` |
| `ig-dm-*` | Instagram DM automation replies (`ig-dm-site`, `ig-dm-deck`, `ig-dm-book`, `ig-dm-client`) | `utm_source=instagram&utm_medium=dm&utm_campaign=launch-2026-10` |
| `ig-s<mmdd>-*` | Daily Instagram stories (`ig-s1103-deck`) | `utm_source=instagram&utm_medium=organic&utm_content=ig-s<mmdd>-<keyword>` |
| `ig-hl-*` | Instagram highlights (`ig-hl-start`, `ig-hl-site`, `ig-hl-pricing`) | `utm_source=instagram&utm_medium=bio&utm_campaign=always-on` |
| `ig-bio` | Instagram bio link 1 (client work); links 2-5 are `ig-bio-site`, `ig-bio-deck`, `ig-bio-book`, `ig-bio-review` | `utm_source=instagram&utm_medium=bio&utm_campaign=always-on` |

Story stickers for C-series creatives use the creative's own code from `data/creatives.json` (`ig-c15-client`, `ig-c22-deck`, `ig-c25-book`).

**Partner codes:** a `c-<handle>` redirect attaches that creator's affiliate code on the server. The public link never shows `?a=`. The code is carried through sign-up in the URL (the way the product already carries the brief and plan), stored on the account at creation, and written to the Makeborne-created checkout as `affiliate_code` and `metadata.mb_aff` (strategy §11 ask 1 and 9).

**Use-my-brief links:** `makeborne.com/go/c-<handle>?brief=<id>` (ask 8, target week 2). The brief ID points to a public example brief, never to a customer's project.

### 1.3 Examples per channel

| Channel (plan id) | Short link | Redirects with |
|---|---|---|
| Brand TikTok post (ch-tiktok) | `/go/tt-0412` | `utm_source=tiktok&utm_medium=organic&utm_campaign=launch-2026-10&utm_content=tt-0412-r2` |
| TikTok bio (ch-tiktok) | `/go/tt-bio` | `utm_source=tiktok&utm_medium=bio&utm_campaign=always-on&utm_content=tt-bio` |
| Instagram keyword DM "SITE" (ch-instagram) | `/go/ig-0031-site` | `utm_source=instagram&utm_medium=dm&utm_campaign=launch-2026-10&utm_content=ig-0031-site` |
| Instagram Reel caption (ch-instagram) | `/go/ig-0032` | `utm_source=instagram&utm_medium=organic&utm_campaign=launch-2026-10&utm_content=ig-0032-d1` |
| YouTube Short description (ch-youtube) | `/go/yt-0005` | `utm_source=youtube&utm_medium=organic&utm_campaign=launch-2026-10&utm_content=yt-0005-r1` |
| Founder LinkedIn post (ch-linkedin) | `/go/li-0107` | `utm_source=linkedin&utm_medium=organic&utm_campaign=launch-2026-10&utm_content=li-0107-f1` |
| Founder X, link in first reply (ch-x) | `/go/x-0210` | `utm_source=x&utm_medium=organic&utm_campaign=launch-2026-10&utm_content=x-0210-p2` |
| Wave-1 creator (ch-creators) | `/go/c-<handle>` | `utm_source=c-<handle>&utm_medium=creator&utm_campaign=creators-w1&utm_content=c-<handle>-v1` + affiliate code on the server |
| Creator on commission only (ch-creators) | `/go/c-<handle>` | `utm_medium=affiliate`, otherwise the same |
| TikTok Spark boost of post 0412 (ch-boosts) | `/go/tt-0412-s` | `utm_source=tiktok&utm_medium=spark&utm_campaign=launch-2026-10&utm_content=tt-0412-r2` |
| Meta partnership ad (ch-boosts) | `/go/c-<handle>-p` | `utm_source=instagram&utm_medium=partnership&utm_campaign=creators-w1&utm_content=c-<handle>-v1` |
| Meta boost of our own Reel V05 (ch-boosts) | `/go/ig-v05-b` | `utm_source=instagram&utm_medium=paid&utm_campaign=launch-2026-10&utm_content=ig-v05-f2` |
| Google Search brand ad (ch-boosts, from revenue only) | `/go/g-brand` | `utm_source=google&utm_medium=cpc&utm_campaign=always-on&utm_content=g-brand-1` |
| Content Rewards (ch-contentrewards, from revenue only) | `/go/cr-2026-12` | `utm_source=content_rewards&utm_medium=creator&utm_campaign=cr-2026-12` |
| TAAFT listing (ch-directories) | `/go/taaft` | `utm_source=taaft&utm_medium=directory&utm_campaign=launch-2026-10` |
| AlternativeTo (ch-directories) | `/go/alt` | `utm_source=alternativeto&utm_medium=directory&utm_campaign=launch-2026-10` |
| Product Hunt coming-soon page (ch-producthunt) | `/go/ph-soon` | `utm_source=producthunt&utm_medium=launch&utm_campaign=launch-2026-10` |
| Product Hunt main launch (ch-producthunt) **beat:images** | `/go/ph-images` | `utm_source=producthunt&utm_medium=launch&utm_campaign=images-beat` |
| Uneed day (ch-directories) **beat:images** | `/go/uneed` | `utm_source=uneed&utm_medium=directory&utm_campaign=images-beat` |
| Indie Hackers update (ch-community) | `/go/ih-01` | `utm_source=indiehackers&utm_medium=organic&utm_campaign=launch-2026-10` |
| r/SideProject (ch-community) | `/go/rd-01` | `utm_source=reddit&utm_medium=organic&utm_campaign=launch-2026-10` |
| Regional press (ch-press) | `/go/press-netokracija` | `utm_source=press-netokracija&utm_medium=press&utm_campaign=launch-2026-10` (`day30` / `day90` later) |
| Review page "Review powered by Makeborne" (ch-loops, ask 6) | built into the page | `utm_source=review_page&utm_medium=product_loop&utm_campaign=always-on` + the agency's referral code |
| "Made with Makeborne" badge (ch-loops, ask 6) | built into the badge | `utm_source=badge&utm_medium=product_loop&utm_campaign=always-on` + the site owner's referral code |
| Client portal footer, GitHub export README (ch-loops) | built in | `utm_source=portal` / `github_readme`, `utm_medium=product_loop` |
| Deck and book share links (ch-loops, ask 13, not live) | built in | `utm_source=deck_share&utm_medium=product_loop` |
| Weekly changelog email (ch-email) | `/go/em-<yyyymmdd>` | `utm_source=changelog&utm_medium=email&utm_campaign=always-on` |
| Customer referral (ch-loops, ask 12, not live) | `/go/r-<code>` | `utm_source=customer&utm_medium=referral&utm_campaign=always-on` |
| Black Friday "yearly is 20% off" post | `/go/tt-0601` | `utm_campaign=bf-2026`, otherwise as the surface |

**Code register:** keep one private sheet with code, destination, surface, post link, hook, campaign, owner, created date, and a `beat` column (empty, or `beat:images` etc.). It is the lookup table for the weekly report.

---

## 2. Link-in-bio setup

**Destination rule:** a bio link goes to the most specific live page. Until the format-matched pages ship (ask 7, target week 2) that is the homepage or `/pricing`. Afterwards, client-work surfaces go to `/client-work`, short-form surfaces go to `/sites`, `/decks` or `/books`.

| Platform | Setup | Bio links |
|---|---|---|
| TikTok | **Business account** (a clickable bio link needs a business account or 1,000 followers; some countries add business-registration rules [S, Buffer 9 Dec 2025]; BiH eligibility [U]). Commercial Music Library only | One link: `/go/tt-bio`. Bio text: "The AI studio for client work. From $20/month + tax. Full refund until you use credits." CTA in videos: "DM me SITE", answered by hand (ManyChat's TikTok channel eligibility for BiH is unknown [U]) |
| Instagram | **Professional account**. Up to 5 bio links (widely reported, not re-confirmed this pass [U]) | 1 `/go/ig-bio` (client work), 2 `/go/ig-bio-site`, 3 `/go/ig-bio-deck`, 4 `/go/ig-bio-book`, 5 `/go/ig-bio-review` (the public "play the client" sample review link, only once ask 5 ships). Keyword DMs (SITE, DECK, BOOK, CLIENT) reply with a post-specific `/go/ig-<post#>-<keyword>` link, 3 copyable briefs, a 30 s uncut build, the refund line and "Reply STOP to stop" |
| Founder LinkedIn | Profile website field + Featured section | `/go/li-bio` to client work; Featured: the sample review link (when live) and one real build video. Company page: `/go/li-page` |
| Founder X | Bio + pinned post | `/go/x-bio`; post links go in the first reply as `/go/x-<id>` |
| YouTube | Channel links + every description | `/go/yt-bio`; each video gets `/go/yt-<video#>` on the first line of the description |

**Do not use a third-party link-in-bio page** (Linktree and similar). It adds one more redirect, one more party that sees our visitors and possibly its own cookies, and it can drop our tags [A]. If a hub is ever needed, build it on makeborne.com.

**Bio-link check (every Monday, 10 minutes):** open every bio link from a phone in a private window. Each must land on makeborne.com with its tags, show the price and refund line, and lead to a checkout that Makeborne opens after sign-in. No bio may point to Whop.

---

## 3. Event spec to add in the app

### 3.1 Privacy rules for every event

- **Two kinds of events.** *Anonymous aggregates* are daily counts by dimension, counted the way the cookieless counter works today (no cookie, no identifier, Global Privacy Control and Do Not Track respected). *Account events* are first-party rows tied to the internal account ID, described in the privacy notice, used only for product analytics and billing reconciliation.
- **Never stored in analytics:** email, name, phone, IP address, full user agent, precise location, full URLs with query strings, brief text, file names, project or client names, review comments, Whop payment or membership IDs, card details. Billing joins happen through the account ID in the billing tables, not in analytics.
- **Allowed dimensions only:** `referrer_host` comes from an allow-list (search engines, AI assistants, the social platforms, Product Hunt, directories, press outlets); everything else becomes `other`. `device_class` is mobile, tablet or desktop. `country` only as a country code where the counter already records it on customer sites.
- **Retention:** raw account events 13 months, then aggregate [A]; anonymous aggregates kept as counts.
- **No ad pixels, retargeting tags or device-stored referral cookies** until the consent banner is live (§5).

### 3.2 Attribution fields stored on the account

| Field | Value |
|---|---|
| `first_touch` | `{source, medium, campaign, content, go_code, aff_code, ref_code, landed_page_group, at}` from the first tagged arrival in the sign-up journey, carried in the URL, written once at account creation |
| `last_touch` | Same shape, from the last tagged arrival before `checkout_opened` |
| `heard_about` | Onboarding answer (ask 4): tiktok, instagram, linkedin, x, youtube, creator, friend_or_colleague, client_review_link, made_with_badge, product_hunt, directory, search, ai_answer, press, other; plus an optional **public creator handle** box (validated as a handle, no free text) |
| `channel` (derived) | Mapping in §3.5 |

**Model:** first touch decides the source of a sale for CAC and creator credit, within 30 days from account creation to first payment (aligned with Whop's 30-day affiliate window [F]). An affiliate code captured at first touch takes precedence for commission. Last touch is kept for analysis only.

### 3.3 Events

Naming: `object_action`, past tense, snake_case. "Exists" means the data is already in the app database today [F, audit §7.1]; the work is to expose it as an event with these properties.

| Event | Kind | Fires when | Properties | Status |
|---|---|---|---|---|
| `go_redirected` | Anonymous aggregate | `/go/<code>` resolves | `code`, `channel`, `destination_group` | New (ask 1) |
| `landing_viewed` | Anonymous aggregate | Any public page view | `page_group`, `page` (allow-listed path), `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `referrer_host`, `ref_present`, `aff_present`, `device_class` | Extend the counter (ask 1a); count help, growth and comparison articles one by one (ask 1b) |
| `brief_started` | Anonymous aggregate | Create pressed with a brief on a public page | `kind` (site, deck, book), `used_idea_chip`, `from_go` | New |
| `plan_selected` | Anonymous aggregate | A plan button on pricing | `tier`, `interval`, `signed_in` | New |
| `sample_review_opened` | Anonymous aggregate | The public "play the client" link is opened | `utm_source`, `device_class` | With ask 5 |
| `examples_viewed` | Anonymous aggregate | `/examples` item opened | `kind` | With ask 7 |
| `account_created` | Account | Account created | `method` (email, google, github), `first_touch`, `has_brief`, `brief_kind` | New |
| `email_confirmed` | Account | Code or link verified | `minutes_since_signup` | Exists |
| `onboarding_answered` | Account | "How did you hear about us?" answered | `heard_about`, `creator_handle` (optional, public handle) | New (ask 4) |
| `checkout_opened` | Account | Makeborne creates a Whop checkout | `tier`, `interval`, `has_brief`, `mb_src`, `mb_campaign`, `aff_present`, `wave_code` | Exists as a record; add metadata (ask 1d) |
| `checkout_abandoned` | Derived | Opened, no payment after 24 h | `tier`, `interval` | Derived |
| `subscription_started` | Account (from Whop `payment.succeeded`, first payment) | First payment confirmed by webhook | `tier`, `interval`, `list_price_usd`, `first_touch`, `aff_code`, `wave_code`, `minutes_from_checkout` | Exists as "paid"; add source fields |
| `build_started` | Account | Send pressed in the studio | `kind`, `mode`, `effort`, `first_build`, `minutes_since_payment` (first build only), `queued` | New |
| `build_completed` / `build_failed` | Account | The AI run settles | `kind`, `credits_charged`, `duration_s`, `first_build`, `failure_class` | Exists as runs; add the event |
| `site_published` | Account | Publish confirmed | `first_publish`, `badge_on` | Exists |
| `review_link_created` | Account | A client review link is created | `kind`, `expiry_days` | Exists |
| `review_opened` | Anonymous to the client, counted per link | The client opens the link | `kind`, `device_class` | Exists |
| `review_decided` | Per link | Approve or request changes | `kind`, `decision` | Exists |
| `export_downloaded` | Account | PDF, PPTX, ZIP or manual GitHub export | `format` | New |
| `share_clicked` | Account | Copy link, post, email buttons | `surface` (site, deck, book, review), `channel` | New |
| `badge_toggled` | Account | Badge setting changed | `on` | New |
| `credits_exhausted` | Account | Balance reaches 0 | `tier`, `days_into_period` | New |
| `referral_converted` | Account | A referred account's first payment clears and is not refunded | `credits_granted` (referrer and invitee are internal account IDs in the referral table, not in the event) | With ask 12 |
| `subscription_renewed` | Account (Whop) | A later successful payment on the same membership | `tier`, `interval`, `renewal_number` | New |
| `plan_changed` | Account | Tier or interval change | `from_tier`, `to_tier` | New |
| `subscription_canceled` | Account (Whop) | Cancellation | `tier`, `reason_code`, `credits_used_band` | New |
| `refund_issued` | Account (Whop `refund.created`) | Refund recorded | `tier`, `days_since_payment`, `credits_used_band`, `reason_code` | New |
| `dispute_opened` | Account (Whop `dispute.created`) | Chargeback opened | `tier`, `days_since_payment` | New |
| `activated_payer` | Derived | Net payer with `review_link_created`, or a deck/book `site_published` or `export_downloaded`, within 7 days of paying | `tier`, `trigger` | Derived (north star) |
| `dm_keyword_received` | Manual daily aggregate | Instagram keyword DM | `keyword`, `post_code` | Logged by hand at first |

**Names in strategy §12, mapped:** landing_view → `landing_viewed`; brief_started → `brief_started`; signup_completed → `account_created`; email_confirmed → `email_confirmed`; checkout_opened → `checkout_opened`; purchase → `subscription_started`; refund → `refund_issued`; first_build_started → `build_started` with `first_build=true`; first_publish or export → `site_published` / `export_downloaded`; review_link_sent → `review_link_created`; client_decision → `review_decided`; referral_converted → `referral_converted`; dm_keyword → `dm_keyword_received`.

### 3.4 Built-in links that need tags (ask 1e and 6)

Badge on published sites, the review page after a decision, the client portal footer and the GitHub export README all link to makeborne.com without tags today [F, audit §3]. Add the tags in §1.3 plus the owner's referral code (a code, never a name or email). Badge impressions are already measurable from customer-site views where the badge is on; click-throughs need the tag.

### 3.5 Channel mapping (first touch to plan channel id)

Apply in order; the first match wins.

1. `utm_medium` is `creator` or `affiliate` and `utm_source` starts with `c-` → `ch-creators`; `utm_source=content_rewards` → `ch-contentrewards`
2. `utm_medium` is `spark`, `partnership`, `paid` or `cpc` → `ch-boosts`
3. `utm_medium` is `product_loop` or `referral` → `ch-loops`
4. `utm_medium=email` → `ch-email`
5. `utm_medium=directory` → `ch-directories`
6. `utm_source=producthunt` → `ch-producthunt`
7. `utm_medium=press` → `ch-press`
8. `utm_source` is `reddit`, `indiehackers` or `community-*` → `ch-community`
9. `utm_source` is `tiktok`, `instagram`, `youtube`, `linkedin` or `x` → the matching channel
10. No tags and `referrer_host` is a search engine or AI assistant → `ch-search`
11. No tags → the `heard_about` answer, mapped to a channel and flagged `survey`
12. Otherwise → `unknown`. Report it. Never assign it to the best-performing channel.

---

## 4. Reading Whop sales and attribution

### 4.1 What Whop gives us

- **Webhooks** (names read at docs.whop.com/developer/guides/webhooks on 26 Oct 2026 [F]): `payment.succeeded`, `payment.failed`, `payment.pending`, `refund.created`, `refund.updated`, `dispute.created`, `dispute.updated`, `dispute_alert.created`, `membership.activated`, `membership.updated`. Requests follow the Standard Webhooks scheme (signed headers, a 5-minute replay window); verify every request against the raw body. Secrets never go in this repo.
- **Payment object fields worth reading** [F, Whop API reference, read 26 Oct 2026]: `metadata` (our `mb_src`, `mb_campaign`, `mb_aff`, wave code once ask 1 ships), `checkout_configuration_id` (links the payment to the checkout Makeborne created, and so to the account), `usd_total`, `subtotal`, `currency`, `substatus` (for example succeeded or refunded), `refunded_amount`, `refunded_at`, `promo_code`, `plan`, `membership`, `created_at`, and `fees`, where a fee of type `affiliate_fee` shows that an affiliate was paid. There is no dedicated affiliate field on the payment.
- **Affiliates** [F, docs.whop.com/developer/guides/affiliates]: custom affiliates (invited by email, Whop username or ID) with a percentage or flat fee, first payment or recurring. The checkout configuration accepts `affiliate_code`. There is no `affiliate.*` webhook in v1; earnings are read by polling the affiliate's overrides (`total_referral_earnings_usd`). Payouts wait 30 days, and a refund inside the window claws the commission back. Affiliates need a Whop account to be paid.
- **Tracking links** [F, docs.whop.com tracking-links page]: they report clicks, revenue, conversion rate and converted users, but they send buyers to a Whop store page or a Whop checkout, not to a Makeborne-created checkout. **We do not use them** (strategy §6.1) unless a live test proves a purchase through one grants credits.
- **Fees** [F, docs.whop.com/fees, undated page]: 2.7% + $0.30 per card payment, +1.5% international cards, +1% currency conversion, $15 per dispute, plus optional add-ons (Billing 0.5%, Orchestration 0.8%, Tax 2%). Check in the dashboard which add-ons are on.

### 4.2 Definitions we report

| Metric | Definition |
|---|---|
| Gross new payers | First successful payments on Makeborne-created checkouts in the period |
| Net new payers | Gross minus those refunded within 14 days (re-stated each Sunday for the previous two weeks) |
| Gross revenue | Sum of `usd_total` of all successful payments |
| Net cash | Gross revenue minus refunds, Whop fees and dispute fees |
| Net new cash (for the D4 reinvestment rule) | Net cash from **first payments** only (renewals excluded) |
| MRR | Active monthly memberships x their monthly price + active yearly memberships x yearly price / 12 |
| Attribution coverage | Share of gross new payers whose account has a first touch other than `unknown` |
| Unmatched payment | A Whop payment whose `checkout_configuration_id` matches no checkout Makeborne created |

### 4.3 Sunday reconciliation (15 minutes)

1. Export the week's Whop payments, refunds and disputes. Keep the export private.
2. Count first payments; split monthly and yearly; split by plan.
3. Match each first payment to its Makeborne checkout through `checkout_configuration_id`, then to the account, then to `first_touch.channel`.
4. **Any unmatched payment** means a non-Makeborne link was used. Follow the private support runbook the same day, find the link that leaked, replace it.
5. For partner sales, check that `metadata.mb_aff` matches a payment with an `affiliate_fee`. A mismatch means the code did not pass into the checkout: stop that partner's link until fixed.
6. Attach refunds and disputes to the source of the original payment.
7. Fill the weekly source report (§6.3) and the `paid`, `revenue` and `refunds` fields of the daily log.

### 4.4 Tests before any partner earns commission (ask 9)

1. In the Whop sandbox: create a checkout with `affiliate_code` and metadata, pay with a test card, confirm the payment carries the metadata and the affiliate attribution. The sandbox takes cards only and has no payouts [F].
2. One small live test: an internal custom affiliate, one real purchase, one refund inside 30 days. Confirm the override earned and then reversed.
3. Only then hand out creator links that earn commission. Until then creators are paid flat fees from the budget, and only after the spend gate.

---

## 5. Consent banner: the prerequisite for pixels and Conversions APIs

### 5.1 Why

- No Meta, TikTok or Google pixel, retargeting audience, or ad-platform conversion upload tied to EU visitors goes live before a consent banner (CMP) is live. EU visitors are covered by EU consent rules even though the seller is in Bosnia and Herzegovina.
- The EDPB's Guidelines 2/2023 (v2.0, adopted 7 Oct 2024) put **tracking links, affiliate links named as the example,** inside ePrivacy Art. 5(3), like pixels [F, section 3.1, paragraphs 47-51]. The guidelines are an interpretation and national regulators differ. **Get a short legal view on `/go/`, referral codes and UTMs before pushing EU traffic at scale.** Until then keep tags at campaign level, count them as aggregates, and store nothing on the visitor's device.
- Google requires consent to be collected from EEA users, and the consent signals to be passed to Google, to keep using its tags for measurement, personalised ads and remarketing. Consent Mode v2 adds `ad_user_data` (consent to send user data to Google for advertising) and `ad_personalization` [F, Google Tag Manager Help, read 26 Oct 2026].

### 5.2 Checklist before the first pixel (target: about 6 Dec, week 6, strategy §8)

1. A CMP on makeborne.com: "Reject all" as easy as "Accept all", no tag fires before a choice, choices logged, the banner reachable again from the footer.
2. Google Consent Mode v2 wired to the CMP (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`), defaulting to denied in the EEA, UK and Switzerland.
3. Privacy notice updated: which platforms, which events, what data, lawful basis, retention.
4. A legal check on the EDPB tracking-link view, on Conversions API data sharing, and on the data processing terms of each ad platform.
5. Ad accounts confirmed registrable and billable from Bosnia and Herzegovina [U] (TikTok says available locations depend on the registration country).
6. Whop's checkout runs on Whop's domain. Our banner does not cover it. Do not switch on Whop's own pixel integrations until it is clear how Whop handles consent there [U].
7. A test from an EU location: with "Reject all", no request reaches any ad platform.

### 5.3 Server-side purchase events after consent

- **Source of truth:** the Whop `payment.succeeded` webhook, for first payments only.
- **Send only for accounts whose stored consent allows ad measurement.** Store the consent state on the account when it signs up. No consent, no event.
- **Meta Conversions API:** send `Purchase` with a stable `event_id` generated per purchase. If the browser pixel also fires a purchase, it must use the same event name and ID: Meta de-duplicates matching events received within 48 hours [F, Meta developer docs, read 26 Oct 2026].
- **TikTok Events API:** send the same `event_id` through the pixel and the Events API. TikTok de-duplicates within a 48-hour window and merges pixel and server duplicates that arrive more than 5 minutes apart [F, TikTok Ads help "About event deduplication", last updated May 2025, read 26 Oct 2026].
- **Customer matching data** (hashed email and similar) is still personal data. Send it only with consent, only if the legal check allows it, and never log it in analytics.
- **What it unlocks (January):** purchase-optimised Spark and partnership ads, and small retargeting of consenting `/go/` visitors, funded from revenue only (strategy §8, phase 3).

---

## 6. Weekly dashboard rituals

### 6.1 Daily, 08:00-08:30 Sarajevo (strategy §18)

- Yesterday's Whop sales, refunds and disputes; any unmatched payment (§4.3 step 4)
- `/go/` clicks by source; DM keywords by hand
- AI daily-limit hits and first-build times (share of payers starting within 10 minutes)
- Any source above the 20% refund brake
- Log one row per active channel in the daily log (`data/actuals.template.json` structure, kept privately)

### 6.2 Fridays

Boost decision on posts at 48 h (qualification in §7.3); creator payouts on verified views; support sweep.

### 6.3 Sunday review, 90 minutes

| Minutes | Step |
|---|---|
| 15 | Whop reconciliation (§4.3) |
| 15 | **Weekly source report**, one row per source: spend, clicks, checkouts opened, gross paid, refunds, net paid, CAC, Studio share, activated payers, attribution flag (tagged / survey / unknown) |
| 20 | **Content scorecard:** per post, views, 3 s hold, average watch %, sends, saves, comments, profile visits, `/go/` clicks, DMs, sign-ups, paid. Tag the top 10%, re-cut each with 2 new hooks; retire the bottom 50% of formats |
| 15 | Keep, kill and scale every source and creator (§7) |
| 10 | **Re-forecast:** put the week's real visit-to-paid, refund and churn rates into the calculator (`data/funnel.json`) and record low, base and high |
| 10 | Schedule the week; check every beat against the six-box gate |
| 5 | One-page growth note to the owner |

**One-screen dashboard** (in this order): north star (activated payers this week vs target) · MRR and net new MRR vs `kpis.json` · visits by channel · sign-up, confirm, checkout-open and paid rates · median minutes to first build · activated share · refunds and disputes · CAC by paid source · loop share · badge impressions and click-throughs · attribution coverage · plan mix and yearly share.

### 6.4 Mondays

- Set the reinvestment amount (D4, §7.1) from last week's net new cash.
- Set the AI daily limit for the week: at least the expected peak new payers per day x 2 builds x $1.35 [E, audit §8.1], and raise it before every creator post or beat.
- Bio-link check (§2).

### 6.5 Dated checkpoints

| Date | Checkpoint |
|---|---|
| Thu 29 Oct | Attribution live (asks 1 and 4). If not, survey fallback ships; paid lines wait |
| Sun 1 Nov | First Sunday review; images go/no-go check |
| Mon 16 Nov | **Offer check on organic conversion** (§7.5) |
| Mon 30 Nov | **Paid-CAC offer check** (§7.5) |
| Sun 22 Nov | **Re-forecast gate:** cumulative gross paid under 100 / 100-200 / 200+ |
| Wed 25 Nov | Day-30 public numbers post (redacted) |
| About 6 Dec | Consent banner and server-side purchase events (§5) |
| Sun 20 Dec | Breakout check: about 750 cumulative gross payers needed |
| Sun 24 Jan | Day-90 report and review |

---

## 7. Kill and scale decision rules

### 7.1 Every paid source (strategy §6.3)

| Rule | Trigger | Action |
|---|---|---|
| Spend gate | `/go/`, first touch or checkout metadata not live | No creator payment, no boost (TAAFT excepted) |
| Kill | $100 spent with 0 net payers, or $150 with 1 | Stop the source |
| Refund brake | More than 20% of the source's buyers refund within 14 days | Pause the source |
| Keep | CAC within target: $37 or less on Create-heavy sources, $50 or less blended when Studio is 35%+ of the mix | Keep running |
| Scale | CAC $50 or less over 3+ net payers | +20-30% at most every 48-72 h |
| Hard ceiling | CAC above $120 | Never fund, whatever the reach |
| Reinvestment (D4) [O] | From week 3, every Monday | 30% of last week's net new cash into sources at or under target; 10% when blended CAC is up to 25% above target; 0% beyond |

### 7.2 Creators

- **Keep:** at least 1 net payer per $40 spent, counted 14 days after the second video.
- **Kill:** $100 spent with 0 net payers, or $150 with 1.
- **Rehire:** from the reserve first, then from revenue; winners move to the 30% founding-partner rate (D3).
- **Pay** per-view bonuses on verified views only; watch for views clustering at the cap.
- Wave 2 only after images pass the gate (**beat:images**); if images are not live by 30 Nov, rehire the best wave-1 creator instead.

### 7.3 Boosts

- **Qualify:** 3x or more the account's median views in 48 h, 65%+ 3-second hold, and at least 1 tracked sale or 5+ link clicks per 1,000 views.
- **Stop** after $30-50 if link CTR is under 0.5% or CPC is over $2; stop a source at $100 with 0 net payers.
- **Blackout:** no boosts 20 Nov - 2 Dec (Black Friday prices).
- Judge a 2-day burst on `/go/` sales, not platform metrics.

### 7.4 Content

- Re-cut every post above 3x the account median at 48 h with 2 new hooks.
- Retire the bottom 50% of formats each Sunday; keep the top 2-3 as house formats once one shows at least 1 net payer per 10,000 views across 3+ posts.
- Fix the CTA when profile visits per 1,000 views fall under 5, or DM replies per 1,000 views under 3.
- Never promote a feature that is not live. Coming features say "coming soon", with no date, until their beat passes the gate.

### 7.5 Offer and forecast gates

- **Offer check, Mon 16 Nov:** the creator test cannot be read yet (wave-1 first videos post 9-15 Nov and the keep rule counts payers 14 days after video 2). Judge organic `/go/` visit-to-paid only: under 0.7% triggers D2 (capped first-build preview); also read boost slot A.
- **Paid-CAC offer check, Mon 30 Nov:** if no source has delivered net payers at $50 or less, change the offer before buying more views. The levers are owner decisions D1 (usage-capped refund) and D2 (capped first-build preview). D4 reinvestment starts only once a source has 3+ net payers at $50 or less (earliest about 23 Nov).
- **Re-forecast, Sun 22 Nov:** under 100 cumulative gross payers, plan on the low-to-base band and protect margin; 100-200, plan on base; 200 or more, the high or breakout path is live, so raise reinvestment and prepare AI capacity.
- **Breakout check:** about 200+ cumulative gross payers by 22 Nov and about 750 by 20 Dec (calculator breakout). If week 4 is under 200, drop the $1M expectation in writing and optimise for the base case.

### 7.6 Content Rewards (revenue only)

Start only after a source shows CAC $50 or less on 3+ payers **and** MRR passes about $1.5k. Plan at $1.60 per 1,000 views, $3 minimum payout, $150 cap per video, a geo rule, #ad disclosure, a real build on screen, a `/go/cr-*` link, live features only, no vendor names. Pause the campaign if its CAC goes above $50 after $150 spent [A].

### 7.7 A consistency warning to check on 30 Nov

At the research desk's own inputs (creator CPM about $5, 0.6% of views clicking, 1.0% visit-to-paid), a creator-sourced payer costs about $98 and a Content Rewards payer about $78, both above the $50 gate [E, `data/funnel.json` scenario `baseStrict`]. The base case only holds if creator traffic clicks at 0.8%+ and converts about 1.5x the blended rate, which use-my-brief links and format-matched pages are meant to deliver. If the real numbers do not show this by 16 Nov, the reinvestment rule will (correctly) keep money out of paid sources, and the base case drops to about $134k ARR.

---

## 8. Sources

Read on 26 Oct 2026 unless noted.

- Whop webhooks (event names, signature scheme): https://docs.whop.com/developer/guides/webhooks
- Whop payment object (`metadata`, `checkout_configuration_id`, `usd_total`, `refunded_amount`, `fees`): https://docs.whop.com/api-reference/payments/retrieve-payment
- Whop checkout configuration (`affiliate_code`, `metadata`; spec dated 2026-10-24): https://docs.whop.com/api-reference/checkout-configurations/create-checkout-configuration
- Whop affiliates developer guide: https://docs.whop.com/developer/guides/affiliates
- Whop tracking links: https://docs.whop.com/manage-your-business/growth-marketing/tracking-links.md
- Whop sandbox: https://docs.whop.com/developer/guides/sandbox
- Whop fees (undated page): https://docs.whop.com/fees
- Meta, deduplicating pixel and server events: https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
- TikTok, About event deduplication (last updated May 2025): https://ads.tiktok.com/help/article/event-deduplication
- Google Tag Manager Help, consent mode parameters and EEA requirement: https://support.google.com/tagmanager/answer/13695607
- Secondary, Consent Mode v2 in 2026 (vendor blogs; used only for context): https://measuremindsgroup.com/is-consent-mode-v2-mandatory ; https://www.cookiehub.com/blog/google-consent-mode-v2-setup-gtm-guide
- EDPB Guidelines 2/2023 v2.0 (adopted 7 Oct 2024): https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf
- Buffer, TikTok bio-link rules (9 Dec 2025, secondary): https://buffer.com/resources/how-to-put-a-link-in-tiktok-bio
- Internal: `plan/strategy.md` sections 6, 11, 12, 13 and 18; `research/product-funnel-audit.md` sections 2, 3, 5, 7 and 8; `research/paid-acquisition.md` section 9; `research/short-form-video.md` sections 12 and 13.

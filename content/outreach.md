# Makeborne outreach and launch copy

> **Launch moved (owner decision, 26 Oct 2026 evening).** The public launch is **Wednesday 28 October 2026 at 19:00 Sarajevo time** (CET, 18:00 UTC); makeborne.com shows a countdown to that moment. Day 1 = Wed 28 Oct; Mon 26 and Tue 27 Oct are pre-launch days −2 and −1 (profiles, scheduling, extra footage, DM keywords, countdown teasers that never say it is live). The launch week moved 2 days later with its times (days 1-7 = 28 Oct - 3 Nov); everything after it keeps its date (ads A01 12-15 Nov and A02 3-4 Dec, creator waves, the no-boost window 20 Nov - 2 Dec, Black Friday, the 22 Nov and 20 Dec checkpoints) and day numbers are recomputed. The 90 days run Wed 28 Oct 2026 - Mon 25 Jan 2027 (day 90, the day-90 review). `data/calendar.json` and the war room are the source of truth; dates and day numbers in the text below that disagree are from before the move.


**Date:** Monday 26 October 2026, day 1 of the paid beta.  
**Status:** Drafts only. Nothing has been sent, posted, submitted or bought. The owner sends or approves every message.  
**Built on:** `plan/strategy.md` and `data/plan.json`. The machine-readable version is `data/outreach.json`, and both files hold the same copy.

## How to use this file

- **Merge fields:** {curly} fields are filled per recipient; [square] fields are verified numbers filled on the day, or the sentence is cut.
- **Beat tags:** Any item with beat 'beat:<feature>' is used only after that feature passes the six-box gate (plan section 9). Items with beat null use live features only.
- **Links:** makeborne.com/go/<channel>-<id> (plan section 12). Until /go/ is live (target Thu 29 Oct), use the full makeborne.com URL with utm_source, utm_medium, utm_campaign=launch-2026-10 and utm_content=<surface>-<post#>-<hook>. Never Whop store or tracking links.
- **Labels:** [F] fact, [V] vendor or self-reported, [S] secondary, [E] estimate, [U] unverified, [O] owner decision (same as the plan)
- **Copy rules for every piece:**
  - Live features only: AI websites published on a Makeborne address, AI books, AI decks, client review links (anonymous comments, Approve), basic CRM with lead finder, manual GitHub export, projects library.
  - Never say free, trial or start free. Never name AI model vendors. Never claim 'better than' any competitor.
  - Coming features (images, top-ups, custom domains, two-way GitHub sync, agency tools, AI lead research) are not mentioned, or only as 'coming soon' with no date, until their beat passes the gate.
  - Every link is makeborne.com/go/<code> (or the long UTM URL until /go/ is live). Never a Whop store or Whop tracking link.

---

## 1. Rules first: where outreach is allowed

Checks and readings, not legal advice. Get counsel for the EU affiliate-link question and any cold email outside the US, UK and France.

### 1.1 Cold email law matrix

| Law | Who it covers | What it requires | Verdict for Makeborne | Source |
|---|---|---|---|---|
| US CAN-SPAM | All commercial email, including B2B ('no exception for business-to-business email') | Accurate headers and subject; identify the message as an ad; a valid postal address; a clear opt-out that works for 30 days; honour opt-outs within 10 business days; penalties up to $53,088 per email | **Cold B2B email allowed with the footer** | https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business (page Aug 2023, penalty edited Jan 2024; read 26 Oct 2026) |
| UK PECR plus UK GDPR | Corporate subscribers (companies, LLPs, government bodies) can be emailed without consent; sole traders and some partnerships count as individuals and need consent or the soft opt-in | Don't hide who you are; give a valid address and an opt-out; keep a 'do not email' list; a lawful basis for named employee addresses | **Allowed to companies only; not to sole-trader freelancers** | https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/ (read 26 Oct 2026; under review after the Data (Use and Access) Act 2025) |
| France (CNIL) | B2B prospecting by email without prior consent when it relates to the recipient's profession | Tell them where you got the address and that they can object; a simple, free objection in every message; identify the sender | **Allowed when relevant to their job** | https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique (page dated 10 Jun 2026; read 26 Oct 2026) |
| Germany (UWG s.7) | Email advertising without prior express consent is always an unreasonable nuisance; the text draws no consumer/business line for email; the only exception is existing customers and similar products | Prior express consent | **Do not cold-email German businesses** | https://www.gesetze-im-internet.de/uwg_2004/__7.html (read 26 Oct 2026) |
| Other EU and EEA states (national ePrivacy rules; the ePrivacy Regulation was withdrawn in 2025 [S]) | Varies by country | Check the national rule first; GDPR Art. 14 information (the source of the data) and the right to object apply everywhere | **Do not send until checked; Austria treated as consent-required [U]** | Secondary overview: https://tomba.io/blog/gdpr-cold-email-b2b (2026) [S] |
| Canada CASL | Commercial electronic messages need consent; implied consent may cover an address that is conspicuously published and relevant to the role, without a 'no unsolicited email' notice | Identify the sender, contact details, an unsubscribe | **Only with implied or express consent; check first** | Not read at the source (crtc.gc.ca returned 403 on 26 Oct 2026) [U] |

**What every cold business email needs:**
- a subject line that matches the content
- who we are, the company name and a postal address
- where we found the address (GDPR Art. 14)
- a one-step opt-out ("reply no"), honoured at once and logged in a suppression list kept outside this repo
- one to one, written by hand: no sequences, no bought or scraped lists, at most one follow-up

**Restricted, so we don't do it:**
- cold email to German businesses
- cold email to Austrian businesses (treated as consent-required [U])
- cold email to UK sole traders
- cold email to any EU country whose rule hasn't been checked
- LinkedIn connection requests that carry a pitch
- automated LinkedIn messages
- cold DMs to community members
- promotional Instagram DMs outside the 24-hour window

### 1.2 Platform rules

| Platform | Rule | Source |
|---|---|---|
| LinkedIn | No promotional invitations to people you don't know; no unwanted, repetitive or inappropriate commercial messages; no bots or automation to add contacts or send messages; no scraping | https://www.linkedin.com/legal/professional-community-policies and https://www.linkedin.com/legal/user-agreement (effective 3 Nov 2025; read 26 Oct 2026) |
| Instagram and Messenger (Meta) | Promotional replies only inside the 24-hour window opened by the user; message tags are not for promotion; automated chats disclose automation where the law requires | https://developers.facebook.com/docs/messenger-platform/policy/policy-overview/ (read 26 Oct 2026) |
| TikTok | Branded content needs the commercial content disclosure toggle; multiple accounts only if not used to deceive; Commercial Music Library for business accounts | https://www.tiktok.com/legal/page/global/bc-policy/en (published 4 Aug 2026, in force 31 Aug 2026; read 26 Oct 2026) |
| YouTube | Tick 'Paid promotion' for sponsorships, endorsements and free products | https://support.google.com/youtube/answer/154235 (read 26 Oct 2026) |
| FTC (any US-facing endorsement) | Disclose material connections (money, free product, affiliate) clearly in the content itself; in videos, say it and show it; no vague tags | https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers (Nov 2019; read 26 Oct 2026) |
| UK ASA/CAP Code and CMA (UK audience; UK is in the creator audience rule and the boost geos) | CAP Code 2.1/2.4: paid posts must be obviously identifiable as ads; label them "Ad" or "#ad" up front; a platform paid-partnership label alone is not enough; affiliate links need disclosure too; the CMA applies consumer law to hidden advertising | https://www.asa.org.uk/resource/influencers-guide.html (page dated 23 Oct 2026, read 26 Oct 2026; the full PDF guide still to be read and dated before wave 1) [U] |
| FTC fake-review rule | No fake or AI-made testimonials, no undisclosed insider reviews, no incentives tied to positive sentiment, no bought followers or views | FTC press release, 14 Aug 2024 (research/case-studies-adjacent.md) |
| Reddit | Sitewide: authentic participation, no spam or vote manipulation (Content Policy rule 2, quoted by a secondary guide); each subreddit sets its own promotion rules | https://redship.io/blog/reddit-self-promotion-rules (2026) [S]; Reddit's own pages could not be fetched [U] |
| Product Hunt | No paid hunters, upvote asks, vote swaps or upvote contests; account at least 1 week old; mass identical messages count as spam | https://www.producthunt.com/launch/before-launch and /preparing-for-launch (read 26 Oct 2026) |
| Hacker News | Something people can try, ideally without sign-ups; no landing pages; no asking friends to vote | https://news.ycombinator.com/showhn.html (read 26 Oct 2026) |
| Communities (Skool, Slack, Discord) | Follow each group's rules; show-and-tell channels only; never cold-DM members | Plan 5.2 and research/platforms-community.md section 11 |

**Social DMs:** The EU ePrivacy Directive's definition of 'electronic mail' covers any stored text message sent over a public network, so a cautious reading also applies the email consent rules to unsolicited commercial DMs to EU individuals [U]. That's why creator DMs go only to people whose profiles invite business enquiries, and agency owners are reached by engagement first.

---

## 2. Who we contact

| Priority | Type | Examples | How to find | Count | Templates | Budget |
|---|---|---|---|---|---|---|
| 1 | Wave-1 Lane A creators (freelance web design, 'sell websites to local businesses', agency life) | TikTok and Instagram creators posting 'how I land web design clients' or 'sell websites to local businesses'; LinkedIn web designers who post client-process carousels (at least 1 of the 3 must be on LinkedIn) | TikTok and Instagram search for 'web design client', 'sell websites', 'freelance web designer'; LinkedIn search for posts on 'client feedback' and 'web design agency'. Check 2k-50k followers, a 60%+ US/UK/EU/CA/AU audience (screenshot), real comments, and past #ad disclosure habits. | Shortlist 30 by day 2, owner contacts the top 10 from day 3, sign 3 | t01-creator-lane-a-dm, t03-creator-brief | b2, b3 |
| 1 | Wave-1 Lane B creators (decks, productivity, side-hustle) | Creators who make 'Gamma vs PowerPoint' or 'pitch deck in 5 minutes' videos; Productivity creators who show notes-to-output workflows | TikTok and YouTube Shorts search for 'pitch deck', 'AI presentation', 'Gamma'; same audience checks. | Shortlist (within the 30), sign 2 | t02-creator-lane-b-dm, t03-creator-brief | b2, b3 |
| 1 | Agency owners and freelancers (direct, ICP 1) | 1-10 person web studios; Freelance web designers; 'Sell websites to local businesses' side-hustlers | Founder's own network first (30-50 on day 1); then LinkedIn engagement (15 comments a day); then one-to-one email only to addresses the business publishes, only in the jurisdictions the matrix allows. | 30-50 warm on day 1; then up to 10 one-to-one a day | t08-founder-network-warm, t07-agency-owner-linkedin, t06-agency-owner-email | $0 |
| 1 | AI directories and launch sites | There's An AI For That ($49, first); AlternativeTo; SaaSHub; Microlaunch; Future Tools; The Rundown Supertools; ToolPilot; Dang.ai; AI Tools Directory; Uneed ($30, images day) | research/platforms-community.md sections 8-9. Cut on purpose: Toolify, TopAI, Fazier, Futurepedia (paid, low fit or nofollow). | 1 paid on day 1, 8-10 free from day 2, 1 paid on the images day | t13-directory-submission-email | b1, b6 |
| 1 | Customers for stories and partners | Activated payers who sent a review link; Studio and Scale agencies; Customers whose client tapped Approve | The weekly activated-payers list (the north-star report). | 5 calls in week 1, then 1 a day; 20 founding partner spots | t18-customer-story-request, t19-customer-story-consent, t09-founding-agency-partner, t23-customer-share-ask | $0 |
| 2 | YouTube tutorial creators (affiliate first) | AI tool review channels (the category of Future Tools, the Futurepedia channel and Skill Leap AI; the largest are unlikely to take a commission-only deal); Mid-size channels (5k-100k subscribers) already making 'Lovable vs Bolt vs X' or 'Gamma alternative' videos; 'Start a web design agency' and 'AI agency' educators; Business-ebook and lead-magnet creators (not fiction) | YouTube search for 'Lovable alternative', 'AI website builder for clients', 'Gamma alternative', 'web design agency AI', filtered to the last 12 months; check the About page for a business-enquiry email. Audience sizes and rates were not verified in this pass [U]. | List 20, contact 8-10 from week 2, aim for 2 videos by week 5 | t05-youtube-tutorial-creator, t04-affiliate-invite | $0 |
| 2 | Agency and freelancer communities | Skool: Agency World; RC Agency Owners & Freelancers; AI Freelancers (about 5-6k members each); Slack: No Code Founders (19k), Fractionals United (8k), Growth Marketing Pros (8k); Discord: Freelance Marketplace (65k); Forums: Starter Story, Small Bets | Member counts from Hive Index [S]. Join one core community in week 1 and contribute only; offer a workshop from week 3. Never Lovable's Discord or other competitor communities. | 1 core community, 2-3 more after day 30 | t10-community-workshop-offer | $0 |
| 2 | Press | Netokracija; Bloomberg Adria; Startit; BiH business portals; European reporters covering AI tools or CEE startups | Regional: the owner's own contacts and each outlet's newsroom email. European: reporters' recent articles on AI builders or Balkan startups. | 4-6 regional in week 1; 5-8 European at day 30 and at beat:images | t16-press-regional, t17-press-europe | $0 |
| 2 | Real businesses for comment-reply speedruns | Business owners who comment 'build mine' | Comments on brand TikTok and Reels only; never reach out first. | As requested, with written consent | t20-speedrun-consent | $0 |
| 3 | Wave-2 visual creators (beat:images) | Design-led creators who post layout and brand-identity breakdowns | Instagram and TikTok design hashtags; Behance and Dribbble profiles that link to short-form accounts. | Shortlist 10, sign 2 | t22-wave2-visual-creator | b4 |
| 3 | Newsletters (editorial now, sponsorship from revenue) | Ben's Bites; The Rundown AI; Superhuman AI; TLDR AI; The Neuron; Sidebar (design links; $950 an edition, about 40k subscribers [V]); Niche agency and freelance newsletters | Sponsor pages and media kits; for niche ones, search Beehiiv and Substack for 'web design agency' and 'freelance designer' newsletters with 2k-20k readers. | 8-10 editorial pitches at launch and at beat:images; 5 rate-card enquiries in phase 1; 0 paid placements until D4 releases revenue | t12-newsletter-editorial-pitch, t11-newsletter-sponsorship-ask | $0 |
| 4 | Product Hunt hunter (optional) (beat:images) | One experienced maker who has really used Makeborne | Makers whose comments you already value; never a paid 'hunter service'. | 0-1 (default is a self-hunt) | t14-product-hunt-hunter-ask | $0 |

---

## 3. Templates

| ID | Channel | Beat |
|---|---|---|
| [t01-creator-lane-a-dm](#t01-creator-lane-a-dm) | Instagram or TikTok DM, or the creator's published business email | live now |
| [t02-creator-lane-b-dm](#t02-creator-lane-b-dm) | Instagram or TikTok DM, or the creator's published business email | live now |
| [t03-creator-brief](#t03-creator-brief) | Email or shared doc, sent after a creator says yes | live now |
| [t04-affiliate-invite](#t04-affiliate-invite) | DM or email, one to one | live now |
| [t05-youtube-tutorial-creator](#t05-youtube-tutorial-creator) | Creator's published business email | live now |
| [t06-agency-owner-email](#t06-agency-owner-email) | Cold B2B email, one to one, only where the law allows (see matrix) | live now |
| [t07-agency-owner-linkedin](#t07-agency-owner-linkedin) | LinkedIn: comments first, then a connection request with no pitch, then a message only after they engage | live now |
| [t08-founder-network-warm](#t08-founder-network-warm) | Personal message (WhatsApp, email, LinkedIn) to people the founder knows | live now |
| [t09-founding-agency-partner](#t09-founding-agency-partner) | Email or in-app message to existing paying agencies, or a personal message to active community members | live now |
| [t10-community-workshop-offer](#t10-community-workshop-offer) | Message to the admin or moderator of one agency community (Skool, Slack or Discord), after 1-2 weeks of contributing | live now |
| [t11-newsletter-sponsorship-ask](#t11-newsletter-sponsorship-ask) | Email to the newsletter's advertising address (published on its sponsor page) | live now |
| [t12-newsletter-editorial-pitch](#t12-newsletter-editorial-pitch) | Email or tool-submission form for a newsletter's free tools or reader-picks section | live now |
| [t13-directory-submission-email](#t13-directory-submission-email) | Directory submission form or editor email | live now |
| [t14-product-hunt-hunter-ask](#t14-product-hunt-hunter-ask) | Personal message to one experienced Product Hunt maker or hunter who has actually used Makeborne | beat:images |
| [t15-product-hunt-launch-notice](#t15-product-hunt-launch-notice) | Personal messages and one email to people who opted in (PH coming-soon followers, customers who agreed to updates) | beat:images |
| [t16-press-regional](#t16-press-regional) | Email from the owner to regional tech and business editors (Netokracija, Bloomberg Adria, Startit, BiH portals) | live now |
| [t17-press-europe](#t17-press-europe) | Email from the owner to European tech reporters who cover AI tools or Balkan and CEE startups | beat:day30 |
| [t18-customer-story-request](#t18-customer-story-request) | Email or in-app message to activated payers (sent a review link, or published or exported a deck or book) | live now |
| [t19-customer-story-consent](#t19-customer-story-consent) | Email reply, kept as the written record | live now |
| [t20-speedrun-consent](#t20-speedrun-consent) | Reply to a comment or DM from a business owner who asked for a 'build mine' video | live now |
| [t21-instagram-keyword-dm](#t21-instagram-keyword-dm) | Instagram DM auto-reply to a comment keyword (SITE, DECK, BOOK, CLIENT) | live now |
| [t22-wave2-visual-creator](#t22-wave2-visual-creator) | DM or published business email | beat:images |
| [t23-customer-share-ask](#t23-customer-share-ask) | In-app prompt after a client approves ('Client approved. Share the win?') | live now |

### t01-creator-lane-a-dm

- **Purpose:** Recruit wave-1 Lane A creators (freelance web design, 'sell websites to local businesses') for a small paid UGC test.
- **Channel:** Instagram or TikTok DM, or the creator's published business email
- **Audience:** icp1 creators, 2k-50k followers, 60%+ audience in US/UK/EU/CA/AU (screenshot required)
- **Plan refs:** budget b2, b3, b8; channels ch-creators; ICP icp1
- **When:** live now
- **Subject:** Paid test: 2 videos of a client site built, sent and approved

```text
Hi {firstName},

I'm {founderName}, founder of Makeborne, a small studio in Sarajevo. Your video on {specificVideo} stuck with me, especially {specificDetail}. That is exactly how freelancers win clients.

Makeborne is an AI studio for client work. One brief becomes a website published on a Makeborne address. The client opens a review link, comments without making an account, and taps Approve. It also makes decks and books, and has a basic CRM with a lead finder.

I'm running a small paid test with 5 creators:
- $60 for 2 videos (half when we sign, half on delivery)
- a bonus of $1.50 per 1,000 views in each video's first 7 days, up to $40 a video
- a Studio month on us to build with
- your own link and affiliate code, so you earn on every customer you send

You keep creative control. The must-haves are a real build on screen and a clear paid-partnership label.

Want the one-page brief? If it's not a fit, no need to reply.

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** One follow-up after 4-5 days, then stop: "Quick bump in case this got buried. I can send a 30-second uncut build so you can judge whether it suits your audience. If not, all good."

**Rules:**
- The owner sends it, one to one, from the owner's own account. This plan sends nothing.
- Contact only creators whose profile invites business enquiries (a business email, 'DM for collabs' or a creator-marketplace profile). These people asked for collaboration offers.
- The {specificVideo} and {specificDetail} lines are mandatory. No identical mass messages (Instagram and TikTok treat them as spam; Meta's messaging policy covers automated sends).
- If sent by email: add EMAIL_FOOTER (identity, postal address, opt-out). See the email law matrix; do not cold-email creators in Germany or Austria unless their page invites commercial enquiries.
- No payment until the spend gate is met (/go/ links, first-touch storage, mb_src/mb_campaign/mb_aff on the Makeborne-created checkout).
- Written agreement: 2 videos, 60 days of Spark or partnership-ad rights, a draft review 48 h before posting, disclosure, live features only, payment terms.
- Rates may be below market (market posts reportedly $175-290 [S, unverified]). Fallback from the plan: 4 creators at $75 and keep the other lines.
- Keep creator contact details in a private sheet, never in this repo.
- Live features only: AI websites published on a Makeborne address, AI books, AI decks, client review links (anonymous comments, Approve), basic CRM with lead finder, manual GitHub export, projects library.
- Never say free, trial or start free. Never name AI model vendors. Never claim 'better than' any competitor.
- Coming features (images, top-ups, custom domains, two-way GitHub sync, agency tools, AI lead research) are not mentioned, or only as 'coming soon' with no date, until their beat passes the gate.
- Every link is makeborne.com/go/<code> (or the long UTM URL until /go/ is live). Never a Whop store or Whop tracking link.

### t02-creator-lane-b-dm

- **Purpose:** Recruit wave-1 Lane B creators (decks, productivity, side-hustle) for the deck and speedrun formats.
- **Channel:** Instagram or TikTok DM, or the creator's published business email
- **Audience:** icp2 and icp3 creators, 2k-50k followers, Western audience share checked
- **Plan refs:** budget b2, b3, b8; channels ch-creators; ICP icp2
- **When:** live now
- **Subject:** Paid test: notes in, an editable deck out (2 videos)

```text
Hi {firstName},

Loved your {specificVideo}. The {specificDetail} part is the kind of thing your audience actually saves.

I make Makeborne. You paste messy notes and get a finished deck you can open and edit in PowerPoint, with real charts you can click and change. The same brief can also become a website or a short book.

Small paid test, 5 creators: $60 for 2 videos, plus $1.50 per 1,000 views in the first 7 days (up to $40 a video), a Studio month to use, and your own affiliate code.

The only must-haves: show the real build, say when footage is sped up, and use the paid-partnership label.

Want the brief?

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** One follow-up after 4-5 days: "Happy to send you a deck built from one of your own public posts so you can see the output first." Then stop.

**Rules:**
- Same sending, consent, payment-gate and disclosure rules as t01.
- Only build a deck from a creator's public post if you tell them it was built and you don't publish it.
- Books: say 'guides and lead magnets for screen and PDF'. Never 'print-ready' and never a KDP promise. KDP requires disclosure of AI-generated text [F, kdp.amazon.com/en_US/help/topic/G200672390].
- Plus the shared copy rules at the top of this file.

### t03-creator-brief

- **Purpose:** The one-page brief that keeps paid creator posts honest, on-format and trackable.
- **Channel:** Email or shared doc, sent after a creator says yes
- **Audience:** Signed wave-1 creators
- **Plan refs:** budget b2, b3; channels ch-creators; ICP icp1/icp2
- **When:** live now
- **Subject:** Makeborne brief: 2 videos, what to show, what not to say

```text
Thanks for doing this, {firstName}. Here's everything on one page.

YOUR LINKS
- Link: makeborne.com/go/c-{handle}
- Affiliate code: {affiliateCode} (works once our affiliate setup passes its test; we'll confirm)

WHAT EVERY VIDEO SHOWS
1. Frame 0: the finished site, deck or book, on screen.
2. The brief typed into Makeborne, with a visible timer.
3. The real build. If you speed it up, write 'sped up 4x' on screen.
4. One live edit.
5. Publish to the Makeborne address (sites), or open the deck in PowerPoint (decks).
6. Back to frame 0 so it loops.
Lane A videos also show the review link: the client comments, then taps Approve on a phone.

HOOKS YOU CAN USE (pick or rewrite)
- "This website took [real time]. Watch."
- "Freelancers: steal this client-approval trick."
- "POV: the client says 'make it pop' for the 9th time."
- "I found 20 local businesses to pitch in [real time]." (the lead finder, shown live)
- "40-email feedback thread vs one link."
- "Pitch deck from one sentence." / "It's a real chart, not a picture."

PLEASE DON'T
- say free, trial or 'start free' (there is no free plan)
- show or promise generated images, custom domains, automatic GitHub sync, credit top-ups or AI lead research (not live yet)
- say 'I replaced my agency' or 'you don't need a designer'
- name the AI models behind Makeborne, or say it's better than another tool
- show anyone's real client data, emails or personal details

DISCLOSURE (required by law and by each platform)
- TikTok: turn on the commercial content disclosure toggle.
- Instagram: the Paid partnership label.
- YouTube: tick 'Paid promotion' in Studio.
- Also say or show 'ad' or 'paid partnership with Makeborne' in the video itself, not only in the caption.
- Start the caption with #ad, say 'ad' in the first 3 seconds, and use #ad on any post (paid or organic) that carries your affiliate code or link. A platform label alone is not enough in the UK (ASA/CAP).

PRICE LINE (if you mention price)
"From $20 a month + tax. Full refund until you use credits."

PROCESS
Send the draft 48 h before posting. We check facts only, not your style. Payment: half now, half on delivery. Views bonus paid weekly on verified 7-day views.
```

**Follow-up:** If no draft 3 days before the agreed date: one reminder with the shot list. If a post goes live without disclosure: ask for it to be fixed within 24 h; unpaid until fixed.

**Rules:**
- Disclosure sources: FTC Disclosures 101 (Nov 2019): disclose in the video itself, avoid vague tags such as 'collab' or 'sp' [https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers, read 26 Oct 2026]; TikTok Branded Content Policy (published 4 Aug 2026, in force 31 Aug 2026) requires the disclosure toggle [https://www.tiktok.com/legal/page/global/bc-policy/en, read 26 Oct 2026]; YouTube paid promotion checkbox [https://support.google.com/youtube/answer/154235, read 26 Oct 2026].
- Review drafts for facts and disclosure only. Never ask for a positive opinion; the FTC fake-review rule (14 Aug 2024) bans incentives tied to sentiment.
- Update the price line everywhere if the owner changes the refund rule (D1).

### t04-affiliate-invite

- **Purpose:** Invite people who already teach AI tools, web design or freelancing to a commission-only affiliate deal (no fee).
- **Channel:** DM or email, one to one
- **Audience:** Educators, tutorial makers, agency coaches, existing customers
- **Plan refs:** channels ch-creators, ch-loops; ICP icp1; decision D3
- **When:** live now
- **Subject:** Affiliate invite: 30% recurring for 12 months on Makeborne

```text
Hi {firstName},

You teach {topic}, and a lot of your audience builds things for clients. I make Makeborne, an AI studio for client work: one brief becomes a website (published on a Makeborne address), a deck or a book, and the client approves it through a review link with no account.

I'm opening 20 founding partner spots:
- 30% of every payment for the customer's first 12 months (on Studio, $14.70 a month per customer)
- yearly plans: 30% of the first payment
- a Studio month on us so you can build real examples
- your own link and a use-my-brief link that opens Makeborne with your example brief already filled in

No fee, no posting quota. Commissions are paid through our checkout provider after a 30-day hold, and refunded sales don't earn commission.

Interested? I can set your link up this week.

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** One follow-up after a week with one concrete asset: "Here's a 40-second uncut build you can use in a video." Then stop.

**Rules:**
- Terms are owner decision D3 and are not final until the owner confirms them.
- Do not promise payouts until the Whop custom-affiliate test passes (growth ask ga9: one live purchase and refund proves payout and clawback).
- The use-my-brief link depends on growth ask ga8; drop that line until it ships.
- Affiliates must disclose the relationship (FTC Endorsement Guides; EU UCPD). A free Studio month is a material connection too.
- No brand bidding, no self-referral, no coupon-site listings, no spam. Breaking these voids commission.
- Plus the shared copy rules at the top of this file.

### t05-youtube-tutorial-creator

- **Purpose:** Get a search-friendly long-form tutorial ('AI website builder for client work', 'Lovable alternative for client sites'), affiliate first, no upfront fee.
- **Channel:** Creator's published business email
- **Audience:** AI-tool review channels, no-code and vibe-coding channels, agency and freelance educators, presentation and productivity channels
- **Plan refs:** channels ch-youtube, ch-creators; ICP icp1/icp2
- **When:** live now
- **Subject:** Tutorial idea for your channel: brief to client site to approval, in one tool

```text
Hi {firstName},

Your {specificVideo} comparison was the most honest one I've seen on {topic}, especially the part about {specificDetail}.

I build Makeborne. It's not an app builder. It's for client deliverables: one brief becomes a website, a deck or a book, and the client approves the site through a review link without an account. There's also a basic CRM with a lead finder, and a manual export to GitHub.

Three angles your viewers could get real use from:
1. "Makeborne vs Lovable for client websites": where each one fits (Lovable is great for apps with logins).
2. "Stop email feedback loops: client review links"
3. "One brief, three deliverables: site, pitch deck and client guide"

What I can offer: a Studio month for the build, a founding-partner affiliate deal (30% recurring for 12 months), and a call where I show you the rough edges as well. You'd say what you actually think.

Interested?

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** One follow-up after 7 days. If they quote a paid rate, reply that paid integrations come once a tracked affiliate video proves conversion, and log the rate (it is market data).

**Rules:**
- Affiliate first. No cash fee from the $1,000; a paid integration only from revenue under the reinvestment rule (D4).
- The free month and affiliate deal are material connections. Ask for YouTube's paid-promotion checkbox and a spoken disclosure.
- Never ask for a positive review or to compare unfavourably against a named competitor.
- Email law: see the matrix. A published business-enquiry address on the channel's About page is an invitation for business offers, but keep the opt-out footer.
- Plus the shared copy rules at the top of this file.

### t06-agency-owner-email

- **Purpose:** Start a conversation with a freelance designer or small agency owner, offering a recorded demo built from their own type of brief.
- **Channel:** Cold B2B email, one to one, only where the law allows (see matrix)
- **Audience:** icp1 owners at 1-10 person studios, found through their public portfolio or company site
- **Plan refs:** channels ch-linkedin, ch-community; ICP icp1; decision D14 (demo builds as cost of goods)
- **When:** live now
- **Subject:** A finished site for your next pitch, before the first call

```text
Hi {firstName},

I saw {studioName}'s work for {publicClientExample}. {specificCompliment}.

I'm the founder of Makeborne. We help small studios send a prospect a real website before the first call. You write one brief, Makeborne builds the site, and your client comments on it through a review link and taps Approve. No accounts and no screenshot threads.

Would a 2-minute recording be useful? Send me a typical brief, or I'll use a made-up one in your niche. I'll record the build, the review link and an approval from start to finish, and send you the video. You don't need to sign up for anything.

Plans start at $20 a month (Studio, made for client work, is $49), with a full refund until you use credits.

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina

--
This is a commercial message from Makeborne. You're getting this one email because {whyThem}. I found your address on {sourceOfAddress}.
Not interested? Reply "no" and I won't contact you again.
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** At most one follow-up after 5-7 business days, in the same thread: "Last note from me. Here's a 40-second recording of a brief like the ones your studio gets, in case it's useful: {link}." Then stop, and add the address to the suppression list.

**Rules:**
- Jurisdiction gate (check before every send): US OK under CAN-SPAM with the footer; UK OK to corporate bodies only (not sole traders or some partnerships), identity plus opt-out, legitimate-interest note kept; France OK when the message concerns the recipient's job, with information about the source and a simple free objection; Germany NO (UWG s.7(2) no.2 needs prior express consent for email advertising, for businesses too); Austria NO [U, treat as consent-required]; Canada only with implied consent for a conspicuously published address relevant to the role [U]; other EU states: do not send until the national rule is checked.
- One to one only, written by hand. No sequences, no mail-merge, no bought lists, no scraped addresses. At most 10 a day in launch week so every reply gets an answer.
- Use only addresses the business publishes for business contact. Say where you found it (GDPR Art. 14). Keep a suppression list and honour opt-outs at once (CAN-SPAM's limit is 10 business days).
- Subject line must match the content (CAN-SPAM). No 'Re:' or 'Fwd:' tricks.
- Each demo recording costs about $1 of AI cost [E]; it is in D14's demo-build line, not the $1,000.
- Don't use Makeborne's lead finder to bulk-email: our own outreach must model the 'one-to-one, not a blast' answer we give customers (plan risk 21).
- Plus the shared copy rules at the top of this file.

### t07-agency-owner-linkedin

- **Purpose:** Reach agency owners on the channel they already use, without breaking LinkedIn's spam rules.
- **Channel:** LinkedIn: comments first, then a connection request with no pitch, then a message only after they engage
- **Audience:** icp1 agency owners and freelancers active on LinkedIn
- **Plan refs:** channels ch-linkedin; ICP icp1
- **When:** live now
- **Subject:** (no subject: connection note, then message)

```text
STEP 1 (days 1-7): leave 2-3 useful comments on their posts. No links, no product.

STEP 2, connection note (under 200 characters, no pitch):
"Hi {firstName}, I've enjoyed your posts on {topic}, especially {specificPost}. I'm building tools for client work in Sarajevo and would like to follow along."

STEP 3, only if they reply, comment on your posts, or ask what you build:
"Thanks for connecting, {firstName}. Since you asked: Makeborne turns one brief into a client website, and your client approves it through a review link with no account. If it's useful, I can send you a 2-minute recording of a brief like yours being built and approved. No pressure at all."
```

**Follow-up:** No follow-up to a message that got no reply. Keep engaging with their posts as normal.

**Rules:**
- LinkedIn Professional Community Policies: 'Do not use our invitation feature to send promotional messages to people you don't know', and no unwanted, repetitive or inappropriate commercial messages [https://www.linkedin.com/legal/professional-community-policies, read 26 Oct 2026].
- LinkedIn User Agreement s.8.2 (effective 3 Nov 2025): no bots or automated methods to add contacts or send messages, and no scraping [https://www.linkedin.com/legal/user-agreement, read 26 Oct 2026]. No automation tools, no engagement pods.
- From the founder's personal profile only. 15 comments a day (plan routine), and connection requests only to people you have engaged with.
- Plus the shared copy rules at the top of this file.

### t08-founder-network-warm

- **Purpose:** Day-1 feedback and introductions to agency owners (plan: 30-50 people, no mass sends).
- **Channel:** Personal message (WhatsApp, email, LinkedIn) to people the founder knows
- **Audience:** Founder's existing network
- **Plan refs:** channels ch-linkedin; ICP icp1
- **When:** live now
- **Subject:** I launched today, and I'd value your honest take

```text
Hi {firstName},

Today I launched Makeborne, the thing I've been building in Sarajevo. It's an AI studio for client work: one brief becomes a website, a deck or a book, and the client approves it through a review link.

Two small asks, only if you have time:
1. Look at it for 2 minutes and tell me the first thing that confused you: {link}
2. Do you know one freelancer or small agency owner who'd give me 15 minutes of blunt feedback? An intro would mean a lot.

Thank you. {founderFirstName}
```

**Follow-up:** None. Thank everyone who replies, and close the loop on any intro within 24 hours.

**Rules:**
- Written one by one, with a personal first line. No copy-paste blasts, no group chats.
- Never ask for upvotes, likes or reviews.
- Intros: ask the introducer to check first that the person wants to hear from you (a double opt-in intro).

### t09-founding-agency-partner

- **Purpose:** Turn happy agency customers into referral partners (founding 20 partners) so loops reach 15%+ of new payers.
- **Channel:** Email or in-app message to existing paying agencies, or a personal message to active community members
- **Audience:** Activated Studio and Scale customers who have sent at least one review link
- **Plan refs:** channels ch-loops; ICP icp1; decision D3
- **When:** live now
- **Subject:** Founding partner spot: earn on every studio you send us

```text
Hi {firstName},

You've sent {N} review links so far, so you know the workflow better than most. Would you like one of our 20 founding partner spots?

- 30% of every payment for 12 months from each studio or freelancer you refer
- your own link and code
- your name on the review pages you send, so the clients who see your work know who made it

If that's interesting, reply "yes" and I'll set it up.

{founderFirstName}
```

**Follow-up:** None by email. Mention it once on the next customer call.

**Rules:**
- Existing customers only, so the soft opt-in for similar services can apply. Every product or partner email still needs an opt-out, and the owner signs off product-update emails before the first send.
- The 'your name on the review pages' line depends on the review-page loop (ga6). Remove it until shipped.
- Do not promise the 'Made by [Agency] with Makeborne' badge or partner directory until beat:domains; mention them only after that beat passes the gate.
- Partner terms D3 are owner-confirmed only.

### t10-community-workshop-offer

- **Purpose:** Get permission for a 20-minute, no-pitch live workshop every two weeks from week 3.
- **Channel:** Message to the admin or moderator of one agency community (Skool, Slack or Discord), after 1-2 weeks of contributing
- **Audience:** Admins of agency and freelancer communities
- **Plan refs:** channels ch-community; ICP icp1
- **When:** live now
- **Subject:** Offer: a 20-minute live workshop on client approvals (no pitch)

```text
Hi {adminFirstName},

I've been posting in {communityName} for the past couple of weeks (mostly in {channelName}). Would members find this useful?

"Build a client site and an approval loop in 20 minutes": a live screen share. I'd build a site from a member's brief, send a review link, play the client, and take questions. I'd also cover how members handle feedback rounds today.

I make Makeborne, the tool I'd use, and I'd say so at the start. No discount codes or sales talk unless you want me to share a link at the end. Happy to fit your format and rules.

{founderFirstName}
```

**Follow-up:** One follow-up after a week. If the answer is no, keep contributing and don't ask again for a month.

**Rules:**
- Contribute first for at least 1-2 weeks; post only in show-and-tell channels; never cold-DM members (plan 5.2).
- Do not promote in competitors' communities (for example, Lovable's Discord).
- Each live build costs a few credits; log them in the demo-build line (D14).

### t11-newsletter-sponsorship-ask

- **Purpose:** Collect rate cards, audience fit and performance-based options for later tests paid from revenue. No newsletter spend inside the $1,000.
- **Channel:** Email to the newsletter's advertising address (published on its sponsor page)
- **Audience:** Agency, web-design, freelance and AI-tool newsletters
- **Plan refs:** channels ch-email; ICP icp1/icp2; decision D4 reinvestment rule
- **When:** live now
- **Subject:** Sponsorship enquiry: Makeborne (AI studio for client work)

```text
Hi {name},

I run Makeborne, an AI studio for freelancers and small agencies. One brief becomes a client website, deck or book, and the client approves it through a review link. Plans are $20-$99 a month.

We're a small, bootstrapped team planning sponsorship tests for {month}. Could you share:
1. your rate card and next open dates
2. audience split by country and by role (freelancers, agency owners, in-house)
3. typical clicks for a placement like ours
4. whether you offer a bootstrapped or first-time rate, or a performance deal (per sale or affiliate)

We judge every test on paid customers through our own tracked link, and we're happy to share the results with you afterwards.

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** One follow-up after 7 days. Log every answer in the private sheet; it feeds the reinvestment decision.

**Rules:**
- An enquiry, not a commitment. Book only from revenue under D4, one test at a time, with a written stop rule (plan cut $60-75 niche tests from the $1,000).
- Reference prices: Sidebar $950 an edition to about 40,000 subscribers [V, https://sidebar.io/sponsor, read 26 Oct 2026]; Ben's Bites primary slot $3,500 [V]; Superhuman AI featured tool $3,500 [V] (research/platforms-community.md). Planning maths there puts big-newsletter cost per payer at $300-1,000 [E], so these wait.
- Writing to a published advertising address about advertising is a solicited business enquiry, but keep sender identity and opt-out.
- Plus the shared copy rules at the top of this file.

### t12-newsletter-editorial-pitch

- **Purpose:** Free editorial mentions. Send once at launch with live features, then again when beat:images passes the gate.
- **Channel:** Email or tool-submission form for a newsletter's free tools or reader-picks section
- **Audience:** AI newsletter editors (tools sections), design and freelance newsletter editors
- **Plan refs:** channels ch-press, ch-directories; ICP all
- **When:** live now
- **Subject:** Tool for your readers: one brief to a client-ready website, deck or book

```text
Hi {editorFirstName},

Short one for {newsletterName}'s {sectionName}:

Makeborne (makeborne.com/go/nl-{newsletterSlug}) is an AI studio for client work. One brief becomes a website published on a Makeborne address, a deck that opens in PowerPoint with editable charts, or a book for screen and PDF. The client comments on the site through a review link, with no account, and taps Approve.

Built by a small studio in Sarajevo. Paid plans from $20 a month + tax, with a full refund until you use credits.

Happy to send a 30-second uncut build or answer questions.

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** None. Re-pitch only with real news (beat:images, day-30 numbers).

**Rules:**
- Use the newsletter's own submission form when it has one (for example, The Rundown's tools submission).
- Never imply a paid placement or ask for 'coverage in exchange for' anything.
- Plus the shared copy rules at the top of this file.

### t13-directory-submission-email

- **Purpose:** Free and paid AI-directory listings in the plan's order: TAAFT first, then free directories once TAAFT is live, then Uneed on the images day.
- **Channel:** Directory submission form or editor email
- **Audience:** Directory editors
- **Plan refs:** budget b1, b6; channels ch-directories; ICP all
- **When:** live now
- **Subject:** Listing submission: Makeborne, an AI studio for client work

```text
Hi,

Please consider Makeborne for {directoryName}.

URL: makeborne.com/go/{directoryCode}
Tagline: The AI studio for client work.
Description: see launchCopy.directoryListing.shortDescription
Category: AI website builder / presentations / ebooks / client approval
Pricing: Paid, from $20 a month. No free plan. Full refund until credits are used.
Contact: {pressEmail}

Thank you.
{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** None for free directories. For a listing that's wrong, send one correction email.

**Rules:**
- TAAFT first, before any other listing, to keep the $300 launch-first PPC bonus: it applies only if the tool has appeared on no other platform first [V, https://theresanaiforthat.com/get-featured/, read 26 Oct 2026]. Hold AlternativeTo, SaaSHub, Microlaunch, Future Tools and the Product Hunt coming-soon page until the TAAFT listing is live.
- Paid listings are limited to TAAFT ($49, b1) and Uneed ($30, b6). Toolify, TopAI and Fazier were cut from the budget.
- Pricing is 'Paid', never 'Freemium' or 'Free trial'.
- Plus the shared copy rules at the top of this file.

### t14-product-hunt-hunter-ask

- **Purpose:** Optional. Ask for pre-launch feedback and, only if they want to, to hunt the images launch. The plan's default is a self-hunt.
- **Channel:** Personal message to one experienced Product Hunt maker or hunter who has actually used Makeborne
- **Audience:** One respected PH community member with a real interest in builders or agency tools
- **Plan refs:** channels ch-producthunt; ICP all; decision [O] self-hunt (default) or invited hunter
- **When:** beat:images only, after the gate
- **Subject:** Would you look at our Product Hunt page before it goes live?

```text
Hi {firstName},

I've followed your launches and comments on Product Hunt for a while. Your note on {specificLaunch} changed how I think about first comments.

We're preparing Makeborne's Product Hunt launch: one brief becomes a client-ready website, deck and book, with a review link where the client approves. I'd value 10 minutes of your honest feedback on the draft page, gallery and maker comment. I'll set you up with a Studio month so you can try it properly first.

If, after trying it, you'd want to hunt it, I'd be honoured. If not, the feedback alone is more than enough. No payment either way; Product Hunt doesn't allow paid hunters, and I wouldn't ask.

{founderFirstName}
```

**Follow-up:** None. If they don't reply in a week, self-hunt as planned.

**Rules:**
- Product Hunt: 79% of featured posts and 60% of #1 Product of the Day winners were self-hunted; paying hunters or promoters can get products removed and makers banned; the poster's account must be at least a week old [V, https://www.producthunt.com/launch/before-launch, read 26 Oct 2026 in research/platforms-community.md].
- Never ask a hunter, or anyone, for upvotes. Ask for feedback and comments only.
- The plan's default (strategy risk 23) is a self-hunt from the founder's personal account. An invited hunter is an owner decision.

### t15-product-hunt-launch-notice

- **Purpose:** Tell supporters the launch is live and ask for feedback, never upvotes.
- **Channel:** Personal messages and one email to people who opted in (PH coming-soon followers, customers who agreed to updates)
- **Audience:** Opted-in followers and customers
- **Plan refs:** channels ch-producthunt, ch-email; ICP all; decision D12 (PH100 code)
- **When:** beat:images only, after the gate
- **Subject:** We're live on Product Hunt today, and I'd love your feedback

```text
Hi {firstName},

Makeborne is on Product Hunt today: {phLink}

Sites, decks and books now come with their own images. One question I'd love your answer to, in the comments there or by reply: what would you make first?

If you subscribe this week, code PH100 adds 100 credits to your first paid month.

Thank you for being early. {founderFirstName}
```

**Follow-up:** None. Reply to every PH comment within 10 minutes during the run sheet hours.

**Rules:**
- Feedback asks only. Asking for upvotes breaks Product Hunt rules; mass identical messages count as spam [V].
- Send to people who opted in. Personal messages are written one by one, not pasted.
- PH100 works only once growth ask ga10 (per-wave bonus codes at Makeborne's checkout) ships; otherwise drop that line.
- The images line is true only after beat:images passes all six gate boxes.

### t16-press-regional

- **Purpose:** Free regional press in launch week (day 5): 'a Sarajevo studio launches an AI studio for client work and sells worldwide'.
- **Channel:** Email from the owner to regional tech and business editors (Netokracija, Bloomberg Adria, Startit, BiH portals)
- **Audience:** Regional editors and reporters
- **Plan refs:** channels ch-press; ICP all; decision D11, D19
- **When:** live now
- **Subject:** Sarajevski studio lansirao AI alat za klijentske web stranice, prezentacije i knjige, i prodaje ga cijelom svijetu

```text
Poštovani/a {editorName},

ZORBY&CO iz Sarajeva danas je pokrenuo plaćenu beta verziju Makeborne-a (makeborne.com), AI studija za klijentske poslove. Od jednog opisa Makeborne pravi web stranicu, prezentaciju ili knjigu. Klijent stranicu komentariše preko linka za pregled, bez otvaranja računa, i odobrava je jednim klikom.

Zašto je ovo priča:
- Alat je napravljen u Sarajevu, a prodaje se kupcima širom svijeta, uglavnom freelancerima i malim agencijama.
- Nema besplatnog paketa, namjerno. Cijene počinju od 20 USD mjesečno, uz povrat cijelog iznosa dok se krediti ne iskoriste.
- Osnivač javno objavljuje brojke: koliko je ljudi platilo, povrate novca i troškove, nakon 30 i nakon 90 dana.

U prilogu su tri stvarna rezultata (stranica, prezentacija i knjiga, svaka s izvornim opisom) i fotografija osnivača. Rado ću organizovati kratku demonstraciju uživo ili razgovor.

S poštovanjem,
{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

English version:

```text
Dear {editorName},

Sarajevo-based ZORBY&CO today opened the paid beta of Makeborne (makeborne.com), an AI studio for client work. From one brief, Makeborne makes a website, a deck or a book. The client comments on the site through a review link, with no account, and approves it in one click.

Why it's a story:
- Built in Sarajevo, sold worldwide, mainly to freelancers and small agencies.
- No free tier, on purpose. Plans start at $20 a month + tax, with a full refund until credits are used.
- The founder publishes the numbers (payers, refunds, costs) at day 30 and day 90.

Attached: three real outputs (site, deck, book, each with its original brief) and a founder photo. Happy to arrange a short live demo or a call.

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** One follow-up after 3 business days with one new fact (for example, the first countries where customers paid). Then pitch again only at day 30 (beat:day30).

**Rules:**
- The owner sends. A native speaker checks the local-language text before sending (Bosnian shown; adapt for Croatian or Serbian outlets).
- Press emails to an editor's published work address about news are journalism contact, not marketing, but keep identity and stop on request.
- Lovable only as contrast ('Lovable builds apps; Makeborne covers the client deliverable'), never 'better than'.
- No revenue or user numbers until they are real and the owner approves them (D11).
- Plus the shared copy rules at the top of this file.

### t17-press-europe

- **Purpose:** Pitch the public-numbers angle at day 30 (25 Nov) and the images beat. Not for launch week.
- **Channel:** Email from the owner to European tech reporters who cover AI tools or Balkan and CEE startups
- **Audience:** European tech press
- **Plan refs:** channels ch-press; ICP all
- **When:** beat:day30 only, after the gate
- **Subject:** [N] days, every number: a bootstrapped AI studio from Sarajevo, no free tier

```text
Hi {reporterFirstName},

You wrote about {relevantArticle}, so this may be useful.

Makeborne, from Sarajevo, sells an AI studio for client work: one brief becomes a client website, deck or book, which the client approves through a review link. We launched paid-only on 26 October with $1,000 of marketing money and no free tier, and we publish every number.

After [N] days: [paying customers], [refund rate], [MRR], [top country], [what failed]. Screenshots are on makeborne.com/press with buyer details removed.

The bigger question we can speak to: can a small team outside the usual hubs sell an AI product worldwide without a free tier, when the category leaders grew on free plans?

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** One follow-up after 4 business days. Never chase twice.

**Rules:**
- Fill the brackets with verified Whop numbers only; crop buyer data from every screenshot.
- The /press page is growth ask ga11; link the Indie Hackers post instead until it exists.
- Never repeat Base44's '$1M in 3 weeks' as fact (podcast claim only), and never claim Makeborne is on a $1M path.
- Plus the shared copy rules at the top of this file.

### t18-customer-story-request

- **Purpose:** Book 20-minute customer calls and, with written consent, turn them into stories for LinkedIn, the site and press.
- **Channel:** Email or in-app message to activated payers (sent a review link, or published or exported a deck or book)
- **Audience:** Activated payers, especially Studio agencies
- **Plan refs:** channels ch-loops, ch-linkedin; ICP icp1
- **When:** live now
- **Subject:** Could I ask you 3 questions about your first client review?

```text
Hi {firstName},

You sent your first review link on {date}. I'm the founder and I'd love to learn from it.

Would you have 20 minutes this week? Three questions:
1. What were you using before for client feedback?
2. What happened when your client opened the link?
3. What nearly stopped you from paying, and what should we fix first?

That's all. If something you say would make a good example for others, I'll ask separately and in writing before using anything. Nothing goes public without your OK, and your client's OK if their work is shown.

Pick any time here: {calendarLink}
{founderFirstName}
```

**Follow-up:** One reminder after 3 days. If they decline, thank them and never ask again for a story.

**Rules:**
- No incentive tied to a positive story. If you thank people with credits, give them to everyone who takes the call, whatever they say (FTC rule of 14 Aug 2024 bans sentiment-linked incentives and fake or AI-made testimonials).
- Customer service email to an existing customer is fine; the story itself needs separate written consent (t19).
- Write call notes in the private sheet, never in this repo.

### t19-customer-story-consent

- **Purpose:** Written consent before any quote, logo, screenshot or client site is used publicly.
- **Channel:** Email reply, kept as the written record
- **Audience:** Customers who agreed on a call
- **Plan refs:** channels ch-loops; ICP icp1
- **When:** live now
- **Subject:** Your OK before we share your story

```text
Hi {firstName},

Thanks again for the call. Here's exactly what we'd like to use. Please reply "I agree" if it's all fine, or tell me what to change.

- Quote: "{exactQuote}"
- Name and title shown as: {displayName}
- Company and logo: {yes/no}
- Screenshots: {list}. Client names, emails and comments will be blurred.
- Your client's work shown: {yes/no}. If yes, please confirm your client has agreed.
- Where: Makeborne website, LinkedIn, X, press kit
- You can ask us to remove it at any time by replying to this email.

We'll also state any thank-you you received (for example, bonus credits) next to the story.

{founderFirstName}
```

**Follow-up:** None. No reply means no consent.

**Rules:**
- Keep the reply as the consent record outside this repo.
- Quote exactly what they said; never edit it into a stronger claim.
- If any material connection exists (credits, discount, partner commission), disclose it next to the story.

### t20-speedrun-consent

- **Purpose:** Written OK before a real business appears in a comment-reply speedrun (D15).
- **Channel:** Reply to a comment or DM from a business owner who asked for a 'build mine' video
- **Audience:** Small business owners who asked in the comments
- **Plan refs:** channels ch-tiktok, ch-instagram; ICP icp4; decision D15
- **When:** live now
- **Subject:** (DM)

```text
Thanks for asking! Before I post anything, can you confirm 3 things by replying "yes"?
1. You own or run {businessName} and you're OK with me building a demo site from your public info (name, what you sell, area).
2. The video will show that demo site. It stays unpublished unless you ask me to publish it.
3. You can ask me to delete the video and the site at any time.
No personal details, photos of people or customer info will be used.
```

**Follow-up:** None. No 'yes', no video.

**Rules:**
- Requests only, public business information only, unpublished by default (plan 5.5).
- Frame the video for both lanes: 'here's what you could send this bakery today'. Sites publish on a Makeborne address; never imply their own domain.

### t21-instagram-keyword-dm

- **Purpose:** The DM conversion engine: send the format link, three copyable briefs, an uncut build and the refund line.
- **Channel:** Instagram DM auto-reply to a comment keyword (SITE, DECK, BOOK, CLIENT)
- **Audience:** People who commented a keyword
- **Plan refs:** budget b7; channels ch-instagram; ICP icp1-icp4
- **When:** live now
- **Subject:** (DM)

```text
[CLIENT] Hi! This is Makeborne's automatic reply. Here's the client-work flow: {link_client}
3 briefs to copy:
1. "A one-page site for a family bakery in {city}: hours, menu, map, warm and simple."
2. "A 3-page site for a physio clinic: services, team, booking contact."
3. "A portfolio site for a wedding photographer, minimal, big type."
Watch an uncut 30-second build: {link_uncut}
From $20/month + tax. Full refund until you use credits.
A real person reads replies here. Reply STOP to stop these messages.

[SITE] / [DECK] / [BOOK]: same shape, with the format link and 3 format briefs. DECK: notes to an editable deck that opens in PowerPoint. BOOK: a guide or lead magnet for screen and PDF.
```

**Follow-up:** If they reply with a question, a human answers within the 24-hour window. No automated follow-up outside that window.

**Rules:**
- Meta messaging policy: replies inside the standard 24-hour window may include promotion; message tags are not a route for promotional content; automated chats should disclose they are automated where the law requires (and as best practice) [https://developers.facebook.com/docs/messenger-platform/policy/policy-overview/, read 26 Oct 2026].
- Start on the DM tool's free tier; upgrade only from b7 ($30) when outgrown. ManyChat eligibility for a BiH business is unverified [U].
- TikTok has no equivalent automation for us: say 'DM me SITE' and reply by hand.
- Format landing pages (/sites, /decks, /books, /client-work) and the uncut-build page depend on ga7. Until then, link the home page through /go/ with the matching utm_content.
- Plus the shared copy rules at the top of this file.

### t22-wave2-visual-creator

- **Purpose:** Recruit wave-2 visual creators for image-led sites, decks and books.
- **Channel:** DM or published business email
- **Audience:** Design-led creators, 2k-50k followers
- **Plan refs:** budget b4, b8; channels ch-creators; ICP icp1/icp3
- **When:** beat:images only, after the gate
- **Subject:** Paid test: one brief, a site, deck and book with their own images

```text
Hi {firstName},

Your {specificVideo} has the eye for layout that I've been looking for.

Makeborne now generates the images inside your website, deck and book from the same brief, with full-image slides and controls for quality and aspect ratio. The client still approves it all through a review link.

Paid test: $60 for 2 videos, a share of a $20 views bonus, a Studio month and your own affiliate code. Show the real build, label sped-up footage, use the paid-partnership label.

Want the brief?

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Follow-up:** One follow-up after 4-5 days, then stop.

**Rules:**
- Send only after beat:images passes all six gate boxes. If images are not live by 30 Nov, b4 goes to rehiring the best wave-1 creator instead.
- Generated images carry machine-readable AI marking from day 1 (EU AI Act Art. 50(2); marking applies at launch for a new image feature: the 2 Dec 2026 date is only the transition for systems on the market before 2 Aug 2026 [U, confirm on EUR-Lex]).
- Photoreal people or places in ads need the platform AI labels.
- Plus the shared copy rules at the top of this file.

### t23-customer-share-ask

- **Purpose:** Turn the happiest moment into distribution (ga18) and, later, share-for-credits (ga20).
- **Channel:** In-app prompt after a client approves ('Client approved. Share the win?')
- **Audience:** Customers whose client just tapped Approve
- **Plan refs:** channels ch-loops; ICP icp1; decision D13
- **When:** live now
- **Subject:** (in-app)

```text
Client approved. Nice work.
Want to share it? We'll make a clean image of the approved site (client details hidden).
Post it anywhere and tag Makeborne, and we'll add 100 credits to your account. You get the credits for sharing, whatever you write.
```

**Follow-up:** None.

**Rules:**
- Reward sharing, never praise (FTC rule of 14 Aug 2024). The post must disclose the credits, for example '#ad' or 'got credits for sharing'.
- Ships only with ga18/ga20 in phase 2-3; the 100-credit amount is D13 (owner decision).

---

## 4. Launch copy

### 4.1 Product Hunt

- **Status:** Coming-soon page: after the TAAFT listing is live (day 2+), live features only. Main launch: at beat:images, self-hunted from the founder's personal account at 09:01 Sarajevo (12:01 am Pacific, after 1 Nov). Tue-Thu with 400+ committed supporters, otherwise Sat-Sun.
- **Beat:** beat:images
- **Tagline (45/60):** One brief: a client-ready site, deck and book
- **Alternatives:**
  - The AI studio for client work: build, send, get the yes (55)
  - Turn one brief into a website, a book and a deck (48)
  - AI websites, books and decks your client can approve (52)

**Description, launch day (385/500):**

```text
Makeborne turns one brief into a website, a deck and a book, now with their own images. Publish the site on a Makeborne address and send your client a review link: they comment without an account and tap Approve. Decks open in PowerPoint with editable charts. Plus a basic CRM with a lead finder, GitHub export and a projects library. From $20/month + tax, full refund until you use credits.
```

**Live-only description, for the coming-soon page or if images slip (392/500):**

```text
Makeborne turns one brief into a website, a deck or a book. Publish the site on a Makeborne address and send your client a review link: they comment without an account and tap Approve. Decks open in PowerPoint with editable charts; books are made for screen and PDF. Plus a basic CRM with a lead finder, GitHub export and a projects library. From $20/month + tax, full refund until you use credits.
```

**Coming-soon page:** "The AI studio for client work". One brief becomes a client website, deck or book, and your client approves it through a review link. Paid plans are live at makeborne.com today; follow for our full launch.

**Maker first comment:**

```text
Hi Product Hunt, I'm {founderFirstName}, and I build Makeborne from Sarajevo.

Who it's for: freelancers and small studios who make things for clients, and anyone who needs a deck or a guide without starting from a blank page.

What it does: one brief becomes a website, a deck and a book in the same brand. As of today, all three come with their own generated images, with full-image slides and quality and aspect controls.

What your client sees: a review link. They comment on the live site without an account and tap Approve. No 40-email threads.

What you own: download the source at any time, or export it to GitHub.

Honest pricing: no free plan, on purpose. Plans are $20, $49 and $99 a month. The most a request can cost is shown before it starts, and you get a full refund until you use credits. Code PH100 adds 100 credits to your first paid month this week.

Not there yet: {notYetLiveList, e.g. 'your own domain (coming soon)'}.

One question for you: what would you send a client first, the site, the deck or the guide?
```

**Gallery:**

| # | Type | Spec | Content | Source |
|---|---|---|---|---|
| 0 | thumbnail | 240x240, static (no strobing) | Makeborne mark on the cream canvas #F8F7F4 | brand file |
| 1 | video | YouTube, public or unlisted, 45-75 s | Real capture: brief, timer, site, deck and book with their own images, review link, Approve on a phone. Uncut or labelled 'sped up'. | fresh real-speed captures; the fixed v14 re-cut only if 'Start free' is replaced, the AI-concept line restored and real outputs swapped in |
| 2 | image | 1270x760 | Hero: one brief on the left, the site, deck and book it produced on the right. Headline: 'One brief. Three deliverables.' | real product outputs from the same brief |
| 3 | image | 1270x760 | Same brief before and after images: typography-led site vs image-led site. | real runs (beat:images) |
| 4 | image | 1270x760 | The client review link: anonymous comments pinned on the live site, Approve button on a phone. | real UI capture with fixture client data |
| 5 | image | 1270x760 | Deck: a full-image slide, and the PPTX open in PowerPoint with the chart being edited. | real output |
| 6 | image | 1270x760 | Book: cover and spread for a client welcome guide, shown as a PDF. | real output |
| 7 | image | 1270x760 | Win before the call: lead finder list, then demo site, then review link sent, in the CRM. | real UI capture with fixture businesses |

- Real product output and real UI only. The v14 reference stills (sheet_v14.jpg) are brand art and a quality target, not product proof: don't put them in the gallery as outputs.
- No legible 'Tern' brand name, no real client data, no vendor names.
- Headlines in Inter display with one Newsreader Italic accent word; no purple-blue AI gradients.

**Maker story** (for the PH 'about' section, the blog and the press kit):

```text
I'm {founderFirstName}, and I run a small studio, ZORBY&CO, in Sarajevo.

Every client project I saw went the same way: the work took days, and the approval took weeks. Screenshots in email, 'make it pop', version 9 of a PDF. The tools were getting faster at building, but nobody was fixing the part where a real client says yes.

So Makeborne does both. One brief becomes the site, the pitch deck and the client guide, in one brand. Then the client gets a link where they comment and approve, without making an account.

We launched paid-only on 26 October, with $1,000 of marketing money and no free plan. That was deliberate: every build costs real money to run, and I'd rather show you the uncut build and refund you in full until you use a credit than pretend it's free. Since then: [N] paying customers in [N] countries, [N]% refunds, and [the most surprising thing a customer made].

We publish every number. Today's launch is the first big feature since then: images, generated for your site, deck and book from the same brief.
```

**Rules:**
- Tagline at most 60 characters, description at most 500, no emoji in the name, up to 3 tags (suggested: Website Builder, Presentations, Artificial Intelligence) [V].
- Never ask anyone for upvotes; ask for feedback. No vote swaps, launch services, paid hunters or new accounts.
- If beat:images has not passed the gate, do not launch on PH; keep the coming-soon page and use liveOnlyDescription only for the page.
- Brackets [N] are filled with verified numbers on the day, or the sentence is cut.

### 4.2 Show HN

- **Status:** HOLD. Post only when people can try something without paying: the D2 capped preview, or a no-login demo. HN asks for things people can try, 'ideally without barriers such as signups', and treats landing and sign-up pages as off-topic [V, https://news.ycombinator.com/showhn.html, read 26 Oct 2026]. Most AI-builder Show HNs since 2025 scored 1-12 points [F].
- **Earliest:** Phase 3 (from 25 Dec), and only if D2 says yes
- **Title:** Show HN: Makeborne – one brief to a website, a deck and a book, checked against golden briefs

```text
Hi HN, I'm {founderFirstName}. I built Makeborne with a small team in Sarajevo. You can try a capped first build here without paying: {previewLink}

It takes one brief and produces a website (published on a Makeborne address), a deck that exports to PPTX with native, editable charts rather than pictures, and a book as a PDF. Clients approve the site through a review link that needs no account.

A few things that were harder than expected, and that you might find interesting:

1. Keeping quality from drifting. Every release is checked against a fixed set of golden briefs before it ships. [one concrete example of a regression this caught, or cut this line]

2. Showing the worst case before you spend. Each request shows the most it can cost in credits before it starts. Getting that bound tight without refusing reasonable requests took [N] iterations.

3. Native PPTX charts. We emit real chart objects, so the numbers can be edited in PowerPoint.

4. Long documents. Keeping a [N]-page book consistent in voice and structure meant [approach].

Pricing is $20-99 a month. The paid plans have no free tier, which is why the capped preview exists. You can download the source of any site, or export it to GitHub.

I'm here all day for questions, especially the critical ones.
```

- First person, technical, no marketing adjectives. Never ask friends to upvote or comment (HN treats it as a voting ring).
- Decide before posting how to answer 'which models do you use?' [O]; customer copy never names vendors.
- Fill every bracket with verified detail or cut the line.

### 4.3 Reddit

Before every post, read the subreddit's sidebar, rules and pinned posts by hand. Reddit pages could not be fetched for this plan, so every rule below is from dated third-party audits [S/U]. Post from the founder's personal account and disclose that you are the maker. Never use the same text twice.

#### r/SideProject

- **When:** Day 3 (Wed 28 Oct), after reading the sidebar, rules and pinned posts by hand; one follow-up at beat:images
- **Rules note:** Third-party audits found no posted promotion rule; another guide suggests one launch post plus one per major milestone, with maker status disclosed [S]. Rules were not read at the source (Reddit blocks automated fetches) [U]. Link in a comment unless the sidebar allows it in the post.
- **Title:** I built an AI studio that turns one brief into a client website, a deck and a book. Launched paid-only this week

```text
I'm the maker (founder, small studio in Sarajevo). Disclosing up front.

What it does: you write one brief, and it builds a website (published on a Makeborne address), a deck you can open and edit in PowerPoint, or a short book as a PDF. The part I care about most is the client side: your client opens a review link, comments on the live site without an account, and taps Approve.

[GIF: brief, real-speed build, review link, Approve on a phone]

Things I learned building it:
- The build was never the slow part of client work; the approval was.
- Showing the maximum cost of a request before it runs changed how people use it.
- No free tier was the hardest call. Every build costs real money to run, so we refund in full until you use a credit instead.

Numbers so far: [N] paid, [N] refunds. I'll post an update at day 30.

Question for you: would you rather have a capped free preview, or a full refund promise? Honest answers welcome.

(Link in the comments if anyone wants it.)
```

#### r/indiehackers

- **When:** Day 7 (Sun 1 Nov) or the following week
- **Rules note:** Reportedly one self-promotion post per product, with the Self Promotion flair [S]. Confirm by hand [U]. Numbers must match Whop, with buyer data cropped.
- **Title:** Launched with no free tier, on purpose. Day-7 numbers, refunds included

```text
Maker here. Makeborne turns one brief into a client site, deck or book, with a review link where the client approves.

Why paid-only: every build costs us real AI money, so a free tier would be paid for by marketing money we don't have ($1,000 total). Instead: from $20 a month + tax, a full refund until you use credits, and uncut build videos so you can see the product before paying.

Day 7, unedited:
- visits: [N]
- paid: [N] (Create/Studio/Scale: [N]/[N]/[N])
- refunds: [N]
- first build within 10 minutes of paying: [N]%
- what broke: [one honest thing]

What I'm testing next: [next test]. Would you have done the free tier?
```

#### r/SaaS

- **When:** Week 2, once only (reported limit: one mention or three links per 60 days, affiliation disclosed; alt accounts count as the same person [S, read 10 Sep 2026])
- **Rules note:** Disclose affiliation; no link in the post; personal account only; never repost.
- **Title:** Roast my pricing: $20 / $49 / $99 a month in credits, no free tier, refund until you use credits

```text
I'm the founder of the product, so I'm biased; that's why I'm asking.

Plans: 300, 750 and 1,550 credits a month for $20, $49 and $99. Yearly is 20% off. Unused credits carry over for two months. No free tier and no trial: you get a full refund until you use a credit. Each request shows its maximum cost before it runs.

The product makes client websites, decks and books from a brief. The middle plan is aimed at freelancers and small agencies.

What I'm unsure about:
1. Does 'credits' put you off compared with 'X sites a month'?
2. Is a refund promise a real substitute for a free preview?
3. Would you pay $49 for the client-review workflow alone?

No link in the post. I'll answer everything in the comments.
```

#### r/EntrepreneurRideAlong

- **When:** Weekly from week 2, only if the first post is welcomed
- **Rules note:** Its three rules reportedly don't mention promotion [S]; check by hand [U]. Story and numbers first, no link unless asked.
- **Title:** Ride-along week [N]: selling an AI studio from Sarajevo with $1,000 of marketing money

```text
Week [N] update. I'm the founder.

Spent: $[N] of $1,000 (on [what]). Paid customers: [N]. Refunds: [N]. Best source: [source], [N] payers. Worst: [source], $[N] spent for [N].

What worked: [one thing]. What I killed: [one thing] and why.

Next week: [one test].
```

#### r/startups

- **When:** Monthly 'Share Your Startup' thread only
- **Rules note:** Promotion only in the monthly thread [S]; elsewhere, lessons only and no links.
- **Title:** (comment in the monthly thread)

```text
Makeborne (makeborne.com): an AI studio for client work. One brief becomes a client website, deck or book, and the client approves it through a review link without an account.
Stage: paid beta, launched 26 Oct. Bootstrapped, Sarajevo.
Looking for: feedback from freelancers and agency owners on the review-link workflow.
I'm the founder.
```

#### r/nocode

- **When:** Week 3
- **Rules note:** Not verified; read the sidebar first [U]. No link in the post; generous to competitors.
- **Title:** When should you use a site builder, and when an app builder? An honest breakdown from someone who makes one

```text
Disclosure: I make Makeborne, which sits on the site-builder side.

If you need logins, a database or user accounts, use an app builder: Lovable, Base44 and Bolt are built for that.
If you need something a client will look at and approve, like a marketing site, a pitch deck or a guide, a site builder gets you there faster, and you don't maintain an app afterwards.

Questions I'd ask before picking: who edits it after launch? Does the client need to sign off? Do you need to export the code?

What did I miss?
```

#### r/webdev

- **When:** Saturday only, if the weekly 'Showoff Saturday' rule is confirmed for r/webdev (seen in r/javascript's wiki, not confirmed here) [U]
- **Rules note:** Reportedly a 9:1 self-promotion ratio [S]. Developers dislike 'AI replaces developers' framing: never use it. Skip entirely if the rule can't be confirmed.
- **Title:** Showoff Saturday: generating native, editable PPTX charts (not pictures) from a text brief

```text
I'm the maker. Technical part first:
[how chart objects are emitted, one code-free diagram, what broke]

The same brief also produces a site you can download as source or export to a GitHub repo (a manual, one-way export for now).

Happy to go deep on the PPTX side.
```

#### r/freelance, r/smallbusiness, r/Entrepreneur

- **When:** Comments only, whenever someone asks a relevant question
- **Rules note:** r/Entrepreneur reportedly bans selling, URLs and 'DM me'; r/smallbusiness reportedly bans links and product recommendations (tightened June 2026); r/freelance breaches can bring a permanent ban [S]. Treat all three as no-promotion.
- **Title:** (no posts; helpful comments only)

```text
Example comment for 'how do you get client sign-off without endless email?':
"What worked for me: send one link to the live draft, ask for comments in place (not screenshots), set one deadline, and agree up front that 'approve' means approve. Two rounds maximum, then changes are billable. Put that in the proposal."

Mention Makeborne only if someone asks what tool you use, and then say you're the maker.
```

#### r/SideProject (follow-up) (beat:images)

- **When:** beat:images, after the gate
- **Rules note:** Only one milestone post per major update; never the same text twice.
- **Title:** Update: the site, deck and book now come with their own images (same brief, before and after)

```text
Maker again. When I posted on [date], several of you asked about images. They're live now.

[before/after GIF from the same brief]

What changed: [N] days of quality runs against [N] golden briefs before we shipped it. Numbers since launch: [N] paid, [N]% refunds.

Same question as last time, with new data: free preview or refund promise?
```

**Do not post in:**
- r/marketing (zero tolerance; advertisers go to Reddit Ads) [S]
- r/selfpublish, r/KDP (author communities hostile to AI books)
- r/lovable, r/vibecoding, r/Bolt and other competitor communities: answer only when someone asks for an alternative for websites or client work, and disclose
- r/GrowthHacking before 100+ community karma [S]

### 4.4 LinkedIn (founder profile)

Put the link in the first comment. Post every weekday, then leave 15 comments on agency-owner posts.

#### li-day1

- **When:** Day 1, Mon 26 Oct, 09:30 Sarajevo
- **Format:** Text post plus a 30-45 s real build clip; link in the first comment

```text
Today I launched Makeborne.

It's an AI studio for client work. You write one brief. It builds the website, and your client gets a link where they comment on the live site and tap Approve. No account for them, and no screenshot threads for you.

The same brief can also become the pitch deck (it opens in PowerPoint, and the charts are real) or a client guide as a PDF.

Who it's for: freelancers and small studios who make things for clients.

Price: from $20 a month. Studio, for client work, is $49. There's no free plan, on purpose. If you don't use a credit, you get every cent back.

It's built by a small team in Sarajevo, sold worldwide, and I'll post every number here, good or bad.

What should I build first in public? Comment a client brief and I'll pick three.
```

First comment: Here it is: makeborne.com/go/li-0101

#### li-f2-review-link

- **When:** Day 3
- **Format:** Phone clip of a client commenting and tapping Approve

```text
POV: the client says "make it pop" for the 9th time.

Here's what I'd do instead of another email thread:
1. Send one link to the live site.
2. The client comments right on the page. No account, no screenshots.
3. You fix it, and they tap Approve on their phone.

That's the whole workflow in the clip. The approval is timestamped, so "we never agreed to that" goes away.

How many feedback rounds does your average project take?
```

First comment: The tool in the clip is Makeborne, which I make: makeborne.com/go/li-0103

#### li-carousel-win-before-call

- **When:** Week 1-2
- **Format:** Document carousel built in Makeborne, ending on a 'Made with Makeborne' slide
- **Notes:** The lead finder shown must be the live basic one. Don't show or imply AI lead research (beat:leads). The note in step 4 must follow the email law matrix.

```text
How I'd pitch a local business before the first call (carousel built in Makeborne itself):

1. Find 20 businesses in one niche with weak or missing websites.
2. Pick the 3 where a better site would obviously help.
3. Build each a first version from public info.
4. Send a short, personal note with the review link. One to one, never a blast.
5. Log the follow-up in the CRM.

The aim isn't to sell the demo. It's to start the conversation with something real.
```

First comment: Lead finder, demo site and review link are all in Makeborne: makeborne.com/go/li-0108

#### li-no-free-tier

- **When:** Week 1
- **Format:** Text post

```text
Everyone told me to add a free plan. I didn't. Here's why.

Every build costs real money to run. A free tier would be paid for with marketing money, and I have $1,000 of it.

So instead:
- you can watch the full uncut build before you pay
- you see the most a request can cost before it starts
- if you don't use a credit, you get a full refund

Maybe I'm wrong. I'll publish the conversion numbers at day 30 either way.
```

First comment: makeborne.com/go/li-0105

#### li-day7-numbers

- **When:** Day 7, Sun 1 Nov
- **Format:** Text post plus a cropped Whop screenshot
- **Notes:** Real numbers only, buyer data cropped.

```text
Day 7: here's exactly how many people paid.

- paying customers: [N]
- on Studio (the client-work plan): [N]
- refunds: [N]
- countries: [N]
- marketing spent: $[N] of $1,000
- what broke: [one honest thing], fixed in [N] hours

The lesson so far: [one lesson].
```

First comment: If you want to try it: makeborne.com/go/li-0107

#### li-agency-economics

- **When:** Week 2-3
- **Format:** Carousel built in Makeborne
- **Notes:** Every number must come from a timed real build. Never 'replaced my agency'.

```text
What a 3-page client site costs to make with AI vs by hand. Honest numbers from my own builds:

- time to first version: [measured]
- credits used: [measured] (about $[N] of plan value)
- rounds of feedback with a review link: [measured]
- the parts AI still doesn't do well: [honest list]

Your time goes on the client relationship and the judgement calls. That's the part they pay for.
```

First comment: makeborne.com/go/li-0110

#### li-beat-images (beat:images)

- **When:** beat:images, after the gate
- **Format:** Before/after carousel from the same brief

```text
Same brief, before and after.

Makeborne now generates the images inside your client's website, deck and book. Full-image slides, quality and aspect controls, and it's all still approved through the same review link.

Swipe for the before and after.
```

First comment: makeborne.com/go/li-images

#### li-beat-domains (beat:domains)

- **When:** beat:domains, after the gate
- **Format:** A real customer site moved end to end (with consent)

```text
Your client's site, on your client's domain.

Client sites made in Makeborne can now go live on the client's own domain. Here's [customer]'s site moving from the Makeborne address to theirs, start to finish.
```

First comment: makeborne.com/go/li-domains

#### li-beat-agency (beat:agency)

- **When:** beat:agency, after the gate
- **Format:** Series of 3 posts

```text
Run client work in one place: build, review, approve, publish. [Describe only the agency tools that passed the gate.]
```

First comment: makeborne.com/go/li-agency

### 4.5 X (founder account)

Put the link in the first reply. Every post is 280 characters or fewer.

#### x-launch

- **When:** Day 1, link in the first reply

1/
```text
I launched Makeborne today.

One brief in. A finished website, deck or book out.

Then your client gets a link, comments on the live site, and taps Approve.

Real-speed build below:
```
2/
```text
The site publishes on a Makeborne address. Your client needs no account to comment.

[clip: comment, fix, Approve on a phone]
```
3/
```text
The same brief becomes a deck that opens in PowerPoint. The charts are real chart objects, so you can click and edit them.

[clip]
```
4/
```text
Or a short book for screen and PDF: a client welcome guide, a lead magnet, a family recipe book.

[clip]
```
5/
```text
Pricing: $20 / $49 / $99 a month in credits. No free plan, on purpose.

You see the most a request can cost before it starts, and you get a full refund until you use a credit.
```
6/
```text
Built by a small team in Sarajevo. I'll post every number here.

Comment a brief and I'll build three of them on camera this week.
```
First reply: makeborne.com/go/x-0101

#### x-day7

- **When:** Day 7

1/
```text
Day 7 of selling an AI studio from Sarajevo with $1,000 of marketing money and no free tier.

Every number:
```
2/
```text
Paid: [N]
Studio share: [N]%
Refunds: [N]
Spent: $[N]
Best source: [source]
First build within 10 min of paying: [N]%
```
3/
```text
What broke: [thing]. Fixed in [N] h.
What I'm killing: [thing].
What I'm doubling: [thing].
```
4/
```text
Next week's test: [test]. Same post next Sunday.
```
First reply: makeborne.com/go/x-0107

#### x-generous-comparison

- **When:** Week 2
- **Notes:** Generous comparisons only. No 'better than' claims (EU comparative-advertising rules need verifiable claims).

1/
```text
What Lovable is better at than Makeborne, and where we fit instead. An honest thread from the maker:
```
2/
```text
Lovable is great for apps with logins, databases and user accounts. If you're building a SaaS, use it.
```
3/
```text
Makeborne is for client deliverables: the marketing site, the pitch deck and the client guide, from one brief and in one brand.
```
4/
```text
And the part app builders don't focus on: the client's approval. One review link, comments on the live page, an Approve button.
```
5/
```text
Pick by the job, not the hype. What else should I compare?
```
First reply: makeborne.com/go/x-0210

#### x-deck-proof

- **When:** Week 1-2

1/
```text
It's a real chart, not a picture.

Notes in. An editable deck out. Watch me change one number in PowerPoint and the chart follows.

[clip]
```
First reply: makeborne.com/go/x-0112

#### x-beat-images (beat:images)

- **When:** beat:images, launch day
- **Notes:** No upvote ask. Feedback only.

1/
```text
Same brief, before and after.

Makeborne now generates the images inside your website, deck and book.

[before/after clip]
```
2/
```text
Decks get full-image slides. You choose quality and aspect ratio before it runs, and the maximum credit cost is still shown up front.
```
3/
```text
We're on Product Hunt today. I'd love your feedback there, especially the critical kind: [phLink]
```
First reply: makeborne.com/go/x-images

#### x-beat-github (beat:github)

- **When:** beat:github, after the gate (one thread plus one YouTube demo only)

1/
```text
Edit in Makeborne or in your code. Both now stay in sync.

[split-screen clip: an edit in the repo shows up in Makeborne, and the other way round]
```
2/
```text
Until today, GitHub was a manual one-way export. Now it's two-way. [Describe exactly what passed the gate, for example whether imports need review.]
```
First reply: makeborne.com/go/x-github

#### x-beat-topups (beat:topups)

- **When:** beat:topups

1/
```text
Ran out of credits mid-project? You can now top up without changing your plan.

[20 s clip]
```
First reply: makeborne.com/go/x-topups

### 4.6 Indie Hackers

- **When:** Day 3 (Wed 28 Oct); then weekly numbers updates; a Product Hunt postmortem after beat:images; the 30-day report at beat:day30
- **Title:** Launched paid-only, no free tier, on purpose: an AI studio for client work from Sarajevo

```text
Hi IH. I'm {founderFirstName}, and I just launched Makeborne.

**What it is.** An AI studio for client work. One brief becomes a website (published on a Makeborne address), a deck that opens in PowerPoint with editable charts, or a book for screen and PDF. The client approves the site through a review link without making an account. There's also a basic CRM with a lead finder, and a manual export to GitHub.

**Who it's for.** Freelancers and small agencies first. They're the ones with a client waiting for a yes.

**The bet: no free tier.** Every build costs us real AI money. A free tier would need marketing money we don't have: the whole budget is $1,000. So we do three things instead:
1. Uncut build videos, so you can see exactly what you'd get.
2. The maximum cost of every request, shown before it starts.
3. A full refund until you use a credit.

**Pricing.** $20 / $49 / $99 a month for 300 / 750 / 1,550 credits. Yearly is 20% off. Unused credits carry over for two months.

**The $1,000.** $79 on two launch directories, $530 on small creator tests that only get paid once our attribution works, $200 to boost posts that have already sold something, and $191 for DM tooling, payout fees and a reserve. Everything after that has to come from revenue.

**Numbers so far.** [N] paid, [N] refunds. I'll post every week, including the bad weeks.

**What I'd love from you.** Is the refund promise a real substitute for a free tier, or am I fooling myself? What would make you pay on the first visit?
```

- Numbers match Whop and the plan's budget; update the $1,000 split if the owner changes it.
- Link at the end of the post or in the profile, per IH norms; no link-only posts.

### 4.7 Newsletter pitch (editorial)

Free editorial pitch to the tools or reader-picks sections of AI and design newsletters. Paid sponsorships wait for revenue (template t11).

**Subject:** Tool for your readers: one brief to a client-ready website, deck or book

```text
Hi {editorFirstName},

Short one for {newsletterName}'s {sectionName}:

Makeborne (makeborne.com/go/nl-{newsletterSlug}) is an AI studio for client work. One brief becomes a website published on a Makeborne address, a deck that opens in PowerPoint with editable charts, or a book for screen and PDF. The client comments on the site through a review link, with no account, and taps Approve.

Built by a small studio in Sarajevo. Paid plans from $20 a month + tax, with a full refund until you use credits.

Happy to send a 30-second uncut build or answer questions.

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**beat:images variant.** Subject: Same brief, before and after: Makeborne now generates the images in sites, decks and books

```text
Hi {editorFirstName},

One for {newsletterName}'s {sectionName}: Makeborne, an AI studio for client work, now generates the images inside the websites, decks and books it builds from one brief, with full-image slides and quality and aspect controls. The client still approves everything through a review link without an account.

Before/after from the same brief: {link}. Plans from $20 a month. Built by a small studio in Sarajevo.

{founderName}
Founder, Makeborne (makeborne.com)
ZORBY&CO D.O.O., {companyAddress}, Sarajevo, Bosnia and Herzegovina
```

**Targets:** Ben's Bites (tools); The Rundown AI (tools submission); Superhuman AI; TLDR AI; The Neuron; design and freelance newsletters that run reader tool picks

- Editorial pitches are free and are never tied to paid placement.
- Use each newsletter's own submission form where one exists.
- Track every mention as makeborne.com/go/nl-<slug>.

### 4.8 Press pitch

**Angle:** A small studio in Sarajevo launches an AI studio for client work, sells it worldwide with no free tier and $1,000 of marketing money, and publishes every number.

**Headline options:**
- Sarajevo studio launches an AI studio for client work and sells it worldwide
- No free tier, $1,000 of marketing, every number public: a Bosnian AI launch
- From one brief to a client's approval: Sarajevo's Makeborne bets on the part AI builders skip

- **Regional:** Day 5 (Fri 30 Oct): Netokracija, Bloomberg Adria, Startit, BiH business portals. Template `t16-press-regional`, in Bosnian and English.
- **European:** Day 30 (Wed 25 Nov) and beat:images: Reporters covering AI tools or CEE and Balkan startups (build the list by hand from their recent articles). Template `t17-press-europe`.

**Facts box:**
- Company: ZORBY&CO D.O.O., Sarajevo, Bosnia and Herzegovina
- Product: Makeborne (makeborne.com), paid beta since 26 Oct 2026
- Makes: websites (published on a Makeborne address), decks (PPTX with editable charts), books (screen and PDF)
- Client side: review links with comments without an account, and Approve
- Also: basic CRM with a lead finder, manual GitHub export, projects library
- Pricing: $20 / $49 / $99 a month; yearly 20% off; no free tier; full refund until credits are used
- Sold: worldwide

**Assets:** 3 real outputs, each with its original brief; founder photo; 30-60 s real-speed build video; cropped Whop screenshots (day 30 and day 90 only)

- The owner sends every pitch. Lovable appears only as contrast, never as 'better than'.
- Never present the v14 concept stills as product output.
- No user or revenue numbers before the owner approves them.

### 4.9 Directory listing

- **Name:** Makeborne
- **URL:** https://makeborne.com/go/{directoryCode}. Codes: taaft `taaft`, alternativeto `alt`, saashub `saashub`, microlaunch `microlaunch`, futuretools `futuretools`, rundown `rundown`, uneed `uneed`
- **Tagline:** The AI studio for client work.
- **Long tagline:** One brief in. A client-ready website, deck or book out.
- **Short description (143 chars):** Makeborne turns one brief into a website, a deck or a book, then lets your client comment and approve through a review link, no account needed.
- **Pricing:** Paid (no free plan, no trial), from $20/month
- **Categories:** AI website builder, AI presentation maker, AI ebook writer, Client feedback and approval, Agency tools
- **Tags:** website builder, presentations, pitch deck, ebook, client review, freelancers, agencies, no-code
- **Alternative to:** Lovable, Gamma, Framer, Wix, Durable. On AlternativeTo, list Makeborne as an alternative for websites and decks only. Do not claim to replace app builders (logins, databases).

**Long description:**

```text
Makeborne is an AI studio for freelancers, agencies and anyone who makes things for clients.

Write one brief and Makeborne builds:
- a website, published on a Makeborne address, with downloadable source and a manual export to GitHub
- a deck that opens in PowerPoint, with real, editable charts
- a book for screen and PDF: guides, lead magnets, client welcome books

Then send your client a review link. They comment on the live site without making an account and tap Approve, so there are no screenshot threads.

A basic CRM with a lead finder helps you find local businesses that need a better site and track the follow-up. Every project lives in one projects library.

Pricing: Create $20/month (300 credits), Studio $49/month (750 credits, best for client work), Scale $99/month (1,550 credits). Yearly is 20% off. The most a request can cost is shown before it starts. Unused credits carry over for two months. Full refund until you use credits.
```

**Features:**
- AI websites from one brief, published on a Makeborne address
- AI decks with editable PowerPoint charts
- AI books for screen and PDF
- Client review links: comments without an account, Approve
- Basic CRM with a lead finder
- Manual GitHub export and source download
- Projects library
- Maximum cost shown before each request

**Use cases:**
- Pitch a prospect with a real site before the first call
- Get client approval without email threads
- Turn notes into an editable deck
- Make a client welcome guide or lead magnet

**FAQ:**
- **Is there a free plan?** No. Plans start at $20 a month, and you get a full refund until you use credits.
- **Can I use my own domain?** Not yet. Sites publish on a Makeborne address today, and you can download the source at any time.
- **Does it make images?** Coming soon. Today sites, decks and books are typography-led or use your own photos.
- **Does my client need an account?** No. They comment and approve through the review link.

**Submission order:**
- 1. TAAFT ($49, b1), day 1, before anything else
- 2. Once TAAFT is live: AlternativeTo, SaaSHub, Microlaunch, Future Tools, The Rundown tools submission, plus free directories such as ToolPilot, Dang.ai and AI Tools Directory
- 3. Product Hunt coming-soon page (after TAAFT)
- 4. Uneed ($30, b6): booked in week 1 for the images day

**Updates after each beat:**
- `beat:images`: Replace the images FAQ with: 'Yes. Sites, decks and books generate their own images from your brief, with full-image slides and quality and aspect controls.' Add 'AI images in sites, decks and books' to features.
- `beat:domains`: Replace the domain FAQ with: 'Yes, client sites can go live on the client's own domain.'
- `beat:topups`: Add: 'Top up credits without changing plan.'
- `beat:github`: Replace 'Manual GitHub export' with 'Two-way GitHub sync' (exact wording per what passed the gate).

---

## 5. Affiliate and partner program

**Status:** Owner decision D3. Not open until growth ask ga9 passes: Whop custom affiliates linked to makeborne.com, the code passed into the Makeborne-created checkout, a sandbox test, then one live purchase and refund to prove payout and clawback.

- **Founding partners:** First 20 partners: 30% of every payment for the customer's first 12 months
- **Public:** Everyone else: 20% for 12 months
- **Yearly plans:** First payment only (30% or 20% of the yearly price)

| Plan | Commission per referred customer |
|---|---|
| Create $20/mo | 30%: $6.00/mo, $72 over 12 months; 20%: $4.00/mo, $48 |
| Studio $49/mo | 30%: $14.70/mo, $176.40 over 12 months; 20%: $9.80/mo, $117.60 |
| Scale $99/mo | 30%: $29.70/mo, $356.40 over 12 months; 20%: $19.80/mo, $237.60 |
| Studio yearly $470.40 | 30%: $141.12 once; 20%: $94.08 once |

**Economics [E]:** At 60% credit use Studio contributes about $33/month [E, funnel audit 8.2]; a 30% commission ($14.70) leaves about $18. At full credit use, AI cost is 45-47% of the price, so commissions are capped at 12 months and never lifetime. Lovable pays up to $100 per first-time subscriber and Base44 a flat $100 [V], so 30% on Studio beats both for partners who refer Studio buyers.

**Attribution window:** 30 days. A 30-day attribution window, matching Whop's default for custom affiliate links ('30-day attribution window by default' [V, https://docs.whop.com/developer/guides/affiliates, read 26 Oct 2026]). Makeborne stores first touch on the account on its own server from the /go/c-<handle> link (mb_aff in the Makeborne-created checkout metadata), not as an advertising cookie. The EDPB Guidelines 2/2023 put affiliate tracking links inside ePrivacy Art. 5(3) [F], so get a short legal view before scaling EU affiliate traffic.

**Payout:** Through Whop custom affiliates: commissions are held 30 days after the referred purchase [V, Whop affiliate docs, read 26 Oct 2026]; Whop's developer guide says a refund within the attribution window reverses the commission [V]. Makeborne's refund rule ('full refund until you use credits') can reach past 30 days, so the live purchase-and-refund test must prove clawback before payouts start. Payouts go to the affiliate's Whop balance; affiliates without a Whop account must be onboarded first [V]. Payout schedule and minimum are not documented [U].

**Terms:**
- Disclose the relationship in every post (FTC Endorsement Guides; EU UCPD; platform branded-content tools). A comped month counts too.
- No self-referral, no brand-keyword bidding, no coupon or deal-site listings, no spam, no fake reviews.
- Live features only; no vendor names; no 'better than' claims; no income claims.
- Only makeborne.com/go/c-<handle> links. Never the open Whop affiliate network or Whop store links (only Makeborne-created checkout links are used).
- Commission is void on refunded payments and on accounts that break these terms.

**Pitch:**

```text
Makeborne partners earn 30% of every payment for 12 months from each customer they send (20 founding spots; 20% after that).
Your audience makes things for clients. Makeborne turns one brief into a website, a deck or a book, and gives their client a review link to comment and approve, no account needed. Plans start at $20 a month, and Studio, the client-work plan, is $49, so one referred studio earns you $14.70 a month.
You get your own link, a Studio month to build real examples, uncut build clips you can use, and a partner page with every rule in plain words.
```

**Partner assets:**
- Personal link makeborne.com/go/c-<handle> plus an affiliate code
- Use-my-brief deep link with the partner's example brief pre-filled (after ga8)
- 5 real-speed screen captures: lead finder to demo site to review link; client comment to fix to Approve on a phone; one brief to site, deck and book; PPTX chart edit; GitHub export
- v9 'Fly-over' film in 9:16 and 16:9 (after checking that it matches the live home page and its end card is true)
- Approved hook list and the creator brief (t03)
- Brand kit: logo, cream canvas #F8F7F4, Inter display with one Newsreader Italic accent word
- Price and refund line, FAQ answers (domains, images, free plan) and the disclosure guide
- Monthly partner update with what's newly live (beats), so partners never promote what isn't

---

## 6. Sources read for this file (26 Oct 2026)

- FTC, CAN-SPAM Act compliance guide for business (Aug 2023, edited Jan 2024): https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- ICO, electronic mail marketing (under review after the Data (Use and Access) Act 2025): https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/
- CNIL, la prospection commerciale par courrier électronique (10 Jun 2026): https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique
- German UWG s.7: https://www.gesetze-im-internet.de/uwg_2004/__7.html
- Secondary overview of EU B2B cold email by country (2026) [S]: https://tomba.io/blog/gdpr-cold-email-b2b ; https://overloop.com/blog/b2b-cold-email-germany-gdpr-compliance
- LinkedIn Professional Community Policies: https://www.linkedin.com/legal/professional-community-policies
- LinkedIn User Agreement (effective 3 Nov 2025): https://www.linkedin.com/legal/user-agreement
- Meta Messenger Platform policy overview (24-hour window, automation): https://developers.facebook.com/docs/messenger-platform/policy/policy-overview/
- TikTok Branded Content Policy (published 4 Aug 2026, in force 31 Aug 2026): https://www.tiktok.com/legal/page/global/bc-policy/en
- YouTube paid product placements: https://support.google.com/youtube/answer/154235
- FTC, Disclosures 101 for social media influencers (Nov 2019): https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers
- Reddit self-promotion rules, secondary guide (2026) [S]: https://redship.io/blog/reddit-self-promotion-rules
- Product Hunt, preparing for launch: https://www.producthunt.com/launch/preparing-for-launch
- Hacker News Show HN guidelines: https://news.ycombinator.com/showhn.html
- TAAFT Get Featured ($49 tier, $300 launch-first bonus): https://theresanaiforthat.com/get-featured/
- Sidebar sponsorship ($950, about 40k subscribers): https://sidebar.io/sponsor
- Whop affiliate program docs (30% default, 30-day hold): https://docs.whop.com/manage-your-business/growth-marketing/affiliate-program.md
- Whop developer guide, affiliates (30-day attribution window, refund reversal): https://docs.whop.com/developer/guides/affiliates
- Newsletter pricing benchmarks, secondary (2026) [S]: https://dupple.com/learn/newsletter-advertising-cost-2026
- Internal: research/platforms-community.md (Product Hunt, Reddit, directories, newsletters, communities, affiliates), research/case-studies-adjacent.md (FTC fake-review rule), research/creative-assets.md (asset honesty), the launch brief in the private product docs (pricing promises)

**Not verified at the source:** Reddit rules (Reddit blocks fetching), CASL (the CRTC returned 403), Austrian and other national B2B email rules, BiH marketing-email law, ManyChat eligibility in BiH, the Whop payout schedule and minimum, clawback after 30 days, and creator market rates.

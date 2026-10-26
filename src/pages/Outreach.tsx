import { useMemo, useState } from 'react';
import outreachJson from '../../data/outreach.json';
import type { Outreach as OutreachT, Template } from '../lib/types';
import { Card, Chip, CopyButton, Details, Page, Pre, Section, Segmented } from '../components/ui';
import { href, type RouteProps } from '../routes';

const O = outreachJson as unknown as OutreachT;
type Tab = 'templates' | 'launch' | 'targets' | 'affiliate' | 'compliance';
const TABS: { value: Tab; label: string }[] = [
  { value: 'templates', label: `Templates · ${O.templates.length}` },
  { value: 'launch', label: 'Launch copy' },
  { value: 'targets', label: `Targets · ${O.targets.length}` },
  { value: 'affiliate', label: 'Affiliate program' },
  { value: 'compliance', label: 'Compliance' },
];

function CopyCard({ title, text, meta, children }: { title: React.ReactNode; text: string; meta?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <Card>
      <div className="copyblock-head">
        <h3 style={{ margin: 0 }}>{title}</h3>
        <CopyButton text={text} />
      </div>
      {meta && <div className="tiny muted" style={{ margin: '4px 0 10px' }}>{meta}</div>}
      <Pre text={text} />
      {children}
    </Card>
  );
}

export default function Outreach({ params }: RouteProps) {
  const tab = (TABS.some((t) => t.value === params[0]) ? params[0] : 'templates') as Tab;
  return (
    <Page
      eyebrow="Drafts only · the owner sends or approves every message"
      title={
        <>
          Words that go out <em>under our name</em>
        </>
      }
      lede={O.meta.status}
    >
      <div style={{ marginBottom: 26 }}>
        <Segmented label="Outreach section" value={tab} onChange={(t) => (window.location.hash = href('outreach', t))} options={TABS} />
      </div>
      {tab === 'templates' && <Templates />}
      {tab === 'launch' && <LaunchCopy />}
      {tab === 'targets' && <Targets />}
      {tab === 'affiliate' && <Affiliate />}
      {tab === 'compliance' && <Compliance />}
    </Page>
  );
}

function Templates() {
  const [ch, setCh] = useState('');
  const [q, setQ] = useState('');
  const groups = useMemo(() => [...new Set(O.templates.map((t) => t.planRefs.channels[0] ?? 'other'))], []);
  const list = O.templates.filter((t) => (!ch || t.planRefs.channels.includes(ch)) && (!q || `${t.id} ${t.purpose} ${t.subject} ${t.body}`.toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <div className="notice" style={{ marginBottom: 18 }}>
        <b>Merge fields.</b>
        <span>{O.meta.mergeFields}</span>
      </div>
      <div className="filters">
        <div className="field grow">
          <label htmlFor="t-q">Search</label>
          <input id="t-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Purpose, subject, body…" />
        </div>
        <div className="field">
          <label htmlFor="t-ch">Plan channel</label>
          <select id="t-ch" value={ch} onChange={(e) => setCh(e.target.value)}>
            <option value="">All</option>
            {groups.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="stack" style={{ gap: 16 }}>
        {list.map((t) => (
          <TemplateCard key={t.id} t={t} />
        ))}
      </div>
    </>
  );
}

function TemplateCard({ t }: { t: Template }) {
  const full = `${t.subject ? `Subject: ${t.subject}\n\n` : ''}${t.body}`;
  return (
    <Card>
      <div className="row-between" style={{ alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0 }}>
          <span className="item-id">{t.id}</span>
          <h3 style={{ margin: '4px 0' }}>{t.purpose}</h3>
          <div className="row">
            <Chip>{t.channel}</Chip>
            {t.planRefs.icp && <Chip tone="muted">{t.planRefs.icp}</Chip>}
            {t.planRefs.budgetLines.map((b) => (
              <Chip key={b} tone="muted">
                {b}
              </Chip>
            ))}
            {t.beat ? <Chip tone="accent">{t.beat} · only after the gate</Chip> : <span className="chip chip-live">Live copy</span>}
          </div>
        </div>
        <div className="row">
          {t.subject && <CopyButton text={t.subject} label="Copy subject" />}
          <CopyButton text={full} label="Copy message" />
        </div>
      </div>
      <p className="tiny muted" style={{ margin: '10px 0' }}>
        Audience: {t.audience}
      </p>
      {t.subject && (
        <p className="small" style={{ margin: '0 0 8px' }}>
          <b>Subject:</b> {t.subject}
        </p>
      )}
      <Pre text={t.body} />
      <div className="grid-2" style={{ marginTop: 12 }}>
        {t.followUp && (
          <Details summary="Follow-up">
            <div className="row-between" style={{ marginBottom: 6 }}>
              <span />
              <CopyButton text={t.followUp} />
            </div>
            <p className="small" style={{ margin: 0 }}>
              {t.followUp}
            </p>
          </Details>
        )}
        <Details summary={`Rules · ${t.rules.length}`}>
          <ul className="bullets small">
            {t.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Details>
      </div>
    </Card>
  );
}

function LaunchCopy() {
  const L = O.launchCopy;
  const ph = L.productHunt;
  const dl = L.directoryListing;
  return (
    <>
      <Section id="ph" title="Product Hunt" kicker={ph.beat} aside={<Chip tone="accent">{ph.status}</Chip>}>
        <div className="grid-2">
          <CopyCard title="Tagline" text={ph.tagline} meta={`Alternatives: ${ph.taglineAlternatives.join(' · ')}`} />
          <CopyCard title="Coming-soon page (live today)" text={`${ph.comingSoonPage.tagline}\n\n${ph.comingSoonPage.text}`} />
          <CopyCard title="Description (images beat)" text={ph.description} />
          <CopyCard title="Description, live features only" text={ph.liveOnlyDescription} />
          <CopyCard title="First comment" text={ph.firstComment} />
          <CopyCard title="Maker story" text={ph.makerStory} />
        </div>
        <Details summary={`Gallery plan · ${ph.gallery.length} images`}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Spec</th>
                  <th>Content</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {ph.gallery.map((g) => (
                  <tr key={g.n}>
                    <td className="num">{g.n}</td>
                    <td className="small">{g.type}</td>
                    <td className="small">{g.spec}</td>
                    <td className="small">{g.content}</td>
                    <td className="small">{g.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="bullets small" style={{ marginTop: 10 }}>
            {[...ph.galleryRules, ...ph.rules].map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Details>
      </Section>

      <Section id="hn" title="Show HN" aside={<Chip tone="warn">{L.showHN.status}</Chip>}>
        <CopyCard title={L.showHN.title} text={`${L.showHN.title}\n\n${L.showHN.body}`} meta={`Earliest: ${L.showHN.earliest}`}>
          <ul className="bullets small" style={{ marginTop: 10 }}>
            {L.showHN.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </CopyCard>
      </Section>

      <Section id="reddit" title="Reddit" kicker={`${L.reddit.length} posts`}>
        <div className="grid-2">
          {L.reddit.map((r) => (
            <CopyCard key={r.subreddit + r.when} title={r.subreddit} text={`${r.title}\n\n${r.body}`} meta={`${r.when} · ${r.rulesNote}`} />
          ))}
        </div>
        <div className="notice notice-bad" style={{ marginTop: 14 }}>
          <b>Do not post in</b>
          <span>{L.redditDoNotPost.join(' · ')}</span>
        </div>
      </Section>

      <Section id="x" title="X threads" kicker={`${L.x.length} threads`}>
        <div className="grid-2">
          {L.x.map((t) => {
            const text = t.thread.map((tw, i) => `${i + 1}/${t.thread.length} ${tw}`).join('\n\n');
            return (
              <Card key={t.id}>
                <div className="copyblock-head">
                  <h3 style={{ margin: 0 }}>{t.id}</h3>
                  <CopyButton text={text} label="Copy thread" />
                </div>
                <p className="tiny muted" style={{ margin: '4px 0 10px' }}>
                  {t.when}
                </p>
                <ol className="list small" style={{ paddingLeft: 0 }}>
                  {t.thread.map((tw, i) => (
                    <li key={i} className="row-between" style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
                      <span style={{ whiteSpace: 'pre-wrap' }}>
                        <b className="num">{i + 1}.</b> {tw}
                      </span>
                      <CopyButton text={tw} label="" />
                    </li>
                  ))}
                </ol>
                <div className="row-between small" style={{ marginTop: 8 }}>
                  <span>
                    First reply: <span className="code">{t.firstReply}</span>
                  </span>
                  <CopyButton text={t.firstReply} />
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section id="linkedin" title="Founder LinkedIn" kicker={`${L.linkedin.length} posts`}>
        <div className="grid-2">
          {L.linkedin.map((p) => (
            <CopyCard key={p.id} title={p.id} text={p.body} meta={`${p.when} · ${p.format}`}>
              <div className="row-between small" style={{ marginTop: 8 }}>
                <span>First comment: {p.firstComment}</span>
                <CopyButton text={p.firstComment} />
              </div>
            </CopyCard>
          ))}
        </div>
      </Section>

      <Section id="ih" title="Indie Hackers">
        <CopyCard title={L.indieHackers.title} text={`${L.indieHackers.title}\n\n${L.indieHackers.body}`} meta={L.indieHackers.when} />
      </Section>

      <Section id="newsletter" title="Newsletter pitch">
        <div className="grid-2">
          <CopyCard title={L.newsletterPitch.subject} text={`Subject: ${L.newsletterPitch.subject}\n\n${L.newsletterPitch.body}`} meta={`${L.newsletterPitch.summary} · Targets: ${L.newsletterPitch.targets.join(', ')}`} />
          <CopyCard title={`${L.newsletterPitch.beatVariant.subject}`} text={`Subject: ${L.newsletterPitch.beatVariant.subject}\n\n${L.newsletterPitch.beatVariant.body}`} meta={`${L.newsletterPitch.beatVariant.beat} variant · only after the gate`} />
        </div>
      </Section>

      <Section id="press" title="Press pitch" kicker={L.pressPitch.angle}>
        <div className="grid-2">
          <Card>
            <h3>Headline options</h3>
            <ul className="list small">
              {L.pressPitch.headlineOptions.map((h) => (
                <li key={h} className="row-between">
                  <span>{h}</span>
                  <CopyButton text={h} />
                </li>
              ))}
            </ul>
            <p className="small" style={{ marginTop: 10 }}>
              <b>Regional</b> ({L.pressPitch.regional.when}, template {L.pressPitch.regional.templateId}): {L.pressPitch.regional.outlets.join(', ')}
            </p>
            <p className="small">
              <b>European</b> ({L.pressPitch.european.when}, template {L.pressPitch.european.templateId}): {L.pressPitch.european.outlets}
            </p>
          </Card>
          <CopyCard title="Facts box" text={L.pressPitch.factsBox.join('\n')} meta={`Assets: ${L.pressPitch.assets.join(' · ')}`} />
        </div>
      </Section>

      <Section id="directories" title="Directory listing kit" kicker={dl.url}>
        <div className="grid-2">
          <CopyCard title="Tagline" text={dl.tagline} meta={dl.taglineLong} />
          <CopyCard title="Short description" text={dl.shortDescription} />
          <CopyCard title="Long description" text={dl.longDescription} />
          <Card>
            <dl className="kv small">
              <dt>Pricing</dt>
              <dd>
                {dl.pricingModel} · from {dl.startingPrice}
              </dd>
              <dt>Categories</dt>
              <dd>{dl.categories.join(', ')}</dd>
              <dt>Tags</dt>
              <dd>{dl.tags.join(', ')}</dd>
              <dt>Alternatives to</dt>
              <dd>
                {dl.alternativesTo.join(', ')} <span className="muted">({dl.alternativesNote})</span>
              </dd>
              <dt>Codes</dt>
              <dd>
                {Object.entries(dl.codes).map(([k, v]) => (
                  <span key={k} className="code" style={{ marginRight: 4 }}>
                    /go/{v}
                  </span>
                ))}
              </dd>
              <dt>Submit order</dt>
              <dd>{dl.submitOrder.join(' → ')}</dd>
            </dl>
          </Card>
          <CopyCard title="Features" text={dl.features.map((f) => `• ${f}`).join('\n')} />
          <CopyCard title="Use cases" text={dl.useCases.map((f) => `• ${f}`).join('\n')} />
          <CopyCard title="FAQ" text={dl.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')} />
          <Card>
            <h3>Beat updates (only after each gate)</h3>
            <ul className="list small">
              {Object.entries(dl.beatUpdates).map(([k, v]) => (
                <li key={k}>
                  <div className="row-between">
                    <Chip tone="accent">{k}</Chip>
                    <CopyButton text={v} />
                  </div>
                  <p style={{ margin: '6px 0 0' }}>{v}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}

function Targets() {
  return (
    <div className="stack" style={{ gap: 14 }}>
      {[...O.targets].sort((a, b) => a.priority - b.priority).map((t) => (
        <Card key={t.type}>
          <div className="row-between" style={{ alignItems: 'flex-start' }}>
            <h3 style={{ margin: 0, maxWidth: '70ch' }}>{t.type}</h3>
            <div className="row">
              <Chip tone={t.priority === 1 ? 'accent' : 'muted'}>Priority {t.priority}</Chip>
              {t.budgetLines.map((b) => (
                <Chip key={b} tone="muted">
                  {b}
                </Chip>
              ))}
            </div>
          </div>
          <div className="grid-2" style={{ marginTop: 12 }}>
            <div>
              <h4>Examples</h4>
              <ul className="bullets small">
                {t.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <h4 style={{ marginTop: 10 }}>Count</h4>
              <p className="small">{t.count}</p>
            </div>
            <div>
              <h4>How to find</h4>
              <p className="small">{t.howToFind}</p>
              <h4 style={{ marginTop: 10 }}>Templates</h4>
              <div className="row">
                {t.templates.map((id) => (
                  <span key={id} className="code">
                    {id}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Affiliate() {
  const A = O.affiliateProgram;
  return (
    <>
      <div className="notice" style={{ marginBottom: 18 }}>
        <b>Status.</b>
        <span>{A.status}</span>
      </div>
      <div className="grid-2">
        <Card className="card-accent">
          <p className="kicker">Commission</p>
          <dl className="kv">
            <dt>Founding partners</dt>
            <dd>{A.commission.foundingPartners}</dd>
            <dt>Public</dt>
            <dd>{A.commission.public}</dd>
            <dt>Yearly plans</dt>
            <dd>{A.commission.yearlyPlans}</dd>
            <dt>Cookie</dt>
            <dd>
              {A.cookieDays} days · {A.cookieNote}
            </dd>
            <dt>Payout</dt>
            <dd>{A.payout}</dd>
          </dl>
        </Card>
        <Card>
          <h3>Per customer</h3>
          <div className="table-wrap">
            <table>
              <tbody>
                {Object.entries(A.commission.examplesPerCustomer).map(([k, v]) => (
                  <tr key={k}>
                    <td>
                      <b className="small">{k}</b>
                    </td>
                    <td className="small">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="footnote">{A.commission.economicsNote}</p>
        </Card>
        <CopyCard title="Partner pitch" text={A.pitch} />
        <Card>
          <h3>Terms</h3>
          <ul className="bullets small">
            {A.terms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h3 style={{ marginTop: 14 }}>Partner kit</h3>
          <ul className="bullets small">
            {A.assets.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

function Compliance() {
  const C = O.compliance;
  return (
    <>
      <div className="notice notice-bad" style={{ marginBottom: 18 }}>
        <b>Not legal advice.</b>
        <span>{C.notLegalAdvice}</span>
      </div>
      <Section id="email" title="Email law matrix">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Law</th>
                <th>Applies</th>
                <th>Requires</th>
                <th>Verdict</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {C.email.map((e) => (
                <tr key={e.law}>
                  <td>
                    <b className="small">{e.law}</b>
                  </td>
                  <td className="small">{e.applies}</td>
                  <td className="small">{e.requires}</td>
                  <td className="small">{e.verdict}</td>
                  <td className="tiny muted">{e.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section id="platforms" title="Platform rules">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Rule</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {C.platforms.map((p) => (
                <tr key={p.platform}>
                  <td>
                    <b className="small">{p.platform}</b>
                  </td>
                  <td className="small">{p.rule}</td>
                  <td className="tiny muted">{p.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote">{C.socialDmNote}</p>
      </Section>
    </>
  );
}

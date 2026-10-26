import { useMemo, useState } from 'react';
import { HOOK_CODES } from '../lib/contentIndex';
import trackingMd from '../../content/tracking.md?raw';
import { extractSection } from '../lib/sections';
import { downloadText, sarajevoToday, toCsv, useStored } from '../lib/util';
import { Card, Chip, CopyButton, Details, Field, Page, Section, Segmented } from '../components/ui';
import { Markdown } from '../components/Markdown';
import { href, type RouteProps } from '../routes';

const TRACKING = trackingMd;

// Values from content/tracking.md section 1.2 (paid, cpc and google added 26 Oct for the ads playbook). Beat campaigns exist only after that feature passes the gate.
const SOURCES = ['tiktok', 'instagram', 'youtube', 'linkedin', 'x', 'producthunt', 'taaft', 'uneed', 'reddit', 'indiehackers', 'press-<outlet>', 'review_page', 'badge', 'deck_share', 'c-<handle>', 'alternativeto', 'saashub', 'microlaunch', 'futuretools', 'community-<name>', 'content_rewards', 'changelog', 'customer', 'portal', 'github_readme', 'google', 'rundown'];
const MEDIUMS = ['organic', 'dm', 'bio', 'creator', 'affiliate', 'spark', 'partnership', 'directory', 'launch', 'press', 'product_loop', 'email', 'referral', 'paid', 'cpc'];
const CAMPAIGNS = ['launch-2026-10', 'always-on', 'creators-w1', 'creators-w2', 'bf-2026', 'day30', 'day90', 'cr-2026-12', 'images-beat', 'topups-beat', 'domains-beat', 'agency-beat', 'leads-beat', 'github-beat'];
const BEAT_CAMPAIGNS = new Set(['images-beat', 'topups-beat', 'domains-beat', 'agency-beat', 'leads-beat', 'github-beat']);
const PREFIXES: { p: string; label: string; source: string; standalone?: boolean }[] = [
  { p: 'tt', label: 'tt- Brand TikTok', source: 'tiktok' },
  { p: 'ig', label: 'ig- Instagram', source: 'instagram' },
  { p: 'yt', label: 'yt- YouTube', source: 'youtube' },
  { p: 'li', label: 'li- Founder LinkedIn', source: 'linkedin' },
  { p: 'x', label: 'x- Founder X', source: 'x' },
  { p: 'c', label: 'c- Creator (public handle)', source: 'c-<handle>' },
  { p: 'g', label: 'g- Google Search ad group', source: 'google' },
  { p: 'cr', label: 'cr- Content Rewards', source: 'content_rewards' },
  { p: 'ph', label: 'ph- Product Hunt', source: 'producthunt' },
  { p: 'ih', label: 'ih- Indie Hackers', source: 'indiehackers' },
  { p: 'rd', label: 'rd- Reddit', source: 'reddit' },
  { p: 'com', label: 'com- Agency community', source: 'community-<name>' },
  { p: 'press', label: 'press- Press outlet', source: 'press-<outlet>' },
  { p: 'em', label: 'em- Changelog email', source: 'changelog' },
  { p: 'taaft', label: 'taaft (directory)', source: 'taaft', standalone: true },
  { p: 'uneed', label: 'uneed (directory, beat:images)', source: 'uneed', standalone: true },
  { p: 'alt', label: 'alt (AlternativeTo)', source: 'alternativeto', standalone: true },
  { p: 'saashub', label: 'saashub (directory)', source: 'saashub', standalone: true },
  { p: 'microlaunch', label: 'microlaunch (directory)', source: 'microlaunch', standalone: true },
  { p: 'futuretools', label: 'futuretools (directory)', source: 'futuretools', standalone: true },
  { p: 'rundown', label: 'rundown (The Rundown Supertools)', source: 'rundown', standalone: true },
];
const DESTS = [
  { v: '/', label: 'Home', live: true },
  { v: '/pricing', label: 'Pricing', live: true },
  { v: '/client-work', label: 'Client work (ask 7, not live yet)', live: false },
  { v: '/sites', label: 'Sites format page (ask 7)', live: false },
  { v: '/decks', label: 'Decks format page (ask 7)', live: false },
  { v: '/books', label: 'Books format page (ask 7)', live: false },
  { v: '/examples', label: 'Examples gallery (ask 7)', live: false },
];
const HOOKS = [...new Set(['r1', 'r2', 'f1', 'f2', 'f4', 'a3', 'd1', 'd3', 'b4', 'p2', 'p3', ...HOOK_CODES])];

/** Channel mapping, content/tracking.md 3.5 (first match wins). */
function mapChannel(src: string, med: string) {
  if ((med === 'creator' || med === 'affiliate') && src.startsWith('c-')) return 'ch-creators';
  if (src === 'content_rewards') return 'ch-contentrewards';
  if (med === 'spark' || med === 'partnership' || med === 'paid' || med === 'cpc') return 'ch-boosts';
  if (med === 'product_loop' || med === 'referral') return 'ch-loops';
  if (med === 'email') return 'ch-email';
  if (med === 'directory') return 'ch-directories';
  if (src === 'producthunt') return 'ch-producthunt';
  if (med === 'press') return 'ch-press';
  if (src === 'reddit' || src === 'indiehackers' || src.startsWith('community-')) return 'ch-community';
  if (['tiktok', 'instagram', 'youtube', 'linkedin', 'x'].includes(src)) return `ch-${src}`;
  return 'unknown';
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

interface Built { code: string; url: string; source: string; medium: string; campaign: string; content: string; dest: string; channel: string; beat: string; created: string }

type Tab = 'builder' | 'events' | 'consent' | 'rules';

export default function Tracking({ params }: RouteProps) {
  const tab = (['builder', 'events', 'consent', 'rules'].includes(params[0]) ? params[0] : 'builder') as Tab;
  return (
    <Page
      eyebrow="No cookies today · no ad tracking before the cookie banner"
      title={
        <>
          Every link, <em>accounted for</em>
        </>
      }
      lede="Make a /go/ short link with the right tags, so every visit and sale is counted against the post, ad or creator that brought it."
    >
      <div style={{ marginBottom: 26 }}>
        <Segmented
          label="Tracking section"
          value={tab}
          onChange={(t) => (window.location.hash = href('tracking', t))}
          options={[
            { value: 'builder', label: 'UTM builder' },
            { value: 'events', label: 'Event spec' },
            { value: 'consent', label: 'Consent' },
            { value: 'rules', label: 'Rules & rituals' },
          ]}
        />
      </div>
      {tab === 'builder' && <Builder />}
      {tab === 'events' && (
        <Card>
          <Markdown idPrefix="ev" source={[extractSection(TRACKING, '3. Event spec'), extractSection(TRACKING, '0. What we can')].join('\n\n')} className="prose-wide" />
        </Card>
      )}
      {tab === 'consent' && (
        <>
          <div className="notice notice-bad" style={{ marginBottom: 18 }}>
            <b>Prerequisite.</b>
            <span>No Meta, TikTok or Google pixel, retargeting audience or Conversions API upload before a consent banner is live. EU consent rules cover EU visitors even though the seller is in Bosnia and Herzegovina. Target: about 6 Dec (week 6).</span>
          </div>
          <Card>
            <Markdown idPrefix="cs" source={extractSection(TRACKING, '5. Consent banner')} className="prose-wide" />
          </Card>
        </>
      )}
      {tab === 'rules' && (
        <Card>
          <Markdown idPrefix="rl" source={[extractSection(TRACKING, '2. Link-in-bio'), extractSection(TRACKING, '4. Reading Whop'), extractSection(TRACKING, '6. Weekly dashboard'), extractSection(TRACKING, '7. Kill and scale')].join('\n\n')} className="prose-wide" />
        </Card>
      )}
    </Page>
  );
}

function Builder() {
  const [prefix, setPrefix] = useState('tt');
  const [id, setId] = useState('0412');
  const [suffix, setSuffix] = useState('');
  const [handle, setHandle] = useState('');
  const [source, setSource] = useState('tiktok');
  const [medium, setMedium] = useState('organic');
  const [campaign, setCampaign] = useState('launch-2026-10');
  const [hook, setHook] = useState('r2');
  const [dest, setDest] = useState('/');
  const [register, setRegister] = useStored<Built[]>('utm-register', []);

  const pre = PREFIXES.find((x) => x.p === prefix)!;
  const needsHandle = source.includes('<');
  const realSource = needsHandle ? source.replace(/<[^>]+>/, slug(handle) || '…') : source;
  // Creator, press and community codes carry the handle, outlet or community name (tracking.md §1.3:
  // /go/c-<handle>, /go/press-netokracija), so two outlets never share one code.
  const nameSlug = needsHandle ? slug(handle) : '';
  const idPart = slug(id) || (['c', 'press', 'com'].includes(prefix) ? nameSlug : '');
  const code = pre.standalone ? [prefix, slug(suffix)].filter(Boolean).join('-') : [prefix, idPart, slug(suffix)].filter(Boolean).join('-');
  const content = pre.standalone ? '' : [prefix, idPart, medium === 'dm' && suffix ? slug(suffix) : hook].filter(Boolean).join('-');
  const qs = new URLSearchParams({ utm_source: realSource, utm_medium: medium, utm_campaign: campaign, ...(content ? { utm_content: content } : {}) }).toString();
  const url = `https://makeborne.com${dest}?${qs}`;
  const short = `makeborne.com/go/${code}`;
  const channel = mapChannel(realSource, medium);
  const beat = BEAT_CAMPAIGNS.has(campaign) ? `beat:${campaign.replace('-beat', '')}` : prefix === 'uneed' || (prefix === 'ph' && slug(id) === 'images') ? 'beat:images' : '';

  const issues = useMemo(() => {
    const out: { tone: 'bad' | 'warn'; text: string }[] = [];
    if (!/^[a-z0-9-]+$/.test(code)) out.push({ tone: 'bad', text: '/go/ codes use lowercase a-z, 0-9 and hyphens only.' });
    if (code.length > 32) out.push({ tone: 'bad', text: `Code is ${code.length} characters; the maximum is 32.` });
    // Each field on its own (digits from separate fields must not combine), and the changelog email's
    // yyyymmdd date is allowed: tracking.md §1.3 uses /go/em-<yyyymmdd>.
    const pii = (s: string) => /@|%40/i.test(s) || /\d{7,}/.test(s);
    if ([prefix === 'em' && /^\d{8}$/.test(id) ? '' : id, suffix, handle].some(pii)) out.push({ tone: 'bad', text: 'Looks like personal data (email or phone). No personal data in any URL, ever.' });
    if (needsHandle && !slug(handle)) out.push({ tone: 'bad', text: `Fill in the ${source.match(/<([^>]+)>/)?.[1]} (a public handle used with agreement, or an outlet or community name).` });
    if (beat) out.push({ tone: 'warn', text: `${beat}: create this link only after the feature passes the six-box gate. Never promote it as available before then.` });
    if (!DESTS.find((d) => d.v === dest)?.live) out.push({ tone: 'warn', text: 'This destination page is not live yet (ask 7). Until it ships, send traffic to the home page or /pricing.' });
    if (channel === 'unknown') out.push({ tone: 'warn', text: 'This source and medium map to "unknown" in the channel mapping (tracking.md 3.5).' });
    if (register.some((r) => r.code === code)) out.push({ tone: 'bad', text: 'This code is already in your register. Codes are never reused.' });
    return out;
  }, [code, id, prefix, suffix, handle, needsHandle, source, beat, dest, channel, register]);

  const choosePrefix = (p: string) => {
    setPrefix(p);
    const d = PREFIXES.find((x) => x.p === p)!;
    setSource(d.source);
    // Every branch sets the campaign, so a creator or email campaign never carries over to another surface.
    if (d.standalone) {
      setMedium('directory');
      setCampaign(p === 'uneed' ? 'images-beat' : 'launch-2026-10');
      setId('');
      setSuffix('');
    } else if (p === 'c') {
      setMedium('creator');
      setCampaign('creators-w1');
      setId('');
    } else if (p === 'ph') {
      setMedium('launch');
      setCampaign('launch-2026-10');
      setId('soon');
    } else if (p === 'press') {
      setMedium('press');
      setCampaign('launch-2026-10');
      setId('');
    } else if (p === 'com') {
      setMedium('organic');
      setCampaign('launch-2026-10');
      setId('');
    } else if (p === 'em') {
      setMedium('email');
      setCampaign('always-on');
      setId(sarajevoToday().replace(/-/g, ''));
    } else if (p === 'g') {
      setMedium('cpc');
      setCampaign('always-on');
      setId('brand');
    } else if (p === 'cr') {
      setMedium('creator');
      setCampaign('cr-2026-12');
      setId('2026-12');
    } else {
      setMedium('organic');
      setCampaign('launch-2026-10');
      if (!id || /^\d{8}$/.test(id) || id === '2026-12' || id === 'soon' || id === 'brand') setId('0001');
    }
  };

  const add = () => setRegister((r) => [...r, { code, url, source: realSource, medium, campaign, content, dest, channel, beat, created: sarajevoToday() }]);
  const exportCsv = () =>
    downloadText(`go-code-register-${sarajevoToday()}.csv`, toCsv(['code', 'short_link', 'destination', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'channel', 'beat', 'created'], register.map((r) => [r.code, `makeborne.com/go/${r.code}`, r.url, r.source, r.medium, r.campaign, r.content, r.channel, r.beat, r.created])), 'text/csv');

  return (
    <div className="split">
      <Card>
        <h3>Build a /go/ link</h3>
        <p className="small muted">Convention: content/tracking.md §1. Code = &lt;surface&gt;-&lt;id&gt;[-&lt;suffix&gt;], utm_content = &lt;surface&gt;-&lt;post#&gt;-&lt;hook code&gt; (DMs end in the keyword).</p>
        <div className="form-grid" style={{ marginTop: 12 }}>
          <Field label="Surface">
            {(fid) => (
              <select id={fid} value={prefix} onChange={(e) => choosePrefix(e.target.value)}>
                {PREFIXES.map((p) => (
                  <option key={p.p} value={p.p}>
                    {p.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
          {!pre.standalone && (
            <Field label={prefix === 'c' ? 'Id (blank = handle)' : 'Post # or id'}>{(fid) => <input id={fid} type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="0412" />}</Field>
          )}
          <Field label={medium === 'dm' ? 'DM keyword' : 'Suffix (optional)'} hint={medium === 'dm' ? 'site, deck, book, client' : 'bio, b (paid boost), s (Spark), p (partnership)…'}>
            {(fid) => <input id={fid} type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)} />}
          </Field>
          {needsHandle && (
            <Field label={source.match(/<([^>]+)>/)?.[1] ?? 'name'} hint="Public handle only, with agreement">
              {(fid) => <input id={fid} type="text" value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="handle" />}
            </Field>
          )}
          <Field label="utm_source">
            {(fid) => (
              <select id={fid} value={source} onChange={(e) => setSource(e.target.value)}>
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            )}
          </Field>
          <Field label="utm_medium">
            {(fid) => (
              <select id={fid} value={medium} onChange={(e) => setMedium(e.target.value)}>
                {MEDIUMS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            )}
          </Field>
          <Field label="utm_campaign">
            {(fid) => (
              <select id={fid} value={campaign} onChange={(e) => setCampaign(e.target.value)}>
                {CAMPAIGNS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                    {BEAT_CAMPAIGNS.has(s) ? ' (beat, after gate)' : ''}
                  </option>
                ))}
              </select>
            )}
          </Field>
          {!pre.standalone && medium !== 'dm' && (
            <Field label="Hook code">
              {(fid) => (
                <select id={fid} value={hook} onChange={(e) => setHook(e.target.value)}>
                  {HOOKS.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
              )}
            </Field>
          )}
          <Field label="Destination" className="wide">
            {(fid) => (
              <select id={fid} value={dest} onChange={(e) => setDest(e.target.value)}>
                {DESTS.map((d) => (
                  <option key={d.v} value={d.v}>
                    {d.v} · {d.label}
                  </option>
                ))}
              </select>
            )}
          </Field>
        </div>
      </Card>

      <div className="stack" style={{ alignContent: 'start' }}>
        <Card className="card-ink">
          <p className="kicker" style={{ color: 'inherit', opacity: 0.65 }}>
            Short link (hand this out)
          </p>
          <div className="row-between">
            <span className="code" style={{ fontSize: 15, background: 'transparent', padding: 0, color: 'inherit' }}>
              {short}
            </span>
            <CopyButton text={`https://${short}`} ariaLabel="Copy short link" />
          </div>
          <hr className="divider" style={{ borderColor: 'color-mix(in srgb, var(--bg) 20%, transparent)' }} />
          <p className="kicker" style={{ color: 'inherit', opacity: 0.65 }}>
            Server redirect target
          </p>
          <div className="row-between" style={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
            <span className="code" style={{ background: 'transparent', padding: 0, color: 'inherit', fontSize: 12.5 }}>
              {url}
            </span>
            <CopyButton text={url} ariaLabel="Copy redirect target URL" />
          </div>
          <dl className="kv small" style={{ marginTop: 14 }}>
            <dt>Plan channel</dt>
            <dd>{channel}</dd>
            <dt>utm_content</dt>
            <dd>{content || '–'}</dd>
            {beat && (
              <>
                <dt>Register tag</dt>
                <dd>{beat}</dd>
              </>
            )}
          </dl>
        </Card>
        {issues.length > 0 ? (
          <div className="stack" style={{ gap: 8 }}>
            {issues.map((i) => (
              <div key={i.text} className={`notice ${i.tone === 'bad' ? 'notice-bad' : ''}`}>
                <b>{i.tone === 'bad' ? 'Fix' : 'Check'}</b>
                <span>{i.text}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="notice notice-good">
            <b>Clean.</b>
            <span>Follows the convention. Never hand out a Whop store, affiliate or tracking link instead.</span>
          </div>
        )}
        <div className="row">
          <button type="button" className="btn btn-accent" onClick={add} disabled={issues.some((i) => i.tone === 'bad')}>
            Add to code register
          </button>
          <button type="button" className="btn btn-ghost" onClick={exportCsv} disabled={!register.length}>
            Export register CSV
          </button>
        </div>
        {register.length > 0 && (
          <Details summary={`Code register · ${register.length} (this browser)`} open>
            <ul className="list small">
              {[...register].reverse().map((r) => (
                <li key={r.code} className="row-between">
                  <span>
                    <span className="code">/go/{r.code}</span> <span className="muted">{r.channel}</span> {r.beat && <Chip tone="accent">{r.beat}</Chip>}
                  </span>
                  <span className="row">
                    <CopyButton text={r.url} label="URL" ariaLabel={`Copy /go/${r.code} URL`} />
                    <button type="button" className="btn btn-sm btn-danger" aria-label={`Remove /go/${r.code}`} onClick={() => setRegister((x) => x.filter((y) => y.code !== r.code))}>
                      Remove
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <p className="tiny muted">The code register should live in a private sheet; export it there. No personal data.</p>
          </Details>
        )}
      </div>

      <div style={{ gridColumn: '1 / -1' }}>
        <Section id="examples" title="Examples per channel" kicker="tracking.md §1.3">
          <Card>
            <Markdown idPrefix="ex" source={extractSection(TRACKING, '1.3 Examples per channel').replace(/^###.*$/m, '')} className="prose-wide" />
          </Card>
        </Section>
      </div>
    </div>
  );
}

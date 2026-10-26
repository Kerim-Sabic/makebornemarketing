import { useEffect, useState, type ReactNode } from 'react';
import adsJson from '../../data/ads.json';
import planJson from '../../data/plan.json';
import type { AdCard, AdsFile, Plan } from '../lib/types';
import { fmtDate, fmtUsd, isIsoDate, planWeek, sarajevoToday, uid } from '../lib/util';
import { useChecks, useSpendLog } from '../lib/stores';
import { CopyField, Steps, TickItem } from '../components/Checklist';
import { Details, Page, Term } from '../components/ui';
import { href, type RouteProps } from '../routes';

const ADS = adsJson as unknown as AdsFile;
const PLAN = planJson as unknown as Plan;
const TOTAL = 1000;
const CARDS = [...ADS.adCards].sort((a, b) => a.order - b.order);
const lineName = (id: string) => PLAN.budget.lines.find((l) => l.id === id)?.item.split(/[:(]/)[0].trim();
const short = (iso: string) => fmtDate(iso, { weekday: 'short', day: 'numeric', month: 'short' });
const ids = (s: string) => [...new Set(s.match(/\b[VC]\d{2}\b/g) ?? [])];
const contentHref = (id: string) => href('library', /^C/.test(id) ? 'images' : 'videos', id);

/** The checks to finish before the first ad (ads-playbook.md set-up, tracking.md §5). */
const PREFLIGHT: { key: string; text: string; how: string }[] = [
  { key: 'account', text: 'Ad accounts in the company name', how: "Open the Meta ad account (Business Manager) and the TikTok Ads account in Makeborne's own legal name. Never an account in someone else's name, a bought account, another country or a VPN." },
  { key: 'usd', text: 'Currency USD, time zone Europe/Sarajevo', how: 'Choose USD and Europe/Sarajevo when the account is created. Both are hard or impossible to change later.' },
  { key: 'card', text: 'Test the payment card', how: 'Add the company card and let the platform verify it, with no campaign running. If it is refused from Bosnia and Herzegovina, use the fallback below.' },
  { key: 'domain', text: 'Verify the domain makeborne.com', how: 'Meta: Business settings > Brand safety > Domains > add makeborne.com and verify it (DNS record). TikTok: verify the domain in the ad account if it asks.' },
  { key: 'partner', text: 'Partnership and Spark permissions', how: "Each wave-1 creator turns on partnership ads (Instagram) or creates a 60-day Spark code (TikTok) and sends it to you. No code, no ad." },
  { key: 'consent', text: 'No pixel before the consent banner', how: 'Do not install a Meta, TikTok or Google pixel, and build no retargeting audience, until the consent banner is live (target about 6 Dec). Until then every ad is judged on /go/ sales.' },
];

export default function Ads({ params }: RouteProps) {
  const openId = params[0]?.toUpperCase();
  const [log] = useSpendLog();
  const [checks, setChecks] = useChecks();
  const today = sarajevoToday();
  const week = Math.max(1, Math.min(13, planWeek(today)));
  const spent = log.reduce((s, e) => s + e.usd, 0);
  const plannedNow = ADS.adCalendar.find((w) => w.week === week)?.runningTotalUsd ?? 0;
  const onAds = ADS.adCalendar.reduce((s, w) => s + w.adSpendUsd, 0);

  useEffect(() => {
    if (!openId) return;
    const raf = requestAnimationFrame(() => document.getElementById(`ad-${openId}`)?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(raf);
  }, [openId]);

  return (
    <Page
      eyebrow={`${CARDS.length} ad cards · ${fmtUsd(onAds)} of the $1,000 is ads · the rest is creators and listings`}
      title={
        <>
          Every ad, <em>step by step</em>
        </>
      }
      lede="Open a card when its day comes. It tells you when to launch, what to click, how much to spend, who sees it, the exact words and link, and when to stop."
    >
      <section className="card moneybar" aria-labelledby="money-h">
        <div className="row-between">
          <h2 id="money-h" className="kicker" style={{ margin: 0 }}>
            The $1,000
          </h2>
          <a className="small" href={href('library', 'budget')}>
            Spend log
          </a>
        </div>
        <div className="money-figures">
          <div>
            <span className="money-big num">{fmtUsd(spent)}</span>
            <span className="small muted">spent (your spend log)</span>
          </div>
          <div>
            <span className="money-big num muted">{fmtUsd(plannedNow)}</span>
            <span className="small muted">planned by the end of week {week}</span>
          </div>
          <div>
            <span className="money-big num muted">{fmtUsd(TOTAL - spent)}</span>
            <span className="small muted">left</span>
          </div>
        </div>
        <div className="mbar" role="img" aria-label={`Spent ${fmtUsd(spent)} of $1,000; planned by the end of week ${week}: ${fmtUsd(plannedNow)}`}>
          <span className="mbar-plan" style={{ width: `${(plannedNow / TOTAL) * 100}%` }} />
          <span className={`mbar-spent ${spent > plannedNow * 1.15 + 1 ? 'is-over' : ''}`} style={{ width: `${Math.min(100, (spent / TOTAL) * 100)}%` }} />
        </div>
        <ol className="wkstrip" aria-label="Planned running total by week">
          {ADS.adCalendar.map((w) => (
            <li key={w.week} className={w.week === week ? 'is-now' : w.adSpendUsd > 0 ? 'is-ad' : ''} title={w.summary}>
              <span className="tiny muted">W{w.week}</span>
              <span className="num">{fmtUsd(w.runningTotalUsd)}</span>
            </li>
          ))}
        </ol>
        <p className="tiny muted" style={{ margin: 0 }}>
          Solid bar: spent. Faint bar: planned so far (ads.json adCalendar). Coloured weeks have an ad; the highlighted week is now. Ads A04-A07 are paid from revenue and are not in this bar.
        </p>
      </section>

      <section className="section" aria-labelledby="pre-h">
        <div className="section-head">
          <div>
            <p className="kicker">Before the first ad (by Mon 9 Nov)</p>
            <h2 id="pre-h">Pre-flight</h2>
          </div>
          <span className="small muted">
            {PREFLIGHT.filter((p) => checks[`ads-pre:${p.key}`]).length}/{PREFLIGHT.length} done
          </span>
        </div>
        <ul className="ticklist card card-flat">
          {PREFLIGHT.map((p) => (
            <TickItem key={p.key} checked={!!checks[`ads-pre:${p.key}`]} onToggle={() => setChecks((c) => ({ ...c, [`ads-pre:${p.key}`]: !c[`ads-pre:${p.key}`] }))} text={p.text} label={p.text} how={<p className="small">{p.how}</p>} />
          ))}
        </ul>
        <p className="notice small" style={{ marginTop: 12 }}>
          <b>If Bosnia billing does not work</b>
          <span>By Mon 9 Nov: run both slots on whichever of Meta or TikTok does bill; if neither does, the $200 goes to rehiring the best creator. Never use someone else's account.</span>
        </p>
        <Details summary="Rules for every ad">
          <dl className="kv small">
            <dt>Money gate</dt>
            <dd>{ADS.sharedRules.spendGate}</dd>
            <dt>Which posts</dt>
            <dd>{ADS.sharedRules.creativeGate}</dd>
            <dt>Links</dt>
            <dd>{ADS.sharedRules.links}</dd>
            <dt>Words</dt>
            <dd>{ADS.sharedRules.copyRules}</dd>
            <dt>Stop and scale</dt>
            <dd>{ADS.sharedRules.killScaleShared}</dd>
            <dt>No ads</dt>
            <dd>{ADS.meta.blackout}</dd>
          </dl>
        </Details>
      </section>

      <section className="section" aria-labelledby="cards-h">
        <div className="section-head">
          <div>
            <p className="kicker">In the order you run them · tap to open</p>
            <h2 id="cards-h">The ad cards</h2>
          </div>
        </div>
        <div className="cards">
          {CARDS.map((c) => (
            <AdCardView key={c.id} c={c} open={openId === c.id} />
          ))}
        </div>
      </section>
    </Page>
  );
}

function money(c: AdCard) {
  const b = c.budget;
  if (typeof b.perDayUsd === 'number' && typeof b.days === 'number') return `${fmtUsd(b.perDayUsd)}/day × ${b.days} days = ${fmtUsd(b.perDayUsd * b.days)}`;
  return `${typeof b.perDayUsd === 'number' ? `${fmtUsd(b.perDayUsd)}/day` : b.perDayUsd}${b.days ? ` × ${b.days} days` : ''}, total ${typeof b.totalUsd === 'number' ? fmtUsd(b.totalUsd) : b.totalUsd}`;
}
const totalShort = (c: AdCard) => (typeof c.budget.totalUsd === 'number' ? fmtUsd(c.budget.totalUsd) : String(c.budget.totalUsd).replace(/^up to /, '≤ $').replace(/^about /, '~'));

function Block({ n, title, children }: { n: number; title: ReactNode; children: ReactNode }) {
  return (
    <section className="adblock">
      <h3>
        <span className="adblock-n num" aria-hidden="true">
          {n}
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function AdCardView({ c, open }: { c: AdCard; open: boolean }) {
  const parts = c.summary.split(' · ');
  const when = parts[1] ?? c.earliestDate;
  const audience = parts.slice(4).join(' · ') || c.audience.setting;
  const platformShort = c.platform.replace(/\s*\(.*\)$/, '');
  const creativeIds = [...ids(c.creative.contentId), ...ids(c.creative.fallbackContentId)];
  const nameEntries = Object.entries(c.names);
  const NAME_LABEL: Record<string, string> = { campaign: 'Campaign name', adSet: 'Ad set name', adGroup: 'Ad group name', ad: 'Ad name' };
  return (
    <details className={`adcard ${c.inThe1000 ? '' : 'is-revenue'}`} id={`ad-${c.id}`} open={open}>
      <summary>
        <span className="item-id">{c.id}</span>
        <span className="adline">
          <b className="adline-title">{c.title}</b>
          <span className="adline-meta">
            <span>{when}</span>
            <span className="num">{totalShort(c)}</span>
            <span>{platformShort}</span>
            <span className="adline-aud">{audience}</span>
          </span>
        </span>
        {!c.inThe1000 && <span className="chip chip-owner">from revenue, not the $1,000</span>}
      </summary>
      <div className="adcard-body">
        <Block n={1} title="When to launch it">
          <p>{c.statusTrigger}</p>
          <p className="small">
            <b>Earliest:</b> {short(c.earliestDate)} · <b>Must end by:</b> {c.mustEndBy}
          </p>
          <Details summary={`Check before you press Publish (${c.checksBeforeLaunch.length})`}>
            <Steps items={c.checksBeforeLaunch} ordered={false} />
          </Details>
          <p className="small muted">
            <b>If the platform cannot bill from Bosnia:</b> {c.fallbackIfNotAvailableFromBiH}
          </p>
          <h4>Click by click</h4>
          <Steps items={c.toolPath.map((s) => s.replace(/->/g, '›'))} />
          <dl className="kv small">
            <dt>Goal in the ad tool</dt>
            <dd>{c.objective}</dd>
            <dt>Optimise for</dt>
            <dd>{c.optimization}</dd>
            <dt>Bidding</dt>
            <dd>{c.bidStrategy}</dd>
            <dt>How we judge it</dt>
            <dd>{c.attribution}</dd>
          </dl>
        </Block>

        <Block n={2} title="Budget">
          <p className="adbig num">{money(c)}</p>
          <p className="small">
            <b>From:</b> {c.inThe1000 ? `budget line ${c.budget.budgetLine}${lineName(c.budget.budgetLine.split(' ')[0]) ? ` (${lineName(c.budget.budgetLine.split(' ')[0])})` : ''}` : 'revenue, not the $1,000 (owner decision D4: 30% of last week\'s new cash at most)'}. {c.budget.note}
          </p>
        </Block>

        <Block n={3} title="Who sees it">
          <dl className="kv small">
            <dt>Countries ({c.countries.length})</dt>
            <dd>{c.countries.map((x) => x.name).join(', ')}</dd>
            <dt>Age</dt>
            <dd>{c.age}</dd>
            <dt>Gender</dt>
            <dd>{c.gender}</dd>
            <dt>Language</dt>
            <dd>{c.languages.join(', ') || 'Any'}</dd>
            <dt>Audience</dt>
            <dd>
              {c.audience.setting}
              {c.audience.suggestions.length > 0 && <> · suggestions: {c.audience.suggestions.join(', ')}</>}
            </dd>
            <dt>Leave out</dt>
            <dd>{c.audience.exclusions}</dd>
            <dt>Show it in</dt>
            <dd>{c.placements.on.join(', ')}</dd>
            {c.placements.off.length > 0 && (
              <>
                <dt>Turn off</dt>
                <dd>{c.placements.off.join(', ')}</dd>
              </>
            )}
          </dl>
        </Block>

        <Block n={4} title="The ad itself">
          <p>
            <b>Use:</b> {c.creative.contentId}
            {c.creative.fallbackContentId && c.creative.fallbackContentId !== 'none' && (
              <>
                <br />
                <b>Fallback:</b> {c.creative.fallbackContentId}
              </>
            )}
          </p>
          {creativeIds.length > 0 && (
            <p className="row">
              {creativeIds.map((id) => (
                <a key={id} className="btn btn-sm btn-ghost" href={contentHref(id)}>
                  Open {id}
                </a>
              ))}
            </p>
          )}
          <p className="small">
            <b>File:</b> {c.creative.file}
          </p>
          <p className="small">
            <b>Must show:</b> {c.creative.mustShow}
          </p>
          <CopyField label="Primary text" text={c.copy.primaryText} />
          <CopyField label="Headline" text={c.copy.headline} />
          <CopyField label="Button" text={c.copy.ctaButton} />
        </Block>

        <Block n={5} title="Link and names">
          <CopyField label="Link" text={c.link.url} mono copyLabel={`Copy the ${c.id} link`} />
          <p className="tiny muted">Leave the platform's URL-parameter field empty: the /go/ link adds the tags. It redirects with {c.link.redirectsWith}.</p>
          {c.link.fallbackUrl && <CopyField label="Fallback link" text={c.link.fallbackUrl} mono copyLabel={`Copy the ${c.id} fallback link`} />}
          {c.link.creatorPostUrl && <p className="small">For a creator's post: {c.link.creatorPostUrl}</p>}
          {nameEntries.map(([k, v]) => (
            <CopyField key={k} label={NAME_LABEL[k] ?? k} text={v} mono copyLabel={`Copy the ${c.id} ${(NAME_LABEL[k] ?? k).toLowerCase()}`} />
          ))}
        </Block>

        <Block n={6} title="After 48 hours">
          <h4>Good looks like</h4>
          <Steps items={c.goodAfter48h} ordered={false} />
          <h4 className="stop">STOP if</h4>
          <Steps items={c.kill.map((k) => k.replace(/->/g, '→'))} ordered={false} />
          <h4 className="scale">SCALE if</h4>
          <Steps items={c.scale} ordered={false} />
          <p className="tiny muted">
            <Term t="CPM">CPM</Term>: cost per 1,000 views · <Term t="CTR">CTR</Term>: click rate · <Term t="CPC">CPC</Term>: cost per click · <Term t="CAC">CAC</Term>: cost per paying customer.
          </p>
        </Block>

        <Block n={7} title="What to log">
          <Steps items={c.warRoomLog} ordered={false} />
          {c.inThe1000 ? <LogSpend c={c} /> : <p className="small">Revenue-paid: log the spend on <a href={href('results')}>Results</a> (channel ch-boosts, budget line "revenue"), not in the $1,000 spend log.</p>}
        </Block>
      </div>
    </details>
  );
}

function LogSpend({ c }: { c: AdCard }) {
  const [, setLog] = useSpendLog();
  const [date, setDate] = useState(sarajevoToday());
  const [usd, setUsd] = useState('');
  const [msg, setMsg] = useState('');
  const line = c.budget.budgetLine.split(' ')[0];
  return (
    <form
      className="logspend"
      aria-label={`Log spend for ${c.id}`}
      onSubmit={(e) => {
        e.preventDefault();
        const n = Number(usd);
        if (!isIsoDate(date) || !(n > 0)) {
          setMsg('Add a date and an amount above $0.');
          return;
        }
        setLog((l) => [...l, { id: uid(), date, lineId: line, usd: n, note: `${c.id} ${c.platform.split(' ')[0]}` }].sort((a, b) => a.date.localeCompare(b.date)));
        setUsd('');
        setMsg(`Logged ${fmtUsd(n, true)} on ${line} for ${c.id}.`);
      }}
    >
      <label>
        <span className="tiny muted">Day</span>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label>
        <span className="tiny muted">Spent ($)</span>
        <input type="number" min={0} step="0.01" inputMode="decimal" value={usd} onChange={(e) => setUsd(e.target.value)} placeholder="24.00" />
      </label>
      <button type="submit" className="btn btn-accent">
        Log spend
      </button>
      <span className="small muted" role="status" aria-live="polite">
        {msg}
      </span>
    </form>
  );
}

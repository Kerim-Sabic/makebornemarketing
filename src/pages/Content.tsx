import { useMemo, useState } from 'react';
import calendarJson from '../../data/calendar.json';
import { CREATIVES, VIDEOS, contentById } from '../lib/content';
import type { CalendarDay, Creative, Video } from '../lib/types';
import { STATUSES, STATUS_LABEL, useContentStatus, type Status } from '../lib/stores';
import { BEAT_LABELS, fmtDate, normTag } from '../lib/util';
import { BeatTag, Card, Chip, CopyButton, Empty, Page, Segmented, Sheet } from '../components/ui';
import { href, type RouteProps } from '../routes';

const CAL = calendarJson as unknown as CalendarDay[];
const scheduleOf = (id: string) => CAL.flatMap((d) => d.posts.filter((p) => p.contentId === id).map((p) => ({ date: d.date, day: d.day, channel: p.channel, slot: p.slot, link: p.link })));
const uniq = <T,>(xs: T[]) => [...new Set(xs)];
const goUrl = (l: string) => `https://${l.replace(/^https?:\/\//, '')}`;

function scriptText(v: Video) {
  const lines = [`${v.id} · ${v.title} (${v.lengthSec}s, ${v.format})`, '', `HOOK: ${v.hook.line}`, `Hook visual: ${v.hook.visual}`, ''];
  for (const b of v.script) {
    lines.push(`[${b.t}]`, `Visual: ${b.visual}`, `On screen: ${b.onScreenText}`, `Voiceover: ${b.voiceover}`, '');
  }
  lines.push(`CTA: ${v.cta}`, '', `Caption: ${v.caption}`, v.hashtags.join(' '));
  return lines.join('\n');
}

type Kind = 'videos' | 'creatives';

/** Library > Videos (kind "videos") and Library > Images (kind "creatives"); params[0] opens one item. */
export default function Content({ params, kind: fixedKind }: RouteProps & { kind?: Kind }) {
  const openId = params[0];
  const [kindState, setKindState] = useState<Kind>(() => (openId?.startsWith('C') ? 'creatives' : 'videos'));
  const kind = fixedKind ?? kindState;
  const setKind = (k: Kind) => (fixedKind ? (window.location.hash = href('library', k === 'videos' ? 'videos' : 'images')) : setKindState(k));
  const [status, setStatus] = useContentStatus();
  const [q, setQ] = useState('');
  const [f, setF] = useState({ format: '', platform: '', priority: '', week: '', tag: '', status: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const st = (id: string): Status => status[id] ?? 'todo';
  const setSt = (id: string, s: Status) => setStatus((m) => ({ ...m, [id]: s }));

  const videos = useMemo(
    () =>
      VIDEOS.filter((v) => {
        if (f.format && v.format !== f.format) return false;
        if (f.platform && !v.platforms.includes(f.platform)) return false;
        if (f.priority && v.priority !== f.priority) return false;
        if (f.week && String(v.week) !== f.week) return false;
        if (f.tag && (f.tag === 'beat' ? normTag(v.tag) === 'live' : normTag(v.tag) !== f.tag)) return false;
        if (f.status && st(v.id) !== f.status) return false;
        if (q && !`${v.id} ${v.title} ${v.hook.line} ${v.caption}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f, q, status],
  );
  const creatives = useMemo(
    () =>
      CREATIVES.filter((c) => {
        if (f.format && c.type !== f.format) return false;
        if (f.platform && !c.platform.includes(f.platform)) return false;
        if (f.priority && String(c.priority) !== f.priority) return false;
        if (f.week && String(c.week) !== f.week) return false;
        if (f.tag && (f.tag === 'beat' ? normTag(c.tag) === 'live' : normTag(c.tag) !== f.tag)) return false;
        if (f.status && st(c.id) !== f.status) return false;
        if (q && !`${c.id} ${c.concept} ${c.headline} ${c.subcopy}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f, q, status],
  );

  const isV = kind === 'videos';
  const formats = isV ? uniq(VIDEOS.map((v) => v.format)) : uniq(CREATIVES.map((c) => c.type));
  const platforms = isV ? uniq(VIDEOS.flatMap((v) => v.platforms)) : ['Meta', 'Instagram', 'LinkedIn', 'X', 'TikTok', 'YouTube', 'Product Hunt', 'Indie Hackers'];
  const priorities = isV ? uniq(VIDEOS.map((v) => v.priority)).sort() : uniq(CREATIVES.map((c) => String(c.priority))).sort();
  const weeks = uniq((isV ? VIDEOS : CREATIVES).map((x) => x.week)).sort((a, b) => a - b);
  const tags = uniq([...VIDEOS, ...CREATIVES].map((x) => normTag(x.tag)));
  const list = isV ? videos : creatives;
  const counts = STATUSES.map((s) => [s, (isV ? VIDEOS : CREATIVES).filter((x) => st(x.id) === s).length] as const);
  const open = contentById(openId);

  return (
    <Page
      eyebrow={`Library · ${VIDEOS.length} videos · ${CREATIVES.length} images · plan only, nothing posted`}
      title={kind === 'videos' ? <>Every <em>video</em></> : <>Every <em>image</em></>}
      lede={kind === 'videos' ? 'Every script, hook, caption and shot list. Tap a video for the full sheet. Items marked as a beat wait until that feature is live. Status is saved in this browser.' : 'Every static, carousel and story: the exact words, the layout and the ad variants. Tap one for the full sheet. Status is saved in this browser.'}
    >
      <div className="row-between" style={{ marginBottom: 18 }}>
        <Segmented
          label="Library"
          value={kind}
          onChange={(k) => {
            setKind(k);
            setF({ format: '', platform: '', priority: '', week: '', tag: '', status: '' });
          }}
          options={[
            { value: 'videos', label: `Videos · ${VIDEOS.length}` },
            { value: 'creatives', label: `Images · ${CREATIVES.length}` },
          ]}
        />
        <div className="row small muted">
          {counts.map(([s, n]) => (
            <span key={s} className={`status-${s}`}>
              {STATUS_LABEL[s]} <b className="num">{n}</b>
            </span>
          ))}
        </div>
      </div>

      <div className="filters" role="search">
        <div className="field grow">
          <label htmlFor="c-q">Search</label>
          <input id="c-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={isV ? 'Title, hook, caption…' : 'Concept, headline…'} />
        </div>
        <Sel id="c-format" label={isV ? 'Format' : 'Type'} value={f.format} onChange={set('format')} options={formats} />
        <Sel id="c-platform" label="Platform" value={f.platform} onChange={set('platform')} options={platforms} />
        <Sel id="c-priority" label="Priority" value={f.priority} onChange={set('priority')} options={priorities} />
        <Sel id="c-week" label="Week" value={f.week} onChange={set('week')} options={weeks.map(String)} fmt={(w) => `Week ${w}`} />
        <Sel id="c-tag" label="Live or beat" value={f.tag} onChange={set('tag')} options={['live', 'beat', ...tags.filter((t) => t !== 'live')]} fmt={(t) => (t === 'beat' ? 'Any beat (not live)' : BEAT_LABELS[t] ?? t)} />
        <Sel id="c-status" label="Status" value={f.status} onChange={set('status')} options={[...STATUSES]} fmt={(s) => STATUS_LABEL[s as Status]} />
      </div>
      <p className="small muted" aria-live="polite">
        Showing {list.length} of {isV ? VIDEOS.length : CREATIVES.length}
      </p>

      {list.length === 0 ? (
        <Empty>Nothing matches these filters.</Empty>
      ) : (
        <ul className="items" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {isV
            ? videos.map((v) => <VideoCard key={v.id} v={v} status={st(v.id)} onStatus={(s) => setSt(v.id, s)} />)
            : creatives.map((c) => <CreativeCard key={c.id} c={c} status={st(c.id)} onStatus={(s) => setSt(c.id, s)} />)}
        </ul>
      )}

      <Sheet open={!!open} onClose={() => (window.location.hash = href('library', isV ? 'videos' : 'images'))} wide title={open ? `${open.item.id} · ${open.kind === 'video' ? open.item.title : open.item.concept}` : ''}>
        {open?.kind === 'video' && <VideoDetail v={open.item} status={st(open.item.id)} onStatus={(s) => setSt(open.item.id, s)} />}
        {open?.kind === 'creative' && <CreativeDetail c={open.item} status={st(open.item.id)} onStatus={(s) => setSt(open.item.id, s)} />}
      </Sheet>
    </Page>
  );
}

function Sel(props: { id: string; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[]; fmt?: (v: string) => string }) {
  return (
    <div className="field">
      <label htmlFor={props.id}>{props.label}</label>
      <select id={props.id} value={props.value} onChange={props.onChange}>
        <option value="">All</option>
        {props.options.map((o) => (
          <option key={o} value={o}>
            {props.fmt ? props.fmt(o) : o}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatusSelect({ id, status, onStatus }: { id: string; status: Status; onStatus: (s: Status) => void }) {
  return (
    <select className={`status-select status-${status}`} aria-label={`Status of ${id}`} value={status} onChange={(e) => onStatus(e.target.value as Status)} onClick={(e) => e.stopPropagation()}>
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}

function VideoCard({ v, status, onStatus }: { v: Video; status: Status; onStatus: (s: Status) => void }) {
  return (
    <li className="card item">
      <div className="row-between">
        <span className="item-id">
          {v.id} · {v.priority} · wk {v.week}
        </span>
        <StatusSelect id={v.id} status={status} onStatus={onStatus} />
      </div>
      <a href={href('content', v.id)} className="item-title" style={{ textDecoration: 'none' }}>
        {v.title}
      </a>
      <p className="item-hook" style={{ margin: 0 }}>
        “{v.hook.line}”
      </p>
      <div className="row" style={{ marginTop: 'auto' }}>
        <BeatTag tag={v.tag} />
        <Chip>{v.format}</Chip>
        <Chip tone="muted">{v.lengthSec}s</Chip>
        <span className="tiny muted">{v.platforms.join(' · ')}</span>
      </div>
    </li>
  );
}

function CreativeCard({ c, status, onStatus }: { c: Creative; status: Status; onStatus: (s: Status) => void }) {
  return (
    <li className="card item">
      <div className="row-between">
        <span className="item-id">
          {c.id} · P{c.priority} · wk {c.week}
        </span>
        <StatusSelect id={c.id} status={status} onStatus={onStatus} />
      </div>
      <a href={href('content', c.id)} className="item-title" style={{ textDecoration: 'none' }}>
        {c.concept}
      </a>
      <p className="item-hook" style={{ margin: 0 }}>
        {c.headline}
      </p>
      <div className="row" style={{ marginTop: 'auto' }}>
        <BeatTag tag={c.tag} />
        <Chip>{c.type}</Chip>
        <Chip tone="muted">{c.size}</Chip>
        <span className="tiny muted">{c.platform}</span>
      </div>
    </li>
  );
}

function Block({ title, text, mono, children }: { title: string; text?: string; mono?: boolean; children?: React.ReactNode }) {
  return (
    <div className="copyblock">
      <div className="copyblock-head">
        <h4>{title}</h4>
        {text && <CopyButton text={text} ariaLabel={`Copy ${title.split(' · ')[0].toLowerCase()}`} />}
      </div>
      {children ?? (text ? <pre className={`copytext ${mono ? 'prompt' : ''}`}>{text}</pre> : null)}
    </div>
  );
}

function Schedule({ id }: { id: string }) {
  const s = scheduleOf(id);
  if (!s.length) return <p className="small muted">Not on the 90-day calendar.</p>;
  return (
    <ul className="list small">
      {s.map((x, i) => (
        <li key={i} className="row-between">
          <a href={href('calendar', x.date)}>
            Day {x.day} · {fmtDate(x.date)}
          </a>
          <span className="muted">
            {x.channel}
            {x.slot !== 'original' ? ` · ${x.slot}` : ''}
          </span>
        </li>
      ))}
    </ul>
  );
}

function VideoDetail({ v, status, onStatus }: { v: Video; status: Status; onStatus: (s: Status) => void }) {
  return (
    <>
      <div className="row-between">
        <div className="row">
          <BeatTag tag={v.tag} />
          <Chip>{v.format}</Chip>
          <Chip tone="muted">{v.lengthSec}s</Chip>
          <Chip tone="muted">{v.priority}</Chip>
          <Chip tone="muted">Week {v.week}</Chip>
          <Chip tone="muted">ICP {v.icp} · lane {v.lane}</Chip>
          <Chip tone="muted">Effort {v.effort}</Chip>
          <Chip tone="muted">Hook {v.hookCode}</Chip>
        </div>
        <StatusSelect id={v.id} status={status} onStatus={onStatus} />
      </div>
      {normTag(v.tag) !== 'live' && (
        <div className="notice">
          <b>Beat item.</b>
          <span>Do not film for publication or post until {BEAT_LABELS[normTag(v.tag)]?.replace('Beat: ', '')} passes the six-box gate.</span>
        </div>
      )}
      <Block title="Hook" text={v.hook.line}>
        <p className="quote" style={{ fontSize: 24 }}>
          “{v.hook.line}”
        </p>
        <p className="small muted">{v.hook.visual}</p>
      </Block>
      <Block title="Script" text={scriptText(v)}>
        <div className="script">
          {v.script.map((b, i) => (
            <div className="script-row" key={i}>
              <div className="script-t num">{b.t}</div>
              <div className="script-body">
                <div className="ost">{b.onScreenText}</div>
                {b.voiceover && b.voiceover !== 'None' && <div className="vo">{b.voiceover}</div>}
                <div className="vis">{b.visual}</div>
              </div>
            </div>
          ))}
        </div>
      </Block>
      <div className="grid-2" style={{ alignItems: 'start' }}>
        <Block title="Caption" text={`${v.caption}\n\n${v.hashtags.join(' ')}`} />
        <Block title="CTA" text={v.cta} />
      </div>
      <div className="grid-2">
        <Card className="card-flat">
          <h4>Shot list</h4>
          <ul className="bullets small">
            {v.shotList.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <h4 style={{ marginTop: 12 }}>Assets needed</h4>
          <ul className="bullets small">
            {v.assetsNeeded.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>
        <Card className="card-flat">
          <h4>Pre-post checks</h4>
          <ul className="bullets small">
            {v.checks.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <h4 style={{ marginTop: 12 }}>Sound</h4>
          <p className="small">{v.sound}</p>
        </Card>
      </div>
      {v.reuseExisting.length > 0 && (
        <Card className="card-flat">
          <h4>Reuse existing assets (read only)</h4>
          <ul className="bullets small">
            {v.reuseExisting.map((s) => (
              <li key={s}>
                <span className="code">{s}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
      <Card className="card-flat">
        <h4>Why it works</h4>
        <p className="small" style={{ margin: 0 }}>
          {v.whyItWorks}
        </p>
      </Card>
      <div className="grid-2">
        <Card className="card-flat">
          <h4>/go/ links</h4>
          <ul className="list small">
            {v.goLinks.map((l) => (
              <li key={l} className="row-between">
                <span className="code">{l}</span>
                <CopyButton text={goUrl(l)} ariaLabel={`Copy ${l.split('/go/')[1] ?? l} link`} />
              </li>
            ))}
          </ul>
          <p className="tiny muted">
            UTM: {Object.entries(v.utm).map(([k, x]) => `${k}=${x}`).join(' · ')}
            {v.budgetLine ? ` · budget ${v.budgetLine}` : ''}
          </p>
        </Card>
        <Card className="card-flat">
          <h4>On the calendar</h4>
          <Schedule id={v.id} />
        </Card>
      </div>
    </>
  );
}

function CreativeDetail({ c, status, onStatus }: { c: Creative; status: Status; onStatus: (s: Status) => void }) {
  return (
    <>
      <div className="row-between">
        <div className="row">
          <BeatTag tag={c.tag} />
          <Chip>{c.type}</Chip>
          <Chip tone="muted">{c.size}</Chip>
          <Chip tone="muted">P{c.priority}</Chip>
          <Chip tone="muted">Week {c.week}</Chip>
          <Chip tone="muted">{c.icp}</Chip>
          <Chip tone="muted">Use as {c.useAs}</Chip>
        </div>
        <StatusSelect id={c.id} status={status} onStatus={onStatus} />
      </div>
      <p className="small muted" style={{ margin: 0 }}>
        {c.platform} · {c.channel}
        {c.weekNote ? ` · ${c.weekNote}` : ''}
      </p>
      {c.prerequisites.length > 0 && (
        <div className="notice">
          <b>Before use.</b>
          <span>{c.prerequisites.join(' · ')}</span>
        </div>
      )}
      <div className="grid-2">
        <Block title="Headline" text={c.headline}>
          <p className="quote" style={{ fontSize: 24 }}>
            {c.headline}
          </p>
        </Block>
        <div className="stack">
          <Block title="Subcopy" text={c.subcopy} />
          <Block title="CTA" text={c.cta} />
        </div>
      </div>
      {c.slides.length > 0 && (
        <Block title={`Slides · ${c.slides.length}`} text={c.slides.map((s) => `${s.n}. ${s.text}`).join('\n')}>
          <div className="script">
            {c.slides.map((s) => (
              <div className="script-row" key={s.n}>
                <div className="script-t num">{s.n}</div>
                <div className="script-body">
                  <div className="ost">{s.text}</div>
                  <div className="vis">{s.visual}</div>
                </div>
              </div>
            ))}
          </div>
        </Block>
      )}
      <Block title="Visual direction" text={c.visualDirection} />
      <Block title="Generation prompt" text={c.generationPrompt} mono />
      {c.adCopyVariants.length > 0 && (
        <div className="copyblock">
          <h4>Ad copy variants</h4>
          <div className="grid-3">
            {c.adCopyVariants.map((a, i) => (
              <Card key={i} className="card-flat">
                <div className="row-between">
                  <b className="small">{a.headline}</b>
                  <CopyButton text={`${a.primary}\n\nHeadline: ${a.headline}`} ariaLabel={`Copy ad variant ${i + 1}`} />
                </div>
                <p className="small" style={{ marginTop: 6 }}>
                  {a.primary}
                </p>
                <p className="tiny muted" style={{ margin: 0 }}>
                  {a.primaryChars} / {a.headlineChars} characters
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}
      <div className="grid-2">
        <Card className="card-flat">
          <h4>Tracking</h4>
          <div className="row-between">
            <span className="code">{c.goLink}</span>
            <CopyButton text={goUrl(c.goLink)} ariaLabel={`Copy ${c.goLink.split('/go/')[1] ?? c.goLink} link`} />
          </div>
          <p className="tiny muted" style={{ marginTop: 8 }}>
            utm_content {c.utmContent} · hook {c.hookCode} · budget {c.budgetLine || '–'}
            {c.beatId ? ` · ${c.beatId}` : ''}
          </p>
        </Card>
        <Card className="card-flat">
          <h4>On the calendar</h4>
          <Schedule id={c.id} />
        </Card>
      </div>
    </>
  );
}


import * as productionModule from 'virtual:war-room/production-simple';
import type { ProductionSimple } from '../lib/types';
import { docBySlug } from '../lib/docs';
import { planWeek, sarajevoToday } from '../lib/util';
import { Card, Details } from '../components/ui';
import { DocView } from './Research';
import { href } from '../routes';

const SIMPLE = productionModule.SIMPLE as ProductionSimple;
const COUNTS = productionModule.COUNTS as Record<string, number>;
const contentHref = (id: string) => href('library', /^C/.test(id) ? 'images' : 'videos', id);

/** Library > Production: the one-screen "how we make videos" first, this week's make-list, then every per-video sheet (content/production.md). */
export default function Production() {
  const doc = docBySlug('production');
  const week = Math.max(1, Math.min(13, planWeek(sarajevoToday())));
  const h = SIMPLE.howWeMakeVideos;
  const intro = (
    <div className="prod-simple">
      <h2 className="display" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
        How we make <em>videos</em>
      </h2>
      <p className="lede">{h.intro}</p>
      <div className="grid-3" style={{ marginTop: 20 }}>
        {h.ways.map((w) => (
          <Card key={w.name}>
            <p className="kicker">{w.share}</p>
            <h3 style={{ fontSize: 17 }}>{w.name}</h3>
            <p className="small muted">{w.covers}</p>
            <ol className="steps">
              {w.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="small">
              <b>Time:</b> {w.time}
            </p>
          </Card>
        ))}
      </div>
      <p className="small" style={{ marginTop: 14 }}>
        {h.everythingElse}
      </p>
      <ul className="rules">
        {h.rules.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <h2 style={{ marginTop: 36 }}>What to make, week by week</h2>
      <p className="small muted">
        {COUNTS.videos} videos and {COUNTS.creatives} images in the plan. Each day's list is also on Today.
      </p>
      <div className="cards">
        {SIMPLE.weeks.map((w) => (
          <Details key={w.week} open={w.week === week} summary={<>Week {w.week} · {w.dates.replace(/2026-|2027-/g, '').replace(' to ', ' to ')}{w.week === week ? ' · this week' : ''}</>}>
            {w.note && <p className="small muted">{w.note}</p>}
            <ul className="bullets">
              {w.items.map((i) => (
                <li key={i.text}>
                  {i.text}
                  {i.ids.length > 0 && (
                    <span className="row" style={{ marginTop: 4 }}>
                      {i.ids.map((id) => (
                        <a key={id} className="chip chip-muted" href={contentHref(id)} style={{ textDecoration: 'none' }}>
                          {id}
                        </a>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Details>
        ))}
      </div>
      <h2 style={{ marginTop: 36 }}>Every sheet, in full</h2>
      <p className="small muted">The full production plan (content/production.md): the tools, templates, per-video and per-image sheets, naming and the quality bar.</p>
    </div>
  );
  if (!doc) return <div className="page">{intro}</div>;
  return <DocView doc={doc} back={{ href: href('library'), label: 'Library' }} before={intro} />;
}

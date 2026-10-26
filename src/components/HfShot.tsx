import type { HfShotCard } from '../lib/types';
import { CopyField } from './Checklist';

const n = (x: number) => x.toLocaleString('en-US', { maximumFractionDigits: 1 });

/** One Higgsfield shot (Library › Production and Today's "How" panel): the settings, then the prompt and the negative with
 *  copy buttons, the keep rule and, when given, the seed guidance, label and fallback. */
export function HfShotBody({ s, extra }: { s: HfShotCard; extra?: { generateOn?: string; seed?: string; label?: string; fallback?: string | null } }) {
  return (
    <div className="hf-shot">
      <dl className="kv">
        <dt>For</dt>
        <dd>{s.for.join(', ')}</dd>
        {extra?.generateOn && (
          <>
            <dt>Make on</dt>
            <dd>
              {extra.generateOn}
              {s.gate ? ` · only if ${s.gate}` : ''}
            </dd>
          </>
        )}
        <dt>Model</dt>
        <dd>
          {s.model} · {s.mode}
        </dd>
        <dt>Camera preset</dt>
        <dd>{s.cameraPreset}</dd>
        <dt>Length, size</dt>
        <dd>
          {s.durationSec} s · {s.aspect} · {s.resolution} · no audio
        </dd>
        <dt>Takes, credits</dt>
        <dd>
          {s.takes} takes at most · {n(s.credits)} credits
        </dd>
        {s.referenceImage && (
          <>
            <dt>Start frame</dt>
            <dd>{s.referenceImage}</dd>
          </>
        )}
      </dl>
      <CopyField label="Prompt" text={s.prompt} copyLabel={`Copy prompt ${s.id}`} />
      <CopyField label="Negative" text={s.negative} copyLabel={`Copy negative ${s.id}`} />
      <p className="small">
        <b>Keep rule:</b> {s.keepRule}
      </p>
      {extra?.seed && (
        <p className="small muted">
          <b>Seed:</b> {extra.seed}
        </p>
      )}
      {extra?.fallback && (
        <p className="small muted">
          <b>Fallback:</b> {extra.fallback}
        </p>
      )}
      {extra?.label && (
        <p className="small muted">
          <b>Label:</b> {extra.label}
        </p>
      )}
    </div>
  );
}

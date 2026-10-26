// Slim id -> title index of every video and creative (built by scripts/data-plugin.mjs).
// Pages that only show titles import this instead of the full videos.json and creatives.json.
import { CONTENT_INDEX, type ContentMeta } from 'virtual:war-room/content-index';

export type { ContentMeta };
export const contentMeta = (id: string | null | undefined): ContentMeta | undefined => (id ? CONTENT_INDEX[id] : undefined);
export const contentTitle = (id: string | null | undefined) => contentMeta(id)?.title ?? id ?? 'Unlinked post';
export const HOOK_CODES = Object.values(CONTENT_INDEX)
  .filter((c) => c.kind === 'video' && c.hookCode)
  .map((c) => c.hookCode!.toLowerCase());

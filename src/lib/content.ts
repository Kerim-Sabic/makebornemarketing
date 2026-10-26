import videosJson from '../../data/videos.json';
import creativesJson from '../../data/creatives.json';
import type { Creative, Video } from './types';

export const VIDEOS = videosJson as unknown as Video[];
export const CREATIVES = creativesJson as unknown as Creative[];

export type ContentItem = { kind: 'video'; item: Video } | { kind: 'creative'; item: Creative };

const index = new Map<string, ContentItem>();
VIDEOS.forEach((v) => index.set(v.id, { kind: 'video', item: v }));
CREATIVES.forEach((c) => index.set(c.id, { kind: 'creative', item: c }));

export const contentById = (id: string | null | undefined) => (id ? index.get(id) : undefined);
// Titles only? Import contentTitle from './contentIndex' instead: it does not pull the full JSON into the page.

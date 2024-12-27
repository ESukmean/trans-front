import { listSeenHistory } from '$lib/recentSeen';
import type { AriticleChapter, TitleWithChapterDto } from './+page.server.js';

export function load({ data }) {
  interface rawList {
    id: number,
    title: string,
    chapter_id: number,
    latest_chapter: string,
    modified: string
  }
  interface recentSeenItemType {
    chapter_id: number;
    id: number;
    title: string;
    latest_chapter: string;
    modified: string;
    has_update: boolean;
  }

  const original_list = data.list;

  const listObj: {[k: number]: AriticleChapter} = {}
  original_list.forEach((v) => listObj[v.id] = v)
  const seen_list: (recentSeenItemType | undefined)[]  = Object.values(listSeenHistory()).map(v => {
    if (!v) return undefined

    const target = listObj[v.titleNo]
    if (!target) return undefined

    const isUpdated = target.chapter_id != v.lastChapter
    return {
      id: v.titleNo,
      title: target.title,
      chapter_id: target.chapter_id,
      latest_chapter: target.latest_chapter,
      modified: target.modified,
      has_update: isUpdated
    }
  })
  
  const recent_seen_list: recentSeenItemType[] = seen_list.filter(v => v != undefined)

  return {
    list: original_list,
    recent_seen_list: recent_seen_list,
  };
}

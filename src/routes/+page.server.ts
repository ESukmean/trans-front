import { API_ADDRESS } from '$lib/ApiConfig.js'

interface TitleWithChapterDto {
  titleId: number; // Corresponds to Kotlin's Int? (nullable)
  titleName: string; // Corresponds to Kotlin's String? (nullable)
  modified: string | null; // LocalDateTime is typically serialized as an ISO 8601 string
  chapterId: number | null; // Corresponds to Kotlin's Int? (nullable)
  latestChapter: string | null; // Corresponds to Kotlin's String? (nullable)
}
interface AriticleChapter {
  id: number,
  title: string,
  chapter_id: number,
  latest_chapter: string,
  modified: string
}

export type { TitleWithChapterDto, AriticleChapter }
export async function load(event): Promise<{ list: AriticleChapter[]}> {
  const list: [TitleWithChapterDto] = await fetch(`${API_ADDRESS}/api/`).then(res => res.json());

  return {
    list: list.map(
      e => {
        return {
          id: e.titleId,
          title: e.titleName,
          chapter_id: e.chapterId,
          latest_chapter: e.latestChapter,
          modified: e.modified?.replace('T', ' ')
        }
      }
    )
  };
}

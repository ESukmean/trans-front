interface TitleWithChapterDto {
  titleId: number; // Corresponds to Kotlin's Int? (nullable)
  titleName: string; // Corresponds to Kotlin's String? (nullable)
  modified: string | null; // LocalDateTime is typically serialized as an ISO 8601 string
  chapterId: number | null; // Corresponds to Kotlin's Int? (nullable)
  latestChapter: string | null; // Corresponds to Kotlin's String? (nullable)
}


export async function load(event) {
  const list: [TitleWithChapterDto] = await fetch('http://trans-back.kr-2-ts.esukmean.com/api/').then(res => res.json());

  return {
    list: list.map(
      e => {
        return {
          id: e.titleId,
          title: e.titleName,
          chapter_id: e.chapterId,
          latest_chapter: e.latestChapter,
          modified: e.modified
        }
      }
    )
  };
}

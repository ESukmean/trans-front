export function load({ data }) {
  interface recentSeenItemType {
    chapter_id: number;
    id: number;
    title: string;
    latest_chapter: string;
    modified: string;
    has_update: boolean;
  }

  const original_list = data.list;
  const recent_seen_list: recentSeenItemType[] = data.list
    .filter((item) => item.title.includes("이세계"))
    .map((item) => {
      (item as recentSeenItemType)["has_update"] = item.title.includes("에");
      return item as recentSeenItemType;
    });

  return {
    list: original_list,
    recent_seen_list: recent_seen_list,
  };
}

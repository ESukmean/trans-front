import { browser } from "$app/environment";

interface SeenHistory {
    titleName: string,
    titleNo: number,
    lastChapter: number,
    datetime: number
}

function updateSeenHistory(titleName: string, titleNo: number, chapterNo: number) {
    if (!browser) return

    const currentData = listSeenHistory()
    currentData[titleNo] = {
        titleName: titleName,
        titleNo: titleNo,
        lastChapter: chapterNo,
        datetime: Date.now()
    }

    localStorage.setItem("seenHistory", JSON.stringify(currentData))
}

function listSeenHistory(): { [key: number]: SeenHistory } {
  if (!browser) {
    return {}
  }
  
  const data = localStorage.getItem("seenHistory")
  try {
    return JSON.parse(data ?? "")
  } catch {
    return {}
  }
}

export { listSeenHistory, updateSeenHistory }
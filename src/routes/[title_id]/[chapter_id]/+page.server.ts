import { error } from "@sveltejs/kit";
import { isNumeric } from "$lib/validation.js";
import { API_ADDRESS } from '$lib/ApiConfig.js'

interface TransArticle {
  id: number;
  chapterTitle: string;
  lastModify: string;
  detail: string;
  titleNo: number;
  header: string;
}
interface TransTitle {
  id: number;
  title: string;
  lastModify: string;
}
interface TransLineId {
    articleNo: number; // Corresponds to "articleNo" in the "id" field
    lineNo: number; // Corresponds to "lineNo" in the "id" field
    type: number; // Corresponds to "type" in the "id" field
}
interface ChapterBeforeNext {
  before: undefined | TransArticle
  after: undefined | TransArticle
}

export interface TransLine {
    id: TransLineId; // Nested object for "id"
    line: string; // Corresponds to "line"
    articleId: number; // Corresponds to "articleId"
}

export const trailingSlash = 'always';
export async function load({params}) {
  const titleId = params.title_id
  const chapterId = params.chapter_id
  const chapterIdInt = parseInt(chapterId)
  if (!isNumeric(titleId) || !isNumeric(chapterId)) {
    return error(404, '적절하지 않은 타이틀 입니다.');
  }

  const titleList: [TransArticle] = await fetch(`${API_ADDRESS}/api/${titleId}/`).then(res => res.json());
  const title: TransTitle = await fetch(`${API_ADDRESS}/api/${titleId}`).then(res => res.json());
  const article: TransArticle = await fetch(`${API_ADDRESS}/api/${titleId}/${chapterId}`).then(res => res.json());
  const line: TransLine[] = await fetch(`${API_ADDRESS}/api/${titleId}/${chapterId}/`).then(res => res.json());

  let lineAggreated: {[key: number]: {[type: number]: TransLine}} = {}
  line.forEach((v) => {
    if (!(v.id.lineNo in lineAggreated)) {
        lineAggreated[v.id.lineNo] = {}
    }

    lineAggreated[v.id.lineNo][v.id.type] = v
  })
  const lineOrderd: [string, {[key: number]: TransLine}][] = Object.entries(lineAggreated).toSorted((a, b) => parseInt(a[0]) - parseInt(b[0]))
  
  const windowList = titleList.toSorted((a, b) => a.id - b.id)
  const chapterBeforeNext: ChapterBeforeNext = {
    before: undefined,
    after: undefined
  }
  for (let i = 0; i < windowList.length; i++) {
    if (windowList[i].id != chapterIdInt) continue

    if (i > 0) {
      chapterBeforeNext.before = windowList[i - 1]
    }
    if (i < windowList.length - 1) {
      chapterBeforeNext.after = windowList[i + 1]
    }
    break
  }

  return {
    title: title,
    chapter: article,
    line: lineOrderd,
    navigation: chapterBeforeNext
  };
}

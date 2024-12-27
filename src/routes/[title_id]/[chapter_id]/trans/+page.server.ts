import { error } from "@sveltejs/kit";
import { isNumeric } from "$lib/validation.js";
import { API_ADDRESS } from '$lib/ApiConfig.js'

interface TransLine {
    id: TransLineId; // Nested object for "id"
    line: string; // Corresponds to "line"
    articleId: number; // Corresponds to "articleId"
}
interface TransLineId {
    articleNo: number; // Corresponds to "articleNo" in the "id" field
    lineNo: number; // Corresponds to "lineNo" in the "id" field
    type: number; // Corresponds to "type" in the "id" field
}
interface TransArticle {
  id: number;
  chapterTitle: string;
  lastModify: string;
  detail: string;
  titleNo: number;
}
interface TransTitle {
  id: number;
  title: String;
  lastModify: String;
  transInfo: String;
}

export async function load({params}) {
  const titleId = params.title_id
  const chapterId = params.chapter_id
  if (!isNumeric(titleId) || !isNumeric(chapterId)) {
    return error(404, '적절하지 않은 타이틀 입니다.');
  }

  
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
  return {
    title: title,
    chapter: article,
    line: lineOrderd
  };
}

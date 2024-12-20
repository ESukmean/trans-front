import { error } from "@sveltejs/kit";
import { isNumeric } from "$lib/validation.js";

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
}


export async function load({params}) {
  const titleId = params.title_id
  if (!isNumeric(titleId)) {
    return error(404, '적절하지 않은 타이틀 입니다.');
  }

  
  const title: TransTitle = await fetch(`http://trans-back.kr-2-ts.esukmean.com/api/${titleId}`).then(res => res.json());
  const list: [TransArticle] = await fetch(`http://trans-back.kr-2-ts.esukmean.com/api/${titleId}/`).then(res => res.json());
  return {
    title: title,
    list: list.map(
      e => {
        return {
          title_id: e.titleNo,
          chapter_name: e.chapterTitle,
          chapter_id: e.id,
          modified: e.lastModify.replace('T', ' ')
        }
      }
    )
  };
}

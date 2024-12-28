import { configRead } from "$lib/readerConfig.js";

export function load({ data, url }) {
  return {
      config: configRead(),
      line: data.line,
      article: data.chapter,
      title: data.title,
      navigation: data.navigation
  }
}
export function load({ data, url }) {
  return {
      list: data.line,
      title: data.title,
      order: url.searchParams.get('order'),
      article: data.chapter
  }
}
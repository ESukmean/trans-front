export function load({ data, url }) {
  return {
      list: data.list,
      title: data.title,
      order: url.searchParams.get('order')
  }
}
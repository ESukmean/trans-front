export function load({ data, url }) {
  return {
    list: data.list,
    order: url.searchParams.get("order"),
  };
}

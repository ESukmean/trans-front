export function load({ data }) {
    const original_list = data.list
    const recent_seen_list = data.list.filter(item => item.title.includes('이세계')).map(item => { item.has_update = item.title.includes('에'); return item; })

    return {
        list: original_list,
        recent_seen_list: recent_seen_list
    }
}
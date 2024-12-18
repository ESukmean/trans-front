<script>
	import Frame from '$lib/Frame.svelte';

    let order = $state('old');
	const { data } = $props();

    function order_func(a, b) {
        // if (Math.random() < 0.5) return -1
        // return 1;
        switch (order) {
            case 'old':
                return a['modified'].localeCompare(b['modified'])
            case 'latest':
                return b['modified'].localeCompare(a['modified'])
            case 'a-z':
                return a['chapter_name'].localeCompare(b['chapter_name'])
            case 'z-a':
                return b['chapter_name'].localeCompare(a['chapter_name'])
        }
    }
    
    let list = $derived(data.list.toSorted(order_func))
</script>
<Frame>
	<div class="container mx-auto p-2">
		<div class="flex gap-2">
			<div class="w-80 h-full">testset</div>
			<div class="flex-1 h-full">
				<form action="?order" method="post" class="flex flex-row-reverse">
                    <div class="border rounded">
                        <select class="w-24 h-8 text-center" bind:value={order}>
                            <option value="old">오래된 순</option>
                            <option value="latest">최근 순</option>
                            <option value="a-z">제목 순</option>
                            <option value="z-a">제목 역순</option>
                        </select>
                        <button type="submit" class="px-2 pr-3">확인</button>
                    </div>
				</form>
				<div class="py-2">
					<table class="border-spacing-2 w-full">
						<thead class="text-left">
						  <tr class="text-lg">
							<th class="py-2"><span class="w-32 py-2 border-b-2 border-neutral-400 inline-block">제목</span></th>
							<th><span class="w-32 py-2 border-b-2 border-neutral-400 inline-block">마지막 수정일</span></th>
						  </tr>
						</thead>
						<tbody>
							{#each list as item}
								<tr class="hover:bg-slate-100">
									<td><a href="/{item.id}" class="py-1.5 block">{item.chapter_name}</a></td>
									<td>{item.modified}</td>
								</tr>
							{/each}
						</tbody>
					  </table>
				</div>
			</div>
		</div>
	</div>
</Frame>

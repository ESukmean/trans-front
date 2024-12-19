<script>
	import Frame from '$lib/Frame.svelte';

    const { data } = $props();
    const avail_order = ['old', 'latest', 'a-z', 'z-a'];
    let order = $state(data.order && avail_order.includes(data.order) ? data.order : 'old');
    
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
	<div class="container mx-auto p-2 py-6">
        <header class="text-2xl font-bold py-2 mb-6">마력 치트인 마녀가 되었습니다 ~창조 마법으로 자유로운 이세계 생활~</header>
        <div class="lg:flex gap-4">
			<div class="w-80 lg:h-full flex flex-col gap-2">
                <div class="p-2 border rounded">
                    <header class="text-xl font-bold py-2 mb-4">🗒️ 목록 설정</header>
                    <form method="get" class="flex mt-2 block p-2">
                        <div class="border rounded bg-emerald-100">
                            <select class="w-36 h-8 text-center" bind:value={order} name="order">
                                <option value="old">정렬: 오래된 순</option>
                                <option value="latest">정렬: 최근 순</option>
                                <option value="a-z">정렬: 제목 순</option>
                                <option value="z-a">정렬: 제목 역순</option>
                            </select>
                            <button type="submit" class="px-2 pr-3">확인</button>
                        </div>
                    </form>
                </div>
                <div class="p-2 border rounded">
                    <header class="text-xl font-bold py-2 mb-4">🛠️ 뷰어 기본설정</header>
                    <div class="font-bold">표시 문장 설정</div>
                    <div class="p-2">
                        <label class="block"><input type="checkbox" /> 일본어 원어 보기</label>
                        <label class="block"><input type="checkbox" /> GPT 번역 보기</label>
                        <label class="block"><input type="checkbox" /> Claude 번역 보기</label>
                    </div>
                    <div class="mt-4 font-bold">스크롤</div>
                    <div class="p-2">
                        <label class="block"><input type="checkbox" /> 스크롤 버튼 표시</label>
                        <label class="block"><input type="checkbox" /> 문장 단위 스크롤 버튼</label>
                        <label class="block"><input type="checkbox" /> 다음 챕터 이어보기</label>
                    </div>
                </div>
            </div>
			<div class="lg:flex-1 lg:h-full">
				<div class="pb-2">
					<table class="border-spacing-2 w-full">
						<thead class="text-left">
						  <tr class="text-lg">
							<th class="pb-2"><span class="w-32 pb-2 border-b-2 border-neutral-300 text-neutral-800 inline-block">제목</span></th>
							<th><span class="w-32 pb-2 border-b-2 border-neutral-300 text-neutral-800 inline-block">마지막 수정일</span></th>
						  </tr>
						</thead>
						<tbody>
							{#each list as item}
								<tr class="hover:bg-slate-100" >
									<td><a href="/{item.title_id}/{item.chapter_id}" class="py-1.5 block visited:text-purple-500">{item.chapter_name}</a></td>
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

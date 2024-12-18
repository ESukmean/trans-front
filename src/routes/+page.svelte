<script>
	import Frame from '$lib/Frame.svelte';

	let search_input = $state('');
	const { data } = $props();
	const list = $derived(data.list.filter(item => search_input.length == 0 || (item.title.includes(search_input) || item.latest_chapter.includes(search_input))));
</script>

<Frame>
	<div class="container mx-auto p-2">
		<div class="flex gap-2">
			<div class="w-80 h-full">testset</div>
			<div class="flex-1 h-full">
				<form action="/?search" method="post">
					<label class="border-2 border-rose-400 rounded px-2 py-1 w-full h-10 flex">
						<span class="sr-only">검색어 입력</span>
						<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50" class="relative py-1">
							<path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
						</svg>
						<input type="text" placeholder="작품명 검색" class="w-full pl-2" bind:value={search_input}/>
					</label>
				</form>
				<div class="py-2">
					<table class="border-spacing-2 w-full">
						<thead class="text-left">
						  <tr class="text-lg">
							<th class="py-2"><span class="w-32 py-2 border-b-2 border-neutral-400 inline-block">제목</span></th>
							<th><span class="w-32 py-2 border-b-2 border-neutral-400 inline-block">최신 챕터</span></th>
							<th><span class="w-32 py-2 border-b-2 border-neutral-400 inline-block">마지막 수정일</span></th>
						  </tr>
						</thead>
						<tbody>
							{#each list as item}
								<tr class="hover:bg-slate-100">
									<td><a href="/{item.id}" class="py-1.5 block">{item.title}</a></td>
									<td><a href="/{item.id}/{item.chapter_id}" class="block">{item.latest_chapter}</a></td>
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

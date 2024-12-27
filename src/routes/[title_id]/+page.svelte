<script lang="ts">
    import { configRead, configSet } from '$lib/readerConfig.js'
    import isMobileScreen from '$lib/isMobileScreen.js';

    interface listItemType {
        title_id: number;
        chapter_id: number;
        chapter_name: string;
        modified: string;
    }

	import Frame from '$lib/Frame.svelte';
    import type { Snapshot } from '@sveltejs/kit';

    const { data } = $props();
    
    let hideViewerConfig = $state(isMobileScreen());
    export const snapshot: Snapshot<boolean> ={
		capture: () => hideViewerConfig,
		restore: (val) => hideViewerConfig = val
	};

    ///////////////////////////////////////////
    const avail_order = ['old', 'latest', 'a-z', 'z-a'];
    let order = $state(data.order && avail_order.includes(data.order) ? data.order : 'old');
    
    function orderCompFunc(a: listItemType, b: listItemType): number {
        switch (order) {
            case 'latest':
                return b['modified'].localeCompare(a['modified'])
            case 'a-z':
                return a['chapter_name'].localeCompare(b['chapter_name'])
            case 'z-a':
                return b['chapter_name'].localeCompare(a['chapter_name'])

            case 'old':
            default:
                return a['modified'].localeCompare(b['modified'])
        }
    }
    let list = $derived(data.list.toSorted(orderCompFunc));
    const title = data.title;

    ///////////////////////////////////////////

    let reader_config = $state(configRead())
    $effect(() => {
        configSet(reader_config)
    })

    function fontWeightEmulate(fontName: string): number {
        const weightTable = {
            'Light': 300,
            'Regular': 400,
            'Medium': 500,
            'Bold': 500
        };

        for (const [k, v] of Object.entries(weightTable)) {
            if (fontName.includes(k)) return v;
        }

        return weightTable['Regular'];
    }

    let sampleFontFamily = $derived(reader_config.viewFontFamily)
    let sampleFontWeight = $derived(fontWeightEmulate(reader_config.viewFontFamily))
</script>
<svelte:head>
	<title>{title.title} - GPTTrans</title>
</svelte:head>
<Frame>
	<div class="container mx-auto p-2 py-6">
        <header class="text-2xl font-bold py-2 mb-6">{title.title}</header>
        <div class="lg:flex gap-4">
			<div class="w-full lg:w-80 lg:h-full flex flex-col gap-2  mb-4">
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
                    <label class="text-xl font-bold py-2 block">🛠️ 뷰어 기본설정 <input type="checkbox" class="invisible" bind:checked="{hideViewerConfig}"><span style="width: 1px; height: 1px; overflow: hidden; display:inline-block" style:font-family={sampleFontFamily} style:font-weight={sampleFontWeight}>font preloader</span></label>
                    <div class="mt-4 flex flex-wrap lg:flex-none {hideViewerConfig ? 'hidden' : 'block'}">
                        <div class="flex-1 min-w-36">
                            <div class="font-bold">표시 문장 설정</div>
                            <div class="p-2 mb-4 ">
                                <label class="block"><input type="checkbox" bind:checked={reader_config.showJapanese} /> 일본어 원어 보기</label>
                                <label class="block"><input type="checkbox" bind:checked={reader_config.showGPT}/> GPT 번역 보기</label>
                                <label class="block"><input type="checkbox" bind:checked={reader_config.showClaude}/> Claude 번역 보기</label>
                            </div>
                        </div>
                        <div class="flex-1 min-w-36">
                            <div class="font-bold">스크롤</div>
                            <div class="p-2 mb-4">
                                <label class="block"><input type="checkbox" bind:checked={reader_config.scrollShow}/> 스크롤 버튼 표시</label>
                                <!-- <label class="block"><input type="checkbox" bind:checked={reader_config.scrollByLine}/> 문장 단위 스크롤 버튼</label>
                                <label class="block"><input type="checkbox" bind:checked={reader_config.scrollInfiniteChapter}/> 다음 챕터 이어보기</label> -->
                            </div>
                        </div>
                        <div class="flex-1 min-w-56">
                            <div class="font-bold">보기</div>
                            <div class="p-2">
                                <label class="block"><input type="checkbox" bind:checked={reader_config.viewWide}/> 와이드로 보기</label>
                                <label class="block">폰트 크기 (px): <input class="w-20" type="number" min=1 max=128 step=0.1 bind:value={reader_config.viewFontSize}/> </label>
                                <label class="block">줄간 여백 (px): <input class="w-20" type="number" min=1 max=128 step=0.1 bind:value={reader_config.viewLineMargin}/> </label>
                                <label class="block">줄 간격 (rem): <input class="w-20" type="number" min=0.1 max=30 step=0.01  bind:value={reader_config.viewLineHeight}/> </label>
                                <select bind:value={reader_config.viewFontFamily} class="mt-1 p-1 block" style:font-family={sampleFontFamily} style:font-weight={sampleFontWeight}>
                                    <optgroup label="돋움체 (고딕, Sans)">
                                        <option value="KoPub Dotum Light">폰트: KoPub 돋음 · 가늘게</option>
                                        <option value="KoPub Dotum Medium">폰트: KoPub 돋음 · 보통</option>
                                        <option value="KoPub Dotum Bold">폰트: KoPub 돋음 · 굵게</option>
                                        <option value="Noto Sans Light">폰트: Noto Sans · 가늘게</option>
                                        <option value="Noto Sans Regular">폰트: Noto Sans · 보통</option>
                                        <option value="Noto Sans Bold">폰트: Noto Sans · 굵게</option>
                                    </optgroup>
                                    <optgroup label="바탕체 (Serif)">
                                        <option value="KoPub Batang Light">폰트: KoPub 바탕 · 가늘게</option>
                                        <option value="KoPub Batang Medium">폰트: KoPub 바탕 · 보통</option>
                                        <option value="KoPub Batang Bold">폰트: KoPub 바탕 · 굵게</option>
                                        <option value="Noto Serif Light">폰트: Noto Serif · 가늘게</option>
                                        <option value="Noto Serif Regular">폰트: Noto Serif · 보통</option>
                                        <option value="Noto Serif Bold">폰트: Noto Serif · 굵게</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>                   
                </div>
                <div class="flex-1 flex">
                    <div class="flex-1">
                        <a href="./new_chapter" class="block rounded border border-emerald-200 bg-emerald-700/80 hover:bg-emerald-700 p-2 text-center text-white">챕터 추가</a>
                    </div>
                    <div class="flex-1"></div>
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
									<td><a href="/{item.title_id}/{item.chapter_id}" class="py-1.5 block">{item.modified}</a></td>
								</tr>
							{/each}
						</tbody>
					  </table>
				</div>
			</div>
		</div>
	</div>
</Frame>

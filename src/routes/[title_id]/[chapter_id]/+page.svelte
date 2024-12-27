<script lang="ts">
    import type { TransLine } from './+page.server.js';
    import { updateSeenHistory } from '$lib/recentSeen';
    
    const { data } = $props();
    const lines = data.line;
    const title = data.title;
    const article = data.article;

    const config = data.config;
    let lineShow: [string, TransLine[]][] = $state([])
    let showLineType = $state.raw(['1'])

    const resultSet = {
        0: config.showJapanese,
        1: config.showGPT,
        2: config.showClaude
    }

    let tmp = []
    for (const [k, v] of Object.entries(resultSet)) {
        if (v) tmp.push(k)
    }

    if (tmp.length == 0) {
        tmp = ['1']
    }

    showLineType = tmp

    let lineAggregate: {[k: string]: TransLine[]} = {}
    lines.forEach((v, _) => {
        let tmp: {[type: string]: TransLine} = {}
        
        const lineKey = v[0]
        const lineEntry = Object.entries(v[1])
        lineEntry.forEach(([k, v]) => {
            if (!showLineType.includes(k)) return
            
            tmp[k] = v
        });
        

        if (Object.keys(tmp).length == 0 && v[1]['1'] != undefined) {
            // failback (아무것도 없으면 GPT 번역을 표시)
            tmp[showLineType[0]] = v[1]['1']
        }
        

        const aggregated = Object.entries(tmp).toSorted((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([_, v]) => v)
        lineAggregate[lineKey] = aggregated
    })
    
    lineShow = Object.entries(lineAggregate).toSorted((a, b) => parseInt(a[0]) - parseInt(b[0]))



    
    let lastScrollMethod = "D"; // U, D
    function getBottomElement(elements: NodeListOf<Element>, startIdx = 0) {
        const screenHeight = window.innerHeight;
        let bottomElIdx = 0;

        for (let i = startIdx; i < elements.length; i++) {
            const e = elements[i];
            const offset = e.getBoundingClientRect();
            const bottomY = offset.bottom;

            if (offset.y < 0) {
                continue;
            }

            if (bottomY < screenHeight) {
                bottomElIdx = i;
            } else if (bottomY >= screenHeight) {
                break;
            }
        }

        return bottomElIdx;
    }
    function getTopElement(elements: NodeListOf<Element>) {
        for (let i = 0; i < elements.length; i++) {
            const e = elements[i];
            const offset = e.getBoundingClientRect();

            if (offset.y < 0) continue;
            return i;
        }

        return 0;
    }

    function scrollDown() {
        const divs = document.querySelectorAll("article div");
        const targetIdx = getBottomElement(divs);
        const target = divs[targetIdx];

        const scrollAmount = target.getBoundingClientRect().y - config.viewFontSize

        if (targetIdx == 0 || scrollAmount <= 0) {
            const scrollAmount = window.innerHeight * 0.75;
            window.scrollBy({ top: -scrollAmount });

            return;
        }

        
        window.scrollBy({
            top: scrollAmount
        });

        const prevIndicator =
            lastScrollMethod == "D"
                ? document.querySelector("div.line-indicator-next")
                : document.querySelector("div.line-indicator");
        document
            .querySelectorAll("div.line-indicator")
            .forEach((e) => e.classList.remove("line-indicator"));
        document
            .querySelectorAll("div.line-indicator-next")
            .forEach((e) => e.classList.remove("line-indicator-next"));

        if (prevIndicator != null) {
            prevIndicator.classList.add("line-indicator");
        }

        const newIndicatorIdx = getBottomElement(divs, targetIdx);
        if (newIndicatorIdx > 0) {
            divs[newIndicatorIdx].classList.add("line-indicator-next");
        }

        lastScrollMethod = "D";
    }

    function scrollUp() {
        const screenHeight = window.innerHeight;

        const divs = document.querySelectorAll("article div");
        const targetIdx = getTopElement(divs);
        const target = divs[targetIdx];

        const scrollAmount = target.getBoundingClientRect().bottom - screenHeight + config.viewFontSize

        if (targetIdx == 0 || scrollAmount >= 0) {
            const scrollAmount = window.innerHeight * 0.75;
            window.scrollBy({ top: -scrollAmount });

            return;
        }

        window.scrollBy({
            top: scrollAmount
        });

        const prevIndicator =
            lastScrollMethod == "U"
                ? document.querySelector("div.line-indicator-next")
                : document.querySelector("div.line-indicator");
        document
            .querySelectorAll("div.line-indicator")
            .forEach((e) => e.classList.remove("line-indicator"));
        document
            .querySelectorAll("div.line-indicator-next")
            .forEach((e) => e.classList.remove("line-indicator-next"));

        if (prevIndicator != null) {
            prevIndicator.classList.add("line-indicator");
        }

        const newIndicatorIdx = getTopElement(divs);
        if (newIndicatorIdx > 0) {
            divs[newIndicatorIdx].classList.add("line-indicator-next");
        }

        lastScrollMethod = "U";
    }

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

    // function loadHeaderMessage(detail: string) :string {
    //     try {
    //         const header = JSON.parse(detail)
    //         let msgConact = header['common']
    
    //         showLineType.forEach((v) => {
    //             msgConact = msgConact + header[`trans-${v}`]
    //         })
    
    //         return msgConact
    //     } catch {
    //         return article.detail
    //     }
    // }
    const fontWeightEmulated = fontWeightEmulate(config.viewFontFamily);
    
    updateSeenHistory(title.title, title.id, article.id)

</script>
<svelte:head>
	<title>{article.chapterTitle} ({title.title}) - GPTTrans</title>
</svelte:head>
<article
    class="mx-auto p-4 {!config.viewWide ? 'container' : ''}"
    style:line-height={config.viewLineHeight}
    style:font-size={config.viewFontSize + "px"}
    style:--line-height={config.viewLineHeight + "rem"}
    style:--line-margin={config.viewLineMargin + "px"}
    style:--font-family={config.viewFontFamily}
    style:--font-weight={fontWeightEmulated}
>   
    <header class="bg-slate-100 p-2 border border-slate-400 rounded mb-8" >
        <h1 class="pb-2 block font-bold">{title.title}<br><small class="text-slate-600 font-normal">{article.chapterTitle}</small></h1>
    </header>
    {#each lineShow as [lineIdx, lineGroup]}
        <div data-line-no={lineIdx}>
            {#each lineGroup as line}
                <span class={`block trans-line-type-${line.id.type}`} data-line-type={line.id.type}>{line.line}</span>
            {/each}
        </div>
    {/each}
<div></div>
</article>
<div
    class="{config.scrollShow
        ? 'block'
        : 'hidden'} fixed bottom-[16%] right-[13%]"
>
    <button
        class="cursor-pointer w-12 h-12 bg-slate-200/15 hover:bg-slate-300 backdrop-blur rounded-full border border-2 text-center flex items-center content-center text-2xl"
        onclick={scrollUp}
    >
        <span class="flex-1">⬆</span>
    </button>
    <button
        class="cursor-pointer w-12 h-12 bg-slate-200/15 hover:bg-slate-300 backdrop-blur rounded-full border border-2 text-center flex items-center content-center text-2xl mt-2"
        onclick={scrollDown}
    >
        <span class="flex-1">⬇</span>
    </button>
</div>

<style>
    article > div {
        min-height: var(--line-height);
        font-family: var(--font-family);
        font-weight: var(--font-weight);
        padding-bottom: var(--line-margin);
    }
    :global(.line-indicator) {
        background: greenyellow;
    }
    :global(.line-indicator-next) {
        /* border: greenyellow 2px solid */
        background: #e9ffcc;
        border: 2px #a8ff33 solid;
    }
</style>

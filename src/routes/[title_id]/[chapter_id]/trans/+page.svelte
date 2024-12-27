<script lang="ts">
    import { beforeNavigate } from "$app/navigation";
    import Frame from "$lib/Frame.svelte";
    import { redirect, type Snapshot } from "@sveltejs/kit";
    import type { TransLine } from "../+page.server";
    import { API_ADDRESS, API_ADDRESS_DIRECT } from '$lib/ApiConfig.js'

    beforeNavigate((nav) => chapterLines.length > 0 ? nav.cancel() : {})

    const { data } = $props();
    const chapter = data.article;
    const title = data.title;
    let chapterDetail: { common: string, [key: string]: string};
    try {
        const json = JSON.parse(chapter.detail);
        chapterDetail = json
    } catch {
        chapterDetail = {common: chapter.detail};
    }

    let linesOrignal: {[key: string]: TransLine} = {}
    data.list.forEach(([k, v]) => {
        linesOrignal[k] = v[0]
    })
    const linesOrignalSorted = Object.entries(linesOrignal).toSorted((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([_, v]) => v)

    function splitLine(line: string): string[] {
        const trimed = line.replace("\r", "");
        let splited = trimed.split("\n");

        return splitPostProcess(splited);
    }
    function splitPostProcess(line: string[]): string[] {
        let splited = line;
        return splited;
    }

    function stripHtml(html: string) : string
    {
        return html.replace(/<(?!br\s*\/?)[^>]+>/g, '');
    }

    function doAutoTrans() {
        function mappingChapterLineWithOriginal() {
            let data: {[key: number]: string} = {}

            chapterLines.forEach((v, i) => {
                data[linesOrignalSorted[i].id.lineNo] = v
            });

            return data
        }

        const postObj = {
            info: chapterInfo,
            transModelNo: parseInt(transType)
        }

        fetch(`${API_ADDRESS_DIRECT}/api/${title.id}/${chapter.id}/trans`, {
            body: JSON.stringify(postObj),
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        }).then(resp => {
            if (resp.ok) {
                alert('저장 되었습니다');
            } else {
                alert('저장 실패');
            }
        })
    }
    function eventPreviewInput(e: InputEvent) {
        if (e.inputType != "insertFromPaste") {
            return;
        }

        e.preventDefault();

        const target = e.target! as HTMLTextAreaElement
        const targetIdx =  parseInt(target.dataset.idx!);

        const splited = splitLine(target.value)


        chapterLines = chapterLines.toSpliced(targetIdx + 1, 0, ...splited.filter((_, idx) => idx >= 1))
        chapterLines[targetIdx] = splited[0];
    }
    function eventPreivewKeyDown(e: KeyboardEvent) {
        const target = e.target! as HTMLTextAreaElement;
        const targetIdx =  parseInt(target.dataset.idx!);
        const curStart = target.selectionStart;
        const curEnd = target.selectionEnd;

        switch (e.key) {
            case 'Backspace':
                if (target.textContent?.length == 0) {
                    e.preventDefault()
                    chapterLines.splice(targetIdx, 1)
                    return;
                }
                
                if (curStart != curEnd ) {
                    return;
                }

                if (curStart == 0) {
                    if (targetIdx == 0) { return }
                    e.preventDefault()

                    chapterLines[targetIdx - 1] = chapterLines[targetIdx - 1] + " " + target.value
                    chapterLines = chapterLines.toSpliced(targetIdx, 1)
                }
                break;
            
            case 'Enter':
                e.preventDefault();
                if (target.value.length == 0) {
                    chapterLines = chapterLines.toSpliced(targetIdx + 1, 0, '');
                    return;    
                }

                // Split the content at the cursor position
                const textBefore = target!.value.slice(0, curStart);
                const textAfter = target!.value.substring(curEnd);
                
                chapterLines = chapterLines.toSpliced(targetIdx, 0, textBefore)
                chapterLines[targetIdx + 1] = textAfter;

                target.focus()
                break;

        }
    }

    function eventFormSubmit(e: SubmitEvent) {
        e.preventDefault();

        
        function escapeString(str: string): string {
            return str.replace(/[\u0000-\u001F\u007F-\u009F]/g, char => {
                return "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0");
            });
        }
        function mappingChapterLineWithOriginal() {
            let data: {[key: number]: string} = {}

            translatedLine.forEach((v, i) => {
                // 번역 데이터가 들어오기 전에 저장을 누르면 undefined가 들어올 수 있음.
                const lineStr = v ? v : '';

                data[linesOrignalSorted[i].id.lineNo] = lineStr
            });

            return data
        }

        const postObj = {
            lines: mappingChapterLineWithOriginal(),
            info: escapeString(chapterInfo),
            transType: transType,
            title: chapterTitle
        }

        fetch(`${API_ADDRESS_DIRECT}/api/${title.id}/${chapter.id}/`, {
            body: JSON.stringify(postObj),
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        }).then(resp => {
            if (resp.ok) {
                alert('저장 되었습니다');
            } else {
                alert('저장 실패');
            }
        })
    }

    function loadTranslatedLine(transType: string) {
        const transTypeInt = parseInt(transType)

        fetch(`${API_ADDRESS_DIRECT}/api/${title.id}/${chapter.id}/`, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        }).then(resp => {
            if (resp.ok) {
                return resp.json() as Promise<TransLine[]>
            } else {
                alert('로딩 실패');
            }
        }).then(json => {
            const data = json!!.filter(v => v.id.type == transTypeInt).toSorted((a, b) => a.id.lineNo - b.id.lineNo).map(v => v.line)
            
            translatedLine = data
        })
        
        const transSpecificInfo = transType in chapterDetail ? chapterDetail[transType] : "";
        chapterInfo = `${title.transInfo}\n${chapterDetail.common}\n\n${transSpecificInfo}`
    }

    let transType = $state('1');
    let chapterLines: string[] = $state(linesOrignalSorted.map(v => v.line));
    let translatedLine: string[] = $state([])
    let chapterInfo = $state(title.transInfo + chapterDetail.common);
    let chapterTitle = $state(chapter.chapterTitle);

    $effect(() => {
        loadTranslatedLine(transType);
    })

</script>


<Frame>
    <form class="mx-auto px-12 py-6" method="post" onsubmit="{eventFormSubmit}">
        <header class="text-2xl font-bold py-2 mb-6">
            <div>{title.title}</div>
            <label
            class="rounded border-2 border-sky-400 p-2 block flex text-lg text-slate-400 has-[:invalid]:border-rose-400 has-[:invalid]:border-2 block"
        >
            챕터명:
            <input
                type="text"
                name="chapterName"
                class="flex-1 ml-2 text-slate-800 font-bold"
                required
                bind:value={chapterTitle}
            />
        </label>
        </header>
        <div class="lg:flex gap-4">
            <div class="w-full lg:w-80 lg:h-full flex flex-col gap-2 mb-4">
                <div class="flex-1">
                    <div class="p-2 border rounded">
                        <span class="block text-xl font-bold py-2 block mb-4"
                            >🛠️ 자동 번역</span
                        >
                        <select class="block font-bold text p-2 py-1 w-full" bind:value={transType}>
                            <option value="1">번역: ChatGPT</option>
                            <option value="2">번역: Claude</option>
                        </select>
                        <textarea bind:value={chapterInfo} class="w-full h-40 border rounded mt-2 block p-1" placeholder="GPT가 번역할 때 사용할 추가정보를 입력해 주세요 (영어 권장)"></textarea>
                        <div class="mt-2">
                            <button
                                class="block w-32 rounded border border-emerald-200 bg-emerald-700/80 hover:bg-emerald-700 p-2 text-center text-white"
                                onclick={doAutoTrans}
                                type="button"
                            >
                                자동 번역
                            </button>
                        </div>
                    </div>
                </div>
    
                <div class="flex-1 mt-4">
                    <button
                        class="block rounded border border-rose-200 bg-orange-500/80 hover:bg-orange-700 p-2 text-center text-white w-full"
                        >저장</button
                    >
                </div>
            </div>
            <div class="lg:flex-1 lg:h-full">
                <div class="flex block">
                    <div class="flex-1 block">
                        <span class="block font-bold text py-2">
                            원본 내용
                        </span>
                    </div>
                    <div class="flex-1 block">
                        <select class="block font-bold text p-2 py-1" bind:value={transType}>
                            <option value="1">번역: ChatGPT</option>
                            <option value="2">번역: Claude</option>
                        </select>
                    </div>
                </div> 
                <div>
                    <div class="border min-h-20 rounded">
                        {#each linesOrignalSorted as v, i}
                            {@const isOriginalLineEmpty = v.line.trim().length == 0}
                            {@const translationLine = (i < translatedLine.length) ? translatedLine[i] : ""}
                            {@const isTranslationLineEmpty = !translationLine || translationLine.trim().length == 0}
                            <div class="flex bg-slate-100 m-2">
                                <div class="p-2 min-h-10 flex-1 w-2/4 {isOriginalLineEmpty ? 'bg-amber-100' : 'bg-violet-100'}" data-idx={v.id.lineNo}>
                                    {v.line}
                                </div>
                                <textarea
                                    contenteditable="true"
                                    class="p-2 min-h-10 flex-1 w-2/4 {isOriginalLineEmpty != isTranslationLineEmpty ? 'bg-rose-100' : 'bg-violet-100'}"
                                    data-idx={i}
                                    data-match-idx={v.id.lineNo}
                                    onkeydown={eventPreivewKeyDown}
                                    oninput={eventPreviewInput}
                                    bind:value={translatedLine[i]}
                                >
                                </textarea>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </form>
</Frame>

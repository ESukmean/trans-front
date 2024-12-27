<script lang="ts">
    import { beforeNavigate } from "$app/navigation";
    import Frame from "$lib/Frame.svelte";
    import { redirect, type Snapshot } from "@sveltejs/kit";
    import { API_ADDRESS } from '$lib/ApiConfig.js'


    beforeNavigate((nav) => chapterName.length + chapterLine.length > 0 ? nav.cancel() : {})

    const { data } = $props();
    const title = data.title;

    interface SnapshotData {
        chapterNameSnapshot: string;
        chapterLineSnapshot: String;
        chapterLinesSnapshot: string[];
    }

    export const snapshot: Snapshot<SnapshotData> = {
        capture: () => {
            return {
                chapterNameSnapshot: chapterName,
                chapterLineSnapshot: chapterLine,
                chapterLinesSnapshot: chapterLines,
            };
        },
        restore: ({
            chapterNameSnapshot,
            chapterLineSnapshot,
            chapterLinesSnapshot,
        }) => {
            chapterName = chapterNameSnapshot;
            chapterLineSnapshot = chapterLineSnapshot;
            chapterLinesSnapshot = chapterLinesSnapshot;
        },
    };

    function splitLine(line: string): string[] {
        const trimed = line.replace("\r", "");
        let splited = trimed.split("\n");

        return splitPostProcess(splited);
    }
    function splitPostProcess(line: string[]): string[] {
        let splited = line;
        if (removeTailingLine) {
            let result = [];

            let wasFilledLine = true;
            for (const line of splited) {
                const isEmptyLine = line.trim().length == 0;

                if (isEmptyLine && wasFilledLine) {
                    wasFilledLine = false;
                    continue;
                }

                result.push(line);

                if (!isEmptyLine) {
                    wasFilledLine = true;
                }
            }

            splited = result;
        }

        return splited;
    }

    function stripHtml(html: string) : string
    {
        return html.replace(/<(?!br\s*\/?)[^>]+>/g, '');
    }

    function eventConvertLine() {
        chapterLines = splitLine(chapterLine);
    }
    function eventApplyPostProcess() {
        chapterLines = splitPostProcess(chapterLines);
    }
    function eventPreviewInput(e: InputEvent) {
        if (e.inputType != "insertFromPaste") {
            return;
        }

        e.preventDefault();

        const target = e.target! as HTMLElement
        const targetIdx =  parseInt(target.dataset.idx!);


        target.innerHTML = stripHtml(target.innerHTML)
        const splited = splitLine(target.innerText)


        chapterLines = chapterLines.toSpliced(targetIdx + 1, 0, ...splited.filter((_, idx) => idx >= 1))
        chapterLines[targetIdx] = splited[0];
    }
    function eventPreivewKeyDown(e: KeyboardEvent) {
        const target = e.target! as HTMLElement;
        const targetIdx =  parseInt(target.dataset.idx!);
        
        const cur = window.getSelection()

        switch (e.key) {
            case 'Backspace':
                if (target.textContent?.length == 0) {
                    e.preventDefault()
                    chapterLines.splice(targetIdx, 1)
                    return;
                }

                if (cur?.anchorOffset == 0) {
                    if (targetIdx == 0) { return }
                    e.preventDefault()

                    chapterLines[targetIdx - 1] = chapterLines[targetIdx - 1] + " " + target.innerText
                    chapterLines = chapterLines.toSpliced(targetIdx, 1)
                }
                break;
            
            case 'Enter':
                e.preventDefault();
                if (target.textContent?.length == 0) {
                    chapterLines = chapterLines.toSpliced(targetIdx + 1, 0, '');
                    return;    
                }
                if (!cur || cur.rangeCount == 0) return;

                const range = cur.getRangeAt(0);
                const parentElement = range.commonAncestorContainer.parentNode;

                if (parentElement !== target) {
                    return;
                }

                // Split the content at the cursor position
                const textBefore = target!.textContent!.slice(0, range.startOffset);
                const textAfter = target!.textContent!.substring(range.startOffset);
                
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

        const postObj = {
            name: escapeString(chapterName),
            lines: chapterLines.map(escapeString),
            info: escapeString(chapterInfo)
        }

        fetch(`${API_ADDRESS}/api/${title.id}/`, {
            body: JSON.stringify(postObj),
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        }).then(resp => {
            if (resp.ok) {
                alert('저장 되었습니다');
                return redirect(301, `/${title.id}/`);
            } else {
                alert('저장 실패');
            }
        })
    }

    let chapterName = $state("");
    let chapterLine = $state("");
    let chapterLines: string[] = $state([]);
    let chapterInfo = $state("");

    let removeTailingLine: boolean | null = $state(null);
</script>

<style>
    /* :global(.editline br) {
        display: none
    } */
</style>
<Frame>
    <form class="mx-auto px-12 py-6" method="post" onsubmit="{eventFormSubmit}">
        <header class="text-2xl font-bold py-2 mb-6">{title.title}</header>
        <div class="lg:flex gap-4">
            <div class="w-full lg:w-80 lg:h-full flex flex-col gap-2 mb-4">
                <div class="flex-1">
                    <div class="p-2 border rounded">
                        <span class="block text-xl font-bold py-2 block mb-4"
                            >🛠️ 줄 바꾸기</span
                        >
                        <div class="font-bold">표시 문장 설정</div>
                        <div class="p-2 mb-4">
                            <label class="block"
                                ><input
                                    type="checkbox"
                                    bind:checked={removeTailingLine}
                                /> 따라붙는 줄 지우기</label
                            >
                        </div>
                        <div class="flex gap-2">
                            <button
                                class="block w-full rounded border border-slate-200 bg-slate-200 hover:bg-slate-700 p-2 text-center hover:text-white"
                                onclick={eventApplyPostProcess}
                                type="button"
                            >
                                지금 상태에서 적용
                            </button>
                            <button
                                class="block w-full rounded border border-emerald-200 bg-emerald-700/80 hover:bg-emerald-700 p-2 text-center text-white"
                                onclick={eventConvertLine}
                                type="button"
                            >
                                줄 변환
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-2 border rounded">
                    <span class="block text-xl font-bold py-2 block mb-4"
                        >📄 번역 메모 (GPT 전달됨)</span
                    >
                    <textarea bind:value={chapterInfo} class="w-full h-40 border rounded" placeholder="GPT가 번역할 때 사용할 추가정보를 입력해 주세요 (영어 권장)"></textarea>
                </div>
                <div class="flex-1 mt-4">
                    <button
                        class="block rounded border border-rose-200 bg-orange-500/80 hover:bg-orange-700 p-2 text-center text-white w-full"
                        >저장</button
                    >
                </div>
            </div>
            <div class="lg:flex-1 lg:h-full">
                <label
                    class="rounded border-2 border-sky-400 p-2 block flex text-lg text-slate-400 has-[:invalid]:border-rose-400 has-[:invalid]:border-2 block"
                >
                    챕터명:
                    <input
                        type="text"
                        name="chapterName"
                        class="flex-1 ml-2 text-slate-800 font-bold"
                        required
                        bind:value={chapterName}
                    />
                </label>
                <div class="flex gap-8">
                    <label class="flex-1 block mt-6">
                        <span class="block font-bold text py-2">
                            전체 내용
                        </span>
                        <textarea
                            name="line"
                            class="block w-full h-96 border p-2 leading-10 border-sky-400 invalid:border-rose-400"
                            required
                            bind:value={chapterLine}
                            placeholder="번역할 챕터 내용을 넣고 줄 변환을 눌려주세요."
                        >
                        </textarea>
                    </label>
                    <div class="flex-1 block mt-6">
                        <span class="block font-bold text py-2">
                            저장 결과 미리보기
                        </span>
                        <div class="border min-h-20 rounded">
                            {#each chapterLines as line, idx}
                                <p
                                    contenteditable="true"
                                    class="m-2 p-2 bg-slate-100 min-h-10 editline"
                                    data-idx={idx}
                                    onkeydown={eventPreivewKeyDown}
                                    oninput={eventPreviewInput}
                                    bind:textContent={chapterLines[idx]}
                                >
                                </p>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</Frame>

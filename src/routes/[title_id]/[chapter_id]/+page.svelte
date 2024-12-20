<script lang="ts">
    const { data } = $props();
    const config = data.config;

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

    const fontWeightEmulated = fontWeightEmulate(config.viewFontFamily);

</script>

<article
    class="mx-auto p-4 {!config.viewWide ? 'container' : ''}"
    style:line-height={config.viewLineHeight}
    style:font-size={config.viewFontSize + "px"}
    style:--line-height={config.viewLineHeight + "rem"}
    style:--font-family={config.viewFontFamily}
    style:--font-weight={fontWeightEmulated}
>
    <div>
        <span>26話【開拓村の形ができたら、お見合いが始まります】</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> さて、私たちが開拓村に来てから三週間が経った。</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> この世界には、魔力があり、レベルがある。</span><span></span><span
        ></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            戦える人がその力を開拓事業に向ければ、現代技術もビックリの人間重機のような成果を持っている。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そして、一度手放した村などについては、魔物が蹂躙し、魔力によって繁殖力が増した植物などが急速に侵食していく。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そのために、長い時間を待たずして村の跡地など完全に埋れてしまうのだ。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            逆に魔力によって保護された建物などは、何百年、何千年経っても各地の遺跡となって残る。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「へぇ、そうした遺跡もあるのね」</span><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「チセの嬢ちゃんも子どもなんだな。こんな話に興味があるんだからな！」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「こんな話じゃないわよ。行ったことないし、知識も無いから興味を惹かれるわ」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「まぁ、知らないやつだと興味は惹かれるだろうな。けど、大抵はお宝なんて持ち出されて、隠し部屋なんかもない。ほとんどが管理されずに魔物が住み着くただの建造物だぜ」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            自嘲気味に笑う冒険者だが、確かに富と名声を求めた者にとってはハズレだろう。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> だが、私はそうは思わない。</span><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「素敵な話、ありがとう。いつかテトと一緒に行ってみることにするわ」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「魔女様と一緒に行くのです！」</span><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そう言って隣では、串焼きを食べていたテトが手を振り上げる。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> そして、開拓団の冒険者たちが苦笑を浮かべる。</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span>「行っちまうんだなぁ」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「ええ、村としての体裁が整ったら、また次の町に行くかな？」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            私のお陰か、開拓村の体裁は予定よりも大幅に短縮されて整った。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            更に短縮されて浮いた予算で追加人員が来て、家事全般の負担が減ったので、ガッシュさんと一緒に村の特産なども今から考えたり、追加人員の女性たちと一緒にご飯を作ったりして楽しんだ。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「チセさん、テトさん。その魔法の力を開拓の方に充ててください」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span>「えっ、嫌だけど……」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「なら、やってくれたら、依頼の報酬を増やします！　開拓団の男性たちと同じ銀貨2枚でどうですか！」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span>「なら、いいよ」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> 私は、労働力は安売りしない。</span><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            なので魔法使いとして畑や街道の整備、河川の増水対策をやった日だけ、報酬増額ということを決めた。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            その結果、開拓村は、普通は何年も掛けて畑の土を作っていかなければいけないのに、魔法で調整しているので、すぐに作付けができる状態にできた。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            それから町から村までの半分の距離は、町側が整備しているが、残り半分は、轍の目立つあぜ道である。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            それも土魔法で整地したので、馬の負担が少なく、町まで移動日数が三日から二日に短縮された。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「これで町からの移住者の受け入れがしやすいし、里帰りもしやすいですね」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span>「そう、よかったわね」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そんな感じでガッシュさんもなんだか吹っ切れて私たちを上手く使おうとしている。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            実際に国の優秀な魔法使いや魔法使いの冒険者を雇用するなら、一日銀貨5枚以上。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            ただ、優秀な魔法使いを1人雇っても、必ずしも開拓作業が大幅に短縮されるわけではなく、魔力切れもある。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そのため複数人をセットで運用し、更にそんな貴重な人材を護衛する人や、パーティーを組んでいる冒険者たちの分の日当、魔力切れに対するマナポーションの支給などを考えると、運用するには一日小金貨2～3枚は下らない。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そんな開拓事業では、稀少な魔法使いとして私とテトはバリバリ働く。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            魔力量が多いからマナポーションも必要ないし、休憩時には瞑想して魔力回復を図る。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> 一応Dランク冒険者なので自衛もできる。</span><span></span><span
        ></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そんな感じで強かなガッシュさんに使われ、思いっ切り魔法を使えるのでいい気分転換になる。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> そして、ついに待望の日がやってきた。</span><span></span><span
        ></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「ようこそ、開拓村へ。移住希望者ですね」</span><span></span><span
        ></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            男性所帯の冒険者たちはこの依頼を終えた後にも開拓村で暮らし続けるために、女性と技術者が多めで村への移住が開始され、第一弾として女性がやってきてお見合いパーティーとなる。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            冒険者の男たちは、二十代後半から三十代前半の人たちが多い。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            対して募集で集まった女性たちは、周囲の村々で家の手伝いで結婚できずに余ってしまった行き遅れ気味な女性や未亡人が多い。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> 家の手伝いもしていたので家事全般には不安はない。</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            なにより、危険の多い元冒険者の妻になることを了承してくれた、得がたい人たちだ。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> 周囲に呼び掛けるのに苦労した、とガッシュさん。</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「だって、みなさんには幸せになってほしいじゃないですか」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            この開拓事業で仲良くなった冒険者たちの幸せを願ってのことだ。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> そして、ガッシュさんの方は、と言えば――</span><span></span><span
        ></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「よろしくお願いします。マリーと言います」</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「よ、よ、よろしくお願いします！」</span><span></span><span
        ></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            オットー市に店を構える商家の娘のマリーさんとの婚約が決まっていた。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            ギャスパー伯爵家の七男と、この開拓事業を支援してくれた商家との政略結婚。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            伯爵家としては、ガッシュさんの行き先として開拓村を作り、そこの代官として男爵の地位と村長の役割を与えることで、ギャスパー伯爵領の税収を上げつつ、貴族の一門を増やす狙いがある。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            商家としては、ギャスパー伯爵に連なる貴族との繋がりと、開拓村という新たな販路確保。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そんな感じの政略結婚だが、こうして開拓支援に送られた女性とカップルになれなかった冒険者たちも次々とカップルとして成立し、村としての体裁が整っていく。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            農業の下準備はできたので、農業指導者から今の時期に間に合う作物を植えつつ、それぞれが住む家を建てたり、魔物討伐の狩猟を中心にしばらくはお金を稼いで、マリーさんの生家の商家から食料や嗜好品を購入していく予定だ。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> 全員が未来のビジョンが見え始めている。</span><span></span><span
        ></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そして、開拓村が安定して村の人たちが笑顔で生活している未来の中に、私がいる景色が想像できなかった。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「さて、そろそろ終わりかな」</span><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span>「えっ？」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「もう、私とテトは要らないんじゃないかな、って」</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            だから、そろそろ依頼は、完了でいいんじゃないだろうか、とガッシュさんに目を向ける。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「……そう、ですね。今までの仕事ぶりから報酬額を計算して、依頼達成書を書きます」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span>「ありがとう」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> 後は、この村に残る人の仕事だ。</span><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> 私は、テトを連れて村の外れの平原まで移動する。</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> そこは草地が覆われ、小さな花を咲かせている。</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            ここで山羊や羊などを放牧してもいいし、花の種を蒔いて、養蜂してもいいなどと話したのは記憶に新しい。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span>「ねぇ、魔女様～？」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span>「うん？　なに、テト？」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「魔女様は、この村に残りたいと思わないのですか？」</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span>「うーん？」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> 私は、悩み、ぽつりと呟く。</span><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「ダリルの町で本を買ったのを覚えている？」</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span>「はい、なのです」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> 魔法書や魔法や魔力に関する本だ。</span><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> その中に、ある一文が書かれてた。</span><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「――『魔力が多い人は、身体的な全盛期が長く訪れ、長命化する傾向がある』だって」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            開拓団にいた魔法使いの冒険者で一番魔力量が多い人は、5000と今の私と同等だ。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span> それでも40歳なのに外見年齢は30代前半と若々しい。</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            それに【身体強化】を使える冒険者も総じて若々しくあるし、魔法使いや魔法が得意な長命種族であるエルフなどは、長寿・長命であることは聞いている。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「私の魔力量は5000を超えて、これからもどんどん増やしていくつもりなのよね」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            不思議な木の実を一ヶ月食べ続ければ、500～1000くらいの魔力が増える。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            最初は、伸び幅が小さかったが、魔力が増えるほどに伸び幅が大きくなり始めていた。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「そうなると、ドンドンと老いが遅く、寿命が延びると思う。私がこの村に居着いてもずっと姿が変わらないままだと思うと……ちょっと寂しいな、って思って」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >【不思議な木の実】を食べ続けることは、私の【創造魔法】で生み出せる物の範囲を増やし、私を強くするはずだ。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            だが、その代償は、人と違う時間を歩むことになるらしい。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >「うーん？　テトは、魔女様がいるから寂しくないと思うのです。でも、魔女様は寂しいと思うのですか？」</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            テトにとっての世界は、自分と私、それ以外って括りなので、イマイチ理解していないようだが、確かにテトが居れば寂しくないだろう。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            テトの素直な気持ちに苦笑する私は、そのまま平原に寝っ転がり、テトの太ももに頭を乗せる。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>「……ちょっとだけナイーブかも。甘えさせて」</span><span
        ></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span>「はいなのです！」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            村はお見合い状態で、私はテトとのんびりと過ごしていく。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            そして、日が沈み、この村を気に入った人はこのままここに住み込み、少しずつ村を盛り立てるはずだ。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span>「さて、帰りましょうか」</span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>
            一緒にはいられないけど、旅を続けた十年後や二十年後にこの村に戻ってきて、発展を目にするのも楽しいかも知れない、と気持ちを切り替えたのだった。</span
        ><span></span><span></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span>読んでいただきありがとうございます。</span><span></span><span
        ></span>
    </div>
    <div><span></span><span></span><span></span></div>
    <div><span></span><span></span><span></span></div>
    <div>
        <span
            >面白いと思った方は、『ブックマーク』や下記のポイント評価を押していただけたら幸いです。</span
        ><span></span><span></span>
    </div>
</article>
<div
    class="{config.scrollShow
        ? 'block'
        : 'hidden'} fixed bottom-[25%] right-[15%]"
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

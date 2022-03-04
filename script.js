const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");

// 非同期でランダムな文章を取得する
function GetRandomSentence() {
    return fetch(RANDOM_SENTENCE_URL_API)
        .then((response) => response.json())
        .then((data) => data.content);
}

// ランダムな文章を取得して、表示する
async function RenderNextSentence() {
    const sentence = await GetRandomSentence();
    console.log(sentence);
    typeDisplay.innerText = sentence;

    // 文章を1文字ずつ分解して、spanタグを生成する
}

RenderNextSentence();





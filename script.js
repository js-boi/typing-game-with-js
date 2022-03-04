const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";

// 非同期でランダムな文章を取得する
function GetRandomSentence() {
    return fetch(RANDOM_SENTENCE_URL_API)
        .then((response) => response.json())
        .then((data) => data.content);
}

// ランダムな文章を取得して、表示する
function RenderNextSentence() {
    const sentence = GetRandomSentence();
    console.log(sentence);
}

RenderNextSentence();





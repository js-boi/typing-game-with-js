const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");

// inputテキストが合っているかどうか判定
typeInput.addEventListener("input", () => {
    const sentenceArray = typeDisplay.querySelectorAll("span");
    // console.log(sentenceArray);
    const arrayValue = typeInput.value.split(""); // 入力した文字を分解する
    // console.log(arrayValue);


    sentenceArray.forEach((characterSpan, index) => {
        if ((arrayValue[index] == null)) {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
        } else if (characterSpan.innerText == arrayValue[index]) {
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        } else {
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
        }
    })
})


// 非同期でランダムな文章を取得する
function GetRandomSentence() {
    return fetch(RANDOM_SENTENCE_URL_API)
        .then((response) => response.json())
        .then((data) => data.content);
}

// ランダムな文章を取得して、表示する
async function RenderNextSentence() {
    const sentence = await GetRandomSentence();
    // console.log(sentence);
    typeDisplay.innerText = "";

    // 文章を1文字ずつ分解して、spanタグを生成する
    let oneText = sentence.split("");
    // console.log(oneText);

    oneText.forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        // console.log(characterSpan);
        typeDisplay.appendChild(characterSpan);
        // characterSpan.classList.add("correct");
    })

    // テキストボックスの中身を消す
    typeInput.innerText = "";
}

RenderNextSentence();





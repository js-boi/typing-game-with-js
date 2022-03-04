const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("./audio/typing-sound.mp3");
const wrongSound = new Audio("./audio/wrong.mp3");
const correctSound = new Audio("./audio/correct.mp3");

/* inputテキスト入力。合っているかどうかの判定 */
typeInput.addEventListener("input", () => {
    /* タイプ音をつける */
    typeSound.play();
    typeSound.currentTime = 0;

    /* 文字と文字を比較する */
    /* ディスプレイに表示されてるSpanタグを取得 */
    const sentence = typeDisplay.querySelectorAll("span");
    /* 自分で打ち込んだテキストを取得 */
    const arrayValue = typeInput.value.split("");
    let correct = true;
    sentence.forEach((characterSpan, index) => {
        if (arrayValue[index] == null) {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        } else if (characterSpan.innerText === arrayValue[index]) {
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        } else {
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
            correct = false;
            wrongSound.volume = 0.3;
            wrongSound.play();
            wrongSound.currentTime = 0;
        }
    });

    /* 次の文章へ */
    if (correct) {
        correctSound.play();
        correctSound.currentTime = 0;
        RenderNextSentence();
    }
});


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
    typeInput.value = "";

    StartTimer();
}


let startTime;
let originTime = 30;

function StartTimer() {
    timer.innerText = originTime;
    startTime = new Date();
    // console.log(startTime);

    setInterval(() => {
        timer.innerText = originTime - GetTimerTime();
        if (timer.innerText <= 0) TimeUp();
    }, 1000);
}

// カウントダウンする（カウントし始めた時間 - 現在の時刻）
function GetTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

function TimeUp() {
    RenderNextSentence();
}


RenderNextSentence();





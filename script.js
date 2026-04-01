const questions = [
  { kanji: "曖昧", reading: "あいまい" },
  { kanji: "琴線", reading: "きんせん" },
  { kanji: "乖離", reading: "かいり" },
  { kanji: "脆弱", reading: "ぜいじゃく" },
  { kanji: "模索", reading: "もさく" }
];

let currentQuestion = null;
let score = 0;
let timeLeft = 60;
let timer = null;
let playing = false;

const kanjiEl = document.getElementById("kanji");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

function pickQuestion() {
  const index = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[index];
  kanjiEl.textContent = currentQuestion.kanji;
  inputEl.value = "";
  messageEl.textContent = "";
}

function startGame() {
  score = 0;
  timeLeft = 60;
  playing = true;

  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  inputEl.disabled = false;
  inputEl.focus();

  pickQuestion();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  playing = false;
  clearInterval(timer);
  inputEl.disabled = true;
  messageEl.textContent = `終了！ スコア: ${score}`;
}

inputEl.addEventListener("input", () => {
  if (!playing || !currentQuestion) return;

  const value = inputEl.value.trim();

  if (value === currentQuestion.reading) {
    score++;
    scoreEl.textContent = score;
    messageEl.textContent = "正解！";

    inputE1.value = ""; //

    pickQuestion();
  }
});

startBtn.addEventListener("click", startGame);

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const quoteElem = document.getElementById("quote");
const input = document.getElementById("input");
const timeElem = document.getElementById("time");
const wpmElem = document.getElementById("wpm");
const accuracyElem = document.getElementById("accuracy");
const finalWpmElem = document.getElementById("finalWpm");
const finalAccuracyElem = document.getElementById("finalAccuracy");

const quotes = [
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes.",
  "In order to be irreplaceable, one must always be different.",
  "Java is to JavaScript what car is to carpet."
];

let time = 30;
let timer;
let isPlaying = false;
let quote = "";
let typed = "";

function startGame() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  result.classList.add("hidden");
  resetGame();
}

function resetGame() {
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElem.textContent = quote;
  input.value = "";
  time = 30;
  isPlaying = true;
  typed = "";
  timeElem.textContent = time;
  wpmElem.textContent = 0;
  accuracyElem.textContent = 0;
  input.disabled = false;
  input.focus();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (time > 0) {
    time--;
    timeElem.textContent = time;
    updateStats();
  } else {
    endGame();
  }
}

function updateStats() {
  typed = input.value;
  const words = typed.trim().split(/\s+/).length;
  const correctChars = typed.split("").filter((ch, i) => ch === quote[i]).length;
  const accuracy = (correctChars / quote.length) * 100;
  const wpm = Math.round((words / (30 - time + 1)) * 60);

  accuracyElem.textContent = accuracy.toFixed(1);
  wpmElem.textContent = isNaN(wpm) ? 0 : wpm;
}

function endGame() {
  clearInterval(timer);
  isPlaying = false;
  input.disabled = true;

  finalWpmElem.textContent = wpmElem.textContent;
  finalAccuracyElem.textContent = accuracyElem.textContent;

  game.classList.add("hidden");
  result.classList.remove("hidden");
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", resetGame);
tryAgainBtn.addEventListener("click", () => {
  result.classList.add("hidden");
  intro.classList.remove("hidden");
});

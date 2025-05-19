const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const input = document.getElementById("wordInput");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");

let fallingWords = [];
let score = 0;
let lives = 3;
const wordList = ["cat", "dog", "sun", "box", "red", "pen", "code", "ball", "free", "doom"];

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function spawnWord() {
  const word = getRandomWord();
  const x = Math.random() * (canvas.width - 60);
  fallingWords.push({ word, x, y: 0, speed: 1 + Math.random() * 2 });
}

function drawWords() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  fallingWords.forEach(w => {
    ctx.fillText(w.word, w.x, w.y);
    w.y += w.speed;
  });
}

function checkCollision() {
  fallingWords = fallingWords.filter(w => {
    if (w.y > canvas.height - 20) {
      lives--;
      livesEl.textContent = lives;
      if (lives <= 0) gameOver();
      return false;
    }
    return true;
  });
}

function gameOver() {
  alert("Game Over! Final Score: " + score);
  location.reload();
}

function gameLoop() {
  drawWords();
  checkCollision();
  requestAnimationFrame(gameLoop);
}

input.addEventListener("input", () => {
  const typed = input.value.trim().toLowerCase();
  const matchIndex = fallingWords.findIndex(w => w.word === typed);
  if (matchIndex !== -1) {
    fallingWords.splice(matchIndex, 1);
    score += 10;
    scoreEl.textContent = score;
    input.value = "";
  }
});

setInterval(spawnWord, 1500);
ctx.font = "20px Arial";
gameLoop();
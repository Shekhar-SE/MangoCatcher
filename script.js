let player = document.getElementById('player');
let object = document.getElementById('object');
let scoreDisplay = document.getElementById('score');
let highScoreDisplay = document.getElementById('highScore');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let backgroundMusic = document.getElementById('backgroundMusic');
let catchSound = document.getElementById('catchSound');
let container = document.querySelector('.game-container');
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let isGameOver = false;
let isGameRunning = false;
let animationFrameId;

//setting the initial positions
let playerPosition = 175; //putting the player bar in the middle
let objectPosition = { top: 10, left: Math.random() * 350, direction: 10 };

highScoreDisplay.innerText = highScore;

document.addEventListener('keydown', movePlayer);
startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);

function movePlayer(e) {
  if (!isGameRunning) return;

  if (e.keyCode === 37 && playerPosition > 0) {
    playerPosition -= 30;
  } else if (e.keyCode === 39 && playerPosition < 300) { //increased the bucket width
    playerPosition += 30;
  }

  player.style.left = playerPosition + 'px';
}

function startGame() {
  if (isGameRunning) return;

  isGameRunning = true;
  isGameOver = false;
  score = 0;
  scoreDisplay.innerText = score;
  playerPosition = 175;
  objectPosition.top = 0;
  objectPosition.left = Math.random() * 350;
  objectPosition.direction = 5;

  player.style.left = playerPosition + 'px';
  object.style.left = objectPosition.left + 'px';
  object.style.top = objectPosition.top + 'px';

  backgroundMusic.play();
  dropObject();
}

function stopGame() {
  if (!isGameRunning) return;

  isGameRunning = false;
  isGameOver = true;
  backgroundMusic.pause();
  cancelAnimationFrame(animationFrameId);
}

function dropObject() {
  if (!isGameRunning) return;

  objectPosition.top += objectPosition.direction;
  object.style.top = objectPosition.top + 'px';

  //to check the collision
  if (objectPosition.top > 500 && objectPosition.left > playerPosition - 5 && objectPosition.left < playerPosition + 50) {
    score++;
    scoreDisplay.innerText = score;
    catchSound.play(); // Play catch sound
    resetObject();
  }

  //checking if the mango not catched in the box.
  if (objectPosition.top > 500) {
    gameOver();
  } else {
    animationFrameId = requestAnimationFrame(dropObject);
  }
}

function resetObject() {
  objectPosition.top = 0;
  objectPosition.left = Math.random() * 350;
  object.style.left = objectPosition.left + 'px';
  object.style.top = objectPosition.top + 'px';
}

function gameOver() {
  isGameRunning = false;
  isGameOver = true;
  backgroundMusic.pause();
  alert(`Game Over! Your score: ${score}`);
  
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    highScoreDisplay.innerText = highScore;
  }

  cancelAnimationFrame(animationFrameId);
}

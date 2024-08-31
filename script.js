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

<<<<<<< HEAD
// Set initial positions
let playerPosition = 175; // Player starts in the middle
let objectPosition = { top: 10, left: Math.random() * 350, direction: 3, speedIncrease: 0.5 }; // Slower initial speed
=======
//setting the initial positions
let playerPosition = 175; //putting the player bar in the middle
let objectPosition = { top: 10, left: Math.random() * 350, direction: 10 };
>>>>>>> 8ce9a71e96c8697e6b78f9d8e322b3e57871b2ae

highScoreDisplay.innerText = highScore;

document.addEventListener('keydown', movePlayer);
startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);

function movePlayer(e) {
  if (!isGameRunning) return;

  if (e.keyCode === 37 && playerPosition > 0) {
<<<<<<< HEAD
    playerPosition -= 20;
  } else if (e.keyCode === 39 && playerPosition < 330) { // Adjusted for smoother movement
    playerPosition += 20;
=======
    playerPosition -= 30;
  } else if (e.keyCode === 39 && playerPosition < 300) { //increased the bucket width
    playerPosition += 30;
>>>>>>> 8ce9a71e96c8697e6b78f9d8e322b3e57871b2ae
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
  objectPosition.direction = 3; // Reset to initial speed
  objectPosition.speedIncrease = 0.5;

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

<<<<<<< HEAD
  // Check for collision with player (bucket)
  if (objectPosition.top > 500 && objectPosition.left > playerPosition - 5 && objectPosition.left < playerPosition + 70) {
=======
  //to check the collision
  if (objectPosition.top > 500 && objectPosition.left > playerPosition - 5 && objectPosition.left < playerPosition + 50) {
>>>>>>> 8ce9a71e96c8697e6b78f9d8e322b3e57871b2ae
    score++;
    scoreDisplay.innerText = score;
    catchSound.play(); // Play catch sound
    resetObject();

    // Gradually increase difficulty
    if (score % 15 === 0) {
      objectPosition.direction += objectPosition.speedIncrease;
    }
  }

<<<<<<< HEAD
  // Check if the object hits the bottom (missed catch)
  if (objectPosition.top > 550) {
=======
  //checking if the mango not catched in the box.
  if (objectPosition.top > 500) {
>>>>>>> 8ce9a71e96c8697e6b78f9d8e322b3e57871b2ae
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
  object.style.opacity = 0; // Make mango fade instantly after a catch

  // Fade back in for next drop
  setTimeout(() => {
    object.style.opacity = 1;
  }, 50);
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

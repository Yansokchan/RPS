let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  lose: 0,
  tie: 0,
};
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1500);
    isAutoPlaying = true;
    document.querySelector(".auto-play").innerHTML = "Stop Play";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".auto-play").innerHTML = "Auto Play";
  }
}
updateScoreElement();

document.querySelector(".rock-btn").addEventListener("click", () => {
  playGame("rock");
});
document.querySelector(".paper-btn").addEventListener("click", () => {
  playGame("paper");
});
document.querySelector(".scissors-btn").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result1 = "";
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result1 = "Tie";
    } else if (computerMove === "raper") {
      result1 = "You Lose";
    } else if (computerMove === "scissors") {
      result1 = "You Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result1 = "You Win";
    } else if (computerMove === "paper") {
      result1 = "Tie";
    } else if (computerMove === "scissors") {
      result1 = "You Lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result1 = "You Lose";
    } else if (computerMove === "paper") {
      result1 = "You Win";
    } else if (computerMove === "scissors") {
      result1 = "Tie";
    }
  }

  if (result1 === "You Win") {
    score.win++;
  } else if (result1 === "You Lose") {
    score.lose++;
  } else if (result1 === "Tie") {
    score.tie++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
  document.querySelector(".js-result").innerHTML = result1;
  document.querySelector(
    ".js-move"
  ).innerHTML = `You <img src="${playerMove}-emoji.png"> VS <img src="${computerMove}-emoji.png"> Computer`;
}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:   ${score.win},      Loses:   ${score.lose},    Ties:   ${score.tie}, `;
}
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  let pic;
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

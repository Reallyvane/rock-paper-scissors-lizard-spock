function game() {
  const options = ["rock", "paper", "scissors", "lizard", "spock"];
  const winResults = [
    "scissorspaper",
    "paperrock",
    "rocklizard",
    "lizardspock",
    "spockscissors",
    "rockscissors",
    "scissorslizard",
    "lizardpaper",
    "paperspock",
    "spockrock",
  ];

  let userPick = "";
  let housePick = "";

  const userChoiceElement = document.querySelector(".card-container");
  const pickedElement = document.querySelector(".picked");
  const userPickElement = document.querySelector(".user-pick");
  const housePickElement = document.querySelector(".house-pick");
  const resultElement = document.querySelector(".result");
  const resultTitleElement = resultElement.querySelector(".title");
  const scoreCountElement = document.querySelector(".score-count");

  const rulesBtn = document.querySelector(".rules-btn");
  const modalBg = document.querySelector(".modal-bg");
  const modal = document.querySelector(".modal");

  let currentScore = null;

  window.addEventListener("load", () => {
    retrieveScoreFromLocalStorage();

    document.querySelectorAll(".card-container .card").forEach((card) => {
      card.addEventListener("click", (e) => {
        userPick = getUserPick(e.target);
        housePick = getHousePick();

        startGame();
      });
    });

    resultElement.querySelector("button").addEventListener("click", tryAgain);
  });

  function startGame() {
    calculateWinner(userPick, housePick);
    userChoiceElement.classList.add("hidden");
    pickedElement.classList.remove("hidden");
    clearResultBeforeAppend();
    buildChoiceElement(true, userPick);
    buildChoiceElement(false, housePick);
  }

  function getUserPick(target) {
    if (target.nodeName === "IMG") {
      return target.parentElement.classList[1];
    }
    return target.classList[1];
  }

  function getHousePick() {
    return options[Math.floor(Math.random() * 5)];
  }

  function calculateWinner(user, house) {
    if (user === house) {
      resultTitleElement.innerText = "Tie";
    } else if (getUserWinsStatus(user + house)) {
      resultTitleElement.innerText = "You win";
      calculateScore(1);
    } else {
      resultTitleElement.innerText = "You lose";
      calculateScore(-1);
    }
  }

  function getUserWinsStatus(result) {
    return winResults.some((winStr) => winStr === result);
  }

  function buildChoiceElement(isItUserElement, className) {
    const el = document.createElement("div");
    el.classList = [`card ${className}`];
    el.innerHTML = `<img src="./images/icon-${className}.svg" alt="${className}">`;
    if (isItUserElement) {
      userPickElement.append(el);
    } else {
      housePickElement.append(el);
    }
  }

  function tryAgain() {
    userChoiceElement.classList.remove("hidden");
    pickedElement.classList.add("hidden");
  }

  function clearResultBeforeAppend() {
    userPickElement.innerHTML = "";
    housePickElement.innerHTML = "";
  }

  function calculateScore(roundResult) {
    currentScore += roundResult;
    updateScoreBoard();
  }

  function retrieveScoreFromLocalStorage() {
    const score = +window.localStorage.getItem("gameScore") || 0;
    currentScore = score;
    updateScoreBoard();
  }

  function updateScoreBoard() {
    scoreCountElement.innerText = currentScore;
    window.localStorage.setItem("gameScore", currentScore);
  }

  rulesBtn.addEventListener("click", () => {
    modal.classList.add("active");
    modalBg.classList.add("active");
  });

  modalBg.addEventListener("click", (event) => {
    if (event.target === modalBg) {
      hideModal();
    }
  });

  document.querySelector(".close").addEventListener("click", hideModal);

  function hideModal() {
    modal.classList.remove("active");
    modalBg.classList.remove("active");
  }
}

game();

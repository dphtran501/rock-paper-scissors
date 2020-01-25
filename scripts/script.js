const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const PLAYER = "PLAYER";
const COMPUTER = "COMPUTER";

const selectionButtons = document.querySelectorAll('.selection-button');
selectionButtons.forEach((button) => {
    button.addEventListener('click', onSelectionClick);
})

const replayButton = document.querySelector('#replay-button');
replayButton.addEventListener('click', onReplayClick);

function onSelectionClick(e) {
    const playerSelectionImage = document.querySelector("#player-selection-image");
    let playerSelection = playerPlay(e.target);
    setSelectionImage(playerSelectionImage, playerSelection);

    const computerSelectionImage = document.querySelector("#computer-selection-image");
    let computerSelection = computerPlay();
    setSelectionImage(computerSelectionImage, computerSelection);

    let results = playRound(playerSelection, computerSelection)
    const gameStatus = document.querySelector("#game-status");
    gameStatus.textContent = results;
    calculateScore(results);
}

function onReplayClick(e) {
    const gameStatus = document.querySelector("#game-status");
    if (gameStatus.textContent == "YOU WIN!") {
        gameStatus.classList.remove('game-status--win');
    }
    else if (gameStatus.textContent == "YOU LOSE!") {
        gameStatus.classList.remove('game-status--lose');
    }
    gameStatus.textContent = "Choose below:";

    const playerSelectionImage = document.querySelector("#player-selection-image");
    const computerSelectionImage = document.querySelector("#computer-selection-image");
    playerSelectionImage.style.visibility = 'hidden';
    computerSelectionImage.style.visibility = 'hidden';

    const playerScoreElement = document.querySelector("#player-score");
    const computerScoreElement = document.querySelector("#computer-score");
    playerScoreElement.textContent = 0;
    computerScoreElement.textContent = 0;

    selectionButtons.forEach((button) => {
        button.classList.add('selection-button--hover');
        button.addEventListener('click', onSelectionClick);
    })

    replayButton.style.visibility = 'hidden';
}

function playerPlay(button) {
    switch (button.id) {
        case "rock-button":
            return ROCK;
        case "paper-button":
            return PAPER;
        case "scissors-button":
            return SCISSORS;
    }
}

function computerPlay() {
    let choice = Math.floor(Math.random() * 3);
    switch (choice) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        default:
            return SCISSORS;  // Even if choice != 2, computer should still have a valid selection. 
    }
}

function setSelectionImage(image, selection) {
    if (selection === ROCK) {
        image.setAttribute('src', 'images/rock.svg');
    }
    else if (selection === PAPER) {
        image.setAttribute('src', 'images/paper.svg');
    }
    else if (selection === SCISSORS) {
        image.setAttribute('src', 'images/scissors.svg');
    }

    image.style.visibility = 'visible';
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === ROCK) {
        if (computerSelection === ROCK) {
            return "It's a tie! Both players chose rock.";
        }
        else if (computerSelection === PAPER) {
            return "You lose! Paper covers rock.";
        }
        else {
            return "You win! Rock crushes scissors.";
        }
    }
    else if (playerSelection === PAPER) {
        if (computerSelection === ROCK) {
            return "You win! Paper covers rock.";
        }
        else if (computerSelection === PAPER) {
            return "It's a tie! Both players chose paper.";
        }
        else {
            return "You lose! Scissor cuts paper.";
        }
    }
    else if (playerSelection === SCISSORS) {
        if (computerSelection === ROCK) {
            return "You lose! Rock crushes scissors.";
        }
        else if (computerSelection === PAPER) {
            return "You win! Scissors cuts paper.";
        }
        else {
            return "It's a tie! You both chose scissors.";
        }
    }
}

function calculateScore(results) {
    if (results.indexOf("You win!") > -1) {
        const playerScoreElement = document.querySelector("#player-score");
        let playerScore = Number(playerScoreElement.textContent);
        playerScoreElement.textContent = ++playerScore;
        if (playerScore == 5) {
            endGame(PLAYER);
        }
    }
    else if (results.indexOf("You lose!") > -1) {
        const computerScoreElement = document.querySelector("#computer-score");
        let computerScore = Number(computerScoreElement.textContent);
        computerScoreElement.textContent = ++computerScore;
        if (computerScore == 5) {
            endGame(COMPUTER);
        }
    }
}

function endGame(winner) {
    const gameStatus = document.querySelector("#game-status");
    if (winner === PLAYER) {
        gameStatus.textContent = "YOU WIN!";
        gameStatus.classList.add('game-status--win');
    }
    else if (winner === COMPUTER) {
        gameStatus.textContent = "YOU LOSE!"
        gameStatus.classList.add('game-status--lose');
    }

    selectionButtons.forEach((button) => {
        button.classList.remove('selection-button--hover');
        button.removeEventListener('click', onSelectionClick);
    })

    replayButton.style.visibility = 'visible';

}
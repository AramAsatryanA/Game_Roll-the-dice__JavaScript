'use strict';

// const namePlayer1 = document.querySelector('#name-1');
// const namePlayer2 = document.querySelector('#name-2');
// //! --- Enter names of the players
// namePlayer1.textContent = prompt("Please, enter name of the first player");
// namePlayer2.textContent = prompt("Please, enter name of the second player");

//* --- Getting elements from HTML
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');

const scorePlayer1 = document.getElementById('score-1');
const scorePlayer2 = document.getElementById('score-2');

const curScorePlayer1 = document.getElementById('current-1');
const curScorePlayer2 = document.getElementById('current-2');

const diceImg = document.querySelector('.dice-img');
const newGame = document.querySelector('.btn-new');
const rollDice = document.querySelector('.btn-roll');
const holdScore = document.querySelector('.btn-hold');

//* --- Game playing process
let playingGame = true;

//* --- Generate a random dice number
const getDiceNum = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

//* --- Change active player
const changeActivePlayer = function () {
  // to remove the class, if it contains and to add, if doesn't
  player1.classList.toggle('player-active');
  player2.classList.toggle('player-active');

  curScorePlayer1.textContent = 0;
  curScorePlayer2.textContent = 0;
};

//* --- Check winner and end the game. If not - change active player
const checkWinner = function () {
  if (+scorePlayer1.textContent >= 101) {
    player1.classList.add('game-winner');
    player1.classList.remove('player-active');
    diceImg.classList.add('hidden');

    //! --- End the game
    playingGame = false;
  } else if (+scorePlayer2.textContent >= 101) {
    player2.classList.add('game-winner');
    player2.classList.remove('player-active');
    diceImg.classList.add('hidden');

    playingGame = false;
  } else {
    changeActivePlayer();
  }
};

//todo --- Game playing process
rollDice.addEventListener('click', function () {
  //! will work only if game playing is in process
  if (playingGame) {
    // Roll the dice
    let dice = getDiceNum();

    // Show the dice image
    diceImg.classList.remove('hidden');
    diceImg.src = `png/dice-${dice}.png`;

    // Make Player 1 active player
    if (player1.classList.contains('player-active')) {
      // Check dice and ...
      if (dice !== 1) {
        // Add dice to the current score of the player
        curScorePlayer1.textContent = +curScorePlayer1.textContent + dice;
      } else {
        // Change active player, dice === 1
        changeActivePlayer();
      }
    } else {
      // Make Player 2 active player

      if (dice !== 1) {
        curScorePlayer2.textContent = +curScorePlayer2.textContent + dice;
      } else {
        changeActivePlayer();
      }
    }
  }
});

//todo --- Hold current score
holdScore.addEventListener('click', function () {
  //! will work only if game playing is in process
  if (playingGame) {
    if (player1.classList.contains('player-active')) {
      scorePlayer1.textContent =
        +scorePlayer1.textContent + +curScorePlayer1.textContent;
    } else {
      scorePlayer2.textContent =
        +scorePlayer2.textContent + +curScorePlayer2.textContent;
    }

    //* --- to check the winning condition
    checkWinner();
  }
});

//todo --- Play a New Game
newGame.addEventListener('click', function () {
  // //! --- Enter names of the players
  // namePlayer1.textContent = prompt("Please, enter name of the first player");
  // namePlayer2.textContent = prompt("Please, enter name of the second player");

  playingGame = true;

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  curScorePlayer1.textContent = 0;
  curScorePlayer2.textContent = 0;

  diceImg.classList.add('hidden');

  player1.classList.remove('game-winner');
  player2.classList.remove('game-winner');

  player1.classList.add('player-active');
  player2.classList.remove('player-active');
});

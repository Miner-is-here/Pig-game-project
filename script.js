'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Rolling the dice
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// when roll dice button clicked, random number from 1-6, show the number of the dice and add to the current score
// changing the players
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // 0 = player 1, 1 = player 2
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.remove('hidden');
  // remove winner title from the player and add active player to the first player
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //   generating random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNumber}.png`;

    // check for rolled 1
    // sum the score to the current score
    if (diceNumber !== 1) {
      // add to to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player's  score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // if we have winner we cannot have at the same time the atribut player active, therefore we must remove it
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// when newGame button pressed, then we want to reset all the initial conditions of the game
btnNew.addEventListener('click', init);

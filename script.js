'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  btnRoll.disabled = false;
  btnHold.disabled = false;
};
init();

btnRoll.addEventListener('click', () => {
  //roll dice
  const dice = Math.trunc(Math.random() * 6) + 1;

  //load dice to page
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    console.log('przed' + currentScore);
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    console.log('po' + currentScore);
    console.log(dice);
  } else {
    //switch to next player
    changePlayer();
  }
});

btnHold.addEventListener('click', () => {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    btnRoll.disabled = true;
    btnHold.disabled = true;
  } else {
    changePlayer();
  }
});

function changePlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add('player--active');
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnNew.addEventListener('click', init);

// Input box so that user can enter a number
// Buttons: Click, Reset
// responsible UI

// get a reference
const userInput = document.getElementById('user-input');
const btnEnter = document.getElementById('btnEnter');
const btnReset = document.getElementById('btnReset');
const burst = document.querySelector('.fa-burst');
const bomb = document.querySelector('.fa-bomb');
let message = document.querySelector('.message');
let computer = 0;
window.addEventListener('DOMContentLoaded', play());

// array to store user input
let userNumbers = [];
let attempts = 1;
let userWins = 0;
let computerWins = 0;

// computer generate a random number
function generateRandomNumber() {
  computer = Math.floor(Math.random() * 100) + 1;
  console.log(computer);
}

function play() {
  event.preventDefault();
  btnEnter.addEventListener('click', play);
  btnReset.addEventListener('click', reset);
  // parseInt
  let userValue = parseInt(userInput.value);
  const remainedAttampt = 5 - attempts;

  message.classList.remove('d-none');
  message.textContent = `You have ${remainedAttampt} times left`;

  // user can enter a number between 1 and 100
  if (userValue < 1 || userValue > 100) {
    alert('Please enter a number between 1 and 100');
    return;
  }

  // valid user input is already exist
  if (userNumbers.includes(userValue)) {
    alert('The number is already exist. Please try again');
    return;
  }

  // increase user attempt
  attempts++;
  // store user input into the array
  userNumbers.push(userValue);

  // if user input value is the same number with computer, display a message
  if (userValue > computer) {
    // if user input value is a large number than computer, display Down!
    alert('Down!');
  } else if (userValue < computer) {
    // if user input value is a small number than computer, display Up!
    alert('Up!');
  } else {
    // if user typed the same number with the history, display an error
    alert('Bingo!');
  }

  // user have five chances
  if (attempts == 5) {
    alert('Game Over!');
    // when game over - enter button disabled
    btnEnter.disabled = true;

    burst.classList.remove('d-none');
    bomb.classList.add('d-none');
  }
}

function reset() {
  // Reset
  userInput = '';
  generateRandomNumber();
  btnEnter.disabled = false;

  burst.classList.add('d-none');
  bomb.classList.remove('d-none');
}

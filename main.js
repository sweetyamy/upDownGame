// get a reference
const userInput = document.getElementById('user-input');
const btnEnter = document.getElementById('btnEnter');
const btnReset = document.getElementById('btnReset');
const burst = document.querySelector('.fa-burst');
const bomb = document.querySelector('.fa-bomb');
let message = document.querySelector('.message');
let result = document.querySelector('.result');
let remained = document.querySelector('.remained');
let count = document.querySelector('.count');
const title = document.querySelector('.title');

// reference to show modal when user submit
const modalElement = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const modal = new bootstrap.Modal(modalElement);
// Event listener to close the modal and redirect to list.html
document.getElementById('close-modal-button').addEventListener('click', () => {
  modal.hide();
});

// array to store user input
let computer = 0;
let userNumbers = [];
let attempts = 1;

btnEnter.addEventListener('click', play);
btnReset.addEventListener('click', reset);
generateRandomNumber();

// computer generate a random number
function generateRandomNumber() {
  computer = Math.floor(Math.random() * 100) + 1;
  console.log(computer);
}

function play() {
  // parseInt
  let userValue = parseInt(userInput.value);
  const remainedAttampt = 5 - attempts;

  message.classList.add('d-none');
  remained.classList.remove('d-none');
  remained.textContent = `You have ${remainedAttampt} times left`;
  count.textContent = remainedAttampt;

  // user can enter a number between 1 and 100
  if (userValue < 1 || userValue > 100) {
    showMessage('Please enter a number between 1 and 100');
    return;
  }

  // valid user input is already exist
  if (userNumbers.includes(userValue)) {
    showMessage('The number is already exist. Please try again');
    return;
  }

  // increase user attempt
  attempts++;
  // store user input into the array
  userNumbers.push(userValue);

  // if user input value is the same number with computer, display a message
  if (userValue > computer) {
    // if user input value is a large number than computer, display Down!
    result.classList.remove('d-none');
    result.textContent = 'Down!!!';
    result.style.color = 'var(--bs-primary)';
  } else if (userValue < computer) {
    // if user input value is a small number than computer, display Up!
    result.classList.remove('d-none');
    result.textContent = 'UP!!!';
    result.style.color = 'var(--bs-danger)';
  } else {
    // if user typed the same number with the history, display an error
    result.classList.remove('d-none');
    result.textContent = 'Bingo!!!';
    result.style.color = 'var(--bs-warning)';
    result.style.fontSize  = '5rem';
    remained.innerHTML = `If you want to play again, click <strong>&lt;New Play Game&gt;</strong> button`;
    btnEnter.disabled = true;
    title.classList.add('d-none');
    bomb.classList.add('d-none');
    btnEnter.classList.add('d-none');
    btnReset.classList.add('d-none');
    generateNewPlayBtn();
  }

  // user have five chances
  if (attempts > 5) {
    // when game over - enter button disabled
    btnEnter.disabled = true;
    burst.classList.remove('d-none');
    remained.classList.add('d-none');
    result.classList.add('d-none');
    bomb.classList.add('d-none');
    count.textContent = 'Game Over!';
  }
}

// new play button
function generateNewPlayBtn() {
  const buttonContainer = document.getElementById('button-container');
  const eleBtnNewGame = document.createElement('button');
  eleBtnNewGame.id = "btnNewPlay";
  eleBtnNewGame.className = 'btn btn-primary mt-3';
  eleBtnNewGame.textContent = 'Play New Game';
  eleBtnNewGame.addEventListener('click', reset);
  buttonContainer.appendChild(eleBtnNewGame);
}

// display messages to modal
function showMessage(warning) {
  modalMessage.textContent = warning;
  modal.show();
}

function reset() {
  // Reset
  userInput.value = ''; 
  generateRandomNumber();
  btnEnter.disabled = false;
  burst.classList.add('d-none');
  bomb.classList.remove('d-none');
  message.classList.remove('d-none');
  result.classList.add('d-none'); 
  remained.classList.add('d-none');
  attempts = 1; 
  userNumbers = [];
  count.textContent = 5;
}

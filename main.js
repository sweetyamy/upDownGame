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

userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    btnEnter.click();
  }
});

generateRandomNumber();

// computer generate a random number
function generateRandomNumber() {
  computer = Math.floor(Math.random() * 100) + 1;
  console.log(computer);
}

function play() {
  // Check if user input is empty
  if (!userInput.value) {
    showMessage('Please enter a number');
    return;
  }
  
  // parseInt
  let userValue = parseInt(userInput.value);

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

  const remainedAttampt = 5 - attempts;

  message.classList.add('d-none');
  remained.classList.remove('d-none');
  remained.textContent = `You have ${remainedAttampt} times left`;
  count.textContent = remainedAttampt;

  // increase user attempt
  attempts++;
  const increaseBombSize = 5 + attempts * 0.8; // Increase by 0.3rem per attempt
  bomb.style.fontSize = `${increaseBombSize}rem`;

  // Calculate RGB values for each attempt
  const targetColor = { r: 220, g: 53, b: 69 }; // RGB values for #dc3545
  const redValue = Math.min(targetColor.r, attempts * (targetColor.r / 5));
  const greenValue = Math.min(targetColor.g, attempts * (targetColor.g / 5));
  const blueValue = Math.min(targetColor.b, attempts * (targetColor.b / 5));
  bomb.style.color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

  

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
    remained.innerHTML = `If you want to play again, click <strong>&lt;Let's try again&gt;</strong> button`;
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
  eleBtnNewGame.className = 'button mt-3';
  eleBtnNewGame.textContent = "Let's try again!";
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
  burst.classList.add('d-none');
  title.classList.remove('d-none');
  message.classList.remove('d-none');
  result.classList.add('d-none'); 
  remained.classList.add('d-none');

  bomb.classList.remove('d-none');
  btnEnter.classList.remove('d-none');
  btnEnter.disabled = false;
  btnReset.classList.remove('d-none');
  
  attempts = 1; 
  userNumbers = [];
  count.textContent = 5;
  bomb.style.fontSize = 5;
  bomb.style.color = 'black'

  const newPlayButton = document.getElementById('btnNewPlay');
  if (newPlayButton) {
    newPlayButton.remove();
  }
}

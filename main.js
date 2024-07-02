// References
const title = document.querySelector('.title');
let gameInfo = document.querySelector('.gameInfo'); 
let result = document.querySelector('.result'); // Up Down
const userNumDisplay = document.querySelector('.user-num-display'); // display values in array
let remained = document.querySelector('.remained'); 
let count = document.querySelector('.count');
count.textContent = 3;
const maxAttempts = parseInt(count.textContent);

const burst = document.querySelector('.fa-burst');
const bomb = document.querySelector('.fa-bomb');

const userInput = document.getElementById('user-input');
const btnEnter = document.getElementById('btnEnter');
const btnReset = document.getElementById('btnReset');

const randomNumber = document.querySelector('.random-number'); // display random number in the game info area
const eleBtnNewGame = document.createElement('button');

// Modal
const modalElement = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const modal = new bootstrap.Modal(modalElement);
// Event listener to close the modal and redirect to list.html
document.getElementById('close-modal-button').addEventListener('click', () => {
  modal.hide();
});


let computer = 0;
let attempts = 1;
// Array to store user input
let userNumbers = [];

btnEnter.addEventListener('click', play);
btnReset.addEventListener('click', reset);
userInput.addEventListener('focus', () => userInput.value = "");

// Access key for Enter button
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    btnEnter.click();
  }
});

eleBtnNewGame.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      reset();
    }
  });

// computer generate a random number
generateRandomNumber();

// Function to play game
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

  // Validation user input is already exist
  if (userNumbers.includes(userValue)) {
    showMessage('The number is already exist. Please try again');
    return;
  }
  
  // Store user input into the array
  userNumbers.push(userValue);
  // Update the sub title with user input
  userNumDisplay.classList.remove('d-none');
  userNumDisplay.innerHTML = `Randome: ${computer}, You Entered: ${userNumbers.join(', ')}`;

  // compare user input value with the random number
  if (userValue > computer) {
    result.textContent = 'Down!!!';
    result.classList.remove('d-none');
    result.style.color = 'var(--bs-primary)';
  } else if (userValue < computer) {
    result.textContent = 'UP!!!';
    result.classList.remove('d-none');
    result.style.color = 'var(--bs-danger)';
  } else {
    result.textContent = 'Bingo!!!';
    result.classList.remove('d-none');
    result.style.color = 'var(--bs-warning)';
    result.style.fontSize  = '5rem';
    btnEnter.disabled = true;
    bingoDNone();
    generateNewPlayBtn();
    return;
  }

  // check remained attampt
  let remainedAttampt = maxAttempts - attempts;
  //remove the game information area
  rmGameInfo();
  // display attempt
  remained.classList.remove('d-none'); 
  remained.textContent = `You have ${remainedAttampt} times left`;
  // display the remained attempt number on bomb
  count.textContent = remainedAttampt;
  
  // Increase user attempt
  attempts++;
  bombSize();

  // check attemps
  if (attempts > maxAttempts) {
    count.textContent = 'Game Over!';
    btnEnter.disabled = true;
    gameOverDisabled();
    generateNewPlayBtn();
  }
}

// Function to generate a random number
function generateRandomNumber() {
  computer = Math.floor(Math.random() * 100) + 1;
  console.log(computer);
  randomNumber.textContent = `The random number is ${computer}`
  randomNumber.style.color = 'var(--bs-danger)';
}

// display messages to modal
function showMessage(warning) {
  modalMessage.textContent = warning;
  modal.show();
}

// new play button
function generateNewPlayBtn() {
  const buttonContainer = document.getElementById('button-container');
  if (!buttonContainer) {
    console.error("Button container element not found");
    return;
  }
  eleBtnNewGame.id = "btnNewPlay";
  eleBtnNewGame.className = 'button mt-3'; // Use Bootstrap class if needed
  eleBtnNewGame.textContent = "Play Again!";
  eleBtnNewGame.addEventListener('click', reset);
  buttonContainer.appendChild(eleBtnNewGame);
}

function reset() {
  userInput.value = ''; 
  generateRandomNumber();
  burst.classList.add('d-none');
  title.classList.remove('d-none');
  gameInfo.classList.remove('d-none');
  result.classList.add('d-none'); 
  remained.classList.add('d-none');

  bomb.classList.remove('d-none');
  btnEnter.classList.remove('d-none');
  btnEnter.disabled = false;
  btnReset.classList.remove('d-none');
  
  attempts = 1; 
  userNumbers = [];
  userInput.classList.remove('d-none');
  count.classList.remove('d-none');
  count.textContent = 3;
  userNumDisplay.textContent = '';
  userInput.classList.remove('d-none');
  bomb.style.fontSize = `5rem`;
  bomb.style.color = 'black'

  const newPlayButton = document.getElementById('btnNewPlay');
  if (newPlayButton) {
    newPlayButton.remove();
  }
}

function bombSize() {
  let increaseBombSize = maxAttempts + attempts * 2; // Increase by 0.8rem per attempt
  bomb.style.fontSize = `${increaseBombSize}rem`;

  // Calculate RGB values for each attempt
  const targetColor = { r: 220, g: 53, b: 69 }; // RGB values for #dc3545
  const redValue = Math.min(targetColor.r, attempts * (targetColor.r / 5));
  const greenValue = Math.min(targetColor.g, attempts * (targetColor.g / 5));
  const blueValue = Math.min(targetColor.b, attempts * (targetColor.b / 5));
  bomb.style.color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

function gameOverDisabled() {
  burst.classList.remove('d-none');
  remained.classList.add('d-none');
  result.classList.add('d-none');
  userNumDisplay.classList.add('d-none');
  rmTitle();
  rmBomb();
  rmButtons();
}


function bingoDNone() {
  count.classList.add('d-none');
  remained.classList.add('d-none');
  rmTitle();
  rmGameInfo();
  rmBomb();
  rmButtons();
}


function rmGameInfo() {
  gameInfo.classList.add('d-none'); 
}

function rmTitle() {
  title.classList.add('d-none');
}

function rmButtons() {
  btnEnter.classList.add('d-none');
  btnReset.classList.add('d-none');
}

function rmBomb() {
  bomb.classList.add('d-none');
}
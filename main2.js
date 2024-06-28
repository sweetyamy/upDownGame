// Input box so that user can enter a number
// Buttons: Click, Reset
// responsible UI

// get a reference
const userInput = document.getElementById('user-input').value;
// computer generate a random number
const computer = Math.random();
// array to store user input
const userNumbers = [];
const userNumbersLength = userNumbers.length;
// user can enter a number between 1 and 100
const isValid = userInput > 0 && userInput <= 100;

while (isValid) {
  userNumbers.push(userInput);
  // user have five chances
  for (userNumbersLength = 1; userNumbersLength <= 5; userNumbersLength++) {
    try {
      // if user input value is the same number with computer, display a message
      if (userInput > computer) {
        // if user input value is a large number than computer, display Down!
        alert('Down!');
      } else if (userInput < computer) {
        // if user input value is a small number than computer, display Up!
        alert('Up!');
      } else {
        // if user typed the same number with the history, display an error
        alert('Bingo!');
      }
    } catch (err) {
      // if user typed out of the range, display an error
      alert('Error');
    }
  }
}

// when game over - enter button disabled
// Reset

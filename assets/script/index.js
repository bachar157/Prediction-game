// Utility functions

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function updateAttemptsDisplay() {
  const guessNumberSpan = select('.guess-number');
  guessNumberSpan.textContent = remainingAttempts;
}

function showHint(message) {
  const hint = select('.hint');
  hint.textContent = message;
}

function hideRestartButton() {
  const resetButton = select('.reset');
  resetButton.style.display = 'none';
}


function showRestartButton() {
  const resetButton = select('.reset');
  resetButton.style.display = 'block';
}


function onEvent(event, selector, callback) {
  selector.addEventListener(event, callback);
}


function select(selector, parent = document) {
  return parent.querySelector(selector);
}


const maxAttempts = 5;
let remainingAttempts = maxAttempts;
const secretNumber = generateRandomNumber(1, 15);


function onGuess() {
  if (remainingAttempts === 0) {
      showHint('Game over! Please restart the game.');
      return;
  }

  const userInput = select('.user-guesses');
  const inputValue = userInput.value;
  const guess = parseInt(inputValue, 10);

  if (isNaN(guess) || guess < 1 || guess > 15) {
      showHint('Please enter a valid number between 1 and 15.');
      // Clear the input field on invalid input
      userInput.value = '';
  } else {
      remainingAttempts--;

      if (guess === secretNumber) {
          showHint(`Congratulations! You guessed the number correctly: ${secretNumber}`);
          showRestartButton();
      } else if (remainingAttempts === 0) {
          showHint(`Sorry, you've run out of attempts. The correct number was ${secretNumber}. Game over!`);
          showRestartButton();
      } else {
          // Provide hints based on the user's guess
          if (guess > secretNumber) {
              showHint('Try a lower number.');
          } else {
              showHint('Try a higher number.');
          }

          updateAttemptsDisplay();
      }
  }
  userInput.value = '';
}
function onResetGame() {
  resetGame();
  hideRestartButton();
}


function resetGame() {
  remainingAttempts = maxAttempts;
  updateAttemptsDisplay();
  showHint('');
}


const guessButton = select('.guess-button');
onEvent('click', guessButton, onGuess);

const resetButton = select('.reset');
onEvent('click', resetButton, onResetGame);
resetGame();

'use strict';

// GLOBAL VARIABLES
// User Array from local storage, current user

// i just made a game board to test if it actually rendered, it works so far :)
let currentUser = new User('Brooke', 1, 1, 1, new GameBoard(['red', 'green', 'blue', 'black', 'purple', 'orange'], ['orange', 'red', 'blue', 'green', 'purple']));

// i think this render board method should also happen in the driver code but it's here for now
renderBoard();


// USER CONSTRUCTOR and PROTOTYPES
/* DONE: create User constructor with these properties:
    username:
    totalGamesWon:
    winStreak:
    highestWinStreak:
    GameBoard: (it's an object)
  */
function User(username, totalGamesWon = 0, winStreak = 0, highestWinStreak = 0, gameBoard = new GameBoard())
{
  this.username = username;
  this.totalGamesWon = totalGamesWon;
  this.winStreak = winStreak;
  this.highestWinStreak = highestWinStreak;
  this.gameBoard = gameBoard;
}

// Prototype functions for user
// TODO: create function to update properties of User object's stats
User.prototype.updateStats = function() {

}

// GAME BOARD CONSTRUCTOR and PROTOTYPES
function GameBoard(colorArray = generateRandomColors(), correctOrderArr = getCorrectOrder(), previousGuesses = [], gameCounter = 0) {
  // all color arrays will be in this format
  // ['hsl(x, x, x)', 'hsl(x, x, x)', 'hsl(x, x, x)', 'hsl(x, x, x)'];
  // color array holds 6 possible random colors, correct answer holds the random word
  this.colorArray = colorArray;

  // previous guess holds an array of user guesses
  this.previousGuesses = previousGuesses;

  // correct order array is colors picked from the randomly generated array
  this.correctOrderArr = correctOrderArr;

  // this will keep track of where the user is on the board
  this.gameCounter = gameCounter;
}

// prototype functions for GameBoard
// push the guess onto the game board object guess array
GameBoard.prototype.addGuess = function(guessColorArr) {
  this.previousGuesses.push(guessColorArr);
};

function renderBoard() {
  // guess div is the window into the dom
  let guessDiv = document.querySelector('#guessDiv');

  for(let y = 0; y < 6; y++) {
    // guess row will hold colors for an entire guess
    let guessRow = document.createElement('div');
    guessRow.setAttribute('class', 'guessRow');

    // this line add that row to the entire container
    guessDiv.appendChild(guessRow);

    // this loop will go through each row and make five individual boxes
    for(let x = 0; x < 5; x++) {
      // one color holds the div that color the user guesses shows up in
      let oneColor = document.createElement('div');
      oneColor.setAttribute('class', 'oneColor');

      // append that individual box to the row
      guessRow.appendChild(oneColor);
    }
  }
  // display board complete

  // create the color chooser options at the bottom of the page
  // colorBoard is the window into the DOM
  let colorBoard = document.querySelector('#colorBoard');
  // this loop makes the six boxes that will show the possible colors
  for(let i = 0; i < 6; i++) {
    // create the box div
    let colorBox = document.createElement('div');
    colorBox.setAttribute('class', 'colorBox');

    // set the background color to the using the color array in game board object
    colorBox.style.background =`${currentUser.gameBoard.colorArray[i]}`;
    // append the box to the color board div(window into dom)
    colorBoard.appendChild(colorBox);
    // add event listener to the color board so users can pick a color
    colorBoard.addEventListener('click', handleColorPick);
  }
}

// this function will get the guess from the game board
GameBoard.prototype.getGuessArray = function() {
  // guess count will tell me what row I need to grab from the board
  let guessCount = this.previousGuesses.length + 1;
  console.log(guessCount);
  let guessArr = [];
  for(let i = 0; i < 5; i++) {
    // current element is the individual box in that row that i need to get the color from
    let currentElement = document.querySelector(`.guessRow:nth-of-type(${guessCount}) .oneColor:nth-child(${i + 1})`);
    guessArr.push(currentElement.style.background);
  }
  return guessArr;
};


GameBoard.prototype.checkGuess = function() {
  let compareArr = [];
  let currentGuess = this.previousGuesses[this.previousGuesses.length - 1];

  for(let i = 0; i < 5; i++) {
    if (currentGuess[i] === this.correctOrderArr[i]) {
      compareArr.push(1);
    } else if (this.correctOrderArr.includes(currentGuess[i])) {
      compareArr.push(2);
    } else {
      compareArr.push(3);
    }
  }
  console.log(compareArr);
  return compareArr;
};


GameBoard.prototype.updateBoard = function (compareArr) {
  for(let i = 0; i < compareArr.length; i++) {
    console.log(this.guessCount);
    let key = document.querySelectorAll('.guessRow>*')[i + this.gameCounter - 5];
    console.log(key);
    if(compareArr[i] === 1) {
      key.style.border = 'solid green 5px';
    } else if (compareArr[i] === 2) {
      key.style.border = 'solid grey 5px';
    } else {
      key.style.border = 'solid red 5px';
    }
  }
};

GameBoard.prototype.renderStatsDisplay = function() {

};


// this function 'zeroes' /ut the game board display for a new game this also could be called in the event handler when the game ends, clear the game board and display stats for the current user
GameBoard.prototype.clear = function() {

};


// HELPER FUNCTIONS

function handleColorPick(event) {
  let boxArray = document.querySelectorAll('.guessRow>*');
  let color = event.target.style.background;
  boxArray[currentUser.gameBoard.gameCounter].style.background = color;
  currentUser.gameBoard.gameCounter++;
  if(currentUser.gameBoard.gameCounter % 5 === 0) {
    handleCompleteGuess();
  }
}

function handleCompleteGuess() {
  let guess = currentUser.gameBoard.getGuessArray();
  currentUser.gameBoard.addGuess(guess);
  let compareArr = currentUser.gameBoard.checkGuess();
  currentUser.gameBoard.updateBoard(compareArr);
}

// call this function in the game board constructor when a new game is started
function getCorrectOrder() {
  // generate a random number between 0 and dictionary word array length minus one
  // get the word stored in the array at that randomly generated index
  // return this word
}

// call this function in the game board constructor when a new game is started
function generateRandomColors() {
  // make an empty array to store hsl strings
  // get random number for hue
  // put that number into string literal to make hsl string
  // push color string onto array
  // return array
}

// i was thinking this could be called on page load
function driver() {
  // getLocalStorage to initialize global variables
  // prompt user to enter name
  // take that string and pass it to getUser to see if user exists or not

  // conditional

  // if user array in local storage is null
  // call store dictionary word
  // create a user array save it as the local variable
  // call the create new user function and save the user object as the current user and push it to user array

  // if user array exists, but user is a new user
  // call the create new user function, save it as current user, and push it to user array

  // if user exists already
  // set the current user variable to that object from the array
  

  // render the gameboard that is stored in the User object
}


// traverse through userObjects array
// if user's name exists in any object's name property, return that object
// if doesn't exist it will return null
function getUser(username) {
  
}

// this function will get variables out of local storage set initialize the user object array global variables
function getLocalStorage() {

}

// in the drive conditional, call this when a new user must be created
// it will create a new user object with the user's name
// return the object so that it can be stored as current user and pushed onto the user array
// credit: https://bobbyhadz.com/blog/javascript-read-file-into-array#:~:text=Use%20the%20fs.,get%20an%20array%20of%20strings.
function createNewUser(username) {
  
}

// this function will be called to create a new gameboard object
// this will be a helper function used inside of the User constructor function to create a game board object and set it equal to the Users game board
// this function should return the new game board object
function createGameBoard() {
  
}

// this function is called multiple times throughout the application, anytime the User object is changed or updated, we need to update that object in the global, update the global user array, and then set the array in local storage to be the updated global array
function updateLocalStorage() {

}

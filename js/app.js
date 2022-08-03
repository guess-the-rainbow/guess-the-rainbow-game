'use strict';

// GLOBAL VARIABLES
// User Array from local storage, current user
let worldeDictionary = [];

// USER CONSTRUCTOR and PROTOTYPES
/* DONE: create User constructor with these properties:
    username:
    totalGamesWon:
    winStreak:
    highestWinStreak:
    GameBoard: (it's an object)
  */
function User(username, totalGamesWon = 0, winStreak = 0, highestWinStreak = 0)
{
  this.username = username;
  this.totalGamesWon = totalGamesWon;
  this.winStreak = winStreak;
  this.highestWinStreak = highestWinStreak;
  this.GameBoard = createGameBoard();
}

// Prototype functions for user
// TODO: create function to update properties of User object's stats
User.prototype.updateStats = function() {

}

// GAME BOARD CONSTRUCTOR and PROTOTYPES
function GameBoard(colorArray = generateRandomColors(), correctOrderArr = getCorrectOrder(), previousGuesses = []) {
  // color array holds 6 possible random colors, correct answer holds the random word
  // previous guess holds an array of user guesses
  this.colorArray = colorArray;
  this.correctOrderArr = correctOrderArr;
  this.previousGuesses = previousGuesses;

}

// prototype functions for GameBoard
// push the guess onto the game board object guess array
GameBoard.prototype.addGuess = function(guessColorArr) {
  this.previousGuesses.push(guessColorArr);
};

// window into the dom, create grid for guesses and create another grid for keyboard
// // TODO: add event listeners to keyboard so the guess is added to the game board guesses array, checked, and board update
GameBoard.prototype.renderBoard = function() {
  // guess div is the window into the dom
  let guessDiv = document.querySelector('#guessDiv');

  for(let y = 0; y < 6; y++) {
    // word div will create a row that will hold boxes for each letter
    let guessRow = document.createElement('div');
    guessRow.setAttribute('class', 'guessRow');
    guessDiv.appendChild(guessRow);
    for(let x = 0; x < 5; x++) {
      // oneColor box will hold the letter that the user chooses
      // once I make an event handler I will add a event listener
      let oneColor = document.createElement('div');
      oneColor.setAttribute('class', 'oneColor');
      guessRow.appendChild(oneColor);
    }
  }

  // this loop will create six boxes that hold the colors that the user can click
  // this will need an event listener too, but i'm gonna wait til we have an event handler
  let colorBoard = document.querySelector('#colorBoard');
  for(let i = 0; i < 6; i++) {
    let colorBox = document.createElement('div');
    colorBox.setAttribute('class', 'colorBox');
    colorBox.style.background =`${this.colorArray[i]}`;
    colorBoard.appendChild(colorBox);
  }
};

// i just made a game board to test if it actually rendered, it works so far :)
let testGame = new GameBoard(['red', 'green', 'blue', 'black', 'purple', 'orange'], '', ['wrong']);
testGame.renderBoard();

// TODO: the int array will hold numbers which correspond to right, wrong, and wrong position
// compare each box of the user's guess with the answer key
GameBoard.prototype.checkGuess = function() {
  // i made array to tell me if this position guess is right, wrong, or somewhere else in the array
  // key: 1 = correct!, 2 = not in the right spot, 3 = wrong
  let compareArr = [];
  // current guess is the last guess added to the previous guess array
  let currentGuess = this.previousGuesses[this.previousGuesses.length - 1];
  for(let i = 0; i < 5; i++) {
    if (currentGuess[i] === this.correctAnswer[i]) {
      compareArr.push(1);
    } else if (this.correctAnswer.includes(currentGuess[i])) {
      compareArr.push(2);
    } else {
      compareArr.push(3);
    }
  }
  // i return this array so that it can be used to update the board
  return compareArr;
};

// this function updates the GameBoard object base
//  on the results of the user's last attempt/ the int array passed into this functions is from check  guess
// update the global variables, both the object and the object in the array
// update the user array by setting the local variable user as the local storage user array
// TODO: Submit guess to the array and update the local storage.
// TODO: Compare attempted guess with the color position and answers.
// TODO: Display symbol and color the border to display if the attempted guess is right, wrong, or correct, but in the wrong spot
GameBoard.prototype.updateBoard = function (intArr) {
  // i used the guess count to figure out which row i need to update
  let guessCount = this.previousGuesses.length;
  // then I'm gonna loop through that int array from the check guess function
  // based on the key in the check guess function i'll change the border
  for(let int of intArr) {
    let key = document.querySelector(`.guessRow:nth-of-type(${guessCount}) .oneColor:nth-child(${int})`);
    if(int === 1) {
      key.style.border = 'solid green 5px';
    } else if (int === 2) {
      key.style.border = 'solid grey 5px';
    } else {
      key.style.border = 'solid red 5px';
    }
  }
};

// this will render the current users stats when the game completes
// this could be in an event handler for the submit button, if game ends invoke this function
// also call the update stats function for that user, 
// TODO: Create a local storage to store users history score.
// 
GameBoard.prototype.renderStatsDisplay = function() {

};


// this function 'zeroes' /ut the game board display for a new game this also could be called in the event handler when the game ends, clear the game board and display stats for the current user
GameBoard.prototype.clear = function() {

};


// HELPER FUNCTIONS

// call this function in the game board constructor when a new game is started
function getCorrectOrder() {
  // generate a random number between 0 and dictionary word array length minus one
  // get the word stored in the array at that randomly generated index
  // return this word
}

// call this function in the game board constructor when a new game is started
// credit for inspiration: https://mika-s.github.io/javascript/colors/hsl/2017/12/05/generating-random-colors-in-javascript.html#:~:text=that%20is%20run%20like%20this,push(randomRgbaString(1))%3B
function generateRandomColors() {

  let hueObjectsArray = [
    // hue ranges
    // reds: 0 - 18 && 340 - 360
    redHues = {
      // -20 is the same as 340
      minRange: -20,
      maxRange: 18
    },
    // oranges: 20 - 48
    orangeHues = {
      minRange: 20,
      maxRange: 40
    },
    // yellows: 52 - 65
    yellowsHues = {
      minRange: 52,
      maxRange: 65
    },
    // greens: 68 - 155
    greenHues = {
      minRange: 68,
      maxRange: 155
    },
    // cyans: 163 - 182
    cyanHues = {
      minRange: 163,
      maxRange: 182
    },
    // blues: 185 - 255
    blueHues = {
      minRange: 185,
      maxRange: 255
    },
    // violets: 259 - 283
    violetHues = {
      minRange: 259,
      maxRange: 283
    },
    // magentas: 286 - 331
    magentaHues = {
      minRange: 286,
      maxRange: 331
    },
];

  // empty array to store hsl strings
  let hslArray = [];
  // use random number generator to set ranges for each hue range
  // get random number for hue
  for (let i = 0; i < hueObjectsArray; i++)
  {
    let randomHue = getARandomColorInRange(hueObjectsArray[i]);
    // push hsl with random hue, 50% saturation, 50% lightness
    hslArray.push(`hsl(${randomHue},50%,50%)`);
  }
  // return an array of hsl strings
  return hslArray;
}

// this function gets single random hsl value within a specified range
// pass in a colorObject with minRange and maxRange properties
function getARandomColorInRange(colorObject)
{
  // get a random hue within the colorObject's min and max
  let hueInRange = getRandomNumber(colorObject.minRange, colorObject.maxRange);
  // return random for that color range
  return hueInRange;
}

// generates a random number withing a specified range
// used to generate random hue values, get random indices from an array, and more
function getRandomNumber(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

// create an empty array that will store individual words
// parse text file by using the \n as a deliminator, push the parsed words onto the empty array
// set item into local storage as the dictionary
function storeDictionary(wordListFile)
{
  // make a variable to store the dictionary string

  // make a variable to split the string into indices in an array
  // push to array

  // return
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

// this function is called when the board is created so that the letters are displayed on the keyboard with the correct color
function matchColorToLetter(gameBoardObj) {

}

// this function is called multiple times throughout the application, anytime the User object is changed or updated, we need to update that object in the global, update the global user array, and then set the array in local storage to be the updated global array
function updateLocalStorage() {

}

// EXECUTABLE CODE

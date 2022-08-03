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

  // create an empty array to hold each color guessed
  let guessArr = [];
  for(let i = 0; i < 5; i++) {
    // this css selector is grabbing the row with guess count and the individual box using the index
    let currentElement = document.querySelector(`.guessRow:nth-of-type(${guessCount}) .oneColor:nth-child(${i + 1})`);
    // add the selected elements background color to the array
    guessArr.push(currentElement.style.background);
  }
  // return this array so it can be pushed onto the previous guess array
  return guessArr;
};

// takes an array from the previous guess and compares it to the correct color arr
GameBoard.prototype.checkGuess = function() {
  // create an empty array to hold the compare values
  // compare value key: 1 = correct, 2 = incorrect position, 3 = completely wrong
  let compareArr = [];

  // grab the previous guess from the previous guess array stored in the users gameboard
  let currentGuess = this.previousGuesses[this.previousGuesses.length - 1];

  // loop through the five selected colors and push a key value onto the array
  for(let i = 0; i < 5; i++) {
    // the guess was correct
    if (currentGuess[i] === this.correctOrderArr[i]) {
      compareArr.push(1);
    }
    // the guess was in that correct order, but it's not in the right spot
    else if (this.correctOrderArr.includes(currentGuess[i])) {
      compareArr.push(2);
    }
    // this color is not in the correct color array at all
    else {
      compareArr.push(3);
    }
  }
  // return this compare array so that it can be used to update the board
  return compareArr;
};

// this function uses the compare array integers keys to give a the color a border color based on that key
GameBoard.prototype.updateBoard = function (compareArr) {
  for(let i = 0; i < compareArr.length; i++) {
    // use a CSS selector to grab the box that needs ta border
    // the counter updates every guess so I had to decrement it five to update the previous five
    let key = document.querySelectorAll('.guessRow>*')[i + this.gameCounter - 5];

    // the keys are the same as from the check guess function, green border for good, grey for includes, and red for wrong
    if(compareArr[i] === 1) {
      key.style.border = 'solid green 5px';
    } else if (compareArr[i] === 2) {
      key.style.border = 'solid grey 5px';
    } else {
      key.style.border = 'solid red 5px';
    }
  }
};

// when we get local storage and users figured out, I think this would be a good place to
GameBoard.prototype.renderStatsDisplay = function() {

};


// this function 'zeroes' /ut the game board display for a new game this also could be called in the event handler when the game ends, clear the game board and display stats for the current user
GameBoard.prototype.clear = function() {

};


// HELPER FUNCTIONS

// this function will happens when the user selects a color, its the handler on the color board event listener
function handleColorPick(event) {
  // I made an array of all the individual boxes so it would be easy to select the one I need
  let boxArray = document.querySelectorAll('.guessRow>*');

  // this stores the string of the color of what was clicked
  let color = event.target.style.background;

  // this changes the background color box to the clicked color
  // i selected the box by taking the gamecounter from the gameboard and using it as the index in the box array
  boxArray[currentUser.gameBoard.gameCounter].style.background = color;

  // increment game counter so it selects the next box next time
  currentUser.gameBoard.gameCounter++;

  // if the game counter divided by 5 does not have a remainder, then the 5 boxes have been filled
  if(currentUser.gameBoard.gameCounter % 5 === 0) {
    // call the handle complete guess function to determine if they won or update the board accordingly
    let winner = handleCompleteGuess();

    // if they did win, I just have an alert in there for now but we can do some cooler stuff
    if (winner) {
      // if they win, remove the event listener and tell them they win!
      document.querySelector('#colorBoard').removeEventListener('click', handleColorPick);
      alert('you win, this is a place holder for something cooler');
    }
  }
}


// this function is called in handle color pick after a complete guess of five colors is made
function handleCompleteGuess() {
  // create a boolean to return to indicate if user has won
  let winner = false;

  // call the getGuessArray, this function grabs all five colors in the guess and stores them in an array
  let guess = currentUser.gameBoard.getGuessArray();

  // take the guess gotten from getGuessArray and add it to previous guess array in gameboard object w/ addGuess function
  currentUser.gameBoard.addGuess(guess);

  // compare the guess with the correct answer, checkGuess will return an array that indicates which colors are right or wrong
  let compareArr = currentUser.gameBoard.checkGuess();

  // if check guess returns an array that shows all colors are in the correct spot, alert the user
  if(compareArr[0] === 1 && compareArr[1] === 1 && compareArr[2] === 1 && compareArr[3] === 1 && compareArr[4] === 1) {
    winner = true;
  }

  // use the compare array to update the board
  currentUser.gameBoard.updateBoard(compareArr);

  // return if they won so the handleColorPick functions knows if they won
  return winner;
}

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
function getUser() {
  let name = document.getElementById('name');
  console.log(name.value);
  return name.value;
}

// this function will get variables out of local storage set initialize the user object array global variables
function getLocalStorage() {

}

// in the drive conditional, call this when a new user must be created
// it will create a new user object with the user's name
// return the object so that it can be stored as current user and pushed onto the user array
// credit: https://bobbyhadz.com/blog/javascript-read-file-into-array#:~:text=Use%20the%20fs.,get%20an%20array%20of%20strings.
function createNewUser() {
  let userName = document.getElementById('userName');
  let player = document.createElement('input');
  player.type='text'; 
  player.id='name';
  player.name = 'name';
  let playerLabel = document.createElement('label');
  playerLabel.for='name';
  playerLabel.innerHTML='Hello there. Please enter your name.'
  let nameButton = document.createElement('button');
  nameButton.type='button';
  nameButton.innerHTML='Submit';
  nameButton.addEventListener('click', getUser);
  userName.appendChild(playerLabel);
  userName.appendChild(player);
  userName.appendChild(nameButton);

}

createNewUser();

// this function will be called to create a new gameboard object
// this will be a helper function used inside of the User constructor function to create a game board object and set it equal to the Users game board
// this function should return the new game board object
function createGameBoard() {
  
}

// this function is called multiple times throughout the application, anytime the User object is changed or updated, we need to update that object in the global, update the global user array, and then set the array in local storage to be the updated global array
function updateLocalStorage() {

}

// nameButton.onclick = document.getElementById('playerLabel');

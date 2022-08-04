'use strict';

// GLOBAL VARIABLES
// User Array from local storage, current user
let allUserArray;
let globalUserName;
let currentUser;
let currentUserIndex = 0;

// i just made a game board to test if it actually rendered, it works so far :)

// let colorArr = generateRandomColors();
// let combo = getCorrectOrder(colorArr);
// console.log(combo);
// let currentUser = new User('Brooke', 1, 1, 1, new GameBoard(colorArr, combo));




// i think this render board method should also happen in the driver code but it's here for now
// renderBoard();



// USER CONSTRUCTOR and PROTOTYPES
/* DONE: create User constructor with these properties:
    username:
    totalGamesWon:
    winStreak:
    highestWinStreak:
    GameBoard: (it's an object)
  */
function User(username, gameBoard, totalGamesWon = 0, winStreak = 0, highestWinStreak = 0)
{
  // the player's name
  this.username = username;
  // how many total games this player has won
  this.totalGamesWon = totalGamesWon;
  // current record of how games they've won in a row 
  this.winStreak = winStreak;
  // highest winStreak they've ever had
  this.highestWinStreak = highestWinStreak;
  // the game board for the current user's game state
  this.gameBoard = gameBoard;
}

// Prototype functions for user
// TODO: create function to update properties of User object's stats
User.prototype.updateStats = function() {
  // update current user's properties once a game ends
  // make sure the game board is cleared at the end of the game
  // then make call to local storage function with the updated stats and cleared out game board
}

// GAME BOARD CONSTRUCTOR and PROTOTYPES
function GameBoard(colorArray, correctOrderArr, previousGuesses = [], gameCounter = 0) {
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

// this function will display the play area to the user
GameBoard.prototype.renderBoard = function() {
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
  // this loop makes the color selection box elements for user input
  for(let i = 0; i < currentUser.gameBoard.colorArray.length; i++) {
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
};

// function addPreviousGuesses() {
//   for(let i = 0; i < previousGuesses.length; i++) {

//   }
// }

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
    guessArr.push(getHSLString(currentElement));
  }
  // return this array so it can be pushed onto the previous guess array
  return guessArr;
};

// compares the user's current round of guessing to the answer key
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
      key.style.border = 'solid light grey 5px';
    } else {
      key.style.border = 'solid red 5px';
    }
  }
};

// generate elements to display user's play statistics
GameBoard.prototype.renderStatsDisplay = function() {
    // get container
    // get make element for each play stat in User
    // give content
    // append to DOM
};


// this function 'zeroes' /ut the game board display for a new game this also could be called in the event handler when the game ends, clear the game board and display stats for the current user
GameBoard.prototype.clear = function() {

};


// HELPER FUNCTIONS

// this function will happens when the user selects a color, its the handler on the color board event listener

function getHSLString(e) {
  let boardArr = document.querySelectorAll('.colorBox');
  let pickedIndex = -1;
  for(let i = 0; i < boardArr.length; i++) {
    if (boardArr[i].style.background === e.style.background) {
      pickedIndex = i;
      break;
    }
  }
  return currentUser.gameBoard.colorArray[pickedIndex];
}

function handleColorPick(event) {
  // I made an array of all the individual boxes so it would be easy to select the one I need
  let boxArray = document.querySelectorAll('.guessRow>*');


  // this stores the string of the color of what was clicked

  // let color = event.target.style.background; this doesn't work because it's rgb
  let color = getHSLString(event.target);

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
      currentUser.updateStats(winner);
    }
    if (!winner && gameCounter === 30) {
      currentUser.updateStats(winner);
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
  updateLocalStorage();
  // return if they won so the handleColorPick functions knows if they won
  return winner;
}

// call this function in the game board constructor when a new game is started
// this function accepts the array of possible colors and picks 5 of them to be the winning combination and returns that combination as an array
function getCorrectOrder(colorArray) {
// initial index to store winning combo
  let winningCombo = [];

  // while the winningCombo array is less than
  while(winningCombo.length < 5)
  {
    // get a random number associated with an index int the colorArray
    let randColor = getRandomNumber(0, (colorArray.length-1));

    // if the winningCombo array doesn't have randColor in it
    if (!winningCombo.includes(colorArray[randColor]))
    {
      // push the unique color into the winningCombo array
      winningCombo.push(colorArray[randColor]);
    }
  }
  // console.log(winningCombo);
  // return the array of 5 unique, random colors
  return winningCombo;
}

// call this function in the game board constructor when a new game is started
// credit for inspiration: https://mika-s.github.io/javascript/colors/hsl/2017/12/05/generating-random-colors-in-javascript.html#:~:text=that%20is%20run%20like%20this,push(randomRgbaString(1))%3B
function generateRandomColors() {
  // hue ranges
  // reds: 0 - 18 && 340 - 360
  let redHues = {
    // -20 is the same as 340
    minRange: -10,
    maxRange: 5
  };
  // oranges: 20 - 48
  let orangeHues = {
    minRange: 20,
    maxRange: 44
  };
  // yellows: 52 - 65
  let yellowsHues = {
    minRange: 52,
    maxRange: 61
  };
  // greens: 68 - 155
  let greenHues = {
    minRange: 71,
    maxRange: 143
  };
  // cyans: 163 - 182
  let cyanHues = {
    minRange: 163,
    maxRange: 186
  };
  // blues: 185 - 255
  let blueHues = {
    minRange: 185,
    maxRange: 237
  };
  // violets: 259 - 283
  let violetHues = {
    minRange: 245,
    maxRange: 287
  };
  // magentas: 286 - 331
  let magentaHues = {
    minRange: 296,
    maxRange: 327
  };
  // set hue objects into an array
  let hueObjectsArray = [
    redHues,
    orangeHues,
    yellowsHues,
    greenHues,
    cyanHues,
    blueHues,
    violetHues,
    magentaHues
  ];

  // empty array to store hsl strings
  let hslArray = [];
  // use random number generator to set ranges for each hue range
  // get random number for hue
  for (let i = 0; i < hueObjectsArray.length; i++)
  {
    let randomHue = getARandomColorInRange(hueObjectsArray[i]);
    // push hsl with random hue, 50% saturation, 50% lightness

    // random saturation
    let randomSaturation = getRandomNumber(50, 65);
    let randomLightness = getRandomNumber(50, 70);
    // random lightness
    hslArray.push(`hsl(${randomHue},${randomSaturation}%,${randomLightness}%)`);

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



getLocalStorage();
createNewUser();


// called in event handler when the user submits their username
// add it to the array
// if the user array exist it will check if user exist and either find that user or create a new user
function checkIfUserExists() {
  let startGame = false;
  if(allUserArray) {
    let isFound = false;
    for(let user in allUserArray) {
      if(allUserArray[user].username === globalUserName) {
        currentUserIndex = user;
        makeUserForStorage(allUserArray[user]);
        isFound = true;
        break;
        // console.log('execute user already exists');
      }
    }
    if (!isFound) {
      makeUserForStorage(null);
    }
  } else { // if the user array is null
    // console.log('no array yet');
    // create an allUserArray[]
    allUserArray = [];
    // create a new User() object with GameBoard()
    makeUserForStorage(null);
  }
  // once we have the current user create we can render the user's game board
  startGame = true;
  if(startGame) {
    // console.log('start game');
    currentUser.gameBoard.renderBoard();
  }
}

// if the user doesn't exist in the user array create one
// create color arrays to pass to the game board constructor, use new game board object to make new user
function makeUserForStorage(existingUser) {
  // i passed in null if the user doesn't exist
  if(existingUser) {
    // take the object literal from the JSON file and turn it into the a User and Gameboard object
    let existingGame = new GameBoard(existingUser.gameBoard.colorArray, existingUser.gameBoard.correctOrderArr, existingUser.gameBoard.previousGuesses, existingUser.gameBoard.gameCounter);
    let existingUserNewObject = new User(globalUserName, existingGame);
    currentUser = existingUserNewObject;
    allUserArray[currentUserIndex] = existingUserNewObject;
  } else if (!existingUser) {
    let newColorArray = generateRandomColors();
    let newCombo = getCorrectOrder(newColorArray);
    let newGame = new GameBoard(newColorArray, newCombo);
    currentUser = new User(globalUserName, newGame);
    allUserArray.push(currentUser);
  }
  updateLocalStorage();
}

// traverse through userObjects array
// if user's name exists in any object's name property, return that object
// if doesn't exist it will return null
function getUser() {
  let name = document.getElementById('name');
  // console.log(name.value);
  globalUserName = name.value;
  let userForm = document.querySelector('#userName');
  userForm.innerHTML = '';
}

// this function will get variables out of local storage set initialize the user object array global variables
function getLocalStorage() {
  allUserArray = JSON.parse(localStorage.getItem('storedUsers'));
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
  playerLabel.innerHTML='Please enter your name.';
  let nameButton = document.createElement('button');
  nameButton.type='button';
  nameButton.innerHTML='Submit';
  nameButton.addEventListener('click', () => {
    getUser();
    checkIfUserExists();
  });
  userName.appendChild(playerLabel);
  userName.appendChild(player);
  userName.appendChild(nameButton);

}


// let testColorArray = generateRandomColors();
// getCorrectOrder(testColorArray);


// this function is called multiple times throughout the application, anytime the User object is changed or updated, we need to update that object in the global, update the global user array, and then set the array in local storage to be the updated global array
function updateLocalStorage() {
  localStorage.clear();
  let stringArray = JSON.stringify(allUserArray);
  localStorage.setItem('storedUsers', stringArray);
}


'use strict';

// GLOBAL VARIABLES
// User Array from local storage, current user


// USER CONSTRUCTOR and PROTOTYPES
/* TODO: create User constructor with these properties:
    username:
    totalGamesWon:
    winStreak:
    highestWinStreak:
    GameBoard: (it's an object)
  */
function User(username) {
  this.GameBoard = createGameBoard();
}

// Prototype functions for user
// TODO: create function to update properties of User object's stats
User.prototype.updateStats = function() {

}

// GAME BOARD CONSTRUCTOR and PROTOTYPES
// TODO: make constructor for the area where users actually play the game
  // properties:
    // this.colorArray: an array for random colors
    // a string for the word that is the answer
    // an array to hold the previous guesses for this play session
      // each index in the array will be an array 
function GameBoard(colorArray = generateRandomColors(), correctAnswer = getCorrectWord(), previousGuesses = []) {
  this.colorArray = colorArray;
  this.correctAnswer = correctAnswer;
  this.previousGuesses = previousGuesses;
}

// prototype functions for GameBoard
// push the guess onto the game board object guess array
// TODO: 
GameBoard.prototype.addGuess = function(letterColorArray) {

};

// window into the dom, create grid for guesses and create another grid for keyboard
// // TODO: add event listeners to keyboard so the guess is added to the game board guesses array, checked, and board update
GameBoard.prototype.renderBoard = function() {

};

// TODO: the int array will hold numbers which correspond to right, wrong, and wrong position
// compare each box of the user's guess with the answer key
GameBoard.prototype.checkGuess = function() {
  return [int];
};

// this function updates the GameBoard object base
//  on the results of the user's last attempt/ the int array passed into this functions is from check  guess
// update the global variables, both the object and the object in the array
// update the user array by setting the local variable user as the local storage user array
// TODO: Submit guess to the array and update the local storage.
// TODO: Compare attempted guess with the color position and answers.
// TODO: Display symbol and color the border to display if the attempted guess is right, wrong, or correct, but in the wrong spot
GameBoard.prototype.updateBoard = function (intArr) {

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
function getCorrectWord() {
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

// create an empty array that will store individual words
// parse text file by using the \n as a deliminator, push the parsed words onto the empty array
// set item into local storage as the dictionary
function storeDictionary(wordListFile) {

}

// in the drive conditional, call this when a new user must be created
// it will create a new user object with the user's name
// return the object so that it can be stored as current user and pushed onto the user array
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


## Vision

**What is the vision of this product?**

A Wordle-like game where users pick colors to guess a combination of colors in a predetermined order.

**What pain point does this project solve?**

This game allows pre-readers, non-English speakers, as well as the reading-impaired to play a Wordle-like game.

**Why should we care about your product?**

Our product is inclusive to almost everyone of all skill levels and capabilities.

## Scope (In/Out)

**IN** - What will your product do
  - Will display colors for players to pick
  - Will have a game board to slot in colors and letter
  - Game board will show previous correct and incorrect guesses
  - Selection of letters and colors will visually toggle off if guessed and not used in the answer
  - Visual indication when the game is over

**OUT** - What will your product not do.
  - Our application will be limited to common-ish English language words
  - Our game will not accept profanity

What will your MVP functionality be?

- displays letter and colors for the user to choose from
- accepts colors and letters as guesses
- gives feedback to know how close the guess matches the answer
- visually indicates when the game is over


## Stretch Goals ##

- animations
  - like confetti 🎊
- dark mode
- hard mode
- high contrast mode
- user stats in local storage
- sound effects
  - like "yay!"

# Functional Requirements

- A user can select from a selection of displayed colors

- letters assigned colors and children must match the color of the each letter with a matching box

- A user can submit a guess when each box in a row line is filled and will receive feedback on their attempt in the form of symbols

## Data Flow

- array of words
  - can load into local storage to speed up page load

- game board object with these properties:
  - array of randomly generated colors
  - answer from array of words
  - the correct word
  - the correct color combination
  - array of previously guessed words
  - array of attempted color combinations
  - function that compares the current guess with the correct answer
  - render function to display the grid and selectable colors and letters
  - function to assign colors to each selectable letter corresponding to the colors in the answer
  - render keyboard/color-board area
    - update the keyboard colors with each attempt

- array of users (local storage)
  - user statistics object
    - user name
    - total games played
    - win rate
    - win streak counter
    - max number of wins in a row
    - average # of guesses for won games
    - guess distribution
  
0. page loads

1. ask user for their name

2. check local storage:
  - load game dictionary from local storage
    - or store dictionary in local storage
  - check if current player is in the middle of a game
    - if so, load that player's previous game state and render game board from storage
      - parse()
  - if user name not found in local storage, create new user

3. create new user object
 - assign user name to a property
 - load user play stats and assign each to a property
 - create game board object

4. create/load game board object
  - if new user, or no previous game state loaded, create a new game board:
    - generate random number index for the array of possible words
      - use index to get "answer" word from array
      - pass the "answer" word to the game board constructor helper
    - generate randomColors array[] with distinct random colors within specified ranges
      - pass color array[] to the GameBoard() constructor
    - create empty array to store guesses for current game
  
5. user enters an attempted guess
  - add guess to userGuesses[] array
  - guess displays on screen
  - update local storage with current guess
    - stringify
    - set item
  - match user guess to answer
    - use function
  - display symbols for correct or close matches (positions and correct colors/letters)
    - event handler

6. user runs out of guesses or answers correctly
  - disable event listener
  - update user stats
    - stringify and set to local storage
  - display correct answer
  - render and display user stats
  - play again button to play again:
    - clear current game board and render a new one for this user
    - reset game state in local storage

 take array of words and get a random word from an index

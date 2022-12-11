/* Setting HTML elements to variables */
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var text = document.getElementById('comp-text');

/**
 * Sets the innerText of var text to a callable function.
 * Used to change the computer players text throughout the game.
 * Updates the current game.text being displayed.
 *  */ 
function updateText() {
    text.innerText = game.text;
};

/* Initalises the game */
let game = {
    currentGame: [],
    failScore: 10,
    text: "THIS IS WORKING!",
};

/* Level 1 - Basic Aptitude Test */
let levelOne = {
    
}

/* Calling updateText Function */
updateText();

/* Exports functions for the test file to access */
module.exports = { game, text, updateText, };
/* Setting HTML elements to variables */
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');

/* Setting innerText to an object for mainpulation later */
let text = "HI!";
document.getElementById('comp-text').innerText = text;

/* Initalises the game */
let game = {
    currentGame: [],
    failScore: 10,
    text: "THIS IS WORKING!",
};

/* Level 1 - Basic Aptitude Test */
let levelOne = {
    
}



/* Exports functions for the test file to access */
module.exports = { game, text };
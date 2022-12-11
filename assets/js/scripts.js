/* Setting HTML elements to variables */
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var cText = document.getElementById('comp-text');

/* Initalises the game */
let game = {
    failScore: 10,
    currentGame: [],
    text: "THIS IS WORKING!",
};

/* Shows the current score on screen */
function showScore () {
    document.getElementById("score").innerText = game.failScore;
}

/* Adds 1 to the score */
function updateScore (){
    game.failScore++;
}

/**
 * Sets the innerText of var text to a callable function.
 * Used to change the computer players text throughout the game.
 * Updates the current game.text being displayed.
 *  */ 
function updateText() {
    cText.innerText = game.text;
};

/* Resets settings when launching a new game. */
function newGame(){
    game.currentGame = [];
    game.failScore = 0;
    game.text = "Welcome New Candidate to the H.U.G. Protocol."
}

/**Creates a username text field for the player to interact with.
 * Saves the username on button click. 
 * Removes the button now that data is set. 
 */
function levelOne(){
    /* Creates an input box for the user to enter their username */
    let nameBox = document.createElement("div");
    /* Sets the innerHTML of the newly created div object */
    nameBox.innerHTML = `
        <label>Enter Your Name:</label>
        <br>
        <input type="text" id="userText">
        <br>
        <button type="button" id="nameButton" class="btn">submit</button>
    `;
    /* Appends it to the empty "user" div inside of the html file */
    document.getElementById("user").append(nameBox);
    /* Logs button press and sets the value of username */
    document.getElementById("nameButton").onclick = function(){
        let username = document.getElementById("userText");
        /* Appends it to the empty "user" div inside of the html file */
        document.getElementById("user").remove(nameBox);
        /* Updates computer players text */
        game.text = "Welcome" + $('#username') + ", enjoy the H.U.G. Protocol."
        updateText();
    };
}

/* Calling functions for test purposes */
updateText();
showScore();
levelOne()

/* Level 1 - Basic Aptitude Test */

/* Exports functions for the test file to access */
module.exports = { game, updateText, newGame, };
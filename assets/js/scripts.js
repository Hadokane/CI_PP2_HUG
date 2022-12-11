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
    /* Sets the value of username */
    document.getElementById("nameButton").onclick = function(){
        let username = document.getElementById("userText").value;
        /* Updates computer players text and references the players username */
        game.text = "Welcome " + username + "...";
        updateText();
        game.text = "Hmm... " + username + "is a funny name...";
        setTimeout(updateText, 3000);
        game.text = "No matter... " + username;
        setTimeout(updateText, 6000);
        game.text = username + " pfft... ";
        setTimeout(updateText, 9000);
        game.text = "Enjoy the H.U.G. Protocol.";
        setTimeout(updateText, 12000);
        
        /* Appends it to the remove nameBox from the "user" div inside of the html file */
        document.getElementById("user").remove(nameBox);
    };
}

/* jQuery Test - recolouring buttons to test functionality */
$(".btn").css("background-color", "red");

/* Calling functions for test purposes */
updateText();
showScore();
levelOne()

/* Level 1 - Basic Aptitude Test */

/* Exports functions for the test file to access */
module.exports = { game, updateText, newGame, };
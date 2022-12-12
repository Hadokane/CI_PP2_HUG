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
 * Known Bug - Allows user to input HTML, should fix.
 *  */ 
function updateText() {
    cText.innerHTML = game.text;
};

/** Sleep function using Promises to set delays between code */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/* Resets settings when launching a new game. */
function newGame(){
    game.currentGame = [];
    game.failScore = 12;
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
        <input type="text" id="user-text">
        <br>
        <button type="button" id="nameButton" class="btn">submit</button>
    `;
    /* Appends it to the empty "user" div inside of the html file */
    document.getElementById("user").append(nameBox);
    /* Launches the following function when the button is clicked */
    document.getElementById("nameButton").onclick = function(){
        /* Sets the value of userText to an object */
        let userString = document.getElementById("user-text").value;
        /*Converts the above object into a string */
        let username = "<div id='username-style'>" + JSON.stringify(userString) + "</div>";
        /* Appends it to the remove nameBox from the "user" div inside of the html file */
        document.getElementById("user").remove(nameBox);
        /* Updates computer players text and references the players username */
        async function delayedGreeting() {
            game.text = "Welcome " + username + "...";
            updateText();
            await sleep(3000);
            game.text = "Hmm... " + username + " is a funny name!"
            updateText();
            await sleep(3000);
            game.text = "No matter " + username + " you'll have to do.";
            updateText();
            // await sleep(3000);
            // game.text = "Enjoy your initiation...";
            // updateText();
            // await sleep(3000);
            // levelTwo();
        }
        delayedGreeting()
    }};

function levelTwo(){
    game.currentGame = [];
    game.failScore = 15;
    game.text = "Welcome " + username + ", let's begin with a few simple questions.";
};

/* jQuery Test - recolouring buttons to test functionality */
$(".btn").addClass("btn-red");

/* Calling functions for test purposes */
levelOne();
updateText();
showScore();


/* Level 1 - Basic Aptitude Test */

/* Exports functions for the test file to access */
module.exports = { game, updateText, newGame, };
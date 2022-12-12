/* Setting HTML elements to global variables */
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var cText = document.getElementById('comp-text');
var userString;
/* Providing default value */
var username = "<span id='username-style'>" + "Steve" + "</span>";

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

/* Adds num to the current game.failScore */
function updateScore (num){
    game.failScore = game.failScore + num;
}

/**
 * Sets the innerText of var text to a callable function.
 * Used to change the computer players text throughout the game.
 * Updates the current game.text being displayed.
 * Known Bug - Allows user to input HTML, should fix.
 *  */
function updateText() {
    cText.innerHTML = game.text;
}

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

/** Creates a username text field for the player to interact with.
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
        <br>
        <button type="button" id="nameButton" class="btn">submit</button>
    `;
    /* Appends it to the empty "user" div inside of the html file */
    document.getElementById("user").append(nameBox);
    /* Launches the following function when the button is clicked */
    document.getElementById("nameButton").onclick = function(){
        /* Sets the value of userText to an object */
        userString = document.getElementById("user-text").value;
        /* Converts the above object into a string, wraps it in a span */
        username = "<span id='username-style'>" + JSON.stringify(userString) + "</span>";
        /* Appends it to the remove nameBox from the "user" div inside of the html file */
        document.getElementById("user").remove(nameBox);
        /* Updates computer players text and references the players username */
        async function delayedGreeting() {
            game.text = "Welcome " + username + ".";
            updateText();
            await sleep(3000);
            game.text = "Hmm... " + username + " is a funny name!"
            updateText();
            await sleep(3000);
            game.text = "No matter " + username + " you'll have to do.";
            updateText();
            await sleep(3000);
            game.text = "Enjoy your initiation...";
            updateText();
            await sleep(3000);
            levelTwo();
        }
        delayedGreeting()
    }}

/** Level 1 - Basic Aptitude Test (Questions Round) */
function levelTwo(){
    game.currentGame = [];
    game.failScore = 42;
    game.text = "Your first test " + username + " during the H.U.G. Protocol.";
}

/** (Maths Round) */
function levelThree(){
    game.currentGame = [];
    game.failScore = 66;
    async function delayedGreeting() {
        game.text = "Your second test, " + username + ", is 'Basic addition.'"
        await sleep(3000);
        game.text = "Surely even you can handle this one."
        updateText();
        await sleep(3000);
    }
    delayedGreeting()
}

/* jQuery Test - recolouring buttons to test functionality */
$(".btn").addClass("btn-red");

/* Calling functions for test purposes */
levelOne();
updateText();
showScore();



/* Exports functions for the test file to access */
module.exports = { game, updateText, newGame, };
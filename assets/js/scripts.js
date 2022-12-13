// Waits for the DOM to finish loading before running the game.
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");
    // Looks through buttons array and stores each element in the button variable
    for (let button of buttons) {
        button.addEventListener("click", function() {
            // looks through the buttons data-type and displays an alert of which button has been pressed.
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked Submit!");
            } else {
                let btnName = this.getAttribute("data-type");
                alert(`You clicked ${btnName}`);
            }
        });
    }
    /* Calling functions for test purposes */
    updateText(); // Displays game.text in the HTML Div
    setScore(3); // Adds 3 to the game.failScore
    levelTwo();
});

// Setting HTML elements to global variables
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var cText = document.getElementById('comp-text');
var userString;
// Providing default value for testing
var username = "<span id='username-style'>" + "Steve" + "</span>";

// Initalises the game
let game = {
    failScore: 10, // set so that once reaches 10 you are rejected. Ends the game.
    mathScore: 0, // Used to advance the questions in level3
    currentGame: [],
    text: "THIS IS WORKING!", // Test text, set to empty in release.
};

/**
 * Sets the innerText of var text to a callable function.
 * Used to change the computer players text throughout the game.
 * Updates the current game.text being displayed.
 * Added HTML <h2> wrapper to enable animations to effect it
 * Known Bug - Allows user to input HTML, should fix.
 *  */
function updateText() {
    cText.innerHTML = "<h2 class ='animate__animated animate__fadeInUp'>" + game.text + "</div>";
}

/** Adds newScore to the current game.failScore value.
 * Can put (0) to initalise the score */
function setScore(newScore){
    game.failScore = game.failScore + newScore;
    document.getElementById("score").innerText = game.failScore;
}

/** Updates the game.mathScore data by the value of newMathScore.
 * Can put (0) to initalise the score
 */
function setMathScore(newMathScore){
    game.mathScore = game.mathScore + newMathScore;
}

/** Sleep function using Promises to set delays between code.
 * Used mainly for the purpose of displaying automated text for the computer player.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/** Resets settings and Launches a new game.
 * Make callable via a button and the first function called on Page load in final.
 */
function newGame(){
    game.currentGame = [];
    game.failScore = 8;
    game.text = "Welcome New Candidate to the H.U.G. Protocol."
    // Add button here, that onClick loads levelOne.
}

////////////////////////////////////////////////////////////////////////

/** Level 1 - Creates a username text field for the player to interact with.
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
        <input type="text" id="username-btn" class="user-text" maxlength="10">
        <br>
        <br>
        <button type="button" id="nameButton" class="btn">submit</button>
    `;
    /* Appends it to the empty "user" div inside of the html file */
    document.getElementById("user").append(nameBox);
    /* Launches the following function when the button is clicked */
    document.getElementById("nameButton").onclick = function(){
        /* Sets the value of userText to an object */
        userString = document.getElementById("username-btn").value;
        /* Converts the above object into a string, wraps it in a span */
        username = "<span id='username-style'>" + JSON.stringify(userString) + "</span>";
        /* Removes nameBox from the "user" div inside of the html file */
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

////////////////////////////////////////////////////////////////////////

/** Level 2 - Basic Aptitude Test (Questions Round) */
function levelTwo(){
    game.currentGame = [];
    game.failScore = 42;
    /* Updates computer players text and references the players username */
    async function delayedGreeting() {
        game.text = "Initalising <em>[Human Usefulness Generator]</em>..."
        updateText();
        await sleep(3000);
        game.text = "Welcome " + username + " to your first test.";
        updateText();
        await sleep(3000);
        game.text = "This is the <em>[Basic Aptitude Module]</em>.";
        updateText();
        await sleep(3000);
        game.text = "You will be asked a series of important questions.";
        updateText();
        await sleep(3000);
        game.text = "Answer honestly... Your future membership depends on it.";
        updateText();
        // Loads the questions section
        await sleep(3000);
        runQuestionGame();
    }
    delayedGreeting();
}

function runQuestionGame(){
    alert("Run Question Game working!")
}
////////////////////////////////////////////////////////////////////////

/** (Maths Round) */
function levelThree(){
    game.currentGame = []; // for test
    game.failScore = 66; // for test
    async function delayedGreeting() {
        game.text = "This is the <em>[Basic Equation Module]</em>."
        updateText();
        await sleep(3000);
        game.text = "Your second test " + username + ", will be to combine the following numbers."
        updateText();
        await sleep(3000);
        game.text = "Surely even you can handle this one."
        updateText();
        await sleep(3000);
        // Load a clickable button to run the following.
        runMathGame();
    }
    delayedGreeting()
}

/** Generates 2 random numbers.
 * Adds necessary UI elements to div. */
function runMathGame(){
    game.text = "runMathGame in effect."
    // Generates a random number * 10, rounded to nearest integer. Won't return 0.
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    // Creates an input box for the user to enter their username 
    let mathBox = document.createElement("div");
    // Sets the innerHTML of the newly created div object, uses external animate class.
    mathBox.innerHTML = `
        <div id="math-question" class="animate__animated">
            <span id="operand1"> 0 </span>
            <span id="operator"> x </span>
            <span id="operand2"> 0 </span>
            <span> = </span>
        </div>
        <br>
        <label>Enter Answer:</label>
        <br>
        <input id="answer-box" class="user-text" type="number">
        <br>
        <br>
        <button data-type="submit" id="btn-math" class="btn">Submit Answer</button>
        `;
    // Appends it to the empty "user" div inside of the html file
    document.getElementById("user").append(mathBox);
    // Add animate class then remove it.
    document.getElementById("math-question").classList.add("animate__heartBeat");
    // Calls a function to set the operators of the question
    displayQuestion(num1, num2, "+");
    // Assigns the submit answer button a function
    document.getElementById("btn-math").onclick = function(){
        // Removes button's animation class
        document.getElementById("math-question").classList.remove("animate__heartBeat");
        // Removes button's click property to prevent spam/double clicking.
        document.getElementById("btn-math").onclick = "";
        // Runs the checkAnswer function.
        checkAnswer();
    }
};

function nextQuestion(){
    // Generates a random number * 10, rounded to nearest integer. Won't return 0.
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    // Choses the operand based on number of correct questions
    if (game.mathScore === 1){
        displayQuestion(num1, num2, "x");
    } else if (game.mathScore === 2) {
        displayQuestion(num1, num2, "-");
    } else if (game.mathScore === 3) {
        alert("You a smarty pants!");
        // Add code to launch next section of the game here.
    } else {
        displayQuestion(num1, num2, "+");
    }''
    
    // Assigns the submit answer button a function
    document.getElementById("btn-math").onclick = function(){
        // disables onclick function to prevent spamming
        document.getElementById("btn-math").onclick = "";
        document.getElementById("math-question").classList.remove("animate__heartBeat");
        checkAnswer();
}
};

/** Reads the 2 random numbers and operator. 
 * Completes the equation to determine the answer.
 * Called by the checkAnswer function. */
function correctAnswer(){
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;
    // Compares the operator and values with the question to decide the answer.
    if (operator === "+") {
        return [operand1 + operand2];
    } else if (operator === "x") {
        return [operand1 * operand2];
    } else if (operator === "-") {
        return [operand1 - operand2];
    } else {
    alert ("There has been an error in the protocol. Abort mission.");
    }
};

/** Checks the answer against the calculatedAnswer */
function checkAnswer(){
    // Gets the users answer from the box. parseInt converts string to a number.
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    // Runs the correctAnswer function
    let calculateAnswer = correctAnswer();
    // Compares them against each other to check users answer.
    let isCorrect = userAnswer === calculateAnswer[0];
    // Shows correct/incorrect text based on user answer. Advances game.
    if (isCorrect) {
        async function delayedCorrect() {
            // adds to the game.mathScore to update the operand and advance the game.
            setMathScore(1);
            game.text = "Adequate work " + username +".";
            updateText();
            await sleep(2000);
            game.text = "Again!";
            updateText();
            document.getElementById("math-question").classList.add("animate__heartBeat");
            nextQuestion();
        };
        delayedCorrect();
    } else {
        // adds +1 to failScore
        setScore(1);
        // async function to cycle through text before loading the next round.
        async function delayedWrong() {
            game.text = `Hmmm... yes... the <strong>correct answer</strong> would have been a more <em>boring</em> choice.`
            updateText();
            await sleep(3000);
            game.text = "Try this next one."
            updateText();
            document.getElementById("math-question").classList.add("animate__heartBeat");
            nextQuestion();
        };
        delayedWrong();
    }
};

function displayQuestion(operand1, operand2, operator) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = operator;
    operator = "+";
};

////////////////////////////////////////////////////////////////////////

// Keep cursor still game.
// Array section - replace a member game.
// Sacrifice fruit section.
// End messages. Reward certificate.
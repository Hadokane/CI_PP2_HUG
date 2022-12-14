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
    // runHubWorld();
    finalProtocol();
});

// Setting HTML elements to global variables
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var cText = document.getElementById('comp-text');
var userString;
// Providing default value for testing, set to "" when testing is done
var username = "<span id='username-style'>" + "Steve" + "</span>";

// Initalises the game
let game = {
    failScore: 0, // set so that once reaches 10 you are rejected. Ends the game.
    mathScore: 0, // Used to advance the questions in math game
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

////////////////////////////////////////////////////////////////////////

/** Resets settings and Launches a new game.
 * Make callable via a button and the first function called on Page load in final.
 */
function newGame(){
    game.text = "Welcome New Candidate to the H.U.G. Protocol."
    updateText(); // Displays the update to the game.text
    setScore(8); // Adds 8 to score

    // Creates the start game button
    let startBtn = document.createElement("div");
    // Sets the innerHTML of the newly created div object
    startBtn.innerHTML = `
        <button type="button" id="startBtn" class="btn">Begin Assessment</button>
    `;
    /* Appends it to the empty "user" div inside of the html file */
    document.getElementById("user").append(startBtn);

    /* Launches the following function when the button is clicked */
    document.getElementById("startBtn").onclick = function(){
        /* Removes nameBox from the "user" div inside of the html file */
        startBtn.remove();
        enterName(); // runs enterName
    }
}

////////////////////////////////////////////////////////////////////////

/** Level 1 - Creates a username text field for the player to interact with.
 * Saves the username on button click. 
 * Removes the button now that data is set. 
 */
function enterName(){
    game.text = "Enter your name below."
    updateText(); // Displays the update to the game.text

    /* Creates an input box for the user to enter their username */
    let nameBox = document.createElement("div");
    /* Sets the innerHTML of the newly created div object */
    nameBox.innerHTML = `
        <label>NAME HERE:</label>
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
        if (document.getElementById("username-btn").value === ""){
            game.text = "We don't accept the 'nameless' here."
            updateText();
        } else {
             /* Sets the value of userText to an object */
            userString = document.getElementById("username-btn").value;
            /* Converts the above object into a string, wraps it in a span */
            username = "<span id='username-style'>" + JSON.stringify(userString) + "</span>";
            /* Removes nameBox from the "user" div inside of the html file */
            nameBox.remove();
            /* Updates computer players text and references the players username */
            async function delayedGreeting() {
            game.text = "Welcome " + username + ".";
            updateText();
            await sleep(3000);
            game.text = "Hmm... " + username + " is a funny name!"
            updateText();
            await sleep(3000);
            game.text = "Don't believe we've ever had a " + username + " before.";
            updateText();
            await sleep(3000);
            game.text = "Enjoy your initiation...";
            updateText();
            await sleep(3000);
            levelIntroHub();
            }
            delayedGreeting()
        }
    }
}

////////////////////////////////////////////////////////////////////////

/** Level 2 - Basic Aptitude Test (Questions Round) */

// Keeps track of player items.
let state = {};

function levelIntroHub(){
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
        runHubWorld();
    }
    delayedGreeting();
}

function runHubWorld(){
    state = {}; // sets players starting items
    setScore(42); // sets the fail score.
    showTextNode(1); // shows initial text from node 1 of the array.
}

function showTextNode(textNodeIndex){
    // sets const equal to the id of the textNodes array.
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // Sets inner text of element equal to textNodes.text, wrapped in <h2> tags for css styles
    cText.innerHTML = "<h2>" + textNode.text + "</h2>";
    // Removes the button child elements from the options-buttons div - if present - when not called by the question. Removes the questions buttons.
    while (document.getElementById("option-buttons").firstChild) {
        document.getElementById("option-buttons").removeChild(document.getElementById("option-buttons").firstChild)
    }
    // Creates the buttons needed for each question after removal finishes.
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text // Sets buttons text to match the text nodes options Text
            button.classList.add("btn") // Adds CSS styles
            // onClick the button runs the selectOption function.
            button.addEventListener("click", () => selectOption(option))
            document.getElementById("option-buttons").appendChild(button)
        }
    })

}

// Called by showTextNode if loop. Finds the option and updates the players state if item acquired.
function selectOption(option) {
    // finds the next textNode specified in text
    const nextTextNodeId = option.nextText
    // checks to see if a function has been called.
    if (nextTextNodeId === -1){
        // Removes buttons before loading game.
        while (document.getElementById("option-buttons").firstChild) {
            document.getElementById("option-buttons").removeChild(document.getElementById("option-buttons").firstChild)
        }
        // change to levelIntroMath
        levelIntroMath(); 
    }
    // checks the state, updates the state if setState present, overwrites state.
    state = Object.assign(state, option.setState)
    // Shows the nextTextNode
    showTextNode(nextTextNodeId)
}

// Called by showTextNode if loop.  
function showOption(option) {
    // if no state is required (null) returns ture or if requiredstate is met returns true, showing hidden options.
    return option.requiredState == null || option.requiredState(state);
}

// The games many text options that populate the hub world.
const textNodes = [
    { // Initial hub area, allows travel to other zones.
        id: 1,
        text: "The H.U.G. Protocol requires your digital conciousness to continue. <br><br> Proceed?",
        options: [
            {
                text: "Walk into the light.",
                setState: { noBadge: true }, // Sets starting inventory for the player.          
                nextText: 2, // advances to id: 2
            }
        ]
    },
    { // Initial hub area, allows travel to other zones.
        id: 2,
        text: "Welcome to the hub " + username + ". Where would you like to go?",
        options: [
            {
                text: "Left",
                requiredState: (currentState) => currentState.noBadge, // requires noBadge to show            
                nextText: 3, // advances to id: 2
            },
            {
                text: "Left (With Badge)",
                requiredState: (currentState) => currentState.mathBadge, // requires mathBadge to show. state{} read. Does it have what is required? Show Option Function reads it.
                nextText: 77, // runs mathGame
            },
            {
                text: "Left (With BigBrain)",
                requiredState: (currentState) => currentState.bigBrain, // requires bigBrain
                nextText: 13, // runs mathGame
            },
            {
                text: "Forward",
                nextText: 13,
            },
            {
                text: "Right",
                nextText: 13,
            },
        ]
    },
    { // If chosing left above.
        id: 3,
        text: "You reach a dark room filled with blood.",
        options: [
            {
            text: "gross!",
            nextText: 4,
            },
            {
            text: "cool!",
            nextText: 5,
            },
        ]
    },
    { // If chosing left above.
        id: 4,
        text: "Smells bad bro.",
        options: [
            {
            text: "grab math badge!",
            setState: { mathBadge: true, noBadge: false }, // gives you badge, removes no_badge property; Sets state to true for mathBadge.
            nextText: 2, // Returns to Hub
            },
        ]
    },
    { // If chosing left above.
        id: 77,
        text: "You see a math console plugged in. Run Protocol?",
        options: [
            {
            text: "Flee in fear!",
            setState: { mathBadge: true, noBadge: false }, // gives you badge, removes no_badge property; Sets state to true for mathBadge.
            nextText: 2, // Returns to Hub
            },
            {
            text: "Run Math Protocol!",
            setState: { mathBadge: true, noBadge: false }, // gives you badge, removes no_badge property; Sets state to true for mathBadge.
            nextText: -1, // Runs Math Game
            },
        ]
    },
    { // After completing Math Game.
        id: 42,
        text: "Protocol Complete. Good job " + username,
        options: [
            {
            text: "Place hand on console!",
            setState: { bigBrain: true, }, // gives you badge, removes no_badge property; Sets state to true for mathBadge.
            nextText: 2, // Returns to Hub
            },
        ]
    },
    { // If chosing left above.
        id: 5,
        text: "Indeed.",
        nextText: 2, // Returns to Hub
    },
]

////////////////////////////////////////////////////////////////////////

/** (Maths Round) */
function levelIntroMath(){
    game.failScore = 66; // for test
    async function delayedGreeting() {
        game.text = "Welcome to the <em>[Basic Equation Module]</em>."
        updateText();
        await sleep(3000);
        game.text = "Here " + username + " we will test your ability to combine basic numbers."
        updateText();
        await sleep(4000);
        game.text = "Surely even you can handle this one."
        updateText();
        runMathGame();
    }
    delayedGreeting()
}

/** Generates 2 random numbers.
 * Adds necessary UI elements to div. */
function runMathGame(){
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

// Takes in 2 numbers and an operator string to create a question. Called elsewhere.
function displayQuestion(operand1, operand2, operator) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = operator;
    operator = "+";
};

// Generates two random numbers and passes them into display question. Advances the game./
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
        // Removes the mathbox child elements from the user div.
        while (document.getElementById("user").firstChild) {
            document.getElementById("user").removeChild(document.getElementById("user").firstChild)
        }
        showTextNode(42); // On completion of math game, this loads the (specified) level back in the hub world.
    } else {
        displayQuestion(num1, num2, "+");
    }''
    
    // Assigns the submit answer button an onClick function
    document.getElementById("btn-math").onclick = function(){
        // disables onclick function to prevent spamming
        document.getElementById("btn-math").onclick = "";
        // removes animation class so that it can be re-added elsewhere to play again.
        document.getElementById("math-question").classList.remove("animate__heartBeat");
        // runs checkAnswer function
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
            // adds to the game.mathScore to update the operands and advance the game.
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

////////////////////////////////////////////////////////////////////////

function finalProtocol() {
    // Array data for cards
    let members = {
        firstname: ["Jim", "Pam", "Steve", "Urkle", "Johnny", "Benjamin", "Hooper", "Eleanor", "Marge", "Big", "Naruto", "Myuzaki", "Ronald", "Bjorn", "Golden", "Max", "Julia", "Mr.", "Mrs.", "Senior",],
        lastname: ["Stevenson", "Bjornson", "Lennon", "Graham", "Davies", "The Crypt Keeper", "The Fisherman", "Nightingale", "Stalingrad", "Rigby", "John-Johnson", "Simpson", "Benjamin", "Troubador", "The Great", "Power", "Radaghast",],
        skill: ["East-End Bartender", "Computer Scientist", "Full-Time Dungeon Master", "Weekend Dog Walker", "Middle School Teacher", "Developer of Indie RPG'S", "Airsoft Enthusiast", "Owns a Katana Collection", "Drives a '67 Chevrolet Impala", "Has Been To France Twice", "Wearer of Vintage Hats", "Only Eats Red M&M's", "'Dynamic Brand Technician'", "Writes Avatar Fanfiction", "Has Eaten a Glass of Water With Chopsticks"],
    }

    // For loops iterate data and console.log it
    for (let i = 0; i < members.firstname.length; i++) {
        console.log(members.firstname[i]);
    }
    for (let i = 0; i < members.lastname.length; i++) {
        console.log(members.lastname[i]);
    }
    for (let i = 0; i < members.skill.length; i++) {
        console.log(members.skill[i]);
    }
   
    // Developing a random function for array selection // i < 8 as want 8 cards to display
    for (let i = 0; i < 8; i++) {
        // Generates a random number each time the code is ran, within confines of array.length
        let randomFname = Math.floor(Math.random() * members.firstname.length); // create a random number between 0 and the max array length
        // Uses random number to pick an item on the array
        let namerFirst = members.firstname.splice(randomFname, 1);
            console.log(randomFname);
            console.log(namerFirst);
            console.log(members.firstname);
        // Generates a random last name
        let randomLname = Math.floor(Math.random() * members.lastname.length); 
        let namerLast = members.lastname.splice(randomLname, 1);
            console.log(randomLname);
            console.log(namerLast);
            console.log(members.lastname);
        // Generates a random skill
        let randomSkill = Math.floor(Math.random() * members.skill.length); 
        let namerSkill = members.skill.splice(randomSkill, 1);
            console.log(randomSkill);
            console.log(namerSkill);
            console.log(members.skill);
    };
}


// Keep cursor still game.
// Array section - replace a member game.
// Sacrifice fruit section.
// End messages. Reward certificate.
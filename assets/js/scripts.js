// Waits for the DOM to finish loading before running the game.
document.addEventListener("DOMContentLoaded", function(){
    
    // Quit button launches a new game.
    generateQuitBtn();
    quitBtn.addEventListener("click", () => areYouSure());

    // Calling functions for test purposes
    updateText(); // Displays game.text in the HTML Div
    setScore(0); // Adds 0 to the game.failScore

    // runs a newGame();
    runHubWorld()
});

// Setting the players username to a global variable so it is accessible in all areas of the game.
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
};

/** Adds newScore to the current game.failScore value.
 * Can put (0) to initalise the score */
function setScore(newScore){
    game.failScore = game.failScore + newScore;
    document.getElementById("score").innerText = game.failScore;
    gameFailCheck();
};

/** Updates the game.mathScore data by the value of newMathScore.
 * Can put (0) to initalise the score
 */
function setMathScore(newMathScore){
    game.mathScore = game.mathScore + newMathScore;
};

/** Sleep function using Promises to set delays between code.
 * Used mainly for the purpose of displaying automated text for the computer player.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Creates a quit button that resets the game.
function generateQuitBtn(){
    // generates the button
        quitBtn = document.createElement("button");
        quitBtn.innerHTML= `<em>[End Protocol]<em>`;
        quitBtn.classList.add("btn", "btn-block");
        document.getElementById("quit-btn-div").append(quitBtn);
        
};

// Toggles visibility of the quit button
function toggleQuitBtn(){
    if (quitBtn.style.display === "none") {
        quitBtn.style.display = "block";
      } else {
        x.style.display = "none";
      }
};

// Checks if the user is sure they want to quit.
function areYouSure(){
    // Hides the quit button
    quitBtn.style.display = "none";
    // Creates No Button
    noBtn = document.createElement("button");
    noBtn.innerHTML= `<em>[Continue the test!]<em>`;
    noBtn.classList.add("btn", "btn-block", "btn-success");
    // Creates yes Button
    yesBtn = document.createElement("button");
    yesBtn.innerHTML= `<em>[Quit?]<em>`;
    yesBtn.classList.add("btn", "btn-block", "btn-danger");
    // remove quitBtn and adds yesBtn and noBtn
    document.getElementById("quit-btn-div").append(noBtn);
    document.getElementById("quit-btn-div").append(yesBtn);
    // Reloads the generateQuitBtn and removes these two if "No"
    noBtn.addEventListener("click", () => {
        toggleQuitBtn()
        document.getElementById("quit-btn-div").removeChild(yesBtn);
        document.getElementById("quit-btn-div").removeChild(noBtn);
    });
    // Quits the game by reloading the window if "Yes"
    yesBtn.addEventListener("click", () => window.location.reload());
};

// Ends the game if the game.failScore reaches 5 or above.
function gameFailCheck(){
    if (game.failScore > 4) {
        // Set game-window and gameOverWindow to variables.
        compWindow = document.getElementById("comp-player"); // Emptys the game window of all objects the player can interact with. Leaving only this text and the end button.
        gameWindow = document.getElementById("game-window"); // Emptys the game window of all objects the player can interact with. Leaving only this text and the end button.
        gameOverWindow = document.getElementById("gameover-window"); // Emptys the game window of all objects the player can interact with. Leaving only this text and the end button.
        // Hides the players game window
        compWindow.style.display = "none";
        gameWindow.style.display = "none";
        // Shows the game over window
        gameOverWindow.style.display = "block";       
    }
};

////////////////////////////////////////////////////////////////////////

/** Resets settings and Launches a new game.
 * Make callable via a button and the first function called on Page load in final.
 */
function newGame(){
    game.text = "Welcome New Candidate to the H.U.G. Protocol."
    updateText(); // Displays the update to the game.text
    setScore(0); // Initialises the score

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
};

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
};

////////////////////////////////////////////////////////////////////////

/** Text Based Adventure "HUB AREA" of the game */

// Keeps track of player items.
let state = {};

// Introduction test to the level
function levelIntroHub(){
    /* Updates computer players text and references the players username */
    async function delayedGreeting() {
        game.text = "Initalising <em>[Human Usefulness Generator]</em>..."
        updateText();
        await sleep(3000);
        game.text = "Welcome " + username + ".";
        updateText();
        await sleep(3000);
        game.text = "We will now present you with a series of apptitude tests.";
        updateText();
        await sleep(3000);
        game.text = "Do your best... Your future membership depends on it.";
        updateText();
        await sleep(3000);
        // Loads the Hub Area
        runHubWorld();
    }
    delayedGreeting();
};

// Launches the Hub World
function runHubWorld(){
    state = {}; // sets players starting items
    setScore(0); // sets the score
    showTextNode(1); // shows initial text from node 1 of the array.
};

// Displays the correct buttons and text necessary for navigating the text adventure section.
function showTextNode(textNodeIndex){
    // sets const equal to the id of the textNodes array.
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // Sets game.text equal to textNodes.text and calls the update
    game.text = textNode.text;
    updateText();
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

};

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
    } else if ((nextTextNodeId === -2)){
        // Removes buttons before loading game.
        while (document.getElementById("option-buttons").firstChild) {
            document.getElementById("option-buttons").removeChild(document.getElementById("option-buttons").firstChild)
        }
            finalProtocol(); // change to finalProtocol
        } else if ((nextTextNodeId === 13 | nextTextNodeId === 5)){ // Updates the fail score based on fail location ids   
            setScore(1); 
    };
    // checks the state, updates the state if setState present, overwrites state.
    state = Object.assign(state, option.setState)
    // Shows the nextTextNode
    showTextNode(nextTextNodeId)
};

// Called by showTextNode if loop.  
function showOption(option) {
    // if no state is required (null) returns ture or if requiredstate is met returns true, showing hidden options.
    return option.requiredState == null || option.requiredState(state);
};

// The games many text options that populate the hub world.
const textNodes = [
    { // Initial hub area, allows travel to other zones.
        id: 1,
        text: "The H.U.G. Protocol requires access to your digital conciousness to continue.",
        options: [
            {
                text: "Consent.",
                setState: { noLight: true }, // Sets starting inventory for the player.          
                nextText: 2, // advances to id: 2
            }
        ]
    },
    { // Initial hub area, allows travel to other zones.
        id: 2,
        text: "Welcome to the inner-hub. Where would you like your digital concious to travel?",
        options: [
            {
                text: "Left",
                requiredState: (currentState) => currentState.noLight, // requires noLight to show            
                nextText: 3, // advances to id: 2
            },
            {
                text: "Left (Light On)",
                requiredState: (currentState) => currentState.lightOn, // requires lightOn to show.
                nextText: 33, // To MathGame
            },
            {
                text: "Left (With BigBrain)",
                requiredState: (currentState) => currentState.bigBrain, // requires bigBrain from math game completion.
                nextText: 333, // Completed MathGame
            },
            {
                text: "Forward", // fail test
                nextText: 13,
            },
            {
                text: "Right", // end game test
                nextText: -2,
            },
        ]
    },
    { // If chosing left above.
        id: 3,
        text: "You reach a dark room filled with the sound of whiring machines.",
        options: [
            {
            text: "Feel for a light switch",
            nextText: 4,
            },
            {
            text: "Navigate the darkness",
            nextText: 5,
            },
        ]
    },
    { // If chosing left above.
        id: 13,
        text: "Fail score should go up by 1.",
        options: [
            {
            text: "Go Back",
            nextText: 2,
            },
        ]
    },
    { // Activate light switch
        id: 4,
        text: "Flicking a nearby switch illuminates the room with glowing light. You see a large server room.",
        options: [
            {
            text: "Approach the central console",
            setState: { lightOn: true, noLight: false }, // gives you badge, removes no_badge property; Sets state to true for mathBadge.
            nextText: 33, // Returns to Hub
            },
        ]
    },
    { // Brave the darkness (+1 failscore)
        id: 5,
        text: "You trip over the scattered wires... not your finest plan.",
        options: [
            {
            text: "Stumble to the light switch",
            nextText: 4, // Find light switch
            },
        ]
    },
    { // If chosing left above.
        id: 33,
        text: "You see a central machine running complex equations. A text box appears on the monitor: [Run Maths Protocol?]",
        options: [
            {
            text: "Flee from the idea of maths",
            nextText: 2, // Returns to Hub
            },
            {
            text: "Run Maths Protocol!",
            nextText: -1, // Runs Math Game
            },
        ]
    },
    { // After completing Math Game.
        id: 42,
        text: "[Protocol Complete.]",
        options: [
            {
            text: "Place hand on console!",
            setState: { bigBrain: true, lightOn: false }, // gives you badge, removes no_badge property; Sets state to true for mathBadge.
            nextText: 43, // Returns to Hub
            },
        ]
    },
    { // If chosing left above.
        id: 43,
        text: "The advanced machine creeks to life emitting an eerie blue light. You feel your head pulse for a moment.",
        options: [
            {
            text: "You feel energy leaving your digital form...",
            nextText: 44, // Returns to Hub
            }
        ]
    },
    { // If chosing left above.
        id: 44,
        text: "Looking down at your hand reveals a blue mark.",
        options: [
            {
            text: "Head back to central room",
            nextText: 2, // Returns to Hub
            }
        ]
    },
    { // If chosing left above.
        id: 333,
        text: "The lights from the buzzing machines create ominous shadows, as they flicker quickly across the drab white interior.",
        options: [
            {
            text: "Head back to central room",
            nextText: 2, // Returns to Hub
            }
        ]
    },

];

////////////////////////////////////////////////////////////////////////

/** (Maths Round) */
function levelIntroMath(){
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
};

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

// Generates two random numbers and passes them into display question. Advances the game.
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

// Array data for cards
let members = {
    firstname: ["Jim", "Pam", "Steve", "Urkle", "Johnny", "Benjamin", "Hooper", "Eleanor", "Marge", "Big", "Naruto", "Myuzaki", "Ronald", "Bjorn", "Golden", "Max", "Julia", "Mr.", "Mrs.", "Senior",],
    lastname: ["Stevenson", "Bjornson", "Lennon", "Graham", "Davies", "The Crypt Keeper", "The Fisherman", "Nightingale", "Stalingrad", "Rigby", "John-Johnson", "Simpson", "Benjamin", "Troubador", "The Great", "Power", "Radaghast",],
    skill: ["East-End Bartender", "Computer Scientist", "Full-Time Dungeon Master", "Weekend Dog Walker", "Middle School Teacher", "Developer of Indie RPG'S", "Airsoft Enthusiast", "Owns a Katana Collection", "Drives a '67 Chevrolet Impala", "Has Been To France Twice", "Wearer of Vintage Hats", "Only Eats Red M&M's", "'Dynamic Brand Technician'", "Writes Avatar Fanfiction", "Has Eaten a Glass of Water With Chopsticks"],
    avatar: [
            "assets/images/avatar/av1.png", 
            "assets/images/avatar/av2.png", 
            "assets/images/avatar/av3.png", 
            "assets/images/avatar/av4.png",
            "assets/images/avatar/av5.png",
            "assets/images/avatar/av6.png",
            "assets/images/avatar/av7.png",
            "assets/images/avatar/av8.png",
            "assets/images/avatar/av9.png",
            "assets/images/avatar/av10.png",
            "assets/images/avatar/av11.png",
            "assets/images/avatar/av12.png",
            "assets/images/avatar/av13.png", 
            "assets/images/avatar/av14.png", 
            "assets/images/avatar/av15.png", 
            "assets/images/avatar/av16.png",
            "assets/images/avatar/av17.png",
            "assets/images/avatar/av18.png",
            "assets/images/avatar/av19.png",
            "assets/images/avatar/av20.png",
            "assets/images/avatar/av21.png",
            "assets/images/avatar/av22.png",
            "assets/images/avatar/av23.png",
            "assets/images/avatar/av24.png",
        ]
}

// Loads cards for final act of the game.
function finalProtocol() {
    // TEST
    game.text = "The Final Assessment."
    updateText();
    // Developing a random function for array selection // i < 8 as I want 8 cards to display
    for (let i = 0; i < 8; i++) {
        // Generates a random number each time the code is ran, within confines of array.length
        let randomFname = Math.floor(Math.random() * members.firstname.length); // create a random number between 0 and the max array length
        // Uses random number to pick an item on the array
        let namerFirst = members.firstname.splice(randomFname, 1);
        // Generates a random last name
        let randomLname = Math.floor(Math.random() * members.lastname.length); 
        let namerLast = members.lastname.splice(randomLname, 1);
        // Generates a random skill
        let randomSkill = Math.floor(Math.random() * members.skill.length); 
        let namerSkill = members.skill.splice(randomSkill, 1);
        // Generates a random avatar image
        let randomAv = Math.floor(Math.random() * members.avatar.length); 
        let namerAv = members.avatar.splice(randomAv, 1);
        // Creates a card with the new information on it and displays it
        card = document.createElement("div");
        // Adds column sizing to the parent div to hold the cards
        card.classList.add("col-sm-6", "col-md-4", "col-lg-3"); 
        // Sets cards innerHTML
        card.innerHTML = `
            <div class="card text-center h-100">
                <img class="card-img-top" src=${namerAv} alt="Card image">
                <div class="card-body h-100">
                    <h3 class="card-title">${namerFirst} ${namerLast}</h3>
                    <p class="card-text">${namerSkill}.</p>
                </div>
                <div class="card-footer bg-transparent border-danger">
                    <a href="#" class="stretched-link h-100">Replace?</a>
                </div>
            </div>
        `;
        document.getElementById("final-cards").append(card);
    };

    // Set cards equal to all card class divs on display.   
    let cards = document.getElementsByClassName("card");
    // onClick destroys the card, removes it's own handler and then advances the game.   
    for (let card of cards) {
        card.addEventListener("click", function destroy() {
            // Copy the selected card into a new div to display
            let sacrifice = card;
            // Add a class to trigger the black and white animation 
            sacrifice.classList.add('destroy'); 
            document.getElementById("sacrifice-card").append(sacrifice);
            // Removes other cards from the div
            document.getElementById("final-cards").remove(card); // clears other cards
            // Removes event listener from the selected card
            card.removeEventListener("click", destroy);
            // create and set volume of audio
            let destroySoundF = new Audio("assets/sounds/destroyF.mp3");
            let destroySoundM = new Audio("assets/sounds/destroyM.mp3");
            destroySoundM.volume = 0.1;
            destroySoundF.volume = 0.1;
            // Select one of the above sounds to play at random
            let x = Math.round(Math.random());
            if (x === 1){
                destroySoundF.play();
            } else {
                destroySoundM.play();
            };
            // load end message
            async function delayedOutro(){
                game.text = "You actually did it...";
                updateText();
                await sleep(3000);
                game.text = `${username}... you're a monster.`;
                updateText();
                await sleep(3000);
                game.text = `Just kidding ${username}. Excellent work!`;
                updateText();
                // Loads the questions section
                await sleep(3000);
                document.getElementById("sacrifice-card").removeChild(sacrifice);
                runEnding(); // change to correct place
            };
            delayedOutro();
        });
    }
};

// Runs the games true ending, provides a restart button for the user.
function runEnding(){
    // Generates a random avatar image from the remaining array.
    let randomAv = Math.floor(Math.random() * members.avatar.length); 
    let namerAv = members.avatar.splice(randomAv, 1);
    // Creates the users card
    userCard = document.createElement("div");
    // Adds column sizing to the parent div to hold the cards
    userCard.classList.add("build"); 
    // Sets cards innerHTML
    userCard.innerHTML = `
        <div class="card text-center h-100">
            <img class="card-img-top" src=${namerAv} alt="Card image">
            <div class="card-body h-100">
                <h3 class="card-title">${username}</h3>
                <p class="card-text">Newest member of the H.U.G. Protocol</p>
                <p class="card-text">Failures: ${game.failScore}</p>
            </div>
            <div class="card-footer bg-transparent border-danger">
                <a href="#" class="stretched-link h-100">Digital Conscious Uploaded</a>
            </div>
        </div>
        `;
    document.getElementById("sacrifice-card").append(userCard);       
    // Plays final message and creates a replay button        
    async function delayedEnd(){
        game.text = `Congratulations! ${username} You have successfully passed the H.U.G. Protocol`;
        updateText();
        await sleep(3000);
        game.text = "We have stored the Digital ID of your Conscious";
        updateText();    
        await sleep(3000);
        game.text = "Thank you for your time.";
        updateText();
        await sleep(3000);
        game.text = "Feel free to screenshot your ID below.";
        updateText();
        await sleep(3000);
        game.text = "You are now authorised to recruit further members.";
        updateText();
        // Creates the replay button
        replayBtn = document.createElement("button");
        replayBtn.innerHTML= `<em>[Begin Protocol]<em>`;
        replayBtn.classList.add("btn", "btn-block");
        document.getElementById("user").append(replayBtn);
        // Replay button launches a new game.
        replayBtn.addEventListener("click", () => window.location.reload());
    }
    delayedEnd();
};
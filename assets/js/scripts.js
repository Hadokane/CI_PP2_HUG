// Waits for the DOM to finish loading before running the game.
document.addEventListener("DOMContentLoaded", function () {

    // Quit button launches a new game.
    generateQuitBtn();
    quitBtn.addEventListener("click", () => areYouSure());

    // Calling initial functions
    updateText(); // Displays game.text in the HTML Div
    setScore(0); // Adds 0 to the game.failScore and initialises it
    newGame() // runs a newGame().
});

// Setting the players username to a global variable so it is accessible in all areas of the game.
var cText = document.getElementById('comp-text');
var userString;
var username = ""; // Providing default value for testing, set to "" when testing is done

// Initialises the game
let game = {
    failScore: 0, // Once this reaches 5 or more you are rejected. Ending the game.
    mathScore: 0, // Used to advance the questions during the Maths game
    text: "", // Set to empty.
};

/**
 * Sets the innerText of "comp-text" to match game.text throughout the game.
 * Used to visually change the computer players text being displayed.
 * Added <h2> wrapper to enable animations from "Animate.css" plugin to work.
 *  */
function updateText() {
    cText.innerHTML = "<h2 class ='animate__animated animate__fadeInUp'>" + game.text + "</div>";
};

/** Adds a newScore value to the current "game.failScore" value.
 * (0) initialises the score */
function setScore(newScore) {
    game.failScore = game.failScore + newScore;
    document.getElementById("score").innerText = game.failScore; // displays this number in the HTML
    gameFailCheck(); // Runs gameFailCheck to see if value reaches 5 or more.
};

/** Updates the "game.mathScore" data by the value of newMathScore.
 * (0) initialises the score
 */
function setMathScore(newMathScore) {
    game.mathScore = game.mathScore + newMathScore;
};

/** Sleep function using Promises to set delays between code.
 * Used mainly for the purpose of displaying automated text for the computer player.
 * From an article on "sitepoint" (https://www.sitepoint.com/delay-sleep-pause-wait/)
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/** Generates a quit button that resets the game in the footer. */
function generateQuitBtn() {
    // generates the button
    quitBtn = document.createElement("button");
    quitBtn.innerHTML = `[End Protocol]`;
    quitBtn.classList.add("btn", "btn-block");
    document.getElementById("quit-btn-div").append(quitBtn);
};

/** Toggles the visibility of the "quitBtn" */
function toggleQuitBtn() {
    if (quitBtn.style.display === "none") {
        quitBtn.style.display = "block";
    } else {
        x.style.display = "none";
    }
};

/** Checks if the user is sure they want to quit.
 * Called when clicking the "quitBtn"
 * Hides "quitBtn" and displays two new buttons "yesBtn" and "noBtn" to provide a better user experience by offering confirmation.
 */
function areYouSure() {
    // Hides the quit button
    quitBtn.style.display = "none";
    // Creates No Button
    noBtn = document.createElement("button");
    noBtn.innerHTML = "[Continue the test!]";
    noBtn.classList.add("btn", "btn-block", "btn-success");
    // Creates yes Button
    yesBtn = document.createElement("button");
    yesBtn.innerHTML = "[Quit?]";
    yesBtn.classList.add("btn", "btn-block", "btn-danger");
    // remove quitBtn and adds yesBtn and noBtn
    document.getElementById("quit-btn-div").append(noBtn);
    document.getElementById("quit-btn-div").append(yesBtn);
    // unhides the generateQuitBtn and removes these two if "No"
    noBtn.addEventListener("click", () => {
        toggleQuitBtn()
        document.getElementById("quit-btn-div").removeChild(yesBtn);
        document.getElementById("quit-btn-div").removeChild(noBtn);
    });
    // Quits the game by reloading the window if "Yes"
    yesBtn.addEventListener("click", () => window.location.reload());
};

/** Ends the game if the game.failScore reaches 5 or above. */
function gameFailCheck() {
    if (game.failScore > 4) {
        // Set multiple HTML Divs to variables.
        compWindow = document.getElementById("comp-player");
        gameWindow = document.getElementById("game-window");
        gameOverWindow = document.getElementById("game-over-window");
        // Hides the above comp and game windows
        compWindow.style.display = "none"; // Hides the comp window.
        gameWindow.style.display = "none"; // Hides the game window.
        // Shows the game over window
        gameOverWindow.style.display = "block";
    }
};

////////////////////////////////////NEW GAME SECTION////////////////////////////////////

/** Resets settings and Launches a new game.
 * Make callable via a button and the first function called on Page load in final.
 */
function newGame() {
    game.text = "Welcome New Candidate to the H.U.G. Protocol."
    updateText(); // Displays the above update to the game.text in the HTML comp-window.
    setScore(0); // Initialises the score.

    // Creates the start game button
    let startBtn = document.createElement("div");
    // Sets the innerHTML of the newly created div above.
    startBtn.innerHTML = `
        <button type="button" id="startBtn" class="btn">[Begin Assessment]</button>
    `;

    // Appends it to the empty "user" div inside of the html file
    document.getElementById("user").append(startBtn);

    // Launches the following function when the button is clicked
    document.getElementById("startBtn").onclick = function () {
        // Removes nameBox from the "user" div inside of the html file
        startBtn.remove();
        enterName(); // runs enterName
    }
};

////////////////////////////////////ENTER NAME SECTION////////////////////////////////////

/** Creates a username text field for the player to interact with.
 * Saves the username on button click. 
 * Removes the button now that data is set. 
 */
function enterName() {
    game.text = "Enter your name below."
    updateText(); // Displays the update to the game.text, will be following all future game.text decelerations.

    // Creates an input box for the user to enter their username.
    let nameBox = document.createElement("div");
    // Sets the innerHTML of the above. "maxlength" limits the amount of characters the user can enter.
    nameBox.innerHTML = `
        <label>NAME HERE:</label>
        <br>
        <input type="text" id="username-btn" class="user-text" maxlength="10">
        <br>
        <br>
        <button type="button" id="nameButton" class="btn">submit</button>
    `;
    // Appends it to the empty "user" div inside of the HTML.
    document.getElementById("user").append(nameBox);

    // If the "username" field is left empty the game won't progress.
    document.getElementById("nameButton").onclick = function () {
        if (document.getElementById("username-btn").value === "") {
            game.text = "We don't accept the 'nameless' here."
            updateText();
        } else {
            // Sets the value of userText to a variable.
            userString = document.getElementById("username-btn").value;
            // Converts the above object into a string, wraps it in a span for CSS styling.
            username = "<span id='username-style'>" + JSON.stringify(userString) + "</span>";
            // Removes nameBox from the "user" div.
            nameBox.remove();
            /** Updates computer players text.
             * References the players username.
             * Uses sleep function to automatically advance the text. */
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
            // Calls the above async function.
            delayedGreeting()
        }
    }
};

////////////////////////////////////HUB AREA SECTION////////////////////////////////////

/** Automated introduction text for the HUB Area.
 * Launches runHubWorld to advance the game.
 */
function levelIntroHub() {
    /* Updates computer players text and references the players username */
    async function delayedGreeting() {
        game.text = "Initialising <em>[Human Usefulness Generator]</em>..."
        updateText();
        await sleep(3000);
        game.text = "Welcome " + username + ".";
        updateText();
        await sleep(3000);
        game.text = "We will now present you with a series of aptitude tests.";
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

// Keeps track of player items.
let state = {};

/** Text Based Adventure - "HUB AREA" of the game is launched. */
function runHubWorld() {
    state = {}; // Acts as an inventory for the player. Allowing different text nodes to be shown based on what the player has in state.
    setScore(0); // Ensures the score function is initialised in this section.
    showTextNode(1); // Displays initial text from node 1 of the Array.
};

/** Displays the correct buttons and text necessary for player navigation of this section. */
function showTextNode(textNodeIndex) {
    // Sets variable equal to the id of the "textNodes" array.
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // Sets "game.text" equal to "textNodes.text" and calls the update function.
    game.text = textNode.text;
    updateText();
    // Removes the div "option-buttons" child elements after interaction.
    while (document.getElementById("option-buttons").firstChild) {
        document.getElementById("option-buttons").removeChild(document.getElementById("option-buttons").firstChild)
    }
    // Creates the buttons needed for each question. Following the removal of the old ones.
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text // Sets buttons text to match the text nodes options text.
            button.classList.add("btn", "btn-block") // Adds CSS styles to the button.
            // onClick the button runs the "selectOption" function.
            button.addEventListener("click", () => selectOption(option))
            document.getElementById("option-buttons").appendChild(button)
        }
    })

};

/** Called by showTextNode "if loop".
 * Updates the players state if a new item is acquired. */
function selectOption(option) {
    // Finds the "nextText" specified in the Array.
    const nextTextNodeId = option.nextText

    // Checks to see if the "nextText" ID matches a function. Then calls it.
    if (nextTextNodeId === -1) {
        // Removes questions buttons.
        while (document.getElementById("option-buttons").firstChild) {
            document.getElementById("option-buttons").removeChild(document.getElementById("option-buttons").firstChild)
        }
        // Loads the Maths Levels with the "levelIntroMath" function.
        levelIntroMath();

        // Checks to see if the "nextText" ID matches a function. Then calls it.
    } else if ((nextTextNodeId === -2)) {
        // Removes questions buttons.s
        while (document.getElementById("option-buttons").firstChild) {
            document.getElementById("option-buttons").removeChild(document.getElementById("option-buttons").firstChild)
        }
        // Loads the Final Card Level with the "finalProtocol" function.
        finalProtocol();

        // Checks to see if the "nextText" ID matches. Then adds to the players failScore by 1.
    } else if ((nextTextNodeId === 5 | nextTextNodeId === 53| nextTextNodeId === 60 | nextTextNodeId === 64)) {
        setScore(1);
    };

    // Checks the state and updates it if a new "setState" is present.
    state = Object.assign(state, option.setState)
    // Shows the nextTextNode to advance the game.
    showTextNode(nextTextNodeId)
};

/** Called by showTextNode "if loop".
 * If no state is required (null), this returns true, showing options that don't require states.
 * Shows state dependent options if their state requirement is met.
 */
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
};

// This contains all of the text options that occupy the "HUB World" Section of the game.
const textNodes = [{
        id: 1,
        text: "The H.U.G. Protocol requires access to your digital conciousness to continue.",
        options: [{
            text: "Consent.",
            setState: {
                noLight: true,
                noChip: true,
                noRocks: true,
                noRope: true,
                noFleetFoot: true,
            }, // Sets starting inventory for the player.          
            nextText: 2, // Advances to main HUB area.
        }]
    },
    { // Main HUB area, allows travel to other zones.
        id: 2,
        text: "Welcome to the <em>[H.U.G.][HUB]</em> Where would you like your Digital Concious to travel?",
        options: [{
                text: "Left.",
                requiredState: (currentState) => currentState.noLight, // Requires noLight:true to display.           
                nextText: 3, // Advances Unlit Maths Game Area.
            },
            {
                text: "Left.", // Requires lightOn:true to display.
                requiredState: (currentState) => currentState.lightOn,
                nextText: 33, // Start Maths Game Area.
            },
            {
                text: "Left.",
                requiredState: (currentState) => currentState.bigBrain || currentState.blueChip, // Requires bigBrain:true or blueChip:true to display.
                nextText: 333, // Completed Maths Game Area.
            },
            {
                text: "Forward.",
                nextText: 100, // Path to Blast Door.
            },
            {
                text: "Right.", // Path to Obstacle Course.
                requiredState: (currentState) => currentState.noFleetFoot,
                nextText: 50,
            },
            {
                text: "Right.", // Completed Obstacle Course Area.
                requiredState: (currentState) => currentState.fleetFoot || currentState.redChip, // Requires fleetFoot:true or redChip:true to display.
                nextText: 71,
            },
        ]
    },
    ////////////////////////////////////HEAD LEFT SECTION////////////////////////////////////
    { // "Left" for the first time from the HUB (id: 3).
        id: 3,
        text: "This room is filled with darkness and the sound of whirring machines. How do you proceed?",
        options: [{
                text: "Feel around for a light switch.",
                nextText: 4,
            },
            {
                text: "Attempt to navigate the darkness.",
                nextText: 5,
            },
        ]
    },
    { // Activate the light switch
        id: 4,
        text: "Flicking a nearby switch illuminates the room with glowing light. You see a large, square room, packed with glowing panels, long cables and buzzing servers.",
        options: [{
            text: "Approach the central console.",
            setState: {
                lightOn: true,
                noLight: false
            }, // Sets the state to true for lightsOn and false for noLight. Changing where "left" leads in the central HUB.
            nextText: 33, // Returns to Hub
        }, ]
    },
    { // Brave the darkness (id: 5,) (+1 to failScore).
        id: 5,
        text: "You trip over the scattered wires... not your finest plan.",
        options: [{
            text: "Stumble towards the light switch",
            nextText: 4, // Find the light switch
        }, ]
    },
    { // "Left" from the HUB with lightsOn. (id: 33).
        id: 33,
        text: "You see a central machine running complex equations. A text box appears on the monitor: [Run Maths Protocol?]",
        options: [{
                text: "[Run Maths Protocol.]",
                nextText: -1, // Runs Math Game.
            },
            {
                text: "Flee from the concept of Maths.",
                nextText: 2, // Returns to Hub.
            },
        ]
    },
    { // After completing the Math Game.(id: 34).
        id: 34,
        text: "[Protocol Complete!] appears on the monitor, as a small hand shaped console springs from its side.",
        options: [{
            text: "Place hand on the console.",
            setState: {
                bigBrain: true,
                noChip: false,
                lightOn: false,
            }, // Sets bigBrain to true. Removes lightsOn property to change where left takes you from the HUB.
            nextText: 35,
        }, ]
    },
    { // Continues from above.
        id: 35,
        text: "The advanced machine creeks to life. Emitting an eerie blue light, it begins to scan your hand.",
        options: [{
            text: "Wait for process to complete.",
            nextText: 36,
        }]
    },
    { // Continues from above.
        id: 36,
        text: "You feel your head pulse for a moment. Looking down at your hand reveals a small blue chip has been inserted into the palm.",
        options: [{
            text: "Head back to [HUB].",
            nextText: 2, // Returns to Hub
        }]
    },
    { // "Left" after completing the Maths game. (id: 333).
        id: 333,
        text: "The lights from the buzzing machinery, dance along the drab, white, interior of this room. Creating ominous shadows that overwhelm its cramped interior.",
        options: [{
            text: "Head back to [HUB].",
            nextText: 2, // Returns to Hub
        }]
    },
    ////////////////////////////////////HEAD FORWARD SECTION////////////////////////////////////
    { // "Forward" from the HUB (id: 100).
        id: 100,
        text: "Under a small archway, you see a large mechanical blast door with a nearby computer panel.",
        options: [{
                text: "Examine the door.",
                requiredState: (currentState) => currentState.noChip || currentState.bigBrain && !currentState.redChip || currentState.fleetFoot && !currentState.blueChip, // Shows when either: no chip; bigBrain and no redChip; or fleetFoot and no blueChip are active.
                nextText: 101,
            },
            {
                text: "Examine the door.",
                requiredState: (currentState) => currentState.blueChip && !currentState.redChip, // Shows when blueChip is active and no redChip.
                nextText: 111,
            },
            {
                text: "Examine the door.",
                requiredState: (currentState) => currentState.redChip && !currentState.blueChip, // Shows when redChip is active and no blueChip.
                nextText: 112,
            },
            {
                text: "Examine the door.",
                requiredState: (currentState) => currentState.redChip && currentState.blueChip, // Shows when bothChips are active.
                nextText: 113,
            },
            {
                text: "Examine the panel.",
                nextText: 102,
            },
            {
                text: "Head back to [HUB].",
                nextText: 2,
            },
        ]
    },
    { // Examining the blast door (id: 101).
        id: 101,
        text: "The blast door is firmly sealed. You see two dimly lit symbols above it.",
        options: [{
            text: "Return.",
            nextText: 100,
        }, ]
    },
    { // Blast door with blue chip.
        id: 111,
        text: "A single blue symbol gleams brightly above the blast door.",
        options: [{
            text: "Return.",
            nextText: 100,
        }, ]
    },
    { // Blast door with red chip.
        id: 112,
        text: "A single red symbol glistens strongly above the blast door.",
        options: [{
            text: "Return.",
            nextText: 100,
        }, ]
    },
    { // Blast door with both chips.
        id: 113,
        text: "Both a blue and red symbol shine strongly above the blast door. With a loud scraping sound, the doorway begins to open.",
        options: [{
            text: "Proceed.",
            nextText: 200, // TAKE TO ROOM WHERE END GOAL IS REVEALED GAME ENDS.
        }, ]
    },
    { // Proceed to final area.
        id: 200,
        text: "As you step through the door, a blinding white light engulfs you.",
        options: [{
            text: "Cover eyes.",
            nextText: 201, // TAKE TO ROOM WHERE END GOAL IS REVEALED GAME ENDS.
        }, ]
    },
    { // Continues from above.
        id: 201,
        text: "Covering your eyes, you wait for your vision to adjust. Through the gaps in your fingers, shapes start to come into focus.",
        options: [{
            text: "Proceed.",
            nextText: 202,
        }, ]
    },
    { // Continues from above.
        id: 202,
        text: "The console ahead of you dims as you approach it. As if it were adjusting itself to your presence.",
        options: [{
            text: "Proceed.",
            nextText: 203,
        }, ]
    },
    { // Continues from above.
        id: 203,
        text: "On its screen you see a world map, filled with tiny moving dots.",
        options: [{
            text: "Examine the map.",
            nextText: 204,
        }, ]
    },
    { // Continues from above.
        id: 204,
        text: `Well done on making it this far, but as you can see our membership ranks are rather full at the moment.`,
        options: [{
            text: "Proceed.",
            nextText: 205,
        }, ]
    },
    { // Continues from above.
        id: 205,
        text: "You seem to have reached our central targetting array, where we track the position of each active member.",
        options: [{
            text: "Proceed.",
            nextText: 206,
        }, ]
    },
    { // Continues from above.
        id: 206,
        text: "If something were to happen to one of our <em>beloved</em> members... well, it would surely open up a position.",
        options: [{
            text: "Proceed.",
            nextText: 207,
        }, ]
    },
    { // Continues from above.
        id: 207,
        text: "Looking down you notice a number of images begin to appear. People. Families. Targets.",
        options: [{
            text: "Proceed.",
            nextText: 208,
        }, ]
    },
    { // Launches the finalProtocol.
        id: 208,
        text: "The screen seems to be willing you on to make a selection...",
        options: [{
            text: "Do what must be done.",
            nextText: -2,
        }, ]
    },
    { // Examining the monitor. (id: 103).
        id: 102,
        text: "You see a small white computer with a hand-shaped scanning device protruding from its side.",
        options: [{
                text: "Place hand on the scanner.",
                requiredState: (currentState) => currentState.noChip,
                nextText: 103,
            },
            {
                text: "Press the blue button and place hand on the scanner.",
                requiredState: (currentState) => currentState.bigBrain,
                nextText: 104,
            },
            {
                text: "Press the red button and place hand on the scanner.",
                requiredState: (currentState) => currentState.fleetFoot,
                nextText: 105,
            },
            {
                text: "Return.",
                nextText: 100,
            },
        ]
    },
    { // Hand scanner - noChip.
        id: 103,
        text: "Nothing seems to happen.",
        options: [{
            text: "Return.",
            nextText: 102, // Returns to examining the monitor.
        }, ]
    },
    { // Hand scanner - bigBrain.
        id: 104,
        text: "You feel pain wrack your hand. You notice the chip in your palm glowing a soft blue, as a light above the blast door illuminates.",
        options: [{
            text: "Back away from the machine.",
            setState: {
                bigBrain: false,
                blueChip: true,
            },
            nextText: 102,
        }, ]
    },
    { // Hand scanner - fleetFoot.
        id: 105,
        text: "You feel a mechanical burn as the laser scans your palm. The embedded chip glows a bright red, as a light above the blast door begins to glow.",
        options: [{
            text: "Back away from the machine.",
            setState: {
                fleetFoot: false,
                redChip: true,
            },
            nextText: 102,
        }, ]
    },
    ////////////////////////////////////HEAD RIGHT SECTION////////////////////////////////////
    { // "Right" from HUB.
        id: 50,
        text: "You walk gingerly through a doorway cluttered with collapsed stone and rubble. At the far end of the path, you see a metallic plinth decorated with strange red markings.",
        options: [{
                text: "Examine the surroundings.",
                nextText: 51,
            },
            {
                text: "Head back to [HUB].",
                nextText: 2,
            },
        ]
    },
    { // Continues from above.
        id: 51,
        text: "This appears to be a treacherous, obstacle ridden path. You're not sure you can return.",
        options: [{
                text: "Head down the path.",
                nextText: 52, // Proceed down path.
            },
            {
                text: "Head back to [HUB].",
                nextText: 2,
            },
        ]
    },
    { // Obstacle course begins.
        id: 52,
        text: "You see a steep path ahead of you. Dropping down into an area. How do you proceed?",
        options: [{
                text: "Walk slowly down the steep path.",
                nextText: 53,
            },
            {
                text: "Fill your pockets with nearby small stones.",
                requiredState: (currentState) => currentState.noRocks,
                nextText: 54,
            },
            {
                text: "Sprint forwards and leap for the bushes down below",
                nextText: 55,
            },
        ]
    },
    { // Obstacle course continues.
        id: 53,
        text: "As you amble slowly down the steep hill. You lose your footing and tumble onto the lower path.",
        options: [{
            text: "Ouch.",
            nextText: 56,
        }, ]
    },
    { // Obstacle course continues.
        id: 54,
        text: "You line your pockets with small sharp stones.",
        options: [{
            text: "Neat.",
            setState: {
                noRocks: false,
                rocks: true,
            },
            nextText: 52,
        }, ]
    },
    { // Obstacle course continues.
        id: 55,
        text: "You limber up and brazenly slide down the steep path ahead. You manage to land in the thick brush below and avoid further harm.",
        options: [{
            text: "Dust yourself off.",
            nextText: 56,
        }, ]
    },
    { // Obstacle course Trial 2.
        id: 56,
        text: "Surviving the steep path you look ahead. Stone plates line a central path, leading towards the plinth. There appear to be two routes you can take.",
        options: [{
                text: "Walk across the cracked plates.",
                nextText: 57,
            },
            {
                text: "Throw a stone at the cracked plates.",
                requiredState: (currentState) => currentState.rocks,
                nextText: 58,
            },
            {
                text: "Throw a stone at the undamaged plates.",
                requiredState: (currentState) => currentState.rocks,
                nextText: 59,
            },
            {
                text: "Walk across the undamaged plates.",
                nextText: 60,
            },
        ]
    },
    { // Obstacle course continues.
        id: 57,
        text: "You slowly and carefully navigate your way over the cracked plates. Time passes as you slowly travel but you emerge unscathed on the other side.",
        options: [{
            text: "Breathe a sigh of relief.",
            nextText: 61,
        }, ]
    },
    { // Obstacle course continues.
        id: 58,
        text: "The rock careens into the cracked plates. Creating small chips in the area it hits. You notice nothing of interest.",
        options: [{
            text: "Continue.",
            setState: {
                rocks: false,
            },
            nextText: 56,
        }, ]
    },
    { // Obstacle course continues.
        id: 59,
        text: "The rock soars through the air. Landing on a stone plate. The pressure of the collision causes a small shower of rocks to drop from the air above the plate. Damaging the area directly below.",
        options: [{
            text: "Continue.",
            setState: {
                rocks: false,
            },
            nextText: 56,
        }, ]
    },
    { // Obstacle course continues.
        id: 60,
        text: "As you step onto the undamaged plates. The weight of your body causes them to press down. As each pressure plate reaches the ground, rocks begin to fall from directly above. Pelting you as you hurry across the path",
        options: [{
            text: "Ouch",
            nextText: 61,
        }, ]
    },
    { // Obstacle course Trial 3.
        id: 61,
        text: "Having navigated the trapped floor, directly ahead, you see a large set of stone steps leading to a raised platform where the plinth resides.",
        options: [{
                text: "Take the steps",
                nextText: 62,
            },
            {
                text: "Search the environment for something to use.",
                requiredState: (currentState) => currentState.noRope,
                nextText: 63,
            },
            {
                text: "Lasso the rope upwards to secure a climbable path to the plinth.",
                requiredState: (currentState) => currentState.rope,
                nextText: 64,
            },
            {
                text: "Throw a rock onto the steps.",
                requiredState: (currentState) => currentState.rocks,
                nextText: 65,
            },
        ]
    },
    { // Obstacle course continues.
        id: 62,
        text: "Heading wearily up the stone steps, you reach the glowing red plinth and notice it features a hand-shaped stone panel.",
        options: [{
            text: "Place hand on plinth.",
            nextText: 66,
        }, ]
    },
    { // Obstacle course continues.
        id: 63,
        text: "Searching the nearby undergrowth you find a spool of frayed rope.",
        options: [{
            text: "Continue.",
            setState: {
                noRope: false,
                rope: true,
            },
            nextText: 61,
        }, ]
    },
    { // Obstacle course continues.
        id: 64,
        text: "You throw the rope upwards to the platform, it catches on a branch and immediately snaps. Not your finest idea.",
        options: [{
            text: "Oh.",
            setState: {
                rope: false,
            },
            nextText: 61,
        }, ]
    },
    { // Obstacle course continues.
        id: 65,
        text: "You throw the rock into the stone steps. It tumbles its way from top to bottom. You notice nothing of interest.",
        options: [{
            text: "Continue.",
            setState: {
                rocks: false,
            },
            nextText: 61,
        }, ]
    },
    { // Reaching the Red Plinth.
        id: 66,
        text: "You feel a sharp pain as the rock begins to heat up, searing your palm.",
        options: [{
            text: "Smells like bacon.",
            nextText: 67,
        }, ]
    },
    { // Continues from above.
        id: 67,
        text: "Removing your palm from the stone, you notice it now has a red chip embedded in the palm.",
        options: [{
            text: "Look for a passage back.",
            setState: {
                noFleetFoot: false,
                fleetFoot: true,
            },
            nextText: 68,
        }, ]
    },
    { // Continues from above.
        id: 68,
        text: "You hear stone begin to shift, as the stone floor begins to fall away beneath you.",
        options: [{
            text: "Fall into the hole.",
            nextText: 69,
        }, ]
    },
    { // Continues from above.
        id: 69,
        text: "As you prepare to fall, you realise your feet have already found the ground. The world seemed to rotate around you. Looking down you notice where you previously were reflected back at you.",
        options: [{
            text: "The physics of this world seem off?",
            nextText: 70,
        }, ]
    },
    { // Continues from above.
        id: 70,
        text: "The reflection begins to fade away, leaving nothing but a solid stone wall. You turn around and realise you are stood back inside the central HUB.",
        options: [{
            text: "Proceed.",
            nextText: 2,
        }, ]
    },
    { // Right after Obstacle Course Complete.
        id: 71,
        text: "You see the distant red plinth has turned to rubble.",
        options: [{
            text: "Head back to [HUB].",
            nextText: 2,
        }, ]
    },
];

////////////////////////////////////MATHS GAME SECTION////////////////////////////////////

/** Automates the introductory text for the Maths Level.
 * Launches the Maths game.
 */
function levelIntroMath() {
    async function delayedGreeting() {
        game.text = "Welcome to the <em>[Basic Equation Module]</em>."
        updateText();
        await sleep(3000);
        game.text = "Here " + username + " we will test your ability to combine basic numbers."
        updateText();
        await sleep(4000);
        game.text = "Surely even you can handle this one."
        updateText();
        runMathsGame();
    }
    delayedGreeting()
};

/** Generates 2 random numbers.
 * Adds necessary UI elements to div for the player. */
function runMathsGame() {
    // Generates a random number * 10, rounded to nearest integer. Won't return 0.
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    // Creates an input box for the user to enter their answers.
    let mathBox = document.createElement("div");
    // Sets the innerHTML of the newly created div object, uses the external Animate.css Plugin's classes.
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
    // Appends it to the "user" div inside of the HTML Body.
    document.getElementById("user").append(mathBox);
    // Adds Animate.css class
    document.getElementById("math-question").classList.add("animate__heartBeat");

    // Calls a function to set the operators of the question.
    displayQuestion(num1, num2, "+");
    // Assigns the Answer button an onClick function.
    document.getElementById("btn-math").onclick = function () {
        // Removes button's animation class
        document.getElementById("math-question").classList.remove("animate__heartBeat");
        // Removes button's click property to prevent spam/double clicking.
        document.getElementById("btn-math").onclick = "";
        // Runs the checkAnswer function.
        checkAnswer();
    }
};

/** Takes in 2 numbers and an operator string to create a Maths question. */
function displayQuestion(operand1, operand2, operator) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = operator;
    operator = "+";
};

/** Generates two random numbers and passes them into "displayQuestion".
If correct answer is given this advances the game.
If incorrect answer is given this displays another question of the correct type.
After 3 correct answers this puts the player back into the HUB. */
function nextQuestion() {
    // Generates a random number * 10, rounded to nearest integer. Won't return 0 due to (+1).
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    // Choses the operand based on the number of correct answers the player has given.
    if (game.mathScore === 1) {
        displayQuestion(num1, num2, "x");
    } else if (game.mathScore === 2) {
        displayQuestion(num1, num2, "-");
    } else if (game.mathScore === 3) {
        // Removes the "mathBox" child elements from the user div.
        while (document.getElementById("user").firstChild) {
            document.getElementById("user").removeChild(document.getElementById("user").firstChild)
        }
        showTextNode(34); // On completion of Maths game, this loads the specified level back in the HUB.
    } else {
        displayQuestion(num1, num2, "+");
    }
    ''

    // Assigns the Answer button an onClick function.
    document.getElementById("btn-math").onclick = function () {
        // Disables the onClick function after click to prevent spamming/double-clicks.
        document.getElementById("btn-math").onclick = "";
        // Removes the animation class so that it can be re-added elsewhere to trigger again.
        document.getElementById("math-question").classList.remove("animate__heartBeat");
        // Runs the checkAnswer function.
        checkAnswer();
    }
};

/** Reads the 2 random numbers and operator. 
 * Completes the equation to determine the answer.
 * Called by the checkAnswer function. */
function correctAnswer() {
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
        alert("There has been an error in the protocol. Abort mission.");
    }
};

/** Checks the "calculatedAnswer" against the players. */
function checkAnswer() {
    // Gets the users answer from the box. parseInt converts the string to a number.
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    // Runs the correctAnswer function to get the correct answer.
    let calculateAnswer = correctAnswer();
    // Compares this against the users answer.
    let isCorrect = userAnswer === calculateAnswer[0];
    // Shows correct/incorrect text based on the user's answer. Advances the game as necessary.
    if (isCorrect) {
        async function delayedCorrect() {
            // Adds to the game.mathScore to update the operands and advance the questions.
            setMathScore(1);
            game.text = "Adequate work " + username + ".";
            updateText();
            await sleep(2000);
            game.text = "Again!";
            updateText();
            document.getElementById("math-question").classList.add("animate__heartBeat"); // Triggers the Animate.css animation.
            nextQuestion(); // Loads the next question.
        };
        delayedCorrect(); // Calls the above async function.
    } else {
        // Adds +1 to the game.failScore.
        setScore(1);
        // Async function to automate text before loading the next round.
        async function delayedWrong() {
            game.text = `Hmmm... yes... the <strong>correct answer</strong> would have been a more <em>boring</em> choice.`
            updateText();
            await sleep(3000);
            game.text = "Try this next one!"
            updateText();
            document.getElementById("math-question").classList.add("animate__heartBeat"); // Triggers the Animate.css animation.
            nextQuestion(); // Loads the next question.
        };
        delayedWrong(); // Calls the above async function.
    }
};

////////////////////////////////////CARD GAME SECTION////////////////////////////////////

// Array data for generating cards.
let members = {
    firstname: ["Jim", "Pam", "Steve", "Urkel", "Johnny", "Benjamin", "Hooper", "Eleanor", "Marge", "Big", "Naruto", "Miyazaki", "Ronald", "Björn", "Golden", "Max", "Julia", "Mr.", "Mrs.", "Senior", ], // 20* fNames
    lastname: ["Stevenson", "Björnson", "Lennon", "Graham", "Davies", "The Crypt Keeper", "The Fisherman", "Nightingale", "Stalingrad", "Rigby", "John-Johnson", "Simpson", "Benjamin", "Troubadour", "The Great", "Power", "Radagast", ], // 17* lNames
    skill: ["East-End Bartender", "Computer Scientist", "Full-Time Dungeon Master", "Weekend Dog Walker", "Middle School Teacher", "Developer of Indie RPG'S", "Airsoft Enthusiast", "Owns a Katana Collection", "Drives a '67 Chevrolet Impala", "Has Been To France Twice",
        "Wearer of Vintage Hats", "Only Eats Red M&M's", "'Dynamic Brand Technician'", "Writes Avatar Fan Fiction", "Has Eaten a Glass of Water With Chopsticks"
    ], // 15* Skills
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
    ] // 24* Avatars
}

/** Generates random Cards for final act of the game.
 * Designed in this way so that this code won't need to be updated as the array is expanded upon.
 * All random numbers generated will be within the confines of the Arrays Length. */
function finalProtocol() {
    game.text = "[The Final Assessment.]"
    updateText();
    // Developing a random function for array selection. (i < 8) as I want 8 cards in total.
    for (let i = 0; i < 8; i++) {
        // Generates a random first name, by using a different random number each time the code is ran.  
        let randomFname = Math.floor(Math.random() * members.firstname.length);
        // Uses a random number to pick an item from the array. Splices it away so it can't be selected again.
        let namerFirst = members.firstname.splice(randomFname, 1);
        // Generates a random last name.
        let randomLname = Math.floor(Math.random() * members.lastname.length);
        let namerLast = members.lastname.splice(randomLname, 1);
        // Generates a random skill.
        let randomSkill = Math.floor(Math.random() * members.skill.length);
        let namerSkill = members.skill.splice(randomSkill, 1);
        // Generates a random avatar image
        let randomAv = Math.floor(Math.random() * members.avatar.length);
        let namerAv = members.avatar.splice(randomAv, 1);
        // Creates a card with the new information on it and displays it
        let membersCard = document.createElement("div");
        // Adds column sizing to the parent div to hold the cards
        membersCard.classList.add("col-sm-6", "col-md-4", "col-lg-3");
        // Sets membersCard innerHTML.
        membersCard.innerHTML = `
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
        document.getElementById("final-cards").append(membersCard);
    };

    // Set cards equal to all newly generated card class objects.   
    let cards = document.getElementsByClassName("card");
    // Destroy the card onClick. Then advances the game.   
    for (let card of cards) {
        card.addEventListener("click", function destroy() {
            // Copy the selected card into a new object to display it.
            let sacrifice = card;
            // Add a class to trigger the black and white animation. 
            sacrifice.classList.add("destroy", "build");
            document.getElementById("sacrifice-card").append(sacrifice);
            // Removes other cards from the div.
            document.getElementById("final-cards").remove(card);
            // Removes the current event listener from the selected card, stopping onClick functions being triggered again.
            card.removeEventListener("click", destroy);
            // Create and set volume of audio.
            let destroySoundF = new Audio("assets/sounds/destroyF.mp3");
            let destroySoundM = new Audio("assets/sounds/destroyM.mp3");
            destroySoundM.volume = 0.1;
            destroySoundF.volume = 0.1;
            // Select one of the above sounds to play at random.
            let x = Math.round(Math.random()); // Will either round down to (0) or up to (1).
            if (x === 1) {
                destroySoundF.play();
            } else {
                destroySoundM.play();
            };
            // load end message
            async function delayedOutro() {
                game.text = "You actually did it...";
                updateText();
                await sleep(3000);
                game.text = `${username}... you're a monster.`;
                updateText();
                await sleep(3000);
                game.text = `Just kidding ${username}. Excellent work!`;
                updateText();
                await sleep(3000);
                // Loads the game ending.
                document.getElementById("sacrifice-card").removeChild(sacrifice);
                runEnding();
            };
            delayedOutro();
        });
    }
};

/** Runs the games ending, providing a restart button for the user. */
function runEnding() {
    // Generates a random avatar image from the remaining array.
    let randomAv = Math.floor(Math.random() * members.avatar.length);
    let namerAv = members.avatar.splice(randomAv, 1);
    // Creates the users victory card. Displays there name and score.
    userCard = document.createElement("div");
    userCard.classList.add("build");
    userCard.innerHTML = `
        <div class="card text-center h-100">
            <img class="card-img-top" src=${namerAv} alt="Card image">
            <div class="card-body h-100">
                <h3 class="card-title">${username}</h3>
                <p class="card-text">Newest member of the H.U.G. Protocol</p>
                <p class="card-text"><strong>Failures: ${game.failScore}</strong></p>
            </div>
            <div class="card-footer bg-transparent border-danger">
                <a class="stretched-link h-100">Digital Conscious Uploaded</a>
            </div>
        </div>
        `;
    document.getElementById("sacrifice-card").append(userCard);
    // Plays final message and creates a replay button        
    async function delayedEnd() {
        game.text = `Congratulations! ${username} You have successfully passed the H.U.G. Protocol!`;
        updateText();
        await sleep(3000);
        game.text = "We have stored the Digital ID of your Conscious within our servers.";
        updateText();
        await sleep(3000);
        game.text = "Thank you for your time.";
        updateText();
        await sleep(3000);
        game.text = "Feel free to screenshot your custom ID below.";
        updateText();
        await sleep(3000);
        game.text = "You are now authorised to recruit further members.";
        updateText();
        // Creates the replay button
        replayBtn = document.createElement("button");
        replayBtn.innerHTML = `<em>[Begin Protocol]<em>`;
        replayBtn.classList.add("btn", "btn-block");
        document.getElementById("user").append(replayBtn);
        // Replay button launches a new game.
        replayBtn.addEventListener("click", () => window.location.reload());
    }
    delayedEnd();
};
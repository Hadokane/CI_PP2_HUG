/**
 * @jest-environment jsdom
 */

/* Access functions to test from scripts.js */
const { game } = require("../scripts");

/* Creates the document for testing purposes */
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

/* Game object test */
describe("Game Object contains correct keys", () => {
    /* Check score key exists */
    test("failScore key exists", () => {
        expect("failScore" in game).toBe(true);
    });
    /* Check currentGame key exists */
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
});
/**
 * @jest-environment jsdom
 */

/* Access objects and functions from scripts.js */
const { game, newGame, } = require("../scripts");

/* Creates the document for testing purposes */
jest.spyOn(window, "alert").mockImplementation(() => { });

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

/* Game object test */
describe("Game Object contains the correct keys", () => {
    /* Check score key exists */
    test("failScore key exists", () => {
        expect("failScore" in game).toBe(true);
    });
    /* Check currentGame key exists */
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });

});

/* Function test */
describe("Game Object contains the correct keys", () => {
    /* Check innerHTML is changable */
    test('change innerHtml of an element', () =>{
        document.body.innerHTML =
            '<div>' +
                '  <div id="comp-text">Hello</div>' +
            '</div>';
        var text = document.getElementById("comp-text");
        var newText = "new text";
        text.innerText = newText;
        expect(text.innerText).toEqual(newText);
        });
});

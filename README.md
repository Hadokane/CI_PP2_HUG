# The H.U.G. Protocol

## The digital home of the subversive Text Adventure Game.

![UI](assets/images/docs/ui/banner.png)

**Developer Links:**

*(Right-click to open in a new tab/window)*

[Developer - HK_Dev](https://github.com/Hadokane "Hadokane - Github")

[Commit Log](https://github.com/Hadokane/CI_PP2_HUG/commits/main)

**Live Website Link:**

[Live Website](https://hadokane.github.io/CI_PP2_HUG/ "H.U.G. Protocol")

**Repository Pages:**

[Repository page - index.html](https://github.com/Hadokane/CI_PP2_HUG/blob/main/index.html#L3)

[Repository page - style.css](https://github.com/Hadokane/CI_PP2_HUG/blob/main/assets/css/style.css)

[Repository page - scripts.js](https://github.com/Hadokane/CI_PP2_HUG/blob/main/assets/js/scripts.js)

---
## Academic Project Aims
---

I am currently pursuing my **Diploma in Web App Development** from [Code Institute](https://codeinstitute.net/ "code Institute").

The academic aim of this project is to demonstrate my newly developed skills within Javascript by building an interactive front-end site.
It will be responsive to users actions, allowing them to engage with the presented data, elements and imagery to progress through an engaging "text-adventure" game.

The user will be able to interact with the games many elements in order to reach the satisfying conclusion of passing the "H.U.G. Protocol."

As the site owner I will achieve my goal of providing an engaging and fast to digest "Text-Adventure" game for multiple users to enjoy.

I intend to display the above throughout the project via my: coding, comments, commits, and the explanation provided by this README file.

Additional functionality has been provided by the framework [Bootstrap 4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/) & [jQuery 3.6.1](https://jquery.com/download/).

Great care has been taken, to ensure that the website is designed to meet best practice standards, and is responsive on all screen resolutions.

It has been tested on a variety of devices and screen resolutions: from mobiles; to tablets; and 4k-monitors. It also has proven compatibility with all popular web browsers.

---
## Table of Contents
---

1. [Validation Tests](#validation)
    - [HTML Validation](#html-validation)
    - [CSS Validation](#css-validation)
    - [Javascript Validation](#javascript-validation)
1. [Testing](#testing)
    - [Screen Reader Accessibility](#screen-reader-accessibility)
    - [Performance Testing](#performance-testing)
    - [Device Testing](#device-testing)
1. [Bugs](#bugs)
1. [Deployment](#deployment)
    - [Forking](#forking)
1. [Credits](#credits)
    - [Languages Used](#languages-used)
    - [Frameworks Used](#frameworks-used)
    - [Validators Used](#validators-used)
    - [Technologies Used](#technologies-used)
    - [Acknowledgements](#acknowledgements)

## Validation
---

With all user stories being satisfactorily met, the website being published and user-testing fixes implemented, I then ran the site through several online Validators to confirm it meets best practices and runs as efficiently as possible.

### HTML Validation
---

I began my validation by running the HTML page through "[W3C's Validation Service](https://validator.w3.org/)."

**Initial validation**

<details><summary>HTML Test</summary>
<img src="assets/images/docs/validation/w3_html_1.png" alt="Index Validation">
</details>

The errors found can be summarised as follows:
- Unnecessary /> closing tags on a few HTML Head links.
- An unnecessary type attribute had been included where i'd linked to my Javascript at the end of the HTML's body.

**Validation Passes**

I fixed the above issues and ran the pages back through W3C's validation services. 

<details><summary>HTML Pass</summary>
<img src="assets/images/docs/validation/w3_html_2.png" alt="Index Validation Pass">
</details>

### CSS Validation
---

Next I carried out validation on the project's CSS file by running the page through "[W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)."

<details><summary>CSS Pass</summary>
<img src="assets/images/docs/validation/w3_css_pass.png" alt="CSS Validation Pass"></details>

The results came back successfully, allowing me to continue automated testing and validation.

### Javascript Validation
---

Finally it was time to run the largest, most integral file of this project - scripts.js - through "[JSLint](https://www.jslint.com/)."

**Initial validation**

<details><summary>Javascript Test (A)</summary>
<img src="assets/images/docs/validation/jslint_1.png" alt="Javascript Validation 1">
</details>

<details><summary>Javascript Test (B)</summary>
<img src="assets/images/docs/validation/jslint_2.png" alt="Javascript Validation 2">
</details>

I was initially horrified to see there were "138" warnings present. I poured a strong coffee and prepared for a long night... until i realised that I had mistakenly not clicked a few necessary options in JSLint.

Thankfully it turned out that the bulk of these warning (legitimately around ~133) were to do entirely with the following things:
- Unnecessary whitespace after comments.
- Comments running over 80 characters.

Ticking the options for "long" and "white" in the linters options, immediately cleared the bulk of these. Although I still did remove all unnecessary whitespace manually before moving onto the more realistic improvements offered, such as:
- Moving global variables to the top of the document.
- Changing a few "let" globals into "var" globals.

**Validation Passes**

After these quick changes, I re-ran the code and received the following result.

<details><summary>Javascript Pass</summary>
<img src="assets/images/docs/validation/jslint_3.png" alt="Javascript Validation 1">
</details>

I opted to leave in the ";" at the end of my functions as an added precaution. My additional reading on the subject suggested that most developers are perfectly content to have them included in a project and they will in no way negatively impact the results of the site.

[Back to top ↑](#the-hug-protocol)

---
## Testing
---

### Wave Contrast & Accessibility
---

Next I ran the site through [WAVE's Accessibility Evaluator](https://wave.webaim.org/) to test for any issues with contrast or accessibility.

**Initial Test**

<details><summary>Wave Test</summary>
<img src="assets/images/docs/validation/wave_pass.png" alt="Wave Pass"></details>

<details><summary>Wave Contrast Test</summary>
<img src="assets/images/docs/validation/wave_contrast.png" alt="Wave Contrast"></details>

Wave returned favourable results in reference to my chosen colour palette. Ensuring all the text being displayed to the user will be visible and positively impact their experience while playing the game.

The only suggested improvement was to include a `<h1>` and `<h3>` tags as the page technically skips these on the initial screen.

As the game loads in and out text constantly and doesn't I didn't feel it was apt to set this as a `<h1>` tag as their is no "Title" present on the page at any point during a game session.

The `<h3>` tags also populate the game later on and are featured within the generated cards, meaning that at point in the game there are no structural issues. This seems worth noting and in future improvements I may consider adding in an introductory screen that can include these elements permanently. 

### Performance Testing
---

Google Lighthouse - a feature of Chrome Developer Tools - allows me to test the overall performance of the page on both mobile and desktop devices.

- It reminded me to add `<meta>` descriptions to my index head.

Featured below are the screenshots confirming my results:

**Desktop**

<details><summary>Lighthouse Results</summary>
<img src="assets/images/docs/validation/lighthouse_desktop.png" alt="Lighthouse Index Results"></details>

---

**Mobile**

<details><summary>Lighthouse Index Mobile Results</summary>
<img src="assets/images/docs/validation/lighthouse_mobile.png" alt="Lighthouse Index Mobile Results"></details>

---

### Device Testing

The website was tested and functioned as expected on the following devices:

- Novatech LTD. AMD Ryzen 7 3800x, 32GB Desktop
- Lenovo IdeaPad 5 Pro
- Samsung Galaxy S20 & S21
- Samsung Galaxy Tab S7
- MacBook Air with M1 chip
- iPhone 11, 13 & 14
- iPad Air
- Samsung Chrome Book

The website has been tested on up-to-date versions of the following browsers:

- Microsoft Edge
- Google Chrome
- Chrome for android
- Mozilla Firefox
- Opera
- Safari
- Internet Explorer

The website has also been tested on monitors of 16:9, 16:10 and 21:9 resolutions.

[Back to top ↑](#The-H.U.G.-Protocol)

---
## Deployment
---

The website was deployed on GitHub via the following steps:

1. Login into GitHub and navigate to this repository - [CI_PP2_H.U.G.](https://github.com/Hadokane/CI_PP2_HUG)
    <details><summary>Deployment 1</summary><img src="assets/images/docs/deployment/dp1.png" alt="Deployment part 1"></details>
2. Head to the "Settings" tab on the navigation menu and select it.
3. On the left sidebar select "Pages".
    <details><summary>Deployment 2</summary><img src="assets/images/docs/deployment/dp2.png" alt="Deployment part 2"></details>
4. Under "Build and deployment" you will see a heading names "Source". Click on the dropdown menu and select: "Branch: main" leaving the file as "/(root)"
5. Click the save button.
    <details><summary>Deployment 3</summary><img src="assets/images/docs/deployment/dp3.png" alt="Deployment part 3"></details>
6. A URL will appear in your newly deployed repository.
7. GitHub will process your request and the bar's colour will change from blue to green on a page refresh, indicating that the page has been deployed.
8. The website is now live and deployed at the following URL: https://hadokane.github.io/CI_PP2_HUG/

![CI_PP2_H.U.G.](assets/images/docs/deployment/dp4.png)

**Forking**
1. Login into GitHub and navigate to this repository - [CI_PP2_H.U.G.](https://github.com/Hadokane/CI_PP2_HUG)
2. Select the "Fork" tab on the right-hand side of the navigation menu.
3. Choose a destination to save your newly forked repository.

![CI_PP2_H.U.G.](assets/images/docs/deployment/f1.png)

[Back to top ↑](#The-H.U.G.-Protocol)

---
## Credits 
---

### Languages Used

- HTML 5
- CSS 3
- Javascript ES2022

### Frameworks Used 

- [Bootstrap 4](https://getbootstrap.com/docs/4.6/getting-started/introduction/) - For their responsive grid and container system.
- [jQuery](https://jquery.com/download/) - For their convenient JavaScript library features.
- [Animate.css](https://animate.style/) - For their simple to use CSS animations.

### Validators Used 

- [W3C HTML Validator](https://validator.w3.org/) - Validation of HTML.
- [W3C JigSaw Validator](https://jigsaw.w3.org/css-validator/) - Validation of CSS.
- [JSLint Validator](https://www.jslint.com/) - Validation of Javascript.
- [Webaim](https://wave.webaim.org/) - Accessibility Testing.
- [Lighthouse & Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Performance testing.

### Technologies Used

1. [CI TEMPLATE](https://github.com/Code-Institute-Org/gitpod-full-template) - This repository was initially created using Code Institute's provided template.

2. [Markdown Guide](https://www.markdownguide.org/cheat-sheet/) - For their "Markdown Cheat Sheet" and assistive documents on writing a README.md file.

3. [Grammarly](https://app.grammarly.com/) - For spell-checking my Text Based Adventure Module during brainstorming.

4. [Am I Responsive](https://ui.dev/amiresponsive) - For providing the mock-up image featured at the top of this document.

5. [Google Fonts](https://fonts.google.com/) - For access to their wealth of commercially-available fonts.

6. [Favicon.io](https://favicon.io/) - For providing an emoji based favicon for use in this game.

7. [Balsamiq](https://balsamiq.com/) - For providing software to create the wireframes seen in this README.

8. [GitHub](https://github.com/) - For serving as my IDE of choice and allowing me to create and deploy my repository for user testing and submission purposes.

9. [StackOverflow Question](https://stackoverflow.com/questions/11813806/javascript-get-a-functions-variables-value-within-another-function) - For advice on making functions global. Used when deciding if username variables should be made global for later content to access the value.

10. [FreeCodeCamp Article](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/) - For a convenient primer on the differences between "Var" "Let" and "Const". Used when checking over my variables to ensure correct choices had been made.

11. [Sitepoint Article](https://www.sitepoint.com/delay-sleep-pause-wait/) - Explained the premise of a "sleep" function and the use of promises to stagger my code for the automated computer player box I implemented throughout the project. This allowed for the integration of a more user friendly experience by reducing the number of button presses required to progress for the user. Creating the illusion of a sentient AI presence.

12. [Youtube: developedbyed](https://www.youtube.com/watch?v=GUEB9FogoP8) - Great tutorial on text animations. Didn't end up implementing as used Animate.css instead but serves as good reference for potential future updates.

13. [CodeBoxx Article](https://code-boxx.com/allow-one-click-javascript/) - For reference when deciding to disable the "maths-box" submit button onClick to prevent multiple answer submissions. Could cause the score to bug out or the player to accidentally fail the game.

14. [MDN Webdocks](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) - Provided general Javascript advice and reminders on functionality. Namely pertaining to event listeners and DOM targetting/navigation.

15. [Personas](https://personas.draftbit.com/) - Avatar generator used to provide images for the cards generated by the "members" array.

16. [Animate.css](https://animate.style/) - Animation plug-in used for text update animation.

17. [w3Schools](https://www.w3schools.com/) - Use for general HTML, CSS & Javascript research and referencing.

18. [CodePen Article](https://codepen.io/gunnarbittersmann/pen/XpqmgJ?editors=0100) - Provided a reference example of an image fading to grey. Used as reference when creating my own "Fade Out" Animation for the "sacrifice" Card.

19. [Valve: Left4Dead](https://www.youtube.com/watch?v=O8IJepb-hlQ) - Death sounds sampled to make the "destroy" card audio heard at the end of this game.

20. [DEV](https://dev.to/javascript_jeep/how-to-empty-the-dom-element-in-javascript-nf8)- Used to understand the best method to empty a div in Javascript.

21. [Lospec: AYY4 PALETTE](https://lospec.com/palette-list/ayy4) - Color palette I used for this project.

22. [SpeckyBoy](https://speckyboy.com/css-javascript-animated-backgrounds) - Animated background in project taken directly from here.

---
## Acknowledgements
---

With thanks to:
- My family and friends - For providing some great feedback and user-testing across multiple devices and browsers.

- Code Institute & its slack community - For providing me with the necessary skills, knowledge and guidance to execute this project.

[Back to top ↑](#The-H.U.G.-Protocol)

---
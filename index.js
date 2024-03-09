const pattern = [];
const actual = [];
let gameStart = false;
const levelTitle = $("#level-title");
const coloredDivs = $("div[type]");

/**
 * Handles the keydown event to start the game when any key is pressed.
 */
$(document).keydown(function () {
  if (!gameStart) {
    gameStart = true;
    generatePattern();
  }
});

/**
 * Handles the click event on colored divs, triggering press effects, pattern validation,
 * and audio playback.
 */
coloredDivs.click(function () {
  const clickedColor = $(this).attr("id");
  pressEffect(clickedColor);
  validatePattern(clickedColor);
  if (gameStart) {
    playAudio(clickedColor);
  }
});

/**
 * Generates a random color, triggers press effects, plays corresponding audio,
 * and updates the game pattern.
 */
function generatePattern() {
  const color = randomColor();
  pressEffect(color);
  playAudio(color);
  pattern.push(color);
  levelTitle.text(`Level ${pattern.length}`);
}

/**
 * Validates the user's input against the generated pattern, triggers audio feedback,
 * and advances to the next level if the input is correct.
 * @param {string} color - The color clicked by the user.
 */
function validatePattern(color) {
  actual.push(color);

  for (let i = 0; i < actual.length; i++) {
    if (actual[i] !== pattern[i]) {
      playAudio("wrong");
      gameStart = false;
      pattern.length = 0;
      actual.length = 0;
      levelTitle.text("Game Over, Press Any Key to Restart");
      break;
    } else if (actual.length === pattern.length) {
      setTimeout(generatePattern, 1000);
      actual.length = 0;
    }
  }
}

/**
 * Generates a random color for the game sequence.
 * @returns {string} - A randomly chosen color ("green", "yellow", "blue", or "red").
 */
function randomColor() {
  switch (Math.floor(Math.random() * 4) + 1) {
    case 1:
      return "green";
    case 2:
      return "yellow";
    case 3:
      return "blue";
    case 4:
      return "red";
  }
}

/**
 * Plays the audio corresponding to the provided file name.
 * @param {string} audioFile - The name of the audio file to be played.
 */
function playAudio(audioFile) {
  new Audio(`./sounds/${audioFile}.mp3`).play();
}

/**
 * Applies a press effect to the specified colored element.
 * @param {string} color - The color of the element to receive the press effect.
 */
function pressEffect(color) {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => $(`#${color}`).removeClass("pressed"), 100);
}

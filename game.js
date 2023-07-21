////////////////////////////////////////////////////////////////////////////
////////////////////////////// VARIABLES ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////

var buttonColour = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isStart = false;
var check = 0;

////////////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTIONS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function checkAnswer() {
  if (check < level) {
    if (gamePattern[check] == userClickedPattern[check]) {
      check++;
      if (check == level) {
        check = 0;
        userClickedPattern.length = 0;
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      gameOverAnimation();
      $("#level-title").text("Game Over, Press Any Key To Restart");
      // userClickedPattern.length = 0;
      userClickedPattern = [];
      // gamePattern.length = 0;
      gamePattern = [];
      level = 0;
      check = 0;
      isStart = false;
    }
  }
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);
  btnAnimation(randomChosenColour);
}

function gameOverAnimation() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
}

function btnAnimation(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
  $("#" + key).addClass("pressed");
  setTimeout(function () {
    $("#" + key).removeClass("pressed");
  }, 100);
}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  btnAnimation(userChosenColour);
  checkAnswer();
});

$(document).keypress(function () {
  if (!isStart) {
    isStart = true;
    $("#level-title").text("Level " + level);
    setTimeout(function () {
      nextSequence();
    }, 200);
  }
});

/* all variable required */

var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var count = 0;

/* keydown and click listener */

$(document).keydown(function () {

    count++;
    nextSequence();

});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    playsound(userChosenColour);
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

/* next level / seq */

function nextSequence() {

    if (count === 1) {

        var randomNumber = Math.round((Math.random() * 3));
        var randomChosenColour = buttonColours[randomNumber];

        playsound(randomChosenColour);
        $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

        gamePattern.push(randomChosenColour);

        userClickedPattern = [];
        level++;
        $("#level-title").text("level " + level);

    }
}

/* to check answer that user clicked */

function checkAnswer(currentIndex) {

    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(() => {
                nextSequence(1);
            }, 1000);
        }

    }

    else {

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        
        playsound("wrong");
        
        /* to restart game  */
        count = 0;
        level = 0;
        gamePattern = [];

    }

}

/* animation and sound play */

function playsound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}
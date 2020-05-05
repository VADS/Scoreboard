/* Globals */
var finishTime;

/* Onload */
resetTime();
myTimer();
var myVar = setInterval(myTimer, 100); //Start timer
/* Onload End */


/* Keypress handler */
$(document).keypress(function (e) {
    if (e.key == "e") {
        resetTime();
    }
});

/* Utility functions */
function myTimer() {
    currentTime = new Date();
    var timeDifference = startTime - currentTime;
    $("#round-timer").text(msToTime(timeDifference));
}

function changePoints(pointsAmount, team) {
    switch (team) {
        case 1:
            break;
        case 2:
            break;
        default:
            error("Invalid team number. Must be 1 or 2");
            break;
    }

}

function resetTime() {
    startTime = new Date(Date.now() + (1000 * 60 * 15));
    console.log(startTime);
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds + "." + milliseconds;
}

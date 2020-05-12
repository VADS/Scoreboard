/* Globals */
var finishTime;

/* Uhr Starten*/
$(document).keypress(function (w) {
    if (w.key == "w") {
        setInterval(myTimer, 100)();
    }
});

/* Keypress handler 15 Min*/
$(document).keypress(function (e) {
    if (e.key == "e") {
        resetTime1();
    }
});

/* Keypress handler 5 Min*/
$(document).keypress(function (r) {
    if (r.key == "r") {
        resetTime2();
    }
});

/* Keypress handler 10 Min*/
$(document).keypress(function (t) {
    if (t.key == "t") {
        resetTime3();
    }
});
            
if (myTimer < 0) ();

/* Utility functions */
function myTimer() {
    currentTime = new Date();
    var timeDifference = startTime - currentTime;
    $("#round-timer").text(msToTime(timeDifference));
}

/* Uhr Stop*/
$(document).keypress(function (q) {
    if (q.key == "q") {
        clearInterval(myTimer);
    }
});

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

function resetTime1() {
    startTime = new Date(Date.now() + (1000 * 60 * 15));
    console.log(startTime);
}

function resetTime2() {
    startTime = new Date(Date.now() + (1 * 60 * 15));
    console.log(startTime);
}

function resetTime3() {
    startTime = new Date(Date.now() + (667 * 60 * 15));
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

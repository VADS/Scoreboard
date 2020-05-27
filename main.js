/* Globals */
var finishTime;

var punkteLinks = 0;
var punkteRechts = 0;

$(document).keypress(function (event) {
    /* Uhr Starten*/
    if (event.key == "w") {
        setInterval(myTimer, 100)();
    }
    /* Keypress handler 15 Min*/
    if (event.key == "e") {
        resetTime1();
    }
    /* Keypress handler 5 Min*/
    if (event.key == "r") {
        resetTime2();
    }
    /* Keypress handler 10 Min*/
    if (event.key == "t") {
        resetTime3();
    }

    /* Uhr Stop */
    if (event.key == "q") {
        clearInterval(myTimer);
    }

    //LINKES TEAM
    /* Keypress handler Punkte links erhöhen */
    if (event.key == "i") {
        changePoints(1, "links")
    }
    /* Keypress handler Punkte links erniedrigen */
    if (event.key == "k") {
        changePoints(-1, "links")
    }

    //RECHTES TEAM
    /* Keypress handler Punkte links erhöhen */
    if (event.key == "o") {
        changePoints(1, "rechts")
    }
    /* Keypress handler Punkte links erniedrigen */
    if (event.key == "l") {
        changePoints(-1, "rechts")
    }
});


/* Utility functions */
function myTimer() {
    currentTime = new Date();
    var timeDifference = startTime - currentTime;
    $("#round-timer").text(msToTime(timeDifference));
}


function resetTime1() {
    startTime = new Date(Date.now() + (1000.11 * 60 * 15));
    console.log(startTime);
}

function resetTime2() {
    startTime = new Date(Date.now() + (666.75 * 60 * 15));
    console.log(startTime);
}

function resetTime3() {
    startTime = new Date(Date.now() + (333.375 * 60 * 15));
    console.log(startTime);
}

function changePoints(pointsAmount, team) {
    switch (team) {
        case "links":
            punkteLinks += pointsAmount;
            if (punkteLinks < 0) {
                punkteLinks = 0;
            }
            $(".points.points__left").text(punkteLinks);
            break;
        case "rechts":
            punkteRechts += pointsAmount;
            if (punkteRechts < 0) {
                punkteRechts = 0;
            }
            $(".points.points__right").text(punkteRechts);
            break;
        default:
            error("Invalid team number. Must be links or rechts");
            break;
    }

}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds + "." + milliseconds;
}

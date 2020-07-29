let now = moment().format('LLLL');
console.log(now);
var punkteLinks = 0;
var punkteRechts = 0;
let startTime;
let timerInterval;
e;
console.log();
document.addEventListener("keydown", function (event) {
    /* Uhr Starten*/
    if (event.key == "w") {
        timerInterval = setInterval(() => myTimer(), 100);
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
        clearInterval(timerInterval);
    }
    //LINKES TEAM
    /* Keypress handler Punkte links erhöhen */
    if (event.key == "i") {
        changePoints(1, "links");
    }
    /* Keypress handler Punkte links erniedrigen */
    if (event.key == "k") {
        changePoints(-1, "links");
    }
    //RECHTES TEAM
    /* Keypress handler Punkte links erhöhen */
    if (event.key == "o") {
        changePoints(1, "rechts");
    }
    /* Keypress handler Punkte links erniedrigen */
    if (event.key == "l") {
        changePoints(-1, "rechts");
    }
});
/* Utility functions */
function myTimer() {
    let currentTime = new Date();
    let timeDifference = startTime.valueOf() - currentTime.valueOf(); //TODO: Feels like a hack, change later?
    document.querySelector("#round-timer").innerHTML = msToTimeString(timeDifference);
}
function resetTime1() {
    startTime = new Date(Date.now() + 1000.11 * 60 * 15);
    console.log(startTime);
}
function resetTime2() {
    startTime = new Date(Date.now() + 666.75 * 60 * 15);
    console.log(startTime);
}
function resetTime3() {
    startTime = new Date(Date.now() + 333.375 * 60 * 15);
    console.log(startTime);
}
function changePoints(pointsAmount, team) {
    switch (team) {
        case "links":
            punkteLinks += pointsAmount;
            if (punkteLinks < 0) {
                punkteLinks = 0;
            }
            document.querySelector(".points.points__left").innerHTML = punkteLinks.toString();
            break;
        case "rechts":
            punkteRechts += pointsAmount;
            if (punkteRechts < 0) {
                punkteRechts = 0;
            }
            document.querySelector(".points.points__right").innerHTML = punkteRechts.toString();
            break;
        default:
            Error("Invalid team number. Must be links or rechts");
            break;
    }
}
function msToTimeString(duration) {
    let milliseconds = (duration % 1000) / 100;
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
    let secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
    return minutesString + ":" + secondsString + "." + milliseconds.toString();
}
//# sourceMappingURL=main.js.map
<template>
  <div id="app">
    <div class="site-wrap">
      <div class="points-wrap">
        <div class="points points__left">0</div>
        <div class="points-divider"></div>
        <div class="points points__right">0</div>
      </div>
      <div id="round-timer">Uhr mit TASTE starten.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
});

let punkteLinks = 0;
let punkteRechts = 0;

let startTime: Date;

let timerInterval: any;

function changePoints(pointsAmount: number, team: string) {
  switch (team) {
    case "links":
      punkteLinks += pointsAmount;
      if (punkteLinks < 0) {
        punkteLinks = 0;
      }
      document.querySelector(
        ".points.points__left"
      )!.innerHTML = punkteLinks.toString();
      break;
    case "rechts":
      punkteRechts += pointsAmount;
      if (punkteRechts < 0) {
        punkteRechts = 0;
      }
      document.querySelector(
        ".points.points__right"
      )!.innerHTML = punkteRechts.toString();
      break;
    default:
      Error("Invalid team number. Must be links or rechts");
      break;
  }
}
/* Utility functions */
function myTimer() {
  const currentTime: Date = new Date();
  const timeDifference: number = startTime.valueOf() - currentTime.valueOf(); //TODO: Feels like a hack, change later?
  document.querySelector("#round-timer")!.innerHTML = msToTimeString(
    timeDifference
  );
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

function msToTimeString(duration: number): string {
  const milliseconds: number = (duration % 1000) / 100;
  const seconds: number = Math.floor((duration / 1000) % 60);
  const minutes: number = Math.floor((duration / (1000 * 60)) % 60);

  const minutesString: string =
    minutes < 10 ? "0" + minutes : minutes.toString();
  const secondsString: string =
    seconds < 10 ? "0" + seconds : seconds.toString();

  return minutesString + ":" + secondsString + "." + milliseconds.toString();
}

document.addEventListener("keydown", function(event) {
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
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* Fonts */
@font-face {
  font-family: SevenSegment;
  src: url(assets/fonts/Segment7Standard.otf);
}

/* Styles */
body,
html {
  height: 100%;
  padding: 0;
  margin: 0;
}

.site-wrap {
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.points-wrap {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.points-divider {
  border-left: 6px solid black;
}

/* Points */
.points {
  font-size: 210pt;
  font-family: SevenSegment;
}

.points__left {
  color: red;
}

.points__right {
  color: green;
}

/* Timer */
#round-timer {
  font-size: 90pt;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  text-align: center;
}
</style>

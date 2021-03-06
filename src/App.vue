<template>
    <div id="app">
        <div class="site-wrap">
            <div class="points-wrap">
                <div class="points points__left">
                    {{ pointsLeft.toString().padStart(2, '0') }}
                </div>
                <div class="points-divider"></div>
                <div class="points points__right">
                    {{ pointsRight.toString().padStart(2, '0') }}
                </div>
            </div>
            <div id="round-timer">
                {{ momentTimerInstance.format('mm:ss', { trim: false }) }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

document.title = 'Scoreboard';

enum Team {
    LEFT = 1,
    RIGHT = 2
}

const keyToTimerDictionary = {
    '1': 5,
    '2': 10,
    '3': 15,
    '4': 20,
    '5': 30,
    '6': 40,
    '7': 50,
    '8': 60
};

export default defineComponent({
    name: 'App',
    data: () => ({
        pointsLeft: 0 as number,
        pointsRight: 0 as number,
        momentTimerInstance: moment.duration(15, 'minutes'),
        timerInterval: 0 as number,
        isTimerRunning: false as boolean,
        Team,
        keyToTimerDictionary,
        airhornAudioClip: new Audio(require('@/assets/airhorn.wav')),
        keyAlreadyHeldDown: false,
        canPointsBeChanged: true
    }),
    computed: {
        timerString: function(): string {
            return 'test';
        }
    },
    methods: {
        changePoints(pointsAmount: number, team: Team): void {
            switch (team) {
                case Team.LEFT:
                    this.pointsLeft += pointsAmount;
                    if (this.pointsLeft < 0) {
                        this.pointsLeft = 0;
                    }
                    break;
                case Team.RIGHT:
                    this.pointsRight += pointsAmount;
                    if (this.pointsRight < 0) {
                        this.pointsRight = 0;
                    }
                    break;
                default:
                    Error('Invalid team string. Must be left or right');
                    break;
            }
        },
        startTimer(): void {
            this.timerInterval = setInterval(() => {
                this.momentTimerInstance.subtract(moment.duration(100, 'milliseconds'));
                if (this.momentTimerInstance.asMilliseconds() <= 0) {
                    this.pauseTimer();

                    this.airhornAudioClip.play();
                }
            }, 100);
        },
        pauseTimer(): void {
            clearInterval(this.timerInterval);
        },
        toggleTimer(): void {
            if (this.isTimerRunning) {
                this.pauseTimer();
            } else if (this.momentTimerInstance.asMilliseconds() > 0) {
                this.startTimer();
            }
            this.isTimerRunning = !this.isTimerRunning;
        }
    },
    mounted() {
        momentDurationFormatSetup(moment);
        document.addEventListener('keydown', event => {
            if (!this.canPointsBeChanged && (event.key == 'q' || event.key == 'e')) {
                return;
            }
            if (this.keyAlreadyHeldDown) {
                return;
            }
            this.keyAlreadyHeldDown = true;

            // Delay for double clicking buttons
            this.canPointsBeChanged = false;
            setTimeout(() => {
                this.canPointsBeChanged = true;
            }, 1000);

            /* Uhr Stop */
            if (event.key == ' ') {
                this.toggleTimer();
            }

            //LINKES TEAM
            /* Keypress handler Punkte left erhöhen */
            if (event.key == 'q') {
                this.changePoints(1, Team.LEFT);
            }
            /* Keypress handler Punkte left erniedrigen */
            if (event.key == 'a') {
                this.changePoints(-1, Team.LEFT);
            }

            //RECHTES TEAM
            /* Keypress handler Punkte left erhöhen */
            if (event.key == 'e') {
                this.changePoints(1, Team.RIGHT);
            }
            /* Keypress handler Punkte left erniedrigen */
            if (event.key == 'd') {
                this.changePoints(-1, Team.RIGHT);
            }

            if (Object.keys(this.keyToTimerDictionary).includes(event.key)) {
                this.momentTimerInstance = moment.duration(this.keyToTimerDictionary[event.key], 'minutes');
            }
        });
        document.addEventListener('keyup', () => {
            this.keyAlreadyHeldDown = false;
        });
    }
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    padding: 0;
    margin: 0;
}

/* Fonts */
@font-face {
    font-family: SevenSegment;
    src: url(assets/fonts/Segment7Standard.otf);
}

body,
html {
    height: 100%;
    margin: 0;
    padding: 0;
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
    border-left: 10px solid black;
}

/* Points */
.points {
    font-size: 50vh;
    font-family: SevenSegment;
    width: 50%;
    text-align: center;
}

.points__left {
    color: red;
}

.points__right {
    color: black;
}

/* Timer */
#round-timer {
    font-size: 23vh;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-align: center;
}
</style>

<template>
    <div id="app">
        <div class="site-wrap">
            <div class="points-wrap">
                <div class="points points__left">{{ pointsLeft }}</div>
                <div class="points-divider"></div>
                <div class="points points__right">{{ pointsRight }}</div>
            </div>
            <div id="round-timer">
                {{ testDuration.asMilliseconds() / 1000 }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import moment from 'moment';

enum Team {
    LEFT = 1,
    RIGHT = 2
}

export default defineComponent({
    name: 'App',
    data: () => ({
        pointsLeft: 0 as number,
        pointsRight: 0 as number,
        testDuration: moment.duration(5, 'seconds'),
        timerInterval: 0 as number,
        isTimerRunning: false as boolean
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
                this.testDuration.subtract(
                    moment.duration(100, 'milliseconds')
                );
                if (this.testDuration.asMilliseconds() <= 0) {
                    this.pauseTimer();
                }
            }, 100);
        },
        pauseTimer(): void {
            clearInterval(this.timerInterval);
        },
        toggleTimer(): void {
            if (this.isTimerRunning) {
                this.pauseTimer();
            } else {
                this.startTimer();
            }
            this.isTimerRunning = !this.isTimerRunning;
        }
    },
    mounted() {
        document.addEventListener('keydown', event => {
            /* Uhr Stop */
            if (event.key == ' ') {
                this.toggleTimer();
            }

            //LINKES TEAM
            /* Keypress handler Punkte left erhöhen */
            if (event.key == 'i') {
                this.changePoints(1, Team.LEFT);
            }
            /* Keypress handler Punkte left erniedrigen */
            if (event.key == 'k') {
                this.changePoints(-1, Team.LEFT);
            }

            //RECHTES TEAM
            /* Keypress handler Punkte left erhöhen */
            if (event.key == 'o') {
                this.changePoints(1, Team.RIGHT);
            }
            /* Keypress handler Punkte left erniedrigen */
            if (event.key == 'l') {
                this.changePoints(-1, Team.RIGHT);
            }
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
    font-size: 110pt;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
        'Lucida Sans', Arial, sans-serif;
    text-align: center;
}
</style>

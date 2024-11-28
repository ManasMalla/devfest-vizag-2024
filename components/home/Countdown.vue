<template>
    <ClientOnly>
        <div :class="$style.countdownContainer" ref="countdownContainer">
            <div :class="$style.countdown" aria-hidden="true" role="presentation">
                <div :class="$style.unitWrapper">
                    <div :class="[$style.digit, 'js-digit']" data-unit="days" data-max-number="nine"></div>
                    <div :class="[$style.digit, 'js-digit']" data-unit="days" data-max-number="nine"></div>
                    <span :class="$style.unitLabel">D</span>
                </div>
                <div :class="$style.unitWrapper">
                    <div :class="[$style.digit, 'js-digit']" data-unit="hours" data-max-number="two"></div>
                    <div :class="[$style.digit, 'js-digit']" data-unit="hours" data-max-number="nine"></div>
                    <span :class="$style.unitLabel">H</span>
                </div>
                <div :class="$style.unitWrapper">
                    <div :class="[$style.digit, 'js-digit']" data-unit="minutes" data-max-number="five"></div>
                    <div :class="[$style.digit, 'js-digit']" data-unit="minutes" data-max-number="nine"></div>
                    <span :class="$style.unitLabel">M</span>
                </div>
                <div :class="$style.unitWrapper">
                    <div :class="[$style.digit, 'js-digit']" data-unit="seconds" data-max-number="five"></div>
                    <div :class="[$style.digit, 'js-digit']" data-unit="seconds" data-max-number="nine"></div>
                    <span :class="$style.unitLabel">S</span>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script>
import { ANIMATIONS } from "@/assets/bodymovinAnimationData";
import { padStart } from "lodash";

const EVENT_DATE = new Date("June 8, 2024 09:00 GMT+5:30");
const FRAME_RANGES = {
    nine: {
        0: [285, 307],
        1: [255, 277],
        2: [225, 247],
        3: [195, 217],
        4: [165, 187],
        5: [135, 157],
        6: [105, 127],
        7: [75, 97],
        8: [45, 67],
        9: [15, 37],
    },
    five: {
        0: [165, 180],
        1: [135, 157],
        2: [105, 127],
        3: [75, 97],
        4: [45, 67],
        5: [15, 37],
    },
    two: {
        0: [75, 90],
        1: [45, 67],
        2: [15, 37],
    },
};
const COLORS = ["blue", "red", "yellow", "green"];

export default {
    name: "Countdown",
    data() {
        return {
            countdownController: null,
            isReset: false,
        };
    },
    mounted() {
        nextTick(() => {
            this.countdownController = new CountdownController(
                this.$style,
                this.$refs.countdownContainer,
                this.isReset,
                this.$refs.countdownContainer.querySelectorAll(".js-digit")
            );
            this.countdownController.reset(this.isReset);
            this.countdownController.init();
        })
    },
    beforeDestroy() {
        this.isReset = true;
        this.countdownController.reset(this.isReset);
    },
};

class CountdownController {
    constructor(style, container, isReset, digitElements) {
        this.style = style;
        this.container = container;
        this.isReset = isReset;
        this.endTime = Date.parse(EVENT_DATE.toString()) / 1000;
        this.digitObjects = [];
        this.currentDigits = { seconds: {}, minutes: {}, hours: {}, days: {} };
        this.digitElements = digitElements;
    }

    init() {

        this.digitObjects = this.digitElements.map((digit) => {
            const maxNumber = digit.dataset.maxNumber;
            return {
                element: digit,
                animation: this.$lottie.loadAnimation({
                    container: digit,
                    renderer: "svg",
                    loop: false,
                    autoplay: false,
                    animationData: ANIMATIONS[maxNumber],
                }),
                frameRanges: FRAME_RANGES[maxNumber],
                currentNumber: null,
                lastNumber: null,
            };
        });

        this.render();
    }

    render() {
        if (this.isReset) return;
        this.updateTime();
        requestAnimationFrame(() => this.render());
    }

    updateTime() {
        const now = Date.now() / 1000;
        const timeLeft = Math.max(this.endTime - now, 0);
        const days = Math.floor(timeLeft / 86400);
        const hours = Math.floor((timeLeft % 86400) / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = Math.floor(timeLeft % 60);

        this.updateDigits(this.digitObjects, { days, hours, minutes, seconds });
    }

    updateDigits(digitObjects, time) {
        // Logic to update digits and play animations...
    }

    reset(isReset) {
        if (isReset) {
            this.digitObjects.forEach((digit) => {
                digit.animation.destroy();
            });
        }
    }
}
</script>

<style module>
.countdownContainer {
    max-width: 800px;
    margin-left: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.countdown {
    display: flex;
    flex-wrap: wrap;
    max-width: calc(100% - 16px);
}

.unitWrapper {
    display: flex;
    position: relative;
    width: calc(50% - ((((100% - 120px) / 7) * 1) + 0px + 0px)/2);
}

.unitWrapper:first-child,
.unitWrapper:nth-child(2) {
    margin-bottom: 64px;
}

.unitWrapper:nth-child(2n) {
    margin-left: calc((((100% - 120px) / 7) * 1) + 0px + 0px);
}

.digit {
    display: flex;
    flex-basis: 50%;
}

.digit:nth-child(2n) {
    margin-left: 8px;
}

.unitLabel {
    bottom: 0;
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    right: -8px;
    transform: translateX(100%);
    color: #3c4043 !important;
}

.blue.darkfill path {
    fill: #3d82f8
}

.blue.lightfill path {
    fill: #d1e3fd
}

.blue.darkstroke path {
    stroke: #adcaf9
}

.blue.lightstroke path {
    stroke: #d1e3fd
}

.red.darkfill path {
    fill: #e5443f
}

.red.lightfill path {
    fill: #fce8e6
}

.red.darkstroke path {
    stroke: #fad2cf
}

.red.lightstroke path {
    stroke: #fce8e6
}

.yellow.darkfill path {
    fill: #f9b923
}

.yellow.lightfill path {
    fill: #feeec3
}

.yellow.darkstroke path {
    stroke: #fce198
}

.yellow.lightstroke path {
    stroke: #feeec3
}

.green.darkfill path {
    fill: #2ea94f
}

.green.lightfill path {
    fill: #cdead5
}

.green.darkstroke path {
    stroke: #a7dbb4
}

.green.lightstroke path {
    stroke: #cdead5
}

@media screen and (max-width: 768px) {
    .countdownContainer {
        margin-left: 0;
        margin-right: 20px;
    }
}
</style>
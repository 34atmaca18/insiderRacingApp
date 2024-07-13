<template>
  <div class="racing-area">
    <div class="linelist" v-for="(horse, index) in horses" :key="index">
      <div class="lines">
        <div class="numbercontainer">
          <div class="number">{{ index + 1 }}</div>
        </div>
        <div class="horsecontainer">
          <svg v-if="showHorses" :style="{ transform: `translateX(${horse.position}px)` }" version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="30px" height="30px" viewBox="0 0 1831.000000 1632.000000"
            preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,1632.000000) scale(0.100000,-0.100000)"
                :fill="horse.colorHexa" stroke="none">
                <path :d="horsePath"/>
              </g>
          </svg>
          <div 
          v-if="showSpeed && horse.position < 453" 
          class="speed" 
          :style="{ transform: `translateX(${horse.position}px)` }">{{ horse.speed.toFixed(1) }} m/s</div>
        </div>
      </div>
    </div>
    <p class="laptour">{{ lapText }}</p>
    <div class="finishline">
      <p>Finish</p>
    </div>
  </div>
</template>

<script>
import { sampleSize } from 'lodash';
import { horseList, horsePath } from "./index.js";
import { mapGetters } from 'vuex';

export default {
  name: "Racingarea",
  data() {
    return {
      showHorses: false,
      showSpeed: false,
      horses: sampleSize(horseList, 10).map(horse => ({
        ...horse, 
        position: 0, 
        speed: 0,
        averageSpeed: 0,
        totalDistance: 0,
        totalTime: 0,
        finished: false
      })),
      horsePath,
      raceInterval: null,
      accelerationInterval: null,
      raceRunning: false,
      currentLap: 0,
      results: [],
      raceFinished: false
    };
  },
  computed: {
    ...mapGetters(['raceSchedule']),
    lapText() {
      return this.raceSchedule.length > 0 ? this.raceSchedule[this.currentLap].lapname : '';
    }
  },
  watch: {
    raceSchedule(newVal) {
      if (newVal.length > 0) {
        this.resetRace();
        this.currentLap = 0;
        this.horses = newVal[this.currentLap].horses.map(horse => ({ ...horse, position: 0, speed: this.calculateSpeed(horse.condition), totalDistance: 0, totalTime: 0, finished: false }));
        this.showHorses = true;
        this.raceFinished = false;
      }
    }
  },
  methods: {
    startPauseRace() {
      if (!this.raceSchedule || this.raceSchedule.length === 0 || this.raceFinished) {
        return; 
      }

      if (this.raceRunning) {
        clearInterval(this.raceInterval);
        clearInterval(this.accelerationInterval);
        this.horses.forEach(horse => horse.currentSpeed = horse.speed);
        this.horses.forEach(horse => horse.speed = 0);
        this.showSpeed = false;
      } else {
        this.horses.forEach(horse => {
          horse.speed = horse.currentSpeed || this.calculateSpeed(horse.condition);
        });
        this.raceInterval = setInterval(this.updatePositions, 100);
        this.accelerationInterval = setInterval(this.updateSpeed, 1250);
        this.showSpeed = true;
      }
      this.raceRunning = !this.raceRunning;
    },
    updatePositions() {
      const lapDistance = parseInt(this.raceSchedule[this.currentLap].lapname.split('-')[1].replace('m', '').trim());
      this.horses.forEach(horse => {
        if (!horse.finished) {
          const timeToCompleteLap = lapDistance / horse.speed;
          const totalUpdates = timeToCompleteLap * 10;
          const distanceCovered = 453 / totalUpdates;
          horse.position += distanceCovered;
          horse.totalDistance += distanceCovered;
          horse.totalTime += 0.1;
          horse.averageSpeed = horse.totalDistance / horse.totalTime;

          if (horse.position >= 453) {
            horse.position = 453;
            horse.speed = 0; 
            horse.finished = true; 
          }
        }
      });

      if (this.horses.every(horse => horse.finished)) {
        this.saveResults();
        clearInterval(this.raceInterval);
        clearInterval(this.accelerationInterval);
        this.raceRunning = false;
        if (this.currentLap >= this.raceSchedule.length - 1) {
          this.raceFinished = true;
        } else {
          this.currentLap++;
          this.horses = this.raceSchedule[this.currentLap].horses.map(horse => ({ ...horse, position: 0, speed: this.calculateSpeed(horse.condition), totalDistance: 0, totalTime: 0, finished: false }));
          this.showHorses = true;
          this.showSpeed = false;
        }
      }
    },
    updateSpeed() {
      this.horses.forEach(horse => {
        if (!horse.finished) {
          const acceleration = (Math.random() - 0.5) * 25; 
          horse.speed += acceleration;
          if (horse.speed < 0) {
            horse.speed = 0;
          }
        }
      });
    },
    saveResults() {
      const lapResults = this.horses.slice().sort((a, b) => b.averageSpeed - a.averageSpeed);
      this.results.push({
        lapname: this.raceSchedule[this.currentLap].lapname,
        results: lapResults.map(horse => horse.name)
      });
      this.$store.commit('setResults', this.results);
    },
    resetRace() {
      clearInterval(this.raceInterval);
      clearInterval(this.accelerationInterval);
      this.raceRunning = false;
      this.horses.forEach(horse => {
        horse.position = 0;
        horse.speed = 0;
        horse.currentSpeed = 0;
        horse.totalDistance = 0;
        horse.totalTime = 0;
        horse.averageSpeed = 0;
        horse.finished = false;
      });
      this.results = [];
      this.showHorses = false;
      this.showSpeed = false;
      this.$store.commit('setResults', this.results);
      this.raceFinished = false;
    },
    calculateSpeed(condition) {
      const baseSpeed = ((condition / 100) * (150 - 100) + 100);
      const conditionVariation = (Math.random() - 0.5) * 20; 
      const randomAddition = Math.random() * 29 + 1; 
      const speed = baseSpeed + conditionVariation + randomAddition;
      return parseFloat(speed.toFixed(2));
    }
  }
};
</script>

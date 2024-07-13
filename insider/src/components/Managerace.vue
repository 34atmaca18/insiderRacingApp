<template>
  <div class="horse">
      <h1>Horse Racing</h1>
      <div class="buttons">
          <button @click="generateRace">Generate Program!</button>
          <button @click="startPauseRace">Start / Pause</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Managerace",
  methods: {
    ...mapActions(['generateRaceSchedule']),
    generateRace() {
      this.generateRaceSchedule();
    },
    startPauseRace() {
      this.$emit('startPauseRace');
    }
  }
};
</script>
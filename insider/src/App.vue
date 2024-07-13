<template>
  <div class="container">
    <Managerace @startPauseRace="startPauseRace" />
    <div class="middle">
      <Horses />
      <Racingarea ref="racingarea" />
      <Racingprogram />
      <Racingresults />
    </div>
  </div>
</template>

<script>
import { Managerace, Horses, Racingarea, Racingresults, Racingprogram } from './components/index.js'
import './style.css'

export default {
  name: 'App',
  components: {
    Managerace,
    Horses,
    Racingarea,
    Racingresults,
    Racingprogram
  },
  methods: {
    startPauseRace() {
      this.$refs.racingarea.startPauseRace();
    }
  }
}
</script>
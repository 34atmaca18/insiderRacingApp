<template>
  <div class="racingresults">
    <div class="racingheader">
      <h1>Racing Results</h1>
    </div>
    <div v-for="(result, index) in results" :key="index" class="lap-result">
      <div class="lap-header">
        <h1>{{ result.lapname }}</h1>
      </div>
      <table class="resultstable">
        <thead>
          <tr>
            <th class="position">Position</th>
            <th class="namee">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(horse, index) in result.results" :key="index">
            <td class="positions">{{ index + 1 }}</td>
            <td class="namees">{{ horse }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Racingresults',
  computed: {
    ...mapGetters(['results'])
  }
};
</script>

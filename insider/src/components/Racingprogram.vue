<template>
    <div class="racingprogram">
      <div class="racingheader">
        <h1>Racing Program</h1>
      </div>
      <div>
            <div v-for="(lap, index) in raceSchedule" :key="index" class="lap">
                <div class="lap-header">
                    <h1>{{ lap.lapname }}</h1>
                </div>
                <table class="programtable">
                    <thead>
                        <tr>
                            <th class="position">ID</th>
                            <th class="namee">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(horse, i) in lap.horses" :key="horse.id">
                            <td class="positions">{{ i + 1 }}</td>
                            <td class="namees">{{ horse.name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
      </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Racingprogram',
  computed: {
    ...mapGetters(['raceSchedule'])
  }
};
</script>

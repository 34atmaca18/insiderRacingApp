<template>
  <div class="myHorsesList">
    <h1>Horse List (1-20)</h1>
    <table>
      <thead>
        <tr>
          <th class="nameHeader">Name</th>
          <th class="conditionHeader">Condition</th>
          <th class="colorHeader">Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(horse, index) in horseList" :key="index">
          <td class="horseNames" >{{ horse.name }}</td>
          <td class="horseConditions">{{ horse.condition }}</td>
          <td class="horseColors">{{ horse.color }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
    import {horseList} from './index.js'
    export default {
        name: "Horses",
        data() {
            return {
            horseList,
            };
        }
};
</script>
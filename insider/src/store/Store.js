import { createStore } from 'vuex';
import { horseList, lapList } from "../components/index.js";

function calculateSpeed(condition) {
  const baseSpeed = ((condition / 100) * (150 - 100) + 100);
  const conditionVariation = (Math.random() - 0.5) * 20; 
  const randomAddition = Math.random() * 29 + 1; 
  const speed = baseSpeed + conditionVariation + randomAddition;
  return parseFloat(speed.toFixed(2));
}

function getRandomHorses(num) {
  let shuffled = [...horseList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num).map(horse => {
    return { ...horse, speed: calculateSpeed(horse.condition) };
  });
}

export default createStore({
  state: {
    lapList,
    raceSchedule: [],
    results: []
  },
  mutations: {
    setRaceSchedule(state, schedule) {
      state.raceSchedule = schedule;
    },
    setResults(state, results) {
      state.results = results;
    }
  },
  actions: {
    generateRaceSchedule({ commit, state }) {
      const schedule = state.lapList.map((lap) => {
        return {
          lap: lap.lap,
          lapname: lap.lapname,
          horses: getRandomHorses(10)
        };
      });
      commit('setRaceSchedule', schedule);
    }
  },
  getters: {
    raceSchedule: (state) => state.raceSchedule,
    results: (state) => state.results
  }
});

export { calculateSpeed };

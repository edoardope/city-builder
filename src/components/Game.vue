<script>
import WorldMap from './map/WorldMap.vue';
import Hud from './hud/Hud.vue';
import { store, store as vuexStore } from '../store.js'

export default {
  name: "Game",
  components: {
    WorldMap,
    Hud
  },
  data() {
    return {
      vuexStore, // Cambia il nome qui
    }
  },
  methods: {
    CurrentTime() {
      //game clock
      setInterval(() => {
        // Incrementa i secondi
        this.vuexStore.seconds++;

        // Aggiorna minuti e ore se necessario
        if (this.vuexStore.seconds >= 60) {
          this.vuexStore.seconds = 0;
          this.vuexStore.minutes++;
        }
        if (this.vuexStore.minutes >= 60) {
          this.vuexStore.minutes = 0;
          this.vuexStore.hours++;
        }
      }, 1000); // Ogni secondo
    },
    FastIntroitProductionClock() {
      setInterval(() => {
        this.FastIntroitProduction();
      }, 3000); // ogni 3 secondi
    },
    FastIntroitProduction() {
      // rock production
      for (let i = 0; i < this.vuexStore.rockMineNumber; i++) {
        this.vuexStore.rock++;
      }
      // coal production
      for (let i = 0; i < this.vuexStore.coalMineNumber; i++) {
        this.vuexStore.coal++;
      }

      for (let i = 0; i < this.vuexStore.TilesNumber; i++) {
        if (this.vuexStore.tilesInfo[i].inAreaOf === 'Wood Cutter' && this.vuexStore.tilesInfo[i].type === 'foresta') {
          this.vuexStore.wood++;
        }
      }
    }
  },
  mounted() {
    this.CurrentTime();
    this.FastIntroitProductionClock();
  }
};

</script>

<template>
  <main>
    <WorldMap />
    <Hud />
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;

}
</style>

<script>
import WorldMap from './map/WorldMap.vue';
import Hud from './hud/Hud.vue';
import { store as vuexStore } from '../store.js'

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
    }
  },
  mounted() {
    this.CurrentTime();
  }
}
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
  justify-content: center;
}
</style>

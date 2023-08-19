<script>
import WorldMap from './map/WorldMap.vue';
import Hud from './hud/Hud.vue';
import { store } from '../store.js'

export default {
  name: "Game",
  components: {
    WorldMap,
    Hud
  },
  data() {
    return {
      store
    }
  },
  methods: {
    save() {
      const tilesInfoJSON = JSON.stringify(store.tilesInfo);
      localStorage.setItem('savedTilesInfo', tilesInfoJSON);
      console.log('game saved')
    },
    load() {
      // Quando l'utente desidera caricare una partita salvata
      const savedTilesInfoJSON = localStorage.getItem('savedTilesInfo');
      if (savedTilesInfoJSON) {
        const loadedTilesInfo = JSON.parse(savedTilesInfoJSON);

        store.tilesInfo = loadedTilesInfo;
        console.log('game loaded')
      }
    }
  }
}
</script>

<template>
  <main>
    <WorldMap />
    <Hud v-if="false" />
    <span class="text-white" @click="save()">save</span>
    <span class="text-white" @click="load()">load</span>
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

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
    FastClock() {
      setInterval(() => {
        this.FastIntroitProduction();
        this.RoadSystemUpdate()
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
        //wood production
        if (this.vuexStore.tilesInfo[i].inAreaOf === 'Wood Cutter' && this.vuexStore.tilesInfo[i].type === 'foresta') {
          this.vuexStore.wood++;
        }
      }
    },
    RoadSystemUpdate() {
      for (let i = 0; i < this.vuexStore.TilesNumber; i++) {
        let tileUpMinusOne = i - 81
        let tileUp = i - 80
        let tileUpPlusOne = i - 79
        let tilePrev = i - 1
        let tileNext = i + 1
        let tileDownMinusOne = i + 79
        let tileDown = i + 80
        let tileDownPlusOne = i + 81
        if (this.vuexStore.tilesInfo[i].road.isThisARoad === true) {
          if (!this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.includes(tileUp)) {
            if (this.vuexStore.tilesInfo[tileUp].structure.name) {
              this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
              this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.push(tileUp)
            }
          }

          if (!this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.includes(tilePrev)) {
            if (this.vuexStore.tilesInfo[tilePrev].structure.name) {
              this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
              this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.push(tilePrev)
            }
          }

          if (!this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.includes(tileNext)) {
            if (this.vuexStore.tilesInfo[tileNext].structure.name) {
              this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
              this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.push(tileNext)
            }
          }

          if (!this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.includes(tileDown)) {
            if (this.vuexStore.tilesInfo[tileDown].structure.name) {
              this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
              this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.push(tileDown)
            }
          }
        }
      }
    }
  },
  mounted() {
    this.CurrentTime();
    this.FastClock();
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

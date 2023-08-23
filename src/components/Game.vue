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
          //buildings near roads
          if (!this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.includes(tileUp)) {
            if (this.vuexStore.tilesInfo[tileUp].structure.name) {
              if (!this.vuexStore.tilesInfo[tileUp].road.isThisARoad) {
                this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
                this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.push(tileUp)
                this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.push(tileUp)
              }
            }
          }

          if (!this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.includes(tilePrev)) {
            if (this.vuexStore.tilesInfo[tilePrev].structure.name) {
              if (!this.vuexStore.tilesInfo[tilePrev].road.isThisARoad) {
                this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
                this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.push(tilePrev)
                this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.push(tilePrev)
              }
            }
          }

          if (!this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.includes(tileNext)) {
            if (this.vuexStore.tilesInfo[tileNext].structure.name) {
              if (!this.vuexStore.tilesInfo[tileNext].road.isThisARoad) {
                this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
                this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.push(tileNext)
                this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.push(tileNext)
              }
            }
          }

          if (!this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.includes(tileDown)) {
            if (this.vuexStore.tilesInfo[tileDown].structure.name) {
              if (!this.vuexStore.tilesInfo[tileDown].road.isThisARoad) {
                this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
                this.vuexStore.tilesInfo[i].road.nearBuildingInTiles.push(tileDown)
                this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.push(tileDown)
              }
            }
          }

          //buildings connection not near
          if (this.vuexStore.tilesInfo[tileUp].road.isThisARoad) {
            this.vuexStore.tilesInfo[tileUp].road.connectedToBuildingsInTiles.forEach(element => {
              if (!this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.includes(element)) {
                this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.push(element)
                this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
              }
            });
          }

          if (this.vuexStore.tilesInfo[tilePrev].road.isThisARoad) {
            this.vuexStore.tilesInfo[tilePrev].road.connectedToBuildingsInTiles.forEach(element => {
              if (!this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.includes(element)) {
                this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.push(element)
                this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
              }
            });
          }

          if (this.vuexStore.tilesInfo[tileNext].road.isThisARoad) {
            this.vuexStore.tilesInfo[tileNext].road.connectedToBuildingsInTiles.forEach(element => {
              if (!this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.includes(element)) {
                this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.push(element)
                this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
              }
            });
          }

          if (this.vuexStore.tilesInfo[tileDown].road.isThisARoad) {
            this.vuexStore.tilesInfo[tileDown].road.connectedToBuildingsInTiles.forEach(element => {
              if (!this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.includes(element)) {
                this.vuexStore.tilesInfo[i].road.connectedToBuildingsInTiles.push(element)
                this.vuexStore.tilesInfo[i].road.numberOfConnectedBuildings++
              }
            });
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

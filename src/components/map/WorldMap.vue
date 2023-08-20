<script>
import { store } from '../../store';
export default {
    name: "WorldMap",
    data() {
        return {
            store,
            grid: ""
        }
    },
    methods: {
        tileInfo(index) {
            if (store.infoView) {
                store.tilesInfo[index].TooltipOpen = true
            }
        },
        tileInfoClose(index) {
            store.tilesInfo[index].TooltipOpen = false
        },
        interact(index) {
            //costruzione edifici
            if (store.mode === 'build') {
                if (store.SelectedBuilding === 'miniera' && store.tilesInfo[index].type === 'roccioso') {
                    store.tilesInfo[index].structure.name = 'mine'
                    store.tilesInfo[index].structure.createdAt = `${store.hours}:${store.minutes}:${store.seconds}`
                    store.tilesInfo[index].skin = 'mine'
                    if (store.tilesInfo[index].resourceDeposit === 'carbone') {
                        store.coalMineNumber++
                    } else {
                        store.rockMineNumber++
                    }
                } else if (store.SelectedBuilding === 'miniera') {
                    store.error = "Edificio posizionabile solo su terreno roccioso"
                    setTimeout(() => {
                        store.error = ""
                    }, 3000); // dopo 3 secondi
                }
            }
        }
    },
    created() {
        for (let i = 0; i < store.TilesNumber; i++) {
            // const randomTypeIndex = Math.floor(Math.random() * 7); // Genera un indice casuale tra 0 e 2
            // const randomType = ['erbosa', 'erbosa', 'erbosa', 'erbosa', 'acquosa', 'foresta', 'sopraelevata'][randomTypeIndex]; // Scegli casualmente uno dei tipi

            store.tilesInfo.push({
                skin: "erbosa",
                type: "erbosa",
                pollutionLevel: 0,
                structure: {
                    name: "none"
                },
                fertylity: 100,
                powered: 0,
                burning: "no",
                polluted: false,
                TooltipOpen: false
            });
        }
    },
    mounted() {
        setInterval(() => {
            this.grid = store.grid
        }, 1000); // Ogni secondo
    }
}
</script>

<template>
    <div id="GameCont">
        <div v-if="store.error" class="ErrorDisplay text-danger">
            {{ store.error }}
        </div>
        <div class="GameTile" v-for="(tile, index) in store.tilesInfo" :key="index" :class="tile.skin, store.grid"
            @mouseenter="this.tileInfo(index)" @mouseleave="this.tileInfoClose(index)" @click="interact(index)">
            <div class="Tooltip" v-if="tile.TooltipOpen">
                <div class="text-white">
                    <span>terrain: {{ tile.type }}</span><br>
                    <span>fertility: {{ tile.fertylity }}%</span><br>
                    <span>pollution: {{ tile.pollutionLevel }}%</span><br>
                    <span>power level: {{ tile.powered }}%</span><br>
                    <span>burning: {{ tile.burning }}</span><br>
                    <span>building: {{ tile.structure.name }}</span><br>
                    <span>resource: {{ tile.resourceDeposit }}</span>
                </div>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>
#GameCont {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    margin: 0;
    border: 0;
    padding: 0;
    max-width: 2000px;
    max-height: 1000px;

    .ErrorDisplay {
        position: absolute;
        top: 20px;
        left: 10px;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 5px;
    }

    .GameTile {
        // border: 1px solid black;
        flex-basis: calc(100% / 80);
        aspect-ratio: 1;
    }

    .mine {
        background-image: url(../../../public/miniera.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        background-color: #b1d354;
    }

    .erbosa {
        background-image: url(../../../public/grassnew.png);
    }

    .acquosa {
        background-color: #42acaf;
    }

    .foresta {
        background-image: url(../../../public/WinterTrees.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        background-color: #b1d354;

    }

    .sabbiosa {
        background-color: rgb(212, 212, 145);
    }

    .roccioso {
        background-image: url(../../../public/Rocks.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        background-color: #b1d354;
    }

    .inactive {
        background-color: red;
    }

    .Tooltip {
        position: absolute;
        top: 20px;
        left: 5px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 999; // Assicurati che sia al di sopra delle altre caselle
        pointer-events: none; // Permette al click di passare attraverso il tooltip
    }

    .border {
        border: 1px solid black !important
    }
}

@media (min-width: 00px) {}
</style>
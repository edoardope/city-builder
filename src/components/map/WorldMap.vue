<script>
import { store } from '../../store';
export default {
    name: "WorldMap",
    data() {
        return {
            store,
            TilesNumber: 3700,
        }
    },
    methods: {
        tileInfo(index) {
            store.tilesInfo[index].TooltipOpen = true
        },
        tileInfoClose(index) {
            store.tilesInfo[index].TooltipOpen = false
        }
    },
    created() {
        for (let i = 0; i < this.TilesNumber; i++) {
            const randomTypeIndex = Math.floor(Math.random() * 6); // Genera un indice casuale tra 0 e 2
            const randomType = ['erbosa', 'erbosa', 'erbosa', 'erbosa', 'foresta', 'sopraelevata'][randomTypeIndex]; // Scegli casualmente uno dei tipi

            store.tilesInfo.push({
                type: randomType,
                pollutionLeve: 0,
                structure: "",
                fertylity: 100,
                powered: 0,
                burning: false,
                polluted: false,
                TooltipOpen: false
            });
        }
    },
}
</script>

<template>
    <div id="GameCont">
        <div class="GameTile" v-for="(tile, index) in store.tilesInfo" :key="index" :class="tile.type"
            @mouseenter="this.tileInfo(index)" @mouseleave="this.tileInfoClose(index)">
            <div class="Tooltip" v-if="tile.TooltipOpen">
                <span class="text-white">
                    {{ tile.type }}
                </span>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>
#GameCont {
    width: 90%;
    height: 95%;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    margin: 0;
    border: 0;
    padding: 0;
    max-width: 2000px;
    max-height: 1000px;

    .GameTile {
        border: 1px solid black;
        flex-basis: calc(100% / 100);
        aspect-ratio: 1;
    }

    .erbosa {
        background-color: lightgreen;
    }

    .foresta {
        background-color: green;
    }

    .sopraelevata {
        background-color: grey;
    }

    .inactive {
        background-color: red;
    }

    .Tooltip {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 999; // Assicurati che sia al di sopra delle altre caselle
        pointer-events: none; // Permette al click di passare attraverso il tooltip
    }
}

@media (min-width: 00px) {}
</style>
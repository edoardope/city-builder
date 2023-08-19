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
        changetile(index) {
            console.log(store.tilesInfo[index].type)
        }
    },
    created() {
        for (let i = 0; i < this.TilesNumber; i++) {
            const randomTypeIndex = Math.floor(Math.random() * 6); // Genera un indice casuale tra 0 e 2
            const randomType = ['erbosa', 'erbosa', 'erbosa', 'erbosa', 'foresta', 'sopraelevata'][randomTypeIndex]; // Scegli casualmente uno dei tipi

            store.tilesInfo.push({
                type: randomType,
            });
        }
    },
}
</script>

<template>
    <div id="GameCont">
        <div class="GameTile" v-for="(tile, index) in store.tilesInfo" :key="index" :class="tile.type"
            @click="this.changetile(index)">

        </div>
    </div>
</template>

<style lang="scss" scoped>
#GameCont {
    width: 95%;
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
}

@media (min-width: 00px) {}
</style>
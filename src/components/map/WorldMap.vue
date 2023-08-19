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

    }
}
</script>

<template>
    <div id="GameCont">
        <div class="GameTile" v-for="tile in TilesNumber">

        </div>
    </div>
</template>

<style lang="scss" scoped>
#GameCont {
    background-color: blue;
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
}

@media (min-width: 00px) {}
</style>
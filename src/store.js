import { reactive } from 'vue'

export const store = reactive({
    TilesNumber: 10000,
    gameStarted: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    infoView: false,
    SelectedBuilding: "",
    tilesInfo: [], // Array per memorizzare le informazioni delle caselle
    grid: ""
});
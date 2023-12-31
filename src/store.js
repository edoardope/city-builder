import { reactive } from 'vue'

export const store = reactive({
    TilesNumber: 5000,
    gameStarted: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    infoView: false,
    SelectedBuilding: "",
    mode: "",
    tilesInfo: [], // Array per memorizzare le informazioni delle caselle
    grid: "",
    error: "",
    //buildings control
    avviableHousing: 0,
    rockMineNumber: 0,
    coalMineNumber: 0,
    //resource and money
    money: 0,
    wood: 0,
    rock: 0,
    coal: 0,
    oil: 0,
    uranium: 0,
    //population
    totalPop: 0,
    miner: 0,
    woodCutter: 0,
    farmer: 0
});
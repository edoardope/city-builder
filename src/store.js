import { reactive } from 'vue'

export const store = reactive({
    hours: 0,
    minutes: 0,
    seconds: 0,
    infoView: false,
    SelectedBuilding: "",
    tilesInfo: [], // Array per memorizzare le informazioni delle caselle
});
import { reactive } from 'vue'

export const store = reactive({
    SelectedBuilding: "",
    tilesInfo: [], // Array per memorizzare le informazioni delle caselle
});
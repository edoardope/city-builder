<script>
import { store } from '../../store';
export default {
    name: "Hud",
    data() {
        return {
            gameStarted: "",
            seconds: "",
            minutes: "",
            hours: "",
            ToggleInfoStatus: "text-white",
            ToggleGrid: "text-white"
        }
    },
    methods: {
        save() {
            const tilesInfoJSON = JSON.stringify(store.tilesInfo);
            const currentSeconds = JSON.stringify(this.seconds);
            const currentMinutes = JSON.stringify(this.minutes);
            const currentHours = JSON.stringify(this.hours);
            localStorage.setItem('savedTilesInfo', tilesInfoJSON);
            localStorage.setItem('savedSeconds', currentSeconds);
            localStorage.setItem('savedMinutes', currentMinutes);
            localStorage.setItem('savedHours', currentHours);

            console.log('game saved');
        },
        load() {
            store.gameStarted = true;
            const savedTilesInfoJSON = localStorage.getItem('savedTilesInfo');
            const savedSeconds = localStorage.getItem('savedSeconds');
            const savedMinutes = localStorage.getItem('savedMinutes');
            const savedHours = localStorage.getItem('savedHours');
            if (savedTilesInfoJSON) {
                const loadedTilesInfo = JSON.parse(savedTilesInfoJSON);
                const loadedSeconds = JSON.parse(savedSeconds);
                const loadedMinutes = JSON.parse(savedMinutes);
                const loadedHours = JSON.parse(savedHours);

                store.tilesInfo = loadedTilesInfo;
                store.seconds = loadedSeconds;
                store.minutes = loadedMinutes;
                store.hours = loadedHours;
                console.log('game loaded');
            }
        },
        ToggleInfoView() {
            if (!store.infoView) {
                store.infoView = true;
                this.ToggleInfoStatus = "text-danger"
            } else {
                store.infoView = false;
                this.ToggleInfoStatus = "text-white"
            }
        },

        makeRandomTerrain() {
            store.tilesInfo = [];
            let previewsType = ''; // Aggiungi questa variabile per tenere traccia del tipo precedente
            let TileResource = 'none'
            for (let i = 0; i < store.TilesNumber; i++) {
                const randomTypeIndex = Math.floor(Math.random() * 13);
                let randomType = ['foresta', 'erbosa', 'acquosa', 'erbosa', 'erbosa', 'erbosa', 'erbosa', 'erbosa', 'erbosa', 'erbosa', 'acquosa', 'foresta', 'roccioso'][randomTypeIndex];

                if (i > 50) {
                    const previousI = i - 1;
                    const upperI = i - 50;
                    const upperIprevius = i - 51;
                    const previousType = store.tilesInfo[previousI].type;
                    const upperType = store.tilesInfo[upperI].type; // Aggiungi questa riga
                    const upperPreviusType = store.tilesInfo[upperIprevius].type
                    if (previousType === 'foresta' && upperType === 'foresta') { // Usa === per il confronto
                        const randomTypeIndex = Math.floor(Math.random() * 3);
                        randomType = ['foresta', 'erbosa', 'roccioso'][randomTypeIndex];
                    } else if (previousType === 'acquosa' || upperType === 'acquosa' || upperPreviusType === 'acquosa') {
                        const randomTypeIndex = Math.floor(Math.random() * 4);
                        randomType = ['acquosa', 'erbosa', 'foresta', 'sabbiosa'][randomTypeIndex];
                    } else if (previewsType === 'erbosa' || upperType === 'erbosa') {
                        const randomTypeIndex = Math.floor(Math.random() * 5);
                        randomType = ['erbosa', 'erbosa', 'erbosa', 'erbosa', 'foresta'][randomTypeIndex];
                    }
                }


                const randomResourceIndex = Math.floor(Math.random() * 10);
                if (randomResourceIndex === 5) {
                    TileResource = 'petrolio'
                } else if (randomResourceIndex === 6) {
                    TileResource = 'uranio'
                } else if (randomResourceIndex === 7 || randomResourceIndex === 8) {
                    TileResource = 'carbone'
                } else {
                    TileResource = 'none'
                }



                const skin = randomType;

                store.tilesInfo.push({
                    skin: skin,
                    type: randomType,
                    pollutionLevel: 0,
                    structure: "none",
                    fertylity: 100,
                    powered: 0,
                    burning: "no",
                    polluted: false,
                    TooltipOpen: false,
                    resourceDeposit: TileResource
                });
            }
        },
        resetTerrain() {
            store.tilesInfo = [];
            for (let i = 0; i < store.TilesNumber; i++) {
                store.tilesInfo.push({
                    skin: "erbosa",
                    type: "erbosa",
                    pollutionLevel: 0,
                    structure: "none",
                    fertylity: 100,
                    powered: 0,
                    burning: "no",
                    polluted: false,
                    TooltipOpen: false,
                    resourceDeposit: ""
                });
            }
        },
        ToggleGridView() {
            if (store.grid == "") {
                this.ToggleGrid = "text-danger"
                store.grid = "border"
            } else {
                this.ToggleGrid = "text-white"
                store.grid = ""
            }
        },
        start() {
            store.gameStarted = true
        }
    },
    mounted() {
        setInterval(() => {
            this.gameStarted = store.gameStarted;
            this.seconds = store.seconds;
            this.minutes = store.minutes;
            this.hours = store.hours;
        }, 1000); // Ogni secondo
    }
}
</script>

<template>
    <div id="hudInterface">
        <span class="text-white" @click="save()">save</span>
        <span class="text-white" @click="load()">load</span>
        <span class="text-white" v-if="!this.gameStarted" @click="makeRandomTerrain()">random terrain</span>
        <span class="text-white" v-if="!this.gameStarted" @click="resetTerrain()">reset terrain</span>
        <span class="text-white" v-if="!this.gameStarted" @click="start()">start</span>
        <span :class="ToggleInfoStatus" @click="ToggleInfoView()">Toggle info</span>
        <span :class="this.ToggleGrid" @click="ToggleGridView()">Toggle grid</span>
        <div v-if="this.gameStarted" class="d-flex align-items-center flex-column">
            <span class="text-white">Current time:</span>
            <span class="text-white">{{ this.hours.toString().padStart(2, '0') }}:{{ this.minutes.toString().padStart(2,
                '0')
            }}:{{ this.seconds.toString().padStart(2, '0') }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#hudInterface {
    border: 1px solid red;
    width: 10%;
    height: 95%;
    margin: 0;
    padding: 0;
    // max-width: 2000px;
    max-height: 1000px;
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
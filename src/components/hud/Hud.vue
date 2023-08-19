<script>
import { store } from '../../store';
export default {
    name: "Hud",
    data() {
        return {
            seconds: "",
            minutes: "",
            hours: "",
            ToggleInfoStatus: "text-white"
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
        }
    },
    mounted() {
        setInterval(() => {
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
        <span :class="ToggleInfoStatus" @click="ToggleInfoView()">Toggle info</span>
        <span class="text-white">Current time:</span>
        <span class="text-white">{{ this.hours.toString().padStart(2, '0') }}:{{ this.minutes.toString().padStart(2, '0')
        }}:{{ this.seconds.toString().padStart(2, '0') }}</span>
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
<script>
import Game from './components/Game.vue'
import { store } from './store.js';

export default {
  name: "App",
  components: {
    Game,
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    getImagePath: function (imgPath) {
      return new URL(imgPath, import.meta.url).href;
    }
  }
}
</script>

<template>
  <Game />
</template>

<style lang="scss">
@use 'style/main.scss' as *;
</style>

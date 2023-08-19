<script>
import HelloWorld from './components/HelloWorld.vue'
import { store } from './store.js';

export default {
  name: "App",
  components: {
    HelloWorld,
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
  <HelloWorld />
</template>

<style lang="scss">
@use 'style/main.scss' as *;
</style>

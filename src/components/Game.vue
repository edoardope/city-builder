<script>
import WorldMap from './map/WorldMap.vue';

export default {
  name: "Game",
  components: {
    WorldMap
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<template>
  <main>
    <WorldMap />
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

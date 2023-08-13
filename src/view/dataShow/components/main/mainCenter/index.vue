<template>
  <div style="display: flex; flex-direction: column">
    <Map class="map"></Map>
    <Line class="line"></Line>
  </div>
</template>

<script setup lang="ts">
import Map from "./map.vue";
import Line from "./line.vue";
</script>
<script lang="ts">
export default { name: "MainCenter" };
</script>
<style scoped lang="scss"></style>

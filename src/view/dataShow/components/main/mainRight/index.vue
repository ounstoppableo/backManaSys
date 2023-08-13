<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 20px;
      color: white;
      font-size: 20px;
    "
  >
    <Rank></Rank>
    <Tourist></Tourist>
    <Subscribe></Subscribe>
  </div>
</template>

<script setup lang="ts">
import Rank from "./rank.vue";
import Tourist from "./tourist.vue";
import Subscribe from "./subscribe.vue";
</script>
<script lang="ts">
export default { name: "MainRight" };
</script>
<style scoped lang="scss"></style>

<template>
  <div class="container">
    <Top></Top>
    <Sex></Sex>
    <Age></Age>
  </div>
</template>

<script setup lang="ts">
import Top from "./top.vue";
import Sex from "./sex.vue";
import Age from "./age.vue";
</script>
<script lang="ts">
export default { name: "MainLeft" };
</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
  font-size: 20px;
}
</style>

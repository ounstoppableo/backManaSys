<template>
  <div class="main">
    <MainLeft class="left"></MainLeft>
    <MainCenter class="center"></MainCenter>
    <MainRight class="right"></MainRight>
  </div>
</template>

<script setup lang="ts">
import MainLeft from "./mainLeft/index.vue";
import MainCenter from "./mainCenter/index.vue";
import MainRight from "./mainRight/index.vue";
</script>
<script lang="ts">
export default { name: "Middle" };
</script>
<style scoped lang="scss">
.main {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  padding-bottom: 20px;

  .left {
    flex: 1;
  }

  .center {
    flex: 2.2;
  }

  .right {
    flex: 1;
  }
}
</style>

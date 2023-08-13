<template>
  <template v-if="setting.isShow">
    <div class="logo">
      <img :src="logoSrc" alt="" />
      <h1 :style="{ display: layoutData.hidenMenuFlag ? 'none' : 'block' }">
        {{ setting.title }}
      </h1>
    </div>
  </template>
</template>

<script setup lang="ts">
import setting from "@/setting";
import layoutSetting from "@/store/modules/setting";
const layoutData = layoutSetting();
defineProps(["logoSrc"]);
</script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>
<style scoped lang="scss">
.logo {
  height: $topTabbarHeight;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  h1 {
    color: white;
    font-size: 20px;
    margin-left: 0.625rem;
  }

  img {
    height: 100%;
    border-radius: 50%;
  }
}
</style>

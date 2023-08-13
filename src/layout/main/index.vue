<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component
        :is="Component"
        :key="route.path"
        v-if="layoutData.mainFresh"
      />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import layoutSetting from "@/store/modules/setting";
const layoutData = layoutSetting();
</script>
<script lang="ts">
export default { name: "Main" };
</script>
<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-to {
  opacity: 1;
}
</style>

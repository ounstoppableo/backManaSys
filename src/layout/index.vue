<template>
  <div class="container">
    <div class="menuContainer" :class="{ fold: layoutData.hidenMenuFlag }">
      <layout-menu logoSrc="@/../logo.png" :routes="routes"></layout-menu>
    </div>
    <div class="topTabbar" :class="{ expand: layoutData.hidenMenuFlag }">
      <layout-tabbar></layout-tabbar>
    </div>
    <div class="mainContainer" :class="{ expand: layoutData.hidenMenuFlag }">
      <layout-main></layout-main>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutMenu from "./menu/index.vue";
import LayoutMain from "./main/index.vue";
import { userInfo } from "@/store/modules/user";
import LayoutTabbar from "./tabbar/index.vue";
//获取layout状态配置数据
import layoutSetting from "@/store/modules/setting";
const layoutData = layoutSetting();
const routes = userInfo().myRoutes;
</script>
<script lang="ts">
export default {
  name: "Home",
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}

.menuContainer {
  width: $menuContainerWidth;
  height: 100%;
  background-color: #001529;
  transition: all 0.5s ease;

  &.fold {
    width: $foldMenu;
  }
}

.topTabbar {
  position: absolute;
  top: 0;
  left: $menuContainerWidth;
  height: $topTabbarHeight;
  width: calc(100% - $menuContainerWidth);
  transition: all 0.5s ease;
}

.mainContainer {
  position: absolute;
  top: $topTabbarHeight;
  left: $menuContainerWidth;
  width: calc(100% - $menuContainerWidth);
  height: calc(100% - $topTabbarHeight);
  overflow: auto;
  transition: all 0.5s ease;
}

.expand {
  left: $foldMenu;
  width: calc(100% - $foldMenu);
}
</style>

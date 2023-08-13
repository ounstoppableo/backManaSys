<template>
  <logo :logoSrc="logoSrc"></logo>
  <el-menu
    class="menu"
    :default-active="$route.path"
    :collapse="layoutData.hidenMenuFlag"
    mode="vertical"
    backgroundColor="#001529"
    text-color="#ffffff"
  >
    <MenuMain :routes="routes"></MenuMain>
  </el-menu>
</template>

<script setup lang="ts">
//logo组件
import logo from "./logo.vue";
//实际配置菜单项的组件
import MenuMain from "./menumain/index.vue";
//获取路由
import { useRoute } from "vue-router";
//获取layout状态设置数据
import layoutSetting from "@/store/modules/setting";
const layoutData = layoutSetting();
defineProps(["routes", "logoSrc"]);
const $route = useRoute();
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>
<style scoped lang="scss">
.menu {
  border: 0;
  height: calc(100% - $topTabbarHeight);
  overflow: auto;
}
</style>

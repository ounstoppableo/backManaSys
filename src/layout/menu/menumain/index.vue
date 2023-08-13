<template>
  <template v-for="route in routes" :key="route.path">
    <!-- 没有children项情况 -->
    <template v-if="!route.children && route.meta.isShow">
      <el-menu-item :index="route.path" @click="gopage">
        <el-icon>
          <component :is="route.meta.icon"></component>
        </el-icon>
        <template #title>{{ route.meta.title }}</template>
      </el-menu-item>
    </template>
    <!-- 只有一个儿子路径的情况 -->
    <template
      v-if="route.children && route.children.length === 1 && route.meta.isShow"
    >
      <el-sub-menu :index="route.path" v-if="route.children[0].isShow">
        <template #title>
          <el-icon>
            <component :is="route.meta.icon"></component>
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item :index="route.children[0].path" @click="gopage">
          <el-icon>
            <component :is="route.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            {{ route.children[0].meta.title }}
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item
        :index="route.path"
        @click="gopage"
        v-if="!route.children[0].isShow"
      >
        <el-icon>
          <component :is="route.meta.icon"></component>
        </el-icon>
        <template #title>{{ route.meta.title }}</template>
      </el-menu-item>
    </template>
    <!-- 有多个儿子路径的情况 -->
    <template
      v-if="route.children && route.children.length > 1 && route.meta.isShow"
    >
      <el-sub-menu :index="route.path">
        <template #title>
          <el-icon>
            <component :is="route.meta.icon"></component>
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <menuMain :routes="route.children"></menuMain>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import menuMain from "./index.vue";
import { useRouter } from "vue-router";
defineProps(["routes"]);
const $router = useRouter();
function gopage(vc: any): void {
  $router.push(vc.index);
}
</script>
<script lang="ts">
export default { name: "menuMain" };
</script>
<style scoped lang="scss"></style>

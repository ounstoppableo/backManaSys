<template>
  <div class="container">
    <div class="adapter">
      <Top></Top>
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Top from "./components/top.vue";
import Main from "./components/main/index.vue";
//容器适配函数
function adapter(oriWidth: number, oriHeight: number, selector: string) {
  let widthChangeRatio = window.innerWidth / oriWidth;
  let heightChangeRatio = window.innerHeight / oriHeight;
  let scaleRatio =
    widthChangeRatio < heightChangeRatio ? widthChangeRatio : heightChangeRatio;
  (
    document.querySelector(selector) as HTMLElement
  ).style.transform = `scale(${scaleRatio}) translate(-50%,-50%)`;
}
onMounted(() => {
  //初始化
  (
    document.querySelector(".adapter") as HTMLElement
  ).style.transform = `scale(${Math.min(
    window.innerWidth / 1920,
    window.innerHeight / 1080,
  )}) translate(-50%,-50%)`;
  // 监听视口变化
  window.onresize = () => {
    adapter(1920, 1080, ".adapter");
  };
});
</script>
<script lang="ts">
export default { name: "DataShow" };
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .adapter {
    position: fixed;
    width: 1920px;
    height: 1080px;
    transform-origin: top left;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

<template>
  <div class="top">
    <div class="left">
      <div></div>
      <button @click="gohome">首页</button>
    </div>
    <div class="middle">智慧旅游可视化大数据展示平台</div>
    <div class="right">
      <button>统计报告</button>
      <span>当前时间: &nbsp{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
const time = ref(moment(new Date()).format("YYYY年MM月DD日 HH:mm:ss"));
//@ts-ignore
let timer = null;
onMounted(() => {
  timer = setInterval(() => {
    time.value = moment(new Date()).format("YYYY年MM月DD日 HH:mm:ss");
  }, 1000);
});
onBeforeUnmount(() => {
  timer = null;
});
const $router = useRouter();
//回首页的回调
function gohome() {
  $router.push("/home");
}
</script>
<script lang="ts">
export default { name: "Top" };
</script>
<style scoped lang="scss">
button {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}

.top {
  width: 100%;
  height: 50px;
  display: flex;

  .left {
    flex: 1.3;
    height: 40px;
    background: url(../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    button {
      float: right;
      height: 40px;
      width: 140px;
      background: url(../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: cover;
      color: $fontColor;
      line-height: 40px;
    }
  }

  .middle {
    flex: 1.6;
    height: 75px;
    background: url(../images/dataScreen-header-center-bg.png) no-repeat;
    background-size: contain;
    overflow: visible;
    color: $fontColor;
    text-align: center;
    line-height: 70px;
    font-size: 30px;
  }

  .right {
    flex: 1.3;
    height: 40px;
    background: url(../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    color: $fontColor;
    line-height: 40px;

    button {
      float: left;
      height: 40px;
      width: 140px;
      background: url(../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: cover;
      color: $fontColor;
      line-height: 40px;
      margin-right: 80px;
    }
  }
}
</style>

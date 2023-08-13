<template>
  <div class="top">
    <div>实时游客统计</div>
    <img src="../../../images/dataScreen-title.png" />
    <div
      style="
        font-size: 16px;
        float: right;
        margin-top: 20px;
        margin-right: 10px;
      "
    >
      可预约总量<span style="color: orange">{{ number }}</span
      >人
    </div>
    <div class="charContain">
      <span v-for="(char, index) in accommodate" :key="index" class="char">{{
        char
      }}</span>
    </div>
    <div id="liquid" style="width: 100%; height: 190px"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";
const number = ref(99999);
const accommodate = ref("216908人");
onMounted(() => {
  //水球图
  let liquid = echarts.init(document.getElementById("liquid"));
  let liquidOption = {
    series: [
      {
        radius: "90%",
        type: "liquidFill",
        data: [0.6],
      },
    ],
  };
  liquid.setOption(liquidOption);
});
</script>
<script lang="ts">
export default { name: "Top" };
</script>
<style scoped lang="scss">
.top {
  flex: 1;
  background: url(../../../images/dataScreen-main-lt.png) no-repeat;
  background-size: cover;
}

.charContain {
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  gap: 5px;

  .char {
    flex: 1;
    text-align: center;
    height: 50px;
    background: url(../../../images/total.png) no-repeat;
    background-size: cover;
    line-height: 50px;
    color: $fontColor;
    font-size: 25px;
    font-weight: 400;
  }
}
</style>

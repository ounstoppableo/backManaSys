<template>
  <div class="rank">
    <div>热门景区排行</div>
    <img src="../../../images/dataScreen-title.png" />
    <div class="top">
      <p style="flex: 1">排名</p>
      <p style="flex: 1">景区</p>
      <p style="flex: 3">预约数量</p>
    </div>
    <div class="body">
      <div class="bodyitem">
        <p style="flex: 1">NO1</p>
        <p style="flex: 1">峨眉山</p>
        <div style="flex: 3; height: 20px" id="rankChart"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
onMounted(() => {
  const chart = echarts.init(document.getElementById("rankChart"));
  const option = {
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        data: [80],
        type: "bar",
        barWidth: 20,
        z: 100,
        itemStyle: {
          borderRadius: 20,
        },
      },
      {
        data: [100],
        type: "bar",
        barWidth: 20,
        barGap: "-100%",
        itemStyle: {
          borderRadius: 20,
          color: "transparent",
          borderColor: "#fff",
          borderWidth: 2,
        },
        animation: false,
      },
    ],
    grid: {
      top: 0,
      left: 20,
      right: 20,
      bottom: 0,
    },
  };
  chart.setOption(option);
});
</script>
<script lang="ts">
export default { name: "Rank" };
</script>
<style scoped lang="scss">
.rank {
  flex: 1;
  background: url(../../../images/dataScreen-main-rt.png) no-repeat;
  background-size: cover;
}

.top {
  width: 100%;
  height: 45px;
  background: url(../../../images/rankingChart-bg.png) no-repeat;
  background-size: contain;
  color: orange;
  display: flex;
  margin-top: 25px;
  margin-left: 10px;
  padding-left: 20px;
  align-items: center;
  text-align: center;
}

.body {
  margin-top: 10px;
  margin-left: 10px;
  padding-left: 20px;

  .bodyitem {
    display: flex;
    text-align: center;
    align-items: center;
  }
}
</style>

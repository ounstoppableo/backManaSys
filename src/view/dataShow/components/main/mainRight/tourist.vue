<template>
  <div class="tourist">
    <div>年度游客量对比</div>
    <img src="../../../images/dataScreen-title.png" />
    <div id="chart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
onMounted(() => {
  const chart = echarts.init(document.getElementById("chart"));
  const option = {
    xAxis: {
      type: "category",
      data: ["1", "2", "3", "4", "5", "6", "8", "9", "10", "11", "12"],
      boundaryGap: false,
      nameTextStyle: {
        color: "#fff",
      },
      axisLabel: {
        color: "#fff",
      },
    },
    yAxis: {
      type: "value",
      name: "人数/万",
      splitLine: {
        show: false,
      },
      nameTextStyle: {
        color: "#fff",
      },
      axisLabel: {
        color: "#fff",
      },
    },
    legend: {
      right: 10,
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        name: "2021",
        data: [0, 300, 200, 400, 500, 300, 400, 600, 300, 500, 200, 100],
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#6F5F42", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "transparent", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        name: "2022",
        data: [0, 500, 300, 400, 500, 400, 400, 700, 300, 500, 300, 200],
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "hotpink", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "transparent", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        name: "2023",
        data: [0, 400, 300, 200, 500, 400, 400, 700, 300, 200, 200, 100],
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "skyblue", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "transparent", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
    grid: {
      top: 65,
      left: 50,
      right: 30,
      bottom: 25,
    },
  };
  chart.setOption(option);
});
</script>
<script lang="ts">
export default { name: "Tourist" };
</script>
<style scoped lang="scss">
.tourist {
  flex: 1;
  background: url(../../../images/dataScreen-main-rc.png) no-repeat;
  background-size: cover;
}
</style>

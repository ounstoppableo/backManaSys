<template>
  <div class="line">
    <div>未来7天游客量趋势图</div>
    <img src="../../../images/dataScreen-title.png" />
    <div id="lineCharts" style="width: 100%; height: 180px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
onMounted(() => {
  const chart = echarts.init(document.getElementById("lineCharts"));
  const option = {
    xAxis: {
      type: "category",
      data: ["05/04", "05/05", "05/06", "05/07", "05/08", "05/09", "05/10"],
      boundaryGap: false,
      axisLabel: {
        color: "#fff",
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: "#fff",
      },
    },
    series: [
      {
        data: [200, 502, 300, 620, 1290, 700, 1320],
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
    ],
    grid: {
      top: 40,
      left: 50,
      right: 30,
      bottom: 20,
    },
  };
  chart.setOption(option);
});
</script>
<script lang="ts">
export default { name: "Line" };
</script>
<style scoped lang="scss">
.line {
  flex: 0.3;
  color: #fff;
  font-size: 20px;
  background: url(../../../images/dataScreen-main-cb.png) no-repeat;
  background-size: cover;
  margin: 0 25px;
}
</style>

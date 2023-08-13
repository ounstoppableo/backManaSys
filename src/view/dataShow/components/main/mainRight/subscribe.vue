<template>
  <div class="subscribe">
    <div>预约渠道数据统计</div>
    <img src="../../../images/dataScreen-title.png" />
    <div id="subChart" style="height: 300px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
onMounted(() => {
  const chart = echarts.init(document.getElementById("subChart"));
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      left: 30,
      top: "center",
      orient: "vertical",
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        left: 80,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
    grid: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    },
  };
  chart.setOption(option);
});
</script>
<script lang="ts">
export default { name: "Subscribe" };
</script>
<style scoped lang="scss">
.subscribe {
  flex: 1;
  background: url(../../../images/dataScreen-main-rb.png) no-repeat;
  background-size: cover;
}
</style>

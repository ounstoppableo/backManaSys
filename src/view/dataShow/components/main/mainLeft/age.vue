<template>
  <div class="bottom">
    <div>年龄比例</div>
    <img src="../../../images/dataScreen-title.png" />
    <div style="width: 100%; height: 300px" id="ageCharts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted } from "vue";
onMounted(() => {
  let ageCharts = echarts.init(document.getElementById("ageCharts"));
  const ageOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "20%",
      right: "8%",
      orient: "vertical",
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
      data: [
        { name: "10岁以下" },
        { name: "10~18岁" },
        { name: "18~30岁" },
        { name: "30~40岁" },
        { name: "40~60岁" },
        { name: "60岁以上" },
      ],
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inner",
          color: "#fff",
          formatter: "{d}%",
          fontSize: 16,
        },
        right: "20%",
        height: "330",
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 16, name: "10岁以下" },
          { value: 8, name: "10~18岁" },
          { value: 12, name: "18~30岁" },
          { value: 24, name: "30~40岁" },
          { value: 20, name: "40~60岁" },
          { value: 20, name: "60岁以上" },
        ],
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  };
  ageCharts.setOption(ageOption);
});
</script>
<script lang="ts">
export default { name: "Age" };
</script>
<style scoped lang="scss">
.bottom {
  flex: 1;
  background: url(../../../images/dataScreen-main-lb.png) no-repeat;
  background-size: cover;
}
</style>

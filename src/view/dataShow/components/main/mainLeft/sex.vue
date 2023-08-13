<template>
  <div class="middle">
    <div>男女比例</div>
    <img src="../../../images/dataScreen-title.png" />
    <div class="sexImg">
      <div class="man">
        <span>男士</span>
        <img src="../../../images/man.png" alt="" />
      </div>
      <div class="woman">
        <span>女士</span>
        <img src="../../../images/woman.png" alt="" />
      </div>
    </div>
    <div style="width: 250px; margin: 0 auto; margin-top: 20px">
      <div
        style="display: flex; justify-content: space-between; font-size: 14px"
      >
        <span>男士58%</span><span>女士42%</span>
      </div>
      <div id="sexCharts" style="height: 30px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";
onMounted(() => {
  //性别比例图
  let sexCharts = echarts.init(document.getElementById("sexCharts"));
  let sexOption = {
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        data: [58],
        type: "bar",
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: "#007AFE",
          borderRadius: 20,
        },
      },
      {
        data: [100],
        type: "bar",
        barWidth: 20,
        barGap: "-100%",
        itemStyle: {
          color: "hotpink",
          borderRadius: 20,
        },
      },
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };
  sexCharts.setOption(sexOption);
});
</script>
<script lang="ts">
export default { name: "Sex" };
</script>
<style scoped lang="scss">
.middle {
  flex: 1;
  background: url(../../../images/dataScreen-main-lc.png) no-repeat;
  background-size: cover;
}

.sexImg {
  margin-top: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 40px;

  .man {
    width: 110px;
    height: 110px;
    background: url(../../../images/man-bg.png) 50% 50% / contain no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    img {
      width: 60px;
    }
  }

  .woman {
    width: 110px;
    height: 110px;
    background: url(../../../images/woman-bg.png) 50% 50% / contain no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    img {
      width: 60px;
    }
  }
}
</style>

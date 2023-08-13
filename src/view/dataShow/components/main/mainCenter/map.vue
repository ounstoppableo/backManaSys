<template>
  <div class="map">
    <p class="warn"><span>平台高峰预警信息(2条)</span></p>
    <div style="width: 100%; height: 100%">
      <p class="mapTitle">景区实时客流量</p>
      <div id="china" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import geoJson from "@/coordinate.json";
import { onMounted } from "vue";
import { GeoJSONSourceInput } from "echarts/types/src/coord/geo/geoTypes";
onMounted(() => {
  echarts.registerMap("china", {
    geoJSON: geoJson as GeoJSONSourceInput,
  } as any);
  var chart = echarts.init(document.getElementById("china"));
  chart.setOption({
    geo: [
      {
        type: "map",
        map: "china",
        //控制地图颜色
        itemStyle: {
          //区域颜色
          areaColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#033682", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#041F44", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          //地图边框
          borderColor: "#03CCFD",
        },
        //控制标签文字
        label: {
          show: true,
          color: "#fff",
        },
        zoom: 1.5,
        top: "23%",
        //高亮显示控制
        emphasis: {
          itemStyle: {
            areaColor: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#003E8E", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#217EAE", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          label: {
            show: true,
            color: "#fff",
            fontSize: 16,
          },
        },
      },
    ],
    series: [
      {
        type: "lines",
        polyline: true,
        coordinateSystem: "geo",
        effect: {
          show: true,
          symbol:
            "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",
          color: "#fff",
          symbolSize: 10,
        },
        data: [
          {
            coords: [
              [111.953598, 24.64733],
              [116.405285, 39.904989],
            ],
            lineStyle: {
              color: "#fff",
              width: 2,
            },
          },
        ],
      },
    ],
  });
});
</script>
<script lang="ts">
export default { name: "Map" };
</script>
<style scoped lang="scss">
.map {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .warn {
    color: white;
    width: 60%;
    height: 50px;
    margin-top: 15px;
    text-align: center;
    background: url(../../../images/dataScreen-header-warn-bg.png) no-repeat;
    background-size: contain;
    padding-top: 10px;
  }
}

.mapTitle {
  float: left;
  margin-left: 30px;
  width: 100%;
  height: 30px;
  background: url(../../../images/map-title-bg.png) no-repeat;
  background-size: contain;
  color: #fff;
  font-size: 20px;
  line-height: 30px;
  padding-left: 30px;
}
</style>

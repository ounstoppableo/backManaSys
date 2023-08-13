<template>
  <svg :width="width" :height="height">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
<script setup lang="ts">
defineProps({
  //接收前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  //接收名字
  name: String,
  //接收颜色
  color: {
    type: String,
    default: "",
  },
  //接收宽高
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>
<style></style>

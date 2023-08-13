<template>
  <img
    src="@\..\public\loading.gif"
    ref="img"
    alt=""
    :style="{ width, height, 'object-fit': 'cover' }"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["imgSrc", "width", "height"]);
const img = ref();
function lazyLoad() {
  const IMG = new Image();
  IMG.src = props.imgSrc;
  IMG.onload = () => {
    img.value.src = IMG.src;
  };
}
lazyLoad();
</script>
<script lang="ts">
export default { name: "LazyLoadImg" };
</script>
<style scoped lang="scss"></style>

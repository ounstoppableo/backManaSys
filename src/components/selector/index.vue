<template>
  <el-card style="margin: 1.25rem">
    <div style="display: flex; justify-content: space-evenly">
      <div class="m-4" style="display: flex; align-items: center">
        <p style="margin-right: 0.3125rem">一级分类</p>
        <el-select
          v-model="selectorData.cate1Id"
          placeholder="请选择"
          style="width: 240px"
          :disabled="scence !== 0"
        >
          <el-option
            v-for="item in selectorData.cate1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="m-4" style="display: flex; align-items: center">
        <p style="margin-right: 0.3125rem">二级分类</p>
        <el-select
          v-model="selectorData.cate2Id"
          placeholder="请选择"
          style="width: 240px"
          :disabled="scence !== 0"
        >
          <el-option
            v-for="item in selectorData.cate2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="m-4" style="display: flex; align-items: center">
        <p style="margin-right: 0.3125rem">三级分类</p>
        <el-select
          v-model="selectorData.cate3Id"
          placeholder="请选择"
          style="width: 240px"
          :disabled="scence !== 0"
        >
          <el-option
            v-for="item in selectorData.cate3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import selector from "@/store/modules/selector.ts";
import { watch, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
const selectorData = selector();
defineProps(["scence"]);
//获取分类
selectorData.getAllcate1();
watch(
  () => selectorData.cate1Id,
  async () => {
    //cate1Id发生变化后，清空cate2和cate3的id
    selectorData.cate2Id = "";
    selectorData.cate3Id = "";
    if (selectorData.cate1Id) {
      try {
        await selectorData.getAllcate2();
      } catch (err) {
        ElMessage.error({
          message: "获取分类失败，请刷新重试",
        });
      }
    }
  },
);
watch(
  () => selectorData.cate2Id,
  async () => {
    //cate2Id发生变化后，清空cate3的id
    selectorData.cate3Id = "";
    if (selectorData.cate2Id) {
      try {
        await selectorData.getAllcate3();
      } catch (err) {
        ElMessage.error({
          message: "获取分类失败，请刷新重试",
        });
      }
    }
  },
);
//切换页面后清除仓库
onBeforeUnmount(() => {
  selectorData.clearStore();
});
</script>
<script lang="ts">
export default { name: "Selector" };
</script>
<style scoped lang="scss"></style>

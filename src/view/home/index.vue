<template>
  <div>
    <el-card style="margin: 1.25rem">
      <div style="display: flex; align-items: center">
        <img
          :src="userData.avatar"
          style="
            border-radius: 50%;
            width: 6.25rem;
            height: 6.25rem;
            margin-right: 1.25rem;
          "
        />
        <div>
          <h1 style="font-size: 1.875rem; font-weight: 800">
            {{ getTime() }}呀！{{ userData.username }}
          </h1>
          <div
            style="color: skyblue; font-style: italic; margin-top: 0.9375rem"
          >
            backManaSys
          </div>
        </div>
      </div>
    </el-card>
    <div style="text-align: center">
      <SvgIcon name="welcome" width="500px" height="500px"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userInfo } from "@/store/modules/user";
import getTime from "@/utils/getTime";
import SvgIcon from "@/components/SvgIcon/svg-icon.vue";
const userData = userInfo();
</script>
<script lang="ts">
export default { name: "MainHome" };
</script>
<style scoped lang="scss"></style>

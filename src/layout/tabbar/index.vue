<template>
  <div class="tabbar">
    <!--左部导航栏模块-->
    <div class="tabbarLeft">
      <!-- 菜单栏折叠按钮 -->
      <el-icon class="hidenMenu" @click="hidenMenu">
        <component :is="hidenMenuIcon" />
      </el-icon>
      <!--面包屑导航-->
      <el-breadcrumb separator-icon="ArrowRight" class="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          :to="item.path"
        >
          <el-icon style="vertical-align: middle">
            <component :is="item.meta.icon"></component>
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--右部导航栏模块-->
    <div class="tabbarRight">
      <el-button icon="Refresh" circle @click="refresh" />
      <el-button icon="FullScreen" circle @click="fullScreen" />
      <el-popover placement="top-start" title="主题设置" :width="200">
        <template #reference>
          <el-button icon="Setting" circle />
        </template>
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker v-model="color" @change="themeChange" />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="switchValue"
              size="large"
              active-icon="Moon"
              inactive-icon="Sunny"
              inline-prompt
            />
          </el-form-item>
        </el-form>
      </el-popover>
      <img :src="userData.avatar" />
      <el-dropdown>
        <span class="el-dropdown-link"
          >{{ userData.username
          }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="userData.username" @click="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, watch } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
//获取layout状态配置数据
import layoutSetting from "@/store/modules/setting";
//获取用户信息
import { userInfo } from "@/store/modules/user";
import { ElNotification } from "element-plus";
//取色器默认颜色
const color = ref(localStorage.getItem("color") || "#409EFF");
document.documentElement.style.setProperty("--el-color-primary", color.value);
//开关的控制
const switchValue = ref(false);
watch(switchValue, (value) => {
  const html = document.documentElement;
  html.className = value ? "dark" : "";
});
let hidenMenuIcon = ref("Expand");
const layoutData = layoutSetting();
function hidenMenu() {
  layoutData.hidenMenuFlag = !layoutData.hidenMenuFlag;
  hidenMenuIcon.value = layoutData.hidenMenuFlag ? "Fold" : "Expand";
}
//主题颜色变化的回调
function themeChange(value: string) {
  localStorage.setItem("color", value);
  document.documentElement.style.setProperty(`--el-color-primary`, value);
}
//获取当前路由,以渲染面包屑
const $route = useRoute();
//刷新按钮
function refresh() {
  layoutData.mainFresh = false;
  nextTick(() => {
    layoutData.mainFresh = true;
  });
}
//全屏按钮
function fullScreen() {
  document.fullscreenElement
    ? document.exitFullscreen()
    : document.documentElement.requestFullscreen();
}

//获取用户信息
const userData = userInfo();

//登出
//获取编程式路由接口，用于跳转页面
const $router = useRouter();
async function logout() {
  try {
    await userData.logOut();
    ElNotification.success({
      message: "退出成功",
      duration: 1000,
    });
  } catch (err) {
    ElNotification.error({
      message: "token过期",
      duration: 1000,
    });
  } finally {
    $router.push({
      path: "/login",
      query: {
        redirect: $route.path,
      },
    });
  }
}
</script>
<script lang="ts">
export default { name: "Tabbar" };
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.0625rem solid #ddd;

  .tabbarLeft {
    display: flex;
    align-items: center;

    .hidenMenu {
      margin: 0 0.9375rem;
      cursor: pointer;
    }
  }

  .tabbarRight {
    margin-right: 0.625rem;
    display: flex;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-left: 0.625rem;
      margin-right: 0.3125rem;
    }
  }
}
</style>

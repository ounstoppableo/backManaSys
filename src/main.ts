import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
const app = createApp(App);
//配置全局样式
import "@/style/index.scss";
//配置svg
import "virtual:svg-icons-register";
//引入全局组件
import globalComponents from "@/components";
//引入element
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
//引入element-icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import pinia from "@/store/index";
//引入路由守卫
import "@/permission";
//引入nprogress
import "nprogress/nprogress.css";
//引入暗黑模式
import "element-plus/theme-chalk/dark/css-vars.css";
//引入自定义指令的创建函数
import directive from "./directive";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia);
app.use(globalComponents);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(directive);
app.mount("#app");

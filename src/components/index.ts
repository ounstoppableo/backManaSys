import SvgIcon from "@/components/SvgIcon/svg-icon.vue";
import Selector from "@/components/selector/index.vue";
interface globalComponents {
  [index: string]: any;
}
const allGlobalComponents: globalComponents = { SvgIcon, Selector };
//配置全局组件的注册
export default {
  //main.ts中app.use()会自动调用install方法,并且传入app参数
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key]);
    });
  },
};

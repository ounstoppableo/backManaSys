import { userInfo } from "./store/modules/user";
const userData = userInfo();
//自定义指令
export default {
  install(app: any) {
    app.directive("hasBtnAuth", {
      mounted(el: any, binding: any) {
        const filter = userData.btnAuth.filter(
          (item) => item === binding.value,
        );
        if (!filter.length) {
          el.remove();
        }
      },
    });
  },
};

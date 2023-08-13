import router from "@/router/index";
import { userInfo } from "@/store/modules/user";
import pinia from "@/store/index";
import NProgress from "nprogress";
import { SET_TOKEN } from "@/utils/rewriteLocalStorage";
import { ElNotification } from "element-plus";
const getUserInfo = userInfo(pinia);

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  NProgress.configure({ showSpinner: false });
  if (getUserInfo.token) {
    if (to.path === "/login") {
      next("/home");
    } else {
      try {
        await getUserInfo.setUserInfo();
        if (getUserInfo.username) {
          if (to.path === "/login") {
            next("/home");
          } else {
            if (router.hasRoute(to.name as any)) {
              next();
            } else {
              next({ ...to, replace: true });
            }
          }
        }
      } catch (err) {
        getUserInfo.token = null;
        SET_TOKEN("");
        ElNotification.error({
          message: err as string,
          duration: 1000,
        });
        next({
          name: "login",
          query: { redirect: from.path },
        });
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});

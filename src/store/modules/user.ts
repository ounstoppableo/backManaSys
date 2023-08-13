import { defineStore } from "pinia";
//引入登录接口请求相关数据的类型
import type { loginForm, loginRes, getUserInfo } from "@/api/user/type.ts";
//引入user小仓库的state数据的类型
import type { UserState } from "./types/types";
//引入登录接口请求函数
import { reqLogin, reqUserInfo, exitLogin } from "@/api/user/index";
//引入设置本地存储token的函数
import { SET_TOKEN } from "@/utils/rewriteLocalStorage";
//引入常量路由
import { constRoutes } from "@/router/routes";
//引入异步路由
import { asyncRoutes } from "@/router/routes";
//引入路由过滤函数
import { filterRoutes } from "@/router/routes";
//引入任意路由
import { anyRoutes } from "@/router/routes";
//引入router
import router from "@/router";

export const userInfo = defineStore("userInfo", {
  state(): UserState {
    return {
      token: localStorage.getItem("TOKEN"),
      username: "",
      avatar: "",
      myRoutes: constRoutes,
      btnAuth: [],
    };
  },
  actions: {
    //用户登录逻辑的具体实现
    async userLogin(userForm: loginForm): Promise<string> {
      const resData: loginRes = await reqLogin(userForm);
      if (resData.code === 200) {
        this.token = resData.data;
        //将响应的token加入到state中以及本地存储
        SET_TOKEN(resData.data as string);
        return "ok";
      } else {
        return Promise.reject(resData.data);
      }
    },
    // 获取用户信息
    async setUserInfo(): Promise<string> {
      const res: getUserInfo = await reqUserInfo();
      if (res.code === 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        this.btnAuth = res.data.buttons;
        const hasAutoRoutes = filterRoutes(res.data.routes, asyncRoutes);
        this.myRoutes = [...constRoutes, ...hasAutoRoutes];
        hasAutoRoutes.forEach((route) => router.addRoute(route));
        router.addRoute(anyRoutes);
        return "ok";
      } else {
        return Promise.reject(res.message);
      }
    },
    //退出登录
    async logOut(): Promise<string> {
      const res = await exitLogin();
      if (res.code === 200) {
        this.token = null;
        SET_TOKEN("");
        return "ok";
      } else {
        return Promise.reject(res.message);
      }
    },
  },
  getters: {},
});

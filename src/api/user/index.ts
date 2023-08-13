import request from "@/utils/request";
import type { loginForm, loginRes, getUserInfo } from "./type";
enum API {
  LOGIN_URL = "/api/admin/acl/index/login",
  USERINFO_URL = "/api/admin/acl/index/info",
  EXITLOGIN_URL = "/api/admin/acl/index/logout",
}
//用户登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginRes>(API.LOGIN_URL, data);
//获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, getUserInfo>(API.USERINFO_URL);
//退出登录
export const exitLogin = () => request.post<any, any>(API.EXITLOGIN_URL);

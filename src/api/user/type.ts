//登录时data的类型
export interface loginForm {
  username: string;
  password: string;
}

//登录接口服务器返回值的类型
export interface loginRes {
  code: number;
  message: string;
  data: string | null;
  ok: boolean;
}

//获取用户信息接口服务器返回值的类型
export interface getUserInfo {
  code: number;
  data: dataType;
  message: string;
  ok: boolean;
}
interface dataType {
  avatar: string;
  buttons: Array<any>;
  name: string;
  roles: Array<any>;
  routes: Array<any>;
  message: string;
  ok: boolean;
}

//退出登录接口服务器返回值的类型
export interface loginRes {
  code: number;
  message: string;
  data: string | null;
  ok: boolean;
}

//定义小仓库state类型
export interface UserState {
  token: string | null;
  username: string;
  avatar: any;
  myRoutes: Array<any>;
  btnAuth: Array<any>;
}

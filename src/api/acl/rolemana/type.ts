//给用户添加角色时的请求体
export interface roleForm {
  roleIdList: number[];
  userId: number | string;
  username?: string;
}
export interface CommonRes<T> {
  code: number;
  data: T;
  message: string;
  ok: boolean;
}
export interface dataType {
  countId: null | number;
  current: number;
  hitCount: boolean;
  maxLimit: null | number;
  optimizeCountSql: boolean;
  orders: Array<any>;
  pages: number;
  records: Array<recordItem>;
  searchCount: boolean;
  size: number;
  total: number;
}
//records项的类型
export interface recordItem {
  createTime: Date;
  updateTime: Date;
  id: number;
  remark: null | string;
  roleName: string;
}
//添加角色的请求体
export interface addRoleForm {
  createTime?: Date;
  id: number | string;
  remark?: string;
  roleName: string;
  updateTime?: Date;
}

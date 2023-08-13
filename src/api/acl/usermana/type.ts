//data的数据类型
export interface dataType {
  countId: null | number;
  current: number;
  hitCount: boolean;
  maxLimit: null | number;
  optimizeCountSql: boolean;
  orders: Array<any>;
  pages: number;
  records: Array<recordsItem>;
  searchCount: boolean;
  size: number;
  total: number;
}
//records项的数据类型
export interface recordsItem {
  createTime: Date;
  id: number;
  name: string;
  password: string;
  phone: null | string;
  roleName: string;
  updateTime: Date;
  username: string;
}

//编辑/添加用户的参数类型
export interface UpdateUser {
  createTime?: Date;
  id: number | string;
  name: string;
  password: string;
  phone?: string;
  roleName?: string;
  updateTime?: Date;
  username: string;
}
//通用响应类型
export interface commonRes<T> {
  code: number;
  data: T;
  message: string;
  ok: boolean;
}

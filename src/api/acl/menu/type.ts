export interface CommonRes<T> {
  code: number;
  data: T;
  message: string;
  ok: boolean;
}
//请求菜单权限返回的数据类型

export interface menuResDataItem {
  children: menuResDataItem[];
  code: null | string;
  createTime: Date;
  id: number;
  level: number;
  name: string;
  pid: number;
  select: boolean;
  status: number | null;
  toCode: number | null;
  type: number;
  updateTime: Date;
}
export interface AddMenuFormType {
  children?: AddMenuFormType[];
  code?: null | string;
  createTime?: Date;
  id?: number | string;
  level: number;
  name: string;
  pid: number | string;
  select?: boolean;
  status?: number | null;
  toCode?: number | null;
  type?: number;
  updateTime?: Date;
}

//获取品牌接口的响应
export interface brandRes {
  code: number;
  data: brandDataType | null;
  message: string;
  ok: boolean;
}
//获取品牌接口的响应的data字段
export interface brandDataType {
  current: number;
  pages: number;
  records: Array<recordsItem>;
  searchCount: boolean;
  size: number;
  total: number;
}
//records数组的单元字段
export interface recordsItem {
  id: number;
  tmName: string;
  logoUrl: string;
}
//修改品牌接口的响应
export interface changeRes {
  code: number;
  data: string | null;
  message: string;
  ok: boolean;
}
//添加品牌接口上传数据的类型
export interface AddBrand {
  id: number | string;
  logoUrl: string;
  tmName: string;
}

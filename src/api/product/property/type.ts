//分类请求返回的数据
export interface cateRes {
  code: number;
  data: Array<dataType>;
  message: string;
  ok: boolean;
}
export interface dataType {
  id: number;
  name: string;
}
//添加属性接口上传的数据
export interface AddProperty {
  attrName: string;
  attrValueList: Array<attrValueItem>;
  categoryId: number | string;
  categoryLevel: number | string;
  id: number | string;
}
//添加属性/删除属性接口返回值
export interface AddPropertyRes {
  code: number;
  data: string | null;
  message: string;
  ok: boolean;
}
//attrValueList的item项
export interface attrValueItem {
  attrId: number | string;
  id: number | string;
  valueName: string;
  flag?: boolean;
}

//spu详细信息响应的数据类型
export interface infoDetialRes {
  code: number;
  data: infoDetial | null | string;
  message: string;
  ok: boolean;
}
//spu详细信息的数据类型
export interface infoDetial {
  category3Id: number | string;
  description: string;
  id: number | string;
  spuImageList: spuImageListItem[] | null;
  spuName: string;
  spuSaleAttrList: spuSaleAttrListItem[] | null;
  tmId: string | number;
}
//spuImageList每项的数据类型
export interface spuImageListItem {
  id?: number | string;
  imgName: string;
  imgUrl: string;
  spuId?: number | string;
  isDefault?: boolean;
}
//spuSaleAttrList每项的数据类型
export interface spuSaleAttrListItem {
  baseSaleAttrId: number | string;
  id?: number | string;
  saleAttrName: string;
  spuId?: number | string;
  spuSaleAttrValueList: spuSaleAttrValueListItem[] | null;
  flag?: boolean;
}
//spuSaleAttrValueList每项的数据类型
export interface spuSaleAttrValueListItem {
  baseSaleAttrId: number | string;
  id?: number | string;
  isChecked?: any;
  saleAttrName: string;
  saleAttrValueName: string;
  spuId: number | string;
}
//基本属性的响应
export interface baseAttrRes {
  code: number;
  data: baseAttr[];
  message: string;
  ok: boolean;
}
export interface baseAttr {
  id: number | string;
  name: string;
}
//删除和添加的响应
export interface Res {
  code: number;
  data: null | string;
  message: string;
  ok: boolean;
}

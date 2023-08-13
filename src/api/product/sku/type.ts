//添加sku的回调
export interface addSkuRes {
  code: number;
  data: null | string;
  message: string;
  ok: boolean;
}
//获取sku的回调
export interface getSkuRes {
  code: number;
  data: null | getSkuResDataType;
  message: string;
  ok: boolean;
}
export interface getSkuResDataType {
  current: number;
  pages: number;
  records: SkuForm[] | null;
  searchCount: boolean;
  size: number;
  total: number;
}
//sku请求携带的数据类型
export interface SkuForm {
  category3Id: number | string;
  createTime?: Date;
  id?: number;
  isSale?: number;
  price: number | string;
  skuAttrValueList: skuAttrValueListItem[];
  skuDefaultImg?: string;
  skuDesc: string;
  skuImageList: skuImageListItem[];
  skuName: string;
  skuSaleAttrValueList: skuSaleAttrValueListItem[];
  spuId: number | string;
  tmId?: number;
  weight: string | number;
}
//基本属性的类型
export interface skuAttrValueListItem {
  attrId: number;
  attrName: string;
  id?: number;
  skuId: number;
  valueId: number;
  valueName: string;
}
//skuImageList项
export interface skuImageListItem {
  id?: number;
  imgName: string;
  imgUrl: string;
  skuId?: number;
  spuImgId?: number;
  isDefault: boolean;
}
//skuSaleAttrValueList项
export interface skuSaleAttrValueListItem {
  id?: number;
  saleAttrId: number;
  saleAttrName: string;
  saleAttrValueId: number;
  saleAttrValueName: string;
  skuId?: number;
  spuId: number;
}

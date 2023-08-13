import request from "@/utils/request";
import { SkuForm, addSkuRes, getSkuRes } from "./type";
enum API {
  ADD_SKU = "/product/admin/product/saveSkuInfo",
  FIND_BY_SPUID = "/product/admin/product/findBySpuId/",
  FIND_BY_PAGE = "/product/admin/product/list/",
  CANCEL_SALE = "/product/admin/product/cancelSale/",
  ON_SALE = "/product/admin/product/onSale/",
  DEL_SKU = "/product/admin/product/deleteSku/",
  GET_INFO = "/product/admin/product/getSkuInfo/",
}
//添加sku
export const addSku = (data: SkuForm) =>
  request.post<any, addSkuRes>(API.ADD_SKU, data);
//通过spuid获取sku列表
export const showSkuBySpuId = (spuid: number) =>
  request.get<any, getSkuRes>(API.FIND_BY_SPUID + spuid);
//通过页数获取sku列表
export const showSkuByPage = (page: number, limit: number) =>
  request.get<any, getSkuRes>(`${API.FIND_BY_PAGE}/${page}/${limit}`);
//修改上架状态
export const editSale = (isSale: number, skuId: number) => {
  if (isSale) {
    return request.get<any, addSkuRes>(API.ON_SALE + skuId);
  } else {
    return request.get<any, addSkuRes>(API.CANCEL_SALE + skuId);
  }
};
//删除sku
export const delSku = (skuId: number) =>
  request.delete<any, addSkuRes>(API.DEL_SKU + skuId);
//获取sku详情
export const getDetail = (skuId: number) =>
  request.delete<any, any>(API.GET_INFO + skuId);

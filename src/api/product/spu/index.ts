import request from "@/utils/request";
import type { infoDetialRes, baseAttrRes, infoDetial, Res } from "./type";
enum API {
  GET_INDEX = "/product/admin/product",
  GET_BASE_INFO = "/product/admin/product/getSpuById/",
  GET_BASE_ATTR = "/product/admin/product/baseSaleAttrList",
  ADD_SPU = "/product//admin/product/saveSpuInfo",
  UPDATE_SPU = "/product/admin/product/updateSpuInfo",
  DEL_SPU = "/product/admin/product/deleteSpu/",
}
//获取SPU分页信息
export const getIndex = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, any>(
    `${API.GET_INDEX}/${page}/${limit}?category3Id=${category3Id}`,
  );
//获取SPU基本信息
export const getBaseInfo = (spuid: number) =>
  request.get<any, infoDetialRes>(API.GET_BASE_INFO + spuid);
//获取基本商品属性
export const getBaseAttr = () =>
  request.get<any, baseAttrRes>(API.GET_BASE_ATTR);
//添加或修改SPU
export const updateSpu = (data: infoDetial) => {
  if (data.id) {
    return request.post<any, Res>(API.UPDATE_SPU, data);
  } else {
    return request.post<any, Res>(API.ADD_SPU, data);
  }
};
export const delSpu = (spuId: number) =>
  request.delete<any, Res>(API.DEL_SPU + spuId);

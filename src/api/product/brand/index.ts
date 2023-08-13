import request from "@/utils/request";
import type { brandRes, AddBrand, changeRes } from "./type.ts";
enum API {
  BRAND_URL = "/product/admin/product/baseTrademark",
  ADD_URL = "/product/admin/product/baseTrademark/save",
  UPDATE_URL = "/product/admin/product/baseTrademark/update",
  DELETE_URL = "/product/admin/product/baseTrademark/remove/",
}
//获取品牌分页
export const getBrand = (page: number, limit: number) =>
  request.get<any, brandRes>(`${API.BRAND_URL}/${page}/${limit}`);
//添加品牌
export const addBrand = (data: AddBrand) =>
  request.post<any, changeRes>(API.ADD_URL, data);
//更新品牌
export const updateBrand = (data: AddBrand) =>
  request.put<any, changeRes>(API.UPDATE_URL, data);
//删除品牌
export const deleteBrand = (id: number) =>
  request.delete<any, changeRes>(API.DELETE_URL + id);

import request from "@/utils/request";
import type { cateRes, AddProperty, AddPropertyRes } from "./type";
enum API {
  CATEGORY1 = "/product/admin/product/getCategory1",
  CATEGORY2 = "/product/admin/product/getCategory2/",
  CATEGORY3 = "/product/admin/product/getCategory3/",
  GET_PROPERTY = "/product/admin/product/attrInfoList",
  ADD_PROPERTY = "/product/admin/product/saveAttrInfo",
  DEL_PROPERTY = "/product/admin/product/deleteAttr/",
}
//获取所有一级分类
export const getCate1 = () => request.get<any, cateRes>(API.CATEGORY1);
//获取二级分类
export const getCate2 = (cate1Id: number | string) =>
  request.get<any, cateRes>(API.CATEGORY2 + cate1Id);
//获取三级分类
export const getCate3 = (cate2Id: number | string) =>
  request.get<any, cateRes>(API.CATEGORY3 + cate2Id);
//获取商品属性列表
export const getProperty = (
  cate1Id: number | string,
  cate2Id: number | string,
  cate3Id: number | string,
) =>
  request.get<any, any>(`${API.GET_PROPERTY}/${cate1Id}/${cate2Id}/${cate3Id}`);
//添加/修改属性
export const addProperty = (data: AddProperty) =>
  request.post<any, AddPropertyRes>(API.ADD_PROPERTY, data);
//删除属性
export const delProperty = (id: number) =>
  request.delete<any, AddPropertyRes>(API.DEL_PROPERTY + id);

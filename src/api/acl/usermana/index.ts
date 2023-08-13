import request from "@/utils/request";
import type { dataType, UpdateUser, commonRes } from "./type";
import type { roleForm } from "../rolemana/type";
enum API {
  GET_USER = "/api/admin/acl/user",
  ADD_USER = "/api/admin/acl/user/save",
  EDIT_USER = "/api/admin/acl/user/update",
  DEL_USER = "/api/admin/acl/user/remove/",
  DEL_BATCH = "/api/admin/acl/user/batchRemove",
  DISTRI_ROLES = "/api/admin/acl/user/doAssignRole",
  GET_USER_ROLE = "/api/admin/acl/user/toAssign/",
}
//获取用户列表
export const getUser = (page: number, limit: number, keywords?: string) =>
  request.get<any, commonRes<dataType | null>>(
    `${API.GET_USER}/${page}/${limit}${
      keywords ? `?username=${keywords}` : ""
    }`,
  );
//添加或修改用户信息
export const updateUser = (data: UpdateUser) => {
  //有id的情况为修改
  if (data.id) {
    return request.put<any, any>(API.EDIT_USER, data);
  } else {
    return request.post<any, any>(API.ADD_USER, data);
  }
};
//删除用户
export const delUser = (id: number) =>
  request.delete<any, commonRes<string | null>>(API.DEL_USER + id);
//批量删除
export const delBatch = (idList: number[]) =>
  request.delete<any, commonRes<string | null>>(API.DEL_BATCH, {
    data: idList,
  });
//分配角色
export const distriRoles = (data: roleForm) =>
  request.post<any, commonRes<string | null>>(API.DISTRI_ROLES, data);
//获取用户的角色列表
export const getUserRoles = (id: number) =>
  request.get<any, commonRes<any>>(API.GET_USER_ROLE + id);

import request from "@/utils/request";
import type { CommonRes, dataType, addRoleForm } from "./type";
enum API {
  GET_ROLE = "/api/admin/acl/role",
  ADD_ROLE = "/api/admin/acl/role/save",
  UPDATE_ROLE = "/api/admin/acl/role/update",
  DEL_ROLE = "/api/admin/acl/role/remove/",
}
export const getRole = (page: number, limit: number, keywords: string) =>
  request.get<any, CommonRes<dataType>>(
    `${API.GET_ROLE}/${page}/${limit}${
      keywords ? `?roleName=${keywords}` : ""
    }`,
  );
//添加/更新角色
export const updateRole = (data: addRoleForm) => {
  if (data.id) {
    return request.put<any, CommonRes<string | null>>(API.UPDATE_ROLE);
  } else {
    return request.post<any, CommonRes<string | null>>(API.ADD_ROLE);
  }
};
//删除角色
export const delRole = (id: number) =>
  request.delete<any, CommonRes<string | null>>(API.DEL_ROLE + id);

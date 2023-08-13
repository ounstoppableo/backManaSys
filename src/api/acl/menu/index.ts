import request from "@/utils/request";
import { menuResDataItem, CommonRes, AddMenuFormType } from "./type";
enum API {
  GET_MENU_BY_ROLEID = "/api/admin/acl/permission/toAssign/",
  ASSIGN_PERMISSION = "/api/admin/acl/permission/doAssign",
  GET_MENU = "/api/admin/acl/permission",
  ADD_MENU = "/api/admin/acl/permission/save",
  UPDATE_MENU = "/api/admin/acl/permission/update",
  DEL_MENU = "/api/admin/acl/permission/remove/",
}
//通过角色id获取菜单
export const getMenuByRoleId = (id: number) =>
  request.get<any, CommonRes<menuResDataItem[]>>(API.GET_MENU_BY_ROLEID + id);
//分配权限
export const assignPermission = (roleid: number, permissionIds: number[]) =>
  request.post<any, CommonRes<string | null>>(
    API.ASSIGN_PERMISSION + `/?roleId=${roleid}&permissionId=${permissionIds}`,
  );
//获取菜单
export const getMenu = () =>
  request.get<any, CommonRes<menuResDataItem[]>>(API.GET_MENU);
//更新菜单
export const updateMenu = (data: AddMenuFormType) => {
  if (data.id) {
    return request.put<any, CommonRes<string | null>>(API.UPDATE_MENU, data);
  } else {
    return request.post<any, CommonRes<string | null>>(API.ADD_MENU, data);
  }
};
//删除菜单
export const delMenu = (id: number) =>
  request.delete<any, CommonRes<string | null>>(API.DEL_MENU + id);

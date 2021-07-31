import { IRole } from "../interface/types";
import request from "../utils/request";

// 获取权限列表
export const getPermissionList = () => {
  return request({
    url: '/role/permissionList',
    method: 'get',
  })
}

// 获取角色列表
export const getRoleList = (params: any) => {
  return request({
    url: 'role/roleList',
    method: 'get',
    data: { ...params }
  })
}

// 添加角色
export const addRole = (params: any) => {
  return request({
    url: 'role/addRole',
    method: 'post',
    data: {
      ...params
    }
  })
}

// 修改角色
export const updateRole = (params: IRole) => {
  return request({
    url: '/role/updateRole',
    method: 'post',
    data: {
      ...params,
    }
  })
}

// 删除角色
export const deleteRole = (id: string) => {
  return request({
    url: 'role/deleteRole',
    method: 'delete',
    data: {
      id
    }
  })
}
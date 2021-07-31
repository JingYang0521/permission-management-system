import md5 from "blueimp-md5";
import { IUser } from "../interface/types";
import request from "../utils/request";

// 获取用户列表
export const getUserList = (page: number = 1, limit: number = 10) => {
  return request({
    url: '/user/userList',
    method: 'get',
    data: {
      page,
      limit,
    }
  })
}

// 删除用户
export const deleteUser = (id: string) => {
  return request({
    url: '/user/deleteUser',
    method: 'delete',
    data: {
      id
    }
  })
}

// 添加用户
export const addUser = (params: IUser) => {
  if(params.password) {
    params.password = md5(params.password)
  }
  return request({
    url: '/user/addUser',
    method: 'post',
    data: {
      ...params
    }
  })
}

// 修改用户
export const updateUser = (params: IUser) => {
  if(params.password) {
    params.password = md5(params.password)
  }
  return request({
    url: '/user/updateUser',
    method: 'post',
    data: {
      ...params,
    }
  })
}


import md5 from "blueimp-md5";
import request from "../utils/request";

export const login = (username: string, password: string) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: { 
      username, 
      password: md5(password),
      type: 1
    }
  })
}
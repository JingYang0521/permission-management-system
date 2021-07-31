import axios from 'axios'
import { message, Modal } from 'antd';
import NProgress from 'nprogress'
import { clearLocalStorage, getLocalStorageItem } from './storage';

// create an axios instance
const service = axios.create({
  // baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
  baseURL: 'http://127.0.0.1:3000',
  // withCredential: true, // send cookies when cross-domain  requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    NProgress.start();
    config.headers['Autorization'] = getLocalStorageItem('token');
    return config
  },
  error => {
    NProgress.done();
    return Promise.reject(error);
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // Do something before request is sent
    NProgress.done();
    // Do something with response data
    if (response.status === 200) {
      const { code } = response.data;
      if (code === 4003) {
        message.warning('Your status has expired,plz re-login')
        return Promise.reject('Plz re-login')
      } else if (code === 4000) {
        clearLocalStorage();
        return Promise.reject('Fail to be authorized')
      }
      return response
    } else {
      // Do something with request error
      Modal.error({
        title: 'Network error'
      })
      return Promise.reject('Network error')
    }

  },
  error => {
    // Do something with response error
    Modal.error({
      title: 'Network error'
    })
    NProgress.done();
    return Promise.reject(error);
  }
)

export default service;
import axios from 'axios';
import qs from 'qs';
import neteaseRequest from './netease/request';

const instance = axios.create();
instance.defaults.responseType = 'json;text/plain;charset=utf-8;';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
instance.defaults.withCredentials = false;
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 网易云
    if (/^\/netServe/.test(config.url)) {
      config.data = qs.stringify(neteaseRequest(config.data));
    }
    return config;
  },
  (error) => Promise.reject(error),
);
instance.interceptors.response.use(
  (res) => {
    if (res.status >= 200 && res.status < 400) {
      if (res.data) {
        return res.data;
      }
      return Promise.reject(res);
    }
    return res;
  },
  (error) => Promise.reject(error),
);
export default instance;

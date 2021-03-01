import axios from "axios";
import qs from "qs";
import neteaseRequest from "./netease/request";
const instance = axios.create({
  timeout: 1000,
});
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    //网易云
    if (/^\/netServe/.test(config.url)) {
      config.data = qs.stringify(neteaseRequest(config.data));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      if (res.data) {
        return res.data;
      }
      return Promise.reject(res);
    }
    return res;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default instance;

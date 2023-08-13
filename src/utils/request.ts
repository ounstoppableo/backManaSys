import axios from "axios";
//对axios进行二次封装，axios.create方法可以初始化配置，并返回一个新的axios对象
let request = axios.create({
  timeout: 5000,
});
//配置请求拦截器
request.interceptors.request.use((config) => {
  config.headers.token = localStorage.getItem("TOKEN");
  //config.header为请求头，通常会用来添加一些公共请求头
  return config;
});
//配置响应拦截器
request.interceptors.response.use(
  (response) => {
    //进行返回值提取,简化数据
    return response.data;
  },
  (err) => {
    let message: string = "";
    let status: number = err.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "访问被拒绝";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器崩溃了";
        break;
    }
    alert(message);
    return Promise.reject(err);
  },
);
export default request;

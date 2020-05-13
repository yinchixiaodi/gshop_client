/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
5. 每次请求都携带一个userTempId请求头, 数据值在state中s
*/
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
/* 对axios进行二次包装 */
const instance = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

/* 显示请求进度条 */
// 设置请求拦截器
instance.interceptors.request.use((config) => {
  console.log("请求拦截器成功");
  //   显示进度条
  NProgress.start();
  /* 每次请求都携带一个userTempId请求头, 数据值在state中 */
  config.headers.userTempId = store.state.user.userTempId;
  return config;
});

// 设置相应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log("响应拦截器成功");
    // 隐藏进度条
    NProgress.done();
    return response.data;
  },
  (error) => {
    console.log("响应拦截器失败");
    // 隐藏进度条
    NProgress.done();
    alert(`请求出错：${error.massage || "未知错误"}`);
    return Promise.reject(error);
  }
);

export default instance;

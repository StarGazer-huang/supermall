import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  //2.1.axios的拦截器
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   return config
  // }, error => {
  //   console.log(error);
  // })

  //2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, error => {
    console.log(error);
  })

  //3.发送真正的网络请求
  return instance(config)
}



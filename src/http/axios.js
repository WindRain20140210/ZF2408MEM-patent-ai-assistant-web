import axios from 'axios';

// 设置接口超时时间
axios.defaults.timeout = 60000;
// axios.defaults.baseURL = 'http://110.42.103.198:26439'

axios.defaults.baseURL = 'http://110.42.103.198:22440'

// http request 拦截器
axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(response => {
  return response;
}, error => {
  const {response} = error;
  if (response) {
    return Promise.reject(response.data);

  } else {

  }
});

// 封装 GET POST 请求并导出
export function request(url = '', params = {}, type = 'POST') {
  // 设置 url params type 的默认值
  return new Promise((resolve, reject) => {

    let promise
    if (type.toUpperCase() === 'GET') {
      promise = axios({url, params})

    } else if (type.toUpperCase() === 'POST') {
      promise = axios({method: 'POST', url, data: params})
    }

    //处理返回
    promise.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

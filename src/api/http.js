/**
 * Created by superman on 17/2/16.
 * http配置
 */
// http://8.146.201.197:30080/dev/api/user_center/user/token

import axios from 'axios'
// import store from './store/store'
// import * as types from './store/types'
// import router from './router'

// axios 配置
// axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://110.42.103.198:22440'
// axios.defaults.baseURL = 'http://8.146.201.197:30080/dev'


const request = axios.create({
  // baseURL: import.meta.env.VITE_APP_SERVER_URL,
  timeout: 150000, // request Message
});

// http request 拦截器
request.interceptors.request.use(
  config => {
    // if (store.state.token) {
    //   config.headers.Authorization = `token ${store.state.token}`
    // }
    
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

// http response 拦截器
request.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       // 401 清除token信息并跳转到登录页面
    //       store.commit(types.LOGOUT)
          
    //       // 只有在当前路由不是登录页面才跳转
    //       router.currentRoute.path !== 'login' &&
    //         router.replace({
    //           path: 'login',
    //           query: { redirect: router.currentRoute.path },
    //         })
    //   }
    // }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  },
)




// export function request(url = '', params = {}, type = 'POST') {
//   // 设置 url params type 的默认值
//   return new Promise((resolve, reject) => {

//     let promise
//     if (type.toUpperCase() === 'GET') {
//       promise = axios({url, params})

//     } else if (type.toUpperCase() === 'POST') {
//       promise = axios({method: 'POST', url, data: params})
//     }

//     //处理返回
//     promise.then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
// }


export default request;


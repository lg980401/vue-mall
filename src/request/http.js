//引入请求处理相关插件
import {
  baseUrl
} from './environment';
import axios from 'axios'
import router from '../router'
import {
  getAccessToken
} from "../tools/ls";

const API_HOST = baseUrl;
window.API_HOST = API_HOST;

//请求拦截
//请求拦截器
// axios.interceptors.requet.use(
//   config=>{
//     //每次发送请求之前判断vuex中是否存在token
//     //如果存在，则统一在http请求的header上加上token,这样后台根据token判断前端的登陆情况
//     //即使本地存在token,也有可能是过期的，所以在响应拦截器中要对返回状态进行判断
//     const token = store.state.token;
//     token && (config.header.Authorization = token);
//     return config;

//     },
//     error=>{
//       return Promise.error(error);
//     }
// )


//响应拦截器
axios.interceptors.response.use(
  response => {
    //如果返回状态码为200,说明请求接口成功，可以正长拿到数据
    //否则抛出异常
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },

  //如果服务器返回值不是200开头
  //可以根据后端统一错误码
  //然后根据返回的状态进行一些操作,例如登陆过期提示,错误提示等等

  error => {
    if (error.response.status) {

      switch (error.response.status) {
        //401：未登录则跳转到登陆界面,并携带当前页面路径

        case 401:
          router.replace({
            path: '/login',
            query: {
              //登录成功后跳回之前页面
              redirect: router.currentRoute.fullPath
            }
          })
          break;

        case 403:
          //token过期
          this.$message({
            message: '登陆过期,请重新登陆',
            duration: 1000,
            forbidClick: true
          });
          //清除token
          localStorage.removeItem('token');
          //登陆界面可以不用action
          store.commit('loginsuccess', null);
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break;
        case 404:
          this.$message({
            message: '请求网页不存在'

          });
          break;
      }
      return Promise.reject(error.response);
    }
  })
export const ClearRequest = options => {
  return new Promise((resolve, reject) => {
    request(options).then(
      res => {
        const data = res.data;
        resolve(data);
      }
    ).catch(error => {
      reject(error)
    })
  });
}

//axios请求库方法
function request(options) {
  const {
    url,
    method = 'GET',
    isLogin = false,
    auth = true,
    qs,
    body
  } = options;

  //组装头部
  const HEADERS = {
    "Content-Type": 'application/json; charset=UTF-8',
  };

  //是否开启token验证
  if (auth) {
    HEADERS.Authorization = getAccessToken();
  }

  return axios({

    baseURL: API_HOST,
    url: url,
    headers: HEADERS,
    method: isLogin ? 'POST' : method,
    data: body,
    params: qs,

  });

}

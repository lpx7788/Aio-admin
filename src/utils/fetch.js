import axios from 'axios'
// import { Toast } from 'vant';

// 遮罩层组件
// 消息通知组件
// import {Notification} from 'element-ui'
import projectConfig from './projectConfig'
// 数据加载条显示组件

// 创建axios实例,用于请求后台,进行数据的交换
const service = axios.create({
  // baseURL:'http://192.168.0.230:9091/',
  baseURL:'https://adminapi.manytrader.net/',
  timeout: 50000  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})

// response,服务器端返回拦截器
service.interceptors.response.use(
  response => {

    if (response.headers['content-type'].indexOf('text/html') !== -1) {
      return response.data
    }
    // Toast('提示内容');
    let res = response.data
    if (res.errorCode === projectConfig.RESPONSE_CODE_ERROR_SERVER_ERROR) {
      // if(_message){
      //   Toast(_message);
      // }
    } else {
      // 业务处理成功信息 success
      // 200 正常
      const _message = res.errorMsg
      if (res.errorCode !== projectConfig.RESPONSE_CODE_SUCESS && _message !== '') {
        if(_message){
          // Toast(_message);
        }
      }
      return response.data
    }
  },
  error => {
    if(error.message){
      // Toast(error.message);
    }
    return Promise.reject(error)
  }
)

export default service

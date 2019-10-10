import axios from 'axios'
import ENV_LIST from './host_config'
import { message } from 'antd'
import projectConfig from './projectConfig'
const service = axios.create({
  baseURL: ENV_LIST[process.env.NODE_ENV].adminHostName,
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
    let res = response.data
    const _message = res.errorMsg
    if (res.errorCode === projectConfig.RESPONSE_CODE_ERROR_SERVER_ERROR) {
      if(_message){
        message.info(_message);
      }
    } else {
      // 200 正常
      if (res.errorCode !== projectConfig.RESPONSE_CODE_SUCESS && _message !== '') {
        if(_message){
          message.info(_message);
        }
      }
      return response.data
    }
  },
  error => {
    if(error.message){
      message.info(error.message);
    }
    return Promise.reject(error)
  }
)

export default service

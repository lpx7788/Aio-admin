import fetch from './fetch'
import ENV_LIST from './host_config'

/**
 * 此js 根据fetch.js 封装了一些http请求的方法
 */
export default class httpClient {
  /**
   * post请求
   * @param {*} postUrl
   * @param {*} param 参数
   * @return 请求结果
   */
  static request (postUrl, param,method,baseURL) {
    let headers = {}
    // headers['X-Requested-With'] = 'XMLHttpRequest'
    // if (param.token !== undefined) {
      headers['access_token'] = 'e9b68b96ef3648adb99c1a8a9a3b12c3_f3914e67123e47b8acb46e557e9243dc'
    // }
    let params = {
      url: postUrl,
      method: method?method:'post',
      data: param,
      headers: headers
    }
    if(baseURL) params.baseURL = ENV_LIST[process.env.NODE_ENV].apiHostName
    return new Promise((resolve, reject) => {
      fetch(params)
      .then(res => {
        resolve(res)
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}


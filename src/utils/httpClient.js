import fetch from './fetch'

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
  static request (postUrl, param,method) {
    let headers = {}
    headers['X-Requested-With'] = 'XMLHttpRequest'
    if (param.token !== undefined) {
      headers['access_token'] = param.token
    }
    return new Promise((resolve, reject) => {
      fetch({
        url: postUrl,
        method: method?method:'post',
        data: param,
        headers: headers
      }).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}


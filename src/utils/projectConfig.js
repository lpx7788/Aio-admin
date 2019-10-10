/**
 * 项目配置文件
 * 配置状态码
 * 请求URL等
 */

 export default class projectConfig {

  // 返回状态码 =========================.start
  static RESPONSE_CODE_ERROR_SERVER_ERROR = 500; // 500 系统内部异常
  static RESPONSE_CODE_SUCESS = '0000';
  static PROJECT_HOST_NAME = process.env.PROJECT_HOST_NAME;
  static API_HOST_NAME = process.env.HOST_NAME;
  
  // 项目接口 =========================.start
  static GET_HOMECOUNT = 'v1.0/app/count';//首页获取数据
  static GET_COMPANYlIST = 'v1.0/company/query';//入驻申请
  static GET_USER_LIST = 'v1.0/user/company/query';//用户列表
  static GET_COMPANY_DETAIL = '/v1.0/company/detail';//公司详情
  static GET_CUSTOMER_LIST = '/v1.1/company/customers';//客户列表

  // 商城接口
  static GET_CATEGORY_TREE = '/category/tree';//品种树
}

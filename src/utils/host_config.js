const ENV_LIST = {
    development:{
      envName: 'development',
      apiHostName: 'http://192.168.0.230:8080',// 本地环境 商城后台接口连接地址 
      adminHostName: 'http://192.168.0.230:9091',// 本地环境 运营后台接口连接地址
    },
    test:{
      envName: 'test',
      apiHostName: 'http://192.168.0.230:8081',// 测试环境 商城后台接口连接地址 
      adminHostName: 'http://192.168.0.230:9091',// 测试环境 运营后台接口连接地址
    },
    production:{
      envName: 'production',
      apiHostName: 'https://aio.manytrader.net',// 正式环境 商城后台接口连接地址 
      adminHostName: 'https://adminapi.manytrader.net',// 正式环境 运营后台接口连接地址
    }
}

module.exports = ENV_LIST 
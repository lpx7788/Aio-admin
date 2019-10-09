##基于react+antd+react-router+redux 后台管理系统

##运行环境说明
> react V16.2.0

> react-router-dom V4.2.2

> antd V3.23.4

> node V6.11.0


## 项目说明

    本项目是基于React的脚手架crate-react-app,增加了less,antd,
    react-router使用的最新的4.2。像子组件接受不到路由，可以使用withRouter

## 技术文档
- [React](https://facebook.github.io/react/)
- [React-router](https://reacttraining.com/react-router/web/example/basic)
- [React-router中文文档](http://reacttraining.cn/web/example/basic)
- [Ant Design of React](http://design.alipay.com/develop/web/docs/introduce)
- [Babel](https://babeljs.io/)
- [webpack](https://webpack.github.io/)

## 使用项目

- 1.克隆项目  git clone
- 2.切换到项目根目录 cd  react-antd-admin-simplateTemplate
- 3.安装依赖包 npm install 
- 4.启动服务 npm start / npm run satrt
- 5.打包构建 npm build / npm run build
- 6.登录   18126823343    a123456b



## 目录结构
```shell
├── build                           // 构建相关  
├── public                          // 公用模板
├── src                             // 源代码
│   ├── api                         // 所有请求
│   ├── assets                      // 存放图片等静态资源
│   ├── components                  // 全局公用组件
│   ├── mock                        // 项目mock 模拟数据
│   ├── router                      // 路由
│   │   ├── asyncComponent          //路由按需加载
│   │   ├── index                   //路由管理
│   ├── utils                       // 全局公用方法
│   ├── views                       // 页面文件
│   ├── index.css                   // 全局css样式
│   ├── index.js                    // 入口js 初始化 加载组件等
│   ├── logo.svg                    // log图标
│   └── registerServiceWorker.js    // 本地创建service worker 
├── .gitignore                      // git 忽略项
└── package.json                    // package.json

```



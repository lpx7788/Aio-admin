import React from 'react'
import ReactDOM from 'react-dom'
import '../src/assets/less/index.less'
import Routers from './router/index'
import 'antd/dist/antd.css';
import registerServiceWorker from './registerServiceWorker'
import httpClient from './utils/httpClient'
import projectConfig from './utils/projectConfig'
// console.log(projectConfig);

global.httpClient = httpClient
global.projectConfig = projectConfig

// console.log(global.projectConfig);

ReactDOM.render(
  <Routers/>,
  document.getElementById('root')
)

// if (module.hot) {
//   module.hot.accept('./views/app/index', () => {
//     ReactDOM.render(
//       <Routers/>,
//       document.getElementById('root')
//     )
//   })
// }



registerServiceWorker()

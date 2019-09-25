import React from 'react'
import ReactDOM from 'react-dom'
import '../src/assets/less/index.less'
import Routers from './router/index'
import 'antd/dist/antd.css';

import registerServiceWorker from './registerServiceWorker'
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

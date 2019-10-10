import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import '../src/assets/less/index.less'
import Routers from './router/index'

import httpClient from './utils/httpClient'
import projectConfig from './utils/projectConfig'

global.httpClient = httpClient
global.projectConfig = projectConfig

ReactDOM.render(
  <Routers/>,
  document.getElementById('root')
)

serviceWorker.unregister();

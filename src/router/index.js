import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from './asyncComponent'
import routeList from './operationRouting'
import AuthRouter from './frontendCuth'

let Login = asyncComponent(() => import('../views/Login/index'))
let Layout = asyncComponent(() => import('../views/Layout/index'))
let Home = asyncComponent(() => import('../views/Home/index'))
let Order = asyncComponent(() => import('../views/Order/index'))
let Table = asyncComponent(() => import('../components/Table/index'))
let NoMatch = asyncComponent(() => import('../components/Nomatch/index'))
let Application = asyncComponent(() => import('../views/Business/Application/index'))
let ApplicationDetail = asyncComponent(() => import('../views/Business/Application/ApplicationDetail/ApplicationDetail'))
let CompaniesList = asyncComponent(() => import('../views/Business/CompaniesList/index'))
let UserList = asyncComponent(() => import('../views/Business/UserList/index'))

// exactly ： 是否严格模式
// noDropdown ：是否有下拉按钮
// auth ：是否需要登录授权

export const childRoutes = [
  
  {
    key: '0',
    name: '平台主页',
    icon: 'file',
    url: '/home',
    component: Home,
    exactly: true,
    noDropdown: false,
    auth:true
  },
  {
    key: '1',
    name: '企业管理',
    icon: 'user',
    noDropdown: true,
    auth:true,
    url: '/Business',
    child: [
      {
        key: '1.1',
        name: '入驻申请',
        url: '/Business/Application',
        component: Application,
        noDropdown: false,
        auth:true,
        child: [
          {
            key: '1.1.1',
            name: '详情',
            url: '/Application/ApplicationDetail',
            component: ApplicationDetail,
            noDropdown: false,
            auth:true,
          }
        ]

      },
      {
        key: '1.2',
        name: '企业列表',
        url: '/Business/CompaniesList',
        component: CompaniesList,
        noDropdown: false,
        auth:true,
      },
      {
        key: '1.3',
        name: '用户列表',
        url: '/Business/UserList',
        component: UserList,
        noDropdown: false,
        auth:true,
      }
    ]
  },
  {
    key: '2',
    name: '订单管理',
    icon: 'file',
    url: '/order',
    component: Order,
    exactly: true,
    noDropdown: false,
    auth:true,
  },

  {
    key: '3',
    name: '资讯管理',
    icon: 'user',
    noDropdown: true,
    auth:true,
    child: [
      {
        key: '3.1',
        name: '全部资讯',
        url: '/components/table',
        component: Table,
        noDropdown: false, 
        auth:true,
      }
    ]
  },
  {
    key: '99',
    name: '登录',
    icon: 'file',
    url: '/login',
    component: Login,
    exactly: true,
    noDropdown: false,
    auth:false
  },
]
let token ='3434'
function requireAuth(Layout, props) {
  console.log(Layout, props)
  
  if(token){
      return <Layout {...props} />
  } else {
    return  <Redirect exact path="/" to="/login" />
  }
}
// 多维路由转化成为一维路由
export const routesList = routeList(childRoutes)

export default class Routers extends React.Component {
  render() {
    return (
      <Router>
        
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect exact path="/" to="/login" />
          <Route component={props => requireAuth(Layout, props)} />
          <Route path="*" component={NoMatch} />
        </Switch>

      </Router>
    )
  }
}

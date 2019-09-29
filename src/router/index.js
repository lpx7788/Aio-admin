import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from './asyncComponent'
// import Login from '../views/Login/index'
// import Layout from '../views/Layout/index'
// import Home from '../views/Home/index'
// import Table from '../components/Table/index'
// import NoMatch from '../components/Nomatch/index'
// import Application from '../views/Business/Application/index'

let Login = asyncComponent(() => import('../views/Login/index'))
let Layout = asyncComponent(() => import('../views/Layout/index'))
let Home = asyncComponent(() => import('../views/Home/index'))
let Order = asyncComponent(() => import('../views/Order/index'))
let Table = asyncComponent(() => import('../components/Table/index'))
let NoMatch = asyncComponent(() => import('../components/Nomatch/index'))
let Application = asyncComponent(() => import('../views/Business/Application/index'))
let ApplicationDetail = asyncComponent(() => import('../views/Business/Application/ApplicationDetail/ApplicationDetail'))


export const childRoutes = [
  {
    key: '0',
    name: '平台主页',
    icon: 'file',
    url: '/home',
    component: Home,
    exactly: true
  },
  {
    key: '1',
    name: '企业管理',
    icon: 'user',
    child: [
      {
        key: '1.1',
        name: '入驻申请',
        url: '/Business/Application',
        component: Application,
        // exactly: true,
        // child: [
        //   {
        //     key: '1.1.1',
        //     name: '详情',
        //     url: '/Business/Application/ApplicationDetail',
        //     component: ApplicationDetail
        //   }
        // ]
    
      }
    ]
  },  
  {
    key: '2',
    name: '订单管理',
    icon: 'file',
    url: '/order',
    component: Order,
    exactly: true
  },

  {
    key: '3',
    name: '资讯管理',
    icon: 'user',
    child: [
      {
        key: '3.1',
        name: '全部资讯',
        url: '/components/table',
        component: Table
      }
    ]
  },


]

// 面包屑导航栏url对应的name
export const breadcrumbNameMap = {
    '/components/table': 'Table',
    '/Business/Application':'Business/Application',
    '/home': 'Home',
    '/order': 'Order',
  };


export default class Routers extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect exact path="/" to="/login" />
          <Route component={Layout} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    )
  }
}

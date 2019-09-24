import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../views/login/index'
import Layout from '../views/layout/index'
import Home from '../views/home/index'
import Table from '../components/table/index'
import NoMatch from '../components/nomatch/index'


export const childRoutes = [
  {
    key: '0',
    name: 'Home',
    icon: 'file',
    url: '/home',
    component: Home,
    exactly: true
  },
  {
    key: 'sub1',
    name: 'Components',
    icon: 'user',
    child: [
      {
        key: '2',
        name: 'Table',
        url: '/components/table',
        component: Table
      }
    ]
  },


]

// 面包屑导航栏url对应的name
export const breadcrumbNameMap = {
    '/components': 'Components',
    '/components/table': 'Table',
    '/home': 'Home',
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

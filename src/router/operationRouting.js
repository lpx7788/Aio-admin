
import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// 路由多维数组变成一维数组
const getRouteList =  function getRouteList(arr) {
  let routeList = []
  function getRouteData(arr) {
    arr.forEach((item, index) => {
      routeList.push(item)
      if (item.child) {
        getRouteData(item.child)
      }
    })
    return routeList
  }
  getRouteData(arr)
  return routeList
}

// 路由登录拦截
const requireAuth = function requireAuth(Layout, props) {
  let token = localStorage.getItem("token");
  if(token){
    if(props.location.pathname==='/'){
      return  <Redirect exact to="/home" />
    }else{
      return <Layout {...props} />
    }
  } else {
    return  <Redirect exact to="/login" />
  }
}

export default {
  requireAuth:requireAuth,
  getRouteList:getRouteList
}



import React from 'react'
import { Redirect } from 'react-router-dom'
import NProgress from 'nprogress' //浏览器顶部进度条
import 'nprogress/nprogress.css'

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
  NProgress.start();
  let token = localStorage.getItem("token");
  if(token){
    if(props.location.pathname==='/'){
      return  <Redirect exact to="/home" />
    }else{
      NProgress.done();
      return <Layout {...props} />
    }
  } else {
    NProgress.done();
    return  <Redirect exact to="/login" />
  }
}

export default {
  requireAuth:requireAuth,
  getRouteList:getRouteList
}


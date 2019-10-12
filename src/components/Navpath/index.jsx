import './index.less'
import React from 'react'
import { Breadcrumb,Icon, Dropdown, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { childRoutes } from '../../router/index'

class NavPath extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: this.props.initialChecked,
      userName:''
    }
    this.toggle = this.toggle.bind(this) //必须要绑定this
    this.handleLoginOut = this.handleLoginOut.bind(this)
  }
  UNSAFE_componentWillMount(){
    let userName = localStorage.getItem('userData')
    if(userName){
      userName = JSON.parse(localStorage.getItem('userData'))
      this.setState({
        userName:userName.user.userName
      })
    }
  }
  toggle() {
    const newState = !this.state.collapsed
    this.setState({ collapsed: newState })
    this.props.callbackParent(newState) //子组件调用父组件的callbackParent函数，传递新值到父组件
  }
  handleLoginOut = () => {
    this.props.history.replace('/login')
  }
  render() {

    const { location } = this.props
    const pathSnippets = location.pathname
    
    let extreaBreadcrumbItems = []
    childRoutes.forEach((item, index) => {
      let routesObj = {
        name:item.name,
        key:item.key,
        url:item.url,
        noDropdown:item.noDropdown
      }
      if (pathSnippets === item.url) {
        extreaBreadcrumbItems = [routesObj]
      }
      if (item.child) {
        item.child.forEach((i, idx) => {
          let routesChildObj = {
            name:i.name,
            key:i.key,
            url:i.url,
            noDropdown:i.noDropdown
          }
          if (pathSnippets === i.url) {
            extreaBreadcrumbItems = [routesObj, routesChildObj]
          }
          if (i.child) {
            i.child.forEach((j, idx) => {
              let routesgrandObj = {
                 name:j.name,
                 key:j.key,
                 url:j.url,
                 noDropdown:j.noDropdown
              }
              if (pathSnippets === j.url) {
                extreaBreadcrumbItems = [routesObj, routesChildObj,routesgrandObj]
              }
            })
          }
        })
      }
    })

    const breadcrumbItems = (
        extreaBreadcrumbItems.map((item) => {
          return (
           <Breadcrumb.Item key={item.key}>
            {
              item.noDropdown === true ? item.name: (<Link to={item.url}>{item.name}</Link>)
            }
           </Breadcrumb.Item>
          )
        })
    )

    const menu = (
      <Menu>
        <Menu.Item key="3">
          <span  onClick={this.handleLoginOut}>退出登录</span>
        </Menu.Item>
      </Menu>
    )

    return (
      <div className='navpth-container'>
        <Icon
          className="trigger"
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />

        <Breadcrumb className="breadcrumb" >
          {
            breadcrumbItems
          }
        </Breadcrumb>
        <div className="userinfo ">
           <span className="user">用户：{this.state.userName} </span>
             <div className="drop-down">
               <Dropdown overlay={menu}>
                 <div className="antd-drown-link">
                   <span>注销登陆</span>
                 </div>
               </Dropdown>
             </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NavPath)

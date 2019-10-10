import './index.less'
import React, { Component } from 'react'
import { Link, withRouter, matchPath } from 'react-router-dom'
import { childRoutes } from '../../router/index'
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
const SubMenu = Menu.SubMenu

const isActive = (path, history) => {
    return matchPath(path, {
      path: history.location.pathname,
      exact: true,
      strict: false
    })
  }

class SiderBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: this.props.checked,
      mode: this.props.checked ? 'vertical' : 'inline',
      openKey: '0',
      activeKey: '0',
    }
  }

  // 父组件属性改变时的钩子函数   
  componentWillReceiveProps(nextProps) {
    // 二级菜单发生变化时候this.props.hisotory

      Array.isArray(childRoutes) &&childRoutes.forEach(item => {
          Array.isArray(item.child) && item.child.forEach((node) => {
              if(node.url && isActive(node.url,this.props.history)){
                  this.menuClickHandle({key: node.key})
                }
            })
        });
    const { checked } = nextProps
    this.setState({
      collapsed: checked,
      mode: checked ? 'vertical' : 'inline'
    })
  }

  //点击根据key高亮
  menuClickHandle = e => {
    this.setState({
        activeKey: e.key
    })
  }
  render() {
    let { activeKey, openKey } = this.state
    const _menuProcess = (nodes, pkey) => {

      return (
        Array.isArray(nodes) &&
        nodes.map((item, i) => {
       
          const menu = _menuProcess(item.child, item.key)
          if(item.url && isActive(item.url, this.props.history)){
            activeKey = item.key
            openKey = pkey
          }
          if(item.auth){
            if (menu.length > 0&&item.noDropdown) {
              return (
                <SubMenu
                  key={item.key}
                  title={
                    <span>
                      <Icon type={item.icon} />
                      <span  className="nav-text" >{item.name}</span>
                    </span>
                  }
                >
                  {menu}
                </SubMenu>
              )
            } else {
              return (
                <Menu.Item key={item.key}>
                  {item.url ? (
                    <Link to={item.url} className="nav-link">
                      <span  className="nav-text">
                        {item.icon && <Icon type={item.icon} />}
                        {item.name}
                      </span>
                    </Link>
                  ) : (
                    <span  className="nav-text">
                      {item.icon && <Icon type={item.icon} />}
                      {item.name}
                    </span>
                  )}
                </Menu.Item>
              )
            }
         }
        })
      )
    }

    const menu = _menuProcess(childRoutes);
  
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed} id='sideId'>
        <div className="nav-logo">
          <img src="https://aio.manytrader.net/preViewUploadFile/images/logo-32.png" alt=""/>
          <span style={{display: this.state.collapsed===false? "inline-block" : "none"}}>AIO商城</span>
        </div>
        <Menu
          theme="dark"
          mode={this.state.mode}
          defaultOpenKeys = {[openKey]}
          selectedKeys={[activeKey]}
          onClick = {this.menuClickHandle}
        >
          {menu}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(SiderBar)

import './index.less'
import React from 'react'
import { Breadcrumb, Icon, Dropdown, Menu, Avatar } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { breadcrumbNameMap } from '../../router/index'

class NavPath extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: this.props.initialChecked
    }
    this.toggle = this.toggle.bind(this) //必须要绑定this
    this.handleLoginOut = this.handleLoginOut.bind(this)
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
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const extreaBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item key={url}>
          {
            index === 0 ? breadcrumbNameMap[url]: (<Link to={url}>{breadcrumbNameMap[url]}</Link>)
          }
        </Breadcrumb.Item>
      )
    })

    const menu = (
      <Menu>
        <Menu.Item key="3">
          <a onClick={this.handleLoginOut}>退出登录</a>
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
          {extreaBreadcrumbItems}
        </Breadcrumb>
        <div className="drop-down">
          <Dropdown overlay={menu}>
            <a className="antd-drown-link">
              <Avatar shape="square" icon="user" />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default withRouter(NavPath)

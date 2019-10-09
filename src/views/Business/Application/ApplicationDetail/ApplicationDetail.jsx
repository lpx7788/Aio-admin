import React from 'react'
import { Row, Card, Tabs } from 'antd'

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
export default class ApplicationDetail extends React.Component {
  componentDidMount() {
 
  }
  
  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={callback} type="card">
        <TabPane tab="基本信息" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="客户" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="供应商" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="员工" key="4">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="套保账户" key="5">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="积分设置" key="6">
          Content of Tab Pane 3
        </TabPane>
      </Tabs> 
    )
  }
}

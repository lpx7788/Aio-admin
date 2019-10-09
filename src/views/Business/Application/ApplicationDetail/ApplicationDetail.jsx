import React from 'react'
import { Row, Card, Tabs } from 'antd'

const { TabPane } = Tabs;
function TabsCallback(key) { //Tabs选中回调
  console.log(key);
}
export default class ApplicationDetail extends React.Component {
  componentWillMount(){
    console.log(this.props.location.query.companyCode)
  }
  componentDidMount() {
 
  }
  
  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={TabsCallback} type="card">
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

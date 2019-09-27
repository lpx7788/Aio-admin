import React from 'react'
import './index.less'
import { Card,Radio } from 'antd';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      size: "today",
    };
  }

  componentWillMount() {
    let self = this;
    global.httpClient
      .request(global.projectConfig.WECHAT_LOGIN, {}, "post")
      .then(res => {
        self.setState({
          dataList: res.returnObject
        });
      }).catch(function (err) {
        console.log(err);
      });
  }

  componentDidMount() {

  }
  handleSizeChange = e => {
    this.setState({ size: e.target.value });
    console.log(this.state.size)
  };

  render() {
    return (
      <div className="home-page-content">
        <header className="page-header">
          <Radio.Group value={this.state.size} onChange={this.handleSizeChange}>
            <Radio.Button value="today">今天</Radio.Button>
            <Radio.Button value="yesterday">昨天</Radio.Button>
            <Radio.Button value="lastWeek">最近一周</Radio.Button>
            <Radio.Button value="lastMonth">最近30天</Radio.Button>
            <Radio.Button value="lastThreeMonth">最近90天</Radio.Button>
            <Radio.Button value="all">累计</Radio.Button>
          </Radio.Group>
        </header>
        <div className="page-content">
          <div className="content-item border">
            <p className="content-title">基本数据</p>
            <section className="card-list">
              {
                this.state.dataList.map((item) => {
                  return (
                    <div className='card-list border' key={item.type}>
                      <Card title={item.common} bordered={false} style={{ width: 240 }}>
                        <p className="number bloc500">{item.count}</p>
                        <p className="red persen bloc500">{item.percentage}</p>
                      </Card>
                    </div>
                  )
                })
              }
            </section>
          </div>
          </div>
      </div>
    )
  }
}

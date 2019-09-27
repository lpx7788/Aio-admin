import React from 'react'
import './index.less'
import { Card,Radio } from 'antd';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      size: "1",
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
  };

  render() {
    return (
      <div className="home-page-content">
        <header className="page-header">
          <Radio.Group value={this.state.size} onChange={this.handleSizeChange}>
            <Radio.Button value="1">今天</Radio.Button>
            <Radio.Button value="2">昨天</Radio.Button>
            <Radio.Button value="3">最近一周</Radio.Button>
            <Radio.Button value="4">最近30天</Radio.Button>
            <Radio.Button value="5">最近90天</Radio.Button>
            <Radio.Button value="6">累计</Radio.Button>
          </Radio.Group>
        </header>
        <div className="page-border">
          <div className="cpntent-item">
            <p>基本数据</p>
            <section className="card-list">
              {
                this.state.dataList.map((obj) => {
                  return (
                    <div className='card-list' key={obj.type}>
                      <Card title="Card title" bordered={false} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                      </Card>
                    </div>
                  )
                })
              }


            </section>
          </div>
          <div className="cpntent-item">
            <p>交易数据-现货商城</p>
            <section className="card-list">

            </section>
          </div>
          <div className="cpntent-item">
            <p>交易数据-求购大厅</p>
            <section className="card-list">

            </section>
          </div>

        </div>
      </div>
    )
  }
}

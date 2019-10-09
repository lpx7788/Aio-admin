import React from 'react'
import './index.less'
import { Card,Radio,DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
const {  RangePicker } = DatePicker;


export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      parameter:{
        dateKey: "today",
      },
    };
  }

  componentWillMount() {
    this.getPageDatas();
  }

  //获取页面数据
  getPageDatas(){
    let self = this;
    global.httpClient
    .request(global.projectConfig.GET_HOMECOUNT,this.state.parameter, "post")
    .then(res => {
      
      self.setState({
        dataList: res.returnObject
      });

    }).catch(function (err) {});
  }
  //修改日期
  handleTImeChange = e => {
    let parameter = this.state.parameter
    parameter.dateKey = e.target.value;
  　this.setState({
      parameter: parameter
  　})
    this.getPageDatas();
  };

  render() {
    return (
      <div className="home-page-content">
        <header className="page-header">
          <Radio.Group value={this.state.parameter.dateKey} onChange={this.handleTImeChange}>
            <Radio.Button value="today">今天</Radio.Button>
            <Radio.Button value="yesterday">昨天</Radio.Button>
            <Radio.Button value="lastWeek">最近一周</Radio.Button>
            <Radio.Button value="lastMonth">最近30天</Radio.Button>
            <Radio.Button value="lastThreeMonth">最近90天</Radio.Button>
            <Radio.Button value="all">累计</Radio.Button>
          </Radio.Group>
          <RangePicker className="dataPicker" locale={locale}  />
        </header>
        <div className="page-content">
          <div className="content-item border">
            <p className="content-title">基本数据</p>
            <section >
              {
                this.state.dataList.map((item) => {
                  return (
                    <div className='card-list-item border' key={item.type} style={{ width: 240 }}>
                      <Card title={item.common} bordered={false} >
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

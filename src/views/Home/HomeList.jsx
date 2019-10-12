import React from 'react'
import './HomeList.less'
import { Card,DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import AntdRadioGroup from '../../../src/components/AntdRadioGroup/AntdRadioGroup';
const {  RangePicker } = DatePicker;

export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      groupArr: [
        {value:'today',textName:'今天',key:1},
        {value:'yesterday',textName:'昨天',key:2},
        {value:'lastWeek',textName:'最近一周',key:3},
        {value:'lastMonth',textName:'最近30天',key:4},
        {value:'lastThreeMonth',textName:'最近90天',key:5},
        {value:'all',textName:'累计',key:6},
      ],
      parameter:{
        dateKey: "today",
        dateNum: "",
        createDateStart:'',
        createDateEnd:''
      },
    };
  }

  UNSAFE_componentWillMount() {
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
  parameter.dateKey = e;
  　this.setState({
      parameter: parameter
  　})
    this.getPageDatas();
  };

  handelRangePicker= (date, dateString) =>{
    console.log(date, dateString)
    let parameter = this.state.parameter
    parameter.dateKey = '';
    parameter.createDateStart = dateString[0] / 1000;
    parameter.createDateEnd = dateString[1] / 1000;
    this.setState({
      parameter: parameter
  　})
    this.getPageDatas();
  }

  render() {
    return (
      <div className="home-page-content">
        <header className="page-header">
          <AntdRadioGroup value={this.state.parameter.dateKey} groupArr={this.state.groupArr}  change={this.handleTImeChange}/>
          <RangePicker onChange={this.handelRangePicker} className="dataPicker" locale={locale}  />
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

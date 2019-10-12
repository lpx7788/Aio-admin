import React from 'react'
import './OrderList.less'
import { Select, Form, Button, Radio, DatePicker, Table, Pagination, Input, Row, Col } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import AntdRadioGroup from '../../../../src/components/AntdRadioGroup/AntdRadioGroup';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
export default class OrderList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],//页面数据
      totalPage: 0,//总页数
      companyListBuyer: [],
      companyListSeller: [],
      tableListLoading: true,//table的loading
      parameter: { //请求参数
        createDateEnd: null,
        createDateStart: null,
        dateKey: "today", 
        dateNum: '',
        deliveryType: "1",
        orderStatus: "", 
        pageNum: 1,
        pageSize: 20,
        priceType: "1",
        queryKey: "",
        sellUserCompanyCode: "",
      },
      groupArr: [
        {value:'today',textName:'今天',key:1},
        {value:'yesterday',textName:'昨天',key:2},
        {value:'lastWeek',textName:'最近一周',key:3},
        {value:'lastMonth',textName:'最近30天',key:4},
        {value:'lastThreeMonth',textName:'最近90天',key:5},
        {value:'all',textName:'累计',key:6},
      ],
      priceTypeArr: [
        {value:'1',textName:'点价',key:1},
        {value:'3',textName:'延期点价',key:3},
        {value:'2',textName:'确定价',key:2},
      ],
      deliveryType: [
        {value:'1',textName:'现货商城',key:1},
        {value:'2',textName:'求购大厅',key:2},
   
      ],
      //table标题
      tableListtitle: [
        { title: '订单编号', dataIndex: 'customerOrderCode', align: 'center' },
        { title: '买家', dataIndex: 'buyCompanyName', align: 'center' },
        { title: '卖家', dataIndex: 'sellCompanyName', align: 'center' },
        { title: '点价人', width: 100, dataIndex: 'createUserName', align: 'center' },
        { title: '商品名称', dataIndex: 'categoryName', align: 'center' },
        { title: '合约', dataIndex: 'contractName', align: 'center' },
        { title: '基价', dataIndex: 'basePrice', align: 'center' },
        { title: '成交数量', dataIndex: 'dealQuantity', align: 'center' },
        { title: '下单数量', dataIndex: 'quantity', align: 'center' },
        { title: '订单状态', align: 'center',render:(record) => record.orderStatus===2||record.orderStatus===5?'111': record.orderStatusName},
        { title: '下单时间', dataIndex: 'createDate', align: 'center' },
        {
          title: '操作', width: 100, render: (row) =>
            <Button type="primary" size="small" shape="round" onClick={this.goToCompanyDetail.bind(this, row)} icon="eye">查看</Button>, align: 'center'
        },
      ],
    };
  }

  // 页面初始化
  UNSAFE_componentWillMount() {
    this.getPageDatas();
    this.getcompanyDatas();
  }
  

  //跳转详情页
  goToCompanyDetail(row) {
    this.props.history.push({ pathname: '/Application/ApplicationDetail', query: { companyCode: row.companyCode } })
  }

  //获取页面数据
  getPageDatas() {
    let self = this;
    global.httpClient
      .request(global.projectConfig.GET_ORDER_LIST, this.state.parameter, "post")
      .then(res => {
        self.setState({
          dataList: res.returnObject.list,
          totalPage: res.returnObject.total,
          tableListLoading: false
        });
      });
  }

  // 获取公司列表
  getcompanyDatas() {
    let self = this;
    global.httpClient
      .request(global.projectConfig.GET_COMPANY_LIST,  {
        type: 1
      }, "post")
      .then(res => {
        self.setState({
          companyListBuyer:res.returnObject.buyer,
          companyListSeller:res.returnObject.seller
        });
      });
  }

  //setState参数值
  handleParameter(value, dataName) {
    let parameter = this.state.parameter
    parameter[dataName] = value
    this.setState({
      parameter: parameter
    })
    this.getPageDatas();
  }

  //修改状态
  handleStatusChange = e => {
    this.setState({
      tableListLoading: true
    });
    let value = e.target.value;
    this.handleParameter(value, 'companyStatus')
  }

  //搜索
  handleSearch(val) {
    this.setState({
      tableListLoading: true
    });
    let value = val
    this.handleParameter(value, 'queryKey')
  }

  // 分页
  onPageChange = e => {
    this.setState({
      tableListLoading: true
    });
    this.handleParameter(e, 'pageNum')
  }

  //修改日期按钮组
  handleTImeChange = e => {
    this.handleParameter(e, 'dateKey')
  };

  //修改作价方式
  handlePriceType = e => {

      console.log(e)
    let  tableListtitle;
    switch(tableListtitle){
      case '1': 
        tableListtitle = this.state.tableListtitle
        break
      case '3': 
        tableListtitle = [
          { title: '订单编号', dataIndex: 'customerOrderCode', align: 'center' },
          { title: '买家', dataIndex: 'buyCompanyName', align: 'center' },
          { title: '卖家', dataIndex: 'sellCompanyName', align: 'center' },
          { title: '商品名称', dataIndex: 'categoryName', align: 'center' },
          { title: '下单数量', dataIndex: 'quantity', align: 'center' },
            { title: '订单状态', align: 'center',render:(record) => record.orderStatus===2||record.orderStatus===5?'111': record.orderStatusName},
          { title: '下单时间', dataIndex: 'createDate', align: 'center' },
          {
            title: '操作', width: 100, render: (row) =>
              <Button type="primary" size="small" shape="round" onClick={this.goToCompanyDetail.bind(this, row)} icon="eye">查看</Button>, align: 'center'
          }]
        break
      case '2':
      tableListtitle = [
        { title: '订单编号', dataIndex: 'customerOrderCode', align: 'center' },
        { title: '买家', dataIndex: 'buyCompanyName', align: 'center' },
        { title: '卖家', dataIndex: 'sellCompanyName', align: 'center' },
        { title: '下单人', width: 100, dataIndex: 'createUserName', align: 'center' },
        { title: '商品名称', dataIndex: 'categoryName', align: 'center' },
        { title: '价格', dataIndex: 'basePrice', align: 'center' },
        { title: '下单数量', dataIndex: 'quantity', align: 'center' },
          { title: '订单状态', align: 'center',render:(record) => record.orderStatus===2||record.orderStatus===5?'111': record.orderStatusName},
        { title: '下单时间', dataIndex: 'createDate', align: 'center' },
        {
          title: '操作', width: 100, render: (row) =>
            <Button type="primary" size="small" shape="round" onClick={this.goToCompanyDetail.bind(this, row)} icon="eye">查看</Button>, align: 'center'
        }
      ]
      break
    
    }
    

      
      this.setState({
        tableListtitle:tableListtitle
      })
    this.handleParameter(e, 'priceType')
  };

  //修改订单来源
  handleDeliveryType = e => {
    this.handleParameter(e, 'deliveryType')
  };

  //修改订单状态
  handleOrderStatus = e => {
    this.handleParameter(e, 'orderStatus')
  };


  render() {
    return (
      <div className="OrderList-page-content">
        <header className="page-header">
          <Row >
            <Col className="gutter-row" >
              <AntdRadioGroup value={this.state.parameter.dateKey} groupArr={this.state.groupArr}  change={this.handleTImeChange}/>
              <RangePicker className="dataPicker" locale={locale} />

              <Search className="search mL20" placeholder="请输入企业名称/简称" onSearch={value => this.handleSearch(value)} enterButton />
              <Button className="mL20" icon="download" type="primary">导出</Button>
              <Button className="mL20" type="primary">清空</Button>
            </Col>
          </Row>
          <Row >
            <Col className="gutter-row mT20" >
              <Form>
                <Form.Item label="订单来源：" labelCol={{ span: 1 }}>
                  <AntdRadioGroup value={this.state.parameter.deliveryType} groupArr={this.state.deliveryType}  change={this.handleDeliveryType}/>
                </Form.Item>
            
                <Form.Item label="作价方式：" labelCol={{ span: 1 }}>
                  <AntdRadioGroup value={this.state.parameter.priceType} groupArr={this.state.priceTypeArr}  change={this.handlePriceType}/>
                </Form.Item>
                <Form.Item label="买家公司：" labelCol={{ span: 1 }}>
                  <Select
                    showSearch
                    style={{ width: 320 }}
                    placeholder="请选择或者输入买家公司"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.companyListBuyer.map(item => (
                      <Option key={item.companyCode} value={item.companyName}>{item.companyName}</Option>
                    ))}

                  </Select>
                </Form.Item>
                
                <Form.Item label="卖家公司：" labelCol={{ span: 1 }}>
                  <Select
                    showSearch
                    style={{ width: 320 }}
                    placeholder="请选择或者输入卖家公司"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                  {
                    this.state.companyListSeller.map(item => (
                      <Option key={item.companyCode} value={item.companyName}>{item.companyName}</Option>
                    ))
                  }
                  </Select>
                </Form.Item>
               
                <Form.Item label="订单状态：" labelCol={{ span: 1 }}>
                  <Radio.Group value={this.state.parameter.orderStatus} onChange={this.handleOrderStatus}>
                    <Radio.Button value="">全部</Radio.Button>
                    <Radio.Button value="1">待确认</Radio.Button>
                    <Radio.Button value="4" className={ `m20 ${this.state.parameter.priceType === '1' ? 'show' : 'hidden'}`}  >已挂单</Radio.Button>
                    <Radio.Button value={this.state.parameter.priceType==='2'?'2':'5'}>待生成合同</Radio.Button>
                    <Radio.Button value="6">已生成合同</Radio.Button>
                    <Radio.Button value="3">已取消</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Col>
          </Row>

        </header>
        <div className="page-content">
          <div className="content-item">
            <Table loading={this.state.tableListLoading} size="middle" pagination={false} rowKey={row => row.id} bordered columns={this.state.tableListtitle} dataSource={this.state.dataList} />
            <section className={`m20 ${this.state.dataList.length !== 0 ? 'show' : 'hidden'}`}  >
              <Pagination size="small" total={this.state.totalPage} onChange={this.onPageChange} showSizeChanger={true} />
            </section>
          </div>
        </div>
      </div>
    )
  }
}

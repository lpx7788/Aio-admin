import React from 'react'
import './ApplicationDetail.less'
import { Row, Col, Card, Tabs, Button, Tag, Table } from 'antd'
import { func } from 'prop-types';
import RcViewer from '@hanyk/rc-viewer'

const { TabPane } = Tabs;
export default class ApplicationDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      companyData: [],
      companyCode: null,
      categoryNameList: [], //交易品种中文名
      categoryList: [], //品种树
      allCategoryLevel3List: [], //三级品种
      tableData_customer: [], //客户列表
      tableTitles_customer: [ //客户列表表头
        {title: '公司全称', dataIndex: 'companyName'},
        {title: '联系人', dataIndex: 'companyContacts'},
        {title: '联系电话', dataIndex: 'companyContactNumber'},
        {title: '采购额度', dataIndex: ''},
        {title: '销售额度', dataIndex: ''}
      ],
    };
  }

  componentDidMount() {
    this.getPageDatas()
  }
  componentWillMount(){
    if(this.props.location.query) sessionStorage.setItem('companyCode',this.props.location.query.companyCode) //将companyCode存入缓存
    this.setState({
      companyCode: sessionStorage.getItem('companyCode')?sessionStorage.getItem('companyCode'):''
    })
  }

  componentWillUnmount(){
    sessionStorage.removeItem('companyCode') //离开页面前销毁companyCode缓存
  }
  
  // 获取公司信息
  getPageDatas(companyCode){ 
    let self = this;
    global.httpClient.request(global.projectConfig.GET_COMPANY_DETAIL,
    {companyCode: self.state.companyCode}, 
    "post")
    .then(res => {
      self.setState({
        companyData: res.returnObject
      },function(){
        this.getCategoryTree()
      })
    }).catch(function (err) {})
  }
  // 获取交易品种中文名称
  getCategoryTree(){
    global.httpClient.request(global.projectConfig.GET_CATEGORY_TREE,{},'post',true)
    .then(response => {
      let res = response.returnObject
      this.setState({
        categoryList: res,
      })
        // this.categoryList = response.returnObject
        // let arr = []
        // response.returnObject.forEach(level1 => {
        //     let obj = {
        //         categoryCode: level1.categoryCode,
        //         categoryName: level1.categoryName,
        //         childs: []
        //     }
        //     level1.childs.forEach(level2 => {
        //         level2.childs.forEach(level3 => {
        //             obj.childs.push(level3)
        //         })
        //     })
        //     arr.push(obj)
        // })
        // this.allCategoryList = arr 

      let arr2 = []
      res.forEach(level1 => {
          level1.childs.forEach(level2 => {
              level2.childs.forEach(level3 => {
                  arr2.push(level3)
              })
          })
      })
      this.state.allCategoryLevel3List = arr2

      if(this.state.companyData.tradingCategoryCode){
        this.state.categoryNameList = []
        let tradingCategoryCodeList = this.state.companyData.tradingCategoryCode.split(',')
        this.state.allCategoryLevel3List.forEach(item => {
          tradingCategoryCodeList.forEach(i => {
            if(item.categoryCode == i){
              this.state.categoryNameList.push(item.categoryName)
            }
          })
        })
      }
      this.setState({
        categoryNameList: this.state.categoryNameList
      })
    })
  }
  // 获取客户列表
  getCustomers(){
    let self = this;
    global.httpClient.request(global.projectConfig.GET_CUSTOMER_LIST,
    {pageNum: 1,
      // pageSize: 10,
      companyCode: this.state.companyCode}, 
    "post")
    .then(res => {
      self.setState({
        tableData_customer: res.returnObject.customers
      })
    }).catch(function (err) {})
  }

  TabsCallback(key) { //Tabs选中回调
    let self = this
    switch(key){
      case '1':
        self.getPageDatas();
        break;
      case '2':
        self.getCustomers();
        break;
      default:
        break;
    }
  }

  render() {
    const options={}
    return (
      <Tabs defaultActiveKey="1" onChange={this.TabsCallback.bind(this)} type="card">
        <TabPane tab="基本信息" key="1">
          <div className="companyStatus basic-item">
            <div className="companyStatus_l fl"><h3 className="inline_b">{this.state.companyData.companyName}</h3><Tag color="#87d068" className={this.state.companyData.carefullyChosenSeller?'':''}>精选卖家</Tag><span>当前状态：{this.state.companyData.companyStatusName}</span></div>
            <div className="companyStatus_r fr">
              <div className={this.state.companyData.companyStatus==1?'':'hidden'}>
                <Button type="primary" icon="check">通过</Button><Button type="danger" icon="close">拒绝</Button>
              </div>
              <div className={this.state.companyData.companyStatus==2||this.state.companyData.companyStatus==3?'':'hidden'}>
                <Button type="primary" icon="check">编辑</Button>
              </div>
            </div>
          </div>
          <div className="userData basic-item">
            <h3>提交人信息</h3>
            <Row>
              <Col span={8}><p>姓名：{this.state.companyData.userName}</p></Col>
              <Col span={8}><p>身份证号码：{this.state.companyData.userIdentity}</p></Col>
              <Col span={8}><p>手机号码：{this.state.companyData.mobilePhone}</p></Col>
            </Row>
          </div>
          <div className="verifyData basic-item">
            <h3>认证信息</h3>
            <Row>
              <Col span={8}><p>公司名称：{this.state.companyData.companyName}</p></Col>
              <Col span={8}><p>统一社会信用代码：{this.state.companyData.creditNum}</p></Col>
              <Col span={8}><p>企业身份：{this.state.companyData.companyIdentityName}</p></Col>
            </Row>
            <Row>
              <Col span={8}><p>企业地址：{this.state.companyData.address}</p></Col>
              <Col span={8}><p>企业注册资本：{this.state.companyData.registeredCapital} 万元</p></Col>
              <Col span={8}><p>交易品种：{this.state.categoryNameList.map((item,index)=>{
                return(
                  <span key={item}>{item}<i  className={index==this.state.categoryNameList.length-1?'hidden':''}>，</i></span>
                )
              })}</p></Col>
            </Row>
            <Row>
              <Col span={8}>
                <div>营业执照：
                  <RcViewer options={options}>
                    <img className="authorization" src={this.state.companyData.authorizationFileUrl} alt=""/>
                  </RcViewer>
                </div>
              </Col>
              <Col span={8}>
                <div>认证授权书：
                  <RcViewer options={options}>
                    <img className="license" src={this.state.companyData.licensePicUrl} alt=""/>
                  </RcViewer>
                </div>
              </Col>
            </Row>
          </div>
          <div className="verifyData basic-item">
            <h3>企业资料核查</h3>
            <div className={this.state.companyData.detailByYJ===null?'hidden':''}>
              <Row>
                <Col span={4}><p>注册资本：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.RegistCapi:''}</p></Col>
                <Col span={4}><p>实缴资本：</p></Col>
                <Col span={8}><p>-</p></Col>
              </Row>
              <Row>
                <Col span={4}><p>经营状态：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.Status:''}</p></Col>
                <Col span={4}><p>成立日期：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.StartDate:''}</p></Col>
              </Row>
              <Row> 
                <Col span={4}><p>注册号：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.No:''}</p></Col>
                <Col span={4}><p>组织机构代码：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.OrgNo:''}</p></Col>
              </Row>
              <Row>
                <Col span={4}><p>纳税人识别号：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.CreditCode:''}</p></Col>
                <Col span={4}><p>统一社会信用代码：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.CreditCode:''}</p></Col>
              </Row>
              <Row>
                <Col span={4}><p>公司类型：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.EconKind:''}</p></Col>
                <Col span={4}><p>所属行业：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.Industry:''}</p></Col>
              </Row>
              <Row>
                <Col span={4}><p>核准日期：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.CheckDate:''}</p></Col>
                <Col span={4}><p>登记机关：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.BelongOrg:''}</p></Col>
              </Row>
              <Row>
                <Col span={4}><p>所属地区：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.Province:''}</p></Col>
                <Col span={4}><p>英文名：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.CompanyNameEg:''}</p></Col>
              </Row>
              <Row>
                <Col span={4}><p>曾用名：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.OriginalName:''}</p></Col>
                <Col span={4}><p>经营方式：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.ScopeType:''}</p></Col>
              </Row>
              <Row>
                <Col span={4}><p>人员规模：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.Employee:''}</p></Col>
                <Col span={4}><p>企业期限：</p></Col>
                <Col span={8}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.TeamEnd:''}</p></Col>
              </Row>
              <Row>
                <Col span={4}><p>企业地址：</p></Col>
                <Col span={20}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.Address:''}</p></Col>
              </Row>
              <Row>
                <Col span={4}><p>经营范围：</p></Col>
                <Col span={20}><p>{this.state.companyData.detailByYJ?this.state.companyData.detailByYJ.Scope:''}</p></Col>
              </Row>
            </div>
            <div className={this.state.companyData.detailByYJ===null?'':'hidden'}>
              <p>找不到名字匹配的企业</p>
            </div>
          </div>
        </TabPane>
        <TabPane tab="客户" key="2">
          <div className="customer">
            <h3>客户列表</h3>
            <Table size="middle" bordered dataSource={this.state.tableData_customer} columns={this.state.tableTitles_customer} />
          </div>
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

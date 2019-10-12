import React from 'react'
import './CompaniesList.less'
import {Input,Table,Button,Pagination} from 'antd';
import AntdRadioGroup from '../../../../src/components/AntdRadioGroup/AntdRadioGroup';

const { Search } = Input;

export default class CompaniesList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],//页面数据
      totalPage:0,//总页数
      tableListLoading:true,//table的loading
      parameter:{ //请求参数
        companyStatus: '',
        pageNum: 1,
        pageSize: 20,
        queryKey: ""
      },
      groupArr: [
        {value:'',textName:'全部',key:1},
        {value:'1',textName:'待审核',key:2},
        {value:'2',textName:'已通过',key:3},
        {value:'3',textName:'已拒绝',key:4},
        ],

      //table标题
       tdataListtitle  : [
        {title: '编号',width:100,dataIndex: 'id',  align: 'center'   },
        {title: '公司',width:300,dataIndex: 'companyName', align: 'center'   },
        {title: '公司简称', dataIndex: 'companyShortName',align: 'center'    },
        {title: '超级管理员', dataIndex: 'superUserName', align: 'center'},
        {title: '手机号码',width:300, dataIndex: 'superUserPhone',align: 'center'},
        {title: '审核状态', dataIndex: 'companyStatusName',align: 'center' },
        {title: '入驻时间', dataIndex: 'createDate',align: 'center' },
        {title: '审核人/添加人', dataIndex: 'verifyUserName',align: 'center' },
        {title: '操作',width: 100,render: (row) =>  
        <Button type="primary" size="small" shape="round" onClick={this.goToCompanyDetail.bind(this,row)} icon="eye">查看</Button>,  align: 'center'},
      ],
    };
  }

  // 页面初始化
  UNSAFE_componentWillMount() {
    this.getPageDatas();
  }

  //跳转详情页
  goToCompanyDetail(row) {
    this.props.history.push({ pathname : '/Application/ApplicationDetail' ,query : { companyCode: row.companyCode} })
  }

  //获取页面数据
  getPageDatas(){
    let self = this;
    global.httpClient
    .request(global.projectConfig.GET_COMPANYlIST,this.state.parameter, "post")
    .then(res => {
      self.setState({
        dataList: res.returnObject.list,
        totalPage : res.returnObject.total,
        tableListLoading:false
      });
     
    }).catch(function (err) {});
  }

  //setState参数值
  handleParameter(value,dataName){
    let parameter = this.state.parameter
    parameter[dataName]= value
  　this.setState({
      parameter: parameter
  　})
    this.getPageDatas();
  }

  //修改状态
  handleStatusChange = e => {
    this.setState({
      tableListLoading:true
    });
    let value = e.target.value;
    this.handleParameter(value,'companyStatus')
  }

  //搜索
  handleSearch(val){
    this.setState({
      tableListLoading:true
    });
    let value = val
    this.handleParameter(value,'queryKey')
  }

  // 分页
  onPageChange = e =>{
    this.setState({
      tableListLoading:true
    });
    this.handleParameter(e,'pageNum')
  }

  //修改日期
  handleTImeChange = e => {
    this.handleParameter(e,'companyStatus')
  };


  render() {
    return (
      <div className="CompaniesList-page-content">
        <header className="page-header">
          <AntdRadioGroup value={this.state.parameter.companyStatus} groupArr={this.state.groupArr}  change={this.handleTImeChange}/>
          <Search  className="mL20 search" placeholder="请输入企业名称/简称" onSearch={value => this.handleSearch(value)} enterButton />
          <Button  className="mL20" icon="plus"  type="primary">添加企业</Button>
          <Button  className="mL20" icon="download" type="primary">导出</Button>
        </header>
        <div className="page-content">
            <div className="content-item">
              <Table loading={this.state.tableListLoading}  size="middle" pagination={ false } rowKey={row=>row.id} bordered columns={this.state.tdataListtitle} dataSource={this.state.dataList}/>
              <section className={ `m20 ${this.state.dataList.length!==0 ? 'show' : 'hidden'}`}  >
                 <Pagination size="small" total={this.state.totalPage} onChange={ this.onPageChange } showSizeChanger={true}  />
              </section>
            </div>
          </div>
      </div>
    )
  }
}

import React from 'react'
import './index.less'
import { Radio,Input,Table,Button,Pagination} from 'antd';
const { Search } = Input;


export default class UserList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],//页面数据
      totalPage:0,//总页数
      parameter:{ //请求参数
        companyStatus: '',
        pageNum: 1,
        pageSize: 20,
        queryKey: ""
      },
 
      //table标题
       tdataListtitle  : [
        {title: '用户编号',width:100,dataIndex: 'userId',fixed: 'left',  align: 'center' ,render: (value, row, index) => {
          const obj = {
            children: value,
            props: {},
          };
          let arr = this.objectSpanMethod()
          obj.props.rowSpan = arr[index]
          return obj;
        }  },
        {title: '真实姓名',width:300,dataIndex: 'userName',fixed: 'left',  align: 'center', render: (value, row, index) => {
            const obj = {
              children: value,
              props: {},
            };
            let arr = this.objectSpanMethod()
            obj.props.rowSpan = arr[index]
            return obj;
          }
        },
        {title: '手机号码', dataIndex: 'userPhone',align: 'center' , render: (value, row, index) => {
            const obj = {
              children: value,
              props: {},
            };
            let arr = this.objectSpanMethod()
            obj.props.rowSpan = arr[index]
            return obj;
          }  
        },
        {title: '所属公司', dataIndex: 'companyName', align: 'center'},
        {title: '用户身份',width:300, roleName: 'superUserPhone',align: 'center'},
        {title: '有效期', dataIndex: 'validityDate',align: 'center' },
        {title: '企业认证状态', dataIndex: 'userCompanyStatusName',align: 'center' },
        {title: '上次登录时间', dataIndex: 'lastLoginDate',align: 'center' },
        {title: '操作',fixed: 'right',width: 100,
        render: (value,row,index) =>  
        {
            const obj = {
              children:  <Button type="primary" size="small" shape="round" onClick={this.goToCompanyDetail.bind(this,row)} icon="eye">查看</Button>,
              props: {},
            };
            let arr = this.objectSpanMethod()
            obj.props.rowSpan = arr[index]
            return obj;
           
          } ,  align: 'center'
        },
      ],
    };
  }
   
  objectSpanMethod (){
    let valueLength = 1
    const arr = []
    let data = this.state.dataList
    for(var i=data.length-1;i>=0;i--){
      if(i!==0){
        if(data[i].userId === data[i-1].userId){
          arr[i]=0
          valueLength++
        }else{
          arr[i]=valueLength
          valueLength = 1
        }
      }
    }
    return arr;
  }

  // 页面初始化
  componentWillMount() {
    this.getPageDatas();
  }

  //跳转详情页
  goToCompanyDetail(row) {
    this.props.history.push({ pathname : '/ApplicationDetail' ,query : { companyCode: row.companyCode} })
  }

  //获取页面数据
  getPageDatas(){
    let self = this;
    global.httpClient
    .request(global.projectConfig.GET_USER_LIST,this.state.parameter, "post")
    .then(res => {
      self.setState({
        dataList: res.returnObject.list,
        totalPage : res.returnObject.total
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
    let value = e.target.value;
    this.handleParameter(value,'companyStatus')
  }

  //搜索
  handleSearch(val){
    let value = val
    this.handleParameter(value,'queryKey')
  }

  onPageChange = e =>{
   this.handleParameter(e,'pageNum')
  }


  render() {
    return (
      <div className="UserList-page-content">
        <header className="page-header">
          <Radio.Group value={this.state.parameter.companyStatus} onChange={this.handleStatusChange}>
            <Radio.Button value="">全部</Radio.Button>
            <Radio.Button value="1">待审核</Radio.Button>
            <Radio.Button value="2">正常</Radio.Button>
            <Radio.Button value="3">已拒绝</Radio.Button>
          </Radio.Group>
      
          <Search  className="mL20 search" placeholder="请输入企业名称/简称" onSearch={value => this.handleSearch(value)} enterButton />
          <Button  className="mL20" icon="download" type="primary">导出</Button>
        </header>
        <div className="page-content">
            <div className="content-item">
              <Table size="middle" pagination={ false } rowKey={row=>row.id} bordered columns={this.state.tdataListtitle} dataSource={this.state.dataList}/>
              <section className={ `m20 ${this.state.dataList.length!==0 ? 'show' : 'hidden'}`}  >
                 <Pagination size="small" total={this.state.totalPage} onChange={ this.onPageChange } showSizeChanger={true}  />
              </section>
            </div>
          </div>
      </div>
    )
  }
}

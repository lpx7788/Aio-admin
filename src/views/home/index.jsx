import React from 'react'
import './index.less'
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;
let res = {"errorCode":"0000","errorMsg":"请求成功","returnObject":[{"common":"注册用户数","percentage":"100%","count":"1","type":"registerUser"},{"common":"认证用户数","percentage":"0.00%","count":0.00,"type":"authUser"},{"common":"注册企业数","percentage":"0.00%","count":0.00,"type":"registerCompany"},{"common":"交易总额","percentage":"0.00%","count":0.00,"type":"totalPrice"},{"common":"发布报价数","percentage":"100%","count":"3","type":"xh_fabubaojiashu"},{"common":"点价订单数","percentage":"100%","count":"29","type":"xh_dianjiadingdanshu"},{"common":"点价订单吨数","percentage":"100%","count":"215","type":"xh_dianjiadingdandunshu"},{"common":"确定价订单数","percentage":"100%","count":"18","type":"xh_qudingjiadingdanshu"},{"common":"确定价订单吨数","percentage":"100%","count":"153","type":"xh_quedingjiadingdandunshu"},{"common":"点价成交吨数","percentage":"100%","count":"31","type":"xh_dianjiachengjiaodunshu"},{"common":"确定价成交数","percentage":"100%","count":0.00,"type":"xh_quedingjiachengjiaoshu"},{"common":"发布采购数","percentage":"100%","count":0.00,"type":"qg_fabucaigoushu"},{"common":"点价订单数","percentage":"100%","count":0.00,"type":"qg_dianjiadingdanshu"},{"common":"点价订单吨数","percentage":"100%","count":0.00,"type":"qg_dianjiadingdandunshu"},{"common":"确定价订单数","percentage":"100%","count":0.00,"type":"qg_qudingjiadingdanshu"},{"common":"确定价订单吨数","percentage":"100%","count":0.00,"type":"qg_quedingjiadingdandunshu"},{"common":"点价成交数","percentage":"100%","count":0.00,"type":"qg_dianjiachengjiaoshu"},{"common":"确定价成交数","percentage":"100%","count":0.00,"type":"qg_quedingjiachengjiaoshu"}],"type":null,"requestId":null}
console.log(res.returnObject)
let dataList = res.returnObject;

export default class Home extends React.Component {
  componentDidMount() {
  }


  render() {
    return (
      <div className="home-page-content">
        <div className="cpntent-item">
          <p>基本数据</p>
          <section className="card-list">
            {
              dataList.map((obj)=>{
                return  (
                  <div className='card-list'  key={obj.type}>
                    <Card   title="Card title" bordered={false} style={{ width: 300 }}>
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
    )
  }
}

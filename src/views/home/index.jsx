import React from 'react'
import './index.less'
import { Card } from 'antd';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList:[]
    };

  }

  componentWillMount(){
    let self = this;
    global.httpClient
      .request(global.projectConfig.WECHAT_LOGIN, {}, "post")
      .then(res => {
        self.setState({
          dataList:res.returnObject
        });
      }).catch(function(err) {
        console.log(err);
      });
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="home-page-content">
        <div className="cpntent-item">
          <p>基本数据</p>
          <section className="card-list">
            {
              this.state.dataList.map((obj)=>{
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

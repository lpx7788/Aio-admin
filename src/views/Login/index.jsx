import './index.less'
import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
const FormItem = Form.Item

class BasicLogin extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((errs, values) => {
      if (!errs && values) {
        if (values.userName !== '18126823343') {
          message.error('账号错误');
          return false;
        }
        if (values.password !== 'a123456b') {
          message.error('密码错误');
          return false;
        }
        else {
          message.success('登录成功');
          let userData = {}
          if (process.env.NODE_ENV === 'development') {
            userData = {
              "access_token": "e9b68b96ef3648adb99c1a8a9a3b12c3_f3914e67123e47b8acb46e557e9243dc",
              "user": {
                "qq": null,
                "businessDirection": "3",
                "auths": {
                  "companyCode": "f3914e67123e47b8acb46e557e9243dc",
                  "userCompanyStatus": "2",
                  "companyIdentity": "3",
                  "userCompanyStatusExp": "已认证",
                  "companyName": "广州众咖信息科技服务有限公司",
                  "roleCode": "1",
                  "companyIdentityExp": "买家与卖家",
                  "roleCodeExp": "管理员"
                },
                "userPhone": "18126823343",
                "userEmail": null,
                "id": 156,
                "userIdentity": "440881199103303114",
                "userName": "何景明",
                "allowPricing": "1",
                "userCode": "e9b68b96ef3648adb99c1a8a9a3b12c3",
                "userWechat": null,
                "status": "2"
              }
            }
          } else {
            userData = {
              "access_token": "e9b68b96ef3648adb99c1a8a9a3b12c3_f3914e67123e47b8acb46e557e9243dc",
              "user": {
                "qq": null,
                "auths": {
                  "companyCode": "f3914e67123e47b8acb46e557e9243dc",
                  "userCompanyStatus": "2",
                  "companyIdentity": "3",
                  "userCompanyStatusExp": "已认证",
                  "autoHedgeSwitch": "0",
                  "companyName": "广州众咖信息科技服务有限公司",
                  "roleCode": "0",
                  "companyIdentityExp": "买家与卖家",
                  "roleCodeExp": "超级管理员",
                  "signAutoHedgeProtocol": "0"
                },
                "userPhone": "18126823343",
                "userIdentity": "440881199103303114",
                "userName": "何景明",
                "isBuyer": "1",
                "allowPricing": "1",
                "userCode": "e9b68b96ef3648adb99c1a8a9a3b12c3",
                "userWechat": null,
                "openNewsPopup": "0",
                "availableIntegral": "38080",
                "aboutToIntegral": "0",
                "businessDirection": "3",
                "beenusedIntegral": "12000",
                "userEmail": null,
                "id": 156,
                "status": "2"
              }
            }
          }
          localStorage.setItem("userData", userData);
          localStorage.setItem("token", userData.access_token);
          this.props.history.push('/home')
        }
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-container">
        <div className="login-form-wrapper">
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <p className="login-form-title">系统登录</p>
            <FormItem>
              {getFieldDecorator('userName', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '手机号码不能为空'
                  },
                  {
                    pattern: new RegExp(/^1[3456789]\d{9}$/, 'g'),
                    message: '手机号码不正确'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="请输入手机号码"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                initialValue: '',
                rules: [
                  { required: true, message: '请输入密码!' },
                  { min: 6, message: '密码不能小于6位!' },

                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  placeholder="请输入密码"
                  type="password"
                />
              )}
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

const Login = Form.create()(BasicLogin)
export default Login

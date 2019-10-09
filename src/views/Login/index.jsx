import './index.less'
import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
const FormItem = Form.Item

class BasicLogin extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((errs, values) => {
      if (!errs && values) {
        console.log('values', values)
        if (values.userName !== '18126823343') {
          console.log('账号错误');
          message.error('账号错误');
          return false;
        }
        if (values.password !== 'a123456b') {
          console.log('密码错误');
          message.error('密码错误');
          return false;
        }
        else {
          message.success('登录成功');
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

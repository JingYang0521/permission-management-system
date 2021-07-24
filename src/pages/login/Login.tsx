import React, { Component, createRef, Fragment, RefObject } from 'react';
import {
  Form,
  FormInstance,
  Input,
  Checkbox,
  Button,
  Space,
  message,
} from 'antd';
import '../../static/css/login.css';
import { login } from '../../api/login';
import { setLocalStorageItem } from '../../utils/storage';

export interface IAppProps {}

export interface IAppState {}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

export default class Login extends Component<IAppProps, IAppState> {
  formRef: RefObject<FormInstance>;

  constructor(props: IAppProps, context: any) {
    super(props);

    this.state = {};
    this.formRef = createRef<FormInstance>();
  }

  login = (form: any) => {
    login(form.username, form.password).then((res: any) => {
      const { code, msg, data } = res.data;
      if (code === 0) {
        setLocalStorageItem('token', data.token);
        window.location.href = '/'
        message.success(msg);
      } else {
        message.error(msg);
      }
    });
  };

  public render() {
    return (
      <>
        <Form
          id="login-form"
          {...layout}
          ref={this.formRef}
          onFinish={this.login}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={() => {}}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </>
    );
  }
}

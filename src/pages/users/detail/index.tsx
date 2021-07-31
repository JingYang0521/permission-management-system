import React, { Component, createRef, RefObject } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  FormInstance,
  Space,
  message,
} from 'antd';
import { addUser, updateUser } from '../../../api/user';
import { IUser } from '../../../interface/types';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IProps {
  visible: boolean;
  loading?: boolean;
  title: string;
  handleHide: () => void;
  initialValues?: IUser;
  refreshUserList: () => void;
}

interface IState {}

export default class Detail extends Component<IProps, IState> {
  formRef: RefObject<FormInstance>;
  constructor(props: IProps, context: any) {
    super(props);
    this.formRef = createRef<FormInstance>();
  }

  componentDidMount() {
    this.formRef.current?.setFieldsValue({
      email: null,
      ...this.props.initialValues,
      password: null,
    });
  }

  onFinish = async (user: IUser) => {
    const { initialValues } = this.props;
    let params = {
      ...initialValues,
      ...user,
    };
    if (!initialValues || !initialValues.id) {
      await addUser(params);
    } else {
      await updateUser(params);
    }
    message.success('Success!');
    this.props.refreshUserList();
    this.formRef.current?.resetFields();
    this.props.handleHide();
  };
  render() {
    const { visible, title, handleHide, initialValues } = this.props;
    if (!visible) return null;
    return (
      <>
        <Modal
          visible={visible}
          title={title}
          onCancel={handleHide}
          footer={null}
        >
          <Form {...layout} onFinish={this.onFinish} ref={this.formRef}>
            <Form.Item
              name="name"
              label="Name"
              initialValue={initialValues?.name}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              initialValue={initialValues?.phone}
              rules={[
                { required: true, message: 'Please input your phone number!' },
              ]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              initialValue={initialValues?.email}
              rules={[{ type: 'email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              initialValue={Number(initialValues?.gender) || null}
              rules={[{ required: true }]}
            >
              <Select placeholder="Select a option" allowClear>
                <Option value={0}>Male</Option>
                <Option value={1}>Female</Option>
                <Option value={2}>Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              initialValue={null}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              initialValue={null}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={handleHide}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

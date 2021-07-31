import React, { Component, createRef, RefObject } from 'react';
import { Modal, Form, Input, Tree, Space, Button } from 'antd';
import { FormInstance, RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import { IPermission, IRole } from '../../../interface/types';
import { addRole, updateRole } from '../../../api/role';
const { DirectoryTree } = Tree;
interface IProps {
  visible: boolean;
  loading?: boolean;
  handleHide: () => void;
  permissionList: IPermission[];
  refreshRoleList: () => void;
  initialValues?: IRole;
}

interface IState {}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

export default class RoleDetail extends Component<IProps, IState> {
  formRef: RefObject<FormInstance>;
  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.formRef = createRef<FormInstance>();
  }

  onCheck = (
    checked: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[] },
    info: any
  ) => {
    this.formRef.current?.setFieldsValue({
      permissions: checked,
    });
  };

  onFinish = async (form: any) => {
    const params = {
      ...this.props.initialValues,
      ...form,
      permissions: form.permissions.checked,
    };
    if (params.id) {
      await updateRole(params);
    } else {
      await addRole(params);
    }
    this.formRef.current?.resetFields();
    this.props.refreshRoleList();
    this.props.handleHide();
  };

  render() {
    const { visible, handleHide, permissionList, initialValues } = this.props;
    if (!visible) return null;
    return (
      <Modal
        visible={visible}
        title="Permission management"
        onCancel={handleHide}
        footer={null}
      >
        <Form
          ref={this.formRef}
          initialValues={{ initialValues }}
          {...layout}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="role"
            label="Role Name"
            initialValue={initialValues?.role}
            rules={[
              {
                required: true,
                validator: (rule: RuleObject, value: StoreValue) => {
                  if (!value) {
                    return Promise.reject('Role name is required!');
                  }
                  if (value.length < 2 || value.length > 45) {
                    return Promise.reject(
                      'Role name must include at least 2 letters and no more than 45 letters!'
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="Permissions"
            rules={[{ required: true }]}
            initialValue={initialValues?.permissions}
          >
            <DirectoryTree
              checkable
              checkStrictly
              defaultExpandAll
              defaultCheckedKeys={initialValues?.permissions}
              onCheck={this.onCheck}
              treeData={permissionList}
            />
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
    );
  }
}

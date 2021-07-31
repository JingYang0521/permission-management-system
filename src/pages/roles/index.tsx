import React, { Component } from 'react';
import { Button, Space } from 'antd';
import RoleTable from './RoleTable';
import { getPermissionList, getRoleList } from '../../api/role';
import { IPagination, IPermission, IRole } from '../../interface/types';
import RoleDetail from './detail';
import { generateTree } from '../../utils/tool';
interface IProps {}
interface IState {
  visible: boolean;
  title: string;
  initialValues?: IRole;
  loading: boolean;
  pagination: IPagination;
  permissionList: IPermission[];
  roleList: IRole[];
}
export default class RoleList extends Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props);
    this.state = {
      pagination: {
        position: ['bottomRight'],
        total: 0,
        pageSize: 10,
        showSizeChanger: false,
      },
      roleList: [],
      visible: false,
      title: 'Add',
      initialValues: {},
      loading: true,
      permissionList: [],
    };
  }
  componentDidMount() {
    this.refreshRoleList();
    this.refreshPermissionList();
  }

  refreshPermissionList = () => {
    getPermissionList().then((res: any) => {
      const data = res.data;
      const rawPermission = data.data;
      this.setState({
        permissionList: generateTree(rawPermission),
      });
    });
  };

  /**
   * Get user list
   */
  refreshRoleList = () => {
    getRoleList({ page: 1, limit: 10 }).then((res) => {
      const data = res.data;
      const roleList = data.data;
      const pagination = {
        ...this.state.pagination,
        total: data.total,
        pageSize: data.limit,
      };
      this.setState({
        roleList,
        pagination,
        loading: false,
      });
    });
  };

  updateRole = (role: IRole) => {
    if (role.id) {
      this.setState(
        {
          initialValues: role,
        },
        () => {
          this.openDetailModal();
        }
      );
    }
  };

  openDetailModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideDetailModal = () => {
    this.setState({
      visible: false,
      initialValues: {},
    });
  };

  render() {
    return (
      <>
        <Space style={{ marginBottom: '6px' }}>
          <Button type="primary" onClick={this.openDetailModal}>
            Add
          </Button>
        </Space>
        <RoleTable
          refreshRoleList={this.refreshRoleList}
          userList={this.state.roleList}
          update={this.updateRole}
        />
        <RoleDetail
          visible={this.state.visible}
          handleHide={this.hideDetailModal}
          permissionList={this.state.permissionList}
          refreshRoleList={this.refreshRoleList}
          initialValues={this.state.initialValues}
        />
      </>
    );
  }
}

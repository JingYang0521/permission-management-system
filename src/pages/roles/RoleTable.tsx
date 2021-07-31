import React, { Component } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { AxiosResponse } from 'axios';
import { deleteRole } from '../../api/role';

interface IState {}

class RoleTable extends Component<any, IState> {
  columns = [
    {
      title: 'Role',
      dataIndex: 'role',
      width: 200,
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      width: 400,
      render: (text: string, record: any) => {
        return text
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              onClick={() => this.props.update(record)}
              type="primary"
              ghost
            >
              Update
            </Button>
            <Popconfirm
              title="Are you sure to delete this role data"
              onConfirm={this.confirmDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  confirmDelete = (id: string) => {
    return (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
      deleteRole(id).then((res: AxiosResponse<any>) => {
        this.props.refreshRoleList();
      });
    };
  };
  render() {
    const { userList = [], pagination } = this.props;
    return (
      <>
        <Table
          loading={this.props.loading}
          rowKey="id"
          dataSource={userList}
          columns={this.columns}
          pagination={pagination}
        />
      </>
    );
  }
}

export default RoleTable;

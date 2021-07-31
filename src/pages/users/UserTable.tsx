import React, { Component } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { deleteUser } from '../../api/user';
import { AxiosResponse } from 'axios';

interface IState {}

class UserTable extends Component<any, IState> {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Telephone',
      dataIndex: 'phone',
      width: 200,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 150,
      render: (gender: number) => {
        let text = '';
        switch (Number(gender)) {
          case 0:
            text = 'Male';
            break;
          case 1:
            text = 'Female';
            break;
          case 2:
            text = 'Other';
            break;

          default:
            break;
        }
        return text;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
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
              title="Are you sure to delete this user data"
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
      deleteUser(id).then((res: AxiosResponse<any>) => {
        this.props.refreshUserList();
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

export default UserTable;

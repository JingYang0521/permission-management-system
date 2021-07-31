import { Button, Space } from 'antd';
import React, { Component } from 'react';
import { getUserList } from '../../api/user';
import { IPagination, IUser } from '../../interface/types';
import Detail from './detail';
import UserTable from './UserTable';

interface IProps {}
interface IState {
  userList: IUser[];
  visible: boolean;
  title: string;
  initialValues?: IUser;
  loading: boolean;
  pagination: IPagination;
}

class UserList extends Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props);
    this.state = {
      userList: [],
      pagination: {
        position: ['bottomRight'],
        total: 0,
        pageSize: 10,
        showSizeChanger: false,
      },
      visible: false,
      title: 'Add',
      initialValues: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.refreshUserList();
  }

  refreshUserList = () => {
    getUserList(1, 10).then((res) => {
      const data = res.data;
      const userList = data.data;
      const pagination = {
        ...this.state.pagination,
        total: data.total,
        pageSize: data.limit,
      };
      this.setState({
        userList,
        pagination,
        loading: false,
      });
    });
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

  updateUser = (record: IUser) => {
    if (record.id) {
      this.setState(
        {
          initialValues: record,
        },
        () => {
          this.openDetailModal();
        }
      );
    }
  };
  render() {
    return (
      <>
        <Space style={{ marginBottom: '6px' }}>
          <Button type="primary" onClick={this.openDetailModal}>
            Add
          </Button>
        </Space>
        <UserTable
          userList={this.state.userList}
          refreshUserList={this.refreshUserList}
          update={this.updateUser}
          pagination={this.state.pagination}
          loading={this.state.loading}
        />

        <Detail
          visible={this.state.visible}
          title={this.state.title}
          handleHide={this.hideDetailModal}
          initialValues={this.state.initialValues}
          refreshUserList={this.refreshUserList}
        />
      </>
    );
  }
}

export default UserList;

import React, { Component } from 'react';
import { Layout, Avatar } from 'antd';
import "./index.css";
const { Header } = Layout;
class Navigation extends Component {
  render() {
    return (
      <>
        <Header className="header" id='nav'>
          <div className="logo" />
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>YJ</Avatar>
        </Header>
      </>
    );
  }
}
export default Navigation;

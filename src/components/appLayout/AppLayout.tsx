import React, { Component } from 'react';
import { Layout } from 'antd';
import LeftBar from '../leftBar/LeftBar';
import Navigation from '../navigation/Navigation';
import Bread from '../bread/Bread';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { unAuthRouters } from '../../router';

const { Content } = Layout;

interface IProps extends RouteComponentProps {}
interface IState {}

const unAuthPath = unAuthRouters.map((item) => item.path);
class AppLayout extends Component<IProps, IState> {
  render() {
    if (unAuthPath.includes(this.props.location.pathname)) {
      return (
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {this.props.children}
        </Content>
      );
    }
    return (
      <Layout>
        <Navigation />
        <Layout>
          <LeftBar />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Bread />
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(AppLayout);

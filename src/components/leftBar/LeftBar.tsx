import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

import leftRouters, { IRouter } from '../../router/index';
import {
  matchPath,
  NavLink,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import routerList from '../../router/index';
const { SubMenu } = Menu;
const { Sider } = Layout;

interface IProps extends RouteComponentProps {}
interface IState {
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
}

class LeftBar extends Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props);
    this.state = {
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
    };
  }
  componentDidMount() {
    this.hightLightMenu(leftRouters);
  }

  hightLightMenu = (leftRoutes: IRouter[]) => {
    let path = this.props.location.pathname;
    leftRoutes.forEach((r) => {
      let match = matchPath(path, { path: r.path });
      if (match) {
        if (match.isExact) {
          this.setState({
            defaultSelectedKeys: [r.key],
          });
        } else {
          this.setState({
            defaultOpenKeys: [r.key],
          });
        }
      }
      if (r.children) {
        this.hightLightMenu(r.children);
      }
    });
  };

  generateMenu = (routerList?: IRouter[]) => {
    if (routerList) {
      return routerList.map((r) => {
        if (r.children) {
          return (
            <SubMenu key={r.key} icon={r.icon} title={r.title}>
              {this.generateMenu(r.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={r.key} icon={r.icon}>
              <NavLink to={r.path} exact={r.exact}>
                {r.title}
              </NavLink>
            </Menu.Item>
          );
        }
      });
    }
  };
  render() {
    if (this.state.defaultSelectedKeys.length === 0) {
      return null;
    }
    return (
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultOpenKeys={this.state.defaultOpenKeys}
          style={{ height: '100%', borderRight: 0 }}
        >
          {this.generateMenu(routerList)}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(LeftBar);

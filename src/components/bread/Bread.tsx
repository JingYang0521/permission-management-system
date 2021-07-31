import React, { Component, Fragment, ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { matchPath, RouteComponentProps, withRouter } from 'react-router-dom';
import leftRouters, { IRouter } from '../../router';
interface IProps extends RouteComponentProps {}
interface IState {}
class Bread extends Component<IProps, IState> {
  generateBread = (routeList?: IRouter[]): ReactNode => {
    let path = this.props.location.pathname;
    if (!routeList) return null;
    return (
      <>
        {routeList.map((r) => {
          let match = matchPath(path, { path: r.path });
          if (match) {
            return (
              <Fragment key={r.key}>
                <Breadcrumb.Item>{r.title}</Breadcrumb.Item>
                {this.generateBread(r.children)}
              </Fragment>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  };
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {this.generateBread(leftRouters)}
        </Breadcrumb>
      </div>
    );
  }
}
export default withRouter(Bread);

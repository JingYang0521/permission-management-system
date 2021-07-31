import React, { Component, ReactNode, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  // NavLink,
} from 'react-router-dom';
import leftRouters, { IRouter, unAuthRouters } from '../../router';
import AppLayout from '../appLayout/AppLayout';

class View extends Component {
  generateRoute = (routerList?: IRouter[]): ReactNode => {
    return routerList?.map((r) => {
      if (r.children) {
        return this.generateRoute(r.children);
      }
      return (
        <Route path={r.path} key={r.key} exact={r.exact}>
          {r.component}
        </Route>
      );
    });
  };
  render() {
    return (
      <>
        <Router>
          <AppLayout>
            <Suspense fallback={<>Loading...</>}>
              <Switch>
                {/* <AppLayout>{this.generateRoute(leftRouters)}</AppLayout> */}
                {this.generateRoute(leftRouters)}
                {unAuthRouters?.map((r) => {
                  return (
                    <Route path={r.path} key={r.key} exact={r.exact}>
                      {r.component}
                    </Route>
                  );
                })}
                <Redirect to="/404" />
              </Switch>
            </Suspense>
          </AppLayout>
        </Router>
      </>
    );
  }
}

export default View;

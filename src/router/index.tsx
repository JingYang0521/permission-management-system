import react, { ReactNode, lazy } from 'react';
import {
  UserOutlined,
  ApartmentOutlined,
  HomeOutlined,
} from '@ant-design/icons';
const Login = lazy(() => import('../pages/login/Login'));
const Home = lazy(() => import('../pages/home'));
const UserList = lazy(() => import('../pages/users'));
const RoleList = lazy(() => import('../pages/roles'));
const Page404 = lazy(() => import('../pages/Page404'));
export interface IRouter {
  title: string;
  key: string;
  path: string;
  exact?: boolean;
  icon?: ReactNode;
  component?: ReactNode;
  children?: IRouter[];
}

const leftRouters: IRouter[] = [
  {
    path: '/home',
    key: 'home',
    exact: true,
    title: 'Home',
    icon: <HomeOutlined />,
    component: <Home />,
  },
  {
    path: '/user',
    key: 'userManagement',
    title: 'User Management',
    icon: <UserOutlined />,
    children: [
      {
        path: '/user/list',
        key: 'userList',
        exact: true,
        title: 'User List',
        component: <UserList />,
      },
    ],
  },
  {
    path: '/role',
    key: 'roleManagement',
    title: 'Role Management',
    icon: <ApartmentOutlined />,
    children: [
      {
        path: '/role/list',
        key: 'roleList',
        exact: true,
        title: 'Role List',
        component: <RoleList />,
      },
    ],
  },
];

export const unAuthRouters: IRouter[] = [
  {
    path: '/login',
    key: 'login',
    exact: true,
    title: 'Login',
    component: <Login />,
  },
  {
    path: '/404',
    key: '404',
    exact: true,
    title: '404',
    component: <Page404 />,
  },
];
export default leftRouters;

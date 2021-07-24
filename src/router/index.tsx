import react, { ReactNode, lazy } from 'react';
import {
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
} from '@ant-design/icons';
const Login = lazy(() => import('../pages/login/Login'));
const Home = lazy(() => import('../pages/home/Home'));
const UserList = lazy(() => import('../pages/users/UserList'));
const AdminList = lazy(() => import('../pages/admins/AdminList'));
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
    path: '/admin',
    key: 'adminManagement',
    title: 'Admin Management',
    icon: <TeamOutlined />,
    children: [
      {
        path: '/admin/list',
        key: 'adminList',
        exact: true,
        title: 'Admin List',
        component: <AdminList />,
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

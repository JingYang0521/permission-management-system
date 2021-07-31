export interface IUser {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  gender?: number;
  password?: string;
}

export interface IPagination {
  position: string[];
  total: number;
  pageSize: number;
  showSizeChanger: boolean;
}

export interface IPermission {
  title: string,
  id: string,
  isMenu: number,
  parentId?: string,
  method?: string[],
  children?: IPermission[],
  key: string,
}

export interface IRole {
  id?: string,
  role?: string,
  permissions?: string[]
}
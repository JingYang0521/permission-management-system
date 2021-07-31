const express = require('express'),
  route = express.Router(),
  uuid = require('uuid');
const fsPromise = require('../lib/myFs'),
  { responseInfo } = require('../lib/utils');

route.use(async (req, res, next) => {
  req.$PERMISSION_LIST = JSON.parse(
    await fsPromise.readFile('./mock/permissionList.json')
  );
  next();
});

// 获取权限分配列表
route.get('/permissionList', (req, res) => {
  let data = req.$PERMISSION_LIST;
  responseInfo(res, {
    data,
  });
  return;
});

// 获取角色列表
route.get('/roleList', (req, res) => {
  let { limit = 10, page = 1 } = req.body;
  limit = parseInt(limit);
  page = parseInt(page);
  let total = req.ROLE_LIST.length,
    pages = Math.ceil(total / limit),
    data = [];
  for (let i = (page - 1) * limit; i < page * limit; i++) {
    let item = req.ROLE_LIST[i];
    if (!item) break;
    data.push(item);
  }
  if (data.length === 0) {
    responseInfo(res, {
      code: 1,
      codeText: 'Not data found!',
    });
    return;
  }
  responseInfo(res, {
    page,
    limit,
    pages,
    total,
    data,
  });
});

// 添加角色
route.post('/addRole', (req, res) => {
  const { role = '', id = uuid.v4(), permissions = [] } = req.body;
  req.ROLE_LIST.push({
    role,
    permissions,
    id,
  });
  fsPromise
    .writeFile('./mock/role.json', req.ROLE_LIST)
    .then((_) => {
      responseInfo(res);
    })
    .catch((_) => {
      responseInfo(res, {
        code: 1,
        codeText: 'Fail to add!',
      });
    });
});

// 删除角色
route.delete('/deleteRole', (req, res) => {
  const { id } = req.body;
  req.ROLE_LIST = req.ROLE_LIST.filter((item) => item.id !== id);
  fsPromise
    .writeFile('./mock/role.json', req.ROLE_LIST)
    .then((_) => {
      responseInfo(res);
    })
    .catch((_) => {
      responseInfo(res, {
        code: 1,
        codeText: 'Fail to add!',
      });
    });
});

// 修改角色
route.post('/updateRole', (req, res) => {
  const { id, name = '', permissions = [] } = req.body;
  if (!id) {
    responseInfo(res, {
      code: 1,
      codeText: 'Role id is required!',
    });
    return;
  }
  req.ROLE_LIST = req.ROLE_LIST.map((item) => {
    if (item.id === id) {
      item = {
        ...item,
        name,
        permissions,
      };
    }
    return item;
  });
  fsPromise
    .writeFile('./mock/role.json', req.ROLE_LIST)
    .then((_) => {
      responseInfo(res);
    })
    .catch((_) => {
      responseInfo(res, {
        code: 1,
        codeText: 'Fail to update!',
      });
    });
});

module.exports = route;

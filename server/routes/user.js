const express = require('express'),
  route = express.Router(),
  uuid = require('uuid');
const fsPromise = require('../lib/myFs'),
  { responseInfo, dbMD5, checkTimeWithin30Min } = require('../lib/utils');

route.use(async (req, res, next) => {
  req.$USER = JSON.parse(await fsPromise.readFile('./mock/user.json'));
  req.$CODE = JSON.parse(await fsPromise.readFile('./mock/code.json'));
  next();
});

// 登录处理
route.post('/login', (req, res) => {
  let { username = '', password = '', type = 1 } = req.body;
  password = dbMD5(password);
  let data;
  /* 账号密码登录 */
  if (parseInt(type) === 1) {
    data = req.$USER.find((item) => {
      return (
        (item.name === username || item.phone === username) &&
        item.password === password
      );
    });
  }
  /* 短信验证 */
  if (parseInt(type) === 0) {
    data = req.$CODE.find((item) => {
      return (
        item.phone === username &&
        item.code === password &&
        checkTimeWithin30Min(item.time)
      );
    });
    if (data) {
      data = req.$USER.find((item) => {
        return item.phone === data.phone;
      });
    }
  }

  /* 返回对应的结果 */
  if (!data) {
    responseInfo(res, {
      code: 1,
      codeText: 'Wrong account or password!',
    });
    return;
  }

  /* 如果登录成功，需要服务器端记录登录状态 */
  /**
   * 服务器端需要存储登录态
   *    登录成功后可以把信息存储到session/redis中
   *    登录成功，服务器种植session（sid：和客户端建立的唯一标识符），存储当前登录用户的ID
   *    返回客户端信息（一旦服务器设置了session，返回给客户端的信息在响应头中会带着set-cookie字段，存储的是sid）
   *
   * 客户端
   *    发现set-cookie会往本地设置一份，在下一次请求的时候基于请求头Cookies把信息再次发送给服务器
   *
   * 服务器
   *    拿到sid，到指定的session中找到用户的ID
   */
  req.session.userId = parseInt(data.id);
  responseInfo(res, {
    code: 0,
    codeText: 'Success to login!',
    data: {
      id: data.id,
      name: data.id,
      phone: data.phone,
      pic: data.pic,
    },
  });
});

// 校验是否登录
route.get('/login', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    responseInfo(res, {
      code: 1,
      codeText: 'You have not logged in yet!',
    });
    return;
  }
  responseInfo(res);
});

// 退出登录
route.get('/signout', (req, res) => {
  req.session.userId = null;
  responseInfo(res);
});

// 获取用户列表
route.get('/userList', (req, res) => {
  let { limit = 10, page = 1 } = req.body;
  limit = parseInt(limit);
  page = parseInt(page);
  let total = req.USER_LIST.length,
    pages = Math.ceil(total / limit),
    data = [];
  for (let i = (page - 1) * limit; i < page * limit; i++) {
    let item = req.USER_LIST[i];
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

// 添加用户
route.post('/addUser', (req, res) => {
  const {
    name = '',
    phone = '',
    gender = 0,
    password = '',
    email = '',
  } = req.body;
  req.USER_LIST.push({
    id: uuid.v4(),
    name,
    phone,
    gender,
    password: dbMD5(password),
    type: 1, // 登录方式 默认1
    email,
    createTime: new Date(),
  });
  fsPromise
    .writeFile('./mock/user.json', req.USER_LIST)
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

// 删除用户
route.delete('/deleteUser', (req, res) => {
  const { id } = req.body;
  req.USER_LIST = req.USER_LIST.filter((item) => item.id !== id);
  fsPromise
    .writeFile('./mock/user.json', req.USER_LIST)
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

// 修改用户
route.post('/updateUser', (req, res) => {
  const {
    id,
    name = '',
    phone = '',
    gender = 0,
    password = '',
    email = '',
  } = req.body;
  if (!id) {
    responseInfo(res, {
      code: 1,
      codeText: 'User id is required!',
    });
    return;
  }
  req.USER_LIST = req.USER_LIST.map((item) => {
    if (item.id === id) {
      item = {
        ...item,
        name,
        phone,
        gender,
        email,
        password: dbMD5(password),
      };
    }
    return item;
  });
  fsPromise
    .writeFile('./mock/user.json', req.USER_LIST)
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

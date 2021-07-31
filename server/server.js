const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const session = require('express-session');
const fsPromise = require('./lib/myfs');
const { responseInfo } = require('./lib/utils');
const config = require('./config');

/* 创建服务 */
const app = express();
/* 创建服务监听端口号 */
app.listen(config.port, (_) => {
  console.log(`Server is running on port ${config.port}`);
});

/* 中间件：在处理请求之前统一做的事情 */
/* 设置CORS跨域请求的中间件 原理：服务器设置允许指定的源进行访问*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.cors.origin); // 设置允许的源（* 或者 具体源(一个) => 一旦设置*则不能携带cookie）
  res.header('Access-Control-Allow-Credentials', config.cors.credentials); // 设置是否允许携带资源凭证
  res.header('Access-Control-Allow-Headers', config.cors.headers); // 允许哪些请求头
  res.header('Access-Control-Allow-Methods', config.cors.methods);
  /* 对浏览器默认发送的试探请求做处理 */
  /^OPTIONS$/i.test(req.method)
    ? res.send('Current service support cross domain requests!')
    : next();
});

/* With express version => 4.16.0 the body-parser middleware was added back under the methods express.urlencoded() and express.json() */
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
// app.use(
//   bodyParser.urlencoded({
//     // 把请求主体传递的信息 x-www-form-irlencoded 变为对象键值对的方式，储存到req.body上(bodyParser中间件完成的事情)
//     extended: false,
//   })
// );
// app.use(express.json());
 
app.use(session(config.session));
/* 写了next就会继续执行下面的代码 */
app.use(async (req, res, next) => {
  req.TODO_DATA = await fsPromise.readFile('./mock/todoList.json');
  req.TODO_DATA = JSON.parse(req.TODO_DATA);
  req.USER_LIST = await fsPromise.readFile('./mock/user.json');
  req.USER_LIST = JSON.parse(req.USER_LIST);
  req.PERMISSION_LIST = await fsPromise.readFile('./mock/permissionList.json');
  req.PERMISSION_LIST = JSON.parse(req.PERMISSION_LIST);
  req.ROLE_LIST = await fsPromise.readFile('./mock/role.json');
  req.ROLE_LIST = JSON.parse(req.ROLE_LIST);
  // 处理完当前事情，让其继续向下匹配处理
  next();
});

/* API接口的处理 */
app.use('/user', require('./routes/user'));
app.use('/todo', require('./routes/todo'));
app.use('/role', require('./routes/role'));

// app.get('/api/todoList', (req, res) => {
//   let { limit = 5, page = 1 } = req.query;
//   limit = parseInt(limit);
//   page = parseInt(page);
//   let total = req.TODO_DATA.length,
//     pages = Math.ceil(total / limit),
//     data = [];
//   for (let i = (page - 1) * limit; i < page * limit; i++) {
//     let item = req.TODO_DATA[i];
//     if (!item) break;
//     data.push(item);
//   }
//   if (data.length === 0) {
//     responseInfo(res, {
//       code: 1,
//       codeText: 'Not data found!',
//     });
//     return;
//   }
//   responseInfo(res, {
//     page,
//     limit,
//     pages,
//     total,
//     data,
//   });
// });
// app.post('/api/addTodo', (req, res) => {
//   let { title = '', content = '', status = 0 } = req.body;
//   req.TODO_DATA.push({
//     id: uuid(),
//     title,
//     content,
//     status,
//   });
//   fsPromise
//     .writeFile('./mock/todoList.json', req.TODO_DATA)
//     .then((_) => {
//       responseInfo(res);
//     })
//     .catch((_) => {
//       responseInfo(res, {
//         code: 1,
//         codeText: 'Fail to add!',
//       });
//     });
// });

// /* 静态资源处理 */
// app.use(express.static('./static'));

/* 以上都不成立就会走👇的这步 */
app.use((req, res) => {
  res.status(404).send({
    code: 1,
    codeText: 'BAD REQUEST！',
  });
});

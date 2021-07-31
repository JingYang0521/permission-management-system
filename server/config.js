module.exports = {
  port: 9000,
  session: {
    secret: 'Jing.Y', // 加密的密钥
    saveUnintialized: false, // 是否触发保存
    resave: false, // 是否重新存储
    cookie: {
      maxAge: 1000 * 60 * 24 * 30, // 设置cookie过期时间
    },
  },
  cors: {
    // origin: 'http://127.0.0.1:3000', // 允许的源
    credentials: true, // 是否允许携带资源凭证
    headers:
      'Content-Type,Content-Length,Authorization,Accept,X-Requested-With', // 允许的请求头
    methods: 'PUT,POST,GET,DELETE,OPTIONS,HEAD',
  },
};

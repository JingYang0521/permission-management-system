const uuid = require('uuid');

const responseInfo = (res, options) => {
  let config = Object.assign(
    {
      code: 0,
      codeText: 'ok!',
    },
    options
  );
  res.status(200).type('application/json').send(config);
};
const createId = (data) => {
  return uuid.v4();
};
const dbMD5 = (text) => {
  return text
    .substring(4, text.length - 4)
    .split('')
    .reverse()
    .join('');
};

const checkTimeWithin30Min = (time) => {
  let now = new Date().getTime();
  return now - time <= 30 * 60 * 1000;
};

const checkPhone = (req, phone) => {
  return req.$USER_DATA.find((item) => {
    return item.phone === phone;
  });
};

module.exports = {
  responseInfo,
  createId,
  dbMD5,
  checkTimeWithin30Min,
  checkPhone,
};

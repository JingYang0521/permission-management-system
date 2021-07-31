const fs = require('fs'),
  path = require('path');

function readFile(pathName, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    pathName = path.resolve(pathName);
    fs.readFile(pathName, encoding, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function writeFile(pathName, data, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    pathName = path.resolve(pathName);
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    fs.writeFile(pathName, data, encoding, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = { readFile, writeFile };

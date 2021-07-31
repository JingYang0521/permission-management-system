const random = function (n, m) {
  return Math.round(Math.random() * (m - n) + n);
};
const area1 = '01';
const area2 = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const queryTitle = () => {
  return new Array(6)
    .fill(null)
    .map((item) => {
      return area2[random(0, 9)];
    })
    .join('');
};
const queryContent = () => {
  return new Array(10)
    .fill(null)
    .map((item) => {
      return area2[random(0, 25)];
    })
    .join('');
};
const queryStatus = () => {
  return Number(area1[random(0, 1)]);
};

let arr = [];
for (let i = 2; i <= 5; i++) {
  arr.push({
    id: i,
    title: queryTitle(),
    content: queryContent(),
    status: queryStatus(),
  });
}

var fs = require('fs');
let TODO_DATA = fs.readFileSync('./todoList.json', 'utf8');
TODO_DATA = JSON.parse(TODO_DATA);
TODO_DATA = TODO_DATA.concat(arr);
fs.writeFileSync('./todoList.json', JSON.stringify(TODO_DATA), 'utf8');

export {}
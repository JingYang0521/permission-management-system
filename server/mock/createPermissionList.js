// const method = ['DELETE', 'UPDATE', 'ADD'];
const method = (title, pId) => {
  return [
    {
      title: `Delete ${title}`,
      id: `${pId}-1`,
      parentId: pId
    },
    {
      title: `Update ${title}`,
      id: `${pId}-2`,
      parentId: pId
    },
    {
      title: `Add ${title}`,
      id: `${pId}-3`,
      parentId: pId
    },
  ]
}
const route = [
  {
    title: 'Home',
    id: 'home-1',
  },
  {
    title: 'User management',
    id: 'user-1',
    children: [
      {
        title: 'User list',
        id: 'user-1-1',
        parentId: 'user-1',
        children: method('User list', 'user-1-1'),
      },
    ],
  },
  {
    title: 'Role management',
    id: 'role-1',
    children: [
      {
        title: 'Role list',
        id: 'role-1-1',
        parentId: 'role-1',
        children: method('Role list', 'role-1-1'),
      },
    ],
  },
];

const ROLE_DATA = [];
const flat = (nodes) => {
  if (!nodes || nodes.length === 0) return [];
  nodes.forEach(node => {
    let item = {
      title: node.title,
      id: node.id,
      parentId: node.parentId,
      isMenu: 1,
    }
    if(!node.children) {
      item['method'] = node.method;
      item['isMenu'] = 0;
    }
    ROLE_DATA.push(item)
    if(node.children) {
      return flat(node.children)
    }
  });
};
flat(route);


const fs = require('fs');
fs.writeFileSync('./permissionList.json', JSON.stringify(ROLE_DATA), 'utf8');


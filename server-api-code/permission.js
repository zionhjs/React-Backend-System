const Mock = require('mockjs');
let data = Mock.mock({
  "permission": [
      {
        "id": 1570872939736,
        "del": 0,
        "status": 0,
        "subon": "2019-10-12 17:35:39",
        "subby": 1006,
        "des": "BackEndManagement",
        "type": "menu",
        "code": "111111",
        "pId": 0,
        "url": "/home/user_mgr",
        "order": 1
      },
      {
        "id": 1570872961833,
        "del": 0,
        "status": 0,
        "subon": "2019-10-12 17:36:1",
        "subby": 1006,
        "des": "ShopManagement",
        "type": "menu",
        "code": "222222",
        "pId": 0,
        "url": "/home/shop_mgr",
        "order": "2"
      },
      {
        "id": 1570872984243,
        "del": 0,
        "status": 0,
        "subon": "2019-10-12 17:36:24",
        "subby": 1006,
        "des": "UserManagement",
        "type": "menu",
        "code": "333333",
        "pId": "1570872939736",
        "url": "/home/user_mgr",
        "order": 1
      },
      {
        "id": 1570873025381,
        "del": 0,
        "status": 0,
        "subon": "2019-10-12 17:37:5",
        "subby": 1006,
        "des": "RoleManagement",
        "type": "menu",
        "code": "55555",
        "pId": "1570872939736",
        "url": "/home/role_mgr",
        "order": "2"
      },
      {
        "id": 1570873044424,
        "del": 0,
        "status": 0,
        "subon": "2019-10-12 17:37:24",
        "subby": 1006,
        "des": "PermissionManagement",
        "type": "menu",
        "code": "10001",
        "pId": "1570872939736",
        "url": "/home/per_mgr",
        "order": "3"
      },
      {
        "id": 1570873067019,
        "del": 0,
        "status": 0,
        "subon": "2019-10-12 17:37:47",
        "subby": 1006,
        "des": "GoodsManagement",
        "type": "menu",
        "code": "55555",
        "pId": "1570872961833",
        "url": "/home/goods_mgr",
        "order": 1
      },
      {
        "id": 1570873115349,
        "del": 0,
        "status": 0,
        "subon": "2019-10-12 17:38:35",
        "subby": 1006,
        "des": "OrderManagement",
        "type": "menu",
        "pId": "1570872961833",
        "url": "/home/order_mgr",
        "order": 1
      }
  ],
  role: [{
    id: 5,
    pId: 0,
    name: 'Super_Manager',
    des: 'Super_Manager',
    subon: '2019-05-08 16:54:26',
    status: 0,
    del: 0
  },{
    id: 1,
    pId: 0,
    name: 'Manager',
    des: 'Manager',
    subon: '2019-05-08 16:54:26',
    status: 0,
    del: 0
  },{
    id: 2,
    pId: 0,
    name: 'Backend-Developer',
    des: 'Backend-Developer',
    subon: '2019-05-08 16:54:26',
    status: 0,
    del: 0
  },{
    id: 3,
    pId: 0,
    name: 'Teacher',
    des: 'Teacher',
    subon: '2019-05-08 16:54:26',
    status: 0,
    del: 0
  },{
    id: 4,
    pId: 0,
    name: 'Student',
    des: 'Student',
    subon: '2019-05-08 16:54:26',
    status: 0,
    del: 0
  }],
  user_role: [
    {
      "id": 1570873185899,
      "del": 0,
      "subon": "2019-10-12 17:39:45",
      "roleId": 2,
      "userId": 1006
    }
  ],
  user_permission: [
  ],
  "role_permission": [
    {
      "id": 1570873167128,
      "del": 0,
      "subon": "2019-10-12 17:39:27",
      "permissionId": 1570872939736,
      "roleId": 2
    },
    {
      "id": 1570873167129,
      "del": 0,
      "subon": "2019-10-12 17:39:27",
      "permissionId": 1570872961833,
      "roleId": 2
    },
    {
      "id": 1570873167130,
      "del": 0,
      "subon": "2019-10-12 17:39:27",
      "permissionId": 1570872984243,
      "roleId": 2
    },
    {
      "id": 1570873167131,
      "del": 0,
      "subon": "2019-10-12 17:39:27",
      "permissionId": 1570873044424,
      "roleId": 2
    },
    {
      "id": 1570873167132,
      "del": 0,
      "subon": "2019-10-12 17:39:27",
      "permissionId": 1570873025381,
      "roleId": 2
    },
    {
      "id": 1570873167133,
      "del": 0,
      "subon": "2019-10-12 17:39:27",
      "permissionId": 1570873067019,
      "roleId": 2
    }
  ],
  menu: [{
    id: 1,
    order: 1,
    title: 'Student-Management',
    des: 'Student-Management',
    url: '/student',
    del: 0,
    status: 0,
    pId: 0,
    permissionId: 1
  }, {
    id: 2,
    order: 2,
    title: 'Teacher-Management',
    des: 'Teacher-Management',
    url: '/teacher',
    del: 0,
    status: 0,
    pId: 0,
    permissionId: 2
  },{
    id: 3,
    order: 3,
    title: 'Student-List',
    des: 'Student-List',
    url: '/student/list',
    del: 0,
    status: 0,
    pId: 1,
    permissionId: 3
  }, ],
  resource:[{
    id: 1,
    pId: 0,
    del: 0,
    status: 0,
    type: 'button',
    permissionCode: 6,
    permissionId: 6
  }]
});
module.exports = data;

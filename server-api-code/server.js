const jsonServer = require('json-server');
const server = jsonServer.create();
const permissionData = require('./permission');
const captcha = require('svg-captcha');

const userArr = require('./user');
const routerUser = jsonServer.router({...{user:userArr}, ...permissionData});
const multer = require('multer');
const path = require('path');
const middlewares = jsonServer.defaults();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, 'public/server/upload')); // 文件存储的路径
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname); // 调整文件的保存地址
  }
});
const upload = multer({ storage: storage });   //dest or storage 在哪里存储文件

server.use(middlewares);   //use是express注册中间件的方法，它返回一个函数
server.use(jsonServer.bodyParser);   //.bodyParser是express非常常用的一个express中间件 用来处理 请求体text.. 编码utf8... 压缩类型gizip...

// 所有的api的请求都要求登陆后才能获取到对应的数据
server.use('/per', (req, res, next) => {   //use方法内部可以对访问路径进行判断 据此就能实现简单的路由 根据不同的请求地址 返回不同的网页内容
  if (req.get('Authorization')) {
    next();
  } else {
    res.status(401).jsonp({
      code: 8,
      msg: 'can\'t visit without Login!'
    });
  }
});

// 用户登录校验
server.post('/api/userlogin', (req, res) => {   //all get post put delete等都是use的别名 可以当作是按照use()来使用
  let userName = req.body.username;
  let password = req.body.password;
  let loginUser = userArr.find((item) => item.username == userName && item.password == password);
  if(loginUser) {
    res.jsonp({
      user: loginUser,
      code: 1,
      msg: 'Authrization Success!',
      token: 'google.com ' + Date.now()
    });
  } 
  else {
    res.jsonp({
      code: 0,
      msg: 'wrong username or password!'
    });
  }
});

// 验证码
server.get('/api/code', (req,res)=>{
  const cap = captcha.create({
    color: true,
    size: 6,
    ignoreChars: '0oOi1gjdDl',
    noise: 3
  });
  // req.session.captcha = cap.text; // session 存储
  res.type('svg'); // 响应的类型
  res.send(cap.data);
});

// 文件上传
server.all('/per/upload', upload.single('imgF'), function(req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  var file = req.file;
  console.log(file);

  console.log('docType:%s', file.mimetype);
  console.log('OriginalFileName:%s', file.originalname);
  console.log('FileSize:%s', file.size);
  console.log('FileSavePath:%s', file.path);
  res.json({ img: `/server/upload/${file.filename}` });
});

// 权限相关接口
// 获取用户的所有权限
server.use('/per/getUserPer/:id', (req, res) => {   //:id是模式匹配的方法 代表可以匹配所有的id
  // 获得当前用户的特殊权限
  let userPerArr = permissionData.user_permission.filter(item => item.userId == req.params.id);
  let userPerIdArr = userPerArr.map(userPer => userPer.permissionId);
  // 获取用户的角色
  let userRoleArr = permissionData.user_role.filter(item => item.userId == req.params.id);
  // 获得所有角色的权限
  let rolePerIdArr = [];
  permissionData.role_permission.forEach( rolePer => {
    if(userRoleArr.find(userRole => userRole.roleId == rolePer.roleId)) {
      rolePerIdArr.push(rolePer.permissionId);
    }
  });
  
  let totalPerIdArr =[...new Set([...userPerIdArr, ...rolePerIdArr])];   //这里获得的是所有角色权限id的数组
  let result = [];
  
  // 把所有权限map包装一下然后放入数组
  permissionData.permission.forEach(per => {
    if(totalPerIdArr.find(perId => per.id == perId && per.del == 0)) {
      result.push(per);
    }
  });
  res.json(result);
});

// server.use('/per', perRouter);
server.use('/per', routerUser);   //Express.Router()的用法 => app.user('/', router)

server.listen(8888, () => {
  console.log('API Server is running, http://localhost:8888');
});
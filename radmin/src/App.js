import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {AuthLogin, SaveLoginUserInfo} from './Common/Auth';

import Empty from './View/Empty';
import Login from './View/Login';
import Home from './View/Home';
import About from './View/About';

import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => {
          return <Redirect to="/home"></Redirect>
        }}></Route>
        <Route path="/home" render={(props) => {
          //校验当前用户是否已经登录 如果没有登录 跳转到登录页面
          if(!AuthLogin()){
            //跳转到登录页面前 记录当前用户要请求的页面 登录成功之后会跳转到用户之前要请求的地址 这个地址就是props.match.path
            return <Redirect to={`/login?preurl=${props.match.path}`}></Redirect>
          }
          //权限校验
          return <Home {...props}></Home>
        }}></Route>
        <Route path="/about" render={(props) => {
          //校验当前用户是否已经登录 如果没有登录 跳转到登录页面
          if(!AuthLogin()){
            //跳转到登录页面前 记录当前用户要请求的页面 登录成功之后会跳转到用户之前要请求的地址 这个地址就是props.match.path
            return <Redirect to={`/login?preurl=${props.match.path}`}></Redirect>
          }
          //权限校验
          return <About {...props}></About>
        }}></Route>
        <Route path="/login" component={Login}></Route>
        <Route component={Empty}></Route>
      </Switch>
    </Router>
  );
}

export default App;

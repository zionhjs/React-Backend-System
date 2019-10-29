import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Empty from './View/Empty';
import Login from './View/Login';
import Home from './View/Home';

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
          //权限校验
          return <Home {...props}></Home>
        }}></Route>
        <Route path="/login" component={Login}></Route>
        <Route component={Empty}></Route>
      </Switch>
    </Router>
  );
}

export default App;

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Top from '../../Components/Top';
import MenuBar from '../../Components/MenuBar';
import UserMgr from '../Admin/UserMgr';
import RoleMgr from '../Admin/RoleMgr';
import PerMgr from '../Admin/PerMgr';
import axios from 'axios';
import { getLoginToken } from '../../Common/Auth';
import AuthRoute from '../../Components/AuthRoute';
import GoodsMgr from '../GoodsMgr';
const { Header, Footer, Sider, Content } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    // 设置当前用户ajax请求的token
    axios.defaults.headers['Authorization'] = getLoginToken();
    sessionStorage.removeItem('LOGIN_USER_PER');
  }
  
  render () {
    const {match} = this.props;
    return (
      <Layout style={{height: '100vh'}}>
        <Header style={{color: '#fff', padding: '0 15px'}}>
          <Top history={this.props.history}></Top>
        </Header>
        <Layout style={{overflow: 'scroll'}}>
          <Sider style={{backgroundColor: '#FFF'}}>
            <MenuBar history={this.props.history}></MenuBar>
          </Sider>
          <Content style={{padding: '15px'}}>
            <Switch>
              <AuthRoute per={1570872984243} path={`${match.path}/user_mgr`} component={UserMgr}></AuthRoute>
              <AuthRoute per={1570873025381} path={`${match.path}/role_mgr`} component={RoleMgr}></AuthRoute>
              <AuthRoute per={1570873044424} path={`${match.path}/per_mgr`} component={PerMgr}></AuthRoute>
              <Route path={`${match.path}/goods_mgr`} component={GoodsMgr}></Route>
              <Route render={()=><h3>welcome to use our back-end management system!</h3>}></Route>
            </Switch>
          </Content>
        </Layout>
        <Footer style={{backgroundColor: 'silver', height: '24px', padding: '0', lineHeight: '24px'}}>Bottom</Footer>
      </Layout>
    )
  }
}

export default Home
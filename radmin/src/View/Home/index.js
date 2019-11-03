import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Top from '../../Components/Top';
import MenuBar from '../../Components/MenuBar';
import axios from 'axios';
import { getLoginToken } from '../../Common/Auth';
import {} from '../../Components/AuthRoute';
import AuthRoute from '../../Components/AuthRoute';
import GoodsMgr from '../GoodsMgr';

import UserMgr from '../Admin/UserMgr';
import RoleMgr from '../Admin/RoleMgr';
import PerMgr from '../Admin/PerMgr';

const {Header, Footer, Sider, Content} = Layout;

class Home extends Component {
    constructor(props){
        super(props);
        //设置当前用户ajax请求的token
        axios.defaults.headers['Authorization'] = getLoginToken();
    }
    
    render() {
        const {match} = this.props;
        return (
            <Layout style={{height:'100vh'}}>
                <Header style={{color:'#fff', padding:'0 15px'}}>
                    <Top history={this.props.history}></Top>
                </Header>
                <Layout style={{overflow: 'scroll'}}>
                    <Sider style={{backgroundColor:'#fff'}}>
                        <MenuBar history={this.props.history}></MenuBar>
                    </Sider>
                    <Content style={{padding:"15px"}}>
                        <Switch>
                            <AuthRoute per={} path={`${match.path}/user_mgr`} component={UserMgr}></AuthRoute>
                            <AuthRoute per={} path={`${match.path}/role_mgr`} component={RoleMgr}></Route>
                            <AuthRoute per={} path={`${match.path}/per_mgr`} component={PerMgr}></Route>
                            <Route path={`${match.path}/goods_mgr`} component={GoodsMgr}></Route>
                            <Route >Welcome to use aicoder.com backend-management system</Route>
                        </Switch>
                    </Content>
                </Layout>
                <Footer style={{backgroundColor: 'silver', height: '24px', padding: '0', lineHeight: '24px'}}>Footer</Footer>
            </Layout>
        )
    }
}

export default Home;
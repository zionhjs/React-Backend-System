import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Top from '../../Components/Top';
import MenuBar from '../../Components/MenuBar';
import axios from 'axios';
import { getLoginToken } from '../../Common/Auth';

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
            <Layout style={{minHeight:'100vh'}}>
                <Header style={{color:'#fff', padding:'0 15px'}}>
                    <Top history={this.props.history}></Top>
                </Header>
                <Layout>
                    <Sider style={{backgroundColor:'#fff'}}>
                        <MenuBar history={this.props.history}></MenuBar>
                    </Sider>
                    <Content style={{padding:"15px"}}>
                        <Switch>
                            <Route path={`${match.path}/user_mgr`} component={UserMgr}></Route>
                            <Route path={`${match.path}/role_mgr`} component={RoleMgr}></Route>
                            <Route path={`${match.path}/per_mgr`} component={PerMgr}></Route>
                            <Route render={()=><h3>WELCOME USE OUR SYSTEM</h3>}></Route>
                        </Switch>
                    </Content>
                </Layout>
                <Footer style={{backgroundColor:'silver', height:"38px"}}>Footer</Footer>
            </Layout>
        );
    }
}

export default Home;
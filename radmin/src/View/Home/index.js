import React, { Component } from 'react';
import { Layout } from 'antd';

const {Header, Footer, Sider, Content} = Layout;
class Home extends Component {
    render() {
        return (
            <Layout style={{minHeight:'100vh'}}>
                <Header style={{color:'#fff'}}>Header</Header>
                <Layout>
                    <Sider style={{backgroundColor:'silver'}}>Left</Sider>
                    <Content>Content</Content>
                </Layout>
                <Footer style={{backgroundColor:'silver'}}>Footer</Footer>
            </Layout>
        );
    }
}

export default Home;
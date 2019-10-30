import React, { Component, Fragment } from 'react';

import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

class MenuBar extends Component {
    state = {
        current:''
    }
    handleMenuClick = e => {
        console.log(e);
        //控制路由跳转
        this.setState({current:e.key});
        this.props.history.push(`/home/${e.key}`);
    }
    render() {
        return (
            <div className="aside-menu-bar">
                <Menu 
                onClick={this.handleMenuClick}
                selectedKeys={[this.state.current]}
                mode="inline"
                >
                    <SubMenu 
                    title={
                    <span>
                        <Icon type="pie-chart" />
                        BackendManagement
                    </span>}
                    >
                        <Menu.Item key="user_mgr"><Icon type="codepen-circle" />UserManagement</Menu.Item>
                        <Menu.Item key="role_mgr"><Icon type="google" />RoleManagement</Menu.Item>
                        <Menu.Item key="per_mgr"><Icon type="dribbble" />PermissionManagement</Menu.Item>
                    </SubMenu>
                    <SubMenu 
                    title={
                    <span>
                        <Icon type="ant-design" />
                        StoreManagement
                    </span>}
                    >
                        <Menu.Item key="goods_mgr"><Icon type="bug" />GoodsManagement</Menu.Item>
                        <Menu.Item key="order_mgr"><Icon type="cloud" />OrderManagement</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default MenuBar;
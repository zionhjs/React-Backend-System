import React, { Component, Fragment } from 'react';

import { Menu } from 'antd';
const { SubMenu } = Menu;

class MenuBar extends Component {
    state = {
        current:'user_mgr'
    }
    handleMenuClick = e => {
        console.log(e);
        //控制路由跳转
        this.setState({current:e.key});
    }
    render() {
        return (
            <div className="aside-menu-bar">
                <Menu 
                onClick={this.handleMenuClick}
                selectedKeys={[this.state.current]}
                mode="inline"
                >
                    <SubMenu title="backend management">
                        <Menu.Item key="user_mgr">UserManagement</Menu.Item>
                        <Menu.Item key="role_mgr">RoleManagement</Menu.Item>
                        <Menu.Item key="per_mgr">PermissionManagement</Menu.Item>
                    </SubMenu>
                    <SubMenu title="store management">
                        <Menu.Item key="goods_mgr">GoodsManagement</Menu.Item>
                        <Menu.Item key="order_mgr">OrderManagement</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default MenuBar;
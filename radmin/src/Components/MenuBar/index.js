import React, { Component, Fragment } from 'react';
import { Menu, Icon } from 'antd';
import { getLoginUserALlPer } from '../../Service';

const { SubMenu } = Menu;

class MenuBar extends Component {
    state = {
        current: '',
        perMenu: []   //所有当前用户拥有的菜单类型的权限
    }
    componentDidMount() {
        //加载当前登录用户的所有权限
        // service.loadUserAllPer(GetLoginUserInfo().id)
        getLoginUserALlPer()
            .then(res => {
                this.setState({ perMenu: res.data.filter(m => m.type === 'menu') });
            })
    }
    handleMenuClick = e => {
        console.log(e);
        //控制路由跳转
        this.setState({ current: e.key });
        // this.props.history.push(`/home/${e.key}`);
        let url = this.state.perMenu.find(item => item.id == e.key).url;
        this.props.history.push(url);
    }
    render() {
        let rootMenu = this.state.perMenu.filter(m => m.pId == 0);
        return (
            <div className="aside-menu-bar">
                <Menu
                    onClick={this.handleMenuClick}
                    // selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    {
                        rootMenu.map(rootM => {
                            let childMenus = this.state.perMenu.filter(m => m.pId == rootM.id);
                            childMenus.sort((a,b) => b.order - a.order);
                            return (
                                <SubMenu
                                key={rootM.id}
                                    title={
                                        <span>
                                            <Icon type="pie-chart" />
                                            {rootM.des}
                                        </span>}
                                >
                                    {
                                        childMenus.map(childM => {
                                            return (
                                                <Menu.Item key={childM.id}><Icon type="codepen-circle" />{childM.des}</Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>

                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}

export default MenuBar;
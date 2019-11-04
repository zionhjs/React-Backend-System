import React, { Component, Fragment } from 'react'
import { Icon, Modal } from 'antd';
import { GetLoginUserInfo, Logout } from '../../Common/Auth';

import './top.scss';

class Top extends Component {
    state = { loginUser: GetLoginUserInfo() }
    hanldeLogout = () => {
        let { history } = this.props;
        Modal.confirm({
            title: 'Promt',
            content: 'Sure to leave?',
            okText: 'Leave',
            cancelText: 'cancel',
            onOk: () => {
                Logout();// 清理当前用户的相关信息
                history.push('/login');
            }
        })
    }
    render() {
        return (
            <Fragment>
                <div className="logo-wrap components-top">
                    <a href="/">
                        <h1 style={{ color: '#fff', fontSize: '30px' }}>
                            <Icon type="slack" />
                            Backend-Mangement-System
            </h1>
                    </a>
                </div>
                <div className="user-wrap components-top">
                    <div className="btn-group">
                        <Icon type="user" />
                        <span>{this.state.loginUser && this.state.loginUser.username}</span>
                    </div>
                    <div className="btn-group" onClick={this.hanldeLogout}>
                        <Icon type="logout" />
                        Logout
          </div>
                </div>
            </Fragment>
        )
    }
}

export default Top
import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
import './top.scss';

class Top extends Component {
    render() {
        return (
            <Fragment>
                <div className="logo-wrap">
                    <a href="/">
                        <h1 style={{color:'#fff', fontSize:'30px'}}>
                            <Icon type="slack" />
                            BackEndManagementSystem
                        </h1>
                    </a>
                </div>
                <div className="user-wrap">
                    <div className="btn-group">
                        <Icon type="user" />
                        User
                    </div>
                    <div className="btn-group">
                        <Icon type="logout" />
                        Logout
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Top;
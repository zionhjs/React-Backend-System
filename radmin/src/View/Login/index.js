import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ICON_USER from '../../assets/img/icon_user.gif';
import ICON_LOCK from '../../assets/img/icon_lock.jpg';

import TextValidator from '../../Components/TextValidator/index';
import { ValidatorForm } from 'react-form-validator-core';

import service from '../../Service';
import { SaveLoginUserInfo, saveLoginToken } from '../../Common/Auth';
import { message } from 'antd';
import { urlParams2Object } from '../../Common/Helper';

import './login.scss';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '18911112222',
            password: 'aicoder.com',
            code: '22222'
        }
    }

    handlerChange = e => {
        let newState = { [e.target.name]: e.target.value };
        this.setState(state => ({ ...state, ...newState }));
    }
    changeCode(e) {
        e.target.src = '/api/code?id=' + Date.now();
    }
    handleSubmit = () => {
        let { history, location } = this.props;
        service.userLogin(this.state)
            .then(res => {
                    console.log(res.data);
                if (res.data.code === 1) {
                    // 保存用户登录信息
                    SaveLoginUserInfo(res.data.user);
                    // 保存用户的登录后，后台返回的tocken。身份信息。
                    saveLoginToken(res.data.token);
                    // 跳转到请求之前的页面。
                    let url = '/home';
                    // 判断当前请求地址中是否有 preurl。
                    if (location.search) {
                        let params = urlParams2Object(location.search);
                        if (params.preurl) {
                            url = params.preurl;
                        }
                    }
                    history.push(url);
                } else {
                    message.error('Login failed! Please type-in correct info!');
                }
            });
    }

    render() {
        return (
            <div className="login">
                <div className="top">
                    <div className="container">
                        <div className="logo-wrap">
                            <Link className="logo" to="/">
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="main-bd">
                    <div className="login-box-wrap">
                        <div className="login-box container">
                            <ValidatorForm
                                onSubmit={this.handleSubmit}
                                className="login-group"
                            >
                                <div className="input-group">
                                    <img src={ICON_USER} alt="User_name" />
                                    {/* <input name="username" onChange={this.handlerChange} value={this.state.username} placeholder="请输入电话号码" type="text"/> */}
                                    <TextValidator
                                        name="username"
                                        onChange={this.handlerChange}
                                        value={this.state.username}
                                        placeholder="please type-in phone-number"
                                        validators={['required', 'matchRegexp:^[0-9a-zA-Z]{6,12}$']}
                                        errorMessages={['*Username is required!', '*please type-in 6~12 strings!']}
                                    ></TextValidator>
                                </div>
                                <div className="input-group grey-border">
                                    <img src={ICON_LOCK} alt="username" />
                                    <TextValidator
                                        type="password"
                                        name="password"
                                        onChange={this.handlerChange}
                                        value={this.state.password}
                                        placeholder="please type-in password"
                                        validators={['required', 'matchRegexp:^[0-9a-zA-Z.]{6,20}$']}
                                        errorMessages={['*password is required', '*please type-in 6~20 strings!']}
                                    />
                                </div>
                                <div className="code-group input-group">
                                    <TextValidator
                                        name="code"
                                        onChange={this.handlerChange}
                                        value={this.state.code}
                                        type="text"
                                        placeholder="please enter verification code"
                                        className="code"
                                        validators={['required', 'matchRegexp:^[0-9a-zA-Z]{5}$']}
                                        errorMessages={['*verification code is requried', '*please type-in 5 digit verifycation-code']}
                                    />
                                    <div className="img-code">
                                        <img onClick={e => this.changeCode(e)} src="/api/code" alt="" />
                                    </div>
                                </div>
                                <button className="login-btn-grop">
                                    Login
                                </button>
                                <div className="link-group">
                                    forgot password?
                                </div>
                            </ValidatorForm>
                            <div className="login-aside">
                                <p>Not registered yet?</p>
                                <p className="active">Register now!>></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-ft">
                    &copy;copyright google.com 2016-2019
              </div>
            </div>
        )
    }
}

export default Login
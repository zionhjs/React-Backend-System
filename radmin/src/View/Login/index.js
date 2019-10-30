import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ICON_USER from '../../assets/img/icon_user.gif';
import ICON_LOCK from '../../assets/img/icon_lock.jpg';

import TextValidator from '../../Components/TextValidator/index';
import { ValidatorForm } from 'react-form-validator-core';

import service from '../../Service';
import { SaveLoginUserInfo } from '../../Common/Auth';
import { message } from 'antd';
import { urlParams2Object } from '../../Common/Helper';

import './login.scss';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'18911112222',
            password:'aicoder.com',
            code:'222222'
        }
    }
    handlerChange = e => {
        let newState = {[e.target.name]: e.target.value};
        this.setState(state => ({...this.state, ...newState}));
    }
    changeCode(e){
        e.target.src = '/api/code/?id=' + Date.now();
    }

    handleSubmit = () => {
        // console.log('submit');
        let { history, location } = this.props;
        service.userLogin(this.state)
        .then(res => {
            // console.log(res.data);
            if(res.data.code === 1){
                //用Auth.js保存用户登录信息
                SaveLoginUserInfo(res.data.user);
                //跳转到请求之前的页面
                let url = './home';   //判断当前请求的地址中是否有preurl
                // location.search 
                if(location.search){
                    let params = urlParams2Object(location.search);
                    if(params && params.preurl){
                        url = params.preurl;
                    }
                }
                history.push(url);
            }else{
                message.error('login failed, type-in right info!');
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
                            <ValidatorForm className="login-group" onSubmit={this.handleSubmit}>
                                <div className="input-group">
                                    <img src={ICON_USER} alt="UserName" />
                                    {/* <input name="username" onChange={this.handlerChange} value={this.state.username} placeholder="type phone number" type="text" /> */}
                                    <TextValidator 
                                    name="username" 
                                    onChange={this.handlerChange} 
                                    value={this.state.username} 
                                    placeholder="type phone number" 
                                    validators={['required', 'matchRegexp:^[0-9a-zA-Z]{6,12}$']}
                                    errorMessages={['*this field is require!', '*please type-in 6~12 strings!']}
                                    >
                                    </TextValidator>
                                </div>
                                <div className="input-group grey-border">
                                    <img src={ICON_LOCK} alt="UserName" />
                                    {/* <input name="password" onChange={this.handlerChange} value={this.state.password} placeholder="type password" type="password" /> */}
                                    <TextValidator 
                                    name="password" 
                                    onChange={this.handlerChange} 
                                    value={this.state.password} 
                                    placeholder="type password" 
                                    validators={['required', 'matchRegexp:^[0-9a-zA-Z.]{6,20}$']}
                                    errorMessages={['*this field is require!', '*please type-in 6~20 strings!']}
                                    >
                                    </TextValidator>
                                </div>
                                <div className="code-group input-group">
                                    {/* <input name="code" onChange={this.handlerChange} value={this.state.code} placeholder="type verification"  className="code" type="text" /> */}
                                    <TextValidator 
                                    name="code" 
                                    onChange={this.handlerChange} 
                                    value={this.state.code} 
                                    type="text"
                                    placeholder="type verification" 
                                    className="code"
                                    validators={['required', 'matchRegexp:^[0-9a-zA-Z]{5}$']}
                                    errorMessages={['*this field is require!', '*please type-in 6 verificated strings!']}
                                    >
                                    </TextValidator>
                                    <div className="img-code">
                                        <img onClick={e => this.changeCode(e)} src="/api/code" alt="" />
                                    </div>
                                </div>
                                <button className="login-btn-group">
                                    Login
                                </button>
                                <div className="link-group">
                                    Forgot Password?
                                </div>
                            </ValidatorForm>
                            <div className="login-aside">
                                <p>Not Registered Yet</p>
                                <p className="active">Register Now!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-ft">
                    &copy;copyright google.com 2016-2019
                </div>
            </div>
        );
    }
}

export default Login;
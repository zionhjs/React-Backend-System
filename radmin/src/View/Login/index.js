import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ICON_USER from '../../assets/img/icon_user.gif';
import ICON_LOCK from '../../assets/img/icon_lock.jpg';

import './login.scss';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            code:''
        }
    }
    handlerChange = e => {
        let newState = {[e.target.name]: e.target.value};
        this.setState(state => ({...this.state, ...newState}));
    }
    changeCode(e){
        e.target.src = '/api/code/?id=' + Date.now();
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
                            <div className="login-group">
                                <div className="input-group">
                                    <img src={ICON_USER} alt="UserName" />
                                    <input name="username" onChange={this.handlerChange} value={this.state.username} placeholder="type phone number" type="text" />
                                </div>
                                <div className="input-group grey-border">
                                    <img src={ICON_LOCK} alt="UserName" />
                                    <input name="password" onChange={this.handlerChange} value={this.state.password} placeholder="type password" type="password" />
                                </div>
                                <div className="code-group input-group">
                                    <input name="code" onChange={this.handlerChange} value={this.state.code} placeholder="type verification"  className="code" type="text" />
                                    <div className="img-code">
                                        <img onClick={e => this.changeCode(e)} src="/api/code" alt="" />
                                    </div>
                                </div>
                                <div className="login-btn-group">
                                    Login
                                </div>
                                <div className="link-group">
                                    Forgot Password?
                                </div>
                            </div>
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
import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

class AuthRoute extends Component {
    state = {
        authorized: false
    }

    //钩子
    UNSAFE_componentWillReceiveProps(nextProps){
        //判断当前传来的属性是谁 然后判断当前登录用户是否拥有此路由的权限
        //如果有权限 返回route对象
        //没有权限返回null
        //per属性是当前路由对应的权限数据的id
        //this.props.per
        //拿到当前登录用户的所有权限
        
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.authorized ? 
                    <Route {...this.props}></Route>
                    :
                    null
                }
            </Fragment>
        );
    }
}

export default AuthRoute;
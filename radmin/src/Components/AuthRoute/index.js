import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { getLoginUserAllPer, getLoginToken } from '../../Common/Auth';

class AuthRoute extends Component {
    state = {
        authorized: false
    }
    
    //加载组件时的钩子
    componentDidMount(){
        //判断当前传来的属性是谁 然后判断当前登录用户是否拥有此路由的权限
        //如果有权限 返回route对象
        //没有权限返回null
        //per属性是当前路由对应的权限数据的id
        //this.props.per
        //拿到当前登录用户的所有权限
        getLoginUserAllPer()
        .then(res => {
            let authorized = res.findIndex(per => per.id === this.props.per) >= 0
            this.setState({authorized});
        })
    }

    //当组件发生变化时的钩子
    UNSAFE_componentWillReceiveProps(nextProps){
        //判断当前传来的属性是谁 然后判断当前登录用户是否拥有此路由的权限
        //如果有权限 返回route对象
        //没有权限返回null
        //per属性是当前路由对应的权限数据的id
        //this.props.per
        //拿到当前登录用户的所有权限
        // getLoginUserAllPer()
        // .then(res => {
        //     let authorized = res.findIndex(per => per.id === this.props.per) >= 0
        //     this.setState({authorized});
        // })
    }

    render() {
        console.log(this.state.authorized);
        return (
            <Fragment>
                {
                    this.state.authorized ? 
                    <Route {...this.props}></Route>
                    :
                    <Route path={this.props.path} render={() => (<h3>No-Auth!</h3>)}></Route>
                }
            </Fragment>
        );
    }
}

export default AuthRoute;
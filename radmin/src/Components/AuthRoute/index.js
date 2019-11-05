import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom';
import { getLoginUserAllPer } from '../../Common/Auth';

class AuthRoute extends Component {
    state = {
        authorized: false
    }
    componentDidMount() {
        getLoginUserAllPer()
            .then(res => {
                console.log(res);
                let authorized = res.findIndex(per => per.id === this.props.per) >= 0
                this.setState({ authorized });
            })
    }

    UNSAFE_componentWillReceiveProps() {
        // 判断当前传来的属性是谁，然后判断当前登录用户是否拥有此路由的权限
        // 如果有权限，返回route对象
        // 没有权限返回 null
        // per属性是当前路由对应的权限数据的id
        // this.props.per
        // 拿到当前登录用户的所有的权限
        // console.log(this.state.authorized);
        getLoginUserAllPer()
            .then(res => {
                console.log(res);
                let authorized = res.findIndex(per => per.id === this.props.per) >= 0
                this.setState({ authorized });
            })
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.authorized ?
                        <Route {...this.props} ></Route>
                        :
                        <Route path={this.props.path} render={() => (<h3>Permission denied</h3>)}></Route>
                }
            </Fragment>
        )
    }
}

export default AuthRoute
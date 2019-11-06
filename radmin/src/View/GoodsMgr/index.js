import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import AuthRoute from '../../Components/AuthRoute';

class GoodsMgr extends Component {
    render() {
        return (
            <div>
                <Link to={`${this.props.match.path}/p1`}>Goods-1</Link> |
                <Link to={`${this.props.match.path}/p2`}>Goods-2</Link>
                <hr />
                <Switch>
                    <AuthRoute per={1570974927539} path={`${this.props.match.path}/p1`}
                        render={() => {
                            return (<h2>p1-online</h2>);
                        }}
                    ></AuthRoute>
                    <AuthRoute per={1570974937830} path={`${this.props.match.path}/p2`}
                        render={() => {
                            return (<h2>p2-online</h2>);
                        }}
                    ></AuthRoute>
                </Switch>
            </div>
        )
    }
}

export default GoodsMgr
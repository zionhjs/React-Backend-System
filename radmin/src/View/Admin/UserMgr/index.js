import React, { Component } from 'react';
import { Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import service from '../../../Service';
import { LoadUserActionAsync } from '../../../Action/UserAction';
import store from '../../../store';

class UserMgr extends Component {
    state={
        unsubscribe:null,
        userlist: store.getState().UserList,
        columns:[{
            key:'id',
            title:'id',
            dataIndex:'id'
        },{
            key:'name',
            title:'name',
            dataIndex:'name'
        },{
            key:'phone',
            title:'phone',
            dataIndex:'phone'
        }]
    }

    userListChange = () => {
        this.setState({userlist: store.getState().UserList});
    }
    componentDidMount(){
        //发送ajax请求到后台 获取当前用户列表数据
        // service.loadUserList()
        // .then(res => {
        //     this.setState({userlist: res.data});
        // })
        
        store.dispatch(LoadUserActionAsync({}));
        const unsubscribe = store.subscribe(this.userListChange);
        this.setState({unsubscribe:unsubscribe});
    }
    
    componentWillUnmount(){
        this.state.unsubscribe && (this.state.unsubscribe());
    }
    
    userRowSelection={
        onChange:(selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows)
        }
    }
    
    render() {
        return (
            <div className="admin-usermgr">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/user_mgr">UserManegement</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <Table
                    bordered
                    style={{backgroundColor:'#fefefe'}}
                    dataSource={this.state.userlist}
                    columns={this.state.columns}
                    rowSelection={this.userRowSelection}
                    rowKey="id"   //react要求必须对其指定唯一的key 不然会报错
                ></Table>
            </div>
        );
    }
}

export default UserMgr;
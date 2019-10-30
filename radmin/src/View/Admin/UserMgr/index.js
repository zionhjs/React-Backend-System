import React, { Component } from 'react';
import { Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import service from '../../../Service';
import { LoadUserActionAsync } from '../../../Action/UserAction';
import store from '../../../store';

class UserMgr extends Component {
    state={
        unsubscribe:null,
        userlist: store.getState().UserList.list,
        params:{_page:1, _limit:6},
        total:0,
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
        const UserList = store.getState().UserList;
        this.setState({userlist:UserList.list, total:UserList.total});
    }
    componentDidMount(){
        //发送ajax请求到后台 获取当前用户列表数据
        // service.loadUserList()
        // .then(res => {
        //     this.setState({userlist: res.data});
        // })
        
        store.dispatch(LoadUserActionAsync(this.state.params));
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

    changePage = (page, pageSize) => {
        // console.log('page:', page, ',pageSize:', pageSize)
        this.setState(preState => { 
            return {...preState, ...{params:{_page:page, _limit:pageSize}}}, () => {
                store.dispatch(LoadUserActionAsync(this.state.params));
        }});
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
                    pagination={{total:this.state.total, pageSize:6, defaultCurrent:1, onChange:this.changePage}}
                ></Table>
            </div>
        );
    }
}

export default UserMgr;
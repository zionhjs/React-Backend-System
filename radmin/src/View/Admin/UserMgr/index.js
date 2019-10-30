import React, { Component } from 'react';
import { Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import service from '../../../Service';

class UserMgr extends Component {
    state={
        userlist:[{
            id:1,
            name:'google',
            phone:'18922222'
        },{
            id:2,
            name:'google2',
            phone:'18922222333333'
        },{
            id:3,
            name:'google3',
            phone:'1892222233333344444'
        }],

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

    componentDidMount(){
        //发送ajax请求到后台 获取当前用户列表数据
        service.loadUserList()
        .then(res => {
            this.setState({userlist: res.data});
        })
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
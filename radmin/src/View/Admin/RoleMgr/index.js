import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Modal, message, Avatar, Popconfirm, Input } from 'antd';
import { Link } from 'react-router-dom';

class RoleMgr extends Component {
    state ={
        roleList: [],
        columns:[{
            key:'Id',
            title:'Numbering'
        },{
            key:'Name',
            title:'RoleName'
        }]
    }

    handleEdit = () => {
        
    }
    handleDelete = () => {
        
    }
    handleEdit = () => {
        
    }
    buttonStyle = { margin: '5px'}
    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/home/role_mgr">RoleManegement</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <Button onClick={this.handleAdd} style={this.buttonStyle} type="primary">Add</Button>
                <Button onClick={this.handleDelete} style={this.buttonStyle} type="danger">Delete</Button>
                <Button onClick={this.handleEdit} style={this.buttonStyle} type="primary">Edit</Button>
                <Input.Search
                    placeholder="search"
                    enterButton
                    style={{ margin: '5px', width: '300px' }}
                />
                <Table
                    bordered
                    style={{ backgroundColor: '#fefefe' }}
                    dataSource={this.state.userlist.roleList}
                    columns={this.state.columns}
                    rowKey="id"   //react要求必须对其指定唯一的key 不然会报错
                    pagination={{ total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage }}
                ></Table>
                <AddUser close={this.hideAddUserDialog} visible={this.state.showAddUserDialog}></AddUser>
                <EditUser data={this.state.editUserRow} close={this.hideEditUserDialog} visible={this.state.showEditUserDialog}></EditUser>
            </div>
        );
    }
}

export default RoleMgr;
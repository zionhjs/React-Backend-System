import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Modal, message, Avatar, Popconfirm, Input } from 'antd';
import { Link } from 'react-router-dom';
import service from '../../../Service';

class RoleMgr extends Component {
    state ={
        params:{
            _page:1,
            _limit:6,
            q:'',
            _sort:'id',
            _order:'desc'
        },
        total:0,
        roleList: [{
            "id": 5,
            "pId": 0,
            "name": "超级管理员",
            "des": "超级管理员",
            "subon": "2019-05-08 16:54:26",
            "status": 0,
            "del": 0
          }],
        columns:[{
            key:'Id',
            dataIndex:'id',
            title:'Numbering'
        },{
            key:'Name',
            dataIndex:'name',
            title:'RoleName'
        },{
            key:'status',
            dataIndex:'status',
            title:'Status',
            render:(status, row) => <span>{status === 0 ? 'Enable' : 'Disable'}</span>
        },{
            key:'subbon',
            dataIndex:'subbon',
            title:'SubmitTime'
        },{
            key:'pid',
            dataIndex:'pid',
            title:'ParentRole'
        },{
            key:'del',
            dataIndex:'del',
            title:'modify',
            render:(del, row) => {
                return(
                    <div>
                        <Button type="primary">Edit</Button>
                        <Button type="danger">Delete</Button>
                    </div>
                )
            }
        }]
    }
    
    handleEdit = () => {
        
    }
    handleDelete = () => {
        
    }
    handleEdit = () => {
        
    }

    loadData = () => {
        service.loadRoleList()
        .then(res => {
            this.setState({roleList: res.data, total:parseInt(res.headers['x-total-count'])});
        });
    }

    componentDidMount(){
        this.loadData();
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
                    dataSource={this.state.roleList}
                    columns={this.state.columns}
                    rowKey="id"   //react要求必须对其指定唯一的key 不然会报错
                    pagination={{ total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage }}
                ></Table>
            </div>
        );
    }
}

export default RoleMgr;
import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Modal, message, Avatar, Popconfirm, Input } from 'antd';
import { Link } from 'react-router-dom';
import service from '../../../Service';
import AddRole from './AddRole';
import AddUser from '../UserMgr/AddUser';
import EditRole from './EditRole';
import {formatDate2String} from '../../../Common/Helper';

class RoleMgr extends Component {
    state = {
        showAddRoleDialog:false,
        showEditRoleDialog:false,
        selectedRowKeys: [],
        params: {
            _page: 1,
            _limit: 6,
            q: '',
            _sort: 'id',
            _order: 'desc'
        },
        total: 0,
        roleList: [{
            "id": 5,
            "pId": 0,
            "name": "超级管理员",
            "des": "超级管理员",
            "subon": "2019-05-08 16:54:26",
            "status": 0,
            "del": 0
        }],
        columns: [{
            key: 'Id',
            dataIndex: 'id',
            title: 'Numbering'
        }, {
            key: 'Name',
            dataIndex: 'name',
            title: 'RoleName'
        }, {
            key: 'status',
            dataIndex: 'status',
            title: 'Status',
            render: (status, row) => <span>{status === 0 ? 'Enable' : 'Disable'}</span>
        }, {
            key: 'subbon',
            dataIndex: 'subbon',
            title: 'SubmitTime'
        }, {
            key: 'pid',
            dataIndex: 'pid',
            title: 'ParentRole'
        }, {
            key: 'del',
            dataIndex: 'del',
            title: 'modify',
            render: (del, row) => {
                return (
                    <div>
                        <Button 
                           type="primary" 
                           style={{marginRight:'5px'}}
                           onClick={() => this.handleEdit(row)}
                        >Edit</Button>
                        <Popconfirm 
                           title="sure delete?"
                           okText="confirm"
                           cancelText="cancel"
                           onConfirm={() => {
                               service.deleteRoles([row.id])
                               .then(res => {
                                   message.info('delete success!');
                                   this.loadData();
                               })
                               .catch(err => {
                                   console.log(err);
                                   message.error('delete failed!');
                               });
                           }}
                        >
                            <Button type="danger">Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }]
    }

    handleDelete = () => {
        Modal.confirm({
            title: 'sure to delete?',
            okText: 'delete',
            cancelText: 'cancel',
            onOk: () => {
                //拿到要删除的数据的id
                // this.state.selectedRowKeys
                service.deleteRoles(this.state.selectedRowKeys)
                    .then(res => {
                        message.info('delete success!');
                        this.loadData();
                        this.setState({selectedRowKeys:[]});
                    })
                    .catch(err => {
                        console.log(err);
                        message.error('delete failed!');
                    });
            }
        })
    }
    handleEdit = (row) => {
        this.setState({showEditRoleDialog: true, editRole: row});
    }
    handleBarEdit = () => {
        if(this.state.selectedRowKeys.length !== 1){
            message.error('please only select 1 row and edit!');
            return;
        }
        let editRow = this.state.roleList.find(item => item.id === this.state.selectedRowKeys[0]);
        if(editRole) this.handleEdit(editRole);
    }
    handleAdd = () => {
        this.setState({
            showAddRoleDialog:true
        })
    }
    addRole = (role) => {
        let newRole = Object.assign({
            id:Date.now(),
            del:0,
            subon:formatDate2String(new Date()),
            status:0
        },role);
        service.addRole(newRole)
        .then(res => {
            message.info('add success!');
            //关闭当前对话框
            this.closeAddDialog();
            this.loadData();
        })
        .catch(err => {
            console.log(err);
            message.error('add failed!');
        })
    }
    saveRole = (role) => {
        service.saveRole(role)
        .then(res => {
            this.closeEditDialog();
            this.loadData();
            message.info('edit success!');
        })
        .catch(err => {
            console.log(err);
            message.error('edit failed!');
        })
    }
    handleSearch = (value) => {
        this.setState(preState => {
            preState.params.q = value;
            return { ...preState };
        }, () => {
            this.loadData();
        });
    }
    loadData = () => {
        service.loadRoleList(this.state.params)
            .then(res => {
                this.setState({ roleList: res.data, total: parseInt(res.headers['x-total-count']) });
            });
    }
    changePage = (page, pageSize) => {
        this.setState(preState => {
            preState.params._page = page;
            preState.params.limit = pageSize;
            return { ...preState };
        }, () => {
            this.loadData();
        });
    }

    closeAddDialog = () => {
        this.setState({showAddRoleDialog: false});
    }
    closeEditDialog = () => {
        this.setState({showEditRoleDialog: false});
    }
    
    componentDidMount() {
        this.loadData();
    }

    buttonStyle = { margin: '5px' }

    render() {
        let { selectedRowKeys } = this.state;
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
                <Button onClick={this.handleBarEdit} style={this.buttonStyle} type="primary">Edit</Button>
                <Input.Search
                    placeholder="search"
                    onSearch={this.handleSearch}
                    enterButton
                    style={{ margin: '5px', width: '300px' }}
                />
                <Table
                    bordered
                    style={{ backgroundColor: '#fefefe' }}
                    dataSource={this.state.roleList}
                    columns={this.state.columns}
                    rowKey="id"   //react要求必须对其指定唯一的key 不然会报错
                    rowSelection={{
                        selectedRowKeys: selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                            this.setState({ selectedRowKeys: selectedRowKeys });
                            console.log(selectedRowKeys);
                        }
                    }}
                    pagination={{ total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage }}
                ></Table>
                <AddRole 
                   close={this.closeAddDialog} 
                   visible={this.state.showAddRoleDialog}
                   addRole={this.addRole}
                >
                </AddRole>
                <EditRole 
                   visible={this.state.showEditRoleDialog} 
                   close={this.closeEditDialog}
                   data={this.state.editRole}
                   saveRole={this.saveRole}
                />
            </div>
        );
    }
}

export default RoleMgr;
import React, { Component } from 'react'
import { Breadcrumb, Button, Input, Table, message, Modal, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import service from '../../../Service';
import AddRole from './AddRole';
import EditRole from './EditRole';
import SetRolePer from './SetRolePer';
import { formatDate2String } from '../../../Common/Helper';

class RoleMgr extends Component {
    state = {
        showAddRoleDialog: false,
        showEidtRoleDialog: false,
        showSetRolePerDialog: false,
        selectedRowKeys: [],
        params: {
            _page: 1,
            _limit: 6,
            q: '',
            _sort: 'id',
            _order: 'desc'
        },
        setRolePer: null,
        total: 0,
        roleList: [],
        columns: [{
            key: 'id',
            dataIndex: 'id',
            title: 'code'
        }, {
            key: 'name',
            dataIndex: 'name',
            title: 'Role_Name'
        }, {
            key: 'status',
            dataIndex: 'status',
            title: 'status',
            render: (status, row) => <span>{status === 0 ? 'Enable' : 'Disable'}</span>
        }, {
            key: 'subon',
            dataIndex: 'subon',
            title: 'Submit-Time'
        }, {
            key: 'pid',
            dataIndex: 'pId',
            title: 'Parent_Role'
        }, {
            key: 'del',
            dataIndex: 'del',
            title: 'Modify',
            render: (del, row) => {
                return (
                    <div>
                        <Button
                            type="primary"
                            style={{ marginRight: '5px' }}
                            onClick={() => this.handleEdit(row)}
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            title="SureToDelete?"
                            okText="confirm"
                            cancelText="cancel"
                            onConfirm={() => {
                                service
                                    .deleteRoles([row.id])
                                    .then(res => {
                                        message.info('delete success!');
                                        this.loadData();
                                        // 重置当前的selectedRowKeys
                                        this.setState({ selectedRowKeys: this.state.selectedRowKeys.filter(item => item !== row.id) });
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
                );
            }
        }]
    }

    handleDelete = () => {
        Modal.confirm({
            title: 'Sure to delete?',
            okText: 'delete',
            cancelText: 'cancel',
            onOk: () => {
                // 拿到要删除的数据的id
                service
                    .deleteRoles(this.state.selectedRowKeys)
                    .then(res => {
                        message.info('Delete Success!');
                        this.loadData();
                        this.setState({ selectedRowKeys: [] });
                    })
                    .catch(err => {
                        console.log(err);
                        message.error('Delete Failed!');
                    });
            }
        })

    }
    handleBarEdit = () => {
        if (this.state.selectedRowKeys.length !== 1) {
            message.error('please only select 1-row to Edit!');
            return;
        }

        let editRole = this.state.roleList.find(item => item.id === this.state.selectedRowKeys[0]);
        if (editRole) this.handleEdit(editRole);
    }
    handleEdit = (row) => {
        this.setState({ showEidtRoleDialog: true, editRole: row });
    }
    saveRole = (role) => {
        service
            .saveRole(role)
            .then(res => {
                this.closeEditDialog();
                this.loadData();
                message.info('Edit Success!');
            })
            .catch(err => {
                console.log(err);
                message.error('Edit Failed!');
            })
    }
    handleAdd = () => {
        this.setState({ showAddRoleDialog: true });
    }
    addRole = (role) => {
        let newRole = Object.assign({
            id: Date.now(),
            del: 0,
            subon: formatDate2String(new Date()),
            status: 0
        }, role);
        console.log(newRole);
        service
            .addRole(newRole)
            .then(res => {
                message.info('Add Success!');
                // 关闭对话框
                this.closeAddDialog();
                this.loadData();
            })
            .catch(err => {
                console.log(err);
                message.error('Add Failed!');
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
        service
            .loadRoleList(this.state.params)
            .then(res => {
                this.setState({ roleList: res.data, total: parseInt(res.headers['x-total-count']) });
            });
    }
    changePage = (page, pageSize) => {
        this.setState(preState => {
            preState.params._page = page;
            preState.params._limit = pageSize;
            return { ...preState };
        }, () => {
            this.loadData();
        })
    }

    closeAddDialog = () => {
        this.setState({ showAddRoleDialog: false });
    }
    closeEditDialog = () => {
        this.setState({ showEidtRoleDialog: false });
    }
    handleSetRolePer = () => {
        if (this.state.selectedRowKeys.length !== 1) {
            message.error('please only select one-row to edit!');
            return;
        }
        // roleId => selectedRowKeys[0]
        let setRole = this.state.roleList.find(item => item.id === this.state.selectedRowKeys[0]);
        this.setState({ showSetRolePerDialog: true, setRolePer: setRole });
    }

    componentDidMount() {
        this.loadData();
    }
    buttonStyle = { margin: '5px' }

    render() {
        let { selectedRowKeys } = this.state;
        let setRolePerCom = null;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home">HomePAge</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/home/role_mgr">Role</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <Button onClick={this.handleAdd} style={this.buttonStyle} type="primary">Add</Button>
                <Button onClick={this.handleDelete} style={this.buttonStyle} type="danger">Delete</Button>
                <Button onClick={this.handleBarEdit} style={this.buttonStyle} type="primary">Edit</Button>
                <Button onClick={this.handleSetRolePer} style={this.buttonStyle} type="danger">SetPer</Button>
                <Input.Search
                    placeholder="search"
                    onSearch={this.handleSearch}
                    enterButton
                    style={{ margin: '5px', width: '300px' }}
                />
                <Table
                    bordered
                    style={{ backgroundColor: '#FEFEFE' }}
                    dataSource={this.state.roleList}
                    columns={this.state.columns}
                    rowKey="id"
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
                ></AddRole>
                <EditRole
                    visible={this.state.showEidtRoleDialog}
                    close={this.closeEditDialog}
                    data={this.state.editRole}
                    saveRole={this.saveRole}
                />
                <Modal
                    visible={this.state.showSetRolePerDialog}
                    title="SetRoleAuth"
                    okText="set"
                    cancelText="cancel"
                    onCancel={() => this.setState({ showSetRolePerDialog: false })}
                    onOk={() => {
                        setRolePerCom.hanldeSubmitSetRolePer();
                    }}
                >
                    {
                        this.state.showSetRolePerDialog ?
                            <SetRolePer close={() => this.setState({ showSetRolePerDialog: false })} ref={setRP => setRolePerCom = setRP} data={this.state.setRolePer} />
                            :
                            null
                    }
                </Modal>
            </div>
        )
    }
}

export default RoleMgr
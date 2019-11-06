import React, { Component } from 'react'
import { Breadcrumb, Table, Button, Modal, message, Avatar, Popconfirm, Input } from 'antd';
import { Link } from 'react-router-dom';
import { LoadUserActionAsync } from '../../../Action/UserAction';
import AddUser from './AddUser';
import EditUser from './EditUser';
import SetRole from './SetRole';
import SetPer from './SetPer';
import service from '../../../Service';
import store from '../../../store';

class UserMgr extends Component {
    state = {
        showSetRoleDialog: false,  // 显示设置用户角色对话框
        showSetPerDialog: false,   // 显示设置用户权限对话框
        showAddUserDialog: false,  // 显示要添加用户的对话框
        showEditUserDialog: false, // 显示修改的对话框
        editUserRow: null,         // 当前编辑的用户信息 
        setRoleUser: null,         // 当前设置角色的用户
        setPerUser: null,          // 当前设置权限的用户数据
        unsubscribe: null,
        selectRowKeys: [],
        userlist: store.getState().UserList.list,
        total: 0,
        params: { _page: 1, _limit: 6 },
        columns: [{
            key: 'id',
            title: 'id',
            dataIndex: 'id'
        }, {
            key: 'name',
            title: 'name',
            dataIndex: 'name'
        }, {
            key: 'phone',
            title: 'phone',
            dataIndex: 'phone'
        }, {
            key: 'username',
            title: 'username',
            dataIndex: 'username'
        }, {
            key: 'avatar',
            title: 'avatar',
            dataIndex: 'avatar',
            render: (avatar) => <Avatar src={avatar}></Avatar>
        }, {
            key: 'del',
            title: 'del',
            dataIndex: 'del',
            render: (del, row) => {
                return (
                    <div>
                        <Button
                            onClick={() => this.setState({ showEditUserDialog: true, editUserRow: row })}
                            style={{ marginRight: '5px' }} type="primary"
                        >
                            Edit
                        </Button>
                        <Popconfirm
                            onConfirm={() => {
                                // message.info(row.id);
                                this.deleteUser(row.id);
                            }}
                            okText="confirm"
                            cancelText="cancel"
                            title="sureToDelete?"
                        >
                            <Button type="danger" >
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                );
            }
        }]
    }

    deleteUser = (id) => {
        service
            .deleteUser([id])
            .then(res => {
                store.dispatch(LoadUserActionAsync(this.state.params));
                message.info('DeleteSuccess!');
                let newSelectRowKeys = this.state.selectRowKeys.filter(item => item !== id);
                this.setState({ selectRowKeys: newSelectRowKeys });
            })
            .catch(e => {
                console.log(e);
                message.error('DeleteFailed!');
            });
    }
    userListChange = () => {
        const UserList = store.getState().UserList;
        this.setState({ userlist: UserList.list, total: UserList.total });
    }
    componentDidMount() {
        // 发送ajax请求到后台，获取当前用户的列表数据
        // service.loadUserList()
        // .then(res => {
        //   this.setState({userlist: res.data});
        // })
        store.dispatch(LoadUserActionAsync(this.state.params));
        const unsubscribe = store.subscribe(this.userListChange);
        this.setState({ unsubscribe: unsubscribe });
    }

    componentWillUnmount() {
        this.state.unsubscribe && (this.state.unsubscribe());
    }

    changePage = (page, pageSize, q = "") => {
        if (!!q) {
            q = this.state.params.q;
        }
        this.setState(preState => {
            return { ...preState, ...{ params: { _page: page, _limit: pageSize, q } } }
        }, () => {
            store.dispatch(LoadUserActionAsync(this.state.params));
        });
    }

    hideAddUserDialog = () => {
        this.setState({ showAddUserDialog: false });
    }

    hideEditUserDialog = () => {
        this.setState({ showEditUserDialog: false });
    }
    hideSetRoleDialog = () => {
        this.setState({ showSetRoleDialog: false });
    }
    hideSetPerDialog = () => {
        this.setState({ showSetPerDialog: false });
    }

    handleDelete = () => {
        if (this.state.selectRowKeys.length <= 0) {
            message.warn('Please select data-to-delete!');
            return;
        }
        // 拿到所有要删除的数据
        Modal.confirm({
            title: 'SureToDelete?',
            okText: 'Delete',
            cancelText: 'cancel',
            onOk: () => {
                // console.log(this.state.selectRowKeys);
                service
                    .deleteUser(this.state.selectRowKeys)
                    .then(res => {
                        store.dispatch(LoadUserActionAsync(this.state.params));
                        message.info('Delete Success!');
                        this.setState({ selectRowKeys: [] });
                    })
                    .catch(e => {
                        console.log(e);
                        message.error('Delete Failed!');
                    })
            }
        })
    }

    handleEdit = () => {
        if (this.state.selectRowKeys.length !== 1) {
            message.error('please only select one-row to edit!');
            return;
        }

        // 拿到要进行编辑的数据
        const userId = this.state.selectRowKeys[0]
        let editUser = store.getState().UserList.list.find(item => item.id === userId);
        console.log(editUser);
        this.setState({
            showEditUserDialog: true,
            editUserRow: editUser
        })
    }
    handleSetRole = () => {
        if (this.state.selectRowKeys.length !== 1) {
            message.error('please only select one-user to setRole!');
            return;
        }
        let setRoleUserId = this.state.selectRowKeys[0];
        let setRoleUser = this.state.userlist.find(item => item.id === setRoleUserId);
        this.setState({ showSetRoleDialog: true, setRoleUser: setRoleUser });
    }
    handleSetPer = () => {
        if (this.state.selectRowKeys.length !== 1) {
            message.error('please only select one-user to setAuth!');
            return;
        }
        let setPerUserId = this.state.selectRowKeys[0];
        let setPerUser = this.state.userlist.find(item => item.id === setPerUserId);
        this.setState({ showSetPerDialog: true, setPerUser: setPerUser });
    }

    buttonStyle = { margin: '5px' };

    render() {
        let { selectRowKeys } = this.state;
        let userRowSelection = {
            selectedRowKeys: selectRowKeys,
            onChange: (selectedRowKeys) => {
                console.log(selectedRowKeys);   //print row id
                this.setState({ selectRowKeys: selectedRowKeys })   //selectRowKeys: id
            }
        }
        return (
            <div className="admin-usermgr">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home">HomePage</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/home/user_mgr">UserManagement</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <hr />
                <Button onClick={() => this.setState({ showAddUserDialog: true })} style={this.buttonStyle} type="primary">Add</Button>
                <Button onClick={this.handleDelete} style={this.buttonStyle} type="danger">Delete</Button>
                <Button onClick={this.handleEdit} style={this.buttonStyle} type="primary">Edit</Button>
                <Button onClick={this.handleSetRole} style={this.buttonStyle} type="danger">SetRole</Button>
                <Button onClick={this.handleSetPer} style={this.buttonStyle} type="primary">SetPer</Button>
                <Input.Search
                    placeholder="search"
                    onSearch={(value) => {
                        // 第一步： 先把搜索的参数放到 state 里面去。
                        this.setState(preState => {
                            preState.params.q = value;
                            return { ...preState };
                        }, () => {
                            // 第二步： 重新请求当前页数据
                            this.changePage(1, 6, value);
                        })
                    }}
                    enterButton
                    style={{ margin: '5px', width: '360px' }}
                />
                <Table
                    bordered
                    style={{ backgroundColor: '#FEFEFE' }}
                    dataSource={this.state.userlist}
                    columns={this.state.columns}
                    rowSelection={userRowSelection}
                    rowKey="id"
                    pagination={{ total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage }}
                ></Table>
                <AddUser close={this.hideAddUserDialog} visible={this.state.showAddUserDialog}></AddUser>
                <EditUser data={this.state.editUserRow} close={this.hideEditUserDialog} visible={this.state.showEditUserDialog}></EditUser>
                {
                    this.state.showSetRoleDialog ?
                        <SetRole data={this.state.setRoleUser} close={this.hideSetRoleDialog} visible={this.state.showSetRoleDialog} />
                        :
                        null
                }
                {
                    this.state.showSetPerDialog ?
                        <SetPer data={this.state.setPerUser} close={this.hideSetPerDialog} visible={this.state.showSetPerDialog} />
                        :
                        null
                }
            </div>
        )
    }
}

export default UserMgr
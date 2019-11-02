import React, { Component } from 'react';
import { Breadcrumb, Table, Button, Modal, message, Avatar, Popconfirm, Input } from 'antd';
import { Link } from 'react-router-dom';
import service from '../../../Service';
import { LoadUserActionAsync } from '../../../Action/UserAction';
import AddUser from './AddUser';
import SetRole from './SetRole';
import SetPer from './SetPer';
import EditUser from './EditUser';
import store from '../../../store';

class UserMgr extends Component {
    state = {
        showEditRoleDialog:false,   //显示设置用户角色对话框
        showAddUserDialog: false,   //显示要添加的对话框
        showEditUserDialog: false,   //显示要修改的对话框
        showSetPerDialog: false,   //显示设置用户权限对话框
        setPerUser:null,   //当前设置权限的用户的数据
        editUserRow: null,   //当前编辑的用户信息
        setRoleUser: null,   //当前设置角色的用户
        unsubscribe: null,
        selectedRowKeys: [],
        userlist: store.getState().UserList.list,
        params: { _page: 1, _limit: 6 },
        total: 0,
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
            key: 'avatar',
            title: 'avatar',
            dataIndex: 'avatar',
            render: (avatar) => <Avatar src={avatar}></Avatar>
        }, {
            key: 'del',
            title: 'edit',
            dataIndex: 'del',
            render: (del, row) => {
                return (
                    <div>
                        <Button 
                           style={{ marginRight: '5px' }} 
                           type="primary"
                           onClick={()=>this.setState({showEditUserDialog:true, editUserRow: row})}
                           >
                               Edit
                        </Button>
                        <Popconfirm
                            onConfirm={() => {
                                //message.info(row.id);
                                this.deleteUser(row.id);
                            }}
                            title="Sure Delete?"
                            okText="Confirm"
                            cancelText="cancel"
                        >
                            <Button type="danger">
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        }]
    }

    deleteUser = (id) => {
        service.deleteUser([id])
            .then(res => {
                store.dispatch(LoadUserActionAsync(this.state.params));
                message.info('delete success!');
                let newSelectRowKeys = this.state.selectRowKeys.filter(item => item !== id)
                this.setState({ selectRowKeys: newSelectRowKeys});
            })
            .catch(e => {
                console.log(e);
                message.error('delete failed!');
            });
    }

    userListChange = () => {
        const UserList = store.getState().UserList;
        this.setState({ userlist: UserList.list, total: UserList.total });
    }
    componentDidMount() {
        //发送ajax请求到后台 获取当前用户列表数据
        // service.loadUserList()
        // .then(res => {
        //     this.setState({userlist: res.data});
        // })

        store.dispatch(LoadUserActionAsync(this.state.params));
        const unsubscribe = store.subscribe(this.userListChange);
        this.setState({ unsubscribe: unsubscribe });
    }

    componentWillUnmount() {
        this.state.unsubscribe && (this.state.unsubscribe());
    }

    changePage = (page, pageSize, q="") => {   //q参数是react脚手架自带的搜索参数
        // console.log('page:', page, ',pageSize:', pageSize)
        if(!!q){
            q = this.state.params.q;
        }
        this.setState(preState => {
            return { ...preState, ...{ params: { _page: page, _limit: pageSize, q} } }
        }, () => {
            store.dispatch(LoadUserActionAsync(this.state.params));
        });
    }

    //#region 按钮的方法和样式
    hideAddUserDialog = () => {
        this.setState({ showAddUserDialog: false });
    }
    hideEditUserDialog = () => {
        this.setState({ showEditUserDialog: false});
    }
    hideSetRoleDialog = () => {
        this.setState({ showSetRoleDialog: false});
    }
    hideSetPerDialog = () => {
        this.setState({showSetPerDialog: false});
    }
    
    handleDelete = () => {
        if (this.state.selectedRowKeys.length < 0) {
            message.warn('please select rows to delete!')
            return;
        }
        //拿到所有要删除的数据
        // console.log(this.state.selectRowKeys);
        Modal.confirm({
            title: 'sure to delete?',
            okText: 'delete',
            cancelText: 'cancel',
            onOk: () => {
                // console.log(this.state.selectRowKeys);
                service.deleteUser(this.state.selectRowKeys)
                    .then(res => {
                        store.dispatch(LoadUserActionAsync(this.state.params));
                        message.info('delete success!');
                        this.setState({ selectRowKeys: [] });
                    })
                    .catch(e => {
                        console.log(e);
                        message.error('delete failed!');
                    })
            }
        })
    }
    handleEdit = () => {
       if(this.state.selectRowKeys.length !== 1){
           message.error('please only select 1 item and edit!');
           return;
       }
       //拿到要进行编辑的数据
       const userId = this.state.selectRowKeys[0]
       let editUser = store.getState().UserList.list.find(item => item.id === userId);
       console.log(editUser);
       this.setState({
           showEditUserDialog:true,
           editUserRow: editUser
       })
    }
    handleSetRole = () => {
        if(this.state.selectedRowKeys.length !==1){
            message.error('please choose only one row and set-roles');
            return;
        }
        let setRoleUserId = this.state.selectRowKeys[0];
        let setRoleUser = this.state.userlist.find(item => item.id === setRoleUserId);
        this.setState({showSetRoleDialog: true, setRoleUser:setRoleUser});
    }
    handleSetPer = () => {
        if(this.state.selectedRowKeys.length !==1){
            message.error('please choose only one row and set-permission');
            return;
        }
        let setPerUserId = this.state.selectRowKeys[0];
        let setPerUser = this.state.userlist.find(item => item.id === setPerUserId);
        this.setState({showSetPerDialog: true, setPerUser:setPerUser});
    }
    buttonStyle = { margin: '5px' };
    //#endregion

    render() {
        let { selectRowKeys } = this.state;
        //拿到选中行的key 和 选中的行
        let userRowSelection = {
            selectedRowKeys: selectRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys, selectedRows);
                this.setState({ selectRowKeys: selectedRowKeys })
            }
        }
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
                <Button onClick={() => this.setState({ showAddUserDialog: true })} style={this.buttonStyle} type="primary">Add</Button>
                <Button onClick={this.handleDelete} style={this.buttonStyle} type="danger">Delete</Button>
                <Button onClick={this.handleEdit} style={this.buttonStyle} type="primary">Edit</Button>
                <Button onClick={this.handleSetRole} style={this.buttonStyle} type="danger">SetRoles</Button>
                <Button onClick={this.handleSetPer} style={this.buttonStyle} type="primary">SetPer</Button>
                <Input.Search 
                   placeholder="search"
                   onSearch={(value) => {
                       //第一步 先把搜索的先参数放到state里面去
                       this.setState((preState) => {
                           preState.params.q = value;
                           return {...preState};
                       }, () => {
                           //第二步 重新请求当前页面的数据
                           this.changePage(1, 6, value);
                       })
                   }}
                   enterButton 
                   style={{margin:'5px', width:'300px'}}
                />
                <Table
                    bordered
                    style={{ backgroundColor: '#fefefe' }}
                    dataSource={this.state.userlist}
                    columns={this.state.columns}
                    rowSelection={userRowSelection}
                    rowKey="id"   //react要求必须对其指定唯一的key 不然会报错
                    pagination={{ total: this.state.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage }}
                ></Table>
                <AddUser close={this.hideAddUserDialog} visible={this.state.showAddUserDialog}></AddUser>
                <EditUser data={this.state.editUserRow} close={this.hideEditUserDialog} visible={this.state.showEditUserDialog}></EditUser>
                {
                    this.state.showSetRoleDialog ? 
                    <SetRole data={this.state.setRoleUser} close={this.hideSetRoleDialog} visible={this.state.showSetRoleDialog} /> :
                    null
                }
                {
                    this.state.showSetPerDialog ? 
                    <SetPer data={this.state.setPerUser} close={this.hideSetPerDialog} visible={this.state.showSetPerDialog} /> :
                    null
                }
            </div>
        );
    }
}

export default UserMgr;
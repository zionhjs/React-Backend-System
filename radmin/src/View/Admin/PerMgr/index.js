import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Input, Button, message, Table, Popconfirm, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { LoadPerAsync, AddPerAsync, EditPerAsync, DeletePerAsync } from '../../../Action/PerAction';
import AddPer from './AddPer';
import EditPer from './EditPer';

function mapStateToProps(state) {
    return {
        total: state.PerList.total,
        perList: state.PerList.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadDataAsync: (params) => {
            dispatch(LoadPerAsync(params));
        },
        addPer: (per) => {
            return dispatch(AddPerAsync(per));
        },
        submitEditPer: (per) => {
            return dispatch(EditPerAsync(per));
        },
        submitDeletePer: (ids) => {
            // 删除数据
            return dispatch(DeletePerAsync(ids));
        }
    };
}

class PerMgr extends Component {
    state = {
        showAddPerDialog: false,
        showEditPerDialog: false,
        editPer: null,              // 当前正在编辑的 权限数据对象
        params: {
            _limit: 6,
            _page: 1,
            q: '',
            _sort: 'id',
            _order: 'desc'
        },
        selectedRowKeys: [],
        columns: [{
            key: 'id',
            dataIndex: 'id',
            title: '编号'
        }, {
            key: 'type',
            dataIndex: 'type',
            title: '权限类型'
        }, {
            key: 'des',
            dataIndex: 'des',
            title: '权限描述'
        }, {
            key: 'url',
            dataIndex: 'url',
            title: '地址'
        }, {
            key: 'pId',
            dataIndex: 'pId',
            title: '父权限'
        }, {
            key: 'order',
            dataIndex: 'order',
            title: '排序'
        }, {
            key: 'del',
            dataIndex: 'del',
            title: '编辑',
            render: (del, row) => {
                return (
                    <div>
                        <Button onClick={() => this.showEditPer(row)} style={{ marginRight: '5px' }} type="primary">编辑</Button>
                        <Popconfirm
                            title="您是否真要删除吗？"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={() => {
                                this.deletePerIds([row.id])
                            }}
                        >
                            <Button type="danger">删除</Button>
                        </Popconfirm>
                    </div>
                );
            }
        }]
    }

    deletePerIds = (ids) => {
        console.log(ids);
        this.props
            .submitDeletePer(ids)
            .then(res => {
                message.info('删除成功！');
                let arr = this.state.selectedRowKeys;
                let newArr = arr.filter(item => !ids.includes(item))
                this.setState({ selectedRowKeys: newArr })
                this.loadData();
            })
            .catch(err => {
                console.log(err);
                message.error('删除失败！');
            })
    }

    showEditPer = (per) => {
        this.setState({
            showEditPerDialog: true,
            editPer: per
        });
    }

    handleAdd = () => {
        this.setState({ showAddPerDialog: true });
    }
    handleDelete = () => {
        if (this.state.selectedRowKeys.length <= 0) {
            message.error('请选择数据进行删除!');
            return;
        }
        Modal.confirm({
            title: '确认要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.deletePerIds(this.state.selectedRowKeys);
            }
        })
    }
    handleBarEdit = () => {
        // 判断当前选中的条数。
        if (this.state.selectedRowKeys.length !== 1) {
            message.error('请选择一条进行修改');
            return;
        }
        let editPerId = this.state.selectedRowKeys[0];
        let editRow = this.props.perList.find(item => item.id === editPerId);
        this.showEditPer(editRow);
    }
    handleSearch = (value) => {
        this.setState(preState => {
            let newState = { ...preState };
            newState.params.q = value;
            return newState;
        }, () => {
            this.loadData();
        })
    }
    changePage = (page, pageSize) => {
        this.setState(preState => {
            let params = { ...preState.params };
            params._page = page;
            params._limit = pageSize;
            return Object.assign({}, preState, { params })
        }, () => {
            this.loadData();
        });
    }
    loadData = () => {
        this.props.loadDataAsync(this.state.params);
    }
    buttonStyle = { margin: '5px' }

    closeAddPerDialog = () => {
        this.setState({ showAddPerDialog: false });
    }
    closeEditPerDialog = () => {
        this.setState({ showEditPerDialog: false });
    }

    //生命周期的钩子
    componentDidMount() {
        this.loadData();
    }

    render() {
        let { selectedRowKeys } = this.state
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home">HomePage</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/home/per_mgr">Auth-Management</Link>
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
                    style={{ backgroundColor: '#FEFEFE' }}
                    dataSource={this.props.perList}
                    columns={this.state.columns}
                    rowKey="id"
                    rowSelection={{
                        selectedRowKeys: selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                            this.setState({ selectedRowKeys: selectedRowKeys });
                        }
                    }}
                    pagination={{ total: this.props.total, pageSize: 6, defaultCurrent: 1, onChange: this.changePage }}
                ></Table>
                <AddPer
                    visible={this.state.showAddPerDialog}
                    close={this.closeAddPerDialog}
                    addPer={this.props.addPer}
                ></AddPer>
                <EditPer
                    visible={this.state.showEditPerDialog}
                    close={this.closeEditPerDialog}
                    data={this.state.editPer}
                    submitEditPer={this.props.submitEditPer}
                />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PerMgr);
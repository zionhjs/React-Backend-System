import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Input, Button, message, Table } from 'antd';
import { Link } from 'react-router-dom';
import { LoadPerAsync, AddPerAsync, EditPerAsync } from '../../../Action/PerAction';
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
        addPer:(per) => {
            return dispatch(AddPerAsync(per));
        },
        submitEditPer: (per) => {
            return dispatch(EditPerAsync(per));
        }
    };
}

class PerMgr extends Component {
    state = {
        showAddPerDialog:false,
        showEditPerDialog:false,
        editPer:null,   // 存储当前正在编辑的权限数据对象
        params:{
            _limit:6,
            _page:1,
            q:'',
            _sort:'id',
            _order:'desc'
        },
        selectedRowKeys: [],
        colunms: [{
            key: 'id',
            dateIndex: 'id',
            title: 'Numbering'
        }, {
            key: 'type',
            dataIndex: 'type',
            title: 'Permission Type'
        }, {
            key: 'des',
            dataIndex: 'des',
            title: 'Description Type'
        }, {
            key: 'status',
            dataIndex: 'status',
            title: 'Permission Status'
        }, {
            key: 'subon',
            dataIndex: 'type',
            title: 'Submit Time'
        }, {
            key: 'code',
            dataIndex: 'code',
            title: 'Auth Code'
        }, {
            key: 'url',
            dataIndex: 'url',
            title: 'Address'
        }, {
            key: 'pId',
            dataIndex: 'pId',
            title: 'Parent Auth'
        }, {
            key: 'order',
            dataIndex: 'order',
            title: '排序'
        }, {
            key:'del',
            dataIndex:'del',
            title:'edit',
            render:(del, row) => {
                return (
                    <div>
                        <Button onClick={() => this.showEditPer(row)} style={{marginRight:'5px'}} type="primary">Edit</Button>
                        <Button type="danger">Delete</Button>
                    </div>
                )
            }
        }]
    }

    showEditPer = (per) => {
        this.setState({
            showEditPerDialog:true,
            editPer:per
        })
    }

    handleAdd = () => { 
        this.setState({showAddPerDialog: true});
    }
    handleDelete = () => { }
    handleBarEdit = () => { }
    handleSearch = (value) => { 
        this.setState(preState => {
            let newState = {...preState};
            newState.params.q = value;
            return newState;
        }, () => {
            this.loadData();
        })
    }
    changePage = (page, pageSize) => { }
    loadData = () => {
        this.props.loadDataAsync(this.state.params);
    }
    buttonStyle = { margin: '5px' }
    
    closeAddPerDialog = () => {
        this.setState({showAddPerDialog: false});
    }
    closeEditPerDialog = () => {
        this.setState({showEditPerDialog:false});
    }

    // addPer = (per) => {
    //     //发送ajax请求 添加权限数据到后台 然后重置redux的state  
    // }

    //生命周期的钩子
    compinentDidMount(){
        this.loadData();
    }

    render() {
        let { selectedRowKeys } = this.state
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/home">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/home/per_mgr">AuthManegement</Link>
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
                    dataSource={this.state.perList}
                    columns={this.state.columns}
                    rowKey="id"   //react要求必须对其指定唯一的key 不然会报错
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
                >
                </AddPer>
                <EditPer
                   visible={this.state.showEditPerDialog}
                   close={this.closeEditPerDialog}
                   data={this.state.editPer}
                   submitEditPer={this.props.submitEditPer}
                >
                </EditPer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PerMgr);
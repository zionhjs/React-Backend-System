import React, { Component } from 'react'
import { Modal, Form, message } from 'antd';
import AddUserFrm from './AddUserFrm';
import store from '../../../store';
import { AddUserActionAsync } from '../../../Action/UserAction';

const AddUserFrmComponent = Form.create({ name: 'adduser_frm' })(AddUserFrm);

class AddUser extends Component {
    userAddFrm = null;   //ref对象

    state = { fileList: [] }

    handleSubmit = () => {
        this.userAddFrm.validateFields((err, data) => {    //data就是表格里现在的数据
            // console.log(data);
            if (err) {
                return;
            }
            data.del = 0;
            data.id = Date.now(); // json-server 添加的模拟数据
            data.isTeacher = false;
            // 给上传的头像添加服务器前缀。
            data.avatar = process.env.REACT_APP_BASEURL + data.avatar;
            store
                .dispatch(AddUserActionAsync(data))
                .then(res => {
                    message.info('Add Success!');
                    // 重置添加对话框和关闭对话框
                    this.hanldeCloseModal();
                })
                .catch((e) => {
                    message.error('Add Failed! Try again!');
                    console.log(e);
                });
        })
    }

    hanldeCloseModal = () => {
        // 清空所有添加的表单
        this.userAddFrm.resetFields();
        // 清理上传文件
        this.setState({ fileList: [] });
        this.props.close();
    }
    
    changeFileList = (fileList) => {   //fileList参数是从子组件传入的
        this.setState({ fileList });
    }
    
    render() {
        return (
            <Modal
                title="Add User Form"
                okText="confirm"
                cancelText="cancel"
                visible={this.props.visible}
                onCancel={this.hanldeCloseModal}
                onOk={this.handleSubmit}
            >
                <AddUserFrmComponent
                    ref={frm => this.userAddFrm = frm}
                    fileList={this.state.fileList}
                    changeFileList={this.changeFileList}
                ></AddUserFrmComponent>
            </Modal>
        )
    }
}

export default AddUser
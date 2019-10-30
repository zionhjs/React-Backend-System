import React, { Component } from 'react';
import { Modal, Form, message } from 'antd';
import AddUserFrm from './AddUserFrm';
import store from '../../../store';
import { AddUserActionAsync } from '../../../Action/UserAction';

const AddUserFrmComponent = Form.create({name:'adduser_frm'})(AddUserFrm);

class AddUser extends Component {
    userAddFrm = null;
    handleSubmit = () => {
        this.userAddFrm.validateFields((err, data) => {
            // console.log(err);
            // console.log(data);
            if(err){
                return;
            }
            data.del = 0;
            data.id = Date.now();   //因为json-server 模拟的数据 不会自动生成id
            data.isTeacher = false;
            //给上传的头像添加服务器前缀
            data.avatar = process.env.REACT_APP_BASEURL + data.avatar;
            store.dispatch(AddUserActionAsync(data))
            .then(res => {
                message.info('Add Success!');
                //重置添加对话框和关闭对话框
                this.handleCloseModal();
            })
            .catch((e) => 
            {message.error('Add Failed, Try Again!');
            console.log(e);
            });
        })
    }
    
    handleCloseModal = () => {
        this.userAddFrm.resetFields();
        this.props.close();
    }
    
    render() {
        return (
            <Modal
            title="addUserInfo"
            okText="confirm"
            cancelText="cancel"
            visible={this.props.visible}
            onCancel={this.handleCloseModal}
            onOk={this.handleSubmit}
            >
                <AddUserFrmComponent ref={frm => this.userAddFrm = frm}></AddUserFrmComponent>
            </Modal>
        );
    }
}

export default AddUser;
import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import AddUserFrm from './AddUserFrm';

const AddUserFrmComponent = Form.create({name:'adduser_frm'})(AddUserFrm);

class AddUser extends Component {
    userAddFrm = null;
    handleSubmit = () => {
        this.userAddFrm.validateFields(function(err, data){
            // console.log(err);
            // console.log(data);
            if(err==null){
                //ajax
            }
        })
    }
    
    render() {
        return (
            <Modal
            title="addUserInfo"
            okText="confirm"
            cancelText="cancel"
            visible={this.props.visible}
            onCancel={()=>{this.props.close(); this.userAddFrm.resetFields();}}
            onOk={this.handleSubmit}
            >
                <AddUserFrmComponent ref={frm => this.userAddFrm = frm}></AddUserFrmComponent>
            </Modal>
        );
    }
}

export default AddUser;
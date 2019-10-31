import React, { Component } from 'react';
import { Modal, Form, message } from 'antd';
import AddRoleFrm from './AddRoleFrm';

const AddRoleFrmComponent = Form.create({name:'add_role'})(AddRoleFrm);

class AddRole extends Component {
    handleAddUser = () => {
        this.frmAddRole.validateFields((err, values) => {
            if(err){
                return;
            }
            this.props.addRole(values);
        });
    }
    frmAddRole = null;
    render() {
        return (
            <Modal
               visible={this.props.visible}
               onCancel={() => {
                   this.props.close()
               }}
               onOk={this.handleAddUser}
               destroyOnClose
               title="AddUser"
               okText="Add"
               cancelText="cancel"
            >
                <AddRoleFrmComponent ref={frm => this.frmAddRole = frm}></AddRoleFrmComponent>
            </Modal>
        );
    }
}

export default AddRole;
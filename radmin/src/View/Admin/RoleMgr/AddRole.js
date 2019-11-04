import React, { Component } from 'react'
import AddRoleFrm from './AddRoleFrm';
import { Modal, Form } from 'antd';

const AddRoleFrmComponent = Form.create({ name: 'add_role' })(AddRoleFrm);

class AddRole extends Component {
    handleAddUser = () => {
        this.frmAddRole.validateFields((err, values) => {
            if (err) {
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
                onCancel={() => this.props.close()}
                onOk={this.handleAddUser}
                destroyOnClose
                title="AddRole"
                okText="Add"
                cancelText="cancel"
            >
                <AddRoleFrmComponent ref={frm => this.frmAddRole = frm}></AddRoleFrmComponent>
            </Modal>
        )
    }
}

export default AddRole
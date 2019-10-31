import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import AddRoleFrm from './AddRoleFrm';

const AddRoleFrmComponent = Form.create({name:'add_role'})(AddRoleFrm);

class AddRole extends Component {
    render() {
        return (
            <Modal
               visible={this.props.visible}
               onCancel={() => {
                   this.props.close()
               }}
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
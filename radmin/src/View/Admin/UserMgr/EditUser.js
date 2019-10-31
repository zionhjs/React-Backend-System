import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import EditUserFrm from './EditUserFrm';

const EditUserFrmComponent = Form.create({name:'edit_frm'})(EditUserFrm);

class EditUser extends Component {
    render() {
        return (
            <Modal
               destoryOnClose
               title="Edit User"
               visible={this.props.visible}
               okText="edit"
               cancelText="cancel"
               onCancel={() => {this.props.close()}}
            >
                <EditUserFrmComponent data={this.props.data}></EditUserFrmComponent>
            </Modal>
        );
    }
}

export default EditUser;
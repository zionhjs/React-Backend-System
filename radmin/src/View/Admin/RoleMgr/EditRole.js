import React, { Component } from 'react'
import { Modal, Form } from 'antd';
import EditRoleFrm from './EditRoleFrm';

const EditRoleFrmComponent = Form.create({ name: 'frm_edit' })(EditRoleFrm);
class EditRole extends Component {
    handleEditRole = () => {
        this.editFrm.validateFields((err, value) => {
            if (err) return;
            this.props.saveRole(Object.assign({}, this.props.data, value));
        })
    }
    editFrm = null;
    render() {
        return (
            <Modal
                title="Edit_Role"
                okText="Edit"
                cancelText="cancel"
                destroyOnClose
                visible={this.props.visible}
                onCancel={() => this.props.close()}
                onOk={this.handleEditRole}
            >
                <EditRoleFrmComponent
                    ref={frm => this.editFrm = frm}
                    data={this.props.data}
                />
            </Modal>
        )
    }
}

export default EditRole
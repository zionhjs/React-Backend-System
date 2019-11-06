import React, { Component } from 'react';
import { Modal, Form, message } from 'antd';
import EditUserFrm from './EditUserFrm';
import store from '../../../store';
import { EditUserActionAsync } from '../../../Action/UserAction';

const EditUserFrmComponent = Form.create({ name: 'edit_frm' })(EditUserFrm);

class EditUser extends Component {
    editFrm = null;   //ref参照对象

    handleEditUser = () => {
        this.editFrm.validateFields((err, values) => {   //values 相当于子表单中的data
            if (err) {
                return;
            }
            // 提交表单
            // this.props.data
            let newUser = { ...this.props.data, ...values };
            store
                .dispatch(EditUserActionAsync(newUser))
                .then(res => {
                    message.info('Edit Success!');
                    this.props.close();
                })
                .catch((err) => {
                    console.log(err);
                    message.error('Edit Failed!');
                })
        })
    }
    
    render() {
        return (
            <Modal
                destroyOnClose
                title="Edit_User"
                visible={this.props.visible}
                okText="Edit"
                cancelText="cancel"
                onCancel={() => { this.props.close() }}
                onOk={this.handleEditUser}
            >
                <EditUserFrmComponent ref={frm => this.editFrm = frm} data={this.props.data}></EditUserFrmComponent>
            </Modal>
        )
    }
}

export default EditUser
import React, { Component } from 'react';
import { Modal, Form, message } from 'antd';
import EditUserFrm from './EditUserFrm';
import store from '../../../store';
import { EditUserActionAsync } from '../../../Action/UserAction';

const EditUserFrmComponent = Form.create({name:'edit_frm'})(EditUserFrm);

class EditUser extends Component {
    editFrm = null;
    handleEditUser= () => {
        this.editFrm.validateFields((err, values) => {
            // console.log(err);
            // console.log(values);
            if(err){
                return;
            }
            //提交表单
            //this.props.data
            let newUser = {...this.props.data, ...values};
            store.dispatch(EditUserActionAsync(newUser))
            .then(res => {
                message.info('edit success!');
                this.props.close();
            })
            .catch((err) => {
                console.log(err);
                message.error('edit failed!');
            })
        })
    }
    render() {
        return (
            <Modal
               destoryOnClose
               title="Edit User"
               visible={this.props.visible}
               okText="confirm"
               cancelText="cancel"
               onCancel={() => {this.props.close()}}
               onOk={this.handleEditUser}
            >
                <EditUserFrmComponent ref={frm => this.editFrm=frm} data={this.props.data}></EditUserFrmComponent>
            </Modal>
        );
    }
}

export default EditUser;
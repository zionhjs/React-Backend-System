import React, { Component } from 'react';
import { Modal, message, Form } from 'antd';
import AddPerFrm from './AddPerFrm';
import { formatDate2String } from '../../../Common/Helper';
import { GetLoginUserInfo } from '../../../Common/Auth';

const AddPerFrmComponent = Form.create({ name: 'add_per' })(AddPerFrm);

class AddPer extends Component {
    handleAddPer = () => {
        this.addFrm.validateFields((err, value) => {
            if (err) {
                message.error('add failed!');
                return;
            }
            let newPer = Object.assign({
                id:Date.now(),
                del:0,
                status:0,
                subon:formatDate2String(new Date()),
                subby:GetLoginUserInfo().id,
            }, value);
            this.props.addPer(newPer)
            .then(res => {
                message.info('add success!');
                this.props.close();
            })
            .catch(err => {
                console.log(err);
                message.error('add failed!');
            })
        })
    }
    addFrm = null;
    render() {
        return (
            <Modal
                visible={this.props.visible}
                onCancel={() => this.props.close()}
                destroyOnClose
                okText="Add"
                cancelText="cancel"
                title="Add-Auth"
                onOk={this.handleAddPer}
            >
                <AddPerFrmComponent
                    ref={frm => this.addFrm = frm}
                />
            </Modal>
        );
    }
}

export default AddPer;
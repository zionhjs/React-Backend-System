import React, { Component } from 'react'
import { Modal, Form, message } from 'antd'
import AddPerFrm from './AddPerFrm';
import { formateDate2String } from '../../../Common/Helper';
import { GetLoginUserInfo } from '../../../Common/Auth';

const AddPerFrmComponent = Form.create({ name: 'add_per' })(AddPerFrm);

class AddPer extends Component {
    handleAddPer = () => {
        this.addFrm.validateFields((err, values) => {
            if (err) {
                message.error('挺近失败！');
                return;
            }
            let newPer = Object.assign({
                id: Date.now(),
                del: 0,
                status: 0,
                subon: formateDate2String(new Date()),
                subby: GetLoginUserInfo().id
            }, values);
            this.props.addPer(newPer)
                .then(res => {
                    message.info('添加成功！')
                    this.props.close();
                })
                .catch(err => {
                    console.log(err);
                    message.error('添加失败！');
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
                okText="添加"
                cancelText="取消"
                title="添加权限"
                onOk={this.handleAddPer}
            >
                <AddPerFrmComponent
                    ref={frm => this.addFrm = frm}
                />
            </Modal>
        )
    }
}

export default AddPer
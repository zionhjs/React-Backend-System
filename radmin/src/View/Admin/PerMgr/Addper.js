import React, { Component } from 'react'
import { Modal, Form, message } from 'antd'
import AddPerFrm from './AddPerFrm';
import { formatDate2String } from '../../../Common/Helper';
import { GetLoginUserInfo } from '../../../Common/Auth';

const AddPerFrmComponent = Form.create({ name: 'add_per' })(AddPerFrm);

class AddPer extends Component {
    handleAddPer = () => {
        this.addFrm.validateFields((err, values) => {
            if (err) {
                message.error('Submit Failed!');
                return;
            }
            let newPer = Object.assign({
                id: Date.now(),
                del: 0,
                status: 0,
                subon: formatDate2String(new Date()),
                subby: GetLoginUserInfo().id
            }, values);
            this.props.addPer(newPer)
                .then(res => {
                    message.info('Add Success!')
                    this.props.close();
                })
                .catch(err => {
                    console.log(err);
                    message.error('Add Failed!');
                })
        })
    }
    addFrm = null;   //the refs reference for <AddPerFrmComponent />
    render() {
        return (
            <Modal
                visible={this.props.visible}
                onCancel={() => this.props.close()}
                destroyOnClose
                okText="Add"
                cancelText="cancel"
                title="Add_Auth"
                onOk={this.handleAddPer}
            >
                <AddPerFrmComponent
                    ref={frm => this.addFrm = frm}   //frm在这里是一个dom元素 并且passed as a parameter. 这里是ref的第二种approach 直接传入一个回调函数 这样做的好处是替代了this.addFrm.current 来调用方法
                />                                
            </Modal>
        )
    }
}

export default AddPer
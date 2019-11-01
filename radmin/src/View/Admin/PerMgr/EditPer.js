import React, { Component } from 'react';
import { Modal, Form, message } from 'antd';
import EditPerFrm from './EditPerFrm';

const EditPerFrmComponent = Form.create({name:'edit_per'})(EditPerFrm);
class EditPer extends Component {
    handleEditPer = () => {
        this.editFrm.validateFieldsAndScroll((err, values) => {
            if(err){
                message.error('please type right-data!');
                return;
            }
            let newPer = Object.assign({}, this.props.data, values);
            this.props.submitEditPer(newPer)
            .then(res => {
                message.info('edit success!');
                this.props.close();
            })
            .catch(err => {
                console.log('err:', err);
                message.error('edit failed!');
            })
        });
    }
    editFrm = null;
    render() {
        return (
            <Modal
               visble={this.props.visible}
               destroyOnClose
               okText="Edit"
               cancelText="cancel"
               onCancel={() => this.props.close()}
               title="Edit-Auth"
               onOk={this.handleEditPer}
            >
                <EditPerFrmComponent 
                ref={frm => this.editFrm = frm}
                   data={this.props.data} />
            </Modal>
        );
    }
}

export default EditPer;
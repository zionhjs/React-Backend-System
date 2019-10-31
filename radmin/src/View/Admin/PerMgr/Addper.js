import React, { Component } from 'react';
import { Modal } from 'antd';
import AddPerFrm from './index';

const AddPerFrmComponent = Form.create({name:'add_per'})(AddPerFrm);

class AddPer extends Component {
    render() {
        return (
            <Modal
               visible = {this.props.visible}
               onCancel = {() => this.props.close()}
               destroyOnClose
               okText="Add"
               cancelText="cancel"
               title="Add-Auth"
            >
                <AddPerFrmComponent />
            </Modal>
        );
    }
}

export default AddPer;
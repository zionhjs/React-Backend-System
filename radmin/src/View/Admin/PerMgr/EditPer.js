import React, { Component } from 'react';
import { Modal } from 'antd';
import EditPerFrm from './EditPerFrm';

const EditPerFrmComponent = Form.create({name:'edit_per'})(EditPerFrm);
class EditPer extends Component {
    render() {
        return (
            <Modal
               visble={this.props.visible}
               destroyOnClose
               okText="Edit"
               cancelText="cancel"
               onCancel={() => this.props.close()}
               title="Edit-Auth"
            >
                <EditPerFrmComponent data={this.props.data} />
            </Modal>
        );
    }
}

export default EditPer;
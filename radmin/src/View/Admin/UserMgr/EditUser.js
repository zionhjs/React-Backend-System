import React, { Component } from 'react';
import { Modal } from 'antd';

class EditUser extends Component {
    render() {
        return (
            <Modal
               title="Edit User"
               visible={this.props.visible}
               okText="edit"
               cancelText="cancel"
               onCancel={() => {this.props.close()}}
            >
                Edit
            </Modal>
        );
    }
}

export default EditUser;
import React, { Component } from 'react';
import { Modal } from 'antd';

class AddUser extends Component {
    render() {
        return (
            <Modal
            title="addUserInfo"
            okText="confirm"
            cancelText="cancel"
            visible={this.props.visible}
            onCancel={()=>this.props.close()}
            >
                AddUser
            </Modal>
        );
    }
}

export default AddUser;
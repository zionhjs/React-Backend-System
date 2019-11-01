import React, { Component } from 'react';

class SetRole extends Component {
    render() {
        return (
            <Modal
               title="userSetRoles"
               destroyOnClose
               okText="set"
               cancelText="cancel"
               onCancel={() => this.props.close()}
               visible={this.props.visible}
            >
                <h3>setRole for User: {this.props.data ? this.props.data.name : null} </h3>
            </Modal>
        );
    }
}

export default SetRole;
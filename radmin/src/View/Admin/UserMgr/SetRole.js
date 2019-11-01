import React, { Component } from 'react';
import { Modal, Checkbox, Row, Col } from 'antd';
import service from '../../../Service';

class SetRole extends Component {
    state = {
        allRoles: [],   //所有的角色信息的数组
    }
    componentDidMount() {
        //加载所有的角色
        service.loadAllRoles()
            .then(res => {
                this.setState({ allRoles: res.data });
            })
    }
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
                <hr />
                <Row>
                    {
                        this.state.allRoles.map(role => {
                            return (
                                <Col span={8}>
                                    <Checkbox>{role.name}</Checkbox>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Modal>
        );
    }
}

export default SetRole;
import React, { Component } from 'react';
import { Modal, Checkbox, Row, Col } from 'antd';
import service from '../../../Service';

class SetRole extends Component {
    state = {
        allRoles: [],   //所有的角色信息的数组
        userRoles: []   //当前用户已经关联的所有觉得中间表数据
    }
    
    async componentDidMount() {
        //this.props.data => 当前设置角色的用户信息
        let userRoles = await service.loadUserRoles(this.props.data.id);
        let roles = await service.loadAllRoles();
        this.setState({userRoles:userRoles, allRoles:roles});
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
                            let checked = false;
                            //判断当前用户是否已经关联了当前的角色信息
                            if(this.state.userRoles.find(userRole => userRole.roleId === role.id){
                                checked = true;
                            }
                            return (
                                <Col span={8}>
                                    <Checkbox defaultChecked={checked}>{role.name}</Checkbox>
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
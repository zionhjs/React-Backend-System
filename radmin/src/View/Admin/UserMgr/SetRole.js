import React, { Component } from 'react'
import { Modal, Checkbox, Row, Col, message } from 'antd'
import service from '../../../Service';
import { formateDate2String } from '../../../Common/Helper';
class SetRole extends Component {
    state = {
        allRoles: [],       // 所有的角色信息的数组
        userRoles: [],      // 当前用户已经管理的所有角色中间表数据
        allCheckedRole: []  // 当前选中的所有的角色。
    }
    async componentDidMount() {
        // this.props.data  => 当前设置角色的用户信息
        let userRoles = await service.loadUserRoles(this.props.data.id);
        let roles = await service.loadAllRoles();
        let checkedRoleArr = [];

        // 给已经默认设置了关联的角色添加到 allCheckedRole数组中去。
        userRoles.data.forEach(userRole => {
            let roleInfo = roles.data.find(role => role.id === userRole.roleId);
            if (roleInfo) {
                checkedRoleArr.push(roleInfo);
            }
        })
        this.setState({ userRoles: userRoles.data, allRoles: roles.data, allCheckedRole: checkedRoleArr });
    }

    handleChangeCheckbox = (role, e) => {
        // console.log('e.target.checked :', e.target.checked);
        // console.log('role :', role);
        let checkedRoleArr = [...this.state.allCheckedRole]
        if (e.target.checked) {
            checkedRoleArr.push(role);
        } else {
            checkedRoleArr = checkedRoleArr.filter(item => item.id !== role.id);
        }
        this.setState({ allCheckedRole: checkedRoleArr });
    }
    handleSubmitSetRole = () => {
        // console.log(this.state.allCheckedRole);
        let { allCheckedRole, userRoles } = this.state;
        let promiseArr = [];
        // 判断要添加的
        // 最终的选中的role集合中不在原来的关联表中存在，就是添加的新关联。
        allCheckedRole.forEach((role, index) => {
            let addRoleIndex = userRoles.findIndex(userRole => userRole.roleId === role.id);
            if (addRoleIndex < 0) {
                // 添加关联
                let p1 = service.addUserRole({
                    id: Date.now() + index,
                    del: 0,
                    subon: formateDate2String(new Date()),
                    roleId: role.id,
                    userId: this.props.data.id
                });
                promiseArr.push(p1);
            }
        });
        // 判断要删除的
        userRoles.forEach(userRole => {
            let searchRoleIndex = allCheckedRole.findIndex(role => role.id === userRole.roleId);
            if (searchRoleIndex < 0) {
                // 进行删除的关系
                let p2 = service.deleteUserRole(userRole.id);
                promiseArr.push(p2);
            }
        });
        Promise
            .all(promiseArr)
            .then(res => {
                message.info('Set Success!');
                this.props.close();
            })
            .catch(err => {
                message.error('Set Failed!');
                console.log('err :', err);
            });
    }
    render() {
        return (
            <Modal
                title="User_Set_Role"
                destroyOnClose
                okText="set"
                cancelText="cancel"
                onCancel={() => this.props.close()}
                visible={this.props.visible}
                onOk={this.handleSubmitSetRole}
            >
                <h3>ForUser:{this.props.data ? this.props.data.name : null}  SetRole</h3>
                <hr />
                <Row>
                    {
                        this.state.allRoles.map(role => {
                            let checked = false;
                            // 判断当前用户是否已经关联了当前的角色信息
                            if (this.state.userRoles.find(userRole => userRole.roleId === role.id)) {
                                checked = true;
                            }
                            return (
                                <Col span={8} key={role.id}>
                                    <Checkbox onChange={(e) => { this.handleChangeCheckbox(role, e) }} defaultChecked={checked}>{role.name}</Checkbox>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Modal>
        )
    }
}

export default SetRole
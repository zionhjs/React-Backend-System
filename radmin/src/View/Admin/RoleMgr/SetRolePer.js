import React, { Component } from 'react'
import { Row, Col, Checkbox, message } from 'antd';
import { formatDate2String } from '../../../Common/Helper';
import { blue } from '@ant-design/colors';
import service from '../../../Service';

class SetRolePer extends Component {
    state = {
        allPer: [],        // 所有的权限数据
        rolePer: [],       // 默认角色关联的权限中间数据
        allCheckedPer: []  // 最终用户所有选中的权限
    }
    async componentDidMount() {
        // 加载所有的权限数据
        let allPer = await service
            .loadAllPer()
            .then(res => res.data);
        let rolePer = await service
            .loadRolePer(this.props.data.id)
            .then(res => res.data);

        let allCheckedPer = [];
        rolePer.forEach(rolePer => {
            let per = allPer.find(per => per.id === rolePer.permissionId);
            if (per) allCheckedPer.push(per);
        })

        this.setState({ allPer, rolePer, allCheckedPer })
    }

    hanldeSubmitSetRolePer = () => {
        // console.log(12234);
        let { allCheckedPer, rolePer } = this.state;
        let promiseArr = [];
        // 添加的
        allCheckedPer.forEach((per, index) => {
            if (rolePer.findIndex(rp => rp.permissionId === per.id) < 0) {
                // 此时添加
                promiseArr.push(service.addRolePer({
                    id: Date.now() + index,
                    del: 0,
                    subon: formatDate2String(new Date()),
                    permissionId: per.id,
                    roleId: this.props.data.id
                }));
            }
        })
        // 删除的
        rolePer.forEach(rp => {
            if (allCheckedPer.findIndex(per => per.id === rp.permissionId) < 0) {
                // 删除
                promiseArr.push(service.deleteRolePer(rp.id));
            }
        });

        Promise.all(promiseArr)
            .then(res => {
                message.info('Set Success!');
                this.props.close();
            })
            .catch(err => {
                console.log('err :', err);
                message.error('Set Failed!');
            })
    }

    handleChangeChecked = (per, e) => {
        let allCheckedPer = [...this.state.allCheckedPer];
        // 一种选中
        if (e.target.checked) {
            allCheckedPer.push(per);
        } else {
            // 二中：取消选中
            allCheckedPer = allCheckedPer.filter(item => item.id !== per.id);
        }
        this.setState({ allCheckedPer });
    }

    render() {
        let { allPer, rolePer } = this.state;
        return (
            <div>
                <h3>ForRole:<span style={{ color: blue[5] }}>{this.props.data.name} </span>SetAuth</h3>
                <hr />
                <Row>
                    {
                        allPer.map(per => {
                            let checked = false;
                            let index = rolePer.findIndex(rp => rp.permissionId === per.id);
                            checked = index >= 0;
                            return (
                                <Col key={per.id} span={8}>
                                    <Checkbox onChange={(e) => { this.handleChangeChecked(per, e) }} defaultChecked={checked}>{per.des}</Checkbox>
                                </Col>
                            );
                        })
                    }
                </Row>
            </div>
        )
    }
}

export default SetRolePer
import React, { Component } from 'react';
import {Row, Col, Checkbox} from 'antd';
import { red } from '@ant-design/colors';
import service from '../../../Service';

class SetRolePer extends Component {
    state = {
        allPer: [],   //所有的权限数据
        rolePer: [],   //默认角色关联的权限中间数据
        allCheckedPer: []   //最终用户所有选中的权限
    }
    async conponentDidMount() {
        //加载所有的权限数据
        let allPer = await service.loadAllPer()
            .then(res => res.data);
        let rolePer = await service
            .loadRolePer(this.props.data.id)
            .then(res => res.data);

        let allCheckedPer = [];
        rolePer.forEach(rolePer => {
            let per = allPer.find(per => per.id === rolePer.permissionId);
            if(per) allCheckedPer.push();
        })
        
        this.setState({allPer, rolePer, allCheckedPer})
    }
    render() {
        let {allPer, rolePer} = this.state;
        return (
            <div>
                <h3>ForRole:<span style={{ color: red[5] }}></span>{this.props.data.name}SetPermission</h3>
                <hr />
                <Row>
                    {
                        allPer.map(per => {
                            let checked = false;
                            let index = rolePer.findIndex(rp => rp.permissionId === per.id);
                            checked = index >= 0;
                            return (
                                <Col key={per.id} span={8}>
                                    <Checkbox defaultChecked={checked}>{per.des}</Checkbox>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        );
    }
}

export default SetRolePer;
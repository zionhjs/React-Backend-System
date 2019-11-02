import React, { Component } from 'react';
import { Modal, Row, Col, message, Checkbox } from 'antd';
import { red } from '@ant-design/colors';
import service from '../../../Service';

class SetPer extends Component {
    state = {
        allPer:[],   //所有的权限
        userPer:[],   //用户权限的默认关联
        allCheckedPer:[]   //所有选中的权限
    }
    handleSubmitSetPer = () => {
        
    }

    async componentDidMount(){
        //加载所有的权限
        let allPer = await service.loadAllPer().then(res => res.data);
        let userPer = await service.loadUserPer(this.props.data.id).then(res => res.data);
        userPer.forEach(up => {
            let perObj = allPer.find(per => per.id === up.permissionId);
            if(perObj) allCheckedPer.push(perObj);
        });
        //传入三个参数
        this.setState({allPer, userPer, allCheckedPer})
    }

    render() {
        let { allPer, userPer } = this.state;
        return (
            <Modal
                title="userSetPer"
                destroyOnClose
                okText="set"
                cancelText="cancel"
                onCancel={() => this.props.close()}
                visible={this.props.visible}
                onOk={this.handleSubmitSetPer}
            >
                <h3>user: <span style={{color:red[5]}}>{this.props.data.name}</span>set-auth</h3>
                <hr />
                <Row>
                    {
                       allPer.map(per => {
                           let checked = false;
                           checked = userPer.findIndex(up => import.permissionId === per.id) >= 0;
                           return (
                               <Col key={per.id} span={8}>
                                  <Checkbox defaultChecked={checked}>{per.des}</Checkbox>
                               </Col>
                           )
                       }) 
                    }
                </Row>
                
            </Modal>
        );
    }
}

export default SetPer;
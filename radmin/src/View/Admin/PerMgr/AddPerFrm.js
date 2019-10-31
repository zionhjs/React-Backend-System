import React, { Component } from 'react';
import { Form, Input, Icon, message, Select, Option } from 'antd';

class AddPerFrm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item lable="AuthName">
                    {getFieldDecorator('des', {
                        rules: [
                            {
                                min:2,
                                max:20,
                                message: 'please type-in 2~20 strings!',
                            }, {
                                required: true,
                                message: 'Please type-in AuthName!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="smile"></Icon>}
                            placeholder="AuthName"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="AuthType">
                    {getFieldDecorator('type', {
                        rules: [
                            {
                                required:true,
                                message: 'please choose auth-type!',
                            }],
                    })(
                        <Select defaultValue="router">
                            <Option value="menu">MenuAuth</Option>
                            <Option value="action">RequestAuth</Option>
                            <Option value="router">RouterAuth</Option>
                            <Option value="resource">ResourceAuth</Option>
                            <Option value="component">ComponentAuth</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item lable="AuthCode">
                    {getFieldDecorator('code', {
                        rules: [
                            {
                                min:2,
                                max:20,
                                message: 'please type-in 2~20 strings!',
                            }],
                    })(
                        <Input prefix={<Icon type="setting"></Icon>}
                            placeholder="AuthCode"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="ParentAuth">
                    {getFieldDecorator('pId', {
                        rules: [
                            {
                                required: true,
                                message: 'Please type-in ParentAuth!',
                            }],
                    })(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="Parentauth"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="Address">
                    {getFieldDecorator('url')(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="Parentauth"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="Order">
                    {getFieldDecorator('order')(
                        <Input prefix={<Icon type="email"></Icon>}
                            placeholder="Order"
                        />
                    )}
                </Form.Item>
            </Form>
        );
    }
}

export default AddPerFrm;
import React, { Component } from 'react'
import { Form, Input, Icon, Select } from 'antd'

class AddPerFrm extends Component {
    componentDidMount() {
        this.props.form.setFieldsValue({ pId: 0, type: 'menu', order: 1 });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        return (
            <Form
                layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item label="Auth-Name">
                    {getFieldDecorator('des', {
                        rules: [
                            {
                                min: 2,
                                max: 20,
                                message: 'please type-in 2~20 strings!',
                            },
                            {
                                required: true,
                                message: 'please type-in auth name!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="smile"></Icon>}
                            placeholder="Auth-Name"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Auth-Type">
                    {getFieldDecorator('type', {
                        rules: [
                            {
                                required: true,
                                message: 'Please select Auth-type!',
                            }
                        ],
                    })(
                        <Select>
                            <Option value="menu">Menu_Auth</Option>
                            <Option value="action">Request_Auth</Option>
                            <Option value="router">Route_Auth</Option>
                            <Option value="resource">Resource_Auth</Option>
                            <Option value="component">Component_Auth</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Auth-code">
                    {getFieldDecorator('code', {
                        rules: [
                            {
                                min: 2,
                                max: 20,
                                message: 'please type-in 2~20 strings!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="setting"></Icon>}
                            placeholder="Auth-code"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Parent-Auth">
                    {getFieldDecorator('pId', {
                        rules: [
                            {
                                required: true,
                                message: 'please type-in parent-Auth',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="Parent-Auth"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Address">
                    {getFieldDecorator('url')(
                        <Input prefix={<Icon type="mail"></Icon>}
                            placeholder="Address"
                        />
                    )}
                </Form.Item>
                <Form.Item label="order">
                    {getFieldDecorator('order')(
                        <Input prefix={<Icon type="mail"></Icon>}
                            placeholder="order"
                        />
                    )}
                </Form.Item>
            </Form>
        )
    }
}

export default AddPerFrm
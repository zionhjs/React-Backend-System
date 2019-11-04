import React, { Component } from 'react'
import { Form, Input, Icon } from 'antd';

class EditUserFrm extends Component {
    componentDidMount() {
        this.props.form.setFieldsValue({
            name: this.props.data.name,
            username: this.props.data.username,
            mail: this.props.data.mail,
            phone: this.props.data.phone,
            password: this.props.data.password
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item label="User_Name">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                pattern: /\w{6,20}/gi,
                                message: 'please type-in 6-20 strings!',
                            },
                            {
                                required: true,
                                message: 'please type-in UserName',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="User_Name"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Password">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                pattern: /\w{6,20}/gi,
                                message: 'please type-in 6-20 strings!',
                            },
                            {
                                required: true,
                                message: 'please type-in password!',
                            }
                        ],
                    })(
                        <Input.Password prefix={
                            <Icon type="safety" />
                        }
                            placeholder="User_Name"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Email">
                    {getFieldDecorator('mail', {
                        rules: [
                            {
                                type: 'email',
                                message: 'Please type-in correct email-format!',
                            },
                            {
                                required: true,
                                message: 'please type-in Email!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="mail"></Icon>}
                            placeholder="Email"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                min: 2,
                                message: 'please type-in more than 2 strings!',
                            },
                            {
                                required: true,
                                message: 'please type-in name!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="Name"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Phone">
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                pattern: /\d{11}/gi,
                                message: 'please type-in 11 strings!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="phone"></Icon>}
                            placeholder="Phone"
                        />
                    )}
                </Form.Item>
            </Form>
        )
    }
}

export default EditUserFrm
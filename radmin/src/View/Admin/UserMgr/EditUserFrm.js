import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';

class EditUserFrm extends Component {
    componentDidMount(){
        this.props.form.setFieldsValue(this.props.data);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item lable="UserName">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                pattern: /\w{6,20}/gi,
                                message: 'please type-in 6~20 strings!',
                            }, {
                                required: true,
                                message: 'Please type-in your UserName!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="UserName"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="PassWord">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                pattern: /\w{6,20}/gi,
                                message: 'please type-in 6~20 strings!',
                            }, {
                                required: true,
                                message: 'Please type-in your PassWord!',
                            }
                        ],
                    })(
                        <Input.Password prefix={<Icon type="safety"></Icon>}
                            placeholder="PassWord"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="Mail">
                    {getFieldDecorator('mail', {
                        rules: [
                            {
                                type: 'email',
                                message: 'please type-in right format of Email!'
                            }, {
                                required: true,
                                message: 'Please type-in your Email!'
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="mail"></Icon>}
                            placeholder="Email"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="Name">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                min: 2,
                                message: 'please type-in your name!'
                            }, {
                                required: true,
                                message: 'Please type-in your Name!'
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="Name"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="Phone">
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                pattern: /\d{11}/gi,
                                message: 'please type-in right format of phone!'
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="phone"></Icon>}
                            placeholder="Phone"
                        />
                    )}
                </Form.Item>
            </Form>
        );
    }
}

export default EditUserFrm;
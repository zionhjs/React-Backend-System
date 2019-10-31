import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';

class AddRoleFrm extends Component {
    componentDidMount(){
        this.props.form.setFieldsValue({'pId':0});
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item lable="RoleName">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                pattern: /\w{2,20}/gi,
                                message: 'please type-in 2~20 strings!',
                            }, {
                                required: true,
                                message: 'Please type-in RoleName!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="smile"></Icon>}
                            placeholder="RoleName"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="Role-Description">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                pattern: /\w{2,20}/gi,
                                message: 'please type-in 2~20 strings!',
                            }, {
                                required: true,
                                message: 'Please type-in RoleDescription!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="setting"></Icon>}
                            placeholder="RoleDescription"
                        />
                    )}
                </Form.Item>
                <Form.Item lable="Parent-Role">
                    {getFieldDecorator('pId', {
                        rules: [
                            {
                                required: true,
                                message: 'Please type-in ParentRole!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="ParentRole"
                        />
                    )}
                </Form.Item>
            </Form>
        );
    }
}

export default AddRoleFrm;
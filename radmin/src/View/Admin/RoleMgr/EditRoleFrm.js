import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';

class EditRoleFrm extends Component {
    componentDidMount(){
        let role = this.props.data;
        this.props.form.setFieldsValue({'pId':role.pId, name:role.name, des:role.des});
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
                                min:2,
                                max:20,
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
                                min:2,
                                max:20,
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

export default EditRoleFrm;
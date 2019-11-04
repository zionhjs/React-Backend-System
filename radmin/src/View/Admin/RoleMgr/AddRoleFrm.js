import React, { Component } from 'react'
import { Form, Input, Icon } from 'antd';

class AddRoleFrm extends Component {
    componentDidMount() {
        this.props.form.setFieldsValue({ 'pId': 0 });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item label="Role_Name">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                min: 2,
                                max: 20,
                                message: 'please type-in 2-20 strings!',
                            },
                            {
                                required: true,
                                message: 'please type-in Role_Name',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="smile"></Icon>}
                            placeholder="Role_Name"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Role_Des">
                    {getFieldDecorator('des', {
                        rules: [
                            {
                                min: 2,
                                max: 20,
                                message: 'please type-in 2-20 strings!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="setting"></Icon>}
                            placeholder="Role_Des"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Parent_Role">
                    {getFieldDecorator('pId', {
                        rules: [
                            {
                                required: true,
                                message: 'please type-in parent-Role',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="Parent_Role"
                        />
                    )}
                </Form.Item>
            </Form>
        )
    }
}

export default AddRoleFrm
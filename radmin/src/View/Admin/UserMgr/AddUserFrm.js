import React, { Component } from 'react'
import { Form, Input, Icon, Upload, Button } from 'antd';
import { getLoginTocken } from '../../../Common/Auth';

class AddUserFrm extends Component {
    handleChangeAvatar = (e) => {
        this.props.changeFileList(e.fileList);
        if (e.file.response) {
            console.log(e.file.response);
            return e.file.response.img;
        }
        return '';
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item label="UserAvatar">
                    {getFieldDecorator('avatar', {
                        getValueFromEvent: this.handleChangeAvatar,
                        rules: [
                            {
                                required: true,
                                message: 'please update img!',
                            }
                        ],
                    })(
                        <Upload
                            accept="image/*"
                            action="/per/upload"
                            headers={{ Authorization: getLoginTocken() }}
                            name="imgF"
                            listType="picture"
                            onChange={this.handleChangeAvatar}
                            fileList={this.props.fileList}
                        >
                            <Button>Update_Avatar</Button>
                        </Upload>
                    )}
                </Form.Item>
                <Form.Item label="User_Name">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                pattern: /\w{6,20}/gi,
                                message: 'please type-in 6-20 strings!',
                            },
                            {
                                required: true,
                                message: 'please type-in username!',
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="user"></Icon>}
                            placeholder="User_name"
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
                                message: 'please type-in password',
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
                                message: 'Please type-in correct format of email!',
                            },
                            {
                                required: true,
                                message: 'please type-in email',
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

export default AddUserFrm
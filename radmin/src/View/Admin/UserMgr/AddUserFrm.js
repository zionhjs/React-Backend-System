import React, { Component } from 'react';
import { Form, Input, Icon, Upload, Button } from 'antd';
import { getLoginToken } from '../../../Common/Auth';

class AddUserFrm extends Component {
    handleChangeAvatar = (e) => {
        this.props.changeFileList(e.fileList);
        if(e.file.response){
            console.log(e.file.response);
            return e.file.response.img;
        }
        return '';
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item lable="UserPhoto">
                    {getFieldDecorator('avatar', {
                        getValueFromEvent: this.handleChangeAvatar,
                        rules: [
                            {
                                required: true,
                                message: 'Please update your photo!',
                            }
                        ],
                    })(
                        <Upload 
                               accept="image/*"
                               action="/per/upload"
                               headers={{authorization:getLoginToken()}}
                               name="imgF"
                               listType="picture"
                               onChange={this.handleChangeAvatar}
                        >
                            <Button>UploadPhoto</Button>
                        </Upload>
                    )}
                </Form.Item>
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

export default AddUserFrm;
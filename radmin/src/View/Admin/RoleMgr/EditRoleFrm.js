import React, { Component } from 'react'
import { Form, Input, Icon } from 'antd';

class EditRoleFrm extends Component {
  componentDidMount() {
    let role = this.props.data;
    this.props.form.setFieldsValue({pId: role.pId, name: role.name, des: role.des});
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form 
        layout="horizontal"
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
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
                message: 'please type-in Parent_Role!',
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

export default EditRoleFrm
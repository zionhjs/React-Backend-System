import React, { Component } from 'react'
import { Form, Input, Icon, Select } from 'antd'

class EditPerFrm extends Component {
    componentDidMount() {
      let { data } = this.props;
      this.props.form.setFieldsValue({
        pId: data.pId, 
        type: data.type, 
        order: data.order,
        des: data.des,
        code: data.code,
        url: data.url,
      });
    }
    
    render () {
      const { getFieldDecorator } = this.props.form;
      const { Option } = Select;
      return (
        <Form 
        layout="horizontal"
        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
      >
        <Form.Item label="Auth_Name">
          {getFieldDecorator('des', {
            rules: [
              {
                min: 2,
                max: 20,
                message: 'please type-in 2-20 strings!',
              },
              {
                required: true,
                message: 'please type-in Auth_Name',
              }
            ],
          })(
            <Input prefix={<Icon type="smile"></Icon>} 
              placeholder="Auth_Name"
            />
          )}
        </Form.Item>
        <Form.Item label="Auth_Type">
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: 'please select Auth-Type!',
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
        <Form.Item label="Auth_Code">
          {getFieldDecorator('code', {
            rules: [
              {
                min: 2,
                max: 20,
                message: 'please type-in 2-20 strings!',
              }
            ],
          })(
            <Input prefix={<Icon type="setting"></Icon>} 
              placeholder="Auth_Code"
            />
          )}
        </Form.Item>
        <Form.Item label="Parent_Auth">
          {getFieldDecorator('pId', {
            rules: [
              {
                required: true,
                message: 'please type-in Parent_Auth!',
              }
            ],
          })(
            <Input prefix={<Icon type="user"></Icon>} 
              placeholder="Parent_Auth"
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
  
  export default EditPerFrm
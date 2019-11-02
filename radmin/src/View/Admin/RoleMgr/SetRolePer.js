import React, { Component } from 'react';
import {red} from '@ant-design/colors';

class SetRolePer extends Component {
    render() {
        return (
            <div>
                <h3>ForRole:<span style={{color:red[5]}}></span>{this.props.data.name}SetPermission</h3>
                <hr/>
            </div>
        );
    }
}

export default SetRolePer;
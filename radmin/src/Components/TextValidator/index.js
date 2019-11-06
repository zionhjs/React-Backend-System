//表单验证逻辑文件
import React, { Fragment } from 'react'
import { ValidatorComponent } from 'react-form-validator-core';

class TextValidator extends ValidatorComponent {
    errorText() {
        const { isValid } = this.state;
        if (isValid) {
            return null;
        }
        return (
            <span style={{ color: 'red', textAlign: 'center', width: '150px', fontSize: '12px', position: 'absolute', left: '100%', top: '6px', padding: '0 0 0 15px' }}>
                {this.getErrorMessage()}
            </span>
        );
    }

    render() {
        const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
        return (
            <Fragment>
                <input {...rest} />
                {this.errorText()}
            </Fragment>
        )
    }
}

export default TextValidator
import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const renderField = field => (
    <div>
        <label>{field.input.placeholder}</label>
        <div>
            <input {...field.input}/>
            {field.touched && field.error && <span>{field.error}</span>}
        </div>
    </div>
)

export default class FieldFormControl extends Component {

    render () {

        const {
            placeholder,
            type,
            input,
            meta: { error, warning, touched }
        } = this.props;

        const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;

        return (
            <FormGroup controlId={input.name} validationState={validationState}>
                <ControlLabel>{this.props.children}</ControlLabel>
                <FormControl type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} />
                <FormControl.Feedback />
            </FormGroup>
        );
    }
}


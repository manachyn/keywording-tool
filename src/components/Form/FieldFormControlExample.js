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

// <Field name="ServerPort"
// type='number'
// component={FieldInput}
// placeholder={ServerPort}
// min="1024" max="65535"
//     />

const FieldInput = ({ input, meta, type, placeholder, min, max }) => {
    return (
        <FormControl
            type={type}
            placeholder={placeholder}
            min={min}
            max={max}
            value={input.value}
            onChange={input.onChange} />
    )
}

// const ReduxFormControl = ({input, meta, ...props}) => {
//     return <FormControl {...props} {...input} />
// };
//
// <Field component={ReduxFormControl} ... />

//https://github.com/ender74/redux-form-fields

export default class FieldFormControlExample extends Component {

    render () {

        const { placeholder, type, input, meta} = this.props;

        return (
            <FormGroup controlId={input.name} validationState={meta.error ? 'error' : 'success'}>
                <ControlLabel>{this.props.children}</ControlLabel>
                <FormControl type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} />
                <FormControl.Feedback />
            </FormGroup>
        );
    }
}

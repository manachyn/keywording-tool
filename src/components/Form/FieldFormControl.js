import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Glyphicon} from 'react-bootstrap';

// const renderField = field => (
//     <div>
//         <label>{field.input.placeholder}</label>
//         <div>
//             <input {...field.input}/>
//             {field.touched && field.error && <span>{field.error}</span>}
//         </div>
//     </div>
// );

export const renderField = ({ input, label, name, placeholder, type, componentClass, help, feedback, meta: { touched, error, warning } }) => {
    return (
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...input} componentClass={componentClass} type={type} placeholder={placeholder} />
            {help && <HelpBlock>{help}</HelpBlock>}
            {touched && error && <span className="error-text">{error}</span>}
            {feedback &&
                <FormControl.Feedback>
                    {feedback}
                </FormControl.Feedback>
            }
        </FormGroup>
    );
};

// export default class FieldFormControl extends Component {
//
//     render () {
//         console.log(this.props);
//         const {
//             placeholder,
//             type,
//             input,
//             meta: { error, warning, touched }
//         } = this.props;
//
//         const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;
//
//         return (
//             <FormGroup controlId={input.name} validationState={validationState}>
//                 <ControlLabel>{this.props.children}</ControlLabel>
//                 <FormControl type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} />
//                 {/*<FormControl componentClass="textarea" placeholder="textarea" />*/}
//                 <FormControl.Feedback />
//             </FormGroup>
//         );
//     }
// }


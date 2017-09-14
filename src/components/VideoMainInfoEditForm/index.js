import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import { renderField } from '../Form/FieldFormControl';
import 'bootstrap/dist/css/bootstrap.css';

let VideoMainInfoEditForm = props => {
    const { videoId, onSubmit, handleSubmit, submitting } = props;

    const submit = values => {
        return onSubmit(videoId, values);
        // this.props.handleSubmit(data)
        //     .then(() => {
        //         this.setState({saved: true});
        //         setTimeout(() => {
        //             this.setState({saved: false});
        //         }, 5000); // show message for 5 seconds
        //     })
    };

    return (
        <Row>
            <Form onSubmit={handleSubmit(submit)}>
                <Col md={6}>
                    <Field type="text" name="code" component={renderField} label="Code" />
                    <Field type="text" name="duration" component={renderField} label="Duration" />
                    <Field type="text" name="title" component={renderField} label="Title" />
                </Col>
                <Col md={6}>
                    <Field name="description" component={renderField} componentClass="textarea" label="Description" />
                </Col>
                <Clearfix />
                <Col md={6}>
                    <Button bsStyle="primary" type="submit" disabled={submitting}>Submit</Button>
                </Col>
            </Form>
        </Row>
    )
};

VideoMainInfoEditForm = reduxForm({
    form: 'videoMainInfoEditForm'
})(VideoMainInfoEditForm);

export default VideoMainInfoEditForm;
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import { renderField } from '../Form/FieldFormControl';
import 'bootstrap/dist/css/bootstrap.css';

let VideoAttributesEditForm = props => {
    const { elementId, onSubmit, handleSubmit, submitting } = props;

    const submit = values => {
        return onSubmit(elementId, values);
    };

    return (
        <Row>
            <Form onSubmit={handleSubmit(submit)}>
                <Col md={6}>
                    <Field type="text" name="download_size" component={renderField} label="Download Size" />
                    <Field type="text" name="shot_type" component={renderField} label="Shot Type" />
                    <Field type="text" name="footage_type" component={renderField} label="Footage Type" />
                </Col>
                <Col md={6}>
                    <Field type="text" name="frame_size" component={renderField} label="Frame Size" />
                    <Field type="text" name="frame_rate" component={renderField} label="Frame Rate" />
                    <Field type="text" name="aspect_ratio" component={renderField} label="Aspect Ratio" />
                </Col>
                <Clearfix />
                <Col md={6}>
                    <Button bsStyle="primary" type="submit" disabled={submitting}>Submit</Button>
                </Col>
            </Form>
        </Row>
    )
};

export default VideoAttributesEditForm;
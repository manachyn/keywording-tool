import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import { renderField } from '../Form/FieldFormControl';
import 'bootstrap/dist/css/bootstrap.css';

let VideoMetadataEditForm = props => {
    const { videoId, onSubmit, handleSubmit, submitting } = props;

    const submit = values => {
        return onSubmit(videoId, values);
    };

    return (
        <Grid>
            <Row>
            <Form onSubmit={handleSubmit(submit)}>
                <Col md={6}>
                    <Field type="text" name="meta_title" component={renderField} label="Meta Title" />
                    <Field type="text" name="meta_keywords" component={renderField} label="Meta Keywords" />
                </Col>
                <Col md={6}>
                    <Field name="meta_description" component={renderField} componentClass="textarea" label="Meta Description" />
                </Col>
                <Clearfix />
                <Col md={6}>
                    <Button bsStyle="primary" type="submit" disabled={submitting}>Submit</Button>
                </Col>
            </Form>
            </Row>
        </Grid>
    )
};

VideoMetadataEditForm = reduxForm({
    form: 'videoMetadataEditForm'
})(VideoMetadataEditForm);

export default VideoMetadataEditForm;
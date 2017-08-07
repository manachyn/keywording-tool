import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import FieldFormControl from '../Form/FieldFormControl';
import 'bootstrap/dist/css/bootstrap.css';
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';




let VideoEditForm = props => {
    const { videoId, onSubmit, handleSubmit } = props;
    const submit = values => {
        onSubmit(videoId, values)
    };

    return (
        <Grid>
            <Row>
            <Form onSubmit={handleSubmit(submit)}>
                <Col md={6}>
                    <Field type="text" name="code" component={FieldFormControl}>Code</Field>
                    <Field type="text" name="duration" component={FieldFormControl}>Duration</Field>
                    <Field type="text" name="title" component={FieldFormControl}>Title</Field>
                </Col>
                <Col md={6}>
                    <Field name="description" component={FieldFormControl}>Description</Field>
                </Col>
                <Clearfix></Clearfix>
                <Col md={6}>
                    <Button bsStyle="primary" type="submit">Submit</Button>
                </Col>
                {/*<FormGroup controlId="username">*/}
                    {/*/!*<ControlLabel>Username</ControlLabel>*!/*/}
                    {/*/!*<Field type="text" name="username" placeholder="Please enter your username" component={FormControl}/>*!/*/}
                    {/*<Field type="text" name="username" placeholder="Please enter your username" component={FieldFormControl}>Username</Field>*/}
                    {/*<FormControl.Feedback />*/}
                {/*</FormGroup>*/}
                {/*<div>*/}
                    {/*<label htmlFor="email">Email</label>*/}
                    {/*<Field name="email" component="input" type="text" />*/}
                {/*</div>*/}
            </Form>
            </Row>
        </Grid>
    )
};

VideoEditForm = reduxForm({
    form: 'videoForm'
})(VideoEditForm);

export default VideoEditForm;
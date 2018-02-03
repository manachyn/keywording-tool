import React from 'react';

import Video from './../../containers/Video';
import EditingTimeline from './../../containers/EditingTimeline';
import VideoMainInfoEditForm from './../../containers/VideoMainInfoEditForm';
import VideoAttributesEditForm from './../../containers/VideoAttributesEditForm';
import VideoMetadataEditForm from './../../containers/VideoMetadataEditForm';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import './styles.css';

const Editing = () => (
    <div>
        <Row>
            <Col md={6}>
                <Video/>
            </Col>
            <Col md={6}>
                <Tabs defaultActiveKey={1} styleName="infoTabs">
                    <Tab eventKey={1} title="Main info">
                        <VideoMainInfoEditForm/>
                    </Tab>
                    <Tab eventKey={2} title="Attributes">
                        <VideoAttributesEditForm/>
                    </Tab>
                    <Tab eventKey={3} title="Metadata">
                        <VideoMetadataEditForm/>
                    </Tab>
                </Tabs>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <br/>
                <br/>
                <br/>
                <br/>
                <EditingTimeline/>
            </Col>
        </Row>
    </div>
);

export default Editing;
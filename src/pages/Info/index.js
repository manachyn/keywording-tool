import React from 'react';

import Video from './../../containers/Video';
import VideoMainInfoEditForm from './../../containers/VideoMainInfoEditForm';
import VideoAttributesEditForm from './../../containers/VideoAttributesEditForm';
import VideoMetadataEditForm from './../../containers/VideoMetadataEditForm';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import './styles.css';

const Info = () => (
    <div>
        {/*<Video/>*/}
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
    </div>
);

export default Info;
import React from 'react';

import Video from './../../containers/Video';
import VideoEditForm from './../../containers/VideoEditForm';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import './styles.css';

const Info = () => (
    <div>
        {/*<Video/>*/}
        <Tabs defaultActiveKey={1} styleName="infoTabs">
            <Tab eventKey={1} title="Main info">
                <VideoEditForm/>
            </Tab>
            <Tab eventKey={2} title="Attributes">Attributes</Tab>
            <Tab eventKey={3} title="Metadata">Metadata</Tab>
        </Tabs>
    </div>
);

export default Info;
import React from 'react';
import { connect } from 'react-redux';

import Video from './../../containers/Video';
import EditingTimeline from './../../containers/EditingTimeline';
import SliceMainInfoEditForm from './../../containers/SliceMainInfoEditForm';
import SliceAttributesEditForm from './../../containers/SliceAttributesEditForm';
import SliceMetadataEditForm from './../../containers/SliceMetadataEditForm';
import { getEditingSliceId } from '../../modules/info/reducers/info';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import './styles.css';

const Editing = ({ sliceId }) => (
    <div>
        <Row>
            <Col md={7}>
                <Video/>
            </Col>
            <Col md={5}>
            {sliceId !== null &&
            <Tabs defaultActiveKey={1} styleName="infoTabs">
                <Tab eventKey={1} title="Main info">
                    <SliceMainInfoEditForm elementId={sliceId} />
                </Tab>
                <Tab eventKey={2} title="Attributes">
                    <SliceAttributesEditForm elementId={sliceId} />
                </Tab>
                <Tab eventKey={3} title="Metadata">
                    <SliceMetadataEditForm elementId={sliceId} />
                </Tab>
            </Tabs>
            }
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

const mapStateToProps = (state) => {
    return {
        sliceId: getEditingSliceId(state.info)
    }
};

export default connect(mapStateToProps)(Editing);
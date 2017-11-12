import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Timeline from '../paypersecond/containers/Timeline';

const RootTimeline = ({ store }) => (
    <Provider store={store}>
        <Timeline/>
    </Provider>
);

RootTimeline.propTypes = {
    store: PropTypes.object.isRequired
};

export default RootTimeline;
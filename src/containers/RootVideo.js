import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Video from '../paypersecond/containers/Video';

const RootVideo = ({ store }) => (
    <Provider store={store}>
        <Video/>
    </Provider>
);

RootVideo.propTypes = {
    store: PropTypes.object.isRequired
};

export default RootVideo;
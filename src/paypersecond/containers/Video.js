import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadedMetadata, timeUpdate } from '../../modules/video/actions';
import VideoComponent from '../../components/Video';
const { number, func, object } = PropTypes;

const Video = ({ video, ...other }) => (
    <VideoComponent preload="auto" controls {...other}>
        <source src={video.url} type="video/mp4" />
    </VideoComponent>
);

Video.propTypes = {
    video: object.isRequired,
    currentTime: number,
    onTimeUpdate: func,
    onLoadedMetadata: func
};

Video.defaultProps = {
    currentTime: 0
};

const mapStateToProps = (state) => {
    return {
        video: {
            id: 1,
            url: state.video.url
        },
        currentTime: state.video.currentTime
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadedMetadata: (metadata) => {
            dispatch(loadedMetadata(metadata))
        },
        onTimeUpdate: (currentTime, duration) => {
            dispatch(timeUpdate(currentTime, duration))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Video);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadedMetadata, timeUpdate } from '../modules/video/actions';
import VideoComponent from '../components/Video';
import videoShape from '../components/Uploader/Video/shape';
const { number, func } = PropTypes;

import { getSelectedVideo } from '../modules/uploads/reducers/videos';

const Video = ({ video, ...other }) => (
    <VideoComponent preload="auto" controls {...other}>
        <source src={video.url} type="video/mp4" />
    </VideoComponent>
);

Video.propTypes = {
    video: videoShape.isRequired,
    currentTime: number,
    onTimeUpdate: func,
    onLoadedMetadata: func
};

Video.defaultProps = {
    currentTime: 0
};

const mapStateToProps = (state) => {
    return {
        video: getSelectedVideo(state.videos),
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

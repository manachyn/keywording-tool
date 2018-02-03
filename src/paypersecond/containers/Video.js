import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadedMetadata, timeUpdate } from '../../modules/video/actions';
import VideoComponent from '../../components/Video';
const { number, func, bool, object } = PropTypes;

import { getSelectedVideo, getPlayFrom, getPlayTo, isPlaying } from '../../modules/uploads/reducers/videos';
import { stop } from '../../modules/slicing/actions';

class Video extends Component {
    static propTypes = {
        video: object.isRequired,
        currentTime: number.isRequired,
        playing: bool.isRequired,
        onTimeUpdate: func,
        onLoadedMetadata: func,
        playFrom: number,
        playTo: number,
    };

    static defaultProps = {
        currentTime: 0,
        playing: false
    };

    constructor(props) {
        super(props);
        this.api = {
            play: () => this.video.play(),
            pause: () => this.video.pause(),
            seek: (offset) => this.video.seek(offset),
        };
    }

    componentDidUpdate() {
        if (this.props.playing) {
            this.api.seek(this.props.playFrom);
            this.api.play();
        }
    }

    render() {
        const { video, ...other } = this.props;

        return (
            <VideoComponent ref={r => (this.video = r)} preload="auto" controls {...other}>
                <source src={video.url} type="video/mp4" />
            </VideoComponent>
        );
    }
}

// const Video = ({ video, ...other }) => (
//     <VideoComponent preload="auto" controls {...other}>
//         <source src={video.url} type="video/mp4" />
//     </VideoComponent>
// );
//
// Video.propTypes = {
//     video: videoShape.isRequired,
//     currentTime: number.isRequired,
//     playing: bool.isRequired,
//     onTimeUpdate: func,
//     onLoadedMetadata: func
// };
//
// Video.defaultProps = {
//     currentTime: 0,
//     playing: false
// };

const mapStateToProps = (state) => {
    return {
        video: getSelectedVideo(state.videos),
        //currentTime: state.video.currentTime,
        playing: isPlaying(state),
        playFrom: getPlayFrom(state),
        playTo: getPlayTo(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadedMetadata: (metadata) => {
            dispatch(loadedMetadata(metadata))
        },
        onTimeUpdate: (currentTime, duration) => {
            dispatch(timeUpdate(currentTime, duration))
        },
        onStopSlice: () => {
            dispatch(stop())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Video);

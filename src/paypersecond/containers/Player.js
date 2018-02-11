import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadedMetadata, timeUpdate, seek, seeked } from '../../modules/video/actions';
import VideoComponent from '../../components/Video';
import PlayerComponent from '../../components/Player';
const { number, func, bool, string, object } = PropTypes;

import { getSelectedVideo, getPlayFrom, getPlayTo, isPlaying } from '../../modules/uploads/reducers/videos';
import { stop } from '../../modules/slicing/actions';
import pick from 'lodash/pick';
import { videoOwnProps } from '../../components/Video';

class Player extends Component {
    static propTypes = {
        selectedVideo: object.isRequired,
        currentTime: number.isRequired,
        playing: bool.isRequired,
        onTimeUpdate: func,
        onStopSlice: func,
        onLoadedMetadata: func,
        playFrom: number,
        playTo: number,
        onSeeked: func,
    };

    static defaultProps = {
        currentTime: 0,
        playing: false,
        video: {
            preload: 'auto',
            // autoPlay: bool,
            // controls: bool,
            // loop: bool,
            // muted: bool,
            // src: string,
            // poster: string,
            // width: number,
            // height: number,
            // crossOrigin: string
        }
    };

    constructor(props) {
        super(props);
        this.api = {
            toggleMute: () => this.video.toggleMute(),
            toggleLoop: () => this.video.toggleLoop(),
            play: () => this.video.play(),
            pause: () => this.video.pause(),
            togglePlay: () => this.video.togglePlay(),
            toggleFullScreen: () => this.video.toggleFullScreen(),
            setVolume: v => this.video.setVolume(v),
            setPlaybackRate: v => this.video.setPlaybackRate(v),
            seek: offset => this.video.seek(offset),
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playing !== this.props.playing && this.props.playing) {
            this.api.seek(this.props.playFrom);
            this.api.play();
        }
        if (prevProps.video.seekTo !== this.props.video.seekTo && this.props.video.seekTo) {
            this.api.seek(this.props.video.seekTo);
            this.props.onSeeked(this.props.video.seekTo)
        }
    }

    renderVideo(size) {
        const {
            selectedVideo,
            onTimeUpdate,
            onStopSlice,
            onLoadedMetadata,
            playFrom,
            playTo,
            ...other
        } = this.props;

        const videoProps = {
            selectedVideo,
            onTimeUpdate,
            onStopSlice,
            onLoadedMetadata,
            playFrom,
            playTo
        }

        const videoElProps = pick(other.video, Object.keys(videoOwnProps));

        return (
            <VideoComponent ref={r => (this.video = r)} { ...{ ...size, ...videoProps, ...videoElProps } }>
                <source src={selectedVideo.url} type={selectedVideo.type} />
            </VideoComponent>
        );
    }

    renderPlayer() {
        const {
            video,
            player: {
                width,
                height,
                ...player,
            },
        } = this.props;

        const size = { width, height };
        const playerProps = {
            ...player,
            api: this.api,
            width,
            video,
        };

        const videoEl = this.renderVideo(size);

        return (
            <PlayerComponent {...playerProps}>
                {videoEl}
            </PlayerComponent>
        );
    }

    render() {
        return this.renderPlayer();
    }
}

const mapStateToProps = (state) => {
    return {
        selectedVideo: getSelectedVideo(state.videos),
        //currentTime: state.video.currentTime,
        video: state.video,
        playing: isPlaying(state),
        playFrom: getPlayFrom(state),
        playTo: getPlayTo(state)
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
        },
        onSeeked: () => {
            dispatch(seeked())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);

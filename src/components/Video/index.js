import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

const { string, bool, number, node, func } = PropTypes;

import { shallowEqual } from '../../utils/compare';

const videoOwnProps = {
    preload: string,
    autoPlay: bool,
    controls: bool,
    loop: bool,
    muted: bool,
    src: string,
    poster: string,
    width: number,
    height: number,
    crossOrigin: string
};

export default class Video extends Component {
    static propTypes = {
        ...videoOwnProps,
        children: node,
        //currentTime: number,
        onTimeUpdate: func,
        onStopSlice: func,
        onLoadedMetadata: func,
        onPlay: func,
        onPause: func,
        playFrom: number,
        playTo: number,
    };

    static defaultProps = {
        preload: 'metadata',
        autoPlay: false,
        controls: false,
        //currentTime: 0
        width: '100%'
    };

    constructor(props) {
        super(props);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps, ['children']);
    }

    componentDidMount() {
        this.video.addEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.video.addEventListener('timeupdate', this.handleTimeUpdate);
        this.video.addEventListener('play', this.handlePlay);
        this.video.addEventListener('pause', this.handlePause);
    }

    componentWillUnmount() {
        this.video.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.video.removeEventListener('timeupdate', this.handleTimeUpdate);
        this.video.removeEventListener('play', this.handlePlay);
        this.video.removeEventListener('pause', this.handlePause);
    }

    handleLoadedMetadata = () => {
        //if (this.props.currentTime > 0) {
            //this.video.currentTime = this.props.currentTime;
        //}
        if (this.props.onLoadedMetadata) this.props.onLoadedMetadata({
            duration: this.video.duration,
            size: this.getSize()
        });
    };

    handleTimeUpdate = () => {
        if (this.props.playFrom !== null && this.props.playTo !== null) {
            if (this.video.currentTime > this.props.playTo) {
                this.seek(this.props.playTo);
                this.pause();
                if (this.props.onStopSlice) this.props.onStopSlice();
            }
        }
        if (this.props.onTimeUpdate) this.props.onTimeUpdate(this.video.currentTime, this.video.duration);
    };

    handlePlay = () => {
        // if (this.props.onPlay) this.props.onPlay();
    };

    handlePause() {
        // if (this.props.onPause) this.props.onPause();
    }

    // API

    toggleMute() {
        this.video.muted = !this.video.muted;
    }

    toggleLoop() {
        this.video.loop = !this.video.loop;
    }

    togglePlay() {
        console.log('togglePlay');
        if (this.props.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    toggleFullScreen() {
        if (this.video.requestFullscreen) {
            this.video.requestFullscreen();
        } else if (this.video.webkitRequestFullscreen) {
            this.video.webkitRequestFullscreen();
        }
    }

    play = () => {
        this.video.play();
    };

    pause = () => {
        this.video.pause();
    };

    seek = (offset) => {
        this.video.currentTime = offset;
    };

    getSize() {
        return {
            width: this.video.width,
            height: this.video.height,
            videoWidth: this.video.videoWidth,
            videoHeight: this.video.videoHeight
        };
    }

    render() {
        const { children, ...other } = this.props;
        const ownProps = pick(other, Object.keys(videoOwnProps));
        
        return (
            <video ref={ref => (this.video = ref)} {...ownProps}>
                {children}
            </video>
        );
    }
}

export { videoOwnProps };

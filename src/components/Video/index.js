import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

const { string, bool, number, node, func } = PropTypes;

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
        onTimeUpdate: func,
        onLoadedMetadata: func
    };

    static defaultProps = {
        preload: 'metadata',
        autoPlay: false,
        controls: false
    };

    constructor(props) {
        super(props);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    }

    componentDidMount() {
        this.video.addEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.video.addEventListener('timeupdate', this.handleTimeUpdate);
    }

    componentWillUnmount() {
        this.video.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.video.removeEventListener('timeupdate', this.handleTimeUpdate);
    }

    handleLoadedMetadata = () => {
        if (this.props.onLoadedMetadata) this.props.onLoadedMetadata({
            duration: this.video.duration,
            size: this.getSize()
        });
    };

    handleTimeUpdate() {
        if (this.props.onTimeUpdate) this.props.onTimeUpdate(this.video.currentTime, this.video.duration);
    }

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

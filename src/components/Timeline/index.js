import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import Indicator from './Indicator';

const { string, number } = PropTypes;

const timelineStyle = {
    width: '100%'
};

export default class Timeline extends Component {
    static propTypes = {
        src: string,
        frameWidth: number
    };

    static defaultProps = {
        frameWidth: 100
    };

    componentDidMount() {
        this.video.addEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.video.addEventListener('seeked', this.handleSeeked);
    }

    componentWillUnmount() {
        this.video.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.video.removeEventListener('seeked', this.handleSeeked);
    }

    handleLoadedMetadata = () => {
        const width = this.timeline.offsetWidth;
        this.frameWidth = this.props.frameWidth;
        this.frameHeight = this.video.videoHeight * this.frameWidth / this.video.videoWidth;
        this.canvas.width = width;
        this.canvas.height = this.frameHeight;
        this.totalFrames = width / this.props.frameWidth;
        const videoDuration = this.video.duration;
        this.frameDuration = videoDuration / this.totalFrames;
        this.currentFrame = 0;
        this.video.currentTime = this.currentFrame * this.frameDuration;
    };

    handleSeeked = () => {
        const ctx = this.canvas.getContext('2d');
        const frameX = this.currentFrame * this.frameWidth;
        ctx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight, frameX, 0, this.frameWidth, this.frameHeight);
        if (this.currentFrame < this.totalFrames) {
            this.currentFrame++;
            this.video.currentTime = this.currentFrame * this.frameDuration;
        }
    };

    updateCanvas() {
        // const ctx = this.canvas.getContext('2d');
        //
        // this.video.currentTime = 1;
        // for (let i = 0; i < totalFrames; i++) {
        //     this.video.currentTime = i * frameDuration;
        //     //let frameX = i * frameWidth;
        //     // ctx.drawImage(this.video, 0, 0);
        // }
        // //ctx.drawImage(this.video, 0, 0);
    }

    render() {
        console.log(this.props);
        const { currentTime, currentPercentage } = this.props;

        return (
            <div ref={ref => (this.timeline = ref)} styleName="timeline">
                <span>{currentTime}</span>
                <canvas ref={ref => (this.canvas = ref)} />
                <Indicator currentTime={currentTime} currentPercentage={currentPercentage} />
                <video ref={ref => (this.video = ref)} preload="auto" muted={true} autoPlay={false} style={{display: 'none'}}>
                    <source src={this.props.src} />
                </video>
            </div>
        );
    }
}

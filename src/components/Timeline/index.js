import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import Indicator from './Indicator';
import SlicesLayer from './SlicesLayer';

import sliceShape from './SlicesLayer/Slice/shape';
import videoShape from '../Uploader/Video/shape';

const { string, number, arrayOf, func } = PropTypes;

const timelineStyle = {
    width: '100%'
};

export default class Timeline extends Component {
    static propTypes = {
        video: videoShape.isRequired,
        frameWidth: number,
        currentTime: number,
        currentPercentage: number,
        duration: number,
        slices: arrayOf(sliceShape),
        slicingSlices: arrayOf(number),
        onResizeSlice: func.isRequired,
        onRemoveSlice: func.isRequired,
        onSetInPoint: func.isRequired,
        onSetOutPoint: func.isRequired,
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
        //this.frameHeight = this.video.videoHeight * this.frameWidth / this.video.videoWidth;
        this.frameHeight = 100;
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

    handleSetInPoint = () => {
        this.props.onSetInPoint(this.props.currentTime);
    };

    handleSetOutPoint = () => {
    };

    handleResizeSlice = (sliceId, offsetDelta, durationDelta, factor) => {
        this.props.onResizeSlice(sliceId, offsetDelta, durationDelta, factor);
    };

    handleRemoveSlice = (id) => {
        this.props.onRemoveSlice(id);
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

    getElementX = (element, containerWidth) => {
        const { duration } = this.props;

        return containerWidth * element.offset / duration;
    };

    getElementWidth = (element, containerWidth) => {
        const { currentTime, duration, slicingSlices } = this.props;

        return slicingSlices.indexOf(element.id) !== -1
            ? containerWidth * (currentTime - element.offset) / duration
            : containerWidth * element.duration / duration;
    };

    render() {
        const {
            currentTime,
            currentPercentage,
            duration,
            slices,
            onResizeSlice,
            onRemoveSlice
        } = this.props;

        return (
            <div ref={ref => (this.timeline = ref)} styleName="timeline">
                <canvas ref={ref => (this.canvas = ref)} />
                <SlicesLayer elements={slices}
                             duration={duration}
                             currentTime={currentTime}
                             elementX={this.getElementX}
                             elementWidth={this.getElementWidth}
                             onResizeElement={onResizeSlice}
                             onRemoveElement={onRemoveSlice}
                />
                <Indicator currentTime={currentTime}
                           currentPercentage={currentPercentage}
                           onSetInPoint={this.handleSetInPoint}
                           onSetOutPoint={this.handleSetOutPoint} />
                <video ref={ref => (this.video = ref)} preload="auto" muted={true} autoPlay={false} style={{display: 'none'}}>
                    <source src={this.props.video.url} />
                </video>
            </div>
        );
    }
}

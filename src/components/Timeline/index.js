import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import Indicator from './Indicator';
import SlicesLayer from './SlicesLayer';

import sliceShape from './SlicesLayer/Slice/shape';
import videoShape from '../Uploader/Video/shape';

const { string, number, arrayOf, func, bool } = PropTypes;

const timelineStyle = {
    width: '100%'
};

export default class Timeline extends Component {
    static propTypes = {
        video: videoShape.isRequired,
        frameWidth: number,
        currentTime: number,
        currentPercentage: number,
        duration: number.isRequired,
        slices: arrayOf(sliceShape),
        slicingSliceId: number,
        playingSliceId: number,
        onResizeSlice: func,
        onRemoveSlice: func,
        onPlaySlice: func,
        onStopSlice: func,
        onEditSlice: func,
        onSetInPoint: func,
        onSetOutPoint: func,
        canSetInPoint: bool.isRequired,
        canSetOutPoint: bool.isRequired
    };

    static defaultProps = {
        frameWidth: 100,
        currentTime: 0,
        currentPercentage: 0,
        canSetInPoint: true,
        canSetOutPoint: true
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
        this.props.onSetOutPoint(this.props.currentTime);
    };

    updateCanvas() {
        // const ctx = this.canvas.getContext('2d');
        //
        // this.video.currentTime = 1;
        // for (let i = 0; i < totalFrames; i++) {
        //     this.video.currentTime = i * frameDuration;
        //     //let frameX = i * frameWidth;
        //     // ctx.drawImage(this.video, 0, 0);
        // }duration={duration}
        // //ctx.drawImage(this.video, 0, 0);
    }

    getElementX = (element, containerWidth) => {
        const { duration } = this.props;

        return containerWidth * element.offset / duration;
    };

    getElementWidth = (element, containerWidth) => {
        const { currentTime, duration, slicingSliceId } = this.props;

        return slicingSliceId === element.id
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
            onRemoveSlice,
            onPlaySlice,
            onStopSlice,
            onEditSlice,
            canSetInPoint,
            canSetOutPoint,
            playingSliceId
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
                             onPlayElement={onPlaySlice}
                             onStopElement={onStopSlice}
                             onEditElement={onEditSlice}
                             playingElementId={playingSliceId}
                />
                <Indicator duration={duration}
                           currentTime={currentTime}
                           currentPercentage={currentPercentage}
                           canSetInPoint={canSetInPoint}
                           canSetOutPoint={canSetOutPoint}
                           onSetInPoint={this.handleSetInPoint}
                           onSetOutPoint={this.handleSetOutPoint} />
                <video ref={ref => (this.video = ref)} preload="auto" muted={true} autoPlay={false} style={{display: 'none'}}>
                    <source src={this.props.video.url} />
                </video>
            </div>
        );
    }
}

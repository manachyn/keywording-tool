import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    videoProps,
    videoAPIShape,
    playbackRateShape,
    playerActionsShape,
} from '../propTypes';

import './styles.css';
import Controls from "./Controls";

export class Player extends Component {
    state = {
        paused: true
    };

    handleTogglePlay = () => {
        this.setState({ paused: !this.state.paused });
        if (this.state.paused) {
            this.props.api.play();
        } else {
            this.props.api.pause();
        }
    };

    render() {
        const { width, children, video, api, downloadUrl } = this.props;

        return (
            <div styleName="player" style={{ width }}>
                {children}
                <Controls {...video}
                          paused={this.state.paused}
                          onSeek={api.seek}
                          onVolumeChange={api.setVolume}
                          onTogglePlay={this.handleTogglePlay}
                          onToggleMute={api.toggleMute}
                          onToggleLoop={api.toggleLoop}
                          onToggleFullScreen={api.toggleFullScreen}
                          downloadUrl={downloadUrl} />
            </div>
        );
    }
}

Player.propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,

    //actions: playerActionsShape.isRequired,
    actions: playerActionsShape,
    api: videoAPIShape.isRequired,
    video: PropTypes.shape(videoProps).isRequired,
    downloadUrl: PropTypes.string
};

Player.defaultProps = {
    width: 640
};

export default Player;
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

    handleTogglePlay = () => {
        this.props.onTogglePlay()
    };

    handleKeyDown = (event) => {
        // Spacebar
        if (event.keyCode === 32) {
            this.handleTogglePlay();
        }
    };

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    render() {
        const { width, children, video, api, downloadUrl, playing } = this.props;

        return (
            <div styleName="player" style={{ width }}>
                {children}
                <Controls {...video}
                    paused={!playing}
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
    downloadUrl: PropTypes.string,
    playing: PropTypes.bool.isRequired,
    onTogglePlay: PropTypes.func.isRequired,
};

Player.defaultProps = {
    width: 640,
    playing: false,
};

export default Player;
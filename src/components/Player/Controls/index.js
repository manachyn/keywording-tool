import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import SeekBar from './../SeekBar';
import './styles.css';

import { percentageShape } from '../../propTypes';
import { formatTime } from '../../../utils/time';
import { throttle } from 'core-decorators';
//import ThrottleAll from 'lodash-decorators/throttleAll';

const { bool, number, func, string } = PropTypes;
export class Controls extends Component {

    renderCurrentTime() {
        return (
            <div styleName="timeControl">
                {formatTime(this.props.currentTime)}
            </div>
        )
    }

    render() {
        const { duration, currentTime, percentage, paused, onTogglePlay, onSeek, onToggleFullScreen, downloadUrl } = this.props;

        return (
            <div styleName="controlBarStarted">
                <button styleName="playControl" onClick={onTogglePlay}>
                    <Glyphicon glyph={paused ? 'play' : 'pause'} />
                </button>
                <SeekBar duration={duration} currentTime={currentTime} percentage={percentage} onSeek={onSeek} />
                {this.renderCurrentTime()}
                {downloadUrl &&
                    <a styleName="downloadControl" href={downloadUrl} target="_blank">
                        <Glyphicon glyph="download-alt" />
                    </a>
                }
                <button styleName="fullscreenControl" onClick={onToggleFullScreen}>
                    <Glyphicon glyph="fullscreen" />
                </button>
            </div>
        );
    }
}

Controls.propTypes = {
    duration: number.isRequired,
    currentTime: number.isRequired,
    percentage: percentageShape.isRequired,
    paused: bool,

    onSeek: func.isRequired,
    onTogglePlay: func.isRequired,
    onToggleMute: func.isRequired,
    onVolumeChange: func.isRequired,
    onToggleFullScreen: func.isRequired,
    downloadUrl: string,
};

Controls.defaultProps = {
    currentTime: 0,
    paused: true
};

export default Controls;

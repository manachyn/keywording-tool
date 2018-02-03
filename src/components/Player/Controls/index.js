import React from 'react';
import PropTypes from 'prop-types';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import SeekBar from './../SeekBar';
import './styles.css';

import { percentageShape } from '../../propTypes';
import formatTime from '../../../utils/time';

const { bool, number, func } = PropTypes;

export const Controls = (props) => {
    const { duration, currentTime, percentage, paused, onTogglePlay, onSeek, onToggleFullScreen } = props;

    return (
        <div styleName="controlBarStarted">
            <button styleName="playControl" onClick={onTogglePlay}>
                <Glyphicon glyph={paused ? 'play' : 'pause' }/>
            </button>
            <SeekBar duration={duration} currentTime={currentTime} percentage={percentage} onSeek={onSeek} />
            <div styleName="timeControl">
                {formatTime(currentTime)}
            </div>
            <button styleName="playControl" onClick={onToggleFullScreen}>
                <Glyphicon glyph="fullscreen"/>
            </button>
        </div>
    );
};

Controls.propTypes = {
    duration: number.isRequired,
    currentTime: number.isRequired,
    percentage: percentageShape.isRequired,
    paused: bool,

    onSeek: func.isRequired,
    onTogglePlay: func.isRequired,
    onToggleMute: func.isRequired,
    onVolumeChange: func.isRequired,
    onToggleFullScreen: func.isRequired
};

Controls.defaultProps = {
    currentTime: 0,
    paused: true
};

export default Controls;

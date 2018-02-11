import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';
import EditableText from '../../EditableText';
import styles from './styles.css';
import { formatTime, isValidTime, timeToSeconds } from '../../../utils/time';

const { string, number, bool, func } = PropTypes;

class Indicator extends Component {
    static propTypes = {
        duration: number.isRequired,
        currentTime: number.isRequired,
        currentPercentage: number.isRequired,
        startTimecode: string,
        onSetCurrentTime: func.isRequired,
        onSetInPoint: func.isRequired,
        onSetOutPoint: func.isRequired,
        canSetInPoint: bool.isRequired,
        canSetOutPoint: bool.isRequired,
        containerWidth: number.isRequired,
        containerHeight: number.isRequired,
    };

    static defaultProps = {
        currentTime: 0,
        currentPercentage: 0,
        canSetInPoint: true,
        canSetOutPoint: true
    };

    constructor(props) {
        super(props);
        this.startTime = 0;
        if (this.props.startTimecode) {
            this.startTime = timeToSeconds(this.props.startTimecode);
        }
    }

    handleTimeChange = (value) => {
        const seconds = timeToSeconds(value) - this.startTime;
        this.props.onSetCurrentTime(seconds > this.props.duration ? this.props.duration : seconds, this.props.duration);
    };

    validateTime = (value) => {
        return isValidTime(value);
    };

    getCurrentTime = () => {
        return this.startTime + this.props.currentTime;
    };

    render() {
        const { currentPercentage, onSetInPoint, onSetOutPoint, containerWidth, canSetInPoint, canSetOutPoint } = this.props;
        const left = containerWidth / 100 * currentPercentage;
        const controlsWidth = 100;
        const controlsHalfWidth = controlsWidth / 2;
        let controlsLeft = -controlsHalfWidth;
        if (left < controlsHalfWidth) {
            controlsLeft = -left;
        } else if (left > containerWidth - controlsHalfWidth) {
            controlsLeft = containerWidth - left - controlsWidth + 2;
        }

        let setInPointButton = null;
        let setOutPointButton = null;
        if (canSetInPoint) {
            setInPointButton = <div title="Set In Point (I)" styleName="in" onClick={onSetInPoint}></div>;
        } else {
            setInPointButton = <div title="Set In Point (I)" styleName="in disabled"></div>;
        }

        if (canSetOutPoint) {
            setOutPointButton = <div title="Set Out Point (O)" styleName="out" onClick={onSetOutPoint}></div>;
        } else {
            setOutPointButton = <div title="Set Out Point (O)" styleName="out disabled"></div>;
        }

        return (
            <div styleName="indicator" style={{ left: `${currentPercentage}%` }}>
                <div styleName="controls" style={{ left: `${controlsLeft}px` }}>
                    <div styleName="time">
                        <EditableText text={formatTime(this.getCurrentTime())} onChange={this.handleTimeChange} validate={this.validateTime}/>
                    </div>
                    <div styleName="buttons">
                        {setInPointButton}
                        {setOutPointButton}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dimensions()(Indicator)

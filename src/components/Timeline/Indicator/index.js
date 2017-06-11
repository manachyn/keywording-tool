import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';
import styles from './styles.css';

const { number, bool, func } = PropTypes;

class Indicator extends Component {
    static propTypes = {
        currentTime: number.isRequired,
        currentPercentage: number.isRequired,
        onSetInPoint: func.isRequired,
        onSetOutPoint: func.isRequired,
        slicing: bool,
        containerWidth: number.isRequired,
        containerHeight: number.isRequired,
    };

    static defaultProps = {
        currentTime: 0,
        currentPercentage: 0,
        slicing: false
    };

    render() {
        const { currentTime, currentPercentage, onSetInPoint, onSetOutPoint, containerWidth, slicing } = this.props;
        const left = containerWidth / 100 * currentPercentage;
        const controlsWidth = 100;
        const controlsHalfWidth = controlsWidth / 2;
        let controlsLeft = -controlsHalfWidth;
        if (left < controlsHalfWidth) {
            controlsLeft = -left;
        } else if (left > containerWidth - controlsHalfWidth) {
            controlsLeft = containerWidth - left - controlsWidth + 2;
        }

        return (
            <div styleName="indicator" style={{ left: `${currentPercentage}%` }}>
                <div styleName="controls" style={{ left: `${controlsLeft}px` }}>
                    <div styleName="time">{currentTime}</div>
                    <div styleName="buttons">
                        <div title="Set In Point (I)" styleName={slicing ? 'in active' : 'in'} onClick={onSetInPoint}></div>
                        <div title="Set Out Point (O)" styleName={slicing ? 'out' : 'out disabled'} onClick={onSetOutPoint}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dimensions()(Indicator)

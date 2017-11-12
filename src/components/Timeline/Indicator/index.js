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

    render() {
        const { currentTime, currentPercentage, onSetInPoint, onSetOutPoint, containerWidth, canSetInPoint, canSetOutPoint } = this.props;
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
                    <div styleName="time">{currentTime}</div>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const { number, bool, func } = PropTypes;

export default class Indicator extends Component {
    static propTypes = {
        currentTime: number,
        currentPercentage: number,
        onSetInPoint: func.isRequired,
        onSetOutPoint: func.isRequired,
        slicing: bool,
    };

    static defaultProps = {
        currentTime: 0,
        currentPercentage: 0,
        slicing: false
    };

    render() {
        const { currentTime, currentPercentage, onSetInPoint, onSetOutPoint } = this.props;
        return (
            <div styleName="indicator" style={{ left: `${currentPercentage}%` }}>
                <div styleName="controls">
                    <button title="Set In Point (I)" styleName="in" onClick={onSetInPoint}>In</button>
                    <button title="Set Out Point (O)" styleName="out" onClick={onSetOutPoint}>Out</button>
                    <div styleName="time">{currentTime}</div>
                </div>
            </div>
        );
    }
}

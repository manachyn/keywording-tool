import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { percentageShape } from '../../propTypes';
import Progress from './Progress';
import Slider from './../../Slider';
import './styles.css';

const { number, func } = PropTypes;

export class SeekBar extends Component {

    handleSeek = (offsetRatio) => {
        let newTime = offsetRatio * this.props.duration;
        if (newTime === this.props.duration) {
            newTime = newTime - 0.1;
        }

        this.props.onSeek(newTime);
    };

    getPercent = () => {
        const percent = this.props.currentTime / this.props.duration;

        return percent >= 1 ? 1 : percent;
    };

    render() {
        const percentage = {
            played: this.getPercent() * 100,
            buffered: 100
        };

        return (
            <div styleName="progressControl">
                <Slider onChange={this.handleSeek}>
                    <Progress {...percentage} />
                </Slider>
            </div>
        );
    }
}

SeekBar.propTypes = {
    duration: number.isRequired,
    currentTime: number.isRequired,
    percentage: percentageShape.isRequired,
    onSeek: func
};

SeekBar.defaultProps = {
};

export default SeekBar;
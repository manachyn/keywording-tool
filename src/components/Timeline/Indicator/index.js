import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const { number } = PropTypes;

export default class Indicator extends Component {
    static propTypes = {
        currentTime: number,
        currentPercentage: number
    };

    static defaultProps = {
        currentTime: 0,
        currentPercentage: 0
    };

    render() {
        const { currentPercentage } = this.props;
        return (
            <div styleName="indicator" style={{ right: `${100 - currentPercentage}%` }}>&nbsp;</div>
        );
    }
}

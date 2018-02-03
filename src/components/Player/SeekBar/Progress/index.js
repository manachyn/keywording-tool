import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const { number } = PropTypes;

const Progress = (props) => {
    const { played, buffered } = props;

    const style = {
        played: { width: `${played}%` },
        buffered: { width: `${buffered}%` }
    };

    return (
        <div styleName="progressHolder">
            <div styleName="loadProgress" style={style.buffered}></div>
            <div styleName="playProgress" style={style.played}></div>
        </div>
    );
};

Progress.propTypes = {
    played: number.isRequired,
    buffered: number.isRequired
};

export default Progress;

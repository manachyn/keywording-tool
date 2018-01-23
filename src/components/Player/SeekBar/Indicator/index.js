import React from 'react';
import PropTypes from 'prop-types';

import { formatTime } from '../../../../modules/utils/format';
import './styles.css';

const { number } = PropTypes;

const Indicator = ({ currentTime, duration }) => {
  const time = formatTime(currentTime, duration);

  return (
    <div styleName="indicator">
      {time}
    </div>
  );
};

Indicator.propTypes = {
  currentTime: number.isRequired,
  duration: number.isRequired,
};

export default Indicator;

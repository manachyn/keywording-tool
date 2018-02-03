import round from 'lodash/round';
import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const { number } = PropTypes;

const Indicator = ({ volume }) => {
  const percent = round(volume * 100);

  return (
    <div styleName="indicator">
      {`${percent}%`}
    </div>
  );
};

Indicator.propTypes = {
  volume: number.isRequired,
};

export default Indicator;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { videoStateShape, percentageShape } from '../../propTypes';
import Spinner from './Spinner';
import Controls from './Controls';
import './styles.css';

const { bool, func, node } = PropTypes;

export class Overlay extends Component {

  render() {
    const {
      children,
      loading,
      paused,
      error,
      onTogglePlay,
    } = this.props;

    const styleName = error ? 'error' : paused ? 'faded' : 'transparent';

    return (
      <div styleName={styleName} onClick={!error && onTogglePlay}>
        {loading && !paused && <Spinner />}
        {!error && paused && onTogglePlay ? <Controls { ...{ paused, onTogglePlay } } /> : null}
        {children}
      </div>
    );
  }
}


Overlay.propTypes = {
  children: node,
  loading: bool,
  paused: bool,
  error: videoStateShape,
  onTogglePlay: func,
};

export default Overlay;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import './styles.css';

const { bool, string, func } = PropTypes;

export class Controls extends Component {
    render() {
        const { paused, onTogglePlay } = this.props;
        const playbackIcon = paused ? 'play' : 'pause';

        return (
            <div styleName="controls">
              <Glyphicon styleName="togglePlayButton" glyph={playbackIcon} onClick={onTogglePlay} />
            </div>
        );
    }
}

Controls.propTypes = {
    buttonClassName: string,
    paused: bool,
    onTogglePlay: func.isRequired,
};

export default Controls;

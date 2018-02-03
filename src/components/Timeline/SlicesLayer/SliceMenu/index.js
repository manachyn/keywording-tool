import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const { string, func } = PropTypes;

export default class SliceMenu extends Component {
    static propTypes = {
        id: string.isRequired,
        onRemove: func,
        onEdit: func,
        onPlay: func,
        onStop: func
    };

    handleRemove = () => {
        if (this.props.onRemove) this.props.onRemove(this.props.id);
    };

    handleEdit = () => {
        if (this.props.onEdit) this.props.onEdit(this.props.id);
    };

    handlePlay = () => {
        if (this.props.onPlay) this.props.onPlay(this.props.id);
    };

    handleStop = () => {
        if (this.props.onStop) this.props.onStop(this.props.id);
    };

    render() {
        const { onRemove, onEdit, onPlay, onStop } = this.props;

        if (!onRemove && !onEdit) {
            return null;
        }

        return (
            <div styleName="menu">
                {onEdit && <Glyphicon styleName="menuItem" glyph="pencil" onClick={this.handleEdit} />}
                {onEdit && <br/>}
                {onPlay && <Glyphicon styleName="menuItem" glyph="play" onClick={this.handlePlay} />}
                {onPlay && <br/>}
                {onStop && <Glyphicon styleName="menuItem" glyph="stop" onClick={this.handleStop} />}
                {onStop && <br/>}
                {onRemove && <br/> && <Glyphicon styleName="menuItem" glyph="trash" onClick={this.handleRemove} />}
            </div>
        );
    }
}

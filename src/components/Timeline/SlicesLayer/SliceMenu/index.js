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
        onStop: func,
        onPause: func,
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

    handlePause = () => {
        if (this.props.onPause) this.props.onPause(this.props.id);
    };

    render() {
        const { onRemove, onEdit, onPlay, onStop, onPause } = this.props;

        if (!onRemove && !onEdit) {
            return null;
        }

        return (
            <div styleName="menu">
                <div styleName="top">
                    {onEdit && <Glyphicon styleName="menuItem" glyph="pencil" onClick={this.handleEdit} />}
                    {onEdit && <br/>}
                    {onPlay && <Glyphicon title="Play this slice" styleName="menuItem" glyph="play" onClick={this.handlePlay} />}
                    {onPlay && <br/>}
                    {onPause && <Glyphicon styleName="menuItem" glyph="pause" onClick={this.handlePause} />}
                    {onPause && <br/>}
                </div>
                <div styleName="bottom">
                    {onRemove && <br/> && <Glyphicon title="Delete this slice" styleName="menuItem" glyph="trash" onClick={this.handleRemove} />}
                </div>
            </div>
        );
    }
}

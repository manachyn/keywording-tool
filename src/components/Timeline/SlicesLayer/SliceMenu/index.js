import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const { number, func } = PropTypes;

export default class SliceMenu extends Component {
    static propTypes = {
        id: number.isRequired,
        onRemove: func,
        onEdit: func
    };

    handleRemove = () => {
        if (this.props.onRemove) this.props.onRemove(this.props.id);
    };

    handleEdit = () => {
        if (this.props.onEdit) this.props.onEdit(this.props.id);
    };

    render() {
        const { onRemove, onEdit } = this.props;

        if (!onRemove && !onEdit) {
            return null;
        }

        return (
            <div styleName="menu">
                {onEdit && <Glyphicon styleName="menuItem" glyph="pencil" onClick={this.handleEdit} />}
                {onRemove && <br/> && <Glyphicon styleName="menuItem" glyph="trash" onClick={this.handleRemove} />}
            </div>
        );
    }
}

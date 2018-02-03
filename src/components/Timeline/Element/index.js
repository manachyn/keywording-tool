import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { func } = PropTypes;
import sliceProps from './props';

export class Slice extends Component {
    static propTypes = {
        ...sliceProps,
        onDelete: func.isRequired
    };

    handleDelete() {
        const { id, onDelete } = this.props;
        onDelete(id);
    }

    render() {
        const { id, width } = this.props;
        const style = { width };

        return (
            <div styleName="filter" style={style}>
              Slice {id}
            </div>
        );
    }
}

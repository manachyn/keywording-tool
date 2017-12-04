import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import SliceMenu from '../SliceMenu';

const { func } = PropTypes;
import sliceProps from './props';

export default class Slice extends Component {
    static propTypes = {
        ...sliceProps,
        onRemove: func,
        onPlay: func,
        onStop: func,
        onEdit: func
    };

    render() {
        const { id, onRemove, onPlay, onStop, onEdit } = this.props;

        return (
            <div styleName="slice">
                <SliceMenu id={id} onRemove={onRemove} onEdit={onEdit} onPlay={onPlay} onStop={onStop} />
            </div>
        );
    }
}

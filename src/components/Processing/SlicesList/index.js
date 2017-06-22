import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import sliceShape from '../../Timeline/SlicesLayer/Slice/shape';
import Slice from './Slice';

const { arrayOf } = PropTypes;

export default class SlicesList extends Component {
    static propTypes = {
        slices: arrayOf(sliceShape),
    };

    renderSlice(slice) {
        return <Slice key={slice.id} { ...slice } />;
    }

    render() {
        const { slices } = this.props;

        return <div styleName="slicesList">{slices.map(this.renderSlice)}</div>;
    }
}


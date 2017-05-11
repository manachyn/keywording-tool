import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Slice from '../Slice';

const { arrayOf } = PropTypes;

export class LayersPanel extends Component {
    static propTypes = {
        slices: arrayOf(sliceShape).isRequired,
    };

    constructor(props) {
        super(props);
        this.renderSlice = this.renderSlice.bind(this);
    }

    renderSlice(slice) {
        const { duration, containerWidth } = this.props;

        const x = containerWidth * slice.offset / duration;
        const width = containerWidth * slice.duration / duration;

        const sliceProps = { x, width };

        return <li key={slice.id} ><Slice {...{ ...slice, ...sliceProps } } /></li>;
    }

    render() {
        const { slices } = this.props;

        return <ul>{slices.map(this.renderSlice)}</ul>;
    }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LayerItem from '../LayerItem';
import Handle from './Handle';

import './styles.css';

const { string, number, func, node } = PropTypes;

export default class ResizableLayerItem extends Component {
    static propTypes = {
        id: string.isRequired,
        x: number.isRequired,
        width: number.isRequired,
        onResize: func.isRequired,
        validateResize: func.isRequired,
        //children: node.isRequire,
    };

    state = {
        delta: 0,
        x: this.props.x,
        width: this.props.width
    };

    constructor(props) {
        super(props);
        this.handleResizing = this.handleResizing.bind(this);
        this.handleResized = this.handleResized.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.x !== this.state.x || nextProps.width !== this.state.width) {
            this.setState({
                x: nextProps.x,
                width: nextProps.width
            });
        }
    }

    handleResizing(delta, factor) {
        const x = this.state.x + (factor > 0 ? 0 : delta);
        const width = this.state.width + factor * delta;
        if (this.props.validateResize(this.props.id, x, width, factor)) {
            this.setState({x, width});
        }
    }

    handleResized(delta, factor) {
        this.props.onResize(
            this.props.id,
            this.state.x,
            this.state.width,
            factor
        );
    }

    render() {
        const { id } = this.props;
        const { x, width } = this.state;

        const handleProps = {
            id,
            onResizing: this.handleResizing,
            onResized: this.handleResized
        };

        const transform = `translate3d(${x}px, 0, 0)`;

        const style = {
            position: 'absolute',
            width: `${width}px`,
            transform,
            WebkitTransform: transform
        };

        return (
            <div styleName="item" style={style}>
              <Handle factor={-1} {...handleProps} />
              <LayerItem { ...{ ...this.props, ...{ x, width } } } />
              <Handle factor={+1} {...handleProps} />
            </div>
        );
    }
}
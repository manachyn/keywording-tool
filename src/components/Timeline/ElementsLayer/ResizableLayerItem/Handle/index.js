import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const { number, func } = PropTypes;

export class Handle extends Component {
    static propTypes = {
        id: number.isRequired,
        factor: number.isRequired,
        onResizing: func.isRequired,
        onResized: func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.direction = props.factor > 0 ? 'right' : 'left';
    }

    getX = () => this.handle.getBoundingClientRect()[this.direction];

    handleMouseDown() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseUp() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);

        this.props.onResized(this.state.delta, this.props.factor);
    }

    handleMouseMove(e) {
        const { factor, onResizing } = this.props;
        const delta = e.clientX - this.getX();
        this.setState({ delta });
        onResizing(delta, factor);
    }

    render() {
        return (
            <div ref={r => this.handle = r}
                 onMouseDown={this.handleMouseDown}
                 styleName={this.direction} />
        );
    }
}

export default Handle;
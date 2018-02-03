import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import * as dom from '../../utils/dom';

const { bool, string, number, func, node } = PropTypes;

export class Slider extends Component {
    state = {
        isSliding: false
    };

    handleClick = (event) => {
        //event.stopImmediatePropagation();
        event.preventDefault();
    };

    handleMouseDown = (event) => {
        const doc = this.el.ownerDocument;
        event.preventDefault();

        this.setState({ isSliding: true });

        doc.addEventListener('mousemove', this.handleMouseMove);
        doc.addEventListener('mouseup', this.handleMouseUp);
        doc.addEventListener('touchmove', this.handleMouseMove);
        doc.addEventListener('touchend', this.handleMouseUp);

        this.handleMouseMove(event);
    };

    handleMouseUp = (event) => {
        const doc = this.el.ownerDocument;

        doc.removeEventListener('mousemove', this.handleMouseMove);
        doc.removeEventListener('mouseup', this.handleMouseUp);
        doc.removeEventListener('touchmove', this.handleMouseMove);
        doc.removeEventListener('touchend', this.handleMouseUp);

        this.setState({ isSliding: false });
    };

    handleMouseMove = (event) => {
        this.props.onChange(this.calculateDistance(event));
    };

    calculateDistance = (event) => {
        const position = dom.getPointerPosition(this.el, event);

        return position.x;
    };

    render() {
        const { children } = this.props;

        return (
            <div ref={(el) => { this.el = el; }}
                 onClick={this.handleClick}
                 onMouseDown={this.handleMouseDown}
                 onTouchStart={this.handleMouseDown}
                 styleName="slider">
                {children}
            </div>
        );
    }
}

Slider.propTypes = {
    onChange: func.isRequired,
    children: node
};

Slider.defaultProps = {

};

export default Slider;
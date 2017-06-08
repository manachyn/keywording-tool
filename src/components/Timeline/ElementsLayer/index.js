import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';

import ResizableLayerItem from './ResizableLayerItem';

import './styles.css';

import elementShape from '../Element/shape';

const { arrayOf, number, func } = PropTypes;

function ElementsLayer(LayerElementComponent) {
    class Layer extends Component {
        static propTypes = {
            elements: arrayOf(elementShape).isRequired,
            duration: number,
            currentTime: number,
            containerWidth: number.isRequired,
            containerHeight: number.isRequired,
            elementX: func.isRequired,
            elementWidth: func.isRequired,
            onResizeElement: func.isRequired,
            onRemoveElement: func.isRequired
        };

        constructor(props) {
            super(props);
            this.resizeElement = this.resizeElement.bind(this);
            this.renderElement = this.renderElement.bind(this);
        }

        resizeElement(id, x, width, factor) {
            const { elements, duration, containerWidth } = this.props;
            const element = elements.find(item => item.id === id);
            const offsetDelta = x * duration / containerWidth - element.offset;
            const durationDelta = width * duration / containerWidth - element.duration;
            this.props.onResizeElement(id, offsetDelta, durationDelta, factor);
        }

        renderElement(element) {
            const { containerWidth, elementX, elementWidth, onRemoveElement } = this.props;
            const { id } = element;

            // const x = containerWidth * element.offset / duration;
            // //const width = containerWidth * element.duration / duration;
            // const width = containerWidth * (currentTime - element.offset) / duration;

            const x = elementX(element, containerWidth);
            const width = elementWidth(element, containerWidth);

            const itemProps = {id, x, width};

            return (
                <ResizableLayerItem key={element.id} { ...itemProps } onResize={this.resizeElement}>
                    <LayerElementComponent { ...element } onDestroy={onRemoveElement} />
                </ResizableLayerItem>
            );
        }

        render() {
            const {elements} = this.props;

            return <div styleName="elements">{elements.map(this.renderElement)}</div>;
        }
    }

    return Dimensions()(Layer);
}

export default ElementsLayer;

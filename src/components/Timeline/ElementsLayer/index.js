import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'react-dimensions';

import ResizableLayerItem from './ResizableLayerItem';

import './styles.css';

import elementShape from '../Element/shape';
import { shallowEqual } from '../../../utils/compare';

const { arrayOf, number, func, string } = PropTypes;

function ElementsLayer(LayerElementComponent) {
    class Layer extends Component {
        static propTypes = {
            elements: arrayOf(elementShape).isRequired,
            duration: number,
            // currentTime: number,
            containerWidth: number.isRequired,
            containerHeight: number.isRequired,
            elementX: func.isRequired,
            elementWidth: func.isRequired,
            onResizeElement: func,
            onRemoveElement: func,
            onPlayElement: func,
            onStopElement: func,
            onEditElement: func,
            playingElementId: string
        };

        constructor(props) {
            super(props);
            this.resizeElement = this.resizeElement.bind(this);
            this.renderElement = this.renderElement.bind(this);
            this.validateResize = this.validateResize.bind(this);
        }

        shouldComponentUpdate(nextProps, nextState) {
            return !shallowEqual(this.props, nextProps);
        }

        validateResize(id, x, width, factor) {
            return factor > 0 ? this.validateFinishOffset(id, x, width) : this.validateStartOffset(id, x);
        }

        validateFinishOffset(id, x, width) {
            const { elements, duration, containerWidth } = this.props;
            if (x + width > containerWidth) {
                return false;
            }
            const element = elements.find(item => item.id === id);
            const newDuration = width * duration / containerWidth;
            const newOffset = element.offset + newDuration;

            let valid = true;
            for (let element2 of this.props.elements) {
                if (element2.id !== id && Math.max(element.offset, element2.offset) <= Math.min(newOffset, element2.offset + element2.duration)) {
                    valid = false;
                    break;
                }
            }

            return valid;
        }

        validateStartOffset(id, x) {
            if (x < 0) {
                return false;
            }

            const { duration, containerWidth } = this.props;
            const newOffset = x * duration / containerWidth;

            let valid = true;
            for (let element2 of this.props.elements) {
                if (element2.id !== id && newOffset >= element2.offset && newOffset < element2.offset + element2.duration) {
                    valid = false;
                    break;
                }
            }

            return valid;
        }

        resizeElement(id, x, width, factor) {
            const { elements, duration, containerWidth } = this.props;
            const element = elements.find(item => item.id === id);
            const offsetDelta = x * duration / containerWidth - element.offset;
            const durationDelta = width * duration / containerWidth - element.duration;
            if (this.props.onResizeElement) {
                this.props.onResizeElement(id, offsetDelta, durationDelta, factor);
            }
        }

        renderElement(element) {
            const { containerWidth, elementX, elementWidth, onRemoveElement, onPlayElement, onStopElement, onEditElement, playingElementId } = this.props;
            const { id } = element;

            // const x = containerWidth * element.offset / duration;
            // //const width = containerWidth * element.duration / duration;
            // const width = containerWidth * (currentTime - element.offset) / duration;

            const x = elementX(element, containerWidth);
            const width = elementWidth(element, containerWidth);

            const itemProps = {id, x, width};

            return (
                <ResizableLayerItem key={element.id} { ...itemProps } onResize={this.resizeElement} validateResize={this.validateResize}>
                    <LayerElementComponent { ...element } onRemove={onRemoveElement} onPlay={playingElementId === null || playingElementId !== element.id ? onPlayElement : null} onStop={playingElementId !== null && playingElementId === element.id ? onStopElement : null} onEdit={onEditElement} />
                </ResizableLayerItem>
            );
        }

        render() {
            const {elements} = this.props;
            console.log('Slices')

            return <div styleName="elements">{elements.map(this.renderElement)}</div>;
        }
    }

    return Dimensions()(Layer);
}

export default ElementsLayer;

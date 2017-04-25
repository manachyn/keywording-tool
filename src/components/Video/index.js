import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { node } = PropTypes;

export default class Video extends Component {
    static propTypes = {
        children: node,
    };

    static defaultProps = {
        preload: 'metadata',
        autoPlay: false,
        controls: false
    };

    componentDidMount() {
        this.video.addEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.video.addEventListener('loadeddata', this.handleLoadedData);
    }

    componentWillUnmount() {
        this.video.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
        this.video.removeEventListener('loadeddata', this.handleLoadedData);
    }

    handleLoadedMetadata = (e) => {

    };

    handleLoadedData = (e) => {

    };

    render() {
        const { children, ...props } = this.props;
        return (
            <video ref={ref => (this.video = ref)} {...props}>
                {children}
            </video>
        );
    }
}

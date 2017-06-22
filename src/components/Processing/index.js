import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

import sliceShape from '../Timeline/SlicesLayer/Slice/shape';
import SlicesList from './SlicesList';

const { bool, arrayOf, func, number } = PropTypes;

export default class Processing extends Component {
    static propTypes = {
        isProcessing: bool.isRequired,
        slices: arrayOf(sliceShape).isRequired,
        createClips: func.isRequired,
        checkStatus: func.isRequired,
        jobId: number
    };

    static defaultProps = {
        isProcessing: false,
        slices: []
    };

    componentDidMount = () => {
        this.startPolling();
    };

    componentDidUpdate = () => {
        this.startPolling();
    };

    componentWillUnmount = () => {
        this.stopPolling();
    };

    startPolling = () => {
        if (this.props.jobId && !this.timer) {
            setTimeout(() => {
                this.poll();
                this.timer = setInterval(this.poll, 1000);
            }, 1000);
        }
        if (!this.props.jobId) {
            this.stopPolling();
        }
    };

    stopPolling = () => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };

    poll = () => {
        this.props.checkStatus(this.props.jobId);
    };

    handleCreateClips = () => {
        this.props.createClips();
    };

    render() {
        const { slices, isProcessing } = this.props;

        return (
            <div>
                {!isProcessing &&
                <button onClick={this.handleCreateClips}>Create clips</button>}
                {isProcessing && slices.length === 0 && <h2>Processing...</h2>}
                {slices.length > 0 &&
                <SlicesList slices={slices} />}
            </div>
        );
    }
}
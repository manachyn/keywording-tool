import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from '../../../utils/compare';

const { node, object, bool, number, func } = PropTypes;

export default class Video extends Component {
    static propTypes = {
        children: node.isRequired,
        api: object.isRequired,
        playing: bool.isRequired,
        playFrom: number,
        playTo: number,
        seekTo: number,
        onSeeked: func,
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !shallowEqual(this.props, nextProps, ['children']);
    // }

    componentDidUpdate() {
        if (this.props.playing) {
            this.props.api.seek(this.props.playFrom);
            this.props.api.play();
        }
        if (this.props.seekTo) {
            this.api.seek(this.props.seekTo);
            this.props.onSeeked(this.props.seekTo)
        }
    }

    render() {
        console.log('Player wrapper');
        console.log(this.props);
        return this.props.children;
    }
}

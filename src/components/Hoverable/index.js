import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const hoverable = ComposedComponent => {
    class Hoverable extends Component {
        state = {
            hovered: false
        };

        static propTypes = {
            children: PropTypes.node
        };

        focus = () => {
            this.setState({ hovered: true });
        };

        unfocus = () => {
            this.setState({ hovered: false });
        };

        render() {
            return (
                <div onMouseEnter={this.focus} onMouseLeave={this.unfocus}>
                  <ComposedComponent {...this.props} hovered={this.state.hovered} />
                </div>
            );
        }
    }

    return Hoverable;
};

export default hoverable;

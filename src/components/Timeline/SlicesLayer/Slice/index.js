import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const { func } = PropTypes;
import sliceProps from './props';

export default class Slice extends Component {
    static propTypes = {
        ...sliceProps,
        onDelete: func
    };

    render() {
        const { id } = this.props;
        return (
            <div styleName="slice">

            </div>
        );
    }
}

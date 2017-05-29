import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { func, node } = PropTypes;
import layerItemProps from './props';

export default class LayerItem extends Component {
    static propTypes = {
        ...layerItemProps,
        onDelete: func,
        //children: node.isRequire,
    };

    handleDelete() {
        const { id, onDelete } = this.props;
        onDelete(id);
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

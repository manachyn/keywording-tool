import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const { bool, string, any } = PropTypes;

export const Icon = (props) => {
    const {
        children,
        className,
        value,
        small,
        big,
        ...other,
    } = props;

    const styleName = small ? 'small' : big ? 'big' : 'normal';

    return (
        <span { ...{ ...{ className, styleName }, ...other } }>
      {value}
            {children}
    </span>
    );
};

Icon.propTypes = {
    children: any,
    className: string,
    small: bool,
    big: bool,
    value: string.isRequired,
};

Icon.defaultProps = {
    small: false,
    big: false,
};

export default Icon;

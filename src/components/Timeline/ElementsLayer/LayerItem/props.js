import PropTypes from 'prop-types';

const { string, number } = PropTypes;

export default {
    id: string.isRequired,
    x: number.isRequired,
    width: number.isRequired
};

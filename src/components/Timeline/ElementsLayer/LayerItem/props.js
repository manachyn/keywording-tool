import PropTypes from 'prop-types';

const { number } = PropTypes;

export default {
    id: number.isRequired,
    x: number.isRequired,
    width: number.isRequired
};

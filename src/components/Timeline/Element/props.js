import PropTypes from 'prop-types';

const { number } = PropTypes;

export default {
    id: number.isRequired,
    offset: number.isRequired,
    duration: number.isRequired
};

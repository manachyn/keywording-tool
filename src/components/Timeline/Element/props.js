import PropTypes from 'prop-types';

const { string, number } = PropTypes;

export default {
    id: string.isRequired,
    offset: number.isRequired,
    duration: number.isRequired
};

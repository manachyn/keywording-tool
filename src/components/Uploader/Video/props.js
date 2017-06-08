import PropTypes from 'prop-types';

const { number, string } = PropTypes;

export default {
    id: number.isRequired,
    url: string.isRequired
};

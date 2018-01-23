import PropTypes from 'prop-types';

const { number, shape } = PropTypes;

export default shape({
    buffered: number.isRequired,
    played: number.isRequired
});

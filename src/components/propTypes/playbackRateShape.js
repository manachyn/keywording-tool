import PropTypes from 'prop-types';

const { number, shape } = PropTypes;

export default shape({
    step: number.isRequired,
    min: number.isRequired,
    max: number.isRequired
});

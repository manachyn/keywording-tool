import PropTypes from 'prop-types';

const { func, shape } = PropTypes;

export default shape({
    previous: func,
    next: func
});

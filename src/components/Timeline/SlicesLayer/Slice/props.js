import PropTypes from 'prop-types';

const { number, string } = PropTypes;

export default {
    id: string.isRequired,
    offset: number.isRequired,
    duration: number.isRequired,
    videoId: number.isRequired,
    url: string,
    status: string
};

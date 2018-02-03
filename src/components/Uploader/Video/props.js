import PropTypes from 'prop-types';

const { number, string, bool } = PropTypes;

export default {
    id: number.isRequired,
    url: string,
    status: string,
    fromServer: bool,
    currentTime: number,
    duration: number,
};

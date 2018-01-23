import PropTypes from 'prop-types';

const { number, string, shape } = PropTypes;

export const props = {
    code: number,
    title: string,
    body: string
};

export default shape(props);

import React from 'react';
import PropTypes from 'prop-types';
import FlashMessage from '../FlashMessage';

const FlashMessagesList = ({ messages, onCloseMessage }) => {
    const messagesList = messages.map( message =>
        <FlashMessage key={ message.id } message={ message } onClose={ onCloseMessage } />
    );

    return (
        <div>{ messagesList }</div>
    );
};

FlashMessagesList.propTypes = {
    messages: PropTypes.array.isRequired,
    onCloseMessage: PropTypes.func.isRequired
};

FlashMessagesList.defaultProps = {
    messages: []
};

export default FlashMessagesList;

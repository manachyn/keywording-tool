import {
    ADD_FLASH_MESSAGE,
    REMOVE_FLASH_MESSAGE,
    CLEAR_FLASH_MESSAGES,
} from '../constants/actionTypes';

import {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    WARNING_MESSAGE
} from '../constants/messageTypes';

let nextVideoId = 0;

const DEFAULT_TIMEOUT = 3000;

const addFlashMessage = (message) => {
    return {
        type: ADD_FLASH_MESSAGE,
        payload: message,
    };
};

export const removeMessage = (id) => {
    return {
        type: REMOVE_FLASH_MESSAGE,
        payload: { id },
    };
};

export const clearMessages = () => {
    return {
        type: CLEAR_FLASH_MESSAGES
    };
};

export const addSuccessMessage = (message) => {
    return addMessage(message, SUCCESS_MESSAGE);
};

export const addErrorMessage = (message) => {
    return addMessage(message, ERROR_MESSAGE);
};

export const addWarningMessage = (message) => {
    return addMessage(message, WARNING_MESSAGE);
};

export const addMessage = (message, type, options = {}) => {
    const { timeout = DEFAULT_TIMEOUT, push } = options;
    const id = nextVideoId++;

    return (dispatch) => {
        if (push) dispatch(clearMessages());
        dispatch(addFlashMessage({ id, message, type}));
        if (timeout) setTimeout(() => dispatch(removeMessage(id)), timeout);
    }
};
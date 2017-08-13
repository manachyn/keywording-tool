import {
    ADD_FLASH_MESSAGE,
    REMOVE_FLASH_MESSAGE,
    CLEAR_FLASH_MESSAGES,
} from '../constants/actionTypes';

import message from './message';

const initialState = [];

const flashMessages = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return [...state.messages, message(undefined, action)];
        case REMOVE_FLASH_MESSAGE: {
            const { id } = action.payload;

            return state.filter(message =>
                message.id !== id
            );
        }
        case CLEAR_FLASH_MESSAGES:
            return initialState;
        default:
            return state;
    }
};

export default flashMessages;
import {
    ADD_FLASH_MESSAGE,
} from '../constants/actionTypes';

const initialState = {
    id: null,
    message: null,
    type: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_FLASH_MESSAGE: {
            const { id, message, type } = action.payload;

            return { id, message, type };
        }
        default:
            return state;
    }
};

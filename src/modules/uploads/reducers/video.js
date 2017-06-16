import {
    VIDEO_ADD,
    VIDEO_UPDATE
} from '../constants/actionTypes';

const video = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_ADD: {
            const { id, fromServer, currentTime, duration } = action.payload;

            return { id, fromServer, currentTime, duration };
        }
        case VIDEO_UPDATE: {
            const {
                id,
                url,
                status
            } = action.payload;

            if (state.id !== id) {
                return state;
            }

            return {
                ...state,
                url,
                status
            };
        }
        default:
            return state
    }
};

export default video;

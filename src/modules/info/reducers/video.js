import { VIDEO_SAVE_DATA } from '../constants/actionTypes';

const video = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_SAVE_DATA:
            return action.payload.data;
        default:
            return state
    }
};

export default video;

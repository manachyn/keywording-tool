import {
    VIDEO_ADD
} from '../constants/actionTypes';

const video = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_ADD:
            const { id, url } = action.payload;

            return {
                id,
                url
            };
        default:
            return state
    }
};

export default video;

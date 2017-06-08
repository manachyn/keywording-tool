import {
    VIDEO_LOADED_METADATA,
    VIDEO_TIME_UPDATE,
} from '../constants/actionTypes';

import initialState from '../initialState';

export default function video(state = initialState, action) {
    switch (action.type) {
        case VIDEO_LOADED_METADATA: {
            const { duration, size } = action.payload;
            return Object.assign({}, state, { duration, size });
        }
        case VIDEO_TIME_UPDATE: {
            const { currentTime, duration } = action.payload;
            //const currentPercentage = Math.floor(currentTime / Math.max(duration, 1) * 100);
            const currentPercentage = currentTime / duration * 100;

            return Object.assign({}, state, {
                //currentTime: Math.floor(currentTime),
                currentTime: currentTime,
                currentPercentage,
                duration,
            });
        }
        default:
            return state;
    }
}

import {
    VIDEO_TIME_UPDATE,
} from '../constants/actionTypes';

import initialState from '../initialState';

export default function video(state = initialState, action) {
    switch (action.type) {
        case VIDEO_TIME_UPDATE: {
            const { currentTime, duration } = action.payload;
            const currentPercentage = Math.floor(currentTime / Math.max(duration, 1) * 100);

            return Object.assign({}, state, {
                currentTime: Math.floor(currentTime),
                currentPercentage,
                duration,
            });
        }
        default:
            return state;
    }
}

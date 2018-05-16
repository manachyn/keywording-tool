import { VIDEO_LOADED_METADATA, VIDEO_TIME_UPDATE, VIDEO_SEEK, VIDEO_SEEKED, VIDEO_TOGGLE_PLAY } from '../constants/actionTypes';
import { VIDEO_SELECT } from '../../uploads/constants/actionTypes';
import { SLICE_PLAY, SLICE_PAUSE, SLICE_STOP } from '../../slicing/constants/actionTypes';

import initialState from '../initialState';

export default function video(state = initialState, action) {
    switch (action.type) {
        case VIDEO_LOADED_METADATA: {
            const { duration, size } = action.payload;

            return {
                ...state,
                duration,
                size
            };
        }
        case VIDEO_TIME_UPDATE: {
            const { currentTime, duration } = action.payload;
            //const currentPercentage = Math.floor(currentTime / Math.max(duration, 1) * 100);
            const currentPercentage = currentTime / duration * 100;

            return {
                ...state,
                currentTime,
                currentPercentage,
                duration,
            };
        }
        case VIDEO_SELECT: {
            return {
                ...state,
                currentTime: 0,
                currentPercentage: 0,
                duration: 0
            };
        }
        case VIDEO_SEEK: {
            return {
                ...state,
                seekTo: action.payload.time
            };
        }
        case VIDEO_SEEKED: {
            return {
                ...state,
                seekTo: null
            };
        }
        case VIDEO_TOGGLE_PLAY: {
            return {
                ...state,
                paused: !state.paused
            };
        }
        case SLICE_PLAY:
            return {
                ...state,
                paused: false
            };
        case SLICE_STOP:
            return {
                ...state,
                paused: true
            };
        case SLICE_PAUSE:
            return {
                ...state,
                paused: true
            };
        default:
            return state;
    }
}

import {
    SLICE_SAVE_DATA,
    VIDEO_SAVE_DATA
} from '../constants/actionTypes';

export const saveSliceData = (id, data) => {
    return {
        type: SLICE_SAVE_DATA,
        payload: {
            id,
            data
        }
    };
};

export const saveVideoData = (id, data) => {
    return {
        type: VIDEO_SAVE_DATA,
        payload: {
            id,
            data
        }
    };
};

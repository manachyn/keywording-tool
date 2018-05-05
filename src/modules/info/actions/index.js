import {
    SLICE_EDIT_DATA,
    SLICE_SAVE_DATA,
    VIDEO_SAVE_DATA
} from '../constants/actionTypes';

export const editSliceData = (id) => {
    return {
        type: SLICE_EDIT_DATA,
        payload: {
            id
        }
    };
};

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

export const submitVideoData = (id, data, dispatch) => {
    return new Promise((resolve) => {
        dispatch(saveVideoData(id, data));
        resolve();
    });
};

export const submitSliceData = (id, data, dispatch) => {
    return new Promise((resolve) => {
        dispatch(saveSliceData(id, data));
        resolve();
    });
};
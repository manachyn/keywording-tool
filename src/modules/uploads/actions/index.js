import {
    VIDEO_ADD,
    VIDEO_REMOVE,
    VIDEO_SELECT
} from '../constants/actionTypes';

let nextVideoId = 0;

export function add(url, id = nextVideoId++) {
    return {
        type: VIDEO_ADD,
        payload: {
            id,
            url
        },
    };
}

export function remove(id) {
    return {
        type: VIDEO_REMOVE,
        payload: { id },
    };
}

export function select(id) {
    return {
        type: VIDEO_SELECT,
        payload: { id },
    };
}

export const addAndSelect = (url, id) => dispatch => {
    const addAction = add(url, id);
    dispatch(addAction);
    dispatch(select(addAction.payload.id));
};
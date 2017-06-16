import {
    VIDEO_ADD,
    VIDEO_UPDATE,
    VIDEO_REMOVE,
    VIDEO_SELECT
} from '../constants/actionTypes';

let nextVideoId = 0;

export function add(id = nextVideoId++, fromServer = false) {
    return {
        type: VIDEO_ADD,
        payload: { id, fromServer, currentTime: 0, duration: 0 },
    };
}

export const uploaded = (id) => (dispatch, getState) => {
    const { videos } = getState();
    if (videos.allIds.indexOf(id) !== -1) {
        add(id, true);
    }
};

export function update(id, data) {
    return {
        type: VIDEO_UPDATE,
        payload: {
            id,
            ...data
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
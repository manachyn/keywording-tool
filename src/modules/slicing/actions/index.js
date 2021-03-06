import {
    SLICE_ADD,
    SLICE_REMOVE,
    SLICE_RESIZE,
    SLICE_PLAY,
    SLICE_STOP,
    SLICE_PAUSE,
    SLICE_SET_FINISH_TIME,
    SLICING_START,
    SLICING_FINISH
} from '../constants/actionTypes';

import {
    STATUS_NEW
} from '../constants/statuses';

import { v4 } from 'node-uuid';

let nextSliceId = 0;

export function add(videoId, offset, duration = 0) {
    return {
        type: SLICE_ADD,
        payload: {
            id: v4(),
            offset,
            duration,
            videoId,
            status: STATUS_NEW
        },
    };
}

export function remove(id) {
    return {
        type: SLICE_REMOVE,
        payload: { id },
    };
}

export function play(id) {
    return {
        type: SLICE_PLAY,
        payload: { id },
    };
}

export function stop() {
    return {
        type: SLICE_STOP,
    };
}

export function pause() {
    return {
        type: SLICE_PAUSE,
    };
}

export function resize(id, offsetDelta, durationDelta, factor) {
    return {
        type: SLICE_RESIZE,
        payload: {
            id,
            offsetDelta,
            durationDelta,
            factor
        },
    };
}

export const setFinishTime = (id, time) => {
    return {
        type: SLICE_SET_FINISH_TIME,
        payload: { id, time },
    };
};

export const startSlicing = (id) => {
    return {
        type: SLICING_START,
        payload: { id },
    };
};

export const finishSlicing = (offset) => {
    return {
        type: SLICING_FINISH,
        payload: { offset },
    };
};

export const setInPoint = (offset, videoId) => (dispatch, getState) => {
    const { slices } = getState();
    if (slices.slicingId !== null) {
        dispatch(finishSlicing());
    } else {
        if (!videoId) {
            const { videos } = getState();
            videoId = videos.selected;
        }

        const addAction = add(videoId, offset);
        dispatch(addAction);
        dispatch(startSlicing(addAction.payload.id));
    }
};

export const setOutPoint = (offset) => (dispatch, getState) => {
    const { slices } = getState();
    if (slices.slicingId !== null) {
        dispatch(finishSlicing());
        dispatch(setFinishTime(slices.slicingId, offset));
    }
};
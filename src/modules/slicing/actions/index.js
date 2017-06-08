import {
    SLICE_ADD,
    SLICE_START_SLICING,
    SLICE_REMOVE,
    SLICE_RESIZE
} from '../constants/actionTypes';

let nextSliceId = 0;

export function add(offset, duration = 0) {
    return {
        type: SLICE_ADD,
        payload: {
            id: nextSliceId++,
            offset,
            duration
        },
    };
}

export const startSlicing = (id) => {
    return {
        type: SLICE_START_SLICING,
        payload: { id },
    };
};

export const addAndStartSlicing = (offset, duration = 0) => dispatch => {
    const addAction = add(offset, duration);
    dispatch(addAction);
    dispatch(startSlicing(addAction.payload.id));
};

export function remove(id) {
    return {
        type: SLICE_REMOVE,
        payload: { id },
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
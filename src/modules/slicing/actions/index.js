import {
    SLICE_ADD,
    SLICE_REMOVE,
    SLICE_RESIZE,
    SLICE_SET_FINISH_TIME,
    SLICING_START,
    SLICING_FINISH
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

export const setInPoint = (offset) => (dispatch, getState) => {
    const { slices } = getState();
    if (slices.slicingId !== null) {
        dispatch(finishSlicing());
    } else {
        const addAction = add(offset);
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

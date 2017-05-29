import {
    SLICE_REMOVE,
    SLICE_RESIZE
} from '../constants/actionTypes';

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
            factor,
        },
    };
}
import {
    SLICE_REMOVE,
    SLICE_RESIZE
} from '../constants/actionTypes';

import initialState from '../initialState';

export default function slices(state = initialState, action) {
    switch (action.type) {
        case SLICE_REMOVE: {
            const { id } = action.payload;

            return state.filter(slice =>
                slice.id !== id
            );
        }
        case SLICE_RESIZE: {
            const {
                id,
                offsetDelta,
                durationDelta,
                factor
            } = action.payload;

            return state.map(slice =>
                slice.id === id ?
                    {
                        ...slice,
                        offset: slice.offset + (factor > 0 ? 0 : offsetDelta),
                        duration: slice.duration + durationDelta
                    } : slice
            )
        }
        default:
            return state;
    }
}

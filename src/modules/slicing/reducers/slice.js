import {
    SLICE_ADD,
    SLICE_RESIZE,
    SLICE_SET_FINISH_TIME
} from '../constants/actionTypes';

const slice = (state = {}, action) => {
    switch (action.type) {
        case SLICE_ADD:
            const { id, offset, duration } = action.payload;

            return {
                id,
                offset,
                duration
            };
        case SLICE_RESIZE: {
            const {
                id,
                offsetDelta,
                durationDelta,
                factor
            } = action.payload;

            if (state.id !== id) {
                return state;
            }

            return {
                ...state,
                offset: state.offset + (factor > 0 ? 0 : offsetDelta),
                duration: state.duration + durationDelta
            };
        }
        case SLICE_SET_FINISH_TIME: {
            const { id, time } = action.payload;

            if (state.id !== id) {
                return state;
            }

            return {
                ...state,
                duration: time - state.offset
            };
        }
        default:
            return state
    }
};

export default slice;

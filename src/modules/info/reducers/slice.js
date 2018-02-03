import { SLICE_SAVE_DATA } from '../constants/actionTypes';

const slice = (state = {}, action) => {
    switch (action.type) {
        case SLICE_SAVE_DATA:
            return action.payload.data;
        default:
            return state
    }
};

export default slice;

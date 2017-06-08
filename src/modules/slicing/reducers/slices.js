import { combineReducers } from 'redux';

import {
    SLICE_ADD,
    SLICE_START_SLICING,
    SLICE_REMOVE,
    SLICE_RESIZE
} from '../constants/actionTypes';

import slice from './slice';
import initialState from '../initialState';

const byId = (state = initialState.byId, action) => {
    switch (action.type) {
        case SLICE_ADD: {
            const { id } = action.payload;

            return {
                ...state,
                [id]: slice(undefined, action)
            };
        }
        case SLICE_REMOVE: {
            const { id } = action.payload;

            return state.filter(slice =>
                slice.id !== id
            );
        }
        case SLICE_RESIZE: {
            const { id } = action.payload;

            return {
                ...state,
                [id]: slice(state[id], action),
            };
        }
        default:
            return state;
    }
};

const allIds = (state = initialState.allIds, action) => {
    switch (action.type) {
        case SLICE_ADD: {
            const { id } = action.payload;

            return [...state, id];
        }
        default:
            return state;
    }
};

const slicingIds = (state = initialState.slicingIds, action) => {
    switch (action.type) {
        case SLICE_START_SLICING:
            const { id } = action.payload;
            if (state.indexOf(id) !== -1) {
                return state
            }
            return [...state, id];
            //return state.concat(id);
        default:
            return state
    }
};

const slices = combineReducers({
    byId,
    allIds,
    slicingIds
});

export default slices;

export const getAllSlices = (state) =>
    state.allIds.map(id => state.byId[id]);

export const getSlicingSlices = (state) =>
    state.slicingIds.map(id => state.byId[id]);

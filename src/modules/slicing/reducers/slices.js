import { combineReducers } from 'redux';

import {
    SLICE_ADD,
    SLICE_REMOVE,
    SLICE_RESIZE,
    SLICE_SET_FINISH_TIME,
    SLICING_START,
    SLICING_FINISH
} from '../constants/actionTypes';

import {
    PROCESSING_COMPLETED
} from '../../processing/constants/actionTypes';

import {
    STATUS_NEW
} from '../constants/statuses';

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
        case SLICE_SET_FINISH_TIME: {
            const { id } = action.payload;

            return {
                ...state,
                [id]: slice(state[id], action),
            };
        }
        case PROCESSING_COMPLETED: {
            const { slicesIds, result } = action.payload;
            const newState = { ...state };
            result.forEach(function (sliceUrl, index) {
                newState[slicesIds[index]] = { ...newState[slicesIds[index]], url: sliceUrl }
            });

            return newState;
        }
        default:
            return state;
    }
};

const allIds = (state = initialState.allIds, action) => {
    switch (action.type) {
        case SLICE_ADD:
            return [...state, action.payload.id];
        case SLICE_REMOVE:
            return state.filter(id =>
                slice.id !== action.payload.id
            );
        default:
            return state;
    }
};

const slicingId = (state = initialState.slicingId, action) => {
    switch (action.type) {
        case SLICING_START:
            return action.payload.id;
        case SLICING_FINISH:
            return null;
        default:
            return state
    }
};

const slices = combineReducers({
    byId,
    allIds,
    slicingId
});

export default slices;

export const getAllSlices = (state, videoId) =>
    state.allIds.map(id => state.byId[id]).filter(slice =>
        slice.videoId === videoId
    );

export const getNewSlices = (state, videoId) =>
    state.allIds.map(id => state.byId[id]).filter(slice =>
        slice.videoId === videoId && slice.status === STATUS_NEW
    );

export const hasSlices = (state, videoId) =>
    getAllSlices(state, videoId).length > 0;

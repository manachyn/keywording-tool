import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import {
    SLICE_ADD,
    SLICE_REMOVE,
    SLICE_RESIZE,
    SLICE_SET_FINISH_TIME,
    SLICE_PLAY,
    SLICE_STOP,
    SLICING_START,
    SLICING_FINISH
} from '../constants/actionTypes';

import {
    PROCESSING_COMPLETED
} from '../../processing/constants/actionTypes';

import {
    VIDEO_TIME_UPDATE
} from '../../video/constants/actionTypes';

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
            return omit(state, action.payload.id);
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
                id !== action.payload.id
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
        case SLICE_REMOVE:
            return action.payload.id === state ? null : state;
        default:
            return state
    }
};

const playing = (state = initialState.playing, action) => {
    switch (action.type) {
        case SLICE_PLAY: {
            const { slice } = action.payload;
            return {id: slice.id, from: slice.offset, to: slice.offset + slice.duration};
        }
        case SLICE_STOP:
            return initialState.playing;
        case SLICE_REMOVE:
            return action.payload.id === state.id ? initialState.playing : state;
        case VIDEO_TIME_UPDATE: {
            const { currentTime } = action.payload;
            if (state.id !== null) {
                if (currentTime >= state.from && currentTime < state.to) {
                    return state;
                } else {
                    return initialState.playing;
                }
            }

            return initialState.playing;
        }
        default:
            return state
    }
};

const playingId = (state = initialState.playingId, action) => {
    switch (action.type) {
        case SLICE_PLAY:
            return action.payload.id;
        case SLICE_STOP:
            return null;
        case SLICE_REMOVE:
            return action.payload.id === state ? null : state;
        default:
            return state
    }
};

const slices = combineReducers({
    byId,
    allIds,
    slicingId,
    playingId
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

export const getPlayingSlice = (state) =>
    state.slices.playingId !== null ? state.slices.byId[state.slices.playingId] : null;

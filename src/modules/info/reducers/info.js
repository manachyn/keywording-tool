import { combineReducers } from 'redux';

import { VIDEO_SAVE_DATA, SLICE_EDIT_DATA, SLICE_SAVE_DATA } from '../constants/actionTypes';
import { VIDEO_SELECT } from '../../../modules/uploads/constants/actionTypes';

import video from './video';
import slice from './slice';
import initialState from '../initialState';

const byVideoId = (state = initialState.byVideoId, action) => {
    switch (action.type) {
        case VIDEO_SAVE_DATA: {
            const { id } = action.payload;

            return {
                ...state,
                [id]: video(state[id], action)
            };
        }
        default:
            return state;
    }
};

const bySliceId = (state = initialState.bySliceId, action) => {
    switch (action.type) {
        case SLICE_SAVE_DATA: {
            const { id } = action.payload;

            return {
                ...state,
                [id]: slice(state[id], action)
            };
        }
        default:
            return state;
    }
};

const editingVideoId = (state = initialState.editingVideoId, action) => {
    switch (action.type) {
        case VIDEO_SELECT:
            return action.payload.id;
        default:
            return state;
    }
};

const editingSliceId = (state = initialState.editingSliceId, action) => {
    switch (action.type) {
        case SLICE_EDIT_DATA:
            return action.payload.id;
        case VIDEO_SELECT:
            return null;
        default:
            return state;
    }
};

const info = combineReducers({
    byVideoId,
    bySliceId,
    editingVideoId,
    editingSliceId
});

export default info;

export const getEditingVideoId = (state) =>
    state.editingVideoId;

export const getEditingSliceId = (state) =>
    state.editingSliceId;

export const getVideoData = (state, videoId) =>
    state.byVideoId[videoId];

export const getSliceData = (state, sliceId, videoId) => {
    const videoInfo = state.byVideoId[videoId] ? state.byVideoId[videoId] : {};
    const sliceInfo = state.bySliceId[sliceId] ? state.bySliceId[sliceId] : {};

    return {...videoInfo, ...sliceInfo}
}

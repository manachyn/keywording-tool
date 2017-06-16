import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import {
    VIDEO_ADD,
    VIDEO_UPDATE,
    VIDEO_REMOVE,
    VIDEO_SELECT
} from '../constants/actionTypes';

import video from './video';
import initialState from '../initialState';

const byId = (state = initialState.videos.byId, action) => {
    switch (action.type) {
        case VIDEO_ADD: {
            const { id } = action.payload;

            return {
                ...state,
                [id]: video(undefined, action)
            };
        }
        case VIDEO_UPDATE: {
            const { id } = action.payload;

            return {
                ...state,
                [id]: video(state[id], action)
            };
        }
        case VIDEO_REMOVE:
            return omit(state, action.payload.id);
        default:
            return state;
    }
};

const allIds = (state = initialState.videos.allIds, action) => {
    switch (action.type) {
        case VIDEO_ADD: {
            const { id } = action.payload;

            return [...state, id];
        }
        case VIDEO_REMOVE:
            return state.filter(id =>
                id !== action.payload.id
            );
        default:
            return state;
    }
};

const selected = (state = initialState.videos.selected, action) => {
    switch (action.type) {
        case VIDEO_SELECT: {
            const { id } = action.payload;

            return id;
        }
        case VIDEO_REMOVE: {
            const { id } = action.payload;

            return id === state ? null : state;
        }
        default:
            return state;
    }
};

const videos = combineReducers({
    byId,
    allIds,
    selected
});

export default videos;

export const getAllVideos = (state) =>
    state.allIds.map(id => state.byId[id]);

export const getSelectedVideo = (state) =>
    state.byId[state.selected];

export const getSelectedVideoId = (state) =>
    state.selected;

export const hasSelectedVideo = (state) =>
    state.selected !== null;

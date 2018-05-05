import { combineReducers } from 'redux';

import {
    PROCESSING_STARTED,
    PROCESSING_COMPLETED,
    PROCESSING_FAILED,
} from '../constants/actionTypes';

import initialState from '../initialState';

const isProcessing = (state = initialState.isProcessing, action) => {
    switch (action.type) {
        case PROCESSING_STARTED:
            return true;
        case PROCESSING_COMPLETED:
            return false;
        case PROCESSING_FAILED:
            return false;
        default:
            return state
    }
};

const jobId = (state = initialState.jobId, action) => {
    switch (action.type) {
        case PROCESSING_STARTED:
            return action.payload.jobId;
        case PROCESSING_COMPLETED:
            return null;
        case PROCESSING_FAILED:
            return null;
        default:
            return state
    }
};

const processingSlicesIds = (state = initialState.processingSlicesIds, action) => {
    switch (action.type) {
        case PROCESSING_STARTED:
            return action.payload.slicesIds;
        case PROCESSING_COMPLETED:
            return [];
        case PROCESSING_FAILED:
            return [];
        default:
            return state;
    }
};

const processedSlicesIds = (state = initialState.processedSlicesIds, action) => {
    switch (action.type) {
        case PROCESSING_STARTED:
            return [];
        case PROCESSING_COMPLETED:
            return action.payload.slicesIds;
        case PROCESSING_FAILED:
            return [];
        default:
            return state;
    }
};

const errors = (state = initialState.errors, action) => {
    switch (action.type) {
        case PROCESSING_STARTED:
            return [];
        case PROCESSING_COMPLETED:
            return [];
        case PROCESSING_FAILED:
            return [];
        default:
            return state;
    }
};

export default combineReducers({
    isProcessing,
    jobId,
    processingSlicesIds,
    processedSlicesIds,
    errors
});

export const getProcessedSlices = (state, videoId) =>
    state.processing.processedSlicesIds.map(id => {
        const slice = state.slices.byId[id];
        const videoInfo = state.info.byVideoId[videoId] ? state.info.byVideoId[videoId] : {};
        const sliceInfo = state.info.bySliceId[id] ? state.info.bySliceId[id] : {};
        return {...slice, info: {...videoInfo, ...sliceInfo}}
    }).filter(slice =>
        slice.videoId === videoId
    );

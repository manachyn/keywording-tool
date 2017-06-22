import {
    PROCESSING_START_REQUEST,
    PROCESSING_START,
    PROCESSING_STARTED,
    PROCESSING_ERROR,
    PROCESSING_RECEIVE_STATUS,
    PROCESSING_COMPLETED,
    PROCESSING_FAILED,
} from '../constants/actionTypes';
import {
    PROGESSING_STATUS_COMPLETED,
    PROGESSING_STATUS_FAILED
} from '../constants/statuses';

import { callApi } from '../../../api';
import { getNewSlices } from '../../../modules/slicing/reducers/slices';
import { getSelectedVideo, getSelectedVideoId } from '../../../modules/uploads/reducers/videos';

export const requestStartProcessing = (slices) => {
    return {
        type: PROCESSING_START_REQUEST,
        payload: { slices }
    };
};

export const startedProcessing = (slicesIds, response) => {
    const { jobId } = response;

    return {
        type: PROCESSING_STARTED,
        payload: { slicesIds, jobId }
    };
};

export const errorProcessing = (error) => {
    return {
        type: PROCESSING_STARTED,
        payload: { error }
    };
};

export const startProcessing = (video, slices) => (dispatch, getState) => {
    dispatch(requestStartProcessing(slices));
    // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    //     .then(response => response.json())
    //     .then(json => dispatch(receivePosts(subreddit, json)))


    return callApi('slicing/start', 'post', { video, slices }).then(
        response => {
            const slicesIds = slices.map(slice => slice.id);
            dispatch(startedProcessing(slicesIds, response))
        },
        error => console.log(error)
    )
};

export const receiveStatus = (slicesIds, response) => {
    const { status, result } = response;

    if (status === PROGESSING_STATUS_COMPLETED) {
        return {
            type: PROCESSING_COMPLETED,
            payload: { slicesIds, result }
        };
    } else if (status === PROGESSING_STATUS_FAILED) {
        return {
            type: PROCESSING_FAILED,
            payload: { slicesIds }
        };
    } else {
        return {
            type: PROCESSING_RECEIVE_STATUS,
            payload: { slicesIds, status }
        };
    }
};


export const createClips = () => (dispatch, getState) => {
    const { slices, videos } = getState();
    const video = getSelectedVideo(videos);
    const newSlices = getNewSlices(slices, getSelectedVideoId(videos));
    dispatch(startProcessing(video, newSlices));
};

export const checkStatus = (jobId) => (dispatch, getState) => {
    const { processing } = getState();

    return callApi('slicing/status/' + jobId).then(
        response => dispatch(receiveStatus(processing.processingSlicesIds, response)),
        error => console.log(error)
    )
};

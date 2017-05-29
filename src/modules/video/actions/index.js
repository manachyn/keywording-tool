import {
    VIDEO_LOADED_METADATA,
    VIDEO_TIME_UPDATE,
} from '../constants/actionTypes';

export function loadedMetadata(metadata) {
    return {
        type: VIDEO_LOADED_METADATA,
        payload: metadata,
    };
}

export function timeUpdate(currentTime, duration) {
  return {
    type: VIDEO_TIME_UPDATE,
    payload: { currentTime, duration }
  };
}
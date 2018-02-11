import {
    VIDEO_LOADED_METADATA,
    VIDEO_TIME_UPDATE,
    VIDEO_PLAY,
    VIDEO_PAUSE,
    VIDEO_SEEK,
    VIDEO_SEEKED
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

export function play() {
    return {
        type: VIDEO_PLAY
    };
}

export function pause() {
    return {
        type: VIDEO_PLAY
    };
}

export function seek(time) {
    return {
      type: VIDEO_SEEK,
      payload: { time }
    };
  }

export function seeked(time) {
    return {
      type: VIDEO_SEEKED,
      payload: { time }
    };
  }
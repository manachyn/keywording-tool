import {
    VIDEO_TIME_UPDATE,
} from '../constants/actionTypes';

export function timeUpdate(currentTime, duration) {
  return {
    type: VIDEO_TIME_UPDATE,
    payload: { currentTime, duration }
  };
}
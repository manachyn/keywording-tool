import { createSelector } from 'reselect';

const getSlicesIds = state => state.slices.allIds;
const getSlicesById = state => state.slices.byId;
const getSelectedVideoId = state => state.videos.selected;

export const getSlicesOfSelectedVideo = createSelector(
    [ getSlicesIds, getSlicesById, getSelectedVideoId ],
    (slicesIds, slicesById, selectedVideoId) => slicesIds.map(id => slicesById[id]).filter(slice => slice.videoId === selectedVideoId)
  )
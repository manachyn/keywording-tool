import React from 'react'
import { render } from 'react-dom';

import configureStore from './store/configureStore';
import Player from './containers/Player';
import Timeline from './containers/Timeline';
import { getAllSlices } from '../modules/slicing/reducers/slices';

import { Provider } from 'react-redux';

let store;
let videoId = 0;

function selectSlices(state) {
    return state.slices.byId;
}

let currentValue;
const handleChange = callback => () => {
    let previousValue = currentValue;
    let state = store.getState();
    currentValue = selectSlices(store.getState());
    if (previousValue !== currentValue) {
        callback(getAllSlices(state.slices, videoId));
    }
};

export const init = ({ video, slices = [], onStateChange }) => {
    const slicesById = {};
    const slicesAllIds = [];
    for (let i = 0; i < slices.length; ++i) {
        slicesById[slices[i].id] = slices[i];
        slicesAllIds[i] = slices[i].id;
    }
    (store = configureStore({
        videos: {
            byId: {
                [video.id]: {
                    id: video.id,
                    url: video.url,
                    type: video.type,
                    thumb: {
                        url: video.thumb.url,
                        type: video.thumb.type
                    },
                    startTimecode: video.startTimecode ? video.startTimecode : null
                }
            },
            allIds: [video.id],
            selected: video.id
        },
        slices: {
            byId: slicesById,
            allIds: slicesAllIds,
        }
    }));
    videoId = video.id;
    store.subscribe(handleChange(onStateChange));
};

export const renderPlayer = (selector, props = {}) => {
    const player = props.player || {};
    const video = props.video || {};
    render(<Provider store={store}><Player player={player} video={video}/></Provider>, document.getElementById(selector));
};

export const renderTimeline = (selector) => {
    render(<Provider store={store}><Timeline/></Provider>, document.getElementById(selector));
};
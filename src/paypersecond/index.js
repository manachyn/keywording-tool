import React from 'react'
import { render } from 'react-dom';

import configureStore from './store/configureStore';
import Video from './containers/Video';
import Timeline from './containers/Timeline';
import { getAllSlices } from '../modules/slicing/reducers/slices';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

let store;
let persistor;
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

export const init = ({ video, onStateChange }) => {
    ({store, persistor} = configureStore({
        videos: {
            byId: {
                [video.id]: {
                    id: video.id,
                    url: video.url,
                    type: video.type,
                    thumb: {
                        url: video.thumb.url,
                        type: video.thumb.type
                    }
                }
            },
            allIds: [video.id],
            selected: video.id
        }
    }));
    videoId = video.id;
    store.subscribe(handleChange(onStateChange));
};

export const renderPlayer = (selector) => {
    render(<Provider store={store}><PersistGate persistor={persistor}><Video/></PersistGate></Provider>, document.getElementById(selector));
};

export const renderTimeline = (selector) => {
    render(<Provider store={store}><PersistGate persistor={persistor}><Timeline/></PersistGate></Provider>, document.getElementById(selector));
};
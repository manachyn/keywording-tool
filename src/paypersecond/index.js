import React from 'react'
import { render } from 'react-dom';

import configureStore from './store/configureStore';
import RootVideo from '../containers/RootVideo';
import RootTimeline from '../containers/RootTimeline';
import { getAllSlices } from '../modules/slicing/reducers/slices';

let store;
const videoId = 1;

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
    store = configureStore({ video: { url: video }});
    store.subscribe(handleChange(onStateChange));
};

export const renderPlayer = (selector) => {
    render(<RootVideo store={store} />, document.getElementById(selector));
};

export const renderTimeline = (selector) => {
    render(<RootTimeline store={store} />, document.getElementById(selector));
};
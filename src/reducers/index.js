import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import video from '../modules/video/reducers';
import slices from '../modules/slicing/reducers/slices';
import videos from '../modules/uploads/reducers/videos';
import processing from '../modules/processing/reducers';

const rootReducer = combineReducers({
    video,
    slices,
    videos,
    processing,
    router: routerReducer
});

export default rootReducer;
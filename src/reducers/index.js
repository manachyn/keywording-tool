import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import video from '../modules/video/reducers';
import slices from '../modules/slicing/reducers/slices';
import videos from '../modules/uploads/reducers/videos';
import processing from '../modules/processing/reducers';
import info from '../modules/info/reducers/info';
import flashMessages from '../modules/flashMessages/reducers';

const rootReducer = combineReducers({
    video,
    slices,
    videos,
    processing,
    info,
    flashMessages,
    router: routerReducer,
    form: formReducer
});

export default rootReducer;
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import video from '../modules/video/reducers';
import slices from '../modules/slicing/reducers/slices';

const rootReducer = combineReducers({
    video,
    slices,
    router: routerReducer
});

export default rootReducer;
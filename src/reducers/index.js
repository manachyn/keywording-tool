import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import video from './video';

const rootReducer = combineReducers({
    video,
    router: routerReducer
});

export default rootReducer;
import { combineReducers } from 'redux';

import video from '../../modules/video/reducers';
import slices from '../../modules/slicing/reducers/slices';

const rootReducer = combineReducers({
    video,
    slices
});

export default rootReducer;
import { combineReducers } from 'redux';

import gallery from './gallery';

const combinedReducer = combinedReducers({
    gallery
});

export default combinedReducer;

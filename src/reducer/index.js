import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import gallery from './gallery';

const config = {
	key: 'root',
	storage
};

const combinedReducer = combineReducers({
	gallery
});

const appReducer = persistReducer(config, combinedReducer);

export default appReducer;

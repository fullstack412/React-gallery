import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import combinedReducer from './reducer';
import rootSaga from './reducer/saga';

export const history = createHistory();
const navMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combinedReducer,
	composeWithDevTools(
		applyMiddleware(
		thunk,
		navMiddleware,
		sagaMiddleware,
	))
);

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export default store;
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import combinedReducer from './reducer';
import rootSaga from './reducer/saga';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combinedReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      sagaMiddleware,
    )
  )
)

sagaMiddleware.run(rootSaga)

export default store;
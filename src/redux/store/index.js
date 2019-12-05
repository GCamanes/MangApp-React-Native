import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

// Init redux store (using the given reducer & middleware)
const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares)),
);

// run the saga
sagaMiddleware.run(sagas);

export default store;

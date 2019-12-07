import { combineReducers } from 'redux';

import app from './app-reducer';
import manga from './manga-reducer';
import router from './router-reducer';

// Combine all
const appReducer = combineReducers({
  app,
  manga,
  router,
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;

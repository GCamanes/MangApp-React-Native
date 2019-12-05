/**
 * App Reducer
 */

import AppConstants from '../../app/app.constants';

// Set initial state
const initialState = {
  error: null,
  loading: false,
  version: '0.0.0',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case AppConstants.EVENTS.SET_ERROR_REDUX: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case AppConstants.EVENTS.CLEAN_ERROR_REDUX: {
      return {
        ...state,
        error: null,
      };
    }
    case AppConstants.EVENTS.SHOW_LOADING_REDUCER:
      return {
        ...state,
        loading: action.payload,
      };
    case AppConstants.EVENTS.SET_APP_VERSION_REDUX:
      return {
        ...state,
        version: action.payload,
      };

    default:
      return state;
  }
}

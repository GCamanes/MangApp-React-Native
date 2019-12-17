import AppConstants from '../../app/app.constants';

const initialState = {
  scans: [],
};

const scanReducer = (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.EVENTS.SET_SCANS_REDUX:
      return {
        ...state,
        scans: action.payload,
      };
    case AppConstants.EVENTS.CLEAR_SCANS_REDUCER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default scanReducer;

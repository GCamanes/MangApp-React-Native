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
    case AppConstants.EVENTS.UPDATE_SCAN_INFOS_REDUX: {
      const { infos, index } = action.payload;
      const newScans = [...state.scans];
      newScans[index].infos = infos;
      return {
        ...state,
        scans: newScans,
      };
    }
    case AppConstants.EVENTS.CLEAR_SCANS_REDUCER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default scanReducer;

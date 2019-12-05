/**
 * Router Reducer
 */
import { ActionConst } from 'react-native-router-flux';

// Set initial state
const initialState = {
  scene: 'loading',
  routerState: {},
};

export default function routerReducer(state = initialState, action) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.routeName,
      };

    case 'ROUTER_STATE_CHANGED': {
      return {
        ...state,
        routerState: action.payload,
      };
    }

    case 'RESET_ROUTER_STATE': {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}

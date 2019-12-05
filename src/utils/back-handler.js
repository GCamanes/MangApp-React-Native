import { Actions } from 'react-native-router-flux';
import AppConstants from '../app/app.constants';
import store from '../redux/store';

export default function backHandler(routerState) {
  const routes = routerState.routes.map((item) => item.routeName);

  store.dispatch({
    type: AppConstants.EVENTS.SET_USER_ERROR,
    payload: null,
  });

  Actions.pop();
}

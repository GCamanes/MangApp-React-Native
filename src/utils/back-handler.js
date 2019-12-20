import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import AppConstants from '../app/app.constants';
import store from '../redux/store';

export default function backHandler(routerState) {
  const routes = routerState.routes.map((item) => item.routeName);

  if (routes[routes.length - 1] === AppConstants.ROUTES.home) {
    Alert.alert('Warning', 'Do you want to logout ?', [
      { text: 'NO', onPress: () => false, style: 'cancel' },
      { text: 'YES', onPress: () => store.dispatch({ type: AppConstants.EVENTS.LOGOUT_USER_SAGA }) },
    ]);

  } else if (routes[routes.length - 1] === AppConstants.ROUTES.scans) {
    Actions.pop();
    store.dispatch({ type: AppConstants.EVENTS.SET_PAGE_COUNTER_REDUX, payload: null });
  } else {
    Actions.pop();
  }
}

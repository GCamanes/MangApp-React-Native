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

  } else {
    Actions.pop();
  }
}

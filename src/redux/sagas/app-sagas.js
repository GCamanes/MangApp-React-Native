import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
  delay,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { getVersion } from 'react-native-device-info';

import AppConstants from '../../app/app.constants';

export function* loadAppSaga(action) {
  try {
    // stuff to load
    const version = yield getVersion();
    yield put({ type: AppConstants.EVENTS.SET_APP_VERSION_REDUX, payload: version });
    const user = yield firebase.auth().currentUser;
    if (user) {
      action.payload();
      yield delay(2000);
      Actions.reset(AppConstants.ROUTES.home);
    } else {
      yield delay(1000);
      Actions.reset(AppConstants.ROUTES.login);
    }
  } catch (error) {
    console.log('ERROR LOADING APP', error);
  }
}


function* watch() {
  yield takeLatest(AppConstants.EVENTS.LOAD_APP_SAGA, loadAppSaga);
}

export default watch;

import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
  delay,
  put,
  takeLatest,
} from 'redux-saga/effects';

import AppConstants from '../../app/app.constants';

export function* loginUserSaga(action) {
  const {
    mail,
    password,
    onSuccess,
    onError,
  } = action.payload;
  yield delay(500);
  try {
    if (!mail.length || !password.length) {
      throw new Error('EMPTY_INPUT');
    }
    yield firebase.auth().signInWithEmailAndPassword(mail, password);
    yield onSuccess();
    yield delay(1000);
    Actions.reset(AppConstants.ROUTES.home);
  } catch (error) {
    console.log('ERROR LOGIN USER', error);
    onError();
  }
}

export function* logoutUserSaga() {
  yield firebase.auth().signOut();
  Actions.reset(AppConstants.ROUTES.login);
}

function* watch() {
  yield takeLatest(AppConstants.EVENTS.LOGIN_USER_SAGA, loginUserSaga);
  yield takeLatest(AppConstants.EVENTS.LOGOUT_USER_SAGA, logoutUserSaga);
}

export default watch;

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
    yield firebase.auth().signInWithEmailAndPassword(mail, password);
    yield onSuccess();
  } catch (error) {
    console.log('ERROR LOGIN USER', error);
    onError();
  }
}

export function logoutUserSaga() {
  Actions.reset(AppConstants.ROUTES.login);
}

function* watch() {
  yield takeLatest(AppConstants.EVENTS.LOGIN_USER_SAGA, loginUserSaga);
  yield takeLatest(AppConstants.EVENTS.LOGOUT_USER_SAGA, logoutUserSaga);
}

export default watch;

import { Actions } from 'react-native-router-flux';
import {
  delay,
  put,
  takeLatest,
} from 'redux-saga/effects';

import AppConstants from '../../app/app.constants';

export function* loginUserSaga(action) {
  const { mail, password, onError } = action.payload;
  yield delay(3000);
  try {
    if (mail === 'test') {
      throw new Error('Wrong email or password');
    }
  } catch (error) {
    console.log('ERROR LOGIN USER', action.payload);
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

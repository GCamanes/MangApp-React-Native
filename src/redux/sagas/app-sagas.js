import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import { getVersion } from 'react-native-device-info';

import AppConstants from '../../app/app.constants';

export function* loadAppSaga() {
  try {
    // stuff to load
    console.log('LOADING APP');
    const version = yield getVersion();
    yield put({ type: AppConstants.EVENTS.SET_APP_VERSION_REDUX, payload: version });
  } catch (error) {
    console.log('ERROR LOADING APP', error);
  }
}


function* watch() {
  yield takeLatest(AppConstants.EVENTS.LOAD_APP_SAGA, loadAppSaga);
}

export default watch;

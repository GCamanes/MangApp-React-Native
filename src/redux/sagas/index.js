import { all } from 'redux-saga/effects';

import appSagas from './app-sagas';
import userSagas from './user-sagas';

const sagas = [
  appSagas(),
  userSagas(),
];

function* rootSaga() {
  yield all(sagas);
}

export default rootSaga;

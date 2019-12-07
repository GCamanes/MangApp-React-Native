import { all } from 'redux-saga/effects';

import appSagas from './app-sagas';
import mangaSagas from './manga-sagas';
import userSagas from './user-sagas';

const sagas = [
  appSagas(),
  mangaSagas(),
  userSagas(),
];

function* rootSaga() {
  yield all(sagas);
}

export default rootSaga;

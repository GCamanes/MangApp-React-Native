import { all } from 'redux-saga/effects';

import appSagas from './app-sagas';
import chapterSagas from './chapter-sagas';
import mangaSagas from './manga-sagas';
import scanSagas from './scan-sagas';
import userSagas from './user-sagas';

const sagas = [
  appSagas(),
  chapterSagas(),
  mangaSagas(),
  scanSagas(),
  userSagas(),
];

function* rootSaga() {
  yield all(sagas);
}

export default rootSaga;

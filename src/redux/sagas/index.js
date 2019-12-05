import { all } from 'redux-saga/effects';

import appSagas from './app-sagas';

const sagas = [
  appSagas(),
];

function* rootSaga() {
  yield all(sagas);
}

export default rootSaga;

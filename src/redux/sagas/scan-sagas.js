import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import {
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import AppConstants from '../../app/app.constants';
import { getItem, setItem, removeItem } from '../../utils/storage';
import showAlert from '../../utils/showAlert';

export function* getScansSaga(action) {
  const { manga, chapter } = action.payload;
  yield put({
    type: AppConstants.EVENTS.SHOW_LOADING_REDUCER,
    payload: { scene: AppConstants.ROUTES.scans, loading: true },
  });
  yield put({ type: AppConstants.EVENTS.SET_SELECTED_CHAPTER_REDUX, payload: chapter });
  Actions.jump(AppConstants.ROUTES.scans, { title: `Chapter ${chapter.number}` });

  try {
    const scansData = yield firebase
      .firestore()
      .collection(AppConstants.FIRESTORE.COLLECTION_MANGAS_CHAPTERS)
      .doc(manga.name)
      .collection(AppConstants.FIRESTORE.COLLECTION_CHAPTERS)
      .doc(chapter.id)
      .get();
    yield put({
      type: AppConstants.EVENTS.SET_SCANS_REDUX,
      payload: scansData._data.pages.map((data) => ({ url: data.url, infos: null })),
    });
    const firstPage = scansData._data.pages[0];
    console.log('FIRST PAGE', firstPage);
    /* yield Image.getSize(
      firstPage.url,
      (width, height) => console.log(width, height),
      (error) => console.log(error),
    ); */
  } catch (error) {
    console.log('\nerror is getScansSaga', error);
    showAlert('Error while getting Firebase data', 'Error');
  }
  yield put({
    type: AppConstants.EVENTS.SHOW_LOADING_REDUCER,
    payload: { scene: AppConstants.ROUTES.scans, loading: false },
  });
}

/**
 * Watch event saga.
 *
 * @returns {IterableIterator<ForkEffect>}
 */
export default function* watch() {
  yield takeLatest(AppConstants.EVENTS.GET_SCANS_SAGA, getScansSaga);
}

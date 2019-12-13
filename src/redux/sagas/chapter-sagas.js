import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import AppConstants from '../../app/app.constants';
import { getItem, setItem, removeItem } from '../../utils/storage';
import showAlert from '../../utils/showAlert';

const getChapterNumber = chapter => {
  const indexOfUnderscore = chapter.indexOf('_');
  const number = chapter.substring(indexOfUnderscore + 1, chapter.length);
  const lengthStr = number.length;
  if (number.substring(0, 3) === '000') {
    return number.substring(3, lengthStr);
  } else if (number.substring(0, 2) === '00') {
    return number.substring(2, lengthStr);
  } else if (number[0] === '0') {
    return number.substring(1, lengthStr);
  } else {
    return number;
  }
};

export function* getChaptersSaga(action) {
  yield put({
    type: AppConstants.EVENTS.SHOW_LOADING_REDUCER,
    payload: { scene: AppConstants.ROUTES.chapters, loading: true },
  });
  try {
    yield put({ type: AppConstants.EVENTS.SET_SELECTED_MANGA_REDUX, payload: action.payload });
    Actions.jump(AppConstants.ROUTES.chapters, { title: action.payload.name });
    const chaptersData = yield firebase
      .firestore()
      .collection(AppConstants.FIRESTORE.COLLECTION_MANGAS_CHAPTERS)
      .doc(action.payload.name)
      .get();
    const promisesChapter = [];
    chaptersData._data.chaptersList.map((item) => {
      promisesChapter.push(
        getItem(item, 'off').then((isRead) => ({
          id: item,
          number: getChapterNumber(item),
          isRead: isRead === 'on',
        })),
      );
    });
    const chapters = yield Promise.all(promisesChapter);
    yield put({
      type: AppConstants.EVENTS.SET_CHAPTERS_REDUX,
      payload: chapters.sort((a, b) => b.number - a.number),
    });
  } catch (error) {
    console.log('\nerror is getChaptersSaga', error);
    showAlert('Error while getting Firebase data', 'Error');
  }
  yield put({
    type: AppConstants.EVENTS.SHOW_LOADING_REDUCER,
    payload: { scene: AppConstants.ROUTES.chapters, loading: false },
  });
}

/**
 * Watch event saga.
 *
 * @returns {IterableIterator<ForkEffect>}
 */
export default function* watch() {
  yield takeLatest(AppConstants.EVENTS.GET_CHAPTERS_SAGA, getChaptersSaga);
}

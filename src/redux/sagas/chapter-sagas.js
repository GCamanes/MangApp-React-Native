import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import AppConstants from '../../app/app.constants';
import { getItem, setItem, removeItem } from '../../utils/storage';
import showAlert from '../../utils/showAlert';

const getChapterNumber = (chapter) => {
  const indexOfUnderscore = chapter.indexOf('_');
  const number = chapter.substring(indexOfUnderscore + 1, chapter.length);
  const lengthStr = number.length;
  if (number.substring(0, 3) === '000') {
    return number.substring(3, lengthStr);
  }
  if (number.substring(0, 2) === '00') {
    return number.substring(2, lengthStr);
  }
  if (number[0] === '0') {
    return number.substring(1, lengthStr);
  }
  return number;
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

    const lastChapterRead = yield getItem(`${action.payload.name}${AppConstants.STORAGE.LAST_CHAPTER_READ}`);
    console.log('LAST CHAPTER READ', lastChapterRead);
    const chapters = chaptersData._data.chaptersList.map((item) => ({
      id: item,
      number: getChapterNumber(item),
      isRead: lastChapterRead !== null && item <= lastChapterRead,
    }));
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

export function* markChapterReadSaga(action) {
  try {
    const {
      manga,
      id,
      isRead,
      routerPop,
    } = action.payload;
    console.log('CHAPTER MARK', action.payload);
    if (isRead) {
      yield setItem(`${manga.name}${AppConstants.STORAGE.LAST_CHAPTER_READ}`, id);
      yield put({
        type: AppConstants.EVENTS.CHAPTER_MARKED_AS_READ,
        payload: id,
      });
      if (routerPop) Actions.pop();
    } else {
      yield removeItem(`${manga.name}${AppConstants.STORAGE.LAST_CHAPTER_READ}`);
      const getChapterState = (state) => state.chapter;
      const ChapterState = yield select(getChapterState);
      const previousIndex = ChapterState.chapters.findIndex((chap) => chap.id === id) + 1;
      const newId = previousIndex < ChapterState.chapters.length ? ChapterState.chapters[previousIndex].id : null;
      yield put({
        type: AppConstants.EVENTS.CHAPTER_MARKED_AS_READ,
        payload: newId,
      });
    }
  } catch (error) {
    console.log('\nerror is markMangaFavoriteSaga', error);
    showAlert('Error while getting Firebase data', 'Error');
  }
}

/**
 * Watch event saga.
 *
 * @returns {IterableIterator<ForkEffect>}
 */
export default function* watch() {
  yield takeLatest(AppConstants.EVENTS.GET_CHAPTERS_SAGA, getChaptersSaga);
  yield takeLatest(AppConstants.EVENTS.MARK_CHAPTER_READ_SAGA, markChapterReadSaga);
}

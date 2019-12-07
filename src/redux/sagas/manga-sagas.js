import firebase from 'react-native-firebase';
import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import AppConstants from '../../app/app.constants';
import { getItem } from '../../utils/storage';
import showAlert from '../../utils/showAlert';

export function* getMangasSaga() {
  try {
    const mangasData = yield firebase
      .firestore()
      .collection(AppConstants.FIRESTORE.COLLECTION_MANGAS_LIST)
      .doc(AppConstants.FIRESTORE.DOC_MANGAS)
      .get();
    const promisesManga = [];
    mangasData._data.list.forEach((item, index) => {
      promisesManga.push(
        getItem(item.name, 'off').then((isFavorite) => ({
          name: item.name,
          status: item.status,
          imgUrl: item.imgUrl,
          authors: item.authors,
          lastChapter: item.lastChapter,
          number: index,
          isFavorite: isFavorite === 'on',
        })),
      );
    });
    const mangas = yield Promise.all(promisesManga);
    yield put({
      type: AppConstants.EVENTS.SET_MANGAS_REDUX,
      payload: mangas,
    });
  } catch (error) {
    console.log('\nerror is getMangasSaga', error);
    showAlert('Error while getting Firebase data', 'Error');
  }
}

/**
 * Watch event saga.
 *
 * @returns {IterableIterator<ForkEffect>}
 */
export default function* watch() {
  yield takeLatest(AppConstants.EVENTS.GET_MANGAS_SAGA, getMangasSaga);
}

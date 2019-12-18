import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import { Image, Platform, StatusBar } from 'react-native';
import {
  put,
  takeLatest,
} from 'redux-saga/effects';
import AppConstants from '../../app/app.constants';
import showAlert from '../../utils/showAlert';
import AppSizes from '../../app/app.sizes';
import AppStyles from '../../app/app.styles';

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

    const scans = scansData._data.pages;
    yield put({
      type: AppConstants.EVENTS.SET_SCANS_REDUX,
      payload: scans.map((data) => ({ url: data.url, infos: null })),
    });
    yield put({
      type: AppConstants.EVENTS.UPDATE_SCAN_INFOS_SAGA,
      payload: { url: scans[0].url, index: 0 },
    });
  } catch (error) {
    console.log('\nerror in getScansSaga', error);
    showAlert('Error getting scans data', 'Error');
  }
  yield put({
    type: AppConstants.EVENTS.SHOW_LOADING_REDUCER,
    payload: { scene: AppConstants.ROUTES.scans, loading: false },
  });
}

export function* updateScanInfosSaga(action) {
  const { index, url } = action.payload;
  try {
    let infos = null;
    yield Image.getSize(
      url,
      (width, height) => {
        infos = {
          width,
          height,
          imgRatioHW: height / width,
          imgRatioWH: width / height,
        };
      },
      (error) => { throw error; },
    );

    const scanViewSize = {
      height:
        Platform.OS === 'android'
          ? AppSizes.screen.height - AppStyles.navbar.height - StatusBar.currentHeight
          : AppSizes.screen.height - AppStyles.navbar.height,
      width: AppSizes.screen.width,
    };
    scanViewSize.imgRatioHW = scanViewSize.height / scanViewSize.width;
    scanViewSize.imgRatioWH = scanViewSize.width / scanViewSize.height;

    if (infos.imgRatioHW > 1) {
      if (infos.imgRatioHW < scanViewSize.imgRatioHW) {
        infos.height = scanViewSize.width * 0.95 * infos.imgRatioHW;
        infos.width = scanViewSize.width * 0.95;
      } else {
        infos.height = scanViewSize.height * 0.95;
        infos.width = scanViewSize.height * 0.95 * infos.imgRatioWH;
      }
    } else {
      infos.height = scanViewSize.width * 0.95 * infos.imgRatioHW;
      infos.width = scanViewSize.width * 0.95;
    }

    yield put({
      type: AppConstants.EVENTS.UPDATE_SCAN_INFOS_REDUX,
      payload: { infos, index },
    });
  } catch (error) {
    console.log('\nerror in updateScanInfosSaga', error);
    showAlert('Error getting image size', 'Error');
  }
}
/**
 * Watch event saga.
 *
 * @returns {IterableIterator<ForkEffect>}
 */
export default function* watch() {
  yield takeLatest(AppConstants.EVENTS.GET_SCANS_SAGA, getScansSaga);
  yield takeLatest(AppConstants.EVENTS.UPDATE_SCAN_INFOS_SAGA, updateScanInfosSaga);
}

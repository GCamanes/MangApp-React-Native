import AppConstants from '../../app/app.constants';

export function closeErrorView() {
  return {
    type: AppConstants.EVENTS.CLEAN_ERROR_REDUX,
  };
}

export function loadApp(onFireBaseAuthSuccess) {
  return {
    type: AppConstants.EVENTS.LOAD_APP_SAGA,
    payload: onFireBaseAuthSuccess,
  };
}

export function setAppError(error) {
  return {
    type: AppConstants.EVENTS.SET_ERROR_REDUX,
    payload: error,
  };
}

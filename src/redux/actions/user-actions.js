import AppConstants from '../../app/app.constants';

export function login(mail, password, onSuccess, onError) {
  return {
    type: AppConstants.EVENTS.LOGIN_USER_SAGA,
    payload: {
      mail,
      password,
      onSuccess,
      onError,
    },
  };
}

export function logout() {
  return {
    type: AppConstants.EVENTS.LOGOUT_USER_SAGA,
  };
}

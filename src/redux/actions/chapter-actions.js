import AppConstants from '../../app/app.constants';

export function getChapters(manga) {
  return {
    type: AppConstants.EVENTS.GET_CHAPTERS_SAGA,
    payload: manga,
  };
}

import AppConstants from '../../app/app.constants';

export function getScans(manga, chapter) {
  return {
    type: AppConstants.EVENTS.GET_SCANS_SAGA,
    payload: {
      manga,
      chapter,
    },
  };
}

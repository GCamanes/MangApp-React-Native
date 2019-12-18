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

export function getScanInfos(url, index) {
  return {
    type: AppConstants.EVENTS.UPDATE_SCAN_INFOS_SAGA,
    payload: { url, index },
  };
}

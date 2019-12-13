import AppConstants from '../../app/app.constants';

export function getChapters(manga) {
  return {
    type: AppConstants.EVENTS.GET_CHAPTERS_SAGA,
    payload: manga,
  };
}

export function markChapterAsRead(id, isRead, routerPop = false) {
  return {
    type: AppConstants.EVENTS.MARK_CHAPTER_READ_SAGA,
    payload: {
      id,
      isRead,
      routerPop,
    },
  };
}

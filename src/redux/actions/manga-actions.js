import AppConstants from '../../app/app.constants';

export function getMangas() {
  return { type: AppConstants.EVENTS.GET_MANGAS_SAGA };
}

export function markMangaAsFavorite(manga, value) {
  return {
    type: AppConstants.EVENTS.MARK_MANGA_FAVORITE_SAGA,
    payload: { manga, value },
  };
}

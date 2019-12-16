export default {
  EVENTS: {
    // APP
    LOAD_APP_SAGA: 'LOAD_APP_SAGA',
    SHOW_LOADING_REDUCER: 'SHOW_LOADING_REDUCER',
    SET_ERROR_REDUX: 'SET_ERROR_REDUX',
    CLEAN_ERROR_REDUX: 'CLEAN_ERROR_REDUX',
    SET_APP_VERSION_REDUX: 'SET_APP_VERSION_REDUX',

    // USER
    CLEAR_USER_REDUCER: 'CLEAR_USER_REDUCER',
    LOGIN_USER_SAGA: 'LOGIN_USER_SAGA',
    LOGOUT_USER_SAGA: 'LOGOUT_USER_SAGA',

    // MANGA
    CLEAR_MANGAS_REDUCER: 'CLEAR_MANGAS_REDUCER',
    GET_MANGAS_SAGA: 'GET_MANGAS_SAGA',
    SET_MANGAS_REDUX: 'SET_MANGAS_REDUX',
    MARK_MANGA_FAVORITE_SAGA: 'MARK_MANGA_FAVORITE_SAGA',
    MANGA_MARKED_AS_FAVORITE: 'MANGA_MARKED_AS_FAVORITE',

    // CHPATER
    CLEAR_CHAPTERS_REDUCER: 'CLEAR_CHAPTERS_REDUCER',
    GET_CHAPTERS_SAGA: 'GET_CHAPTERS_SAGA',
    SET_CHAPTERS_REDUX: 'SET_CHAPTERS_REDUX',
    MARK_CHAPTER_READ_SAGA: 'MARK_CHAPTER_READ_SAGA',
    CHAPTER_MARKED_AS_READ: 'CHAPTER_MARKED_AS_READ',
    SET_SELECTED_MANGA_REDUX: 'SET_SELECTED_MANGA_REDUX',
  },
  FIRESTORE: {
    COLLECTION_MANGAS_LIST: 'mangasList',
    COLLECTION_MANGAS_CHAPTERS: 'mangasChapters',
    COLLECTION_CHAPTERS: 'chapters',
    DOC_MANGAS: 'mangas',
  },
  ROUTES: {
    chapters: 'chapters',
    home: 'home',
    loadingApp: 'loading-app',
    login: 'login',
  },
  STORAGE: {
    LAST_CHAPTER_READ: '_lastChapterRead',
  },
  WEBSERVICE: {},
};

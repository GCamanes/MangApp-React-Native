import AppConstants from '../../app/app.constants';

const initialState = {
  mangas: [],
  selectedManga: null,
};

const mangaReducer = (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.EVENTS.SET_MANGAS_REDUX:
      return {
        ...state,
        mangas: action.payload,
      };
    case AppConstants.EVENTS.SET_SELECTED_MANGA_REDUX:
      return {
        ...state,
        selectedManga: action.payload,
      }
    case AppConstants.EVENTS.MANGA_MARKED_AS_FAVORITE: {
      const manga = state.mangas.find(
        (item) => item.name === action.payload.manga,
      );
      manga.isFavorite = action.payload.isFavorite;
      const others = state.mangas.filter(
        (item) => item.name !== action.payload.manga,
      );
      return {
        ...state,
        mangas: [...others, manga].sort((a, b) => a.number - b.number),
      };
    }
    case AppConstants.EVENTS.CLEAR_MANGAS_REDUCER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default mangaReducer;

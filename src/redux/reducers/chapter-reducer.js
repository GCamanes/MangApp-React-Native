import AppConstants from '../../app/app.constants';

const initialState = {
  chapters: [],
};

const chapterReducer = (state = initialState, action) => {
  switch (action.type) {
    case AppConstants.EVENTS.SET_CHAPTERS_REDUX:
      return {
        ...state,
        chapters: action.payload,
      };
    case AppConstants.EVENTS.CHAPTER_MARKED_AS_READ: {
      const newChapters = state.chapters.map((chap) => ({
        ...chap,
        isRead: action.payload !== null && chap.id <= action.payload,
      }))
      return {
        ...state,
        chapters: newChapters.sort((a, b) => b.number - a.number),
      };
    }
    case AppConstants.EVENTS.CLEAR_CHAPTERS_REDUCER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default chapterReducer;

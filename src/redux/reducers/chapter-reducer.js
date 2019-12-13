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
      const chapter = state.chapters.find(
        (item) => item.id === action.payload.id,
      );
      let newChapter = { ...chapter };
      newChapter.isRead = action.payload.isRead;
      const others = state.chapters.filter(
        (item) => item.id !== action.payload.id,
      );
      return {
        ...state,
        chapters: [...others, newChapter].sort((a, b) => b.number - a.number)
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

import {
  SET_BOOKS,
  CLEAR_FAVOURITES,
  TOGGLE_FAVOURITE
} from '../actions/books';

const INITIAL_STATE = {
  booksData: [],
  favouriteBooks: []
};

const BooksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        booksData: action.payload
      };
    case TOGGLE_FAVOURITE:
      const existingBook = state.favouriteBooks.findIndex(
        (book) => book.id === action.bookId
      );
      if (existingBook >= 0) {
        // ფავორიტებში უკვე დამატებული
        const updatedBooks = [...state.favouriteBooks];
        updatedBooks.splice(existingBook, 1);
        return { ...state, favouriteBooks: updatedBooks };
      } else {
        const book = state.booksData.find((book) => book.id === action.bookId);
        return {
          ...state,
          favouriteBooks: state.favouriteBooks.concat(book)
        };
      }
    case CLEAR_FAVOURITES:
      return { ...state, favouriteBooks: [] };
    default:
      return state;
  }
};

export default BooksReducer;

import API from '../../constants/apiKey';

export const SET_BOOKS = 'SET_BOOKS';
export const CLEAR_FAVOURITES = 'CLEAR_FAVOURITES';
export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export const clearFavourites = () => {
  return {
    type: CLEAR_FAVOURITES
  };
};

export const toggleFavourite = (id) => {
  return {
    type: TOGGLE_FAVOURITE,
    bookId: id
  };
};

export const setBooks = (books) => {
  return {
    type: SET_BOOKS,
    payload: books
  };
};

export const getSearchedBooks = (query) => {
  return (dispatch) => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API.key}`
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('BAD RESPONSE FROM THE SERVER');
        }
        return response.json();
      })
      .then((books) => {
        dispatch(setBooks([...books.items]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getDefaultBooks = () => {
  return (dispatch) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q='love'&key=${API.key}`)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('BAD RESPONSE FROM THE SERVER');
        }
        return response.json();
      })
      .then((books) => {
        dispatch(setBooks([...books.items]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

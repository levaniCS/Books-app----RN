import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import BooksNavigator from './navigation/BookNavigator';
import BooksReducer from './store/reducers/books';

enableScreens();

const rootReducer = combineReducers({
  books: BooksReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    sansRegular: require('./assets/fonts/OpenSans-Regular.ttf'),
    sansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    roboto: require('./assets/fonts/Roboto-Medium.ttf')
  });
};

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoading) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setIsLoading(true)} />
    );
  }
  return (
    <Provider store={store}>
      <BooksNavigator />
    </Provider>
  );
};

export default App;

/*
1) დეტალების გვერდი
2) ფავორიტების გვერდი
3) რექომენდიდები, პოპულარის და დისქავერის დატა

4) ლოადინგიიი ( აიქონები )

5) ჰედერიის გალამაზება
6) ანიმაციურიი ტაპ ბარიიი  და ნავიგაციის ბაგები

7) ფაიერბეისი და რეგისტრაციიააა
8) დასაწყისიის სლაიდერიი

9)პროფილის გვერრდი
10) ლოგინ ლოგაუთი
 */

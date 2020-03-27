import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import NavigationContainer from './navigation/NavWithAuth';

import AuthReducer from './store/reducers/auth';
import BooksReducer from './store/reducers/books';

enableScreens();

const rootReducer = combineReducers({
  books: BooksReducer,
  auth: AuthReducer
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
      <NavigationContainer />
    </Provider>
  );
};

export default App;

/*
6) ლოგაუთის ბაგი

7) სტარტერ გვერდიი

9)პროფილის გვერრდი
 */

import React, { useEffect, useCallback } from 'react';
import { View, Alert, StyleSheet, Text } from 'react-native';
import BookList from '../components/BookList';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderBtn';
import { clearFavourites } from '../store/actions/books';
import Colors from '../constants/colors';

const FavouritesScreen = (props) => {
  const data = useSelector((state) => state.books.favouriteBooks);
  const dispatch = useDispatch();

  const pressOkHandler = () => {
    dispatch(clearFavourites());
  };

  const clearFavouritesList = useCallback(() => {
    Alert.alert('Clear list', 'Are you sure u want to delete all items ?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: pressOkHandler }
    ]);
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ clear: clearFavouritesList });
  }, [clearFavouritesList]);

  const selectItemHandler = (id) => {
    props.navigation.navigate('Detail', {
      id: id
    });
  };

  const message = (
    <Text style={styles.message}>
      You haven't saved any books, lets add some
    </Text>
  );

  return (
    <View style={styles.screen}>
      {data && data.length > 0 ? (
        <BookList selectItemHandler={selectItemHandler} data={data} />
      ) : (
        message
      )}
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 10
  },
  message: {
    color: Colors.greyMedium,
    fontFamily: 'roboto',
    marginTop: 10,
    fontSize: 15
  }
});

FavouritesScreen.navigationOptions = (navData) => {
  const clearFavouritesList = navData.navigation.getParam('clear');
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='clear'
          iconName='ios-trash'
          onPress={clearFavouritesList}
        />
      </HeaderButtons>
    )
  };
};
